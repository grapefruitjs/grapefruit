var utils = require('../utils/utils'),
    Container = require('../display/Container');

/**
 * The base Gui that holds GuiItems to be added to the Camera
 *
 * @class Gui
 * @extends Container
 * @constructor
 */
var Gui = module.exports = function(name) {
    /**
     * The name of the Gui
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = name || '';

    Container.call(this);
};

utils.inherits(Gui, Container);
