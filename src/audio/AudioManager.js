/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 * The GF Audio API was based on
 * <a href="https://github.com/goldfire/howler.js">Howler.js</a>
 *
 * @class AudioManager
 * @constructor
 */
gf.AudioManager = function() {
    //normalize Audio Context
    var _AudioContext = window.AudioContext || window.webkitAudioContext;

    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

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
     * The Web Audio API context if we are using it
     *
     * @property ctx
     * @type AudioContext
     * @readOnly
     */
    this.ctx = gf.support.webAudio ? new _AudioContext() : null;

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
        this.codecs = {
            mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/,''),
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,''),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,''),
            wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/,''),
            m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/,''),
            webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,'')
        }
    }

    //if we are using web audio, we need a master gain node
    if(gf.support.webAudio) {
        this.masterGain = this.ctx.createGain ? this.ctx.createGainNode() : this.ctx.createGain();
        this.masterGain.gain.value = 1;
        this.masterGain.connect(this.ctx.destination);
    }

    //map of elements to play audio with
    this.sounds = {};

    //define volume getter/setter
    this.__defineGetter__('volume', this.getVolume.bind(this));
    this.__defineSetter__('volume', this.setVolume.bind(this));
};

gf.inherits(gf.AudioManager, Object, {
    mute: function() {
        this.muted = true;

        return this;
    },
    unmute: function() {
        this.muted = false;

        return this;
    },
    getVolume: function() {
        return this._volume;
    },
    setVolume: function(v) {
        v = parseFloat(v, 10);

        if(v !== NaN && v >= 0 && v <= 1) {
            this._volume = v;

            if(gf.support.webAudio)
                this.masterGain.gain.value = v;

            //go through each audio element and change their volume
            for(var key in this.sounds) {
                if(this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
                    var player = this.sounds[key];
                    //loop through the audio nodes
                    for(var i = 0, il = player._nodes.length; ++i) {
                        player._nodes[i].volume = player._volume * this._volume;
                    }
                }
            }
        }
    },
    mute: function() {
        return this.setMuted(true);
    }
    unmute: function() {
        return this.setMuted(false);
    },
    setMuted: function(m) {
        this._muted = m = !!m;

        if(gf.support.webAudio)
            this.masterGain.gain.value = m ? 0 : this._volume;

        //go through each audio element and mute/unmute them
        for(var key in this.sounds) {
            if(this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
                var player = this.sounds[key];
                //loop through the audio nodes
                for(var i = 0, il = player._nodes.length; ++i) {
                    player._nodes[i].muted = m;
                }
            }
        }

        return this;
    },
    create: function(name, settings) {
        if(typeof name !== 'string') {
            settings = name;
            name = null;
        }

        if(!name)
            name = Math.round(Date.now() * Math.random()) + '';

        return this.sounds[name] = new gf.AudioPlayer(this, settings);
    }
});