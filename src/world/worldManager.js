(function(Z) {
    var worlds = [],
        entities = [],
        currentWorld = 0;

    Z.WorldManager = {
        addWorld: function(world) {
            //init a tilemap and then add it to `worlds`
        },
        loadWorld: function(world, type) {
            //use loader to download world file, and parse
            //need to load each texture for each layer (tilelayer types)
            //need to load each sprite texture for each layer (objectgroup types, with sprite objects)
        }
    }; 
})(window.ZJS);