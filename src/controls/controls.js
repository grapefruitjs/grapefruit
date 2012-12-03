(function() {
    gf.controls = {
        $doc: null,

        //maps a keycode to an action
        keybinds: {},

        //maps an action to callbacks
        callbacks: {},

        //tracks the status of each action
        actstatus: {},

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.controls._initialized) return;

            this.$doc = $(document).on({
                keydown: $.proxy(this.onKeyDown, this),
                keyup: $.proxy(this.onKeyUp, this)
            });

            gf.controls._initialized = true;
        },
        //binds an action to a keycode
        bindKey: function(keycode, action, fn) {
            this.keybinds[keycode] = action;
            this.actstatus[action] = false;

            if(fn) {
                if(this.callbacks[action]) this.callbacks[action].push(fn);
                else this.callbacks[action] = [fn];
            }

            return this;
        },
        //unbind an action from a keycode
        unbindKey: function(keycode) {
            delete this.keybinds[keycode];

            //leak callbacks and action status

            return this;
        },
        //on keydown event set this keycode's action as active
        //and call any registered callbacks
        onKeyDown: function(e) {
            //if this key is bound
            if(this.keybinds[e.which]) {
                e.preventDefault();

                //track that this action is active
                this.actstatus[this.keybinds[e.which]] = true;

                //call each callback
                var cbs = this.callbacks[this.keybinds[e.which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        cbs[i](this.keybinds[e.which], true);
                    }
                }
            }

            return this;
        },
        onKeyUp: function(e) {
            //if this key is bound
            if(this.keybinds[e.which]) {
                e.preventDefault();

                //track that this action is active
                this.actstatus[this.keybinds[e.which]] = false;

                //call each callback
                var cbs = this.callbacks[this.keybinds[e.which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        cbs[i](this.keybinds[e.which], false);
                    }
                }
            }

            return this;
        },
        isActionActive: function(action) {
            return this.actstatus[action];
        }
    };
})();