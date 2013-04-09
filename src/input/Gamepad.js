gf.input.Gamepad = function(man, game) {
    gf.input.Input.call(this, man, game);

    //are we polling for status/connections?
    this.ticking = false;

    //the currently activated gamepads list
    this.pads = [];

    //timestamp tracking for state changes
    this.prevTimestamps = [];

    this.buttons = new gf.input.GamepadButtons(man, game);
    this.sticks = new gf.input.GamepadSticks(man, game);

    //Firefox uses connect/disconnect events so listen to those
    window.addEventListener('MozGamepadConnected', this.onGamepadConnect.bind(this), false);
    window.addEventListener('MozGamepadDisconnected', this.onGamepadDisconnect.bind(this), false);

    //Since chrome only supports polling, we have to start looping immediately
    if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
        this.startPolling();
    }
};

gf.inherits(gf.input.Gamepad, gf.input.Input, {
    //When a gamepad is connected (currently FF only)
    onGamepadConnect: function(event) {
        //add the gamepad to our list
        this.pads.push(event.gamepad);

        //start polling
        this.startPolling();
    },
    onGamepadDisconnect: function(event) {
        //remove the gamepad from our list
        for(var i = 0, il = this.pads.length; i < il; ++i) {
            if(this.pads[i].index === event.gamepad.index) {
                this.pads.splice(i, 1);
                break;
            }
        }

        //if no pads left connected, stop polling
        if(this.pads.length === 0)
            this.stopPolling();
    },
    startPolling: function() {
        if(this.ticking) return;

        this.ticking = true;
        this.update();
    },
    stopPolling: function() {
        this.ticking = false;
    },
    //called on Chrome, which doesn't do the connect/disconnect events
    pollGamepads: function() {
        //get a list of connected gamepads
        var rawPads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

        if(rawPads) {
            //reset the pads list
            this.pads.length = 0;

            //don't use the raw array from the browser, since it can have "holes"
            //if you plug in 2, then remove the first the second one is still index 1 (not 0)
            for(var i = 0, il = rawPads.length; i < il; ++i) {
                if(rawPads[i]) {
                    this.pads.push(rawPads[i]);
                }
            }
        }
    },
    pollStatus: function() {
        for(var i = 0, il = this.pads.length; i < il; ++i) {
            var pad = this.pads[i];
            //don't do anything if the current timestamp is the same as the previous one
            //(meaning the state has not changed). This is a chrome-only feature right now,
            //so first we have to check if it is empty as well
            if(pad.timestamp && (pad.timestamp === gf.gamepad.prevTimestamps[i]))
                continue;

            this.prevTimestamps[i] = pad.timestamp;
            this.buttons.pollStatus(pad);
            this.sticks.pollStatus(pad);
        }
    },
    update: function() {
        if(!this.ticking) return;

        //DAMN YOU CHROME!
        this.pollGamepads();

        //poll for the status of our gamepads
        this.pollStatus();
    },
    bindButton: function(code, action, cb) {
        this.buttons.bind(code, action, cb);
        return this;
    },
    //bind an action to a stick movement
    bindStick: function(code, negative, action, cb) {
        this.sticks.bind(code, negative, action, cb);
        return this;
    },
    //unbind an action from a gamepad button
    unbindButton: function(code, action) {
        this.buttons.unbind(code, action);
        return this;
    },
    //bind an action to a stick movement
    unbindStick: function(code, negative, action) {
        this.sticks.unbind(code, negative, action);
        return this;
    }
});