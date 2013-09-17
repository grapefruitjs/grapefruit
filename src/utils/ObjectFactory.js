var utils = require('../utils/utils'),  
    Sprite = require('../display/Sprite'),

var ObjectFactory = module.exports = function(state) {
    this.state = state;
    this.world = state.world;
    this.camera = state.camera;
};

utils.inherits(ObjectFactory, Object, {
    obj: function(obj) {
        return this.world.add(obj);
    },
    /**
     * Creates a new sprite and adds it to the game world
     *
     * @method sprite
     * @param texture {String|Texture} The texture for the sprite, or the key for one in the cache
     * @param [frame] {String|Number} A specific frame of a sprite sheet to use
     */
    sprite: function(texture, frame) {
        var spr;

        if(frame !== undefined) {
            spr = new Sprite(this.state.game)
        }

        return this.world.addChild(spr);
    }
});
