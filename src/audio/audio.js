(function() {
    //the list of audio channels
    var playing = {},
        resetTime = 0;

    gf.audio = {
        //have we initialized the audio already?
        _initialized: false,

        init: function() {
            if(gf.audio._initialized) return;

            //activeAudioExt = gf.audio.getSupportedAudioFormat(!!format ? format.toString() : 'mp3');

            gf.audio._initialized = true;
        },
        play: function(soundid, opts, cb) {
            if(!gf.resources[soundid]) return this;

            if(typeof opts == 'function') {
                cb = opts;
                opts = null;
            }

            opts = opts || {};

            //paused
            if(playing[soundid]) {
                playing[soundid].play();
                return this;
            }

            var sound = playing[soundid] = gf.resources[soundid].data;
            sound.loop = opts.loop || false;
            sound.volume = opts.volume || 1.0;
            sound.play();

            if(!opts.loop) {
                sound.addEventListener('ended', function(e) {
                    sound.removeEventListener('ended', arguments.callee, false);
                    sound.pause();
                    sound.currentTime = resetTime;
                    delete playing[soundid];
                    if(cb) cb();
                }, false);
            }

            return this;
        },
        stop: function(soundid) {
            if(!playing[soundid]) return this;

            playing[soundid].pause();
            playing[soundid].currentTime = resetTime;
            delete playing[soundid];

            return this;
        },
        stopAll: function() {
            for(var sid in playing) {
                gf.audio.stop(sid);
            }
        },
        pause: function(soundid) {
            if(!playing[soundid]) return this;

            playing[soundid].pause();

            return this;
        },
        pauseAll: function() {
            for(var sid in playing) {
                gf.audio.pause(sid);
            }
        },
        isPlaying: function(soundid) {
            return !!playing[soundid];
        }
    };
})();