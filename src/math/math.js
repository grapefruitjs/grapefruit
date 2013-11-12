var support = require('../utils/support'),
    PIXI = require('../vendor/pixi');

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
     * The RNG seed that allows for deterministic random numbers. Change this to a certain value
     * to ensure you will have the same sequence of "random" numbers. Useful for playbacks, save files,
     * procedural generation, etc.
     *
     * Note: Deterministic randomness is not yet implemented. Scheduled for v0.2.0
     *
     * @property SEED
     * @type Number
     * @default Math.random()
     */
    SEED: Math.random(),
    /**
     * A Matrix class, directory exposes PIXI.Matrix.
     *
     * @property Matrix
     * @type Matrix
     */
    Matrix: PIXI.Matrix,
    /**
     * A 3x3 Matrix namespace, directory exposes PIXI.mat3. You can use this to create 3x3 Matrix classes.
     *
     * @property mat3
     * @type Object
     */
    mat3: PIXI.mat3,
    /**
     * A 4x4 Matrix namespace, directory exposes PIXI.mat4. You can use this to create 4x4 Matrix classes.
     *
     * @property mat3
     * @type Object
     */
    mat4: PIXI.mat4,
    /**
     * Alias some native functions for great justice (or incase we want to override)
     *
     */
    /**
     * Applys a Floor operation to a value, currently uses native Math.floor
     * since it deals with all edge cases that quicker solutions like `~~value`
     * or `value | 0` do not.
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
     * Generates a random number between 0 and 1, NON DETERMINISTIC
     *
     * @method random
     * @return {Number} The random value
     */
    random: Math.random,
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
     * Returns the min of the values passed
     *
     * @method min
     * @param num* {Number...}
     * @return {Number} The min value
     */
    min: Math.min,
    /**
     * Returns the max of the values passed
     *
     * @method max
     * @param num* {Number...}
     * @return {Number} The max value
     */
    max: Math.max,
    /**
     * Quickly rounds a number. This is about twice as fast as Math.round()
     *
     * @method round
     * @param num {Number} The number to round
     * @return {Number} The rounded value
     */
    round: function(n) {
        return ~~(n + (n > 0 ? 0.5 : -0.5));
    },
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
        return Math.max(min, Math.min(max, n));
    },
    /**
     * Truncates the decimal from a number
     *
     * @method truncate
     * @param num {Number} The number to truncate
     * @return {Number} The truncated value
     */
    truncate: function(n) {
        return (n > 0) ? Math.floor(n) : Math.ceil(n);
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
        n = gap * Math.round(n / gap);

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
        n = gap * Math.floor(n / gap);

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
        n = gap * Math.ceil(n / gap);

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
    },
    /**
     * Returns a random boolean based on the provided chance. The chance represents the
     * percentage chance of returning: true.
     *
     * @method randomBool
     * @param [chance=50] {Number} The % chance of getting true (0 - 100), defaults to 50%
     * @return {Boolean}
     */
    randomBool: function(chance) {
        if(chance === undefined)
            chance = 50;

        //no chance of true
        if(chance <= 0)
            return false;

        //must always be true
        if(chance >= 100)
            return true;

        //if roll is less than change, return true
        return (Math.random() * 100 < chance);
    },
    /**
     * Returns a random int between min and max.
     *
     * @method randomInt
     * @param [min=0] {Number} The minimun number that the result can be
     * @param [max=100] {Number} The maximun number that the result can be
     * @return {Number}
     */
    randomInt: function(min, max) {
        if(min !== undefined && min === max)
            return min;

        min = min || 0;
        max = max || 100;

        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
     * Returns a random real number between min and max.
     *
     * @method randomReal
     * @param [min=0] {Number} The minimun number that the result can be
     * @param [max=1] {Number} The maximun number that the result can be
     * @return {Number}
     */
    randomReal: function(min, max) {
        if(min !== undefined && min === max)
            return min;

        min = min || 0;
        max = max || 1;

        return math.random() * (max - min) + min;
    },
    /**
     * Returns a random sign based on the provided chance. The chance represents the
     * percentage chance of returning 1 (positive).
     *
     * @method randomSign
     * @param chance {Number} The % chance of getting positive (0 - 100), defaults to 50%
     * @return {Number} either 1 or -1
     */
    randomSign: function(chance) {
        return math.randomBool(chance) ? 1 : -1;
    },
    /**
     * Returns a random string based on a random value between 0 and 1, multiplied
     * by the current date. Ex: "1158014093337", "86371874178", etc
     *
     * @method randomString
     * @return {String} A random string
     */
    randomString: function() {
        return Math.floor(Date.now() * Math.random()).toString();
    },
    /**
     * Generates a random RFC4122 compliant (v4) UUID
     *
     * @method randomUuid
     * @return {String} A random guid
     */
    randomUuid: function() {
        //collect some random bytes
        var buf = math.randomBytes(math.__uuidBytes);

        // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
        buf[6] = (buf[6] & 0x0f) | 0x40;
        buf[8] = (buf[8] & 0x3f) | 0x80;

        var i = 0,
            bth = math.__byteToHex;

        //convert bytes to string
        return bth[buf[i++]] + bth[buf[i++]] +
                bth[buf[i++]] + bth[buf[i++]] + '-' +
                bth[buf[i++]] + bth[buf[i++]] + '-' +
                bth[buf[i++]] + bth[buf[i++]] + '-' +
                bth[buf[i++]] + bth[buf[i++]] + '-' +
                bth[buf[i++]] + bth[buf[i++]] +
                bth[buf[i++]] + bth[buf[i++]] +
                bth[buf[i++]] + bth[buf[i++]];
    },
    __uuidBytes: new Uint8Array(16),
    __byteToHex: (function() {
        var bth = [],
            htb = {};
        for (var i = 0; i < 256; i++) {
            bth[i] = (i + 0x100).toString(16).substr(1);
            htb[bth[i]] = i;
        }

        return bth;
    })(),
    /**
     * Fills a Typed Array with random bytes. If you do not pass an output param, then a default
     * Uint8Array(16) is created and returned for you.
     *
     * @method randomBytes
     * @param [output] {TypedArray} The output array for the random data, if none specified a new Uint8Array(16) is created
     */
    randomBytes: function(ary) {
        ary = ary || new Uint8Array(16);
        window.crypto.getRandomValues(ary);
        return ary;
    },
    /**
     * Returns a random element of an array.
     *
     * @method randomElement
     * @param array {Array} The array to choose from
     * @param start {Number} The index of the first element to include, defaults to 0
     * @param end {Number} The index of the last element to include, defaults to array.length - 1
     * @return {Number} either 1 or -1
     */
    randomElement: function(array, start, end) {
        //ensure we have an array, and there are elements to check
        if(!array || !array.length)
            return null;

        //special case for 1 element
        if(array.length === 1)
            return array[0];

        //default for start
        if(!start || start < 0)
            start = start || 0;

        //default for end
        if(!end || end < 0)
            end = array.length - 1;

        return array[math.randomInt(start, end)];
    }
};

//these polyfills are separated and exposed so that they can get tested

//if we support typed arrays we can do a good approximation of crypto.getRandomValues
math._getRandomValuesTyped = function(ary) {
    //get a Uint8 view into the buffer
    var buf = ary.buffer,
        len = buf.byteLength,
        view = new Uint8Array(buf);

    //fill the buffer one random byte at a time
    for(var i = 0, r; i < len; ++i) {
        //we only need a new random when we have pulled all the bytes out of the last one
        //which means every fourth byte we get a new random 32-bit value
        if((i & 0x03) === 0) {
            r = math.random() * 0x100000000;
        }

        //pull the next byte out of the random number
        view[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    //return the original view which now has the data we put into the buffer
    return ary;
};

//without typed array support we can do one that returns an array of values
//but you would need to use `new Array(num)`, so there is a length
//or something like `var a = []; a[num - 1] = undefined;` so length is expanded
math._getRandomValuesArray = function(ary) {
    //fill the array with random values
    for(var i = 0; i < ary.length; ++i) {
        ary[i] = math.random() * 0x100000000;
    }

    return ary;
};

//polyfill crypto.getRandomValues if necessary
//crypto spec: http://wiki.whatwg.org/wiki/Crypto
if(!support.crypto) {
    window.crypto = window.crypto || {};

    if(support.typedArrays) {
        window.crypto.getRandomValues = math._getRandomValuesTyped;
    } else {
        window.crypto.getRandomValues = math._getRandomValuesArray;
    }
}

module.exports = math;
