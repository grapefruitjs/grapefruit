var AudioPlayer = require('./AudioPlayer'),
    EventEmitter = require('../utils/EventEmitter'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    support = require('../utils/support');

/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 * The GF Audio API was based on [Howler.js](https://github.com/goldfire/howler.js)
 *
 * @class AudioPlayer
 * @extends Object
 * @uses EventEmitter
 * @constructor
 * @param manager {AudioManager} AudioManager instance for this audio player
 * @param audio {Object} The preloaded audio file object
 * @param audio.data {ArrayBuffer|Audio} The actual audio data
 * @param audio.webAudio {Boolean} Whether the file is using webAudio or not
 * @param audio.decoded {Boolean} Whether the data has been decoded yet or not
 * @param [settings] {Object} All the settings for this player instance
 * @param [settings.autoplay=false] {Boolean} Whether to automatically start playing the audio file
 * @param [settings.loop=false] {Boolean} Whether the audio should loop or not
 * @param [settings.pos3d] {Array<Number>} The 3d position of the audio to play in the form [x, y, z]
 * @param [settings.sprite] {Object} The audio sprite, if this audio clip has multiple sounds in it.
 *      This object is in the form `{ 'sound': [start, duration] }`, and you can use them with `.play('sound')`.
 */
var AudioPlayer = function(manager, audio, settings) {
    EventEmitter.call(this);

    /**
     * The source of the audio, the actual URL to load up
     *
     * @property src
     * @type String
     */
    this.src = '';

    /**
     * The game instance this player belongs to
     *
     * @property game
     * @type Game
     */
    this.game = manager.game;

    /**
     * The cache key that uniquely identifies this piece of audio
     *
     * @property key
     * @type String
     */
    this.key = audio.key;

    /**
     * Play the audio immediately after loading
     *
     * @property autoplay
     * @type Boolean
     * @default false
     */
    this.autoplay = false;

    /**
     * Override the format determined from the extension with this extension
     *
     * @property format
     * @type String
     * @default null
     */
    this.format = null;

    /**
     * Replay the audio immediately after finishing
     *
     * @property loop
     * @type Boolean
     * @default false
     */
    this.loop = false;

    /**
     * A 3D position where the audio should sound like it is coming from
     *
     * @property pos3d
     * @type Array<Number>
     * @default [0, 0, -0.5]
     */
    this.pos3d = [0, 0, -0.5];

    /**
     * A sound sprite that maps string keys to [start, duration] arrays. These can
     * be used to put multiple sound bits in one file, and play them separately
     *
     * @property sprite
     * @type Object
     * @default {}
     */
    this.sprite = {};

    /**
     * The volume of the audio player
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
     * The preloaded audio file object
     *
     * @property _file
     * @type Object
     * @private
     */
    this._file = audio;

    /**
     * The current volume of the player
     *
     * @property _volume
     * @type Number
     * @private
     */
    this._volume = 1;

    /**
     * The full duration of the file to play
     *
     * @property _duration
     * @type Number
     * @private
     */
    this._duration = 0;

    /**
     * Has this player data been loaded?
     *
     * @property _loaded
     * @type Boolean
     * @private
     */
    this._loaded = false;

    /**
     * The manager of the player
     *
     * @property _volum_manager
     * @type AudioManager
     * @private
     */
    this._manager = manager;

    /**
     * Does the browser support WebAudio API
     *
     * @property _webAudio
     * @type Boolean
     * @private
     */
    this._webAudio = support.webAudio;

    /**
     * The actual player nodes, these are either WebAudio Nodes
     * or HTML5 Audio elements.
     *
     * @property _nodes
     * @type Array
     * @private
     */
    this._nodes = [];

    /**
     * Array of timeouts to track end events
     *
     * @property _onendTimer
     * @type Array
     * @private
     */
    this._onendTimer = [];

    //mixin user's settings
    utils.setValues(this, settings);

    if(this._webAudio) {
        this._setupAudioNode();
    }

    this._load();

    /**
     * Fired when the player is ready to play
     *
     * @event ready
     * @param source {String} The source URL that will be used as the audio source
     */

    /**
     * Fired when audio starts playing
     *
     * @event play
     * @param id {String} The id of the node that is used to play the audio
     */

    /**
     * Fired when audio is paused
     *
     * @event paused
     * @param id {String} The id of the node that is paused
     */

    /**
     * Fired when audio finishes playing
     *
     * @event end
     * @param id {String} The id of the node that has finished playing
     */
};

inherit(AudioPlayer, Object, {
    /**
     * Load the audio file for this player, this is called from the ctor
     * there is no reason to call it manually.
     *
     * @method _load
     * @return {AudioPlayer}
     * @private
     */
    _load: function() {
        var self = this,
            audio = this._file;

        //if using web audio, load up the buffer
        if(audio.webAudio) {
            //if not yet decoded, decode before loading the buffer
            if(!audio.decoded) {
                this._manager.ctx.decodeAudioData(audio.data, function(buffer) {
                    if(buffer) {
                        audio.data = buffer;
                        audio.decoded = true;
                        self._loadSoundBuffer(buffer);
                    }
                });
            } else {
                this._loadSoundBuffer(audio.data);
            }
        }
        //otherwise create some Audio nodes
        else {
            //create a new adio node
            var node = audio.data.cloneNode();
            this._nodes.push(node);

            //setup the audio node
            node._pos = 0;
            node.volume = this._manager.muted ? 0 : this._volume * this._manager.volume;

            //setup the event listener to start playing the sound when it has buffered
            this._duration = node.duration;

            //setup a default sprite
            this.sprite._default = [0, node.duration * 1000];

            //check if loaded
            if(!this._loaded) {
                this._loaded = true;
                this.emit('ready', this.src);
            }

            //if autoplay then start it
            if(this.autoplay) {
                this.play();
            }
        }

        return this;
    },
    /**
     * Play a sound from the current time (0 by default).
     *
     * @method play
     * @param [sprite] {String} Plays from the specified position in the sound sprite definition.
     * @param [callback] {Function} Returns the unique playback id for this sound instance.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    play: function(sprite, cb) {
        var self = this;

        if(typeof sprite === 'function') {
            cb = sprite;
            sprite = null;
        }

        //if no sprite specified, use default
        if(!sprite) {
            sprite = '_default';
        }

        //if we haven't loaded yet, wait until we do
        if(!this._loaded) {
            this.on('ready', function() {
                self.play(sprite, cb);
            });

            return this;
        }

        //if the sprite doesn't exist, play nothing
        if(!this.sprite[sprite]) {
            if(typeof cb === 'function') cb();
            return this;
        }

        //get an audio node to use to play
        this._inactiveNode(function(node) {
            var pos = node._pos > 0 ? node._pos : self.sprite[sprite][0] / 1000,
            duration = (self.sprite[sprite][1] / 1000) - node._pos,
            loop = (self.loop || self.sprite[sprite][2]),
            soundId = (typeof cb === 'string') ? cb : (Math.round(Date.now() * Math.random()) + ''),
            timerId;

            node._sprite = sprite;

            //after the audio finishes:
            (function(o) {
                timerId = setTimeout(function() {
                    //if looping restsart it
                    if(!self._webAudio && o.loop) {
                        self.stop(o.id, o.timer).play(o.sprite, o.id);
                    }

                    // set web audio node to paused
                    if(self._webAudio && !o.loop) {
                        self._nodeById(o.id).paused = true;
                    }

                    //end the track if it is HTML audio and a sprite
                    if(!self._webAudio && !o.loop) {
                        self.stop(o.id, o.timer);
                    }

                    //fire off the end event
                    self.emit('end', o.id);
                }, duration * 1000);

                //store the timer
                self._onendTimer.push(timerId);

                //remember which timer to kill
                o.timer = timerId;
            })({
                id: soundId,
                sprite: sprite,
                loop: loop
            });

            //setup webAudio functions
            if(self._webAudio) {
                //set the play id to this node and load into context
                node.id = soundId;
                node.paused = false;
                self._refreshBuffer([loop, pos, duration], soundId);
                self._playStart = self._manager.ctx.currentTime;
                node.gain.value = self._volume;

                if(typeof node.bufferSource.start === 'undefined') {
                    node.bufferSource.noteGrainOn(0, pos, duration);
                } else {
                    node.bufferSource.start(0, pos, duration);
                }
            } else {
                if(node.readyState === 4) {
                    node.id = soundId;
                    node.currentTime = pos;
                    node.muted = self._manager.muted;
                    node.volume = self._volume * self._manager.volume;
                    node.play();
                } else {
                    self._clearEndTimer(timerId);

                    (function() {
                        var sound = self,
                            playSpr = sprite,
                            fn = cb,
                            newNode = node;

                        var evt = function() {
                            sound.play(playSpr, fn);

                            //clear listener
                            newNode.removeEventListener('canplaythrough', evt, false);
                        };
                        newNode.addEventListener('canplaythrough', evt, false);
                    })();

                    return self;
                }
            }

            self.emit('play', soundId);

            if(typeof cb === 'function')
                cb(soundId);
        });

        return this;
    },
    /**
     * Pause playback and save the current position.
     *
     * @method pause
     * @param [id] {String} The play instance ID.
     * @param [timerId] {String} Clear the correct timeout ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    pause: function(id, timerId) {
        var self = this;

        //if we haven't loaded this sound yet, wait until we play it to pause it
        if(!this._loaded) {
            this.on('play', function() {
                self.play(id, timerId);
            });

            return this;
        }

        //clear the onend timer
        this._clearEndTimer(timerId || 0);

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                //ensure the sound was created
                if(!activeNode.bufferSource)
                    return this;

                activeNode.paused = true;
                activeNode._pos += this._manager.ctx.currentTime - this._playStart;

                if(typeof activeNode.bufferSource.stop === 'undefined') {
                    activeNode.bufferSource.noteOff(0);
                } else {
                    activeNode.bufferSource.stop(0);
                }
            } else {
                activeNode._pos = activeNode.currentTime;
                activeNode.pause();
            }
        }

        this.emit('pause', activeNode ? activeNode.id : id);

        return this;
    },
    /**
     * Stop playback and reset to start.
     *
     * @method stop
     * @param [id] {String} The play instance ID.
     * @param [timerId] {String} Clear the correct timeout ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    stop: function(id, timerId) {
        var self = this;

        //if we haven't loaded this sound yet, wait until we play it to stop it
        if(!this._loaded) {
            this.on('play', function() {
                self.stop(id, timerId);
            });

            return this;
        }

        //clear onend timer
        this._clearEndTimer(timerId || 0);

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            activeNode._pos = 0;

            if(this._webAudio) {
                if(!activeNode.bufferSource)
                    return this;

                activeNode.paused = true;

                if(typeof activeNode.bufferSource.stop === 'undefined') {
                    activeNode.bufferSource.noteOff(0);
                } else {
                    activeNode.bufferSource.stop(0);
                }
            } else {
                activeNode.pause();
                activeNode.currentTime = 0;
            }
        }

        return this;
    },
    /**
     * Mute this sound.
     *
     * @method mute
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    mute: function(id) {
        return this.setMuted(true, id);
    },
    /**
     * Unmute this sound.
     *
     * @method unmute
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    unmute: function(id) {
        return this.setMuted(false, id);
    },
    /**
     * Set the muted state of this sound.
     *
     * @method setMuted
     * @param muted {Boolean}
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    setMuted: function(muted, id) {
        var self  = this;

        //if we haven't loaded this sound yet, wait until we play it to mute it
        if(!this._loaded) {
            this.on('play', function() {
                self.setMuted(muted, id);
            });

            return this;
        }

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                activeNode.gain.value = muted ? 0 : this._volume;
            } else {
                activeNode.volume =  muted ? 0 : this._volume;
            }
        }

        return this;
    },
    /**
     * Set the position of playback.
     *
     * @method seek
     * @param pos {Number} The position to move current playback to.
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    seek: function(pos, id) {
        var self = this;

        //if we haven't loaded this sound yet, wait until it is to seek it
        if(!this._loaded) {
            this.on('ready', function() {
                self.seek(pos, id);
            });

            return this;
        }

        //if position is < 0, or invalid, then set to 0
        if(!pos || pos < 0)
            pos = 0;

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                activeNode._pos = pos;
                this.pause(activeNode.id).play(activeNode._sprite, id);
            } else {
                activeNode.currentTime = pos;
            }
        }

        return this;
    },
    /**
     * Get the position of playback.
     *
     * @method getPosition
     * @param [id] {String} The play instance ID.
     * @return {Number}
     */
    getPosition: function(id) {
        var self = this;

        //if we haven't loaded this sound yet, wait until it is to seek it
        if(!this._loaded) {
            this.on('ready', function() {
                self.getPosition(id);
            });

            return this;
        }

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                return activeNode._pos + (this._manager.ctx.currentTime - this._playStart);
            } else {
                return activeNode.currentTime;
            }
        }

        return 0;
    },
    /**
     * Fade a currently playing sound between two volumes.
     *
     * @method fade
     * @param from {Number} The volume to fade from (0.0 to 1.0).
     * @param to {Number} The volume to fade to (0.0 to 1.0).
     * @param len {Number} Time in milliseconds to fade.
     * @param [id] {String} The play instance ID.
     * @param [callback] {Function} Fired when the fade is complete.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    fade: function(from, to, len, id, cb) {
        var self = this,
            diff = Math.abs(from - to),
            dir = from > to ? 'dowm' : 'up',
            steps = diff / 0.01,
            stepTime = len / steps;

        if(typeof id === 'function') {
            cb = id;
            id = null;
        }

        //if we haven't loaded this sound yet, wait until it is to seek it
        if(!this._loaded) {
            this.on('ready', function() {
                self.fade(from, to, len, id, cb);
            });

            return this;
        }

        this.setVolume(from, id);

        for(var i = 1; i <= steps; ++i) {
            var change = this._volume + ((dir === 'up' ? 0.01 : -0.01) * i),
                vol = Math.round(1000 * change) / 1000,
                wait = stepTime * i;

            this._doFadeStep(vol, wait, to, id, cb);
        }
    },
    /**
     * Returns the current volume of the player
     *
     * @method getVolume
     * @return {Number} The current volume
     */
    getVolume: function() {
        return this._volume;
    },
    /**
     * Sets the current volume of the player
     *
     * @method setVolume
     * @param vol {Number} The current volume
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    setVolume: function(vol, id) {
        var self = this;

        // make sure volume is a number
        vol = parseFloat(vol);

        //if we haven't loaded this sound yet, wait until we play it to change the volume
        if(!this._loaded) {
            this.on('play', function() {
                self.setVolume(vol, id);
            });

            return this;
        }

        //set the volume
        if(vol >= 0 && vol <= 1) {
            this._volume = vol;

            var activeNode = id ? this._nodeById(id) : this._activeNode();
            if(activeNode) {
                if(this._webAudio) {
                    activeNode.gain.volume = vol;
                } else {
                    activeNode.volume = vol * this._manager.volume;
                }
            }
        }

        return this;
    },
    /**
     * Set the 3D position of the audio source.
     * The most common usage is to set the 'x' position
     * to affect the left/right ear panning. Setting any value higher than
     * 1.0 will begin to decrease the volume of the sound as it moves further away.
     * NOTE: This only works with Web Audio API, HTML5 Audio playback
     * will not be affected.
     *
     * @method setPosition
     * @param x {Number} The x-position of the playback from -1000.0 to 1000.0
     * @param y {Number} The y-position of the playback from -1000.0 to 1000.0
     * @param z {Number} The z-position of the playback from -1000.0 to 1000.0
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer} Returns itself.
     * @chainable
     */
    setPosition: function(x, y, z, id) {
        var self = this;

        //set a default for the optional 'y' and 'z'
        x = !x ? 0 : x;
        y = !y ? 0 : y;
        z = (!z && z !== 0) ? -0.5 : z;

        //if we haven't loaded this sound yet, wait until we play it to change the position
        if(!this._loaded) {
            this.on('play', function() {
                self.setPosition(x, y, z, id);
            });

            return this;
        }

        if(this._webAudio) {
            var activeNode = id ? this._nodeById(id) : this._activeNode();
            if(activeNode) {
                this.pos3d[0] = x;
                this.pos3d[1] = y;
                this.pos3d[2] = z;
                activeNode.panner.setPosition(x, y, z);
            }
        }

        return this;
    },
    /**
     * Performs a step in the fade transition
     *
     * @method _doFadeStep
     * @private
     */
    _doFadeStep: function(vol, wait, end, id, cb) {
        var self = this;

        setTimeout(function() {
            self.setVolume(vol, id);

            if(vol === end) {
                if(typeof cb === 'function')
                    cb();
            }
        }, wait);
    },
    /**
     * Get an audio node by ID.
     *
     * @method _nodeById
     * @return {AudioPlayer} Audio node.
     * @private
     */
    _nodeById: function(id) {
        var node = this._nodes[0]; //default return value

        //find the node with this ID
        for(var i = 0, il = this._nodes.length; i < il; ++i) {
            if(this._nodes[i].id === id) {
                node = this._nodes[i];
                break;
            }
        }

        return node;
    },
    /**
     * Get the first active audio node.
     *
     * @method _activeNode
     * @return {AudioPlayer} Audio node.
     * @private
     */
    _activeNode: function() {
        var node;

        //find the first playing node
        for(var i = 0, il = this._nodes.length; i < il; ++i) {
            if(!this._nodes[i].paused) {
                node = this._nodes[i];
                break;
            }
        }

        //remove excess inactive nodes
        this._drainPool();

        return node;
    },
    /**
     * Get the first inactive audio node.
     * If there is none, create a new one and add it to the pool.
     *
     * @method _inactiveNode
     * @param cb {Function} callback Function to call when the audio node is ready.
     * @private
     */
    _inactiveNode: function(cb) {
        var node;

        //find first inactive node to recycle
        for(var i = 0, il = this._nodes.length; i < il; ++i) {
            if(this._nodes[i].paused && this._nodes[i].readyState === 4) {
                cb(node = this._nodes[i]);
                break;
            }
        }

        //remove excess inactive nodes
        this._drainPool();

        if(node) return;

        //create new node if there are no inactives
        if(this._webAudio) {
            node = this._setupAudioNode();
            cb(node);
        } else {
            this._load();
            node = this._nodes[this.nodes.length - 1];
            node.addEventListener('loadedmetadata', function() {
                cb(node);
            });
        }
    },
    /**
     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
     *
     * @method _drainPool
     * @private
     */
    _drainPool: function() {
        var inactive = 0,
            i = 0, il = 0;

        //count inactive nodes
        for(i = 0, il = this._nodes.length; i < il; ++i) {
            if(this._nodes[i].paused) {
                inactive++;
            }
        }

        //remove excess inactive nodes
        for(i = this._nodes.length - 1; i >= 0; --i) {
            if(inactive <= 5)
                break;

            if(this._nodes[i].paused) {
                inactive--;
                this._nodes.splice(i, 1);
            }
        }
    },
    /**
     * Clear 'onend' timeout before it ends.
     *
     * @method _clearEndTimer
     * @param timerId {Number} timerId The ID of the sound to be cancelled.
     * @private
     */
    _clearEndTimer: function(timerId) {
        var timer = this._onendTimer.indexOf(timerId);

        //make sure the timer is cleared
        timer = timer >= 0 ? timer : 0;

        if(this._onendTimer[timer]) {
            clearTimeout(this._onendTimer[timer]);
            this._onendTimer.splice(timer, 1);
        }
    },
    /**
     * Setup the gain node and panner for a Web Audio instance.
     *
     * @method _setupAudioNode
     * @return {Object} The new audio node.
     * @private
     */
    _setupAudioNode: function() {
        var node = this._manager.ctx.createGain ? this._manager.ctx.createGain() : this._manager.ctx.createGainNode();

        this._nodes.push(node);

        //create gain node
        node.gain.value = this._volume;
        node.paused = true;
        node._pos = 0;
        node.readyState = 4;
        node.connect(this._manager.masterGain);

        //create the panner
        node.panner = this._manager.ctx.createPanner();
        node.panner.setPosition(this.pos3d[0], this.pos3d[1], this.pos3d[2]);
        node.panner.connect(node);

        return node;
    },
    /**
     * Finishes loading the Web Audio API sound and fires the loaded event
     *
     * @method loadSound
     * @param buffer {Object} The decoded buffer sound source.
     * @private
     */
    _loadSoundBuffer: function(buffer) {
        this._duration = buffer ? buffer.duration : this._duration;

        //setup a default sprite
        this.sprite._default = [0, this._duration * 1000];

        //fire the load event
        if(!this._loaded) {
            this._loaded = true;
            this.emit('ready', this.src);
        }

        //if autoplay is appropriate
        if(this.autoplay) {
            this.play();
        }
    },
    /**
     * Load the sound back into the buffer source.
     *
     * @method refreshBuffer
     * @param loop {Array} Loop boolean, pos, and duration.
     * @param [id] {String} The play instance ID.
     * @private
     */
    _refreshBuffer: function(loop, id) {
        var node = this._nodeById(id);

        //setup the buffer source for playback
        node.bufferSource = this._manager.ctx.createBufferSource();
        node.bufferSource.buffer = this._file.data;
        node.bufferSource.connect(node.panner);
        node.bufferSource.loop = loop[0];

        if(loop[0]) {
            node.bufferSource.loopStart = loop[1];
            node.bufferSource.loopEnd = loop[1] + loop[2];
        }
    }
});

module.exports = AudioPlayer;
