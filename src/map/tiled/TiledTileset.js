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
            this.tileproperties = settings.tileproperties || {};

            //massage normal
            gf.utils.each(this.tileproperties, function(k, v) {
                if(v.normal && !(v.normal instanceof THREE.Vector2))
                    v.normal = gf.utils.strToVec(v.normal);

                if(v.isCollidable == 'true') v.isCollidable = true;
                if(v.isBreakable == 'true') v.isBreakable = true;
            });
        },
        getTileProperties: function(tileId) {
            if(tileId === undefined) return null;

            tileId = tileId - this.firstgid;

            if(tileId < 0) return null;

            return this.tileproperties[tileId.toString()] ?
                    //get this value
                    this.tileproperties[tileId.toString()] :
                    //set this id to default values and cache
                    this.tileproperties[tileId.toString()] = {
                        isCollidable: false,
                        isBreakable: false,
                        type: gf.types.COLLISION.NONE
                    };
        }
    });
})();