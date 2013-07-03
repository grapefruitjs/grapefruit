/**
 * Main game object, controls the entire instance of the game
 *
 * @class Game
 * @uses Emitter
 * @constructor
 * @param contId {String} The container for the new canvas we will create for the game
 * @param settings {Object} Options such as renderMethod and interactive (whether the stage can be clicked)
 */
gf.Game = function(contId, settings) {
    //mixin the Event Target methods
    gf.Emitter.call(this);

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
     * The loader for this game instance
     *
     * @property loader
     * @type AssetLoader
     * @readOnly
     */
    this.loader = new gf.AssetLoader();

    /**
     * The sprite pool to use to create registered entities
     *
     * @property spritepool
     * @type SpritePool
     * @readOnly
     */
    this.spritepool = new gf.SpritePool();

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
    this._defaultState = new gf.GameState('_default');

    //append the renderer view
    //this.renderer.view.style['z-index'] = opts.zIndex || 5;
    this.container.appendChild(this.renderer.view);

    //mixin user settings
    gf.utils.setValues(this, settings);

    //enable default state
    this.addState(this._defaultState);
    this.enableState('_default');

    //define getters for common properties in GameState
    var self = this;
    ['audio', 'input', 'physics', 'camera', 'world'].forEach(function(prop) {
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
            if(obj instanceof gf.Gui)
                this.camera.removeChild(obj);
            else
                this.world.removeChild(obj);
        }

        return this;
    },
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
    },
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
    },
    enableState: function(state) {
        var name = (typeof state === 'string') ? state : state.name;

        if(this.activeState)
            this.activeState.disable();

        this.activeState = this.states[name];

        this.activeState.enable();
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
        this.emit({ type: 'beforetick' });
        //start render loop
        window.requestAnimFrame(this._tick.bind(this));

        //update this game state
        this.activeState.update(this.clock.getDelta());

        //render scene
        this.renderer.render(this.stage);
        this.emit({ type: 'aftertick' });
    }
});
