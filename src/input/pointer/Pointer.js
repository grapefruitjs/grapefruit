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

    this.hitSprites = [];

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

        for (var i = 0; i < this.hitSprites.length; ++i) {
            var sprite = this.hitSprites[i];

            sprite.__isDown = true;
            sprite.emit('pointerdown', this);
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
                emit = 'pointerdoubleclick';
            }
            //only a single click
            else {
                emit = 'pointerclick';
            }

            this.previousClickTime = this.timeUp;
        }

        //mouse is always active
        if(!this.mouse) {
            this.active = false;
            this.manager.activePointers--;
        }

        for(var i = 0; i < this.hitSprites.length; ++i) {
            var sprite = this.hitSprites[i];

            if(sprite.__isDown) {
                sprite.emit('pointerup', this);
                sprite.emit(emit, this);
            }

            sprite.__isDown = false;
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

        var rect = this.manager.game.canvas.getBoundingClientRect(); //can we cache this? Maybe update on resize?

        this.position.set(
            (evt.clientX - rect.left) * (this.manager.game.width / rect.width),
            (evt.clientY - rect.top) * (this.manager.game.height / rect.height)
        );

        for(var i = 0; i < this.hitSprites.length; ++i) {
            this.hitSprites[i].emit('pointermove', this);
        }
    },
    /**
     * Callback for when a pointerleave event occurs
     *
     * @method leave
     * @param evt {DOMEvent} The original DOM Event
     */
    leave: function(evt) {
        this.move(evt);

        for(var i = 0; i < this.hitSprites.length; ++i) {
            var sprite = this.hitSprites[i];

            if(sprite.__isOver) {
                sprite.__isOver = false;
                sprite.emit('pointerout', this);
            }
        }
    },
    /**
     * Called internally every frame. Updates the pointer
     *
     * @method update
     * @param dt {Number} The delta time (in seconds) since the last update
     * @private
     */
    update: function() {
        if(!this.active)
            return;

        this.timeHold += this.clock.now() - this.timeDown;

        var holding = (this.timeHold >= this.manager.holdDelay),
            self = this;

        this.checkHits(function(sprite) {
            if(holding && sprite.__isDown) {
                sprite.emit('pointerhold', self);
            }
        });
    },
    hitTest: function(spr) {
        if(!spr.worldVisible)
            return false;

        var worldTransform = spr.worldTransform,
            a00 = worldTransform.a, a01 = worldTransform.b, a02 = worldTransform.tx,
            a10 = worldTransform.c, a11 = worldTransform.d, a12 = worldTransform.ty,
            id = 1 / (a00 * a11 + a01 * -a10),
            x = a11 * id * this.position.x + -a01 * id * this.position.y + (a12 * a01 - a02 * a11) * id,
            y = a00 * id * this.position.y + -a10 * id * this.position.x + (-a12 * a00 + a02 * a10) * id;

        if(spr.hitArea && spr.hitArea.contains) {
            return spr.hitArea.contains(x, y);
        } else {
            var width = spr.texture.frame.width,
                height = spr.texture.frame.height,
                x1 = -width * spr.anchor.x,
                y1;

            if(x > x1 && x < x1 + width) {
                y1 = -height * spr.anchor.y;

                return (y > y1 && y < y1 + height);
            }
        }

        return false;
    },
    checkHits: function(fn) {
        this.hitSprites.length = 0;

        var sprite;

        //hit-test each interactive sprite
        for(var i = 0; i < this.manager.interactiveSprites.length; ++i) {
            sprite = this.manager.interactiveSprites[i];

            if(this.hitTest(sprite)) {
                this.hitSprites.push(sprite);

                if(fn) fn(sprite);

                if(!sprite.__isOver) {
                    sprite.emit('pointerover', this);
                    sprite.__isOver = true;
                }
            } else if(sprite.__isOver) {
                sprite.emit('pointerout', this);
                sprite.__isOver = false;
            }
        }
    },
    getLocalPosition: function(spr) {
        var worldTransform = spr.worldTransform,
            a00 = worldTransform.a, a01 = worldTransform.b, a02 = worldTransform.tx,
            a10 = worldTransform.c, a11 = worldTransform.d, a12 = worldTransform.ty,
            id = 1 / (a00 * a11 + a01 * -a10);

        // set the mouse coords...
        return new Vector(
            a11 * id * this.position.x + -a01 * id * this.position.y + (a12 * a01 - a02 * a11) * id,
            a00 * id * this.position.y + -a10 * id * this.position.x + (-a12 * a00 + a02 * a10) * id
        );
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
