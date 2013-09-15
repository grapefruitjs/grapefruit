var Effect = require('./Effect'),
    utils = require('../../utils/utils'),
    C = require('../../constants');

var Scanlines = module.exports = function() {
    Effect.call(this);
};

utils.inherits(Scanlines, Effect, {
    start: function(color, direction, spacing, thickness, alpha) {
        Effect.prototype.start.call(this);

        color = color || 0x000000;
        direction = direction || C.DIRECTION.HORIZONTAL;
        spacing = spacing || 4;
        thickness = thickness || 1;
        alpha = alpha || 0.3;

        var sx = this.parent.size.x,
            sy = this.parent.size.y;

        this.gfx.clear();
        this.gfx.visible = true;
        this.gfx.beginFill(color, alpha);

        //draw the lines
        if((direction === C.DIRECTION.BOTH) || (direction === C.DIRECTION.VERTICAL)) {
            for(var x = 0; x < sx; x += spacing) {
                this.gfx.drawRect(x, 0, thickness, sy);
            }
        }

        if((direction === C.DIRECTION.BOTH) || (direction === C.DIRECTION.HORIZONTAL)) {
            for(var y = 0; y < sy; y += spacing) {
                this.gfx.drawRect(0, y, sx, thickness);
            }
        }
        this.gfx.endFill();

        return this;
    },
    stop: function() {
        Effect.prototype.stop.call(this);

        this.gfx.visible = false;

        return this;
    }
});
