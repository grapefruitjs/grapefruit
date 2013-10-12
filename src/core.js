({urequire: { rootExports: 'gf' } });
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
    AudioManager:       require('./audio/AudioManager'),
    AudioPlayer:        require('./audio/AudioPlayer'),

    //camera
    Camera:             require('./camera/Camera'),

    //display
    BaseTexture:        require('./display/BaseTexture'),
    Texture:            require('./display/Texture'),
    Container:          require('./display/Container'),
    Sprite:             require('./display/Sprite'),

    //font
    BitmapText:         require('./text/BitmapText'),

    //fx
    fx: {
        camera: {
            Effect:     require('./fx/camera/Effect'),
            Close:      require('./fx/camera/Close'),
            Fade:       require('./fx/camera/Fade'),
            Flash:      require('./fx/camera/Flash'),
            Scanlines:  require('./fx/camera/Scanlines'),
            Shake:      require('./fx/camera/Shake')
        }
    },

    //game
    Game:               require('./game/Game'),
    State:              require('./game/State'),
    StateManager:       require('./game/StateManager'),

    //gui
    GuiItem:            require('./gui/GuiItem'),

    //input
    Input:              require('./input/Input'),
    InputManager:       require('./input/InputManager'),
    Keyboard:           require('./input/Keyboard'),
    Gamepad:            require('./input/Gamepad'),
    GamepadButtons:     require('./input/gamepad/GamepadButtons'),
    GamepadSticks:      require('./input/gamepad/GamepadSticks'),
    Pointers:           require('./input/Pointers'),
    Pointer:            require('./input/pointer/Pointer'),

    //loader
    Loader:             require('./loader/Loader'),

    //map
    Tile:               require('./tilemap/Tile'),
    Tilelayer:          require('./tilemap/Tilelayer'),
    Tilemap:            require('./tilemap/Tilemap'),
    Tileset:            require('./tilemap/Tileset'),
    ObjectGroup:        require('./tilemap/ObjectGroup'),

    //math
    math:               require('./math/math'),
    Circle:             require('./geom/Circle'),
    Ellipse:            require('./geom/Ellipse'),
    Polygon:            require('./geom/Polygon'),
    Rectangle:          require('./geom/Rectangle'),
    Vector:             require('./math/Vector'),

    //particles
    ParticleEmitter:    require('./particles/ParticleEmitter'),
    ParticleSystem:     require('./particles/ParticleSystem'),

    //physics
    Physics:            require('./physics/Physics'),
    Body:               require('./physics/Body'),

    //utils
    utils:              require('./utils/utils'),
    support:            require('./utils/support'),
    inherit:            require('./utils/inherit'),
    Cache:              require('./utils/Cache'),
    Clock:              require('./utils/Clock'),
    EventEmitter:       require('./utils/EventEmitter'),
    ObjectPool:         require('./utils/ObjectPool'),
    SpritePool:         require('./utils/SpritePool'),
    ObjectFactory:      require('./utils/ObjectFactory'),

    //plugin
    plugin:             require('./plugin'),

    //vendor files
    PIXI:               require('./vendor/pixi')
};

//copy over constants
var C = require('./constants');

for(var k in C) {
    module.exports[k] = C[k];
}
