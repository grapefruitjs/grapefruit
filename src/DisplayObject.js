/**
 * The base display object, that anything being put on the screen inherits from
 *
 * @module gf
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
    update: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.update)
                o.update();
        }
    },
    resize: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.resize)
                o.resize();
        }
    },
    removeAllChildren: function() {
        //remove each from the stage
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.stage) this.stage.__removeChild(this.children[i]);
        }

        //clear the list and let the GC clean up
        this.children = [];
    }
});