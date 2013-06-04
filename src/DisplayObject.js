/**
 * The base display object, that anything being put on the screen inherits from
 *
 * @class DisplayObject
 * @extends PIXI.DisplayObjectContainer
 * @constructor
 */
gf.DisplayObject = function() {
    PIXI.DisplayObjectContainer.call(this);

    //Add these properties in so that all objects can see them in the docs
    //these properties are inherited from PIXI.DisplayObjectContainer
    //most of these blocks are copied straight from PIXI source

    /**
     * [read-only] The of children of this object.
     * @property children {Array}
     */

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     * @property position
     * @type Point
     */

    /**
     * The scale factor of the object.
     * @property scale
     * @type Point
     */

    /**
     * The rotation of the object in radians.
     * @property rotation
     * @type Number
     */

    /**
     * The opacity of the object.
     * @property alpha
     * @type Number
     */

    /**
     * The visibility of the object.
     * @property visible
     * @type Boolean
     */

    /**
     * [read-only] The display object that contains this display object.
     * @property parent
     * @type DisplayObject
     */

    /**
     * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
     * @property stage
     * @type Stage
     */

    /**
     * This is the defined area that will pick up mouse / touch events. It is null by default.
     * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
     * @property hitArea
     * @type Rectangle
     */

    /*
     * MOUSE Callbacks
     */

    /**
     * A callback that is used when the users clicks on the displayObject with their mouse
     * @method click
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user clicks the mouse down over the sprite
     * @method mousedown
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the mouse that was over the displayObject
     * for this callback to be fired the mouse must have been pressed down over the displayObject
     * @method mouseup
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
     * for this callback to be fired, The touch must have started over the displayObject
     * @method mouseupoutside
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the users mouse rolls over the displayObject
     * @method mouseover
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the users mouse leaves the displayObject
     * @method mouseout
     * @param interactionData {InteractionData}
     */

    /*
     * TOUCH Callbacks
     */

    /**
     * A callback that is used when the users taps on the sprite with their finger
     * basically a touch version of click
     * @method tap
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user touch's over the displayObject
     * @method touchstart
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases a touch over the displayObject
     * @method touchend
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the touch that was over the displayObject
     * for this callback to be fired, The touch must have started over the sprite
     * @method touchendoutside
     * @param interactionData {InteractionData}
     */

    /**
     * Inherited Methods
     */

    /**
     * Indicates if the sprite will have touch and mouse interactivity. It is false by default
     * @method setInteractive
     * @param interactive {Boolean}
     */

    /**
     * Adds a child to the object.
     * @method addChild
     * @param child {DisplayObject}
     */

    /**
     * Adds a child to the object at a specified index. If the index is out of bounds an error will be thrown
     * @method addChildAt
     * @param child {DisplayObject}
     * @param index {Number}
     */

    /**
     * Removes a child from the object.
     * @method removeChild
     * @param child {DisplayObject}
     */
};

gf.inherits(gf.DisplayObject, PIXI.DisplayObjectContainer, {
    resize: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.resize)
                o.resize.apply(o, arguments);
        }
    },
    removeAllChildren: function() {
        //remove each from the stage
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.stage) this.stage.__removeChild(this.children[i]);
        }

        //clear the list and let the GC clean up
        this.children = [];
    },
    forEachEntity: function(fn) {
        //go through each child and call recurse children for each one
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.children[i].forEachEntity)
                this.children[i].forEachEntity(fn);
        }

        if(fn && this instanceof gf.Entity)
            fn(this);
    }
});