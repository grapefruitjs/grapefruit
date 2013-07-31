/**
 * Bindable Gamepad Axes
 *
 * @property GP_AXIS
 * @type Object
 * @static
 */
 gf.input.GP_AXIS = {
    LEFT_ANALOGUE_HOR: 0,
    LEFT_ANALOGUE_VERT: 1,
    RIGHT_ANALOGUE_HOR: 2,
    RIGHT_ANALOGUE_VERT: 3
};
gf.input.getGpAxisName = function(i) {
    for(var k in gf.input.GP_AXIS) {
        if(gf.input.GP_AXIS[k] === i) {
            return k;
        }
    }

    return '';
};
/**
 * Controls gamepad stick input
 *
 * @class GamepadSticks
 * @extends gf.input.Input
 * @namespace gf.input
 * @constructor
 */
 gf.input.GamepadSticks = function() {
    gf.input.Input.call(this);

    /**
     * The threshold at which we consider a stick moved from center
     *
     * @property threshold
     * @type Number
     * @default 0.5
     */
    this.threshold = 0.5;

    /**
     * Track the status of each of the axes
     *
     * @property axes
     * @type Object
     * @private
     */
    this.axes = {};

    //setup default objects for each axis
    for(var ax in gf.input.GP_AXIS) {
        this.axes[gf.input.GP_AXIS[ax]] = {
            code: gf.input.GP_AXIS[ax],
            name: ax,
            value: 0
        };
    }
};

gf.inherits(gf.input.GamepadSticks, gf.input.Input, {
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