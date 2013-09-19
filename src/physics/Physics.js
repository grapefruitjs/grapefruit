// Based heavily off of PhotonStorm's Phaser Arcade Physics, ChipmunkJS, and an IBM Article
// Phaser: https://github.com/photonstorm/phaser 
// ChipmunkJS: https://github.com/josephg/Chipmunk-js
// IBM Article: http://www.ibm.com/developerworks/library/wa-build2dphysicsengine/

var QuadTree = require('../math/QuadTree'),
    utils = require('../utils/utils'),
    C = require('../constants');

var Physics = module.exports = function(state) {
    this.state = state;

    /**
     * The maximum objects the quad tree will tolerate in a single quadrant
     *
     * @property maxObjects
     * @type Number
     */
    this.maxObjects = C.PHYSICS.MAX_QUAD_OBJECTS;

    /**
     * The maximum levels deep the quad tree will go to
     *
     * @property maxLevels
     * @type Number
     */
    this.maxLevels = C.PHYSICS.MAX_QUAD_LEVELS;

    /**
     * The QuadTree used to help detect likely collisions
     *
     * @property tree
     * @type QuadTree
     */
    this.tree = new QuadTree(state.world.bounds.clone(), this.maxObjects, this.maxLevels);

    /**
     * The bodies that have been added to this physics system
     *
     * @property tree
     * @type QuadTree
     */
    this.bodies = [];

    //some temp vars to prevent have to declare a lot
    this._result = false;
    this._total = 0;
};

utils.inherits(Physics, Object, {
    /**
     * Called each frame by the engine to calculate the quadtree, and update physical bodies
     *
     * @method update
     * @param deltaTime {Number} The delta in seconds since the last call
     */
    update: function(dt) {
        //clear quad tree
        this.tree.clear();

        //update bodies
        var bods = this.bodies;

        for(var i = 0, il = bods.length, body; i < il; ++i) {
            body = bods[i];

            body[i].computeVelocity(dt);
            body[i].update(dt);

            if(body.canCollide && body.sprite.visible) {
                this.tree.insert(body);
            }
        }
    },
    /**
     * Adds a sprite to the physics simulation
     *
     * @method addSprite
     * @param sprite {Sprite} The sprite to add to the simulation
     */
    addSprite: function(sprite) {
        this.bodies.push(sprite.body);
    },
    /**
     * Removes a sprite from the physics simulation
     *
     * @method removeSprite
     * @param sprite {Sprite} The sprite to remove from the simulation
     */
    removeSprite: function(sprite) {
        var i = this.bodies.indexOf(sprite.body);

        if(i !== -1)
            this.bodies.splice(i, 1);
    },
    /**
     * Checks for collisions between objects such as Sprites or Containers.
     *
     * @method collide
     * @param object1 {Sprite|Container|Tilemap} The first object to check
     * @param object2 {Sprite|Container|Tilemap} The first object to check
     * @param onCollision {Function} The callback to call whenever a collision occurs
     */
    collide: function(obj1, obj2, onCollision) {

    }
});
