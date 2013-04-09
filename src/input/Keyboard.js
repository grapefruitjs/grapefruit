gf.input.Keyboard = function(man, game) {
    gf.input.Input.call(this, man, game);

    /**
     * Tracks if a key is already down, so we don't repeat
     *
     * @property keydown
     * @type Object
     * @readOnly
     */
    this.keydown = {};

    document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    document.addEventListener('keyup', this.onKeyUp.bind(this), false);
};

gf.inherits(gf.input.Keyboard, gf.input.Input, {
    //on keydown event set gf.controls keycode's action as active
    //and call any registered callbacks
    onKeyDown: function(e, override) {
        return this.modifyKey(e, override || e.keyCode || e.which, true);
    },
    onKeyUp: function(e, override) {
        return this.modifyKey(e, override || e.keyCode || e.which, false);
    },
    modifyKey: function(e, key, val) {
        if(this.binds[key]) {
            //Don't fire events for repeats
            if(this.keydown[key] === val)
                return this.preventDefault(e);

            //track that the action has changed state
            this.keydown[key] = val;
            this.status[this.binds[key]] = val;

            //call each callback
            this.runCallbacks(key, [val]);

            return this.preventDefault(e);
        }

        return true;
    }
});