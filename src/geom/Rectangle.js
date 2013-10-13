//var Rectangle = module.exports = require('../vendor/pixi').Rectangle;

var inherit = require('../utils/inherit'),
    Polygon = require('./Polygon'),
    Vector = require('../math/Vector'),
    C = require('../constants');

/**
 * The Rectangle object is an area defined by its position, as indicated by its
 * top-left corner point (x, y) and by its width and its height.
 *
 * @class Rectangle
 * @constructor 
 * @param x {Number} The X coord of the upper-left corner of the rectangle
 * @param y {Number} The Y coord of the upper-left corner of the rectangle
 * @param width {Number} The overall wisth of this rectangle
 * @param height {Number} The overall height of this rectangle
 */
var Rectangle = function(x, y, width, height) {
    /**
     * @property position
     * @type Vector
     * @default 0
     */
    this.position = new Vector();

    //set positon
    this.x = x || 0;
    this.y = y || 0;

    /**
     * @property _width
     * @type Number
     * @default 0
     * @private
     */
    this._width = width || 0;

    /**
     * @property _height
     * @type Number
     * @default 0
     * @private
     */
    this._height = height || 0;

    /**
     * @property halfWidth
     * @type Number
     * @default 0
     */
    this.halfWidth = this._width / 2;

    /**
     * @property halfHeight
     * @type Number
     * @default 0
     */
    this.halfHeight = this._height / 2;

    //internal shape type
    this._shapetype = C.SHAPE.RECTANGLE;
};

inherit(Rectangle, Object, {
    /**
     * Creates a clone of this Rectangle
     *
     * @method clone
     * @return {Rectangle} a copy of the rectangle
     */
    clone: function() {
        return new Rectangle(this.x, this.y, this._width, this._height);
    },

    /**
     * Checks if the x, and y coords passed to this function are contained within this Rectangle
     *
     * @method contains
     * @param x {Number} The X coord of the point to test
     * @param y {Number} The Y coord of the point to test
     * @return {Boolean} if the x/y coords are within this Rectangle
     */
    contains: function(x, y) {
        if(this._width <= 0 || this._height <= 0)
            return false;

        var x1 = this.x;
        if(x >= x1 && x <= x1 + this._width) {
            var y1 = this.y;

            if(y >= y1 && y <= y1 + this._height) {
                return true;
            }
        }

        return false;
    },

    /**
     * Checks if this rectangle overlaps another
     *
     * @method contains
     * @param rect {Rectangle} The rectangle to check if this overlaps
     * @return {Boolean} if the rectangle overlaps
     */
    overlaps: function(rect) {
        return this.right > rect.x &&
                this.x < rect.right &&
                this.bottom > rect.y &&
                this.y < rect.bottom;
    },

    /**
     * Returns a polygon from this rectangle's points
     *
     * @method toPolygon
     * @return {Polygon}
     */
    toPolygon: function() {
        return new Polygon(this.x, this.y, [
            new Vector(), //top-left
            new Vector(this.width, 0), //top-right
            new Vector(this.width, this.height), //bottom-right
            new Vector(0, this.height) //bottom-left
        ]);
    }
});

/**
 * The top-left X coord of the rectangle
 *
 * @property x
 * @type Number
 * @default 0
 */
Object.defineProperty(Rectangle.prototype, 'x', {
    get: function() {
        return this.position.x;
    },
    set: function(v) {
        this.position.x = v;
    }
});

/**
 * The top-left Y coord of the rectangle
 *
 * @property y
 * @type Number
 * @default 0
 */
Object.defineProperty(Rectangle.prototype, 'y', {
    get: function() {
        return this.position.y;
    },
    set: function(v) {
        this.position.y = v;
    }
});


/**
 * The width of the object
 *
 * @property width
 * @type Number
 * @default 0
 */
Object.defineProperty(Rectangle.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(w) {
        this._width = w || 0;
        this.halfWidth = this._width / 2;
    }
});

/**
 * The height of the object
 *
 * @property height
 * @type Number
 * @defualt 0
 */
Object.defineProperty(Rectangle.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(h) {
        this._height = h || 0;
        this.halfHeight = this._height / 2;
    }
});

/**
 * Returns the right most X coord
 *
 * @property right
 * @type Number
 * @readOnly
 */
Object.defineProperty(Rectangle.prototype, 'right', {
    get: function() {
        return this.x + this._width;
    }
});

/**
 * Returns the left most X coord
 *
 * @property left
 * @type Number
 * @readOnly
 */
Object.defineProperty(Rectangle.prototype, 'left', {
    get: function() {
        return this.x;
    }
});

/**
 * Returns the top most Y coord
 *
 * @property top
 * @type Number
 * @readOnly
 */
Object.defineProperty(Rectangle.prototype, 'top', {
    get: function() {
        return this.y;
    }
});

/**
 * Returns the bottom most Y coord
 *
 * @property bottom
 * @type Number
 * @readOnly
 */
Object.defineProperty(Rectangle.prototype, 'bottom', {
    get: function() {
        return this.y + this._height;
    }
});

module.exports = Rectangle;
