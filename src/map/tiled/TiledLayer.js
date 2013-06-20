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

    //Tiled Editor properties

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
    this.visible = layer.visible;

    this._tilePool = new gf.ObjectPool(gf.Tile, this);
    this._tileBufferSize = 2;
    this._panDelta = new gf.Vector(0, 0);
    this._rendered = new gf.Rectangle(0, 0, 0, 0);
};

gf.inherits(gf.TiledLayer, gf.Layer, {
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method renderTiles
     * @param startX {Number} The starting x tile position
     * @param startY {Number} The starting y tile position
     * @param numX {Number} The number of tiles in the X direction to render
     * @param numY {Number} The number of tiles in the Y direction to render
     */
    renderTiles: function(startX, startY, numX, numY) {
        //clear all the visual tiles
        this.clearTiles();

        //add a tile buffer around the render area
        startX -= this._tileBufferSize;
        numX += this._tileBufferSize * 2;
        startY -= this._tileBufferSize;
        numY += this._tileBufferSize * 2;

        //render new sprites
        for(var x = startX; x < numX; ++x) {
            //skip things outside the map size
            if(x < 0 || x >= this.parent.size.x)
                continue;

            for(var y = startY; y < numY; ++y) {
                //skip things outside the map size
                if(y < 0 || y >= this.parent.size.y)
                    continue;

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
     * Clears all the tiles currently used to render the layer
     *
     * @method clearTiles
     */
    clearTiles: function() {
        //hide/free each tile and remove from the memory map
        for(var x in this.tiles) {
            for(var y in this.tiles[x]) {
                var tile = this.tiles[x][y];

                //hide/free the sprite
                tile.visible = false;
                this.tilePool.free(tile);

                //remove the Y key
                delete this.tiles[x][y];
            }

            //keep the X key so we dont have to recreate these objects
            //delete this.tiles[x];
        }
    },
    /**
     * Moves a tile sprite from one position to another, and creates a new tile
     * if the old position didn't have a sprite
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
            iso = (this.parent.orientation === 'isometric'),
            texture,
            props,
            position;

        if(!set) return;

        texture = set.getTileTexture(tileId);
        props = set.getTileProperties(tileId);
        position = iso ?
            // Isometric position
            [
                (toTileX * (this.parent.tileSize.x / 2)) - (toTileY * (this.parent.tileSize.x / 2)) + set.tileoffset.x,
                (toTileY * (this.parent.tileSize.y / 2)) + (toTileX * (this.parent.tileSize.y / 2)) + set.tileoffset.y
            ]
            :
            // Orthoganal position
            [
                (toTileX * this.parent.tileSize.x) + set.tileoffset.x,
                (toTileY * this.parent.tileSize.y) + set.tileoffset.y
            ];

        //grab a new tile from the pool if there isn't one to move in the map
        if(!this.tiles[fromTileX] || !this.tiles[fromTileX][fromTileY]) {
            tile = this._tilePool.create(this.game, position, {
                texture: texture,
                mass: Infinity,
                width: set.tileSize.x,
                height: set.tileSize.y,
                collidable: props.isCollidable,
                collisionType: props.type
            });
        }
        //if there is one to move in the map, lets just move it
        else {
            tile = this.tiles[fromTileX][fromTileY];
            this.tiles[fromTileX][fromTileY] = null;
        }

        //ensure properties are set properly
        // even if we pull from the pool those args are only
        // passed when creating a *new* Tile, not recycling an old one
        // so we need to manually specify them here as well
        tile.setTexture(texture);
        tile.setPosition(position);
        tile.setCollidable(props.isCollidable);
        tile.collisionType = props.type;
        tile.visible = true;

        //update sprite position in the map
        if(!this.tiles[toTileX])
            this.tiles[toTileX] = {};

        this.tiles[toTileX][toTileY] = tile;

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
