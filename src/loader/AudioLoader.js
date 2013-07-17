/**
 * Loads an audio clip
 *
 * @class AudioLoader
 * @extends gf.Loader
 * @namespace gf
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param urls {Array<String>} All the urls for the different formats of this audio file
 */
gf.AudioLoader = function(name, urls) {
    gf.Loader.call(this, name, urls);

    this.type = 'audio';
    this.urls = typeof urls === 'string' ? [urls] : urls;
};

gf.inherits(gf.AudioLoader, gf.Loader, {
    /**
     * Loads the audio file described by the urls passed in to the ctor. Will intelligently
     * determine which url is supported by this browser.
     *
     * @method load
     */
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        var man = new gf.AudioManager(),
            player = man.create(name, { urls: this.urls });

        if(!player) {
            this.error('Cannot find a url for an audio type supported by this browser.');
        } else {
            var self = this;
            player.on('load', function() {
                self.done(player);
            });

            player.on('error', function(e) {
                self.error(e.message);
            });
        }
    }
});