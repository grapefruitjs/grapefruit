/**
 * The base HudItem that represents an element of a hud on the screen.
 *
 * @module gf
 * @class HudItem
 * @extends GuiItem
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.HudItem = function(pos, settings) {
    /**
     * The value of the item
     *
     * @property name
     * @type Mixed
     * @default ''
     */
    this.value = '';

    /**
     * Sets whether or not you can drag the HudItem around
     *
     * @property draggable
     * @type Boolean
     * @default false
     */
    this.draggable = false;

    /**
     * [read only] Describes if the current item is being dragged or not
     *
     * @property dragging
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.dragging = false;

    /**
     * The font to use for text
     *
     * @property font
     * @type Font
     */
    this.font = null;

    gf.GuiItem.call(this, pos, settings);

    /**
     * The initial value of the item to reset to
     *
     * @property initialValue
     * @type Mixed
     */
    this.initialValue = this.value;

    if(this.font instanceof gf.Font)
        this.addChild(this.font);
    else {
        this.font = new gf.Font();
        this.addChild(this.font);
    }

    this.dirty = true;
    this.sprites = new gf.ObjectPool(PIXI.Sprite, this);
};

gf.inherits(gf.HudItem, gf.GuiItem, {
    /**
     * Resets the value to the initialValue
     *
     * @method reset
     * @return {HudItem} Returns itself for chainability
     */
    reset: function() {
        return this.set(this.initialValue);
    },
    /**
     * Sets the value of the item, and marks it as dirty
     *
     * @method set
     * @return {HudItem} Returns itself for chainability
     */
    set: function(val) {
        this.font.setText(val);
        this.value = val;
        this.dirty = true;
        return this;
    },

    onDragStart: function() {},
    onDragEnd: function() {},

    click: function() {},
    mousedown: function(e) {
        if(!this.draggable) return;

        this.dragging = {
            x: e.clientX,
            y: e.clientY
        };
        this.onDragStart(e);
    },
    mouseup: function(e) {
        this.dragging = false;
        this.onDragEnd(e);
    },
    mousemove: function(e) {
        if(!this.draggable || !this.dragging) return;

        var diffX = e.clientX - this.dragging.x,
            diffY = e.clientY - this.dragging.y,
            pos = gf.utils.getPosition(this.elm);

        this.dragging.x = e.clientX;
        this.dragging.y = e.clientY;

        this.elm.style.top = pos.top + diffY;
        this.elm.style.left = pos.left + diffX;
    }
});
