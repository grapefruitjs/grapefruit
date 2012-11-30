(function() {
    gf.TiledTileset = Class.extend({
        init: function(settings) {
            this.size = new THREE.Vector2(settings.imagewidth, settings.imageheight);
            this.tileSize = new THREE.Vector2(settings.tilewidth, settings.tileheight);
            this.texture = settings.texture;

            this.firstgid = settings.firstgid;
            this.name = settings.name;
            this.margin = settings.margin;
            this.spacing = settings.spacing;

            this.properties = settings.properties || {};

            //massage normal
            gf.utils.each(this.properties, function(k, v) {
                if(v.normal && !(v.normal instanceof THREE.Vector2))
                    v.normal = gf.utils.strToVec(v.normal);
            });
        },
        getTileProperties: function(tileId) {
            if(!tileId) return null;

            return this.properties[tileId.toString()] ?
                    //get this value
                    this.properties[tileId.toString()] :
                    //set this id to default values and cache
                    this.properties[tileId.toString()] = {
                        isCollidable: false,
                        isBreakable: false,
                        type: gf.types.COLLISION.NONE
                    };
        }
    });
})();