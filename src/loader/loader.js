(function() {
    //TODO: Retries?

    //simple memory cache
    var _cache = {};

    gf.resources = {};
    gf.loader = {
        /**
         * Resource format:
            {
                name: String,   //key name
                type: String,   //image, json, xml, texture, world
                src: String     //url
            }
         * Callbacks format:
            {
                error: function(error, resource),       //an error occured when loading a resource
                progress: function(percent, resource),  //progress of a resource loading
                load: function(resource),               //a resource has loaded

            }
         */
        load: function(resource, cb) {
            //do this so we can just call load, without having to type the long one
            if(resource instanceof Array) {
                gf.loader.loadResources.apply(gf.loader, arguments);
                return;
            }

            var cached = gf.loader._getCached(resource);

            if(cached) {
                gf.resources[resource.name] = resource;
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, cached);
                if(cb) cb(null, cached);

                return cached;
            }

            if(gf.loader._loaders[resource.type] && gf.loader._loaders[resource.type].load) {
                gf.loader._setCache(resource);
                gf.resources[resource.name] = resource;
                gf.loader._loaders[resource.type].load(resource);
                if(cb) {
                    gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, cb.bind(null, null));
                    gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, cb);
                }
            } else {
                //at this point we have no loader for this type
                throw new Error('Unknown resource type: ' + resource.type + ' for res');
            }

            return this;
        },
        /**
         * Resources format:
            [
                {
                    name: String,   //key name
                    type: String,   //image, json, xml, texture, world
                    src: String     //url
                },
                ...
            ]
         * Callbacks format:
            {
                start: function(resource),              //when loading of a resource starts
                error: function(error, resource),       //an error occured when loading a resource
                progress: function(percent, resource),  //progress of a resource loading
                load: function(resource),               //a resource has loaded
                complete: function(resources),          //all resources have completed loading
            }
         */
        loadResources: function(resources, cb) {
            var done = 0, handles = [];

            for(var r = 0, rl = resources.length; r < rl; ++r) {
                gf.event.publish(gf.types.EVENT.LOADER_START, resources[r]);

                handles.push({
                    load: gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + resources[r].name, loadDone.bind(null, r, null)),
                    error: gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + resources[r].name, loadDone.bind(null, r))
                });
                gf.loader.load(resources[r]);
            }

            function loadDone(r, err, resource) {
                done++;

                if(err)
                    gf.event.publish(gf.types.EVENT.LOADER_ERROR, err, resource);
                else
                    gf.event.publish(gf.types.EVENT.LOADER_LOAD, resource);

                gf.event.unsubscribe(handles[r].load);
                gf.event.unsubscribe(handles[r].error);

                handles[r] = null;

                if(done >= resources.length) {
                    gf.event.publish(gf.types.EVENT.LOADER_COMPLETE, resources);
                    if(cb) cb(null, resources);
                }
            }

            return this;
        },
        //Privates for loaders only, not public use
        _loaders: {},
        _getCacheKey: function(resource) {
            return gf.utils.b64.encode(resource.src + '_!_' + resource.type);
        },
        _getCached: function(resource) {
            return _cache[gf.loader._getCacheKey(resource)];
        },
        _setCache: function(resource) {
            return _cache[gf.loader._getCacheKey(resource)] = resource;
        },
        _get: function(url, dataType, progress, cb) {
            gf.utils.ajax({
                url: url,
                dataType: dataType,
                type: 'GET',
                error: function(errorThrown) {
                    if(cb) cb(errorThrown || this.statusText);
                },
                success: function(data) {
                    _cache[url] = data;

                    if(cb) cb(null, data);
                },
                progress: function(e) {
                    if(e.lengthComputable) {
                        var pct = (e.loaded / e.total) * 100;

                        if(progress) progress(pct);
                    } else {
                        //console.warn('Content Length not reported!');
                    }
                }
            });
        }
    };

    //Image loader
    gf.loader._loaders.image = {
        load: function(resource) {
            resource.data = new Image();
            resource.data.addEventListener('load', function() {
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
            }, false);
            resource.data.src = resource.src;
        }
    };

    //JSON and XML loaders
    gf.loader._loaders.json = gf.loader._loaders.xml = {
        load: function(resource) {
            gf.loader._get(
                resource.src,
                resource.type,
                function(pct) { //progress
                    gf.event.publish(gf.types.EVENT.LOADER_PROGRESS + '.' + resource.name, pct, resource);
                },
                function(err, data) {
                    if(err) {
                        gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, err, resource);
                        return;
                    }

                    resource.data = data;
                    gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
                }
            );
        }
    };

    //Texture loader
    gf.loader._loaders.texture = gf.loader._loaders.sprite = {
        load: function(resource) {
            var tloader = new THREE.TextureLoader();
                    
            tloader.addEventListener('error', function(err) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, err, resource);
            });

            tloader.addEventListener('load', function(evt) {
                resource.data = evt.content;
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
            });

            tloader.load(resource.src);
        }
    };

    //Audio loader
    gf.loader._loaders.audio = gf.loader._loaders.sound = gf.loader._loaders.music = {
        load: function(resource) {
            if(!gf.support.audio.play) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, 'This browser does not support HTML5 Audio!', resource);
                return false;
            }

            var ext = resource.src.substr(resource.src.lastIndexOf('.') + 1);
            if(!gf.support.audio[ext]) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, 'This browser does not support playing ' + ext + ' audio files!', resource);
                return false;
            }

            var sound = resource.data = new Audio(resource.src);
            sound.preload = 'auto';

            sound.addEventListener('canplaythrough', function(e) {
                this.removeEventListener('canplaythrough', arguments.callee, false);
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
            }, false);

            sound.addEventListener('error', function(e) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, 'Error loading the audio file!', resource);
            }, false);

            sound.load();
        }
    };

    //World loader, loads a world JSON file and all of its resources listed within
    gf.loader._loaders.world = {
        load: function(resource) {
            if(!resource.texturePath)
                resource.texturePath = resource.src.substr(0, resource.src.lastIndexOf('/') + 1);

            //set the type to json, and load it first
            resource._oldName = resource.name;
            resource.name = resource.name + '_json';
            resource.type = 'json';

            var handles = {};

            handles.load = gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, function() {
                //gf.event.unsubscribe(handles.load);
                //gf.event.unsubscribe(handles.progress);
                //gf.event.unsubscribe(handles.error);

                //set the resource back to world
                resource.name = resource._oldName;
                resource.type = 'world';

                var done = 0, max = 0, lhandles = [], thandles = [];

                //loop through each layer and load the sprites (objectgroup types)
                for(var i = 0, il = resource.data.layers.length; i < il; ++i) {
                    var layer = resource.data.layers[i];
                    if(layer.type != gf.types.LAYER.OBJECT_GROUP) continue;

                    //loop through each object, and load the textures
                    for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                        var obj = layer.objects[o];
                        if(!obj.properties.spritesheet) continue;

                        (function(layer, obj, o) {
                            addRes();
                            var name = layer.name + '_' + obj.name + '_texture';
                            lhandles.push({
                                load: gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + name, function(rsrc) {
                                    obj.properties.texture = rsrc.data;
                                    resDone(o, true, null, rsrc);
                                }),
                                error: gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + name, function(err, rsrc) {
                                    obj.properties.texture = null;
                                    obj.properties._error = err;
                                    resDone(o, true, err, rsrc);
                                })
                            });
                            gf.loader.load({
                                name: layer.name + '_' + obj.name + '_texture',
                                type: 'texture',
                                src: obj.properties.spritesheet
                            });
                        })(layer, obj, o);
                    }
                }

                //loop through each tileset and load the texture
                for(var s = 0, sl = resource.data.tilesets.length; s < sl; ++s) {
                    var set = resource.data.tilesets[s];
                    if(!set.image) continue;

                    (function(set, s) {
                        addRes();
                        var name = set.name + '_texture';
                        thandles.push({
                            load: gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + name, function(rsrc) {
                                set.texture = rsrc.data;
                                resDone(s, false, null, rsrc);
                            }),
                            error: gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + name, function(err, rsrc) {
                                set.texture = null;
                                set._error = err;
                                resDone(s, false, err, rsrc);
                            })
                        });
                        gf.loader.load({
                            name: name,
                            type: 'texture',
                            src: resource.texturePath + set.image
                        });
                    })(set, s);
                }

                if(max === 0) gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);

                //for counting downloading resources, and tracking when all are done
                function addRes() { max++; }
                function resDone(i, layer, err, rsrc) {
                    done++;

                    if(layer) {
                        gf.event.unsubscribe(lhandles[i].load);
                        gf.event.unsubscribe(lhandles[i].error);
                    } else {
                        gf.event.unsubscribe(thandles[i].load);
                        gf.event.unsubscribe(thandles[i].error);
                    }

                    if(done >= max)
                        gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
                }
            });

            handles.error = gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, function(err, resource) {
                //gf.event.unsubscribe(handles.load);
                //gf.event.unsubscribe(handles.progress);
                //gf.event.unsubscribe(handles.error);

                gf.event.publish(gf.types.EVENT.LOADER_PROGRESS + '.' + resource._oldName, err, resource);
            });

            handles.progress = gf.event.subscribe(gf.types.EVENT.LOADER_PROGRESS + '.' + resource.name, function(pct, resource) {
                gf.event.publish(gf.types.EVENT.LOADER_PROGRESS + '.' + resource._oldName, pct, resource);
            });

            gf.loader.load(resource);
        }
    };
})();