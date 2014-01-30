var Vector = require('../math/Vector');

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
     *  - mass {Number} The mass of this object, use obj.mass to set the mass
     *  - inertia {Number} The moment of inertia of the object
     *
     * @property physics
     * @type Object
     * @private
     * @readOnly
     */
    this._physics = {
        active: false,
        system: null,
        body: null,
        shape: null
    };

    this.mass = 0;

    /**
     * The internal velocity value, used as a reusable vector for the setVelocity function. Setting
     * this directly *has no effect*.
     *
     * @property _velocity
     * @type Vector
     * @private
     * @readOnly
     */
    this._velocity = new Vector();

    /**
     * Enables physics for this sprite
     *
     * @method enablePhysics
     * @param system {PhysicsSystem} The system for the sprite to be in
     * @param callback {Function} The callback function to call after physics have been enabled
     * @return {mixed} Returns itself.
     * @chainable
     * @async
     */
    this.enablePhysics = function(sys) {
        var self = this;

        sys = sys || this._physics.system;

        if(sys) {
            this._physics.system = sys;

            if(this._physics.active)
                sys.remove(this);

            sys.add(this);
        }

        return this;
    };

    /**
     * Disbales physics for this sprite
     *
     * @method disablePhysics
     * @param callback {Function} The callback function to call after physics have been disabled
     * @return {mixed} Returns itself.
     * @chainable
     * @async
     */
    this.disablePhysics = function() {
        //if we have a cached system, remove from it
        if(this._physics.active) {
            this._physics.system.remove(this);
        }

        return this;
    };

    /**
     * Sets the velocity of this sprite
     *
     * @method setVelocity
     * @param x {Number|Vector} The x coord to set the velocity to, if a Vector is passed the y param is ignored
     * @param y {Number} The y coord to set the velocity to
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.setVelocity = function(x, y) {
        y = x.y !== undefined ? x.y : (y || 0);
        x = x.x !== undefined ? x.x : (x || 0);

        this._velocity.set(x, y);

        if(this._physics.system) {
            this._physics.system.setVelocity(this, this._velocity);
        }

        return this;
    };

    /**
     * Sets the position of this sprite
     *
     * @method setPosition
     * @param x {Number|Vector} The x coord to set position to, if a Vector is passed the y param is ignored
     * @param y {Number} The y coord to set position to
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.setPosition = function(x, y) {
        y = x.y !== undefined ? x.y : (y || 0);
        x = x.x !== undefined ? x.x : (x || 0);

        this.position.set(x, y);

        if(this._physics.system) {
            this._physics.system.setPosition(this, this.position);
        }

        return this;
    };
};
