gf.input.Input = function(man, game) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The input manager this belongs to
     *
     * @property manager
     * @type InputManager
     */
    this.manager = man;

    /**
     * The binds that map an action to an input value
     *
     * @property binds
     * @type Object
     * @readOnly
     */
    this.binds = {};

    /**
     * The callbacks that map from an action
     *
     * @property callbacks
     * @type Object
     * @readOnly
     */
    this.callbacks = {};

    /**
     * The count of how many actions an input value is bound to
     *
     * @property callbacks
     * @type Object
     * @readOnly
     */
    this.bindCount = {};

    /**
     * Tracks the status of each action
     *
     * @property status
     * @type Object
     * @readOnly
     */
    this.status = {};
};

gf.inherits(gf.input.Input, Object, {
    _doBind: function(code, action, cb) {
        this.binds[code] = action;
        this.status[action] = false;

        if(!this.bindCount[action])
            this.bindCount[action] = 1;
        else
            this.bindCount[action]++;

        if(cb) {
            if(this.callbacks[action])
                this.callbacks[action].push({ code: code, cb: cb });
            else
                this.callbacks[action] = [{ code: code, cb: cb }];
        }

        return this;
    },
    _doUnbind: function(code, action) {
        //remove the bind (code -> action)
        delete this.binds[code];

        //reduce bind count
        this.bindCount[action]--;

        //if this action isn't bound anymore clean it up
        if(this.bindCount[action] <= 0) {
            this.bindCount[action] = 0;
            delete this.status[action];
            delete this.callbacks[action];
        }

        return gf.controls;
    },
    //helper to prevent default stuffs accross different browsers
    preventDefault: function(e) {
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;

        if(e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        return false;
    },
    bind: function(code, action, cb) {
        return this._doBind(code, action, cb);
    },
    unbind: function(code, action) {
        return this._doUnbind(code, action);
    },
    runCallbacks: function(code, args) {
        args = args || [];
        args.unshift(this.binds[code]);

        var cbs = this.callbacks[this.binds[code]];

        if(cbs)
            for(var i = 0, il = cbs.length; i < il; ++i)
                if(cbs[i].code === code)
                    cbs[i].cb.apply(this, args);
    },
    isActionActive: function(action) {
        return this.status[action];
    }
});