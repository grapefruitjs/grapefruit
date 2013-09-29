var inherit = require('../utils/inherit');

/**
 * A 2d Vector implementation stolen directly from mrdoob's THREE.js
 * thanks mrdoob: https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js
 *
 * @class Vector
 * @extends Object
 * @namespace gf
 * @constructor
 * @param x {Number} The x component of the vector
 * @param y {Number} The y component of the vector
 */
var Vector = module.exports = function(x, y) {
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
     */
    setComponent: function(index, value) {
        switch(index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);
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
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);
        }
    },
    /**
     * Copies the passed vector's components to this vector
     *
     * @method copy
     * @param vector {Vector} The vector to copy the values from
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
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
     * @param min {Number} The minimum value a component can be
     * @param max {Number} The maximum value a component can be
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
     */
    negate: function() {
        return this.multiplyScalar(-1);
    },
    /**
     * Scale this vector.
     * 
     * @param x {Number} The scaling factor in the x direction.
     * @param [y=x] {Number} The scaling factor in the y direction.  If this
     *   is not specified, the x scaling factor will be used.
     * @return {Vector} Returns itself
     */
    scale: function(x, y) {
        this.x *= x;
        this.y *= y || x;

        return this;
    },
    /**
     * Reverse this vector.
     *
     * @return {Vector} Returns itself
     */
    reverse: function() {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    },
    /**
     * Project this vector on to another vector.
     *
     * @param v {Vector} The vector to project onto.
     * @return {Vector} Returns itself
     */
    project: function(v) {
        var amt = this.dot(v) / v.len2();
        this.x = amt * v.x;
        this.y = amt * v.y;

        return this;
    },
    /**
     * Project this vector onto a vector of unit length.
     *
     * @param v {Vector} The unit vector to project onto.
     * @return {Vector} Returns itself
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
     * @return {Vector} Returns itself
     */
    reflect: function(axis) {
        var x = this.x;
        var y = this.y;
        this.project(axis).scale(2);
        this.x -= x;
        this.y -= y;

        return this;
    },
    /**
     * Reflect this vector on an arbitrary axis (represented by a unit vector)
     *
     * @param axis {Vector} The unit vector representing the axis.
     * @return {Vector} Returns itself
     */
    reflectN: function(axis) {
        var x = this.x;
        var y = this.y;
        this.projectN(axis).scale(2);
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
        return this.x * this.x + this.y * this.y;
    },
    /**
     * Calculates the length of the vector
     *
     * @method length
     * @return {Number} Returns the length of the vector
     */
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
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
     * @param vector {Vector}
     * @return {Number} The distance
     */
    distanceTo: function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    },
    /**
     * Calculates the square distance to the passed vector
     *
     * @method distanceToSquared
     * @param vector {Vector}
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
     * @param length {Number}
     * @return {Vector} Returns itself
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
     * @param vector {Vector}
     * @param alpha {Number}
     * @return {Vector} Returns itself
     */
    lerp: function(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;
    },
    /**
     * Rotates the vector by 90 degrees
     *
     * @return {Vector} Returns itself
     */
    perp: function() {
        var x = this.x;
        this.x = this.y;
        this.y -= x;

        return this;
    },
    /**
     * Checks if this vector is equal to another
     *
     * @method equals
     * @param vector {Vector} The vector to compare with
     * @return {Vector} Returns itself
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
