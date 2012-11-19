(function(Z) {
    var worlds = [],
        currentWorld = 0;

    Z.WorldManager = {
        addWorld: function(world) {
            //use loader to download world file, and parse
        },
        loadWorld: function(world, type) {
            //default to json type but can also be "tmx"
            type = type || 'json';
            //load this world for use (init tilemap, etc)
        }
    }; 
})(window.ZJS);