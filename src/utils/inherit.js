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

    //get the property descriptors from the child proto and copy to the passed in proto
    Object.getOwnPropertyNames(child.prototype).forEach(function (k) {
        proto[k] = Object.getOwnPropertyDescriptor(child.prototype, k);
    });

    //set the constructor descriptor
    proto.constructor = {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
    };

    //create the prototype
    child.prototype = Object.create(parent.prototype, proto);
};

module.exports = inherit;