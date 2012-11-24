(function() {
    gf.Entity = gf.SceneObject.extend({
        //Properties that are defined in the `settings` object,
        //these can be specified in the properties of the object layer
        //in Tiled, and overriden on a per-object basis
        type: gf.types.ENTITY.NEUTRAL,

        //scale of the entity
        scale: 1,

        //can be lifted by another entity
        isLiftable: false,

        //can be effected by bombs
        isExplodable: true,

        //will break the sprint of an entity that hits this one
        breakSprint: false,

        //can collide with other entities
        isCollidable: true,

        //can collide with the map when moving
        isMapCollidable: true,

        //maximum health of this entity
        maxHealth: 3,

        //current health of this entity
        health: 3,

        //you can still set these in Tiled by using "x|y" notation
        //velocity of the entity
        velocity: new THREE.Vector2(0, 0),

        //acceleration of the entity when moving
        accel: new THREE.Vector2(250, 250),

        //position of the entity
        pos: new THREE.Vector2(0, 0),

        //size of the entity
        size: new THREE.Vector2(1, 1),

        //size of the hitbox
        hitSize: new THREE.Vector2(0, 0),

        //offset from the center to have the hitbox NOT IMPLEMENTED
        hitOffset: new THREE.Vector2(0, 0),

        //the name of this entitiy
        name: '',

        //initializes a new entity with the start position (pos) and
        //the settings (defined in Tiled)
        init: function(pos, settings) {
            this._super(settings);

            this.scaledSize = this.size.clone().multiplyScalar(this.scale);
            this.scaledHitSize = this.hitSize.clone().multiplyScalar(this.scale);

            this.createMesh();

            if(gf.debug.showOutline) this.createOutlineMesh();

            if(gf.debug.showHitbox) this.createHitboxMesh();

            this.setPosition(this.pos);
        },
        createMesh: function() {
            this._material = new THREE.MeshBasicMaterial({ transparent: true });
            this._geom = new THREE.PlaneGeometry(this.scaledSize.x, this.scaledSize.y);
            this._mesh = new THREE.Mesh(this._geom, this._material);
        },
        createOutlineMesh: function() {
            this._outlineMaterial = new THREE.MeshBasicMaterial({
                color: gf.debug.outlineColor,
                wireframe: true,
                wireframeLinewidth: 5
            });

            this._outlineGeom = new THREE.PlaneGeometry(this.scaledSize.x, this.scaledSize.y);

            this._outlineMesh = new THREE.Mesh(this._outlineGeom, this._outlineMaterial);
        },
        createHitboxMesh: function() {
            this._hitboxMaterial = new THREE.MeshBasicMaterial({
                color: gf.debug.hitboxColor,
                wireframe: true,
                wireframeLinewidth: 5
            });

            this._hitboxGeom = new THREE.PlaneGeometry(this.scaledHitSize.x, this.scaledHitSize.y);

            this._hitboxMesh = new THREE.Mesh(this._hitboxGeom, this._hitboxMaterial);
        }
    });
})();