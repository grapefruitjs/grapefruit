var EventEmitter = require('../utils/EventEmitter'),
    PhysicsTarget = require('../physics/PhysicsTarget'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    PIXI = require('../vendor/pixi');

/**
 * The base display object, that anything being put on the screen inherits from
 * Container or Sprite at some point. This class extends PIXI's DisplayObjectContainer.
 *
 * @class Container
 * @extends [PIXI.DisplayObjectContainer](http://www.goodboydigital.com/pixijs/docs/classes/DisplayObjectContainer.html)
 * @uses EventEmitter
 * @uses PhysicsTarget
 * @constructor
 */
var Container = function(settings) {
    PIXI.DisplayObjectContainer.call(this);
    EventEmitter.call(this);
    PhysicsTarget.call(this);

    //mixin user's settings
    utils.setValues(this, settings);

    //Add these properties in so that all objects can see them in the docs
    //these properties are inherited from PIXI.DisplayObjectContainer
    //most of these blocks are copied straight from PIXI source

    /**
     * [read-only] The of children of this object.
     * @property children {Array}
     * @readOnly
     */

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     * @property position
     * @type Point
     */

    /**
     * The scale factor of the object.
     *
     * @property scale
     * @type Point
     */

    /**
     * The rotation of the object in radians.
     *
     * @property rotation
     * @type Number
     */

    /**
     * The opacity of the object.
     *
     * @property alpha
     * @type Number
     */

    /**
     * The visibility of the object.
     *
     * @property visible
     * @type Boolean
     */

    /**
     * [read-only] The display object that contains this display object.
     *
     * @property parent
     * @type DisplayObject
     * @readOnly
     */

    /**
     * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
     *
     * @property stage
     * @type Stage
     * @readOnly
     */

    /**
     * This is the defined area that will pick up mouse / touch events. It is null by default.
     * Setting it is a neat way of optimising the hitTest function that the interactionManager
     * will use (as it will not need to hit test all the children)
     *
     * @property hitArea
     * @type Rectangle|Polygon|Circle|Ellipse
     */

    /**
     * Wether or not the object will handle mouse events
     *
     * @property interactive
     * @type Boolean
     * @default false
     */
};

inherit(Container, PIXI.DisplayObjectContainer, {
    /**
     * Sets the container to visible = true
     *
     * @method show
     * @return {Container} Returns itself.
     * @chainable
     */
    show: function() {
        this.visible = true;
        return this;
    },
    /**
     * Sets the container to visible = false
     *
     * @method hide
     * @return {Container} Returns itself.
     * @chainable
     */
    hide: function() {
        this.visible = false;
        return this;
    },
    /**
     * Adds a child to the container and returns the child
     *
     * @method addChild
     * @param child {Container|Sprite} Any container or sprite
     * @return {Container|Sprite} The child that was added
     */
    addChild: function(child) {
        PIXI.DisplayObjectContainer.prototype.addChild.apply(this, arguments);

        return child;
    },

    /**
     * Adds a child to the object at a specified index. If the index is out of bounds an error will be thrown
     *
     * @method addChildAt
     * @param child {Container|Sprite} Any container or sprite
     * @param index {Number}
     * @return {Container|Sprite} The child that was added
     */
    addChildAt: function(child) {
        PIXI.DisplayObjectContainer.prototype.addChildAt.apply(this, arguments);

        return child;
    },

    /**
     * Removes a child from the object.
     *
     * @method removeChild
     * @param child {Container|Sprite} Any container or sprite
     * @return {Container|Sprite} The child that was added
     */
    removeChild: function(child) {
        PIXI.DisplayObjectContainer.prototype.removeChild.apply(this, arguments);

        return child;
    },

    /**
     * Removes all children from the object.
     *
     * @method removeAllChildren
     * @return {Container} Returns itself.
     * @chainable
     */
    removeAllChildren: function() {
        while(this.children.length) {
            this.removeChild(this.children[0]);
        }

        return this;
    },

    /**
     * Brings a child to the top of the Z pile.
     *
     * @method bringChildToTop
     * @param child {Container|Sprite} Any container or sprite
     * @return {Container|Sprite} The child that was added
     */
    bringChildToTop: function(child) {
        if(child.parent === this) {
            this.addChild(this.removeChild(child));
        }

        return child;
    },

    /**
     * Destroys this object.
     *
     * @method destroy
     */
    destroy: function() {
        this.disablePhysics();
        this.destroyAllChildren();

        if(this.parent)
            this.parent.removeChild(this);
    },

    /**
     * Destroys all the children of the object.
     *
     * @method destroyAllChildren
     * @return {Container} Returns itself.
     * @chainable
     */
    destroyAllChildren: function() {
        while(this.children.length) {
            if(this.children[0].destroy) {
                this.children[0].destroy();
            } else {
                this.removeChild(this.children[0]);
            }
        }

        return this;
    },

    /**
     * Called whenever a collision occurs
     *
     * @method onCollide
     * @param obj {Sprite|Container} The sprite that you collide with
     * @param collision {Collision} Collision data object that contains
     *      information about the intersection
     * @return {Boolean} If you return `false` explicitly the engine will *not*
     *      solve the collision. In this way you can make thing "not collide" if
     *      you don't want their types to collide.
     */
    onCollide: function() {
        /* To be overriden */
    }
});

module.exports = Container;

//Add event echos
/*
['click', 'mousedown', 'mouseup', 'mouseupoutside', 'mouseover', 'mouseout', 'mousemove', 'tap', 'touchstart', 'touchend', 'touchendoutside'].forEach(function(evtname) {
    Container.prototype[evtname] = module.exports = function(e) {
        this.emit(evtname, e);
    };
});
*/

/*
 * MOUSE Callbacks
 */

/**
 * A callback that is used when the users clicks on the displayObject with their mouse
 *
 * @event click
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user clicks the mouse down over the displayObject
 *
 * @event mousedown
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the displayObject
 * for this callback to be fired the mouse must have been pressed down over the displayObject
 *
 * @event mouseup
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
 * for this callback to be fired, The touch must have started over the displayObject
 *
 * @event mouseupoutside
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse rolls over the displayObject
 *
 * @event mouseover
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse leaves the displayObject
 *
 * @event mouseout
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user moves the mouse while over the displayObject
 *
 * @event mousemove
 * @param interactionData {InteractionData}
 */

/*
 * TOUCH Callbacks
 */

/**
 * A callback that is used when the users taps on the displayObject with their finger
 * basically a touch version of click
 *
 * @event tap
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user touch's over the displayObject
 *
 * @event touchstart
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases a touch over the displayObject
 *
 * @event touchend
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the touch that was over the displayObject
 * for this callback to be fired, The touch must have started over the displayObject
 *
 * @event touchendoutside
 * @param interactionData {InteractionData}
 */
