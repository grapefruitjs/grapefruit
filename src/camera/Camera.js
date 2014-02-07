var Container = require('../display/Container'),
    Sprite = require('../display/Sprite'),
    Rectangle = require('../geom/Rectangle'),
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
 * A basic Camera object that provides some effects. It also will contain the GUI
 * to ensure they are using "screen-coords".
 *
 * @class Camera
 * @extends Container
 * @constructor
 * @param state {State} The game state this camera belongs to
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

    this.viewport = new Rectangle(0, 0, 0, 0);

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

    /**
     * Flash the screen with a color. This will cover the screen in a
     * color then fade it out.
     *
     * @method flash
     * @param [color=0xFFFFFF] {Number} The color to flash the screen with
     * @param [duration=1000] {Number} The time it should take (in milliseconds) to fade out
     * @param [alpha=1] {Number} The opacity of the initial flash of color (start opacity)
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Flash} The close effect that was created.
     */

    /**
     * Fade the screen into a color. This will fade into a color that will
     * eventually cover the screen.
     *
     * @method fade
     * @param [color=0xFFFFFF] {Number} The color to fade into
     * @param [duration=1000] {Number} The time it should take (in milliseconds) to fade in
     * @param [alpha=1] {Number} The opacity to fade into (final opacity)
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Fade} The close effect that was created.
     */

    /**
     * Shakes the camera around a bit.
     *
     * @method shake
     * @param [intensity=0.01] {Number} The intensity of the shaking
     * @param [duration=1000] {Number} The amount of time the screen shakes for (in milliseconds)
     * @param [direction=gf.AXIS.BOTH] {gf.AXIS} The axis to shake on
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Shake} The close effect that was created.
     */

    /**
     * Adds arcade-style scanlines to the camera viewport.
     *
     * @method scanlines - color, axis, spacing, thickness, alpha, cb
     * @param [color=0x000000] {Number} The color for the scanlines to be
     * @param [axis=gf.AXIS.HORIZONTAL] {gf.AXIS} The axis to draw the lines on
     * @param [spacing=4] {Number} Number of pixels between each line
     * @param [thickness=1] {Number} Number of pixels thick each line is
     * @param [alpha=0.3] {Number} The opacity of the lines
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Scanlines} The close effect that was created.
     */

    /**
     * Performs a "close" animation that will cover the screen with a color.
     *
     * @method close
     * @param [shape='circle'] {String} The shape to close with, can be either 'ellipse', 'circle', or 'rectangle'
     * @param [duration=1000] {Number} Number of milliseconds for the animation to complete
     * @param [position] {Vector} The position for the animation to close in on, defaults to camera center
     * @param [callback] {Function} A callback to call once the animation completes.
     * @return {fx.camera.Close} The close effect that was created.
     */

    //Dynamic addition of fx shortcuts
    var self = this;
    Object.keys(this.fxpools).forEach(function(key) {
        self[key] = function() {
            var e = self.fxpools[key].create(),
                args = Array.prototype.slice.call(arguments),
                cb = args.pop();

            if(cb !== undefined && typeof cb !== 'function')
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
    /**
     * The base callback for camera FX. This is called at the end of each aniamtion to
     * free the FX class back into the pool.
     *
     * @method _fxCallback
     * @param fx {mixed} The FX instance to free
     * @param type {String} The name of the instance type
     * @param [callback] {Function} The user callback to call.
     * @private
     */
    _fxCallback: function(fx, type, cb) {
        var ret;

        if(typeof cb === 'function')
            ret = cb();

        this.fxpools[type].free(fx);

        return ret;
    },
    /**
     * Follows an object with the camera, ensuring they are always center view. You can
     * pass a follow style to change the area an sprite can move around in before we start
     * to move with them.
     *
     * @method follow
     * @param object {Container|Sprite} The object to follow
     * @param [style=CAMERA_FOLLOW.LOCKON] {CAMERA_FOLLOW} The style of following
     * @return {Camera} Returns itself.
     * @chainable
     */
    follow: function(obj, style) {
        this._target = obj;

        switch(style) {
            case C.CAMERA_FOLLOW.PLATFORMER:
                var w = this.viewport.width / 8;
                var h = this.viewport.height / 3;
                this._deadzone = new Rectangle(
                    (this.viewport.width - w) / 2,
                    (this.viewport.height - h) / 2 - (h / 4),
                    w,
                    h
                );
                break;
            case C.CAMERA_FOLLOW.TOPDOWN:
                var sq4 = Math.max(this.viewport.width, this.viewport.height) / 4;
                this._deadzone = new Rectangle(
                    (this.viewport.width - sq4) / 2,
                    (this.viewport.height - sq4) / 2,
                    sq4,
                    sq4
                );
                break;
            case C.CAMERA_FOLLOW.TOPDOWN_TIGHT:
                var sq8 = Math.max(this.viewport.width, this.viewport.height) / 8;
                this._deadzone = new Rectangle(
                    (this.viewport.width - sq8) / 2,
                    (this.viewport.height - sq8) / 2,
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

        this.focusOn(this._target);

        return this;
    },
    /**
     * Stops following any sprites
     *
     * @method unfollow
     * @return {Camera} Returns itself.
     * @chainable
     */
    unfollow: function() {
        this._target = null;
        return this;
    },
    /**
     * Focuses the camera on an object.
     *
     * @method focusOn
     * @param object {Container|Sprite} The object to focus on
     * @return {Camera} Returns itself.
     * @chainable
     */
    focusOn: function(obj) {
        this.viewport.x = math.round(obj.worldTransform.tx - this.viewport.halfWidth);
        this.viewport.y = math.round(obj.worldTransform.ty - this.viewport.halfHeight);

        this._checkConstraint();

        return this;
    },
    /**
     * Focuses the camera on an x,y position. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method focus
     * @param x {Number|Vector} The x coord to focus on, if a Vector is passed the y param is ignored
     * @param y {Number} The y coord to focus on
     * @return {Camera} Returns itself.
     * @chainable
     */
    focus: function(x, y) {
        this.viewport.x = math.round(x - this.viewport.halfWidth);
        this.viewport.y = math.round(y - this.viewport.halfHeight);

        this._checkConstraint();

        return this;
    },
    /**
     * Pans the camera around by the x,y amount. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method pan
     * @param x {Number|Vector} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Camera} Returns itself.
     * @chainable
     */
    pan: function(dx, dy) {
        this.viewport.x += dx;
        this.viewport.y += dy;

        this._checkConstraint();

        return this;
    },
    /**
     * Resizes the viewing area, this is called internally by your game instance
     * when you call mygame.resize(). DO NOT CALL THIS DIRECTLY
     *
     * @method resize
     * @private
     * @param w {Number} The new width
     * @param h {Number} The new height
     * @return {Camera} Returns itself.
     * @chainable
     */
    resize: function(w, h) {
        this.viewport.width = w;
        this.viewport.height = h;

        return this;
    },
    /**
     * Sets the bounds the camera is allowed to go. Usually this is the world's
     * size unless you set it manually.
     *
     * @method constrain
     * @param shape {Rectangle} The shape to constrain the camera into
     * @return {Camera} Returns itself.
     * @chainable
     */
    constrain: function(shape) {
        this.bounds = shape;

        //TODO: Support polygons via cp.PolyShape. That will allow use to use
        //  shape.segmentQuery to find the extent that the camera can move about
        //  inside the shape.
        //
        //this.bounds = new cp.PolyShape(null, shape.points, shape.position);

        this._checkConstraint();

        return this;
    },
    /**
     * Removes the constraints of the camera, to allow free movement around the world
     *
     * @method unconstrain
     * @return {Camera} Returns itself.
     * @chainable
     */
    unconstrain: function() {
        this.bounds = null;

        return this;
    },
    _checkConstraint: function() {
        if(!this.bounds)
            return;

        //simple case of rectangle
        if(this.bounds._shapetype === C.SHAPE.RECTANGLE) {
            /*
            this.viewport.x = math.clamp(this.viewport.x, this.bounds.left, this.bounds.right - this.viewport.width);
            this.viewport.y = math.clamp(this.viewport.y, this.bounds.top, this.bounds.bottom - this.viewport.height);
            */
            if(this.viewport.left < this.bounds.left) {
                this.viewport.x = this.bounds.left;
            }

            if(this.viewport.right > this.bounds.right) {
                this.viewport.x = this.bounds.right - this.viewport.width;
            }

            if(this.viewport.top < this.bounds.top) {
                this.viewport.y = this.bounds.top;
            }

            if(this.viewport.bottom > this.bounds.bottom) {
                this.viewport.y = this.bounds.bottom - this.viewport.height;
            }
        }
        //complex polygon case, need to do some point queries to check what
        //the maximum values for this rectangle in the polygon are
        //else {
            //TODO!!
        //}
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
        //follow target
        if(this._target) {
            if(!this._deadzone) {
                this.focusOn(this._target);
            } else {
                var worldTransform = this._target.worldTransform,
                    x = worldTransform.tx,
                    y = worldTransform.ty,
                    minX = x - this._deadzone.x,
                    maxX = (x + this._target.width) - (this._deadzone.x - this._deadzone.width),
                    minY = y - this._deadzone.y,
                    maxY = (y + this._target.height) - (this._deadzone.y - this._deadzone.height);

                this.viewport.x = math.clamp(this.viewport.x, minX, maxX);
                this.viewport.y = math.clamp(this.viewport.y, minY, maxY);
            }
        }

        //constrain
        this._checkConstraint();

        this.world.position.set(-this.viewport.x, -this.viewport.y);

        //update effects - TODO: move to FX manager
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var c = this.children[i];
            if(c.update)
                c.update(dt);
        }

        return this;
    }
});

module.exports = Camera;
