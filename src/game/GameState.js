var DisplayObjectContainer = require('../display/DisplayObjectContainer'),
    Camera = require('../camera/Camera'),
    Tilemap = require('../tilemap/Tilemap'),
    Gui = require('../gui/Gui'),
    Rectangle = require('../math/Rectangle'),
    PhysicsSystem = require('../physics/PhysicsSystem'),
    math = require('../math/math'),
    utils = require('../utils/utils');

/**
 * GameStates are containers that represent different states of a game
 *
 * @class GameState
 * @extends DisplayObjectContainer
 * @constructor
 * @param [name] {String} The name of this state
 * @param [settings] {Object} All the settings for this game state
 * @param [settings.gravity] {Number} The gravity constant for the physics system (default is 9.87, which is normal Earth gravity)
 * @example
 *      var state = new GameState(game, 'battle');
 *      state.addChild(battlePlayer);
 *      state.addChild(enemy);
 *
 *      game.enableState(state); //or you can use the name from the ctor 'battle'
 */
var GameState = module.exports = function(name, settings) {
    if(typeof name === 'object') {
        settings = name;
        name = math.randomString();
    }

    settings = settings || {};

    /**
     * The name of this game state
     *
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * The physics system to simulate stuffs
     *
     * @property physics
     * @type PhysicsSystem
     * @readOnly
     */
    this.physics = new PhysicsSystem({ gravity: settings.gravity });

    /**
     * The camera you view the scene through
     *
     * @property camera
     * @type Camera
     * @readOnly
     */
    this.camera = null; //need to be added to a game first

    /**
     * The world instance that holds all entites and the map
     *
     * @property world
     * @type Tilemap
     * @readOnly
     */
    this.world = null;

    /**
     * The game instance that this state belongs too
     *
     * @property game
     * @type Game
     */
    Object.defineProperty(this, 'game', {
        get: function() { return this._game; },
        set: this._setGame.bind(this),
        enumerable: true
    });

    //call base ctor
    DisplayObjectContainer.call(this, settings);

    //start disabled
    this.disable();
};

utils.inherits(GameState, DisplayObjectContainer, {
    /**
     * The setter for the game property, sets up the input and camera objects
     *
     * @method _setGame
     * @param game {Game}
     * @private
     */
    _setGame: function(game) {
        this._game = game;

        if(this.camera)
            this.removeChild(this.camera);

        this.camera = new Camera(game);
        this.addChild(this.camera);
        this.camera.resize(game.renderer.width, game.renderer.height);
    },
    /**
     * Adds a child object to the GameState, this will add objects to either
     * the Camera or the Map depending on the type. Anything inheriting from
     * Gui will be put to the camera, everything else goes in the world.
     *
     * @method addChild
     * @param obj {DisplayObject} Any generic object to add to the game state
     */
    addChild: function(obj) {
        if(obj) {
            //we add the camera in the ctor and the map later when
            //.loadWorld is called. This way the camera is always the
            //last child of stage, so it is rendered on top!
            if(obj instanceof Camera || obj instanceof Tilemap)
                this.addChildAt(obj, 0);
            else if(obj instanceof Gui)
                this.camera.addChild(obj);
            else
                this.world.addChild(obj);
        }
    },
    /**
     * Loads a game world into the state
     *
     * @method loadWorld
     * @param world {String|Object} The world to load, if you pass a string be sure to preload it first
     */
    loadWorld: function(world) {
        var tilemap;
        if(typeof world === 'string'){
            tilemap = this.game.cache.getTilemap(world);
            if(!tilemap) {
                throw 'World "' + world + '" needs to be preloaded before being added to a game!';
            }
        }

        this.world = tilemap;
        this.addChild(this.world);

        this.world.resize(this._game.renderer.width, this._game.renderer.height);

        this.camera.constrain(new Rectangle(0, 0, this.world.realSize.x, this.world.realSize.y), true);

        return this;
    },
    /**
     * Enables (shows) the game state
     *
     * @method enable
     */
    enable: function() {
        this.visible = true;
    },
    /**
     * Disables (hides) the game state
     *
     * @method disable
     */
    disable: function() {
        this.visible = false;
    },
    /**
     * Called by the game each frame to update the input, camera, and physics objects
     *
     * @method update
     * @private
     */
    update: function(dt) {
        //update any camera effects
        this.game.timings.cameraStart = this.game.timings._timer.now();
        this.camera.update(dt);
        this.game.timings.cameraEnd = this.game.timings._timer.now();

        //simulate physics and detect/resolve collisions
        this.game.timings.physicsStart = this.game.timings._timer.now();
        this.physics.update(dt);
        this.game.timings.physicsEnd = this.game.timings._timer.now();
    }
});
