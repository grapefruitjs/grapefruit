var StateManager = require('./StateManager'),
    EventEmitter = require('../utils/EventEmitter'),
    Cache = require('../utils/Cache'),
    Clock = require('../utils/Clock'),
    SpritePool = require('../utils/SpritePool'),
    Loader = require('../loader/Loader'),
    InputManager = require('../input/InputManager'),
    AudioManager = require('../audio/AudioManager'),
    Vector = require('../math/Vector'),
    utils = require('../utils/utils'),
    support = require('../utils/support'),
    inherit = require('../utils/inherit'),
    PIXI = require('../vendor/pixi'),
    C = require('../constants');

/**
 * Main game object, controls the entire instance of the game
 *
 * @class Game
 * @extends Object
 * @uses EventEmitter
 * @constructor
 * @param container {DOMElement|String} The container for the new canvas we will create for the game, or the ID of one
 * @param settings {Object} All the settings for the game instance
 * @param settings.width {Number} The width of the viewport
 * @param settings.height {Number} The height of the viewport
 * @param [settings.renderer=RENDERER.AUTO] {String} The renderer to use either RENDERER.AUTO, RENDERER.CANVAS, or RENDERER.WEBGL
 * @param [settings.transparent=false] {Boolean} Should the render element have a transparent background
 * @param [settings.background='#FFF'] {Number} The background color of the stage
 * @param [settings.antialias=true] {Boolean} Anti-alias graphics (in WebGL this helps with edges, in Canvas2D it retains pixel-art quality)
 * @param [settings.canvas] {DOMElement} The canvas to render into, if not specified one is created
 */
var Game = function(container, settings) {
    EventEmitter.call(this);

    //setup settings defaults
    settings = settings || {};
    settings.width = settings.width || 800;
    settings.height = settings.height || 600;
    settings.renderer = settings.renderer || C.RENDERER.AUTO;
    settings.transparent = settings.transparent || false;
    settings.background = settings.background || '#FFF';
    settings.antialias = settings.antialias !== undefined ? settings.antialias : true;
    settings.canvas = settings.canvas || null; //passing null to renderer, lets the renderer make one

    /**
     * The domElement that we are putting our rendering canvas into (the container)
     *
     * @property container
     * @type DOMELement
     * @readOnly
     */
    this.container = typeof container === 'string' ? document.getElementById(container) : container;

    if(!this.container)
        this.container = document.body;

    /**
     * The width of the render viewport
     *
     * @property width
     * @type Number
     * @default 800
     */
    this.width = settings.width;

    /**
     * The height of the render viewport
     *
     * @property height
     * @type Number
     * @default 600
     */
    this.height = settings.height;

    /**
     * The method used to render values to the screen (either webgl, or canvas)
     *
     * @property renderMethod
     * @type String
     * @default RENDERER.AUTO
     */
    this.renderMethod = settings.renderer;

    /**
     * Whether the canvas has a transparent background or not
     *
     * @property transparent
     * @type Boolean
     * @default false
     */
    this.transparent = settings.transparent;

    /**
     * The background of the stage
     *
     * @property background
     * @type Boolean
     * @default false
     */
    this.background = settings.background;

    /**
     * Anti-alias graphics (in WebGL this helps with edges, in Canvas2D it retains pixel-art quality)
     *
     * @property antialias
     * @type Boolean
     * @default true
     */
    this.antialias = settings.antialias;

    /**
     * The canvas to render into
     *
     * @property canvas
     * @type HTMLCanvasElement
     */
    this.canvas = settings.canvas;

    /**
     * Raw rendering engine, the underlying PIXI renderer that draws for us
     *
     * @property renderer
     * @type PIXI.WebGLRenderer|PIXI.CanvasRenderer
     * @readOnly
     */
    this.renderer = this._createRenderer();

    /**
     * Raw PIXI.stage instance, the root of all things in the scene graph
     *
     * @property stage
     * @type PIXI.Stage
     * @readOnly
     */
    this.stage = new PIXI.Stage(this.background);

    /**
     * Clock instance for internal timing
     *
     * @property clock
     * @type Clock
     * @readOnly
     */
    this.clock = new Clock();

    /**
     * The audio manager for this game instance, used to play and control
     * all the audio in a game.
     *
     * @property audio
     * @type AudioManager
     * @readOnly
     */
    this.audio = new AudioManager(this);

    /**
     * The loader for this game instance, used to preload assets into the cache
     *
     * @property loader
     * @type Loader
     * @readOnly
     */
    this.load = new Loader(this);

    /**
     * Cache instance for storing/retrieving assets
     *
     * @property cache
     * @type Cache
     * @readOnly
     */
    this.cache = new Cache(this);

    /**
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = new InputManager(this);

    /**
     * The sprite pool to use to create registered entities
     *
     * @property spritepool
     * @type SpritePool
     * @readOnly
     */
    this.spritepool = new SpritePool(this);

    /**
     * The state manager, to switch between game states
     *
     * @property state
     * @type StateManager
     * @readOnly
     */
    this.state = new StateManager(this);

    /**
     * The offset for the viewport in the document
     *
     * @property offset
     * @type Vector
     * @readOnly
     */
    this.offset = new Vector();

    /**
     * Holds timing data for the previous loop
     *
     * @property timings
     * @type Object
     * @readOnly
     */
    this.timings = {};

    //pixi does some prevent default on mousedown, so we need to
    //make sure mousedown will focus the canvas or keyboard events break
    var view = this.canvas;
    if(!view.getAttribute('tabindex'))
        view.setAttribute('tabindex','1');

    view.focus();
    view.addEventListener('click', function() {
        view.focus();
    }, false);

    /**
     * Fired each frame after everything has updated, but just before rendering
     *
     * @event tick
     * @param dt {Number} The number of seconds passed since the last tick call (delta time)
     */
};

inherit(Game, Object, {
    /**
     * Creates the underlying renderer based on browser support. It will also set's `game.renderMethod` for a user
     * to be able to check.
     *
     * @method _createRenderer
     * @return {PIXI.WebGLRenderer|PIXI.CanvasRenderer} The renderer to use
     * @private
     */
    _createRenderer: function() {
        var method = this.renderMethod,
            render = null;

        //no support
        if(!support.webgl && !support.canvas) {
            throw new Error('Neither WebGL nor Canvas is supported by this browser!');
        }
        else if((method === C.RENDERER.WEBGL || method === C.RENDERER.AUTO) && support.webgl) {
            method = C.RENDERER.WEBGL;
            render = new PIXI.WebGLRenderer(this.width, this.height, this.canvas, this.transparent, this.antialias);
        }
        else if((method === C.RENDERER.CANVAS || method === C.RENDERER.AUTO) && support.canvas) {
            method = C.RENDERER.CANVAS;
            render = new PIXI.CanvasRenderer(this.width, this.height, this.canvas, this.transparent);
        }
        else {
            throw new Error('Your render method ("' + method + '") is not supported by this browser!');
        }

        //append the renderer view only if the user didn't pass their own
        if(!this.canvas) {
            this.container.appendChild(render.view);
            this.canvas = render.view;
        }

        this.offset = utils.getOffset(this.canvas);
        this.renderMethod = method;

        return render;
    },
    /**
     * Allows you to resize the game area.
     *
     * @method resize
     * @param width {Number} Width to resize to
     * @param height {Number} Height to resize to
     * @return {Game} Returns itself.
     * @chainable
     */
    resize: function(w, h) {
        this.renderer.resize(w, h);
        this.width = w;
        this.height = h;

        for(var i = 0, il = this.stage.children.length; i < il; ++i) {
            var o = this.stage.children[i];

            if(o.resize)
                o.resize(w, h);
        }

        return this;
    },
    /**
     * Requests that the browser go into fullscreen mode.
     *
     * @method requestFullscreen
     * @return {Game} Returns itself.
     * @chainable
     */
    requestFullscreen: function() {
        var elem = this.renderer.view;

        if(elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if(elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if(elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }

        return this;
    },
    /**
     * Begins the render loop.
     *
     * @method render
     * @return {Game} Returns itself.
     * @chainable
     */
    render: function() {
        this.clock.start();
        this._tick();

        return this;
    },
    /**
     * The looping render tick.
     *
     * @method _tick
     * @private
     */
    _tick: function() {
        this.timings.tickStart = this.clock.now();

        //start render loop
        window.requestAnimFrame(this._tick.bind(this));

        var dt = this.clock.getDelta();

        this.timings.lastDelta = dt;

        //gather input from user
        this.timings.inputStart = this.clock.now();
        this.input.update(dt);
        this.timings.inputEnd = this.clock.now();

        //TODO: plugins
        //this.timings.pluginsStart = this.clock.now();
        //this.plugins.update(dt);
        //this.timings.pluginsEnd = this.clock.now();

        //update this game state
        this.timings.stateStart = this.clock.now();
        this.state.active.update(dt);
        this.timings.stateEnd = this.clock.now();

        this.timings.userFuncsStart = this.clock.now();
        this.emit('tick', dt);
        this.timings.userFuncsEnd = this.clock.now();

        //render scene
        this.timings.renderStart = this.clock.now();
        this.renderer.render(this.stage);
        this.timings.renderEnd = this.clock.now();

        this.timings.tickEnd = this.clock.now();
    }
});

/**
 * Alias for the active State's physics object. Instead of using
 * `game.state.active.physics`, you can use `game.physics`
 *
 * @property physics
 * @type Physics
 * @readOnly
 */
Object.defineProperty(Game.prototype, 'physics', {
    get: function() {
        return this.state.active.physics;
    }
});

/**
 * Alias for the active State's camera object. Instead of using
 * `game.state.active.camera`, you can use `game.camera`
 *
 * @property camera
 * @type Camera
 * @readOnly
 */
Object.defineProperty(Game.prototype, 'camera', {
    get: function() {
        return this.state.active.camera;
    }
});

/**
 * Alias for the active State's world object. Instead of using
 * `game.state.active.world`, you can use `game.world`
 *
 * @property world
 * @type World
 * @readOnly
 */
Object.defineProperty(Game.prototype, 'world', {
    get: function() {
        return this.state.active.world;
    }
});

module.exports = Game;
