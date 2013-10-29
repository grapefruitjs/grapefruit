var Container = require('../display/Container'),
    Sprite = require('../display/Sprite'),
    Rectangle = require('../geom/Rectangle'),
    Vector = require('../math/Vector'),
    ObjectPool = require('../utils/ObjectPool'),
    ObjectFactory = require('../utils/ObjectFactory'),
    //camera fx
    Close = require('../fx/camera/Close'),
    Fade = require('../fx/camera/Fade'),
    Flash = require('../fx/camera/Flash'),
    Scanlines = require('../fx/camera/Scanlines'),
    Shake = require('../fx/camera/Shake'),

    inherit = require('../utils/inherit'),
    math = require('../math/math'),
    C = require('../constants');

/**
 * A basic Camera object that provides some effects. It also will contain the HUD and GUI
 * to ensure they are using "screen-coords".
 *
 * @class Camera
 * @extends Container
 * @constructor
 */
var Camera = function(state) {
    /**
     * The world instance this camera is tied to
     *
     * @property world
     * @type World
     */
    this.world = state.world;

    /**
     * The game instance this camera belongs to
     *
     * @property game
     * @type Game
     */
    this.game = state.game;

    /**
     * The game state this camera belongs to
     *
     * @property state
     * @type State
     */
    this.state = state;

    /**
     * The bounds of that the camera can move to
     *
     * @property bounds
     * @type Rectangle
     * @readOnly
     * @private
     */
    this.bounds = state.world.bounds.clone();

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
    this.size = new Vector(0, 0);

    /**
     * Half of the size of the camera
     *
     * @property hSize
     * @type Vector
     * @readOnly
     */
    this.hSize = new Vector(0, 0);

    /**
     * The container that holds all the GUI items, direct children of Camera are effects
     *
     * @property gui
     * @type Container
     * @readOnly
     */
    this.gui = new Container();

    /**
     * An object factory for creating game objects
     *
     * @property add
     * @type ObjectFactory
     */
    this.add = new ObjectFactory(state, this.gui);

    /**
     * The fxpools for doing camera effects
     *
     * @property fxpools
     * @type Object
     * @private
     * @readOnly
     */
    this.fxpools = {
        flash: new ObjectPool(Flash, this),
        fade: new ObjectPool(Fade, this),
        shake: new ObjectPool(Shake, this),
        scanlines: new ObjectPool(Scanlines, this),
        close: new ObjectPool(Close, this)
    };

    //Dynamic addition of fx shortcuts
    var self = this;
    Object.keys(this.fxpools).forEach(function(key) {
        self[key] = function() {
            var e = self.fxpools[key].create(),
                args = Array.prototype.slice.call(arguments),
                cb = args.pop();

            if(typeof cb !== 'function')
                args.push(cb);

            args.push(this._fxCallback.bind(this, e, key, cb));

            return e.start.apply(e, args);
        };
    });

    Container.call(this);

    //add the gui child
    this.addChild(this.gui);
};

inherit(Camera, Container, {
    _fxCallback: function(fx, type, cb) {
        var ret;

        if(typeof cb === 'function')
            ret = cb();

        this.fxpools[type].free(fx);

        return ret;
    },
    /**
     * Follows an sprite with the camera, ensuring they are always center view. You can
     * pass a follow style to change the area an sprite can move around in before we start
     * to move with them.
     *
     * @method follow
     * @param sprite {Sprite} The sprite to follow
     * @param [style=CAMERA_FOLLOW.LOCKON] {CAMERA_FOLLOW} The style of following
     * @return {Camera} Returns iteself for chainability
     */
    follow: function(spr, style) {
        if(!(spr instanceof Sprite))
            return this;

        this._target = spr;

        switch(style) {
            case C.CAMERA_FOLLOW.PLATFORMER:
                var w = this.size.x / 8;
                var h = this.size.y / 3;
                this._deadzone = new Rectangle(
                    (this.size.x - w) / 2,
                    (this.size.y - h) / 2 - (h / 4),
                    w,
                    h
                );
                break;
            case C.CAMERA_FOLLOW.TOPDOWN:
                var sq4 = Math.max(this.size.x, this.size.y) / 4;
                this._deadzone = new Rectangle(
                    (this.size.x - sq4) / 2,
                    (this.size.y - sq4) / 2,
                    sq4,
                    sq4
                );
                break;
            case C.CAMERA_FOLLOW.TOPDOWN_TIGHT:
                var sq8 = Math.max(this.size.x, this.size.y) / 8;
                this._deadzone = new Rectangle(
                    (this.size.x - sq8) / 2,
                    (this.size.y - sq8) / 2,
                    sq8,
                    sq8
                );
                break;
            case C.CAMERA_FOLLOW.LOCKON:
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
        var x = spr.localTransform[2],
            y = spr.localTransform[5],
            p = spr.parent;

        //need the transform of the sprite that doesn't take into account
        //the world object. So add up the local transforms to that point.
        while(p && p !== this.world) {
            x += p.localTransform[2];
            y += p.localTransform[5];
            p = p.parent;
        }

        return this.focus(
            //multiple the calculated point by the world scale for this sprite
            math.floor(x * spr.worldTransform[0]),
            math.floor(y * spr.worldTransform[4])
        );
    },
    /**
     * Focuses the camera on an x,y position. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method focus
     * @param x {Number|Vector} The x coord to focus on, if a Vector is passed the y param is ignored
     * @param y {Number} The y coord to focus on
     * @return {Camera} Returns iteself for chainability
     */
    focus: function(x, y) {
        y = x.y !== undefined ? x.y : (y || 0);
        x = x.x !== undefined ? x.x : (x || 0);

        //calculate how much we need to pan
        var goToX = x - this.hSize.x,
            goToY = y - this.hSize.y,
            dx = goToX + this.world.position.x, //world pos is negative
            dy = goToY + this.world.position.y;

        return this.pan(dx, dy);
    },
    /**
     * Pans the camera around by the x,y amount. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method pan
     * @param x {Number|Vector} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Camera} Returns iteself for chainability
     */
    pan: function(dx, dy) {
        dy = dx.y !== undefined ? dx.y : (dy || 0);
        dx = dx.x !== undefined ? dx.x : (dx || 0);

        if(!dx && !dy) return;

            //world position
        var pos = this.world.position,
            //new world position
            newX = pos.x - dx,
            newY = pos.y - dy,
            b = this.bounds;

        if(b) {
            //check if X movement is illegal
            if(this._outsideBounds(-newX, -pos.y)) {
                dx = (dx < 0 ? b.x : b.right - this.size.x) + pos.x; //how far can we move since dx is too much
            }
            //check if Y movement is illegal
            if(this._outsideBounds(-pos.x, -newY)) {
                dy = (dy < 0 ? b.y : b.bottom - this.size.y) + pos.y;
            }
        }

        //prevent NaN
        if(!dx) dx = 0;
        if(!dy) dy = 0;

        this.world.pan(-dx, -dy);

        return this;
    },
    _outsideBounds: function(x, y) {
        //check if each corner of the camera is within the bounds
        return (
            !this.bounds.contains(x, y) || //top left
            !this.bounds.contains(x, y + this.size.y) || //bottom left
            !this.bounds.contains(x + this.size.x, y) || //top right
            !this.bounds.contains(x + this.size.x, y + this.size.y) //bottom right
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
            math.round(this.size.x / 2),
            math.round(this.size.y / 2)
        );

        return this;
    },
    /**
     * Sets the bounds the camera is allowed to go. Usually this is the world's
     * size unless you set it manually.
     *
     * @method constrain
     * @param shape {Rectangle|Polygon|Circle|Ellipse} The shape to constrain the camera into
     * @return {Camera} Returns iteself for chainability
     */
    constrain: function(shape) {
        this.bounds = shape;

        return this;
    },
    /**
     * Removes the constraints of the camera, to allow free movement around the world
     *
     * @method unconstrain
     * @return {Camera} Returns iteself for chainability
     */
    unconstrain: function() {
        this.bounds = null;

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
                    camX = this._target.position.x + this.world.position.x,
                    camY = this._target.position.y + this.world.position.y;

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
                    math.round(moveX),
                    math.round(moveY)
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

module.exports = Camera;
