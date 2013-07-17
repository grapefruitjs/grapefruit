/**
 * Loads json data
 *
 * @class JsonLoader
 * @extends gf.Loader
 * @namespace gf
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param url {String} The url to load the resource from, also used as a key in the assetCache
 */
gf.JsonLoader = function(name, url) {
    gf.Loader.call(this, name, url);

    this.type = 'json';
};

gf.inherits(gf.JsonLoader, gf.Loader, {
    /**
     * Loads the json data
     *
     * @method load
     */
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        var self = this,
            baseUrl = this.url.replace(/[^\/]*$/, '');

        gf.utils.ajax({
            method: 'GET',
            url: this.url,
            dataType: 'json',
            load: function(data) {
                var loader;

                //check some properties to see if this is a TiledMap Object
                if(data.orientation && data.layers && data.tilesets && data.version) {
                    loader = new gf.WorldLoader(self.name, baseUrl, data);
                }
                //this is a sprite sheet (published from TexturePacker)
                else if(data.frames && data.meta) {
                    loader = new gf.SpriteSheetLoader(self.name, baseUrl, data);
                }

                if(loader) {
                    loader.on('load', function(e) {
                        self.done(e.data);
                    });
                    loader.on('error', function(e) {
                        self.error(e.message);
                    });

                    loader.load();
                }
                //just some json data
                else {
                    self.done(data);
                }
            },
            error: function(err) {
                self.error(err.message || err);
            }
        });
    }
});