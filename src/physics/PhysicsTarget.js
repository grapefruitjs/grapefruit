/**
 * Physics mixin. This will add physics capabilities to the class it mixes into.
 *
 * @class PhysicsTarget
 * @namespace gf
 * @constructor
 * @example
 *      function MyObject(clr) {
 *          this.color = clr;
 *      }
 *
 *      gf.inherits(MyObject, Object, {
 *          something: function(s) {
 *          }
 *      });
 *      gf.PhysicsTarget.call(MyObject.prototype); //adds properties
 *
 *      //then later
 *      var o = new MyObject('red');
 *      o.enablePhysics(game.physics);
 */
 gf.PhysicsTarget = function() {
    /**
     * The physics system that this object is a part of. This is advisory only
     * please use enablePhysics() or disablePhysics() and do not set this value
     * directly.
     *
     * @property _psystem
     * @type PhysicsSystem
     * @default null
     * @private
     * @readOnly
     */
    this._psystem = null;

    /**
     * The mass of this object, please use setMass to set this value
     *
     * @property mass
     * @type Number
     * @default 0
     * @readOnly
     */
    this.mass = 0;

    /**
     * The moment of inertia of this object, only set this before enabling physics (has no effect after enabling)
     *
     * @property inertia
     * @type Number
     * @default 0
     */
    this.inertia = 0;

    /**
     * Enables physics for this sprite
     *
     * @method enablePhysics
     * @param system {PhysicsSystem} The system for the sprite to be in
     */
    this.enablePhysics = function(sys) {
        if(sys && this._psystem !== sys) {
            if(this._psystem)
                this._psystem.remove(this);

            this._psystem = sys;
        }

        this._psystem.add(this);
    };

    /**
     * Disbales physics for this sprite
     *
     * @method disablePhysics
     */
    this.disablePhysics = function() {
        if(this._psystem) {
            this._psystem.remove(this);

            if(this._hit) {
                this._showHit = false;
                this.parent.removeChild(this._hit);
                this._hit = null;
            }
        }
    };

    /**
     * Sets the mass of this sprite
     *
     * @method setMass
     * @param mass {Number} The new mass of the object
     */
    this.setMass = function(mass) {
        if(this._psystem) {
            this._psystem.setMass(this, mass);
        }
    };

    /**
     * Sets the velocity of this sprite
     *
     * @method setVelocity
     * @param velocity {Vector} The new velocity of the object
     */
    this.setVelocity = function(vel) {
        if(this._psystem) {
            this._psystem.setVelocity(this, gf.utils.ensureVector(vel));
        }
    };

    /**
     * Sets the rotation of this sprite
     *
     * @method setRotation
     * @param rotation {Number} The new rotation of the object in radians
     */
    this.setRotation = function(rads) {
        this.rotation = rads;

        if(this._psystem) {
            this._psystem.setRotation(this, rads);
        }
    };

    /**
     * Sets the position of this sprite
     *
     * @method setPosition
     * @param x {Number}
     * @param y {Number}
     */
    this.setPosition = function(x, y) {
        this.position.x = x;
        this.position.y = y;

        if(this._psystem) {
            this._psystem.setPosition(this, this.position);
        }
    };

    /**
     * On Collision Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we destroy the collectable
     *      and if we collide with a solid tile we kill our velocity. This method will emit a
     *      'collision' event that you can listen for
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     * @param vec {Vector} Collision vector (for sensors this is normalized)
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {Sprite} Your physics shape that caused the collision
     */
    this.onCollision = function(obj, vec, colShape, myShape) {
        if(obj.type === gf.Sprite.TYPE.COLLECTABLE)
            obj.destroy();

        this.emit('collision', obj, vec, colShape, myShape);
    };

    /**
     * On Seperate Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we destroy the collectable
     *      and if we collide with a solid tile we kill our velocity. This method will emit a
     *      'collision' event that you can listen for
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {Sprite} Your physics shape that caused the collision
     */
    this.onSeparate = function(obj, colShape, myShape) {
        this.emit('separate', obj, colShape, myShape);
    };

    /**
     * Shows the physics body for the sprite
     *
     * @method showPhysics
     */
    this.showPhysics = function(style) {
        this._showHit = true;
        if(!this._phys || !this._phys.body || !this._phys.shape)
            return;

        //no graphics object created yet
        if(!this._hit) {
            this._hit = new PIXI.Graphics();

            this.parent.addChild(this._hit);
        }

        //pass a new style, or haven't defined one yet
        if(style || !this._hit.style) {
            style = this._setStyleDefaults(style);
            style.sensor = this._setStyleDefaults(style.sensor);

            this._hit.style = style;
        }

        var p = this._phys.body.p,
            g = this._hit,
            c = this._phys.customShapes;

        if(!this._hit.lastPos)
            this._hit.lastPos = new gf.Point();
        else if(this._hit.lastPos.x === p.x && this._hit.lastPos.y === p.y)
            return;

        this._hit.lastPos.x = p.x;
        this._hit.lastPos.y = p.y;

        g.clear();
        this._drawPhysicsShape(this._phys.shape, g, p);

        if(c) {
            for(var i = 0; i < c.length; ++i) {
                this._drawPhysicsShape(c[i], g, p);
            }
        }
    };

    this._setStyleDefaults = function(style) {
        style = style || {};
        style.size = style.size || 1;
        style.color = style.color || 0xff00ff;
        style.alpha = style.alpha || 1;

        return style;
    };

    this._drawPhysicsShape = function(shape, g, p) {
        var style = g.style;

        if(shape.sensor)
            style = style.sensor;

        g.lineStyle(style.size, style.color, style.alpha);

        //circle
        if(shape.type === 'circle') {
            var cx = shape.bb_l + ((shape.bb_r - shape.bb_l) / 2),
                cy = shape.bb_t + ((shape.bb_b - shape.bb_t) / 2);

            g.drawCircle(cx, cy, shape.r);
        }
        //polygon
        else {
            var sx = shape.verts[0],
                sy = shape.verts[1];

            g.moveTo(p.x + sx, p.y + sy);

            for(var i = 2; i < shape.verts.length; i+=2) {
                g.lineTo(
                    p.x + shape.verts[i],
                    p.y + shape.verts[i + 1]
                );
            }

            g.lineTo(p.x + sx, p.y + sy);
        }
    };

    /**
     * Hides the physics body for the sprite
     *
     * @method hidePhysics
     */
    this.hidePhysics = function() {
        this._showHit = false;
        if(this._hit) {
            this._hit.visible = false;
        }
    };
};