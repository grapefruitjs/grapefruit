(function() {
    gf.Entity = gf.SceneObject.extend({
        //initializes a new entity with the start position (pos)
        //and properties (settings). Many of these properties can
        //be specified in Tiled.
        init: function(pos, settings) {
            /****************************************************************************
             * Properties that are defined in the `settings` object,
             * these can be specified in the properties of the object layer
             * in Tiled, and overriden on a per-object basis
             ****************************************************************************/
            this.type = gf.types.ENTITY.NEUTRAL;

            //scale of the entity
            this.scale = 1;

            //can be lifted by another entity
            this.isLiftable = false;

            //can be effected by bombs
            this.isExplodable = true;

            //can collide with other entities
            this.isCollidable = true;

            //can collide with the map when moving
            this.isMapCollidable = true;

            //is the entity visible
            this.isVisible = true;

            //is cutable by a sword
            this.isCutable = false;

            //will break the sprint of an entity that hits this one
            this.breakSprint = false;

            //maximum health of this entity
            this.maxHealth = 3;

            //current health of this entity
            this.health = 3;

            //you can still set these in Tiled by using "x|y" notation
            //velocity of the entity
            this.velocity = new THREE.Vector2(0, 0);

            //max velocity
            this.maxVelocity = new THREE.Vector2(10, 10);

            //acceleration of the entity when moving (units per second)
            this.accel = new THREE.Vector2(10, 10);

            //position of the entity
            this.pos = new THREE.Vector2(0, 0);

            //size of the hitbox
            this.hitSize = new THREE.Vector2(0, 0);

            //offset from the center to have the hitbox NOT IMPLEMENTED
            this.hitOffset = new THREE.Vector2(0, 0);

            //the name of this entitiy
            this.name = '';

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(settings);

            /****************************************************************************
             * Create the actual object for the scene
             ****************************************************************************/
            //if the hitbox size isn't set, use the same as normal size
            if(this.hitSize.x === 0 && this.hitSize.y === 0) this.hitSize = this.size.clone();

            //scale size vectors
            this.scaledSize = this.size.clone().multiplyScalar(this.scale);
            this.scaledHitSize = this.hitSize.clone().multiplyScalar(this.scale);

            //create main entity mesh
            this.createMesh();

            //only create a second mesh for the hitbox, if the size is different
            if(this.hitSize.equals(this.size))
                this._hitboxMesh = this._mesh;
            else
                this.createHitboxMesh();

            //set default position
            this.setPosition(this.pos);
        },
        createMesh: function() {
            this._materials = [];

            this._materials.push(new THREE.MeshBasicMaterial({ transparent: true }));

            //add outline material if needed
            if(gf.debug.showOutline) {
                this._materials.push(new THREE.MeshBasicMaterial({
                    color: gf.debug.outlineColor,
                    wireframe: true,
                    wireframeLinewidth: 5
                }));
            }

            this._geom = new THREE.PlaneGeometry(this.scaledSize.x, this.scaledSize.y);
            this._mesh = THREE.SceneUtils.createMultiMaterialObject(this._geom, this._materials);//new THREE.Mesh(this._geom, this._materials);

            //set visible
            //this._mesh.visible = this.isVisible;
        },
        createHitboxMesh: function() {
            this._hitboxMaterial = new THREE.MeshBasicMaterial({
                color: gf.debug.hitboxColor,
                wireframe: gf.debug.showHitbox,
                wireframeLinewidth: 5
            });

            this._hitboxGeom = new THREE.PlaneGeometry(this.scaledHitSize.x, this.scaledHitSize.y);

            this._hitboxMesh = new THREE.Mesh(this._hitboxGeom, this._hitboxMaterial);
        },
        //from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
        intersects: function(entity)  {
            return (Math.abs(this._hitboxMesh.position.x - entity._hitboxMesh.position.x) * 2 < (this.size.x + entity.size.x)) && 
                    (Math.abs(this._hitboxMesh.position.y - entity._hitboxMesh.position.y) * 2 < (this.size.y + entity.size.y));
        },
        addToScene: function(scene) {
            this._super(scene);

            //if(this._outlineMesh) { scene.add(this._outlineMesh); console.log('adding outline to scene'); }
            if(this._hitboxMesh) scene.add(this._hitboxMesh);
        },
        moveEntity: function() {
            //clamp velocity
            this.velocity.x = Math.max(-this.maxVelocity.x, Math.min(this.maxVelocity.x, this.velocity.x));
            this.velocity.y = Math.max(-this.maxVelocity.y, Math.min(this.maxVelocity.y, this.velocity.y));

            //TODO: Map collision checks
            //this.setPosition(this.velocity);
            this._mesh.translateX(this.velocity.x);
            this._mesh.translateY(this.velocity.y);

            if(this._hitboxMesh) {
                this._hitboxMesh.translateX(this.velocity.x);
                this._hitboxMesh.translateY(this.velocity.y);
            }
        },
        _doSetPos: function(x, y, z) {
            this._super(x, y, z);

            //if(this._outlineMesh) this._outlineMesh.position.set(x, y, z);

            if(this._hitboxMesh) {
                this._hitboxMesh.position.set(x, y, z);
                if(this.hitOffset) {
                    this._hitboxMesh.translateX(this.hitOffset.x);
                    this._hitboxMesh.translateY(this.hitOffset.y);
                }
            }
        },
        //collision event, param is the object it collides with
        onCollision: function(obj) {}
    });
})();