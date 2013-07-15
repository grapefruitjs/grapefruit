/**
 * Holds a pool of different Objects to help reduce the number times
 * an object is created and destroyed.
 *
 * @class ObjectPool
 * @constructor
 * @param type {mixed} The object type that this pool will hold (like gf.Sprite, or gf.Tile)
 * @param parent {mixed} The parent that the objects will be added to. Passing this in will
 *      make the pool add any newly created objects as children to this object.
 */
gf.ObjectPool = function(type, parent) {
    this.type = type;
    this.pool = [];
    this.parent = parent;
};

gf.inherits(gf.ObjectPool, Object, {
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

        return o;
    },
    /**
     * Frees an object back into the pool to be recycled
     *
     * @method free
     */
    free: function(o) {
        this.pool.push(o);
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