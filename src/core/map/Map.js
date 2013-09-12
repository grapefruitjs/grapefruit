var DisplayObjectContainer = require('../display/DisplayObjectContainer'),
    Vector = require('../math/Vector'),
    globals = require('../globals');

/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @class Map
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param map {Object} All the settings for the map
 */
var Map = module.exports = function(map) {
    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new Vector(0, 0)
     */
    this.size = new Vector(map.width, map.height);

    //call base ctor
    DisplayObjectContainer.call(this, map);
};

globals.inherits(Map, DisplayObjectContainer, {
    /**
     * Pans the map around
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Map} Returns itself for chainability
     */
    pan: function(x, y) {
        y = x.y !== undefined ? x.y : (y || 0);
        x = x.x !== undefined ? x.x : (x || 0);

        this.position.x += x;
        this.position.y += y;

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.pan)
                o.pan(x, y);
        }
    },
    /**
     * Finds a layer based on the string name
     *
     * @method findLayer
     * @param name {String} The name of the layer to find
     * @return {Layer}
     */
    findLayer: function(name) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.name === name)
                return o;
        }
    }
});
