var DisplayObjectContainer = require('../../display/DisplayObjectContainer'),
    utils = require('../../utils/utils');

var Effect = module.exports = function() {
    DisplayObjectContainer.call(this);

    this.addChild(this.gfx = new PIXI.Graphics());
    this.gfx.visible = false;

    this.done = true;
};

utils.inherits(Effect, DisplayObjectContainer, {
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
