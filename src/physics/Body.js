// Based heavily off of PhotonStorm's Phaser Arcade Physics, ChipmunkJS, and an IBM Article
// Phaser: https://github.com/photonstorm/phaser 
// ChipmunkJS: https://github.com/josephg/Chipmunk-js
// IBM Article: http://www.ibm.com/developerworks/library/wa-build2dphysicsengine/

var Rectangle = require('../math/Rectangle'),
    Vector = require('../math/Vector'),
    math = require('../math/math'),
    utils = require('../utils/utils'),
    C = require('../constants');

var Body = module.exports = function(sprite) {
    this.sprite = sprite;
    this.size = sprite.currentFrame;

    this.type = C.PHYSICS_TYPE.DYNAMIC;
    this.solveType = C.SOLVE_TYPE.DISPLACE;

    this.pos = new Vector();

    this.velocity = new Vector();
    this.accel = new Vector();
    this.drag = new Vector();
    this.gravity = new Vector();
    this.bounce = new Vector();
    this.maxVelocity = new Vector(10000, 10000);

    this.angularVelocity = 0;
    this.angularAccel = 0;
    this.angularDrag = 0;
    this.maxAngular = 1000;

    this.mass = 1;
    this.rotation = 0;
    this.allowRotation = true;

    //touching/canCollide directional flags
    this.canCollide = C.DIRECTION.ALL;
    this.touching = C.DIRECTION.NONE;
    this.wasTouching = C.DIRECTION.NONE;

    this.overlap = new Vector();

    this.lastPos = new Vector();

    this.shape = sprite.hitArea || new Rectangle(0, 0, sprite.width, sprite.height);

    //some temp vars to prevent having to create a bunch each update
    this._accel = 0;
    this._drag = 0;
    this._vDelta = 0;
    this._accel = 0;
    this._accel = 0;
};

utils.inherits(Body, Object, {
    computeVelocity: function(dt, vel, accel, drag, maxVel) {
        this._accel = accel * dt;
        this._drag = drag * dt;

        //apply acceleration if there is any
        if(this._accel) {
            vel += this._accel;
        }
        //if no acceleration, then apply drag
        else if(this._drag) {
            if(vel - this._drag > 0)
                vel -= this._drag;
            else if(vel + this._drag < 0)
                vel += this._drag;
            else
                vel = 0;
        }

        //if there is velocity, clamp it
        if(vel)
            math.clamp(vel, -maxVel, maxVel);

        return vel;
    },
    updateMotion: function(dt) {
        //apply gravity
        if(this.type === C.PHYSICS_TYPE.DYNAMIC) {
            this.velocity.x += this.gravity.x * dt;
            this.velocity.y += this.gravity.y * dt;
        }

        // compute angular velocity
        this._vDelta = (this.computeVelocity(dt, this.angularVelocity, this.angularAccel, this.angularDrag, this.maxAngular) - this.angularVelocity) / 2;
        this.angularVelocity += this._vDelta;
        this.rotation += this.angularVelocity * dt;

        // compute X velocity
        this._vDelta = (this.computeVelocity(dt, this.velocity.x, this.accel.x, this.drag.x, this.maxVelocity.x) - this.velocity.x) / 2;
        this.velocity.x += this._vDelta;
        this.pos.x += this.velocity.x * dt;

        // compute Y velocity
        this._vDelta = (this.computeVelocity(dt, this.velocity.y, this.accel.y, this.drag.y, this.maxVelocity.y) - this.velocity.y) / 2;
        this.velocity.y += this._vDelta;
        this.pos.y += this.velocity.y * dt;
    }
    update: function(dt) {
        this.wasTouching = this.touching;
        this.touching = C.DIRECTION.NONE;

        this.lastPos.copy(this.pos);

        this.pos.x = (this.sprite.position.x - (this.sprite.anchor.x * this.shape.width)) + this.shape.x;
        this.pos.y = (this.sprite.position.y - (this.sprite.anchor.y * this.shape.height)) + this.shape.y;

        this.rotation = this.sprite.angle;

        if(this.type !== C.PHYSICS_TYPE.STATIC)
            this.updateMotion(dt);

        //update sprite position/rotation
        this.syncSprite();
    },
    syncSprite: function() {
        this.sprite.position.x = this.pos.x - this.shape.x + (this.sprite.anchor.x * this.shape.width);
        this.sprite.position.y = this.pos.y - this.shape.y + (this.sprite.anchor.y * this.shape.height);

        if(this.allowRotation) {
            this.sprite.angle = this.rotation;
        }
    }
});
