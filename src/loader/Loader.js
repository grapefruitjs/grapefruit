// Thanks to PhotonStorm (http://photonstorm.com/) for this loader!
// heavily insprite by (stolen from): https://github.com/photonstorm/phaser/blob/master/src/loader/Loader.js

var utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    support = require('../utils/support'),
    EventEmitter = require('../utils/EventEmitter'),
    C = require('../constants');

/**
 * The Loader loads and parses different game assets, such as sounds, textures,
 * TMX World files (exported from the [Tiled Editor](http://mapeditor.org)),
 * and Sprite Atlas files (published from [Texture Packer](http://www.codeandweb.com/texturepacker)).
 *
 * @class Loader
 * @extends Object
 * @uses EventEmitter
 * @constructor
 * @param game {Game} Game instance this belongs to
 */
var Loader = function(game) {
    EventEmitter.call(this);

    /**
     * The game instance this loader belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

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
     * Number of assets total to load
     *
     * @property total
     * @type Number
     */
    this.total = 0;

    /**
     * Number of assets done to load (for progress)
     *
     * @property done
     * @type Number
     */
    this.done = 0;

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
     * @property crossOrigin
     * @type String
     */
    this.crossOrigin = '';

    /**
     * The base URL to prepend to a url, requires the trailing slash
     *
     * @property baseUrl
     * @type String
     */
    this.baseUrl = '';

    /**
     * Fired when an item has started loading
     *
     * @event start
     * @param numAssets {Number} The number of assets that are going to be loaded
     */

    /**
     * Fired if a loader encounters an error
     *
     * @event error
     * @param error {mixed} The error that occured when loading
     * @param key {String} The key for the asset that was being loaded
     */

    /**
     * Fired when an item has loaded
     *
     * @event progress
     * @param progress {Number} The integer progress value, between 0 and 100.
     */

    /**
     * Fired when all the assets have loaded
     *
     * @event complete
     */
};

inherit(Loader, Object, {
    /**
     * Check whether asset exists with a specific key.
     *
     * @method hasKey
     * @param key {String} Key of the asset you want to check.
     * @return {Boolean} Return true if exists, otherwise return false.
     */
    hasKey: function(key) {
        return !!this.assets[key];
    },

    /**
     * Reset loader, this will remove all loaded assets from the loader's stored list (but not from the cache).
     *
     * @method reset
     * @return {Loader} Returns itself.
     * @chainable
     */
    reset: function() {
        this.progress = 0;
        this.total = 0;
        this.done = 0;
        this.hasLoaded = false;
        this.isLoading = false;
        this.assets = {};
        this.keys.length = 0;

        return this;
    },

    /**
     * Adds an asset to be loaded
     *
     * @method add
     * @param type {String} The type of asset ot load (image, spritesheet, textureatlas, bitmapfont, tilemap, tileset, audio, etc)
     * @param key {String} The unique key of the asset to identify it
     * @param url {String} The URL to load the resource from
     * @param [options] {Object} Extra options to apply to the asset, different asset types may require extra options
     * @param [options.crossOrigin=false] {Boolean} True if an image load should be treated as crossOrigin
     * @return {Loader} Returns itself.
     * @chainable
     */
    add: function(type, key, url, opts) {
        var entry = {
            type: type,
            key: key,
            url: url,
            image: null,
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
        this.total++;

        return this;
    },

    /**
     * Add an image to the Loader.
     *
     * @method image
     * @param key {String} Unique asset key of this image file.
     * @param url {String} URL of image file.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     * @return {Loader} Returns itself.
     * @chainable
     */
    image: function(key, url, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('image', key, url);

        return this;
    },

    /**
     * Add a text file to the Loader.
     *
     * @method text
     * @param key {String} Unique asset key of this image file.
     * @param url {String} URL of image file.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     * @return {Loader} Returns itself.
     * @chainable
     */
    text: function(key, url, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('text', key, url);

        return this;
    },

    /**
     * Add a sprite sheet image to the Loader.
     *
     * @method spritesheet
     * @param key {String} Unique asset key of this image file.
     * @param url {String} URL of image file.
     * @param frameWidth {Number} Width of each single frame.
     * @param frameHeight {Number} Height of each single frame.
     * @param numFrames {Number} How many frames in this sprite sheet.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     * @return {Loader} Returns itself.
     * @chainable
     */
    spritesheet: function(key, url, frameWidth, frameHeight, numFrames, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('spritesheet', key, url, {
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                numFrames: numFrames
            });

        return this;
    },

    /**
     * Add an audio file to the Loader.
     *
     * @method audio
     * @param key {String} Unique asset key of this image file.
     * @param urls {Array<String>} URLs of audio files.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     * @return {Loader} Returns itself.
     * @chainable
     */
    audio: function(key, urls, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('audio', key, urls);

        return this;
    },

    /**
     * Add a tilemap to the Loader.
     *
     * @method tilemap
     * @param key {String} Unique asset key of the tilemap data.
     * @param url {String} The url of the map data file (csv/json/xml)
     * @param [data] {String|Object} The data for the map, (to use instead of loading from a URL)
     * @param [format=FILE_FORMAT.JSON] {Number} The format of the map data.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     * @return {Loader} Returns itself.
     * @chainable
     */
    tilemap: function(key, url, data, format, overwrite) {
        if(overwrite || !this.hasKey(key)) {
            if(!format) format = C.FILE_FORMAT.JSON;

            if(typeof data === 'string') {
                switch(format) {
                    case C.FILE_FORMAT.JSON:
                        data = JSON.parse(data);
                        break;

                    case C.FILE_FORMAT.XML:
                        data = C.utils.parseXML(data);
                        break;

                    case C.FILE_FORMAT.CSV:
                        break;
                }
            }

            this.add('tilemap', key, url, {
                data: data,
                format: format
            });
        }

        return this;
    },

    /**
     * Add a bitmap font to the Loader.
     *
     * @method bitmapFont
     * @param key {String} Unique asset key of the bitmap font.
     * @param textureURL {String} The url of the font image file.
     * @param [dataUrl] {String} The url of the font data file (xml/fnt)
     * @param [data] {Object} An optional XML data object (to use instead of loading from a URL)
     * @param [format=FILE_FORMAT.XML] {FILE_FORMAT} The format of the bitmap font data.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     * @return {Loader} Returns itself.
     * @chainable
     */
    bitmapFont: function(key, textureUrl, dataUrl, data, format, overwrite) {
        if(overwrite || !this.hasKey(key)) {
            if(!format) format = C.FILE_FORMAT.XML;

            if(typeof data === 'string') {
                switch(format) {
                    case C.FILE_FORMAT.XML:
                        data = utils.parseXML(data);
                        break;

                    case C.FILE_FORMAT.JSON:
                        data = JSON.parse(data);
                        break;
                }
            }

            this.add('bitmapfont', key, textureUrl, {
                dataUrl: dataUrl,
                data: data,
                format: format
            });
        }

        return this;
    },

    /**
     * Add a JSON-Array formatted texture atlas. Equivalent to running
     * `atlas(key, textureURL, dataUrl, data, gf.ATLAS_FORMAT.JSON_ARRAY);`
     *
     * @param key {string} Unique asset key of the texture atlas file.
     * @param textureUrl {string} The url of the texture atlas image file.
     * @param [dataUrl] {string} The url of the texture atlas data file (json/xml)
     * @param [data] {object} A JSON or XML data object (to use instead of loading from a URL)
     * @return {Loader} Returns itself.
     * @chainable
     */
    atlasJSONArray: function(key, textureURL, dataUrl, data) {
        return this.atlas(key, textureURL, dataUrl, data, C.ATLAS_FORMAT.JSON_ARRAY);
    },

    /**
     * Add a JSON-Hash formatted texture atlas. Equivalent to running
     * `atlas(key, textureURL, dataUrl, data, gf.ATLAS_FORMAT.JSON_HASH);`
     *
     * @param key {string} Unique asset key of the texture atlas file.
     * @param textureUrl {string} The url of the texture atlas image file.
     * @param [dataUrl] {string} The url of the texture atlas data file (json/xml)
     * @param [data] {object} A JSON or XML data object (to use instead of loading from a URL)
     * @return {Loader} Returns itself.
     * @chainable
     */
    atlasJSONHash: function(key, textureURL, dataUrl, data) {
        return this.atlas(key, textureURL, dataUrl, data, C.ATLAS_FORMAT.JSON_HASH);
    },

    /**
     * Add an XML formatted texture atlas. Equivalent to running
     * `atlas(key, textureURL, dataUrl, data, gf.ATLAS_FORMAT.XML_STARLING);`
     *
     * @param key {string} Unique asset key of the texture atlas file.
     * @param textureUrl {string} The url of the texture atlas image file.
     * @param [dataUrl] {string} The url of the texture atlas data file (json/xml)
     * @param [data] {object} A JSON or XML data object (to use instead of loading from a URL)
     * @return {Loader} Returns itself.
     * @chainable
     */
    atlasXML: function(key, textureURL, dataUrl, data) {
        return this.atlas(key, textureURL, dataUrl, data, C.ATLAS_FORMAT.XML_STARLING);
    },

    /**
     * Add a new texture atlas loading request.
     * @param key {string} Unique asset key of the texture atlas file.
     * @param textureUrl {string} The url of the texture atlas image file.
     * @param [dataUrl] {string} The url of the texture atlas data file (json/xml)
     * @param [data] {object} A JSON or XML data object (to use instead of loading from a URL)
     * @param [format] {number} A value describing the format of the data.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     * @return {Loader} Returns itself.
     * @chainable
     */
    atlas: function(key, textureUrl, dataUrl, data, format, overwrite) {
        if(overwrite || !this.hasKey(key)) {
            if(!format) format = C.ATLAS_FORMAT.JSON_ARRAY;

            if(typeof data === 'string') {
                switch(format) {
                    case C.ATLAS_FORMAT.XML_STARLING:
                        data = utils.parseXML(data);
                        break;

                    case C.ATLAS_FORMAT.JSON_ARRAY:
                    case C.ATLAS_FORMAT.JSON_HASH:
                        data = JSON.parse(data);
                        break;
                }
            }

            this.add('textureatlas', key, textureUrl, {
                dataUrl: dataUrl,
                data: data,
                format: format
            });
        }

        return this;
    },

    /**
     * Starts the loading of all the assets that are queued to load
     *
     * @method start
     * @return {Loader} Returns itself.
     * @chainable
     */
    start: function() {
        if(this.isLoading) return;

        this.progress = 0;
        this.hasLoaded = false;
        this.isLoading = true;

        this.emit('start', this.keys.length);

        if(this.keys.length > 0) {
            while(this.keys.length > 0)
                this.loadFile();
        } else {
            this.progress = 100;
            this.hasLoaded = true;
            this.emit('complete');
        }

        return this;
    },

    /**
     * Loads a single asset from the queued assets in this Loader. To load a single file first queue it by using
     * one of the methods named for an asset (like `audio`, `image`, `tilemap`, etc.), then call this to load the
     * first in the queue.
     *
     * Note: To load the entire queue at once use `start`.
     *
     * @method loadFile
     * @return {Loader} Returns itself.
     * @chainable
     */
    loadFile: function() {
        var file = this.assets[this.keys.shift()],
            self = this;

        switch(file.type) {
            //load images
            case 'image':
            case 'spritesheet':
            case 'textureatlas':
            case 'bitmapfont':
                file.image = new Image();
                file.image.name = file.key;
                file.image.addEventListener('load', this.fileComplete.bind(this, file.key), false);
                file.image.addEventListener('error', this.fileError.bind(this, file.key), false);
                file.image.crossOrigin = file.crossOrigin !== undefined ? file.crossOrigin : this.crossOrigin;
                file.image.src = this.baseUrl + file.url;
                break;

            //load tilemap
            case 'tilemap':
                utils.ajax({
                    url: this.baseUrl + file.url,
                    dataType: this._getFormatAjaxType(file.format),
                    load: function(data) {
                        file.data = data;
                        self.fileComplete(file.key);
                    },
                    error: function(err) {
                        self.fileError(file.key, err);
                    }
                });
                break;

            //load audio
            case 'audio':
                file.url = this.getAudioUrl(file.url);

                if(file.url) {
                    if(support.webAudio) {
                        utils.ajax({
                            url: this.baseUrl + file.url,
                            dataType: 'arraybuffer',
                            load: function(data) {
                                file.data = data;
                                self.fileComplete(file.key);
                            },
                            error: function(err) {
                                self.fileError(file.key, err);
                            }
                        });
                    } else if(support.htmlAudio) {
                        file.data = new Audio();
                        file.data.name = file.key;
                        file.data.preload = 'auto';
                        file.data.src = this.baseUrl + file.url;

                        file.data.addEventListener('error', file._bndError = this.fileError.bind(this, file.key), false);
                        file.data.addEventListener('canplaythrough', file._bndComplete = this.fileComplete.bind(this, file.key), false);
                        file.data.load();
                    }
                } else {
                    this.fileError(file.key, 'No supported audio URL could be determined!');
                }
                break;

            case 'text':
                utils.ajax({
                    url: this.baseUrl + file.url,
                    dataType: 'text',
                    load: function(data) {
                        file.data = data;
                        self.fileComplete(file.key);
                    },
                    error: function(err) {
                        self.fileError(file.key, err);
                    }
                });
                break;
        }

        return this;
    },

    /**
     * Chooses the audio url to use based on browser support.
     *
     * @method getAudioUrl
     * @param urls {Array<String>} An array of URLs to choose from, chooses the first in the array to be
     *      supported by the browser.
     * @return {String} Returns the URL that was chosen, or `undefined` if none are supported.
     */
    getAudioUrl: function(urls) {
        for(var i = 0, il = urls.length; i < il; ++i) {
            var url = urls[i],
                ext = url.match(/.+\.([^?]+)(\?|$)/);

            ext = (ext && ext.length >= 2) ? ext[1] : url.match(/data\:audio\/([^?]+);/)[1];

            //if we can play this url, then set the source of the player
            if(support.codec[ext]) {
                return url;
            }
        }
    },

    /**
     * Error occured when load a file.
     *
     * @method fileError
     * @param key {String} Key of the error loading file.
     * @param error {mixed} The error that was thrown.
     * @private
     */
    fileError: function(key, error) {
        this.assets[key].loaded = true;
        this.assets[key].error = error;

        this.fileDone(key, error);
    },

    /**
     * Called when a file is successfully loaded.
     *
     * @method fileComplete
     * @param key {string} Key of the successfully loaded file.
     * @private
     */
    fileComplete: function(key) {
        if(!this.assets[key])
            return utils.warn('fileComplete key is invalid!', key);

        this.assets[key].loaded = true;

        var file = this.assets[key],
            done = true,
            self = this;

        switch(file.type) {
            case 'image':
                this.game.cache.addImage(file);
                break;

            case 'spritesheet':
                this.game.cache.addSpriteSheet(file);
                break;

            case 'tilemap':
                file.baseUrl = file.url.replace(/[^\/]*$/, '');
                file.numImages = file.numLoaded = 0;
                file.images = [];

                if(file.format === C.FILE_FORMAT.JSON) {
                    done = false;
                    this._loadJsonTilesets(file);
                } else if(file.format === C.FILE_FORMAT.XML) {
                    done = false;
                    this._loadXmlTilesets(file);
                }
                break;

            case 'textureatlas':
                done = false;
                this._dataget(file, function() {
                    self.game.cache.addTextureAtlas(file);
                });
                break;

            case 'bitmapfont':
                done = false;
                this._dataget(file, function() {
                    self.game.cache.addBitmapFont(file);
                });
                break;

            case 'audio':
                if(support.webAudio) {
                    file.webAudio = true;
                    file.decoded = false;
                } else {
                    file.data.removeEventListener('error', file._bndError);
                    file.data.removeEventListener('canplaythrough', file._bndComplete);
                }

                this.game.cache.addAudio(file);
                break;

            case 'text':
                this.game.cache.addText(file);
                break;
        }

        if(done) {
            this.fileDone(file.key);
        }
    },

    /**
     * Called when a file is done (error or loaded)
     *
     * @method fileDone
     * @param key {String} Key of the file done
     * @param error {mixed} The error that occurred (if there was one)
     * @private
     */
    fileDone: function(key, error) {
        this.done++;
        this.progress = Math.round((this.done / this.total) * 100);

        this.emit('progress', this.progress);

        if(error) {
            utils.warn('Error loading file "' + key + '", error received:', error);
            this.emit('error', error, key);
        }

        if(this.progress >= 100) {
            this.progress = 100;
            this.hasLoaded = true;
            this.isLoading = false;

            this.emit('complete');
        }
    },

    /**
     * Returns the ajax type that represents each format type
     *
     * @method _getFormatAjaxType
     * @param type {ATLAS_FORMAT|FILE_FORMAT} The format to get an ajax type for
     * @private
     */
    _getFormatAjaxType: function(type) {
        switch(type) {
            case C.ATLAS_FORMAT.JSON_ARRAY:
            case C.ATLAS_FORMAT.JSON_HASH:
            case C.FILE_FORMAT.JSON:
                return 'json';

            case C.ATLAS_FORMAT.XML_STARLING:
            case C.FILE_FORMAT.XML:
                return 'xml';

            case C.FILE_FORMAT.CSV:
                return 'text';
        }
    },

    /**
     * Gets a file's data via ajax.
     *
     * @method _dataget
     * @param file {Object} The file descriptor object
     * @param [callback] {Function} The callback to call once the file has loaded. `fileDone` or `fileError` will be
     *      called for you.
     * @private
     */
    _dataget: function(file, cb) {
        var self = this;

        if(!file.dataUrl) {
            setTimeout(cb, 1);
        } else {
            utils.ajax({
                url: this.baseUrl + file.dataUrl,
                dataType: this._getFormatAjaxType(file.format),
                load: function(data) {
                    file.data = data;
                    if(cb) cb();
                    self.fileDone(file.key);
                },
                error: function(err) {
                    self.fileError(file.key, err);
                }
            });
        }
    },

    /**
     * Loads the tilesets found in a JSON formatted tilemap object.
     *
     * @method _loadJsonTilesets
     * @param file {Object} The file descriptor object
     * @private
     */
    _loadJsonTilesets: function(file) {
        var data = file.data,
            baseUrl = file.baseUrl;

        //loop through each tileset and load the texture
        for(var i = 0, il = data.tilesets.length; i < il; ++i) {
            var set = data.tilesets[i],
                img;

            if(!set.image) continue;

            file.numImages++;

            img = new Image();
            img.addEventListener('load', this._onTilesetLoaded.bind(this, file), false);
            img.addEventListener('error', this._onTilesetError.bind(this, file), false);
            img.crossOrigin = file.crossOrigin !== undefined ? file.crossOrigin : this.crossOrigin;
            img.src = this.baseUrl + baseUrl + set.image;

            file.images.push(img);
        }
    },

    /**
     * Loads the tilesets found in a XML formatted tilemap object.
     *
     * @method _loadXmlTilesets
     * @param file {Object} The file descriptor object
     * @private
     */
    _loadXmlTilesets: function(file) {
        var data = file.data,
            baseUrl = file.baseUrl,
            tilesets = data.getElementsByTagName('tileset');

        for(var i = 0, il = tilesets.length; i < il; ++i) {
            var set = tilesets[i],
                imgElm = set.getElementsByTagName('image')[0],
                img;

            if(!imgElm) continue;

            file.numImages++;

            img = new Image();
            img.addEventListener('load', this._onTilesetLoaded.bind(this, file), false);
            img.addEventListener('error', this._onTilesetError.bind(this, file), false);
            img.crossOrigin = file.crossOrigin !== undefined ? file.crossOrigin : this.crossOrigin;
            img.src = this.baseUrl + baseUrl + imgElm.attributes.getNamedItem('source').nodeValue;

            file.images.push(img);
        }
    },

    /**
     * Called each time a tileset is loaded successfully.
     *
     * @method _onTilesetLoaded
     * @param file {Object} The file descriptor object.
     * @private
     */
    _onTilesetLoaded: function(file) {
        file.numLoaded++;

        if(file.numImages === file.numLoaded) {
            this.game.cache.addTilemap(file);
            this.fileDone(file.key);
        }
    },

    /**
     * Called each time a tileset has an error when loading.
     *
     * @method _onTilesetError
     * @param file {Object} The file descriptor object.
     * @param error {mixed} The error thrown when loading.
     * @private
     */
    _onTilesetError: function(file, error) {
        file.error = error;
        file.numLoaded++;

        if(file.numImages === file.numLoaded) {
            this.fileDone(file.key, error);
        }
    }
});

module.exports = Loader;
