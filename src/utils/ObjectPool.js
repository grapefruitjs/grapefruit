gf.ObjectPool = function(type, parent) {
    this.type = type;
    this.pool = [];
    this.alloced = [];
    this.parent = parent;
};

gf.inherits(gf.ObjectPool, Object, {
    create: function() {
        var o = this.pool.pop();

        if(!o) {
            o = this._construct(this.type, arguments);
            if(this.parent)
                this.parent.addChild(o);
        }

        this.alloced.push(o);

        return o;
    },
    free: function(o) {
        this.pool.push(o);
    },
    freeAll: function() {
        for(var i = 0, il = this.alloced.length; i < il; ++i) {
            this.free(this.alloced[i]);
        }

        this.alloced.length = 0;
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