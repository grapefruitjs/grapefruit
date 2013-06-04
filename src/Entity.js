//Features TODO:
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
 * @class Entity
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the entity
 * @param settings {Object} Settings to override the defauls
 * @example
 *      var ent = new gf.Entity([10, 1], { name: 'MyEntity' });
 */
gf.Entity = function(game, pos, settings) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The type of the entity
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.Entity.TYPE.NEUTRAL;

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
     * Acceleration of the entity (units per second)
     *
     * @property accel
     * @type Vector
     * @default new gf.Vector(250, 250)
     */
    this.accel = new gf.Vector(250, 250);

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

    /**
     * The view position is a whole-number version of position.
     *
     * @property viewPosition
     * @type Point
     * @readOnly
     */
    this.viewPosition = new gf.Point(0, 0);

    //call base ctor
    gf.Sprite.call(this, pos, settings);

    this.viewPosition.x = Math.round(this.position.x);
    this.viewPosition.y = Math.round(this.position.y);
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
     * @method updateVelocity
     * @param vel {Vector} The Vector to apply the changes to
     * @return {Vector} The modified vector
     */
    updateVelocity: function(vel) {
        //apply gravity
        if(this.gravity) {
            vel.y -= !this.onladder ? (this.gravity * this.game._delta) : 0;

            //check if falling/jumping
            this.falling = (vel.y < 0);
            this.jumping = this.falling ? false : this.jumping;
        }

        //apply friction
        if(this.friction.x) vel.x = this.applyFriction(vel.x, this.friction.x);
        if(this.friction.y) vel.y = this.applyFriction(vel.y, this.friction.y);

        //cap velocity
        if(vel.x) vel.x = gf.utils.clamp(vel.x, -this.maxVelocity.x, this.maxVelocity.x);
        if(vel.y) vel.y = gf.utils.clamp(vel.y, -this.maxVelocity.y, this.maxVelocity.y);

        return vel;
    },
    /**
     * Applies friction to a velocity, usually the current velocity
     *
     * @method applyFriction
     * @param vel {Number} The velocity to apply the friction to
     * @param friction {Number} The friction factor to apply
     * @return {Object} The modified velocity, with friction applied
     */
    applyFriction: function(vel, friction) {
        return (
                    vel + friction < 0 ?
                    vel + (friction * (this.game._delta || 0)) :
                    (
                        vel - friction > 0 ?
                        vel - (friction * (this.game._delta || 0)) :
                        0
                    )
                );
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
        return (Math.abs(this.position.x - obj.position.x) * 2 < (this.width + obj.width)) &&
                (Math.abs(this.position.y - obj.position.y) * 2 < (this.height + obj.height));
    },
    /**
     * Checks if this entity collides with any Entities, and if so, a penetration vector is calculated.
     *
     * @method checkCollisions
     * @param world {gf.Map} If passed this world will be checked instead of the
     *      world of the game this entity is in.
     * @return {Array}
     */
    checkCollisions: function(world) {
        world = world || this.game.world;

        var self = this,
            res = [];

        //check if this entity collides with any others in the world
        world.forEachEntity(function(ent) {
            if(ent.collidable && self !== ent && self.intersects(ent)) {
                res.push({
                    dx: (self.position.x - ent.position.x) / 2,
                    dy: (self.position.y - ent.position.y) / 2,
                    ent: ent
                });

                if(self.onCollision)
                    self.onCollision(ent);

                if(ent.onCollision)
                    ent.onCollision(self);
            }
        });

        return res;
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

        //apply gravity, friction, etc to this velocity
        this.updateVelocity(this.velocity);

        //TODO: Edge rolling (if you are on the tip edge of a blocking tile, roll around it)
        //get the world colliders
        var colliders = (this.game.world === undefined || !this.mapCollidable) ? [] : this.game.world.checkCollision(this, this.velocity);

        //update flags
        this.onladder = false;

        //collisions
        for(var i = 0, il = colliders.length; i < il; ++i) {
            var collider = colliders[i],
                tile = collider.tile,
                axis = collider.axis;

            this.onladder = (tile.type === gf.Layer.COLLISION.LADDER ? true : this.onladder);

            //if a solid tile
            if(tile.type === gf.Layer.COLLISION.SOLID) {
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

        //do the actual entity movement
        this.moveEntity();

        return colliders;
    },
    /**
     * Moves the entity to a new position using the velocity.
     *
     * @method moveEntity
     * @param vel {Vector} The optional velocity to override the current velocity and move the entity.
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
        this.viewPosition.x = Math.round(this.position.x);
        this.viewPosition.y = Math.round(this.position.y);

        //onMove event
        if(this.onMove)
            this.onMove(vel);

        return this;
    },
    /**
     * Convenience method for setting the position of an Entity.
     *
     * @method setPosition
     * @param x {Number|Array|Vector|Point} X coord to put the sprite at.
     *       If an Array, Vector, or Point is passed then the y parameter is ignored
     * @param y {Number} Y coord to put the sprite at
     * @return {Entity} Returns itself for chainability
     * @example
     *      spr.setPosition(1, 1)
     *          .setPosition([5, 5])
     *          .setPosition(new gf.Point(10, 10))
     *          .setPosition(new gf.Vector(20, 20));
     */
    setPosition: function(x, y) {
        gf.Sprite.prototype.setPosition.call(this, x, y);

        this.viewPosition.x = Math.round(this.position.x);
        this.viewPosition.y = Math.round(this.position.y);

        return this;
    },
    /**
     * On Collision Event
     *      called when this object collides into another, or is being collided into by another
     *      by default if something collides with a collectable entity we remove the collectable
     *
     * @method onCollision
     * @param obj {Entity} Colliding object
     * @return {Entity} Returns itself for chainability
     */
    onCollision: function() {
        if(this.type === gf.Entity.TYPE.COLLECTABLE)
            this.parent.removeChild(this);

        return this;
    },
    /**
     * On Move Event
     *      called when this entity moves
     *
     * @method onMove
     * @param vel {Vector} Velocity the entity moved
     * @return {Entity} Returns itself for chainability
     */
    onMove: function() {
        return this;
    },
    /**
     * On Break Tile Event
     *      called when a tile is broken by this entity
     *
     * @method onBreakTile
     * @param tile {Unkown} the tile that is broken
     * @return {Entity} Returns itself for chainability
     */
    onBreakTile: function() {
        return this;
    }
});

/**
 * Entity types
 *
 * @property TYPE
 * @type Object
 */
gf.Entity.TYPE = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    FRIENDLY: 'friendly',
    NEUTRAL: 'neutral',
    COLLECTABLE: 'collectable'
};