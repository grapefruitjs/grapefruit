(function(Z) {
    Z.Tileset = Class.extend({
        init: function(set) {
            this.size = new THREE.Vector2(set.imagewidth, set.imageheight);
            this.tileSize = new THREE.Vector2(set.tilewidth, set.tileheight);
            this.texture = Z.loader.loadTexture(set.image);

            this.firstgid = set.firstgid;
            this.name = set.name;
            this.margin = set.margin;
            this.spacing = set.spacing;

            this.properties = set.properties;
        }
    });
})(window.ZJS);