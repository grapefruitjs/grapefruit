(function() {
    gf.gui = {
        //have we initialized the gui already?
        _initialized: false,

        init: function() {
            if(gf.gui._initialized) return;

            gf.gui._initialized = true;
        }
    };
})();