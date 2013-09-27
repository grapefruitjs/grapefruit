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
 * @param id {mixed} The identifier for this pointer
 */
var Pointer = module.exports = function(id, manager) {
    Input.call(this);

    //the id of this pointer
    this.id = id;

    //the pointers manager
    this.manager = manager;

    //the game instance of the pointer
    this.game = manager.game;

    //is this an active pointer (currently touching)?
    this.active = false;

    //is this the mouse pointer?
    this.mouse = (id === 1);

    //the clock for timing stuffz
    this.clock = new Clock();

    //to copy some event stuff
    this.button = null;
    this.type = null; //Pointer.TYPE

    //have we emitted the hold event already?
    this._holdSent = false;

    this.position = new Vector();
    this.downAt = new Vector();
    this.worldAt = new Vector();
};

inherit(Pointer, Input, {
    down: function(evt) {
        this.originalEvent = evt;

        //store down timing
        this.timeDown = this.clock.now();
        this.timeHold = 0;
        this._holdSent = false;

        //update x/y position
        this.move(evt);
        this.downAt.copy(this.position);

        //copy some event vars
        this.button = evt.button;
        this.type = evt.pointerType;

        if(!this.active) {
            this.active = true;
            this.manager.activePointers++;
        }
    },
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
    move: function(evt) {
        this.originalEvent = evt;

        //copy some event vars
        this.button = evt.button;
        this.type = evt.pointerType;

        this.position.set(
            evt.pageX - this.game.offset.x,
            evt.pageY - this.game.offset.y
        );

        this.worldAt.set(
            this.position.x - this.game.world.position.x,
            this.position.y - this.game.world.position.y
        );
    },
    leave: function(evt) {
        this.move(evt);
    },
    update: function() {
        if(!this.active || this._holdSent)
            return;

        this.timeHold += this.clock.now() - this.timeDown;
        if(this.timeHold >= this.manager.holdDelay) {
            this._holdSent = true;
            this.manager.emit('hold', this);
        }
    }
});

Pointer.TYPE = {
    TOUCH: 'touch',
    PEN: 'pen',
    MOUSE: 'mouse'
};
