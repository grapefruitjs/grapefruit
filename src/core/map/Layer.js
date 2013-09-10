var DisplayObjectContainer = require('../display/DisplayObjectContainer'),
    utils = require('../utils/utils');

/**
 * Base Layer implementation, provides common functions for all Layer types
 *
 * @class Layer
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
var Layer = module.exports = function(layer) {
    /**
     * The name of the layer
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    /**
     * The size of the layer
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(1, 1)
     */
    this.size = new gf.Vector(layer.width || 0, layer.height || 0);

    //call base ctor
    DisplayObjectContainer.call(this, layer);
};

utils.inherits(Layer, DisplayObjectContainer, {
    /**
     * Pans the layer around, rendering stuff if necessary
     *
     * @method pan
     * @param dx {Number|Point} The x amount to pan, if a Point is passed the dy param is ignored
     * @param dy {Number} The y ammount to pan
     * @return {Layer} Returns itself for chainability
     */
    pan: function() {
    }
});
