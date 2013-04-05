gf.AssetLoader = function(resources) {
    //mixin the Event Target methods
    PIXI.EventTarget.call(this);

    /**
    * The array of asset URLs that are going to be loaded
    * @property assetURLs
    * @type Array
    */
    this.resources = resources;
    this.loadCount = resources.length;
    this.assets = {};

    this.exts = {
        imgs: ['jpeg', 'jpg', 'png', 'gif'],
        sound: ['mp3', 'ogg', 'wma', 'wav'],
        data: ['json']
    };
};

gf.inherits(gf.AssetLoader, Object, {
    load: function() {
        for(var i = 0, il = this.resources.length; i < il; ++i) {
            var name = typeof this.resources[i] === 'string' ? this.resources[i] : this.resources[i].name,
                url = typeof this.resources[i] === 'string' ? this.resources[i] : this.resources[i].src,
                ext = url.split('.').pop().toLowerCase();

            //load a texture
            if(this.exts.imgs.indexOf(ext) !== -1) {
                this.loadTexture(name, url);
            }
            //load a sound clip
            else if(this.exts.sound.indexOf(ext) !== -1) {
                this.loadSound(name, url);
            }
            //load a data file (world, spritesheet, etc)
            else if(this.exts.data.indexOf(ext) !== -1) {
                this.loadData(name, url);
            }
        }
    },
    loadTexture: function(name, url) {
        var self = this,
            texture = PIXI.Texture.fromImage(url);

        if(!texture.hasLoaded) {
            texture.baseTexture.on('loaded', function() {
                self.onAssetLoaded(null, 'texture', texture);
            });
            this.assets[name] = texture;
        } else {
            self.onAssetLoaded(null, 'texture', texture);
        }

        return texture;
    },
    loadAudio: function(name, url) {
        var self = this,
            audio = new Audio(url);

        audio.preload = 'auto';

        audio.addEventListener('canplaythrough', function() {
            self.onAssetLoaded(null, 'audio', audio);
        }, false);

        audio.addEventListener('error', function() {
            self.onAssetLoaded(new Error('Failed to load audio "' + name + '" at url: ' + url), 'audio');
        }, false);

        audio.load();
        this.assets[name] = audio;

        return audio;
    },
    loadData: function(name, url) {
        var self = this,
            baseUrl = url.replace(/[^\/]*$/, '');

        gf.utils.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
            load: function(data) {
                //check some properties to see if this is a TiledMap Object
                if(data.orientation && data.layers && data.tilesets && data.version) {
                    //TODO: How to tell if all these are loaded (how to count them?)
                    //loop through each layer and load the sprites (objectgroup types)
                    for(var i = 0, il = data.layers.length; i < il; ++i) {
                        var layer = data.layers[i];
                        if(layer.type !== gf.types.LAYER.OBJECT_GROUP) continue;

                        //loop through each object, and load the textures
                        for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                            var obj = layer.objects[o];
                            if(!obj.properties.spritesheet) continue;

                            this.loadCount++;
                            self.loadTexture(layer.name + '_' + obj.name + '_texture', obj.properties.spritesheet);
                        }
                    }

                    //loop through each tileset and load the texture
                    for(var s = 0, sl = data.tilesets.length; s < sl; ++s) {
                        var set = data.tilesets[s];
                        if(!set.image) continue;

                        this.loadCount++;
                        self.loadTexture(set.name + '_texture', baseUrl + set.image);
                    }
                }
                //this is a sprite sheet (published from TexturePacker)
                else if(data.frames && data.meta) {
                    var textureUrl = baseUrl + data.meta.image,
                        texture =  PIXI.Texture.fromImage(textureUrl).baseTexture,
                        frames = data.frames,
                        assets = [];

                    for(var f in frames) {
                        var rect = frames[f].frame;

                        PIXI.TextureCache[f] = new PIXI.Texture(texture, { x: rect.x, y: rect.y, width: rect.w, height: rect.h });

                        if(frames[f].trimmed) {
                            PIXI.TextureCache[f].realSize = frames[f].spriteSourceSize;
                            PIXI.TextureCache[f].trim.x = 0;
                        }

                        assets.push(PIXI.TextureCache[f]);
                    }

                    self.assets[name] = assets;

                    if(texture.hasLoaded) {
                        self.onAssetLoaded(null, 'spritesheet', assets);
                    }
                    else {
                        texture.addEventListener('loaded', function() {
                            self.onAssetLoaded(null, 'spritesheet', assets);
                        });
                    }
                }
            },
            error: function(err) {
                self.onAssetLoaded(err);
            }
        });
    },
    onAssetLoaded: function(err, type, asset) {
        //texture (image)
        //audio
        //spritesheet (json sheet)
        //world (TiledEditor Json data)
        this.loadCount--;

        this.emit({ type: 'progress', error: err, kind: type, asset: asset });
        if(this.onProgress) this.onProgress(err, type, asset);

        if(this.loadCount === 0) {
            this.dispatchEvent({ type: 'complete' });
            if(this.onComplete) this.onComplete();
        }
    }
});
