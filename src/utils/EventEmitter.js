/**
 * Event emitter mixin. This will add emitter properties to an object so that
 * it can emit events, and have others listen for them. Based on
 * [node.js event emitter](https://github.com/joyent/node/blob/master/lib/events.js)
 *
 * @class EventEmitter
 * @constructor
 */
var EventEmitter = function() {
    this._events = this._events || {};

    /**
     * Registers a listener function to be run on an event occurance
     *
     * @method on
     * @param type {String} The event name to listen for
     * @param listener {Function} The function to execute when the event happens
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.addEventListener = this.on = function(type, listener) {
        if(typeof listener !== 'function')
            throw new TypeError('listener must be a function');

        if(!this._events)
            this._events = {};

        // Optimize the case of one listener. Don't need the extra array object.
        if (!this._events[type])
            this._events[type] = listener;
        // If we've already got an array, just append.
        else if (typeof this._events[type] === 'object')
            this._events[type].push(listener);
        // Adding the second element, need to change to array.
        else
            this._events[type] = [this._events[type], listener];

        return this;
    };

    /**
     * Emits an event which will run all registered listeners for the event type
     *
     * @method emit
     * @param type {String} The event name to emit
     * @param data {mixed} Any data you want passed along with the event
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.dispatchEvent = this.emit = function(type) {
        if(!this._events)
            this._events = {};

        var handler = this._events[type],
            len = arguments.length,
            htype = typeof handler,
            args,
            i,
            listeners;

        if(htype === 'undefined')
            return false;

        if(htype === 'function') {
            switch(len) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                // slower
                default:
                    args = new Array(len - 1);
                    for(i = 1; i < len; ++i)
                        args[i - 1] = arguments[i];

                    handler.apply(this, args);
                    break;
            }
        } else if (htype === 'object') {
            args = new Array(len - 1);
            for(i = 1; i < len; ++i)
                args[i - 1] = arguments[i];

            /*listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);*/
            len = handler.length;
            listeners = handler.slice();
            for(i = 0; i < len; ++i)
                listeners[i].apply(this, args);
        }

        return this;
    };

    /**
     * Removes a listener function for an event type
     *
     * @method off
     * @param type {String} The event name to emit
     * @param listener {Function} The function to remove
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.removeEventListener = this.off = function(type, listener) {
        var list, position, length, i;

        if(typeof listener !== 'function')
            throw new TypeError('listener must be a function');

        if(!this._events[type])
            return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if(list === listener || (typeof list.listener === 'function' && list.listener === listener)) {
            delete this._events[type];
        } else if(typeof list === 'object') {
            for(i = length; i-- > 0;) {
                if(list[i] === listener || (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if(position < 0)
                return this;

            if(list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }
        }

        return this;
    };

    /**
     * Registers a one-time callback for an event
     *
     * @method once
     * @param type {String} The event name to listen for
     * @param listener {Function} the callback to call when the event occurs
     * @return {mixed} Returns itself.
     * @chainable
     */
    this.once = function(type, listener) {
        if(typeof listener !== 'function')
            throw new TypeError('listener must be a function');

        var fired = false;

        function g() {
            this.off(type, g);

            if(!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    };
};

module.exports = EventEmitter;
