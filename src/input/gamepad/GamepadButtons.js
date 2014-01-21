var inherit = require('../../utils/inherit'),
    Input = require('../Input');

/**
 * Controls gamepad button input
 *
 * @class GamepadButtons
 * @extends Input
 * @constructor
 */
var GamepadButtons = function() {
    Input.call(this);

    /**
     * The threshold at which we consider a button "pressed"
     *
     * @property threshold
     * @type Number
     * @default 0.4
     */
    this.threshold = 0.4;

    /**
     * Track the status of each button on the gamepad
     *
     * @property buttons
     * @type Object
     */
    this.buttons = {};

    //setup default objects for each axis
    for(var bt in GamepadButtons.BUTTON) {
        this.buttons[GamepadButtons.BUTTON[bt]] = {
            code: GamepadButtons.BUTTON[bt],
            name: bt,
            down: false,
            value: 0
        };
    }
};

inherit(GamepadButtons, Input, {
    /**
     * Polls the gamepad object for status updates and emits events when they occur
     *
     * @method pollStatus
     * @param pad {Gamepad} The gamepad object to check
     */
    pollStatus: function(pad) {
        for(var b = 0, bl = pad.buttons.length; b < bl; ++b) {
            var down = (pad.buttons[b] > this.threshold),
                status = this.buttons[b];

            status.value = pad.buttons[b];

            //down state changed
            if(status.down !== down) {
                status.down = down;

                this.emit(b, status);
            }
        }
    }
});

/**
 * Bindable Gamepad Buttons
 *
 * @property BUTTON
 * @type Object
 * @static
 */
GamepadButtons.BUTTON = {
    FACE_1: 0, // Face (main) buttons
    FACE_2: 1,
    FACE_3: 2,
    FACE_4: 3,
    LEFT_SHOULDER: 4, // Top shoulder buttons
    RIGHT_SHOULDER: 5,
    LEFT_TRIGGER: 6, // Bottom shoulder buttons
    RIGHT_TRIGGER: 7,
    SELECT: 8,
    START: 9,
    LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
    RIGHT_ANALOGUE_STICK: 11,
    PAD_UP: 12, // Directional (discrete) pad
    PAD_DOWN: 13,
    PAD_LEFT: 14,
    PAD_RIGHT: 15,
    SYSTEM_MENU: 16   // on console controllers this would be the button to open the system menu
};

GamepadButtons.getGpButtonName = function(i) {
    for(var k in GamepadButtons.BUTTON) {
        if(GamepadButtons.BUTTON[k] === i) {
            return k;
        }
    }

    return '';
};

module.exports = GamepadButtons;
