/**
 * Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @module gf
 * @class TiledMap
 * @extends Map
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.TiledMap = function(game, map) {
    gf.Map.call(this, game, map);

    this.scale.x = parseInt(map.properties.scale, 10) || 1;
    this.scale.y = parseInt(map.properties.scale, 10) || 1;

    /**
     * The tile size
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(
        map.tilewidth,
        map.tileheight
    );

    /**
     * The scaled tile size
     *
     * @property scaledTileSize
     * @type Vector
     */
    this.scaledTileSize = new gf.Vector(
        map.tilewidth * this.scale.x,
        map.tileheight * this.scale.y
    );

    /**
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = map.properties || {};

    /**
     * The real size (size * scaledTileSize)
     *
     * @property realSize
     * @type Vector
     */
    this.realSize = new gf.Vector(
        this.size.x * this.scaledTileSize.x,
        this.size.y * this.scaledTileSize.y
    );

    /**
     * The orientation of the map, currently only 'orthogonal' is supported
     *
     * @property orientation
     * @type String
     */
    this.orientation = map.orientation;

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

    /**
     * The tileset for the collision layer
     *
     * @property collisionTileset
     * @type TiledTileset
     */
    this.collisionTileset = null;

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        var len = this.tilesets.push(new gf.TiledTileset(map.tilesets[t]));

        if(this.tilesets[len-1].name.toLowerCase().indexOf('collider') === 0)
            this.collisionTileset = this.tilesets[len-1];
    }

    /**
     * The layer for collisions
     *
     * @property collisionLayer
     * @type Array
     */
    this.collisionLayer = [];

    /**
     * The version of this map
     *
     * @property version
     * @type String
     */
    this.version = map.version;

    //create the layers
    var numX = Math.ceil(this.game.renderer.view.width / this.scaledTileSize.x),
        numY = Math.ceil(this.game.renderer.view.height / this.scaledTileSize.y);

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case 'tilelayer':
                lyr = new gf.TiledLayer(map.layers[i]);
                this.addChild(lyr);

                //lyr.scale = this.scale;
                lyr.renderTiles(
                    Math.floor(this.position.x / this.tileSize.x),
                    Math.floor(this.position.y / this.tileSize.y),
                    numX,
                    numY
                );

                if(lyr.name.toLowerCase().indexOf('collision') === 0) {
                    this.collisionLayer = lyr;

                    if(!gf.debug.showMapColliders)
                        lyr.visible = false;
                }
                break;

            case 'objectgroup':
                lyr = new gf.TiledObjectGroup(map.layers[i]);
                this.addChild(lyr);

                //auto spawn the player object group
                if(lyr.name === 'player' && !lyr.properties.manual)
                    lyr.spawn();
        }
    }
};

gf.inherits(gf.TiledMap, gf.Map, {
    /**
     * Gets the tileset that an ID is associated with
     *
     * @method getTileset
     * @param tileId {Number} The id of the tile to find the tileset for
     * @return {TiledTileset}
     */
    getTileset: function(tileId) {
        for(var i = 0, il = this.tilesets.length; i < il; ++i)
            if(tileId >= this.tilesets[i].firstgid && tileId <= this.tilesets[i].lastgid)
                return this.tilesets[i];
    },
    /**
     * Checks an entities collision with the collision layer of this map
     *
     * @method checkCollision
     * @param ent {Entity} The entity to check
     * @param sz {Vector} The size of the entity
     * @param pv {Vector} The potential movement vector
     */
    //see: http://stackoverflow.com/questions/2576412/tile-map-collision-detection
    checkCollision: function(ent, pv) {
        if(!this.collisionLayer || !this.collisionTileset || (pv.x === 0 && pv.y === 0))
            return [];

        if(gf.debug._showColliders && !this.sprites) {
            this.sprites = new gf.ObjectPool(PIXI.Sprite, this);
        }

        //collider overlays
        if(gf.debug._showColliders) {
            this.sprites.freeAll();
            for(var s = 0; s < this.sprites.pool.length; ++s)
                this.sprites.pool[s].visible = false;
        }

            //get movement vector and normalize as our step
        var step = pv.clone().normalize(),
            pos = ent.position,
            width = ent.currentAnim ? ent.currentAnim.width : pos.x,
            height = ent.currentAnim ? ent.currentAnim.height : pos.y,
            i = 0,
            il = 0,
            tile = null,
            res = [];

        //scan along the right face of the bound box
        if(step.x > 0) {
            for(i = pos.y, il = pos.y + height; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        pos.x + width,
                        i
                    ),
                    step,
                    pv,
                    'x'
                );
                if(tile) break;
            }
        }
        //scan along the left face of the bound box
        else if(step.x < 0) {
            for(i = pos.y, il = pos.y + height; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        pos.x,
                        i
                    ),
                    step,
                    pv,
                    'x'
                );
                if(tile) break;
            }
        }

        if(tile) {
            res.push(tile);
            tile = null;
        }

        //scan along the bottom face of the bound box
        if(step.y > 0) {
            for(i = pos.x, il = pos.x + width; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        i,
                        pos.y + height
                    ),
                    step,
                    pv,
                    'y'
                );
                if(tile) break;
            }
        }
        //scan along the top face of the bound box
        else if(step.y < 0) {
            for(i = pos.x, il = pos.x + width; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        i,
                        pos.y
                    ),
                    step,
                    pv,
                    'y'
                );
                if(tile) break;
            }
        }

        if(tile) {
            res.push(tile);
            tile = null;
        }

        return res;
    },
    _showCollider: function(id, cell) {
        var text = this.collisionTileset.getTileTexture(id);
        if(text) {
            var spr = this.sprites.create(text);
            spr.position.x = cell.x * this.tileSize.x;
            spr.position.y = cell.y * this.tileSize.y;
            spr.alpha = 0.5;
            spr.visible = true;
            spr.setTexture(text);
        }
    },
    _checkPoint: function(start, step, pv, ax) {
        step = step.clone();

        //end location
        var end = new gf.Point(
            (start.x + pv.x),
            (start.y + pv.y)
        ),
        //original cell location
        cell = new gf.Point(
            Math.floor(start.x / this.tileSize.x),
            Math.floor(start.y / this.tileSize.y)
        ),
        //end cell
        endCell = new gf.Point(
            Math.floor(end.x / this.tileSize.x),
            Math.floor(end.y / this.tileSize.y)
        ),
        //the distance between 2 consectutive vertical lines
        tDelta = new gf.Vector(
            this.tileSize.x / Math.abs(step.x),
            this.tileSize.y / Math.abs(step.y)
        ),
        //temp and return vars
        tMax = new gf.Point(),
        id = 0,
        tile = null;

        if(end.x > start.x) {
            tMax.x = step.x === 0 ? 0 : ((cell.x + 1) * this.tileSize.x - start.x) / step.x;
        } else {
            tMax.x = step.x === 0 ? 0 : (cell.x * this.tileSize.x - start.x) / step.x;
        }

        if(end.y > start.y) {
            tMax.y = step.y === 0 ? 0 : ((cell.y + 1) * this.tileSize.y - start.y) / step.y;
        } else {
            tMax.y = step.y === 0 ? 0 : (cell.y * this.tileSize.y - start.y) / step.y;
        }

        //ceil afterwards so tDelta and tMax are correct
        step.x = step.x < 0 ? Math.floor(step.x) : Math.ceil(step.x);
        step.y = step.y < 0 ? Math.floor(step.y) : Math.ceil(step.y);

        //check the cell currently on
        id = this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))];
        tile = this.collisionTileset.getTileProperties(id);
        if(tile && tile.isCollidable) {
            if(gf.debug._showColliders)
                this._showCollider(id, cell);

            return { axis: ax, tile: tile };
        }

        //scan all the tiles along the movement vector
        while(cell.x !== endCell.x || cell.y !== endCell.y) {
            if(tMax.x < tMax.y) {
                tMax.x += tDelta.x;
                cell.x += step.x;
                ax = 'x';
            } else {
                tMax.y += tDelta.y;
                cell.y += step.y;
                ax = 'y';
            }

            id = this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))];
            tile = this.collisionTileset.getTileProperties(id);
            if(tile && tile.isCollidable) {
                if(gf.debug._showColliders)
                    this._showCollider(id, cell);

                return { axis: ax, tile: tile };
            }
        }
    },
    /**
     * Notifies the map it needs to resize, re renders the viewport
     *
     * @method resize
     * @private
     */
    resize: function() {
        var numX = Math.ceil(this.game.renderer.view.width / this.scaledTileSize.x),
            numY = Math.ceil(this.game.renderer.view.height / this.scaledTileSize.y);

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o instanceof gf.TiledLayer && o.visible) {
                o.renderTiles(
                    Math.floor(this.position.x / this.scaledTileSize.x),
                    Math.floor(this.position.y / this.scaledTileSize.y),
                    numX,
                    numY
                );
            }
        }
    },
    forEachEntity: function(fn) {
        //go through each object group and call for each entity. This is slightly more efficient
        //than the generic DisplayObject version since we can skip over checking all the TiledLayers
        //which will never have any Entities in them.
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.children[i] instanceof gf.TiledObjectGroup)
                this.children[i].forEachEntity(fn);
        }
    },
    //WIP
    _checkHalfBlock: function(half, x, y) {
        var tx = Math.floor(x / this.scaledTileSize.x) * this.scaledTileSize.x,
            ty = Math.floor(y / this.scaledTileSize.y) * this.scaledTileSize.y,
            midX = tx + ((this.scaledTileSize.x) / 2),
            endX = tx + (this.scaledTileSize.x),
            midY = ty - ((this.scaledTileSize.y) / 2),
            endY = ty - (this.scaledTileSize.y);

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
