/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @class Map
 * @extends DisplayObject
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.Map = function(game, pos, map) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.size = new gf.Vector(map.width, map.height);

    //call base ctor
    gf.DisplayObject.call(this, game, pos, map);
};

gf.inherits(gf.Map, gf.DisplayObject, {
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
    },
    /**
     * Pans the map around
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Map} Returns itself for chainability
     */
    pan: function(x, y) {
        y = x instanceof gf.Point ? x.y : (y || 0);
        x = x instanceof gf.Point ? x.x : (x || 0);

        this.position.x += x;
        this.position.y += y;

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.pan)
                o.pan(x, y);
        }
    }
});