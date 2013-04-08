//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
/**
 * Namespace for all plugins, it also provides methods for patching
 * core functions, and registering plugins.
 *
 * @module gf
 * @class plugin
 */
gf.plugin = {
    Base: function() {},
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

        if(typeof obj[name] === 'function' && typeof fn === 'function') {
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
        }
        else {
            throw (name + ' is not a function in the passed object.');
        }
    },
    /**
     * Registers a plugin into the gf.plugin namespace.
     *
     * @method register
     * @param plugin {Object} The object to place in the namespace
     * @param name {String} The name of the plugin to use as the key
     * @example
     *      //For example, to register a new plugin:
     *      gf.plugin.register(MyPluginObject, 'myPluginName');
     *      var plg = new gf.plugin.myPluginName();
     *      //OR
     *      gf.plugin.myPluginName.someFunction();
     */
    register: function(plugin, name) {
        //ensure we don't overrite a name
        if(gf.plugin[name]) {
            throw 'plugin ' + name + ' already registered!';
        }

        if(plugin.prototype.gfVersion === undefined) {
            throw 'GradeFruitJS: Plugin gfVersion not defined for ' + name;
        } else if(gf.checkVersion(plugin.prototype.gfVersion) > 0) {
            throw 'GradeFruitJS: Plugin gfVersion mismatch, expected: ' + plugin.prototype.gfVersion + ', got: ' + gf.version;
        }

        //store the plugin in the namespace
        gf.plugin[name] = plugin;
    }
};
