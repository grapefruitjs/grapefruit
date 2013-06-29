/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @class Map
 * @extends DisplayObject
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.Map = function(map) {
    //mixin the Event Target methods
    gf.Emitter.call(this);

    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.size = new gf.Vector(map.width, map.height);

    //call base ctor
    gf.DisplayObjectContainer.call(this, map);
};

gf.inherits(gf.Map, gf.DisplayObjectContainer, {
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