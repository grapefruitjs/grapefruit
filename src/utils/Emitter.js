gf.Emitter = function() {
    var listeners = {};

    this.addEventListener = this.on = function(type, listener) {
        if(listeners[type] === undefined) {
            listeners[type] = [];
        }

        if(listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    };

    this.dispatchEvent = this.emit = function(type, data) {
        if(typeof type === 'object') {
            data = type;
            type = data.type;
        }

        if(!listeners[type])
            return;

        for(var i = 0, il = listeners[type].length; i < il; ++i) {
            listeners[type][i].call(this, data);
        }
    };

    this.removeEventListener = this.off = function(type, listener) {
        var index = listeners[type].indexOf(listener);

        if(index !== -1) {
            listeners[type].splice(index, 1);
        }
    };
};