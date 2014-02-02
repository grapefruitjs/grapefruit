var inherit = require('./inherit');

var Queue = function() {
    this.data = [];
    this.index = 0;
};

inherit(Queue, Object, {
    enqueue: function(item) {
        this.data.push(item);
    },

    dequeue: function() {
        if(this.data.length === 0)
            return;

        var item = this.data[this.index];

        if(++this.index * 2 >= this.data.length) {
            this.data = this.data.slice(this.index);
            this.index = 0;
        }

        return item;
    },

    peek: function() {
        return (this.data.length > 0 ? this.data[this.index] : undefined);
    }
});

Object.defineProperty(Queue.prototype, 'length', {
    get: function() {
        return (this.data.length - this.index);
    }
});

Object.defineProperty(Queue.prototype, 'empty', {
    get: function() {
        return (this.data.length === 0);
    }
});

module.exports = Queue;
