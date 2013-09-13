var core = require('../core/core'),
    AudioLoader = require('./AudioLoader'),
    JsonLoader = require('./JsonLoader'),
    TextureLoader = require('./TextureLoader');

/**
 * The AssetLoader loads and parses different game assets, such as sounds, textures,
 * TMX World JSON file (exported from the <a target="_blank" href="http://mapeditor.org">Tiled Editor</a>),
 * and Spritesheet JSON files (published from <a target="_blank" href="http://www.codeandweb.com/texturepacker">Texture Packer</a>).
 *
 * @class AssetLoader
 * @extends Object
 * @uses gf.EventEmitter
 * @namespace gf
 * @constructor
 * @param assets {Array} Array of assets to load when `.load()` is called
 * @example
 *      var loader = new AssetLoader(['/my/texture.png']);
 *      loader.load();
 *      //OR
 *      var loader = new AssetLoader();
 *      loader.load(['/my/texture.png']);
 */
var AssetLoader = module.exports = function() {
    core.EventEmitter.call(this);

    /**
     * The array of asset keys
     *
     * @property assets
     * @type Array
     */
    this.keys = [];

    /**
     * The asset data
     *
     * @property assets
     * @type Array
     */
    this.assets = {};

    /**
     * Number of assets remaining to load
     *
     * @property remaining
     * @type Number
     */
    this.remaining = 0;

    /**
     * Whether the loader is actively loading the assets
     *
     * @property isLoading
     * @type Boolean
     */
    this.isLoading = false;

    /**
     * Whether the loader has finished loading
     *
     * @property isLoading
     * @type Boolean
     */
    this.hasLoaded = false;

    /**
     * The progress of the loader (0 - 100)
     *
     * @property progress
     * @type Number
     */
    this.progress = 0;

    /**
     * The cross origin value for loading images
     *
     * @property crossorigin
     * @type String
     */
    this.crossorigin = '';

    /**
     * The base URL to prepend to a url, requires the trailing slash
     *
     * @property baseUrl
     * @type String
     */
    this.baseUrl = '';

    /**
     * Fired if a loader encounters an error
     *
     * @event error
     * @param eventData {Object}
     * @param eventData.assetType {String} The type of asset
     * @param eventData.message {String} The message of the error
     */

    /**
     * Fired when an item has loaded
     *
     * @event progress
     * @param eventData {Object}
     * @param eventData.assetType {String} The type of asset
     * @param eventData.url {String} The url the asset loaded from
     * @param eventData.data {mixed} The data that was loaded
     */

    /**
     * Fired when all the assets have loaded
     *
     * @event complete
     */
};

core.inherits(AssetLoader, Object, {
    /**
     * Check whether asset exists with a specific key.
     *
     * @method hasKey
     * @param key {String} Key of the asset you want to check.
     * @return {bool} Return true if exists, otherwise return false.
     */
    hasKey: function(key) {
        return !!this.assets[key];
    },

    /**
     * Reset loader, this will remove all loaded assets.
     *
     * @method reset
     */
    reset: function() {
        this.remaining = 0;
        this.isLoading = false;
    },

    /**
     * Adds an asset to be loaded
     *
     * @method add
     * @param type {String} The type of asset ot load (image, spritesheet, textureatlas, bitmapfont, tilemap, tileset, audio, etc)
     * @param key {String} The unique key of the asset to identify it
     * @param url {String} The URL to load the resource from
     * @param [options] {Object} Extra options to apply to the asset (such as crossorigin)
     * @param [options.crossorigin=false] {Boolean} True if an image load should be treated as crossorigin
     */
    add: function(type, key, url, opts) {
        var entry = {
            type: type,
            key: key,
            url: url,
            data: null,
            error: false,
            loaded: false
        };

        if(opts !== undefined) {
            for(var p in opts) {
                entry[p] = opts[p];
            }
        }

        this.assets[key] = entry;
        this.keys.push(key);
        this.remaining++;
    },

    /**
     * Add an image to the Loader.
     *
     * @method image
     * @param key {String} Unique asset key of this image file.
     * @param url {String} URL of image file.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     */
    image: function(key, url, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('image', key, url);
    },

    /**
     * Add a text file to the Loader.
     *
     * @method text
     * @param key {String} Unique asset key of this image file.
     * @param url {String} URL of image file.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     */
    text: function(key, url, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('text', key, url);
    },

    /**
     * Add a sprite sheet image to the Loader.
     *
     * @method spritesheet
     * @param key {String} Unique asset key of this image file.
     * @param url {String} URL of image file.
     * @param frameWidth {Number} Width of each single frame.
     * @param frameHeight {Number} Height of each single frame.
     * @param frameMax {Number} How many frames in this sprite sheet.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     */
    spritesheet: function(key, url, frameWidth, frameHeight, frameMax, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('spritesheet', key, url, {
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                frameMax: frameMax
            });
    },

    /**
     * Add an audio file to the Loader.
     *
     * @method audio
     * @param key {String} Unique asset key of this image file.
     * @param url {String} URL of image file.
     * @param [autoDecode=false] {Boolean}
     *      When using Web Audio the audio files can either be decoded at load time or run-time.
     *      They can't be played until they are decoded, but this let's you control when that happens. Decoding is a
     *      non-blocking async process.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it
     */
    audio: function(key, url, autoDecode, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('audio', key, url, {
                buffer: null,
                autoDecode: autoDecode
            });
    },

    /**
    * Add a tilemap to the Loader.
    *
    * @method tilemap
    * @param key {String} Unique asset key of the tilemap data.
    * @param tilesetURL {String} The url of the tile set image file.
    * @param [mapDataUrl] {String} The url of the map data file (csv/json/xml)
    * @param [mapData] {String|Object} The data for the map, (to use instead of loading from a URL)
    * @param [format='json'] {String} The format of the map data.
    * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
    */
    tilemap: function(key, tilesetURL, mapDataUrl, mapData, format) {
        if(overwrite || !this.hasKey(key)) {

            if(!format) format = 'json';

            if(mapData && typeof mapData === 'string') {
                switch(format) {
                    case 'xml':
                        mapData = core.utils.parseXML(mapData);
                        break;

                    case 'csv':
                        break;

                    case 'json':
                        mapData = JSON.parse(mapData);
                        break;
                }
            }

            this.add('tilemap', key, tilesetURL, {
                mapDataUrl: mapDataUrl,
                mapData: mapData,
                format: format
            });
        }
    },

    /**
     * Starts the loading festivities. If called without any arguments it will load
     * the assets passed in at the ctor. If an array of assets are passed it will
     * load those instead.
     *
     * @method load
     * @param items {Array<String>|Array<Object>} Array of resources to load instead of the object's resources
     */
    load: function(items) {
        var assets = items || this.assets;

        for(var i = 0, il = assets.length; i < il; ++i) {
            var name = typeof assets[i] === 'string' ? assets[i] : assets[i].name,
                url = typeof assets[i] === 'string' ? assets[i] : (assets[i].src || assets[i].url || assets[i].uri),
                ext = assets[i].type || (url instanceof Array ? 'audio' : null) || url.split('.').pop(), //assume arrays of urls are for audio
                Loader = this.loaders[ext];

            if(!Loader)
                throw 'Unknown type "' + ext + '", unable to preload!';

            this.remaining++;
            var loader = new Loader(name, url);

            loader.on('load', this.onAssetLoaded.bind(this));
            loader.on('error', this.onAssetError.bind(this));
            loader.load();
        }
    },
    /**
     * Called whenever an asset is loaded, to keep track of when to emit complete and progress.
     *
     * @method onAssetLoaded
     * @param event {Object} The event object
     * @private
     */
    onAssetLoaded: function(e) {
        this.remaining--;

        this.emit('progress', {
            assetType: e.assetType,
            url: e.url,
            data: e.data
        });

        if(this.remaining === 0) {
            this.emit('complete');
        }
    },
    /**
     * Called whenever an asset loader encounters an error
     *
     * @method onAssetError
     * @param event {Object} The event object
     * @private
     */
    onAssetError: function(e) {
        this.remaining--;

        this.emit('error', {
            assetType: e.assetType,
            message: e.message
        });

        if(this.remaining === 0) {
            this.emit('complete');
        }
    }
});
