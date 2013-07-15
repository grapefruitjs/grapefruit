/**
 * The base display object, that anything being put on the screen inherits from
 *
 * @class DisplayObjectContainer
 * @extends PIXI.DisplayObjectContainer
 * @constructor
 */
gf.DisplayObjectContainer = function(settings) {
    PIXI.DisplayObjectContainer.call(this);

    //mixin user's settings
    gf.utils.setValues(this, settings);

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

    /*
     * MOUSE Callbacks
     */

    /**
     * A callback that is used when the users clicks on the displayObject with their mouse
     *
     * @method click
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user clicks the mouse down over the sprite
     *
     * @method mousedown
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the mouse that was over the displayObject
     * for this callback to be fired the mouse must have been pressed down over the displayObject
     *
     * @method mouseup
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
     * for this callback to be fired, The touch must have started over the displayObject
     *
     * @method mouseupoutside
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the users mouse rolls over the displayObject
     *
     * @method mouseover
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the users mouse leaves the displayObject
     *
     * @method mouseout
     * @param interactionData {InteractionData}
     */

    /*
     * TOUCH Callbacks
     */

    /**
     * A callback that is used when the users taps on the sprite with their finger
     * basically a touch version of click
     *
     * @method tap
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user touch's over the displayObject
     *
     * @method touchstart
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases a touch over the displayObject
     *
     * @method touchend
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the touch that was over the displayObject
     * for this callback to be fired, The touch must have started over the sprite
     *
     * @method touchendoutside
     * @param interactionData {InteractionData}
     */

    /**
     * Inherited Methods
     */

    /**
     * Adds a child to the object.
     *
     * @method addChild
     * @param child {DisplayObject}
     */

    /**
     * Adds a child to the object at a specified index. If the index is out of bounds an error will be thrown
     *
     * @method addChildAt
     * @param child {DisplayObject}
     * @param index {Number}
     */

    /**
     * Removes a child from the object.
     *
     * @method removeChild
     * @param child {DisplayObject}
     */
};

gf.inherits(gf.DisplayObjectContainer, PIXI.DisplayObjectContainer, {
    /**
     * Base resize function, all this does is ensure that all children resize functions get called as well
     *
     * @method resize
     */
    resize: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.resize)
                o.resize.apply(o, arguments);
        }
    },
    /**
     * Convenience method for setting the position of the Object.
     *
     * @method setPosition
     * @param x {Number|Array<Number>|Vector|Point} X coord to put the object at.
     *       If an Array, Vector, or Point is passed then the y parameter is ignored
     * @param y {Number} Y coord to put the object at
     * @return {DisplayObjectContainer} Returns itself for chainability
     * @example
     *      obj.setPosition(0) //will set to (0, 0)
     *          .setPosition(1, 1)
     *          .setPosition([5, 5])
     *          .setPosition(new gf.Point(10, 10))
     *          .setPosition(new gf.Vector(20, 20));
     */
    setPosition: function(x, y) {
        //passed in a vector or point object
        if(x instanceof gf.Vector || x instanceof gf.Point) {
            this.position.x = x.x;
            this.position.y = x.y;
        }
        //passed in an array of form [x, y]
        else if(x instanceof Array) {
            this.position.x = x[0];
            this.position.y = x[1];
        }
        //passed in a single number, that will apply to both
        else if(typeof x === 'number' && y === undefined) {
            this.position.x = x;
            this.position.y = x;
        }
        //passed in something else, lets try to massage it into numbers
        else {
            this.position.x = parseFloat(x, 10) || 0;
            this.position.y = parseFloat(y, 10) || 0;
        }

        return this;
    }
});