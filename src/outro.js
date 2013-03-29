
    if (typeof exports === 'object') {
        // CommonJS
        exports.gf = gf;
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(gf);
    } else {
        // Browser globals
        window.gf = gf;
    }
})(window);