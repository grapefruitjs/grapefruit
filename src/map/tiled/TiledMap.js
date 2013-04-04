/**
 * Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @module gf
 * @class Tiled Map
 */
gf.TiledMap = function(map) {
    gf.Map.call(this, map);

    /**
     * The tile size
     *
     * @property tileSize
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.tileSize = new gf.Vector(map.tilewidth, map.tileheight);

    /**
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = map.properties || {};

    /**
     * The scale of the map
     *
     * @property scale
     * @type Number
     * @default 1
     */
    this.scale = this.properties.scale || 1;

    /**
     * The scaled size (size * tileSize * scale)
     *
     * @property scaledSize
     * @type Vector
     */
    this.scaledSize = new gf.Vector(
        this.size.x * this.tileSize.x * this.scale,
        this.size.y * this.tileSize.y * this.scale
    );

    /**
     * The maximum extent of the map (largest x and y the map has)
     * assuming 0,0 is in the middle of the map, calculate the minimum
     * and maximum extent of the map
     *
     * @property extent
     * @type Object
     */
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

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        this.tilesets.push(new gf.TiledTileset(map.tilesets[t]));
    }

    /**
     * The layer for collisions
     *
     * @property collisionLayer
     * @type Array
     */
    this.collisionLayer = [];

    /**
     * The tileset for the collision layer
     *
     * @property collisionTileset
     * @type TiledTileset
     */
    this.collisionTileset = null;

    /**
     * The version of this map
     *
     * @property version
     * @type String
     */
    this.version = map.version;

    this.createLayers();
};

gf.inherits(gf.TiledMap, gf.Map, {
    //add a new layer to this tilemap
    createLayers: function(layer) {
        for(var i = 0, il = map.layers.length; i < il; ++i) {
            var lyr;

            if(map.layers[i].type === gf.types.LAYER.TILE_LAYER) {
                lyr = new gf.TiledLayer(map.layers[i], this.tileSize, this.tilesets);
                lyr.scale = this.scale;

                if(lyr.name.toLowerCase().indexOf('collision') === 0) {
                    this.collisionLayer = lyr;
                    if(!gf.debug.showMapColliders) lyr.hide();
                }
            } else if(map.layers[i].type === gf.types.LAYER.OBJECT_GROUP) {
                lyr = new gf.TiledObjectGroup(map.layers[i], this);

                //auto spawn the player object group
                if(lyr.name === 'player' && !lyr.properties.manual)
                    lyr.spawn();
            }

            this.addChild(lyr);
        }
    },
    //if object is moved by pv get the tile it would be at
    checkCollision: function(mesh, sz, pv) {
        if(!this.collisionLayer || !this.collisionTileset) return [];

        var pos = new gf.Vector(mesh.position.x, mesh.position.y),
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
            if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                res.push({ axis: 'x', tile: tile });
            } else {
                //x, top corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(x, Math.ceil(top)));
                if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
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
            if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                res.push({ axis: 'y', tile: tile });
            } else {
                //y, right corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId((pv.x < 0) ? Math.ceil(right) : Math.floor(left), y));
                if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                    res.push({ axis: 'y', tile: tile });
                }
            }
        }

        return res;
    },

    _checkHalfBlock: function(half, x, y) {
        var tx = Math.floor(x / this.tileSize.x) * this.tileSize.x,
            ty = Math.floor(y / this.tileSize.y) * this.tileSize.y,
            midX = tx + ((this.tileSize.x) / 2),
            endX = tx + (this.tileSize.x),
            midY = ty - ((this.tileSize.y) / 2),
            endY = ty - (this.tileSize.y);

        switch(half) {
            case gf.types.HALF.LEFT:
                return (x > tx && x < midX);

            case gf.types.HALF.RIGHT:
                return (x > midX && x < endX);

            case gf.types.HALF.TOP:
                return (y > midY && y < ty);

            case gf.types.HALF.BOTTOM:
                return (y > endY && y < midY);
        }

        return false;
    }
});
