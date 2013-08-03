requirejs.config({
    baseUrl: '/test/unit/'
});

define(function(require) {
    var testModules = [
        'core',
        'plugin',

        'audio/AudioManager',
        'audio/AudioPlayer',

        'camera/Camera',
        'camera/fx/Close',
        'camera/fx/Effect',
        'camera/fx/Fade',
        'camera/fx/Flash',
        'camera/fx/Scanlines',
        'camera/fx/Shake',

        'display/AnimatedSprite',
        'display/DisplayObjectContainer',
        'display/Sprite',

        'font/TextureFont',

        'game/Game',
        'game/GameState',

        'gui/Gui',
        'gui/GuiItem',

        'input/Gamepad',
        'input/GamepadButtons',
        'input/GamepadSticks',
        'input/Input',
        'input/InputManager',
        'input/Keyboard',

        'loader/AssetLoader',
        'loader/AudioLoader',
        'loader/JsonLoader',
        'loader/Loader',
        'loader/TextureLoader',
        'loader/parse/SpriteSheetLoader',
        'loader/parse/WorldLoader',

        'map/tiled/TiledLayer',
        'map/tiled/TiledMap',
        'map/tiled/TiledObjectGroup',
        'map/tiled/TiledTileset',
        'map/ImageLayer',
        'map/Layer',
        'map/Map',
        'map/Tile',

        'physics/PhysicsSystem',
        'physics/PhysicsTarget',

        'pool/ObjectPool',
        'pool/SpritePool',

        'utils/Clock',
        'utils/EventEmitter',
        'utils/math',
        'utils/utils',
        'utils/Vector'
    ];

    // Resolve all testModules and then start the Test Runner.
    require(testModules, function() {
        QUnit.start();
    });
});