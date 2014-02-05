var EventEmitter = require('../utils/EventEmitter'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    PIXI = require('../vendor/pixi');

/**
 * The same as a container, but offers improvements in render speed for single-level
 * deep sprite children. Useful for containers like tilemap layers, bitmap text container,
 * particle containers, etc.
 *
 * @class SpriteBatch
 * @extends [PIXI.SpriteBatch](http://www.goodboydigital.com/pixijs/docs/classes/SpriteBatch.html)
 * @uses EventEmitter
 * @constructor
 */
var SpriteBatch = function(settings) {
    PIXI.SpriteBatch.call(this);
    EventEmitter.call(this);

    //mixin user's settings
    utils.setValues(this, settings);

    //Add these properties in so that all objects can see them in the docs
    //these properties are inherited from PIXI.SpriteBatch
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

inherit(SpriteBatch, PIXI.SpriteBatch, {
    /**
     * Sets the container to visible = true
     *
     * @method show
     * @return {SpriteBatch} Returns itself.
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
     * @return {SpriteBatch} Returns itself.
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
        PIXI.SpriteBatch.prototype.addChild.apply(this, arguments);

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
        PIXI.SpriteBatch.prototype.addChildAt.apply(this, arguments);

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
        PIXI.SpriteBatch.prototype.removeChild.apply(this, arguments);

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
    }
});

module.exports = SpriteBatch;
