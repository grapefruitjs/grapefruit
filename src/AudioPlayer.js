/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 * The GF Audio API was based on
 * <a href="https://github.com/goldfire/howler.js">Howler.js</a>
 *
 * @class AudoPlayer
 * @constructor
 * @param game {Game} Game instance for this audio player
 */
gf.AudioPlayer = function(game) {
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
    this.ctx = gf.support.webAudio ? new AudioContext : null;

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

    //array of elements to play audio with
    this._plays = {};

    var self = this;
    //define volume getter/setter
    this.__defineGetter__('volume', function() {
        return self._volume;
    });
    this.__defineSetter__('volume', function(v) {
        v = parseFloat(v, 10);

        if(v !== NaN && v >= 0 && v <= 1) {
            self._volume = v;

            if(gf.support.webAudio)
                self.masterGain.gain.value = v;

            //go through each audio element and change their volume
            for(var key in self._plays) {
                if(self._plays.hasOwnProperty(key) && self._plays[key]._webAudio === false) {
                    var play = self._plays[key];
                    //loop through the audio nodes
                    for(var i = 0, il = play._nodes.length; ++i) {
                        play._nodes[i].volume = play._volume * self._volume;
                    }
                }
            }
        }
    });

    //define mute geter/setter
    this.__defineGetter__('muted', function() {
        return self._muted;
    });
    this.__defineSetter__('muted', function(m) {
        self._muted = m = !!m;

        if(gf.support.webAudio)
            self.masterGain.gain.value = m ? 0 : self._volume;

        //go through each audio element and mute/unmute them
        for(var key in self._plays) {
            if(self._plays.hasOwnProperty(key) && self._plays[key]._webAudio === false) {
                var play = self._plays[key];
                //loop through the audio nodes
                for(var i = 0, il = play._nodes.length; ++i) {
                    play._nodes[i].muted = m;
                }
            }
        }
    });
};

gf.inherits(gf.AudioPlayer, Object, {
    mute: function() {
        this.muted = true;

        return this;
    },
    unmute: function() {
        this.muted = false;

        return this;
    }
});

function Play(o) {
    //mixin the Event Target methods
    gf.EventTarget.call(this);

    this.autoplay = false;
    this.buffer = false;
    this.duration = 0;
    this.format = null;
    this.loop = false;
    this.loaded = false;
    this.sprite = {};
    this.src = '';
    this.position = new gf.Point();
    this.volume = 1;
    this.urls = [];

    this._canPlay = o.canPlay;
    this._codecs = o.codecs;

    this._webAudio = gf.support.webAudio && !this.buffer;

    this._nodes = [];

    //mixin user's settings
    gf.utils.setValues(this, settings);

    if(this._webAudio) {
        this.setupWebAudioNode();
    }

    this.load();
};

gf.inherits(Play, Object, {
    load: function() {
        if(!this._canPlay) {
            this.dispatchEvent({
                type: 'error',
                which: 'load',
                message: 'Playing/Loading audio is not supported in this browser'
            });
        }

        //loop through each source url and pick the first that is compatible
        
    }
});
    ,
    _getOpen: function(id) {
        var chans = this.playing[id];

        //find an open channel
        for(var i = 0, il = chans.length; i < il; ++i) {
            var clip = chans[i++];
            if(clip.ended || !clip.currentTime) {
                clip.currentTime = this.resetTime;
                return clip;
            }
        }

        //create a new channel
        var sound = new Audio(chans[0].src);
        sound.preload = 'auto';
        sound.load();
        sound.channel = chans.length;
        chans.push(sound);

        return chans[chans.length - 1];
    },
    /**
     * Plays a loaded audio clip
     *
     * @method play
     * @param id {String|Object} The id of the sound clip to play. You can also pass the object returned from a previous play
     * @param options {Object} The options object you can pass properties like "loop," "volume," "channel"
     * @param callback {Function} The callback to call after the sound finishes playing
     * @return {Object} The object returned can be passed to any audio function in the
     *      first parameter to control that audio clip
     */
    play: function(id, opts, cb) {
        if(!gf.assetCache[id]) {
            throw 'Tried to play unloaded audio: ' + id;
        }

        if(typeof opts === 'function') {
            cb = opts;
            opts = null;
        }

        if(typeof id === 'object') {
            opts = id;
            id = opts.id;
        }

        opts = opts || {};

        opts.id = id;
        opts.loop = opts.loop || false;
        opts.volume = opts.volume || 1;

        //resume a paused channel
        if(opts.channel !== undefined && this.playing[id]) {
            this.playing[id][opts.channel].play();
            return opts;
        }

        //we haven't played this sound yet, create a new channel list
        if(!this.playing[id]) {
            this.playing[id] = [gf.assetCache[id]];
            this.playing[id][0].channel = 0;
        }

        var sound = this._getOpen(id);
        sound.loop = opts.loop;
        sound.volume = opts.volume;
        sound.play();

        opts.channel = sound.channel;

        if(!opts.loop) {
            var self = this,
                ended = function() {
                    sound.removeEventListener('ended', ended, false);
                    self.stop(opts);
                    if(cb) cb();
                };
            sound.addEventListener('ended', ended, false);
        }

        return opts;
    },
    /**
     * Stops a playing audio clip
     *
     * @method stop
     * @param id {String|Object} The id of the sound clip to stop. You can also pass the object returned from a previous play
     * @param channel {Number} The channel that the clip is playing on (not needed if you pass the clip object as the first parameter)
     */
    stop: function(id, channel) {
        if(typeof id === 'object') {
            channel = id.channel;
            id = id.id;
        }

        if(!this.playing[id]) return;
        if(!this.playing[id][channel]) return;

        this.playing[id][channel].pause();
        this.playing[id][channel].currentTime = this.resetTime;
        this.playing[id][channel].ended = true;
    },
    /**
     * Pauses a playing audio clip
     *
     * @method stop
     * @param id {String|Object} The id of the sound clip to pause. You can also pass the object returned from a previous play
     * @param channel {Number} The channel that the clip is playing on (not needed if you pass the clip object as the first parameter)
     */
    pause: function(id, channel) {
        if(typeof id === 'object') {
            channel = id.channel;
            id = id.id;
        }

        if(!this.playing[id]) return;
        if(!this.playing[id][channel]) return;

        this.playing[id][channel].pause();
    },
    /**
     * Plays all currently paused or stopped audio clips (only ones that have previously been started with gf.play)
     *
     * @method playAll
     */
    playAll: function() {
        for(var sid in this.playing) {
            var chans = this.playing[sid];

            for(var i = 0, il = chans.length; i < il; ++i)
                this.play({ id: sid, channel: i });
        }
    },
    /**
     * Stops all currently paused or playing audio clips
     *
     * @method stopAll
     */
    stopAll: function() {
        for(var sid in this.playing) {
            var chans = this.playing[sid];

            for(var i = 0, il = chans.length; i < il; ++i)
                this.stop(sid, i);
        }
    },
    /**
     * Pauses all currently playing audio clips
     *
     * @method pauseAll
     */
    pauseAll: function() {
        for(var sid in this.playing) {
            var chans = this.playing[sid];

            for(var i = 0, il = chans.length; i < il; ++i)
                this.pause(sid, i);
        }
    }
});