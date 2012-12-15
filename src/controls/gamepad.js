//Got some help from html5Rocks :)
//https://github.com/html5rocks/www.html5rocks.com/blob/master/content/tutorials/doodles/gamepad/static/gamepad-tester/gamepad.js

(function() {
    gf.gamepad = {
        // A number of typical buttons recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_BUTTON_COUNT: 16,

        // A number of typical axes recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_AXIS_COUNT: 4,

        // How “deep” does an analogue button need to be depressed to consider it
        // a button down.
        ANALOGUE_BUTTON_THRESHOLD: 0.4,

        AXIS_THRESHOLD: 0.5,

        //are we polling for status/connections?
        ticking: false,

        //the currently activated gamepads list
        pads: [],

        //timestamp tracking for state changes
        prevTimestamps: [],

        oldStates: [],

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.gamepad._initialized) return;

            //Firefox uses connect/disconnect events so listen to those
            window.addEventListener('MozGamepadConnected', gf.gamepad.onGamepadConnect, false);
            window.addEventListener('MozGamepadDisconnected', gf.gamepad.onGamepadDisconnect, false);

            //Since chrome only supports polling, we have to start looping immediately
            if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
                gf.gamepad.startPolling();
            }

            gf.gamepad._initialized = true;
        },
        //When a gamepad is connected (currently FF only)
        onGamepadConnect: function(event) {
            //add the gamepad to our list
            gf.gamepad.pads.push(event.gamepad);

            //start polling
            gf.gamepad.startPolling();
        },
        onGamepadDisconnect: function(event) {
            //remove the gamepad from our list
            for(var i = 0, il = pads.length; i < il; ++i) {
                if(gf.gamepad.pads[i].index == event.gamepad.index) {
                    gf.gamepad.pads.splice(i, 1);
                    break;
                }
            }

            //if no pads left connected, stop polling
            if(gf.gamepad.pads.length === 0)
                gf.gamepad.stopPolling();
        },
        startPolling: function() {
            if(gf.gamepad.ticking) return;

            gf.gamepad.ticking = true;
            gf.gamepad.update();
        },
        stopPolling: function() {
            gf.gamepad.ticking = false;
        },
        //called on Chrome, which doesn't do the connect/disconnect events
        pollGamepads: function() {
            //get a list of connected gamepads
            var rawPads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

            if(rawPads) {
                //reset the pads list
                gf.gamepad.pads = [];

                //don't use the raw array from the browser, since it can have "holes"
                //if you plug in 2, then remove the first the second one is still index 1 (not 0)
                for(var i = 0, il = rawPads.length; i < il; ++i) {
                    if(rawPads[i]) {
                        gf.gamepad.pads.push(rawPads[i]);
                    }
                }
            }
        },
        pollStatus: function() {
            for(var i = 0, il = gf.gamepad.pads.length; i < il; ++i) {
                var pad = gf.gamepad.pads[i];

                //don't do anything if the current timestamp is the same as the previous one
                //(meaning the state has not changed). This is a chrome-only feature right now,
                //so first we have to check if it is empty as well
                if(pad.timestamp && (pad.timestamp == gf.gamepad.prevTimestamps[i]))
                    continue;

                gf.gamepad.prevTimestamps[i] = pad.timestamp;

                //I would like to be able to emit events when something updates, but for now
                //just update the status of bound keys in controls; controls only has 1 "gamepad"
                //so this loop will blow away the changes each iteration (only the "last" gamepad is supported)
                //
                //As such callbacks don't work properly either (until I do the above)
                for(var b = 0, bl = pad.buttons.length; b < bl; ++b) {
                    if(!gf.controls.gpButton.binds[b]) continue;

                    gf.controls.gpButton.status[gf.controls.gpButton.binds[b]] = (pad.buttons[b] > gf.gamepad.ANALOGUE_BUTTON_THRESHOLD);
                }

                for(var a = 0, al = pad.axes.length; a < al; ++a) {
                    if(gf.controls.gpStick.binds[a + 'true']) { //negative direction
                        gf.controls.gpStick.status[gf.controls.gpStick.binds[a + 'true']] = (pad.axes[a] < -gf.gamepad.AXIS_THRESHOLD);
                    }

                    if(gf.controls.gpStick.binds[a + 'false']) { //positive direction

                        gf.controls.gpStick.status[gf.controls.gpStick.binds[a + 'false']] = (pad.axes[a] > gf.gamepad.AXIS_THRESHOLD);
                    }
                }
            }
        },
        update: function() {
            if(!gf.gamepad.ticking) return;

            //DAMN YOU CHROME!
            gf.gamepad.pollGamepads();

            //poll for the status of our gamepads
            gf.gamepad.pollStatus();
        }
    };
})();