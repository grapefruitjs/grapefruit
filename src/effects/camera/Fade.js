var Effect = require('./Effect'),
    core = require('../../core/core');

var Fade = module.exports = function() {
    Effect.call(this);
};

core.utils.inherits(Fade, Effect, {
    start: function(color, duration, alpha, cb) {
        Effect.prototype.start.call(this);

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

        color = typeof color === 'number' ? color : 0xFFFFFF;
        this.goal = alpha || 1;
        this.duration = duration && duration > 0 ? duration : 1000;
        this.cb = cb;

        this.gfx.visible = true;
        this.gfx.alpha = 0;
        this.gfx.clear();
        this.gfx.beginFill(color);
        this.gfx.drawRect(0, 0, this.parent.size.x, this.parent.size.y);

        return this;
    },
    stop: function() {
        Effect.prototype.stop.call(this);

        this.gfx.alpha = 0;
        this.gfx.visible = false;

        return this;
    },
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