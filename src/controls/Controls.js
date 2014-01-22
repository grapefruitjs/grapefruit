var inherit = require('../utils/inherit');

/**
 * @class Controls
 * @extends Object
 * @constructor
 * @param game {Game} The game instance this will operate within
 */
var Controls = function(game, actions) {
    this.game = game;
    this.actions = actions || [];
    this.sprites = [];
    this.actionmap = {};

    //create each action object
    for(var i = 0; actions && i < actions.length; ++i) {
        var act = actions[i],
            obj = this.actionmap[act] = {
                callbacks: {}
            };

        //add all the supported bind types (inputs)
        for(var type in Controls.BIND_TYPE) {
            obj[type] = []; //binds for an action on an input
            obj.callbacks[type] = null; //the callback for this action on this input
        }
    }
};

inherit(Controls, Object, {
    /**
     * Adds a sprite to this control
     *
     * @method control
     * @param spr {Sprite} The sprite to control
     * @return {Controls} Returns itself
     * @chainable
     */
    control: function(spr) {
        if(this.sprites.indexOf(spr) === -1) {
            this.sprites.add(spr);
        }

        return this;
    },
    /**
     * Removes a sprite from the controls
     *
     * @method release
     * @param spr {Sprite} The sprite to release
     * @return {Controls} Returns itself
     * @chainable
     */
    release: function(spr) {
        var i = this.sprites.indexOf(spr);
        if(i !== -1) {
            this.sprites.splice(i, 1);
        }

        return this;
    },
    setKeys: function(action, keys) {
        this._setBinds(this.game.input.keyboard, Controls.BIND_TYPE.KEYBOARD, action, keys);
    },
    setGpButtons: function(action, buttons) {
        this._setBinds(this.game.input.gamepad.buttons, Controls.BIND_TYPE.GPBUTTON, action, buttons);
    },
    setGpAxis: function(action, axis) {
        this._setBinds(this.game.input.gamepad.sticks, Controls.BIND_TYPE.GPAXIS, action, axis);
    },
    _setBinds: function(input, bindtype, action, keys) {
        var map = this.actionmap[action],
            binds = map[bindtype],
            fn = map.callbacks[bindtype],
            i = 0;

        //remove each bind
        for(i = 0; i < binds.length; ++i) {
            input.off(binds[i], fn);
        }

        //empty binds cache
        binds.length = 0;

        //set new binds
        for(i = 0; i < keys.length; ++i) {
            input.on(keys[i], fn);
            binds.push(keys[i]);
        }
    }
});

Controls.BIND_TYPE = {
    KEYBOARD: 'keyboard',
    GPBUTTON: 'gpbutton',
    GPAXIS: 'gpaxis'
};

module.exports = Controls;
