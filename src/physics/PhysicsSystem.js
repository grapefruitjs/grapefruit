var Rectangle = require('../geom/Rectangle'),
    Circle = require('../geom/Circle'),
    Polygon = require('../geom/Polygon'),
    Vector = require('../math/Vector'),
    Tile = require('../tilemap/Tile'),
    math = require('../math/math'),
    inherit = require('../utils/inherit'),
    p2 = require('p2');

/**
 * The PhysicsSystem is the wrapper around the chipmunk-js physics library that integrates
 * grapefruit objects into the physics world. It is in charge of managing objects in the physics
 * space. Generally you would not create this yourself and instead would use the `.physics` property
 * of a State.
 *
 * @class PhysicsSystem
 * @extends Object
 * @constructor
 * @param state {State} The state instance this system belongs to.
 * @param [options] {Object} The options for the physics system.
 * @param [options.gravity=new Vector(0, 9.87)] {Vector} The gravity of the space
 */
var PhysicsSystem = function(state, options) {
    //default options
    options = options || {};
    options.gravity = options.gravity instanceof Vector ? options.gravity : new Vector(0, 9.87);
    options.iterations = options.iterations || 10;
    options.sleepTimeThreshold = options.sleepTimeThreshold !== undefined ? options.sleepTimeThreshold : 0.5;
    options.collisionSlop = options.collisionSlop !== undefined ? options.collisionSlop : 0.1;
    options.stepTime = options.stepTime || (1 / 60);

    /**
     * The state instance this system belongs to
     *
     * @property state
     * @type State
     */
    this.state = state;

    /**
     * The delta time to use as the constant for physics simulation
     *
     * @property stepTime
     * @type Number
     * @default (1 / 60)
     */
    this.stepTime = options.stepTime;

    /**
     * The p2 world instance that will run all the physics simulations
     *
     * @property space
     * @type p2.World
     * @readOnly
     */
    this.world = new p2.World();

    if(options.gravity) {
        this.world.gravity[0] = options.gravity.x;
        this.world.gravity[1] = options.gravity.y;
    }

    /**
     * The callback functions to call on the next frame
     *
     * @property _tickCallbacks
     * @type Array<Function>
     * @private
     */
    this._tickCallbacks = [];

    /**
     * Whether or not the physics simulartion is paused
     *
     * @property _paused
     * @type Boolean
     * @readOnly
     * @private
     */
    this._paused = false;

    /**
     * The number of steps to skip, tracks `this.skip(num)`
     *
     * @property _skip
     * @type Number
     * @readOnly
     * @private
     */
    this._skip = 0;

    //setup events
    this.world.on('beginContact', this.onContact.bind(this));
    this.world.on('endContact', this.onSeparate.bind(this));
    //this.world.on('preSolve', this.onPreSolve.bind(this));
};

inherit(PhysicsSystem, Object, {
    /**
     * Pauses physics simulation
     *
     * @method pause
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    pause: function() {
        this._paused = true;

        return this;
    },
    /**
     * Resumes physics simulation
     *
     * @method resume
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    resume: function() {
        this._paused = false;

        return this;
    },
    /**
     * Skips the specified number of frame steps
     *
     * @method skip
     * @param num {Number} Number of steps to skip
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    skip: function(num) {
        this._skip += num;

        return this;
    },
    /**
     * Skips the next frame step
     *
     * @method skipNext
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    skipNext: function() {
        return this.skip(1);
    },
    /**
     * Registers a callback to be executed on the next frame step
     *
     * @method nextTick
     * @param fn {Function} The callback to register
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     * @async
     */
    nextTick: function(fn) {
        this._tickCallbacks.push(fn);

        return this;
    },
    /**
     * Adds a sprite to the physics simulation
     *
     * @method add
     * @param spr {Sprite} The sprite to add
     * @param [callback] {Function} The callback to call once the sprite has been added
     * @return {Sprite} The sprite that was added
     * @async
     */
    add: function(spr) {
        //already in space with body(s)
        if(spr._physics.active)
            return;

        var shape = this._createShape(spr),
            body = this._createBody(spr);

        body.addShape(shape);
        body.__sprite = spr;

        this.world.addBody(body);

        spr._physics.active = true;
        spr._physics.body = body;
        spr._physics.shape = shape;

        return spr;
    },
    /**
     * Removes a sprite from the physics simulation
     *
     * @method remove
     * @param spr {Sprite} The sprite to remove
     * @param [callback] {Function} The callback to call once the sprite has been removed
     * @return {Sprite} The sprite that was removed
     * @async
     */
    remove: function(spr) {
        if(!spr._physics.active)
            return;

        var body = spr._physics.body;

        //remove shapes from body
        for(var i = body.shapes.length; i >= 0; --i)
            body.removeShape(body.shapes[i]);

        //remove body from world
        this.world.removeBody(body);

        //null references
        spr._physics.active = false;
        spr._physics.body = null;
        spr._physics.shape = null;

        return spr;
    },
    /**
     * Adds a custom shape to a sprite, useful for a single sprite to have multiple
     * different collision shapes (including sensors).
     *
     * @method addCustomShape
     * @param spr {Sprite} The sprite to add the shape to
     * @param poly {Circle|Rectangle|Polygon} The shape to create
     * @param sensor {Boolean} Is this a sensor shape, if so you will get a collision callback, but no solve
     * @param [callback] {Function} The callback to call once the shape has been added
     * @return {cp.Shape} The shape that was created
     * @async
     */
    addCustomShape: function(spr, poly, sensor) {
        if(!spr._physics.active)
            return;

        var shape = this._createShape(spr, spr._physics.body, poly);

        spr._physics.body.addShape(shape);

        return shape;
    },
    /**
     * Sets the mass of a sprite's physics body.
     *
     * @method setMass
     * @param spr {Sprite} The sprite to set the mass for
     * @param mass {Number} The mass to set
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    setMass: function(spr, mass) {
        if(!spr._physics.active)
            return;

        spr._physics.body.mass = mass;
        spr._physics.body.updateMassProperties();

        return this;
    },
    /**
     * Sets the velocity of a sprite's physics body.
     *
     * @method setVelocity
     * @param spr {Sprite} The sprite to set the velocity for
     * @param velocity {Vector} The velocity to set to
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    setVelocity: function(spr, vel) {
        if(!spr._physics.active || spr._physics.body.motionState === p2.Body.STATIC)
            return;

        spr._physics.body.velocity[0] = vel.x;
        spr._physics.body.velocity[1] = vel.y;

        return this;
    },
    /**
     * Sets the position of a sprite's physics body.
     *
     * @method setPosition
     * @param spr {Sprite} The sprite to set the position for
     * @param position {Vector} The position to set to
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    setPosition: function(spr, pos) {
        if(!spr._physics.active)
            return;

        spr._physics.body.position[0] = pos.x;
        spr._physics.body.position[1] = pos.y;

        return this;
    },
    /**
     * Sets the rotation of a sprite's physics body.
     *
     * @method setRotation
     * @param spr {Sprite} The sprite to set the rotation for
     * @param rotation {Number} The rotation to set to in radians
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     */
    setRotation: function(spr, rads) {
        if(!spr._physics.active)
            return;

        spr._physics.body.angle = rads;

        return this;
    },
    /**
     * Called each physics step iteration. This is detached from the frame rendering and
     * runs at a constant step.
     *
     * @method update
     * @private
     */
    update: function(dt) {
        if(this._paused)
            return;

        while(this._tickCallbacks.length)
            (this._tickCallbacks.shift()).call(this);

        if(this._skip)
            return this._skip--;

        //execute the physics step
        this.world.step(this.stepTime, dt);

        //go through each body and update the sprite with interpolated position
        var bodies = this.world.bodies,
            body = null,
            i = 0;

        for(i = 0; i < bodies.length; ++i) {
            body = bodies[i];

            body.__sprite.position.x = body.position[0]; //interpolatedPosition[0];
            body.__sprite.position.y = body.position[1]; //interpolatedPosition[1];
            body.__sprite.rotation = -body.angle;
        }
    },
    onContact: function(event) {
        var len = event.contactEquations.length;

        //notify of any collisions
        for(var i = 0; i < len; ++i) {
            var eq = event.contactEquations[i];

            if(eq.firstImpact) {
                var evt = { bodyA: eq.bi, bodyB: eq.bj, shapeA: eq.shapeA, shapeB: eq.shapeB };
                eq.bi.__sprite.emit('collision', evt);
                eq.bj.__sprite.emit('collision', evt);
            }
        }
    },
    onSeparate: function(event) {
        event.bodyA.__sprite.emit('separate', event);
        event.bodyB.__sprite.emit('separate', event);
    },
    /**
     * Creates a physics body for a sprite
     *
     * @method _createBody
     * @param spr {Sprite} The sprite to create a body for
     * @return {cp.Body} The chipmunk-js physics body
     * @private
     */
    _createBody: function(spr) {
        return new p2.Body({
            mass: spr.mass || 0,
            position: [spr.position.x, spr.position.y],
            fixedRotation: spr.inertia === Infinity || spr.fixedRotation === true
        });
    },
    /**
     * Creates a collision shape for a sprite
     *
     * @method _createShape
     * @param spr {Sprite} The sprite to create a shape for
     * @param body {cp.Body} The body to attach the shape to
     * @param [poly] {Circle|Rectangle|Polygon} The shape to create, defaults to `spr.hitArea`
     * @return {cp.Shape} The chipmunk-js collision shape
     * @private
     */
    _createShape: function(spr) {
        var shape = new p2.Rectangle(16, 16);
        return shape;

        /*
        var shape,
            hit = poly || spr.hitArea,
            ax = spr.anchor ? spr.anchor.x : 0,
            ay = spr.anchor ? spr.anchor.y : 0,
            aw = spr.width * ax,
            ah = spr.height * ay;

        //specified shape
        if(hit) {
            if(hit instanceof Rectangle) {
                //convert the top-left anchored rectangle to left,right,bottom,top values
                //for chipmunk space that will corospond to our own
                var l = hit.x,
                    r = hit.x + hit.width,
                    b = hit.y - spr.height,
                    t = b + hit.height;

                l -= aw;
                r -= aw;

                b += spr.height - ah;
                t += spr.height - ah;

                shape = new cp.BoxShape2(body, new cp.BB(l, b, r, t));
            }
            else if(hit instanceof Circle) {
                //the offset needs to move the circle to the sprite center based on the sprite's anchor (bottom-left)
                var offset = new Vector(
                    ((spr.width / 2) - aw) + hit.x,
                    ((spr.height / 2) - ah) + hit.y
                );

                shape = new cp.CircleShape(body, hit.radius, offset);
            }
            else if(hit instanceof Polygon) {
                //cp shapes anchors are 0.5,0.5, but a polygon uses 0,0 as the topleft
                //of the bounding rect so we have to convert
                var points = [],
                    ps = hit.points;

                for(var i = 0; i < ps.length; ++i) {
                    var p = ps[i];

                    points.push(p.x - aw);
                    points.push(p.y - ah);
                }

                shape = new cp.PolyShape(body, cp.convexHull(points, null, 0), cp.vzero);
            }
        }

        //default box shape
        if(!shape) {
            shape = new cp.BoxShape2(body, new cp.BB(0, -spr.height, spr.width, 0));
        }

        //this.space.addShape(shape)r;
        shape.setElasticity(spr.bounce || spr.elasticity || 0);
        shape.setSensor(spr.sensor);
        shape.setCollisionType(this.getCollisionType(spr));
        shape.setFriction(spr.friction || 0);
        shape.group = spr.shapeGroup || 0;
        return shape;*/
    }
});

module.exports = PhysicsSystem;
