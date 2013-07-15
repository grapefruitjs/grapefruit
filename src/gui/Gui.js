/**
 * The base Gui that holds GuiItems to be added to the Camera
 *
 * @class Gui
 * @extends DisplayObjectContainer
 * @constructor
 */
gf.Gui = function(name) {
    /**
     * The name of the Gui
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = name || '';

    gf.DisplayObjectContainer.call(this);
};

gf.inherits(gf.Gui, gf.DisplayObjectContainer);
