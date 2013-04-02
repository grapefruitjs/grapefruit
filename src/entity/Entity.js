//Features TODO:
// * Methods (https://github.com/obiot/melonJS/blob/master/src/entity/entity.js)
//      - flipX
//      - flipY
//      - doWalk
//      - doClimb
//      - doJump
//      - forceJump
//      - checkSlope
//      - updateMovement (slopes/breakable tiles)

/**
 * The base Entity class. This class is the base for all entities interacting on the stage
 *
 * @module gf
 * @class Entity
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the entity
 * @param settings {Object} Settings to override the defauls, acceptable values
 *          are size {Vector}, name {String}, animations {Object}
 * @example
 *      var ent = new gf.Entity([10, 1], { name: 'MyEntity' });
 */
gf.Entity = function(pos, settings) {
    /**
     * The type of the entity
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.types.ENTITY.NEUTRAL;

    /**
     * Can it collide with other entities
     *
     * @property collidable
     * @type Boolean
     * @default true
     */
    this.collidable = true;

    /**
     * Can collide with the map when moving
     *
     * @property mapCollidable
     * @type Boolean
     * @default true
     */
    this.mapCollidable = true;

    /**
     * Is an entity
     *
     * @property mapCollidable
     * @type Boolean
     * @default true
     * @readOnly
     */
    this.entity = true;

    /**
     * The velocity of the entity. You can set these in Tiled by using "x|y" notation
     * velocity of the entity (units per tick)
     *
     * @property velocity
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.velocity = new gf.Vector(0, 0);

    /**
     * Max velocity to cap the entity at (units per tick)
     *
     * @property maxVelocity
     * @type Vector
     * @default new gf.Vector(15, 15)
     */
    this.maxVelocity = new gf.Vector(15, 15);

    /**
     * Acceleration of the entity (units per second)
     *
     * @property accel
     * @type Vector
     * @default new gf.Vector(250, 250)
     */
    this.accel = new gf.Vector(250, 250);

    /**
     * Friction to apply to this entity
     *
     * @property friction
     * @type Vector
     * @default 0
     */
    this.friction = settings.friction || gf.game.friction;

    /**
     * Gravity to apply to this entity
     *
     * @property gravity
     * @type Vector
     * @default 0.98 (earth's gravity)
     */
    this.gravity = settings.gravity || gf.game.gravity;

    /**
     * Whether or not the entity is "alive", advisory only
     *
     * @property alive
     * @type Boolean
     * @default true
     */
    this.alive = true;

    /**
     * Whether the entity is falling (read only)
     *
     * @property falling
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.falling = false;

    /**
     * Whether the entity is jumping (read only)
     *
     * @property jumping
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.jumping = false;

    /**
     * Whether the entity is on a ladder tile (read only)
     *
     * @property onladder
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.onladder = false;

    //call base constructor
    gf.Sprite.call(this, pos, settings);
};

gf.inherits(gf.Entity, gf.Sprite, {
    /**
     * Calculates distance between this object and another
     *
     * @method distanceTo
     * @param obj {Entity}
     * @return {Number} Distance between this entity and another
     */
    distanceTo: function(obj) {
        if(!obj || !obj.position)
            return -1;

        var dx = this.position.x - obj.position.x,
            dy = this.position.y - obj.position.y;

        return Math.sqrt(dx*dx + dy*dy);
    },
    /**
     * Computes the velocity taking into account gravity, friction, etc
     *
     * @method computeVelocity
     * @param vel {Vector} The Vector to apply the changes to
     * @return {Vector} The modified vector
     */
    computeVelocity: function(vel) {
        //apply gravity
        if(this.gravity) {
            vel.y -= !this.onladder ? (this.gravity * gf.game._delta) : 0;

            //check if falling/jumping
            this.falling = (vel.y < 0);
            this.jumping = this.falling ? false : this.jumping;
        }

        //apply friction
        if(this.friction.x) vel.x = gf.utils.applyFriction(vel.x, this.friction.x);
        if(this.friction.y) vel.y = gf.utils.applyFriction(vel.y, this.friction.y);

        //cap velocity
        if(vel.x) vel.x = gf.utils.clamp(vel.x, -this.maxVelocity.x, this.maxVelocity.x);
        if(vel.y) vel.y = gf.utils.clamp(vel.y, -this.maxVelocity.y, this.maxVelocity.y);

        return vel;
    },
    /**
     * Checks if this entity intersects with the passed object
     * from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
     *
     * @method intersects
     * @param obj {Entity} The Entity to check if this intersects with
     * @return {Boolean}
     */
    intersects: function(obj)  {
        return (Math.abs(this.position.x - obj.position.x) * 2 < (this.size.x + obj.size.x)) && 
                (Math.abs(this.position.y - obj.position.y) * 2 < (this.size.y + obj.size.y));
    },
    /**
     * Checks if this entity collides with the passed Entity, a penetration vector is calculated.
     * This method is called from gf.game.checkCollisions(ent); That method will use this to check
     * for any collisions between that entity and all the others on the stage.
     * from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
     *
     * @method checkCollision
     * @param obj {Entity} The Entity to check if this entity collides with
     * @return {Vector}
     */
    checkCollision: function(obj) {
        //response vector
        var p = new gf.Vector(0, 0);

        //check if hitboxes intersect
        if(this.intersects(obj)) {
            //compute delta between this & entity
            var dx = this.position.x - obj.position.x,
                dy = this.position.y - obj.position.y;

            //compute penetration depth for both axis
            p.x = dx / 2;
            p.y = dy / 2;
        }

        return p;
    },
    /**
     * Calculate the velocity of the entity, and then apply it. This is different than moveEntity
     * because it checks for map collisions, and applies gravity and friction with computeVelocity
     *
     * @method updateMovement
     * @return {Array} Returns the map colliders that the entity is interacting with
     */
    updateMovement: function() {
        if(this.velocity.x === 0 && this.velocity.y === 0)
            return;

        //get the world colliders
        var colliders = (gf.game.world === undefined || !this.mapCollidable) ? [] : gf.game.world.checkCollision(this);

        //update flags
        this.onladder = false;

        //collisions
        for(var i = 0, il = colliders.length; i < il; ++i) {
            var collider = colliders[i],
                tile = collider.tile,
                axis = collider.axis;

            this.onladder = (tile.type == gf.types.COLLISION.LADDER ? true : this.onladder);

            //if a solid tile
            if(tile.type == gf.types.COLLISION.SOLID) {
                //if it is a slope, apply the normal
                if(tile.normal && (!this.velocity.x || !this.velocity.y)) {
                    var badMovement = tile.normal.clone().multiplyScalar(this.velocity.dot(tile.normal)),
                        newMovement = this.velocity.clone().sub(badMovement);

                    this.velocity.add(newMovement);
                    return false;
                }
                //otherwise just stop movement
                else {
                    this.velocity[axis] = 0;
                }
            }
        }

        //TODO: Edge rolling (if you are on the tip edge of a blocking tile, roll around it)

        //apply gravity, friction, etc to this velocity
        this.computeVelocity(this.velocity);

        //do the actual entity movement
        this.moveEntity();

        //for debug output if it is enabled
        gf.debug._playerColliders = colliders;
        gf.debug._playerColliders.dirty = true;

        return colliders;
    },
    /**
     * Moves the entity to a new position using the velocity.
     *
     * @method moveEntity
     * @param vel {Vector} The optional velocity to move the entity. 
     * @return {Entity} Returns itself for chainability
     */
    moveEntity: function(vel) {
        //param will override the entities current velocity
        vel = vel || this.velocity;

        if(vel.x === 0 && vel.y === 0)
            return;

        //update the entity position
        this.position.x += vel.x;
        this.position.y += vel.y;

        //onMove event
        this.onMove(vel);

        return this;
    },
    /**
     * On Collision Event
     *      called when this object is collided into by another, by default if something collides with
     *      a collectable entity we remove the collectable
     *
     * @method moveEntity
     * @param vel {Vector} Collision Vector
     * @param obj {Entity} Colliding object
     * @return {Entity} Returns itself for chainability
     */
    onCollision: function(vec, obj) {
        if(this.collidable && this.type == gf.types.ENTIY.COLLECTABLE)
            gf.game.removeObject(this);

        return this;
    },
    /**
     * On Move Event
     *      called when this entity moves
     *
     * @method moveEntity
     * @param vel {Vector} Velocity the entity moved
     * @return {Entity} Returns itself for chainability
     */
    onMove: function(vel) {
        return this;
    },
    /**
     * On Break Tile Event
     *      called when a tile is broken
     *
     * @method moveEntity
     * @param tile {Unkown} the tile that is broken
     * @return {Entity} Returns itself for chainability
     */
    onBreakTile: function(tile) {
        return this;
    }
});