/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @module gf
 * @class audio
 */
gf.Map = function(settings) {
    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.size = new gf.Vector(settings.width, settings.height);

    /**
     * The layers of the map
     *
     * @property layers
     * @type Vector
     * @private
     * @default []
     */
    this.layers = [];
};

gf.inherits(gf.Map, Object, {
    /**
     * Adds a layer to the map
     *
     * @method addLayer
     * @param layer {Layer}
     * @return {Map} Returns itself for chainability
     */
    addLayer: function(layer) {
        this.layers.push(layer);

        return this;
    },
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

        if(typeof id === 'string') {
            var lyr = null;
            this.eachLayer(function(layer) {
                if(layer.name === id) {
                    lyr = layer;
                    return false;
                }
            });

            return lyr;
        }

        return null;
    },
    /**
     * Adds the map and all layers to the scene
     *
     * @method addToScene
     * @param scene {gf.game._stage} The game stage to add everything to
     * @return {Map} Returns itself for chainability
     */
    addToScene: function(scene) {
        this.scene = scene;

        //incase they add layers first, then add the map to the scene
        this.eachLayer(function(layer) {
            if(!layer.scene || layer.scene !== scene)
                layer.addToScene(scene);
        });

        return this;
    },
    /**
     * Applies an iterator function to each of the layers.
     *
     * @method eachLayer
     * @param iterator {Function} The iterator to call for each layer in the Map
     * @return {Map} Returns itself for chainability
     */
    eachLayer: function(fn) {
        for(var i = 0, il = this.layers.length; i < il; ++i) {
            if(fn.call(this, this.layers[i], i, this.layers) === false)
                break;
        }

        return this;
    }
});