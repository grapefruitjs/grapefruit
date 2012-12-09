(function() {
    gf.HudItem = Class.extend({
        init: function(x, y, settings) {
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
        },
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

            this.$elm.text(this.value);
            return this;
        },
        //virtual events
        onClick: function(e) {},
        onMouseDown: function(e) {
            if(!this.draggable) return;

            this.dragging = {
                x: e.clientX,
                y: e.clientY
            }
        },
        onMouseUp: function(e) {
            this.dragging = false;
        },
        onMouseMove: function(e) {
            if(!this.draggable || !this.dragging) return;

            var diffX = e.clientX - this.dragging.x,
                diffY = e.clientY - this.dragging.y,
                pos = this.$elm.position();

            this.dragging.x = e.clientX;
            this.dragging.y = e.clientY;

            this.$elm.css({
                top: pos.top += diffY,
                left: pos.left += diffX
            });
        },
        //private functions
        _createElement: function(x, y) {
            this.$elm = $('<div/>', {
                'class': 'gf-hud-item ' + this.name
            }).css({
                position: 'absolute',
                top: y,
                left: x
            });

            this._bindEvents();
        },
        _bindEvents: function() {
            this.$elm.on({
                click: this.onClick.bind(this),
                mousedown: this.onMouseDown.bind(this),
                mouseup: this.onMouseUp.bind(this),
                mousemove: this.onMouseMove.bind(this)
            });
        }
    });
})();