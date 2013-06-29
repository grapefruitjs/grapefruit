/**
 * GameStates are different , controls the entire instance of the game
 *
 * @class GameState
 * @constructor
 * @param game {Game} The game instance this GameState belongs to
 * @param name {String} 
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
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = null; //need to be added to a game first

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
    _setGame: function(game) {
        this._game = game;

        this.input = new gf.InputManager(game.renderer.view);

        if(this.camera)
            this.removeChild(this.camera);

        this.camera = new gf.Camera(game);
        this.addChild(this.camera);
        this.camera.resize(game.renderer.width, game.renderer.height);
    },
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
    loadWorld: function(world) {
        if(typeof world === 'string'){
            if(gf.assetCache[world]) {
                world = gf.assetCache[world];
            } else {
                throw 'World "' + world + '" needs to be preloaded before being added to a game!';
            }
        }

        this.world = new gf.TiledMap(world);
        this.world.resize(this._game.renderer.width, this._game.renderer.height);
        this.camera.setBounds(0, 0, this.world.realSize.x, this.world.realSize.y);
        this.addChild(this.world);

        /* TODO: Autoplay music
        if(this.world.properties.music) {
            this.audio.play(this.world.properties.music, { loop: this.world.properties.music_loop === 'true' });
        }*/

        return this;
    },
    enable: function() {
        this.visible = true;
    },
    disable: function() {
        this.visible = false;
    },
    update: function(dt) {
        //gather input from user
        this.input.update(dt);

        //update any camera effects
        this.camera.update(dt);

        //simulate physics and detect/resolve collisions
        this.physics.update(dt);
    }
});