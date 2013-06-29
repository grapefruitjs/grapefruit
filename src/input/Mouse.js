gf.input.Mouse = function(view) {
    gf.input.Input.call(this, view);

    /**
     * The current screen touches
     *
     * @property touches
     * @type Array
     * @readOnly
     */
    this.touches = [{ x: 0, y: 0 }];

    /**
     * The current position of the mouse
     *
     * @property position
     * @type Point
     * @readOnly
     */
    this.position = new gf.Point(0, 0);

    /**
     * The current position of the mouse
     *
     * @property position
     * @type Point
     * @readOnly
     */
    this.offset = gf.utils.getOffset(this.view);

    //bind touch events
    this.view.addEventListener('touchmove', this.onMouse.bind(this), false);
    for(var t in gf.input.Mouse.TOUCH_EVENT) {
        if(gf.input.Mouse.TOUCH_EVENT[t] === 'touchmove') return;
        this.view.addEventListener(gf.input.Mouse.TOUCH_EVENT[t], this.onTouch.bind(this), false);
    }

    //Bind mouse events
    document.addEventListener('mousewheel', this.onMouseWheel.bind(this), false); //needs to be document and check target?
    for(var k in gf.input.Mouse.EVENT) {
        var v = gf.input.Mouse.EVENT[k];
        if(v === 'mousewheel') return;

        this.view.addEventListener(v, this.onMouse.bind(this), false);
    }
};

gf.inherits(gf.input.Mouse, gf.input.Input, {
    //generic mouse event (click, down, up, mouve, touchmove, etc)
    onMouse: function(e) {
        this.updateCoords(e);

        if(this.dispatchMouseEvent(e))
            return this.preventDefault(e);

        return true;
    },
    onMouseWheel: function(e) {
        if(e.target === this.view)
            if(this.dispatchMouseEvent(e))
                return this.preventDefault(e);

        return true;
    },
    //generic touch event (tap, start, end, etc)
    onTouch: function(e) {
        this.updateCoords(e);

        return this.onMouse(e);
    },
    //update the mouse coords
    updateCoords: function(e) {
        this.touches.length = 0;

        var off = this.offset;

        //mouse event
        if(!e.touches) {
            this.touches.push({
                x: e.pageX - off.left,
                y: e.pageY - off.top,
                id: 0
            });
        }
        //touch event
        else {
            for(var i = 0, il = e.changedTouches.length; i < il; ++i) {
                var t = e.changedTouches[i];

                this.touches.push({
                    x: t.clientX - off.left,
                    y: t.clientY - off.top
                });
            }
        }
        this.position.x = this.touches[0].x;
        this.position.y = this.touches[0].y;
    },
    dispatchMouseEvent: function(e) {
        if(this.binds[e.type]) {
            //track that action is active
            this.status[this.binds[e.type]] = true;

            //for each touch
            if(this.callbacks[this.binds[e.type]]) {
                for(var t = 0, tl = this.touches.length; t < tl; ++t) {
                    this.runCallbacks(e.type, [this.touches[t]]);
                }

                return this.preventDefault(e);
            }

            return true;
        }
    }
});

gf.input.Mouse.EVENT = {
    WHEEL: 'mousewheel',
    MOVE: 'mousemove',
    DOWN: 'mousedown',
    UP: 'mouseup',
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    RCLICK: 'contextmenu',
    CONTEXTMENU: 'contextmenu'
};

gf.input.Mouse.TOUCH_EVENT = {
    MOVE: 'touchmove',
    START: 'touchstart',
    END: 'touchend',
    TAP: 'tap',
    DBLTAP: 'dbltap'
};