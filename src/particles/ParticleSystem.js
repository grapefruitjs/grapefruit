var Emitter = require('./ParticleEmitter'),
    Contianer = require('../display/Container'),
    inherit = require('../utils/inherit');

var ParticleSystem = module.exports = function() {
    Contianer.call(this);

    this.emitters = {};

    this.nextId = 0;
};

inherit(ParticleSystem, Contianer, {
    add: function(Name) {
        var emitter;

        //create an emitter if a string is passed
        if(typeof Name === 'string') {
            emitter = new Emitter(Name);
        }
        //create an emitter of the instance passed
        else if(typeof Name === 'function') {
            emitter = new Name();
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
    remove: function(emitter) {
        if(typeof emitter === 'string')
            emitter = this.emitters[emitter];

        if(emitter.parent)
            emitter.parent.removeChild(emitter);

        delete this.emitters[emitter.name];

        return this;
    },
    update: function(dt) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var emitter = this.children[i];

            if(emitter.update)
                emitter.update(dt);
        }
    }
});
