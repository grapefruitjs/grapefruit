/**
 * A tiling sprite is a fast way of rendering a tiling image
 * see [PIXI.TilingSprite](http://www.goodboydigital.com/pixijs/docs/classes/TilingSprite.html)
 * for more information.
 *
 * @class TilingSprite
 * @extends [PIXI.DisplayObjectContainer](http://www.goodboydigital.com/pixijs/docs/classes/DisplayObjectContainer.html)
 * @constructor
 * @param texture {Texture} the texture of the tiling sprite
 * @param width {Number}  the width of the tiling sprite
 * @param height {Number} the height of the tiling sprite
 */
var TilingSprite = require('../vendor/pixi').TilingSprite;

module.exports = TilingSprite;
