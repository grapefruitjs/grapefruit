(function() {
    //Shaders
    var vShader = [
        'varying vec2 pixelCoord;',
        'varying vec2 texCoord;',

        'uniform vec2 mapSize;',
        'uniform vec2 inverseLayerSize;',

        //'uniform vec2 tileSize;',
        'uniform vec2 inverseTileSize;',

        //'uniform sampler2D tileIds;'
        //'uniform int repeatTiles;',
        //'uniform float opacity;',
        'uniform float bias;',
        'uniform float inverseScale;',

        //tileset maps
        //'uniform sampler2D textures[NUM_TILESETS];',
        //'uniform float firstgids[NUM_TILESETS];',
        //'uniform float lastgids[NUM_TILESETS];',
        //'uniform vec2 sizes[NUM_TILESETS];',
        //'uniform vec2 inverseSizes[NUM_TILESETS];',
        //'uniform vec2 numTiles[NUM_TILESETS];',

        'void main(void) {',
        '   pixelCoord = (uv * mapSize) - ((1.0 - bias) * inverseScale);', //this bias fixes a strange wrapping error
        '   texCoord = pixelCoord * inverseLayerSize * inverseTileSize;', //calculate the coord on this map
        '   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);', //hand this position to WebGL
        '}'
    ].join('\n');

    var fShader = [
        //"precision highp float;",

        'varying vec2 pixelCoord;',         
        'varying vec2 texCoord;',

        //'uniform vec2 mapSize;',
        //'uniform vec2 inverseLayerSize;',

        'uniform vec2 tileSize;',
        //'uniform vec2 inverseTileSize;',

        'uniform sampler2D tileIds;',
        'uniform int repeatTiles;',
        'uniform float opacity;',
        'uniform float bias;',
        'uniform float inverseScale;',

        //tileset maps
        'uniform sampler2D textures[NUM_TILESETS];',
        'uniform float firstgids[NUM_TILESETS];',
        'uniform float lastgids[NUM_TILESETS];',
        //'uniform vec2 sizes[NUM_TILESETS];',
        'uniform vec2 inverseSizes[NUM_TILESETS];',
        'uniform vec2 numTiles[NUM_TILESETS];',

        'float decode24(vec3 rgb) {',
        '   const vec3 bit_shift = vec3((256.0*256.0), 256.0, 1.0);',
        '   float fl = dot(rgb, bit_shift);', //shift the values appropriately
        '   return fl * 255.0;', //denormalize the value
        '}',

        'vec4 getColor(float tileValue) {',
        '   for(int i = 0; i < NUM_TILESETS; ++i) {',
        '       if(tileValue >= firstgids[i] && tileValue <= lastgids[i]) {', //choose the right tileset, and use it
        '           tileValue -= (firstgids[i] - 1.0);',
        '           if(tileValue <= 1.0) { break; }',

        '           vec2 tileLoc = vec2(mod(tileValue, numTiles[i].x), tileValue / numTiles[i].x);', //convert the ID into x, y coords
        '           tileLoc.x = tileLoc.x - (bias * inverseScale);', //the bias fixes a precision error by making the later floor go down by 1
        '           tileLoc.y = numTiles[i].y - tileLoc.y;', //convert the coord from bottomleft to topleft

        '           vec2 offset = (floor(tileLoc) * tileSize) + (bias * inverseScale);', //offset in the tileset; the bias removes the spacing between tiles
        '           vec2 coord = mod(pixelCoord, tileSize);', //coord of the tile

        '           return texture2D(textures[i], (offset + coord) * inverseSizes[i]);', //grab tile from tileset
        '       }',
        '   }',

        '   return vec4(0.0, 0.0, 0.0, 0.0);', //tileValue was 0 for gid was bad
        '}',

        'void main(void) {',
        '   if(repeatTiles == 0 && (texCoord.x < 0.0 || texCoord.x > 1.0 || texCoord.y < 0.0 || texCoord.y > 1.0)) { discard; }',

        '   vec3 tileId = texture2D(tileIds, texCoord).rgb;', //grab this tileId from the layer data
        //'   tileId.rgb = tileId.bgr;', //if some hardware is different endian (little?) then we need to flip here
        '   float tileValue = decode24(tileId);', //decode the normalized vec3 into the float ID

        '   vec4 color = getColor(tileValue);',
        '   if(color.r == 0.0 && color.g == 0.0 && color.b == 0.0 && color.a == 0.0) { discard; }',

        '   color.a -= (1.0 - opacity);', //subtract the opacity of this layer
        '   if(color.a < 0.0) { color.a = 0.0; }',
        '   gl_FragColor = color;',
        '}'
    ].join('\n');

    //Each tilemap layer is just a Plane object with the map drawn on it
    gf.TiledLayer = gf.Layer.extend({
        init: function(layer, tileSize, tilesetMaps) {
            this._super(layer);

            //set options
            this.data = layer.data;
            this.dataBuffer = new ArrayBuffer(layer.data.length * 3);
            this.data8 = new Uint8Array(this.dataBuffer);
            this.tileSize = tileSize;

            this.repeat = false;
            this.filtered = false;

            this.tilesetMaps = tilesetMaps;

            //pack our layer data array into an 8-bit uint array
            for (var i = 0, y = 0, il = layer.data.length; i < il; ++i, y += 3) {
                var value = layer.data[i];

                //this.data[y + 0] = (value & 0xff000000) >> 24;
                this.data8[y + 0] = (value & 0x00ff0000) >> 16;
                this.data8[y + 1] = (value & 0x0000ff00) >> 8;
                this.data8[y + 2] = (value & 0x000000ff);
            }

            this.dataTex = new THREE.DataTexture(
                                this.data8,
                                this.size.x, //width
                                this.size.y, //height
                                THREE.RGBFormat, //format
                                THREE.UnsignedByteType, //type
                                THREE.UVMapping, //mapping
                                THREE.ClampToEdgeWrapping, //wrapS
                                THREE.ClampToEdgeWrapping, //wrapT
                                THREE.NearestFilter, //magFilter
                                THREE.NearestMipMapNearestFilter //minFilter
                            );
            this.dataTex.needsUpdate = true;

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
                mapSize:            { type: 'v2', value: new THREE.Vector2(this.size.x * this.tileSize.x, this.size.y * this.tileSize.y) },
                inverseLayerSize:   { type: 'v2', value: new THREE.Vector2(1 / this.size.x, 1 / this.size.y) },

                tileSize:           { type: 'v2', value: this.tileSize },
                inverseTileSize:    { type: 'v2', value: new THREE.Vector2(1 / this.tileSize.x, 1 / this.tileSize.y) },

                tileIds:            { type: 't', value: this.dataTex },
                repeatTiles:        { type: 'i', value: this.repeat ? 1 : 0 },
                opacity:            { type: 'f', value: this.opacity },
                bias:               { type: 'f', value: 0.002 },
                inverseScale:       { type: 'f', value: 1 / this.scale },

                //tileset maps
                textures:           { type: 'tv', value: this.tilesetMaps.textures },
                firstgids:          { type: 'fv1', value: this.tilesetMaps.firstgids },
                lastgids:           { type: 'fv1', value: this.tilesetMaps.lastgids },
                //sizes:              { type: 'v2v', value: this.tilesetMaps.sizes },
                inverseSizes:       { type: 'v2v', value: this.tilesetMaps.inverseSizes },
                numTiles:           { type: 'v2v', value: this.tilesetMaps.numTiles }

                //firstGid:           { type: 'f', value: this.tileset.firstgid },
                //tilesets:           { type: 't', value: this.tilesets.texture },
                //numTiles:           { type: 'v2', value: new THREE.Vector2(this.tileset.texture.image.width / this.tileSize.x, this.tileset.texture.image.height / this.tileSize.y) },
                //inverseTilesetSize: { type: 'v2', value: new THREE.Vector2(1 / this.tileset.texture.image.width, 1 / this.tileset.texture.image.height) },
            };

            if(gf.debug.accessTiledUniforms)
                gf.debug.tiledUniforms.push(this._uniforms);

            this.vShader = vShader;
            this.fShader = '#define NUM_TILESETS ' + this.tilesetMaps.textures.length + '\n' + fShader;

            //create the shader material
            this._material = new THREE.ShaderMaterial({
                uniforms: this._uniforms,
                vertexShader: this.vShader,
                fragmentShader: this.fShader,
                transparent: (this.opacity !== 1) //if the opacity isn't 1.0, then this needs to be transparent
            });

            this._plane = new THREE.PlaneGeometry(
                this.size.x * this.tileSize.x * this.scale,
                this.size.y * this.tileSize.y * this.scale
            );

            this._mesh = new THREE.Mesh(this._plane, this._material);
            this._mesh.visible = this.visible;
            this._mesh.position.z = this.zIndex;
        },
        //get ID of tile at specified location
        getTileId: function(x, y, realCoords) {
            pos = x instanceof THREE.Vector2 ? x.clone() : new THREE.Vector2(x, y);
            //if not realCoords, they are world coords; and must be converted
            if(!realCoords) {
                //do some division to make position be in "tiles from center" instead of "units from center"
                pos.divideScalar(this.scale);
                pos.x = pos.x / this.tileSize.x;
                pos.y = pos.y / this.tileSize.y;

                //inverse the Y so the next addSelf will actually subtract from Y
                pos.y = -pos.y;

                //pos is now the offset from the center, to make it from the top left
                //we add half the size of the tilemap to x (and sub from y since we inverted)
                pos.addSelf(this.hSize);

                pos.x = ~~pos.x; //floor
                pos.y = ~~pos.y;

                //pos.x -= 1;
                //pos.y = Math.abs(pos.y) - 1;
            }

            //calculate index
            var idx = Math.floor(pos.x + (pos.y * (this.size.x)));

            return this.data[idx];
        },
        hide: function() {
            this.visible = this._mesh.visible = false;

            return this;
        },
        show: function() {
            this.visible = this._mesh.visible = true;

            return this;
        },
        //skip parent creating mesh
        _createMesh: function() {}
    });
})();