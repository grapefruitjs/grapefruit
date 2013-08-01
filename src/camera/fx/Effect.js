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
};

gf.inherits(gf.Camera.fx.Effect, gf.DisplayObjectContainer, {
    start: function() {
        return this;
    },
    stop: function() {
        return this;
    },
    update: function() {
        return this;
    },
    _complete: function() {
        if(typeof this.cb === 'function')
            this.cb();
    }
});