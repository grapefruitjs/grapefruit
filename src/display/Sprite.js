var EventEmitter = require('../utils/EventEmitter'),
    Rectangle = require('../math/Rectangle'),
    inherit = require('../utils/inherit'),
    PIXI = require('../vendor/pixi'),
    C = require('../constants');

/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @class Sprite
 * @extends <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Sprite.html">PIXI.Sprite</a>
 * @uses EventEmitter
 * @uses PhysicsTarget
 * @constructor
 * @param texture {Texture} The texture to set the sprite to
 * @example
 *      var spr = new gf.Sprite(texture);
 */
var Sprite = module.exports = function(tx) {
    PIXI.Sprite.call(this, tx);
    //gf.PhysicsTarget.call(this);
    EventEmitter.call(this);

    /**
     * The type of the sprite
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = C.SPRITE_TYPE.NEUTRAL;

    this.hitArea = this.hitArea || new Rectangle(0, 0, this.width, this.height);
};

inherit(Sprite, PIXI.Sprite, {
    /**
     * Removes this sprite from the stage and the physics system
     *
     * @method destroy
     */
    destroy: function() {
        this.disablePhysics();

        if(this.parent)
            this.parent.removeChild(this);
    }
});

//Add event echos
/*
['click', 'mousedown', 'mouseup', 'mouseupoutside', 'mouseover', 'mouseout', 'mousemove', 'tap', 'touchstart', 'touchend', 'touchendoutside'].forEach(function(evtname) {
    Sprite.prototype[evtname] = module.exports = function(e) {
        this.emit(evtname, e);
    };
});
*/

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
