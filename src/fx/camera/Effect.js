var Container = require('../../display/Container'),
    inherit = require('../../utils/inherit'),
    Graphics = require('../../display/Graphics');

/**
 * Base camera effect class.
 *
 * @class fx.camera.Effect
 * @extends Container
 * @constructor
 */
var Effect = function() {
    Container.call(this);

    /**
     * A graphics instance that can be used by effects to draw
     *
     * @property gfx
     * @type Graphics
     */
    this.gfx = this.addChild(new Graphics());
    this.gfx.visible = false;

    /**
     * Whether or not the effect has completed, and is no longer runnning.
     *
     * @property done
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.done = true;
};

inherit(Effect, Container, {
    /**
     * Starts running the effect
     *
     * @method start
     * @param [callback] {Function} Called when the animation completes
     * @return {Effect} Returns itself.
     * @chainable
     */
    start: function(cb) {
        this.done = false;
        this.cb = cb;
        return this;
    },
    /**
     * Stops running the effect
     *
     * @method stop
     * @return {Effect} Returns itself.
     * @chainable
     */
    stop: function() {
        this.done = true;
        return this;
    },
    /**
     * Called internally by the camera each frame to update the effect
     *
     * @method update
     * @return {Effect} Returns itself.
     * @chainable
     * @private
     */
    update: function() {
        return this;
    },
    /**
     * Called when the effect finishes to call the registered callback (if there is one).
     * If the callback explicitly returns `false` then `.stop()` will not be called. `done`
     * will still be set to `true`but the effect will not be removed from the display.
     *
     * This is useful if you want to run an animation and keep the final state active until
     * you manually remove the item with `.stop()`. For example: fading to black then running
     * some async process, then removing the black manually.
     *
     * @method _complete
     * @private
     */
    _complete: function() {
        this.done = true;

        if(typeof this.cb === 'function') {
            var ret = this.cb();

            if(ret !== false)
                this.stop();
        } else {
            this.stop();
        }
    }
});

module.exports = Effect;
