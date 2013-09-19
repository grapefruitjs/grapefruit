// Based heavily off of PhotonStorm's Phaser Arcade Physics, ChipmunkJS, and an IBM Article
// Phaser: https://github.com/photonstorm/phaser 
// ChipmunkJS: https://github.com/josephg/Chipmunk-js
// IBM Article: http://www.ibm.com/developerworks/library/wa-build2dphysicsengine/

var Rectangle = require('../math/Rectangle'),
    Vector = require('../math/Vector'),
    math = require('../math/math'),
    utils = require('../utils/utils'),
    C = require('../constants');

var Physics = module.exports = function(game) {
    this.game = game;

    this.bodies = [];
};

utils.inherits(Physics, Object, {
    update: function(dt) {
        //clear quad tree
        this.tree.clear();

        //update bodies
        var bods = this.bodies;

        for(var i = 0, il = bods.length, body; i < il; ++i) {
            var body = bods[i];

            body[i].computeVelocity(dt);
            body[i].update(dt);

            if(body.canCollide && body.sprite.visible) {
                this.tree.insert(body);
            }
        }
    }
});
