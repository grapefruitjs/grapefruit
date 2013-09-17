var utils = require('../utils/utils'),
    GuiItem = require('../gui/GuiItem'),
    Sprite = require('../display/Sprite'),
    Tilemap = require('../tilemap/Tilemap'),
    Rectangle = require('../math/Rectangle'),
    C = require('../constants');

var ObjectFactory = module.exports = function(state) {
    this.game = state.game;
    this.world = state.world;
    this.camera = state.camera;
};

utils.inherits(ObjectFactory, Object, {
    /**
     * Adds a generic object to the world or camera
     *
     * @method obj
     * @param object {mixed} Any game object you want to add to the world or camera
     * @param [camera=false] {Boolean} If false, the object is added to the world, if true it is added to the camera
     */
    obj: function(obj, camera) {
        return camera ? this.camera.add(obj) : this.state.world.add(obj);
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
            game = this.game;

        if(typeof tx === 'string') {
            if(frame !== undefined)
                tx = game.cache.getTextures(tx)[frame];
            else
                tx = game.cache.getTexture(tx);
        }

        spr = new Sprite(tx);

        return this.world.add(spr);
    },
    /**
     * Creates a new AudioPlayer to play the sound passed in
     *
     * @method audio
     * @param key {String} The unique cache key for the preloaded audio
     * @param [settings] {Object} All the settings for the audio player (see AudioManager.add for all settings)
     */
    audio: function(key, settings) {
        return this.game.audio.add(key, settings);
    },
    /**
     * Creates a new tilemap to add to the world
     *
     * @method tilemap
     * @param key {String} The unique cache key for the preloaded tilemap data
     * @param [constrain=false] {Boolean} Should the camera be constrained to this tilemap's size?
     */
    tilemap: function(key, constrain) {
        var obj = this.game.cache.getTilemap(key) || {},
            fmt = obj.format,
            data = obj.data,
            tilemap;

        if(fmt === C.FILE_FORMAT.JSON) {
            tilemap = new Tilemap(this.game, data);
        }
        else if(fmt === C.FILE_FORMAT.XML) {
            tilemap = Tilemap.fromXML(this.game, data);
        }
        else if(fmt === C.FILE_FORMAT.CSV) {
            tilemap = Tilemap.fromCSV(this.game, data);
        }

        if(constrain) {
            this.camera.constrain(new Rectangle(0, 0, tilemap.realSize.x, tilemap.realSize.y));
        }

        return this.world.add(tilemap);
    },
    /**
     * Creates a new gui item and adds it to the Camera's GUI
     *
     * @method gui
     * @param texture {String|Texture} The texture for the item, or the key for one in the cache
     * @param interactive {Boolean} Can the item be interacted with by mouse (clicked, dragged, etc)
     */
    gui: function(tx, interact) {
        if(typeof tx === 'string')
            tx = this.game.cache.getTexture(tx);

        return this.camera.gui.add(new GuiItem(tx, interact));
    }
});
