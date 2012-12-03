(function() {
    gf.audio = {
        //have we initialized the audio already?
        _initialized: false,

        init: function() {
            if(gf.audio._initialized) return;

            gf.audio._initialized = true;
        }
    };
})();