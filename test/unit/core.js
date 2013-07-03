define(function() {
    Q.module('Core');

    Q.test('Exports', function() {
        Q.ok(gf, 'gf object');

        //PIXI Wraps
        Q.ok(gf.Point, 'gf.Point');
        Q.ok(gf.Rectangle, 'gf.Rectangle');
        Q.ok(gf.Rectangle, 'gf.Polygon');
        Q.ok(gf.Rectangle, 'gf.Circle');
        Q.ok(gf.Rectangle, 'gf.Ellipse');
        Q.ok(gf.Texture, 'gf.Texture');

        //internal stuff
        Q.ok(gf.version, 'gf.version');
        Q.ok(gf.assetCache, 'gf.assetCache');
        Q.ok(gf.support, 'gf.support');

        //some useful functions
        Q.ok(gf.inherits, 'gf.inherits');
        Q.equal(typeof gf.inherits, 'function', 'gf.inherits is a function');

        //usable objects
        Q.ok(gf.plugin, 'gf.plugin');
        Q.ok(gf.utils, 'gf.utils');
        Q.ok(gf.math, 'gf.math');
        Q.ok(gf.input, 'gf.input');

        //creatable objects
        Q.ok(gf.AudioManager, 'gf.AudioManager');
        Q.ok(gf.AudioPlayer, 'gf.AudioPlayer');
        Q.ok(gf.Sprite, 'gf.Sprite');
        Q.ok(gf.AnimatedSprite, 'gf.AnimatedSprite');
        Q.ok(gf.Camera, 'gf.Camera');
        Q.ok(gf.DisplayObjectContainer, 'gf.DisplayObjectContainer');
        Q.ok(gf.Font, 'gf.Font');
        Q.ok(gf.TextureFont, 'gf.TextureFont');
        Q.ok(gf.Game, 'gf.Game');
        Q.ok(gf.GameState, 'gf.GameState');
        Q.ok(gf.Gui, 'gf.Gui');
        Q.ok(gf.GuiItem, 'gf.GuiItem');
        Q.ok(gf.InputManager, 'gf.InputManager');
        Q.ok(gf.input.Input, 'gf.input.Input');
        Q.ok(gf.input.Keyboard, 'gf.input.Keyboard');
        Q.ok(gf.input.Gamepad, 'gf.input.Gamepad');
        Q.ok(gf.input.GamepadButtons, 'gf.input.GamepadButtons');
        Q.ok(gf.input.GamepadSticks, 'gf.input.GamepadSticks');
        Q.ok(gf.AssetLoader, 'gf.AssetLoader');
        Q.ok(gf.Loader, 'gf.Loader');
        Q.ok(gf.AudioLoader, 'gf.AudioLoader');
        Q.ok(gf.JsonLoader, 'gf.JsonLoader');
        Q.ok(gf.SpriteSheetLoader, 'gf.SpriteSheetLoader');
        Q.ok(gf.TextureLoader, 'gf.TextureLoader');
        Q.ok(gf.WorldLoader, 'gf.WorldLoader');
        Q.ok(gf.Map, 'gf.Map');
        Q.ok(gf.Layer, 'gf.Layer');
        Q.ok(gf.ImageLayer, 'gf.ImageLayer');
        Q.ok(gf.Tile, 'gf.Tile');
        Q.ok(gf.TiledMap, 'gf.TiledMap');
        Q.ok(gf.TiledLayer, 'gf.TiledLayer');
        Q.ok(gf.TiledObjectGroup, 'gf.TiledObjectGroup');
        Q.ok(gf.TiledTileset, 'gf.TiledTileset');
        Q.ok(gf.PhysicsSystem, 'gf.PhysicsSystem');
        Q.ok(gf.ObjectPool, 'gf.ObjectPool');
        Q.ok(gf.SpritePool, 'gf.SpritePool');
        Q.ok(gf.Clock, 'gf.Clock');
        Q.ok(gf.Emitter, 'gf.Emitter');
        Q.ok(gf.Vector, 'gf.Vector');
    });
});