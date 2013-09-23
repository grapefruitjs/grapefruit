var Sprite = require('../display/Sprite'),
    inherit = require('../utils/inherit'),
    C = require('../constants');

/**
 * Base Tile implementation, a tile is a single tile in a tilemap layer
 *
 * @class Tile
 * @extends Sprite
 * @constructor
 * @param texture {Texture} The texture of the tile
 */
var Tile = module.exports = function(texture) {
    this.collisionType = C.COLLISION_TYPE.NONE;

    //call base ctor
    Sprite.call(this, texture);

    this.type = C.SPRITE_TYPE.TILE;
};

inherit(Tile, Sprite, {
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
        Sprite.prototype.onCollision.call(this, obj);

        //I did a switch-case here because I feel like I
        //will be adding more defaults later
        switch(this.collisionType) {
            case C.COLLISION_TYPE.SOLID:
                obj.setVelocity(0);
                break;
        }
    }
});
