var Rectangle = require('../geom/Rectangle'),
    Circle = require('../geom/Circle'),
    Polygon = require('../geom/Polygon'),
    Vector = require('../math/Vector'),
    Tile = require('../tilemap/Tile'),
    inherit = require('../utils/inherit'),
    cp = require('../vendor/cp');

var PhysicsSystem = module.exports = function(game, gravity) {
    /**
     * The game instance this system belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    this.space = new cp.Space();
    this.gravity = this.space.gravity = gravity !== undefined ? gravity : new Vector(0, 9.87);

    //Time a body must remain idle to fall asleep
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#a928d74741904aae266a9efff5b5f68f7
    this.space.sleepTimeThreshold = 0.2;

    //Amount of encouraged penetration between colliding shapes.
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#af1bec644a24e12bfc642a942a88520f7
    this.space.collisionSlop = 0.1;

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

    this.actionQueue = [];
    this.tickCallbacks = [];
    this._skip = 0;
};

inherit(PhysicsSystem, Object, {
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
    },
    nextTick: function(fn) {
        this.tickCallbacks.push(fn);
    },
    reindexStatic: function() {
        this.actionQueue.push(['reindexStatic']);
        this.act();
    },
    getCollisionType: function(spr) {
        if(spr instanceof Tile) {
            return PhysicsSystem.COLLISION_TYPE.TILE;
        } else {
            return PhysicsSystem.COLLISION_TYPE.SPRITE;
        }
    },
    add: function(spr) {
        //already in system
        if(spr._phys && spr._phys.body)
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

        this.actionQueue.push(['add', {
            spr: spr,
            body: body,
            shape: shape,
            control: control
        }]);
        this.act();
    },
    remove: function(spr) {
        if(!spr || !spr._phys || !spr._phys.body || !spr._phys.shape)
            return;

        this.actionQueue.push(['remove', spr._phys]);
        this.act();
    },
    reindex: function(spr) {
        if(!spr || !spr._phys || !spr._phys.shape)
            return;

        this.actionQueue.push(['reindex', spr._phys.shape]);
        this.act();
    },
    addCustomShape: function(spr, poly, sensor) {
        if(spr && spr._phys && spr._phys.body) {
            var s = this._createShape(spr, spr._phys.body, poly);

            s.setSensor(sensor);
            s.width = spr.width;
            s.height = spr.height;
            s.sprite = spr;
            s.setElasticity(0);
            s.setSensor(sensor !== undefined ? sensor : spr.sensor);
            s.setCollisionType(this.getCollisionType(spr));
            s.setFriction(spr.friction || 0);

            this.actionQueue.push(['addCustomShape', { spr: spr, shape: s }]);
            this.act();

            return s;
        }
    },
    setMass: function(spr, mass) {
        if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setMass(mass);
    },
    setVelocity: function(spr, vel) {
        //update control body velocity (and pivot contraint makes regular follow)
        if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
            spr._phys.control.body.setVel(vel);

        //if no control body then update real body
        else if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setVel(vel);
    },
    setPosition: function(spr, pos) {
        //update body position
        if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setPos(pos);

        //update control body position
        if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
            spr._phys.control.body.setPos(pos);
    },
    setRotation: function(spr, rads) {
        //update control body rotation (and gear contraint makes regular follow)
        if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
            spr._phys.control.body.setAngle(rads);

        //if no control body then update real body
        else if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setAngle(rads);

    },
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

            spr.emit('physUpdate');
        });
    },
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
    onCollisionEnd: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        spr1.onSeparate(spr2, shapes[1], shapes[0]);
        spr2.onSeparate(spr1, shapes[0], shapes[1]);

        //maintain the colliding state
        return true;
    },
    act: function() {
        if(this.space.locked) {
            this.space.addPostStepCallback(this.onPostStep.bind(this));
        } else {
            this.onPostStep();
        }
    },
    pause: function() {
        this._paused = true;
    },
    resume: function() {
        this._paused = false;
    },
    skip: function(num) {
        this._skip = num;
    },
    skipNext: function() {
        this.skip(1);
    },
    onPostStep: function() {
        //remove items
        while(this.actionQueue.length) {
            var a = this.actionQueue.shift(),
                act = a[0],
                data = a[1];

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

                    data.spr._phys = data;
                    break;

                case 'remove':
                    if(data.body.space)
                        this.space.removeBody(data.body);

                    if(data.shape.space)
                        this.space.removeShape(data.shape);

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
                    if(!data.spr._phys.customShapes)
                        data.spr._phys.customShapes = [];

                    data.spr._phys.customShapes.push(data.shape);
                    this.space.addShape(data.shape);
                    break;

            }
        }
    }
});

PhysicsSystem.COLLISION_TYPE = {
    SPRITE: 0,
    TILE: 1
};