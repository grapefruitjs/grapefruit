requirejs.config({
    baseUrl: '/test/unit/'
});

define(function(require) {
    var testModules = [
        'core',
        'audio/audio',
        'controls/controls',
        'controls/gamepad',
        'debug/debug',
        'entity/Entity',
        'entity/entityPool',
        'entity/Sprite',
        'gui/gui',
        'gui/hud',
        'gui/hud/HudItem',
        'loader/AssetLoader',
        'map/Map',
        'map/Layer',
        'map/tiled/TiledLayer',
        'map/tiled/TiledMap',
        'map/tiled/TiledObjectGroup',
        'map/tiled/TiledTileset',
        'plugin/plugin',
        'utils/utils'
    ];

    // Resolve all testModules and then start the Test Runner.
    require(testModules, function() {
        QUnit.start();
    });
});