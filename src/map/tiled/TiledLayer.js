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
gf.TiledLayer = function(game, pos, layer) {
    gf.Layer.call(this, game, pos, layer);

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
        var tile,
            id = (toTileX + (toTileY * this.size.x)),
            tileId = this.tileIds[id],
            set = this.parent.getTileset(tileId),
            texture,
            props,
            position;

        if(!set) return;

        texture = set.getTileTexture(tileId);
        props = set.getTileProperties(tileId);
        position = [
            toTileX * this.parent.tileSize.x,
            toTileY * this.parent.tileSize.y
        ];

        //get the cached tile from the pool, and set the properties
        if(this.tiles[fromTileX] && this.tiles[fromTileX][fromTileY]) {
            tile = this.tiles[fromTileX][fromTileY];

            tile.collisionType = props.type;
            tile.setTexture(texture);
            tile.setCollidable(props.isCollidable);
            tile.setPosition(position);

            //move the sprite in the pool
            if(!this.tiles[toTileX]) this.tiles[toTileX] = {};

            this.tiles[toTileX][toTileY] = tile;
            this.tiles[fromTileX][fromTileY] = null;
        }
        //if there is no tile there yet, create one
        else {
            if(!this.tiles[toTileX])
                this.tiles[toTileX] = {};

            tile = this.tiles[toTileX][toTileY] = new gf.Tile(this.game, position, {
                texture: texture,
                mass: Infinity,
                width: this.parent.tileSize.x,
                height: this.parent.tileSize.y,
                collidable: props.isCollidable,
                collisionType: props.type
            });
            this.addChild(tile);
        }

        return tile;
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
