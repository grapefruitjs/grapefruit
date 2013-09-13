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

var globals = require('./globals');

module.exports = {
    //globals
    version: globals.version,
    inherits: globals.inherits,
    FORMAT: globals.FORMAT,
    ATLAS_FORMAT: globals.ATLAS_FORMAT,

    //plugin
    plugin: require('./plugin'),

    //camera
    Camera: require('./camera/Camera'),

    //display
    DisplayObjectContainer: require('./display/DisplayObjectContainer'),
    Sprite:         require('./display/Sprite'),
    AnimatedSprite: require('./display/AnimatedSprite'),
    Texture:        require('./display/Texture'),

    //game
    Game: require('./game/Game'),
    GameState: require('./game/GameState'),

    //map
    Tile:   require('./map/Tile'),
    Layer:  require('./map/Layer'),
    Map:    require('./map/Map'),

    //math
    math:       require('./math/math'),
    Circle:     require('./math/Circle'),
    Ellipse:    require('./math/Ellipse'),
    Polygon:    require('./math/Polygon'),
    Rectangle:  require('./math/Rectangle'),
    Vector:     require('./math/Vector'),

    //utils
    utils:          require('./utils/utils'),
    support:        require('./utils/support'),
    Cache:          require('./utils/Cache'),
    Clock:          require('./utils/Clock'),
    EventEmitter:   require('./utils/EventEmitter'),
    ObjectPool:     require('./utils/ObjectPool'),
    SpritePool:     require('./utils/SpritePool'),
};
