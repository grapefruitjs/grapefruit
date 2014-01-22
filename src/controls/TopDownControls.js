var Controls = require('./Controls'),
    Vector = require('../math/Vector'),
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
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'left');
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'left');

    //setup callbacks for right
    this.actionmap.right.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'right');

    //setup callbacks for up
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'up');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'up');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'up');

    //setup callbacks for down
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'down');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onGpBtn.bind(this, 'down');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'down');

    //setup binds
    for(var i = 0; i < spr._length; ++i) {
        var act = this.actions[i];

        this.setKeys(act,       settings.keys       ? settings.keys[act]    : PlatformerControls.DEFAULT_KEYS[act]);
        this.setGpButtons(act,  settings.buttons    ? settings.buttons[act] : PlatformerControls.DEFAULT_BUTTONS[act]);
        this.setGpAxis(act,     settings.axes       ? settings.axes[act]    : PlatformerControls.DEFAULT_AXES[act]);
    }
};

inherit(TopDownControls, Controls, {
    control: function(spr) {
        Controls.prototype.control.call(this, spr);

        spr._phys.system.addControlBody(spr);
        spr._move = {
            left: false,
            right: false,
            up: false,
            down: false,
            lastHorzGpValue: 0,
            lastVertGpValue: 0,
            vec: new Vector()
        };
    },
    onKey: function(action, evt) {
        if(evt.originalEvent)
            evt.originalEvent.preventDefault();

        for(var i = 0; i < this.sprites.length; ++i) {
            var spr = this.sprites[i];

            // .down is keypressed down
            if(evt.down) {
                if(this._move[dir]) return; //skip repeats (holding a key down)

                this._move[dir] = true;
            } else {
                this._move[dir] = false;
            }

            this._checkMovement(spr);
        }
    },
    onGpAxis: function(action, evt) {
        for(var i = 0; i < this.sprites.length; ++i) {
            var spr = this.sprites[i];

            if(evt.code === AXIS.LEFT_ANALOGUE_HOR) {
                if(evt.value === 0) {
                    if(!spr._move.lastHorzGpValue)
                        return;

                    spr._move.left = false;
                    spr._move.right = false;
                } else if(evt.value > 0) {
                    if(spr._move.right)
                        return;

                    spr._move.right = true;
                } else {
                    if(spr._move.left)
                        return;

                    spr._move.left = true;
                }
                spr._move.lastHorzGpValue = evt.value;
            }
            else {
                if(evt.value === 0) {
                    if(!spr._move.lastVertGpValue)
                        return;

                    spr._move.down = false;
                    spr._move.up = false;
                } else if(evt.value > 0) {
                    if(spr._move.down)
                        return;

                    spr._move.down = true;
                } else {
                    if(spr._move.up)
                        return;

                    spr._move.up = true;
                }
                spr._move.lastVertGpValue = evt.value;
            }

            this._checkMovement(spr);
        }
    },
    _checkMovement: function(spr) {
        //doing this in an action status based way means that pressing two opposing
        //keys at once and release one will still work (like pressing left & right, then releasing right)
        if(spr._move.left && spr._move.right)
            spr._move.vec.x = 0;
        else if(spr._move.left)
            spr._move.vec.x = -spr.moveSpeed;
        else if(spr._move.right)
            spr._move.vec.x = spr.moveSpeed;
        else
            spr._move.vec.x = 0;

        if(spr._move.up && spr._move.down)
            spr._move.vec.y = 0;
        else if(spr._move.up)
            spr._move.vec.y = -spr.moveSpeed;
        else if(spr._move.down)
            spr._move.vec.y = spr.moveSpeed;
        else
            spr._move.vec.y = 0;

        if(spr.locked) return;

        if(spr._setMoveAnimation) spr._setMoveAnimation();

        spr.setVelocity(spr._move.vec);
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
