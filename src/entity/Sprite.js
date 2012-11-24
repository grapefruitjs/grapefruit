(function() {
    gf.Sprite = gf.Entity.extend({
        /****************************************************************************
         * Properties that are defined in the `settings` object,
         * these can be specified in the properties of the object layer
         * in Tiled, and overriden on a per-object basis
         ****************************************************************************/
        //zindex in the scene
        zindex: 0,

        //visible on screen (do draw)
        visible: true,

        //size of the sprite (each frame)
        size: new THREE.Vector2(0, 0),

        //offset in the image to the first frame (in pixels)
        offset: new THREE.Vector2(0, 0),

        //number of frames accross x / y (calculated, not set)
        numFrames: new THREE.Vector2(0, 0),

        //opacity of the sprite
        opacity: 1.0,

        //image url to use as the texture
        image: '',

        //raw THREE.Texture instance loaded by the gf.loader
        texture: null,

        //initializes a new entity with the start position (pos) and the settings defined in Tiled
        init: function(pos, settings) {
            this._super(pos, settings);
        },
        //override Entity mesh with a sprite instead
        createMesh: function() {
            if(this.filtered) {
                this.texture.magFilter = THREE.LinearFilter;
                this.texture.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                this.texture.magFilter = THREE.NearestFilter;
                this.texture.minFilter = THREE.NearestMipMapNearestFilter;
            }

            this.numFrames.set(this.texture.image.width / this.size.x, this.texture.image.height / this.size.y);

            //setup wrapping of the texture
            this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
            //scale the texture to show only one frame
            this.texture.repeat.set(
                (1 / this.numFrames.x),
                (1 / this.numFrames.y)
            );
            //move the texture to the frame defined in offset
            this.texture.offset.x = (this.offset.x / this.texture.image.width);
            this.texture.offset.y = 1 - (this.size.y / this.texture.image.height) - (this.offset.y / this.texture.image.height); //convert a topleft offset to a bottomleft offset

            //create the geometry, material, and mesh objects
            this._geom = new THREE.PlaneGeometry(this.scaledSize.x, this.scaledSize.y);
            this._material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });
            this._mesh = new THREE.Mesh(this._geom, this._material);

            /*this._mesh =  new THREE.Sprite({
                name: this.name || '',
                map: this.texture,
                affectedByDistance: true,
                scaleByViewport: true,
                useScreenCoordinates: false
            });

            //set scale to be 1 / number of frames
            this._mesh.scale.set(this.scale, this.scale);

            //set the offset to the first frame
            this._mesh.uvOffset.set(
                1 - (1 / this.numFrames.x),
                1 - (1 / this.numFrames.y)
            );

            //uvScale
            this._mesh.uvScale.set(
                1 / this.numFrames.x,
                1 / this.numFrames.y
            );*/
        }
    });
})();