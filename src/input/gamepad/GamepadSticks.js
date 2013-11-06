var inherit = require('../../utils/inherit'),
    Input = require('../Input');

/**
 * Controls gamepad stick input
 *
 * @class GamepadSticks
 * @extends Input
 * @constructor
 */
var GamepadSticks = function() {
    Input.call(this);

    /**
     * The threshold at which we consider a stick moved from center
     *
     * @property threshold
     * @type Number
     * @default 0.5
     */
    this.threshold = 0.5;

    /**
     * Track the status of each of the axes on the gamepad
     *
     * @property axes
     * @type Object
     */
    this.axes = {};

    //setup default objects for each axis
    for(var ax in GamepadSticks.AXIS) {
        this.axes[GamepadSticks.AXIS[ax]] = {
            code: GamepadSticks.AXIS[ax],
            name: ax,
            value: 0
        };
    }
};

inherit(GamepadSticks, Input, {
    /**
     * Polls the gamepad object for status updates and emits events when they occur
     *
     * @method pollStatus
     * @param pad {Gamepad} The gamepad object to check
     */
    pollStatus: function(pad) {
        for(var a = 0, al = pad.axes.length; a < al; ++a) {
            var ax = pad.axes[a],
                status = this.axes[a];

            //if we have moved off center by threshold, update the value
            if(Math.abs(ax) >= this.threshold) {
                status.value = ax;
            }
            //otherwise, set it back to zero
            else {
                status.value = 0;
            }

            this.emit(a, status);
        }
    }
});

/**
 * Bindable Gamepad Axes
 *
 * @property AXIS
 * @type Object
 * @static
 */
GamepadSticks.AXIS = {
    LEFT_ANALOGUE_HOR: 0,
    LEFT_ANALOGUE_VERT: 1,
    RIGHT_ANALOGUE_HOR: 2,
    RIGHT_ANALOGUE_VERT: 3
};

GamepadSticks.getGpAxisName = function(i) {
    for(var k in GamepadSticks.AXIS) {
        if(GamepadSticks.AXIS[k] === i) {
            return k;
        }
    }

    return '';
};

module.exports = GamepadSticks;
