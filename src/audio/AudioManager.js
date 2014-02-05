var AudioPlayer = require('./AudioPlayer'),
    inherit = require('../utils/inherit'),
    support = require('../utils/support');

//you can only have 1 audio context on a page, so we store one for use in each manager
var __AudioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
    __audioctx = support.webAudio ? new __AudioCtx() : null;

/**
 * Grapefruit Audio API, provides an easy interface to use WebAudoiAPI with a fallback to HTML5 Audio
 * The GF Audio API was originally based on [Howler.js](https://github.com/goldfire/howler.js)
 * Generally you will use this via the `game.audio` or `state.audio` properties.
 *
 * @class AudioManager
 * @extends Object
 * @constructor
 * @param game {Game} The game instance this manager belongs to
 * @param parent {AudioManager} The parent audio manager this manager belongs to.
 *      This is used to create a web audio API node heirarchy.
 */
var AudioManager = function(game, parent) {
    /**
     * The game instance this manager belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The parent for this audio manager
     *
     * @property parent
     * @type AudioManager
     */
    this.parent = parent;

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
        this.setParent(parent);
    }

    //map of elements to play audio with
    this.sounds = {};
};

inherit(AudioManager, Object, {
    /**
     * Mutes all playing audio
     *
     * @method mute
     * @return {AudioManager} Returns itself.
     * @chainable
     */
    mute: function() {
        return this.setMuted(true);
    },
    /**
     * Unmutes all playing audio
     *
     * @method unmute
     * @return {AudioManager} Returns itself.
     * @chainable
     */
    unmute: function() {
        return this.setMuted(false);
    },
    /**
     * Sets whether or not this manager is muted
     *
     * @method setMuted
     * @return {AudioManager} Returns itself.
     * @chainable
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
    /**
     * Sets the parent of this audio manager, if using webAudio this
     * means that we connect to the parent masterGain node and inherit
     * anything that happens to it (such as muting).
     *
     * @method setParent
     * @param parent {AudioManager} The parent to connect to, or `null` to connect to the global context
     * @return {AudioManager} Returns itself.
     * @chainable
     */
    setParent: function(parent) {
        this.parent = parent;

        if(support.webAudio) {
            //attach to parent gain
            if(parent && parent.masterGain) {
                this.masterGain.connect(parent.masterGain);
            }
            //attach to audio context
            else {
                this.masterGain.connect(this.ctx.destination);
            }
        }

        return this;
    },
    /**
     * Attaches an AudioPlayer to this manager, if using webAudio this means
     * that the sound will connect to this masterGain node and inherit anything
     * that happens to it (such as muting).
     *
     * @method attach
     * @param sound {AudioPlayer} The player to attach to this manager
     * @return {AudioPlayer} The newly attached audio player
     */
    attach: function(sound) {
        if(sound._manager !== this) {
            //remove from other manager
            if(sound._manager)
                sound._manager.detach(sound);

            this.sounds[sound.key] = sound;
            sound._manager = this;

            if(support.webAudio) {
                for(var i = 0; i < sound._nodes.length; ++i) {
                    sound._nodes[i].connect(this.masterGain);
                }
            }
        }

        return sound;
    },
    /**
     * Detaches an AudioPlayer from this manager, if using webAudio this means
     * that the sound will disconnect from this masterGain node and stop inheriting
     * anything that happens to it (such as muting).
     *
     * @method detach
     * @param sound {AudioPlayer} The player to detach from this manager
     * @return {AudioPlayer} The detached audio player
     */
    detach: function(sound) {
        if(sound._manager !== this) {
            delete this.sounds[sound.key];
            sound._manager = null;

            if(support.webAudio) {
                for(var i = 0; i < sound._nodes.length; ++i) {
                    sound._nodes[i].disconnect();
                }
            }
        }

        return sound;
    },
    /**
     * Creates a new audio player for a peice of audio
     *
     * @method add
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
    /**
     * Removes an audio player from the manager
     *
     * @method remove
     * @param key {String} The unique cache key for the preloaded audio
     * @return {AudioPlayer} Will return the audio player removed, or false if none was removed
     */
    remove: function(key) {
        var audio = this.sounds[key];

        if(audio) {
            audio.stop();
        }

        delete this.sounds[key];

        return audio ? audio : false;
    }
});


/**
 * The master volume of all the audio playing
 *
 * @property volume
 * @type Number
 * @default 1
 */
Object.defineProperty(AudioManager.prototype, 'volume', {
    get: function() {
        return this._volume;
    },
    set: function(v) {
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
    }
});

module.exports = AudioManager;
