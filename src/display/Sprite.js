var EventEmitter = require('../utils/EventEmitter'),
    Rectangle = require('../geom/Rectangle'),
    PhysicsTarget = require('../physics/PhysicsTarget'),
    inherit = require('../utils/inherit'),
    Texture = require('./Texture'),
    math = require('../math/math'),
    utils = require('../utils/utils'),
    PIXI = require('../vendor/pixi');

/**
 * The base Sprite class. This class is the base for all images on the screen. This class extends PIXI's Sprite.
 *
 * @class Sprite
 * @extends [PIXI.Sprite](http://www.goodboydigital.com/pixijs/docs/classes/Sprite.html)
 * @uses EventEmitter
 * @constructor
 * @param textures {Texture|Array<Texture>|Object} The texture for the sprite to display, an array of texture to animation through, or an animation object.
 *      The later looks like: `{ animationName: { frames: [frame1, frame2], speed: 0.5, loop: false } }` where each frame is a Texture object
 * @param [speed] {Number} The speed of the animations (can be overriden on a specific animations)
 * @param [start] {String} The animation to start with, defaults to the first found key otherwise
 * @example
 *      var spr = new gf.Sprite(texture);
 */
var Sprite = function(anims, speed, start) {
    EventEmitter.call(this);
    PhysicsTarget.call(this);

    if(!anims) {
        anims = Texture.__default;
    }

    //parse tx into correct format
    if(anims instanceof Texture) {
        anims = { _default: { frames: [anims] } };
        start = '_default';
    }
    else if(anims instanceof Array) {
        anims = { _default: { frames: anims } };
        start = '_default';
    } else {
        //massage animations into full format
        for(var a in anims) {
            if(start === undefined)
                start = a;

            var anim = anims[a];

            if(anim instanceof Array)
                anims[a] = { name: a, frames: anim };
            else if(anim instanceof Texture)
                anims[a] = { name: a, frames: [anim] };
            else
                anims[a].name = a;
        }
    }

    PIXI.Sprite.call(this, anims[start].frames[0]);

    /**
     * The name of the sprite
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    /**
     * The lifetime of the sprite. Once it reaches 0 (after being set)
     * the sprite's visible property is set to false, so that it will
     * no longer be rendered. NOT YET IMPLEMENTED
     *
     * @property lifetime
     * @type Number
     * @default Infinity
     * @private
     */
    this.lifespan = Infinity;

    /**
     * The animation speed for this sprite
     *
     * @property speed
     * @type Number
     * @default 1
     */
    this.speed = speed || 1;

    /**
     * Whether or not to loop the animations. This can be overriden
     * on a per-animation level
     *
     * @property loop
     * @type Boolean
     * @default false
     */
    this.loop = false;

    /**
     * The registerd animations for this AnimatedSprite
     *
     * @property animations
     * @type Object
     * @readOnly
     */
    this.animations = anims;

    /**
     * The currently playing animation
     *
     * @property currentAnimation
     * @type String
     * @readOnly
     */
    this.currentAnimation = start;

    /**
     * The current frame being shown
     *
     * @property currentFrame
     * @type Number
     * @readOnly
     */
    this.currentFrame = 0;

    /**
     * Whether or not the animation is currently playing
     *
     * @property playing
     * @type Boolean
     * @readOnly
     */
    this.playing = false;

    this.hitArea = this.hitArea || new Rectangle(0, 0, this.width, this.height);

    //show first frame
    this.goto(0, this.currentAnimation);

    /**
     * Fired when a new frame of the running animation is shown
     *
     * @event frame
     * @param animation {String} The animation name that is playing
     * @param frameId {Number} The frame that is being shown
     */

    /**
     * Fired when the running animation completes
     *
     * @event complete
     * @param animation {String} The animation that has completed
     */
};

inherit(Sprite, PIXI.Sprite, {
    /**
     * Sets the sprite to visible = true
     *
     * @method show
     * @return {Sprite} Returns itself.
     * @chainable
     */
    show: function() {
        this.visible = true;
        return this;
    },
    /**
     * Sets the sprite to visible = false
     *
     * @method hide
     * @return {Sprite} Returns itself.
     * @chainable
     */
    hide: function() {
        this.visible = false;
        return this;
    },
    /**
     * Creates a new Sprite instance with the same values as this one
     *
     * @method clone
     * @return {Sprite} Returns the new sprite
     */
    clone: function() {
        //make a copy of our animations object
        var anims = utils.extend(true, {}, this.animations),
            spr = new Sprite(anims, this.speed, this.currentAnimation);

        spr.name = this.name;
        spr.loop = this.loop;
        spr.currentFrame = this.currentFrame;
        spr.playing = this.playing;
        spr.hitArea = this.hitArea.clone();

        spr.body = this.body.clone();

        spr.blendMode = this.blendMode;

        spr.anchor.x = this.anchor.x;
        spr.anchor.y = this.anchor.y;

        spr.position.x = this.position.x;
        spr.position.y = this.position.y;

        spr.scale.x = this.scale.x;
        spr.scale.y = this.scale.y;

        spr.pivot.x = this.pivot.x;
        spr.pivot.y = this.pivot.y;

        spr.rotation = this.rotation;
        spr.alpha = this.alpha;
        spr.visible = this.visible;
        spr.buttonMode = this.buttonMode;
        spr.renderable = this.renderable;

        //Don't copy some pixi stuff

        //spr.children = this.children;
        //spr.parent = this.parent;
        //spr.stage = this.stage;
        //spr.worldAlpha = this.worldAlpha;
        //spr._interactive = this._interactive;
        //spr.worldTransform = this.worldTransform;
        //spr.localTransform = this.localTransform;
        //spr.color = this.color;
        //spr.dynamic = this.dynamic;

        return spr;
    },
    /**
     * Adds a new animation to this animated sprite
     *
     * @method addAnimation
     * @param name {String} The string name of the animation
     * @param frames {Array<Texture>} The array of texture frames
     * @param [speed] {Number} The animation speed
     * @param [loop] {Boolean} Loop the animation or not
     * @return {Sprite} Returns itself.
     * @chainable
     */
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

        return this;
    },
    /**
     * Goes to a frame and starts playing the animation from there. You can optionally
     * pass the name of a new aniamtion to start playing.
     *
     * @method goto
     * @param frame {Number} The index of the frame to start on
     * @param [name] {String} The string name of the animation to go to
     * @return {Sprite} Returns itself.
     * @chainable
     */
    goto: function(frame, anim) {
        if(typeof frame === 'string') {
            anim = frame;
            frame = 0;
        }

        this.currentFrame = frame || 0;
        this.lastRound = math.round(frame || 0);

        if(anim) {
            this.currentAnimation = anim;
        }

        this.setTexture(this.animations[this.currentAnimation].frames[this.currentFrame]);
        this.emit('frame', this.currentAnimation, this.lastRound);

        return this;
    },
    /**
     * Starts playing the currently active animation
     *
     * @method play
     * @return {Sprite} Returns itself.
     * @chainable
     */
    play: function() {
        this.playing = true;
        return this;
    },
    /**
     * Stops playing the currently active animation
     *
     * @method stop
     * @return {Sprite} Returns itself.
     * @chainable
     */
    stop: function() {
        this.playing = false;
        return this;
    },
    /**
     * Removes this sprite from the stage and the physics system
     *
     * @method destroy
     */
    destroy: function() {
        this.stop();
        this.disablePhysics();

        if(this.parent)
            this.parent.removeChild(this);

        this.name = null;
        this.lifetime = null;
        this.speed = null;
        this.loop = null;
        this.animations = null;
        this.currentAnimation = null;
        this.currentFrame = null;
        this.playing = null;
        this.hitArea = null;
    },
    /**
     * Called by PIXI to update our textures and do the actual animation
     *
     * @method updateTransform
     * @private
     */
    updateTransform: function() {
        PIXI.Sprite.prototype.updateTransform.call(this);

        if(!this.playing) return;

        var anim = this.animations[this.currentAnimation],
            round,
            loop = anim.loop !== undefined ? anim.loop : this.loop;

        this.currentFrame += anim.speed || this.speed;
        round = math.round(this.currentFrame);

        if(round < anim.frames.length) {
            if(round !== this.lastRound) {
                this.lastRound = round;
                this.setTexture(anim.frames[round]);
                this.emit('frame', this.currentAnimation, round);
            }
        }
        else {
            if(loop) {
                this.goto(0);
            } else {
                this.stop();
                this.emit('complete', this.currentAnimation);
            }
        }
    }
});

module.exports = Sprite;

//Add event echos
/*
['click', 'mousedown', 'mouseup', 'mouseupoutside', 'mouseover', 'mouseout', 'mousemove', 'tap', 'touchstart', 'touchend', 'touchendoutside'].forEach(function(evtname) {
    Sprite.prototype[evtname] = module.exports = function(e) {
        this.emit(evtname, e);
    };
});
*/

/*
 * MOUSE Callbacks
 */

/**
 * A callback that is used when the users clicks on the sprite with their mouse
 *
 * @event click
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user clicks the mouse down over the sprite
 *
 * @event mousedown
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite
 * for this callback to be fired the mouse must have been pressed down over the sprite
 *
 * @event mouseup
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite but is no longer over the sprite
 * for this callback to be fired, The touch must have started over the sprite
 *
 * @event mouseupoutside
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse rolls over the sprite
 *
 * @event mouseover
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse leaves the sprite
 *
 * @event mouseout
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user moves the mouse while over the sprite
 *
 * @event mousemove
 * @param interactionData {InteractionData}
 */

/*
 * TOUCH Callbacks
 */

/**
 * A callback that is used when the users taps on the sprite with their finger
 * basically a touch version of click
 *
 * @event tap
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user touch's over the sprite
 *
 * @event touchstart
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases a touch over the sprite
 *
 * @event touchend
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the touch that was over the sprite
 * for this callback to be fired, The touch must have started over the sprite
 *
 * @event touchendoutside
 * @param interactionData {InteractionData}
 */
