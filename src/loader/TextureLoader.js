/**
 * Loads a texture image
 *
 * @class TextureLoader
 * @constructor
 */
 gf.TextureLoader = function(al, name, url) {
    gf.Loader.call(this, al, name, url);

    this.type = 'texture';
};

gf.inherits(gf.TextureLoader, Object, {
    load: function() {
        gf.Loader.protype.load.call(this);

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
            self.done(texture);
        }
    }
});