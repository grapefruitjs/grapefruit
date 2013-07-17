/**
 * Manages all input handlers in a unified way
 *
 * @class InputManager
 * @extends Object
 * @namespace gf
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
gf.InputManager = function(view) {
    /**
     * The dom element to bind events to
     *
     * @property view
     * @type Game
     */
    this.view = view;

    /**
     * Holds the keyboard handler for keyboard events
     *
     * @property keyboard
     * @type Keyboard
     * @readOnly
     */
    this.keyboard = new gf.input.Keyboard(view);

    /**
     * Holds the gamepad handler for gamepad events
     *
     * @property gamepad
     * @type Keyboard
     * @readOnly
     */
    this.gamepad = new gf.input.Gamepad();
};

gf.inherits(gf.InputManager, Object, {
    /**
     * Called each frame to update state info for some input methods
     *
     * @method update
     * @private
     */
    update: function(dt) {
        this.gamepad.update(dt);
    }
});