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

var gf = {
    //audio
    AudioManager:       require('./audio/AudioManager'),
    AudioPlayer:        require('./audio/AudioPlayer'),

    //camera
    Camera:             require('./camera/Camera'),

    //controls
    Controls:           require('./controls/Controls'),
    TopDownControls:    require('./controls/TopDownControls'),

    //display
    BaseTexture:        require('./display/BaseTexture'),
    Container:          require('./display/Container'),
    Graphics:           require('./display/Graphics'),
    RenderTexture:      require('./display/RenderTexture'),
    Sprite:             require('./display/Sprite'),
    SpriteBatch:        require('./display/SpriteBatch'),
    Texture:            require('./display/Texture'),
    TilingSprite:       require('./display/TilingSprite'),

    //fx
    fx: {
        camera: {
            Effect:     require('./fx/camera/Effect'),
            Close:      require('./fx/camera/Close'),
            Fade:       require('./fx/camera/Fade'),
            Flash:      require('./fx/camera/Flash'),
            Scanlines:  require('./fx/camera/Scanlines'),
            Shake:      require('./fx/camera/Shake')
        },
        filters: {
            Filter:     require('./fx/filters/Filter')
        }
    },

    //game
    Game:               require('./game/Game'),
    State:              require('./game/State'),
    StateManager:       require('./game/StateManager'),
    World:              require('./game/World'),

    //geometry
    Circle:             require('./geom/Circle'),
    Ellipse:            require('./geom/Ellipse'),
    Polygon:            require('./geom/Polygon'),
    Rectangle:          require('./geom/Rectangle'),

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

    //math
    math:               require('./math/math'),
    Vector:             require('./math/Vector'),

    //particles
    ParticleEmitter:    require('./particles/ParticleEmitter'),
    ParticleSystem:     require('./particles/ParticleSystem'),

    //physics
    PhysicsSystem:      require('./physics/PhysicsSystem'),
    PhysicsTarget:      require('./physics/PhysicsTarget'),

    //text
    BitmapText:         require('./text/BitmapText'),
    Text:               require('./text/Text'),

    //tilemap
    Tile:               require('./tilemap/Tile'),
    Tilelayer:          require('./tilemap/Tilelayer'),
    Tilemap:            require('./tilemap/Tilemap'),
    Tileset:            require('./tilemap/Tileset'),
    ObjectGroup:        require('./tilemap/ObjectGroup'),

    //utils
    utils:              require('./utils/utils'),
    support:            require('./utils/support'),
    inherit:            require('./utils/inherit'),
    Cache:              require('./utils/Cache'),
    Clock:              require('./utils/Clock'),
    Color:              require('./utils/Color'),
    EventEmitter:       require('./utils/EventEmitter'),
    ObjectPool:         require('./utils/ObjectPool'),
    Queue:              require('./utils/Queue'),
    SpritePool:         require('./utils/SpritePool'),
    ObjectFactory:      require('./utils/ObjectFactory'),

    //vendor files
    PIXI:               require('pixi.js'),
    cp:                 require('chipmunk')
};

//replace the pixi point with a powerful vector class
gf.PIXI.Point = gf.Vector;

//expose whitelisted pixi filters
var filters = [
    'FilterBlock', 'WebGLFilterManager', 'FilterTexture', 'AlphaMaskFilter',
    'ColorMatrixFilter', 'GrayFilter', 'DisplacementFilter', 'PixelateFilter',
    'BlurXFilter', 'BlurYFilter', 'BlurFilter', 'InvertFilter', 'SepiaFilter',
    'TwistFilter', 'ColorStepFilter', 'DotScreenFilter', 'CrossHatchFilter',
    'RGBSplitFilter'
];

for(var f = 0; f < filters.length; ++f) {
    gf.fx.filters[filters[f]] = gf.PIXI[filters[f]];
}

//copy over constants
var C = require('./constants');

for(var k in C) {
    gf[k] = C[k];
}

module.exports = gf;
