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
        play: function(soundid, loop, cb) {
            if(!gf.resources[soundid]) return this;

            //paused
            if(playing[soundid]) {
                playing[soundid].play();
                return this;
            }

            var sound = playing[soundid] = gf.resources[soundid].data;
            sound.loop = loop || false;
            sound.play();

            if(!loop) {
                sound.addEventListener('ended', function(e) {
                    sound.removeEventListener('ended', arguments.callee, false);
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
        pause: function(soundid) {
            if(!playing[soundid]) return this;

            playing[soundid].pause();

            return this;
        }
    };
})();