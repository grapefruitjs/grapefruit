/**
 * Loads json data
 *
 * @class JsonLoader
 * @constructor
 */
gf.JsonLoader = function(al, name, url) {
    gf.Loader.call(this, al, name, url);

    this.type = 'json';
};

gf.inherits(gf.JsonLoader, Object, {
    load: function() {
        gf.Loader.protype.load.call(this);

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
                    loader = new gf.WorldLoader(this.parent, this.name, baseUrl, data);
                }
                //this is a sprite sheet (published from TexturePacker)
                else if(data.frames && data.meta) {
                    loader = new gf.SpriteSheetLoader(this.parent, this.name, baseUrl, data);
                }

                if(loader) {
                    loader.on('load', function(e) {
                        self.done(e.data);
                    });
                    loader.on('error', function(e) {
                        self.error(e.message);
                    });

                    loader.load();
                } else {
                    self.error('Unkown json type, unable to load!');
                }
            },
            error: function(err) {
                self.error(err.message || err);
            }
        });
    }
});