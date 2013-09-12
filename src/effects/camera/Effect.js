var core = require('../../core/core');

var Effect = module.exports = function() {
    core.DisplayObjectContainer.call(this);

    this.addChild(this.gfx = new PIXI.Graphics());
    this.gfx.visible = false;

    this.done = true;
};

core.utils.inherits(Effect, core.DisplayObjectContainer, {
    start: function() {
        this.done = false;
        return this;
    },
    stop: function() {
        this.done = true;
        return this;
    },
    update: function() {
        return this;
    },
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

/**
 * Camera directions, used for certain effects (like shake and scanlines)
 *
 * @property DIRECTION
 * @type Object
 * @static
 */
Effect.DIRECTION = {
    BOTH: 0,
    HORIZONTAL: 1,
    VERTICAL: 2
};
