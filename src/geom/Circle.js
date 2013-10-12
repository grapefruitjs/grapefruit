var inherit = require('../utils/inherit'),
    Vector = require('../math/Vector'),
    C = require('../constants');

/**
 * The Circle object is an area defined by its position, as indicated by its
 * center point (x, y) and by its radius.
 *
 * @class Circle
 * @constructor
 * @param center {Vector} The point of the center of the circle
 * @param radius {Number} The radius of the circle
 */
var Circle = module.exports = function(x, y, radius) {
    /**
     * The center of the circle
     *
     * @property position
     * @type Vector
     */
    this.position = new Vector();

    /**
     * The radius of the circle
     *
     * @property radius
     * @type Number
     * @default 0
     */
    this.radius = radius || 0;

    //set position
    this.x = x || 0;
    this.y = y || 0;

    //internal shape type
    this._shapetype = C.SHAPE.CIRCLE;
};

inherit(Circle, Object, {
    /**
     * Creates a clone of this Circle instance
     *
     * @method clone
     * @return {Circle} a copy of the polygon
     */
    clone: function() {
        return new Circle(this.x, this.y, this.radius);
    },

    /**
     * Checks if the x, and y coords passed to this function are contained within this circle,
     * or on the edge of the circle
     *
     * @method contains
     * @param x {Number} The X coord of the point to test
     * @param y {Number} The Y coord of the point to test
     * @return {Boolean} if the x/y coords are within this polygon
     */
    contains: function(x, y) {
        if(this.radius <= 0)
            return false;

        var dx = (x - this.x),
            dy = (y - this.y),
            r2 = this.radius * this.radius;

        dx *= dx;
        dy *= dy;

        return (dx + dy <= r2);
    }
});

/**
 * The center X coord of the circle
 *
 * @property x
 * @type Number
 * @default 0
 */
Object.defineProperty(Circle.prototype, 'x', {
    get: function() {
        return this.position.x;
    },
    set: function(v) {
        this.position.x = v;
    }
});

/**
 * The center Y coord of the circle
 *
 * @property y
 * @type Number
 * @default 0
 */
Object.defineProperty(Circle.prototype, 'y', {
    get: function() {
        return this.position.y;
    },
    set: function(v) {
        this.position.y = v;
    }
});
