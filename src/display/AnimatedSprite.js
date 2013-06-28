/**
 * The base AnimatedSprite class
 * @class AnimatedSprite
 * @extends Sprite
 * @constructor
 * @param animations {Object} An object of the form <code>{ animationName: [frame1, frame2] }</code> or you can also specify overrides on a per-animation basis:
 *      <code>{ animationName: { frames: [frame1, frame2], speed: 2 } }. Each frame is a Texture object
 * @param speed {Number} The speed of the animations (can be overriden on a specific animations)
 * @param start {String} The animation to start with, defaults to the first found key otherwise
 */
gf.AnimatedSprite = function(anims, speed, start) {
    //massage animations into proper format
    for(var a in anims) {
        if(start === undefined)
            start = a;

        var anim = anims[a];

        if(anim instanceof Array)
            anims[a] = { frames: anim };
    }

    gf.Sprite.call(this, anims[start].frames[0]);

    this.animations = anims;
    this.speed = speed || 1;
    this.currentAnimation = start;
    this.currentFrame = 0;
    this.playing = false;
    this.loop = false;
};

gf.inherits(gf.AnimatedSprite, gf.Sprite, {
    addAnimation: function(name, frames, speed, loop) {
        if(typeof name === 'object') {
            this.animations[name.name] = name;
        } else {
            this.animations[name] = {
                name: name,
                frames: frames,
                speed: speed,
                loop: loop
            };
        }
    },
    gotoAndPlay: function(anim, frame) {
        if(typeof anim === 'number') {
            this.currenFrame = anim;
        } else {
            this.currenFrame = frame || 0;
            this.currentAnimation = anim;
        }

        this.playing = true;
    },
    gotoAndStop: function(anim, frame) {
        if(typeof anim === 'number') {
            this.currentFrame = anim;
        } else {
            this.currentFrame = frame || 0;
            this.currentAnimation = anim;
        }

        this.setTexture(this.animations[this.currentAnimation].frames[this.currentFrame]);
        this.playing = false;
    },
    play: function() {
        this.playing = true;
    },
    stop: function() {
        this.playing = false;
    },
    updateTransform: function() {
        gf.Sprite.prototype.updateTransform.call(this);

        if(!this.playing) return;

        var anim = this.animations[this.currentAnimation],
            round;

        this.currentFrame += anim.speed || this.speed;
        round = gf.math.round(this.currentFrame);

        if(round < anim.frames.length) {
            this.setTexture(anim.frames[round]);
        }
        else {
            if(anim.loop || this.loop) {
                this.gotoAndPlay(0);
            } else {
                this.stop();
                this.emit('complete', this.currentAnimation);
            }
        }
    }
});