var Effect = require('./Effect'),
    inherit = require('../../utils/inherit'),
    C = require('../../constants');

var Scanlines = function() {
    Effect.call(this);
};

inherit(Scanlines, Effect, {
    start: function(color, axis, spacing, thickness, alpha, cb) {
        Effect.prototype.start.call(this);

        if(typeof alpha ==='function') {
            cb = alpha;
            alpha = null;
        }

        if(typeof thickness === 'function') {
            cb = thickness;
            alpha = null;
            thickness = null;
        }

        if(typeof spacing === 'function') {
            cb = spacing;
            alpha = null;
            thickness = null;
            spacing = null;
        }

        if(typeof axis === 'function') {
            cb = spacing;
            alpha = null;
            thickness = null;
            spacing = null;
            axis = null;
        }

        if(typeof color === 'function') {
            cb = spacing;
            alpha = null;
            thickness = null;
            spacing = null;
            axis = null;
            color = null;
        }

        color = color || 0x000000;
        axis = axis || C.AXIS.HORIZONTAL;
        spacing = spacing || 4;
        thickness = thickness || 1;
        alpha = alpha || 0.3;

        this.cb = cb;

        var sx = this.parent.size.x,
            sy = this.parent.size.y;

        this.gfx.clear();
        this.gfx.visible = true;
        this.gfx.beginFill(color, alpha);

        //draw the lines
        if(axis & C.AXIS.VERTICAL) {
            for(var x = 0; x < sx; x += spacing) {
                this.gfx.drawRect(x, 0, thickness, sy);
            }
        }

        if(axis & C.AXIS.HORIZONTAL) {
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

module.exports = Scanlines;
