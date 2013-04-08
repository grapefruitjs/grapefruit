/**
 * The base GuiItem that represents an element of a gui on the screen.
 *
 * @module gf
 * @class GuiElement
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.GuiItem = function(pos, settings) {
    //allow user to pass the sprite texture as "image" to a GuiItem.
    settings.texture = settings.texture || settings.image;
    gf.Sprite.call(this, pos, settings);
};

gf.inherits(gf.GuiItem, gf.Sprite);
