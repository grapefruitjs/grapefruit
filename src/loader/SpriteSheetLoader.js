gf.SpriteSheetLoader = function(al, name, baseUrl, data) {
    gf.Loader.call(this, null, name, baseUrl);

    this.type = 'spritesheet';
    this.data = data;
};

gf.inherits(gf.SpriteSheetLoader, gf.Loader, {
    load: function() {
        gf.Loader.protype.load.call(this);

        var self = this,
            data = this.data,
            txLoader = new gf.TextureLoader(this.parent, this.name, this.url + data.meta.image);

        txLoader.on('load', function(e) {
            var texture =  e.data.baseTexture,
                frames = self.data.frames,
                assets = {};

            for(var f in frames) {
                var rect = frames[f].frame;

                if(rect) {
                    assets[f] = PIXI.TextureCache[f] = new gf.Texture(texture, {
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