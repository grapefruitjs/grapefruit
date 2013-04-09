/**
 * The base Gui that holds GuiItems to be presented as a Gui
 *
 * @module gf
 * @class Gui
 * @extends DisplayObject
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.Gui = function(pos, settings) {
    /**
     * The name of the Gui
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    gf.DisplayObject.call(this, settings);

    //mixin user's settings
    gf.utils.setValues(this, settings);
};

gf.inherits(gf.GuiItem, gf.DisplayObject);
