/**
 * The TiledLayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the TiledMap, there shouldn't be a reason to
 * create an instance on your own.
 *
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
    this.tileIds = gf.support.typedArrays ? new Uint32Array(layer.data) : layer.data;

    /**
     * The tile pool for rendering tiles
     *
     * @property tilePool
     * @type Object
     */
    this.tiles = {};

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;

    this._tileBufferSize = 2;
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
        //add a tile buffer around the viewport
        startX -= this._tileBufferSize;
        numX += this._tileBufferSize * 2;
        startY -= this._tileBufferSize;
        numY += this._tileBufferSize * 2;

        //render new sprites
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
        if(this.tiles[tileX] && this.tiles[tileX][tileY])
            return this.tiles[tileX][tileY];

        if(!this.tiles[tileX])
            this.tiles[tileX] = {};

        var id = (tileX + (tileY * this.size.x)),
            tile = this.tileIds[id],
            set = this.parent.getTileset(tile);

        if(set) {
            this.tiles[tileX][tileY] = new gf.Tile(this.game, [0, 0], {
                texture: set.getTileTexture(tile),
                mass: 999999,
                collidable: false
            });
            this.addChild(this.tiles[tileX][tileY]);
        }

        return this.tiles[tileX][tileY];
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
        var tile = this.getTileSprite(fromTileX, fromTileY);

        if(!tile) return;

        var id = (toTileX + (toTileY * this.size.x)),
            tileId = this.tileIds[id],
            set = this.parent.getTileset(tileId);

        if(set) tile.setTexture(set.getTileTexture(tileId));
        tile.setPosition(
            toTileX * this.parent.tileSize.x,
            toTileY * this.parent.tileSize.y
        );

        //move the sprite in the pool
        if(!this.tiles[toTileX]) this.tiles[toTileX] = {};
        this.tiles[toTileX][toTileY] = tile;
        this.tiles[fromTileX][fromTileY] = null;

        return tile;
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
        return this.tileIds[this.getTileIndex(x, y)];
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

        //moved position right, so render left
        while(this._panDelta.x >= this.parent.scaledTileSize.x) {
            this._renderLeft();
            this._panDelta.x -= this.parent.scaledTileSize.x;
        }

        //moved position left, so render right
        while(this._panDelta.x <= -this.parent.scaledTileSize.x) {
            this._renderRight();
            this._panDelta.x += this.parent.scaledTileSize.x;
        }

        //moved position down, so render up
        while(this._panDelta.y >= this.parent.scaledTileSize.y) {
            this._renderUp();
            this._panDelta.y -= this.parent.scaledTileSize.y;
        }

        //moved position up, so render down
        while(this._panDelta.y <= -this.parent.scaledTileSize.y) {
            this._renderDown();
            this._panDelta.y += this.parent.scaledTileSize.y;
        }
    },
    _renderLeft: function() {
        //move all the far right tiles to the left side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                this._rendered.right, this._rendered.top + i,
                this._rendered.left, this._rendered.top + i
            );
        }
        this._rendered.x--;
        this._rendered.left--;
        this._rendered.right--;
    },
    _renderRight: function() {
        //move all the far left tiles to the right side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                this._rendered.left, this._rendered.top + i,
                this._rendered.right, this._rendered.top + i
            );
        }
        this._rendered.x++;
        this._rendered.left++;
        this._rendered.right++;
    },
    _renderUp: function() {
        //move all the far bottom tiles to the top side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                this._rendered.left + i, this._rendered.bottom,
                this._rendered.left + i, this._rendered.top
            );
        }
        this._rendered.y--;
        this._rendered.top--;
        this._rendered.bottom--;
    },
    _renderDown: function() {
        //move all the far top tiles to the bottom side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                this._rendered.left + i, this._rendered.top,
                this._rendered.left + i, this._rendered.bottom
            );
        }
        this._rendered.y++;
        this._rendered.top++;
        this._rendered.bottom++;
    }
});
