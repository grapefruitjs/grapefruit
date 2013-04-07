gf.ObjectPool = function(type) {
    this.type = type;
    this.pool = [];
};

gf.inherits(gf.ObjectPool, Object, {
    create: function() {
        var o = this.pool.pop();

        return o || new this.type.call(o, arguments);
    },
    free: function(o) {
        this.pool.push(o);
    }
});