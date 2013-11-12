var inherit = require('../utils/inherit'),
    Input = require('./Input'),
    GamepadButtons = require('./gamepad/GamepadButtons'),
    GamepadSticks = require('./gamepad/GamepadSticks');

/**
 * Controls input from gamepads
 *
 * @class Gamepad
 * @extends Input
 * @constructor
 */
var Gamepad = function() {
    Input.call(this);

    /**
     * Tracks if we are polling for status/connections
     *
     * @property ticking
     * @type Boolean
     * @readOnly
     */
    this.ticking = false;

    /**
     * The currently activated gamepads list
     *
     * @property pads
     * @type Array<Gamepad>
     * @readOnly
     */
    this.pads = [];

    /**
     * Timestamp tracking for state changes
     *
     * @property prevTimestamps
     * @type Array<Number>
     * @private
     */
    this.prevTimestamps = [];

    /**
     * Holds the button handler for gamepad button events
     *
     * @property buttons
     * @type GamepadButtons
     * @readOnly
     */
    this.buttons = new GamepadButtons();

    /**
     * Holds the stick handler for gamepad stick events
     *
     * @property sticks
     * @type GamepadSticks
     * @readOnly
     */
    this.sticks = new GamepadSticks();

    //Firefox uses connect/disconnect events so listen to those
    window.addEventListener('MozGamepadConnected', this.onGamepadConnect.bind(this), false);
    window.addEventListener('MozGamepadDisconnected', this.onGamepadDisconnect.bind(this), false);

    //Since chrome only supports polling, we have to start looping immediately
    if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
        this.startPolling();
    }
};

inherit(Gamepad, Input, {
    /**
     * Called when a gamepad connects (FF Only)
     *
     * @method onGamepadDisconnect
     * @param event {GamepadConnectEvent}
     * @private
     */
    onGamepadConnect: function(event) {
        //add the gamepad to our list
        this.pads.push(event.gamepad);

        //start polling
        this.startPolling();
    },
    /**
     * Called when a gamepad disconnects (FF Only)
     *
     * @method onGamepadDisconnect
     * @param event {GamepadDisconnectEvent}
     * @private
     */
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
    /**
     * Stats polling for new gamepads and status updates
     *
     * @method startPolling
     */
    startPolling: function() {
        if(this.ticking) return;

        this.ticking = true;
        this.update();
    },
    /**
     * Stops polling for new gamepads and status updates
     *
     * @method stopPolling
     */
    stopPolling: function() {
        this.ticking = false;
    },
    /**
     * Polls for newly connected gamepads (Chrome Only)
     *
     * @method pollGamepads
     */
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
    /**
     * Polls the gamepad object for status updates and emits events when they occur
     *
     * @method pollStatus
     */
    pollStatus: function() {
        for(var i = 0, il = this.pads.length; i < il; ++i) {
            var pad = this.pads[i];
            //don't do anything if the current timestamp is the same as the previous one
            //(meaning the state has not changed). This is a chrome-only feature right now,
            //so first we have to check if it is empty as well
            if(pad.timestamp && (pad.timestamp === this.prevTimestamps[i]))
                continue;

            this.prevTimestamps[i] = pad.timestamp;
            this.buttons.pollStatus(pad);
            this.sticks.pollStatus(pad);
        }
    },
    /**
     * Called each frame to update polling mechanisms
     *
     * @method update
     */
    update: function() {
        if(!this.ticking) return;

        //pollin' fo' pads
        this.pollGamepads();

        //poll for the status of our gamepads
        this.pollStatus();
    }
});

module.exports = Gamepad;
