var Controls = require('./Controls'),
    KEY = require('../input/Keyboard').KEY,
    BUTTON = require('../input/GamepadButtons').BUTTON,
    AXIS = require('../input/GamepadSticks').AXIS;

/**
 * @class PlatformerControls
 * @extends Controls
 * @constructor
 * @param game {Game} The game instance this will operate within
 * @param [settings] {Object} The settings for the Controls object
 * @param [settings.keys] {Object} Map of actions to the keys to bind, valid actions are: 'left',
 *  'right', and 'jump'. Each action in the keys object should be an array of keys for that action.
 * @param [settings.buttons] {Object} Same as 'keys' but for binding Gamepad Buttons
 * @param [settings.axes] {Object} Same as 'keys' but for binding Gamepad Sticks
 */
var PlatformerControls = function(game, settings) {
    Controls.call(this, game, ['left', 'right', 'jump']);

    //setup callbacks for left
    this.actionmap.left.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'left');
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'left');
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'left');

    //setup callbacks for right
    this.actionmap.right.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'right');

    //setup callbacks for jump
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'jump');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'jump');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'jump');

    //setup binds
    for(var i = 0; i < this.actions.length; ++i) {
        var act = this.actions[i];

        this.setKeys(act,       settings.keys       ? settings.keys[act]    : PlatformerControls.DEFAULT_KEYS[act]);
        this.setGpButtons(act,  settings.buttons    ? settings.buttons[act] : PlatformerControls.DEFAULT_BUTTONS[act]);
        this.setGpAxis(act,     settings.axes       ? settings.axes[act]    : PlatformerControls.DEFAULT_AXES[act]);
    }
};

inherit(PlatformerControls, Controls, {
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
    jump: [KEY.W, KEY.UP]
};

PlatformerControls.BUTTONS = {
    left: [BUTTON.PAD_LEFT],
    right: [BUTTON.PAD_RIGHT],
    jump: [BUTTON.FACE_1]
};

PlatformerControls.DEFAULT_AXES = {
    left: [AXIS.LEFT_ANALOGUE_HOR, AXIS.RIGHT_ANALOGUE_HOR],
    right: [AXIS.LEFT_ANALOGUE_HOR, AXIS.RIGHT_ANALOGUE_HOR],
    jump: []
};

module.exports = PlatformerControls;
