gf.PhysicsSystem = function(options) {
    options = options || {};

    this.space = new cp.Space();
    this.space.gravity = gf.utils.ensureVector(options.gravity !== undefined ? options.gravity : 9.87);

    //Time a body must remain idle to fall asleep
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#a928d74741904aae266a9efff5b5f68f7
    this.space.sleepTimeThreshold = options.sleepTimeThreshold || 0.2;

    //Amount of encouraged penetration between colliding shapes.
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#af1bec644a24e12bfc642a942a88520f7
    this.space.collisionSlop = options.collisionSlop || 0.1;

    //These two collision scenarios are separate because we don't
    //want tiles to collide with tiles all the time

    //sprite - sprite collisions
    this.space.addCollisionHandler(
        gf.PhysicsSystem.COLLISION_TYPE.SPRITE,
        gf.PhysicsSystem.COLLISION_TYPE.SPRITE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );

    //sprite - tile collisions
    this.space.addCollisionHandler(
        gf.PhysicsSystem.COLLISION_TYPE.SPRITE,
        gf.PhysicsSystem.COLLISION_TYPE.TILE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );
};

gf.inherits(gf.PhysicsSystem, Object, {
    _createBody: function(spr) {
        var body = new cp.Body(
            spr.mass || 1,
            spr.inertia || cp.momentForBox(spr.mass || 1, spr.width, spr.height)
        );

        if(spr.mass === Infinity) {
            //inifinite mass means it is static, so make it static
            //and do not add it to the world (no need to simulate it)
            body.nodeIdleTime = Infinity;
        } else {
            this.space.addBody(body);
        }

        return body;
    },
    _createShape: function(spr, body) {
        var shape,
            hit = spr.hitArea;

        //specified shape
        if(hit) {
            if(hit instanceof gf.Rectangle) {
                //convert the top-left anchored rectangle to left,right,bottom,top values
                //for chipmunk space that will corospond to our own
                var l = hit.x,
                    r = hit.x + hit.width,
                    b = hit.y - spr.height,
                    t = b + hit.height,
                    a = spr.anchor ? spr.anchor.y : 0,
                    bias = hit.height - (hit.height * a);

                b += bias;
                t += bias;

                if(spr.type === 'zone' || spr.type === 'player') {
                    window.console.log(spr.anchor, l, r, t, b, spr);
                }

                shape = new cp.BoxShape2(body, new cp.BB(l, b, r, t));
            }
            else if(hit instanceof gf.Circle) {
                //the offset needs to move the circle to the sprite center based on the sprite's anchor (bottom-left)
                var offset = new gf.Vector(
                    spr.width / 4,
                    -spr.height / 4
                );

                shape = new cp.CircleShape(body, hit.radius, offset);
            }
            else if(hit instanceof gf.Polygon) {
                //cp shapes anchors are 0.5,0.5, but a polygon uses 0,0 as the topleft
                //of the bounding rect so we have to convert
                var points = [],
                    ps = hit.points.slice().reverse();

                for(var i = 0; i < ps.length; ++i) {
                    var p = ps[i];

                    points.push(p.x);
                    points.push(p.y - spr.height);
                }

                shape = new cp.PolyShape(body, points, cp.vzero);
            }
        }

        //default box shape
        if(!shape) {
            shape = new cp.BoxShape2(body, new cp.BB(0, -spr.height, spr.width, 0));
        }

        this.space.addShape(shape);

        shape.width = spr.width;
        shape.height = spr.height;
        shape.sprite = spr;
        shape.setElasticity(0);
        shape.setSensor(spr.sensor);
        shape.setCollisionType(this.getCollisionType(spr));
        shape.setFriction(spr.friction !== undefined ? spr.friction : 0.1);

        return shape;
    },
    invalidCollisions: function() {
        this.space.reindexStatic();
    },
    getCollisionType: function(spr) {
        if(spr instanceof gf.Tile) {
            return gf.PhysicsSystem.COLLISION_TYPE.TILE;
        } else {
            return gf.PhysicsSystem.COLLISION_TYPE.SPRITE;
        }
    },
    add: function(spr) {
        if(!spr._phys)
            spr._phys = {};

        //already in system
        if(spr._phys.body)
            return;

        var body = this._createBody(spr),
            shape = this._createShape(spr, body);

        spr._phys.body = body;
        spr._phys.shape = shape;

        //add control body and constraints
        if(body.m !== Infinity) {
            var cbody = new cp.Body(Infinity, Infinity), //control body
                cpivot = this.space.addConstraint(new cp.PivotJoint(cbody, body, cp.vzero, cp.vzero)),
                cgear = this.space.addConstraint(new cp.GearJoint(cbody, body, 0, 1));

            cpivot.maxBias = 0; //disable join correction
            cpivot.maxForce = 10000; //emulate linear friction

            cgear.errorBias = 0; //attempt to fully correct the joint each step
            cgear.maxBias = 1.2; //but limit the angular correction
            cgear.maxForce = 50000; //emulate angular friction

            if(!spr._phys.control)
                spr._phys.control = {};

            spr._phys.control.body = cbody;
            spr._phys.control.pivot = cpivot;
            spr._phys.control.gear = cgear;
        }
    },
    remove: function(spr) {
        if(!spr || !spr._phys || !spr._phys.body || !spr._phys.shape)
            return;

        if(spr._phys.body.space)
            this.space.removeBody(spr._phys.body);

        if(spr._phys.shape.space)
            this.space.removeShape(spr._phys.shape);

        spr._phys.shape.sprite = null;

        //remove references
        spr._phys.body = null;
        spr._phys.shape = null;
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

            if(spr._showHit) {
                spr.showPhysics();
            }
        });
    },
    onCollisionBegin: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        spr1.onCollision(spr2);
        spr2.onCollision(spr1);

        //maintain the colliding state
        return true;
    }
});

gf.PhysicsSystem.COLLISION_TYPE = {
    SPRITE: 0,
    TILE: 1
};