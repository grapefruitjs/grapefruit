(function() {
    gf.controls = {
        key: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many keys an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {}
        },
        gpButton: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {}
        },
        gpStick: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {}
        },

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.controls._initialized) return;

            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);

            gf.controls._initialized = true;
        },
        //binds an action to a keycode
        bindKey: function(keycode, action, fn) {
            return this._doBind('key', keycode, action, fn);
        },
        //binds an action to a gamepad button
        bindGamepadButton: function(code, action, fn) {
            return this._doBind('gpButton', code, action, fn);
        },
        //bind an action to a stick movement
        bindGamepadStick: function(code, negative, action, fn) {
            negative = negative ? true : false; //I want this to be true/false, not truthy or falsey

            return this._doBind('gpStick', code.toString() + negative, action, fn);
        },
        //unbind an action from a keycode
        unbindKey: function(keycode) {
            return this._doUnbind('key', keycode);
        },
        //unbind an action from a gamepad button
        unbindGamepadButton: function(code) {
            return this._doUnbind('gpButton', code);
        },
        //bind an action to a stick movement
        unbindGamepadStick: function(code, negative) {
            negative = negative ? true : false; //I want this to be true/false, not truthy or falsey

            return this._doUnbind('gpStick', code.toString() + negative);
        },
        //on keydown event set this keycode's action as active
        //and call any registered callbacks
        onKeyDown: function(e) {
            //if this key is bound
            if(this.key.binds[e.which]) {
                e.preventDefault();

                //track that this action is active
                this.key.status[this.key.binds[e.which]] = true;

                //call each callback
                var cbs = this.key.callbacks[this.key.binds[e.which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        if(cbs[i].code === e.which)
                            cbs[i].fn(this.key.binds[e.which], true);
                    }
                }
            }

            return this;
        },
        onKeyUp: function(e) {
            //if this key is bound
            if(this.key.binds[e.which]) {
                e.preventDefault();

                //track that this action is active
                this.key.status[this.key.binds[e.which]] = false;

                //call each callback
                var cbs = this.key.callbacks[this.key.binds[e.which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        cbs[i](this.key.binds[e.which], false);
                    }
                }
            }

            return this;
        },
        isActionActive: function(action) {
            return this.key.status[action] ||
                    this.gpButton.status[action] ||
                    this.gpStick.status[action];
        },
        _doBind: function(type, code, action, fn) {
            this[type].binds[code] = action;
            this[type].bindCount[action]++;
            this[type].status[action] = false;

            if(fn) {
                if(this[type].callbacks[action]) this[type].callbacks[action].push({ code: code, fn: fn });
                else this[type].callbacks[action] = [{ code: code, fn: fn }];
            }

            return this;
        },
        _doUnbind: function(type, code) {
            var act = this[type].binds[code];

            delete this[type].binds[code];

            this[type].bindCount[action]--;

            if(this[type].bindCount <= 0) {
                this[type].bindCount = 0;
                delete this[type].status[action];
                delete this[type].callbacks[action];
            }

            return this;
        },
    };
})();