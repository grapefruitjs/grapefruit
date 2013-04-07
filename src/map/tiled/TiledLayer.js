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
    this.spritePool = [];

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;
};

gf.inherits(gf.TiledLayer, gf.Layer, {
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method renderTiles
     */
    renderTiles: function(startX, startY, numX, numY) {
        for(var x = startX; x < numX; ++x) {
            for(var y = startY; y < numY; ++y) {
                var id = (x + (y * this.size.x)),
                    tile = this.tiles[id],
                    set = this.parent.getTileset(tile);

                if(!set) continue;

                var spr = this.getTileSprite(tile, set);

                spr.position.x = x * this.parent.tileSize.x;
                spr.position.y = y * this.parent.tileSize.y;
                //spr.scale = this.scale;
                //spr.rotation = this.rotation;
                //spr.alpha = this.alpha;
                this.addChild(spr);
            }
        }
    },
    /**
     * Creates the sprite for a tile utilizing a pool for the sprites
     *
     * @method getTileSprite
     * @param tileId {Number} The id of the tile to get a sprite for
     * @param TiledTileset {tileset} The tileset to get the texture from
     * @return {PIXI.Sprite} The sprite to display
     */
    getTileSprite: function(id, tileset) {
        return this.spritePool.pop() || new PIXI.Sprite(tileset.getTileTexture(id));
    },
    /**
     * Frees a sprite back into the pool
     *
     * @method freeTileSprite
     * @param sprite {PIXI.Sprite} The sprite to release to the pool
     */
    freeTileSprite: function(spr) {
        this.spritePool.push(spr);
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
        x = ~~(x / this.parent.tileSize.x);
        y = ~~(y / this.parent.tileSize.y);

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
    }
});
