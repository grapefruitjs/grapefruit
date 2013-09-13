module.exports = {
    version: '@@VERSION',
    cache: {},
    /**
     * Inherits the prototype of a parent object.
     *
     * @method inherits
     * @param child {Function} The Child to inherit the prototype
     * @param parent {Function} The Parent to inherit from
     * @param proto {Object} The prototype to apply to the child
     */
    inherits: function(child, parent, proto) {
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
    },

    //types
    FORMAT: {
        JSON: 0,
        XML: 1,
        CSV: 2
    },

    ATLAS_FORMAT: {
        JSON_ARRAY: 0,
        JSON_HASH: 1,
        STARLING_XML: 2
    }
}