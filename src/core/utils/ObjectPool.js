var globals = require('../globals');

/**
 * Holds a pool of different Objects to help reduce the number times
 * an object is created and destroyed.
 *
 * @class ObjectPool
 * @extends Object
 * @namespace gf
 * @constructor
 * @param type {mixed} The object type that this pool will hold (like gf.Sprite, or gf.Tile)
 * @param parent {mixed} The parent that the objects will be added to. Passing this in will
 *      make the pool add any newly created objects as children to this object.
 */
var ObjectPool = function(type, parent) {
    this.type = type;
    this.pool = [];
    this.parent = parent;
};

globals.inherits(ObjectPool, Object, {
    /**
     * Creates a new instance of the pool's object type, or if available
     * pulls one that is already created out of the pool
     *
     * @method create
     */
    create: function() {
        var o = this.pool.pop();

        if(!o) {
            o = this._construct(this.type, arguments);
            if(this.parent)
                this.parent.addChild(o);
        }

        o.__allocated = true;

        return o;
    },
    /**
     * Frees an object back into the pool to be recycled
     *
     * @method free
     */
    free: function(o) {
        //don't free something twice
        if(o.__allocated) {
            o.__allocated = false;
            this.pool.push(o);
        }
    },
    //have to do this hack around to be able to use
    //apply and new together
    _construct: function(ctor, args) {
        function F() {
            return ctor.apply(this, args);
        }
        F.prototype = ctor.prototype;
        return new F();
    }
});
