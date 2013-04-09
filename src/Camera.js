
/**
 * A basic Camera object that provides some effects. It also will contain the HUD and GUI
 * to ensure they are using "screen-coords".
 * This camera instance is based on
 * <a href="https://github.com/photonstorm/kiwi-lite/blob/master/Kiwi%20Lite/Camera.ts">Kiwi-Lite's Camera</a>.
 *
 * @module gf
 * @class Camera
 * @extends DisplayObject
 * @constructor
 * @param game {Game} The game this camera belongs to
 * @param settings {Object} Any settings you want to override the default properties with
 */
gf.Camera = function(game, settings) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The bounds of that the camera can move to
     *
     * @property bounds
     * @type PIXI.Rectangle
     * @readOnly
     * @private
     */
    this._bounds = new PIXI.Rectangle(0, 0, 0, 0);

    /**
     * When following an entity this is the space within the camera that it can move around
     * before the camera moves to track it.
     *
     * @property _deadzone
     * @type PIXI.Rectangle
     * @readOnly
     * @private
     */
    this._deadzone = null;

    /**
     * The target that the camera will follow
     *
     * @property _target
     * @type Entity
     * @readOnly
     * @private
     */
    this._target = null;

    /**
     * The size of the camera
     *
     * @property size
     * @type Vector
     * @readOnly
     */
    this.size = new gf.Vector(0, 0);

    /**
     * Half of the size of the camera
     *
     * @property hSize
     * @type Vector
     * @readOnly
     */
    this.hSize = new gf.Vector(0, 0);

    /**
     * The _fx namespace has all the instance variables for all the fx
     *
     * @property _fx
     * @type Object
     * @private
     * @readOnly
     */
    this._fx = {
        flash: {
            alpha: 0,
            complete: null
        },
        fade: {
            alpha: 0,
            complete: null
        },
        shake: {
            intensity: 0,
            duration: 0,
            direction: gf.Camera.SHAKE.BOTH,
            offset: new gf.Point(0, 0),
            previous: new gf.Point(0, 0),
            complete: null
        }
    };

    gf.DisplayObject.call(this, settings);

    //mixin user's settings
    gf.utils.setValues(this, settings);
};

gf.inherits(gf.Camera, gf.DisplayObject, {
    /**
     * Makes the camera flash with a certain color
     *
     * @method flash
     * @param color {Number} The color to flash the screen with
     * @param duration {Number} The time in milliseconds to fade away
     * @param callback {Function} The callback to call when the flash has completed
     * @return {Camera} Returns iteself for chainability
     */
    flash: function(color, duration, cb) {
        if(this._fx.flash.alpha > 0) return this;

        if(typeof duration === 'function') {
            cb = duration;
            duration = 1;
        }

        if(typeof color === 'function') {
            cb = color;
            duration = 1;
            color = 0xFFFFFF;
        }

        duration = duration || 1;
        if(duration < 0) duration = 1;

        if(color === undefined)
            color = 0xFFFFFF;

        /*var red = color >> 16 & 0xFF,
            green = color >> 8 & 0xFF,
            blue = color & 0xFF;*/

        this._fx.flash.color = color;
        this._fx.flash.duration = duration;
        this._fx.flash.alpha = 1;
        this._fx.flash.complete = onComplete;

        return this;
    },
    /**
     * Stops a running flash, instantly hiding it
     *
     * @method stopFlash
     * @return {Camera} Returns iteself for chainability
     */
    stopFlash: function() {
        this._fx.flash.alpha = 0;

        return this;
    },
    /**
     * Makes the camera fade into a color
     *
     * @method fade
     * @param color {Number} The color to fade into
     * @param duration {Number} The time in milliseconds to take to fade in
     * @param callback {Function} The callback to call when the fade has completed
     * @return {Camera} Returns iteself for chainability
     */
    fade: function(color, duration, cb) {
        if(this._fx.fade.alpha > 0) return this;

        if(typeof duration === 'function') {
            cb = duration;
            duration = 1;
        }

        if(typeof color === 'function') {
            cb = color;
            duration = 1;
            color = 0xFFFFFF;
        }

        duration = duration || 1;
        if(duration < 0) duration = 1;

        if(color === undefined)
            color = 0xFFFFFF;

        /*var red = color >> 16 & 0xFF,
            green = color >> 8 & 0xFF,
            blue = color & 0xFF;*/

        this._fx.fade.color = color;
        this._fx.fade.duration = duration;
        this._fx.fade.alpha = 0.01;
        this._fx.fade.complete = onComplete;

        return this;
    },
    /**
     * Stops a running fade, instantly hiding it
     *
     * @method stopFade
     * @return {Camera} Returns iteself for chainability
     */
    stopFade: function() {
        this._fx.fade.alpha = 0;

        return this;
    },
    /**
     * Shakes the camera around a bit, to show it who is boss.
     *
     * @method shake
     * @param intensity {Number} How hard to shake around
     * @param duration {Number} The time in milliseconds to shake for
     * @param direction {Camera.SHAKE} The axes to shake the camera in default is gf.Camera.SHAKE.BOTH
     * @param callback {Function} The callback to call when the shaking has stopped
     * @return {Camera} Returns iteself for chainability
     */
    shake: function(intensity, duration, direction, cb) {
        //already shaking (call stop first)
        if(this._fx.shake.offset.x !== 0 || this._fx.shake.offset.y !== 0)
            return this;

        if(typeof direction === 'function') {
            cb = direction;
            direction = gf.Camera.SHAKE.BOTH;
        }

        if(typeof duration === 'function') {
            cb = duration;
            direction = gf.Camera.SHAKE.BOTH;
            duration = 1;
        }

        if(typeof intensity === 'function') {
            cb = intensity;
            direction = gf.Camera.SHAKE.BOTH;
            duration = 1;
            intensity = 1;
        }

        intensity = intensity || 1;
        duration = duration || 1;
        direction = direction || gf.Camera.SHAKE.BOTH;

        //setup a shake effect
        this._fx.shake.intensity = intensity;
        this._fx.shake.duration = duration;
        this._fx.shake.direction = direction;
        this._fx.shake.offset.x = 0;
        this._fx.shake.offset.y = 0;
        this._fx.shake.previous.x = this.game.world.position.x;
        this._fx.shake.previous.y = this.game.world.position.y;
        this._fx.shake.complete = cb;

        return this;
    },
    /**
     * Stops a running shake effect
     *
     * @method stopShake
     * @return {Camera} Returns iteself for chainability
     */
    stopShake: function() {
        if(this._fx.shake.duration !== 0) {
            this._fx.shake.duration = 0;
            this._fx.shake.offset.x = 0;
            this._fx.shake.offset.y = 0;
            this.focus(this._fx.shake.previous);
        }

        return this;
    },
    /**
     * Stops all currently running effects (flash, fade, shake)
     *
     * @method stopAll
     * @return {Camera} Returns iteself for chainability
     */
    stopAll: function(type) {
        this.stopFlash();
        this.stopFade();
        this.stopShake();

        return this;
    },
    /**
     * Follows an entity with the camera, ensuring they are always center view. You can
     * pass a follow style to change the area an entity can move around in before we start
     * to move with them.
     *
     * @method follow
     * @param entity {Entity} The entity to follow
     * @param style {Camera.FOLLOW} The style of following, defaults to gf.Camera.FOLLOW.LOCKON
     * @return {Camera} Returns iteself for chainability
     */
    follow: function(ent, style) {
        this._target = ent;

        switch(style) {
            case gf.Camera.FOLLOW.PLATFORMER:
                var w = this.size.x / 8;
                var h = this.size.y / 3;
                this._deadzone = new PIXI.Rectangle(
                    (this.size.x - w) / 2,
                    (this.size.y - h) / 2 - h * 0.25,
                    w,
                    h
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN:
                var sq4 = Math.max(this.size.x, this.size.y) / 4;
                this._deadzone = new PIXI.Rectangle(
                    (this.size.x - sq4) / 2,
                    (this.size.y - sq4) / 2,
                    sq4,
                    sq4
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN_TIGHT:
                var sq8 = Math.max(this.size.x, this.size.y) / 8;
                this._deadzone = new PIXI.Rectangle(
                    (this.size.x - sq8) / 2,
                    (this.size.y - sq8) / 2,
                    sq8,
                    sq8
                );
                break;
            case gf.Camera.FOLLOW.LOCKON:
            default:
                this.deadzone = null;
                break;
        }

        return this;
    },
    /**
     * Stops following any entities
     *
     * @method unfollow
     * @return {Camera} Returns iteself for chainability
     */
    unfollow: function() {
        this._target = null;
        return this;
    },
    /**
     * Focuses the camera on an x,y position. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method focus
     * @param x {Number|Point} The x coord to focus on, if a Point is passed the y param is ignored
     * @param y {Number} The y coord to focus on
     * @return {Camera} Returns iteself for chainability
     */
    focus: function(x, y) {
        x = x instanceof gf.Point ? x.x : (x || 0);
        y = x instanceof gf.Point ? x.y : (y || 0);
        //x += (x > 0) ? 0.0000001 : -0.0000001;
        //y += (y > 0) ? 0.0000001 : -0.0000001;

        var dx = (x - this.hSize.x),
            dy = (y - this.hSize.y);

        //bound checks
        if(dx < this._bounds.x || (x + this.hSize.x) > this._bounds.maxX)
            dx = this.game.world.position.x;

        if(dy < this._bounds.y || (y + this.hSize.y) > this._bounds.maxY)
            dy = this.game.world.position.y;

        this.game.world.position.x = dx;
        this.game.world.position.y = dy;

        return this;
    },
    /**
     * Pans the camera around by the x,y amount. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Camera} Returns iteself for chainability
     */
    pan: function(dx, dy) {
        dx = dx instanceof gf.Point ? dx.x : (dx || 0);
        dy = dx instanceof gf.Point ? dx.y : (dy || 0);

        var newX = this.game.world.position.x + dx,
            newY = this.game.world.position.y + dy;

        if(newX < this._bounds.x || newX > this._bounds.maxX)
            newX = this.game.world.position.x;

        if(newY < this._bounds.y || newY > this._bounds.maxY)
            newY = this.game.world.position.y;

        this.game.world.position.x = dx;
        this.game.world.position.y = dy;
    },
    /**
     * Resizes the viewing area, this is called internally by your game instance
     * when you call mygame.resize(). DO NOT CALL THIS DIRECTLY
     *
     * @method resize
     * @private
     * @param w {Number} The new width
     * @param h {Number} The new height
     * @return {Camera} Returns iteself for chainability
     */
    resize: function(w, h) {
        this.size.set(w, h);
        this.hSize.set(this.size.x / 2, this.size.y / 2);

        return this;
    },
    /**
     * Sets the bounds the camera is allowed to go. Usually this is the world's
     * min and max, and is set for you.
     *
     * @method setBounds
     * @param x {Number} The minimum x coord (usually 0)
     * @param y {Number} The minimum y coord (usually 0)
     * @param width {Number} The maximum x coord (usually map width)
     * @param height {Number} The maximum y coord (usually map height)
     * @return {Camera} Returns iteself for chainability
     */
    setBounds: function(x, y, width, height) {
        this._bounds.x = x;
        this._bounds.y = y;
        this._bounds.width = width;
        this._bounds.height = height;

        this._bounds.maxX = this._bounds.x + this._bounds.width;
        this._bounds.maxY = this._bounds.y + this._bounds.height;

        return this;
    },
    /**
     * Called internally every frame. Updates all effects and the follow
     *
     * @method update
     * @return {Camera} Returns iteself for chainability
     */
    update: function() {
        //follow entity
        if(this._target) {
            if(!this.deadzone) {
                this.focus(this._target.position.x, this._target.y);
            } else {
                var moveX, moveY, dx, dy;
                moveX = moveY = dx = dy = 0;

                //check less than
                dx = this._target.x - this.deadzone.x;
                dy = this._target.y - this.deadzone.y;

                if(dx < 0)
                    moveX = dx;
                if(dy < 0)
                    moveY = dy;

                //check greater than
                dx = this._target.x - (this.deadzone.x + this.deadzone.width);
                dy = this._target.y - (this.deadzone.y + this.deadzone.height);

                if(dx > 0)
                    moveX = dx;
                if(dy > 0)
                    moveY = dy;

                this.pan(moveX, moveY);
            }
        }

        //update flash effect
        if(this._fx.flash.alpha > 0) {
            this._fx.flash.alpha -= (this.game._delta * 1000) / this._fx.flash.duration;

            if(this._fx.flash.alpha <= 0) {
                this._fx.flash.alpha = 0;

                if(this._fx.flash.complete)
                    this._fx.flash.complete();
            }
        }

        //update fade effect
        if(this._fx.fade.alpha > 0) {
            this._fx.fade.alpha += (this.game._delta * 1000) / this._fx.fade.duration;

            if(this._fx.fade.alpha >= 1) {
                this._fx.fade.alpha = 1;

                if(this._fx.fade.complete) {
                    this._fx.fade.complete();
                }
            }
        }

        //update shake effect
        if(this._fx.shake.duration > 0) {
            this._fx.shake.duration -= (this.game._delta * 1000);

            if(this._fx.shake.duration <= 0) {
                this._fx.shake.duration = 0;
                this._fx.shake.offset.x = 0;
                this._fx.shake.offset.y = 0;
                this.focus(this._fx.shake.previous);

                if(this._fx.shake.complete) {
                    this._fx.shake.complete();
                }
            }
            else {
                if((this._fx.shake.direction === gf.Camera.SHAKE.BOTH) || (this._fx.shake.direction === gf.Camera.SHAKE.HORIZONTAL))
                    this._fx.shake.offset.x = (Math.random() * this._fx.shake.intensity * this.size.x * 2 - this._fx.shake.intensity * this.size.x);

                if ((this._fx.shake.direction === gf.Camera.SHAKE.BOTH) || (this._fx.shake.direction === gf.Camera.SHAKE.VERTICAL))
                    this._fx.shake.offset.y = (Math.random() * this._fx.shake.intensity * this.size.y * 2 - this._fx.shake.intensity * this.size.y);
            }

            this.pan(this._fx.shake.offset);
        }

        return this;
    }
});

gf.Camera.FOLLOW = {
    PLATFORMER: 0,
    TOPDOWN: 1,
    TOPDOWN_TIGHT: 2,
    LOCKON: 3
};

gf.Camera.SHAKE = {
    BOTH: 0,
    HORIZONTAL: 1,
    VERTICAL: 2
};