/**
 * Base Tile implementation, a tile is a single tile in a tilemap layer
 *
 * @class Tile
 * @extends Entity
 * @constructor
 * @param tile {Object} All the settings for the tile
 */
gf.Tile = function(game, pos, settings) {
    this.collisionType = gf.Tile.TYPE.NONE;

    //call base ctor
    gf.Entity.call(this, game, pos, settings);

    this.type = gf.Entity.TYPE.TILE;

    /*
    var spr = this.tiles[tileX][tileY];
    spr.tile = tile;
    spr.setInteractive(true);
    spr.click = function() {
        window.console.log(spr.tile, spr.parent.name);
    };
    */
};

gf.inherits(gf.Tile, gf.Entity, {
});

/**
 * Tile collision types
 *
 * @property COLLISION
 * @type Object
 */
gf.Tile.TYPE = {
    NONE: 'none',
    SOLID: 'solid',
    CLIFF: 'cliff',
    LADDER: 'ladder',
    WATER: 'water',
    DEEP_WATER: 'deep_water'
};