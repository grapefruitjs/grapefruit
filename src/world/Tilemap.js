(function(Z) {
    Z.Tilemap = Class.extend({
        //Init Tilemap and all layers
        init: function(map) {
            this.size = new THREE.Vector2(map.width, map.height);
            this.tileSize = new THREE.Vector2(map.tilewidth, map.tileheight);

            this.orientation = map.orientation; //only orthogonal supported
            this.properties = map.properties;
            this.tilesets = map.tilesets;

            this.version = map.version;

            this.layers = [];

            for(var i = 0, il = map.layers.length; i < il; ++i) {
                this.addLayer(map.layers[i]);
            }

            //TODO: zones??
        },
        //add a new layer to this tilemap
        addLayer: function(layer) {
            var tilemapLayer = new Z.TilemapLayer(layer, this.tileSize, this.tilesets);
            this.layers.push(tilemapLayer);

            //incase they add the map to the scene first, then add layers
            if(this.scene)
                tilemapLayer.addToScene(this.scene);
        },
        //add all layers to the scene
        addToScene: function(scene) {
            this.scene = scene;

            //incase they add layers first, then add the map to the scene
            this.eachLayer(function(layer) {
                if(!layer.scene || layer.scene != scene)
                    layer.addToScene(scene);
            });
        },
        //load a new zone as the player enters it
        loadZone: function(zone) {
            //set the new zone
            this.zone = this.findZoneIndex(zone);
        },
        //find the index of a zone based on different inputs
        findZoneIndex: function(z) {
            if(typeof z == 'number') return z;
            var check, index = null;

            //if z is a vector, make it an array
            if(z instanceof THREE.Vector2) z = [z.x, z.y];

            //if z is an Array we use it as a point to find which zone that point is in
            if(z instanceof Array) {
                check = function(zone) { return util.pointInPoly(zone.vertices, z); };
            }
            //if z is a string, find the zone that has that name
            else if(typeof z == 'string') {
                check = function(zone) { return zone.name == z; };
            }

            if(check) {
                this.eachZone(function(zone, i) {
                    if(check(zone)) {
                        index = i;
                        return false;
                    }
                });
            }

            return index;
        },
        //converts the vertex units of zones into world coordinates
        upgradeVertexUnits: function(zone) {
            if(zone.vertexUnits === types.UNIT.OFFSETS) return;

            //Convert the vertices from pixels to offsets if necessary
            //pixel offsets are from the topleft of the tilemap, but offset units are from the center of the screen
            for (var i = 0, il = zone.vertices.length; i < il; ++i) {
                this.upgradeCoord(zone.vertices[i]);
            }
            zone.vertexUnits = types.UNIT.OFFSETS;
        },
        //converts a coord from pixel position to world coord
        upgradeCoord: function(coord) {
            if(coord instanceof THREE.Vector2) {
                coord.x = (coord.x - (this.tilemapSize.x / 2)) * this.tileSize * this.tileScale;
                coord.y = ((this.tilemapSize.y / 2) - coord.y) * this.tileSize * this.tileScale;
            } else if(coord instanceof Array) {
                coord[0] = (coord[0] - (this.tilemapSize.x / 2)) * this.tileSize * this.tileScale;
                coord[1] = ((this.tilemapSize.y / 2) - coord[1]) * this.tileSize * this.tileScale;
            }

            return coord;
        },
        //apply an iterator to each layer
        eachLayer: function(fn) {
            for(var i = 0, il = this.layers.length; i < il; ++i) {
                if(fn.call(this, this.layers[i], i, this.layers) === false)
                    break;
            }
        },
        //apply an iterator to each zone
        eachZone: function(fn) {
            for(var i = 0, il = this.zones.length; i < il; ++i) {
                if(fn.call(this, this.zones[i], i, this.zones) === false)
                    break;
            }
        }
    });
})(window.ZJS);