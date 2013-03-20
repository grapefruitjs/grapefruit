(function() {
    gf.Map = gf.SceneObject.extend({
        init: function(settings) {
            //size of the map
            this.size = new gf.Vector(settings.width, settings.height);

            //orientation of the map
            this.orientation = settings.orientation; //only orthogonal supported

            //layers of the map
            this.layers = [];
        },
        //virtual add layer
        addLayer: function(layer) {
            this.layers.push(layer);

            return this;
        },
        getLayer: function(id) {
            if(typeof id == 'number')
                return this.layers[id];

            if(typeof id == 'string') {
                var lyr = null, self = this;
                this.eachLayer(function(layer) {
                    if(layer.name == id) {
                        lyr = layer;
                        return false;
                    }
                });

                return lyr;
            }

            return this;
        },
        //add all layers to the scene
        addToScene: function(scene) {
            this.scene = scene;

            //incase they add layers first, then add the map to the scene
            this.eachLayer(function(layer) {
                if(!layer.scene || layer.scene != scene)
                    layer.addToScene(scene);
            });

            return this;
        },
        //apply an iterator to each layer
        eachLayer: function(fn) {
            for(var i = 0, il = this.layers.length; i < il; ++i) {
                if(fn.call(this, this.layers[i], i, this.layers) === false)
                    break;
            }

            return this;
        }
    });
})();