var Effect = require('./Effect'),
    inherit = require('../../utils/inherit'),
    C = require('../../constants');

/**
 * Adds arcade-style scanlines to the camera viewport.
 *
 * @class fx.camera.Scanlines
 * @extends fx.camera.Effect
 * @constructor
 */
var Scanlines = function() {
    Effect.call(this);
};

inherit(Scanlines, Effect, {
    /**
     * Starts running the effect
     *
     * @method start
     * @param [color=0x000000] {Number} The color for the scanlines to be
     * @param [axis=gf.AXIS.HORIZONTAL] {gf.AXIS} The axis to draw the lines on
     * @param [spacing=4] {Number} Number of pixels between each line
     * @param [thickness=1] {Number} Number of pixels thick each line is
     * @param [alpha=0.3] {Number} The opacity of the lines
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Scanlines} Returns itself.
     * @chainable
     */
    start: function(color, axis, spacing, thickness, alpha, cb) {
        if(typeof alpha ==='function') {
            cb = alpha;
            alpha = null;
        }

        if(typeof thickness === 'function') {
            cb = thickness;
            alpha = null;
            thickness = null;
        }

        if(typeof spacing === 'function') {
            cb = spacing;
            alpha = null;
            thickness = null;
            spacing = null;
        }

        if(typeof axis === 'function') {
            cb = spacing;
            alpha = null;
            thickness = null;
            spacing = null;
            axis = null;
        }

        if(typeof color === 'function') {
            cb = spacing;
            alpha = null;
            thickness = null;
            spacing = null;
            axis = null;
            color = null;
        }

        Effect.prototype.start.call(this, cb);

        color = color || 0x000000;
        axis = axis || C.AXIS.HORIZONTAL;
        spacing = spacing || 4;
        thickness = thickness || 1;
        alpha = alpha || 0.3;

        var sx = this.parent.size.x,
            sy = this.parent.size.y;

        this.gfx.clear();
        this.gfx.visible = true;
        this.gfx.beginFill(color, alpha);

        //draw the lines
        if(axis & C.AXIS.VERTICAL) {
            for(var x = 0; x < sx; x += spacing) {
                this.gfx.drawRect(x, 0, thickness, sy);
            }
        }

        if(axis & C.AXIS.HORIZONTAL) {
            for(var y = 0; y < sy; y += spacing) {
                this.gfx.drawRect(0, y, sx, thickness);
            }
        }
        this.gfx.endFill();

        return this;
    },
    /**
     * Stops running the effect, and removes it from display
     *
     * @method stop
     * @return {fx.camera.Scanlines} Returns itself.
     * @chainable
     */
    stop: function() {
        Effect.prototype.stop.call(this);

        this.gfx.visible = false;

        return this;
    }
});

module.exports = Scanlines;
