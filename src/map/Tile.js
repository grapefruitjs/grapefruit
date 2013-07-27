/**
 * Base Tile implementation, a tile is a single tile in a tilemap layer
 *
 * @class Tile
 * @extends gf.Sprite
 * @namespace gf
 * @constructor
 * @param tile {Object} All the settings for the tile
 */
gf.Tile = function(texture) {
    this.collisionType = gf.Tile.TYPE.NONE;

    //call base ctor
    gf.Sprite.call(this, texture);

    this.type = gf.Sprite.TYPE.TILE;
};

gf.inherits(gf.Tile, gf.Sprite, {
    /**
     * On Collision Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we remove the collectable
     *      and if we collide with a solid tile we kill our velocity
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     */
    onCollision: function(obj) {
        gf.Sprite.prototype.onCollision.call(this, obj);

        //I did a switch-case here because I feel like I
        //will be adding more defaults later
        switch(this.collisionType) {
            case gf.Tile.TYPE.SOLID:
                obj.setVelocity(0);
                break;
        }
    }
});

/**
 * Tile collision types
 *
 * @property TYPE
 * @type Object
 * @static
 */
gf.Tile.TYPE = {
    NONE: 'none',
    SOLID: 'solid',
    CLIFF: 'cliff',
    LADDER: 'ladder',
    WATER: 'water',
    DEEP_WATER: 'deep_water'
};