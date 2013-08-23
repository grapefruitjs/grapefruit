gf.Camera.fx = {
    /**
     * Camera directions, used for certain effects (like shake and scanlines)
     *
     * @property DIRECTION
     * @type Object
     * @static
     */
    DIRECTION: {
        BOTH: 0,
        HORIZONTAL: 1,
        VERTICAL: 2
    }
};

gf.Camera.fx.Effect = function() {
    gf.DisplayObjectContainer.call(this);

    this.addChild(this.gfx = new PIXI.Graphics());
    this.gfx.visible = false;

    this.done = true;
};

gf.inherits(gf.Camera.fx.Effect, gf.DisplayObjectContainer, {
    start: function() {
        this.done = false;
        return this;
    },
    stop: function() {
        this.done = true;
        return this;
    },
    update: function() {
        return this;
    },
    _complete: function() {
        this.done = true;
        if(typeof this.cb === 'function')
            this.cb();
    }
});