gf.TiledObjectGroup = function(group, map) {
    //objects in this group
    this.objects = group.objects;

    //spawned enitites
    this.ents = [];

    //map reference
    this.map = map;

    //tilesets in the map
    this.tilesets = map.tilesets;

    //name
    this.name = group.name;

    //size
    this.size = new gf.Vector(group.width, group.height);

    //position
    this.position = new gf.Vector(group.x * this.map.scale, group.y * this.map.scale);

    //visible
    this.visible = group.visible;

    //opacity
    this.opacity = group.opacity;

    //zIndex
    this.zIndex = group.zIndex;

    //user-defined properties
    this.properties = group.properties || {};
};

gf.inherits(gf.TiledObjectGroup, Object, {
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
            //convert tiled x,y coords into world coords
            //tiled does x,y from top left. We do x,y from center
            props.position = [
                (o.x * this.map.scale) - (this.map.scaledSize.x / 2),
                -((o.y * this.map.scale) - (this.map.scaledSize.y / 2))
            ];

            //spawn from entity pool
            this.ents.push(gf.entityPool.create(props.name, props));

            //add the new entity to the game
            gf.game.addObject(this.ents[i]);
        }

        return this;
    },
    despawn: function() {
        //remove each entity from the game
        for(var i = 0, il = this.ents.length; i < il; ++i) {
            gf.game.removeObject(this.ents[i]);
        }

        //empty the ents array
        this.ents.length = 0;

        return this;
    }
});
