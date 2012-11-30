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

            this.properties = settings.properties;
        }
    });
})();