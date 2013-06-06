gf.PhysicsSystem = function(game, gravity, profile) {
    this.game = game;

    this.world = new p2.World({
        gravity: p2.V.create(0, gravity !== undefined ? gravity : -9.87),
        doProfiling: profile
    });

    //set some solver variables
    this.world.solver.setSpookParams(1e50, 6);
    this.world.solver.iterations = 6;
    this.world.solver.tolerance = 0.001;

    //the entity/body pairs added to the physics world
    this.entities = [];

    //the tile/body pairs to add to the physics world
    this.tiles = [];
};

gf.PhysicsSystem.prototype.add = function(ent) {
    var shape = new p2.Plane(),
        body = new p2.Body({
            shape: shape,
            mass: ent.mass,
            angle: ent.rotation,
            position: ent.position
        });

    this.world.addBody(body);

    if(ent instanceof gf.Entity) {
        body.id = (this.entities.push(ent)) - 1;
    } else {
        body.id = (this.tiles.push(ent)) - 1;
    }

    //they need to reference eachother
    ent.body = body;
    body.ent = ent;
};

gf.PhysicsSystem.prototype.remove = function(ent) {
    //get the id if ent and ent.body exist
    var id = ent && ent.body && ent.body.id;

    //if we found one, remove it
    if(typeof id === 'number' && id >= 0) {
        if(ent instanceof gf.Entity) {
            this.entities.splice(id, 1);
        } else {
            this.tiles.splice(id, 1);
        }

        this.world.removeBody(ent.body);

        //remove references
        ent.body.ent = null;
        ent.body = null;
    }
};

gf.PhysicsSystem.prototype.removeAll = function(type) {
    if(type === 'entities' || type === 'tiles') {
        for(var i = 0, il = this[type].length; i < il; ++i) {
            var ent = this[type][i];

            //remove body
            this.world.removeBody(ent.body);

            //clear references
            ent.body.ent = null;
            ent.body = null;
        }

        //reset array
        this[type].length = 0;
    } else {
        this.removeAll('entities');
        this.removeAll('tiles');
    }
};

gf.PhysicsSystem.prototype.set = function(ent, prop, val) {
    var body = ent && ent.body;

    if(body && prop) {
        //if the value is a vector
        if(val instanceof gf.Vector || val instanceof gf.Point) {
            //try to set an already created vector
            if(body[prop]) {
                p2.V.set(body[prop], val.x, val.y);
            }
            //if that prop isn't there yet, create a new vector
            else {
                body[prop] = p2.V.create(val.x, val.y);
            }
        }
        //just set the property normally
        else {
            body[prop] = val;
        }
    }

    return this;
};

gf.PhysicsSystem.prototype.setMass = function(ent, mass) {
    return this.set(ent, 'mass', mass);
};

gf.PhysicsSystem.prototype.setVelocity = function(ent, vel) {
    return this.set(ent, 'velocity', vel);
};

gf.PhysicsSystem.prototype.setPosition = function(ent, pos) {
    return this.set(ent, 'position', pos);
};

gf.PhysicsSystem.prototype.setRotation = function(ent, rads) {
    return this.set(ent, 'angle', rads);
};

gf.PhysicsSystem.prototype.defineGrid = function(numTiles, tileSize) {
    this.world.broadphase = new p2.GridBroadphase(
        0,          //xmin
        numTiles.x, //xmax
        0,          //ymin
        numTiles.y, //ymax
        numTiles.x * tileSize.x,    //num x
        numTiles.y * tileSize.y     //num y
    );
};

gf.PhysicsSystem.prototype.update = function() {
    //execute the physics step
    this.world.step(this.game._delta);

    //update each entity's position and rotation
    for(var i = 0, il = this.entities.length; i < il; ++i) {
        var ent = this.entities[i];

        ent.setPosition(
            p2.V.getX(ent.body.position),
            p2.V.getY(ent.body.position),
            true //skip the physics of setting position (engine already did that)
        );
        ent.rotation = ent.body.angle;
    }

    //notify of any collisions
    for(var c = 0, cl = this.world.contacts.length; c < cl; ++c) {
        var con = this.world.contacts[c],
            ent1 = con.bi.ent,
            ent2 = con.bj.ent;

        ent1.onCollision(ent2);
        ent2.onCollision(ent1);
    }
};