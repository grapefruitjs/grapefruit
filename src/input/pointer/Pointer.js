var Input = require('../Input'),
    Vector = require('../../math/Vector'),
    Clock = require('../../utils/Clock'),
    inherit = require('../../utils/inherit');

/**
 * Represents a single pointer input method
 *
 * @class Pointer
 * @extends Input
 * @constructor
 * @param id {String|Number} The identifier for this pointer
 * @param manager {Pointers} The pointer manager for this pointer instance
 */
var Pointer = function(id, manager) {
    Input.call(this);

    /**
     * The id of this pointer
     *
     * @property id
     * @type String|Number
     * @readOnly
     */
    this.id = id;

    /**
     * The pointer's manager
     *
     * @property manager
     * @type Pointers
     * @readOnly
     */
    this.manager = manager;

    /**
     * The game instance of the pointer
     *
     * @property game
     * @type Game
     * @readOnly
     */
    this.game = manager.game;

    /**
     * Is this an active pointer (currently touching)?
     *
     * @property active
     * @type Boolean
     * @readOnly
     */
    this.active = false;

    /**
     * Is this the mouse pointer?
     *
     * @property mouse
     * @type Boolean
     * @readOnly
     */
    this.mouse = (id === 1);

    /**
     * The clock for timing stuffz
     *
     * @property clock
     * @type Clock
     * @readOnly
     * @private
     */
    this.clock = new Clock();

    /**
     * The button on the pointer being pressed
     *
     * @property button
     * @type Number
     * @readOnly
     */
    this.button = null;

    /**
     * The type of the pointer
     *
     * @property type
     * @type TYPE
     */
    this.type = null;

    /**
     * Have we emitted the hold event already?
     *
     * @property _holdSent
     * @type Boolean
     * @readOnly
     * @private
     */
    this._holdSent = false;

    this.position = new Vector();
    this.positionDown = new Vector();
};

inherit(Pointer, Input, {
    /**
     * Callback for when a pointerdown event occurs
     *
     * @method down
     * @param evt {DOMEvent} The original DOM Event
     */
    down: function(evt) {
        this.originalEvent = evt;

        //store down timing
        this.timeDown = this.clock.now();
        this.timeHold = 0;
        this._holdSent = false;

        //update x/y position
        this.move(evt);
        this.positionDown.copy(this.position);

        //copy some event vars
        this.button = evt.button;
        this.type = evt.pointerType;

        if(!this.active) {
            this.active = true;
            this.manager.activePointers++;
        }
    },
    /**
     * Callback for when a pointerup event occurs
     *
     * @method up
     * @param evt {DOMEvent} The original DOM Event
     */
    up: function(evt) {
        var emit;

        this.originalEvent = evt;

        this.timeUp = this.clock.now();
        this.timeHold = this.timeUp - this.timeDown;

        //consider this a click?
        if(this.timeHold >= 0 && this.timeHold <= this.manager.clickDelay) {
            //is this a double click?
            if((this.timeUp - this.previousClickTime) <= this.manager.doubleClickDelay) {
                emit = 'doubleclick';
            }
            //only a single click
            else {
                emit = 'click';
            }

            this.previousClickTime = this.timeUp;
        }

        //mouse is always active
        if(!this.mouse) {
            this.active = false;
            this.manager.activePointers--;
        }

        //emit click/doubleclick if needed
        if(emit) {
            this.manager.emit(emit, this);
        }
    },
    /**
     * Callback for when a pointermove event occurs
     *
     * @method move
     * @param evt {DOMEvent} The original DOM Event
     */
    move: function(evt) {
        this.originalEvent = evt;

        //copy some event vars
        this.button = evt.button;
        this.type = evt.pointerType;

        this.position.set(
            evt.pageX - this.game.offset.x,
            evt.pageY - this.game.offset.y
        );
    },
    /**
     * Callback for when a pointerleave event occurs
     *
     * @method leave
     * @param evt {DOMEvent} The original DOM Event
     */
    leave: function(evt) {
        this.move(evt);
    },
    /**
     * Called internally every frame. Updates the pointer
     *
     * @method update
     * @param dt {Number} The delta time (in seconds) since the last update
     * @private
     */
    update: function() {
        if(!this.active || this._holdSent)
            return;

        this.timeHold += this.clock.now() - this.timeDown;
        if(this.timeHold >= this.manager.holdDelay) {
            this._holdSent = true;
            this.manager.emit('hold', this);
        }
    },
    /**
     * Contains the X/Y position in the world of the pointer object
     *
     * @property positionWorld
     * @type Object
     */
    positionWorld: {}
});

Object.defineProperty(Pointer.prototype.positionWorld, 'x', {
    get: function() {
        return this.position.x - this.game.world.position.x;
    }
});

Object.defineProperty(Pointer.prototype.positionWorld, 'y', {
    get: function() {
        return this.position.y - this.game.world.position.y;
    }
});

/**
 * The type of a pointer
 *
 * @property TYPE
 * @type Object
 */
Pointer.TYPE = {
    TOUCH: 'touch',
    PEN: 'pen',
    MOUSE: 'mouse'
};

module.exports = Pointer;
