(function() {
    gf.Entity = gf.SceneObject.extend({
        //Properties that are defined in the `settings` object,
        //these can be specified in the properties of the object layer
        //in Tiled, and overriden on a per-object basis
        type: gf.types.ENTITY.NEUTRAL,

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

        //initializes a new entity with the start position (pos) and
        //the settings (defined in Tiled)
        init: function(pos, settings) {
            this._super(settings);

            this.createMesh();

            this.setPosition(this.pos);
        },
        createMesh: function() {

        }
    });
})();