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

        for(var listener in listeners[type]) {
            listeners[event.type][listener].call(this, event);
        }

    };

    this.removeEventListener = this.off = function(type, listener) {
        var index = listeners[type].indexOf(listener);

        if(index !== -1) {
            listeners[type].splice(index, 1);
        }
    };
};