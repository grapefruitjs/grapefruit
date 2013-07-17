/**
 * Event emitter mixin. This will add emitter properties to an object
 * so that it can emit events, and have others listen for them.
 *
 * @class EventEmitter
 * @namespace gf
 * @constructor
 * @example
 *      function MyObject(clr) {
 *          gf.EventEmitter.call(this); //adds properties
 *          this.color = clr;
 *      }
 *
 *      gf.inherits(MyObject, Object, {
 *          something: function(s) {
 *              this.emit('hey', { some: s });
 *          }
 *      });
 *
 *      //then later
 *      var o = new MyObject('red');
 *      o.on('hey', function(e) {
 *          console.log(this.color); //"this" refers to the instance, logs "red"
 *          console.log(e.some); //e is the data passed to emit, logs "hello"
 *      });
 *      o.something('hello');
 */
 gf.EventEmitter = function() {
    var listeners = {};

    /**
     * Registers a listener function to be run on an event occurance
     *
     * @method on
     * @param type {String} The event name to listen for
     * @param listener {Function} The function to execute when the event happens
     */
    this.addEventListener = this.on = function(type, listener) {
        if(listeners[type] === undefined) {
            listeners[type] = [];
        }

        if(listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    };

    /**
     * Emits an event which will run all registered listeners for the event type
     *
     * @method emit
     * @param type {String} The event name to emit
     * @param data {mixed} Any data you want passed along with the event
     */
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

    /**
     * Removes a listener function for an event type
     *
     * @method off
     * @param type {String} The event name to emit
     * @param listener {Function} The function to remove
     */
    this.removeEventListener = this.off = function(type, listener) {
        var index = listeners[type].indexOf(listener);

        if(index !== -1) {
            listeners[type].splice(index, 1);
        }
    };
};