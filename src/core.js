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

var constants = require('./constants');

module.exports = {
    //constants
    version: constants.version,
    FILE_FORMAT: constants.FILE_FORMAT,
    ATLAS_FORMAT: constants.ATLAS_FORMAT,

    //audio
    AudioManager:   require('./audio/AudioManager'),
    AudioPlayer:    require('./audio/AudioPlayer'),

    //camera
    Camera: require('./camera/Camera'),

    //display
    BaseTexture:    require('./display/BaseTexture'),
    Texture:        require('./display/Texture'),
    DisplayObjectContainer: require('./display/DisplayObjectContainer'),
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
    GameState:  require('./game/GameState'),

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
    Tile:       require('./map/Tile'),
    Layer:      require('./map/Layer'),
    Map:        require('./map/Map'),
    Tileset:    require('./map/Tileset'),
    ObjectGroup: require('./map/ObjectGroup'),

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

    //vendor files
    cp:     require('./vendor/cp'),
    PIXI:   require('./vendor/pixi')
};
