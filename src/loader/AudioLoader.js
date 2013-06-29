/**
 * Loads an audio clip
 *
 * @class AudioLoader
 * @constructor
 */
gf.AudioLoader = function(name, urls) {
    gf.Loader.call(this, name, urls);

    this.type = 'audio';
    this.urls = typeof urls === 'string' ? [urls] : urls;
};

gf.inherits(gf.AudioLoader, gf.Loader, {
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