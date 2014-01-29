var inherit = require('./inherit');

var Color = function(r, g, b, a) {
    this._color = 0x000000;
    this._rgba = {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    };

    //one arg is either a hex color or an rgba object
    if(arguments.length === 1) {
        //hex color
        if(typeof r === 'number') {
            this.color = r;
        }
        //rgba object
        else {
            this.rgba = r;
        }
    }
    //otherwise real rgba
    else {
        this.setRgba(r, g, b, a);
    }
}

inherit(Color, Object, {
    setRgba: function(r, g, b, a) {
        this._rgba.r = r || 0;
        this._rgba.g = g || 0;
        this._rgba.b = b || 0;
        this._rgba.a = a || 255;

        this._color = (this._rgba.r << 16) + (this._rgba.g << 8) + this._rgba.b;
    }
});

Object.defineProperty(Color.prototype, 'rgba', {
    get: function() {
        return this._rgba;
    },
    set: function(obj) {
        obj = obj || {};
        this._rgba.r = obj.r || 0;
        this._rgba.g = obj.g || 0;
        this._rgba.b = obj.b || 0;
        this._rgba.a = obj.a || 255;

        this._color = (this._rgba.r << 16) + (this._rgba.g << 8) + this._rgba.b;
    }
});

Object.defineProperty(Color.prototype, 'color', {
    get: function() {
        return this._color;
    },
    set: function(clr) {
        this._color = clr;

        this._rgba.r = (clr & 0xff0000) >> 16;
        this._rgba.g = (clr & 0x00ff00) >> 8;
        this._rgba.b = (clr & 0x0000ff);
    }
});

Object.defineProperty(Color.prototype, 'alpha', {
    get: function() {
        return this._rgba.a;
    },
    set: function(alpha) {
        this._rgba.a = gf.math.clamp(alpha, 0, 255);
    }
});

module.exports = Color;
