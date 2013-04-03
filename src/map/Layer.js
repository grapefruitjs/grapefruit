/**
 * Base Layer implementation, provides common functions for all Layer types
 *
 * @module gf
 * @class Layer
 */
gf.Layer = function(settings) {
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
    this.size = new gf.Vector(settings.width || 0, settings.height || 0);

    /**
     * Texture of the layer
     *
     * @property texture
     * @type Texture
     * @default null
     */
    this.texture = null;

    //call base ctor
    PIXI.DisplayObjectContainer.call(this);

    //mixin user's settings
    gf.utils.setValues(this, settings);

    /**
     * Half of the size of the layer
     *
     * @property hSize
     * @type Vector
     * @private
     */
    this.hSize = this.size.clone().divideScalar(2);
};

gf.inherits(gf.Layer, PIXI.DisplayObjectContainer);