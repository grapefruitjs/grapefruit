var AudioPlayer = require('./AudioPlayer'),
    utils = require('../utils/utils'),
    support = require('../utils/support');

//you can only have 1 audio context on a page, so we store one for use in each manager
var __AudioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
    __audioctx = support.webAudio ? new __AudioCtx() : null;

/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 * The GF Audio API was based on
 * <a target="_blank" href="https://github.com/goldfire/howler.js">Howler.js</a>
 *
 * @class AudioManager
 * @extends Object
 * @constructor
 */
var AudioManager = module.exports = function(game) {
    /**
     * The game instance this manager belongs to
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
    this.ctx = __audioctx;

    /**
     * If we have some way of playing audio
     *
     * @property canPlay
     * @type Boolean
     * @readOnly
     */
    this.canPlay = support.webAudio || support.htmlAudio;

    //if we are using web audio, we need a master gain node
    if(support.webAudio) {
        this.masterGain = this.ctx.createGain ? this.ctx.createGain() : this.ctx.createGainNode();
        this.masterGain.gain.value = 1;
        this.masterGain.connect(this.ctx.destination);
    }

    //map of elements to play audio with
    this.sounds = {};
};

utils.inherits(AudioManager, Object, {
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

            if(support.webAudio)
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

        if(support.webAudio)
            this.masterGain.gain.value = m ? 0 : this._volume;

        //go through each audio element and mute/unmute them
        for(var key in this.sounds) {
            if(this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
                var player = this.sounds[key];
                //loop through the audio nodes
                for(var i = 0, il = player._nodes.length; i < il; ++i) {
                    player._nodes[i].mute();
                }
            }
        }

        return this;
    },
    attach: function(sound) {
        //TODO: check name collision
        this.sounds[sound.key] = sound;

        sound._manager = this;

        if(support.webAudio) {
            for(var i = 0; i < sound._nodes.length; ++i) {
                sound._nodes[i].disconnect();
                sound._nodes[i].connect(this.masterGain);
            }
        }
    },
    /**
     * Creates a new audio player for a peice of audio
     *
     * @method create
     * @param key {String} The unique cache key for the preloaded audio
     * @param [settings] {Object} All the settings for the audio player
     * @param [settings.volume] {Number} The volume of this audio clip
     * @param [settings.autoplay] {Boolean} Automatically start playing after loaded
     * @param [settings.loop] {Boolean} Replay the audio when it finishes
     * @param [settings.sprite] {Object} A map of string names -> [start, duration] arrays. You can use it to put multiple sounds in one file
     * @param [settings.pos3d] {Array<Number>} 3D coords of where the audio should sound as if it came from (only works with WebAudio)
     * @param [settings.buffer] {Boolean} WebAudio will load the entire file before playing, making this true forces HTML5Audio which will buffer and play
     * @param [settings.format] {String} Force an extension override
     * @return {AudioPlayer} Will return the new audio player, or false if we couldn't determine a compatible url
     */
    add: function(key, settings) {
        //if we can't play audio return false
        if(!this.canPlay) {
            return false;
        }

        var audio = this.game.cache.getAudio(key);

        if(!audio.player)
            audio.player = new AudioPlayer(this, audio, settings);

        return this.sounds[key] = audio.player;
    },
    remove: function(key) {
        var audio = this.sounds[key];

        if(audio) {
            audio.stop();
        }

        delete this.sounds[key];
    }
});
