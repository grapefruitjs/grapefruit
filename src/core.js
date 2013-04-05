/**
* @license GrapeFruit Game Engine
* Copyright (c) 2012, Chad Engler
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

/**
 * The base grapefruit object
 *
 * @module gf
 * @main gf
 */
window.gf = window.gf || {};

/**
 * Point object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Point.html">PIXI.Point</a>
 *
 * @module gf
 * @class Point
 */
gf.Point = PIXI.Point;

/**
 * Texture object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Texture.html">PIXI.Texture</a>
 *
 * @module gf
 * @class Point
 */
gf.Texture = PIXI.Texture;


/**
 * The current grapefruit version
 *
 * @module gf
 * @property version
 * @type String
 */
gf.version = '0.0.2';

/**
 * Constant types for easy use in code
 *
 * @module gf
 * @class types
 */
gf.types = {
    /**
     * Entity types
     *
     * @property ENTITY
     * @type Object
     */
    ENTITY: {
        PLAYER: 'player',
        ENEMY: 'enemy',
        FRIENDLY: 'friendly',
        NEUTRAL: 'neutral',
        COLLECTABLE: 'collectable'
    },
    /**
     * Layer types
     *
     * @property LAYER
     * @type Object
     */
    LAYER: {
        TILE_LAYER: 'tilelayer',
        OBJECT_GROUP: 'objectgroup' // each zone is defined as an object group
    },
    /**
     * Tile collision types
     *
     * @property COLLISION
     * @type Object
     */
    COLLISION: {
        NONE: 'none',
        SOLID: 'solid',
        CLIFF: 'cliff',
        LADDER: 'ladder',
        WATER: 'water',
        DEEP_WATER: 'deep_water'
    },
    /**
     * Event definitions
     *
     * @property EVENT
     * @type Object
     * @deprecated
     */
    EVENT: {
        ENTITY_MOVE: 'gf.entity.move',
        LOADER_START: 'gf.loader.start',
        LOADER_ERROR: 'gf.loader.error',
        LOADER_PROGRESS: 'gf.loader.progress',
        LOADER_LOAD: 'gf.loader.load',
        LOADER_COMPLETE: 'gf.loader.complete'
    },
    /**
     * Resource types
     *
     * @property RESOURCE
     * @type Object
     * @deprecated
     */
    RESOURCE: {
        AUDIO: 'audio',
        SOUND: 'sound',
        MUSIC: 'music',
        JSON: 'json',
        XML: 'xml',
        WORLD: 'world',
        TEXTURE: 'texture',
        SPRITE: 'sprite',
        IMAGE: 'image'
    },
    /**
     * Bindable keycodes
     *
     * @property KEY
     * @type Object
     */
    KEY: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        NUM0: 48,
        NUM1: 49,
        NUM2: 50,
        NUM3: 51,
        NUM4: 52,
        NUM5: 53,
        NUM6: 54,
        NUM7: 55,
        NUM8: 56,
        NUM9: 57,
        PLUS: 61,
        A : 65,
        B : 66,
        C : 67,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        H : 72,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        M : 77,
        N : 78,
        O : 79,
        P : 80,
        Q : 81,
        R : 82,
        S : 83,
        T : 84,
        U : 85,
        V : 86,
        W : 87,
        X : 88,
        Y : 89,
        Z : 90,
        NUMPAD0: 96,
        NUMPAD1: 97,
        NUMPAD2: 98,
        NUMPAD3: 99,
        NUMPAD4: 100,
        NUMPAD5: 101,
        NUMPAD6: 102,
        NUMPAD7: 103,
        NUMPAD8: 104,
        NUMPAD9: 105,
        NUMPAD_STAR: 106,
        NUMPAD_PLUS: 107,
        NUMPAD_MINUS: 109,
        NUMPAD_DOT: 110,
        NUMPAD_SLASH: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        MINUS: 173,
        TILDE: 192
    },
    /**
     * Bindable Mouse Events
     *
     * @property MOUSE
     * @type Object
     */
    MOUSE: {
        WHEEL: 'mousewheel',
        MOVE: 'mousemove',
        DOWN: 'mousedown',
        UP: 'mouseup',
        CLICK: 'click',
        DBLCLICK: 'dblclick',
        RCLICK: 'contextmenu',
        CONTEXTMENU: 'contextmenu'
    },
    /**
     * Bindable Touch Events
     *
     * @property TOUCH
     * @type Object
     */
    TOUCH: {
        //WHEEL: undefined,
        MOVE: 'touchmove',
        START: 'touchstart',
        END: 'touchend',
        TAP: 'tap',
        DBLTAP: 'dbltap'
        //RCLICK: undefined,
        //CONTEXTMENU: undefined
    },
    /**
     * Bindable Gamepad Buttons
     *
     * @property GP_BUTTONS
     * @type Object
     */
    GP_BUTTONS: {
        FACE_1: 0, // Face (main) buttons
        FACE_2: 1,
        FACE_3: 2,
        FACE_4: 3,
        LEFT_SHOULDER: 4, // Top shoulder buttons
        RIGHT_SHOULDER: 5,
        LEFT_TRIGGER: 6, // Bottom shoulder buttons
        RIGHT_TRIGGER: 7,
        SELECT: 8,
        START: 9,
        LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
        RIGHT_ANALOGUE_STICK: 11,
        PAD_TOP: 12, // Directional (discrete) pad
        PAD_BOTTOM: 13,
        PAD_LEFT: 14,
        PAD_RIGHT: 15
    },
    getGpButtonName: function(i) {
        for(var k in gf.types.GP_BUTTONS) {
            if(gf.types.GP_BUTTONS[k] === i) {
                return k;
            }
        }

        return '';
    },
    /**
     * Bindable Gamepad Axes
     *
     * @property GP_AXES
     * @type Object
     */
    GP_AXES: {
        LEFT_ANALOGUE_HOR: 0,
        LEFT_ANALOGUE_VERT: 1,
        RIGHT_ANALOGUE_HOR: 2,
        RIGHT_ANALOGUE_VERT: 3
    },
    getGpAxisName: function(i) {
        for(var k in gf.types.GP_AXES) {
            if(gf.types.GP_AXES[k] === i) {
                return k;
            }
        }

        return '';
    }
};

/**
 * Feature detection so we cans witch between renderers, play audio correctly, and other things.
 *
 * @module gf
 * @class support
 */
gf.support = {
    /**
     * The current user agent string
     *
     * @property ua
     * @type String
     */
    ua: navigator.userAgent.toLowerCase(),

    /**
     * Whether or not canvas is supported
     *
     * @property canvas
     * @type bool
     */
    canvas: !!window.CanvasRenderingContext2D,

    /**
     * Whether or not webgl is supported
     *
     * @property webgl
     * @type bool
     */
    webgl: (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })(),

    /**
     * Whether or not web workers are supported
     *
     * @property workers
     * @type bool
     */
    workers: !!window.Worker,

    /**
     * Whether or not the filesystem API is supported
     *
     * @property fileapi
     * @type bool
     */
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    /**
     * Whether or not the audio elements are supported, and if so which types
     *
     * @property audio
     * @type Object
     */
    audio: {
        play: !!document.createElement('audio').canPlayType,
        m4a: false,
        mp3: false,
        ogg: false,
        wav: false
    },

    /**
     * Whether or not local storage is supported
     *
     * @property localStorage
     * @type bool
     */
    localStorage: !!window.localStorage,

    /**
     * Whether or not touch is supported
     *
     * @property touch
     * @type bool
     */
    touch: ('createTouch' in document) || ('ontouchstart' in window) || (navigator.isCocoonJS),

    /**
     * Whether or not the gamepad API is supported
     *
     * @property gamepad
     * @type bool
     */
    gamepad: !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') !== -1)
};

//additional audio support checks
if(gf.support.audio.play) {
    var a = document.createElement('audio');

    gf.support.audio.m4a = !!a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, '');
    gf.support.audio.mp3 = !!a.canPlayType('audio/mpeg').replace(/no/, '');
    gf.support.audio.ogg = !!a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '');
    gf.support.audio.wav = !!a.canPlayType('audio/wav; codecs="1"').replace(/no/, '');

    //check for specific platforms
    if(gf.support.ua.search('iphone') > -1 || gf.support.ua.search('ipod') > -1 ||
        gf.support.ua.search('ipad') > -1 || gf.support.ua.search('android') > -1) {

        //if on mobile device, without a specific HTML5 acceleration framework
        if(!navigator.isCocoonJS) {
            gf.support.audio.play = false;
        }
    }
}

/**
 * Compares version numbers, useful for plugins to specify a required gf version
 *
 * @module gf
 * @method checkVersion
 * @param first {String} The first version
 * @param second {String} The second version
 * @return {Number}
 *      returns a number representing how far off a version is.
 *
 *      will return a negative value if the first version is behind the second,
 *      the negative number will show how many versions behind it is on largest version
 *      point.
 *      That is: '1.0' compared with '1.1' will yield -1
 *      and    : '1.2.3' compared with '1.2.1' will yield -2
 *
 *      0 is returned if the versions match, and a positive number is returned if
 *      the first version is larger than the second.
 */
gf.checkVersion = function(first, second) {
    second = second || gf.version;

    var a = first.split('.'),
        b = second.split('.'),
        len = Math.min(a.length, b.length),
        result = 0;

    for(var i = 0; i < len; ++i) {
        result = +a[i] - +b[i];
        if(result) break;
    }

    return result ? result : a.length - b.length;
};

/**
 * Inherits the prototype of a parent object.
 * from: https://github.com/isaacs/inherits/blob/master/inherits.js
 *
 * @module gf
 * @method inherits
 * @param child {Object} The Child to inherit the prototype
 * @param parent {Object} The Parent to inherit from
 * @param proto {Object} The prototype
 */
gf.inherits = function(c, p, proto) {
  proto = proto || {};
  var e = {};
  [c.prototype, proto].forEach(function (s) {
    Object.getOwnPropertyNames(s).forEach(function (k) {
      e[k] = Object.getOwnPropertyDescriptor(s, k);
    });
  });
  c.prototype = Object.create(p.prototype, e);
  c['super'] = p;
};

/**
 * High performance clock, from mrdoob's Three.js
 * https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
 *
 * @module gf
 * @class Clock
 * @constructor
 * @param autoStart {Boolean} Automatically start the counter or not
 * @example
 *      var clock = new gf.Clock(false);
 *      //... some code ...
 *      clock.start();
 *      //... some long code ...
 *      var delta = clock.getDelta();
 */
gf.Clock = function(autoStart) {
    this.autoStart = (autoStart !== undefined) ? autoStart : true;

    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;

    this.running = false;
};

gf.inherits(gf.Clock, Object, {
    /**
     * Starts the timer
     *
     * @method start
     * @example
     *      clock.start();
     */
    start: function() {
        this.startTime = window.performance !== undefined && window.performance.now !== undefined ?
                            window.performance.now() : Date.now();

        this.oldTime = this.startTime;
        this.running = true;
    },
    /**
     * Stops the timer
     *
     * @method stop
     * @example
     *      clock.stop();
     */
    stop: function() {
        this.getElapsedTime();
        this.running = false;
    },
    /**
     * Gets the total time that the timer has been running
     *
     * @method getElapsedTime
     * @return {Number} Total ellapsed time in ms
     * @example
     *      clock.getElapsedTime();
     */
    getElapsedTime: function() {
        this.getDelta();

        return this.elapsedTime;
    },
    /**
     * Gets the difference in time since getDelta() was called last
     *
     * @method getDelta
     * @return {Number} Ellapsed time since last call in seconds
     * @example
     *      clock.getDelta();
     */
    getDelta: function() {
        var diff = 0;

        if(this.autoStart && !this.running) {
            this.start();
        }

        if(this.running) {
            var newTime = window.performance !== undefined && window.performance.now !== undefined ?
                                window.performance.now() : Date.now();

            diff = 0.001 * (newTime - this.oldTime);
            this.oldTime = newTime;

            this.elapsedTime += diff;
        }

        return diff;
    }
});

/**
 * Main game object, controls the entire instance of the game
 *
 * @module gf
 * @class game
 */
gf.game = {
    /**
     * List of all objects on the stage by id
     *
     * @property objects
     * @type {Object}
     */
    objects: {},

    /**
     * Number of objects added to the stage
     *
     * @property numObjects
     * @type {Number}
     */
    numObjects: 0,

    /**
     * Maximum Z value
     *
     * @property MAX_Z
     * @type {Number}
     * @default 500
     * @private
     * @readOnly
     */
    MAX_Z: 500,

    /**
     * Raw PIXI.stage instance
     *
     * @property _stage
     * @type {PIXI.Stage}
     * @private
     * @readOnly
     */
    _stage: new PIXI.Stage(),

    /**
     * Raw gf.Clock instance for internal timing
     *
     * @property _clock
     * @type {gf.Clock}
     * @private
     * @readOnly
     */
    _clock: new gf.Clock(false),

    /**
     * Raw rendering engine
     *
     * @property _renderer
     * @type {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
     * @private
     * @readOnly
     */
    _renderer: null,

    /**
     * Internal ID counter for object IDs
     *
     * @property _nextId
     * @type {Number}
     * @private
     */
    _nextId: Date.now(),

    /**
     * The domElement that we are rendering into (the container)
     *
     * @property _cont
     * @type {DOMELement}
     * @private
     */
    _cont: null,

    /**
     * Tracker to see if the game has been initialized yet
     *
     * @property _initialized
     * @type {Boolean}
     * @private
     */
    _initialized: false,

    /**
     * Initializes a new game instance, only one allowed
     *
     * @method init
     * @param contId {String} The container for the new canvas we will create for the game
     * @param opts {Object} Options such as gravity, friction, and renderMethod
     * @example gf.game.init('myDiv', { renderMethod: 'webgl' });
     * @return {game} Returns itself for chainability
     */
    init: function(contId, opts) {
        if(gf.controls._initialized) return;

        opts = opts || {};

        gf.game.gravity = (opts.gravity !== undefined ? opts.gravity : 0.98);
        gf.game.friction = gf.utils.ensureVector(opts.friction);

        var renderMethod = opts.renderMethod;
        //if they speciy a method, check if it is available
        if(renderMethod) {
            if(!gf.support[renderMethod]) {
                throw 'Render method ' + renderMethod + ' is not supported by this browser!';
            }
        }
        //if they don't specify a method, guess the best to use
        else {
            if(gf.support.webgl) renderMethod = 'webgl';
            else if(gf.support.canvas) renderMethod = 'canvas';
            else {
                throw 'Neither WebGL nor Canvas is supported by this browser!';
            }
        }

        //cache the container object
        gf.game._cont = document.getElementById(contId);

        var w = opts.width || gf.utils.getStyle(gf.game._cont, 'width'),
            h = opts.height || gf.utils.getStyle(gf.game._cont, 'height');

        //initialize the correct renderer
        if(renderMethod === 'webgl') {
            gf.game._renderer = new PIXI.WebGLRenderer(w, h);
        } else if(renderMethod === 'canvas') {
            gf.game._renderer = new PIXI.CanvasRenderer(w, h);
        }

        //save rendering method string
        gf.game._renderMethod = renderMethod;

        //initialize the renderer
        gf.game._renderer.view.style['z-index'] = opts.zIndex || 5;
        gf.game._cont.appendChild(gf.game._renderer.view);

        //initialize the controls
        gf.controls.init();

        //initialize the audio player
        gf.audio.init();

        //initialize the GUI (HUD, menus, etc)
        gf.gui.init();

        //initialize gamepad support
        gf.gamepad.init();

        //fps counter
        if(gf.debug.showFps) {
            gf.debug._fpsCounter = new gf.debug.FpsCounter();
            for(var s in gf.debug.fpsStyle) {
                gf.debug._info.domElement.style[s] = gf.debug.fpsStyle[s];
            }
            document.body.appendChild(gf.debug._fpsCounter.domElement);
        }

        //debug info
        if(gf.debug.showInfo) {
            gf.debug._info = new gf.debug.Info();
            for(var s in gf.debug.infoStyle) {
                gf.debug._info.domElement.style[s] = gf.debug.infoStyle[s];
            }
            document.body.appendChild(gf.debug._info.domElement);
        }

        gf.game._initialized = true;

        return this;
    },
    /**
     * Gets the next object id for an object
     *
     * @method getNextObjectId
     * @private
     */
    getNextObjectId: function() {
        return gf.game._nextId++;
    },
    /**
     * Adds an object to the current stage
     *
     * @method addObject
     * @param obj {Sprite} The sprite to the stage
     * @return {game} Returns itself for chainability
     */
    addObject: function(obj) {
        if(!obj) return this;

        if(!obj.id) obj.id = gf.game.getNextObjectId();
        if(!gf.game.objects[obj.id]) gf.game.numObjects++;

        gf.game.objects[obj.id] = obj;
        gf.game._stage.addChild(obj);

        if(obj.onAddedToStage) obj.onAddedToStage();

        return this;
    },
    /**
     * Removes a sprite from the stage
     *
     * @method removeObject
     * @param obj {Sprite} The sprite to the stage
     * @return {game} Returns itself for chainability
     */
    removeObject: function(obj) {
        if(!obj) return;

        //remove object from our list
        delete gf.game.objects[obj.id];
        gf.game.numObjects--;

        gf.game._stage.removeChild(obj);

        if(obj.type === gf.types.ENTITY.PLAYER)
            gf.game.player = null;

        return this;
    },
    loadWorld: function(world) {
        if(typeof world === 'string'){
            if(gf.assetCache[world]) world = gf.assetCache[world];
            else {
                throw 'World not found in assetCache!';
            }
        }

        gf.game.world = new gf.TiledMap(world);
        gf.game.addObject(gf.game.world);

        if(gf.game.world.properties.music) {
            gf.audio.play(gf.game.world.properties.music, { loop: gf.game.world.properties.music_loop === 'true' });
        }

        return this;
    },
    /**
     * Begins the render loop
     *
     * @method render
     * @return {game} Returns itself for chainability
     */
    render: function() {
        gf.game._clock.start();
        gf.game._tick();

        return this;
    },
    /**
     * Check if passed entity collides with any others
     *
     * @method checkCollisions
     * @param obj {Entity} The sprite to the stage
     * @return {Array} Returns an array of colliders
     */
    checkCollisions: function(ent) {
        var colliders = [];

        if(!ent.isCollidable) return colliders;

        for(var id in gf.game.objects) {
            var o = gf.game.objects[id];

            //check if this object collides with any others
            if(o.visible && o.collidable && o.entity && (o !== ent)) {
                var collisionVector = o.checkCollision(ent);
                if(collisionVector.x !== 0 || collisionVector.y !== 0) {
                    colliders.push({
                        entity: o,
                        vector: collisionVector
                    });
                    o.onCollision(ent);
                }
            }
        }

        return colliders;
    },
    /**
     * locks the camera on an entity
     *
     * @method cameraTrack
     * @param ent {Entity} The sprite to the stage
     * @return {game} Returns itself for chainability
     */
    cameraTrack: function(ent) {
        if(ent.isEntity) {
            if(this._trackedEntMoveHandle) {
                gf.event.unsubscribe(this._trackedEntMoveHandle);
            }

            //gf.game._camera.position.x = ent._mesh.position.x;
            //gf.game._camera.position.y = ent._mesh.position.y;
            /*this._trackedEntMoveHandle = gf.event.subscribe(gf.types.EVENT.ENTITY_MOVE + '.' + ent.id, function(velocity) {
                //gf.game._camera.translateX(velocity.x);
                //gf.game._camera.translateY(velocity.y);

                //If this gets heavy, then just remove it
                //update if each object is within the viewport

                //update matrices
                //gf.game._camera.updateMatrix(); // make sure camera's local matrix is updated
                //gf.game._camera.updateMatrixWorld(); // make sure camera's world matrix is updated
                //gf.game._camera.matrixWorldInverse.getInverse( camera.matrixWorld );
                var frustum = new THREE.Frustum();
                frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(gf.game._camera.projectionMatrix, gf.game._camera.matrixWorldInverse));
                gf.utils.each(gf.game.objects, function(id, o) {
                    if(o.isEntity && o._mesh && o._mesh.geometry) {
                        //o._mesh.updateMatrix(); // make sure plane's local matrix is updated
                        //o._mesh.updateMatrixWorld(); // make sure plane's world matrix is updated
                        o.inViewport = frustum.contains(o._mesh);
                    }
                });
            });*/
        }

        return this;
    },
    /**
     * The looping render tick
     *
     * @method _tick
     * @private
     */
    _tick: function() {
        //start render loop
        window.requestAnimationFrame(gf.game._tick);

        //get clock delta
        gf.game._delta = gf.game._clock.getDelta();

        //update fps box
        if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

        //update debug info
        if(gf.debug._info) gf.debug._info.update();

        //update the HUD
        if(gf.HUD.initialized) gf.HUD.update();

        //update the gamepad poller
        gf.gamepad.update();

        //update each object
        for(var id in gf.game.objects) {
            var o = gf.game.objects[id];

            if(o.inViewport && o.isVisible && o.update) {
                o.update();
            }
        }

        //render scene
        gf.game._renderer.render(gf.game._scene/*, gf.game._camera*/);
    }
};