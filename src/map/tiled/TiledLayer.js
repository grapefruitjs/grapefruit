/**
 * The TiledLayer is 
 *
 * @module gf
 * @class Tiled Map
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
gf.TiledLayer = function(layer, tileSize, tilesets) {
    gf.Layer.call(this, layer);

    /**
     * The tile IDs of the tilemap
     *
     * @property name
     * @type Uint32Array
     */
    this.tiles = new Uint32Array(layer.data);

    /**
     * The square size of the tiles in the layer
     *
     * @property tileSize
     * @type Number
     */
    this.tileSize = tileSize;

    this.renderTiles();
};

gf.inherits(gf.TiledLayer, gf.Layer, {
    renderTiles: function() {
        for(var i = 0, il = this.tiles.length; i < il; ++i) {
            var tile = this.tiles[i],
                spr = this.getTileset(tile).createTileSprite(tile),
                y = ~~(i / this.size.x),
                x = (id - (y * this.size.x));

            spr.position.x = x * this.tileSize.x;
            spr.position.y = y * this.tileSize.y;
            this.addChild(spr);
        }
    },
    getTileset: function(tileId) {
        for(var i = 0, il = this.tilesets.length; i < il; ++i)
            if(tileId >= this.tilesets[i].firstgid && tiledId <= this.tilesets[i].lastgid)
                return this.tilesets[i];
    },
    //get ID of tile at specified location
    getTileId: function(x, y, realCoords) {
        var pos = x instanceof gf.Vector ? x.clone() : new gf.Vector(x, y);
        //if not realCoords, they are world coords; and must be converted
        if(!realCoords) {
            //do some division to make position be in "tiles from center" instead of "units from center"
            pos.divideScalar(this.scale);
            pos.x = pos.x / this.tileSize.x;
            pos.y = pos.y / this.tileSize.y;

            //inverse the Y so the next add will actually subtract from Y
            pos.y = -pos.y;

            //pos is now the offset from the center, to make it from the top left
            //we add half the size of the tilemap to x (and sub from y since we inverted)
            pos.add(this.hSize);

            pos.x = ~~pos.x; //floor
            pos.y = ~~pos.y;
        }

        //calculate index
        var idx = Math.floor(pos.x + (pos.y * (this.size.x)));

        return this.data[idx];
    }
});
