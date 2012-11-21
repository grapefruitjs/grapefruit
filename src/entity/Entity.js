(function(Z) {
    Z.Entity = Z.SceneObject.extend({
        //Properties that are defined in the `settings` object,
        //these can be specified in the properties of the object layer
        //in Tiled, and overriden on a per-object basis
        type: Z.types.ENTITY.NEUTRAL,

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

        //velocity of the entity
        velocity: new THREE.Vector2(0, 0),

        //acceleration of the entity when moving
        accel: new THREE.Vector2(250, 250),

        //maximum health of this entity
        maxHealth: 3,

        //current health of this entity
        health: 3,

        //initializes a new entity with the start position (pos) and
        //the settings (defined in Tiled)
        init: function(pos, settings) {
        }
    });
})(window.ZJS);