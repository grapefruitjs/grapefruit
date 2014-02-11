/**
 * A texture stores the information that represents an image. All textures have a base texture
 * *This is directly exposing [PIXI.BaseTexture](http://www.goodboydigital.com/pixijs/docs/classes/BaseTexture.html)*
 *
 * @class BaseTexture
 * @uses EventEmitter
 * @constructor
 * @param source {Image|Canvas} the source object (image or canvas)
 */
var BaseTexture = require('pixi.js').BaseTexture;

module.exports = BaseTexture;
