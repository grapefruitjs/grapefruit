(function() {
    //Shaders
    var vShader = [
        'varying vec2 pixelCoord;',
        'varying vec2 texCoord;',

        'uniform vec2 layerSize;',
        'uniform vec2 inverseLayerSize;',
        'uniform vec2 tilesetSize;',
        'uniform vec2 inverseTilesetSize;',

        'uniform vec2 tileSize;',
        'uniform vec2 inverseTileSize;',
        //'uniform vec2 numTiles;',     //not used in vertex shader
        'uniform float scale;',

        //'uniform sampler2D tileset;', //not used in vertex shader
        //'uniform sampler2D tileIds;', //not used in vertex shader
        //'uniform int repeatTiles;',   //not used in vertex shader

        'void main(void) {',
        '   pixelCoord = (uv * layerSize) * tileSize * scale;', //pixel we are at
        '   texCoord = pixelCoord * inverseLayerSize * inverseTileSize;', //calculate the coord on this map
        '   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);', //hand this position to WebGL
        '}'
    ].join('\n');

    var fShader = [
        //"precision highp float;",

        'varying vec2 pixelCoord;',         
        'varying vec2 texCoord;',

        //'uniform vec2 layerSize;',    //not used in fragment shader
        'uniform vec2 tilesetSize;',
        'uniform vec2 inverseTilesetSize;',

        'uniform vec2 tileSize;',
        'uniform vec2 inverseTileSize;',
        'uniform vec2 numTiles;',
        'uniform float scale;',

        'uniform sampler2D tileset;',
        'uniform sampler2D tileIds;',
        //'uniform int repeatTiles;',   //not used in fragment shader

        'highp float decode32(highp vec4 rgba) {',
        '   const vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);',
        //'   const vec4 bit_shift = vec4(1.0, 1.0/256.0, 1.0/(256.0*256.0), 1.0/(256.0*256.0*256.0));',
        //'   const vec4 bit_shift = vec4((256.0*256.0*256.0), (256.0*256.0), 256.0, 1.0);',
        '   float depth = dot(rgba, bit_shift);',
        '   return depth;',
        '}',

        'void main(void) {',
        '   vec4 tileId = texture2D(tileIds, texCoord);', //grab this tileId from the layer data
        '   tileId.rgba = tileId.abgr;', //flip flop due to endianess
        '   float tileValue = decode32(tileId);', //decode the vec4 into the float ID
        '   vec2 tileLoc = vec2(mod(tileValue, numTiles.y), tileValue / numTiles.y);', //convert the ID into x, y coords
        '   vec2 coord = floor(tileLoc * 256.0) * tileSize;', //coord in the tileset
        '   vec2 offset = mod(pixelCoord, tileSize);', //how much to draw
        '   gl_FragColor = texture2D(tileset, (coord + offset) * inverseTilesetSize);', //grab tile from tilset
        '}'
    ].join('\n');

    //Each tilemap layer is just a Plane object with the map drawn on it
    gf.TilemapLayer = gf.SceneObject.extend({
        init: function(layer, tileSize, tilesets) {
            this._super();
            //this.parent = parent;

            //set options
            this.dataBuffer = new ArrayBuffer(layer.data.length * 4);
            this.data = new Uint8Array(this.dataBuffer);
            this.name = layer.name;
            this.size = new THREE.Vector2(layer.width, layer.height);
            this.tileSize = tileSize;
            this.offset = new THREE.Vector2(layer.x, layer.y);

            this.opacity = layer.opacity;
            this.visible = layer.visible;

            this.repeat = false;
            this.filtered = false;
            this.scale = 1.0;

            //set maps
            this.tileset = tilesets[0].texture;

            //copy layer data array into our Uint8Array, taking note that
            //the layer.data array is of 32 bit ints, not 8 bit ints
            for (var i = 0, y = 0, il = layer.data.length; i < il; ++i, y += 4) {
                var value = layer.data[i];

                this.data[y + 0] = (value & 0x000000ff);
                this.data[y + 1] = (value & 0x0000ff00) >> 8;
                this.data[y + 2] = (value & 0x00ff0000) >> 16;
                this.data[y + 3] = (value & 0xff000000) >> 24;
            }

            this.dataTex = new THREE.DataTexture(
                                this.data,
                                this.data.length, //width
                                1, //height
                                THREE.RGBAFormat, //format
                                THREE.UnsignedByteType, //type
                                THREE.UVMapping, //mapping
                                THREE.ClampToEdgeWrapping, //wrapS
                                THREE.ClampToEdgeWrapping, //wrapT
                                THREE.NearestFilter, //magFilter
                                THREE.NearestMipMapNearestFilter //minFilter
                            );
            this.dataTex.needsUpdate = true;
            //cache image data
            //this.tilesetData = util.getImageData(this.tileset.image);

            //Setup Tileset
            this.tileset.wrapS = this.tileset.wrapT = THREE.ClampToEdgeWrapping;
            //this.tileset.flipY = false;
            if(this.filtered) {
                this.tileset.magFilter = THREE.LinearFilter;
                this.tileset.minFilter = THREE.LinearMipMapLinearFilter;//THREE.LinearFilter;
            } else {
                this.tileset.magFilter = THREE.NearestFilter;
                this.tileset.minFilter = THREE.NearestMipMapNearestFilter;//THREE.NearestFilter;
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
            this._uniforms = window._uniforms = {
                layerSize:          { type: 'v2', value: this.size },
                inverseLayerSize:   { type: 'v2', value: new THREE.Vector2(1 / this.size.x, 1 / this.size.y) },
                tilesetSize:        { type: 'v2', value: new THREE.Vector2(this.tileset.image.width, this.tileset.image.height) },
                inverseTilesetSize: { type: 'v2', value: new THREE.Vector2(1 / this.tileset.image.width, 1 / this.tileset.image.height) },

                tileSize:           { type: 'v2', value: this.tileSize },
                inverseTileSize:    { type: 'v2', value: new THREE.Vector2(1 / this.tileSize.x, 1 / this.tileSize.y) },
                numTiles:           { type: 'v2', value: new THREE.Vector2(this.tileset.image.width / this.tileSize.x, this.tileset.image.height / this.tileSize.y) },
                scale:              { type: 'f', value: 1 / this.scale },

                tileset:            { type: 't', value: this.tileset },
                tileIds:            { type: 't', value: this.dataTex },
                repeatTiles:        { type: 'i', value: this.repeat ? 1 : 0 }
            };

            //add tiles array size
            //this.fShader = fShader;
            //this.vShader = vShader;

            //create the shader material
            this._material = new THREE.ShaderMaterial({
                uniforms: this._uniforms,
                vertexShader: vShader,
                fragmentShader: fShader,
                transparent: (this.opacity === 0)
            });/*
            gf.resources.lightworld_image.data.magFilter = THREE.NearestFilter;
            gf.resources.lightworld_image.data.minFilter = THREE.NearestMipMapNearestFilter;
            this._material = new THREE.MeshBasicMaterial({ map: gf.resources.lightworld_image.data });*/

            this._plane = new THREE.PlaneGeometry(
                this.size.x * this.tileSize.x,
                this.size.y * this.tileSize.y
            );

            this._mesh = new THREE.Mesh(this._plane, this._material);
            this._mesh.z = this.zIndex;
        }
    });
})();