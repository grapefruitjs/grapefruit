define(function() {
    Q.module('Core');

    Q.test('Exports', function() {
        Q.ok(gf, 'gf object');

        //PIXI Wraps
        Q.ok(gf.Point, 'gf.Point');
        Q.ok(gf.Rectangle, 'gf.Rectangle');
        Q.ok(gf.Texture, 'gf.Texture');
        Q.ok(gf.EventTarget, 'gf.EventTarget');

        //internal stuff
        Q.ok(gf.version, 'gf.version');
        Q.ok(gf.assetCache, 'gf.assetCache');
        Q.ok(gf.support, 'gf.support');

        //some useful functions
        Q.ok(gf.checkVersion, 'gf.checkVersion');
        Q.equal(typeof gf.checkVersion, 'function', 'gf.checkVersion is a function');

        Q.ok(gf.inherits, 'gf.inherits');
        Q.equal(typeof gf.inherits, 'function', 'gf.inherits is a function');

        //usable objects
        Q.ok(gf.debug, 'gf.debug');
        Q.ok(gf.plugin, 'gf.plugin');
        Q.ok(gf.utils, 'gf.utils');
        Q.ok(gf.entityPool, 'gf.entityPool');
        Q.ok(gf.input, 'gf.input');

        //creatable objects
        Q.ok(gf.Font, 'gf.Font');
        Q.ok(gf.TextureFont, 'gf.TextureFont');
        Q.ok(gf.Gui, 'gf.Gui');
        Q.ok(gf.GuiItem, 'gf.GuiItem');
        Q.ok(gf.Hud, 'gf.Hud');
        Q.ok(gf.HudItem, 'gf.HudItem');
        Q.ok(gf.InputManager, 'gf.InputManager');
        Q.ok(gf.input.Input, 'gf.input.Input');
        Q.ok(gf.input.Keyboard, 'gf.input.Keyboard');
        Q.ok(gf.input.Mouse, 'gf.input.Mouse');
        Q.ok(gf.input.Gamepad, 'gf.input.Gamepad');
        Q.ok(gf.input.GamepadButtons, 'gf.input.GamepadButtons');
        Q.ok(gf.input.GamepadSticks, 'gf.input.GamepadSticks');
        Q.ok(gf.Map, 'gf.Map');
        Q.ok(gf.Layer, 'gf.Layer');
        Q.ok(gf.TiledMap, 'gf.TiledMap');
        Q.ok(gf.TiledLayer, 'gf.TiledLayer');
        Q.ok(gf.TiledObjectGroup, 'gf.TiledObjectGroup');
        Q.ok(gf.TiledTileset, 'gf.TiledTileset');
        Q.ok(gf.Clock, 'gf.Clock');
        Q.ok(gf.ObjectPool, 'gf.ObjectPool');
        Q.ok(gf.Vector, 'gf.Vector');
        Q.ok(gf.AssetLoader, 'gf.AssetLoader');
        Q.ok(gf.AudioPlayer, 'gf.AudioPlayer');
        Q.ok(gf.Camera, 'gf.Camera');
        Q.ok(gf.DisplayObject, 'gf.DisplayObject');
        Q.ok(gf.Entity, 'gf.Entity');
        Q.ok(gf.Game, 'gf.Game');
        Q.ok(gf.Sprite, 'gf.Sprite');
    });
});