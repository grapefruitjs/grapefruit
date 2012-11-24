(function() {
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
        load: function(resource, callbacks) {
            //do this so we can just call load, without having to type the long one
            if(resource instanceof Array) {
                gf.loader.loadResources.apply(gf.loader, arguments);
                return;
            }

            if(typeof callbacks == 'function')
                callbacks = { load: callbacks };

            callbacks = callbacks || {};

            var cached = gf.loader._getCached(resource);

            if(cached) {
                gf.resources[resource.name] = resource;
                if(callbacks.load)
                    callbacks.load(cached);

                return cached;
            }

            if(gf.loader._loaders[resource.type] && gf.loader._loaders[resource.type].load) {
                gf.loader._setCache(resource);
                gf.resources[resource.name] = resource;
                gf.loader._loaders[resource.type].load.apply(this, arguments);
            } else {
                //at this point we have no loader for this type
                throw new Error('Unknown resource type: ' + resource.type + ' for res');
            }
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
        loadResources: function(resources, callbacks) {
            if(typeof callbacks == 'function')
                callbacks = { complete: callbacks };

            callbacks = callbacks || {};

            var done = 0;

            for(var r = 0, rl = resources.length; r < rl; ++r) {
                if(callbacks.start) callbacks.start(resources[r]);

                gf.loader.load(resources[r], {
                    error: callbacks.error,
                    progress: callbacks.progress,
                    load: function() {
                        if(callbacks.load) callbacks.load.apply(this, arguments);

                        loadDone();
                    }
                });
            }

            function loadDone() {
                done++;

                if(done >= resources.length && callbacks.complete) {
                    callbacks.complete(resources);
                }
            }
        },
        //Privates for loaders only, not public use
        _loaders: {},
        _getCacheKey: function(resource) {
            return gf.util.b64.encode(resource.src + '_!_' + resource.type);
        },
        _getCached: function(resource) {
            return _cache[gf.loader._getCacheKey(resource)];
        },
        _setCache: function(resource) {
            return _cache[gf.loader._getCacheKey(resource)] = resource;
        },
        _get: function(url, dataType, progress, cb) {
            $.ajax({
                url: url,
                dataType: dataType,
                type: 'GET',
                error: function(jqXHR, textStatus, errorThrown) {
                    if(cb) cb(errorThrown || textStatus);
                },
                success: function(data, textStatus, jqXHR) {
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
        load: function(resource, callbacks) {
            resource.data = new Image();
            resource.data.addEventListener('load', function() {
                if(callbacks.load) callbacks.load(resource);
            }, false);
            resource.data.src = resource.src;
        }
    };

    //JSON and XML loaders
    gf.loader._loaders.json = gf.loader._loaders.xml = {
        load: function(resource, callbacks) {
            gf.loader._get(
                resource.src,
                resource.type,
                function(pct) { //progress
                    if(callbacks.progress) callbacks.progress(pct, resource);
                },
                function(err, data) {
                    if(err) {
                        if(callbacks.error) callbacks.error(err, resource);
                        return;
                    }

                    resource.data = data;
                    if(callbacks.load) callbacks.load(resource);
                }
            );
        }
    };

    //Texture loader
    gf.loader._loaders.texture = {
        load: function(resource, callbacks) {
            var tloader = new THREE.TextureLoader();
                    
            tloader.addEventListener('error', function(err) {
                if(callbacks.error) callbacks.error(err, resource);
            });

            tloader.addEventListener('load', function(evt) {
                resource.data = evt.content;
                if(callbacks.load) callbacks.load(resource);
            });

            tloader.load(resource.src);
        }
    };

    //World loader, loads a world JSON file and all of its resources listed within
    gf.loader._loaders.world = {
        load: function(resource, callbacks) {
            //set the type to json, and load it first
            resource.type = 'json';
            gf.loader.load(resource, {
                error: callbacks.error,
                progress: callbacks.progress,
                load: function() {
                    //set the resource back to world
                    resource.type = 'world';

                    var done = 0, max = 0;

                    //loop through each layer and load the sprites (objectgroup types)
                    for(var i = 0, il = resource.data.layers.length; i < il; ++i) {
                        var layer = resource.data.layers[i];
                        if(layer.type != gf.types.LAYER.OBJECT_GROUP) continue;

                        //loop through each object, and load the textures
                        for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                            var obj = layer.objects[o];
                            if(!obj.properties.spritesheet) continue;

                            (function(layer, obj) {
                                addRes();
                                gf.loader.load(
                                    {
                                        name: layer.name + '_' + obj.name + '_texture',
                                        type: 'texture',
                                        src: obj.properties.spritesheet
                                    },
                                    {
                                        error: function(err, rsrc) {
                                            obj.properties.texture = null;
                                            obj.properties._error = err;
                                            resDone();
                                        },
                                        load: function(rsrc) {
                                            obj.properties.texture = rsrc.data;
                                            resDone();
                                        }
                                    }
                                );
                            })(layer, obj);
                        }
                    }

                    //loop through each tileset and load the texture
                    for(var s = 0, sl = resource.data.tilesets.length; s < sl; ++s) {
                        var set = resource.data.tilesets[s];
                        if(!set.image) continue;

                        (function(set) {
                            addRes();
                            gf.loader.load(
                                {
                                    name: set.name + '_texture',
                                    type: 'texture',
                                    src: set.image
                                },
                                {
                                    error: function(err, rsrc) {
                                        set.texture = null;
                                        set._error = err;
                                        resDone();
                                    },
                                    load: function(rsrc) {
                                        set.texture = rsrc.data;
                                        resDone();
                                    }
                                }
                            )
                        })(set);
                    }

                    //for counting downloading resources, and tracking when all are done
                    function addRes() { max++; }
                    function resDone() {
                        done++;

                        if(done >= max) {
                            callbacks.load(resource);
                        }
                    }
                }
            });
        }
    };
})();