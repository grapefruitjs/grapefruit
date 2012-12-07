(function() {
    //Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
    //The loader knows to load all textures and other resources when loading a world TMX
    //file, and this expets that to already be done.
    gf.TiledMap = gf.Map.extend({
        //Init Tilemap and all layers
        init: function(map) {
            /*if(!gf.support.webgl) {
                throw 'TiledMap is only supported using WebGL rendering.';
            }*/

            this._super(map);

            //tile size
            this.tileSize = new THREE.Vector2(map.tilewidth, map.tileheight);

            //user-defined properties
            map.properties = map.properties || {};
            this.scale = map.properties.scale || 1;

            //scaled size (size * tileSize * scale)
            this.scaledSize = new THREE.Vector2(
                this.size.x * this.tileSize.x * this.scale,
                this.size.y * this.tileSize.y * this.scale
            );
            //assuming 0,0 is in the middle of the map, calculate the minimum
            //and maximum extent of the map
            this.extent = {
                x: {
                    min: ~~(this.scaledSize.x / 2) - this.scaledSize.x, 
                    max: this.scaledSize.x - ~~(this.scaledSize.x / 2)
                },
                y: {
                    min: ~~(this.scaledSize.y / 2) - this.scaledSize.y,
                    max: this.scaledSize.y - ~~(this.scaledSize.y / 2)
                }
            };

            //tilesets
            this.tilesets = [];

            //object groups
            this.objectGroups = [];

            //the layer for collisions
            this.collisionLayer = [];
            this.collisionTileset = null;

            //version
            this.version = map.version;

            //create the tileset objects
            this.tilesetMaps = {
                textures: [],
                firstgids: [],
                lastgids: [],
                sizes: [],
                inverseSizes: [],
                numTiles: []
            };
            for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
                var ts = new gf.TiledTileset(map.tilesets[t]);

                //Since Three.js doesn't support passing structs into a shader
                //we have to create some arrays with each index corresponding
                //to the values of each element.
                //
                //Basically instead of 
                //struct Tileset { gid, ... }
                //uniform Tileset tilesets[];
                //
                //We do:
                //uniform int gids[];
                //uniform sampler2D textures[];
                this.tilesetMaps.textures.push(ts.texture);
                this.tilesetMaps.firstgids.push(ts.firstgid);
                this.tilesetMaps.lastgids.push(ts.lastgid);
                this.tilesetMaps.sizes.push(ts.size);
                this.tilesetMaps.inverseSizes.push(new THREE.Vector2(1 / ts.size.x, 1 / ts.size.y));
                this.tilesetMaps.numTiles.push(ts.numTiles);
                this.tilesets.push(ts);

                if(ts.name.toLowerCase().indexOf('collider') === 0) {
                    this.collisionTileset = ts;
                }
            }

            for(var i = 0, il = map.layers.length; i < il; ++i) {
                if(map.layers[i].type == gf.types.LAYER.TILE_LAYER)
                    this.addLayer(map.layers[i]);
                else if(map.layers[i].type == gf.types.LAYER.OBJECT_GROUP)
                    this.addObjectGroup(map.layers[i]);
            }
        },
        //add a new layer to this tilemap
        addLayer: function(layer) {
            layer.scale = this.scale;
            layer.zIndex = this.layers.length;
            var tilemapLayer = new gf.TiledLayer(layer, this.tileSize, this.tilesetMaps);
            this.layers.push(tilemapLayer);

            if(tilemapLayer.name.toLowerCase().indexOf('collision') === 0) {
                this.collisionLayer = tilemapLayer;
                if(!gf.debug.showMapColliders) tilemapLayer.hide();
            }

            //incase they add the map to the scene first, then add layers
            if(this.scene)
                tilemapLayer.addToScene(this.scene);

            return this;
        },
        //add a new object group to this tilemap
        addObjectGroup: function(group) {
            group.zIndex = this.objectGroups.length + 1;
            var objgroup = new gf.TiledObjectGroup(group, this.tilesets);
            this.objectGroups.push(group);

            return this;
        },
        //if object is moved by pv get the tile it would be at
        checkCollision: function(mesh, sz, pv) {
            if(!this.collisionLayer || !this.collisionTileset) return;

            var pos = new THREE.Vector2(mesh.position.x, mesh.position.y),
                size = sz.clone().divideScalar(2),
                left = pos.x - size.x,
                right = pos.x + size.x,
                top = pos.y + size.y,
                bottom = pos.y - size.y,
                x = (pv.x < 0) ? Math.floor(left + pv.x) : Math.ceil(right + pv.x),
                y = (pv.y < 0) ? Math.floor(bottom + pv.y) : Math.ceil(top + pv.y),
                res = [],
                tile = null;

            //check X movement
            if(x <= this.extent.x.min || x >= this.extent.x.max) {
                res.push({ axis: 'x', tile: { type: gf.types.COLLISION.SOLID } });
            } else if(pv.x) {
                //x, bottom corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(x, Math.floor(bottom)));
                if(tile && tile.isCollidable) {
                    res.push({ axis: 'x', tile: tile });
                } else {
                    //x, top corner
                    tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(x, Math.ceil(top)));
                    if(tile && tile.isCollidable) {
                        res.push({ axis: 'x', tile: tile });
                    }
                }
            }

            //check Y movement
            if(y <= this.extent.y.min || y >= this.extent.y.max) {
                res.push({ axis: 'y', tile: { type: gf.types.COLLISION.SOLID } });
            } else if(pv.y) {
                //y, left corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId((pv.x < 0) ? Math.floor(left) : Math.ceil(right), y));
                if(tile && tile.isCollidable) {
                    res.push({ axis: 'y', tile: tile });
                } else {
                    //y, right corner
                    tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId((pv.x < 0) ? Math.ceil(right) : Math.floor(left), y));
                    if(tile && tile.isCollidable) {
                        res.push({ axis: 'y', tile: tile });
                    }
                }
            }

            return res;
        },

        /////////////////////////
        // REMOVE BELOW??
        /////////////////////////

        //load a new zone as the player enters it
        loadZone: function(zone) {
            //set the new zone
            this.zone = this.findZoneIndex(zone);

            return this;
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

            return this;
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

            return this;
        }
    });
})();