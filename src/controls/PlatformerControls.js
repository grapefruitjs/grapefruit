var Controls = require('./Controls'),
    Vector = require('../math/Vector'),
    inherit = require('../utils/inherit'),
    KEY = require('../input/Keyboard').KEY,
    BUTTON = require('../input/gamepad/GamepadButtons').BUTTON,
    AXIS = require('../input/gamepad/GamepadSticks').AXIS,
    math = require('../math/math'),
    cp = require('chipmunk');

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
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'left');
    this.actionmap.left.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'left');

    //setup callbacks for right
    this.actionmap.right.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'right');
    this.actionmap.right.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'right');

    //setup callbacks for jump
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.KEYBOARD] = this.onKey.bind(this, 'jump');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPBUTTON] = this.onKey.bind(this, 'jump');
    this.actionmap.jump.callbacks[Controls.BIND_TYPE.GPAXIS] = this.onGpAxis.bind(this, 'jump');

    //setup binds
    for(var i = 0; i < this.actions.length; ++i) {
        var act = this.actions[i];

        this.setKeys(act,       settings.keys       ? settings.keys[act]    : PlatformerControls.DEFAULT_KEYS[act]);
        this.setGpButtons(act,  settings.buttons    ? settings.buttons[act] : PlatformerControls.DEFAULT_BUTTONS[act]);
        this.setGpAxis(act,     settings.axes       ? settings.axes[act]    : PlatformerControls.DEFAULT_AXES[act]);
    }

    this.movement = new Vector();

    game.on('tick', this.update.bind(this));
};

inherit(PlatformerControls, Controls, {
    control: function(spr) {
        Controls.prototype.control.call(this, spr);

        /* jshint -W106 */
        spr._phys.body.originalVelFunc = spr._phys.body.velocity_func;
        spr._phys.body.velocity_func = PlatformerControls.updateBodyVelocity;
        /* jshint +W106 */

        spr.moveSpeed = spr.moveSpeed || 100;

        spr.groundAccel = spr.moveSpeed * 0.10;
        spr.airAccel = spr.moveSpeed * 0.25;

        spr.jumpHeight = spr.jumpHeight || 50;
        spr.jumpBoostHeight = spr.jumpBoostHeight || 55;
        spr.fallVelocity = spr.fallVelocity || 900;
        spr.gravity = spr.gravity || 2000;

        spr.remainingBoost = 0;
        spr.grounded = false;
    },
    onKey: function(action, evt) {
        if(evt.originalEvent)
            evt.originalEvent.preventDefault();

        switch(action) {
            case 'left':
                this.movement.x += (evt.down ? -1 : 1);
                break;

            case 'right':
                this.movement.x += (evt.down ? 1 : -1);
                break;

            case 'jump':
                this.movement.y += (evt.down ? 1 : -1);
                break;
        }
    },
    onGpAxis: function(action, evt) {
        if(evt.code === AXIS.LEFT_ANALOGUE_HOR) {
            if(evt.value === 0) {
                this.movement.vec.x = 0;
            } else if(evt.value > 0) {
                this.movement.vec.x = 1;
            } else {
                this.movement.vec.x = -1;
            }
        }
    },
    update: function(dt) {
        var jumpState = this.movement.y > 0,
            spr;

        for(var i = 0; i < this.sprites.length; ++i) {
            spr = this.sprites[i];

            if(jumpState && !spr.lastJumpState && spr.grounded) {
                var jump = math.sqrt(2 * spr.jumpHeight * spr.gravity);
                spr._phys.body.v.y += jump;

                spr.remainingBoost = spr.jumpBoostHeight / jump;
            }

            spr.remainingBoost -= dt;
            spr.lastJumpState = jumpState;
        }
    }
});

//in this function 'this' actually refers to the sprite's body
PlatformerControls.updateBodyVelocity = function(gravity, damping, dt) {
    var jumpState = (this.movement.y > 0);

    // Grab the grounding normal from last frame
    var groundNormal = cp.vzero;
    this.eachArbiter(PlatformerControls.selectPlayerGroundNormal.bind(null, groundNormal));

    this.sprite.grounded = (groundNormal.y > 0.0);

    if(groundNormal.y < 0) this.sprite.remainingBoost = 0;

    // Do a normal-ish update
    var boost = (jumpState && this.sprite.remainingBoost > 0);
    var g = (boost ? cp.vzero : gravity);

    //call the original update function
    this.originalVelFunc(g, damping, dt);

    // Target horizontal speed for air/ground control
    var targetVx = this.sprite.moveSpeed * math.clamp(this.movement.x, -1, 1);

    // Update the surface velocity and friction
    // Note that the "feet" move in the opposite direction of the player.
    var surfaceV = cp.v(-targetVx, 0);

    /* jshint -W106 */
    this.sprite._phys.shape.surface_v = surfaceV;
    this.sprite._phys.shape.u = (this.sprite.grounded ? this.sprite.groundAccel / this.sprite.gravity : 0.0);
    /* jshint +W106 */

    // Apply air control if not grounded
    if(!this.sprite.grounded) {
        // Smoothly accelerate the velocity
        this.v.x = PlatformerControls.lerpconst(this.v.x, targetVx, this.sprite.airAccel * dt);
    }

    this.v.y = math.clamp(this.v.y, -this.sprite.fallVelocity, Infinity);
};

PlatformerControls.lerpconst = function(f1, f2, d) {
    return f1 + math.clamp(f2 - f1, -d, d);
};

PlatformerControls.selectPlayerGroundNormal = function(arb, groundNormal) {
    var n = cp.v.neg(arb.getNormal(0));

    if(n.y > groundNormal.y) {
        groundNormal = n;
    }
};

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
