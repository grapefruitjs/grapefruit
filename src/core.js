/**
* @license GrapeFruit Game Engine
* Copyright (x) 2012, Chad Engler
*
* GrapeFruit is licensed under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
*
*/

/****************************************************************************
 * Global GrapeFruit Object with constants
 ****************************************************************************/
window.gf = window.gf || {
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
    },
    support: {
        canvas: !! window.CanvasRenderingContext2D,
        webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
        workers: !! window.Worker,
        fileapi: window.File && window.FileReader && window.FileList && window.Blob,
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
 * mrdoob's stats.js (stats.js r10 - http://github.com/mrdoob/stats.js)
 ****************************************************************************/
gf.FpsCounter=function(){var l=Date.now(),m=l,g=0,n=1E3,o=0,h=0,p=1E3,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};


/****************************************************************************
 * Main game object
 ****************************************************************************/

(function() {
    gf.game = {
        //array of objects in the scene
        objects: {},

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

        init: function(contId, width, height, renderMethod) {
            if(gf.controls._initialized) return;

            //if they speciy a method, check if it is available
            if(renderMethod) {
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
                    clearColor: 0xff00ff,
                    clearAlpha: 0,
                    maxLights: 4
                });
            } else if(renderMethod == 'canvas') {
                gf.game._renderer = new THREE.CanvasRenderer({
                    //can also specify 'canvas' dom element, but we just let THREE generate one
                });
            }

            gf.game._renderMethod = renderMethod;

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
                gf.debug._fpsCounter = new gf.FpsCounter();
                gf.debug._fpsCounter.domElement.style.position = gf.debug.fpsStyle.position;
                gf.debug._fpsCounter.domElement.style.top = gf.debug.fpsStyle.top;
                gf.debug._fpsCounter.domElement.style.left =gf.debug.fpsStyle.left;

                $('body').append(gf.debug._fpsCounter.domElement);
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
            gf.game.objects[obj.id] = obj;

            if(obj.addToScene) obj.addToScene(gf.game._scene);

            return this;
        },
        removeObject: function(obj) {
            if(!obj) return;

            //remove object from our list
            delete gf.game.objects[obj.id];

            if(obj.removeFromScene) obj.removeFromScene(gf.game._scene);

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
                if(/*o.inViewport &&*/ o.isVisible && o.isCollidable && o.isEntity && (o != obj)) {
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
        //check if passed entity collides with any map tile after applying the velocity movement
        checkMapCollision: function() {

        },
        //lock the camera on an entity
        //I need an event system :/
        cameraTrack: function(ent) {
            if(ent.isEntity) {
                if(this._trackedEntMoveHandle) {
                    gf.event.unsubscribe(this._trackedEntMoveHandle);
                }

                this._trackedEntMoveHandle = gf.event.subscribe(gf.types.EVENT.ENTITY_MOVE + '.' + ent.id, function(velocity) {
                    gf.game._camera.translateX(velocity.x);
                    gf.game._camera.translateY(velocity.y);
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

            //update each object
            $.each(gf.game.objects, function(id, o) {
                o.update();
            });

            //render scene
            gf.game._renderer.render(gf.game._scene, gf.game._camera);
        }
    };
})();