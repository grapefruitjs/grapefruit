var utils = require('../utils/utils'),
    DisplayObjectContainer = require('../display/DisplayObjectContainer');

/**
 * The base Gui that holds GuiItems to be added to the Camera
 *
 * @class Gui
 * @extends DisplayObjectContainer
 * @constructor
 */
var GuiContainer = module.exports = function(name) {
    /**
     * The name of the Gui
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = name || '';

    DisplayObjectContainer.call(this);
};

utils.inherits(GuiContainer, DisplayObjectContainer);
