(function(Z) {
    Z.Tilemap = Class.extend({
        init: function(opts) {
            this.layers = [];
            opts = opts || {};

            this.tileScale = opts.tileScale || 4.0;
            this.tileSize = opts.tileSize || 16;
            this.zones = opts.zones || [];
            this.zone = this.findZoneIndex(opts.zone) || 0;
            this.tilemapSize = new THREE.Vector2(opts.mapSize[0], opts.mapSize[1]);

            this.loader = new AssetLoader();

            this.eachZone(function(zone) {
                this.upgradeVertexUnits(zone);
            });

            if(opts.layers && opts.layers.length) {
                for(var i = 0, il = opts.layers.length; i < il; ++i) {
                    //load resources necessary
                    this.loadLayer(opts.layers[i]);
                }
            }
        },
        addLayer: function(resources, opts) {
            if(typeof opts == 'string') {
                var temp = opts;
                opts = { name: temp };
            }

            opts = opts || {};
            opts.tileScale = this.tileScale;
            opts.tileSize = this.tileSize;
            opts.zIndex = (opts.zIndex !== undefined) ? opts.zIndex : this.layers.length;

            var layer = new TileMapLayer(this.engine, resources, opts, this);
            this.layers.push(layer);

            //incase they add the map to the scene first, then add layers
            if(this.scene)
                layer.addToScene(this.scene);
        },
        loadLayer: function(lyr) {
            var self = this;

            this.loader.loadResources(
                [
                    { name: 'tilemap', type: 'texture', src: lyr.tilemapSrc },
                    { name: 'tileset', type: 'texture', src: lyr.tilesetSrc }
                ],
                function(rsrcs) {
                    self.addLayer(rsrcs, lyr);
                }
            );
        },
        //removes the first layer matching the index, or name passed
        //returns the layer removed, or undefined if not found.
        removeLayer: function(which) {
            var lyr;
            //index to remove
            if(typeof which == 'number') {
                lyr = this.layers.splice(which, 1)[0];
            }
            //name of layer to remove
            else {
                var index;
                this.eachLayer(function(layer, i) {
                    if(layer.name == which) {
                        index = i;
                        return false; //break
                    }
                });

                if(index) lyr = this.layers.splice(index, 1)[0];
            }

            return lyr;
        },
        addToScene: function(scene) {
            this.scene = scene;

            //incase they add layers first, then add the map to the scene
            this.eachLayer(function(layer) {
                if(!layer.scene || layer.scene != scene)
                    layer.addToScene(scene);
            });
        },
        pan: function() {
            this.eachLayer(function(layer) {
                layer.pan.apply(layer, arguments);
            });
        },
        loadZone: function(zone) {
            //set the new zone
            this.zone = this.findZoneIndex(zone);
        },
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
        upgradeVertexUnits: function(zone) {
            if(zone.vertexUnits === types.UNIT.OFFSETS) return;

            //Convert the vertices from pixels to offsets if necessary
            //pixel offsets are from the topleft of the tilemap, but offset units are from the center of the screen
            for (var i = 0, il = zone.vertices.length; i < il; ++i) {
                this.upgradeCoord(zone.vertices[i]);
            }
            zone.vertexUnits = types.UNIT.OFFSETS;
        },
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
        eachLayer: function(fn) {
            for(var i = 0, il = this.layers.length; i < il; ++i) {
                if(fn.call(this, this.layers[i], i, this.layers) === false)
                    break;
            }
        },
        eachZone: function(fn) {
            for(var i = 0, il = this.zones.length; i < il; ++i) {
                if(fn.call(this, this.zones[i], i, this.zones) === false)
                    break;
            }
        }
    });
})(window.ZJS);