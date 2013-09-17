module.exports = require('../vendor/pixi').Rectangle;

/**
 * Returns the right most X coord
 *
 * @property right
 * @type Number
 * @readOnly
 */
Object.defineProperty(Rectangle.prototype, 'right', {
    get: function() {
        return this.x + this.width;
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
        return this.y + this.height;
    }
});