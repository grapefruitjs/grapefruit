(function() {
    //Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
    //The loader knows to load all textures and other resources when loading a world TMX
    //file, and this expets that to already be done.
    gf.TiledMap = gf.Map.extend({
        //Init Tilemap and all layers
        init: function(map) {
            if(!gf.support.webgl) {
                throw 'TiledMap is only supported using WebGL rendering.';
            }

            this._super(map);

            //tile size
            this.tileSize = new THREE.Vector2(map.tilewidth, map.tileheight);

            //user-defined properties
            this.properties = map.properties;

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
            for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
                var ts = new gf.TiledTileset(map.tilesets[t]);
                this.tilesets.push(ts);

                if(ts.name.toLowerCase().indexOf('collision') === 0) {
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
            layer.scale = this.properties.scale || 1;
            layer.zIndex = this.layers.length;
            var tilemapLayer = new gf.TiledLayer(layer, this.tileSize, this.tilesets);
            this.layers.push(tilemapLayer);

            if(tilemapLayer.name.toLowerCase().indexOf('collision') === 0) {
                this.collisionLayer = tilemapLayer;
            }

            //incase they add the map to the scene first, then add layers
            if(this.scene)
                tilemapLayer.addToScene(this.scene);
        },
        //add a new object group to this tilemap
        addObjectGroup: function(group) {
            group.zIndex = this.objectGroups.length + 1;
            var objgroup = new gf.TiledObjectGroup(group, this.tilesets);
            this.objectGroups.push(group);
        },
        //if object is moved by pv get the tile it would be at
        checkCollision: function(mesh, size, pv) {
            if(!this.collisionLayer) return;

            var pos = (new THREE.Vector2(mesh.position.x, mesh.position.y)), //simulate movement
                res = [];/*{
                    xtiles: [],
                    ytiles: []
                };*/

            size.divideScalar(2);

            //TODO: This is ungly since I am simulating movement in each axis separately. There
            // must be a cleaner way to accomplish this :/

            //if moving along X axis
            if(pv.x) {
                //simulate X movement
                var posX = pos.clone(); posX.x += pv.x;

                //if moving left check bl and tl positions
                if(pv.x < 0) {
                    //calc corners
                    var bl = posX.clone(), tl = posX.clone();
                    bl.x -= size.x;
                    bl.y -= size.y;
                    tl.x -= size.x;
                    tl.y += size.y;

                    //get corner tiles
                    var blTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(bl)),
                        tlTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(tl));

                    //TODO: Corner rolling?
                    if(blTile && blTile.isCollidable) res.push({ axis: 'x', tile: blTile });//res.xtiles.push(blTile);
                    if(tlTile && tlTile.isCollidable) res.push({ axis: 'x', tile: tlTile });//res.xtiles.push(tlTile);
                }
                //if moving right check br and tr positions
                else {
                    //calc corners
                    var br = posX.clone(), tr = posX.clone();
                    br.x += size.x;
                    br.y -= size.y;
                    tr.x += size.x;
                    tr.y += size.y;

                    //get corner tiles
                    var brTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(br)),
                        trTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(tr));

                    //TODO: Corner rolling?
                    if(brTile && brTile.isCollidable) res.push({ axis: 'x', tile: brTile });//res.xtiles.push(brTile);
                    if(trTile && trTile.isCollidable) res.push({ axis: 'x', tile: trTile });//res.xtiles.push(trTile);
                }
            }

            //if moving along Y axis
            if(pv.y) {
                //simulate Y movement
                var posY = pos.clone(); posY.y += pv.y;

                //if moving down check bl and br positions
                if(pv.y < 0) {
                    //calc corners
                    var bl = posY.clone(), br = posY.clone();
                    bl.x -= size.x;
                    bl.y -= size.y;
                    br.x += size.x;
                    br.y -= size.y;

                    //get corner tiles
                    var blTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(bl)),
                        brTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(br));

                    //TODO: Corner rolling?
                    if(blTile && blTile.isCollidable) res.push({ axis: 'y', tile: blTile });//res.ytiles.push(blTile);
                    if(brTile && brTile.isCollidable) res.push({ axis: 'y', tile: brTile });//res.ytiles.push(brTile);
                }
                //if moving up check tl and tr positions
                else {
                    //calc corners
                    var tl = posY.clone(), tr = posY.clone();
                    tl.x -= size.x;
                    tl.y += size.y;
                    tr.x += size.x;
                    tr.y += size.y;

                    //get corner tiles
                    var tlTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(tl)),
                        trTile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(tr));

                    //TODO: Corner rolling?
                    if(tlTile && tlTile.isCollidable) res.push({ axis: 'y', tile: tlTile });//res.ytiles.push(tlTile);
                    if(trTile && trTile.isCollidable) res.push({ axis: 'y', tile: trTile });//res.ytiles.push(trTile);
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
})();