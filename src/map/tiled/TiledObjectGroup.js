/**
 * Tiled object group is a special layer that contains entities
 *
 * @module gf
 * @class TiledObjectGroup
 * @extends Layer
 * @constructor
 * @param group {Object} All the settings for the layer
 */
 gf.TiledObjectGroup = function(group) {
    gf.Layer.call(this, group);

    /**
     * The user-defined properties of this group. Usually defined in the TiledEditor
     *
     * @property properties
     * @type Object
     */
    this.properties = group.properties || {};

    /**
     * The objects in this group that can be spawned
     *
     * @property objects
     * @type Array
     */
    this.objects = group.objects;

    //translate some tiled properties to our inherited properties
    this.position.x = group.x;
    this.position.y = group.y;
    this.alpha = group.opacity;
};

gf.inherits(gf.TiledObjectGroup, gf.Layer, {
    /**
     * Spawns all the entities associated with this layer, and properly sets their attributes
     *
     * @method spawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    spawn: function() {
        for(var i = 0, il = this.objects.length; i < il; ++i) {
            var o = this.objects[i],
                props = o.properties || {};

            props.name = o.name;
            props.type = o.type;
            props.size = [o.width, o.height];
            props.zIndex = this.zIndex;
            props.opacity = this.opacity;
            props.visible = this.visible;
            props.position = [o.x, o.y];
            //convert tiled x,y coords into world coords
            //tiled does x,y from top left. We do x,y from center
            /*props.position = [
                (o.x * this.map.scale) - (this.map.scaledSize.x / 2),
                -((o.y * this.map.scale) - (this.map.scaledSize.y / 2))
            ];*/

            //spawn from entity pool
            this.addChild(gf.entityPool.create(props.name, props));
        }

        return this;
    },
    /**
     * Despawns all the entities associated with this layer
     *
     * @method despawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    despawn: function() {
        //remove each entity from the game
        for(var i = this.children.length; i > -1; --i) {
            this.removeChild(this.children[i]);
        }

        return this;
    }
});
