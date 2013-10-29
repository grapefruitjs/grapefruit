/**
 * Physics mixin. This will add physics capabilities to the class it mixes into.
 *
 * @class PhysicsTarget
 * @constructor
 */
 module.exports = function() {
    /**
     * The physics system that this object is a part of. This is advisory only
     * please use enablePhysics() or disablePhysics() and do not set this value
     * directly.
     *
     * @property _psystem
     * @type PhysicsSystem
     * @default null
     * @private
     * @readOnly
     */
    this._psystem = null;

    /**
     * The mass of this object, please use setMass to set this value
     *
     * @property mass
     * @type Number
     * @default 0
     * @readOnly
     */
    this.mass = 0;

    /**
     * The moment of inertia of this object, only set this before enabling physics (has no effect after enabling)
     *
     * @property inertia
     * @type Number
     * @default 0
     */
    this.inertia = 0;

    /**
     * Enables physics for this sprite
     *
     * @method enablePhysics
     * @param system {PhysicsSystem} The system for the sprite to be in
     */
    this.enablePhysics = function(sys) {
        if(sys && this._psystem !== sys) {
            if(this._psystem)
                this._psystem.remove(this);

            this._psystem = sys;
        }

        this._psystem.add(this);

        return this;
    };

    /**
     * Disbales physics for this sprite
     *
     * @method disablePhysics
     */
    this.disablePhysics = function() {
        if(this._psystem) {
            this._psystem.remove(this);
        }

        return this;
    };

    /**
     * Reindexes the collisions for this sprite, useful when moving the sprite a great deal
     * (like to a new world)
     *
     * @method disablePhysics
     */
    this.reindex = function() {
        if(this._psystem) {
            this._psystem.reindex(this);
        }

        return this;
    };

    /**
     * Sets the mass of this sprite
     *
     * @method setMass
     * @param mass {Number} The new mass of the object
     */
    this.setMass = function(mass) {
        if(this._psystem) {
            this._psystem.setMass(this, mass);
        }

        return this;
    };

    /**
     * Sets the velocity of this sprite
     *
     * @method setVelocity
     * @param velocity {Vector} The new velocity of the object
     */
    this.setVelocity = function(vel) {
        if(this._psystem) {
            this._psystem.setVelocity(this, vel);
        }

        return this;
    };

    /**
     * Sets the rotation of this sprite
     *
     * @method setRotation
     * @param rotation {Number} The new rotation of the object in radians
     */
    this.setRotation = function(rads) {
        this.rotation = rads;

        if(this._psystem) {
            this._psystem.setRotation(this, rads);
        }

        return this;
    };

    /**
     * Sets the position of this sprite
     *
     * @method setPosition
     * @param x {Number}
     * @param y {Number}
     */
    this.setPosition = function(x, y) {
        this.position.x = x;
        this.position.y = y;

        if(this._psystem) {
            this._psystem.setPosition(this, this.position);
        }

        return this;
    };

    /**
     * On Collision Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we destroy the collectable
     *      and if we collide with a solid tile we kill our velocity. This method will emit a
     *      'collision' event that you can listen for
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     * @param vec {Vector} Collision vector (for sensors this is normalized)
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {Sprite} Your physics shape that caused the collision
     */
    this.onCollision = function(obj, vec, colShape, myShape) {
        this.emit('collision', obj, vec, colShape, myShape);
    };

    /**
     * On Seperate Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we destroy the collectable
     *      and if we collide with a solid tile we kill our velocity. This method will emit a
     *      'collision' event that you can listen for
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {Sprite} Your physics shape that caused the collision
     */
    this.onSeparate = function(obj, colShape, myShape) {
        this.emit('separate', obj, colShape, myShape);
    };
};