/**
 * The base GuiItem that represents an element of a gui on the screen.
 *
 * @class GuiItem
 * @extends Sprite
 * @constructor
 * @param texture {Texture} The texture to set the sprite to
 */
gf.GuiItem = function(texture, interactive) {
    /**
     * Sets whether or not you can drag the GuiItem around
     *
     * @property draggable
     * @type Boolean
     * @default false
     */
    this.draggable = false;

    /**
     * [read only] Describes if the current item is being dragged or not, if it is this
     * object will hold the last local position of the mouse (relative to this object's parent)
     *
     * @property dragging
     * @type Object
     * @default false
     * @readOnly
     */
    this.dragging = false;

    gf.Sprite.call(this, texture);
    this.setInteractive(interactive);
};

gf.inherits(gf.GuiItem, gf.Sprite, {
    mousedown: function(e) {
        gf.Sprite.prototype.mousedown.call(this, e);

        if(!this.draggable)
            return;

        this.dragging = e.data.getLocalPosition(e.object.parent);
    },
    mouseup: function(e) {
        gf.Sprite.prototype.mouseup.call(this, e);

        this.dragging = false;
    },
    mousemove: function(e) {
        gf.Sprite.prototype.mousemove.call(this, e);

        if(!this.draggable || !this.dragging)
            return;

        var pos = e.data.getLocalPosition(this.parent);

        //current position + (new mouse position - old mouse position) == current position + mousemove delta
        this.setPosition(
            this.position.x + (pos.x - this.dragging.x), 
            this.position.y + (pos.y - this.dragging.y)
        );

        this.dragging = pos;
    }
});
