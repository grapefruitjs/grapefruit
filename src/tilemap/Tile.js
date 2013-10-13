var Sprite = require('../display/Sprite'),
    inherit = require('../utils/inherit');

/**
 * Base Tile implementation, a tile is a single tile in a tilemap layer
 *
 * @class Tile
 * @extends Sprite
 * @constructor
 * @param texture {Texture} The texture of the tile
 */
var Tile = function(texture) {
    //call base ctor
    Sprite.call(this, texture);
};

inherit(Tile, Sprite, {
});

module.exports = Tile;
