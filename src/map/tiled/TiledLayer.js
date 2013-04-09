/**
 * The TiledLayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the TiledMap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @module gf
 * @class TiledLayer
 * @extends Layer
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
gf.TiledLayer = function(layer) {
    gf.Layer.call(this, layer);

    /**
     * The tile IDs of the tilemap
     *
     * @property name
     * @type Uint32Array
     */
    this.tiles = new Uint32Array(layer.data);

    /**
     * The sprite pool for rendering tiles
     *
     * @property tilePool
     * @type Array
     */
    this.sprites = [];

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;

    this._panDelta = new gf.Vector(0, 0);
    this._rendered = new PIXI.Rectangle(0, 0, 0, 0);
};

gf.inherits(gf.TiledLayer, gf.Layer, {
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method renderTiles
     */
    renderTiles: function(startX, startY, numX, numY) {
        //add a 1 tile buffer around the viewport
        if(startX >= 1) startX -= 1;
        if(startX + numX < this.size.x) numX += 1;

        if(startY >= 1) startY -= 1;
        if(startY + numY < this.size.y) numY += 1;

        for(var x = startX; x < numX; ++x) {
            for(var y = startY; y < numY; ++y) {
                this.moveTileSprite(x, y, x, y);
            }
        }

        this._rendered.x = startX;
        this._rendered.y = startY;
        this._rendered.width = numX;
        this._rendered.height = numY;
        this._rendered.left = this._rendered.x;
        this._rendered.right = this._rendered.x + this._rendered.width;
        this._rendered.top = this._rendered.y;
        this._rendered.bottom = this._rendered.y + this._rendered.height;
    },
    /**
     * Creates the sprite for a tile and caches it in a position
     *
     * @method getTileSprite
     * @param tileX {Number} The x coord of the tile in units of tiles (not pixels)
     * @param tileY {Number} The y coord of the tile in units of tiles (not pixels)
     * @return {PIXI.Sprite} The sprite to display
     */
    getTileSprite: function(tileX, tileY) {
        if(this.sprites[tileX] && this.sprites[tileY])
            return this.sprites[tileX][tileY];

        if(!this.sprites[tileX]) this.sprites[tileX] = [];

        var id = (tileX + (tileY * this.size.x)),
            tile = this.tiles[id],
            set = this.parent.getTileset(tile);

        if(set) {
            this.sprites[tileX][tileY] = new PIXI.Sprite(set.getTileTexture(tile));
            this.addChild(this.sprites[tileX][tileY]);
        }

        return this.sprites[tileX][tileY];
    },
    /**
     * Moves a tile sprite from one position to another,
     * creating it if the old position didn't have a sprite
     *
     * @method moveTileSprite
     * @param fromTileX {Number} The x coord of the tile in units of tiles (not pixels) to move from
     * @param fromTileY {Number} The y coord of the tile in units of tiles (not pixels) to move from
     * @param toTileX {Number} The x coord of the tile in units of tiles (not pixels) to move to
     * @param toTileY {Number} The y coord of the tile in units of tiles (not pixels) to move to
     * @return {PIXI.Sprite} The sprite to display
     */
    moveTileSprite: function(fromTileX, fromTileY, toTileX, toTileY) {
        var spr = this.getTileSprite(fromTileX, fromTileY);

        if(!spr) return;

        var id = (toTileX + (toTileY * this.size.x)),
            tile = this.tiles[id],
            set = this.parent.getTileset(tile);

        if(set) spr.texture = set.getTileTexture(tile);
        spr.position.x = toTileX * this.parent.tileSize.x;
        spr.position.y = toTileY * this.parent.tileSize.y;

        //move the sprite in the pool
        this.sprites[fromTileX][fromTileY] = null;
        this.sprites[toTileX][toTileY] = spr;

        return spr;
    },
    /**
     * Transforms an x,y coord into the index of a tile in the tiles array
     *
     * @method getTileIndex
     * @param x {Number|Vector} The x coord to transform, if a vector is passed it's x/y is used and the y param is ignored
     * @param y {Number} The y coord to transform
     * @return {Number}
     */
    getTileIndex: function(x, y) {
        x = x instanceof gf.Vector ? x.x : x;
        y = x instanceof gf.Vector ? x.y : y;

        //convert the position from units to tiles
        x = Math.floor(x / this.parent.tileSize.x);
        y = Math.floor(y / this.parent.tileSize.y);

        //calculate index of this tile
        return (x + (y * this.size.x));
    },
    /**
     * Transforms an x,y coord into the TiledTileset tile id
     *
     * @method getTileId
     * @param x {Number|Vector} The x coord to transform, if a vector is passed it's x/y is used and the y param is ignored
     * @param y {Number} The y coord to transform
     * @return {Number}
     */
    getTileId: function(x, y) {
        return this.tiles[this.getTileIndex(x, y)];
    },
    /**
     * Pans the layer around, rendering stuff if necessary
     *
     * @method pan
     * @param dx {Number|Point} The x amount to pan, if a Point is passed the dy param is ignored
     * @param dy {Number} The y ammount to pan
     * @return {Layer} Returns itself for chainability
     */
    pan: function(dx, dy) {
        this._panDelta.x += dx;
        this._panDelta.y += dy;

        var i = 0;

        //moved 1 tile right
        if(this._panDelta.x >= this.parent.tileSize.x) {
            //free all the far left tiles back to the pool, and render the right tiles
            for(i = 0; i < this._rendered.numY; ++i) {
                this.moveTileSprite(
                    this._rendered.x,       this._rendered.y + i,
                    this._rendered.right + 1,   this._rendered.y + i
                );
            }
            this._rendered.x++;
        }
        //moved 1 tile left
        else if(this._panDelta.x <= -this.parent.tileSize.x) {
            //free all the far right tiles back to the pool, and render the left tiles
            for(i = 0; i < this._rendered.numY; ++i) {
                this.moveTileSprite(
                    this._rendered.right, this._rendered.y + i,
                    this._rendered.x - 1, this._rendered.y + i
                );
            }
            this._rendered.x--;
        }

        //moved 1 tile down
        if(this._panDelta.y >= this.parent.tileSize.y) {
            //free all the far top tiles back to the pool, and render the bottom tiles
            for(i = 0; i < this._rendered.numX; ++i) {
                this.moveTileSprite(
                    this._rendered.x + i, this._rendered.y,
                    this._rendered.x + i, this._rendered.bottom + 1
                );
            }
            this._rendered.y++;
        }
        //moved 1 tile up
        else if(this._panDelta.y <= -this.parent.tileSize.y) {
            //free all the far bottom tiles back to the pool, and render the top tiles
            for(i = 0; i < this._rendered.numX; ++i) {
                this.moveTileSprite(
                    this._rendered.x + i, this._rendered.bottom,
                    this._rendered.x + i, this._rendered.y - 1
                );
            }
            this._rendered.y--;
        }


        this._rendered.left = this._rendered.x;
        this._rendered.right = this._rendered.x + this._rendered.width;
        this._rendered.top = this._rendered.y;
        this._rendered.bottom = this._rendered.y + this._rendered.height;
    }
});
