var Controls = require('./Controls'),
    KEY = require('../input/Keyboard').KEY,
    BUTTON = require('../input/GamepadButtons').BUTTON,
    AXIS = require('../input/GamepadSticks').AXIS;

/**
 * @class TopDownControls
 * @extends Controls
 * @constructor
 * @param game {Game} The game instance this will operate within
 */
var TopDownControls = function(game) {
    Controls.call(this, game, ['left', 'right', 'up', 'down']);

    //setup callbacks for left
    this.actionmap.left.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'left');
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'left');
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'left');

    //setup callbacks for right
    this.actionmap.right.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'right');

    //setup callbacks for up
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'up');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'up');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'up');

    //setup callbacks for down
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'down');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'down');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'down');

    //setup binds
    for(var i = 0; i < this.actions.length; ++i) {
        var act = this.actions[i];

        this.setKeys(act,       settings.keys       ? settings.keys[act]    : PlatformerControls.DEFAULT_KEYS[act]);
        this.setGpButtons(act,  settings.buttons    ? settings.buttons[act] : PlatformerControls.DEFAULT_BUTTONS[act]);
        this.setGpAxis(act,     settings.axes       ? settings.axes[act]    : PlatformerControls.DEFAULT_AXES[act]);
    }
};

inherit(TopDownControls, Controls, {
    onKey: function(action, evt) {

    },
    onGpBtn: function(action, evt) {

    },
    onGpAxis: function(action, evt) {

    }
});

PlatformerControls.DEFAULT_KEYS = {
    left: [KEY.A, KEY.LEFT],
    right: [KEY.D, KEY.RIGHT],
    up: [KEY.W, KEY.UP],
    down: [KEY.S, KEY.DOWN]
};

PlatformerControls.BUTTONS = {
    left: [BUTTON.PAD_LEFT],
    right: [BUTTON.PAD_RIGHT],
    up: [BUTTON.PAD_UP],
    down: [BUTTON.PAD_DOWN]
};

PlatformerControls.DEFAULT_AXES = {
    left: [AXIS.LEFT_ANALOGUE_HOR, AXIS.RIGHT_ANALOGUE_HOR],
    right: [AXIS.LEFT_ANALOGUE_HOR, AXIS.RIGHT_ANALOGUE_HOR],
    up: AXIS.LEFT_ANALOGUE_VERT, AXIS.RIGHT_ANALOGUE_VERT],
    down: [AXIS.LEFT_ANALOGUE_VERT, AXIS.RIGHT_ANALOGUE_VERT]
};

module.exports = TopDownControls;
