// Thanks to PhotonStorm (http://photonstorm.com/) for this loader!
// heavily insprite by (stolen from): https://github.com/photonstorm/phaser/blob/master/src/loader/Loader.js

var utils = require('../utils/utils'),
    support = require('../utils/support'),
    EventEmitter = require('../utils/EventEmitter'),
    C = require('../constants');

/**
 * The AssetLoader loads and parses different game assets, such as sounds, textures,
 * TMX World files (exported from the <a target="_blank" href="http://mapeditor.org">Tiled Editor</a>),
 * and Spritesheet files (published from <a target="_blank" href="http://www.codeandweb.com/texturepacker">Texture Packer</a>).
 *
 * @class AssetLoader
 * @extends Object
 * @uses EventEmitter
 * @constructor
 * @param game {Game} Game instance this belongs to
 */
var AssetLoader = module.exports = function(game) {
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

utils.inherits(AssetLoader, Object, {
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
        this.progress = 0;
        this.total = 0;
        this.done = 0;
        this.hasLoaded = false;
        this.isLoading = false;
        this.assets = {};
        this.keys.length = 0;
    },

    /**
     * Adds an asset to be loaded
     *
     * @method add
     * @param type {String} The type of asset ot load (image, spritesheet, textureatlas, bitmapfont, tilemap, tileset, audio, etc)
     * @param key {String} The unique key of the asset to identify it
     * @param url {String} The URL to load the resource from
     * @param [options] {Object} Extra options to apply to the asset (such as crossOrigin)
     * @param [options.crossOrigin=false] {Boolean} True if an image load should be treated as crossOrigin
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
     * @param numFrames {Number} How many frames in this sprite sheet.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     */
    spritesheet: function(key, url, frameWidth, frameHeight, numFrames, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('spritesheet', key, url, {
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                numFrames: numFrames
            });
    },

    /**
     * Add an audio file to the Loader.
     *
     * @method audio
     * @param key {String} Unique asset key of this image file.
     * @param urls {Array<String>} URLs of audio files.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it
     */
    audio: function(key, urls, overwrite) {
        if(overwrite || !this.hasKey(key))
            this.add('audio', key, urls);
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
    },

    //shortcuts for different atlas types
    atlasJSONArray: function(key, textureURL, atlasURL, atlasData) {
        this.atlas(key, textureURL, atlasURL, atlasData, C.ATLAS_FORMAT.JSON_ARRAY);
    },
    atlasJSONHash: function(key, textureURL, atlasURL, atlasData) {
        this.atlas(key, textureURL, atlasURL, atlasData, C.ATLAS_FORMAT.JSON_HASH);
    },
    atlasXML: function(key, textureURL, atlasURL, atlasData) {
        this.atlas(key, textureURL, atlasURL, atlasData, C.ATLAS_FORMAT.STARLING_XML);
    },

    /**
     * Add a new texture atlas loading request.
     * @param key {string} Unique asset key of the texture atlas file.
     * @param textureUrl {string} The url of the texture atlas image file.
     * @param [dataUrl] {string} The url of the texture atlas data file (json/xml)
     * @param [data] {object} A JSON or XML data object (to use instead of loading from a URL)
     * @param [format] {number} A value describing the format of the data.
     * @param [overwrite=false] {Boolean} If an entry with a matching key already exists this will over-write it.
     */
    atlas: function(key, textureUrl, dataUrl, data, format, overwrite) {
        if(overwrite || !this.hasKey(key)) {
            if(!format) format = C.ATLAS_FORMAT.JSON_ARRAY;

            if(typeof data === 'string') {
                switch(format) {
                    case C.ATLAS_FORMAT.STARLING_XML:
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
    },

    /**
     * Starts the loading of all the assets added
     *
     * @method start
     */
    start: function() {
        if(this.isLoading) return;

        this.progress = 0;
        this.hasLoaded = false;
        this.isLoading = true;

        this.emit('start', this.keys.length);

        if(this.keys.length > 0) {
            while(this._keys.length > 0)
                this.loadFile();
        } else {
            this.progress = 100;
            this.hasLoaded = true;
            this.emit('complete');
        }
    },

    /**
     * Loads a single asset from the assets in this Loader.
     *
     * @method loadFile
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
                    error: function() {
                        self.fileError(file.key);
                    }
                });
                break;

            //load audio
            case 'audio':
                file.url = this.getAudioURL(file.url);

                if(file.url) {
                    if(support.webAudio) {
                        utils.ajax({
                            url: this.baseURL + file.url,
                            dataType: 'arraybuffer',
                            load: function(data) {
                                file.data = data;
                                self.fileComplete(file.key);
                            },
                            error: function() {
                                self.fileError(file.key);
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
                    this.fileError(file.key);
                }
                break;

            case 'text':
                utils.ajax({
                    url: this.baseURL + file.url,
                    dataType: 'text',
                    load: function(data) {
                        file.data = data;
                        self.fileComplete(file.key);
                    },
                    error: function() {
                        self.fileError(file.key);
                    }
                });
                break;
        }
    },

    /**
     * Chooses the audio url to use based on browser support
     *
     * @method getAudioUrl
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
     */
    fileError: function(key) {
        this.assets[key].loaded = true;
        this.assets[key].error = true;

        this.emit('error', key);

        utils.warn('Error loading file', key);

        this.fileDone(key, true);
    },

    /**
     * Called when a file is successfully loaded.
     * @param key {string} Key of the successfully loaded file.
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
     * @param fail {Boolean} Whether this was a failure or not
     */
    fileDone: function(key, fail) {
        this.done++;
        this.progress = Math.round((this.done / this.total) * 100);

        if(fail) {
            this.emit('error', key);
        }

        if(this.progress >= 100) {
            this.progress = 100;
            this.hasLoaded = true;
            this.isLoading = false;

            this.emit('complete');
        }
    },

    _getFormatAjaxType: function(type) {
        switch(type) {
            case C.ATLAS_FORMAT.JSON_ARRAY:
            case C.ATLAS_FORMAT.JSON_HASH:
            case C.FILE_FORMAT.JSON:
                return 'json';

            case C.ATLAS_FORMAT.STARLING_XML:
            case C.FILE_FORMAT.XML:
                return 'xml';

            case C.FILE_FORMAT.CSV:
                return 'text';
        }
    },

    _dataget: function(file, cb) {
        var self = this;

        if(!file.dataUrl) {
            setTimeout(cb);
        } else {
            utils.ajax({
                url: this.baseUrl + file.dataUrl,
                dataType: this._getFormatAjaxType(file.format),
                load: function(data) {
                    file.data = data;
                    if(cb) cb();
                    self.fileDone(file.key);
                },
                error: function() {
                    self.fileError(file.key);
                }
            });
        }
    },

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

    _onTilesetLoaded: function(file) {
        file.numLoaded++;

        if(file.numImages === file.numLoaded) {
            this.fileDone(file.key, file.error);
        }
    },

    _onTilesetError: function(file) {
        file.error = true;
        file.numLoaded++;

        if(file.numImages === file.numLoaded) {
            this.fileDone(file.key, file.error);
        }
    }
});
