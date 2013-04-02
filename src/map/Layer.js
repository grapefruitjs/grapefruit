gf.Layer = function(settings) {
    //name of this layer
    this.name = settings.name || '';

    //size of this layer
    this.size = new gf.Vector(settings.width || 1, settings.height || 1);

    //half size
    this.hSize = this.size.clone().divideScalar(2);

    //offset of this layer
    this.offset = new gf.Vector(settings.x || 0, settings.y || 0);

    //scale of this layer
    this.scale = settings.scale || 1;

    //wireframe this mesh?
    this.wireframe = settings.wireframe || false;

    //color of this layer
    this.color = (settings.color !== undefined ? settings.color : 0xffffff);

    //texture of the layer
    this.texture = settings.texture || null;

    //opacity of this layer
    this.opacity = settings.opacity || 1;
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