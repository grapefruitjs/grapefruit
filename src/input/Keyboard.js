/**
 * Controls keyboard input
 *
 * @class Keyboard
 * @namespace input
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
gf.input.Keyboard = function(view) {
    gf.input.Input.call(this, view);

    /**
     * Tracks if a key is already down, so we don't repeat
     *
     * @property keydown
     * @type Object
     * @readOnly
     */
    this.keydown = {};

    /**
     * The current sequence of keys that have been pressed
     *
     * @property sequence
     * @type Array<Number>
     * @readOnly
     */
    this.sequence = [];

    /**
     * The amount of time it takes for the sequence to clear out, in ms
     *
     * @property sequenceTimeout
     * @type Number
     * @default 500
     */
    this.sequenceTimeout = 500;

    /**
     * The timeout ID for the wait to clear the input sequence
     *
     * @property _clearSq
     * @type Number
     * @private
     */
    this._clearSq = null;

    document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    document.addEventListener('keyup', this.onKeyUp.bind(this), false);
};

gf.inherits(gf.input.Keyboard, gf.input.Input, {
    //on keydown event set gf.controls keycode's action as active
    //and call any registered callbacks
    onKeyDown: function(e, override) {
        if(e.target === this.view)
            return this.modifyKey(e, override || e.keyCode || e.which, true);
    },
    onKeyUp: function(e, override) {
        if(e.target === this.view)
            return this.modifyKey(e, override || e.keyCode || e.which, false);
    },
    modifyKey: function(e, key, val) {
        //process the single key
        var pkey = this.processKey(e, key, val);

        //update the key sequence
        this.sequence.push(key);

        //process current sequence
        var pseq = this.processKey(e, this.sequence.toString(), val);

        //set timeout to clear sequence
        clearTimeout(this._clearSq);
        this._clearSq = setTimeout(this._clearSequence.bind(this), this.sequenceTimeout);

        //if either is false, then return false
        return pkey && pseq;
    },
    processKey: function(e, key, val) {
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
    },
    _clearSequence: function() {
        this.sequence.length = 0;
    }
});