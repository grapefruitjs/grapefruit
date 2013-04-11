/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @module gf
 * @class Sprite
 * @extends DisplayObject
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
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

    /**
     * The defined animations for this Sprite, this maps the names to the childIndexes
     *
     * @property anim
     * @private
     * @readOnly
     * @type Object
     */
    this.anim = {};

    /**
     * The currently active animation
     *
     * @property currentAnim
     * @private
     * @readOnly
     * @type Object
     */
    this.currentAnim = null;

    /**
     * Whether or not this Sprite is interactive. Please either pass this in with the
     * ctor or use setInteractive to change it later. Changing this property directly
     * on-the-fly will yield unexpected results.
     *
     * @property interactive
     * @type Boolean
     */
    this.interactive = false;

    //call base ctor
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, settings);

    //add the animations passed to ctor
    if(settings.animations) {
        for(var name in settings.animations) {
            this.addAnimation(name, settings.animations[name]);
        }
    }

    //if a texture is passed, make this just display the texture
    if(settings.texture) {
        if(typeof settings.texture === 'string') {
            if(gf.assetCache[settings.texture])
                settings.texture = gf.assetCache[settings.texture];
            else {
                var loader = new gf.AssetLoader();
                settings.texture = loader.loadTexture(settings.texture, settings.texture);
            }
        }

        if(settings.texture instanceof gf.Texture) {
            var spr = new PIXI.Sprite(settings.texture);
            if(settings.interactive) spr.setInteractive(true);
            this.addChild(spr);
            this.anim['default'] = spr;
        }
    }

    //copied from http://www.goodboydigital.com/pixijs/docs/files/src_pixi_Sprite.js.html

    /*
    * MOUSE Callbacks
    */
    /**
    * A callback that is used when the users clicks on the sprite with thier mouse
    * @method click
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user clicks the mouse down over the sprite
    * @method mousedown
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user releases the mouse that was over the sprite
    * for this callback to be fired the mouse must have been pressed down over the sprite
    * @method mouseup
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the users mouse rolls over the sprite
    * @method mouseover
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the users mouse leaves the sprite
    * @method mouseout
    * @param interactionData {InteractionData}
    */

    /*
    * TOUCH Callbacks
    */

    /**
    * A callback that is used when the users taps on the sprite with thier finger
    * basically a touch version of click
    * @method tap
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user touch's over the sprite
    * @method touchstart
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user releases the touch that was over the sprite
    * for this callback to be fired. The touch must have started over the sprite
    * @method touchend
    * @param interactionData {InteractionData}
    */
};

gf.inherits(gf.Sprite, gf.DisplayObject, {
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
    addAnimation: function(name, frames, speed) {
        if(!frames)
            throw 'No textures passed to addAnimation()';

        //ensure all the items in the array are textures
        if(frames instanceof Array) {
            for(var i = 0, il = frames.length; i < il; ++i) {
                if(typeof frames[i] === 'string') {
                    if(!PIXI.TextureCache[frames[i]])
                        throw 'Texture ' + frames[i] + ' is not in cache, please load it first';

                    frames[i] = PIXI.TextureCache[frames[i]];
                }
            }
        }

        //if there is a single texture passed, then put it in an array
        if(frames instanceof gf.Texture)
            frames = [frames];

        //if a string is passed, get it from the texture cache
        if(typeof frames === 'string') {
            if(!PIXI.TextureCache[frames])
                throw 'Texture ' + frames + ' is not in cache, please load it first';

            frames = [PIXI.TextureCache[frames]];
        }

        //create a movie clip from the textures
        var clip = new PIXI.MovieClip(frames);
        clip.stop();
        clip.visible = false;
        clip.name = name;

        if(this.interactive)
            clip.setInteractive(this.interactive);

        if(speed)
            clip.animationSpeed = speed;

        this.addChild(clip);

        this.anim[name] = clip.childIndex;

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
    setActiveAnimation: function(name, loop, cb) {
        if(this.anim[name] !== undefined) {
            if(this.currentAnim) {
                this.currentAnim.stop();
                this.currentAnim.visible = false;
            }

            this.currentAnim = this.children[this.anim[name]];
            this.currentAnim.visible = true;
            this.currentAnim.loop = loop;
            this.currentAnim.onComplete = cb;
            this.currentAnim.gotoAndPlay(0);
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
        return this.currentAnim.name === name;
    },
    /**
     * Sets whether or not this sprite is interactive (can be clicked)
     *
     * @method setInteractive
     * @param interactive {Boolean}
     */
    setInteractive: function(interactive) {
        this.interactive = interactive;
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.children[i].setInteractive)
                this.children[i].setInteractive(interactive);
        }
    }
});

//Add some PIXI.MovieClip functions that just call that
// function for the currently playing animation
['stop', 'play', 'gotoAndStop', 'gotoAndPlay'].forEach(function(fn) {
    gf.Sprite.prototype[fn] = function() {
        if(this.currentAnim && this.currentAnim[fn])
            this.currentAnim[fn].apply(this.currentAnim, arguments);
    };
});

/**
 * Stops the currently active animation
 * @method stop
 */

/**
 * Plays the currently active animation
 * @method play
 */

/**
 * Stops the currently active animation and goes to a specific frame
 * @method gotoAndStop
 * @param frameNumber {Number} frame index to stop at
 */

/**
 * Goes to a specific frame and begins playing the currently active animation
 * @method gotoAndPlay
 * @param frameNumber {Number} frame index to start at
 */