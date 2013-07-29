/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @class Sprite
 * @extends <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Sprite.html">PIXI.Sprite</a>
 * @uses gf.EventEmitter
 * @uses gf.PhysicsTarget
 * @namespace gf
 * @constructor
 * @param texture {Texture} The texture to set the sprite to
 * @example
 *      var spr = new gf.Sprite(texture);
 */
gf.Sprite = function(tx) {
    PIXI.Sprite.call(this, tx);

    /**
     * The type of the sprite
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.Sprite.TYPE.NEUTRAL;
};

gf.inherits(gf.Sprite, PIXI.Sprite, {
    /**
     * Removes this sprite from the stage and the physics system
     *
     * @method destroy
     */
    destroy: function() {
        if(this.physics)
            this.disablePhysics();

        if(this.parent)
            this.parent.removeChild(this);
    }
});
gf.PhysicsTarget.call(gf.Sprite.prototype);
gf.EventEmitter.call(gf.Sprite.prototype);

/**
 * Sprite types
 *
 * @property TYPE
 * @type Object
 * @static
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
['click', 'mousedown', 'mouseup', 'mouseupoutside', 'mouseover', 'mouseout', 'mousemove', 'tap', 'touchstart', 'touchend', 'touchendoutside'].forEach(function(evtname) {
    gf.Sprite.prototype[evtname] = function(e) {
        this.emit(evtname, e);
    };
});

/*
 * MOUSE Callbacks
 */

/**
 * A callback that is used when the users clicks on the sprite with their mouse
 *
 * @event click
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user clicks the mouse down over the sprite
 *
 * @event mousedown
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite
 * for this callback to be fired the mouse must have been pressed down over the sprite
 *
 * @event mouseup
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite but is no longer over the sprite
 * for this callback to be fired, The touch must have started over the sprite
 *
 * @event mouseupoutside
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse rolls over the sprite
 *
 * @event mouseover
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse leaves the sprite
 *
 * @event mouseout
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user moves the mouse while over the sprite
 *
 * @event mousemove
 * @param interactionData {InteractionData}
 */

/*
 * TOUCH Callbacks
 */

/**
 * A callback that is used when the users taps on the sprite with their finger
 * basically a touch version of click
 *
 * @event tap
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user touch's over the sprite
 *
 * @event touchstart
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases a touch over the sprite
 *
 * @event touchend
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the touch that was over the sprite
 * for this callback to be fired, The touch must have started over the sprite
 *
 * @event touchendoutside
 * @param interactionData {InteractionData}
 */