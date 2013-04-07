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