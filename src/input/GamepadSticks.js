gf.input.GamepadSticks = function(man, game) {
    gf.input.Input.call(this, man, game);

    /**
     * The threshold at which we consider a stick "moved"
     *
     * @property threshold
     * @type Number
     * @default 0.5
     */
    this.threshold = 0.5;

    //track the status of the axes
    this.axes = {};
};

gf.inherits(gf.input.GamepadSticks, gf.input.Input, {
    bind: function(code, negative, action, cb) {
        negative = !!negative; //I want negative to be true/false, not truthy or falsey

        return this._doBind(code + negative, action, cb);
    },
    unbind: function(code, negative, action) {
        negative = !!negative; //I want negative to be true/false, not truthy or falsey

        return this._doUnbind(code + negative, action);
    },
    pollStatus: function(pad) {
        for(var a = 0, al = pad.axes.length; a < al; ++a) {
            var neg = ['true', 'false'];
            for(var i = 0, il = neg.length; i < il; ++i) {
                var v = neg[i];
                if(!this.binds[a + v]) continue;

                var moved = v === 'true' ? (pad.axes[a] < -gf.gamepad.AXIS_THRESHOLD) : (pad.axes[a] > gf.gamepad.AXIS_THRESHOLD);

                if(!this.axes[a + v])
                    this.axes[a + v] = { moved: false, code: a, negative: v === 'true' };

                this.axes[a + v].val = pad.axes[a];

                //movement state updated
                if(this.axes[a + v].moved !== moved) {
                    this.axes[a + v].moved = moved;
                    this.status[this.binds[a + v]] = moved;
                    this.runCallbacks(a + v, [pad.axes[a]]);
                }
            }
        }
    }
});