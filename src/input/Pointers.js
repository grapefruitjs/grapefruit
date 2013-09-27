var inherit = require('../utils/inherit'),
    Input = require('./Input');

/**
 * Controls pointer input (mouse, touch, pen, etc) or all pointers tracked by the game
 *
 * @class Pointers
 * @extends Input
 * @constructor
 * @param game {Game} The game instance
 */
//TODO: Sprite interactivity and Interaction History
var Pointers = module.exports = function(game) {
    Input.call(this, game);

    /**
     * The pointer instances currently being used
     *
     * @property pointers
     * @type Array<Pointer>
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
    this.mouse = pointers[1] = new Pointer(1, this);

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
};

inherit(Pointers, Input, {
    onPointer: function(name, evt) {
        var id = evt.pointerId,
            pointer = pointers[id];

        //create a new pointer object if we need it, and if there is room
        //if there isn't room for a new pointer object then we just return
        //without echoing the event or anything.
        if(!pointer) {
            if(this._numPointers < this.maxPointers) {
                pointers[id] = new Pointer(id, this);
            } else {
                return;
            }
        }

        if(pointer[name])
            pointer[name](evt);

        this.emit(name, pointer);
    },
    update: function(dt) {
        var p = this.pointers;
        for(var i = 0; i < p.length; ++i) {
            if(p[i]) {
                p[i].update(dt);
            }
        }
    }
});
