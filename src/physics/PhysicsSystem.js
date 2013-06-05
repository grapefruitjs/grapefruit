gf.PhysicsSystem = function(game, gravity, profile) {
    this.world = new p2.World({
        gravity: p2.V.create(0, gravity !== undefined ? gravity : -9.87),
        doProfiling: profile
    });

    //set some solver variables
    this.world.solver.setSpookParams(1e50, 6);
    this.world.solver.iterations = 6;
    this.world.solver.tolerance = 0.001;

    //copy all the world prototype functions to this object, so that
    //you can call them on this system and they will apply to our world
    var self = this;
    Object.keys(p2.World.prototype).forEach(function(key, i) {
        if(typeof p2.World.prototype[key] === 'function' && !self[key]) {
            self[key] = function() {
                self.world[key].apply(self.world, arguments);
            };
        }
    });

    this.children = [];
};

gf.PhysicsSystem.prototype.addEntity = function(ent) {
    var shape = new p2.Plane(),
        body = new p2.Body({
            shape: shape,
            mass: ent.mass,
            angle: ent.rotation,
            position: ent.position
        });

    this.addBody(body);
    this.children.push([ent, body]);
};

gf.PhysicsSystem.prototype.removeEntity = function(ent) {
    var id = this.findIdByEntity(ent);

    //if we found one, remove it
    if(id >= 0)
        this.children.splice(id, 1);
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

gf.PhysicsSystem.prototype.findIdByEntity = function(ent) {
    return this.findId(body, 0);
};

gf.PhysicsSystem.prototype.findIdByBody = function(body) {
    return this.findId(body, 1);
};

gf.PhysicsSystem.prototype.findId = function(q, num) {
    var idx = -1;

    for(var i = 0, il = this.children.length; i < il; ++i) {
        if(this.children[i][num] == q) {
            idx = i;
            break;
        }
    }

    return idx;
}

gf.PhysicsSystem.prototype.update = function() {
    this.world.step(this.game._delta);

    //update each entity's position and rotation
    for(var i = 0, il = this.children.length; i < il; ++i) {
        var ent = this.children[i];

        ent[0].setPosition(
            p2.V.getX(ent[1].position),
            p2.V.getY(ent[1].position)
        );
        ent[0].rotation = ent[1].angle;
    }

    //notify of any collisions, this seems really expensive (the id searches + multiple loops)!
    for(var c = 0, cl = this.world.contacts.length; c < cl; ++c) {
        var c = this.world.contacts[c],
            biId = this.findIdByBody(c.bi),
            bjId = this.findIdByBody(c.bj),
            ent1 = this.children[biId][0],
            ent2 = this.children[bjId][0];

        ent1.onCollision(ent2);
        ent2.onCollision(ent1);
    }
};