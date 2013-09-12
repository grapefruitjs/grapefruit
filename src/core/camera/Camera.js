var DisplayObjectContainer = require('../display/DisplayObjectContainer'),
    ObjectPool = require('../utils/ObjectPool'),
    globals = require('../globals');

/**
 * A basic Camera object that provides some effects. It also will contain the HUD and GUI
 * to ensure they are using "screen-coords".
 *
 * @class Camera
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param game {gf.Game} The game this camera belongs to
 * @param settings {Object} Any settings you want to override the default properties with
 */
var Camera = module.exports = function(game, settings) {
    /**
     * The bounds of that the camera can move to
     *
     * @property bounds
     * @type gf.Rectangle
     * @readOnly
     * @private
     */
    this._bounds = new gf.Rectangle(0, 0, 0, 0);

    /**
     * When following a sprite this is the space within the camera that it can move around
     * before the camera moves to track it.
     *
     * @property _deadzone
     * @type gf.Rectangle
     * @readOnly
     * @private
     */
    this._deadzone = null;

    /**
     * The target that the camera will follow
     *
     * @property _target
     * @type gf.Sprite
     * @readOnly
     * @private
     */
    this._target = null;

    /**
     * The size of the camera
     *
     * @property size
     * @type gf.Vector
     * @readOnly
     */
    this.size = new gf.Vector(0, 0);

    /**
     * Half of the size of the camera
     *
     * @property hSize
     * @type gf.Vector
     * @readOnly
     */
    this.hSize = new gf.Vector(0, 0);

    /**
     * The game this camera views
     *
     * @property game
     * @type gf.Game
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

    DisplayObjectContainer.call(this, settings);

    /*
     * Dynamic addition of fx shortcuts
    var self = this;
    Object.keys(this.fxpools).forEach(function(key) {
        self[key] = function() {
            var e = self.fxpools[key].create(),
                args = Array.prototype.slice.call(arguments),
                cb = args.pop();

            if(typeof cb !== 'function')
                args.push(cb);

            args.push(function() {
                self.fxpools[key].free(e);
                if(typeof cb === 'function')
                    cb();
            });

            return e.start.apply(e, args);
        };
    });
    */
};

globals.inherits(Camera, DisplayObjectContainer, {
    /**
     * Follows an sprite with the camera, ensuring they are always center view. You can
     * pass a follow style to change the area an sprite can move around in before we start
     * to move with them.
     *
     * @method follow
     * @param sprite {gf.Sprite} The sprite to follow
     * @param [style=gf.Camera.FOLLOW.LOCKON] {gf.Camera.FOLLOW} The style of following
     * @return {gf.Camera} Returns iteself for chainability
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
     * @return {gf.Camera} Returns iteself for chainability
     */
    unfollow: function() {
        this._target = null;
        return this;
    },
    /**
     * Focuses the camera on a sprite.
     *
     * @method focusSprite
     * @param sprite {gf.Sprite} The sprite to focus on
     * @return {gf.Camera} Returns iteself for chainability
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
     * @param x {Number|gf.Point} The x coord to focus on, if a Point is passed the y param is ignored
     * @param y {Number} The y coord to focus on
     * @return {gf.Camera} Returns iteself for chainability
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
     * @param x {Number|gf.Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {gf.Camera} Returns iteself for chainability
     */
    pan: function(dx, dy) {
        dy = dx instanceof gf.Point ? dx.y : (dy || 0);
        dx = dx instanceof gf.Point ? dx.x : (dx || 0);

        if(!dx && !dy) return;

            //world position
        var pos = this.game.world.position,
            //new world position
            newX = pos.x - dx,
            newY = pos.y - dy,
            b = this._bounds;

        if(this._bounds) {
            if(this._outsideBounds(-newX, -pos.y))
                dx = dx < 0 ? b.x + pos.x : (b.x + b.width) - this.size.x + pos.x; //how far can we move since dx is too much
            if(this._outsideBounds(-pos.x, -newY))
                dy = dy < 0 ? b.y + pos.y : (b.y + b.height) - this.size.y + pos.y;
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
     * @return {gf.Camera} Returns iteself for chainability
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
     * @param shape {gf.Rectangle|gf.Polygon|gf.Circle|gf.Ellipse} The shape to constrain the camera into
     * @return {gf.Camera} Returns iteself for chainability
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
     * @return {gf.gf.Camera} Returns iteself for chainability
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
Camera.FOLLOW = {
    PLATFORMER: 0,
    TOPDOWN: 1,
    TOPDOWN_TIGHT: 2,
    LOCKON: 3
};