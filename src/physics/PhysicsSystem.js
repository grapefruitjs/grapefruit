var COLLISION_TYPE = {
    sprITY: 0,
    TILE: 1
};

gf.PhysicsSystem = function(game, options) {
    options = options || {};
    this.game = game;

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

    //sprity - sprity collisions
    this.space.addCollisionHandler(
        COLLISION_TYPE.sprITY,
        COLLISION_TYPE.sprITY,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );

    //sprity - tile collisions
    this.space.addCollisionHandler(
        COLLISION_TYPE.sprITY,
        COLLISION_TYPE.TILE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );
};

gf.PhysicsSystem.prototype._createBody = function(spr) {
    var b;

    if(spr.mass === Infinity) {
        b = this.space.staticBody;
    } else {
        b = this.space.addBody(new cp.Body(
            spr.mass,
            Infinity //cp.momsprForBox(spr.mass, spr.width, spr.height)
        ));
    }

    return b;
};

gf.PhysicsSystem.prototype._createShape = function(spr, body) {
    var shape = this.space.addShape(
        new cp.BoxShape(
            body,
            spr.width,
            spr.height
        )
    );

    shape.setElasticity(0);
    shape.setFriction(spr.friction || 0.1);
    shape.sprite = spr;
    shape.setCollisionType(this.getCollisionType(spr));

    return shape;
};

gf.PhysicsSystem.prototype.getCollisionType = function(spr) {
    if(spr instanceof gf.Tile) {
        return COLLISION_TYPE.TILE;
    } else {
        return COLLISION_TYPE.sprITY;
    }
};

gf.PhysicsSystem.prototype.add = function(spr) {
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
};

gf.PhysicsSystem.prototype.remove = function(spr) {
    if(!spr || !spr._phys || !spr._phys.body || !spr._phys.shape)
        return;

    this.space.remove(spr._phys.body);
    this.space.remove(spr._phys.shape);

    spr._phys.shape.sprite = null;

    //remove references
    spr._phys.body = null;
    spr._phys.shape = null;
};

gf.PhysicsSystem.prototype.setMass = function(spr, mass) {
    if(spr && spr._phys && spr._phys.body)
        spr._phys.body.setMass(mass);
};

gf.PhysicsSystem.prototype.setVelocity = function(spr, vel) {
    //update control body velocity (and pivot contraint makes regular follow)
    if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
        spr._phys.control.body.setVel(vel);

    //if no control body then update real body
    else if(spr && spr._phys && spr._phys.body)
        spr._phys.body.setVel(vel);
};

gf.PhysicsSystem.prototype.setPosition = function(spr, pos) {
    //update body position
    if(spr && spr._phys && spr._phys.body)
        spr._phys.body.setPos(pos);

    //update control body position
    if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
        spr._phys.control.body.setPos(pos);
};

gf.PhysicsSystem.prototype.setRotation = function(spr, rads) {
    //update control body rotation (and gear contraint makes regular follow)
    if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
        spr._phys.control.body.setAngle(rads);

    //if no control body then update real body
    else if(spr && spr._phys && spr._phys.body)
        spr._phys.body.setAngle(rads);

};

gf.PhysicsSystem.prototype.update = function(dt) {
    //execute the physics step
    this.space.step(dt);

    //go through each changed shape
    this.space.activeShapes.each(function(shape) {
        shape.sprite.setPosition(shape.body.p.x, shape.body.p.y, true);
        shape.sprite.setRotation(shape.body.a, true);
    });
};

gf.PhysicsSystem.prototype.onCollisionBegin = function(arbiter) {//, space) {
    var shapes = arbiter.getShapes(),
        spr1 = shapes[0].sprite,
        spr2 = shapes[1].sprite;

    spr1.onCollision(spr2);
    spr2.onCollision(spr1);

    //maintain the colliding state
    return true;
};