/**
 * input submodule
 *
 * @module gf
 * @submodule input
 */
gf.input = {
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
     * @property GP_BUTTON
     * @type Object
     */
    GP_BUTTON: {
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
        for(var k in gf.input.GP_BUTTON) {
            if(gf.input.GP_BUTTON[k] === i) {
                return k;
            }
        }

        return '';
    },
    /**
     * Bindable Gamepad Axes
     *
     * @property GP_AXIS
     * @type Object
     */
    GP_AXIS: {
        LEFT_ANALOGUE_HOR: 0,
        LEFT_ANALOGUE_VERT: 1,
        RIGHT_ANALOGUE_HOR: 2,
        RIGHT_ANALOGUE_VERT: 3
    },
    getGpAxisName: function(i) {
        for(var k in gf.input.GP_AXIS) {
            if(gf.input.GP_AXIS[k] === i) {
                return k;
            }
        }

        return '';
    }
};

/**
 * The base Input object, holds common functions and properties between input types
 *
 * @module gf
 * @submodule input
 * @class Input
 * @constructor
 * @param manager {InputManager} The InputManager instance that this Input object is managed by
 * @param game {Game} The game this camera belongs to
 */
gf.input.Input = function(man, game) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The input manager this belongs to
     *
     * @property manager
     * @type InputManager
     */
    this.manager = man;

    /**
     * The binds that map an action to an input value
     *
     * @property binds
     * @type Object
     * @readOnly
     */
    this.binds = {};

    /**
     * The callbacks that map from an action
     *
     * @property callbacks
     * @type Object
     * @readOnly
     */
    this.callbacks = {};

    /**
     * The count of how many actions an input value is bound to
     *
     * @property callbacks
     * @type Object
     * @readOnly
     */
    this.bindCount = {};

    /**
     * Tracks the status of each action
     *
     * @property status
     * @type Object
     * @readOnly
     */
    this.status = {};
};

gf.inherits(gf.input.Input, Object, {
    _doBind: function(code, action, cb) {
        this.binds[code] = action;
        this.status[action] = false;

        if(!this.bindCount[action])
            this.bindCount[action] = 1;
        else
            this.bindCount[action]++;

        if(cb) {
            if(this.callbacks[action])
                this.callbacks[action].push({ code: code, cb: cb });
            else
                this.callbacks[action] = [{ code: code, cb: cb }];
        }

        return this;
    },
    _doUnbind: function(code, action) {
        //remove the bind (code -> action)
        delete this.binds[code];

        //reduce bind count
        this.bindCount[action]--;

        //if this action isn't bound anymore clean it up
        if(this.bindCount[action] <= 0) {
            this.bindCount[action] = 0;
            delete this.status[action];
            delete this.callbacks[action];
        }

        return gf.controls;
    },
    //helper to prevent default stuffs accross different browsers
    preventDefault: function(e) {
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;

        if(e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        return false;
    },
    bind: function(code, action, cb) {
        return this._doBind(code, action, cb);
    },
    unbind: function(code, action) {
        return this._doUnbind(code, action);
    },
    runCallbacks: function(code, args) {
        args = args || [];
        args.unshift(this.binds[code]);

        var cbs = this.callbacks[this.binds[code]];

        if(cbs)
            for(var i = 0, il = cbs.length; i < il; ++i)
                if(cbs[i].code === code)
                    cbs[i].cb.apply(this, args);
    },
    isActionActive: function(action) {
        return this.status[action];
    }
});