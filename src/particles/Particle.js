var Sprite = require('../display/Sprite'),
    inherit = require('../inherit');

var Particle = module.exports = function(anims, speed, start) {
    Sprite.call(this, anims, speed, start);

    /**
     * The lifetime of the sprite. Once it reaches 0 (after being set)
     * the sprite's visible property is set to false, so that it will
     * no longer be rendered. NOT YET IMPLEMENTED
     *
     * @property lifetime
     * @type Number
     * @default Infinity
     * @private
     */
    this.lifespan = Infinity;
};

inherit(Particle, Sprite);
