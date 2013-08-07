/**
 * GameStates are different , controls the entire instance of the game
 *
 * @class GameState
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param [name] {String} The name of this state
 * @param [settings] {Object} All the settings for this game state
 * @param [settings.gravity] {Number} The gravity constant for the physics system (default is 9.87, which is normal Earth gravity)
 * @example
 *      var state = new gf.GameState(game, 'battle');
 *      state.addChild(battlePlayer);
 *      state.addChild(enemy);
 *
 *      game.enableState(state); //or you can use the name from the ctor 'battle'
 */
gf.GameState = function(name, settings) {
    if(typeof name === 'object') {
        settings = name;
        name = Math.floor(Date.now() * Math.random()).toString();
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
     * The audio player for this game instance
     *
     * @property audio
     * @type AudioPlayer
     * @readOnly
     */
    this.audio = new gf.AudioManager();

    /**
     * The physics system to simulate stuffs
     *
     * @property physics
     * @type PhysicsSystem
     * @readOnly
     */
    this.physics = new gf.PhysicsSystem({ gravity: settings.gravity });

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
     * @type Map
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
    gf.DisplayObjectContainer.call(this, settings);

    //start disabled
    this.disable();
};

gf.inherits(gf.GameState, gf.DisplayObjectContainer, {
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

        this.camera = new gf.Camera(game);
        this.addChild(this.camera);
        this.camera.resize(game.renderer.width, game.renderer.height);
    },
    /**
     * Adds a child object to the GameState, this will add objects to either
     * the Camera or the Map depending on the type. Anything inheriting from
     * gf.Gui will be put to the camera, everything else goes in the world.
     *
     * @method addChild
     * @param obj {DisplayObject} Any generic object to add to the game state
     */
    addChild: function(obj) {
        if(obj) {
            //we add the camera in the ctor and the map later when
            //.loadWorld is called. This way the camera is always the
            //last child of stage, so it is rendered on top!
            if(obj instanceof gf.Camera || obj instanceof gf.Map)
                this.addChildAt(obj, 0);
            else if(obj instanceof gf.Gui)
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
        if(typeof world === 'string'){
            if(gf.assetCache[world]) {
                world = gf.assetCache[world];
            } else {
                throw 'World "' + world + '" needs to be preloaded before being added to a game!';
            }
        }

        this.world = new gf.TiledMap(world);
        this.addChild(this.world);

        this.world.resize(this._game.renderer.width, this._game.renderer.height);

        this.camera.constrain(new gf.Rectangle(0, 0, this.world.realSize.x, this.world.realSize.y), true);

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
        //gather input from user
        this.game.timings.inputStart = this.game.timings._timer.now();
        this.input.update(dt);
        this.game.timings.inputEnd = this.game.timings._timer.now();

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