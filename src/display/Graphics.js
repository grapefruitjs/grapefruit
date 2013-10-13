/**
 * The Graphics class contains a set of methods that you can use to create primitive shapes and lines. 
 * It is important to know that with the webGL renderer only simple polys can be filled at this stage
 * Complex polys will not be filled. Heres an example of a complex poly: http://www.goodboydigital.com/wp-content/uploads/2013/06/complexPolygon.png
 * see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Graphics.html">PIXI.Graphics</a>
 * for more information.
 *
 * @class Graphics
 * @extends [PIXI.DisplayObjectContainer](http://www.goodboydigital.com/pixijs/docs/classes/DisplayObjectContainer.html)
 * @constructor
 */
var Graphics = require('../vendor/pixi').Graphics;

module.exports = Graphics;
