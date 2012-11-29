(function() {
    //Features TODO:
    // * Methods (https://github.com/obiot/melonJS/blob/master/src/entity/entity.js)
    //      - flipX
    //      - flipY
    //      - doWalk
    //      - doClimb
    //      - doJump
    //      - forceJump
    //      - checkSlope
    //      - updateMovement (slopes/breakable tiles)
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
            //can collide with other entities
            this.isCollidable = true;

            //can collide with the map when moving
            this.isMapCollidable = true;

            //is the entity visible
            this.isVisible = true;

            //is an entity
            this.isEntity = true;

            //maximum health of this entity
            this.maxHealth = 3;

            //current health of this entity
            this.health = 3;

            //you can still set these in Tiled by using "x|y" notation
            //velocity of the entity
            this.velocity = new THREE.Vector2(0, 0);

            //max velocity to cap the entity at
            this.maxVelocity = new THREE.Vector2(1000, 1000);

            //acceleration of the entity when moving (units per second)
            this.accel = new THREE.Vector2(250, 250);

            //size of the hitbox
            this.hitSize = new THREE.Vector2(0, 0);

            //offset from the center to have the hitbox NOT IMPLEMENTED
            this.hitOffset = new THREE.Vector2(0, 0);

            //the name of this entitiy
            this.name = '';

            //friction to apply to this entities movement
            this.friction = gf.game.friction != undefined ? gf.game.friction : new THREE.Vector2(0, 0);

            //gravity of the world
            this.gravity = gf.game.gravity != undefined ? gf.game.gravity : 0.98;

            //entity alive
            this.alive = true;

            //entity falling (read only)
            this.falling = false;

            //entity jumping (read only)
            this.jumping = false;

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(settings);

            /****************************************************************************
             * Create the actual object for the scene
             ****************************************************************************/
            //if the hitbox size isn't set, use the same as normal size
            if(this.hitSize.x === 0 && this.hitSize.y === 0)
                this.hitSize = this.size.clone();

            //scale size vectors
            this.scaledSize = this.size.clone().multiplyScalar(this.scale);
            this.scaledHitSize = this.hitSize.clone().multiplyScalar(this.scale);

            //create main entity mesh
            this._createMesh();

            //create a second mesh for the hitbox
            this._createHitboxMesh();

            //set default position
            this.setPosition(pos);
        },
        //calculates distance between this object and another
        distanceTo: function(obj) {
            var dx = this._hitboxMesh.position.x - entity._hitboxMesh.position.x,
                dy = this._hitboxMesh.position.y - entity._hitboxMesh.position.y;

            return Math.sqrt(dx*dx + dy*dy);
        },
        //computes the velocity taking into account gravity, friction, etc
        computeVelocity: function(vel) {
            //apply gravity
            if(this.gravity) {
                vel.y += !this.onladder ? (this.gravity * gf.game._delta) : 0;

                //check if falling/jumping
                this.falling = (vel.y > 0);
                this.jumping = this.falling ? false : this.jumping;
            }

            //apply friction
            if(this.friction.x) vel.x = gf.utils.applyFriction(vel.x, this.friction.x);
            if(this.friction.y) vel.y = gf.utils.applyFriction(vel.y, this.friction.y);

            //cap velocity
            if(vel.x) vel.x = gf.utils.clamp(vel.x, -this.maxVelocity.x, this.maxVelocity.x);
            if(vel.y) vel.y = gf.utils.clamp(vel.y, -this.maxVelocity.y, this.maxVelocity.y);
        },
        //from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
        intersects: function(entity)  {
            return (Math.abs(this._hitboxMesh.position.x - entity._hitboxMesh.position.x) * 2 < (this.hitSize.x + entity.hitSize.x)) && 
                    (Math.abs(this._hitboxMesh.position.y - entity._hitboxMesh.position.y) * 2 < (this.hitSize.y + entity.hitSize.y));
        },
        checkCollision: function(entity) {
            //response vector
            var p = new me.Vector2d(0, 0);

            //check if hitboxes intersect
            if (this.intersects(entity)) {
                //compute delta between this & entity
                var dx = this._hitboxMesh.position.x - entity._hitboxMesh.position.x,
                    dy = this._hitboxMesh.position.y - entity._hitboxMesh.position.y;

                //compute penetration depth for both axis
                p.x = dx / 2;
                p.y = dy / 2;

                //check and "normalize" axis
                /*if (p.x < p.y) {
                    p.y = 0;
                    p.x = dx < 0 ? -p.x : p.x;
                } else {
                    p.x = 0;
                    p.y = dy < 0 ? -p.y : p.y;
                }*/
            }

            return p;
        },
        addToScene: function(scene) {
            this._super(scene);

            if(this._hitboxMesh) scene.add(this._hitboxMesh);
        },
        removeFromScene: function(scene) {
            this._super(scene);

            if(this._hitboxMesh) scene.remove(this._hitboxMesh);
        },
        moveEntity: function(vel) {
            //optionally override current speed
            if(vel) this.velocity.set(vel.x, vel.y);

            if(this.velocity.isZero()) return;

            //apply gravity, friction, etc to this velocity
            this.computeVelocity(this.velocity);

            //TODO: check for map collision here
            var collision = { x: false, y: false }; //gf.game.checkMapCollision(this._hitboxMesh, this.velocity);

            //update flags
            this.onladder = false;

            //collision on y axis
            if(collision.y) {
                this.onladder = collision.yprop.isLadder;

                //going down, collision with the floor
                if (collision.y > 0) {
                    var hitboxBottom = this._hitboxMesh.position.y - this._hitboxMesh.geometry.height;

                    if(collision.yprop.isSolid || (collision.yprop.isPlatform && (hitboxBottom - 1 <= collision.ytile.position.y))) {
                        //adjust position to the corresponding tile
                        this.setPosition(this._mesh.position.x, Math.floor(this._mesh.position.y));
                        this.velocity.y = this.falling ? collision.ytile.pos.y - hitboxBottom : 0;
                        this.falling = false;
                    }
                    /*else if (collision.yprop.isSlope && !this.jumping) {
                        // we stop falling
                        this.checkSlope(collision.ytile, collision.yprop.isLeftSlope);
                        this.falling = false;
                    }
                    else if (collision.yprop.isBreakable) {
                        if (this.canBreakTile) {
                            // remove the tile
                            me.game.currentLevel.clearTile(collision.ytile.col, collision.ytile.row);
                            this.onTileBreak();
                        }
                        else {
                            // adjust position to the corresponding tile
                            this.pos.y = ~~this.pos.y;
                            this.vel.y = (this.falling) ?collision.ytile.pos.y - this.collisionBox.bottom: 0;
                            this.falling = false;
                        }
                    }*/
                }
                //going up, collision with ceiling
                else if(collision.y < 0) {
                    if(!collision.yprop.isPlatform && !collision.yprop.isLadder) {
                        this.falling = true;
                        this.velocity.y = 0;
                    }
                }
            }

            //collision on x axis
            if(collision.x) {
                this.onladder = collision.xprop.isLadder;

                if(collision.xprop.isSolid) {
                    this.velocity.x = 0;
                }
            }

            //update the entity position
            this._mesh.translateX(this.velocity.x);
            this._mesh.translateY(this.velocity.y);

            //also update the hitbox mesh if it is different
            if(this._hitboxMesh) {
                this._hitboxMesh.position.x += this.velocity.x;
                this._hitboxMesh.position.y += this.velocity.y;
                //translate doesn't seem to work
                //this._hitboxMesh.translateX(this.velocity.x);
                //this._hitboxMesh.translateY(this.velocity.y);
            }

            //onMove event
            this.onMove(this.velocity);

            //emit movement
            gf.event.publish(gf.types.EVENT.ENTITY_MOVE + '.' + this.id, this.velocity);

            return collision;
        },
        //On Collision Event
        // called when this object is collided into by another, by default if something collides with
        // a collectable entity we remove the collectable
        //vec - Collision Vector (THREE.Vector2)
        //obj - Colliding object (gf.Entity)
        onCollision: function(vec, obj) {
            if(this.collidable && this.type == gf.types.ENTIY.COLLECTABLE)
                gf.game.removeObject(this);
        },

        //On Move Event
        // called when this entity moves
        //vel - Velocity the entity moved (THREE.Vector2)
        onMove: function(vel) {},

        //On Tile Break Event
        // called when a tile is broken
        //tile - the tile that is broken
        onTileBreak: function(tile) {},

        //Privates
        _doSetPos: function(x, y, z) {
            this._super(x, y, z);

            if(this._hitboxMesh) {
                this._hitboxMesh.position.set(x, y, z);
                if(this.hitOffset) {
                    this._hitboxMesh.position.x += this.hitOffset.x;
                    this._hitboxMesh.position.y += this.hitOffset.y;
                    //translate doesn't seem to work
                    //this._hitboxMesh.translateX(this.hitOffset.x);
                    //this._hitboxMesh.translateY(this.hitOffset.y);
                }
            }
        },
        _createMesh: function() {
            if(this._mesh) return;

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
        _createHitboxMesh: function() {
            if(this._hitboxMesh) return;

            this._hitboxMaterial = new THREE.MeshBasicMaterial({
                color: gf.debug.hitboxColor,
                wireframe: gf.debug.showHitbox,
                wireframeLinewidth: 5
            });

            this._hitboxGeom = new THREE.PlaneGeometry(1, 1);

            this._hitboxMesh = new THREE.Mesh(this._hitboxGeom, this._hitboxMaterial);
            this._hitboxMesh.scale.set(this.scaledHitSize.x, this.scaledHitSize.y);
        },
    });
})();