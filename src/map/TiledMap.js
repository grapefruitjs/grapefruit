(function() {
    //Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
    //The loader knows to load all textures and other resources when loading a world TMX
    //file, and this expets that to already be done.
    gf.TiledMap = gf.Map.extend({
        //Init Tilemap and all layers
        init: function(map) {
            this._super(map);

            //tile size
            this.tileSize = new THREE.Vector2(map.tilewidth, map.tileheight);

            //tilesets
            this.tilesets = map.tilesets;

            //user-defined properties
            this.properties = map.properties;

            //version
            this.version = map.version;

            for(var i = 0, il = map.layers.length; i < il; ++i) {
                if(map.layers[i].type == gf.types.LAYER.TILE_LAYER)
                    this.addLayer(map.layers[i]);
            }
        },
        //add a new layer to this tilemap
        addLayer: function(layer) {
            layer.scale = this.properties.scale || 1;
            layer.zIndex = this.layers.length;
            var tilemapLayer = new gf.TiledMapLayer(layer, this.tileSize, this.tilesets);
            this.layers.push(tilemapLayer);

            //incase they add the map to the scene first, then add layers
            if(this.scene)
                tilemapLayer.addToScene(this.scene);
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
        //apply an iterator to each zone
        eachZone: function(fn) {
            for(var i = 0, il = this.zones.length; i < il; ++i) {
                if(fn.call(this, this.zones[i], i, this.zones) === false)
                    break;
            }
        }
    });

    gf.TiledMapTileset = Class.extend({
        init: function(settings) {
            this.size = new THREE.Vector2(settings.imagewidth, settings.imageheight);
            this.tileSize = new THREE.Vector2(settings.tilewidth, settings.tileheight);
            this.texture = settings.texture;

            this.firstgid = settings.firstgid;
            this.name = settings.name;
            this.margin = settings.margin;
            this.spacing = settings.spacing;

            this.properties = settings.properties;
        }
    });
})();