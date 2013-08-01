gf.Camera.fx.Close = function() {
    gf.Camera.fx.Effect.call(this);
};

gf.inherits(gf.Camera.fx.Close, gf.Camera.fx.Effect, {
    start: function(shape, duration, cb) {
        gf.Camera.fx.Effect.prototype.start.call(this);

        if(typeof duration === 'function') {
            cb = duration;
            duration = null;
        }

        if(typeof shape === 'function') {
            cb = shape;
            duration = null;
            shape = null;
        }

        this.shape = shape || 'circle';
        this.duration = duration && duration > 0 ? duration : 1000;
        this.cb = cb;

        if(shape === 'circle') {
            this.cx = this.parent.size.x / 2;
            this.cy = this.parent.size.y / 2;
            this.radius = this.maxRadius = Math.max(this.parent.size.x / 2, this.parent.size.y / 2);
        } else {
            this.x = 0;
            this.y = 0;
            this.w = this.mx = this.parent.size.x;
            this.h = this.my = this.parent.size.y;
        }

        this.gfx.visible = true;
        this.parent.game.world.mask = this.gfx;

        return this;
    },
    stop: function() {
        gf.Camera.fx.Effect.prototype.stop.call(this);

        this.radius = this.sx = this.sy = 0;
        this.gfx.visible = false;

        if(this.parent.game.world.mask === this.gfx)
            this.parent.game.world.mask = null;

        return this;
    },
    update: function(dt) {
        if(!this.gfx.visible)
            return;

        var part = (dt * 1000) / this.duration;

        this.gfx.clear();
        this.gfx.beginFill(0xff00ff);

        switch(this.shape) {
            case 'circle':
                this.radius -= (part * this.maxRadius);

                if(this.radius <= 0) {
                    this.stop();
                    this._complete();
                } else {
                    this.gfx.drawCircle(this.cx, this.cy, this.radius);
                }
                break;

            case 'rect':
            case 'rectangle':
                this.x += (part * this.mx) / 2;
                this.y += (part * this.my) / 2;
                this.w -= (part * this.mx);
                this.h -= (part * this.my);

                if(this.x >= (this.mx / 2)) {
                    this.stop();
                    this._complete();
                } else {
                    this.gfx.drawRect(this.x, this.y, this.w, this.h);
                }
                break;
        }

        return this;
    }
});