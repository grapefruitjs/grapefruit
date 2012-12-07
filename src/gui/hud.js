(function() {
    gf.HUD = {
        init: function(settings) {
            //is the HUD visible?
            this.visible = true;

            //use the passed settings object ot override the default values above
            gf.utils.setValues(this, settings);

            //create the base div of this element
            this._createElement(x, y);

            //some private stuffs
            this.dirty = true;

            //the items in this HUD
            this.items = {};
            this.numItems = 0;
        },
        addItem: function(name, item) {
            //increment if a new item
            if(!this.items[name]) this.numItems++;

            this.items[name] = item;
            this.dirty = true;
            return this;
        },
        removeItem: function(name) {
            if(this.items[name]) {
                this.items[name] = null;
                this.numItems--;
                this.dirty = true;
            }

            return this;
        },
        setItemValue: function(name, value) {
            if(this.items[name]) {
                this.items[name].setValue;
                this.dirty = true;
            }

            return this;
        },
        getItemValue: function(name) {
            return (this.items[name] ? this.items[name].getValue() : null);
        },
        reset: function(name) {
            if(name !== undefined) {
                if(this.items[name]) this.items[name].reset();
                this.dirty = true;
            } else {
                this.resetAll();
            }

            return this;
        },
        resetAll: function() {
            gf.utils.each(this.items, function(name, item) {
                item.reset();
            });

            return this;
        },
        update: function() {
            if(!this.dirty) return;

            this.$elm.css({
                backgroundColor: this.bgColor
            });

            gf.utils.each(this.items, function(name, item) {
                if(item.visible) {
                    item.update();
                }
            });

            this.dirty = false;
        },
        _createElement: function() {
            this.$elm = $('<div/>', {
                'class': 'gf-hud',
                position: 'absolute',
                top: gf.game._$cont.pos().top,
                left: gf.game._$cont.pos().left
            }).prependTo(gf.game._$cont);
        }
    };
})();