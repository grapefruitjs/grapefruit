/**
 * Main game object, controls the entire instance of the game
 *
 * @module gf
 * @class game
 * @constructor
 * @param contId {String} The container for the new canvas we will create for the game
 * @param opts {Object} Options such as gravity, friction, and renderMethod
 * @example gf.game.init('myDiv', { renderMethod: 'webgl' });
 */
gf.Game = function(contId, settings) {
    /**
     * The default gravity to use for the game, defaults to 0.98 (Earth's Gravity)
     *
     * @property gravity
     * @type Number
     * @default 0.98
     */
    this.gravity = 0.98;

    /**
     * The default friction to use for the game, defaults to 0,0
     *
     * @property friction
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.friction = new gf.Vector(0, 0);

    /**
     * The method used to render values to the screen (either webgl, canvas, or css3)
     *
     * @property renderMethod
     * @type String
     * @default 'webgl'
     */
    this.renderMethod = 'webgl';

    /**
     * Raw PIXI.stage instance
     *
     * @property stage
     * @type PIXI.Stage
     * @readOnly
     */
    this.stage = new PIXI.Stage();

    /**
     * Raw Clock instance for internal timing
     *
     * @property clock
     * @type Clock
     * @readOnly
     */
    this.clock = new gf.Clock(false);

    /**
     * Raw rendering engine
     *
     * @property renderer
     * @type PIXI.WebGLRenderer|PIXI.CanvasRenderer
     * @readOnly
     */
    this.renderer = null;

    /**
     * The domElement that we are putting our rendering canvas into (the container)
     *
     * @property container
     * @type DOMELement
     * @readOnly
     */
    this.container = document.getElementById(contId);

    /**
     * Maximum Z value
     *
     * @property MAX_Z
     * @type {Number}
     * @default 500
     * @private
     * @readOnly
     */
    this.MAX_Z = 500;

    /**
     * The loader for this game instance
     *
     * @property loader
     * @type AssetLoader
     * @readOnly
     */
    this.loader = new gf.AssetLoader();

    /**
     * The audio player for this game instance
     *
     * @property audio
     * @type AudioPlayer
     * @readOnly
     */
    this.audio = new gf.AudioPlayer(this);

    /**
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = new gf.InputManager(this);

    //if they speciy a method, check if it is available
    if(settings.renderMethod) {
        if(!gf.support[settings.renderMethod]) {
            throw 'Render method ' + settings.renderMethod + ' is not supported by this browser!';
        }
        this.renderMethod = settings.renderMethod;
    }
    //if they don't specify a method, guess the best to use
    else {
        if(gf.support.webgl) this.renderMethod = 'webgl';
        else if(gf.support.canvas) this.renderMethod = 'canvas';
        else {
            throw 'Neither WebGL nor Canvas is supported by this browser!';
        }
    }

    var w = settings.width || gf.utils.getStyle(this.container, 'width'),
        h = settings.height || gf.utils.getStyle(this.container, 'height');

    //initialize the correct renderer
    if(this.renderMethod === 'webgl') {
        this.renderer = new PIXI.WebGLRenderer(w, h);
    } else if(this.renderMethod === 'canvas') {
        this.renderer = new PIXI.CanvasRenderer(w, h);
    }

    //append the renderer view
    //this.renderer.view.style['z-index'] = opts.zIndex || 5;
    this.container.appendChild(this.renderer.view);

    //mixin user settings
    gf.utils.setValues(this, settings);
};

gf.inherits(gf.Game, Object, {
    /**
     * Allows you to resize the game area
     *
     * @method resize
     * @param width {Number} Width to resize to
     * @param height {Number} Height to resize to
     * @return {Game} Returns itself for chainability
     */
    resize: function(w, h) {
        this.renderer.resize(w, h);

        for(var i = 0, il = this.stage.children.length; i < il; ++i) {
            var o = this.stage.children[i];

            if(o.resize) o.resize();
        }

        return this;
    },
    /**
     * Adds an object to the current stage
     *
     * @method addObject
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    addObject: function(obj) {
        if(obj) {
            this.stage.addChild(obj);

            if(obj.onAddedToStage)
                obj.onAddedToStage(this.stage);
        }

        return this;
    },
    /**
     * Removes a sprite from the stage
     *
     * @method removeObject
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    removeObject: function(obj) {
        if(obj) {
            this.stage.removeChild(obj);

            if(obj.onRemovedFromStage)
                obj.onRemovedFromStage(this.stage);
        }

        return this;
    },
    /**
     * Loads the world map into the game
     *
     * @method loadWorld
     * @param world {String|Map} The map to load as the current world
     * @return {Game} Returns itself for chainability
     */
    loadWorld: function(world) {
        if(typeof world === 'string'){
            if(gf.assetCache[world]) world = gf.assetCache[world];
            else {
                throw 'World not found in assetCache!';
            }
        }

        this.world = new gf.TiledMap(this, world);
        this.addObject(this.world);

        if(this.world.properties.music) {
            this.audio.play(this.world.properties.music, { loop: this.world.properties.music_loop === 'true' });
        }

        return this;
    },
    /**
     * Begins the render loop
     *
     * @method render
     * @return {Game} Returns itself for chainability
     */
    render: function() {
        gf.game._clock.start();
        gf.game._tick();

        return this;
    },
    /**
     * Check if passed entity collides with any others
     *
     * @method checkCollisions
     * @param obj {Entity} The sprite to the stage
     * @return {Array} Returns an array of colliders
     */
    checkCollisions: function(ent) {
        var colliders = [];

        if(!ent.collidable) return colliders;

        for(var i = 0, il = this.stage.children; i < il; ++i) {
            var o = this.stage.children[i];

            //check if this object collides with any others
            if(o.visible && o.collidable && o.entity && (o !== ent)) {
                var collisionVector = o.checkCollision(ent);
                if(collisionVector.x !== 0 || collisionVector.y !== 0) {
                    colliders.push({
                        entity: o,
                        vector: collisionVector
                    });
                    o.onCollision(ent);
                }
            }
        }

        return colliders;
    },
    /**
     * locks the camera on an entity
     *
     * @method cameraTrack
     * @param ent {Entity} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    cameraTrack: function(ent) {
        if(ent.entity) {
            return this;
            //TODO
            //see: https://github.com/GoodBoyDigital/pixi.js/issues/48#issuecomment-15962276
            //see: https://github.com/photonstorm/kiwi-lite/blob/master/Kiwi%20Lite/Camera.ts
        }

        return this;
    },
    /**
     * The looping render tick
     *
     * @method _tick
     * @private
     */
    _tick: function() {
        //start render loop
        window.requestAnimFrame(this.tick.bind(this));

        //get clock delta
        this._delta = this.clock.getDelta();

        //update debug info
        gf.debug.update();

        this.input.update();

        if(this.hud) this.hud.update();

        //update each object
        for(var i = 0, il = this.stage.children.length; i < il; ++i) {
            var o = this.stage.children[i];

            if(o.visible && o.update)
                o.update();
        }

        //render scene
        this.renderer.render(this.stage);
    }
});
