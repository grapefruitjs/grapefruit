var Effect = require('./Effect'),
    inherit = require('../../utils/inherit');

/**
 * Fade the screen into a color. This will fade into a color that will
 * eventually cover the screen.
 *
 * @class fx.camera.Fade
 * @extends fx.camera.Effect
 * @constructor
 */
var Fade = function() {
    Effect.call(this);
};

inherit(Fade, Effect, {
    /**
     * Starts running the effect
     *
     * @method start
     * @param [color=0xFFFFFF] {Number} The color to fade into
     * @param [duration=1000] {Number} The time it should take (in milliseconds) to fade in
     * @param [alpha=1] {Number} The opacity to fade into (final opacity)
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Fade} Returns itself.
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

        color = typeof color === 'number' ? color : 0xFFFFFF;
        this.goal = alpha || 1;
        this.duration = duration && duration > 0 ? duration : 1000;

        this.gfx.visible = true;
        this.gfx.alpha = 0;
        this.gfx.clear();
        this.gfx.beginFill(color);
        this.gfx.drawRect(0, 0, this.parent.size.x, this.parent.size.y);

        return this;
    },
    /**
     * Stops running the effect, and removes it from display
     *
     * @method stop
     * @return {fx.camera.Fade} Returns itself.
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
     * @return {fx.camera.Fade} Returns itself.
     * @chainable
     * @private
     */
    update: function(dt) {
        if(this.done) return;

        if(this.gfx.alpha < this.goal) {
            this.gfx.alpha += (dt * 1000) / this.duration;

            if(this.gfx.alpha >= this.goal) {
                this._complete();
            }
        }

        return this;
    }
});

module.exports = Fade;
