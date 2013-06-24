/**
 * The AssetLoader loads and parses different game assets, such as sounds, textures,
 * TMX World JSON file (exported from the <a href="http://mapeditor.org">Tiled Editor</a>),
 * and Spritesheet JSON files (published from <a href="http://www.codeandweb.com/texturepacker">Texture Packer</a>).
 *
 * @class AssetLoader
 * @constructor
 * @param assets {Array} Array of assets to load when `.load()` is called
 * @example
 *      var loader = new AssetLoader(['/my/texture.png']);
 *      loader.load();
 *      //OR
 *      var loader = new AssetLoader();
 *      loader.load(['/my/texture.png']);
 */
gf.AssetLoader = function(game) {
    //mixin the Event Target methods
    gf.EventTarget.call(this);

    this.game = game;

    /**
     * The array of assets to load
     *
     * @property assets
     * @type Array
     */
    this.assets = [];

    /**
     * The count of remaining assets to load
     *
     * @property remaining
     * @type Number
     * @readOnly
     */
    this.remaining = 0;

    /**
     * A mapping of extensions to types
     *
     * @property loaders
     * @type Object
     * @readOnly
     * @private
     */
    this.loaders = {
        'texture': gf.TextureLoader,
        'jpeg': gf.TextureLoader,
        'jpg': gf.TextureLoader,
        'png': gf.TextureLoader,
        'gif': gf.TextureLoader,

        'audio': gf.AudioLoader,
        'music': gf.AudioLoader,
        'mp3': gf.AudioLoader,
        'ogg': gf.AudioLoader,
        'wma': gf.AudioLoader,
        'wav': gf.AudioLoader,

        'json': gf.JsonLoader
    };
};
/**
 * Fired when an item has loaded
 *
 * @event onProgress
 */

/**
 * Fired when all the assets have loaded
 *
 * @event onComplete 
 */

gf.inherits(gf.AssetLoader, Object, {
    /**
     * Adds a resource to the assets array.
     *
     * @method add
     * @param name {String} The name of the resource (to use as the key in the cache)
     * @param url {String} The URL to load the resource from (cross-domain not supported yet)
     */
    add: function(name, url) {
        this.assets.push({
            name: name,
            src: url
        });
    },
    /**
     * Starts the loading festivities. If called without any arguments it will load
     * the assets passed in at the ctor. If an array of assets are passed it will
     * load those instead.
     *
     * @method load
     * @param items {Array} Array of resources to load instead of the object's resources
     */
    load: function(items) {
        var assets = items || this.assets;

        for(var i = 0, il = assets.length; i < il; ++i) {
            var name = typeof assets[i] === 'string' ? assets[i] : assets[i].name,
                url = typeof assets[i] === 'string' ? assets[i] : (assets[i].src || assets[i].url || assets[i].uri),
                ext = assets[i].type || (url instanceof Array ? 'audio' : null) || url.split('.').pop().toLowerCase(), //assume arrays of urls are for audio
                Loader = this.loaders[ext];

            if(!Loader)
                throw 'Unknown type "' + ext + '", unable to preload!';

            this.remaining++;
            var loader = new Loader(this, name, url);

            loader.on('load', this.onAssetLoaded.bind(this));
            loader.on('error', this.onAssetError.bind(this));
            loader.load();
        }
    },
    /**
     * Called whenever an asset is loaded, to keep track of when to emit complete and progress.
     *
     * @method onAssetLoaded
     * @private
     * @param err {String} An option error if there was an issue loading that resource
     * @param type {String} The type of asset loaded (texture, audio, world, or spritesheet)
     * @param asset {Texture|Audio|Object} The actual asset that was loaded
     */
    onAssetLoaded: function(e) {
        this.remaining--;

        this.emit({
            type: 'progress',
            assetType: e.assetType,
            url: e.url,
            data: e.data
        });

        if(this.remaining === 0) {
            this.emit({ type: 'complete' });
        }
    },
    onAssetError: function(e) {
        this.remaining--;

        this.emit({
            type: 'error',
            assetType: e.assetType,
            message: e.message
        });

        if(this.remaining === 0) {
            this.emit({ type: 'complete' });
        }
    }
});
