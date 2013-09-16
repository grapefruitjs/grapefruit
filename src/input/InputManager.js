var utils = require('../utils/utils'),
    Keyboard = require('./Keyboard'),
    Gamepad = require('./Gamepad');

/**
 * Manages all input handlers in a unified way
 *
 * @class InputManager
 * @extends Object
 * @namespace gf
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
var InputManager = module.exports = function(game) {
    /**
     * The game instance this manager belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The dom element to bind events to
     *
     * @property canvas
     * @type Game
     */
    this.canvas = game.canvas;

    /**
     * Holds the keyboard handler for keyboard events
     *
     * @property keyboard
     * @type Keyboard
     * @readOnly
     */
    this.keyboard = new Keyboard(this.canvas);

    /**
     * Holds the gamepad handler for gamepad events
     *
     * @property gamepad
     * @type Keyboard
     * @readOnly
     */
    this.gamepad = new Gamepad();
};

utils.inherits(InputManager, Object, {
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