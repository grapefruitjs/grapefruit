requirejs.config({
    baseUrl: '/test/unit/'
});

define(function(require) {
    var testModules = [
        'core',
        'plugin',

        'audio/AudioPlayer',
        'audio/AudioManager',

        'display/Sprite',
        'display/AnimatedSprite',
        'display/Camera',
        'display/DisplayObjectContainer',

        'font/Font',
        'font/TextureFont',

        'game/Game',
        'game/GameState',

        'gui/Gui',
        'gui/GuiItem',

        'input/InputManager',
        'input/Input',
        'input/Keyboard',
        'input/Gamepad',
        'input/GamepadButtons',
        'input/GamepadSticks',

        'loader/AssetLoader',
        'loader/Loader',
        'loader/AudioLoader',
        'loader/JsonLoader',
        'loader/TextureLoader',
        'loader/parse/SpriteSheetLoader',
        'loader/parse/WorldLoader',

        'map/Map',
        'map/Layer',
        'map/ImageLayer',
        'map/Tile',
        'map/tiled/TiledMap',
        'map/tiled/TiledLayer',
        'map/tiled/TiledTileset',
        'map/tiled/TiledObjectGroup',

        'physics/PhysicsSystem',
        'physics/PhysicsTarget.js',

        'pool/SpritePool',
        'pool/ObjectPool',

        'utils/utils',
        'utils/math',
        'utils/Clock',
        'utils/Vector',
        'utils/EventEmitter'
    ];

    // Resolve all testModules and then start the Test Runner.
    require(testModules, function() {
        QUnit.start();
    });
});