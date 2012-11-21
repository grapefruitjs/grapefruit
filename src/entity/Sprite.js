(function() {
    gf.Sprite = gf.Entity.extend({
        /****************************************************************************
         * Properties that are defined in the `settings` object,
         * these can be specified in the properties of the object layer
         * in Tiled, and overriden on a per-object basis
         ****************************************************************************/
        //scale of the sprite image
        scale: 1,

        //zindex in the scene
        zindex: 0,

        //visible on screen (do draw)
        visible: true,

        //offset of the image
        offset: null,

        //opacity of the sprite
        opacity: 1.0,

        //use screen coords or world coords
        screenCoords: false,

        //image url to use as the texture
        image: '',

        //raw THREE.Texture instance loaded by the gf.loader
        texture: null,

        //size of the sprite (each frame)
        size: new THREE.Vector2(0, 0),

        //number of frames accross x and y (calculated not set in Tiled)
        numFrames: new THREE.Vector2(0, 0),

        //initializes a new entity with the start position (pos) and the settings defined in Tiled
        init: function(pos, settings) {
            this._super(pos, settings);
        },
        //override Entity mesh with a sprite instead
        createMesh: function() {
            this.numFrames.set(this.texture.image.width / this.size.x, this.texture.image.height / this.size.y);

            this._mesh =  new THREE.Sprite({
                map: this.texture,
                useScreenCoordinates: this.screenCoords
            });

            //set scale to be 1 / number of frames
            this._mesh.scale.set(
                1 / this.numFrames.x,
                1 / this.numFrames.y
            );

            //set the offset to the first frame
            this._mesh.uvOffset.set(
                1 - (1 / this.numFrames.x),
                1 - (1 / this.numFrames.y)
            );

            //uvScale
            this._mesh.uvScale.set(
                1 / this.numFrames.x,
                1 / this.numFrames.y
            );
        }
    });
})();