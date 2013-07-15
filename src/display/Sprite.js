/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @class Sprite
 * @extends PIXI.Sprite
 * @uses EventEmitter
 * @constructor
 * @param texture {Texture} The texture to set the sprite to
 * @example
 *      var spr = new gf.Sprite(texture);
 */
gf.Sprite = function(tx) {
    PIXI.Sprite.call(this, tx);
    gf.EventEmitter.call(this);

    /**
     * The type of the sprite
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.Sprite.TYPE.NEUTRAL;

    /**
     * Whether or not the sprite is "alive", advisory only
     *
     * @property alive
     * @type Boolean
     * @default true
     */
    this.alive = true;

    /**
     * The mass of this sprite (if using physics), please use setMass to set this value
     *
     * @property mass
     * @type Number
     * @default 0
     * @readOnly
     */
    this.mass = 0;

    /**
     * The physics system that this sprite is a part of. This is advisory only
     * please use enablePhysics() or disablePhysics() and do not set this value
     * directly.
     *
     * @property physics
     * @type PhysicsSystem
     * @default null
     * @readOnly
     */
    this.physics = null;
};

gf.inherits(gf.Sprite, PIXI.Sprite, {
    /**
     * Enables physics for this sprite
     *
     * @method enablePhysics
     * @param system {PhysicsSystem} The system for the sprite to be in
     */
    enablePhysics: function(sys) {
        if(sys && this.physics !== sys) {
            if(this.physics)
                this.physics.remove(this);

            this.physics = sys;
        }

        this.physics.add(this);
    },
    /**
     * Disbales physics for this sprite
     *
     * @method disablePhysics
     */
    disablePhysics: function() {
        if(this.physics) {
            this.physics.remove(this);
        }
    },
    /**
     * Sets the mass of this sprite
     *
     * @method setMass
     * @param mass {Number} The new mass of the object
     */
    setMass: function(mass) {
        if(this.physics) {
            this.physics.setMass(this, mass);
        }
    },
    /**
     * Sets the velocity of this sprite
     *
     * @method setVelocity
     * @param velocity {Vector} The new velocity of the object
     */
    setVelocity: function(vel) {
        if(this.physics) {
            this.physics.setVelocity(this, gf.utils.ensureVector(vel));
        }
    },
    /**
     * Sets the rotation of this sprite
     *
     * @method setRotation
     * @param rotation {Number} The new rotation of the object in radians
     */
    setRotation: function(rads, skipPhysics) {
        this.rotation = rads;

        if(!skipPhysics && this.physics) {
            this.physics.setRotation(this, rads);
        }
    },
    /**
     * Sets the position of this sprite
     *
     * @method setPosition
     * @param x {Number}
     * @param y {Number}
     */
    setPosition: function(x, y, skipPhysics) {
        this.position.x = x;
        this.position.y = y;

        if(!skipPhysics && this.physics) {
            this.physics.setPosition(this, this.position);
        }
    },
    /**
     * Removes this sprite from the stage and the physics system
     *
     * @method destroy
     */
    destroy: function() {
        if(this.parent)
            this.parent.removeChild(this);

        if(this.physics)
            this.physics.remove(this);

    },
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
    onCollision: function(obj) {
        if(obj.type === gf.Sprite.TYPE.COLLECTABLE)
            obj.destroy();

        this.emit('collision', obj);
    }
});

/**
 * Sprite types
 *
 * @property TYPE
 * @type Object
 */
gf.Sprite.TYPE = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    FRIENDLY: 'friendly',
    NEUTRAL: 'neutral',
    COLLECTABLE: 'collectable',
    TILE: 'tile'
};

//Add event echos
['click', 'mousedown', 'mouseup', 'mouseupoutside', 'mouseover', 'mouseout', 'tap', 'touchstart', 'touchend', 'touchendoutside', 'mousemove'].forEach(function(evtname) {
    gf.Sprite.prototype[evtname] = function(e) {
        this.emit(evtname, e);
    };
});

/*
 * MOUSE Callbacks
 */

/**
 * A callback that is used when the users clicks on the sprite with their mouse
 * @event click
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user clicks the mouse down over the sprite
 * @event mousedown
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite
 * for this callback to be fired the mouse must have been pressed down over the sprite
 * @event mouseup
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite but is no longer over the sprite
 * for this callback to be fired, The touch must have started over the sprite
 * @event mouseupoutside
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse rolls over the sprite
 * @event mouseover
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse leaves the sprite
 * @event mouseout
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user moves the mouse while over the sprite
 * @event mousemove
 * @param interactionData {InteractionData}
 */


/*
 * TOUCH Callbacks
 */

/**
 * A callback that is used when the users taps on the sprite with their finger
 * basically a touch version of click
 * @event tap
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user touch's over the displayObject
 * @event touchstart
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases a touch over the displayObject
 * @event touchend
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the touch that was over the displayObject
 * for this callback to be fired, The touch must have started over the sprite
 * @event touchendoutside
 * @param interactionData {InteractionData}
 */