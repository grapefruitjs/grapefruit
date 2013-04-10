gf.AssetLoader = function(resources) {
    //mixin the Event Target methods
    gf.EventTarget.call(this);

    /**
    * The array of asset URLs that are going to be loaded
    * @property assetURLs
    * @type Array
    */
    this.resources = resources || [];
    this.loadCount = 0;
    this.assets = {};

    this.exts = {
        imgs: ['jpeg', 'jpg', 'png', 'gif'],
        sound: ['mp3', 'ogg', 'wma', 'wav'],
        data: ['json']
    };
};

gf.inherits(gf.AssetLoader, Object, {
    load: function(items) {
        var resources = items || this.resources;

        for(var i = 0, il = resources.length; i < il; ++i) {
            var name = typeof resources[i] === 'string' ? resources[i] : resources[i].name,
                url = typeof resources[i] === 'string' ? resources[i] : resources[i].src,
                ext = url.split('.').pop().toLowerCase();

            //load a texture
            if(this.exts.imgs.indexOf(ext) !== -1) {
                this.loadTexture(name, url);
            }
            //load a sound clip
            else if(this.exts.sound.indexOf(ext) !== -1) {
                this.loadAudio(name, url);
            }
            //load a data file (world, spritesheet, etc)
            else if(this.exts.data.indexOf(ext) !== -1) {
                this.loadData(name, url);
            }
        }
    },
    loadTexture: function(name, url) {
        this.loadCount++;

        var self = this,
            texture = gf.Texture.fromImage(url);

        this._storeAsset(name, texture);

        if(!texture.baseTexture.hasLoaded) {
            texture.baseTexture.on('loaded', function() {
                self.onAssetLoaded(null, 'texture', texture);
            });
        } else {
            self.onAssetLoaded(null, 'texture', texture);
        }

        return texture;
    },
    loadAudio: function(name, url) {
        this.loadCount++;

        var self = this,
            audio = new Audio(url);

        audio.preload = 'auto';

        this._storeAsset(name, audio);

        audio.addEventListener('canplaythrough', function() {
            self.onAssetLoaded(null, 'audio', audio);
        }, false);

        audio.addEventListener('error', function() {
            self.onAssetLoaded(new Error('Failed to load audio "' + name + '" at url: ' + url), 'audio');
        }, false);

        audio.load();

        return audio;
    },
    loadData: function(name, url) {
        this.loadCount++;

        var self = this,
            baseUrl = url.replace(/[^\/]*$/, '');

        gf.utils.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
            load: function(data) {
                //check some properties to see if this is a TiledMap Object
                if(data.orientation && data.layers && data.tilesets && data.version) {
                    self._storeAsset(name, data);

                    //loop through each layer and load the sprites (objectgroup types)
                    for(var i = 0, il = data.layers.length; i < il; ++i) {
                        var layer = data.layers[i];
                        if(layer.type !== 'objectgroup') continue;

                        //loop through each object, and load the textures
                        for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                            var obj = layer.objects[o];
                            if(!obj.properties.spritesheet) continue;

                            self.loadTexture(layer.name + '_' + obj.name + '_texture', obj.properties.spritesheet);
                        }
                    }

                    //loop through each tileset and load the texture
                    for(var s = 0, sl = data.tilesets.length; s < sl; ++s) {
                        var set = data.tilesets[s];
                        if(!set.image) continue;

                        self.loadTexture(set.name + '_texture', baseUrl + set.image);
                    }

                    self.onAssetLoaded(null, 'world', data);
                }
                //this is a sprite sheet (published from TexturePacker)
                else if(data.frames && data.meta) {
                    var textureUrl = baseUrl + data.meta.image,
                        texture =  gf.Texture.fromImage(textureUrl).baseTexture,
                        frames = data.frames,
                        assets = [];

                    for(var f in frames) {
                        var rect = frames[f].frame;

                        PIXI.TextureCache[f] = new gf.Texture(texture, { x: rect.x, y: rect.y, width: rect.w, height: rect.h });

                        if(frames[f].trimmed) {
                            PIXI.TextureCache[f].realSize = frames[f].spriteSourceSize;
                            PIXI.TextureCache[f].trim.x = 0;
                        }

                        assets.push(PIXI.TextureCache[f]);
                    }

                    self._storeAsset(name, assets);

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

        this.emit({ type: 'progress', error: err, assetType: type, asset: asset });
        if(this.onProgress) this.onProgress(err, type, asset);

        if(this.loadCount === 0) {
            this.dispatchEvent({ type: 'complete' });
            if(this.onComplete) this.onComplete();
        }
    },
    _storeAsset: function(name, asset) {
        this.assets[name] = asset;
        gf.assetCache[name] = asset;
    }
});
