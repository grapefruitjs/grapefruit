var Sprite = require('../display/Sprite'),
    Texture = require('../display/Texture'),
    Container = require('../display/Container'),
    Vector = require('../math/Vector'),
    math = require('../math/math'),
    inherit = require('../utils/inherit'),
    C = require('../constants');

/**
 * The ParticleEmitter is the object that is placed in the world and will fire off particles based
 * on the rules and properties set on it. Generally you will want to create/use these by adding
 * them to a ParticleSystem.
 *
 * @class ParticleEmitter
 * @extends Container
 * @constructor
 * @param name {String} The string name of the particle emitter.
 */
var ParticleEmitter = function(name) {
    Container.call(this);

    /**
     * The name of the ParticleEmitter instance. This should be unique in a system, and set by the param
     * passed to the constructor.
     *
     * @property name
     * @type String
     * @readOnly
     */
    this.name = name;

    /**
     * The maximum number of particles an emitter can have active at any time.
     *
     * @property maxParticles
     * @type Number
     * @default 100
     */
    this.maxParticles = 100;

    /**
     * The width of the emitter, particles are emitted in a random integer location
     * within the width and height of the emitter.
     *
     * @property width
     * @type Number
     * @default 0
     */
    this.width = 0;

    /**
     * The height of the emitter, particles are emitted in a random integer location
     * within the width and height of the emitter.
     *
     * @property height
     * @type Number
     * @default 0
     */
    this.height = 0;

    /**
     * The default lifespan of a particle that is emitted by this ParticleEmitter, in milliseconds
     *
     * @property lifespan
     * @type Number
     * @default 2000
     */
    this.lifespan = 2000;

    /**
     * The default minSpeed of a particle that is emitted by this ParticleEmitter
     * The actual speed will be a random Vector between `minSpeed` and `maxSpeed`.
     *
     * @property minSpeed
     * @type Vector
     * @default new Vector(-100, 100)
     */
    this.minSpeed = new Vector(-100, -100);

    /**
     * The default maxSpeed of a particle that is emitted by this ParticleEmitter
     * The actual speed will be a random Vector between `minSpeed` and `maxSpeed`.
     *
     * @property maxSpeed
     * @type Vector
     * @default new Vector(100, 100)
     */
    this.maxSpeed = new Vector(100, 100);

    /**
     * The default minScale of a particle that is emitted by this ParticleEmitter
     * The actual scale will be a random number between `minScale` and `maxScale`.
     *
     * @property minScale
     * @type Number
     * @default 1
     */
    this.minScale = 1;

    /**
     * The default maxScale of a particle that is emitted by this ParticleEmitter
     * The actual scale will be a random number between `minScale` and `maxScale`.
     *
     * @property maxScale
     * @type Number
     * @default 1
     */
    this.maxScale = 1;

    /**
     * The default minRotation of a particle that is emitted by this ParticleEmitter
     * The actual rotation will be a random integer between `minRotation` and `maxRotation`.
     *
     * @property minRotation
     * @type Number
     * @default -2 * Math.PI
     */
    this.minRotation = -2 * Math.PI;

    /**
     * The default maxRotation of a particle that is emitted by this ParticleEmitter
     * The actual rotation will be a random integer between `minRotation` and `maxRotation`.
     *
     * @property maxRotation
     * @type Number
     * @default 2 * Math.PI
     */
    this.maxRotation = 2 * Math.PI;

    /**
     * The time in milliseconds between emissions of particles
     *
     * @property delay
     * @type Number
     * @default 100
     */
    this.delay = 100;

    /**
     * If true the emitter will emit particles, otherwise it will not.
     *
     * @property active
     * @type Boolean
     * @default false
     */
    this.active = false;

    /**
     * The internal pool to create and reuse particles from
     *
     * @property particles
     * @type Array<Sprite>
     * @private
     */
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
     * @param [lifespan=2000] {Number} The lifespan of a particle in ms
     * @param [delay=250] {Number} The time between each particle emission in ms
     * @param [rate=1] {Number} The number of particles to emit each emission
     * @param [total=gf.PARTICLES.MAX_EMITTER_PARTICLES] {Number} The total number of particles to emit
     * @return {ParticleEmitter} Returns itself.
     * @chainable
     */
    start: function(lifespan, delay, rate, total) {
        this.active = true;

        this.lifespan = lifespan || 2000;
        this.delay = delay || 250;
        this._rate = rate || 1;
        this._total = total || C.PARTICLES.MAX_EMITTER_PARTICLES;

        this._timer = 0;

        return this;
    },
    /**
     * Deactivates the emitter. Particles that are already emitted will continue to
     * decay and die, but no new particles will be emitted.
     *
     * @method stop
     * @return {ParticleEmitter} Returns itself.
     * @chainable
     */
    stop: function() {
        this.active = false;

        return this;
    },
    /**
     * Sets up the particles to be emitted
     *
     * @method setup
     * @param sprite {Sprite|Array<Texture>|Texture} Pass a sprite to be clones as a particle,
     *      or an array of textures to be randomly chosen from for different particles,
     *      or a single texture to use for each particle.
     * @param [collide=gf.DIRECTION.ALL] {Number} The directions the particles are allowed to collide in, use gf.DIRECTION bit flags
     * @return {ParticleEmitter} Returns itself.
     * @chainable
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

        return this;
    },
    /**
     * Gets a particle from the pool and sets it up.
     *
     * @method _get
     * @return {Sprite} The particle to use
     * @private
     */
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
    /**
     * Frees a particle back into the pool and hides it.
     *
     * @method _free
     * @param sprite {Sprite} The particle to free
     * @private
     */
    _free: function(spr) {
        spr.visible = false;
        this._pool.push(spr);

        this.removeChild(spr);
        this._emitted--;
    },
    /**
     * Emits a single particle and sets the position, scale, lifespan, and velocity
     *
     * @method emitParticle
     * @return {ParticleEmitter} Returns itself.
     * @chainable
     */
    emitParticle: function() {
        var part = this._get();

        if(!part)
            return;

        //set optionally random position
        part.setPosition(
            math.randomInt(0, this.width),
            math.randomInt(0, this.height)
        );

        //set scale
        part.scale.x = part.scale.y = math.randomReal(this.minScale, this.maxScale);

        //set lifespan
        part.lifespan = this.lifespan;

        //set velocity
        part.setVelocity(
            math.randomInt(this.minSpeed.x, this.maxSpeed.x),
            math.randomInt(this.minSpeed.y, this.maxSpeed.y)
        );

        //part.body.angularVelocity = math.randomInt(this.minRotation, this.maxRotation);

        return this;
    },
    /**
     * Called internally by the ParticleSystem each frame to update each particle's lifespan.
     *
     * @method update
     * @param dt {Number} The number of seconds that have passed since last call
     * @private
     */
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

module.exports = ParticleEmitter;
