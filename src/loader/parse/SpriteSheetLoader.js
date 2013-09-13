var core = require('../../core/core'),
    Loader = require('../Loader');

var SpriteSheetLoader = module.exports = function(name, baseUrl, data) {
    Loader.call(this, name, baseUrl);

    this.type = 'spritesheet';
    this.data = data;
};

core.inherits(SpriteSheetLoader, Loader, {
    load: function() {
        //pull from cache
        if(Loader.prototype.load.call(this)) return;

        var self = this,
            data = this.data,
            txLoader = new TextureLoader(this.name, this.url + data.meta.image);

        txLoader.on('load', function(e) {
            var texture =  e.data.baseTexture,
                frames = self.data.frames,
                assets = {};

            for(var f in frames) {
                var rect = frames[f].frame;

                if(rect) {
                    assets[f] = PIXI.TextureCache[f] = new core.Texture(texture, {
                        x: rect.x,
                        y: rect.y,
                        width: rect.w,
                        height: rect.h
                    });

                    if(frames[f].trimmed) {
                        PIXI.TextureCache[f].realSize = frames[f].spriteSourceSize;
                        PIXI.TextureCache[f].trim.x = 0;
                    }
                }
            }

            self.done(assets);
        });

        txLoader.on('error', function(e) {
            self.error(e.message);
        });

        txLoader.load();
    }
});