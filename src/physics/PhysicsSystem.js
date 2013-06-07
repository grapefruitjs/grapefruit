var COLLISION_TYPE = {
    ENTITY: 0,
    TILE: 1
};

gf.PhysicsSystem = function(game, options) {
    this.game = game;

    this.space = new cp.Space();
    this.space.gravity = gf.utils.ensureVector(options.gravity);

    //Time a body must remain idle to fall asleep
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#a928d74741904aae266a9efff5b5f68f7
    this.space.sleepTimeThreshold = options.sleepTimeThreshold || 0.2;

    //Amount of encouraged penetration between colliding shapes.
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#af1bec644a24e12bfc642a942a88520f7
    this.space.collisionSlop = options.collisionSlop || 0.1;

    //These two collision scenarios are separate because we don't
    //want tiles to collide with tiles all the time

    //entity - entity collisions
    this.space.addCollisionHandler(
        COLLISION_TYPE.ENTITY,
        COLLISION_TYPE.ENTITY,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );

    //entity - tile collisions
    this.space.addCollisionHandler(
        COLLISION_TYPE.ENTITY,
        COLLISION_TYPE.TILE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );

    //the entity/body pairs added to the physics world
    this.entities = [];
};

gf.PhysicsSystem.prototype._createBody = function(ent) {
    var b;

    if(ent.mass === Infinity) {
        b = this.space.staticBody;
    } else {
        b = this.space.addBody(new cp.Body(
            ent.mass,
            Infinity //cp.momentForBox(ent.mass, ent.width, ent.height)
        ));
    }

    return b;
};

gf.PhysicsSystem.prototype._createShape = function(ent, body) {
    var shape = this.space.addShape(
        new cp.BoxShape(
            body,
            ent.width,
            ent.height
        )
    );

    shape.setElasticity(0);
    shape.setFriction(ent.friction || 0.1);
    shape.gfEntity = ent;
    shape.setCollisionType(this.getCollisionType(ent));

    return shape;
};

gf.PhysicsSystem.prototype.getCollisionType = function(ent) {
    if(ent instanceof gf.Tile) {
        return COLLISION_TYPE.TILE;
    } else {
        return COLLISION_TYPE.ENTITY;
    }
};

gf.PhysicsSystem.prototype.add = function(ent) {
    var body = this._createBody(ent),
        shape = this._createShape(ent, body);

    if(!ent._phys)
        ent._phys = {};

    ent._phys.id = (this.entities.push(ent)) - 1;
    ent._phys.body = body;
    ent._phys.shape = shape;
};

gf.PhysicsSystem.prototype.remove = function(ent) {
    if(!ent || !ent._phys || !ent._phys.body || !ent._phys.shape)
        return;

    this.space.remove(ent._phys.body);
    this.space.remove(ent._phys.shape);

    ent._phys.shape.gfEntity = null;

    //remove references
    ent._phys.id = null;
    ent._phys.body = null;
    ent._phys.shape = null;
};

gf.PhysicsSystem.prototype.setMass = function(ent, mass) {
    if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setMass(mass);
};

gf.PhysicsSystem.prototype.setVelocity = function(ent, vel) {
    if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setVel(vel);
};

gf.PhysicsSystem.prototype.setPosition = function(ent, pos) {
    if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setPos(pos);
};

gf.PhysicsSystem.prototype.setRotation = function(ent, rads) {
    if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setAngle(rads);
};

gf.PhysicsSystem.prototype.update = function() {
    //execute the physics step
    this.space.step(this.game._delta);

    //go through each changed shape
    this.space.activeShapes.each(function(shape) {
        shape.gfEntity.setPosition(shape.body.p.x, shape.body.p.y, true);
        shape.gfEntity.rotation = shape.body.a;
    });
};

gf.PhysicsSystem.prototype.onCollisionBegin = function(arbiter) {//, space) {
    var shapes = arbiter.getShapes(),
        ent1 = shapes[0].gfEntity,
        ent2 = shapes[1].gfEntity;

    ent1.onCollision(ent2);
    ent2.onCollision(ent1);

    //maintain the colliding state
    return true;
};