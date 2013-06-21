/**
 * Loads an audio clip
 *
 * @class AudioLoader
 * @constructor
 */
gf.AudioLoader = function(al, name, urls) {
    gf.Loader.call(this, al, name, urls);

    this.type = 'audio';
    this.urls = typeof urls === 'string' ? [urls] : urls;
};

gf.inherits(gf.AudioLoader, gf.Loader, {
    load: function() {
        gf.Loader.protype.load.call(this);

        var player = this.parent.game.audio.create(name, { urls: this.urls });

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