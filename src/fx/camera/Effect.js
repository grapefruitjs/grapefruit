var Container = require('../../display/Container'),
    utils = require('../../utils/utils'),
    PIXI = require('../../vendor/pixi');

var Effect = module.exports = function() {
    Container.call(this);

    this.addChild(this.gfx = new PIXI.Graphics());
    this.gfx.visible = false;

    this.done = true;
};

utils.inherits(Effect, Container, {
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

        if(typeof this.cb === 'function') {
            var ret = this.cb();

            if(ret !== false)
                this.stop();
        } else {
            this.stop();
        }
    }
});
