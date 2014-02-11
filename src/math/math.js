var random = require('./random'),
    PIXI = require('pixi.js');

/**
 * The grapefruit math library, used to abstract commonly used math operations
 *
 * @class math
 * @extends Object
 * @static
 */
var math = {
    /**
     * The factor to multiply by to convert Degrees into Radians. The value is π/180
     *
     * @property DEG_TO_RAD
     * @type Number
     * @readOnly
     */
    DEG_TO_RAD: Math.PI / 180,
    /**
     * The factor to multiply by to convert Radians into Degrees. The value is 180/π
     *
     * @property RAD_TO_DEG
     * @type Number
     * @readOnly
     */
    RAD_TO_DEG: 180 / Math.PI,
    /**
     * Contains all the functions for generating deterministic random values.
     *
     * @property rand
     * @type random
     * @readOnly
     */
    rand: random,
    /**
     * A Matrix class, directory exposes PIXI.Matrix.
     *
     * @property Matrix
     * @type Matrix
     */
    Matrix: PIXI.Matrix,

    /**
     * Alias some native functions for great justice (or incase we want to override)
     */

    /**
     * Applys a Floor operation to a value, currently uses native Math.floor
     * since quicker solutions like `~~value` or `value | 0` only deal with 32-bits.
     * For example `~~760895687099.0011` is `686475707` which is wrong.
     *
     * @method floor
     * @param num {Number} The number to floor
     * @return {Number} The floored value
     */
    floor: Math.floor,
    /**
     * Applys a Ceiling operation to a value, currently uses native Math.ceil
     * since it deals with all edge cases
     *
     * @method ceil
     * @param num {Number} The number to ceil
     * @return {Number} The ceiling value
     */
    ceil: Math.ceil,
    /**
     * Returns the absolute value of a number, currently uses native Math.abs
     * since it is more performant than tricks you can use.
     * see:
     *      http://jsperf.com/math-abs-vs-bitwise/7
     *      http://jsperf.com/abs-value
     *      http://jsperf.com/math-abs-vs-bitwise/3
     *
     * @method abs
     * @param num {Number} The number to get the absolute value for
     * @return {Number} The absolute value
     */
    abs: Math.abs,
    /**
     * Returns the square root of a number, currently uses native Math.sqrt
     *
     * @method sqrt
     * @param num {Number} The number to get the sqrt of
     * @return {Number} The sqrt value
     */
    sqrt: Math.sqrt,
    /**
     * Returns the min of the values passed, currently uses native Math.min
     *
     * @method min
     * @param num* {Number...} The numbers to compare
     * @return {Number} The min value
     */
    min: Math.min,
    /**
     * Returns the max of the values passed, currently uses native Math.max
     *
     * @method max
     * @param num* {Number...} The numbers to compare
     * @return {Number} The max value
     */
    max: Math.max,
    /**
     * Rounds a number to the closest integer value (0.5 goes up), currently
     * uses native Math.round since in modern browsers it is faster that the
     * different tricks and will operate in the proper bit width.
     *
     * @method round
     * @param num {Number} The number to round
     * @return {Number} The rounded value
     */
    round: Math.round,

    /**
     * Clamps a number between two values.
     *
     * @method clamp
     * @param num {Number} The number to clamp
     * @param min {Number} The minimum value the number is allowed to be
     * @param max {Number} The maximum value the number is allowed to be
     * @return {Number} The clamped value
     */
    clamp: function(n, min, max) {
        return math.max(min, math.min(max, n));
    },
    /**
     * Truncates the decimal from a number
     *
     * @method truncate
     * @param num {Number} The number to truncate
     * @return {Number} The truncated value
     */
    truncate: function(n) {
        return (n > 0) ? math.floor(n) : math.ceil(n);
    },
    /**
     * Snaps a number to a grid value.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 10; a position of 18 would snap to 20
     *
     * @method snap
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param [offset=0] {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snap: function(n, gap, offset) {
        if(gap === 0) return n;

        offset = offset || 0;

        n -= offset;
        n = gap * math.round(n / gap);

        return offset + n;
    },
    /**
     * Snaps a number to a grid value, using floor.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 10; a position of 18 would also snap to 10
     *
     * @method snapFloor
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param [offset=0] {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snapFloor: function(n, gap, offset) {
        if(gap === 0) return n;

        offset = offset || 0;

        n -= offset;
        n = gap * math.floor(n / gap);

        return offset + n;
    },
    /**
     * Snaps a number to a grid value, using ceiling.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 20; a position of 18 would also snap to 20
     *
     * @method snapCeil
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param [offset=0] {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snapCeil: function(n, gap, offset) {
        if(gap === 0) return n;

        offset = offset || 0;

        n -= offset;
        n = gap * math.ceil(n / gap);

        return offset + n;
    },
    /**
     * Convert radians to degrees
     *
     * @method radiansToDegrees
     * @param angle {Number} The angle in radians to convert
     * @return {Number} The angle in degrees
     */
    radiansToDegrees: function(angle) {
        return angle * math.RAD_TO_DEG;
    },
    /**
     * Convert radians to degrees
     *
     * @method degreesToRadians
     * @param angle {Number} The angle in degrees to convert
     * @return {Number} The angle in radians
     */
    degreesToRadians: function(angle) {
        return angle * math.DEG_TO_RAD;
    },
    /**
     * Calculates the angle between two points
     *
     * @method angleBetween
     * @param pos1 {Vector|Point} The first position
     * @param pos2 {Vector|Point} The second position
     * @return {Number} The angle in radians
     */
    angleBetween: function(pos1, pos2) {
        return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    }
};

module.exports = math;
