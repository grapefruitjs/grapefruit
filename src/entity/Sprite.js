/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @module gf
 * @class Sprite
 * @extends PIXI.MovieClip
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls, acceptable values
 *          are size {Vector}, name {String}, animations {Object}
 * @example
 *      var spr = new gf.Sprite([10, 1], { name: 'MySprite' });
 */
gf.Sprite = function(pos, settings) {
    /**
     * The size of the sprite
     *
     * @property size
     * @type gf.Vector
     * @default new gf.Vector(0, 0);
     */
    this.size = new gf.Vector(0, 0);

    /**
     * The name of this sprite
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    //defined sprite animations
    this.anim = {};

    //currently active animation
    this.currentAnim = null;

    //call base class
    PIXI.MovieClip.call(this, settings.textures || settings.frames);

    //mixin user's settings
    gf.utils.setValues(this, settings);

    //set the initial position
    this.setPosition(pos);

    //add the animations passed to ctor
    if(settings.animations) {
        for(var name in settings.animations) {
            this.addAnimation(name, settings.animations[name]);
        }
    }
};

gf.inherits(gf.Sprite, PIXI.MovieClip, {
    /**
     * Defines a new animation on the Sprite
     *
     * @method addAnimation
     * @param name {String} The name of the animation, any string you want to name it
     * @param frames {Texture|Array} The frames of the animation, you can pass one gf.Texture
     *      as a frame, or an Array of gf.Texture's
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.addAnimation('walk-left', new gf.Texture())
     *          .addAnimation('walk-right', [new gf.Texture(), new gf.Texture()]);
     */
    addAnimation: function(name, frames) {
        if(frames instanceof gf.Texture)
            frames = [frames];

        if(!frames)
            throw 'No textures passed to addAnimation()';

        this.anim[name] = {
            name: name,
            textures: frames
        };

        return this;
    },
    /**
     * Sets the active animation of the sprite, and starts the animation at index 0
     *
     * @method setActiveAnimation
     * @param name {String} The name of the animation to play (defined with addAnimation());
     * @param cb {Function} Callback when the animation completes, NOT YET IMPLEMENTED
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.addAnimation('me', new gf.Texture())
     *          .setActiveAnimation('me');
     */
    setActiveAnimation: function(name, cb) {
        if(this.anim[name]) {
            this.currentAnim = name;
            this.textures = this.anim[name].textures;
            this.gotoAndPlay(0);
            //TODO: Callback
            setTimeout(cb, 0);
        } else {
            throw 'Unknown animation ' + name;
        }

        return this;
    },
    /**
     * Convenience method for setting the position of the Sprite.
     *
     * @method setPosition
     * @param x {Number|Array|Vector|Point} X coord to put the sprite at.
     *       If an Array, Vector, or Point is passed then the y parameter is ignored
     * @param y {Number} Y coord to put the sprite at
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.setPosition(1, 1)
     *          .setPosition([5, 5])
     *          .setPosition(new gf.Point(10, 10))
     *          .setPosition(new gf.Vector(20, 20));
     */
    setPosition: function(x, y) {
        if(x instanceof gf.Vector || x instanceof gf.Point) {
            this.position.x = x.x;
            this.position.y = x.y;
        }
        else if(x instanceof Array) {
            this.position.x = x[0];
            this.position.y = x[1];
        } else {
            this.position.x = x;
            this.position.y = y;
        }

        return this;
    },
    /**
     * Checks if the name is the active animation
     *
     * @method isActiveAnimation
     * @param name {String} The name of the animation to check if it is currently active
     * @return {Boolean} true if the animation is active, false otherwise.
     * @example
     *      spr.addAnimation('walk-left', new gf.Texture())
     *          .isActiveAnimation('walk-left'); //false
     *
     *      spr.setActiveAnimation('walk-left')
     *          .isActiveAnimation('walk-left'); //true
     */
    isActiveAnimation: function(name) {
        return this.currentAnim === name;
    },
    /**
     * Frame update stub
     *
     * @method update
     * @private
     */
    update: function() {
        return this;
    }
});