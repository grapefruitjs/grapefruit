(function(Z) {
    //small hack to be able to use EventEmitter2 in the class hierarchy
    EventEmitter2.extend = Class.extend;
    EventEmitter2.prototype.init = EventEmitter2;

    Z.Emitter = EventEmitter2;
})(window.ZJS);