var Effect = require('./Effect'),
    inherit = require('../../utils/inherit');

/**
 * Flash the screen with a color. This will cover the screen in a
 * color then fade it out.
 *
 * @class fx.camera.Flash
 * @extends fx.camera.Effect
 * @constructor
 */
var Flash = function() {
    Effect.call(this);
};

inherit(Flash, Effect, {
    /**
     * Starts running the effect
     *
     * @method start
     * @param [color=0xFFFFFF] {Number} The color to flash the screen with
     * @param [duration=1000] {Number} The time it should take (in milliseconds) to fade out
     * @param [alpha=1] {Number} The opacity of the initial flash of color (start opacity)
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Flash} Returns itself.
     * @chainable
     */
    start: function(color, duration, alpha, cb) {
        if(typeof alpha === 'function') {
            cb = duration;
            alpha = null;
        }

        if(typeof duration === 'function') {
            cb = duration;
            alpha = null;
            duration = null;
        }

        if(typeof color === 'function') {
            cb = color;
            alpha = null;
            duration = null;
            color = null;
        }

        Effect.prototype.start.call(this, cb);

        alpha = alpha || 1;
        color = typeof color === 'number' ? color : 0xFFFFFF;
        this.duration = duration && duration > 0 ? duration : 1000;

        this.gfx.visible = true;
        this.gfx.alpha = alpha;
        this.gfx.clear();
        this.gfx.beginFill(color);
        this.gfx.drawRect(0, 0, this.parent.size.x, this.parent.size.y);

        return this;
    },
    /**
     * Stops running the effect, and removes it from display
     *
     * @method stop
     * @return {fx.camera.Flash} Returns itself.
     * @chainable
     */
    stop: function() {
        Effect.prototype.stop.call(this);

        this.gfx.alpha = 0;
        this.gfx.visible = false;

        return this;
    },
    /**
     * Called internally by the camera each frame to update the effect
     *
     * @method update
     * @return {fx.camera.Flash} Returns itself.
     * @chainable
     * @private
     */
    update: function(dt) {
        if(this.done) return;

        if(this.gfx.alpha > 0) {
            this.gfx.alpha -= (dt * 1000) / this.duration;

            if(this.gfx.alpha <= 0) {
                this._complete();
            }
        }

        return this;
    }
});

module.exports = Flash;
