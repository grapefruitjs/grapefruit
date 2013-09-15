var core = require('../core/core');

/**
 * The base Gui that holds GuiItems to be added to the Camera
 *
 * @class Gui
 * @extends gf.DisplayObjectContainer
 * @namespace gf
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

    core.DisplayObjectContainer.call(this);
};

core.inherits(Gui, core.DisplayObjectContainer);
