/**
* @license GrapeFruit Game Engine
* Copyright (c) 2012, Chad Engler
*
* GrapeFruit is licensed under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
*
*/

/****************************************************************************
 * Global GrapeFruit Object
 ****************************************************************************/
window.gf = window.gf || {};

/****************************************************************************
 * GrapeFruit Version
 ****************************************************************************/
gf.version = '0.0.1';

/****************************************************************************
 * GrapeFruit Type Constants
 ****************************************************************************/
gf.types = {
    //Entity types
    ENTITY: {
        PLAYER: 'player',
        ENEMY: 'enemy',
        FRIENDLY: 'friendly',
        NEUTRAL: 'neutral',
        COLLECTABLE: 'collectable'
    },
    //Layer types
    LAYER: {
        TILE_LAYER: 'tilelayer',
        OBJECT_GROUP: 'objectgroup' // each zone is defined as an object group
    },
    //Tile collision types
    COLLISION: {
        NONE: 'none',
        SOLID: 'solid',
        CLIFF: 'cliff',
        LADDER: 'ladder',
        WATER: 'water',
        DEEP_WATER: 'deep_water'
    },
    //pubsub events
    EVENT: {
        ENTITY_MOVE: 'gf.entity.move',
        LOADER_START: 'gf.loader.start',
        LOADER_ERROR: 'gf.loader.error',
        LOADER_PROGRESS: 'gf.loader.progress',
        LOADER_LOAD: 'gf.loader.load',
        LOADER_COMPLETE: 'gf.loader.complete'
    },
    //Bindable keycodes
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
    }
};

/****************************************************************************
 * GrapeFruit Browser Support Sniffing
 ****************************************************************************/
gf.support = {
    //user agent
    ua: navigator.userAgent.toLowerCase(),

    //canvas supported?
    canvas: !!window.CanvasRenderingContext2D,

    //webgl supported?
    webgl: (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })(),

    //web workers supported?
    workers: !!window.Worker,

    //fileapi supported?
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    //can this browser play audio?
    audio: {
        play: !!document.createElement('audio').canPlayType,
        m4a: false,
        mp3: false,
        ogg: false,
        wav: false,
    },

    //local storage supported?
    localStorage: !!window.localStorage
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

/****************************************************************************
 * GrapeFruit Version Checking
 ****************************************************************************/
//returns a number representing how far off a version is.
//
//will return a negative value if the first version is behind the second,
//the negative number will show how many versions behind it is on largest version
//point.
//That is: '1.0' compared with '1.1' will yield -1
//and    : '1.2.3' compared with '1.2.1' will yield -2
//
//0 is returned if the versions match, and a positive number is returned if
//the first version is larger than the second.
gf.checkVersion = function(first, second) {
    second = second || gf.version;

    var a = first.split('.'),
        b = second.split('.'),
        len = Math.min(a.length, b.length),
        result = 0;

    for(var i = 0; i < len; ++i) {
        if(result = +a[i] - +b[i]) {
            break;
        }
    }

    return result ? result : a.length - b.length;
};

/****************************************************************************
 * Javascript Inheritance Helper (use functional mixins instead?)
 ****************************************************************************/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    
// The base Class implementation (does nothing)
Class = function() {};

// Create a new Class that inherits from this class
Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
                return function() {
                    var tmp = this._super;
                   
                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];
                   
                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                   
                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
    }
    
    // The dummy class constructor
    Class = function () {
        // All construction is actually done in the init method
        if ( !initializing && this.init )
            this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.constructor = Class;
    
    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
};

/****************************************************************************
 * Main game object
 ****************************************************************************/

(function() {
    gf.game = {
        //array of objects in the scene
        objects: {},
        numObjects: 0,

        //special user-defined entity types
        entTypes: {},

        //maximum Z index, where the camera lies
        MAX_Z: 500,

        //raw THREE objects that will control rendering
        _scene: new THREE.Scene(),
        _clock: new THREE.Clock(false),
        _renderer: null,
        _camera: null,

        //id for the next entity to be added
        _nextId: Date.now(),

        //the object that will contain the render domElement
        _$cont: null,

        //have we initialized the game already?
        _initialized: false,

        init: function(contId, opts) {
            if(gf.controls._initialized) return;

            opts = opts || {};

            gf.game.gravity = (opts.gravity !== undefined ? opts.velocity : 0.98);
            gf.game.friction = gf.utils.ensureVector(opts.friction);
            gf.game.clearColor = opts.clearColor || 0xcccccc;

            /****************************************************************************
             * Choose a render method (WebGL or Canvas)
             ****************************************************************************/
            //if they speciy a method, check if it is available
            if(opts.renderMethod) {
                if(!gf.support[renderMethod]) {
                    throw 'Render method ' + renderMethod + ' is not supported by this browser!';
                    return;
                }
            }
            //if they don't specify a method, guess the best to use
            else {
                if(gf.support.webgl) renderMethod = 'webgl';
                else if(gf.support.canvas) renderMethod = 'canvas';
                else {
                    throw 'Neither WebGL nor Canvas is supported by this browser!';
                    return;
                }
            }

            //initialize the correct renderer
            if(renderMethod == 'webgl') {
                gf.game._renderer = new THREE.WebGLRenderer({
                    //can also specify 'canvas' dom element, but we just let THREE generate one
                    precision: 'highp',
                    alpha: true,
                    premultipliedAlpha: true,
                    antialias: false,
                    clearColor: gf.game.clearColor,
                    clearAlpha: 0,
                    maxLights: 4
                });
            } else if(renderMethod == 'canvas') {
                gf.game._renderer = new THREE.CanvasRenderer({
                    //can also specify 'canvas' dom element, but we just let THREE generate one
                });
            }

            gf.game._renderMethod = renderMethod;

            /****************************************************************************
             * Setup game container
             ****************************************************************************/
            //cache the container object
            gf.game._$cont = $('#' + contId);

            var w = opts.width || gf.game._$cont.width(),
                h = opts.height || gf.game._$cont.height();

            //initialize the renderer
            gf.game._renderer.domElement.style['z-index'] = 5;
            gf.game._renderer.setSize(w, h);
            gf.game._$cont.append(gf.game._renderer.domElement);
            gf.game._$domElement = $(gf.game._renderer.domElement);

            /****************************************************************************
             * Initialize the camera and lighting
             ****************************************************************************/
            //initialize the camera
            gf.game._camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000);
            gf.game._camera.position.z = gf.game.MAX_Z;

            gf.game._scene.add(this.camera);

            //add ambient light to the scene
            gf.game._scene.add(new THREE.AmbientLight(0xffffff));

            /****************************************************************************
             * Initialize the various game components
             ****************************************************************************/
            //initialize the controls
            gf.controls.init();

            //initialize the audio player
            gf.audio.init();

            //initialize the GUI (HUD, menus, etc)
            gf.gui.init();

            /****************************************************************************
             * Add some debug elements
             ****************************************************************************/
            //fps counter
            if(gf.debug.showFps) {
                gf.debug._fpsCounter = new gf.debug.FpsCounter();
                gf.utils.each(gf.debug.fpsStyle, function(k, v) { gf.debug._fpsCounter.domElement.style[k] = v; });
                document.body.appendChild(gf.debug._fpsCounter.domElement);
            }

            //debug info
            if(gf.debug.showInfo) {
                gf.debug._info = new gf.debug.Info();
                gf.utils.each(gf.debug.infoStyle, function(k, v) { gf.debug._info.domElement.style[k] = v; });
                document.body.appendChild(gf.debug._info.domElement);
            }

            gf.game._initialized = true;

            return this;
        },
        getNextObjectId: function() {
            return gf.game._nextId++;
        },
        addObject: function(obj) {
            if(!obj) return;

            if(!obj.id) obj.id = gf.game.getNextObjectId();
            if(!gf.game.objects[obj.id]) gf.game.numObjects++;

            gf.game.objects[obj.id] = obj;

            if(obj.addToScene) obj.addToScene(gf.game._scene);

            if(obj.type == gf.types.ENTITY.PLAYER)
                gf.game.player = obj;

            return this;
        },
        removeObject: function(obj) {
            if(!obj) return;

            //remove object from our list
            delete gf.game.objects[obj.id];
            gf.game.numObjects--;

            if(obj.removeFromScene) obj.removeFromScene(gf.game._scene);

            if(obj.type == gf.types.ENTITY.PLAYER)
                gf.game.player = null;

            //deallocate resources for this entity
            gf.game._renderer.deallocateObject(obj._mesh);
            gf.game._renderer.deallocateObject(obj._hitboxMesh);

            return this;
        },
        loadWorld: function(world) {
            if(typeof world == 'string'){
                if(gf.resources[world]) world = gf.resources[world].data;
                else {
                    throw 'World not found in resources!';
                    return;
                }
            }

            gf.game.world = new gf.TiledMap(world);
            gf.game.addObject(gf.game.world);

            return this;
        },
        render: function() {
            gf.game._clock.start();
            gf.game._tick();

            return this;
        },
        //Check if passed entity collides with any others
        checkCollisions: function(obj) {
            var colliders = [];

            $.each(gf.game.objects, function(id, o) {
                //check if this object collides with any others
                if(o.inViewport && o.isVisible && o.isCollidable && o.isEntity && (o != obj)) {
                    var collisionVector = o.checkCollision(obj);
                    if(!collisionVector.isZero()) {
                        colliders.push({
                            entity: o,
                            vector: collisionVector
                        });
                        o.onCollision(obj);
                    }
                }
            });

            return colliders;
        },
        //lock the camera on an entity
        cameraTrack: function(ent) {
            if(ent.isEntity) {
                if(this._trackedEntMoveHandle) {
                    gf.event.unsubscribe(this._trackedEntMoveHandle);
                }

                this._trackedEntMoveHandle = gf.event.subscribe(gf.types.EVENT.ENTITY_MOVE + '.' + ent.id, function(velocity) {
                    gf.game._camera.translateX(velocity.x);
                    gf.game._camera.translateY(velocity.y);

                    //If this gets heavy, then just remove it
                    //update if each object is within the viewport

                    //update matrices
                    //gf.game._camera.updateMatrix(); // make sure camera's local matrix is updated
                    //gf.game._camera.updateMatrixWorld(); // make sure camera's world matrix is updated
                    //gf.game._camera.matrixWorldInverse.getInverse( camera.matrixWorld );
                    var frustum = new THREE.Frustum();
                    frustum.setFromMatrix(new THREE.Matrix4().multiply(gf.game._camera.projectionMatrix, gf.game._camera.matrixWorldInverse));
                    gf.utils.each(gf.game.objects, function(id, o) {
                        if(o.isEntity && o._mesh && o._mesh.geometry) {
                            //o._mesh.updateMatrix(); // make sure plane's local matrix is updated
                            //o._mesh.updateMatrixWorld(); // make sure plane's world matrix is updated
                            o.inViewport = frustum.contains(o._mesh);
                        }
                    });
                });
            }

            return this;
        },
        _tick: function() {
            //start render loop
            requestAnimationFrame(gf.game._tick);

            //get clock delta
            gf.game._delta = gf.game._clock.getDelta();

            //update fps box
            if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

            //update debug info
            if(gf.debug._info) gf.debug._info.update();

            //update the HUD
            if(gf.HUD.initialized) gf.HUD.update();

            //update each object
            gf.utils.each(gf.game.objects, function(id, o) {
                if(o.inViewport && o.isVisible && o.update) {
                    o.update();
                }
            });

            //render scene
            gf.game._renderer.render(gf.game._scene, gf.game._camera);
        }
    };
})();