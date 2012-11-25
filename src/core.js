/**
* @license GrapeFruit Game Engine
* Copyright (x) 2012, Chad Engler
*
* GrapeFruit is licensed under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
*
*/

/****************************************************************************
 * Global GrapeFruit Object
 ****************************************************************************/
var document = window.document;
window.gf = {
    types: {
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
            NONE: 0,
            SOLID: 1,
            CLIFF: 2,
            STAIRS: 3,
            WATER: 4,
            DEEP_WATER: 5,
            DAMAGING: 6
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
    }
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
        objects: [],

        //maximum Z index, where the camera lies
        MAX_Z: 300,

        //raw THREE objects that will control rendering
        _scene: new THREE.Scene(),
        _clock: new THREE.Clock(false),
        _renderer: new THREE.WebGLRenderer(),
        _camera: null,

        //the object that will contain the render domElement
        _$cont: null,

        //have we initialized the game already?
        _initialized: false,

        init: function(contId, width, height) {
            if(gf.controls._initialized) return;

            //cache the container object
            gf.game._$cont = $('#' + contId);

            var w = width || gf.game._$cont.width(),
                h = height || gf.game._$cont.height();

            //initialize the renderer
            gf.game._renderer.setSize(w, h);
            gf.game._$cont.append(gf.game._renderer.domElement);

            //initialize the camera
            gf.game._camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000);
            gf.game._camera.position.z = gf.game.MAX_Z;

            gf.game._scene.add(this.camera);

            //add ambient light to the scene
            gf.game._scene.add(new THREE.AmbientLight(0xffffff));

            //initialize the controls
            gf.controls.init();

            //initialize the audio player
            gf.audio.init();

            //initialize the GUI (HUD, menus, etc)
            gf.gui.init();

            //fps counter
            if(gf.debug.showFps) {
                gf.debug._fpsCounter = new Stats();
                gf.debug._fpsCounter.domElement.style.position = gf.debug.fpsStyle.position;
                gf.debug._fpsCounter.domElement.style.top = gf.debug.fpsStyle.top;
                gf.debug._fpsCounter.domElement.style.left =gf.debug.fpsStyle.left;

                $('body').append(gf.debug._fpsCounter.domElement);
            }

            gf.game._initialized = true;

            return this;
        },
        addObject: function(obj) {
            gf.game.objects.push(obj);

            if(obj && obj.addToScene)
                obj.addToScene(gf.game._scene);

            return this;
        },
        render: function() {
            gf.game._clock.start();
            gf.game._tick();
            return this;
        },
        checkCollision: function(obj) {
            for(var i = 0, il = gf.game.objects.length; i < il; ++i) {
                var o = gf.game.objects[i];
                //check if this object collides with any others
                if(/*o.inViewport &&*/ o.isVisible && o.isCollidable && /*o.isEntity &&*/ (o != obj)) {
                    console.log(o);
                    var collider = o.intersects(obj);
                    if(collider) {
                        o.onCollision(obj);
                        return collider;
                    }
                }
            }
        },
        _tick: function() {
            //start render loop
            requestAnimationFrame(gf.game._tick);

            //get clock delta
            var delta = gf.game._clock.getDelta();

            //update fps box
            if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

            //update each object
            for(var i = 0, il = gf.game.objects.length; i < il; ++i) {
                //run update for this object
                gf.game.objects[i].update(delta);
            }

            //render scene
            gf.game._renderer.render(gf.game._scene, gf.game._camera);
        }
    };
})();