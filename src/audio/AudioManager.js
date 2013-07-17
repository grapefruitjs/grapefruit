//you can only have 1 audio context on a page, so we store one for use in each manager
gf.__AudioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
gf.__audioctx = gf.support.webAudio ? new gf.__AudioCtx() : null;

/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 * The GF Audio API was based on
 * <a target="_blank" href="https://github.com/goldfire/howler.js">Howler.js</a>
 *
 * @class AudioManager
 * @extends Object
 * @namespace gf
 * @constructor
 */
gf.AudioManager = function() {
    /**
     * Whether the player is muted or not
     *
     * @property muted
     * @type Boolean
     * @default false
     * @private
     */
    this._muted = false;

    /**
     * The master volume of the player
     *
     * @property _volume
     * @type Number
     * @default 1
     * @private
     */
    this._volume = 1;

    /**
     * The master volume of all the audio playing
     *
     * @property volume
     * @type Number
     * @default 1
     */
    Object.defineProperty(this, 'volume', {
        get: this.getVolume.bind(this),
        set: this.setVolume.bind(this)
    });

    /**
     * The Web Audio API context if we are using it
     *
     * @property ctx
     * @type AudioContext
     * @readOnly
     */
    this.ctx = gf.__audioctx;

    /**
     * If we have some way of playing audio
     *
     * @property canPlay
     * @type Boolean
     * @readOnly
     */
    this.canPlay = gf.support.webAudio || gf.support.htmlAudio;

    /**
     * The codecs that the browser supports
     *
     * @property codecs
     * @type Object<Boolean>
     * @readOnly
     */
    if(this.canPlay) {
        var audioTest = new Audio();

        this.codecs = {
            mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/,''),
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,''),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,''),
            wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/,''),
            m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/,''),
            webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,'')
        };
    }

    //if we are using web audio, we need a master gain node
    if(gf.support.webAudio) {
        this.masterGain = this.ctx.createGain ? this.ctx.createGain() : this.ctx.createGainNode();
        this.masterGain.gain.value = 1;
        this.masterGain.connect(this.ctx.destination);
    }

    //map of elements to play audio with
    this.sounds = {};
};

gf.inherits(gf.AudioManager, Object, {
    /**
     * Returns the current master volume
     *
     * @method getVolume
     */
    getVolume: function() {
        return this._volume;
    },
    /**
     * Sets the current master volume
     *
     * @method setVolume
     * @param value {Number}
     */
    setVolume: function(v) {
        v = parseFloat(v, 10);

        if(!isNaN(v) && v >= 0 && v <= 1) {
            this._volume = v;

            if(gf.support.webAudio)
                this.masterGain.gain.value = v;

            //go through each audio element and change their volume
            for(var key in this.sounds) {
                if(this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
                    var player = this.sounds[key];
                    //loop through the audio nodes
                    for(var i = 0, il = player._nodes.length; i < il; ++i) {
                        player._nodes[i].volume = player._volume * this._volume;
                    }
                }
            }
        }
    },
    /**
     * Mutes all playing audio
     *
     * @method mute
     */
    mute: function() {
        return this.setMuted(true);
    },
    /**
     * Unmutes all playing audio
     *
     * @method unmute
     */
    unmute: function() {
        return this.setMuted(false);
    },
    /**
     * Sets whether or not this manager is muted
     *
     * @method setMuted
     */
    setMuted: function(m) {
        this._muted = m = !!m;

        if(gf.support.webAudio)
            this.masterGain.gain.value = m ? 0 : this._volume;

        //go through each audio element and mute/unmute them
        for(var key in this.sounds) {
            if(this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
                var player = this.sounds[key];
                //loop through the audio nodes
                for(var i = 0, il = player._nodes.length; i < il; ++i) {
                    player._nodes[i].muted = m;
                }
            }
        }

        return this;
    },
    /**
     * Creates a new audio player for a peice of audio
     *
     * @method create
     * @param [name] {String} An name to uniquely identify this audio, if omitted one will be ranomly chosen
     * @param settings {Object} All the settings for the audio player
     * @param settings.urls {Array<String>} All the url possible for this audio (so we can choose the one this browser supports)
     * @param [settings.volume] {Number} The volume of this audio clip
     * @param [settings.autoplay] {Boolean} Automatically start playing after loaded
     * @param [settings.loop] {Boolean} Replay the audio when it finishes
     * @param [settings.sprite] {Object} A map of string names -> [start, duration] arrays. You can use it to put multiple sounds in one file
     * @param [settings.pos3d] {Array<Number>} 3D coords of where the audio should sound as if it came from (only works with WebAudio)
     * @param [settings.buffer] {Boolean} WebAudio will load the entire file before playing, making this true forces HTML5Audio which will buffer and play
     * @param [settings.format] {String} Force an extension override
     * @return {AudioPlayer} Will return the new audio player, or false if we couldn't determine a compatible url
     */
    create: function(name, settings) {
        //if we can't play audio return false
        if(!this.canPlay) {
            return false;
        }

        //name is "optional"
        if(typeof name !== 'string') {
            settings = name;
            name = null;
        }

        //make up an ID if none was passed
        if(!name)
            name = Math.round(Date.now() * Math.random()) + '';

        var src;

        //loop through each source url and pick the first that is compatible
        for(var i = 0, il = settings.urls.length; i < il; ++i) {
            var url = settings.urls[i].toLowerCase(),
                ext;

            //if they pass a format override, use that
            if(settings.format) {
                ext = settings.format;
            }
            //otherwise extract the format from the url
            else {
                ext = url.match(/.+\.([^?]+)(\?|$)/);
                ext = (ext && ext.length >= 2) ? ext[1] : url.match(/data\:audio\/([^?]+);/)[1];
            }

            //if we can play this url, then set the source of the player
            if(this.codecs[ext]) {
                src = url;
                break;
            }
        }

        //check if we found a usable url, if not return false
        if(!src) {
            return false;
        }

        //check if we already created a player for this audio
        if(gf.assetCache[src])
            return gf.assetCache[src];

        settings.src = src;
        return this.sounds[name] = gf.assetCache[src] = new gf.AudioPlayer(this, settings);
    }
});