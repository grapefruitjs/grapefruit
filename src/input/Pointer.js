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
        window.console.log(evt);
    },
    onPointerUp: function(evt) {
        window.console.log(evt);
    },
    onPointerMove: function(evt) {
        window.console.log(evt);
    },
    onPointerOver: function(evt) {
        window.console.log(evt);
    },
    onPointerOut: function(evt) {
        window.console.log(evt);
    },
    onPointerCancel: function(evt) {
        window.console.log(evt);
    },
    onPointerEnter: function(evt) {
        window.console.log(evt);
    },
    onPointerLeave: function(evt) {
        window.console.log(evt);
    }
});
