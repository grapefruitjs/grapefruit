gf.Camera.fx = {};

gf.Camera.fx.Effect = function() {
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