/**
 * A tiling sprite is a fast way of rendering a tiling image
 * see <a href="http://www.goodboydigital.com/pixijs/docs/classes/TilingSprite.html">PIXI.TilingSprite</a>
 * for more information.
 *
 * @class TilingSprite
 * @extends <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/DisplayObjectContainer.html">PIXI.DisplayObjectContainer</a>
 * @constructor
 * @param texture {Texture} the texture of the tiling sprite
 * @param width {Number}  the width of the tiling sprite
 * @param height {Number} the height of the tiling sprite
 */
var TilingSprite = require('../vendor/pixi').TilingSprite;

module.exports = TilingSprite;
