(function() {
    gf.TiledTileset = Class.extend({
        init: function(settings) {
            this.size = new THREE.Vector2(settings.imagewidth, settings.imageheight);
            this.tileSize = new THREE.Vector2(settings.tilewidth, settings.tileheight);
            this.texture = settings.texture;

            this.name = settings.name;
            this.margin = settings.margin;
            this.spacing = settings.spacing;

            this.numTiles = new THREE.Vector2(
                ~~((this.texture.image.width - this.margin) / (this.tileSize.x + this.spacing)),
                ~~((this.texture.image.height - this.margin) / (this.tileSize.y + this.spacing))
            );
            this.firstgid = settings.firstgid;
            this.lastgid = this.firstgid + ( ((this.numTiles.x * this.numTiles.y) - 1) || 0);

            this.properties = settings.properties || {};
            this.tileproperties = settings.tileproperties || {};

            this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
            //this.texture.flipY = false;
            if(this.properties.filtered) {
                this.texture.magFilter = THREE.LinearFilter;
                this.texture.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                this.texture.magFilter = THREE.NearestFilter;
                this.texture.minFilter = THREE.NearestMipMapNearestFilter;
            }

            //massage normal
            gf.utils.each(this.tileproperties, function(k, v) {
                if(v.normal && !(v.normal instanceof THREE.Vector2))
                    v.normal = gf.utils.ensureVector(v.normal);

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