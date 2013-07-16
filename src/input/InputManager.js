/**
 * Manages all input handlers in a unified way
 *
 * @class InputManager
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
     * @private
     */
    this.keyboard = new gf.input.Keyboard(view);

    /**
     * Holds the gamepad handler for gamepad events
     *
     * @property gamepad
     * @type Keyboard
     * @private
     */
    this.gamepad = new gf.input.Gamepad();
};

gf.inherits(gf.InputManager, Object, {
    update: function(dt) {
        this.gamepad.update(dt);
    },
    isActionActive: function(action) {
        return this.mouse.isActionActive(action) ||
            this.keyboard.isActionActive(action) ||
            this.gamepad.isActionActive(action);
    }
});