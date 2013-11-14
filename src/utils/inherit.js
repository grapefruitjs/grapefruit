/**
 * Inherits the prototype of a parent object.
 *
 * @method inherit
 * @param child {Function} The Child to inherit the prototype
 * @param parent {Function} The Parent to inherit from
 * @param proto {Object} The prototype to apply to the child
 */
var inherit = function(child, parent, proto) {
    proto = proto || {};

    //get the property descriptors from the child proto and the passed proto
    var desc = {};
    [child.prototype, proto].forEach(function (s) {
        Object.getOwnPropertyNames(s).forEach(function (k) {
            desc[k] = Object.getOwnPropertyDescriptor(s, k);
        });
    });

    //set the constructor descriptor
    desc.constructor = {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
    };

    //create the prototype
    child.prototype = Object.create(parent.prototype, desc);
};

module.exports = inherit;