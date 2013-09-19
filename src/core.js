/**
* @license GrapeFruit Game Engine
* Copyright (c) 2012-2014, Chad Engler
*
* GrapeFruit is licensed under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
*
* Known Limiting Features:
*   - Canvas
*       - IE 9+
*       - FF 2+
*       - Chrome 4+
*       - Safari 3.1+
*       - Opera 9+
*
*   - WebGL
*       - IE 11+
*       - FF 4+
*       - Chrome 8+
*       - Safari 6+
*       - Opera 12+
*
*   - Object.create
*       - IE 9+
*       - FF 4+
*       - Chrome 7+
*       - Safari 5+
*       - Opera 12+
*/

module.exports = {
    //audio
    AudioManager:   require('./audio/AudioManager'),
    AudioPlayer:    require('./audio/AudioPlayer'),

    //camera
    Camera: require('./camera/Camera'),

    //display
    BaseTexture:    require('./display/BaseTexture'),
    Texture:        require('./display/Texture'),
    Container:      require('./display/Container'),
    Sprite:         require('./display/Sprite'),
    AnimatedSprite: require('./display/AnimatedSprite'),

    //font
    BitmapFont: require('./font/BitmapFont'),

    //fx
    fx: {
        camera: {
            Effect: require('./fx/camera/Effect'),
            Close:  require('./fx/camera/Close'),
            Fade:   require('./fx/camera/Fade'),
            Flash:  require('./fx/camera/Flash'),
            Scanlines: require('./fx/camera/Scanlines'),
            Shake:  require('./fx/camera/Shake')
        }
    },

    //game
    Game:       require('./game/Game'),
    State:      require('./game/State'),
    StateManager: require('./game/StateManager'),

    //gui
    Gui:        require('./gui/Gui'),
    GuiItem:    require('./gui/GuiItem'),

    //input
    Input:          require('./input/Input'),
    InputManager:   require('./input/InputManager'),
    Keyboard:       require('./input/Keyboard'),
    Gamepad:        require('./input/Gamepad'),
    GamepadButtons: require('./input/GamepadButtons'),
    GamepadSticks:  require('./input/GamepadSticks'),

    //loader
    Loader: require('./loader/Loader'),

    //map
    Tile:       require('./tilemap/Tile'),
    Tilelayer:  require('./tilemap/Tilelayer'),
    Tilemap:    require('./tilemap/Tilemap'),
    Tileset:    require('./tilemap/Tileset'),
    ObjectGroup: require('./tilemap/ObjectGroup'),

    //math
    math:       require('./math/math'),
    Circle:     require('./math/Circle'),
    Ellipse:    require('./math/Ellipse'),
    Polygon:    require('./math/Polygon'),
    Rectangle:  require('./math/Rectangle'),
    Vector:     require('./math/Vector'),

    //physics
    PhysicsSystem: require('./physics/PhysicsSystem'),
    PhysicsTarget: require('./physics/PhysicsTarget'),

    //utils
    utils:          require('./utils/utils'),
    support:        require('./utils/support'),
    Cache:          require('./utils/Cache'),
    Clock:          require('./utils/Clock'),
    EventEmitter:   require('./utils/EventEmitter'),
    ObjectPool:     require('./utils/ObjectPool'),
    SpritePool:     require('./utils/SpritePool'),
    ObjectFactory:  require('./utils/ObjectFactory'),

    //vendor files
    cp:     require('./vendor/cp'),
    PIXI:   require('./vendor/pixi')
};

//copy over constants
var C = require('./constants');

for(var k in C) {
    module.exports[k] = C[k];
}