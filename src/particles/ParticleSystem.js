var Emitter = require('./ParticleEmitter'),
    Container = require('../display/Container'),
    inherit = require('../utils/inherit');

/**
 * The ParticleSystem controls the system of particle emitters and their particles. It contains all the emitters
 * and updates them each frame. An instance of this is created for you in a world instance, which is a property
 * of a game state. The general usage for this class is:
 *
 * @class ParticleSystem
 * @extends Container
 * @constructor
 */
var ParticleSystem = function(state) {
    Container.call(this);

    this.state = state;

    /**
     * The emitters that are contained in this system, keyed by name
     *
     * @property emitter
     * @type Object
     * @readOnly
     */
    this.emitters = {};

    /**
     * The next ID to use for an emitter where no name was passed
     *
     * @property nextId
     * @type Number
     * @private
     */
    this.nextId = 0;
};

inherit(ParticleSystem, Container, {
    /**
     * Adds a particle emitter to the system, creating one if necessary.
     *
     * There are 3 ways to use this function to add an emitter to the system. The simplest case
     * is to pass a string for the name, and let the manager create a normal gf.ParticleEmitter for you
     * with the name you provided. The second usage is to pass a class that is a decendant of gf.ParticleEmitter.
     *
     * For example:
     *
     * ```
     * function MyEmitter(name) {
     *     gf.ParticleEmitter.call(name);
     * }
     * gf.inherit(MyEmitter, gf.ParticleEmitter);
     *
     * game.world.particles.add(MyEmitter); //adds a new instance of your emitter
     * ```
     *
     * The final usage is to pass an Emitter that is already created. In this case the system will
     * add the emitter to the list based on `emitter.name`.
     *
     * @method add
     * @param emitter {String|Function|ParticleEmitter} The emitter name, constructor, or emitter instance to add.
     * @return {ParticleEmitter} The emitter that was added
     */
    add: function(Name) {
        var emitter;

        //create an emitter if a string is passed
        if(typeof Name === 'string') {
            emitter = new Emitter(this.state, Name);
        }
        //create an emitter of the instance passed
        else if(typeof Name === 'function') {
            emitter = new Name(this.state);
        }
        //a pre-created emitter, ensure game is set correctly
        else {
            emitter = Name;
        }

        if(!emitter.name)
            emitter.name = 'emitter_' + (this.nextId++);

        this.emitters[emitter.name] = emitter;
        this.addChild(emitter);

        return emitter;
    },
    /**
     * Removes an emitter from the system
     *
     * @method remove
     * @param emitter {String|ParticleEmitter} The name of the emitter to remove, or the emitter instance itself.
     * @return {ParticleSystem} Returns itself.
     * @chainable
     */
    remove: function(emitter) {
        if(typeof emitter === 'string')
            emitter = this.emitters[emitter];

        if(emitter.parent)
            emitter.parent.removeChild(emitter);

        delete this.emitters[emitter.name];

        return this;
    },
    /**
     * Called internally by the World each frame to update each Particle Emitter
     *
     * @method update
     * @param dt {Number} The number of seconds that have passed since last call
     * @private
     */
    updateTransform: function() {
        Container.prototype.updateTransform.apply(this, arguments);

        //get delta
        var dt = this.state.game.timings.lastDelta;

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var emitter = this.children[i];

            if(emitter.update)
                emitter.update(dt);
        }
    }
});

module.exports = ParticleSystem;
