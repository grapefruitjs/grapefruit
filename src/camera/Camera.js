/**
 * A basic Camera object that provides some effects. It also will contain the HUD and GUI
 * to ensure they are using "screen-coords".
 *
 * @class Camera
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param game {Game} The game this camera belongs to
 * @param settings {Object} Any settings you want to override the default properties with
 */
gf.Camera = function(game, settings) {
    /**
     * The bounds of that the camera can move to
     *
     * @property bounds
     * @type Rectangle
     * @readOnly
     * @private
     */
    this._bounds = new gf.Rectangle(0, 0, 0, 0);

    /**
     * When following a sprite this is the space within the camera that it can move around
     * before the camera moves to track it.
     *
     * @property _deadzone
     * @type Rectangle
     * @readOnly
     * @private
     */
    this._deadzone = null;

    /**
     * The target that the camera will follow
     *
     * @property _target
     * @type Sprite
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
     * The game this camera views
     *
     * @property game
     * @type Game
     * @readOnly
     */
    this.game = game;

    /**
     * The fxpools for doing camera effects
     *
     * @property fxpools
     * @type Object
     * @private
     * @readOnly
     */
    this.fxpools = {
        flash: new gf.ObjectPool(gf.Camera.fx.Flash, this),
        fade: new gf.ObjectPool(gf.Camera.fx.Fade, this),
        shake: new gf.ObjectPool(gf.Camera.fx.Shake, this),
        scanlines: new gf.ObjectPool(gf.Camera.fx.Scanlines, this),
        close: new gf.ObjectPool(gf.Camera.fx.Close, this)
    };

    gf.DisplayObjectContainer.call(this, settings);
};

gf.inherits(gf.Camera, gf.DisplayObjectContainer, {
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
        var flash = this.fxpools.flash.create(),
            self = this;

        return flash.start(color, duration, function() {
            self.fxpools.flash.free(flash);
            if(typeof cb === 'function')
                cb();
        });
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
        var fade = this.fxpools.fade.create(),
            self = this;

        return fade.start(color, duration, function() {
            self.fxpools.fade.free(fade);
            if(typeof cb === 'function')
                cb();
        });
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
        var shake = this.fxpools.shake.create(),
            self = this;

        return shake.start(intensity, duration, direction, function() {
            self.fxpools.shake.free(shake);
            if(typeof cb === 'function')
                cb();
        });
    },
    scanlines: function(color, direction, spacing, thickness, alpha) {
        var scanlines = this.fxpools.scanlines.create();

        return scanlines.start(color, direction, spacing, thickness, alpha);
    },
    close: function(shape, duration, cb) {
        var close = this.fxpools.close.create(),
            self = this;

        return close.start(shape, duration, function() {
            window.console.log('done!');
            self.fxpools.close.free(close);
            if(typeof cb === 'function')
                cb();
        });
    },
    /**
     * Stops all currently running effects (flash, fade, shake)
     *
     * @method stopAll
     * @return {Camera} Returns iteself for chainability
     */
    stopAll: function() {
        this.stopFlash();
        this.stopFade();
        this.stopShake();

        return this;
    },
    /**
     * Follows an sprite with the camera, ensuring they are always center view. You can
     * pass a follow style to change the area an sprite can move around in before we start
     * to move with them.
     *
     * @method follow
     * @param sprite {Sprite} The sprite to follow
     * @param style {Camera.FOLLOW} The style of following, defaults to gf.Camera.FOLLOW.LOCKON
     * @return {Camera} Returns iteself for chainability
     */
    follow: function(spr, style) {
        if(!(spr instanceof gf.Sprite))
            return this;

        this._target = spr;

        switch(style) {
            case gf.Camera.FOLLOW.PLATFORMER:
                var w = this.size.x / 8;
                var h = this.size.y / 3;
                this._deadzone = new gf.Rectangle(
                    (this.size.x - w) / 2,
                    (this.size.y - h) / 2 - (h / 4),
                    w,
                    h
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN:
                var sq4 = Math.max(this.size.x, this.size.y) / 4;
                this._deadzone = new gf.Rectangle(
                    (this.size.x - sq4) / 2,
                    (this.size.y - sq4) / 2,
                    sq4,
                    sq4
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN_TIGHT:
                var sq8 = Math.max(this.size.x, this.size.y) / 8;
                this._deadzone = new gf.Rectangle(
                    (this.size.x - sq8) / 2,
                    (this.size.y - sq8) / 2,
                    sq8,
                    sq8
                );
                break;
            case gf.Camera.FOLLOW.LOCKON:
                /* falls through */
            default:
                this._deadzone = null;
                break;
        }

        this.focusSprite(this._target);

        return this;
    },
    /**
     * Stops following any sprites
     *
     * @method unfollow
     * @return {Camera} Returns iteself for chainability
     */
    unfollow: function() {
        this._target = null;
        return this;
    },
    /**
     * Focuses the camera on a sprite.
     *
     * @method focusSprite
     * @param sprite {Sprite} The sprite to focus on
     * @return {Camera} Returns iteself for chainability
     */
    focusSprite: function(spr) {
        return this.focus(
            gf.math.round(spr.position.x) * this.game.world.scale.x,
            gf.math.round(spr.position.y) * this.game.world.scale.y
        );
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
        y = x instanceof gf.Point ? x.y : (y || 0);
        x = x instanceof gf.Point ? x.x : (x || 0);
        //x += (x > 0) ? 0.0000001 : -0.0000001;
        //y += (y > 0) ? 0.0000001 : -0.0000001;

        //calculate how much we need to pan
        var goToX = x - this.hSize.x,
            goToY = y - this.hSize.y,
            dx = goToX + this.game.world.position.x, //world pos is negative
            dy = goToY + this.game.world.position.y;

        return this.pan(dx, dy);
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
        dy = dx instanceof gf.Point ? dx.y : (dy || 0);
        dx = dx instanceof gf.Point ? dx.x : (dx || 0);

        if(!dx && !dy) return;

        var pos = this.game.world.position,
            newX = pos.x - dx,
            newY = pos.y - dy;

        if(this._bounds) {
            if(this._outsideBounds(-newX, -pos.y))
                dx = 0;
            if(this._outsideBounds(-pos.x, -newY))
                dy = 0;
        }

        if(dx || dy) {
            //if we move a lot, then just force a re render (less expensive then panning all the way there)
            if(Math.abs(dx) > this.hSize.x || Math.abs(dy) > this.hSize.y) {
                this.game.world.setPosition(this.game.world.position.x - dx, this.game.world.position.y - dy);
                this.game.world.resize(this.size.x, this.size.y);
            }
            //otherwise just pan
            else {
                this.game.world.pan(-dx, -dy);
            }
        }

        return this;
    },
    _outsideBounds: function(x, y) {
        return (
            !this._bounds.contains(x, y) || //top left
            !this._bounds.contains(x, y + this.size.y) || //bottom left
            !this._bounds.contains(x + this.size.x, y) || //top right
            !this._bounds.contains(x + this.size.x, y + this.size.y) //bottom right
        );
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
        this.hSize.set(
            Math.round(this.size.x / 2),
            Math.round(this.size.y / 2)
        );

        return this;
    },
    /**
     * Sets the bounds the camera is allowed to go. Usually this is the world's
     * min and max, and is set for you.
     *
     * @method constrain
     * @param shape {Rectangle|Polygon|Circle|Ellipse} The shape to constrain the camera into
     * @return {Camera} Returns iteself for chainability
     */
    constrain: function(shape, scaled) {
        this._bounds = shape;

        //scale the points
        if(!scaled) {
            if(shape instanceof gf.Rectangle) {
                shape.x *= this.game.world.scale.x;
                shape.y *= this.game.world.scale.y;
                shape.width *= this.game.world.scale.x;
                shape.height *= this.game.world.scale.y;
            } else if(shape instanceof gf.Polygon) {
                for(var i = 0; i < shape.points.length; ++i) {
                    var p = shape.points[i];

                    p.x *= this.game.world.scale.x;
                    p.y *= this.game.world.scale.y;
                }
            } else {
                shape.x *= this.game.world.scale.x;
                shape.y *= this.game.world.scale.y;
            }
        }

        return this;
    },
    unconstrain: function() {
        this._bounds = null;

        return this;
    },
    /**
     * Called internally every frame. Updates all effects and the follow
     *
     * @method update
     * @param dt {Number} The delta time (in seconds) since the last update
     * @return {Camera} Returns iteself for chainability
     * @private
     */
    update: function(dt) {
        //follow sprite
        if(this._target) {
            if(!this._deadzone) {
                this.focusSprite(this._target);
            } else {
                var moveX, moveY,
                    dx, dy,
                    //get the x,y of the sprite on the screen
                    camX = (this._target.position.x + (this.game.world.position.x / this.game.world.scale.x)) * this.game.world.scale.x,
                    camY = (this._target.position.y + (this.game.world.position.y / this.game.world.scale.y)) * this.game.world.scale.y;

                moveX = moveY = dx = dy = 0;

                //check less than
                dx = camX - this._deadzone.x;
                dy = camY - this._deadzone.y;

                if(dx < 0)
                    moveX = dx;
                if(dy < 0)
                    moveY = dy;

                //check greater than
                dx = camX - (this._deadzone.x + this._deadzone.width);
                dy = camY - (this._deadzone.y + this._deadzone.height);

                if(dx > 0)
                    moveX = dx;
                if(dy > 0)
                    moveY = dy;

                this.pan(
                    Math.round(moveX),
                    Math.round(moveY)
                );
            }
        }

        //update effects
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var c = this.children[i];
            if(c.update)
                c.update(dt);
        }

        return this;
    }
});

/**
 * Camera follow types (used for camera.follow())
 *
 * @property FOLLOW
 * @type Object
 * @static
 */
gf.Camera.FOLLOW = {
    PLATFORMER: 0,
    TOPDOWN: 1,
    TOPDOWN_TIGHT: 2,
    LOCKON: 3
};