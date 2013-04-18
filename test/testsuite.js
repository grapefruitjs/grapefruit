requirejs.config({
    baseUrl: '/test/unit/'
});

define(function(require) {
    var testModules = [
        'core',
        'Game',
        'AssetLoader',
        'AudioPlayer',
        'DisplayObject',
        'Camera',
        'Sprite',
        'Entity',
        'entityPool',

        'debug/debug',

        'utils/utils',
        'utils/Clock',
        'utils/ObjectPool',
        'utils/Vector',

        'input/InputManager',
        'input/Input',
        'input/Mouse',
        'input/Keyboard',
        'input/Gamepad',
        'input/GamepadButtons',
        'input/GamepadSticks',

        'font/Font',
        'font/TextureFont',

        'gui/Gui',
        'gui/GuiItem',
        'gui/Hud',
        'gui/HudItem',

        'map/Map',
        'map/Layer',
        'map/tiled/TiledMap',
        'map/tiled/TiledLayer',
        'map/tiled/TiledTileset',
        'map/tiled/TiledObjectGroup',

        'plugin/plugin'
    ];

    // Resolve all testModules and then start the Test Runner.
    require(testModules, function() {
        QUnit.start();
    });
});