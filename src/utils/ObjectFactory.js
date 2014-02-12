var inherit = require('./inherit'),
    Sprite = require('../display/Sprite'),
    Tilemap = require('../tilemap/Tilemap'),
    Rectangle = require('../geom/Rectangle'),
    BitmapText = require('../text/BitmapText');

/**
 * The object factory makes it simple to create and add objects to a parent. One is added
 * to a State's world and camera by default, but they can be used for any parent but they
 * can only belong to a single state.
 *
 * @class ObjectFactory
 * @extends Object
 * @constructor
 * @param state {State} The game state this factory belongs to
 * @param parent {Container} The container to act as the parent for created objects
 */
var ObjectFactory = function(state, parent) {
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
     * @return {mixed} Returns the added object
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
     * @return {Sprite} The sprite added
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
            spr.enablePhysics(this.state.physics);
            //this.state.physics.addSprite(spr);
        }

        return this.parent.addChild(spr);
    },
    /**
     * Creates a new AudioPlayer to play the sound passed in
     *
     * @method audio
     * @param key {String} The unique cache key for the preloaded audio
     * @param [settings] {Object} All the settings for the audio player (see AudioManager.add for all settings)
     * @return {AudioPlayer} The player added
     */
    audio: function(key, settings) {
        return this.state.audio.add(key, settings);
    },
    /**
     * Creates a new tilemap to add to the world
     *
     * @method tilemap
     * @param key {String} The unique cache key for the preloaded tilemap data
     * @param [constrain=true] {Boolean} Should the camera be constrained to this tilemap's size?
     * @return {Tilemap} The tilemap added
     */
    tilemap: function(key, constrain) {
        var obj = this.game.cache.getTilemap(key) || {},
            tilemap = new Tilemap(this.state, obj.data, obj.textures);

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

        tilemap._cachekey = key;

        return this.parent.addChild(tilemap);
    },
    /**
     * Creates a new instance of BitmapText
     *
     * @method bitmaptext
     * @param text {String} The text for the BitmapText to display
     * @param font {String} The key for the bitmap font loaded into the cache
     * @param interactive {Boolean} Can the item be interacted with by mouse (clicked, dragged, etc)
     * @return {BitmapText} The bitmap text object added
     */
    bitmaptext: function(text, font, style) {
        if(typeof font === 'string')
            font = this.game.cache.getBitmapFont(font);

        return this.parent.addChild(new BitmapText(text, font, style));
    }
});

module.exports = ObjectFactory;
