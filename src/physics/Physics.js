// Based heavily off of PhotonStorm's Phaser Arcade Physics, and ChipmunkJS (mostly the former)
// Phaser: https://github.com/photonstorm/phaser 
// ChipmunkJS: https://github.com/josephg/Chipmunk-js

var QuadTree = require('../math/QuadTree'),
    Rectangle = require('../math/Rectangle'),
    Container = require('../display/Container'),
    Sprite = require('../display/Sprite'),
    Tilemap = require('../tilemap/Tilemap'),
    inherit = require('../utils/inherit'),
    math = require('../math/math'),
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
    this._overlap = 0;
    this._maxOverlap = 0;

    this._velocity1 = 0;
    this._velocity2 = 0;
    this._newVelocity1 = 0;
    this._newVelocity2 = 0;

    this._average = 0;

    this._mapData = null;
    this._potentials = null;

    this._bounds1 = new Rectangle();
    this._bounds2 = new Rectangle();
};

inherit(Physics, Object, {
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
        if(obj1 && obj2) {
            //sprite collisions
            if(obj1 instanceof Sprite) {
                if(obj2 instanceof Sprite) {
                    this._collideSpriteVsSprite(obj1, obj2, onCollision);
                }
                else if(obj2 instanceof Tilemap) {
                    this._collideSpriteVsTilemap(obj1, obj2, onCollision);
                }
                else if(obj2 instanceof Container) {
                    this._collideSpriteVsContainer(obj1, obj2, onCollision);
                }
            }
            //tilemap collisions
            else if(obj1 instanceof Tilemap) {
                if(obj2 instanceof Sprite) {
                    this._collideSpriteVsTilemap(obj2, obj1, onCollision);
                }
                else if(obj2 instanceof Container) {
                    this._collideContainerVsTilemap(obj2, obj1, onCollision);
                }
            }
            //container collisions
            else if(obj1 instanceof Container) {
                if(obj2 instanceof Sprite) {
                    this._collideSpriteVsContainer(obj2, obj1, onCollision);
                }
                else if(obj2 instanceof Tilemap) {
                    this._collideContainerVsTilemap(obj1, obj2, onCollision);
                }
                else if(obj2 instanceof Container) {
                    this._collideContainerVsContainer(obj1, obj2, onCollision);
                }
            }
        }
    },
    /**
     * The core separation function to separate two physics bodies.
     *
     * @method separate
     * @param body1 {Body} The first Body to separate
     * @param body2 {Body} The second Body to separate
     * @returns {Boolean} Returns true if the bodies were separated, otherwise false.
     */
    separate: function(b1, b2) {
        this._result = (this._separateX(b1, b2) || this._separateY(b1, b2));

        //make sure the sprite is updated after the collision solve
        if(this._result) {
            b1.syncSprite();
            b2.syncSprite();
        }
    },
    _hit: function(obj1, obj2, cb) {
        this._total++;

        if(cb)
            cb(obj1, obj2);
    },
    _separateX: function(b1, b2) {
        //static bodies don't collide with eachother
        if(b1.type === C.PHYSICS_TYPE.STATIC && b2.type === C.PHYSICS_TYPE.STATIC)
            return;

        //delta of the two body locations
        this._overlap = 0;

        var dx1 = b1.deltaX(),
            dx2 = b2.deltaX();

        //if they have moved the same amount, no overlap
        if(dx1 === dx2)
            return false;

        //update first body
        this._bounds1.x = b1.x - (dx1 > 0 ? dx1 : 0);
        this._bounds1.y = b1.lastPos.y;
        this._bounds1.width = b1.width + (dx1 > 0 ? dx1 : -dx1);
        this._bounds1.height = b1.height;

        //update second body
        this._bounds2.x = b2.x - (dx2 > 0 ? dx2 : 0);
        this._bounds2.y = b2.lastPos.y;
        this._bounds2.width = b2.width + (dx2 > 0 ? dx2 : -dx2);
        this._bounds2.height = b2.height;

        //check for overlap (detect collisions)
        if(this._bounds1.overlap(this._bounds2)) {
            this._maxOverlap = math.abs(dx1) + math.abs(dx2) + C.PHYSICS.OVERLAP_BIAS;

            //if they did overlap to the right
            if(dx1 > dx2) {
                this._overlap = b1.right - b2.x;

                //check collision flags, if touching set such
                if((this._overlap > this._maxOverlap) || !(b1.allowCollide & C.DIRECTION.RIGHT) || !(b2.allowCollide & C.DIRECTION.LEFT)) {
                    this._overlap = 0;
                } else {
                    b1.touching |= C.DIRECTION.RIGHT;
                    b2.touching |= C.DIRECTION.LEFT;
                }
            }
            //if they did overlap to the left
            else if(dx1 < dx2) {
                this._overlap = b1.x - b2.width - b2.x;

                if((-this._overlap > this._maxOverlap) || !(b1.allowCollide & C.DIRECTION.LEFT) || !(b2.allowCollide & C.DIRECTION.RIGHT)) {
                    this._overlap = 0;
                } else {
                    b1.touching |= C.DIRECTION.LEFT;
                    b2.touching |= C.DIRECTION.RIGHT;
                }
            }
        }

        //adjust positions and velocity according to collisions (solve collisions)
        if(this._overlap) {
            b1.overlap.x = b2.overlap.x = this._overlap;

            //TODO: Flag to prevent out solve?

            //set velocities
            this._velocity1 = b1.velocity.x;
            this._velocity2 = b2.velocity.x;

            //static entities do not move
            if(b1.type !== C.PHYSICS_TYPE.STATIC && b2.type !== C.PHYSICS_TYPE.STATIC) {
                this._overlap *= 0.5;

                b1.x = b1.x - this._overlap;
                b2.x += this._overlap;

                this._newVelocity1 = math.sqrt((this._velocity2 * this._velocity2 * b2.mass) / b1.mass) * ((this._velocity2 > 0) ? 1 : -1);
                this._newVelocity2 = math.sqrt((this._velocity1 * this._velocity1 * b1.mass) / b2.mass) * ((this._velocity1 > 0) ? 1 : -1);
                this._average = (this._newVelocity1 + this._newVelocity2) * 0.5;
                this._newVelocity1 -= this._average;
                this._newVelocity2 -= this._average;

                b1.velocity.x = this._average + (this._newVelocity1 * b1.bounce.x);
                b2.velocity.x = this._average + (this._newVelocity2 * b1.bounce.x);
            }
            //if body 1 isn't static
            else if(b1.type !== C.PHYSICS_TYPE.STATIC) {
                b1.x -= this._overlap;
                b1.velocity.x = this._velocity2 - (this._velocity1 * b1.bounce.x);
            }
            //if body 2 isn't static
            else if(b2.type !== C.PHYSICS_TYPE.STATIC) {
                b2.x += this._overlap;
                b2.velocity.x = this._velocity1 - (this._velocity2 * b2.bounce.x);
            }

            return true;
        }

        return false;
    },
    _separateY: function(b1, b2) {
        //static bodies don't collide with eachother
        if(b1.type === C.PHYSICS_TYPE.STATIC && b2.type === C.PHYSICS_TYPE.STATIC)
            return;

        //delta of the two body locations
        this._overlap = 0;

        var dy1 = b1.deltaY(),
            dy2 = b2.deltaY();

        //if they have moved the same amount, no overlap
        if(dy1 === dy2)
            return false;

        //update first body
        this._bounds1.x = b1.x;
        this._bounds1.y = b1.y - (dy1 > 0 ? dy1 : 0);
        this._bounds1.width = b1.width;
        this._bounds1.height = b1.height + math.abs(dy1);

        //update second body
        this._bounds2.x = b2.x;
        this._bounds2.y = b2.y - (dy2 > 0 ? dy2 : 0);
        this._bounds2.width = b2.width;
        this._bounds2.height = b2.height + math.abs(dy2);

        //check for overlap (detect collisions)
        if(this._bounds1.overlap(this._bounds2)) {
            this._maxOverlap = math.abs(dy1) + math.abs(dy2) + C.PHYSICS.OVERLAP_BIAS;

            //if they did overlap down
            if(dy1 > dy2) {
                this._overlap = b1.bottom - b2.y;

                //check collision flags, if touching set such
                if((this._overlap > this._maxOverlap) || !(b1.allowCollide & C.DIRECTION.DOWN) || !(b2.allowCollide & C.DIRECTION.UP)) {
                    this._overlap = 0;
                } else {
                    b1.touching |= C.DIRECTION.DOWN;
                    b2.touching |= C.DIRECTION.UP;
                }
            }
            //if they did overlap up
            else if(dy1 < dy2) {
                this._overlap = b1.y - b2.height - b2.y;

                if((-this._overlap > this._maxOverlap) || !(b1.allowCollide & C.DIRECTION.UP) || !(b2.allowCollide & C.DIRECTION.DOWN)) {
                    this._overlap = 0;
                } else {
                    b1.touching |= C.DIRECTION.UP;
                    b2.touching |= C.DIRECTION.DOWN;
                }
            }
        }

        //adjust positions and velocity according to collisions (solve collisions)
        if(this._overlap) {
            b1.overlap.y = b2.overlap.y = this._overlap;

            //TODO: Flag to prevent out solve?

            //set velocities
            this._velocity1 = b1.velocity.y;
            this._velocity2 = b2.velocity.y;

            //static entities do not move
            if(b1.type !== C.PHYSICS_TYPE.STATIC && b2.type !== C.PHYSICS_TYPE.STATIC) {
                this._overlap *= 0.5;

                b1.y = b1.y - this._overlap;
                b2.y += this._overlap;

                this._newVelocity1 = math.sqrt((this._velocity2 * this._velocity2 * b2.mass) / b1.mass) * ((this._velocity2 > 0) ? 1 : -1);
                this._newVelocity2 = math.sqrt((this._velocity1 * this._velocity1 * b1.mass) / b2.mass) * ((this._velocity1 > 0) ? 1 : -1);
                this._average = (this._newVelocity1 + this._newVelocity2) * 0.5;
                this._newVelocity1 -= this._average;
                this._newVelocity2 -= this._average;

                b1.velocity.y = this._average + (this._newVelocity1 * b1.bounce.y);
                b2.velocity.y = this._average + (this._newVelocity2 * b1.bounce.y);
            }
            //if body 1 isn't static
            else if(b1.type !== C.PHYSICS_TYPE.STATIC) {
                b1.y -= this._overlap;
                b1.velocity.y = this._velocity2 - (this._velocity1 * b1.bounce.y);

                //special case for things like being on a moving platform
                if(b2.carry && dy1 > dy2) {
                    b1.x += b2.deltaX();
                }
            }
            //if body 2 isn't static
            else if(b2.type !== C.PHYSICS_TYPE.STATIC) {
                b2.y += this._overlap;
                b2.velocity.y = this._velocity1 - (this._velocity2 * b2.bounce.y);

                //special case for things like being on a moving platform
                if(b1.carry && dy1 < dy2) {
                    b2.x += b1.deltaX();
                }
            }

            return true;
        }

        return false;
    },
    _collideSpriteVsSprite: function(sprite1, sprite2, onCollision) {
        this.separate(sprite1.body, sprite2.body);

        if(this._result) {
            this._hit(sprite1, sprite2, onCollision);
        }
    },
    _collideSpriteVsTilemap: function(sprite, tilemap, onCollision) {
        this._mapData = tilemap.collisionLayer.getTileOverlaps(sprite);

        for(var i = 0, il = this._mapData.length; i < il; ++i) {
            this._hit(sprite, this._mapData[i].tile, onCollision);
        }
    },
    _collideContainerVsTilemap: function(container, tilemap, onCollision) {
        if(container.first._iNext) {
            var node = container.first._iNext;

            do {
                if(node instanceof Sprite)
                    this.collideSpriteVsTilemap(node, tilemap, onCollision);
                //else if(node instanceof Container)
                //    this._collideContainerVsTilemap(node, tilemap, onCollision);

                node = node._iNext;
            } while(node !== container.last._iNext);
        }
    },
    _collideSpriteVsContainer: function(sprite, container, onCollision) {
        this._potentials = this.tree.retrieve(sprite);

        for(var i = 0, il = this._potentials.length; i < il; ++i) {
            if(this._potentials[i].sprite._container === container) {
                this.separate(sprite.body, this._potentials[i]);

                if(this._result) {
                    this._hit(sprite, container, onCollision);
                }
            }
        }
    },
    _collideContainerVsContainer: function(container1, container2, onCollision) {
        if(container1.first._iNext) {
            var node = container1.first._iNext;

            do {
                if(node instanceof Sprite)
                    this.collideSpriteVsGroup(node, container2, onCollision);

                node = node._iNext;
            } while (node !== container1.last._iNext);
        }
    }
});
