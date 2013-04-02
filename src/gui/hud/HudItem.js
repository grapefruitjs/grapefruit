gf.HudItem = function(x, y, settings) {
    //can be dragged
    this.draggable = false;

    //is this item visible?
    this.visible = true;

    //value of the item
    this.value = typeof settings.value == 'string' ? '' : 0;

    this.name = '';

    //use the passed settings object ot override the default values above
    gf.utils.setValues(this, settings);

    this.default = this.value;

    //create the base div of this element
    this._createElement(x, y);

    //some private stuffs
    this.dirty = true;

    //dragging stuff
    this.dragging = false;
};

gf.inherits(gf.HudItem, Object, {
    reset: function() {
        this.set(this.default);
        return this;
    },
    setValue: function(val) {
        this.value = val;
        this.dirty = true;
        return this;
    },
    getValue: function() {
        return this.value;
    },
    update: function() {
        if(!this.dirty) return;

        this.elm.innerText = this.value;
        return this;
    },
    //virtual events
    onClick: function(e) {},
    onDragStart: function(e) {},
    onDragEnd: function(e) {},
    onMouseDown: function(e) {
        if(!this.draggable) return;

        this.dragging = {
            x: e.clientX,
            y: e.clientY
        };
        this.onDragStart(e);
    },
    onMouseUp: function(e) {
        this.dragging = false;
        this.onDragEnd(e);
    },
    onMouseMove: function(e) {
        if(!this.draggable || !this.dragging) return;

        var diffX = e.clientX - this.dragging.x,
            diffY = e.clientY - this.dragging.y,
            pos = gf.utils.getPosition(this.elm);

        this.dragging.x = e.clientX;
        this.dragging.y = e.clientY;

        this.elm.style.top = pos.top + diffY;
        this.elm.style.left = pos.left + diffX;
    },
    //private functions
    _createElement: function(x, y) {
        this.elm = document.createElement('div');
        this.elm.className = 'gf-hud-item ' + this.name;

        this.elm.style.cssText = 'position: absolute; top: ' + y + 'px; left: ' + x + 'px;';

        this._bindEvents();
    },
    _bindEvents: function() {
        this.elm.addEventListener('click', this.onClick.bind(this), false);
        this.elm.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        this.elm.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        this.elm.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }
});
