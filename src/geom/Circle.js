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
var Circle = function(x, y, radius, scale) {
    /**
     * The center of the circle
     *
     * @property position
     * @type Vector
     */
    this.position = new Vector();

    /**
     * The unscaled radius of the circle
     *
     * @property _radius
     * @type Number
     * @default 0
     * @private
     */
    this._radius = radius || 0;

    /**
     * The radius of the circle
     *
     * @property radius
     * @type Number
     * @default 0
     */
    this.radius = radius || 0;

    /**
     * The scale of the circle
     *
     * @property scale
     * @type Vector
     * @default new Vector(1, 1)
     */
    this.scale = scale || new Vector(1, 1);

    //set position
    this.x = x || 0;
    this.y = y || 0;

    //internal shape type
    this._shapetype = C.SHAPE.CIRCLE;

    this.recalc();
};

inherit(Circle, Object, {
    /**
     * Creates a clone of this Circle instance
     *
     * @method clone
     * @return {Circle} a copy of the circle
     */
    clone: function() {
        return new Circle(this.x, this.y, this.radius);
    },

    /**
     * Copies the values from another circle to this one
     *
     * @method copy
     * @param circle {Circle} The circle to copy vlaues from
     * @return {Circle} Returns itself.
     * @chainable
     */
    copy: function(circle) {
        this.x = circle.x;
        this.y = circle.y;
        this.radius = circle.radius;

        return this;
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
    },

    /**
     * Checks if this circle overlaps another
     *
     * @method overlaps
     * @param circle {Circle} The circle to check if this overlaps
     * @return {Boolean} if the circle overlaps
     */
    overlaps: function(circle) {
        var differenceV = this.position.clone().sub(circle.position),
            totalRadius = this.radius + circle.radius,
            totalRadiusSq = totalRadius * totalRadius,
            distanceSq = differenceV.lengthSq();

        //if distanceSq is greater than totalRadiusSq then they do not intersect,
        //so we return the inverse of that value.
        /*jshint -W018*/
        return !(distanceSq > totalRadiusSq);
    },

    /**
     * Checks if this circle's values are equal to anothers
     *
     * @method equals
     * @param circle {Circle} The circle to check against
     * @return {Boolean} True if they are equal
     */
    equals: function(circle) {
        return this.position.equals(circle.position) &&
                this.radius === circle.radius;
    },

    /**
     * Recalculates the scaled radius
     *
     * @method recalc
     * @return {Circle} Returns itself.
     * @chainable
     */
    recalc: function() {
        this.radius = this._radius * this.scale.x;

        return this;
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

/**
 * The radius circle
 *
 * @property radius
 * @type Number
 * @default 0
 */
Object.defineProperty(Circle.prototype, 'radius', {
    get: function() {
        return this._radius * this.scale.x;
    },
    set: function(v) {
        this._radius = v;
    }
});

/**
 * The circumference of the circle
 *
 * @property circumference
 * @type Number
 * @readOnly
 */
Object.defineProperty(Circle.prototype, 'circumference', {
    get: function() {
        return 2 * (Math.PI * this.radius);
    }
});

/**
 * The area of the circle
 *
 * @property area
 * @type Number
 * @readOnly
 */
Object.defineProperty(Circle.prototype, 'area', {
    get: function() {
        return Math.PI * this.radius * this.radius;
    }
});

module.exports = Circle;
