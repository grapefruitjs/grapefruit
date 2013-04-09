/**
 * The base GuiItem that represents an element of a gui on the screen.
 *
 * @module gf
 * @class GuiItem
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.GuiItem = function(pos, settings) {
    /**
     * Whether or not the item needs an update
     *
     * @property dirty
     * @type Boolean
     * @default true
     */
    this.dirty = true;

    //allow user to pass the sprite texture as "image" to a GuiItem.
    settings.texture = settings.texture || settings.image;
    gf.Sprite.call(this, pos, settings);
};

gf.inherits(gf.GuiItem, gf.Sprite, {
    /**
     * Overrides base update to do some calculations. Called internally on each frame
     *
     * @method update
     */
    update: function() {
        gf.Sprite.prototype.update.call(this);
    }
});
