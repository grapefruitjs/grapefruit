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
gf.GameState = function(game, name, settings) {
    settings = settings || {};
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
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = new gf.InputManager(game.renderer.view);

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
    this.camera = new gf.Camera(game);

    /**
     * The world instance that holds all entites and the map
     *
     * @property world
     * @type Map
     * @readOnly
     */
    this.world = null;

    //call base ctor
    gf.DisplayObjectContainer.call(this, game, [0, 0], settings);

    //start disabled
    this.disable();

    //add camera
    this.addChild(this.camera);
    this.camera.resize(this.game.renderer.width, this.game.renderer.height);

    //add this state to the game
    this.game.addState(this);
};

gf.inherits(gf.GameState, gf.DisplayObjectContainer, {
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

        this.world = new gf.TiledMap(this.game, 0, world);
        this.world.resize(this.game.renderer.width, this.game.renderer.height);
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