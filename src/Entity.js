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
     * Whether or not the entity is "alive", advisory only
     *
     * @property alive
     * @type Boolean
     * @default true
     */
    this.alive = true;

    /**
     * Can it collide with other entities
     *
     * @property collidable
     * @type Boolean
     * @default true
     * @readOnly
     */
    this.collidable = true;

    /**
     * The mass of the entity
     *
     * @property mass
     * @type Number
     * @default 1
     * @readOnly
     */
    this.mass = 1;

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

    if(!game) throw 'No game instance passed to Entity, a game instance is required!';

    this.setCollidable(this.collidable);
};

gf.inherits(gf.Entity, gf.Sprite, {
    setCollidable: function(canCollide) {
        //turning off collisions
        if(this.collidable && !canCollide)
            this.game.physics.remove(this);
        //turning on collisions
        else if(!this.collidable && canCollide)
            this.game.physics.add(this);
    },
    setMass: function(mass) {
        this.mass = mass < 0 ? 0 : mass;
        this.game.physics.setMass(this, mass);

        if(this.mass === 0)
            this.collidable = false;
    },
    setVelocity: function(vel) {
        this.game.physics.setVelocity(this, gf.utils.ensureVector(vel));
    },
    setRotation: function(rads) {
        this.rotation = rads;
        this.game.physics.setRotation(this, rads);
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
    setPosition: function(x, y, skipPhysics) {
        gf.Sprite.prototype.setPosition.call(this, x, y);

        this.viewPosition.x = Math.round(this.position.x);
        this.viewPosition.y = Math.round(this.position.y);

        if(!skipPhysics) {
            this.game.physics.setPosition(this, this.position);
        }

        return this;
    },
    /**
     * On Collision Event
     *      called when this object collides into another, or is being collided into by another
     *      by default if something collides with a collectable entity we remove the collectable
     *      and if we collide with a solid tile we kill our velocity
     *
     * @method onCollision
     * @param obj {Entity} Colliding object
     * @return {Entity} Returns itself for chainability
     */
    onCollision: function(obj) {
        if(this.type === gf.Entity.TYPE.COLLECTABLE)
            this.parent.removeChild(this);

        if(obj.collisionType === gf.Tile.COLLISION.SOLID)
            this.setVelocity(0);

        return this;
    },
    /**
     * On Move Event
     *      called when this entity moves
     *
     * @method onMove
     * @param vel {Vector} The difference of position that the entity moved
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
    COLLECTABLE: 'collectable',
    TILE: 'tile'
};