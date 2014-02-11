/**
 * A RenderTexture is a special texture that allows any pixi displayObject to be rendered to it.
 *
 * __Hint__: All DisplayObjects (exmpl. Sprites) that renders on RenderTexture should be preloaded.
 * Otherwise black rectangles will be drawn instead.
 *
 * RenderTexture takes snapshot of DisplayObject passed to render method. If DisplayObject is passed to render method, position and rotation of it will be ignored. For example:
 *
 * ```
 * var renderTexture = new gf.RenderTexture(800, 600);
 * var sprite = gf.Sprite(texture);
 * sprite.position.x = 800/2;
 * sprite.position.y = 600/2;
 * sprite.anchor.x = 0.5;
 * sprite.anchor.y = 0.5;
 * renderTexture.render(sprite);
 * ```
 *
 * Sprite in this case will be rendered to 0,0 position. To render this sprite at center Container should be used:
 *
 * ```
 * var doc = new gf.Container();
 * doc.addChild(sprite);
 * renderTexture.render(doc);  // Renders to center of renderTexture
 * ```
 *
 * *This is directly exposing [PIXI.RenderTexture](http://www.goodboydigital.com/pixijs/docs/classes/RenderTexture.html)*
 *
 * @class RenderTexture
 * @extends Texture
 * @constructor
 * @param width {Number} The width of the render texture
 * @param height {Number} The height of the render texture
 */
var RenderTexture = require('pixi.js').RenderTexture;

module.exports = RenderTexture;
