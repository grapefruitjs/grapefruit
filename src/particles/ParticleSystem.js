var Emitter = requie('./ParticleEmitter'),
    Contianer = require('../display/Contianer'),
    Vector = require('../math/Vector'),
    inherit = require('../utils/inherit'),
    C = require('../constants');

var ParticleSystem = module.exports = function() {
    Contianer.call(this);

    this.emitters = {};

    this.nextId = 0;
};

inherit(ParticleSystem, Contianer, {
    add: function(Name, enable) {
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
            emitter.name = 'emitter_' + (nextId++);

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
