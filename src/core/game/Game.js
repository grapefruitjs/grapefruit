var GameState = require('./GameState'),
    EventEmitter = require('../utils/EventEmitter'),
    Cache = require('../utils/Cache'),
    Clock = require('../utils/Clock'),
    SpritePool = require('../utils/SpritePool'),
    support = require('../utils/support'),
    utils = require('../utils/utils'),
    globals = require('../globals'),
    PIXI = require('../../vendor/pixi');

    //TOINC: AssetLoader, InputManager

/**
 * Main game object, controls the entire instance of the game
 *
 * @class Game
 * @extends Object
 * @uses gf.EventEmitter
 * @namespace gf
 * @constructor
 * @param contId {String} The container for the new canvas we will create for the game
 * @param settings {Object} All the settings for the game instance
 * @param settings.width {Number} The width of the viewport
 * @param settings.height {Number} The height of the viewport
 * @param [settings.view] {DOMElement} The canvas to render into
 * @param [settings.transparent] {Boolean} Whether the viewport should be transparent or not
 * @param [settings.renderMethod] {String} Can be 'canvas' or 'webgl' to force that render method
 * @param [settings.background] {Number} The background color of the stage
 * @param [settings.interactive] {Boolean} Whether the game will use mouse events or not
 */
var Game = module.exports = function(contId, settings) {
    EventEmitter.call(this);

    /**
     * The domElement that we are putting our rendering canvas into (the container)
     *
     * @property container
     * @type DOMELement
     * @readOnly
     */
    this.container = document.getElementById(contId);

    if(!this.container)
        this.container = document.body;

    /**
     * The method used to render values to the screen (either webgl, or canvas)
     *
     * @property renderMethod
     * @type String
     * @default 'webgl'
     */
    this.renderMethod = 'webgl';

    /**
     * The player entities added into the game
     *
     * @property players
     * @type {Array}
     * @readOnly
     */
    this.players = [];

    /**
     * Raw PIXI.stage instance
     *
     * @property stage
     * @type PIXI.Stage
     * @readOnly
     */
    this.stage = new PIXI.Stage(
        settings.background,
        settings.interactive !== undefined ? settings.interactive : true
    );

    /**
     * Clock instance for internal timing
     *
     * @property clock
     * @type Clock
     * @readOnly
     */
    this.clock = new Clock(false);

    /**
     * Cache instance for storing assets
     *
     * @property cache
     * @type Cache
     * @readOnly
     */
    this.cache = new Cache(this);

    /**
     * The loader for this game instance
     *
     * @property loader
     * @type AssetLoader
     * @readOnly
     */
    this.load = new AssetLoader(this);

    /**
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = new InputManager(this.renderer.view);

    /**
     * Raw rendering engine
     *
     * @property renderer
     * @type PIXI.WebGLRenderer|PIXI.CanvasRenderer
     * @readOnly
     */
    this.renderer = null;

    //if they speciy a method, check if it is available
    if(settings.renderMethod) {
        if(!support[settings.renderMethod]) {
            throw 'Render method ' + settings.renderMethod + ' is not supported by this browser!';
        }
        this.renderMethod = settings.renderMethod;
    }
    //if they don't specify a method, guess the best to use
    else {
        if(support.webgl) this.renderMethod = 'webgl';
        else if(support.canvas) this.renderMethod = 'canvas';
        else {
            throw 'Neither WebGL nor Canvas is supported by this browser!';
        }
    }

    //initialize the correct renderer
    if(this.renderMethod === 'webgl') {
        this.renderer = new PIXI.WebGLRenderer(settings.width, settings.height, settings.view, settings.transparent);
    } else if(this.renderMethod === 'canvas') {
        this.renderer = new PIXI.CanvasRenderer(settings.width, settings.height, settings.view, settings.transparent);
    }

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
     * The sprite pool to use to create registered entities
     *
     * @property spritepool
     * @type SpritePool
     * @readOnly
     */
    this.spritepool = new SpritePool();

    /**
     * The GameStates added to the game
     *
     * @property states
     * @type Array
     * @readOnly
     */
    this.states = {};

    /**
     * The currently active GameState
     *
     * @property activeState
     * @type GameState
     * @readOnly
     */
    this.activeState = null;
    this._defaultState = new GameState('_default');

    /**
     * Holds timing data for the previous loop
     *
     * @property timings
     * @type Object
     * @readOnly
     */
    this.timings = {
        _timer: window.performance && window.performance.now ? window.performance : Date
    };

    //append the renderer view only if the user didn't pass their own
    if(!settings.view)
        this.container.appendChild(this.renderer.view);

    //mixin user settings
    utils.setValues(this, settings);

    //enable default state
    this.addState(this._defaultState);
    this.enableState('_default');

    //define getters for common properties in GameState
    var self = this;
    ['audio', 'physics', 'camera', 'world'].forEach(function(prop) {
        self.__defineGetter__(prop, function() {
            return self.activeState[prop];
        });
    });

    //some docs for the getters above

    /**
     * The audio player for this game instance
     * (refers to the active GameState's audio instance)
     *
     * @property audio
     * @type AudioPlayer
     * @readOnly
     */

    /**
     * The input instance for this game
     * (refers to the active GameState's input instance)
     *
     * @property input
     * @type InputManager
     * @readOnly
     */

    /**
     * The physics system to simulate stuffs
     * (refers to the active GameState's physics instance)
     *
     * @property physics
     * @type PhysicsSystem
     * @readOnly
     */

    /**
     * The camera you view the scene through
     * (refers to the active GameState's camera instance)
     *
     * @property camera
     * @type Camera
     * @readOnly
     */

    /**
     * The world instance that holds all sprites and the map
     * (refers to the active GameState's world instance)
     *
     * @property world
     * @type Map
     * @readOnly
     */

     //pixi does some prevent default on mousedown, so we need to
     //make sure mousedown will focus the canvas or keyboard events break


    //ensure that key events will work
    var view = this.renderer.view;
    if(!view.getAttribute('tabindex'))
        view.setAttribute('tabindex','1');

    view.focus();
    view.addEventListener('click', function() {
        view.focus();
    }, false);
};

globals.inherits(Game, Object, {
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

            if(o.resize)
                o.resize(w, h);
        }

        return this;
    },
    /**
     * Adds an object to the current stage
     *
     * @method addChild
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    addChild: function(obj) {
        this.activeState.addChild(obj);

        return this;
    },
    /**
     * Removes a sprite from the stage
     *
     * @method removeChild
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    removeChild: function(obj) {
        if(obj) {
            if(obj instanceof Gui)
                this.camera.removeChild(obj);
            else
                this.world.removeChild(obj);
        }

        return this;
    },
    requestFullscreen: function() {
        var elem = this.renderer.view;

        if(elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if(elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if(elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
    },
    /**
     * Adds a new game state to this game to be later enabled
     *
     * @method addState
     * @param state {GameState} The state to add to this game
     * @return {Game} Returns itself for chainability
     */
    addState: function(state) {
        var name = state.name;

        if(!name) {
            throw 'No state name could be determined, did you give the state a name when you created it?';
        } else if(this.states[name]) {
            throw 'A state with the name "' + name + '" already exists, did you try to add it twice?';
        } else {
            this.states[name] = state;
            this.stage.addChild(state);

            state.game = this;
        }

        return this;
    },
    /**
     * Removes a game state from the game
     *
     * @method removeState
     * @param state {GameState|String} The state to remove from the game, or the name of a state to remove
     * @return {Game} Returns itself for chainability
     */
    removeState: function(state) {
        var name = (typeof state === 'string') ? state : state.name;

        if(!name) {
            throw 'No state name could be determined, are you sure you passed me a game state?';
        } else if(!this.states[name]) {
            throw 'A state with the name "' + name + '" does not exist, are you sure you added it?';
        } else {
            //don't remove the default state
            if(name === '_default') return;

            //if this is the active state, revert to the default state
            if(name === this.activeState.name) {
                this.enableState('_default');
            }

            delete this.states[name];
        }

        return this;
    },
    /**
     * Enables a state that has been added to the game
     *
     * @method enableState
     * @param state {GameState|String} The state to enable, or the name of a state to enable
     * @return {Game} Returns itself for chainability
     */
    enableState: function(state) {
        var name = (typeof state === 'string') ? state : state.name;

        if(this.activeState)
            this.activeState.disable();

        this.activeState = this.states[name];

        this.activeState.enable();

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
        this.activeState.loadWorld(world);

        return this;
    },
    /**
     * Begins the render loop
     *
     * @method render
     * @return {Game} Returns itself for chainability
     */
    render: function() {
        this.clock.start();
        this._tick();

        return this;
    },
    /**
     * The looping render tick
     *
     * @method _tick
     * @private
     */
    _tick: function() {
        this.timings.tickStart = this.timings._timer.now();

        //start render loop
        window.requestAnimFrame(this._tick.bind(this));

        var dt = this.clock.getDelta();

        //gather input from user
        this.timings.inputStart = this.timings._timer.now();
        this.input.update(dt);
        this.timings.inputEnd = this.timings._timer.now();

        //update this game state
        this.timings.stateStart = this.timings._timer.now();
        this.activeState.update(dt);
        this.timings.stateEnd = this.timings._timer.now();

        //render scene
        this.timings.renderStart = this.timings._timer.now();
        this.renderer.render(this.stage);
        this.timings.renderEnd = this.timings._timer.now();

        this.timings.tickEnd =  this.timings._timer.now();
    }
});
