gf.Camera.fx.Scanlines = function() {
    gf.Camera.fx.Effect.call(this);
};

gf.inherits(gf.Camera.fx.Scanlines, gf.Camera.fx.Effect, {
    start: function(color, direction, spacing, thickness, alpha) {
        gf.Camera.fx.Effect.prototype.start.call(this);

        color = color || 0x000000;
        direction = direction || gf.Camera.fx.DIRECTION.HORIZONTAL;
        spacing = spacing || 4;
        thickness = thickness || 1;
        alpha = alpha || 0.3;

        var sx = this.parent.size.x,
            sy = this.parent.size.y;

        this.gfx.clear();
        this.gfx.visible = true;
        this.gfx.beginFill(color, alpha);

        //draw the lines
        if((direction === gf.Camera.fx.DIRECTION.BOTH) || (direction === gf.Camera.fx.DIRECTION.VERTICAL)) {
            for(var x = 0; x < sx; x += spacing) {
                this.gfx.drawRect(x, 0, thickness, sy);
            }
        }

        if((direction === gf.Camera.fx.DIRECTION.BOTH) || (direction === gf.Camera.fx.DIRECTION.HORIZONTAL)) {
            for(var y = 0; y < sy; y += spacing) {
                this.gfx.drawRect(0, y, sx, thickness);
            }
        }
        this.gfx.endFill();

        return this;
    },
    stop: function() {
        gf.Camera.fx.Effect.prototype.stop.call(this);

        this.gfx.visible = false;

        return this;
    }
});
