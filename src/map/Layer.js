/**
 * Base Layer implementation, provides common functions for all Layer types
 *
 * @module gf
 * @class Layer
 * @extends DisplayObjectContainer
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
gf.Layer = function(layer) {
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
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, layer);

    /**
     * Half of the size of the layer
     *
     * @property hSize
     * @type Vector
     * @private
     */
    this.hSize = this.size.clone().divideScalar(2);
};

gf.inherits(gf.Layer, gf.DisplayObject);