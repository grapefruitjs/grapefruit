// Thanks to PhotonStorm (http://photonstorm.com/) for this loader!
// heavily insprite by (stolen from): https://github.com/photonstorm/phaser/blob/master/src/loader/Cache.js

var inherit = require('./inherit'),
    C = require('../constants'),
    Texture = require('../display/Texture'),
    BaseTexture = require('../display/BaseTexture'),
    BitmapText = require('../text/BitmapText'),
    Tilemap = require('../tilemap/Tilemap'),
    PIXI = require('pixi.js');

/**
 * A game only has one instance of a Cache and it is used to store all externally loaded assets such
 * as images, sounds and data files as a result of Loader calls. Cache items use string based keys for look-up.
 *
 * @class Cache
 * @extends Object
 * @constructor
 * @param game {Game} The game instance this cache belongs to
 */
var Cache = function(game) {
    /**
     * Local reference to Game.
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * Canvas key-value container.
     *
     * @property _canvases
     * @type Object
     * @private
     */
    this._canvases = {};

    /**
     * Image key-value container.
     *
     * @property _images
     * @type Object
     * @private
     */
    this._images = {};

    /**
     * Sound key-value container.
     *
     * @property _sounds
     * @type Object
     * @private
     */
    this._sounds = {};

    /**
     * Text key-value container.
     *
     * @property _text
     * @type Object
     * @private
     */
    this._text = {};

    /**
     * Tilemap key-value container.
     *
     * @property _tilemaps
     * @type Object
     * @private
     */
    this._tilemaps = {};

    this.addDefaultImage();
};

inherit(Cache, Object, {
    /**
     * Add a new canvas.
     *
     * @method addCanvas
     * @param obj {Object} The spritesheet object
     * @param obj.key {String} Asset key for this canvas.
     * @param obj.canvas {HTMLCanvasElement} Canvas DOM element.
     * @param obj.context {CanvasRenderingContext2D} Render context of this canvas.
     */
    addCanvas: function(obj) {
        this._canvases[obj.key] = obj;
    },

    /**
     * Add a new sprite sheet.
     *
     * @method addSpriteSheet
     * @param obj {Object} The spritesheet object
     * @param obj.key {String} Asset key for the sprite sheet.
     * @param obj.url {String} URL of this sprite sheet file.
     * @param obj.image {Image} The image of the sprite sheet
     * @param obj.frameWidth {number} Width of the sprite sheet.
     * @param obj.frameHeight {number} Height of the sprite sheet.
     * @param obj.frameMax {number} How many frames stored in the sprite sheet.
     */
    addSpriteSheet: function(obj) {
        var key = obj.key;

        PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
        PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
        obj.texture = PIXI.TextureCache[key];

        obj.textures = Texture.fromSpritesheet(obj);

        this._images[key] = obj;
    },

    /**
     * Add a new tilemap.
     *
     * @method addTilemap
     * @param obj {Object} The tilemap file object
     * @param obj.key  {String} Asset key for the tilemap
     * @param obj.url  {String} URL of the tilemap data file
     * @param obj.data {Object} The loaded tilemap data
     * @param obj.format {Number} The format of the tilemap data
     * @param [obj.images] {Array<Image>} Array of images used in the tilesets of this tilemap
     */
    addTilemap: function(obj) {
        //parse out an object representing the XML map
        if(obj.format === C.FILE_FORMAT.XML) {
            obj.xmlData = obj.data;
            obj.data = Tilemap.parseXMLMap(obj.data);
        }

        //create the textures for this map
        var tsets = obj.data.tilesets,
            tset = null,
            name = '',
            k, k2;

        obj.textures = {};

        for(var i = 0, il = tsets.length; i < il; ++i) {
            tset = tsets[i];

            name = tset.name;
            k = obj.key + '_' + name;

            if(tset.image) {

                PIXI.BaseTextureCache[k] = new BaseTexture(obj.images[tset.image]);
                PIXI.TextureCache[k] = new Texture(PIXI.BaseTextureCache[k]);

                obj.textures[name] = PIXI.TextureCache[k];
            } else if(tset.tiles) {
                obj.textures[name] = [];
                for(var t in tset.tiles) {
                    k2 = k + '_' + t;

                    PIXI.BaseTextureCache[k2] = new BaseTexture(obj.images[tset.tiles[t].image]);
                    PIXI.TextureCache[k2] = new Texture(PIXI.BaseTextureCache[k2]);

                    obj.textures[name][t] = PIXI.TextureCache[k2];
                }
            }
        }

        this._tilemaps[obj.key] = obj;
    },

    /**
     * Add a new texture atlas.
     *
     * @method addTextureAtlas
     * @param obj {Object} The texture atlas file object
     * @param obj.key  {String} Asset key for the texture atlas.
     * @param obj.url  {String} URL of this texture atlas file.
     * @param obj.format {Number} The format of the atlas data ATLAS_FORMAT.JSON_ARRAY, ATLAS_FORMAT.JSON_HASH, or ATLAS_FORMAT.STARLING_XML
     * @param obj.data {Object} The texture atlas data exported from TexturePacker
     * @param obj.image {Image} The texture image
     */
    addTextureAtlas: function(obj) {
        var key = obj.key;

        PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
        PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
        obj.texture = PIXI.TextureCache[key];

        if(obj.format === C.ATLAS_FORMAT.JSON_ARRAY || obj.format === C.ATLAS_FORMAT.JSON_HASH) {
            obj.textures = Texture.fromJSON(key, obj.data, obj.texture.baseTexture);
        }
        else if (obj.format ===  C.ATLAS_FORMAT.STARLING_XML) {
            obj.textures = Texture.fromXML(key, obj.data, obj.texture.baseTexture);
        }

        this._images[key] = obj;
    },

    /**
     * Add a new Bitmap Font.
     *
     * @method addBitmapFont
     * @param obj {Object} The bitmap font file object
     * @param obj.key  {String} Asset key for the font texture.
     * @param obj.url  {String} URL of this font xml file.
     * @param obj.data {Object} Extra font data.
     * @param obj.format {Number} The format of the bitmap font data
     */
    addBitmapFont: function(obj) {
        var key = obj.key;

        PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
        PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
        obj.texture = PIXI.TextureCache[key];

        obj.font = BitmapText.parseXMLFont(key, obj.data, obj.texture);

        this._images[key] = obj;
    },

    /**
     * Add a new image.
     *
     * @method addImage
     * @param obj {Object} The image file object
     * @param obj.key {String} Asset key for the image.
     * @param obj.url {String} URL of this image file.
     * @param obj.image {Image} The image object that was loaded
     */
    addImage: function(obj) {
        var key = obj.key;

        PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
        PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
        obj.texture = PIXI.TextureCache[key];

        this._images[key] = obj;
    },

    /**
     * Add a new sound.
     *
     * @method addAudio
     * @param obj {Object} The audio file object
     * @param obj.key {String} Asset key for the audio.
     * @param obj.url {String} URL of this audio file.
     * @param obj.data {ArrayBuffer|Audio} The loaded audio data
     * @param obj.webAudio {Boolean} Is this a webAudio ArrayBuffer for a sound?
     * @param obj.decoded {Boolean} Is the data decoded yet?
     */
    addAudio: function(obj) {
        var key = obj.key;

        if(!obj.webAudio) {
            obj.decoded = true;
        }

        obj.isDecoding = false;

        this._sounds[key] = obj;
    },

    updateSound: function(key, property, value) {
        if(this._sounds[key])
            this._sounds[key][property] = value;
    },

    /**
     * Add a new text data.
     *
     * @method addText
     * @param obj {Object} The text file object
     * @param obj.key {String} Asset key for the text data.
     * @param obj.url {String} URL of this text data file.
     * @param obj.data {object} Extra text data.
     */
    addText: function(obj) {
        this._text[obj.key] = obj;
    },

    /**
     * Adds a default image to be used when a key is wrong / missing.
     * Is mapped to the key __default
     */
    addDefaultImage: function () {
        var key = '__default';

        var base = new BaseTexture();
        base.width = 0;
        base.height = 0;
        base.hasLoaded = true; // avoids a hanging event listener

        PIXI.BaseTextureCache[key] = base;
        PIXI.TextureCache[key] = new Texture(base);

        Texture.__default = PIXI.TextureCache[key];

        this._images[key] = {
            texture: PIXI.TextureCache[key]
        };
    },

    /**
     * Get canvas by key.
     *
     * @method getCanvas
     * @param key {String} Asset key of the canvas you want.
     * @return {HTMLCanvasElement}
     */
    getCanvas: function(key) {
        if(this._canvases[key])
            return this._canvases[key].canvas;
    },

    /**
     * Get image data by key.
     *
     * @method getImage
     * @param key {String} Asset key of the image you want.
     * @return {Image}
     */
    getImage: function(key) {
        if(this._images[key])
            return this._images[key].image;
    },

    /**
     * Get a Texture by key.
     *
     * @method
     * @param key {String} Asset key of the RenderTexture you want.
     * @return {Texture}
     */
    getTexture: function(key) {
        if(this._images[key])
            return this._images[key].texture;
    },

    /**
     * Get a Texture by key.
     *
     * @method
     * @param key {String} Asset key of the RenderTexture you want.
     * @return {Texture}
     */
    getTextures: function(key) {
        if(this._images[key])
            return this._images[key].textures;
    },

    /**
     * Get a Bitmap Font by key.
     *
     * @method
     * @param key {String} Asset key of the Bitmap Font you want.
     * @return {Texture}
     */
    getBitmapFont: function(key) {
        if(this._images[key])
            return this._images[key].font;
    },

    /**
     * Get tilemap data by key.
     *
     * @method getTilemap
     * @param key {String} Asset key of the tilemap you want.
     * @return {object} The tilemap file data. The map data is in the `data` property, the images (for tileset) are in `images`
     */
    getTilemap: function(key) {
        return this._tilemaps[key];
    },

    /**
     * Get sound by key.
     *
     * @method getAudio
     * @param key {String} Asset key of the sound you want.
     * @return {Object}
     */
    getAudio: function(key) {
        return this._sounds[key];
    },

    /**
     * Get sound data by key.
     *
     * @method getAudioData
     * @param key {String} Asset key of the sound you want.
     * @return {ArrayBuffer|Audio}
     */
    getAudioData: function(key) {
        if(this._sounds[key])
            return this._sounds[key].data;
    },

    /**
     * Get text data by key.
     *
     * @method getText
     * @param key {String} Asset key of the text data you want.
     * @return {object} The text data you want.
     */
    getText: function(key) {
        if(this._text[key])
            return this._text[key].data;
    },

    /**
     * Remove a canvas by key.
     *
     * @method removeCanvas
     * @param key {String} key to remove
     */
    removeCanvas: function(key) {
        delete this._canvases[key];
    },

    /**
     * Remove an image by key.
     *
     * @method removeImage
     * @param key {String} key to remove
     */
    removeImage: function(key) {
        delete this._images[key];
    },

    /**
     * Remove a sound by key.
     *
     * @method removeSound
     * @param key {String} key to remove
     */
    removeSound: function(key) {
        delete this._sounds[key];
    },

    /**
     * Remove a text by key.
     *
     * @method removeText
     * @param key {String} key to remove
     */
    removeText: function(key) {
        delete this._text[key];
    },

    /**
     * Destroys this object, removing references so the GC can cleanup
     *
     * @method destroy
     */
    destroy: function() {
        //lose references to let GC cleanup
        this.game = null;
        this._canvases = null;
        this._images = null;
        this._sounds = null;
        this._text = null;
        this._tilemaps = null;
    }
});

module.exports = Cache;
