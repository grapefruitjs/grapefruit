var inherit = require('../utils/inherit'),
    Input = require('./Input'),
    Pointer = require('./pointer/Pointer');

/**
 * Controls pointer input (mouse, touch, pen, etc) or all pointers tracked by the game
 *
 * @class Pointers
 * @extends Input
 * @constructor
 * @param game {Game} The game instance this input belongs to
 */
//TODO: Sprite interactivity and Interaction History
var Pointers = function(game) {
    Input.call(this, game);

    /**
     * The pointer instances currently being used, keyed by an ID
     *
     * @property pointers
     * @type Object<Pointer>
     */
    this.pointers = {};

    /**
     * The max number of pointers to track
     *
     * @property maxPointers
     * @type Number
     * @default 10
     */
    this.maxPointers = 10;

    /**
     * The time that must pass between a down (touchstart/mousedown) and up (touchend/mouseup)
     * event for it to be considered a "click" event, in milliseconds
     *
     * @property clickDelay
     * @type Number
     * @default 200
     */
    this.clickDelay = 200;

    /**
     * The max time that can pass between two click events for it to be considered a
     * "doubleclick" event, in milliseconds
     *
     * @property doubleClickDelay
     * @type Number
     * @default 300
     */
    this.doubleClickDelay = 300;

    /**
     * The time that must pass after a down event for it to be considered a "hold" event, in milliseconds
     *
     * @property holdDelay
     * @type Number
     * @default 2000
     */
    this.holdDelay = 2000;

    //create the mouse pointer object
    this.mouse = this.pointers[1] = new Pointer(1, this);

    //number of pointers being tracked
    this.activePointers = 0;

    //bind events
    game.canvas.addEventListener('pointerdown',     this.onPointer.bind(this, 'down'),    false);
    game.canvas.addEventListener('pointerup',       this.onPointer.bind(this, 'up'),      false);
    game.canvas.addEventListener('pointermove',     this.onPointer.bind(this, 'move'),    false);
    game.canvas.addEventListener('pointerover',     this.onPointer.bind(this, 'over'),    false);
    game.canvas.addEventListener('pointerout',      this.onPointer.bind(this, 'out'),     false);
    game.canvas.addEventListener('pointercancel',   this.onPointer.bind(this, 'cancel'),  false);
    game.canvas.addEventListener('pointerenter',    this.onPointer.bind(this, 'enter'),   false);
    game.canvas.addEventListener('pointerleave',    this.onPointer.bind(this, 'leave'),   false);

    /**
     * Fired when a pointer is pressed on the canvas
     *
     * @event down
     * @param pointer {Pointer} The pointer instance that had a 'pointerdown' event
     */

    /**
     * Fired when a pointer is released off the canvas
     *
     * @event up
     * @param pointer {Pointer} The pointer instance that had a 'pointerup' event
     */

    /**
     * Fired when a pointer is moved while on the canvas
     *
     * @event move
     * @param pointer {Pointer} The pointer instance that had a 'pointermove' event
     */

    /**
     * Fired when a pointer moves over the canvas
     *
     * @event over
     * @param pointer {Pointer} The pointer instance that had a 'pointerover' event
     */

    /**
     * Fired when a pointer moves out of the canvas
     *
     * @event out
     * @param pointer {Pointer} The pointer instance that had a 'pointerout' event
     */

    /**
     * Fired when a pointer event is canceled
     *
     * @event cancel
     * @param pointer {Pointer} The pointer instance that had a 'pointercancel' event
     */

    /**
     * Fired when a pointer enters the canvas
     *
     * @event enter
     * @param pointer {Pointer} The pointer instance that had a 'pointerenter' event
     */

    /**
     * Fired when a pointer leaves the canvas
     *
     * @event leave
     * @param pointer {Pointer} The pointer instance that had a 'pointerleave' event
     */
};

inherit(Pointers, Input, {
    /**
     * Callback that is called when a pointer event occurs.
     *
     * @method onPointer
     * @param name {String} The name of the pointer event with out the 'pointer' prefix
     * @param evt {DOMEvent} The DOM Event
     * @private
     */
    onPointer: function(name, evt) {
        var id = evt.pointerId,
            pointer = this.pointers[id];

        //create a new pointer object if we need it, and if there is room
        //if there isn't room for a new pointer object then we just return
        //without echoing the event or anything.
        if(!pointer) {
            if(this._numPointers < this.maxPointers) {
                this.pointers[id] = new Pointer(id, this);
            } else {
                return;
            }
        }

        if(pointer[name])
            pointer[name](evt);

        this.emit(name, pointer);
    },
    /**
     * Called internally every frame. Updates all the pointers
     *
     * @method update
     * @param dt {Number} The delta time (in seconds) since the last update
     * @return {Pointers} Returns iteself for chainability
     * @private
     */
    update: function(dt) {
        var p = this.pointers;
        for(var i = 0; i < p.length; ++i) {
            if(p[i]) {
                p[i].update(dt);
            }
        }

        return this;
    }
});

module.exports = Pointers;
