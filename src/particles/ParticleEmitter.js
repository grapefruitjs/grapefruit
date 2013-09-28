var Sprite = require('../display/Sprite'),
    Texture = require('../display/Texture'),
    Container = require('../display/Container'),
    Vector = require('../math/Vector'),
    math = require('../math/math'),
    inherit = require('../utils/inherit'),
    C = require('../constants');

var ParticleEmitter = module.exports = function(name) {
    Container.call(this);

    this.maxParticles = C.PARTICLES.MAX_PARTICLES;

    this.name = name;

    //particles are emitted in a random integer location within these values
    this.width = 0;
    this.height = 0;

    //options set on the particle when created
    this.lifespan = Infinity;
    this.minSpeed = new Vector(-100, -100);
    this.maxSpeed = new Vector(100, 100);
    this.minScale = 1;
    this.maxScale = 1;
    this.minRotation = -2 * Math.PI;
    this.maxRotation = 2 * Math.PI;
    this.gravity = new Vector(0, 5);
    this.drag = new Vector();
    this.angularDrag = 0;
    this.bounce = new Vector();

    //the spread of the emitted particles
    this.spread = Math.PI / 32;

    //time in ms between emissions (if explode = false)
    this.delay = 100;

    //should we be actively emitting particles?
    this.active = false;

    //the pool to create particles from
    this.particles = [];

    //some internal trackers
    this._rate = 0; //the number of particles to emit each emission cycle
    this._total = 0; //total particles to emit

    this._emitted = 0; //total particles emitted
    this._timer = 0; //tracker for time to know when to emit particles

    //params for particle ctor
    this._particle = null; //the Sprite object to use as the "template" particle
    this._textures = null; //the textures to choose from when getting a particle
    this._pool = []; //the pool to release particles into when they are done
};

inherit(ParticleEmitter, Container, {
    /**
     * Starts the particle emission, must call `setup` first to setup
     * what kind of particle to emit.
     *
     * @method start
     * @param [lifespan=Infinity] {Number} The lifespan of a particle in ms
     * @param [delay=250] {Number} The time between each particle emission in ms
     * @param [rate=1] {Number} The number of particles to emit each emission
     * @param [total=gf.PARTICLES.MAX_EMITTER_PARTICLES] {Number} The total number of particles to emit
     */
    start: function(lifespan, delay, rate, total) {
        this.active = true;

        this.lifespan = lifespan || Infinity;
        this.delay = delay || 250;
        this._rate = rate || 1;
        this._total = total || C.PARTICLES.MAX_EMITTER_PARTICLES;

        this._timer = 0;
    },
    /**
     * Deactivates the emitter. Particles that are already emitted will continue to
     * decay and die, but no new particles will be emitted.
     *
     * @method stop
     */
    stop: function() {
        this.active = false;
    },
    /**
     * Sets up the particles to be emitted
     *
     * @method setup
     * @param sprite {Sprite|Array<Texture>|Texture} Pass a sprite to be clones as a particle,
     *      or an array of textures to be randomly chosen from for different particles,
     *      or a single texture to use for each particle.
     * @param [collide=gf.DIRECTION.ALL] {Number} The directions the particles are allowed to collide in, use gf.DIRECTION bit flags
     */
    setup: function(sprite, collide) {
        if(collide === undefined)
            collide = C.DIRECTION.ALL;

        //single texture
        if(sprite instanceof Texture) {
            this._particle = new Sprite(sprite);
            this._textures = [sprite];
        }
        //array of textures
        else if(Array.isArray(sprite)) {
            this._particle = new Sprite(sprite[0]);
            this._textures = sprite;
        }
        //an actual sprite
        else {
            this._particle = sprite;
            this._textures = [sprite.texture];
        }

        this._particle.body.allowCollide = collide;
    },
    _get: function() {
        if(this._emitted >= this._total || this._emitted > this.maxParticles)
            return null;

        var spr = this._pool.pop();

        if(!spr) {
            spr = this._particle.clone();
        }

        spr.setTexture(math.randomElement(this._textures));
        spr.visible = true;

        this.addChild(spr);
        this._emitted++;

        return spr;
    },
    _free: function(spr) {
        spr.visible = false;
        this._pool.push(spr);

        this.removeChild(spr);
        this._emitted--;
    },
    emitParticle: function() {
        var part = this._get();

        if(!part)
            return;

        //set optionally random position
        part.position.x = math.randomInt(0, this.width);
        part.position.y = math.randomInt(0, this.height);

        //set scale
        part.scale.x = part.scale.y = math.randomReal(this.minScale, this.maxScale);

        //set lifespan
        part.lifespan = this.lifespan;

        //sync physics body
        part.body.x = part.position.x;
        part.body.y = part.position.y;

        part.body.velocity.x = math.randomInt(this.minSpeed.x, this.maxSpeed.x);
        part.body.velocity.y = math.randomInt(this.minSpeed.y, this.maxSpeed.y);

        part.body.lastPos.copy(part.position);
        part.body.bounce.copy(this.bounce);
        part.body.gravity.copy(this.gravity);

        part.body.angularVelocity = math.randomInt(this.minRotation, this.maxRotation);

        part.body.drag.copy(this.drag);
        part.body.angularDrag = this.angularDrag;
    },
    update: function(dt) {
        var t = dt * 1000;

        //update each of the particle lifetimes
        for(var c = 0; c < this.children.length; ++c) {
            var child = this.children[c];
            child.lifespan -= t;

            if(child.lifespan <= 0)
                this._free(child);
        }

        //if no longer active, we are done here
        if(!this.active)
            return;

        //increment time we have waited
        this._timer += t;

        //if we waited more than delay, emit some particles
        if(this._timer >= this._delay) {
            this._timer -= this._delay;

            for(var i = 0; i < this._rate; ++i) {
                this.emitParticle();
            }
        }
    }
});
