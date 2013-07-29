/**
 * Physics mixin. This will add physics capabilities to the class it mixes into.
 *
 * @class PhysicsTarget
 * @namespace gf
 * @constructor
 * @example
 *      function MyObject(clr) {
 *          gf.PhysicsTarget.call(this); //adds properties
 *          this.color = clr;
 *      }
 *
 *      gf.inherits(MyObject, Object, {
 *          something: function(s) {
 *          }
 *      });
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
     */
    this.onCollision = function(obj) {
        if(obj.type === gf.Sprite.TYPE.COLLECTABLE)
            obj.destroy();

        this.emit('collision', obj);
    };


    /**
     * Shows the physics body for the sprite
     *
     * @method showPhysics
     */
    this.showPhysics = function(size, color, alpha) {
        this._showHit = true;
        if(!this._phys || !this._phys.body || !this._phys.shape)
            return;

        if(size === undefined)
            size = 1;

        if(color === undefined)
            color = 0xFF00FF;

        if(alpha === undefined)
            alpha = 1;

        if(!this._hit) {
            this._hit = new PIXI.Graphics();
            this._hit.style = {
                size: size,
                color: color,
                alpha: alpha
            };

            this.parent.addChild(this._hit);
        }

        var shape = this._phys.shape,
            p = this._phys.body.p,
            g = this._hit;

        g.clear();
        g.lineStyle(g.style.size, g.style.color, g.style.alpha);

        //circle
        if(shape.type === 'circle') {
            var cx = shape.bb_l + ((shape.bb_r - shape.bb_l) / 2) + shape.c.x,
                cy = shape.bb_t + ((shape.bb_b - shape.bb_t) / 2) + shape.c.y;

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
        if(this._hit)
            this._hit.visible = false;
    };
};