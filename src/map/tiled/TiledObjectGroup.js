/**
 * Tiled object group is a special layer that contains entities
 * TODO: This is all trash
 *
 * @class TiledObjectGroup
 * @extends Layer
 * @constructor
 * @param group {Object} All the settings for the layer
 */
 gf.TiledObjectGroup = function(group) {
    gf.Layer.call(this, group);

    /**
     * The color to display objects in this group
     *
     * @property color
     * @type
     */
    this.color = group.color;

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
    this.visible = group.visible;
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

            /*
             * Future Shape support
             *

            if(o.polyline) this.spawnPolyline(o);
            else if(o.polygon) this.spawnPolygon(o);
            else if(o.ellipse) this.spawnEllipse(o);
            else this.spawnRectangle(o);

             */

            //this.TiledMap.GameState.Game.spritepool
            //this.parent.parent.parent.spritepool.create(o.name, )

            props.name = o.name;
            props.type = o.type;
            props.width = o.width;
            props.height = o.height;
            props.zIndex = this.zIndex;
            props.visible = o.visible !== undefined ? (o.visible === 1) : true; //recently added, default old versions to true
            props.position = [o.x, o.y];
            props.rotation = o.rotation;
            props.gid = o.gid;

            //spawn from entity pool
            this.addChild(this.game.entitypool.create(props.name, props));
            this.game.players.push(this.children[i]);
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
