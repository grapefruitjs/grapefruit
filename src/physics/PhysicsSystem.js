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