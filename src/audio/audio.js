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
        for(var i = 0, clip; clip = chans[i++];) {
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

    gf.audio = {
        //have we initialized the audio already?
        _initialized: false,

        init: function() {
            if(gf.audio._initialized) return;

            gf.audio._initialized = true;
        },
        play: function(id, opts, cb) {
            if(!gf.resources[id]) {
                console.warn('Tried to play unloaded audio: %s', id);
                return false;
            }

            if(typeof opts == 'function') {
                cb = opts;
                opts = null;
            }

            if(typeof id == 'object') {
                opts = id;
                id = opts.id;
            }

            opts = opts || {};

            opts.id = id;
            opts.loop = opts.loop || settings.loop;
            opts.volume = opts.volume || settings.volume

            //resume a paused channel
            if(opts.channel !== undefined && playing[id]) {
                playing[id][opts.channel].play();
                return opts;
            }

            //we haven't played this sound yet, create a new channel list
            if(!playing[id]) {
                playing[id] = [gf.resources[id].data];
                playing[id][0].channel = 0;
            }

            var sound = getOpen(id);
            sound.loop = opts.loop;
            sound.volume = opts.volume;
            sound.play();

            opts.channel = sound.channel;

            if(!opts.loop) {
                sound.addEventListener('ended', function(e) {
                    sound.removeEventListener('ended', arguments.callee, false);
                    gf.audio.stop(opts);
                    if(cb) cb();
                }, false);
            }

            return opts;
        },
        stop: function(id, channel) {
            if(typeof id == 'object') {
                channel = id.channel;
                id = id.id;
            }

            if(!playing[id]) return;
            if(!playing[id][channel]) return;

            playing[id][channel].pause();
            playing[id][channel].currentTime = resetTime;
            playing[id][channel].ended = true;
        },
        pause: function(id, channel) {
            if(typeof id == 'object') {
                channel = id.channel;
                id = id.id;
            }

            if(!playing[id]) return;
            if(!playing[id][channel]) return;

            playing[id][channel].pause();
        },
        playAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.play({ id: sid, channel: i });
            }
        },
        stopAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.stop(sid, i);
            }
        },
        pauseAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.pause(sid, i);
            }
        }
    };
})();