var inherit = require('../utils/inherit'),
    Input = require('./Input');

/**
 * Controls pointer input (mouse, touch, pen, etc)
 *
 * @class Pointer
 * @extends Input
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
var Pointer = module.exports = function(view) {
    Input.call(this, view);

    //bind events
    view.addEventListener('pointerdown', this.onPointerDown, false);
    view.addEventListener('pointerup', this.onPointerUp, false);
    view.addEventListener('pointermove', this.onPointerMove, false);
    view.addEventListener('pointerover', this.onPointerOver, false);
    view.addEventListener('pointerout', this.onPointerOut, false);
    view.addEventListener('pointercancel', this.onPointerCancel, false);
    view.addEventListener('pointerenter', this.onPointerEnter, false);
    view.addEventListener('pointerleave', this.onPointerLeave, false);
};

inherit(Pointer, Input, {
    onPointerDown: function(evt) {

    },
    onPointerUp: function(evt) {

    },
    onPointerMove: function(evt) {

    },
    onPointerOver: function(evt) {

    },
    onPointerOut: function(evt) {

    },
    onPointerCancel: function(evt) {

    },
    onPointerEnter: function(evt) {

    },
    onPointerLeave: function(evt) {

    }
});
