/**
 * A Text Object will create a line(s) of text to split a line you can use "\n"
 * see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Text.html">PIXI.Text</a>
 * for more information.
 *
 * @class Text
 * @extends Sprite
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param [style] {Object} The style parameters
 * @param [style.font] {String} default "bold 20pt Arial" The style and size of the font
 * @param [style.fill="black"] {Object} A canvas fillstyle that will be used on the text eg "red", "#00FF00"
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 * @param [style.stroke] {String} A canvas fillstyle that will be used on the text stroke eg "blue", "#FCFF00"
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap
 */
var Text = require('pixi.js').Text;

module.exports = Text;
