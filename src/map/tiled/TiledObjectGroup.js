(function() {
    gf.TiledObjectGroup = Class.extend({
        init: function(group, tilesets) {
            //objects in this group
            this.objects = group.objects;

            //spawned enitites
            this.ents = [];

            //tilesets in the map
            this.tilesets = tilesets;

            //name
            this.name = group.name;

            //size
            this.size = new THREE.Vector2(group.width, group.height);

            //visible
            this.visible = group.visible;

            //zIndex
            this.zIndex = group.zIndex;

            //user-defined properties
            this.properties = group.properties;
        },
        spawn: function() {
            for(var i = 0, il = this.objects.length; i < il; ++i) {
                var o = this.objects[i];

                //copy properties to main object
                if(o.properties) {
                    gf.utils.each(o.properties, function(k, v) {
                        o[k] = v;
                    });
                    delete o.properties;
                }

                //massage size and index in
                if(o.size === undefined) o.size = [o.width, o.height];
                if(o.zIndex === undefined) o.zIndex = this.zIndex;

                //spawn from entity pool
                this.ents.push(gf.entityPool.create(o));

                //add the new entity to the game
                gf.game.addObject(this.ents[i]);
            }
        },
        despawn: function() {
            //remove each entity from the game
            for(var i = 0, il = this.ents.length; i < il; ++i) {
                gf.game.removeObject(this.ents[i]);
            }

            //lose references so they get cleaned up
            this.ents = [];
        }
    });
})();
