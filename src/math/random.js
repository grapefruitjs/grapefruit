var support = require('../utils/support'),
    alphanum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

/**
 * Static random class
 *
 * @class random
 * @static
 */
var r = {
    /**
     * This is one of the values used to generate random numbers. You should
     * never need to use this value.
     *
     * @property _x
     * @readOnly
     * @private
     * @static
     */
    _x: 0,
    /**
     * This is one of the values used to generate random numbers. You should
     * never need to use this value.
     *
     * @property _y
     * @readOnly
     * @private
     * @static
     */
    _y: 0,
    /**
     * Generates the next X value
     *
     * @method _nextX
     * @return {Number} The new X value.
     * @private
     * @static
     */
    _nextX: function() {
        return 36969 * (this._x & 0xFFFF) + (this._x >> 16);
    },
    /**
     * Generates the next Y value
     *
     * @method _nextY
     * @return {Number} The new Y value.
     * @private
     * @static
     */
    _nextY: function() {
        return 18273 * (this._y & 0xFFFF) + (this._y >> 16);
    },
    /**
     * Seeds the generator with a one, two, or three dimensional sed.
     *
     * @method seed
     * @param x {Number} The seed.
     * @param [y] {Number} The optional second dimension of the seed.
     * @param [z] {Number} The optional third dimension of the seed.
     * @static
     */
    seed: function(x, y, z) {
        /* jshint -W116 */
        //use == check for undefined or null
        if(y == null && z == null) {
            this._x = x * 3253;
            this._y = this._nextX();
        } else if(z == null) {
            this._x = x * 2549 + y * 3571;
            this._y = y * 2549 + x * 3571;
        } else {
            this._x = x * 2549 + y * 3571 + z * 3253;
            this._y = x * 3253 + y * 2549 + z * 3571;
        }
        /* jshint +W116 */
    },
    /**
     * Returns the next random random value in the sequence (between 0 and 1)
     *
     * @method next
     * @alias random
     * @return {Number} The random value.
     * @static
     */
    next: function() {
        // Random number generator using George Marsaglia's MWC algorithm.

        // don't let them get stuck
        if (this._x === 0) this._x = -1;
        if (this._y === 0) this._y = -1;

        // Mix the bits.
        this._x = this._nextX();
        this._y = this._nextY();
        return ((this._x << 16) + (this._y & 0xFFFF)) / 0xFFFFFFFF + 0.5;
    },
    /**
     * Returns a random boolean based on the provided chance. The chance represents the
     * percentage chance of returning: true.
     *
     * @method bool
     * @param [chance=50] {Number} The % chance of getting true (0 - 100), defaults to 50%
     * @return {Boolean}
     * @static
     */
    bool: function(chance) {
        if(chance === undefined)
            chance = 50;

        //no chance of true
        if(chance <= 0)
            return false;

        //must always be true
        if(chance >= 100)
            return true;

        //if roll is less than change, return true
        return (r.next() * 100 < chance);
    },
    /**
     * Returns a random integer between min and max.
     *
     * @method int
     * @param [min=0] {Number} The minimun number that the result can be
     * @param [max=100] {Number} The maximun number that the result can be
     * @return {Number}
     * @static
     */
    int: function(min, max) {
        if(min !== undefined && min === max)
            return min;

        min = min || 0;
        max = max || 100;

        return Math.floor(r.next() * (max - min + 1) + min);
    },
    /**
     * Returns a random real number between min and max.
     *
     * @method real
     * @param [min=0] {Number} The minimun number that the result can be
     * @param [max=1] {Number} The maximun number that the result can be
     * @return {Number}
     * @static
     */
    real: function(min, max) {
        if(min !== undefined && min === max)
            return min;

        min = min || 0;
        max = max || 1;

        return r.next() * (max - min) + min;
    },
    /**
     * Returns a random sign based on the provided chance. The chance represents the
     * percentage chance of returning 1 (positive).
     *
     * @method sign
     * @param chance {Number} The % chance of getting positive (0 - 100), defaults to 50%
     * @return {Number} either 1 or -1
     * @static
     */
    sign: function(chance) {
        return r.bool(chance) ? 1 : -1;
    },
    /**
     * Returns a random alpha numeric string of the length specified.
     *
     * @method string
     * @param [length=16] {Number} The
     * @return {String} A random string
     * @static
     */
    string: function(length) {
        length = length || 16;
        var txt = '';

        for(var i = 0; i < length; ++i)
            txt += alphanum.charAt(Math.floor(r.next() * alphanum.length));

        return txt;
    },
    /**
     * Generates a random RFC4122 (v4) compliant UUID
     *
     * @method uuid
     * @return {String} A random uuid
     * @static
     */
    uuid: function() {
        //collect some random bytes
        var buf = r.bytes(r.__uuidBytes);

        // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
        buf[6] = (buf[6] & 0x0f) | 0x40;
        buf[8] = (buf[8] & 0x3f) | 0x80;

        var i = 0,
            bth = r.__byteToHex;

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
     * @method bytes
     * @param [output] {TypedArray} The output array for the random data, if none specified a new Uint8Array(16) is created
     * @static
     */
    bytes: function(ary) {
        ary = ary || (support.typedArrays ? new Uint8Array(16) : new Array(16));
        window.crypto.getRandomValues(ary);
        return ary;
    },
    /**
     * Returns a random element of an array.
     *
     * @method element
     * @param array {Array} The array to choose from
     * @param start {Number} The index of the first element to include, defaults to 0
     * @param end {Number} The index of the last element to include, defaults to array.length - 1
     * @return {Number} either 1 or -1
     * @static
     */
    element: function(array, start, end) {
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

        return array[r.int(start, end)];
    }
};

// alias next to random and real
r.random = r.next;

// set the initial seed
r.seed(Math.floor(Date.now() * Math.random()));

//these polyfills are separated and exposed so that they can get tested

//if we support typed arrays we can do a good approximation of crypto.getRandomValues
r._getRandomValuesTyped = function(ary) {
    //get a Uint8 view into the buffer
    var buf = ary.buffer,
        len = buf.byteLength,
        view = new Uint8Array(buf);

    //fill the buffer one random byte at a time
    for(var i = 0, v; i < len; ++i) {
        //we only need a new random when we have pulled all the bytes out of the last one
        //which means every fourth byte we get a new random 32-bit value
        if((i & 0x03) === 0) {
            v = r.next() * 0x100000000;
        }

        //pull the next byte out of the random number
        view[i] = v >>> ((i & 0x03) << 3) & 0xff;
    }

    //return the original view which now has the data we put into the buffer
    return ary;
};

//without typed array support we can do one that returns an array of values
//but you would need to use `new Array(num)`, so there is a length
//or something like `var a = []; a[num - 1] = undefined;` so length is expanded
r._getRandomValuesArray = function(ary) {
    //fill the array with random values
    for(var i = 0; i < ary.length; ++i) {
        ary[i] = r.next() * 0x100000000;
    }

    return ary;
};

//polyfill crypto.getRandomValues if necessary
//crypto spec: http://wiki.whatwg.org/wiki/Crypto
if(!support.crypto) {
    window.crypto = window.crypto || {};

    if(support.typedArrays) {
        window.crypto.getRandomValues = r._getRandomValuesTyped;
    } else {
        window.crypto.getRandomValues = r._getRandomValuesArray;
    }
}

module.exports = r;
