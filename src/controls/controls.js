(function() {
    gf.controls = {
        key: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many keys an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {}
        },
        mouse: {
            //maps a mouse event to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many keys an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //the current screen touches
            touches: [{ x: 0, y: 0 }],
            //the position of the mouse
            position: new gf.Vector(0, 0),
            //the offset of the mouse
            offset: null
        },
        gpButton: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //track the status of each button
            buttons: {}
        },
        gpStick: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //track the status of the axes
            axes: {}
        },

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.controls._initialized) return;

            gf.controls.mouse.offset = gf.utils.getOffset(gf.game._renderer.view);

            document.addEventListener('keydown', gf.controls.onKeyDown, false);
            document.addEventListener('keyup', gf.controls.onKeyUp, false);

            //bind all the mouse/touch events
            if(gf.support.touch) {
                gf.game._cont.addEventListener('touchmove', gf.controls.onMouseMove, false);
                for(var k in gf.types.TOUCH) {
                    if(gf.types.TOUCH[k] === 'touchmove') return;
                    gf.game._cont.addEventListener(gf.types.TOUCH[k], gf.controls.onTouch, false);
                }
            } else {
                gf.game._cont.addEventListener('mousemove', gf.controls.onMouseMove, false);
                document.addEventListener('mousewheel', gf.controls.onMouseWheel, false);
                for(var k in gf.types.MOUSE) {
                    var v = gf.types.MOUSE[k];
                    if(v === 'mousemove'|| v === 'mousewheel') return;
                    gf.game._cont.addEventListener(v, gf.controls.onMouse, false);
                }
            }

            gf.controls._initialized = true;
        },
        //binds an action to a keycode
        bindKey: function(keycode, action, fn) {
            return gf.controls._doBind('key', keycode, action, fn);
        },
        //binds an action to mouse event
        bindMouse: function(evt, action, fn) {
            return gf.controls._doBind('mouse', evt, action, fn);
        },
        //binds an action to a gamepad button
        bindGamepadButton: function(code, action, fn) {
            return gf.controls._doBind('gpButton', code, action, fn);
        },
        //bind an action to a stick movement
        bindGamepadStick: function(code, negative, action, fn) {
            negative = !!negative; //I want negative to be true/false, not truthy or falsey

            return gf.controls._doBind('gpStick', code.toString() + negative, action, fn);
        },
        //unbind an action from a keycode
        unbindKey: function(keycode, action) {
            return gf.controls._doUnbind('key', keycode, action);
        },
        //unbind an action to mouse event
        unbindMouse: function(evt, action) {
            return gf.controls._doUnbind('mouse', evt, action);
        },
        //unbind an action from a gamepad button
        unbindGamepadButton: function(code, action) {
            return gf.controls._doUnbind('gpButton', code, action);
        },
        //bind an action to a stick movement
        unbindGamepadStick: function(code, negative, action) {
            negative = !!negative; //I want negative to be true/false, not truthy or falsey

            return gf.controls._doUnbind('gpStick', code.toString() + negative, action);
        },
        //on keydown event set gf.controls keycode's action as active
        //and call any registered callbacks
        onKeyDown: function(e, override) {
            var which = override || e.keyCode || e.which;

            //if gf.controls key is bound
            if(gf.controls.key.binds[which]) {
                //Don't fire events for repeats on hold
                if(gf.controls.key.status[gf.controls.key.binds[which]] === true)
                    return gf.controls.preventDefault(e);

                //track that gf.controls action is active
                gf.controls.key.status[gf.controls.key.binds[which]] = true;

                //call each callback
                var cbs = gf.controls.key.callbacks[gf.controls.key.binds[which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        if(cbs[i].code === which)
                            cbs[i].fn(gf.controls.key.binds[which], true);
                    }
                }

                return gf.controls.preventDefault(e);
            }

            return gf.controls;
        },
        onKeyUp: function(e, override) {
            var which = override || e.keyCode || e.which;

            //if gf.controls key is bound
            if(gf.controls.key.binds[which]) {
                //Don't fire events for repeats
                if(gf.controls.key.status[gf.controls.key.binds[which]] === false)
                    return gf.controls.preventDefault(e);

                //track that gf.controls action is active
                gf.controls.key.status[gf.controls.key.binds[which]] = false;

                //call each callback
                var cbs = gf.controls.key.callbacks[gf.controls.key.binds[which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        if(cbs[i].code === which)
                            cbs[i].fn(gf.controls.key.binds[which], false);
                    }
                }

                return gf.controls.preventDefault(e);
            }

            return gf.controls;
        },
        //mouse/touch move event
        onMouseMove: function(e) {
            gf.controls.updateCoords(e);

            if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);

            return true;
        },
        //generic mouse event (click, down, up, etc)
        onMouse: function(e) {
            gf.controls.updateCoords(e);

            if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);

            //incase touch event button is undefined
            var keycode = gf.controls.mouse.binds[e.button || 0];

            if(keycode) {
                if(e.type === 'mousedown' || e.type === 'touchstart')
                    return gf.controls.onKeyDown(e, keycode);
                else
                    return gf.controls.onKeyUp(e, keycode);
            }

            return true;
        },
        onMouseWheel: function(e) {
            if(e.target === gf.game._renderer.domElement) {
                if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);
            }

            return true;
        },
        //generic touch event (tap, start, end, etc)
        onTouch: function(e) {
            gf.controls.updateCoords(e);

            return gf.controls.onMouse(e);
        },
        //update the mouse coords
        updateCoords: function(e) {
            gf.controls.mouse.touches.length = 0;

            var off = gf.controls.mouse.offset;

            //mouse event
            if(!e.touches) {
                gf.controls.mouse.touches.push({
                    x: e.pageX - off.left,
                    y: e.pageY - off.top,
                    id: 0
                });
            }
            //touch event
            else {
                for(var i = 0, il = e.changedTouches.length; i < il; ++i) {
                    var t = e.changedTouches[i];

                    gf.controls.mouse.touches.push({
                        x: t.clientX - off.left,
                        y: t.clientY - off.top
                    });
                }
            }
            gf.controls.mouse.position.set(gf.controls.mouse.touches[0].x, gf.controls.mouse.touches[0].y);
        },
        dispatchMouseEvent: function(e) {
            if(gf.controls.mouse.binds[e.type]) {
                //track that gf.controls action is active
                gf.controls.mouse.status[gf.controls.mouse.binds[e.type]] = true;

                //for each touch
                var cbs = gf.controls.mouse.callbacks[gf.controls.mouse.binds[e.type]];
                if(cbs) {
                    for(var t = 0, tl = gf.controls.mouse.touches.length; t < tl; ++t) {
                        //call each callback
                        for(var i = 0, il = cbs.length; i < il; ++i) {
                            if(cbs[i].code === e.type)
                                cbs[i].fn(gf.controls.mouse.binds[e.type], gf.controls.mouse.touches[t]);
                        }
                    }

                    return gf.controls.preventDefault(e);
                }

                return true;
            }
        },
        //helper to prevent default stuffs accross different browsers
        preventDefault: function(e) {
            if(e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;

            if(e.preventDefault) e.preventDefault();
            else e.returnValue = false;

            return false;
        },
        //check if an action is active accross any binds
        isActionActive: function(action) {
            return gf.controls.key.status[action] ||
                    gf.controls.mouse.status[action] ||
                    gf.controls.gpButton.status[action] ||
                    gf.controls.gpStick.status[action];
        },
        _doBind: function(type, code, action, fn) {
            gf.controls[type].binds[code] = action;
            gf.controls[type].status[action] = false;

            if(!gf.controls[type].bindCount[action])
                gf.controls[type].bindCount[action] = 1;
            else
                gf.controls[type].bindCount[action]++;

            if(fn) {
                if(gf.controls[type].callbacks[action]) gf.controls[type].callbacks[action].push({ code: code, fn: fn });
                else gf.controls[type].callbacks[action] = [{ code: code, fn: fn }];
            }

            return gf.controls;
        },
        _doUnbind: function(type, code, action) {
            //remove the bind (code -> action)
            delete gf.controls[type].binds[code];

            //reduce bind count
            gf.controls[type].bindCount[action]--;

            //if this action isn't bound anymore clean it up
            if(gf.controls[type].bindCount[action] <= 0) {
                gf.controls[type].bindCount[action] = 0;
                delete gf.controls[type].status[action];
                delete gf.controls[type].callbacks[action];
            }

            return gf.controls;
        }
    };
})();