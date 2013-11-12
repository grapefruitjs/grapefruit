var Rectangle = require('../geom/Rectangle'),
    Circle = require('../geom/Circle'),
    Polygon = require('../geom/Polygon'),
    Vector = require('../math/Vector'),
    Tile = require('../tilemap/Tile'),
    inherit = require('../utils/inherit'),
    cp = require('../vendor/cp');

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
    options.sleepTimeThreshold = options.sleepTimeThreshold !== undefined ? options.sleepTimeThreshold : 0.2;
    options.collisionSlop = options.collisionSlop !== undefined ? options.collisionSlop : 0.1;

    /**
     * The state instance this system belongs to
     *
     * @property state
     * @type State
     */
    this.state = state;

    /**
     * The chipmunk space instance that will run all the physics simulations
     *
     * @property space
     * @type cp.Space
     * @readOnly
     */
    this.space = new cp.Space();

    /**
     * The gravity of the physics space
     *
     * @property gravity
     * @type Vector
     */
    this.gravity = this.space.gravity = options.gravity;

    //Time a body must remain idle to fall asleep
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#a928d74741904aae266a9efff5b5f68f7
    this.space.sleepTimeThreshold = options.sleepTimeThreshold;

    //Amount of encouraged penetration between colliding shapes.
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#af1bec644a24e12bfc642a942a88520f7
    this.space.collisionSlop = options.collisionSlop;

    //These two collision scenarios are separate because we don't
    //want tiles to collide with tiles all the time

    //sprite - sprite collisions
    this.space.addCollisionHandler(
        PhysicsSystem.COLLISION_TYPE.SPRITE,
        PhysicsSystem.COLLISION_TYPE.SPRITE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        this.onCollisionPostSolve.bind(this), //postSolve
        this.onCollisionEnd.bind(this) //separate
    );

    //sprite - tile collisions
    this.space.addCollisionHandler(
        PhysicsSystem.COLLISION_TYPE.SPRITE,
        PhysicsSystem.COLLISION_TYPE.TILE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        this.onCollisionPostSolve.bind(this), //postSolve
        this.onCollisionEnd.bind(this) //separate
    );

    /**
     * The actions to perform at the next post-step callback. These are
     * for actions (like add, remove) that cannot be performed during a
     * simulation step.
     *
     * @property actonQueue
     * @type Array<Object>
     * @private
     */
    this.actionQueue = [];

    /**
     * The callback functions to call on the next frame
     *
     * @property tickCallbacks
     * @type Array<Function>
     * @private
     */
    this.tickCallbacks = [];

    /**
     * The number of steps to skip, tracks `this.skip(num)`
     *
     * @property _skip
     * @type Number
     * @private
     */
    this._skip = 0;
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
        this.tickCallbacks.push(fn);

        return this;
    },
    /**
     * Returns the collision type of a sprite
     *
     * @method getCollisionType
     * @param spr {Sprite} The sprite to check
     * @return {Number} The collision type
     */
    getCollisionType: function(spr) {
        if(spr instanceof Tile) {
            return PhysicsSystem.COLLISION_TYPE.TILE;
        } else {
            return PhysicsSystem.COLLISION_TYPE.SPRITE;
        }
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
    add: function(spr, cb) {
        //already in space with body(s)
        if(spr._phys.active)
            return;

        var body = this._createBody(spr),
            shape = this._createShape(spr, body),
            control;

        //add control body and constraints
        if(!body.isStatic()) {
            var cbody = new cp.Body(Infinity, Infinity), //control body
                cpivot = new cp.PivotJoint(cbody, body, cp.vzero, cp.vzero),
                cgear = new cp.GearJoint(cbody, body, 0, 1);

            cpivot.maxBias = 0; //disable join correction
            cpivot.maxForce = 10000; //emulate linear friction

            cgear.errorBias = 0; //attempt to fully correct the joint each step
            cgear.maxBias = 1.2; //but limit the angular correction
            cgear.maxForce = 50000; //emulate angular friction

            control = {};
            control.body = cbody;
            control.pivot = cpivot;
            control.gear = cgear;
        }

        spr._phys.active = true;
        this.actionQueue.push(['add', {
            spr: spr,
            body: body,
            shape: shape,
            control: control
        }, cb]);
        this.act();

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
    remove: function(spr, cb) {
        if(!spr || !spr._phys.active)
            return;

        spr._phys.active = false;
        this.actionQueue.push(['remove', spr._phys, cb]);
        this.act();

        return spr;
    },
    /**
     * Reindexes a sprite's shape in the simulation, useful if it looks
     * like changes are being cached.
     *
     * @method reindex
     * @param spr {Sprite} The sprite to reindex
     * @param [callback] {Function} The callback to call once the sprite has been reindexed
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     * @async
     */
    reindex: function(spr, cb) {
        if(!spr || !spr._phys.active)
            return;

        spr._phys._cb = cb;
        this.actionQueue.push(['reindex', spr._phys.shape, cb]);
        this.act();

        return this;
    },
    /**
     * Reindexes all static bodies in the simulation.
     *
     * @method reindexStatic
     * @param [callback] {Function} The callback to call once reindexing completes
     * @return {PhysicsSystem} Returns itself.
     * @chainable
     * @async
     */
    reindexStatic: function(cb) {
        this.actionQueue.push(['reindexStatic', null, cb]);
        this.act();

        return this;
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
    addCustomShape: function(spr, poly, sensor, cb) {
        if(!spr || !spr._phys.body)
            return;

        var s = this._createShape(spr, spr._phys.body, poly);

        s.setSensor(sensor);
        s.width = spr.width;
        s.height = spr.height;
        s.sprite = spr;
        s.setElasticity(0);
        s.setSensor(sensor !== undefined ? sensor : spr.sensor);
        s.setCollisionType(this.getCollisionType(spr));
        s.setFriction(spr.friction || 0);

        this.actionQueue.push(['addCustomShape', { spr: spr, shape: s }, cb]);
        this.act();

        return s;
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
        if(!spr || !spr._phys.body)
            return;

        spr._phys.body.setMass(mass);

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
        if(!spr)
            return;

        //update control body velocity (and pivot contraint makes regular follow)
        if(spr._phys.control) {
            spr._phys.control.body.setVel(vel);
        }
        //if no control body then update real body
        else {
            spr._phys.body.setVel(vel);
        }

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
        if(!spr)
            return;

        //update body position
        if(spr._phys.body) {
            spr._phys.body.setPos(pos);
        }

        //update control body position
        if(spr._phys.control) {
            spr._phys.control.body.setPos(pos);
        }

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
        if(!spr)
            return;

        //update control body rotation (and gear contraint makes regular follow)
        if(spr._phys.control) {
            spr._phys.control.body.setAngle(rads);
        }
        //if no control body then update real body
        else if(spr._phys.body) {
            spr._phys.body.setAngle(rads);
        }

        return this;
    },
    /**
     * Called each frame by the game state to update the physics simulations
     *
     * @method update
     * @param dt {Number} The number of seconds passed since the last call
     * @private
     */
    update: function(dt) {
        if(this._paused)
            return;

        while(this.tickCallbacks.length)
            (this.tickCallbacks.shift()).call(this);

        if(this._skip)
            return this._skip--;

        //execute the physics step
        this.space.step(dt);

        //go through each changed shape
        this.space.activeShapes.each(function(shape) {
            //since the anchor for a cp shape is 0.5 0.5, we have to modify the pos a bit
            //to make it match the sprite's anchor point
            var spr = shape.sprite;
            spr.position.x = shape.body.p.x;// + ((spr.anchor.x * shape.width) - (shape.width / 2));
            spr.position.y = shape.body.p.y;// + ((spr.anchor.y * shape.height) - (shape.height / 2));
            spr.rotation = shape.body.a;

            //the sprite has changed due to a physics update, emit that event
            spr.emit('physUpdate');
        });
    },
    /**
     * Called when a collision begins in the system
     *
     * @method onCollisionBegin
     * @param arbiter {cp.Arbiter} The arbiter of the collision
     * @param space {cp.Space} The space the collision occurred in
     * @private
     */
    onCollisionBegin: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        //only call the sensor collisions here
        if(shapes[0].sensor || shapes[1].sensor) {
            spr1.onCollision(spr2, arbiter.getNormal(0), shapes[1], shapes[0]);
            spr2.onCollision(spr1, arbiter.getNormal(0), shapes[0], shapes[1]);
        }

        //maintain the colliding state
        return true;
    },
    /**
     * Called after a collision is solved in the system
     *
     * @method onCollisionPostSolve
     * @param arbiter {cp.Arbiter} The arbiter of the collision
     * @param space {cp.Space} The space the collision occurred in
     * @private
     */
    onCollisionPostSolve: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        if(arbiter.isFirstContact()) {
            spr1.onCollision(spr2, arbiter.totalImpulse(), shapes[1], shapes[0]);
            spr2.onCollision(spr1, arbiter.totalImpulse(), shapes[0], shapes[1]);
        }

        //maintain the colliding state
        return true;
    },
    /**
     * Called after a collision ends in the system (separation)
     *
     * @method onCollisionEnd
     * @param arbiter {cp.Arbiter} The arbiter of the collision
     * @param space {cp.Space} The space the collision occurred in
     * @private
     */
    onCollisionEnd: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        spr1.onSeparate(spr2, shapes[1], shapes[0]);
        spr2.onSeparate(spr1, shapes[0], shapes[1]);

        //maintain the colliding state
        return true;
    },
    /**
     * Attempts to perform the postStep actions that have been queued. If the space
     * is currently locked, then it waits until after the step to run the actions.
     *
     * @method onCollisionEnd
     * @private
     */
    act: function() {
        if(this.space.locked) {
            this.space.addPostStepCallback(this.onPostStep.bind(this));
        } else {
            //for async behavior
            var self = this;
            setTimeout(function() {
                self.onPostStep();
            }, 1);
        }
    },
    /**
     * Processes the action queue after a step is unlocked.
     *
     * @method onPostStep
     * @private
     */
    onPostStep: function() {
        //remove items
        while(this.actionQueue.length) {
            var a = this.actionQueue.shift(),
                act = a[0],
                data = a[1],
                cb = a[2];

            switch(act) {
                case 'add':
                    data.body.setPos(data.spr.position);
                    if(!data.body.isStatic()) {
                        this.space.addBody(data.body);
                    }

                    this.space.addShape(data.shape);

                    if(data.control) {
                        data.control.body.setPos(data.spr.position);
                        this.space.addConstraint(data.control.pivot);
                        this.space.addConstraint(data.control.gear);
                    }

                    data.spr._phys.body = data.body;
                    data.spr._phys.shape = data.shape;
                    data.spr._phys.control = data.control;
                    break;

                case 'remove':
                    if(data.body.space) {
                        this.space.removeBody(data.body);
                    }

                    if(data.shape.space) {
                        this.space.removeShape(data.shape);
                    }

                    if(data.customShapes) {
                        for(var i = data.customShapes.length - 1; i > -1; --i) {
                            this.space.removeShape(data.customShapes[i]);
                        }
                    }

                    //remove references
                    data.body = null;
                    data.shape.sprite = null;
                    data.shape = null;
                    data.customShapes = null;
                    break;

                case 'reindex':
                    this.space.reindexShape(data);
                    break;

                case 'reindexStatic':
                    this.space.reindexStatic();
                    break;

                case 'addCustomShape':
                    if(!data.spr._phys.customShapes) {
                        data.spr._phys.customShapes = [];
                    }

                    data.spr._phys.customShapes.push(data.shape);
                    this.space.addShape(data.shape);
                    break;

            }

            if(cb)
                cb.call(this);
        }
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
        var body = new cp.Body(
            spr.mass || 1,
            spr.inertia || cp.momentForBox(spr.mass || 1, spr.width, spr.height) || Infinity
        );

        if(spr.mass === Infinity) {
            //inifinite mass means it is static, so make it static
            //and do not add it to the world (no need to simulate it)
            body.nodeIdleTime = Infinity;
        }// else {
            //this.space.addBody(body);
        //}

        return body;
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
    _createShape: function(spr, body, poly) {
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

        //this.space.addShape(shape);

        shape.width = spr.width;
        shape.height = spr.height;
        shape.sprite = spr;
        shape.setElasticity(0);
        shape.setSensor(spr.sensor);
        shape.setCollisionType(this.getCollisionType(spr));
        shape.setFriction(spr.friction || 0);

        return shape;
    }
});

PhysicsSystem.COLLISION_TYPE = {
    SPRITE: 0,
    TILE: 1
};

module.exports = PhysicsSystem;
