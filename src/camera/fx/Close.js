gf.Camera.fx.Close = function() {
    gf.Camera.fx.Effect.call(this);
};

gf.inherits(gf.Camera.fx.Close, gf.Camera.fx.Effect, {
    start: function(shape, duration, pos, cb) {
        gf.Camera.fx.Effect.prototype.start.call(this);

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

        this.shape = shape || 'circle';
        this.duration = duration && duration > 0 ? duration : 1000;
        this.cb = cb;

        this.cx = pos ? pos.x : this.parent.size.x / 2;
        this.cy = pos ? pos.y : this.parent.size.y / 2;
        this.w = this.mx = this.parent.size.x;
        this.h = this.my = this.parent.size.y;
        this.radius = this.maxRadius = Math.max(this.w / 2, this.h / 2);
        console.log(this.cx, this.cy, this.radius);

        this.gfx.visible = true;
        this.gfx.position.x = this.cx;
        this.gfx.position.y = this.cy;

        this.parent.game.world.mask = this.gfx;

        if(shape === 'ellipse') {
            this.gfx.scale.y = 0.5;
        }
        else {
            this.gfx.scale.y = 1;
        }

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
            case 'ellipse':
            case 'circle':
                this.radius -= (part * this.maxRadius);

                if(this.radius <= 0) {
                    this.stop();
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
                    this.stop();
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