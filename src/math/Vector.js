var inherit = require('../utils/inherit');

/**
 * A 2d Vector implementation stolen directly from mrdoob's THREE.js
 * [Vector2d](https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js)
 *
 * @class Vector
 * @extends Object
 * @constructor
 * @param x {Number} The x component of the vector
 * @param y {Number} The y component of the vector
 */
var Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

inherit(Vector, Object, {
    /**
     * Sets the value of the vector
     *
     * @method set
     * @param x {Number} The x component of the vector
     * @param y {Number} The y component of the vector
     * @return {Vector} Returns itself.
     * @chainable
     */
    set: function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    },
    /**
     * Sets the X value of the vector
     *
     * @method setX
     * @param x {Number} The x component of the vector
     * @return {Vector} Returns itself.
     * @chainable
     */
    setX: function(x) {
        this.x = x;

        return this;
    },
    /**
     * Sets the Y value of the vector
     *
     * @method setY
     * @param y {Number} The y component of the vector
     * @return {Vector} Returns itself.
     * @chainable
     */
    setY: function(y) {
        this.y = y;

        return this;
    },
    /**
     * Sets a component value of the vector
     *
     * @method setComponent
     * @param index {Number} The index of the component to set (0 = x, 1 = y)
     * @param value {Number} The value to set the component to
     * @return {Vector} Returns itself.
     * @chainable
     */
    setComponent: function(index, value) {
        switch(index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default:
                throw new RangeError('index is out of range: ' + index);
        }

        return this;
    },
    /**
     * Gets a component value of the vector
     *
     * @method getComponent
     * @param index {Number} The index of the component to set (0 = x, 1 = y)
     * @return {Number} Returns the component value
     */
    getComponent: function(index) {
        switch(index) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw new RangeError('index is out of range: ' + index);
        }
    },
    /**
     * Copies the passed vector's components to this vector
     *
     * @method copy
     * @param vector {Vector} The vector to copy the values from
     * @return {Vector} Returns itself.
     * @chainable
     */
    copy: function(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    },
    /**
     * Floors the vector components
     *
     * @method floor
     * @return {Vector} Returns itself.
     * @chainable
     */
    floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;
    },
    /**
     * Ceils the vector components
     *
     * @method ceil
     * @return {Vector} Returns itself.
     * @chainable
     */
    ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;
    },
    /**
     * Adds a vector to this one
     *
     * @method add
     * @param vector {Vector} The vector to add to this one
     * @return {Vector} Returns itself.
     * @chainable
     */
    add: function(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    },
    /**
     * Adds two vectors to each other and stores the result in this vector
     *
     * @method addVectors
     * @param vector1 {Vector}
     * @param vector2 {Vector}
     * @return {Vector} Returns itself.
     * @chainable
     */
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;
    },
    /**
     * Adds a scalar value to the x and y components of this vector
     *
     * @method addScalar
     * @param scalar {Number} The scalar value to add
     * @return {Vector} Returns itself.
     * @chainable
     */
    addScalar: function(s) {
        this.x += s;
        this.y += s;

        return this;
    },
    /**
     * Subtracts a vector from this one
     *
     * @method sub
     * @param vector {Vector} The vector to subtract from this one
     * @return {Vector} Returns itself.
     * @chainable
     */
    sub: function(v) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    },
    /**
     * Subtracts two vectors from each other and stores the result in this vector
     *
     * @method subVectors
     * @param vector1 {Vector}
     * @param vector2 {Vector}
     * @return {Vector} Returns itself.
     * @chainable
     */
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    },
    /**
     * Multiplies the x and y components of this vector by a scalar value
     *
     * @method multiplyScalar
     * @param scalar {Number} The value to multiply by
     * @return {Vector} Returns itself.
     * @chainable
     */
    multiplyScalar: function(s) {
        this.x *= s;
        this.y *= s;

        return this;
    },
    /**
     * Divides the x and y components of this vector by a scalar value
     *
     * @method divideScalar
     * @param scalar {Number} The value to divide by
     * @return {Vector} Returns itself.
     * @chainable
     */
    divideScalar: function(s) {
        if(s !== 0) {
            this.x /= s;
            this.y /= s;
        } else {
            this.set(0, 0);
        }

        return this;
    },
    /**
     * Sets this vector components to the minimum value when compared to the passed vector's components
     *
     * @method min
     * @param vector {Vector} The vector to compare to
     * @return {Vector} Returns itself.
     * @chainable
     */
    min: function(v) {
        if(this.x > v.x) {
            this.x = v.x;
        }

        if(this.y > v.y) {
            this.y = v.y;
        }

        return this;
    },
    /**
     * Sets this vector components to the maximum value when compared to the passed vector's components
     *
     * @method max
     * @param vector {Vector} The vector to compare to
     * @return {Vector} Returns itself.
     * @chainable
     */
    max: function(v) {
        if(this.x < v.x) {
            this.x = v.x;
        }

        if(this.y < v.y) {
            this.y = v.y;
        }

        return this;
    },
    /**
     * Clamps the vectors components to be between min and max
     *
     * @method max
     * @param min {Vector} The minimum value a component can be
     * @param max {Vector} The maximum value a component can be
     * @return {Vector} Returns itself.
     * @chainable
     */
    clamp: function(min, max) {
        // This function assumes min < max, if this assumption
        //isn't true it will not operate correctly
        if(this.x < min.x) {
            this.x = min.x;
        } else if(this.x > max.x) {
            this.x = max.x;
        }

        if(this.y < min.y) {
            this.y = min.y;
        } else if(this.y > max.y) {
            this.y = max.y;
        }

        return this;
    },
    /**
     * Negates this vector (multiplies by -1)
     *
     * @method negate
     * @return {Vector} Returns itself.
     * @chainable
     */
    negate: function() {
        return this.multiplyScalar(-1);
    },
    /**
     * Project this vector on to another vector.
     *
     * @param v {Vector} The vector to project onto.
     * @return {Vector} Returns itself.
     * @chainable
     */
    project: function(v) {
        var amt = this.dot(v) / v.lengthSq();
        this.x = amt * v.x;
        this.y = amt * v.y;

        return this;
    },
    /**
     * Project this vector onto a vector of unit length.
     *
     * @param v {Vector} The unit vector to project onto.
     * @return {Vector} Returns itself.
     * @chainable
     */
    projectN: function(v) {
        var amt = this.dot(v);
        this.x = amt * v.x;
        this.y = amt * v.y;

        return this;
    },
    /**
     * Reflect this vector on an arbitrary axis.
     *
     * @param axis {Vector} The vector representing the axis.
     * @return {Vector} Returns itself.
     * @chainable
     */
    reflect: function(axis) {
        var x = this.x;
        var y = this.y;
        this.project(axis).multiplyScalar(2);
        this.x -= x;
        this.y -= y;

        return this;
    },
    /**
     * Reflect this vector on an arbitrary axis (represented by a unit vector)
     *
     * @param axis {Vector} The unit vector representing the axis.
     * @return {Vector} Returns itself.
     * @chainable
     */
    reflectN: function(axis) {
        var x = this.x;
        var y = this.y;
        this.projectN(axis).multiplyScalar(2);
        this.x -= x;
        this.y -= y;

        return this;
    },
    /**
     * Performs the dot product between this vector and the passed one and returns the result
     *
     * @method dot
     * @param vector {Vector}
     * @return {Number} Returns the dot product
     */
    dot: function(v) {
        return this.x * v.x + this.y * v.y;
    },
    /**
     * Calculates the square length of the vector
     *
     * @method lengthSq
     * @return {Number} Returns the square length of the vector
     */
    lengthSq: function() {
        return this.dot(this);
    },
    /**
     * Calculates the length of the vector
     *
     * @method length
     * @return {Number} Returns the length of the vector
     */
    length: function() {
        return Math.sqrt(this.lengthSq());
    },
    /**
     * Normalizes this vector (divides by its length)
     *
     * @method normalize
     * @return {Vector} Returns the normalized vector
     */
    normalize: function() {
        return this.divideScalar(this.length());
    },
    /**
     * Calculates the distance to the passed vector
     *
     * @method distanceTo
     * @param vector {Vector} The vector to check distance to
     * @return {Number} The distance
     */
    distanceTo: function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    },
    /**
     * Calculates the square distance to the passed vector
     *
     * @method distanceToSquared
     * @param vector {Vector} The vector to check distance to
     * @return {Number} The square distance
     */
    distanceToSquared: function(v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    },
    /**
     * Sets the length of the vector
     *
     * @method setLength
     * @param length {Number} The length to set this vector to
     * @return {Vector} Returns itself.
     * @chainable
     */
    setLength: function(l) {
        var oldLength = this.length();

        if(oldLength !== 0 && l !== oldLength) {
            this.multiplyScalar(l / oldLength);
        }

        return this;
    },
    /**
     * Performs a linear interpolation between this vector and the passed vector
     *
     * @method lerp
     * @param vector {Vector} The vector to interpolate with
     * @param alpha {Number} The amount to interpolate [0-1] or extrapolate (1-]
     * @return {Vector} Returns itself.
     * @chainable
     */
    lerp: function(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;
    },
    /**
     * Rotates the vector by 90 degrees
     *
     * @return {Vector} Returns itself.
     * @chainable
     */
    perp: function() {
        var x = this.x;
        this.x = this.y;
        this.y = -x;

        return this;
    },
    /**
     * Rotates the vector by an arbitrary angle around an arbitrary point in space
     *
     * @method rotate
     * @param angle {Number} The angle in radians to rotate by
     * @param anchor {Vector} The anchor point to rotate around
     * @return {Vector} Returns itself.
     * @chainable
     */
    rotate: function(angle, anchor) {
        var dist = anchor.distanceTo(this);

        return this.set(
            anchor.x + (dist * Math.cos(angle)),
            anchor.y + (dist * Math.sin(angle))
        );
    },
    /**
     * Checks if this vector is equal to another
     *
     * @method equals
     * @param vector {Vector} The vector to compare with
     * @return {Vector} Returns itself.
     * @chainable
     */
    equals: function(v) {
        return ((v.x === this.x) && (v.y === this.y));
    },
    /**
     * Returns an array with the components of this vector as the elements
     *
     * @method toArray
     * @return {Vector} Returns an array of [x,y] form
     */
    toArray: function () {
        return [this.x, this.y];
    },
    /**
     * Creates a new instance of Vector, with the same components as this vector
     *
     * @method clone
     * @return {Vector} Returns a new Vector with the same values
     */
    clone: function () {
        return new Vector(this.x, this.y);
    }
});

/**
 * A vector that is always 0,0
 *
 * @property ZERO
 * @type Vector
 * @readOnly
 * @static
 * @final
 */
Vector.ZERO = new Vector();

module.exports = Vector;
