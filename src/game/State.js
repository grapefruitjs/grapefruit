var AudioManager = require('../audio/AudioManager'),
    Container = require('../display/Container'),
    World = require('./World'),
    Camera = require('../camera/Camera'),
    PhysicsSystem = require('../physics/PhysicsSystem'),
    math = require('../math/math'),
    inherit = require('../utils/inherit');

/**
 * States are containers that represent different states of a game
 *
 * @class State
 * @extends Container
 * @constructor
 * @param game {Game} The game instance this state belongs to
 * @param [name] {String} The name of this state
 * @param [physicsOptions] {Object} All the settings for the physics environment
 * @param [physicsOptions.gravity] {Vector} The gravity constant for the physics system (default is 9.87, which is normal Earth gravity)
 * @example
 *      var state = game.state.add('battle');
 *      state.addChild(battlePlayer);
 *      state.addChild(enemy);
 *
 *      state.enable();
 */
var State = function(game, name, physOptions) {
    if(!name)
        name = math.randomString();

    /**
     * The name of this game state
     *
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * The game instance that this state belongs too, will be set
     * when setup() is called with a game instance.
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The audio manager for this game state
     *
     * @property audio
     * @type AudioManager
     * @readOnly
     */
    this.audio = new AudioManager(game, game.audio);

    /**
     * The container that holds all non-gui sprites and the tilemap
     *
     * @property world
     * @type Tilemap
     * @readOnly
     */
    this.world = new World(this);

    /**
     * The physics system to simulate the world physics
     *
     * @property physics
     * @type Physics
     * @readOnly
     */
    this.physics = new PhysicsSystem(this, physOptions);

    /**
     * The camera you view the scene through, will be set
     * when setup() is called with a game instance.
     *
     * @property camera
     * @type Camera
     * @readOnly
     */
    this.camera = new Camera(this);

    //call base ctor
    Container.call(this);

    //start disabled
    this.visible = false;

    //add world/camera
    this.addChild(this.world);
    this.addChild(this.camera);

    //ensure the camera is the right size
    this.camera.resize(game.width, game.height);
};

inherit(State, Container, {
    /**
     * Enables (shows) the game state
     *
     * @method enable
     * @return {State} Returns itself.
     * @chainable
     */
    enable: function() {
        this.game.state.enable(this);

        return this;
    },
    /**
     * Called internally by `game.resize`. This ensures that the camera
     * is the correct size, and renders the world with the new viewport size.
     *
     * @method resize
     * @param width {Number} The width of the new viewport
     * @param height {Number} The height of the new viewport
     * @return {State} Returns itself.
     * @chainable
     * @private
     */
    resize: function(w, h) {
        this.camera.resize(w, h);
        this.world.resize(w, h);

        return this;
    },
    /**
     * Called by the game each frame to update the state objects.
     *
     * @method update
     * @param dt {Number} The number of seconds passed since the last update call.
     * @private
     */
    update: function(dt) {
        //update any camera effects
        this.game.timings.cameraStart = this.game.clock.now();
        this.camera.update(dt);
        this.game.timings.cameraEnd = this.game.clock.now();

        //simulate physics and detect/resolve collisions
        this.game.timings.physicsStart = this.game.clock.now();
        this.physics.update(dt);
        this.game.timings.physicsEnd = this.game.clock.now();

        return this;
    }
});

module.exports = State;
