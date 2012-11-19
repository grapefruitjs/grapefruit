(function(Z) {
    //Shaders
    var tilemapVS = [
        //'varying vec2 texCoord;',
        'varying int tileIndex;',

        'unform vec2 layerSize;',
        'unform vec2 tilesetSize;',
        'unform vec2 inverseTilesetSize;',

        //'unform vec2 tileSize;',       //not used in vertex shader
        'unform vec2 inverseTileSize;',

        //'unform sampler2D tileset;',   //not used in vertex shader
        'unform int[] tiles;',
        //'unform int repeatTiles;',     //not used in vertex shader

        'void main(void) {',
        '   vec2 texCoord = (uv * layerSize) * inverseTilesetSize;', //calculate the coord on this map
        '   tileIndex = tiles[(pixelCoord.x + (pixelCoord.y * (tilesetSize.x * inverseTileSize.x)))];', //get the index of this coord
        '   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);', //hand this position to WebGL
        '}'
    ].join("\n");

    var tilemapFS = [
        //"precision highp float;",

        //'varying vec2 texCoord;',
        'varying int tileIndex;',

        //'unform vec2 layerSize;',      //not used in fragment shader
        'unform vec2 tilesetSize;',
        'unform vec2 inverseTilesetSize;',

        //'unform vec2 tileSize;',       //not used in fragment shader
        //'unform vec2 inverseTileSize;',//not used in fragment shader

        'unform sampler2D tileset;',
        //'unform int[] tiles;',         //not used in fragment shader
        //'unform int repeatTiles;',     //not used in fragment shader

        'void main(void) {',
        '   vec2 tileCoord = vec2(tileIndex % tilesetSize.x, tileIndex * inverseTilesetSize.x);', //convert tile index into a coordinate
        "   vec4 tile = texture2D(tileset, tileCoord);",/* * inverseTilesetSize*/ //load this tile of the tileset
        "   gl_FragColor = tile;", //hand our texture to WebGL
        '}'
    ].join("\n");

    //Each tilemap layer is just a Plane entity with the map drawn on it
    Z.TilemapLayer = Z.SceneObject.extend({
        init: function(layer, tilewidth, tileheight, tilesets) {
            this._super();
            this.parent = parent;

            //set options
            this.data = layer.data;
            this.name = layer.name;
            this.size = new THREE.Vector2(layer.width, layer.height);
            this.tileSize = new THREE.Vector2(tilewidth, tileheight);
            //this.offset = new THREE.Vector2(layer.x, layer.y);

            this.opacity = layer.opacity;
            this.visible = layer.visible;

            this.repeat = false;
            this.filtered = false;

            //set maps
            this.tileset = tilesets[0];

            //cache image data
            //this.tilesetData = util.getImageData(this.tileset.image);

            //Setup Tileset
            this.tileset.wrapS = this.tileset.wrapT = THREE.ClampToEdgeWrapping;
            //this.tileset.flipY = false;
            if(this.filtered) {
                this.tileset.magFilter = THREE.LinearFilter;
                this.tileset.minFilter = THREE.LinearFilter;//THREE.LinearMipMapLinearFilter;
            } else {
                this.tileset.magFilter = THREE.NearestFilter;
                this.tileset.minFilter = THREE.NearestFilter;//THREE.NearestMipMapNearestFilter;
            }

            //setup shader uniforms
            //
            //Types:
            // i - integer
            // f - float
            // c - color
            // t - Texture
            // tv - array of Textures
            // m4 - Matrix4
            // m4v - array of Matrix4s
            // iv - array of integers with 3 x N size
            // iv1 - array of integers
            // fv - array of floats with 3 x N size
            // fv1 - array of floats
            // v2 - Vector2
            // v3 - Vector3
            // v4 - Vector4
            // v2v - array of Vector2s
            // v3v - array of Vector3s
            // v4v - array of Vector4s
            this._uniforms = {
                layerSize:          { type: 'v2', value: this.size },
                tilesetSize:        { type: 'v2', value: new THREE.Vector2(this.tileset.image.width, this.tileset.image.height) },
                inverseTilesetSize: { type: 'v2', value: new THREE.Vector2(1 / this.tileset.image.width, 1 / this.tileset.image.height) },

                tileSize:           { type: 'v2', value: this.tileSize },
                inverseTileSize:    { type: 'v2', value: new THREE.Vector(1 / this.tileSize.x, 1 / this.tileSize.y) },

                tileset:            { type: 't', value: this.tileset },
                tiles:              { type: 'iv1', value: this.data },
                repeatTiles:        { type: 'i', value: this.repeat ? 1 : 0 }
            };

            //create the shader material
            this._material = new THREE.ShaderMaterial({
                uniforms: this._uniforms,
                vertexShader: tilemapVS,
                fragmentShader: tilemapFS,
                transparent: (this.opacity === 0)
            });

            this._plane = new THREE.PlaneGeometry(
                this.tilemap.image.width * this.tileSize * this.tileScale,
                this.tilemap.image.height * this.tileSize * this.tileScale
            );

            this._mesh = new THREE.Mesh(this._plane, this._material);
            this._mesh.z = this.zIndex;
        }
    });
})(window.ZJS);