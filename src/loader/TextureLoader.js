/**
 * Loads a texture image
 *
 * @class TextureLoader
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param url {String} The url to load the resource from, also used as a key in the assetCache
 */
 gf.TextureLoader = function(name, url) {
    gf.Loader.call(this, name, url);

    this.type = 'texture';
};

gf.inherits(gf.TextureLoader, gf.Loader, {
    /**
     * Loads the texture data
     *
     * @method load
     */
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        var self = this,
            texture = gf.Texture.fromImage(this.url);

        if(!texture.baseTexture.hasLoaded) {
            texture.baseTexture.on('loaded', function() {
                self.done(texture);
            });
            texture.baseTexture.source.onerror = function() {
                self.error('Unable to load texture');
            };
        } else {
            this.done(texture);
        }
    }
});