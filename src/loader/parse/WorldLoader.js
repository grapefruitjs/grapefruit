gf.WorldLoader = function(name, baseUrl, data) {
    gf.Loader.call(this, name, baseUrl);

    this.type = 'world';
    this.data = data;
    this.numTextures = 0;
    this.errors = [];
};

gf.inherits(gf.WorldLoader, gf.Loader, {
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        //loop through each layer and load the sprites (objectgroup types)
        for(var i = 0, il = this.data.layers.length; i < il; ++i) {
            var layer = this.data.layers[i];
            if(layer.type !== 'objectgroup') continue;

            //loop through each object, and load the textures
            for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                var obj = layer.objects[o],
                    txLoader;

                if(!obj.properties.spritesheet) continue;
                this.numTextures++;

                txLoader = new gf.TextureLoader(layer.name + '_' + obj.name + '_texture', obj.properties.spritesheet);

                txLoader.on('load', this.onTextLoad.bind(this));
                txLoader.on('error', this.onTextError.bind(this));
                txLoader.load();
            }
        }

        //loop through each tileset and load the texture
        for(var s = 0, sl = this.data.tilesets.length; s < sl; ++s) {
            var set = this.data.tilesets[s],
                txLoader2;

            if(!set.image) continue;
            this.numTextures++;

            txLoader2 = new gf.TextureLoader(set.name + '_texture', this.url + set.image);

            txLoader2.on('load', this.onTextLoad.bind(this));
            txLoader2.on('error', this.onTextError.bind(this));
            txLoader2.load();
        }
    },
    onTextLoad: function() {
        this.numTextures--;

        if(this.numTextures === 0) {
            this.done();
        }
    },
    onTextError: function(e) {
        this.numTextures--;
        this.errors.push(e);

        if(this.numTextures === 0) {
            this.done();
        }
    },
    done: function() {
        if(this.errors.length)
            gf.Loader.prototype.error.call(this, this.errors);
        else
            gf.Loader.prototype.done.call(this, this.data);
    }
});