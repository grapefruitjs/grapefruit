/**
 * Bindable Gamepad Axes
 *
 * @property GP_AXIS
 * @type Object
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
}
/**
 * Controls gamepad stick input
 *
 * @class GamepadSticks
 * @namespace input
 * @constructor
 */
 gf.input.GamepadSticks = function() {
    gf.input.Input.call(this);

    /**
     * The threshold at which we consider a stick "moved"
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
        this.axes[ax] = {
            code: ax,
            negative: false,
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
                neg = (ax < 0),
                status = this.axes[a];

            //if the difference between the last value and the new one is greater
            //than the threashold set, call the event for that axis.
            //We also always emit 0 because if your threshold is too high, it will
            //never reset to 0
            if(Math.abs(status.value - ax) >= this.threshold || (status.value !== 0 && ax === 0)) {
                status.negative = neg;
                status.value = ax;

                this.emit(a, status);
            }
        }
    }
});