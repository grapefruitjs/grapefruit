/**
 * Base Layer implementation, provides common functions for all Layer types
 *
 * @module gf
 * @class Layer
 */
gf.Layer = function(settings) {
    /**
     * The name of the layer
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = settings.name || '';

    /**
     * The size of the layer
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(1, 1)
     */
    this.size = settings.size ? gf.utils.ensureVector(settings.size) : new gf.Vector(settings.width || 1, settings.height || 1);

    /**
     * Half of the size of the layer
     *
     * @property hSize
     * @type Vector
     * @private
     */
    this.hSize = this.size.clone().divideScalar(2);

    /**
     * Offset of the layer
     *
     * @property offset
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.offset = settings.offset ? gf.utils.ensureVector(settings.offset) : new gf.Vector(settings.x || 0, settings.y || 0);

    /**
     * Scale of the layer
     *
     * @property scale
     * @type Number
     * @default 1
     */
    this.scale = settings.scale || 1;

    /**
     * Make the mesh wireframe
     *
     * @property wireframe
     * @type Boolean
     * @default false
     */
    this.wireframe = settings.wireframe || false;

    /**
     * Color of the layer
     *
     * @property color
     * @type Number
     * @default 0xffffff
     */
    this.color = (settings.color !== undefined ? settings.color : 0xffffff);

    /**
     * Texture of the layer
     *
     * @property texture
     * @type Texture
     * @default null
     */
    this.texture = settings.texture || null;

    /**
     * Opacity of the layer
     *
     * @property opacity
     * @type Number
     * @default 1
     */
    this.opacity = settings.opacity || 1;

    /**
     * The visibility of the layer
     *
     * @property visible
     * @type Boolean
     * @default true
     */
    this.visible = (settings.visible !== undefined ? settings.visible : true);

    this._createMesh();
};

gf.inherits(gf.Layer, Object, {
    _createMesh: function() {
        if(this._mesh) return;

        //create the shader material
        this._material = new THREE.MeshBasicMaterial({
            color: this.color,
            wireframe: this.wireframe,
            map: this.texture,
            opacity: this.opacity,
            transparent: (this.opacity !== 1) //if the opacity isn't 1.0, then this needs to be transparent
        });

        this._plane = new THREE.PlaneGeometry(
            this.size.x * this.scale,
            this.size.y * this.scale
        );

        this._mesh = new THREE.Mesh(this._plane, this._material);
        this._mesh.visible = this.visible;
        this._mesh.position.z = this.zIndex;
    }
});