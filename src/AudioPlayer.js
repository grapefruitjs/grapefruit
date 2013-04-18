/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 *
 * @class AudoPlayer
 * @constructor
 * @param game {Game} Game instance for this audio player
 */
gf.AudioPlayer = function(game) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The pool of audio objects to play sounds with
     *
     * @property playing
     * @type Object
     * @private
     * @readOnly
     */
    this.playing = {};

    /**
     * When stopping or starting a sound, this is the time index to reset to
     *
     * @property resetTime
     * @type number
     * @default 0
     */
    this.resetTime = 0;
};

gf.inherits(gf.AudioPlayer, Object, {
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