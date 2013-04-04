/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @module gf
 * @class Map
 * @extends DisplayObjectContainer
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.Map = function(map) {
    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.size = new gf.Vector(map.width, map.height);

    //call base ctor
    PIXI.DisplayObjectContainer.call(this);

    //mixin user's settings
    gf.utils.setValues(this, map);
};

gf.inherits(gf.Map, PIXI.DisplayObjectContainer, {
    /**
     * Gets a layer based on the layer's id or name
     *
     * @method getLayer
     * @param id {Number|String} The layer's number id or string name.
     * @return {Layer} Returns the found layer, or null if not found
     */
    getLayer: function(id) {
        if(typeof id === 'number')
            return this.layers[id] || null; //return null if not found

        if(typeof id === 'string')
            for(var i = 0, il = this.children.length; i < il; ++i)
                if(this.children[i].name === id)
                    return this.children[i];

        return null;
    }
});