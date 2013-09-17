var utils = require('../utils/utils'),  
    Sprite = require('../display/Sprite'),

var ObjectFactory = module.exports = function(state) {
    this.state = state;
};

utils.inherits(ObjectFactory, Object, {
    obj: function(obj) {
        return this.state.world.add(obj);
    },
    /**
     * Creates a new sprite and adds it to the game world
     *
     * @method sprite
     * @param texture {String|Texture} The texture for the sprite, or the key for one in the cache
     * @param [frame] {String|Number} A specific frame of a sprite sheet to use, either the index or string key
     *      depending on the type of the sheet when loaded
     */
    sprite: function(tx, frame) {
        var spr,
            game = this.state.game;

        if(typeof tx === 'string') {
            if(frame !== undefined)
                tx = game.cache.getTextures(tx)[frame];
            else
                tx = game.cache.getTexture(tx);
        }

        spr = new Sprite(tx);

        return this.state.world.add(spr);
    },
    /**
     * Creates a new AudioPlayer to play the sound passed in
     *
     * @method sprite
     * @param key {String} The unique cache key for the preloaded audio
     * @param [settings] {Object} All the settings for the audio player (see AudioManager.add for all settings)
     */
    audio: function(key, settings) {
        return this.state.game.audio.add(key, settings);
    }
});
