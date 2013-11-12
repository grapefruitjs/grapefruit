/**
 * Physics mixin. This will add physics capabilities to the class it mixes into.
 *
 * @class PhysicsTarget
 * @constructor
 */
module.exports = function() {
    /**
     * The physics namespace that all physics properties go into. Those properties are:
     *  - system {PhysicsSystem} PhysicsSystem that this object is a part of.
     *  - active {Boolean} Whether or not this target is actively having physics simulated.
     *
     * @property _phys
     * @type Object
     * @default {}
     * @private
     * @readOnly
     */
    this._phys = {};

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
     * @return {mixed} Returns itself.
     * @chainable
     * @async
     */
    this.enablePhysics = function(sys, cb) {
        var self = this;

        if(typeof sys === 'function') {
            cb = sys;
            sys = null;
        }

        //is a system is passed use it
        if(sys) {
            //if active, remove from current system
            if(this._phys.active) {
                //remove from old system
                this._phys.system.remove(this, function() {
                    //add to new system when completed
                    sys.add(self, cb);
                });
            }
            //if inactive add to new system immediately
            else {
                sys.add(this, cb);
            }

            //reassign new system
            this._phys.system = sys;
        }
        //if no system passed (or same one passed) just add to current stored system
        else {
            this._phys.system.add(this, cb);
        }

        return this;
    };

    /**
     * Disbales physics for this sprite
     *
     * @method disablePhysics
     * @return {mixed} Returns itself.
     * @chainable
     * @async
     */
    this.disablePhysics = function(cb) {
        //if we have a cached system, remove from it
        if(this._phys.system) {
            this._phys.system.remove(this, cb);
        }

        return this;
    };

    /**
     * Reindexes the collisions for this sprite, useful when moving the sprite a great deal
     * (like to a new world)
     *
     * @method disablePhysics
     * @return {mixed} Returns itself.
     * @chainable
     * @async
     */
    this.reindex = function(cb) {
        //if we have a cached system, reindex
        if(this._phys.system) {
            this._phys.system.reindex(this, cb);
        }

        return this;
    };

    /**
     * Sets the mass of this sprite
     *
     * @method setMass
     * @param mass {Number} The new mass of the object
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.setMass = function(mass) {
        if(this._phys.system) {
            this._phys.system.setMass(this, mass);
        }

        return this;
    };

    /**
     * Sets the velocity of this sprite
     *
     * @method setVelocity
     * @param velocity {Vector} The new velocity of the object
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.setVelocity = function(vel) {
        if(this._phys.system) {
            this._phys.system.setVelocity(this, vel);
        }

        return this;
    };

    /**
     * Sets the rotation of this sprite
     *
     * @method setRotation
     * @param rotation {Number} The new rotation of the object in radians
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.setRotation = function(rads) {
        this.rotation = rads;

        if(this._phys.system) {
            this._phys.system.setRotation(this, rads);
        }

        return this;
    };

    /**
     * Sets the position of this sprite
     *
     * @method setPosition
     * @param x {Number}
     * @param y {Number}
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.setPosition = function(x, y) {
        this.position.x = x;
        this.position.y = y;

        if(this._phys.system) {
            this._phys.system.setPosition(this, this.position);
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
     * @event collision
     * @param obj {Sprite} Colliding sprite
     * @param vec {Vector} Collision vector (for sensors this is normalized)
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {cp.Shape} Your physics shape that caused the collision
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
     * @event separate
     * @param obj {Sprite} Colliding sprite
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {cp.Shape} Your physics shape that caused the collision
     */
    this.onSeparate = function(obj, colShape, myShape) {
        this.emit('separate', obj, colShape, myShape);
    };
};