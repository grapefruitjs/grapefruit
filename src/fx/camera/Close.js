var Effect = require('./Effect'),
    inherit = require('../../utils/inherit');

/**
 * Close camera effect. This effect creates a mask on the world that will animated to cover
 * the screen working from the outside-in. It is like a camera shutter "closing" around the target
 *
 * @class fx.camera.Close
 * @extends fx.camera.Effect
 * @constructor
 */
var Close = function() {
    Effect.call(this);
};

inherit(Close, Effect, {
    /**
     * Starts running the effect
     *
     * @method start
     * @param [shape='circle'] {String} The shape to close with, can be either 'ellipse', 'circle', or 'rectangle'
     * @param [duration=1000] {Number} Number of milliseconds for the animation to complete
     * @param [position] {Vector} The position for the animation to close in on, defaults to camera center
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Close} Returns itself.
     * @chainable
     */
    start: function(shape, duration, pos, cb) {
        if(typeof pos ==='function') {
            cb = pos;
            pos = null;
        }

        if(typeof duration === 'function') {
            cb = duration;
            pos = null;
            duration = null;
        }

        if(typeof shape === 'function') {
            cb = shape;
            pos = null;
            duration = null;
            shape = null;
        }

        Effect.prototype.start.call(this, cb);

        this.shape = shape || 'circle';
        this.duration = duration && duration > 0 ? duration : 1000;

        this.cx = pos ? pos.x : this.parent.size.x / 2;
        this.cy = pos ? pos.y : this.parent.size.y / 2;
        this.w = this.mx = this.parent.size.x;
        this.h = this.my = this.parent.size.y;
        this.radius = this.maxRadius = Math.max(this.w / 2, this.h / 2);

        this.gfx.visible = true;
        this.gfx.position.x = this.cx;
        this.gfx.position.y = this.cy;

        this.parent.state.mask = this.gfx;

        if(shape === 'ellipse') {
            this.gfx.scale.y = 0.5;
        }
        else {
            this.gfx.scale.y = 1;
        }

        return this;
    },
    /**
     * Stops running the effect, and removes it from display
     *
     * @method stop
     * @return {fx.camera.Close} Returns itself.
     * @chainable
     */
    stop: function() {
        Effect.prototype.stop.call(this);

        this.radius = this.sx = this.sy = 0;
        this.gfx.visible = false;

        if(this.parent.state.mask === this.gfx)
            this.parent.state.mask = null;

        return this;
    },
    /**
     * Called internally by the camera each frame to update the effect
     *
     * @method update
     * @return {fx.camera.Close} Returns itself.
     * @chainable
     * @private
     */
    update: function(dt) {
        if(this.done) return;

        var part = (dt * 1000) / this.duration;

        this.gfx.clear();
        this.gfx.beginFill(0xff00ff);

        switch(this.shape) {
            case 'ellipse':
            case 'circle':
                this.radius -= (part * this.maxRadius);

                if(this.radius <= 0) {
                    this._complete();
                } else {
                    this.gfx.drawCircle(0, 0, this.radius);
                }
                break;

            case 'rect':
            case 'rectangle':
                this.w -= (part * this.mx);
                this.h -= (part * this.my);

                if(this.w <= 0) {
                    this._complete();
                } else {
                    this.gfx.drawRect(-(this.w / 2), -(this.h / 2), this.w, this.h);
                }
                break;
        }
        this.gfx.endFill();

        return this;
    }
});

module.exports = Close;
