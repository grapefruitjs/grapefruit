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
        if(!this.collisionLayer || !this.collisionTileset) return [];

            //get direction and normalize
        var dir = pv.clone().normalize(),
            //end location
            end = new gf.Point(
                (ent.position.x + pv.x),
                (ent.position.y + pv.y)
            ),
            //the distance between 2 consectutive vertical lines
            tDelta = new gf.Vector(
                this.scaledTileSize.x / Math.abs(dir.x),
                this.scaledTileSize.y / Math.abs(dir.y)
            ),
            //original cell location
            cell = new gf.Point(
                ent.position.x / this.scaledTileSize.x,
                ent.position.y / this.scaledTileSize.y
            ),
            //end cell
            endCell = new gf.Point(
                end.x / this.scaledTileSize.x,
                end.y / this.scaledTileSize.y
            ),
            //how to move between tiles
            step = new gf.Vector(),
            tMax = new gf.Vector(),
            blk = new gf.Vector(),
            //temp and return vars
            tile = null,
            res = [];

        //check for max entent
        /*
        if(x <= 0 || x >= this.realSize.x) {
            res.push({ axis: 'x', tile: { type: gf.Layer.COLLISION.SOLID } });
        }
        if(y <= 0 || y >= this.realSize.y) {
            res.push({ axis: 'y', tile: { type: gf.Layer.COLLISION.SOLID } });
        }

        if(res.length) return res;
        */

        //determine step and tMax, defined as:
        //step: Determine in what way do we move between cells
        //tMax: the distance in terms of vector(dirX,dirY) to the next vertical line
        if(end.x > ent.position.x) {
            blk.x = 0;
            step.x = 1;
            tMax.x = dir.x === 0 ? 0 : ((cell.x + 1) * this.scaledTileSize.x - ent.position.x) / dir.x;
        } else {
            blk.x = 1;
            step.x = -1;
            tMax.x = dir.x === 0 ? 0 : (cell.x * this.scaledTileSize.x - ent.position.x) / dir.x;
        }

        if(end.y > ent.position.y) {
            blk.y = 0;
            step.y = 1;
            tMax.y = dir.y === 0 ? 0 : ((cell.y + 1) * this.scaledTileSize.y - ent.position.y) / dir.y;
        } else {
            blk.y = 1;
            step.y = -1;
            tMax.y = dir.y === 0 ? 0 : (cell.y * this.scaledTileSize.y - ent.position.y) / dir.y;
        }

        window.console.log('dir', dir);
        window.console.log('start', ent.position);
        window.console.log('end', end);
        window.console.log('cell', cell);
        window.console.log('endCell', endCell);
        window.console.log('blk', blk);
        window.console.log('step', step);
        window.console.log('tMax', tMax);
        window.console.log('tilesize', this.scaledTileSize);
        window.console.log('pv', pv);
        //check if we are on a colliding tile
        tile = this.collisionTileset.getTileProperties(this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))]);
        if(tile && tile.isCollidable) {
            res.push({ axis: 'x', tile: tile });
            res.push({ axis: 'y', tile: tile });
            return res;
        }

        //scan all the tiles along the movement vector
        while(cell.x !== endCell.x || cell.y !== endCell.y) {
            if(tMax.x < tMax.y) {
                tMax.x += tDelta.x;
                cell.x += step.x;
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))]);
                if(tile && tile.isCollidable) {
                    res.push({ axis: 'x', tile: tile });
                }
            } else {
                tMax.y += tDelta.y;
                cell.y += step.y;
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))]);
                if(tile && tile.isCollidable) {
                    res.push({ axis: 'y', tile: tile });
                }
            }
        }

        return res;
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
