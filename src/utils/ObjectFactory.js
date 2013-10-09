var inherit = require('./inherit'),
    GuiItem = require('../gui/GuiItem'),
    Sprite = require('../display/Sprite'),
    Tilemap = require('../tilemap/Tilemap'),
    Rectangle = require('../geom/Rectangle'),
    BitmapText = require('../text/BitmapText'),
    C = require('../constants');

var ObjectFactory = module.exports = function(state, parent) {
    this.state = state;
    this.game = state.game;
    this.parent = parent;
};

inherit(ObjectFactory, Object, {
    /**
     * Adds a generic object to the world or camera
     *
     * @method obj
     * @param object {mixed} Any game object you want to add to the parent
     */
    obj: function(obj) {
        return this.parent.addChild(obj);
    },
    /**
     * Creates a new sprite and adds it to the game world
     *
     * @method sprite
     * @param texture {String|Texture} The texture for the sprite, or the key for one in the cache
     * @param [frame=null] {String|Number} A specific frame of a sprite sheet to use, either the index or string key
     *      depending on the type of the sheet when loaded.
     * @param [physics=true] {Boolean} Should this sprite be added to the physics simulation?
     */
    sprite: function(tx, frame, physics) {
        var spr,
            game = this.game;

        if(typeof tx === 'string') {
            if(frame || frame === 0)
                tx = game.cache.getTextures(tx)[frame];
            else
                tx = game.cache.getTexture(tx);
        }

        if(!tx) {
            tx = game.cache.getTexture('__default');
        }

        spr = new Sprite(tx);

        //if undefined, then default to true
        if(physics || physics === undefined) {
            this.state.physics.addSprite(spr);
        }

        return this.parent.addChild(spr);
    },
    /**
     * Creates a new AudioPlayer to play the sound passed in
     *
     * @method audio
     * @param key {String} The unique cache key for the preloaded audio
     * @param [settings] {Object} All the settings for the audio player (see AudioManager.add for all settings)
     */
    audio: function(key, settings) {
        //TODO: Change to use state audio when issue #66 is done!
        return this.game.audio.addChild(key, settings);
    },
    /**
     * Creates a new tilemap to add to the world
     *
     * @method tilemap
     * @param key {String} The unique cache key for the preloaded tilemap data
     * @param [constrain=true] {Boolean} Should the camera be constrained to this tilemap's size?
     */
    tilemap: function(key, constrain) {
        var obj = this.game.cache.getTilemap(key) || {},
            fmt = obj.format,
            data = obj.data,
            txs = obj.textures,
            tilemap;

        if(fmt === C.FILE_FORMAT.JSON) {
            tilemap = new Tilemap(this.state, data, txs);
        }
        else if(fmt === C.FILE_FORMAT.XML) {
            tilemap = Tilemap.fromXML(this.state, data, txs);
        }
        else if(fmt === C.FILE_FORMAT.CSV) {
            tilemap = Tilemap.fromCSV(this.state, data, txs);
        }

        if(constrain) {
            this.state.camera.constrain(new Rectangle(0, 0, tilemap.realSize.x, tilemap.realSize.y));
        }

        //force render of tilemap
        tilemap.render(
            -this.state.world.position.x,
            -this.state.world.position.x,
            this.game.width,
            this.game.height
        );

        return this.parent.addChild(tilemap);
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

        return this.parent.addChild(new GuiItem(tx, interact));
    },
    /**
     * Creates a new instance of BitmapText
     *
     * @method bitmaptext
     * @param text {String} The text for the BitmapText to display
     * @param font {String} The key for the bitmap font loaded into the cache
     * @param interactive {Boolean} Can the item be interacted with by mouse (clicked, dragged, etc)
     */
    bitmaptext: function(text, font, style) {
        if(typeof font === 'string')
            font = this.game.cache.getBitmapFont(font);

        return this.parent.addChild(new BitmapText(text, font, style));
    }
});
