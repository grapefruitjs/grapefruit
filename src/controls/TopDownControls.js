var Controls = require('./Controls'),
    Vector = require('../math/Vector'),
    inherit = require('../utils/inherit'),
    KEY = require('../input/Keyboard').KEY,
    BUTTON = require('../input/gamepad/GamepadButtons').BUTTON,
    AXIS = require('../input/gamepad/GamepadSticks').AXIS;

/**
 * @class TopDownControls
 * @extends Controls
 * @constructor
 * @param game {Game} The game instance this will operate within
 */
var TopDownControls = function(game, settings) {
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
    this.actionmap.up.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'up');
    this.actionmap.up.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'up');
    this.actionmap.up.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'up');

    //setup callbacks for down
    this.actionmap.down.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'down');
    this.actionmap.down.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'down');
    this.actionmap.down.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'down');

    //setup binds
    for(var i = 0; i < this.actions.length; ++i) {
        var act = this.actions[i];

        this.setKeys(act,       settings && settings.keys       ? settings.keys[act]    : TopDownControls.DEFAULT_KEYS[act]);
        this.setGpButtons(act,  settings && settings.buttons    ? settings.buttons[act] : TopDownControls.DEFAULT_BUTTONS[act]);
        this.setGpAxis(act,     settings && settings.axes       ? settings.axes[act]    : TopDownControls.DEFAULT_AXES[act]);
    }

    this.move = {
        left: false,
        right: false,
        up: false,
        down: false,
        lastHorzGpValue: 0,
        lastVertGpValue: 0,
        vec: new Vector(),
        lastVec: new Vector(),
        maxVec: new Vector(1, 1),
        minVec: new Vector(-1, -1),
        dir: {
            left: ['x', -1],
            right: ['x', 1],
            up: ['y', -1],
            down: ['y', 1]
        },
        speed: 100
    };
};

inherit(TopDownControls, Controls, {
    control: function(spr) {
        Controls.prototype.control.call(this, spr);

        spr._phys.system.addControlBody(spr);
        spr._moveVector = new Vector();
    },
    onKey: function(action, evt) {
        if(evt.originalEvent)
            evt.originalEvent.preventDefault();

        // .down is keypressed down
        if(evt.down) {
            if(this.move[action]) return; //skip repeats (holding a key down)

            this.move[action] = true;
            this.move.vec[this.move.dir[action][0]] += this.move.dir[action][1];
        } else {
            this.move[action] = false;
            this.move.vec[this.move.dir[action][0]] -= this.move.dir[action][1];
        }

        this._checkMovement();
    },
    onGpAxis: function(action, evt) {
        if(evt.code === AXIS.LEFT_ANALOGUE_HOR) {
            if(evt.value === 0) {
                if(!this.move.lastHorzGpValue)
                    return;

                this.move.left = false;
                this.move.right = false;
                this.move.vec.x = 0;
            } else if(evt.value > 0) {
                if(this.move.right)
                    return;

                this.move.right = true;
                this.move.vec.x = this.move.dir.right[1];
            } else {
                if(this.move.left)
                    return;

                this.move.left = true;
                this.move.vec.x = this.move.dir.left[1];
            }
            this.move.lastHorzGpValue = evt.value;
        }
        else if(evt.code === AXIS.LEFT_ANALOGUE_VERT) {
            if(evt.value === 0) {
                if(!this.move.lastVertGpValue)
                    return;

                this.move.down = false;
                this.move.up = false;
                this.move.vec.y = 0;
            } else if(evt.value > 0) {
                if(this.move.down)
                    return;

                this.move.down = true;
                this.move.vec.y = this.move.dir.down[1];
            } else {
                if(this.move.up)
                    return;

                this.move.up = true;
                this.move.vec.y = this.move.dir.up[1];
            }
            this.move.lastVertGpValue = evt.value;
        }

        if(!this.move.vec.equals(this.move.lastVec)) {
            this.move.lastVec.copy(this.move.vec);
            this._checkMovement();
        }
    },
    _checkMovement: function() {
        var spr, speed;

        this.move.vec.clamp(this.move.minVec, this.move.maxVec);

        for(var i = 0; i < this.sprites.length; ++i) {
            spr = this.sprites[i];
            speed = spr.moveSpeed || this.move.speed;

            spr._moveVector.x = this.move.vec.x * speed;
            spr._moveVector.y = this.move.vec.y * speed;

            if(spr.locked) return;

            if(spr._setMoveAnimation) spr._setMoveAnimation();

            spr.setVelocity(spr._moveVector);
        }
    }
});

TopDownControls.DEFAULT_KEYS = {
    left:   [KEY.A, KEY.LEFT],
    right:  [KEY.D, KEY.RIGHT],
    up:     [KEY.W, KEY.UP],
    down:   [KEY.S, KEY.DOWN]
};

TopDownControls.DEFAULT_BUTTONS = {
    left:   [BUTTON.PAD_LEFT],
    right:  [BUTTON.PAD_RIGHT],
    up:     [BUTTON.PAD_UP],
    down:   [BUTTON.PAD_DOWN]
};

TopDownControls.DEFAULT_AXES = {
    left:   [AXIS.LEFT_ANALOGUE_HOR, AXIS.RIGHT_ANALOGUE_HOR],
    right:  [AXIS.LEFT_ANALOGUE_HOR, AXIS.RIGHT_ANALOGUE_HOR],
    up:     [AXIS.LEFT_ANALOGUE_VERT, AXIS.RIGHT_ANALOGUE_VERT],
    down:   [AXIS.LEFT_ANALOGUE_VERT, AXIS.RIGHT_ANALOGUE_VERT]
};

module.exports = TopDownControls;
