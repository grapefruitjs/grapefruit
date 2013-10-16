//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
/**
 * Provides methods for patching core functions, and registering plugins.
 *
 * @class plugin
 * @extends Object
 */
var plugin = {
    /**
     * Patches a core function with a new one. The function you override with has a special property
     * called `this._super` which is a reference to the function you are overriding.
     *
     * @method patch
     * @param obj {Object} The object with the method to override
     * @param name {String} The name of the method to override
     * @param fn {Function} The function to override with
     * @example
     *      //For example, to patch the gf.Sprite.prototype.isActiveAnimation function:
     *
     *      gf.plugin.patch(gf.Sprite, 'isActiveAnimation', function() {
     *          //display a console message
     *          console.log('checking animation!');
     *          //call the original function
     *          this._super();
     *      });
     */
    patch: function(obj, name, fn) {
        if(obj.prototype !== undefined) {
            obj = obj.prototype;
        }

        if(typeof obj[name] !== 'function') {
            throw new TypeError(name + ' is not a function in the passed object.');
        }

        if(typeof fn !== 'function') {
            throw new TypeError('The passed patch function is not a function.');
        }

        var _super = obj[name];

        obj[name] = (function(name, fn) {
            return function() {
                var tmp = this._super;

                this._super = _super;

                var ret = fn.apply(this, arguments);
                this._super = tmp;

                return ret;
            };
        })(name, fn);
    },
    /**
     * Registers a plugin into the gf namespace.
     *
     * @method register
     * @param plugin {Object} The object to place in the namespace
     * @param name {String} The name of the plugin to use as the key
     * @example
     *      //For example, to register a new plugin:
     *      gf.plugin.register(MyPluginObject, 'MyPluginName');
     *      var plg = new gf.MyPluginName();
     */
    register: function(obj, name) {
        //ensure we don't overrite a name
        if(window.gf[name]) {
            throw new RangeError('Unable to register plugin: "' + name + '" already exists in the gf namespace, please choose something else!');
        }

        //store the plugin in the namespace
        window.gf[name] = obj;
    }
};

module.exports = plugin;
