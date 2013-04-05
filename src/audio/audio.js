(function() {
    //the list of audio channels
    var playing = {},
        resetTime = 0,
        settings = {
            loop: false,
            volume: 1.0
        };

    function getOpen(id) {
        var chans = playing[id];

        //find an open channel
        for(var i = 0, il = chans.length; i < il; ++i) {
            var clip = chans[i++];
            if(clip.ended || !clip.currentTime) {
                clip.currentTime = resetTime;
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
    }

    /**
     * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
     *
     * @module gf
     * @class audio
     */
    gf.audio = {
        //have we initialized the audio already?
        _initialized: false,

        /**
         * Initializes the audio component
         *
         * @method init
         * @private
         */
        init: function() {
            if(gf.audio._initialized) return;

            gf.audio._initialized = true;
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
            opts.loop = opts.loop || settings.loop;
            opts.volume = opts.volume || settings.volume;

            //resume a paused channel
            if(opts.channel !== undefined && playing[id]) {
                playing[id][opts.channel].play();
                return opts;
            }

            //we haven't played this sound yet, create a new channel list
            if(!playing[id]) {
                playing[id] = [gf.assetCache[id]];
                playing[id][0].channel = 0;
            }

            var sound = getOpen(id);
            sound.loop = opts.loop;
            sound.volume = opts.volume;
            sound.play();

            opts.channel = sound.channel;

            if(!opts.loop) {
                var ended = function() {
                    sound.removeEventListener('ended', ended, false);
                    gf.audio.stop(opts);
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

            if(!playing[id]) return;
            if(!playing[id][channel]) return;

            playing[id][channel].pause();
            playing[id][channel].currentTime = resetTime;
            playing[id][channel].ended = true;
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

            if(!playing[id]) return;
            if(!playing[id][channel]) return;

            playing[id][channel].pause();
        },
        /**
         * Plays all currently paused or stopped audio clips (only ones that have previously been started with gf.play)
         *
         * @method playAll
         */
        playAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.play({ id: sid, channel: i });
            }
        },
        /**
         * Stops all currently paused or playing audio clips
         *
         * @method stopAll
         */
        stopAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.stop(sid, i);
            }
        },
        /**
         * Pauses all currently playing audio clips
         *
         * @method pauseAll
         */
        pauseAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.pause(sid, i);
            }
        }
    };
})();