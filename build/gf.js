/**
 * @license
 * GrapeFruit Game Engine - v0.1.1
 * Copyright © 2012-2014, Chad Engler
 * https://github.com/grapefruitjs/grapefruit
 *
 * Compiled: 2013-12-15
 *
 * GrapeFruit Game Engine is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
/** Combined template optimized with RequireJS/r.js v2.1.9 & almond. */
(function (global, window){
  
var __isAMD = !!(typeof define === 'function' && define.amd),
    __isNode = (typeof exports === 'object'),
    __isWeb = !__isNode;

  var __nodeRequire = (__isNode ? require :
      function(dep){
        throw new Error("uRequire detected missing dependency: '" + dep + "' - in a non-nodejs runtime. All it's binding variables were 'undefined'.")
      });
var bundleFactory = function() {
/**
 * almond 0.2.7 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        if (config.deps) {
            req(config.deps, config.callback);
        }
        return req;
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

define('constants',['require','exports','module'],function (require, exports, module) {
  

var constants = {
    RENDERER: {
      AUTO: "auto",
      CANVAS: "canvas",
      WEBGL: "webgl"
    },
    FILE_FORMAT: {
      JSON: "json",
      XML: "xml",
      CSV: "csv"
    },
    ATLAS_FORMAT: {
      JSON_ARRAY: "json_array",
      JSON_HASH: "json_hash",
      XML_STARLING: "xml_starling"
    },
    CAMERA_FOLLOW: {
      PLATFORMER: 0,
      TOPDOWN: 1,
      TOPDOWN_TIGHT: 2,
      LOCKON: 3
    },
    AXIS: {
      NONE: 0,
      HORIZONTAL: 1,
      VERTICAL: 2,
      BOTH: 3
    },
    DIRECTION: {
      NONE: 0,
      LEFT: 1,
      RIGHT: 2,
      TOP: 4,
      BOTTOM: 8,
      ALL: 15
    },
    SHAPE: {
      CIRCLE: 1,
      POLYGON: 2,
      RECTANGLE: 3
    }
  };
module.exports = constants;

constants.pkg = {
    "name": "gf",
    "version": "0.1.1",
    "longName": "GrapeFruit Game Engine",
    "description": "A fun and easy WebGL-enabled JavaScript Game Engine",

    "author": "Chad Engler <chad@pantherdev.com>",
    "contributors": [],

    "homepage": "https://github.com/grapefruitjs/grapefruit",
    "bugs": "https://github.com/grapefruitjs/grapefruit/issues",
    "license": "MIT",
    "licenseUrl": "http://www.opensource.org/licenses/mit-license.php",

    "repository": {
        "type": "git",
        "url": "https://github.com/grapefruitjs/grapefruit.git"
    },

    "main": "build/gf.js",

    "dependencies": {},
    "devDependencies": {
        "grunt": "~0.4.1",
        "grunt-contrib-jshint": "git+https://github.com/englercj/grunt-contrib-jshint.git",
        "grunt-contrib-connect": "~0.5",
        "grunt-contrib-yuidoc": "~0.5",
        "grunt-contrib-watch": "~0.5",
        "grunt-contrib-concat": "~0.3",
        "grunt-mocha": "git+https://github.com/englercj/grunt-mocha.git",
        "grunt-urequire": "~0.6",
        "glob": "~3.2",
        "should": "~2.1"
    },

    "scripts": {
        "build": "grunt build",
        "test": "grunt test"
    },

    "private": true
}
;

return module.exports;

});
define('utils/EventEmitter',['require','exports','module'],function (require, exports, module) {
  

var EventEmitter = function () {
  this._events = this._events || {};
  this.addEventListener = this.on = function (type, listener) {
    if (typeof listener !== "function")
      throw new TypeError("listener must be a function");
    if (!this._events)
      this._events = {};
    if (!this._events[type])
      this._events[type] = listener;
    else if (typeof this._events[type] === "object")
      this._events[type].push(listener);
    else
      this._events[type] = [
        this._events[type],
        listener
      ];
    return this;
  };
  this.dispatchEvent = this.emit = function (type) {
    var handler, len, args, i, listeners;
    if (!this._events)
      this._events = {};
    handler = this._events[type];
    if (typeof handler === "undefined")
      return false;
    if (typeof handler === "function") {
      switch (arguments.length) {
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
        break;
      }
    } else if (typeof handler === "object") {
      len = arguments.length;
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }
    return this;
  };
  this.removeEventListener = this.off = function (type, listener) {
    var list, position, length, i;
    if (typeof listener !== "function")
      throw new TypeError("listener must be a function");
    if (!this._events[type])
      return this;
    list = this._events[type];
    length = list.length;
    position = -1;
    if (list === listener || typeof list.listener === "function" && list.listener === listener) {
      this._events[type] = undefined;
    } else if (typeof list === "object") {
      for (i = length; i-- > 0;) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (list.length === 1) {
        list.length = 0;
        this._events[type] = undefined;
      } else {
        list.splice(position, 1);
      }
    }
    return this;
  };
  this.once = function (type, listener) {
    if (typeof listener !== "function")
      throw new TypeError("listener must be a function");
    function g() {
      this.off(type, g);
      listener.apply(this, arguments);
    }
    g.listener = listener;
    this.on(type, g);
    return this;
  };
};
module.exports = EventEmitter;

return module.exports;

});
define('utils/inherit',['require','exports','module'],function (require, exports, module) {
  

var inherit = function (child, parent, proto) {
  proto = proto || {};
  var desc = {};
  [
    child.prototype,
    proto
  ].forEach(function (s) {
    Object.getOwnPropertyNames(s).forEach(function (k) {
      desc[k] = Object.getOwnPropertyDescriptor(s, k);
    });
  });
  desc.constructor = {
    value: child,
    enumerable: false,
    writable: true,
    configurable: true
  };
  child.prototype = Object.create(parent.prototype, desc);
};
module.exports = inherit;

return module.exports;

});
define('math/Vector',['require','exports','module','../utils/inherit'],function (require, exports, module) {
  

var inherit = require("../utils/inherit");
var Vector = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;
};
inherit(Vector, Object, {
  set: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
  setX: function (x) {
    this.x = x;
    return this;
  },
  setY: function (y) {
    this.y = y;
    return this;
  },
  setComponent: function (index, value) {
    switch (index) {
    case 0:
      this.x = value;
      break;
    case 1:
      this.y = value;
      break;
    default:
      throw new RangeError("index is out of range: " + index);
    }
    return this;
  },
  getComponent: function (index) {
    switch (index) {
    case 0:
      return this.x;
    case 1:
      return this.y;
    default:
      throw new RangeError("index is out of range: " + index);
    }
  },
  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  },
  floor: function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  },
  ceil: function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  },
  add: function (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  },
  addScalar: function (s) {
    this.x += s;
    this.y += s;
    return this;
  },
  sub: function (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },
  multiplyScalar: function (s) {
    this.x *= s;
    this.y *= s;
    return this;
  },
  divideScalar: function (s) {
    if (s !== 0) {
      this.x /= s;
      this.y /= s;
    } else {
      this.set(0, 0);
    }
    return this;
  },
  min: function (v) {
    if (this.x > v.x) {
      this.x = v.x;
    }
    if (this.y > v.y) {
      this.y = v.y;
    }
    return this;
  },
  max: function (v) {
    if (this.x < v.x) {
      this.x = v.x;
    }
    if (this.y < v.y) {
      this.y = v.y;
    }
    return this;
  },
  clamp: function (min, max) {
    if (this.x < min.x) {
      this.x = min.x;
    } else if (this.x > max.x) {
      this.x = max.x;
    }
    if (this.y < min.y) {
      this.y = min.y;
    } else if (this.y > max.y) {
      this.y = max.y;
    }
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  project: function (v) {
    var amt = this.dot(v) / v.lengthSq();
    this.x = amt * v.x;
    this.y = amt * v.y;
    return this;
  },
  projectN: function (v) {
    var amt = this.dot(v);
    this.x = amt * v.x;
    this.y = amt * v.y;
    return this;
  },
  reflect: function (axis) {
    var x = this.x;
    var y = this.y;
    this.project(axis).multiplyScalar(2);
    this.x -= x;
    this.y -= y;
    return this;
  },
  reflectN: function (axis) {
    var x = this.x;
    var y = this.y;
    this.projectN(axis).multiplyScalar(2);
    this.x -= x;
    this.y -= y;
    return this;
  },
  dot: function (v) {
    return this.x * v.x + this.y * v.y;
  },
  lengthSq: function () {
    return this.dot(this);
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  distanceTo: function (v) {
    return Math.sqrt(this.distanceToSquared(v));
  },
  distanceToSquared: function (v) {
    var dx = this.x - v.x, dy = this.y - v.y;
    return dx * dx + dy * dy;
  },
  setLength: function (l) {
    var oldLength = this.length();
    if (oldLength !== 0 && l !== oldLength) {
      this.multiplyScalar(l / oldLength);
    }
    return this;
  },
  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  },
  perp: function () {
    var x = this.x;
    this.x = this.y;
    this.y = -x;
    return this;
  },
  rotate: function (angle, anchor) {
    var dist = anchor.distanceTo(this);
    return this.set(anchor.x + dist * Math.cos(angle), anchor.y + dist * Math.sin(angle));
  },
  equals: function (v) {
    return v.x === this.x && v.y === this.y;
  },
  toArray: function () {
    return [
      this.x,
      this.y
    ];
  },
  clone: function () {
    return new Vector(this.x, this.y);
  }
});
Vector.ZERO = new Vector();
module.exports = Vector;

return module.exports;

});
define('geom/Circle',['require','exports','module','../utils/inherit','../math/Vector','../constants'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Vector = require("../math/Vector"), C = require("../constants");
var Circle = function (x, y, radius, scale) {
  this.position = new Vector();
  this._radius = radius || 0;
  this.radius = radius || 0;
  this.scale = scale || new Vector(1, 1);
  this.x = x || 0;
  this.y = y || 0;
  this._shapetype = C.SHAPE.CIRCLE;
  this.recalc();
};
inherit(Circle, Object, {
  clone: function () {
    return new Circle(this.x, this.y, this.radius);
  },
  copy: function (circle) {
    this.x = circle.x;
    this.y = circle.y;
    this.radius = circle.radius;
    return this;
  },
  contains: function (x, y) {
    if (this.radius <= 0)
      return false;
    var dx = x - this.x, dy = y - this.y, r2 = this.radius * this.radius;
    dx *= dx;
    dy *= dy;
    return dx + dy <= r2;
  },
  overlaps: function (circle) {
    var differenceV = this.position.clone().sub(circle.position), totalRadius = this.radius + circle.radius, totalRadiusSq = totalRadius * totalRadius, distanceSq = differenceV.lengthSq();
    return !(distanceSq > totalRadiusSq);
  },
  equals: function (circle) {
    return this.position.equals(circle.position) && this.radius === circle.radius;
  },
  recalc: function () {
    this.radius = this._radius * this.scale.x;
    return this;
  }
});
Object.defineProperty(Circle.prototype, "x", {
  get: function () {
    return this.position.x;
  },
  set: function (v) {
    this.position.x = v;
  }
});
Object.defineProperty(Circle.prototype, "y", {
  get: function () {
    return this.position.y;
  },
  set: function (v) {
    this.position.y = v;
  }
});
Object.defineProperty(Circle.prototype, "radius", {
  get: function () {
    return this._radius * this.scale.x;
  },
  set: function (v) {
    this._radius = v;
  }
});
Object.defineProperty(Circle.prototype, "circumference", {
  get: function () {
    return 2 * (Math.PI * this.radius);
  }
});
Object.defineProperty(Circle.prototype, "area", {
  get: function () {
    return Math.PI * this.radius * this.radius;
  }
});
module.exports = Circle;

return module.exports;

});
define('geom/Polygon',['require','exports','module','../utils/inherit','../math/Vector','../constants'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Vector = require("../math/Vector"), C = require("../constants");
var Polygon = function (x, y, points, scale) {
  this.position = new Vector();
  this._points = null;
  this.scale = scale || new Vector(1, 1);
  this.points = [];
  this.edges = [];
  this.normals = [];
  if (typeof points[0] === "number") {
    var p = [];
    for (var i = 0, il = points.length; i < il; i += 2) {
      p.push(new Vector(points[i], points[i + 1]));
    }
    points = p;
  }
  this._points = points;
  this.x = x || 0;
  this.y = y || 0;
  this.recalc();
  this._shapetype = C.SHAPE.POLYGON;
};
inherit(Polygon, Object, {
  clone: function () {
    var points = [];
    for (var i = 0; i < this._points.length; i++) {
      points.push(this._points[i].clone());
    }
    return new Polygon(points, this.scale);
  },
  copy: function (poly) {
    this.position.copy(poly.position);
    this._points.length = this.points.length = 0;
    for (var i = 0; i < poly._points.length; ++i) {
      this._points.push(poly._points[i].clone());
    }
    this.scale.copy(poly.scale);
    this.recalc();
    return this;
  },
  contains: function (x, y) {
    var inside = false;
    for (var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
      var xi = this.points[i].x, yi = this.points[i].y, xj = this.points[j].x, yj = this.points[j].y, intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect)
        inside = !inside;
    }
    return inside;
  },
  equals: function (poly) {
    if (!this.position.equals(poly.position) || this.points.length !== poly.points.length) {
      return false;
    }
    for (var i = 0; i < poly.points.length; ++i) {
      if (!this.points[i].equals(poly.points[i])) {
        return false;
      }
    }
    return true;
  },
  recalc: function () {
    var points = this._points, len = points.length, p1, p2, e, n, i = 0;
    for (i = 0; i < len; i++) {
      if (!this.points[i])
        this.points[i] = new Vector();
      this.points[i].set(this._points[i].x * this.scale.x, this._points[i].y * this.scale.y);
    }
    this.edges.length = this.normals.length = 0;
    for (i = 0; i < len; ++i) {
      p1 = points[i];
      p2 = i < len - 1 ? points[i + 1] : points[0];
      e = p2.clone().sub(p1);
      n = e.clone().perp().normalize();
      this.edges.push(e);
      this.normals.push(n);
    }
    return this;
  }
});
Object.defineProperty(Polygon.prototype, "x", {
  get: function () {
    return this.position.x;
  },
  set: function (v) {
    this.position.x = v;
  }
});
Object.defineProperty(Polygon.prototype, "y", {
  get: function () {
    return this.position.y;
  },
  set: function (v) {
    this.position.y = v;
  }
});
module.exports = Polygon;

return module.exports;

});
define('utils/support',['require','exports','module'],function (require, exports, module) {
  

var support = {
    ua: window.navigator ? window.navigator.userAgent.toLowerCase() : "nodejs",
    canvas: function () {
      try {
        return !!window.CanvasRenderingContext2D && !!document.createElement("canvas").getContext("2d");
      } catch (e) {
        return false;
      }
    }(),
    webgl: function () {
      try {
        var c = document.createElement("canvas");
        return !!window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"));
      } catch (e) {
        return false;
      }
    }(),
    crypto: !!window.crypto && !!window.crypto.getRandomValues,
    workers: !!window.Worker,
    blobUrls: !!window.Blob && !!window.URL && !!window.URL.createObjectURL,
    typedArrays: !!window.ArrayBuffer,
    fileapi: !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob,
    webAudio: !!window.AudioContext || !!window.webkitAudioContext || !!window.mozAudioContext,
    htmlAudio: !!document.createElement("audio").canPlayType && !!window.Audio,
    localStorage: !!window.localStorage,
    touch: "createTouch" in document || "ontouchstart" in window || navigator.isCocoonJS,
    gamepad: !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || navigator.userAgent.indexOf("Firefox/") !== -1
  };
if (support.htmlAudio) {
  var audioTest = new Audio();
  support.codec = {
    mp3: !!audioTest.canPlayType("audio/mpeg;").replace(/^no$/, ""),
    opus: !!audioTest.canPlayType("audio/ogg; codecs=\"opus\"").replace(/^no$/, ""),
    ogg: !!audioTest.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
    wav: !!audioTest.canPlayType("audio/wav; codecs=\"1\"").replace(/^no$/, ""),
    m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
    webm: !!audioTest.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, "")
  };
}
module.exports = support;

return module.exports;

});
define('vendor/pixi',['require','exports','module'],function (require, exports, module) {
  

var root = this;
var PIXI = PIXI || {};
PIXI.Point = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;
};
PIXI.Point.prototype.clone = function () {
  return new PIXI.Point(this.x, this.y);
};
PIXI.Point.prototype.constructor = PIXI.Point;
PIXI.Rectangle = function (x, y, width, height) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 0;
  this.height = height || 0;
};
PIXI.Rectangle.prototype.clone = function () {
  return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
};
PIXI.Rectangle.prototype.contains = function (x, y) {
  if (this.width <= 0 || this.height <= 0)
    return false;
  var x1 = this.x;
  if (x >= x1 && x <= x1 + this.width) {
    var y1 = this.y;
    if (y >= y1 && y <= y1 + this.height) {
      return true;
    }
  }
  return false;
};
PIXI.Rectangle.prototype.constructor = PIXI.Rectangle;
PIXI.Polygon = function (points) {
  if (!(points instanceof Array))
    points = Array.prototype.slice.call(arguments);
  if (typeof points[0] === "number") {
    var p = [];
    for (var i = 0, il = points.length; i < il; i += 2) {
      p.push(new PIXI.Point(points[i], points[i + 1]));
    }
    points = p;
  }
  this.points = points;
};
PIXI.Polygon.prototype.clone = function () {
  var points = [];
  for (var i = 0; i < this.points.length; i++) {
    points.push(this.points[i].clone());
  }
  return new PIXI.Polygon(points);
};
PIXI.Polygon.prototype.contains = function (x, y) {
  var inside = false;
  for (var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
    var xi = this.points[i].x, yi = this.points[i].y, xj = this.points[j].x, yj = this.points[j].y, intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
};
PIXI.Polygon.prototype.constructor = PIXI.Polygon;
PIXI.Circle = function (x, y, radius) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 0;
};
PIXI.Circle.prototype.clone = function () {
  return new PIXI.Circle(this.x, this.y, this.radius);
};
PIXI.Circle.prototype.contains = function (x, y) {
  if (this.radius <= 0)
    return false;
  var dx = this.x - x, dy = this.y - y, r2 = this.radius * this.radius;
  dx *= dx;
  dy *= dy;
  return dx + dy <= r2;
};
PIXI.Circle.prototype.constructor = PIXI.Circle;
PIXI.Ellipse = function (x, y, width, height) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 0;
  this.height = height || 0;
};
PIXI.Ellipse.prototype.clone = function () {
  return new PIXI.Ellipse(this.x, this.y, this.width, this.height);
};
PIXI.Ellipse.prototype.contains = function (x, y) {
  if (this.width <= 0 || this.height <= 0)
    return false;
  var normx = (x - this.x) / this.width - 0.5, normy = (y - this.y) / this.height - 0.5;
  normx *= normx;
  normy *= normy;
  return normx + normy < 0.25;
};
PIXI.Ellipse.getBounds = function () {
  return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
};
PIXI.Ellipse.prototype.constructor = PIXI.Ellipse;
function determineMatrixArrayType() {
  PIXI.Matrix = typeof Float32Array !== "undefined" ? Float32Array : Array;
  return PIXI.Matrix;
}
determineMatrixArrayType();
PIXI.mat3 = {};
PIXI.mat3.create = function () {
  var matrix = new PIXI.Matrix(9);
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 1;
  matrix[5] = 0;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 1;
  return matrix;
};
PIXI.mat3.identity = function (matrix) {
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 1;
  matrix[5] = 0;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 1;
  return matrix;
};
PIXI.mat4 = {};
PIXI.mat4.create = function () {
  var matrix = new PIXI.Matrix(16);
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
  return matrix;
};
PIXI.mat3.multiply = function (mat, mat2, dest) {
  if (!dest) {
    dest = mat;
  }
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a10 = mat[3], a11 = mat[4], a12 = mat[5], a20 = mat[6], a21 = mat[7], a22 = mat[8], b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b10 = mat2[3], b11 = mat2[4], b12 = mat2[5], b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];
  dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
  dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
  dest[2] = b00 * a02 + b01 * a12 + b02 * a22;
  dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
  dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
  dest[5] = b10 * a02 + b11 * a12 + b12 * a22;
  dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
  dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
  dest[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return dest;
};
PIXI.mat3.clone = function (mat) {
  var matrix = new PIXI.Matrix(9);
  matrix[0] = mat[0];
  matrix[1] = mat[1];
  matrix[2] = mat[2];
  matrix[3] = mat[3];
  matrix[4] = mat[4];
  matrix[5] = mat[5];
  matrix[6] = mat[6];
  matrix[7] = mat[7];
  matrix[8] = mat[8];
  return matrix;
};
PIXI.mat3.transpose = function (mat, dest) {
  if (!dest || mat === dest) {
    var a01 = mat[1], a02 = mat[2], a12 = mat[5];
    mat[1] = mat[3];
    mat[2] = mat[6];
    mat[3] = a01;
    mat[5] = mat[7];
    mat[6] = a02;
    mat[7] = a12;
    return mat;
  }
  dest[0] = mat[0];
  dest[1] = mat[3];
  dest[2] = mat[6];
  dest[3] = mat[1];
  dest[4] = mat[4];
  dest[5] = mat[7];
  dest[6] = mat[2];
  dest[7] = mat[5];
  dest[8] = mat[8];
  return dest;
};
PIXI.mat3.toMat4 = function (mat, dest) {
  if (!dest) {
    dest = PIXI.mat4.create();
  }
  dest[15] = 1;
  dest[14] = 0;
  dest[13] = 0;
  dest[12] = 0;
  dest[11] = 0;
  dest[10] = mat[8];
  dest[9] = mat[7];
  dest[8] = mat[6];
  dest[7] = 0;
  dest[6] = mat[5];
  dest[5] = mat[4];
  dest[4] = mat[3];
  dest[3] = 0;
  dest[2] = mat[2];
  dest[1] = mat[1];
  dest[0] = mat[0];
  return dest;
};
PIXI.mat4.create = function () {
  var matrix = new PIXI.Matrix(16);
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
  return matrix;
};
PIXI.mat4.transpose = function (mat, dest) {
  if (!dest || mat === dest) {
    var a01 = mat[1], a02 = mat[2], a03 = mat[3], a12 = mat[6], a13 = mat[7], a23 = mat[11];
    mat[1] = mat[4];
    mat[2] = mat[8];
    mat[3] = mat[12];
    mat[4] = a01;
    mat[6] = mat[9];
    mat[7] = mat[13];
    mat[8] = a02;
    mat[9] = a12;
    mat[11] = mat[14];
    mat[12] = a03;
    mat[13] = a13;
    mat[14] = a23;
    return mat;
  }
  dest[0] = mat[0];
  dest[1] = mat[4];
  dest[2] = mat[8];
  dest[3] = mat[12];
  dest[4] = mat[1];
  dest[5] = mat[5];
  dest[6] = mat[9];
  dest[7] = mat[13];
  dest[8] = mat[2];
  dest[9] = mat[6];
  dest[10] = mat[10];
  dest[11] = mat[14];
  dest[12] = mat[3];
  dest[13] = mat[7];
  dest[14] = mat[11];
  dest[15] = mat[15];
  return dest;
};
PIXI.mat4.multiply = function (mat, mat2, dest) {
  if (!dest) {
    dest = mat;
  }
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
  var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
  var b0 = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];
  dest[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  dest[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  dest[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  dest[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = mat2[4];
  b1 = mat2[5];
  b2 = mat2[6];
  b3 = mat2[7];
  dest[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  dest[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  dest[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  dest[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = mat2[8];
  b1 = mat2[9];
  b2 = mat2[10];
  b3 = mat2[11];
  dest[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  dest[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  dest[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  dest[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = mat2[12];
  b1 = mat2[13];
  b2 = mat2[14];
  b3 = mat2[15];
  dest[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  dest[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  dest[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  dest[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return dest;
};
PIXI.DisplayObject = function () {
  this.last = this;
  this.first = this;
  this.position = new PIXI.Point();
  this.scale = new PIXI.Point(1, 1);
  this.pivot = new PIXI.Point(0, 0);
  this.rotation = 0;
  this.alpha = 1;
  this.visible = true;
  this.hitArea = null;
  this.buttonMode = false;
  this.renderable = false;
  this.parent = null;
  this.stage = null;
  this.worldAlpha = 1;
  this._interactive = false;
  this.worldTransform = PIXI.mat3.create();
  this.localTransform = PIXI.mat3.create();
  this.color = [];
  this.dynamic = true;
  this._sr = 0;
  this._cr = 1;
};
PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;
PIXI.DisplayObject.prototype.setInteractive = function (interactive) {
  this.interactive = interactive;
};
Object.defineProperty(PIXI.DisplayObject.prototype, "interactive", {
  get: function () {
    return this._interactive;
  },
  set: function (value) {
    this._interactive = value;
    if (this.stage)
      this.stage.dirty = true;
  }
});
Object.defineProperty(PIXI.DisplayObject.prototype, "mask", {
  get: function () {
    return this._mask;
  },
  set: function (value) {
    if (value) {
      if (this._mask) {
        value.start = this._mask.start;
        value.end = this._mask.end;
      } else {
        this.addFilter(value);
        value.renderable = false;
      }
    } else {
      this.removeFilter(this._mask);
      this._mask.renderable = true;
    }
    this._mask = value;
  }
});
Object.defineProperty(PIXI.DisplayObject.prototype, "filters", {
  get: function () {
    return this._filters;
  },
  set: function (value) {
    if (value) {
      if (this._filters)
        this.removeFilter(this._filters);
      this.addFilter(value);
    } else {
      if (this._filters)
        this.removeFilter(this._filters);
    }
    this._filters = value;
  }
});
PIXI.DisplayObject.prototype.addFilter = function (data) {
  var start = new PIXI.FilterBlock();
  var end = new PIXI.FilterBlock();
  data.start = start;
  data.end = end;
  start.data = data;
  end.data = data;
  start.first = start.last = this;
  end.first = end.last = this;
  start.open = true;
  var childFirst = start;
  var childLast = start;
  var nextObject;
  var previousObject;
  previousObject = this.first._iPrev;
  if (previousObject) {
    nextObject = previousObject._iNext;
    childFirst._iPrev = previousObject;
    previousObject._iNext = childFirst;
  } else {
    nextObject = this;
  }
  if (nextObject) {
    nextObject._iPrev = childLast;
    childLast._iNext = nextObject;
  }
  var childFirst = end;
  var childLast = end;
  var nextObject = null;
  var previousObject = null;
  previousObject = this.last;
  nextObject = previousObject._iNext;
  if (nextObject) {
    nextObject._iPrev = childLast;
    childLast._iNext = nextObject;
  }
  childFirst._iPrev = previousObject;
  previousObject._iNext = childFirst;
  var updateLast = this;
  var prevLast = this.last;
  while (updateLast) {
    if (updateLast.last == prevLast) {
      updateLast.last = end;
    }
    updateLast = updateLast.parent;
  }
  this.first = start;
  if (this.__renderGroup) {
    this.__renderGroup.addFilterBlocks(start, end);
  }
};
PIXI.DisplayObject.prototype.removeFilter = function (data) {
  console.log("YUOIO");
  var startBlock = data.start;
  var nextObject = startBlock._iNext;
  var previousObject = startBlock._iPrev;
  if (nextObject)
    nextObject._iPrev = previousObject;
  if (previousObject)
    previousObject._iNext = nextObject;
  this.first = startBlock._iNext;
  var lastBlock = data.end;
  var nextObject = lastBlock._iNext;
  var previousObject = lastBlock._iPrev;
  if (nextObject)
    nextObject._iPrev = previousObject;
  previousObject._iNext = nextObject;
  var tempLast = lastBlock._iPrev;
  var updateLast = this;
  while (updateLast.last == lastBlock) {
    updateLast.last = tempLast;
    updateLast = updateLast.parent;
    if (!updateLast)
      break;
  }
  if (this.__renderGroup) {
    this.__renderGroup.removeFilterBlocks(startBlock, lastBlock);
  }
};
PIXI.DisplayObject.prototype.updateTransform = function () {
  if (this.rotation !== this.rotationCache) {
    this.rotationCache = this.rotation;
    this._sr = Math.sin(this.rotation);
    this._cr = Math.cos(this.rotation);
  }
  var localTransform = this.localTransform;
  var parentTransform = this.parent.worldTransform;
  var worldTransform = this.worldTransform;
  localTransform[0] = this._cr * this.scale.x;
  localTransform[1] = -this._sr * this.scale.y;
  localTransform[3] = this._sr * this.scale.x;
  localTransform[4] = this._cr * this.scale.y;
  var px = this.pivot.x;
  var py = this.pivot.y;
  var a00 = localTransform[0], a01 = localTransform[1], a02 = this.position.x - localTransform[0] * px - py * localTransform[1], a10 = localTransform[3], a11 = localTransform[4], a12 = this.position.y - localTransform[4] * py - px * localTransform[3], b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2], b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];
  localTransform[2] = a02;
  localTransform[5] = a12;
  worldTransform[0] = b00 * a00 + b01 * a10;
  worldTransform[1] = b00 * a01 + b01 * a11;
  worldTransform[2] = b00 * a02 + b01 * a12 + b02;
  worldTransform[3] = b10 * a00 + b11 * a10;
  worldTransform[4] = b10 * a01 + b11 * a11;
  worldTransform[5] = b10 * a02 + b11 * a12 + b12;
  this.worldAlpha = this.alpha * this.parent.worldAlpha;
  this.vcount = PIXI.visibleCount;
};
PIXI.visibleCount = 0;
PIXI.DisplayObjectContainer = function () {
  PIXI.DisplayObject.call(this);
  this.children = [];
};
PIXI.DisplayObjectContainer.prototype = Object.create(PIXI.DisplayObject.prototype);
PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;
PIXI.DisplayObjectContainer.prototype.addChild = function (child) {
  if (child.parent != undefined) {
    child.parent.removeChild(child);
  }
  child.parent = this;
  this.children.push(child);
  if (this.stage) {
    var tmpChild = child;
    do {
      if (tmpChild.interactive)
        this.stage.dirty = true;
      tmpChild.stage = this.stage;
      tmpChild = tmpChild._iNext;
    } while (tmpChild);
  }
  var childFirst = child.first;
  var childLast = child.last;
  var nextObject;
  var previousObject;
  if (this._filters || this._mask) {
    previousObject = this.last._iPrev;
  } else {
    previousObject = this.last;
  }
  nextObject = previousObject._iNext;
  var updateLast = this;
  var prevLast = previousObject;
  while (updateLast) {
    if (updateLast.last == prevLast) {
      updateLast.last = child.last;
    }
    updateLast = updateLast.parent;
  }
  if (nextObject) {
    nextObject._iPrev = childLast;
    childLast._iNext = nextObject;
  }
  childFirst._iPrev = previousObject;
  previousObject._iNext = childFirst;
  if (this.__renderGroup) {
    if (child.__renderGroup)
      child.__renderGroup.removeDisplayObjectAndChildren(child);
    this.__renderGroup.addDisplayObjectAndChildren(child);
  }
};
PIXI.DisplayObjectContainer.prototype.addChildAt = function (child, index) {
  if (index >= 0 && index <= this.children.length) {
    if (child.parent != undefined) {
      child.parent.removeChild(child);
    }
    child.parent = this;
    if (this.stage) {
      var tmpChild = child;
      do {
        if (tmpChild.interactive)
          this.stage.dirty = true;
        tmpChild.stage = this.stage;
        tmpChild = tmpChild._iNext;
      } while (tmpChild);
    }
    var childFirst = child.first;
    var childLast = child.last;
    var nextObject;
    var previousObject;
    if (index == this.children.length) {
      previousObject = this.last;
      var updateLast = this;
      var prevLast = this.last;
      while (updateLast) {
        if (updateLast.last == prevLast) {
          updateLast.last = child.last;
        }
        updateLast = updateLast.parent;
      }
    } else if (index == 0) {
      previousObject = this;
    } else {
      previousObject = this.children[index - 1].last;
    }
    nextObject = previousObject._iNext;
    if (nextObject) {
      nextObject._iPrev = childLast;
      childLast._iNext = nextObject;
    }
    childFirst._iPrev = previousObject;
    previousObject._iNext = childFirst;
    this.children.splice(index, 0, child);
    if (this.__renderGroup) {
      if (child.__renderGroup)
        child.__renderGroup.removeDisplayObjectAndChildren(child);
      this.__renderGroup.addDisplayObjectAndChildren(child);
    }
  } else {
    throw new Error(child + " The index " + index + " supplied is out of bounds " + this.children.length);
  }
};
PIXI.DisplayObjectContainer.prototype.swapChildren = function (child, child2) {
  return;
};
PIXI.DisplayObjectContainer.prototype.getChildAt = function (index) {
  if (index >= 0 && index < this.children.length) {
    return this.children[index];
  } else {
    throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
  }
};
PIXI.DisplayObjectContainer.prototype.removeChild = function (child) {
  var index = this.children.indexOf(child);
  if (index !== -1) {
    var childFirst = child.first;
    var childLast = child.last;
    var nextObject = childLast._iNext;
    var previousObject = childFirst._iPrev;
    if (nextObject)
      nextObject._iPrev = previousObject;
    previousObject._iNext = nextObject;
    if (this.last == childLast) {
      var tempLast = childFirst._iPrev;
      var updateLast = this;
      while (updateLast.last == childLast.last) {
        updateLast.last = tempLast;
        updateLast = updateLast.parent;
        if (!updateLast)
          break;
      }
    }
    childLast._iNext = null;
    childFirst._iPrev = null;
    if (this.stage) {
      var tmpChild = child;
      do {
        if (tmpChild.interactive)
          this.stage.dirty = true;
        tmpChild.stage = null;
        tmpChild = tmpChild._iNext;
      } while (tmpChild);
    }
    if (child.__renderGroup) {
      child.__renderGroup.removeDisplayObjectAndChildren(child);
    }
    child.parent = undefined;
    this.children.splice(index, 1);
  } else {
    throw new Error(child + " The supplied DisplayObject must be a child of the caller " + this);
  }
};
PIXI.DisplayObjectContainer.prototype.updateTransform = function () {
  if (!this.visible)
    return;
  PIXI.DisplayObject.prototype.updateTransform.call(this);
  for (var i = 0, j = this.children.length; i < j; i++) {
    this.children[i].updateTransform();
  }
};
PIXI.blendModes = {};
PIXI.blendModes.NORMAL = 0;
PIXI.blendModes.SCREEN = 1;
PIXI.Sprite = function (texture) {
  PIXI.DisplayObjectContainer.call(this);
  this.anchor = new PIXI.Point();
  this.texture = texture;
  this.blendMode = PIXI.blendModes.NORMAL;
  this._width = 0;
  this._height = 0;
  if (texture.baseTexture.hasLoaded) {
    this.updateFrame = true;
  } else {
    this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
    this.texture.addEventListener("update", this.onTextureUpdateBind);
  }
  this.renderable = true;
};
PIXI.Sprite.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.Sprite.prototype.constructor = PIXI.Sprite;
Object.defineProperty(PIXI.Sprite.prototype, "width", {
  get: function () {
    return this.scale.x * this.texture.frame.width;
  },
  set: function (value) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }
});
Object.defineProperty(PIXI.Sprite.prototype, "height", {
  get: function () {
    return this.scale.y * this.texture.frame.height;
  },
  set: function (value) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }
});
PIXI.Sprite.prototype.setTexture = function (texture) {
  if (this.texture.baseTexture != texture.baseTexture) {
    this.textureChange = true;
    this.texture = texture;
    if (this.__renderGroup) {
      this.__renderGroup.updateTexture(this);
    }
  } else {
    this.texture = texture;
  }
  this.updateFrame = true;
};
PIXI.Sprite.prototype.onTextureUpdate = function (event) {
  if (this._width)
    this.scale.x = this._width / this.texture.frame.width;
  if (this._height)
    this.scale.y = this._height / this.texture.frame.height;
  this.updateFrame = true;
};
PIXI.Sprite.fromFrame = function (frameId) {
  var texture = PIXI.TextureCache[frameId];
  if (!texture)
    throw new Error("The frameId '" + frameId + "' does not exist in the texture cache" + this);
  return new PIXI.Sprite(texture);
};
PIXI.Sprite.fromImage = function (imageId) {
  var texture = PIXI.Texture.fromImage(imageId);
  return new PIXI.Sprite(texture);
};
PIXI.MovieClip = function (textures) {
  PIXI.Sprite.call(this, textures[0]);
  this.textures = textures;
  this.animationSpeed = 1;
  this.loop = true;
  this.onComplete = null;
  this.currentFrame = 0;
  this.playing = false;
};
PIXI.MovieClip.prototype = Object.create(PIXI.Sprite.prototype);
PIXI.MovieClip.prototype.constructor = PIXI.MovieClip;
Object.defineProperty(PIXI.MovieClip.prototype, "totalFrames", {
  get: function () {
    return this.textures.length;
  }
});
PIXI.MovieClip.prototype.stop = function () {
  this.playing = false;
};
PIXI.MovieClip.prototype.play = function () {
  this.playing = true;
};
PIXI.MovieClip.prototype.gotoAndStop = function (frameNumber) {
  this.playing = false;
  this.currentFrame = frameNumber;
  var round = this.currentFrame + 0.5 | 0;
  this.setTexture(this.textures[round % this.textures.length]);
};
PIXI.MovieClip.prototype.gotoAndPlay = function (frameNumber) {
  this.currentFrame = frameNumber;
  this.playing = true;
};
PIXI.MovieClip.prototype.updateTransform = function () {
  PIXI.Sprite.prototype.updateTransform.call(this);
  if (!this.playing)
    return;
  this.currentFrame += this.animationSpeed;
  var round = this.currentFrame + 0.5 | 0;
  if (this.loop || round < this.textures.length) {
    this.setTexture(this.textures[round % this.textures.length]);
  } else if (round >= this.textures.length) {
    this.gotoAndStop(this.textures.length - 1);
    if (this.onComplete) {
      this.onComplete();
    }
  }
};
PIXI.FilterBlock = function () {
  this.visible = true;
  this.renderable = true;
};
PIXI.ColorMatrixFilter = function () {
  this.uniforms = {
    matrix: {
      type: "mat4",
      value: [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]
    }
  };
  this.fragmentSrc = [
    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "varying float vColor;",
    "uniform float invert;",
    "uniform mat4 matrix;",
    "uniform sampler2D uSampler;",
    "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;",
    "gl_FragColor = gl_FragColor * vColor;",
    "}"
  ];
};
Object.defineProperty(PIXI.ColorMatrixFilter.prototype, "matrix", {
  get: function () {
    return this.uniforms.matrix.value;
  },
  set: function (value) {
    this.uniforms.matrix.value = value;
  }
});
PIXI.GreyFilter = function () {
  this.uniforms = {
    grey: {
      type: "f",
      value: 1
    }
  };
  this.fragmentSrc = [
    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "varying float vColor;",
    "uniform sampler2D uSampler;",
    "uniform float grey;",
    "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vTextureCoord);",
    "gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), grey);",
    "gl_FragColor = gl_FragColor * vColor;",
    "}"
  ];
  this.primitiveFragmentSrc = [
    "precision mediump float;",
    "varying vec4 vColor;",
    "uniform float grey;",
    "void main(void) {",
    "gl_FragColor = vColor;",
    "gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), grey);",
    "gl_FragColor = gl_FragColor * vColor;",
    "}"
  ];
};
Object.defineProperty(PIXI.GreyFilter.prototype, "grey", {
  get: function () {
    return this.uniforms.grey.value;
  },
  set: function (value) {
    this.uniforms.grey.value = value;
  }
});
PIXI.DisplacementFilter = function (texture) {
  this.uniforms = {
    displacementMap: {
      type: "sampler2D",
      value: texture
    },
    scale: {
      type: "f2",
      value: {
        x: 30,
        y: 30
      }
    },
    mapDimensions: {
      type: "f2",
      value: {
        x: texture.width,
        y: texture.height
      }
    }
  };
  this.fragmentSrc = [
    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "varying float vColor;",
    "uniform sampler2D displacementMap;",
    "uniform sampler2D uSampler;",
    "uniform vec2 scale;",
    "uniform vec2 mapDimensions;",
    "const vec2 textureDimensions = vec2(245.0, 263.0);",
    "void main(void) {",
    "vec2 matSample = texture2D(displacementMap, vTextureCoord * (textureDimensions/mapDimensions)).xy;",
    "matSample -= 0.5;",
    "matSample *= scale;",
    "matSample /= textureDimensions;",
    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));",
    "gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);",
    "gl_FragColor = gl_FragColor * vColor;",
    "}"
  ];
};
Object.defineProperty(PIXI.DisplacementFilter.prototype, "map", {
  get: function () {
    return this.uniforms.displacementMap.value;
  },
  set: function (value) {
    this.uniforms.displacementMap.value = value;
  }
});
Object.defineProperty(PIXI.DisplacementFilter.prototype, "scale", {
  get: function () {
    return this.uniforms.scale.value;
  },
  set: function (value) {
    this.uniforms.scale.value = value;
  }
});
PIXI.Text = function (text, style) {
  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");
  PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas));
  this.setText(text);
  this.setStyle(style);
  this.updateText();
  this.dirty = false;
};
PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype);
PIXI.Text.prototype.constructor = PIXI.Text;
PIXI.Text.prototype.setStyle = function (style) {
  style = style || {};
  style.font = style.font || "bold 20pt Arial";
  style.fill = style.fill || "black";
  style.align = style.align || "left";
  style.stroke = style.stroke || "black";
  style.strokeThickness = style.strokeThickness || 0;
  style.wordWrap = style.wordWrap || false;
  style.wordWrapWidth = style.wordWrapWidth || 100;
  this.style = style;
  this.dirty = true;
};
PIXI.Text.prototype.setText = function (text) {
  this.text = text.toString() || " ";
  this.dirty = true;
};
PIXI.Text.prototype.updateText = function () {
  this.context.font = this.style.font;
  var outputText = this.text;
  if (this.style.wordWrap)
    outputText = this.wordWrap(this.text);
  var lines = outputText.split(/(?:\r\n|\r|\n)/);
  var lineWidths = [];
  var maxLineWidth = 0;
  for (var i = 0; i < lines.length; i++) {
    var lineWidth = this.context.measureText(lines[i]).width;
    lineWidths[i] = lineWidth;
    maxLineWidth = Math.max(maxLineWidth, lineWidth);
  }
  this.canvas.width = maxLineWidth + this.style.strokeThickness;
  var lineHeight = this.determineFontHeight("font: " + this.style.font + ";") + this.style.strokeThickness;
  this.canvas.height = lineHeight * lines.length;
  this.context.fillStyle = this.style.fill;
  this.context.font = this.style.font;
  this.context.strokeStyle = this.style.stroke;
  this.context.lineWidth = this.style.strokeThickness;
  this.context.textBaseline = "top";
  for (i = 0; i < lines.length; i++) {
    var linePosition = new PIXI.Point(this.style.strokeThickness / 2, this.style.strokeThickness / 2 + i * lineHeight);
    if (this.style.align == "right") {
      linePosition.x += maxLineWidth - lineWidths[i];
    } else if (this.style.align == "center") {
      linePosition.x += (maxLineWidth - lineWidths[i]) / 2;
    }
    if (this.style.stroke && this.style.strokeThickness) {
      this.context.strokeText(lines[i], linePosition.x, linePosition.y);
    }
    if (this.style.fill) {
      this.context.fillText(lines[i], linePosition.x, linePosition.y);
    }
  }
  this.updateTexture();
};
PIXI.Text.prototype.updateTexture = function () {
  this.texture.baseTexture.width = this.canvas.width;
  this.texture.baseTexture.height = this.canvas.height;
  this.texture.frame.width = this.canvas.width;
  this.texture.frame.height = this.canvas.height;
  this._width = this.canvas.width;
  this._height = this.canvas.height;
  PIXI.texturesToUpdate.push(this.texture.baseTexture);
};
PIXI.Text.prototype.updateTransform = function () {
  if (this.dirty) {
    this.updateText();
    this.dirty = false;
  }
  PIXI.Sprite.prototype.updateTransform.call(this);
};
PIXI.Text.prototype.determineFontHeight = function (fontStyle) {
  var result = PIXI.Text.heightCache[fontStyle];
  if (!result) {
    var body = document.getElementsByTagName("body")[0];
    var dummy = document.createElement("div");
    var dummyText = document.createTextNode("M");
    dummy.appendChild(dummyText);
    dummy.setAttribute("style", fontStyle + ";position:absolute;top:0;left:0");
    body.appendChild(dummy);
    result = dummy.offsetHeight;
    PIXI.Text.heightCache[fontStyle] = result;
    body.removeChild(dummy);
  }
  return result;
};
PIXI.Text.prototype.wordWrap = function (text) {
  var searchWrapPos = function (ctx, text, start, end, wrapWidth) {
    var p = Math.floor((end - start) / 2) + start;
    if (p == start) {
      return 1;
    }
    if (ctx.measureText(text.substring(0, p)).width <= wrapWidth) {
      if (ctx.measureText(text.substring(0, p + 1)).width > wrapWidth) {
        return p;
      } else {
        return arguments.callee(ctx, text, p, end, wrapWidth);
      }
    } else {
      return arguments.callee(ctx, text, start, p, wrapWidth);
    }
  };
  var lineWrap = function (ctx, text, wrapWidth) {
    if (ctx.measureText(text).width <= wrapWidth || text.length < 1) {
      return text;
    }
    var pos = searchWrapPos(ctx, text, 0, text.length, wrapWidth);
    return text.substring(0, pos) + "\n" + arguments.callee(ctx, text.substring(pos), wrapWidth);
  };
  var result = "";
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; i++) {
    result += lineWrap(this.context, lines[i], this.style.wordWrapWidth) + "\n";
  }
  return result;
};
PIXI.Text.prototype.destroy = function (destroyTexture) {
  if (destroyTexture) {
    this.texture.destroy();
  }
};
PIXI.Text.heightCache = {};
PIXI.BitmapText = function (text, style) {
  PIXI.DisplayObjectContainer.call(this);
  this.setText(text);
  this.setStyle(style);
  this.updateText();
  this.dirty = false;
};
PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.BitmapText.prototype.constructor = PIXI.BitmapText;
PIXI.BitmapText.prototype.setText = function (text) {
  this.text = text || " ";
  this.dirty = true;
};
PIXI.BitmapText.prototype.setStyle = function (style) {
  style = style || {};
  style.align = style.align || "left";
  this.style = style;
  var font = style.font.split(" ");
  this.fontName = font[font.length - 1];
  this.fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : PIXI.BitmapText.fonts[this.fontName].size;
  this.dirty = true;
};
PIXI.BitmapText.prototype.updateText = function () {
  var data = PIXI.BitmapText.fonts[this.fontName];
  var pos = new PIXI.Point();
  var prevCharCode = null;
  var chars = [];
  var maxLineWidth = 0;
  var lineWidths = [];
  var line = 0;
  var scale = this.fontSize / data.size;
  for (var i = 0; i < this.text.length; i++) {
    var charCode = this.text.charCodeAt(i);
    if (/(?:\r\n|\r|\n)/.test(this.text.charAt(i))) {
      lineWidths.push(pos.x);
      maxLineWidth = Math.max(maxLineWidth, pos.x);
      line++;
      pos.x = 0;
      pos.y += data.lineHeight;
      prevCharCode = null;
      continue;
    }
    var charData = data.chars[charCode];
    if (!charData)
      continue;
    if (prevCharCode && charData[prevCharCode]) {
      pos.x += charData.kerning[prevCharCode];
    }
    chars.push({
      texture: charData.texture,
      line: line,
      charCode: charCode,
      position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)
    });
    pos.x += charData.xAdvance;
    prevCharCode = charCode;
  }
  lineWidths.push(pos.x);
  maxLineWidth = Math.max(maxLineWidth, pos.x);
  var lineAlignOffsets = [];
  for (i = 0; i <= line; i++) {
    var alignOffset = 0;
    if (this.style.align == "right") {
      alignOffset = maxLineWidth - lineWidths[i];
    } else if (this.style.align == "center") {
      alignOffset = (maxLineWidth - lineWidths[i]) / 2;
    }
    lineAlignOffsets.push(alignOffset);
  }
  for (i = 0; i < chars.length; i++) {
    var c = new PIXI.Sprite(chars[i].texture);
    c.position.x = (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale;
    c.position.y = chars[i].position.y * scale;
    c.scale.x = c.scale.y = scale;
    this.addChild(c);
  }
  this.width = pos.x * scale;
  this.height = (pos.y + data.lineHeight) * scale;
};
PIXI.BitmapText.prototype.updateTransform = function () {
  if (this.dirty) {
    while (this.children.length > 0) {
      this.removeChild(this.getChildAt(0));
    }
    this.updateText();
    this.dirty = false;
  }
  PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};
PIXI.BitmapText.fonts = {};
PIXI.InteractionManager = function (stage) {
  this.stage = stage;
  this.mouse = new PIXI.InteractionData();
  this.touchs = {};
  this.tempPoint = new PIXI.Point();
  this.mouseoverEnabled = true;
  this.pool = [];
  this.interactiveItems = [];
  this.interactionDOMElement = null;
  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseDown = this.onMouseDown.bind(this);
  this.onMouseOut = this.onMouseOut.bind(this);
  this.onMouseUp = this.onMouseUp.bind(this);
  this.onTouchStart = this.onTouchStart.bind(this);
  this.onTouchEnd = this.onTouchEnd.bind(this);
  this.onTouchMove = this.onTouchMove.bind(this);
  this.last = 0;
};
PIXI.InteractionManager.prototype.constructor = PIXI.InteractionManager;
PIXI.InteractionManager.prototype.collectInteractiveSprite = function (displayObject, iParent) {
  var children = displayObject.children;
  var length = children.length;
  for (var i = length - 1; i >= 0; i--) {
    var child = children[i];
    if (child.interactive) {
      iParent.interactiveChildren = true;
      this.interactiveItems.push(child);
      if (child.children.length > 0) {
        this.collectInteractiveSprite(child, child);
      }
    } else {
      child.__iParent = null;
      if (child.children.length > 0) {
        this.collectInteractiveSprite(child, iParent);
      }
    }
  }
};
PIXI.InteractionManager.prototype.setTarget = function (target) {
  this.target = target;
  if (this.interactionDOMElement === null) {
    this.setTargetDomElement(target.view);
  }
  document.body.addEventListener("mouseup", this.onMouseUp, true);
};
PIXI.InteractionManager.prototype.setTargetDomElement = function (domElement) {
  if (this.interactionDOMElement !== null) {
    this.interactionDOMElement.style["-ms-content-zooming"] = "";
    this.interactionDOMElement.style["-ms-touch-action"] = "";
    this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, true);
    this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, true);
    this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, true);
    this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, true);
    this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, true);
    this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, true);
  }
  if (window.navigator.msPointerEnabled) {
    domElement.style["-ms-content-zooming"] = "none";
    domElement.style["-ms-touch-action"] = "none";
  }
  this.interactionDOMElement = domElement;
  domElement.addEventListener("mousemove", this.onMouseMove, true);
  domElement.addEventListener("mousedown", this.onMouseDown, true);
  domElement.addEventListener("mouseout", this.onMouseOut, true);
  domElement.addEventListener("touchstart", this.onTouchStart, true);
  domElement.addEventListener("touchend", this.onTouchEnd, true);
  domElement.addEventListener("touchmove", this.onTouchMove, true);
};
PIXI.InteractionManager.prototype.update = function () {
  if (!this.target)
    return;
  var now = Date.now();
  var diff = now - this.last;
  diff = diff * 30 / 1000;
  if (diff < 1)
    return;
  this.last = now;
  if (this.dirty) {
    this.dirty = false;
    var len = this.interactiveItems.length;
    for (var i = 0; i < len; i++) {
      this.interactiveItems[i].interactiveChildren = false;
    }
    this.interactiveItems = [];
    if (this.stage.interactive)
      this.interactiveItems.push(this.stage);
    this.collectInteractiveSprite(this.stage, this.stage);
  }
  var length = this.interactiveItems.length;
  this.interactionDOMElement.style.cursor = "default";
  for (var i = 0; i < length; i++) {
    var item = this.interactiveItems[i];
    if (item.mouseover || item.mouseout || item.buttonMode) {
      item.__hit = this.hitTest(item, this.mouse);
      this.mouse.target = item;
      if (item.__hit) {
        if (item.buttonMode)
          this.interactionDOMElement.style.cursor = "pointer";
        if (!item.__isOver) {
          if (item.mouseover)
            item.mouseover(this.mouse);
          item.__isOver = true;
        }
      } else {
        if (item.__isOver) {
          if (item.mouseout)
            item.mouseout(this.mouse);
          item.__isOver = false;
        }
      }
    }
  }
};
PIXI.InteractionManager.prototype.onMouseMove = function (event) {
  this.mouse.originalEvent = event || window.event;
  var rect = this.interactionDOMElement.getBoundingClientRect();
  this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width);
  this.mouse.global.y = (event.clientY - rect.top) * (this.target.height / rect.height);
  var length = this.interactiveItems.length;
  var global = this.mouse.global;
  for (var i = 0; i < length; i++) {
    var item = this.interactiveItems[i];
    if (item.mousemove) {
      item.mousemove(this.mouse);
    }
  }
};
PIXI.InteractionManager.prototype.onMouseDown = function (event) {
  this.mouse.originalEvent = event || window.event;
  var length = this.interactiveItems.length;
  var global = this.mouse.global;
  var index = 0;
  var parent = this.stage;
  for (var i = 0; i < length; i++) {
    var item = this.interactiveItems[i];
    if (item.mousedown || item.click) {
      item.__mouseIsDown = true;
      item.__hit = this.hitTest(item, this.mouse);
      if (item.__hit) {
        if (item.mousedown)
          item.mousedown(this.mouse);
        item.__isDown = true;
        if (!item.interactiveChildren)
          break;
      }
    }
  }
};
PIXI.InteractionManager.prototype.onMouseOut = function (event) {
  var length = this.interactiveItems.length;
  this.interactionDOMElement.style.cursor = "default";
  for (var i = 0; i < length; i++) {
    var item = this.interactiveItems[i];
    if (item.__isOver) {
      this.mouse.target = item;
      if (item.mouseout)
        item.mouseout(this.mouse);
      item.__isOver = false;
    }
  }
};
PIXI.InteractionManager.prototype.onMouseUp = function (event) {
  this.mouse.originalEvent = event || window.event;
  var global = this.mouse.global;
  var length = this.interactiveItems.length;
  var up = false;
  for (var i = 0; i < length; i++) {
    var item = this.interactiveItems[i];
    if (item.mouseup || item.mouseupoutside || item.click) {
      item.__hit = this.hitTest(item, this.mouse);
      if (item.__hit && !up) {
        if (item.mouseup) {
          item.mouseup(this.mouse);
        }
        if (item.__isDown) {
          if (item.click)
            item.click(this.mouse);
        }
        if (!item.interactiveChildren)
          up = true;
      } else {
        if (item.__isDown) {
          if (item.mouseupoutside)
            item.mouseupoutside(this.mouse);
        }
      }
      item.__isDown = false;
    }
  }
};
PIXI.InteractionManager.prototype.hitTest = function (item, interactionData) {
  var global = interactionData.global;
  if (item.vcount !== PIXI.visibleCount)
    return false;
  var isSprite = item instanceof PIXI.Sprite, worldTransform = item.worldTransform, a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2], a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5], id = 1 / (a00 * a11 + a01 * -a10), x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id, y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;
  interactionData.target = item;
  if (item.hitArea && item.hitArea.contains) {
    if (item.hitArea.contains(x, y)) {
      interactionData.target = item;
      return true;
    }
    return false;
  } else if (isSprite) {
    var width = item.texture.frame.width, height = item.texture.frame.height, x1 = -width * item.anchor.x, y1;
    if (x > x1 && x < x1 + width) {
      y1 = -height * item.anchor.y;
      if (y > y1 && y < y1 + height) {
        interactionData.target = item;
        return true;
      }
    }
  }
  var length = item.children.length;
  for (var i = 0; i < length; i++) {
    var tempItem = item.children[i];
    var hit = this.hitTest(tempItem, interactionData);
    if (hit) {
      interactionData.target = item;
      return true;
    }
  }
  return false;
};
PIXI.InteractionManager.prototype.onTouchMove = function (event) {
  var rect = this.interactionDOMElement.getBoundingClientRect();
  var changedTouches = event.changedTouches;
  for (var i = 0; i < changedTouches.length; i++) {
    var touchEvent = changedTouches[i];
    var touchData = this.touchs[touchEvent.identifier];
    touchData.originalEvent = event || window.event;
    touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
    touchData.global.y = (touchEvent.clientY - rect.top) * (this.target.height / rect.height);
  }
  var length = this.interactiveItems.length;
  for (var i = 0; i < length; i++) {
    var item = this.interactiveItems[i];
    if (item.touchmove)
      item.touchmove(touchData);
  }
};
PIXI.InteractionManager.prototype.onTouchStart = function (event) {
  var rect = this.interactionDOMElement.getBoundingClientRect();
  var changedTouches = event.changedTouches;
  for (var i = 0; i < changedTouches.length; i++) {
    var touchEvent = changedTouches[i];
    var touchData = this.pool.pop();
    if (!touchData)
      touchData = new PIXI.InteractionData();
    touchData.originalEvent = event || window.event;
    this.touchs[touchEvent.identifier] = touchData;
    touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
    touchData.global.y = (touchEvent.clientY - rect.top) * (this.target.height / rect.height);
    var length = this.interactiveItems.length;
    for (var j = 0; j < length; j++) {
      var item = this.interactiveItems[j];
      if (item.touchstart || item.tap) {
        item.__hit = this.hitTest(item, touchData);
        if (item.__hit) {
          if (item.touchstart)
            item.touchstart(touchData);
          item.__isDown = true;
          item.__touchData = touchData;
          if (!item.interactiveChildren)
            break;
        }
      }
    }
  }
};
PIXI.InteractionManager.prototype.onTouchEnd = function (event) {
  var rect = this.interactionDOMElement.getBoundingClientRect();
  var changedTouches = event.changedTouches;
  for (var i = 0; i < changedTouches.length; i++) {
    var touchEvent = changedTouches[i];
    var touchData = this.touchs[touchEvent.identifier];
    var up = false;
    touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
    touchData.global.y = (touchEvent.clientY - rect.top) * (this.target.height / rect.height);
    var length = this.interactiveItems.length;
    for (var j = 0; j < length; j++) {
      var item = this.interactiveItems[j];
      var itemTouchData = item.__touchData;
      item.__hit = this.hitTest(item, touchData);
      if (itemTouchData == touchData) {
        touchData.originalEvent = event || window.event;
        if (item.touchend || item.tap) {
          if (item.__hit && !up) {
            if (item.touchend)
              item.touchend(touchData);
            if (item.__isDown) {
              if (item.tap)
                item.tap(touchData);
            }
            if (!item.interactiveChildren)
              up = true;
          } else {
            if (item.__isDown) {
              if (item.touchendoutside)
                item.touchendoutside(touchData);
            }
          }
          item.__isDown = false;
        }
        item.__touchData = null;
      } else {
      }
    }
    this.pool.push(touchData);
    this.touchs[touchEvent.identifier] = null;
  }
};
PIXI.InteractionData = function () {
  this.global = new PIXI.Point();
  this.local = new PIXI.Point();
  this.target;
  this.originalEvent;
};
PIXI.InteractionData.prototype.getLocalPosition = function (displayObject) {
  var worldTransform = displayObject.worldTransform;
  var global = this.global;
  var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2], a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5], id = 1 / (a00 * a11 + a01 * -a10);
  return new PIXI.Point(a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id, a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id);
};
PIXI.InteractionData.prototype.constructor = PIXI.InteractionData;
PIXI.Stage = function (backgroundColor) {
  PIXI.DisplayObjectContainer.call(this);
  this.worldTransform = PIXI.mat3.create();
  this.interactive = true;
  this.interactionManager = new PIXI.InteractionManager(this);
  this.dirty = true;
  this.__childrenAdded = [];
  this.__childrenRemoved = [];
  this.stage = this;
  this.stage.hitArea = new PIXI.Rectangle(0, 0, 100000, 100000);
  this.setBackgroundColor(backgroundColor);
  this.worldVisible = true;
};
PIXI.Stage.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.Stage.prototype.constructor = PIXI.Stage;
PIXI.Stage.prototype.setInteractionDelegate = function (domElement) {
  this.interactionManager.setTargetDomElement(domElement);
};
PIXI.Stage.prototype.updateTransform = function () {
  this.worldAlpha = 1;
  this.vcount = PIXI.visibleCount;
  for (var i = 0, j = this.children.length; i < j; i++) {
    this.children[i].updateTransform();
  }
  if (this.dirty) {
    this.dirty = false;
    this.interactionManager.dirty = true;
  }
  if (this.interactive)
    this.interactionManager.update();
};
PIXI.Stage.prototype.setBackgroundColor = function (backgroundColor) {
  this.backgroundColor = backgroundColor || 0;
  this.backgroundColorSplit = HEXtoRGB(this.backgroundColor);
  var hex = this.backgroundColor.toString(16);
  hex = "000000".substr(0, 6 - hex.length) + hex;
  this.backgroundColorString = "#" + hex;
};
PIXI.Stage.prototype.getMousePosition = function () {
  return this.interactionManager.mouse.global;
};
var lastTime = 0;
var vendors = [
    "ms",
    "moz",
    "webkit",
    "o"
  ];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
  window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
}
if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
window.requestAnimFrame = window.requestAnimationFrame;
function HEXtoRGB(hex) {
  return [
    (hex >> 16 & 255) / 255,
    (hex >> 8 & 255) / 255,
    (hex & 255) / 255
  ];
}
if (typeof Function.prototype.bind != "function") {
  Function.prototype.bind = function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);
      if (typeof target != "function")
        throw new TypeError();
      function bound() {
        var args = boundArgs.concat(slice.call(arguments));
        target.apply(this instanceof bound ? this : thisArg, args);
      }
      bound.prototype = function F(proto) {
        proto && (F.prototype = proto);
        if (!(this instanceof F))
          return new F();
      }(target.prototype);
      return bound;
    };
  }();
}
var AjaxRequest = PIXI.AjaxRequest = function () {
    var activexmodes = [
        "Msxml2.XMLHTTP.6.0",
        "Msxml2.XMLHTTP.3.0",
        "Microsoft.XMLHTTP"
      ];
    if (window.ActiveXObject) {
      for (var i = 0; i < activexmodes.length; i++) {
        try {
          return new ActiveXObject(activexmodes[i]);
        } catch (e) {
        }
      }
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else {
      return false;
    }
  };
PIXI.runList = function (item) {
  console.log(">>>>>>>>>");
  console.log("_");
  var safe = 0;
  var tmp = item.first;
  console.log(tmp);
  while (tmp._iNext) {
    safe++;
    tmp = tmp._iNext;
    console.log(tmp);
    if (safe > 100) {
      console.log("BREAK");
      break;
    }
  }
};
PIXI.EventTarget = function () {
  var listeners = {};
  this.addEventListener = this.on = function (type, listener) {
    if (listeners[type] === undefined) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  };
  this.dispatchEvent = this.emit = function (event) {
    if (!listeners[event.type] || !listeners[event.type].length) {
      return;
    }
    for (var i = 0, l = listeners[event.type].length; i < l; i++) {
      listeners[event.type][i](event);
    }
  };
  this.removeEventListener = this.off = function (type, listener) {
    var index = listeners[type].indexOf(listener);
    if (index !== -1) {
      listeners[type].splice(index, 1);
    }
  };
};
PIXI.autoDetectRenderer = function (width, height, view, transparent, antialias) {
  if (!width)
    width = 800;
  if (!height)
    height = 600;
  var webgl = function () {
      try {
        var canvas = document.createElement("canvas");
        return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
      } catch (e) {
        return false;
      }
    }();
  if (webgl) {
    var ie = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
    webgl = !ie;
  }
  if (webgl) {
    return new PIXI.WebGLRenderer(width, height, view, transparent, antialias);
  }
  return new PIXI.CanvasRenderer(width, height, view, transparent);
};
PIXI.PolyK = {};
PIXI.PolyK.Triangulate = function (p) {
  var sign = true;
  var n = p.length >> 1;
  if (n < 3)
    return [];
  var tgs = [];
  var avl = [];
  for (var i = 0; i < n; i++)
    avl.push(i);
  var i = 0;
  var al = n;
  while (al > 3) {
    var i0 = avl[(i + 0) % al];
    var i1 = avl[(i + 1) % al];
    var i2 = avl[(i + 2) % al];
    var ax = p[2 * i0], ay = p[2 * i0 + 1];
    var bx = p[2 * i1], by = p[2 * i1 + 1];
    var cx = p[2 * i2], cy = p[2 * i2 + 1];
    var earFound = false;
    if (PIXI.PolyK._convex(ax, ay, bx, by, cx, cy, sign)) {
      earFound = true;
      for (var j = 0; j < al; j++) {
        var vi = avl[j];
        if (vi == i0 || vi == i1 || vi == i2)
          continue;
        if (PIXI.PolyK._PointInTriangle(p[2 * vi], p[2 * vi + 1], ax, ay, bx, by, cx, cy)) {
          earFound = false;
          break;
        }
      }
    }
    if (earFound) {
      tgs.push(i0, i1, i2);
      avl.splice((i + 1) % al, 1);
      al--;
      i = 0;
    } else if (i++ > 3 * al) {
      if (sign) {
        var tgs = [];
        avl = [];
        for (var i = 0; i < n; i++)
          avl.push(i);
        i = 0;
        al = n;
        sign = false;
      } else {
        console.log("PIXI Warning: shape too complex to fill");
        return [];
      }
    }
  }
  tgs.push(avl[0], avl[1], avl[2]);
  return tgs;
};
PIXI.PolyK._PointInTriangle = function (px, py, ax, ay, bx, by, cx, cy) {
  var v0x = cx - ax;
  var v0y = cy - ay;
  var v1x = bx - ax;
  var v1y = by - ay;
  var v2x = px - ax;
  var v2y = py - ay;
  var dot00 = v0x * v0x + v0y * v0y;
  var dot01 = v0x * v1x + v0y * v1y;
  var dot02 = v0x * v2x + v0y * v2y;
  var dot11 = v1x * v1x + v1y * v1y;
  var dot12 = v1x * v2x + v1y * v2y;
  var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
  var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
  return u >= 0 && v >= 0 && u + v < 1;
};
PIXI.PolyK._convex = function (ax, ay, bx, by, cx, cy, sign) {
  return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0 == sign;
};
PIXI.shaderFragmentSrc = [
  "precision mediump float;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "uniform sampler2D uSampler;",
  "void main(void) {",
  "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
  "gl_FragColor = gl_FragColor * vColor;",
  "}"
];
PIXI.shaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  "uniform vec2 projectionVector;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
  "gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
  "vTextureCoord = aTextureCoord;",
  "vColor = aColor;",
  "}"
];
PIXI.stripShaderFragmentSrc = [
  "precision mediump float;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "uniform float alpha;",
  "uniform sampler2D uSampler;",
  "void main(void) {",
  "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
  "gl_FragColor = gl_FragColor * alpha;",
  "}"
];
PIXI.stripShaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  "uniform mat3 translationMatrix;",
  "uniform vec2 projectionVector;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
  "vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
  "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
  "vTextureCoord = aTextureCoord;",
  "vColor = aColor;",
  "}"
];
PIXI.primitiveShaderFragmentSrc = [
  "precision mediump float;",
  "varying vec4 vColor;",
  "void main(void) {",
  "gl_FragColor = vColor;",
  "}"
];
PIXI.primitiveShaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec4 aColor;",
  "uniform mat3 translationMatrix;",
  "uniform vec2 projectionVector;",
  "uniform float alpha;",
  "varying vec4 vColor;",
  "void main(void) {",
  "vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
  "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
  "vColor = aColor  * alpha;",
  "}"
];
PIXI.shaderStack = [];
PIXI.initPrimitiveShader = function () {
  var gl = PIXI.gl;
  var shaderProgram = PIXI.compileProgram(PIXI.primitiveShaderVertexSrc, PIXI.primitiveShaderFragmentSrc);
  gl.useProgram(shaderProgram);
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
  shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
  shaderProgram.translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
  shaderProgram.alpha = gl.getUniformLocation(shaderProgram, "alpha");
  PIXI.primitiveProgram = shaderProgram;
};
PIXI.initDefaultShader = function () {
  PIXI.defaultShader = new PIXI.PixiShader();
  PIXI.defaultShader.init();
  PIXI.pushShader(PIXI.defaultShader);
};
PIXI.initDefaultStripShader = function () {
  var gl = this.gl;
  var shaderProgram = PIXI.compileProgram(PIXI.stripShaderVertexSrc, PIXI.stripShaderFragmentSrc);
  gl.useProgram(shaderProgram);
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
  shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
  shaderProgram.translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
  shaderProgram.alpha = gl.getUniformLocation(shaderProgram, "alpha");
  shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
  shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
  shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
  PIXI.stripShaderProgram = shaderProgram;
};
PIXI.CompileVertexShader = function (gl, shaderSrc) {
  return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
};
PIXI.CompileFragmentShader = function (gl, shaderSrc) {
  return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
};
PIXI._CompileShader = function (gl, shaderSrc, shaderType) {
  var src = shaderSrc.join("\n");
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};
PIXI.compileProgram = function (vertexSrc, fragmentSrc) {
  var gl = PIXI.gl;
  var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);
  var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
  return shaderProgram;
};
PIXI.pushShader = function (shader) {
  PIXI.shaderStack.push(shader);
  var gl = PIXI.gl;
  var shaderProgram = shader.program;
  gl.useProgram(shaderProgram);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.colorAttribute);
  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
  shader.syncUniforms();
  PIXI.currentShader = shaderProgram;
};
PIXI.popShader = function () {
  var gl = PIXI.gl;
  var lastProgram = PIXI.shaderStack.pop();
  var shaderProgram = PIXI.shaderStack[PIXI.shaderStack.length - 1].program;
  gl.useProgram(shaderProgram);
  PIXI.currentShader = shaderProgram;
};
PIXI.activatePrimitiveShader = function () {
  var gl = PIXI.gl;
  gl.useProgram(PIXI.primitiveProgram);
  gl.disableVertexAttribArray(PIXI.currentShader.textureCoordAttribute);
};
PIXI.deactivatePrimitiveShader = function () {
  var gl = PIXI.gl;
  gl.useProgram(PIXI.currentShader);
  gl.enableVertexAttribArray(PIXI.currentShader.textureCoordAttribute);
};
PIXI.PixiShader = function () {
  this.program;
  this.fragmentSrc = [
    "precision lowp float;",
    "varying vec2 vTextureCoord;",
    "varying float vColor;",
    "uniform sampler2D uSampler;",
    "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;",
    "}"
  ];
};
PIXI.PixiShader.prototype.init = function () {
  var program = PIXI.compileProgram(this.vertexSrc || PIXI.shaderVertexSrc, this.fragmentSrc);
  var gl = PIXI.gl;
  gl.useProgram(program);
  program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
  program.colorAttribute = gl.getAttribLocation(program, "aColor");
  program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
  program.projectionVector = gl.getUniformLocation(program, "projectionVector");
  program.samplerUniform = gl.getUniformLocation(program, "uSampler");
  for (var key in this.uniforms) {
    program[key] = gl.getUniformLocation(program, key);
  }
  this.program = program;
};
PIXI.PixiShader.prototype.syncUniforms = function () {
  var gl = PIXI.gl;
  for (var key in this.uniforms) {
    var type = this.uniforms[key].type;
    if (type == "f") {
      gl.uniform1f(this.program[key], this.uniforms[key].value);
    }
    if (type == "f2") {
      gl.uniform2f(this.program[key], this.uniforms[key].value.x, this.uniforms[key].value.y);
    } else if (type == "mat4") {
      gl.uniformMatrix4fv(this.program[key], false, this.uniforms[key].value);
    } else if (type == "sampler2D") {
      var texture = this.uniforms[key].value;
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texture.baseTexture._glTexture);
      gl.uniform1i(this.program[key], 1);
    }
  }
};
PIXI.WebGLGraphics = function () {
};
PIXI.WebGLGraphics.renderGraphics = function (graphics, projection) {
  var gl = PIXI.gl;
  if (!graphics._webGL)
    graphics._webGL = {
      points: [],
      indices: [],
      lastIndex: 0,
      buffer: gl.createBuffer(),
      indexBuffer: gl.createBuffer()
    };
  if (graphics.dirty) {
    graphics.dirty = false;
    if (graphics.clearDirty) {
      graphics.clearDirty = false;
      graphics._webGL.lastIndex = 0;
      graphics._webGL.points = [];
      graphics._webGL.indices = [];
    }
    PIXI.WebGLGraphics.updateGraphics(graphics);
  }
  PIXI.activatePrimitiveShader();
  var m = PIXI.mat3.clone(graphics.worldTransform);
  PIXI.mat3.transpose(m);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniformMatrix3fv(PIXI.primitiveProgram.translationMatrix, false, m);
  gl.uniform2f(PIXI.primitiveProgram.projectionVector, projection.x, projection.y);
  gl.uniform1f(PIXI.primitiveProgram.alpha, graphics.worldAlpha);
  gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
  gl.vertexAttribPointer(PIXI.primitiveProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 4 * 6, 0);
  gl.vertexAttribPointer(PIXI.primitiveProgram.colorAttribute, 4, gl.FLOAT, false, 4 * 6, 2 * 4);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
  gl.drawElements(gl.TRIANGLE_STRIP, graphics._webGL.indices.length, gl.UNSIGNED_SHORT, 0);
  PIXI.deactivatePrimitiveShader();
};
PIXI.WebGLGraphics.updateGraphics = function (graphics) {
  for (var i = graphics._webGL.lastIndex; i < graphics.graphicsData.length; i++) {
    var data = graphics.graphicsData[i];
    if (data.type == PIXI.Graphics.POLY) {
      if (data.fill) {
        if (data.points.length > 3)
          PIXI.WebGLGraphics.buildPoly(data, graphics._webGL);
      }
      if (data.lineWidth > 0) {
        PIXI.WebGLGraphics.buildLine(data, graphics._webGL);
      }
    } else if (data.type == PIXI.Graphics.RECT) {
      PIXI.WebGLGraphics.buildRectangle(data, graphics._webGL);
    } else if (data.type == PIXI.Graphics.CIRC || data.type == PIXI.Graphics.ELIP) {
      PIXI.WebGLGraphics.buildCircle(data, graphics._webGL);
    }
  }
  ;
  graphics._webGL.lastIndex = graphics.graphicsData.length;
  var gl = PIXI.gl;
  graphics._webGL.glPoints = new Float32Array(graphics._webGL.points);
  gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, graphics._webGL.glPoints, gl.STATIC_DRAW);
  graphics._webGL.glIndicies = new Uint16Array(graphics._webGL.indices);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.glIndicies, gl.STATIC_DRAW);
};
PIXI.WebGLGraphics.buildRectangle = function (graphicsData, webGLData) {
  var rectData = graphicsData.points;
  var x = rectData[0];
  var y = rectData[1];
  var width = rectData[2];
  var height = rectData[3];
  if (graphicsData.fill) {
    var color = HEXtoRGB(graphicsData.fillColor);
    var alpha = graphicsData.fillAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;
    var verts = webGLData.points;
    var indices = webGLData.indices;
    var vertPos = verts.length / 6;
    verts.push(x, y);
    verts.push(r, g, b, alpha);
    verts.push(x + width, y);
    verts.push(r, g, b, alpha);
    verts.push(x, y + height);
    verts.push(r, g, b, alpha);
    verts.push(x + width, y + height);
    verts.push(r, g, b, alpha);
    indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
  }
  if (graphicsData.lineWidth) {
    graphicsData.points = [
      x,
      y,
      x + width,
      y,
      x + width,
      y + height,
      x,
      y + height,
      x,
      y
    ];
    PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
  }
};
PIXI.WebGLGraphics.buildCircle = function (graphicsData, webGLData) {
  var rectData = graphicsData.points;
  var x = rectData[0];
  var y = rectData[1];
  var width = rectData[2];
  var height = rectData[3];
  var totalSegs = 40;
  var seg = Math.PI * 2 / totalSegs;
  if (graphicsData.fill) {
    var color = HEXtoRGB(graphicsData.fillColor);
    var alpha = graphicsData.fillAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;
    var verts = webGLData.points;
    var indices = webGLData.indices;
    var vecPos = verts.length / 6;
    indices.push(vecPos);
    for (var i = 0; i < totalSegs + 1; i++) {
      verts.push(x, y, r, g, b, alpha);
      verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha);
      indices.push(vecPos++, vecPos++);
    }
    ;
    indices.push(vecPos - 1);
  }
  if (graphicsData.lineWidth) {
    graphicsData.points = [];
    for (var i = 0; i < totalSegs + 1; i++) {
      graphicsData.points.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height);
    }
    ;
    PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
  }
};
PIXI.WebGLGraphics.buildLine = function (graphicsData, webGLData) {
  var wrap = true;
  var points = graphicsData.points;
  if (points.length == 0)
    return;
  var firstPoint = new PIXI.Point(points[0], points[1]);
  var lastPoint = new PIXI.Point(points[points.length - 2], points[points.length - 1]);
  if (firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y) {
    points.pop();
    points.pop();
    lastPoint = new PIXI.Point(points[points.length - 2], points[points.length - 1]);
    var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
    var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
    points.unshift(midPointX, midPointY);
    points.push(midPointX, midPointY);
  }
  var verts = webGLData.points;
  var indices = webGLData.indices;
  var length = points.length / 2;
  var indexCount = points.length;
  var indexStart = verts.length / 6;
  var width = graphicsData.lineWidth / 2;
  var color = HEXtoRGB(graphicsData.lineColor);
  var alpha = graphicsData.lineAlpha;
  var r = color[0] * alpha;
  var g = color[1] * alpha;
  var b = color[2] * alpha;
  var p1x, p1y, p2x, p2y, p3x, p3y;
  var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
  var ipx, ipy;
  var a1, b1, c1, a2, b2, c2;
  var denom, pdist, dist;
  p1x = points[0];
  p1y = points[1];
  p2x = points[2];
  p2y = points[3];
  perpx = -(p1y - p2y);
  perpy = p1x - p2x;
  dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  verts.push(p1x - perpx, p1y - perpy, r, g, b, alpha);
  verts.push(p1x + perpx, p1y + perpy, r, g, b, alpha);
  for (var i = 1; i < length - 1; i++) {
    p1x = points[(i - 1) * 2];
    p1y = points[(i - 1) * 2 + 1];
    p2x = points[i * 2];
    p2y = points[i * 2 + 1];
    p3x = points[(i + 1) * 2];
    p3y = points[(i + 1) * 2 + 1];
    perpx = -(p1y - p2y);
    perpy = p1x - p2x;
    dist = Math.sqrt(perpx * perpx + perpy * perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;
    perp2x = -(p2y - p3y);
    perp2y = p2x - p3x;
    dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
    perp2x /= dist;
    perp2y /= dist;
    perp2x *= width;
    perp2y *= width;
    a1 = -perpy + p1y - (-perpy + p2y);
    b1 = -perpx + p2x - (-perpx + p1x);
    c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
    a2 = -perp2y + p3y - (-perp2y + p2y);
    b2 = -perp2x + p2x - (-perp2x + p3x);
    c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
    denom = a1 * b2 - a2 * b1;
    if (denom == 0) {
      denom += 1;
    }
    px = (b1 * c2 - b2 * c1) / denom;
    py = (a2 * c1 - a1 * c2) / denom;
    pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
    if (pdist > 140 * 140) {
      perp3x = perpx - perp2x;
      perp3y = perpy - perp2y;
      dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y);
      perp3x /= dist;
      perp3y /= dist;
      perp3x *= width;
      perp3y *= width;
      verts.push(p2x - perp3x, p2y - perp3y);
      verts.push(r, g, b, alpha);
      verts.push(p2x + perp3x, p2y + perp3y);
      verts.push(r, g, b, alpha);
      verts.push(p2x - perp3x, p2y - perp3y);
      verts.push(r, g, b, alpha);
      indexCount++;
    } else {
      verts.push(px, py);
      verts.push(r, g, b, alpha);
      verts.push(p2x - (px - p2x), p2y - (py - p2y));
      verts.push(r, g, b, alpha);
    }
  }
  p1x = points[(length - 2) * 2];
  p1y = points[(length - 2) * 2 + 1];
  p2x = points[(length - 1) * 2];
  p2y = points[(length - 1) * 2 + 1];
  perpx = -(p1y - p2y);
  perpy = p1x - p2x;
  dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  verts.push(p2x - perpx, p2y - perpy);
  verts.push(r, g, b, alpha);
  verts.push(p2x + perpx, p2y + perpy);
  verts.push(r, g, b, alpha);
  indices.push(indexStart);
  for (var i = 0; i < indexCount; i++) {
    indices.push(indexStart++);
  }
  ;
  indices.push(indexStart - 1);
};
PIXI.WebGLGraphics.buildPoly = function (graphicsData, webGLData) {
  var points = graphicsData.points;
  if (points.length < 6)
    return;
  var verts = webGLData.points;
  var indices = webGLData.indices;
  var length = points.length / 2;
  var color = HEXtoRGB(graphicsData.fillColor);
  var alpha = graphicsData.fillAlpha;
  var r = color[0] * alpha;
  var g = color[1] * alpha;
  var b = color[2] * alpha;
  var triangles = PIXI.PolyK.Triangulate(points);
  var vertPos = verts.length / 6;
  for (var i = 0; i < triangles.length; i += 3) {
    indices.push(triangles[i] + vertPos);
    indices.push(triangles[i] + vertPos);
    indices.push(triangles[i + 1] + vertPos);
    indices.push(triangles[i + 2] + vertPos);
    indices.push(triangles[i + 2] + vertPos);
  }
  ;
  for (var i = 0; i < length; i++) {
    verts.push(points[i * 2], points[i * 2 + 1], r, g, b, alpha);
  }
  ;
};
function HEXtoRGB(hex) {
  return [
    (hex >> 16 & 255) / 255,
    (hex >> 8 & 255) / 255,
    (hex & 255) / 255
  ];
}
PIXI._defaultFrame = new PIXI.Rectangle(0, 0, 1, 1);
PIXI.gl;
PIXI.WebGLRenderer = function (width, height, view, transparent, antialias) {
  this.transparent = !!transparent;
  this.width = width || 800;
  this.height = height || 600;
  this.view = view || document.createElement("canvas");
  this.view.width = this.width;
  this.view.height = this.height;
  var scope = this;
  this.view.addEventListener("webglcontextlost", function (event) {
    scope.handleContextLost(event);
  }, false);
  this.view.addEventListener("webglcontextrestored", function (event) {
    scope.handleContextRestored(event);
  }, false);
  this.batchs = [];
  var options = {
      alpha: this.transparent,
      antialias: !!antialias,
      premultipliedAlpha: false,
      stencil: true
    };
  try {
    PIXI.gl = this.gl = this.view.getContext("experimental-webgl", options);
  } catch (e) {
    try {
      PIXI.gl = this.gl = this.view.getContext("webgl", options);
    } catch (e) {
      throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
    }
  }
  PIXI.initDefaultShader();
  PIXI.initPrimitiveShader();
  PIXI.initDefaultStripShader();
  var gl = this.gl;
  PIXI.WebGLRenderer.gl = gl;
  this.batch = new PIXI.WebGLBatch(gl);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  gl.colorMask(true, true, true, this.transparent);
  PIXI.projection = new PIXI.Point(400, 300);
  this.resize(this.width, this.height);
  this.contextLost = false;
  PIXI.pushShader(PIXI.defaultShader);
  this.stageRenderGroup = new PIXI.WebGLRenderGroup(this.gl);
};
PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;
PIXI.WebGLRenderer.getBatch = function () {
  if (PIXI._batchs.length == 0) {
    return new PIXI.WebGLBatch(PIXI.WebGLRenderer.gl);
  } else {
    return PIXI._batchs.pop();
  }
};
PIXI.WebGLRenderer.returnBatch = function (batch) {
  batch.clean();
  PIXI._batchs.push(batch);
};
PIXI.WebGLRenderer.prototype.render = function (stage) {
  if (this.contextLost)
    return;
  if (this.__stage !== stage) {
    this.__stage = stage;
    this.stageRenderGroup.setRenderable(stage);
  }
  PIXI.WebGLRenderer.updateTextures();
  PIXI.visibleCount++;
  stage.updateTransform();
  var gl = this.gl;
  gl.colorMask(true, true, true, this.transparent);
  gl.viewport(0, 0, this.width, this.height);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.clearColor(stage.backgroundColorSplit[0], stage.backgroundColorSplit[1], stage.backgroundColorSplit[2], !this.transparent);
  gl.clear(gl.COLOR_BUFFER_BIT);
  this.stageRenderGroup.backgroundColor = stage.backgroundColorSplit;
  this.stageRenderGroup.render(PIXI.projection);
  if (stage.interactive) {
    if (!stage._interactiveEventsAdded) {
      stage._interactiveEventsAdded = true;
      stage.interactionManager.setTarget(this);
    }
  }
  if (PIXI.Texture.frameUpdates.length > 0) {
    for (var i = 0; i < PIXI.Texture.frameUpdates.length; i++) {
      PIXI.Texture.frameUpdates[i].updateFrame = false;
    }
    ;
    PIXI.Texture.frameUpdates = [];
  }
};
PIXI.WebGLRenderer.updateTextures = function () {
  for (var i = 0; i < PIXI.texturesToUpdate.length; i++)
    PIXI.WebGLRenderer.updateTexture(PIXI.texturesToUpdate[i]);
  for (var i = 0; i < PIXI.texturesToDestroy.length; i++)
    PIXI.WebGLRenderer.destroyTexture(PIXI.texturesToDestroy[i]);
  PIXI.texturesToUpdate = [];
  PIXI.texturesToDestroy = [];
};
PIXI.WebGLRenderer.updateTexture = function (texture) {
  var gl = PIXI.gl;
  if (!texture._glTexture) {
    texture._glTexture = gl.createTexture();
  }
  if (texture.hasLoaded) {
    gl.bindTexture(gl.TEXTURE_2D, texture._glTexture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, texture.scaleMode === PIXI.BaseTexture.SCALE_MODE.LINEAR ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, texture.scaleMode === PIXI.BaseTexture.SCALE_MODE.LINEAR ? gl.LINEAR : gl.NEAREST);
    if (!texture._powerOf2) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
};
PIXI.WebGLRenderer.destroyTexture = function (texture) {
  var gl = PIXI.gl;
  if (texture._glTexture) {
    texture._glTexture = gl.createTexture();
    gl.deleteTexture(gl.TEXTURE_2D, texture._glTexture);
  }
};
PIXI.WebGLRenderer.prototype.resize = function (width, height) {
  this.width = width;
  this.height = height;
  this.view.width = width;
  this.view.height = height;
  this.gl.viewport(0, 0, this.width, this.height);
  PIXI.projection.x = this.width / 2;
  PIXI.projection.y = this.height / 2;
};
PIXI.WebGLRenderer.prototype.handleContextLost = function (event) {
  event.preventDefault();
  this.contextLost = true;
};
PIXI.WebGLRenderer.prototype.handleContextRestored = function (event) {
  this.gl = this.view.getContext("experimental-webgl", { alpha: true });
  this.initShaders();
  for (var key in PIXI.TextureCache) {
    var texture = PIXI.TextureCache[key].baseTexture;
    texture._glTexture = null;
    PIXI.WebGLRenderer.updateTexture(texture);
  }
  ;
  for (var i = 0; i < this.batchs.length; i++) {
    this.batchs[i].restoreLostContext(this.gl);
    this.batchs[i].dirty = true;
  }
  ;
  PIXI._restoreBatchs(this.gl);
  this.contextLost = false;
};
PIXI._batchs = [];
PIXI._getBatch = function (gl) {
  if (PIXI._batchs.length == 0) {
    return new PIXI.WebGLBatch(gl);
  } else {
    return PIXI._batchs.pop();
  }
};
PIXI._returnBatch = function (batch) {
  batch.clean();
  PIXI._batchs.push(batch);
};
PIXI._restoreBatchs = function (gl) {
  for (var i = 0; i < PIXI._batchs.length; i++) {
    PIXI._batchs[i].restoreLostContext(gl);
  }
  ;
};
PIXI.WebGLBatch = function (gl) {
  this.gl = gl;
  this.size = 0;
  this.vertexBuffer = gl.createBuffer();
  this.indexBuffer = gl.createBuffer();
  this.uvBuffer = gl.createBuffer();
  this.colorBuffer = gl.createBuffer();
  this.blendMode = PIXI.blendModes.NORMAL;
  this.dynamicSize = 1;
};
PIXI.WebGLBatch.prototype.constructor = PIXI.WebGLBatch;
PIXI.WebGLBatch.prototype.clean = function () {
  this.verticies = [];
  this.uvs = [];
  this.indices = [];
  this.colors = [];
  this.dynamicSize = 1;
  this.texture = null;
  this.last = null;
  this.size = 0;
  this.head;
  this.tail;
};
PIXI.WebGLBatch.prototype.restoreLostContext = function (gl) {
  this.gl = gl;
  this.vertexBuffer = gl.createBuffer();
  this.indexBuffer = gl.createBuffer();
  this.uvBuffer = gl.createBuffer();
  this.colorBuffer = gl.createBuffer();
};
PIXI.WebGLBatch.prototype.init = function (sprite) {
  sprite.batch = this;
  this.dirty = true;
  this.blendMode = sprite.blendMode;
  this.texture = sprite.texture.baseTexture;
  this.head = sprite;
  this.tail = sprite;
  this.size = 1;
  this.growBatch();
};
PIXI.WebGLBatch.prototype.insertBefore = function (sprite, nextSprite) {
  this.size++;
  sprite.batch = this;
  this.dirty = true;
  var tempPrev = nextSprite.__prev;
  nextSprite.__prev = sprite;
  sprite.__next = nextSprite;
  if (tempPrev) {
    sprite.__prev = tempPrev;
    tempPrev.__next = sprite;
  } else {
    this.head = sprite;
  }
};
PIXI.WebGLBatch.prototype.insertAfter = function (sprite, previousSprite) {
  this.size++;
  sprite.batch = this;
  this.dirty = true;
  var tempNext = previousSprite.__next;
  previousSprite.__next = sprite;
  sprite.__prev = previousSprite;
  if (tempNext) {
    sprite.__next = tempNext;
    tempNext.__prev = sprite;
  } else {
    this.tail = sprite;
  }
};
PIXI.WebGLBatch.prototype.remove = function (sprite) {
  this.size--;
  if (this.size == 0) {
    sprite.batch = null;
    sprite.__prev = null;
    sprite.__next = null;
    return;
  }
  if (sprite.__prev) {
    sprite.__prev.__next = sprite.__next;
  } else {
    this.head = sprite.__next;
    this.head.__prev = null;
  }
  if (sprite.__next) {
    sprite.__next.__prev = sprite.__prev;
  } else {
    this.tail = sprite.__prev;
    this.tail.__next = null;
  }
  sprite.batch = null;
  sprite.__next = null;
  sprite.__prev = null;
  this.dirty = true;
};
PIXI.WebGLBatch.prototype.split = function (sprite) {
  this.dirty = true;
  var batch = new PIXI.WebGLBatch(this.gl);
  batch.init(sprite);
  batch.texture = this.texture;
  batch.tail = this.tail;
  this.tail = sprite.__prev;
  this.tail.__next = null;
  sprite.__prev = null;
  var tempSize = 0;
  while (sprite) {
    tempSize++;
    sprite.batch = batch;
    sprite = sprite.__next;
  }
  batch.size = tempSize;
  this.size -= tempSize;
  return batch;
};
PIXI.WebGLBatch.prototype.merge = function (batch) {
  this.dirty = true;
  this.tail.__next = batch.head;
  batch.head.__prev = this.tail;
  this.size += batch.size;
  this.tail = batch.tail;
  var sprite = batch.head;
  while (sprite) {
    sprite.batch = this;
    sprite = sprite.__next;
  }
};
PIXI.WebGLBatch.prototype.growBatch = function () {
  var gl = this.gl;
  if (this.size == 1) {
    this.dynamicSize = 1;
  } else {
    this.dynamicSize = this.size * 1.5;
  }
  this.verticies = new Float32Array(this.dynamicSize * 8);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.verticies, gl.DYNAMIC_DRAW);
  this.uvs = new Float32Array(this.dynamicSize * 8);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.DYNAMIC_DRAW);
  this.dirtyUVS = true;
  this.colors = new Float32Array(this.dynamicSize * 4);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.DYNAMIC_DRAW);
  this.dirtyColors = true;
  this.indices = new Uint16Array(this.dynamicSize * 6);
  var length = this.indices.length / 6;
  for (var i = 0; i < length; i++) {
    var index2 = i * 6;
    var index3 = i * 4;
    this.indices[index2 + 0] = index3 + 0;
    this.indices[index2 + 1] = index3 + 1;
    this.indices[index2 + 2] = index3 + 2;
    this.indices[index2 + 3] = index3 + 0;
    this.indices[index2 + 4] = index3 + 2;
    this.indices[index2 + 5] = index3 + 3;
  }
  ;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
};
PIXI.WebGLBatch.prototype.refresh = function () {
  var gl = this.gl;
  if (this.dynamicSize < this.size) {
    this.growBatch();
  }
  var indexRun = 0;
  var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index;
  var a, b, c, d, tx, ty;
  var displayObject = this.head;
  while (displayObject) {
    index = indexRun * 8;
    var texture = displayObject.texture;
    var frame = texture.frame;
    var tw = texture.baseTexture.width;
    var th = texture.baseTexture.height;
    this.uvs[index + 0] = frame.x / tw;
    this.uvs[index + 1] = frame.y / th;
    this.uvs[index + 2] = (frame.x + frame.width) / tw;
    this.uvs[index + 3] = frame.y / th;
    this.uvs[index + 4] = (frame.x + frame.width) / tw;
    this.uvs[index + 5] = (frame.y + frame.height) / th;
    this.uvs[index + 6] = frame.x / tw;
    this.uvs[index + 7] = (frame.y + frame.height) / th;
    displayObject.updateFrame = false;
    colorIndex = indexRun * 4;
    this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;
    displayObject = displayObject.__next;
    indexRun++;
  }
  this.dirtyUVS = true;
  this.dirtyColors = true;
};
PIXI.WebGLBatch.prototype.update = function () {
  var gl = this.gl;
  var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index, index2, index3;
  var a, b, c, d, tx, ty;
  var indexRun = 0;
  var displayObject = this.head;
  var verticies = this.verticies;
  var uvs = this.uvs;
  var colors = this.colors;
  while (displayObject) {
    if (displayObject.vcount === PIXI.visibleCount) {
      width = displayObject.texture.frame.width;
      height = displayObject.texture.frame.height;
      aX = displayObject.anchor.x;
      aY = displayObject.anchor.y;
      w0 = width * (1 - aX);
      w1 = width * -aX;
      h0 = height * (1 - aY);
      h1 = height * -aY;
      index = indexRun * 8;
      worldTransform = displayObject.worldTransform;
      a = worldTransform[0];
      b = worldTransform[3];
      c = worldTransform[1];
      d = worldTransform[4];
      tx = worldTransform[2];
      ty = worldTransform[5];
      verticies[index + 0] = a * w1 + c * h1 + tx;
      verticies[index + 1] = d * h1 + b * w1 + ty;
      verticies[index + 2] = a * w0 + c * h1 + tx;
      verticies[index + 3] = d * h1 + b * w0 + ty;
      verticies[index + 4] = a * w0 + c * h0 + tx;
      verticies[index + 5] = d * h0 + b * w0 + ty;
      verticies[index + 6] = a * w1 + c * h0 + tx;
      verticies[index + 7] = d * h0 + b * w1 + ty;
      if (displayObject.updateFrame || displayObject.texture.updateFrame) {
        this.dirtyUVS = true;
        var texture = displayObject.texture;
        var frame = texture.frame;
        var tw = texture.baseTexture.width;
        var th = texture.baseTexture.height;
        uvs[index + 0] = frame.x / tw;
        uvs[index + 1] = frame.y / th;
        uvs[index + 2] = (frame.x + frame.width) / tw;
        uvs[index + 3] = frame.y / th;
        uvs[index + 4] = (frame.x + frame.width) / tw;
        uvs[index + 5] = (frame.y + frame.height) / th;
        uvs[index + 6] = frame.x / tw;
        uvs[index + 7] = (frame.y + frame.height) / th;
        displayObject.updateFrame = false;
      }
      if (displayObject.cacheAlpha != displayObject.worldAlpha) {
        displayObject.cacheAlpha = displayObject.worldAlpha;
        var colorIndex = indexRun * 4;
        colors[colorIndex] = colors[colorIndex + 1] = colors[colorIndex + 2] = colors[colorIndex + 3] = displayObject.worldAlpha;
        this.dirtyColors = true;
      }
    } else {
      index = indexRun * 8;
      verticies[index + 0] = verticies[index + 1] = verticies[index + 2] = verticies[index + 3] = verticies[index + 4] = verticies[index + 5] = verticies[index + 6] = verticies[index + 7] = 0;
    }
    indexRun++;
    displayObject = displayObject.__next;
  }
};
PIXI.WebGLBatch.prototype.render = function (start, end) {
  start = start || 0;
  if (end == undefined)
    end = this.size;
  if (this.dirty) {
    this.refresh();
    this.dirty = false;
  }
  if (this.size == 0)
    return;
  this.update();
  var gl = this.gl;
  var shaderProgram = PIXI.currentShader;
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.verticies);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
  if (this.dirtyUVS) {
    this.dirtyUVS = false;
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvs);
  }
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.texture._glTexture);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  if (this.dirtyColors) {
    this.dirtyColors = false;
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colors);
  }
  gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  var len = end - start;
  gl.drawElements(gl.TRIANGLES, len * 6, gl.UNSIGNED_SHORT, start * 2 * 6);
};
PIXI.WebGLRenderGroup = function (gl) {
  this.gl = gl;
  this.root;
  this.backgroundColor;
  this.batchs = [];
  this.toRemove = [];
};
PIXI.WebGLRenderGroup.prototype.constructor = PIXI.WebGLRenderGroup;
PIXI.WebGLRenderGroup.prototype.setRenderable = function (displayObject) {
  if (this.root)
    this.removeDisplayObjectAndChildren(this.root);
  displayObject.worldVisible = displayObject.visible;
  this.root = displayObject;
  this.addDisplayObjectAndChildren(displayObject);
};
PIXI.WebGLRenderGroup.prototype.render = function (projection) {
  PIXI.WebGLRenderer.updateTextures();
  var gl = this.gl;
  gl.uniform2f(PIXI.currentShader.projectionVector, projection.x, projection.y);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  var renderable;
  for (var i = 0; i < this.batchs.length; i++) {
    renderable = this.batchs[i];
    if (renderable instanceof PIXI.WebGLBatch) {
      this.batchs[i].render();
      continue;
    }
    var worldVisible = renderable.vcount === PIXI.visibleCount;
    if (renderable instanceof PIXI.TilingSprite) {
      if (worldVisible)
        this.renderTilingSprite(renderable, projection);
    } else if (renderable instanceof PIXI.Strip) {
      if (worldVisible)
        this.renderStrip(renderable, projection);
    } else if (renderable instanceof PIXI.Graphics) {
      if (worldVisible && renderable.renderable)
        PIXI.WebGLGraphics.renderGraphics(renderable, projection);
    } else if (renderable instanceof PIXI.FilterBlock) {
      this.handleFilterBlock(renderable, projection);
    }
  }
};
PIXI.WebGLRenderGroup.prototype.renderSpecific = function (displayObject, projection) {
  PIXI.WebGLRenderer.updateTextures();
  var gl = this.gl;
  gl.uniform2f(PIXI.currentShader.projectionVector, projection.x, projection.y);
  var startIndex;
  var startBatchIndex;
  var endIndex;
  var endBatchIndex;
  var nextRenderable = displayObject.first;
  while (nextRenderable._iNext) {
    nextRenderable = nextRenderable._iNext;
    if (nextRenderable.renderable && nextRenderable.__renderGroup)
      break;
  }
  var startBatch = nextRenderable.batch;
  if (nextRenderable instanceof PIXI.Sprite) {
    startBatch = nextRenderable.batch;
    var head = startBatch.head;
    var next = head;
    if (head == nextRenderable) {
      startIndex = 0;
    } else {
      startIndex = 1;
      while (head.__next != nextRenderable) {
        startIndex++;
        head = head.__next;
      }
    }
  } else {
    startBatch = nextRenderable;
  }
  var lastRenderable = displayObject;
  var endBatch;
  var lastItem = displayObject;
  while (lastItem.children.length > 0) {
    lastItem = lastItem.children[lastItem.children.length - 1];
    if (lastItem.renderable)
      lastRenderable = lastItem.last;
  }
  if (lastRenderable instanceof PIXI.Sprite) {
    endBatch = lastRenderable.batch;
    var head = endBatch.head;
    if (head == lastRenderable) {
      endIndex = 0;
    } else {
      endIndex = 1;
      while (head.__next != lastRenderable) {
        endIndex++;
        head = head.__next;
      }
    }
  } else {
    endBatch = lastRenderable;
  }
  if (startBatch == endBatch) {
    if (startBatch instanceof PIXI.WebGLBatch) {
      startBatch.render(startIndex, endIndex + 1);
    } else {
      this.renderSpecial(startBatch, projection);
    }
    return;
  }
  startBatchIndex = this.batchs.indexOf(startBatch);
  endBatchIndex = this.batchs.indexOf(endBatch);
  if (startBatch instanceof PIXI.WebGLBatch) {
    startBatch.render(startIndex);
  } else {
    this.renderSpecial(startBatch, projection);
  }
  for (var i = startBatchIndex + 1; i < endBatchIndex; i++) {
    renderable = this.batchs[i];
    if (renderable instanceof PIXI.WebGLBatch) {
      this.batchs[i].render();
    } else {
      this.renderSpecial(renderable, projection);
    }
  }
  if (endBatch instanceof PIXI.WebGLBatch) {
    endBatch.render(0, endIndex + 1);
  } else {
    this.renderSpecial(endBatch, projection);
  }
};
PIXI.WebGLRenderGroup.prototype.renderSpecial = function (renderable, projection) {
  var sta = PIXI.shaderStack.length;
  var worldVisible = renderable.vcount === PIXI.visibleCount;
  if (renderable instanceof PIXI.TilingSprite) {
    if (worldVisible)
      this.renderTilingSprite(renderable, projection);
  } else if (renderable instanceof PIXI.Strip) {
    if (worldVisible)
      this.renderStrip(renderable, projection);
  } else if (renderable instanceof PIXI.CustomRenderable) {
    if (worldVisible)
      renderable.renderWebGL(this, projection);
  } else if (renderable instanceof PIXI.Graphics) {
    if (worldVisible && renderable.renderable)
      PIXI.WebGLGraphics.renderGraphics(renderable, projection);
  } else if (renderable instanceof PIXI.FilterBlock) {
    this.handleFilterBlock(renderable, projection);
  }
};
PIXI.WebGLRenderGroup.prototype.handleFilterBlock = function (renderable, projection) {
  var gl = PIXI.gl;
  if (renderable.open) {
    if (renderable.data instanceof Array) {
      var filter = renderable.data[0];
      if (!filter.shader) {
        var shader = new PIXI.PixiShader();
        shader.fragmentSrc = filter.fragmentSrc;
        shader.uniforms = filter.uniforms;
        shader.init();
        filter.shader = shader;
      }
      PIXI.pushShader(filter.shader);
      gl.uniform2f(PIXI.currentShader.projectionVector, projection.x, projection.y);
    } else {
      gl.enable(gl.STENCIL_TEST);
      gl.colorMask(false, false, false, false);
      gl.stencilFunc(gl.ALWAYS, 1, 255);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
      PIXI.WebGLGraphics.renderGraphics(renderable.data, projection);
      gl.colorMask(true, true, true, true);
      gl.stencilFunc(gl.NOTEQUAL, 0, 255);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    }
  } else {
    if (renderable.data instanceof Array) {
      PIXI.popShader();
      gl.uniform2f(PIXI.currentShader.projectionVector, projection.x, projection.y);
    } else {
      gl.disable(gl.STENCIL_TEST);
    }
  }
};
PIXI.WebGLRenderGroup.prototype.updateTexture = function (displayObject) {
  this.removeObject(displayObject);
  var previousRenderable = displayObject.first;
  while (previousRenderable != this.root) {
    previousRenderable = previousRenderable._iPrev;
    if (previousRenderable.renderable && previousRenderable.__renderGroup)
      break;
  }
  var nextRenderable = displayObject.last;
  while (nextRenderable._iNext) {
    nextRenderable = nextRenderable._iNext;
    if (nextRenderable.renderable && nextRenderable.__renderGroup)
      break;
  }
  this.insertObject(displayObject, previousRenderable, nextRenderable);
};
PIXI.WebGLRenderGroup.prototype.addFilterBlocks = function (start, end) {
  start.__renderGroup = this;
  end.__renderGroup = this;
  var previousRenderable = start;
  while (previousRenderable != this.root.first) {
    previousRenderable = previousRenderable._iPrev;
    if (previousRenderable.renderable && previousRenderable.__renderGroup)
      break;
  }
  this.insertAfter(start, previousRenderable);
  var previousRenderable2 = end;
  while (previousRenderable2 != this.root.first) {
    previousRenderable2 = previousRenderable2._iPrev;
    if (previousRenderable2.renderable && previousRenderable2.__renderGroup)
      break;
  }
  this.insertAfter(end, previousRenderable2);
};
PIXI.WebGLRenderGroup.prototype.removeFilterBlocks = function (start, end) {
  this.removeObject(start);
  this.removeObject(end);
};
PIXI.WebGLRenderGroup.prototype.addDisplayObjectAndChildren = function (displayObject) {
  if (displayObject.__renderGroup)
    displayObject.__renderGroup.removeDisplayObjectAndChildren(displayObject);
  var previousRenderable = displayObject.first;
  while (previousRenderable != this.root.first) {
    previousRenderable = previousRenderable._iPrev;
    if (previousRenderable.renderable && previousRenderable.__renderGroup)
      break;
  }
  var nextRenderable = displayObject.last;
  while (nextRenderable._iNext) {
    nextRenderable = nextRenderable._iNext;
    if (nextRenderable.renderable && nextRenderable.__renderGroup)
      break;
  }
  var tempObject = displayObject.first;
  var testObject = displayObject.last._iNext;
  do {
    tempObject.__renderGroup = this;
    if (tempObject.renderable) {
      this.insertObject(tempObject, previousRenderable, nextRenderable);
      previousRenderable = tempObject;
    }
    tempObject = tempObject._iNext;
  } while (tempObject != testObject);
};
PIXI.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren = function (displayObject) {
  if (displayObject.__renderGroup != this)
    return;
  var lastObject = displayObject.last;
  do {
    displayObject.__renderGroup = null;
    if (displayObject.renderable)
      this.removeObject(displayObject);
    displayObject = displayObject._iNext;
  } while (displayObject);
};
PIXI.WebGLRenderGroup.prototype.insertObject = function (displayObject, previousObject, nextObject) {
  var previousSprite = previousObject;
  var nextSprite = nextObject;
  if (displayObject instanceof PIXI.Sprite) {
    var previousBatch;
    var nextBatch;
    if (previousSprite instanceof PIXI.Sprite) {
      previousBatch = previousSprite.batch;
      if (previousBatch) {
        if (previousBatch.texture == displayObject.texture.baseTexture && previousBatch.blendMode == displayObject.blendMode) {
          previousBatch.insertAfter(displayObject, previousSprite);
          return;
        }
      }
    } else {
      previousBatch = previousSprite;
    }
    if (nextSprite) {
      if (nextSprite instanceof PIXI.Sprite) {
        nextBatch = nextSprite.batch;
        if (nextBatch) {
          if (nextBatch.texture == displayObject.texture.baseTexture && nextBatch.blendMode == displayObject.blendMode) {
            nextBatch.insertBefore(displayObject, nextSprite);
            return;
          } else {
            if (nextBatch == previousBatch) {
              var splitBatch = previousBatch.split(nextSprite);
              var batch = PIXI.WebGLRenderer.getBatch();
              var index = this.batchs.indexOf(previousBatch);
              batch.init(displayObject);
              this.batchs.splice(index + 1, 0, batch, splitBatch);
              return;
            }
          }
        }
      } else {
        nextBatch = nextSprite;
      }
    }
    var batch = PIXI.WebGLRenderer.getBatch();
    batch.init(displayObject);
    if (previousBatch) {
      var index = this.batchs.indexOf(previousBatch);
      this.batchs.splice(index + 1, 0, batch);
    } else {
      this.batchs.push(batch);
    }
    return;
  } else if (displayObject instanceof PIXI.TilingSprite) {
    this.initTilingSprite(displayObject);
  } else if (displayObject instanceof PIXI.Strip) {
    this.initStrip(displayObject);
  } else if (displayObject) {
  }
  this.insertAfter(displayObject, previousSprite);
};
PIXI.WebGLRenderGroup.prototype.insertAfter = function (item, displayObject) {
  if (displayObject instanceof PIXI.Sprite) {
    var previousBatch = displayObject.batch;
    if (previousBatch) {
      if (previousBatch.tail == displayObject) {
        var index = this.batchs.indexOf(previousBatch);
        this.batchs.splice(index + 1, 0, item);
      } else {
        var splitBatch = previousBatch.split(displayObject.__next);
        var index = this.batchs.indexOf(previousBatch);
        this.batchs.splice(index + 1, 0, item, splitBatch);
      }
    } else {
      this.batchs.push(item);
    }
  } else {
    var index = this.batchs.indexOf(displayObject);
    this.batchs.splice(index + 1, 0, item);
  }
};
PIXI.WebGLRenderGroup.prototype.removeObject = function (displayObject) {
  var batchToRemove;
  if (displayObject instanceof PIXI.Sprite) {
    var batch = displayObject.batch;
    if (!batch)
      return;
    batch.remove(displayObject);
    if (batch.size == 0) {
      batchToRemove = batch;
    }
  } else {
    batchToRemove = displayObject;
  }
  if (batchToRemove) {
    var index = this.batchs.indexOf(batchToRemove);
    if (index == -1)
      return;
    if (index == 0 || index == this.batchs.length - 1) {
      this.batchs.splice(index, 1);
      if (batchToRemove instanceof PIXI.WebGLBatch)
        PIXI.WebGLRenderer.returnBatch(batchToRemove);
      return;
    }
    if (this.batchs[index - 1] instanceof PIXI.WebGLBatch && this.batchs[index + 1] instanceof PIXI.WebGLBatch) {
      if (this.batchs[index - 1].texture == this.batchs[index + 1].texture && this.batchs[index - 1].blendMode == this.batchs[index + 1].blendMode) {
        this.batchs[index - 1].merge(this.batchs[index + 1]);
        if (batchToRemove instanceof PIXI.WebGLBatch)
          PIXI.WebGLRenderer.returnBatch(batchToRemove);
        PIXI.WebGLRenderer.returnBatch(this.batchs[index + 1]);
        this.batchs.splice(index, 2);
        return;
      }
    }
    this.batchs.splice(index, 1);
    if (batchToRemove instanceof PIXI.WebGLBatch)
      PIXI.WebGLRenderer.returnBatch(batchToRemove);
  }
};
PIXI.WebGLRenderGroup.prototype.initTilingSprite = function (sprite) {
  var gl = this.gl;
  sprite.verticies = new Float32Array([
    0,
    0,
    sprite.width,
    0,
    sprite.width,
    sprite.height,
    0,
    sprite.height
  ]);
  sprite.uvs = new Float32Array([
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1
  ]);
  sprite.colors = new Float32Array([
    1,
    1,
    1,
    1
  ]);
  sprite.indices = new Uint16Array([
    0,
    1,
    3,
    2
  ]);
  sprite._vertexBuffer = gl.createBuffer();
  sprite._indexBuffer = gl.createBuffer();
  sprite._uvBuffer = gl.createBuffer();
  sprite._colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sprite._vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sprite.verticies, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sprite.uvs, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, sprite._colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sprite.colors, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sprite._indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sprite.indices, gl.STATIC_DRAW);
  if (sprite.texture.baseTexture._glTexture) {
    gl.bindTexture(gl.TEXTURE_2D, sprite.texture.baseTexture._glTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    sprite.texture.baseTexture._powerOf2 = true;
  } else {
    sprite.texture.baseTexture._powerOf2 = true;
  }
};
PIXI.WebGLRenderGroup.prototype.renderStrip = function (strip, projection) {
  var gl = this.gl;
  var shaderProgram = PIXI.stripShaderProgram;
  gl.useProgram(shaderProgram);
  var m = PIXI.mat3.clone(strip.worldTransform);
  PIXI.mat3.transpose(m);
  gl.uniformMatrix3fv(shaderProgram.translationMatrix, false, m);
  gl.uniform2f(shaderProgram.projectionVector, projection.x, projection.y);
  gl.uniform1f(shaderProgram.alpha, strip.worldAlpha);
  if (!strip.dirty) {
    gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, strip.verticies);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
    gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
  } else {
    strip.dirty = false;
    gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, strip.uvs, gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
    gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
  }
  gl.drawElements(gl.TRIANGLE_STRIP, strip.indices.length, gl.UNSIGNED_SHORT, 0);
  gl.useProgram(PIXI.currentProgram);
};
PIXI.WebGLRenderGroup.prototype.renderTilingSprite = function (sprite, projectionMatrix) {
  var gl = this.gl;
  var shaderProgram = PIXI.shaderProgram;
  var tilePosition = sprite.tilePosition;
  var tileScale = sprite.tileScale;
  var offsetX = tilePosition.x / sprite.texture.baseTexture.width;
  var offsetY = tilePosition.y / sprite.texture.baseTexture.height;
  var scaleX = sprite.width / sprite.texture.baseTexture.width / tileScale.x;
  var scaleY = sprite.height / sprite.texture.baseTexture.height / tileScale.y;
  sprite.uvs[0] = 0 - offsetX;
  sprite.uvs[1] = 0 - offsetY;
  sprite.uvs[2] = 1 * scaleX - offsetX;
  sprite.uvs[3] = 0 - offsetY;
  sprite.uvs[4] = 1 * scaleX - offsetX;
  sprite.uvs[5] = 1 * scaleY - offsetY;
  sprite.uvs[6] = 0 - offsetX;
  sprite.uvs[7] = 1 * scaleY - offsetY;
  gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, sprite.uvs);
  this.renderStrip(sprite, projectionMatrix);
};
PIXI.WebGLRenderGroup.prototype.initStrip = function (strip) {
  var gl = this.gl;
  var shaderProgram = this.shaderProgram;
  strip._vertexBuffer = gl.createBuffer();
  strip._indexBuffer = gl.createBuffer();
  strip._uvBuffer = gl.createBuffer();
  strip._colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, strip.uvs, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
};
PIXI.CanvasRenderer = function (width, height, view, transparent) {
  this.transparent = transparent;
  this.width = width || 800;
  this.height = height || 600;
  this.view = view || document.createElement("canvas");
  this.context = this.view.getContext("2d");
  this.smoothProperty = null;
  if ("imageSmoothingEnabled" in this.context)
    this.smoothProperty = "imageSmoothingEnabled";
  else if ("webkitImageSmoothingEnabled" in this.context)
    this.smoothProperty = "webkitImageSmoothingEnabled";
  else if ("mozImageSmoothingEnabled" in this.context)
    this.smoothProperty = "mozImageSmoothingEnabled";
  else if ("oImageSmoothingEnabled" in this.context)
    this.smoothProperty = "oImageSmoothingEnabled";
  this.scaleMode = null;
  this.refresh = true;
  this.view.width = this.width;
  this.view.height = this.height;
  this.count = 0;
};
PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;
PIXI.CanvasRenderer.prototype.render = function (stage) {
  PIXI.texturesToUpdate = [];
  PIXI.texturesToDestroy = [];
  PIXI.visibleCount++;
  stage.updateTransform();
  if (this.view.style.backgroundColor != stage.backgroundColorString && !this.transparent)
    this.view.style.backgroundColor = stage.backgroundColorString;
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.width, this.height);
  this.renderDisplayObject(stage);
  if (stage.interactive) {
    if (!stage._interactiveEventsAdded) {
      stage._interactiveEventsAdded = true;
      stage.interactionManager.setTarget(this);
    }
  }
  if (PIXI.Texture.frameUpdates.length > 0) {
    PIXI.Texture.frameUpdates = [];
  }
};
PIXI.CanvasRenderer.prototype.resize = function (width, height) {
  this.width = width;
  this.height = height;
  this.view.width = width;
  this.view.height = height;
};
PIXI.CanvasRenderer.prototype.renderDisplayObject = function (displayObject) {
  var transform;
  var context = this.context;
  context.globalCompositeOperation = "source-over";
  var testObject = displayObject.last._iNext;
  displayObject = displayObject.first;
  do {
    transform = displayObject.worldTransform;
    if (!displayObject.visible) {
      displayObject = displayObject.last._iNext;
      continue;
    }
    if (!displayObject.renderable) {
      displayObject = displayObject._iNext;
      continue;
    }
    if (displayObject instanceof PIXI.Sprite) {
      var frame = displayObject.texture.frame;
      if (frame && frame.width && frame.height) {
        context.globalAlpha = displayObject.worldAlpha;
        context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
        if (this.smoothProperty && this.scaleMode !== displayObject.texture.baseTexture.scaleMode) {
          this.scaleMode = displayObject.texture.baseTexture.scaleMode;
          context[this.smoothProperty] = this.scaleMode === PIXI.BaseTexture.SCALE_MODE.LINEAR;
        }
        context.drawImage(displayObject.texture.baseTexture.source, frame.x, frame.y, frame.width, frame.height, displayObject.anchor.x * -frame.width, displayObject.anchor.y * -frame.height, frame.width, frame.height);
      }
    } else if (displayObject instanceof PIXI.Strip) {
      context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
      this.renderStrip(displayObject);
    } else if (displayObject instanceof PIXI.TilingSprite) {
      context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
      this.renderTilingSprite(displayObject);
    } else if (displayObject instanceof PIXI.CustomRenderable) {
      context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
      displayObject.renderCanvas(this);
    } else if (displayObject instanceof PIXI.Graphics) {
      context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
      PIXI.CanvasGraphics.renderGraphics(displayObject, context);
    } else if (displayObject instanceof PIXI.FilterBlock) {
      if (displayObject.data instanceof PIXI.Graphics) {
        var mask = displayObject.data;
        if (displayObject.open) {
          context.save();
          var cacheAlpha = mask.alpha;
          var maskTransform = mask.worldTransform;
          context.setTransform(maskTransform[0], maskTransform[3], maskTransform[1], maskTransform[4], maskTransform[2], maskTransform[5]);
          mask.worldAlpha = 0.5;
          context.worldAlpha = 0;
          PIXI.CanvasGraphics.renderGraphicsMask(mask, context);
          context.clip();
          mask.worldAlpha = cacheAlpha;
        } else {
          context.restore();
        }
      } else {
      }
    }
    displayObject = displayObject._iNext;
  } while (displayObject != testObject);
};
PIXI.CanvasRenderer.prototype.renderStripFlat = function (strip) {
  var context = this.context;
  var verticies = strip.verticies;
  var uvs = strip.uvs;
  var length = verticies.length / 2;
  this.count++;
  context.beginPath();
  for (var i = 1; i < length - 2; i++) {
    var index = i * 2;
    var x0 = verticies[index], x1 = verticies[index + 2], x2 = verticies[index + 4];
    var y0 = verticies[index + 1], y1 = verticies[index + 3], y2 = verticies[index + 5];
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
  }
  ;
  context.fillStyle = "#FF0000";
  context.fill();
  context.closePath();
};
PIXI.CanvasRenderer.prototype.renderTilingSprite = function (sprite) {
  var context = this.context;
  context.globalAlpha = sprite.worldAlpha;
  if (!sprite.__tilePattern)
    sprite.__tilePattern = context.createPattern(sprite.texture.baseTexture.source, "repeat");
  context.beginPath();
  var tilePosition = sprite.tilePosition;
  var tileScale = sprite.tileScale;
  context.scale(tileScale.x, tileScale.y);
  context.translate(tilePosition.x, tilePosition.y);
  context.fillStyle = sprite.__tilePattern;
  context.fillRect(-tilePosition.x, -tilePosition.y, sprite.width / tileScale.x, sprite.height / tileScale.y);
  context.scale(1 / tileScale.x, 1 / tileScale.y);
  context.translate(-tilePosition.x, -tilePosition.y);
  context.closePath();
};
PIXI.CanvasRenderer.prototype.renderStrip = function (strip) {
  var context = this.context;
  var verticies = strip.verticies;
  var uvs = strip.uvs;
  var length = verticies.length / 2;
  this.count++;
  for (var i = 1; i < length - 2; i++) {
    var index = i * 2;
    var x0 = verticies[index], x1 = verticies[index + 2], x2 = verticies[index + 4];
    var y0 = verticies[index + 1], y1 = verticies[index + 3], y2 = verticies[index + 5];
    var u0 = uvs[index] * strip.texture.width, u1 = uvs[index + 2] * strip.texture.width, u2 = uvs[index + 4] * strip.texture.width;
    var v0 = uvs[index + 1] * strip.texture.height, v1 = uvs[index + 3] * strip.texture.height, v2 = uvs[index + 5] * strip.texture.height;
    context.save();
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.clip();
    var delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
    var delta_a = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
    var delta_b = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
    var delta_c = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2;
    var delta_d = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
    var delta_e = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
    var delta_f = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2;
    context.transform(delta_a / delta, delta_d / delta, delta_b / delta, delta_e / delta, delta_c / delta, delta_f / delta);
    context.drawImage(strip.texture.baseTexture.source, 0, 0);
    context.restore();
  }
  ;
};
PIXI.CanvasGraphics = function () {
};
PIXI.CanvasGraphics.renderGraphics = function (graphics, context) {
  var worldAlpha = graphics.worldAlpha;
  for (var i = 0; i < graphics.graphicsData.length; i++) {
    var data = graphics.graphicsData[i];
    var points = data.points;
    context.strokeStyle = color = "#" + ("00000" + (data.lineColor | 0).toString(16)).substr(-6);
    context.lineWidth = data.lineWidth;
    if (data.type == PIXI.Graphics.POLY) {
      context.beginPath();
      context.moveTo(points[0], points[1]);
      for (var j = 1; j < points.length / 2; j++) {
        context.lineTo(points[j * 2], points[j * 2 + 1]);
      }
      if (points[0] == points[points.length - 2] && points[1] == points[points.length - 1]) {
        context.closePath();
      }
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.stroke();
      }
    } else if (data.type == PIXI.Graphics.RECT) {
      if (data.fillColor || data.fillColor === 0) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
        context.fillRect(points[0], points[1], points[2], points[3]);
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeRect(points[0], points[1], points[2], points[3]);
      }
    } else if (data.type == PIXI.Graphics.CIRC) {
      context.beginPath();
      context.arc(points[0], points[1], points[2], 0, 2 * Math.PI);
      context.closePath();
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.stroke();
      }
    } else if (data.type == PIXI.Graphics.ELIP) {
      var elipseData = data.points;
      var w = elipseData[2] * 2;
      var h = elipseData[3] * 2;
      var x = elipseData[0] - w / 2;
      var y = elipseData[1] - h / 2;
      context.beginPath();
      var kappa = 0.5522848, ox = w / 2 * kappa, oy = h / 2 * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
      context.moveTo(x, ym);
      context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      context.closePath();
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.stroke();
      }
    }
  }
  ;
};
PIXI.CanvasGraphics.renderGraphicsMask = function (graphics, context) {
  var worldAlpha = graphics.worldAlpha;
  var len = graphics.graphicsData.length;
  if (len > 1) {
    len = 1;
    console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object");
  }
  for (var i = 0; i < 1; i++) {
    var data = graphics.graphicsData[i];
    var points = data.points;
    if (data.type == PIXI.Graphics.POLY) {
      context.beginPath();
      context.moveTo(points[0], points[1]);
      for (var j = 1; j < points.length / 2; j++) {
        context.lineTo(points[j * 2], points[j * 2 + 1]);
      }
      if (points[0] == points[points.length - 2] && points[1] == points[points.length - 1]) {
        context.closePath();
      }
    } else if (data.type == PIXI.Graphics.RECT) {
      context.beginPath();
      context.rect(points[0], points[1], points[2], points[3]);
      context.closePath();
    } else if (data.type == PIXI.Graphics.CIRC) {
      context.beginPath();
      context.arc(points[0], points[1], points[2], 0, 2 * Math.PI);
      context.closePath();
    } else if (data.type == PIXI.Graphics.ELIP) {
      var elipseData = data.points;
      var w = elipseData[2] * 2;
      var h = elipseData[3] * 2;
      var x = elipseData[0] - w / 2;
      var y = elipseData[1] - h / 2;
      context.beginPath();
      var kappa = 0.5522848, ox = w / 2 * kappa, oy = h / 2 * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
      context.moveTo(x, ym);
      context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      context.closePath();
    }
  }
  ;
};
PIXI.Graphics = function () {
  PIXI.DisplayObjectContainer.call(this);
  this.renderable = true;
  this.fillAlpha = 1;
  this.lineWidth = 0;
  this.lineColor = "black";
  this.graphicsData = [];
  this.currentPath = { points: [] };
};
PIXI.Graphics.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.Graphics.prototype.constructor = PIXI.Graphics;
PIXI.Graphics.prototype.lineStyle = function (lineWidth, color, alpha) {
  if (this.currentPath.points.length == 0)
    this.graphicsData.pop();
  this.lineWidth = lineWidth || 0;
  this.lineColor = color || 0;
  this.lineAlpha = alpha == undefined ? 1 : alpha;
  this.currentPath = {
    lineWidth: this.lineWidth,
    lineColor: this.lineColor,
    lineAlpha: this.lineAlpha,
    fillColor: this.fillColor,
    fillAlpha: this.fillAlpha,
    fill: this.filling,
    points: [],
    type: PIXI.Graphics.POLY
  };
  this.graphicsData.push(this.currentPath);
};
PIXI.Graphics.prototype.moveTo = function (x, y) {
  if (this.currentPath.points.length == 0)
    this.graphicsData.pop();
  this.currentPath = this.currentPath = {
    lineWidth: this.lineWidth,
    lineColor: this.lineColor,
    lineAlpha: this.lineAlpha,
    fillColor: this.fillColor,
    fillAlpha: this.fillAlpha,
    fill: this.filling,
    points: [],
    type: PIXI.Graphics.POLY
  };
  this.currentPath.points.push(x, y);
  this.graphicsData.push(this.currentPath);
};
PIXI.Graphics.prototype.lineTo = function (x, y) {
  this.currentPath.points.push(x, y);
  this.dirty = true;
};
PIXI.Graphics.prototype.beginFill = function (color, alpha) {
  this.filling = true;
  this.fillColor = color || 0;
  this.fillAlpha = alpha == undefined ? 1 : alpha;
};
PIXI.Graphics.prototype.endFill = function () {
  this.filling = false;
  this.fillColor = null;
  this.fillAlpha = 1;
};
PIXI.Graphics.prototype.drawRect = function (x, y, width, height) {
  if (this.currentPath.points.length == 0)
    this.graphicsData.pop();
  this.currentPath = {
    lineWidth: this.lineWidth,
    lineColor: this.lineColor,
    lineAlpha: this.lineAlpha,
    fillColor: this.fillColor,
    fillAlpha: this.fillAlpha,
    fill: this.filling,
    points: [
      x,
      y,
      width,
      height
    ],
    type: PIXI.Graphics.RECT
  };
  this.graphicsData.push(this.currentPath);
  this.dirty = true;
};
PIXI.Graphics.prototype.drawCircle = function (x, y, radius) {
  if (this.currentPath.points.length == 0)
    this.graphicsData.pop();
  this.currentPath = {
    lineWidth: this.lineWidth,
    lineColor: this.lineColor,
    lineAlpha: this.lineAlpha,
    fillColor: this.fillColor,
    fillAlpha: this.fillAlpha,
    fill: this.filling,
    points: [
      x,
      y,
      radius,
      radius
    ],
    type: PIXI.Graphics.CIRC
  };
  this.graphicsData.push(this.currentPath);
  this.dirty = true;
};
PIXI.Graphics.prototype.drawElipse = function (x, y, width, height) {
  if (this.currentPath.points.length == 0)
    this.graphicsData.pop();
  this.currentPath = {
    lineWidth: this.lineWidth,
    lineColor: this.lineColor,
    lineAlpha: this.lineAlpha,
    fillColor: this.fillColor,
    fillAlpha: this.fillAlpha,
    fill: this.filling,
    points: [
      x,
      y,
      width,
      height
    ],
    type: PIXI.Graphics.ELIP
  };
  this.graphicsData.push(this.currentPath);
  this.dirty = true;
};
PIXI.Graphics.prototype.clear = function () {
  this.lineWidth = 0;
  this.filling = false;
  this.dirty = true;
  this.clearDirty = true;
  this.graphicsData = [];
};
PIXI.Graphics.POLY = 0;
PIXI.Graphics.RECT = 1;
PIXI.Graphics.CIRC = 2;
PIXI.Graphics.ELIP = 3;
PIXI.Strip = function (texture, width, height) {
  PIXI.DisplayObjectContainer.call(this);
  this.texture = texture;
  this.blendMode = PIXI.blendModes.NORMAL;
  try {
    this.uvs = new Float32Array([
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      1
    ]);
    this.verticies = new Float32Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
    this.colors = new Float32Array([
      1,
      1,
      1,
      1
    ]);
    this.indices = new Uint16Array([
      0,
      1,
      2,
      3
    ]);
  } catch (error) {
    this.uvs = [
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      1
    ];
    this.verticies = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    this.colors = [
      1,
      1,
      1,
      1
    ];
    this.indices = [
      0,
      1,
      2,
      3
    ];
  }
  this.width = width;
  this.height = height;
  if (texture.baseTexture.hasLoaded) {
    this.width = this.texture.frame.width;
    this.height = this.texture.frame.height;
    this.updateFrame = true;
  } else {
    this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
    this.texture.addEventListener("update", this.onTextureUpdateBind);
  }
  this.renderable = true;
};
PIXI.Strip.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.Strip.prototype.constructor = PIXI.Strip;
PIXI.Strip.prototype.setTexture = function (texture) {
  this.texture = texture;
  this.width = texture.frame.width;
  this.height = texture.frame.height;
  this.updateFrame = true;
};
PIXI.Strip.prototype.onTextureUpdate = function (event) {
  this.updateFrame = true;
};
PIXI.Rope = function (texture, points) {
  PIXI.Strip.call(this, texture);
  this.points = points;
  try {
    this.verticies = new Float32Array(points.length * 4);
    this.uvs = new Float32Array(points.length * 4);
    this.colors = new Float32Array(points.length * 2);
    this.indices = new Uint16Array(points.length * 2);
  } catch (error) {
    this.verticies = verticies;
    this.uvs = uvs;
    this.colors = colors;
    this.indices = indices;
  }
  this.refresh();
};
PIXI.Rope.prototype = Object.create(PIXI.Strip.prototype);
PIXI.Rope.prototype.constructor = PIXI.Rope;
PIXI.Rope.prototype.refresh = function () {
  var points = this.points;
  if (points.length < 1)
    return;
  var uvs = this.uvs;
  var indices = this.indices;
  var colors = this.colors;
  var lastPoint = points[0];
  var nextPoint;
  var perp = {
      x: 0,
      y: 0
    };
  var point = points[0];
  this.count -= 0.2;
  uvs[0] = 0;
  uvs[1] = 1;
  uvs[2] = 0;
  uvs[3] = 1;
  colors[0] = 1;
  colors[1] = 1;
  indices[0] = 0;
  indices[1] = 1;
  var total = points.length;
  for (var i = 1; i < total; i++) {
    var point = points[i];
    var index = i * 4;
    var amount = i / (total - 1);
    if (i % 2) {
      uvs[index] = amount;
      uvs[index + 1] = 0;
      uvs[index + 2] = amount;
      uvs[index + 3] = 1;
    } else {
      uvs[index] = amount;
      uvs[index + 1] = 0;
      uvs[index + 2] = amount;
      uvs[index + 3] = 1;
    }
    index = i * 2;
    colors[index] = 1;
    colors[index + 1] = 1;
    index = i * 2;
    indices[index] = index;
    indices[index + 1] = index + 1;
    lastPoint = point;
  }
};
PIXI.Rope.prototype.updateTransform = function () {
  var points = this.points;
  if (points.length < 1)
    return;
  var verticies = this.verticies;
  var lastPoint = points[0];
  var nextPoint;
  var perp = {
      x: 0,
      y: 0
    };
  var point = points[0];
  this.count -= 0.2;
  verticies[0] = point.x + perp.x;
  verticies[1] = point.y + perp.y;
  verticies[2] = point.x - perp.x;
  verticies[3] = point.y - perp.y;
  var total = points.length;
  for (var i = 1; i < total; i++) {
    var point = points[i];
    var index = i * 4;
    if (i < points.length - 1) {
      nextPoint = points[i + 1];
    } else {
      nextPoint = point;
    }
    perp.y = -(nextPoint.x - lastPoint.x);
    perp.x = nextPoint.y - lastPoint.y;
    var ratio = (1 - i / (total - 1)) * 10;
    if (ratio > 1)
      ratio = 1;
    var perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
    var num = this.texture.height / 2;
    perp.x /= perpLength;
    perp.y /= perpLength;
    perp.x *= num;
    perp.y *= num;
    verticies[index] = point.x + perp.x;
    verticies[index + 1] = point.y + perp.y;
    verticies[index + 2] = point.x - perp.x;
    verticies[index + 3] = point.y - perp.y;
    lastPoint = point;
  }
  PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};
PIXI.Rope.prototype.setTexture = function (texture) {
  this.texture = texture;
  this.updateFrame = true;
};
PIXI.TilingSprite = function (texture, width, height) {
  PIXI.DisplayObjectContainer.call(this);
  this.texture = texture;
  this.width = width;
  this.height = height;
  this.tileScale = new PIXI.Point(1, 1);
  this.tilePosition = new PIXI.Point(0, 0);
  this.renderable = true;
  this.blendMode = PIXI.blendModes.NORMAL;
};
PIXI.TilingSprite.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.TilingSprite.prototype.constructor = PIXI.TilingSprite;
PIXI.TilingSprite.prototype.setTexture = function (texture) {
  this.texture = texture;
  this.updateFrame = true;
};
PIXI.TilingSprite.prototype.onTextureUpdate = function (event) {
  this.updateFrame = true;
};
PIXI.Spine = function (url) {
  PIXI.DisplayObjectContainer.call(this);
  this.spineData = PIXI.AnimCache[url];
  if (!this.spineData) {
    throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + url);
  }
  this.skeleton = new spine.Skeleton(this.spineData);
  this.skeleton.updateWorldTransform();
  this.stateData = new spine.AnimationStateData(this.spineData);
  this.state = new spine.AnimationState(this.stateData);
  this.slotContainers = [];
  for (var i = 0, n = this.skeleton.drawOrder.length; i < n; i++) {
    var slot = this.skeleton.drawOrder[i];
    var attachment = slot.attachment;
    var slotContainer = new PIXI.DisplayObjectContainer();
    this.slotContainers.push(slotContainer);
    this.addChild(slotContainer);
    if (!(attachment instanceof spine.RegionAttachment)) {
      continue;
    }
    var spriteName = attachment.rendererObject.name;
    var sprite = this.createSprite(slot, attachment.rendererObject);
    slot.currentSprite = sprite;
    slot.currentSpriteName = spriteName;
    slotContainer.addChild(sprite);
  }
};
PIXI.Spine.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.Spine.prototype.constructor = PIXI.Spine;
PIXI.Spine.prototype.updateTransform = function () {
  this.lastTime = this.lastTime || Date.now();
  var timeDelta = (Date.now() - this.lastTime) * 0.001;
  this.lastTime = Date.now();
  this.state.update(timeDelta);
  this.state.apply(this.skeleton);
  this.skeleton.updateWorldTransform();
  var drawOrder = this.skeleton.drawOrder;
  for (var i = 0, n = drawOrder.length; i < n; i++) {
    var slot = drawOrder[i];
    var attachment = slot.attachment;
    var slotContainer = this.slotContainers[i];
    if (!(attachment instanceof spine.RegionAttachment)) {
      slotContainer.visible = false;
      continue;
    }
    if (attachment.rendererObject) {
      if (!slot.currentSpriteName || slot.currentSpriteName != attachment.name) {
        var spriteName = attachment.rendererObject.name;
        if (slot.currentSprite !== undefined) {
          slot.currentSprite.visible = false;
        }
        slot.sprites = slot.sprites || {};
        if (slot.sprites[spriteName] !== undefined) {
          slot.sprites[spriteName].visible = true;
        } else {
          var sprite = this.createSprite(slot, attachment.rendererObject);
          slotContainer.addChild(sprite);
        }
        slot.currentSprite = slot.sprites[spriteName];
        slot.currentSpriteName = spriteName;
      }
    }
    slotContainer.visible = true;
    var bone = slot.bone;
    slotContainer.position.x = bone.worldX + attachment.x * bone.m00 + attachment.y * bone.m01;
    slotContainer.position.y = bone.worldY + attachment.x * bone.m10 + attachment.y * bone.m11;
    slotContainer.scale.x = bone.worldScaleX;
    slotContainer.scale.y = bone.worldScaleY;
    slotContainer.rotation = -(slot.bone.worldRotation * Math.PI / 180);
  }
  PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};
PIXI.Spine.prototype.createSprite = function (slot, descriptor) {
  var name = PIXI.TextureCache[descriptor.name] ? descriptor.name : descriptor.name + ".png";
  var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(name));
  sprite.scale = descriptor.scale;
  sprite.rotation = descriptor.rotation;
  sprite.anchor.x = sprite.anchor.y = 0.5;
  slot.sprites = slot.sprites || {};
  slot.sprites[descriptor.name] = sprite;
  return sprite;
};
var spine = {};
spine.BoneData = function (name, parent) {
  this.name = name;
  this.parent = parent;
};
spine.BoneData.prototype = {
  length: 0,
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1
};
spine.SlotData = function (name, boneData) {
  this.name = name;
  this.boneData = boneData;
};
spine.SlotData.prototype = {
  r: 1,
  g: 1,
  b: 1,
  a: 1,
  attachmentName: null
};
spine.Bone = function (boneData, parent) {
  this.data = boneData;
  this.parent = parent;
  this.setToSetupPose();
};
spine.Bone.yDown = false;
spine.Bone.prototype = {
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  m00: 0,
  m01: 0,
  worldX: 0,
  m10: 0,
  m11: 0,
  worldY: 0,
  worldRotation: 0,
  worldScaleX: 1,
  worldScaleY: 1,
  updateWorldTransform: function (flipX, flipY) {
    var parent = this.parent;
    if (parent != null) {
      this.worldX = this.x * parent.m00 + this.y * parent.m01 + parent.worldX;
      this.worldY = this.x * parent.m10 + this.y * parent.m11 + parent.worldY;
      this.worldScaleX = parent.worldScaleX * this.scaleX;
      this.worldScaleY = parent.worldScaleY * this.scaleY;
      this.worldRotation = parent.worldRotation + this.rotation;
    } else {
      this.worldX = this.x;
      this.worldY = this.y;
      this.worldScaleX = this.scaleX;
      this.worldScaleY = this.scaleY;
      this.worldRotation = this.rotation;
    }
    var radians = this.worldRotation * Math.PI / 180;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    this.m00 = cos * this.worldScaleX;
    this.m10 = sin * this.worldScaleX;
    this.m01 = -sin * this.worldScaleY;
    this.m11 = cos * this.worldScaleY;
    if (flipX) {
      this.m00 = -this.m00;
      this.m01 = -this.m01;
    }
    if (flipY) {
      this.m10 = -this.m10;
      this.m11 = -this.m11;
    }
    if (spine.Bone.yDown) {
      this.m10 = -this.m10;
      this.m11 = -this.m11;
    }
  },
  setToSetupPose: function () {
    var data = this.data;
    this.x = data.x;
    this.y = data.y;
    this.rotation = data.rotation;
    this.scaleX = data.scaleX;
    this.scaleY = data.scaleY;
  }
};
spine.Slot = function (slotData, skeleton, bone) {
  this.data = slotData;
  this.skeleton = skeleton;
  this.bone = bone;
  this.setToSetupPose();
};
spine.Slot.prototype = {
  r: 1,
  g: 1,
  b: 1,
  a: 1,
  _attachmentTime: 0,
  attachment: null,
  setAttachment: function (attachment) {
    this.attachment = attachment;
    this._attachmentTime = this.skeleton.time;
  },
  setAttachmentTime: function (time) {
    this._attachmentTime = this.skeleton.time - time;
  },
  getAttachmentTime: function () {
    return this.skeleton.time - this._attachmentTime;
  },
  setToSetupPose: function () {
    var data = this.data;
    this.r = data.r;
    this.g = data.g;
    this.b = data.b;
    this.a = data.a;
    var slotDatas = this.skeleton.data.slots;
    for (var i = 0, n = slotDatas.length; i < n; i++) {
      if (slotDatas[i] == data) {
        this.setAttachment(!data.attachmentName ? null : this.skeleton.getAttachmentBySlotIndex(i, data.attachmentName));
        break;
      }
    }
  }
};
spine.Skin = function (name) {
  this.name = name;
  this.attachments = {};
};
spine.Skin.prototype = {
  addAttachment: function (slotIndex, name, attachment) {
    this.attachments[slotIndex + ":" + name] = attachment;
  },
  getAttachment: function (slotIndex, name) {
    return this.attachments[slotIndex + ":" + name];
  },
  _attachAll: function (skeleton, oldSkin) {
    for (var key in oldSkin.attachments) {
      var colon = key.indexOf(":");
      var slotIndex = parseInt(key.substring(0, colon));
      var name = key.substring(colon + 1);
      var slot = skeleton.slots[slotIndex];
      if (slot.attachment && slot.attachment.name == name) {
        var attachment = this.getAttachment(slotIndex, name);
        if (attachment)
          slot.setAttachment(attachment);
      }
    }
  }
};
spine.Animation = function (name, timelines, duration) {
  this.name = name;
  this.timelines = timelines;
  this.duration = duration;
};
spine.Animation.prototype = {
  apply: function (skeleton, time, loop) {
    if (loop && this.duration != 0)
      time %= this.duration;
    var timelines = this.timelines;
    for (var i = 0, n = timelines.length; i < n; i++)
      timelines[i].apply(skeleton, time, 1);
  },
  mix: function (skeleton, time, loop, alpha) {
    if (loop && this.duration != 0)
      time %= this.duration;
    var timelines = this.timelines;
    for (var i = 0, n = timelines.length; i < n; i++)
      timelines[i].apply(skeleton, time, alpha);
  }
};
spine.binarySearch = function (values, target, step) {
  var low = 0;
  var high = Math.floor(values.length / step) - 2;
  if (high == 0)
    return step;
  var current = high >>> 1;
  while (true) {
    if (values[(current + 1) * step] <= target)
      low = current + 1;
    else
      high = current;
    if (low == high)
      return (low + 1) * step;
    current = low + high >>> 1;
  }
};
spine.linearSearch = function (values, target, step) {
  for (var i = 0, last = values.length - step; i <= last; i += step)
    if (values[i] > target)
      return i;
  return -1;
};
spine.Curves = function (frameCount) {
  this.curves = [];
  this.curves.length = (frameCount - 1) * 6;
};
spine.Curves.prototype = {
  setLinear: function (frameIndex) {
    this.curves[frameIndex * 6] = 0;
  },
  setStepped: function (frameIndex) {
    this.curves[frameIndex * 6] = -1;
  },
  setCurve: function (frameIndex, cx1, cy1, cx2, cy2) {
    var subdiv_step = 1 / 10;
    var subdiv_step2 = subdiv_step * subdiv_step;
    var subdiv_step3 = subdiv_step2 * subdiv_step;
    var pre1 = 3 * subdiv_step;
    var pre2 = 3 * subdiv_step2;
    var pre4 = 6 * subdiv_step2;
    var pre5 = 6 * subdiv_step3;
    var tmp1x = -cx1 * 2 + cx2;
    var tmp1y = -cy1 * 2 + cy2;
    var tmp2x = (cx1 - cx2) * 3 + 1;
    var tmp2y = (cy1 - cy2) * 3 + 1;
    var i = frameIndex * 6;
    var curves = this.curves;
    curves[i] = cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
    curves[i + 1] = cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;
    curves[i + 2] = tmp1x * pre4 + tmp2x * pre5;
    curves[i + 3] = tmp1y * pre4 + tmp2y * pre5;
    curves[i + 4] = tmp2x * pre5;
    curves[i + 5] = tmp2y * pre5;
  },
  getCurvePercent: function (frameIndex, percent) {
    percent = percent < 0 ? 0 : percent > 1 ? 1 : percent;
    var curveIndex = frameIndex * 6;
    var curves = this.curves;
    var dfx = curves[curveIndex];
    if (!dfx)
      return percent;
    if (dfx == -1)
      return 0;
    var dfy = curves[curveIndex + 1];
    var ddfx = curves[curveIndex + 2];
    var ddfy = curves[curveIndex + 3];
    var dddfx = curves[curveIndex + 4];
    var dddfy = curves[curveIndex + 5];
    var x = dfx, y = dfy;
    var i = 10 - 2;
    while (true) {
      if (x >= percent) {
        var lastX = x - dfx;
        var lastY = y - dfy;
        return lastY + (y - lastY) * (percent - lastX) / (x - lastX);
      }
      if (i == 0)
        break;
      i--;
      dfx += ddfx;
      dfy += ddfy;
      ddfx += dddfx;
      ddfy += dddfy;
      x += dfx;
      y += dfy;
    }
    return y + (1 - y) * (percent - x) / (1 - x);
  }
};
spine.RotateTimeline = function (frameCount) {
  this.curves = new spine.Curves(frameCount);
  this.frames = [];
  this.frames.length = frameCount * 2;
};
spine.RotateTimeline.prototype = {
  boneIndex: 0,
  getFrameCount: function () {
    return this.frames.length / 2;
  },
  setFrame: function (frameIndex, time, angle) {
    frameIndex *= 2;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = angle;
  },
  apply: function (skeleton, time, alpha) {
    var frames = this.frames;
    if (time < frames[0])
      return;
    var bone = skeleton.bones[this.boneIndex];
    if (time >= frames[frames.length - 2]) {
      var amount = bone.data.rotation + frames[frames.length - 1] - bone.rotation;
      while (amount > 180)
        amount -= 360;
      while (amount < -180)
        amount += 360;
      bone.rotation += amount * alpha;
      return;
    }
    var frameIndex = spine.binarySearch(frames, time, 2);
    var lastFrameValue = frames[frameIndex - 1];
    var frameTime = frames[frameIndex];
    var percent = 1 - (time - frameTime) / (frames[frameIndex - 2] - frameTime);
    percent = this.curves.getCurvePercent(frameIndex / 2 - 1, percent);
    var amount = frames[frameIndex + 1] - lastFrameValue;
    while (amount > 180)
      amount -= 360;
    while (amount < -180)
      amount += 360;
    amount = bone.data.rotation + (lastFrameValue + amount * percent) - bone.rotation;
    while (amount > 180)
      amount -= 360;
    while (amount < -180)
      amount += 360;
    bone.rotation += amount * alpha;
  }
};
spine.TranslateTimeline = function (frameCount) {
  this.curves = new spine.Curves(frameCount);
  this.frames = [];
  this.frames.length = frameCount * 3;
};
spine.TranslateTimeline.prototype = {
  boneIndex: 0,
  getFrameCount: function () {
    return this.frames.length / 3;
  },
  setFrame: function (frameIndex, time, x, y) {
    frameIndex *= 3;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = x;
    this.frames[frameIndex + 2] = y;
  },
  apply: function (skeleton, time, alpha) {
    var frames = this.frames;
    if (time < frames[0])
      return;
    var bone = skeleton.bones[this.boneIndex];
    if (time >= frames[frames.length - 3]) {
      bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha;
      bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha;
      return;
    }
    var frameIndex = spine.binarySearch(frames, time, 3);
    var lastFrameX = frames[frameIndex - 2];
    var lastFrameY = frames[frameIndex - 1];
    var frameTime = frames[frameIndex];
    var percent = 1 - (time - frameTime) / (frames[frameIndex + -3] - frameTime);
    percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);
    bone.x += (bone.data.x + lastFrameX + (frames[frameIndex + 1] - lastFrameX) * percent - bone.x) * alpha;
    bone.y += (bone.data.y + lastFrameY + (frames[frameIndex + 2] - lastFrameY) * percent - bone.y) * alpha;
  }
};
spine.ScaleTimeline = function (frameCount) {
  this.curves = new spine.Curves(frameCount);
  this.frames = [];
  this.frames.length = frameCount * 3;
};
spine.ScaleTimeline.prototype = {
  boneIndex: 0,
  getFrameCount: function () {
    return this.frames.length / 3;
  },
  setFrame: function (frameIndex, time, x, y) {
    frameIndex *= 3;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = x;
    this.frames[frameIndex + 2] = y;
  },
  apply: function (skeleton, time, alpha) {
    var frames = this.frames;
    if (time < frames[0])
      return;
    var bone = skeleton.bones[this.boneIndex];
    if (time >= frames[frames.length - 3]) {
      bone.scaleX += (bone.data.scaleX - 1 + frames[frames.length - 2] - bone.scaleX) * alpha;
      bone.scaleY += (bone.data.scaleY - 1 + frames[frames.length - 1] - bone.scaleY) * alpha;
      return;
    }
    var frameIndex = spine.binarySearch(frames, time, 3);
    var lastFrameX = frames[frameIndex - 2];
    var lastFrameY = frames[frameIndex - 1];
    var frameTime = frames[frameIndex];
    var percent = 1 - (time - frameTime) / (frames[frameIndex + -3] - frameTime);
    percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);
    bone.scaleX += (bone.data.scaleX - 1 + lastFrameX + (frames[frameIndex + 1] - lastFrameX) * percent - bone.scaleX) * alpha;
    bone.scaleY += (bone.data.scaleY - 1 + lastFrameY + (frames[frameIndex + 2] - lastFrameY) * percent - bone.scaleY) * alpha;
  }
};
spine.ColorTimeline = function (frameCount) {
  this.curves = new spine.Curves(frameCount);
  this.frames = [];
  this.frames.length = frameCount * 5;
};
spine.ColorTimeline.prototype = {
  slotIndex: 0,
  getFrameCount: function () {
    return this.frames.length / 2;
  },
  setFrame: function (frameIndex, time, x, y) {
    frameIndex *= 5;
    this.frames[frameIndex] = time;
    this.frames[frameIndex + 1] = r;
    this.frames[frameIndex + 2] = g;
    this.frames[frameIndex + 3] = b;
    this.frames[frameIndex + 4] = a;
  },
  apply: function (skeleton, time, alpha) {
    var frames = this.frames;
    if (time < frames[0])
      return;
    var slot = skeleton.slots[this.slotIndex];
    if (time >= frames[frames.length - 5]) {
      var i = frames.length - 1;
      slot.r = frames[i - 3];
      slot.g = frames[i - 2];
      slot.b = frames[i - 1];
      slot.a = frames[i];
      return;
    }
    var frameIndex = spine.binarySearch(frames, time, 5);
    var lastFrameR = frames[frameIndex - 4];
    var lastFrameG = frames[frameIndex - 3];
    var lastFrameB = frames[frameIndex - 2];
    var lastFrameA = frames[frameIndex - 1];
    var frameTime = frames[frameIndex];
    var percent = 1 - (time - frameTime) / (frames[frameIndex - 5] - frameTime);
    percent = this.curves.getCurvePercent(frameIndex / 5 - 1, percent);
    var r = lastFrameR + (frames[frameIndex + 1] - lastFrameR) * percent;
    var g = lastFrameG + (frames[frameIndex + 2] - lastFrameG) * percent;
    var b = lastFrameB + (frames[frameIndex + 3] - lastFrameB) * percent;
    var a = lastFrameA + (frames[frameIndex + 4] - lastFrameA) * percent;
    if (alpha < 1) {
      slot.r += (r - slot.r) * alpha;
      slot.g += (g - slot.g) * alpha;
      slot.b += (b - slot.b) * alpha;
      slot.a += (a - slot.a) * alpha;
    } else {
      slot.r = r;
      slot.g = g;
      slot.b = b;
      slot.a = a;
    }
  }
};
spine.AttachmentTimeline = function (frameCount) {
  this.curves = new spine.Curves(frameCount);
  this.frames = [];
  this.frames.length = frameCount;
  this.attachmentNames = [];
  this.attachmentNames.length = frameCount;
};
spine.AttachmentTimeline.prototype = {
  slotIndex: 0,
  getFrameCount: function () {
    return this.frames.length;
  },
  setFrame: function (frameIndex, time, attachmentName) {
    this.frames[frameIndex] = time;
    this.attachmentNames[frameIndex] = attachmentName;
  },
  apply: function (skeleton, time, alpha) {
    var frames = this.frames;
    if (time < frames[0])
      return;
    var frameIndex;
    if (time >= frames[frames.length - 1])
      frameIndex = frames.length - 1;
    else
      frameIndex = spine.binarySearch(frames, time, 1) - 1;
    var attachmentName = this.attachmentNames[frameIndex];
    skeleton.slots[this.slotIndex].setAttachment(!attachmentName ? null : skeleton.getAttachmentBySlotIndex(this.slotIndex, attachmentName));
  }
};
spine.SkeletonData = function () {
  this.bones = [];
  this.slots = [];
  this.skins = [];
  this.animations = [];
};
spine.SkeletonData.prototype = {
  defaultSkin: null,
  findBone: function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
      if (bones[i].name == boneName)
        return bones[i];
    return null;
  },
  findBoneIndex: function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
      if (bones[i].name == boneName)
        return i;
    return -1;
  },
  findSlot: function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++) {
      if (slots[i].name == slotName)
        return slot[i];
    }
    return null;
  },
  findSlotIndex: function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++)
      if (slots[i].name == slotName)
        return i;
    return -1;
  },
  findSkin: function (skinName) {
    var skins = this.skins;
    for (var i = 0, n = skins.length; i < n; i++)
      if (skins[i].name == skinName)
        return skins[i];
    return null;
  },
  findAnimation: function (animationName) {
    var animations = this.animations;
    for (var i = 0, n = animations.length; i < n; i++)
      if (animations[i].name == animationName)
        return animations[i];
    return null;
  }
};
spine.Skeleton = function (skeletonData) {
  this.data = skeletonData;
  this.bones = [];
  for (var i = 0, n = skeletonData.bones.length; i < n; i++) {
    var boneData = skeletonData.bones[i];
    var parent = !boneData.parent ? null : this.bones[skeletonData.bones.indexOf(boneData.parent)];
    this.bones.push(new spine.Bone(boneData, parent));
  }
  this.slots = [];
  this.drawOrder = [];
  for (var i = 0, n = skeletonData.slots.length; i < n; i++) {
    var slotData = skeletonData.slots[i];
    var bone = this.bones[skeletonData.bones.indexOf(slotData.boneData)];
    var slot = new spine.Slot(slotData, this, bone);
    this.slots.push(slot);
    this.drawOrder.push(slot);
  }
};
spine.Skeleton.prototype = {
  x: 0,
  y: 0,
  skin: null,
  r: 1,
  g: 1,
  b: 1,
  a: 1,
  time: 0,
  flipX: false,
  flipY: false,
  updateWorldTransform: function () {
    var flipX = this.flipX;
    var flipY = this.flipY;
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
      bones[i].updateWorldTransform(flipX, flipY);
  },
  setToSetupPose: function () {
    this.setBonesToSetupPose();
    this.setSlotsToSetupPose();
  },
  setBonesToSetupPose: function () {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
      bones[i].setToSetupPose();
  },
  setSlotsToSetupPose: function () {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++)
      slots[i].setToSetupPose(i);
  },
  getRootBone: function () {
    return this.bones.length == 0 ? null : this.bones[0];
  },
  findBone: function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
      if (bones[i].data.name == boneName)
        return bones[i];
    return null;
  },
  findBoneIndex: function (boneName) {
    var bones = this.bones;
    for (var i = 0, n = bones.length; i < n; i++)
      if (bones[i].data.name == boneName)
        return i;
    return -1;
  },
  findSlot: function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++)
      if (slots[i].data.name == slotName)
        return slots[i];
    return null;
  },
  findSlotIndex: function (slotName) {
    var slots = this.slots;
    for (var i = 0, n = slots.length; i < n; i++)
      if (slots[i].data.name == slotName)
        return i;
    return -1;
  },
  setSkinByName: function (skinName) {
    var skin = this.data.findSkin(skinName);
    if (!skin)
      throw "Skin not found: " + skinName;
    this.setSkin(skin);
  },
  setSkin: function (newSkin) {
    if (this.skin && newSkin)
      newSkin._attachAll(this, this.skin);
    this.skin = newSkin;
  },
  getAttachmentBySlotName: function (slotName, attachmentName) {
    return this.getAttachmentBySlotIndex(this.data.findSlotIndex(slotName), attachmentName);
  },
  getAttachmentBySlotIndex: function (slotIndex, attachmentName) {
    if (this.skin) {
      var attachment = this.skin.getAttachment(slotIndex, attachmentName);
      if (attachment)
        return attachment;
    }
    if (this.data.defaultSkin)
      return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
    return null;
  },
  setAttachment: function (slotName, attachmentName) {
    var slots = this.slots;
    for (var i = 0, n = slots.size; i < n; i++) {
      var slot = slots[i];
      if (slot.data.name == slotName) {
        var attachment = null;
        if (attachmentName) {
          attachment = this.getAttachment(i, attachmentName);
          if (attachment == null)
            throw "Attachment not found: " + attachmentName + ", for slot: " + slotName;
        }
        slot.setAttachment(attachment);
        return;
      }
    }
    throw "Slot not found: " + slotName;
  },
  update: function (delta) {
    time += delta;
  }
};
spine.AttachmentType = { region: 0 };
spine.RegionAttachment = function () {
  this.offset = [];
  this.offset.length = 8;
  this.uvs = [];
  this.uvs.length = 8;
};
spine.RegionAttachment.prototype = {
  x: 0,
  y: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  width: 0,
  height: 0,
  rendererObject: null,
  regionOffsetX: 0,
  regionOffsetY: 0,
  regionWidth: 0,
  regionHeight: 0,
  regionOriginalWidth: 0,
  regionOriginalHeight: 0,
  setUVs: function (u, v, u2, v2, rotate) {
    var uvs = this.uvs;
    if (rotate) {
      uvs[2] = u;
      uvs[3] = v2;
      uvs[4] = u;
      uvs[5] = v;
      uvs[6] = u2;
      uvs[7] = v;
      uvs[0] = u2;
      uvs[1] = v2;
    } else {
      uvs[0] = u;
      uvs[1] = v2;
      uvs[2] = u;
      uvs[3] = v;
      uvs[4] = u2;
      uvs[5] = v;
      uvs[6] = u2;
      uvs[7] = v2;
    }
  },
  updateOffset: function () {
    var regionScaleX = this.width / this.regionOriginalWidth * this.scaleX;
    var regionScaleY = this.height / this.regionOriginalHeight * this.scaleY;
    var localX = -this.width / 2 * this.scaleX + this.regionOffsetX * regionScaleX;
    var localY = -this.height / 2 * this.scaleY + this.regionOffsetY * regionScaleY;
    var localX2 = localX + this.regionWidth * regionScaleX;
    var localY2 = localY + this.regionHeight * regionScaleY;
    var radians = this.rotation * Math.PI / 180;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var localXCos = localX * cos + this.x;
    var localXSin = localX * sin;
    var localYCos = localY * cos + this.y;
    var localYSin = localY * sin;
    var localX2Cos = localX2 * cos + this.x;
    var localX2Sin = localX2 * sin;
    var localY2Cos = localY2 * cos + this.y;
    var localY2Sin = localY2 * sin;
    var offset = this.offset;
    offset[0] = localXCos - localYSin;
    offset[1] = localYCos + localXSin;
    offset[2] = localXCos - localY2Sin;
    offset[3] = localY2Cos + localXSin;
    offset[4] = localX2Cos - localY2Sin;
    offset[5] = localY2Cos + localX2Sin;
    offset[6] = localX2Cos - localYSin;
    offset[7] = localYCos + localX2Sin;
  },
  computeVertices: function (x, y, bone, vertices) {
    x += bone.worldX;
    y += bone.worldY;
    var m00 = bone.m00;
    var m01 = bone.m01;
    var m10 = bone.m10;
    var m11 = bone.m11;
    var offset = this.offset;
    vertices[0] = offset[0] * m00 + offset[1] * m01 + x;
    vertices[1] = offset[0] * m10 + offset[1] * m11 + y;
    vertices[2] = offset[2] * m00 + offset[3] * m01 + x;
    vertices[3] = offset[2] * m10 + offset[3] * m11 + y;
    vertices[4] = offset[4] * m00 + offset[5] * m01 + x;
    vertices[5] = offset[4] * m10 + offset[5] * m11 + y;
    vertices[6] = offset[6] * m00 + offset[7] * m01 + x;
    vertices[7] = offset[6] * m10 + offset[7] * m11 + y;
  }
};
spine.AnimationStateData = function (skeletonData) {
  this.skeletonData = skeletonData;
  this.animationToMixTime = {};
};
spine.AnimationStateData.prototype = {
  defaultMix: 0,
  setMixByName: function (fromName, toName, duration) {
    var from = this.skeletonData.findAnimation(fromName);
    if (!from)
      throw "Animation not found: " + fromName;
    var to = this.skeletonData.findAnimation(toName);
    if (!to)
      throw "Animation not found: " + toName;
    this.setMix(from, to, duration);
  },
  setMix: function (from, to, duration) {
    this.animationToMixTime[from.name + ":" + to.name] = duration;
  },
  getMix: function (from, to) {
    var time = this.animationToMixTime[from.name + ":" + to.name];
    return time ? time : this.defaultMix;
  }
};
spine.AnimationState = function (stateData) {
  this.data = stateData;
  this.queue = [];
};
spine.AnimationState.prototype = {
  current: null,
  previous: null,
  currentTime: 0,
  previousTime: 0,
  currentLoop: false,
  previousLoop: false,
  mixTime: 0,
  mixDuration: 0,
  update: function (delta) {
    this.currentTime += delta;
    this.previousTime += delta;
    this.mixTime += delta;
    if (this.queue.length > 0) {
      var entry = this.queue[0];
      if (this.currentTime >= entry.delay) {
        this._setAnimation(entry.animation, entry.loop);
        this.queue.shift();
      }
    }
  },
  apply: function (skeleton) {
    if (!this.current)
      return;
    if (this.previous) {
      this.previous.apply(skeleton, this.previousTime, this.previousLoop);
      var alpha = this.mixTime / this.mixDuration;
      if (alpha >= 1) {
        alpha = 1;
        this.previous = null;
      }
      this.current.mix(skeleton, this.currentTime, this.currentLoop, alpha);
    } else
      this.current.apply(skeleton, this.currentTime, this.currentLoop);
  },
  clearAnimation: function () {
    this.previous = null;
    this.current = null;
    this.queue.length = 0;
  },
  _setAnimation: function (animation, loop) {
    this.previous = null;
    if (animation && this.current) {
      this.mixDuration = this.data.getMix(this.current, animation);
      if (this.mixDuration > 0) {
        this.mixTime = 0;
        this.previous = this.current;
        this.previousTime = this.currentTime;
        this.previousLoop = this.currentLoop;
      }
    }
    this.current = animation;
    this.currentLoop = loop;
    this.currentTime = 0;
  },
  setAnimationByName: function (animationName, loop) {
    var animation = this.data.skeletonData.findAnimation(animationName);
    if (!animation)
      throw "Animation not found: " + animationName;
    this.setAnimation(animation, loop);
  },
  setAnimation: function (animation, loop) {
    this.queue.length = 0;
    this._setAnimation(animation, loop);
  },
  addAnimationByName: function (animationName, loop, delay) {
    var animation = this.data.skeletonData.findAnimation(animationName);
    if (!animation)
      throw "Animation not found: " + animationName;
    this.addAnimation(animation, loop, delay);
  },
  addAnimation: function (animation, loop, delay) {
    var entry = {};
    entry.animation = animation;
    entry.loop = loop;
    if (!delay || delay <= 0) {
      var previousAnimation = this.queue.length == 0 ? this.current : this.queue[this.queue.length - 1].animation;
      if (previousAnimation != null)
        delay = previousAnimation.duration - this.data.getMix(previousAnimation, animation) + (delay || 0);
      else
        delay = 0;
    }
    entry.delay = delay;
    this.queue.push(entry);
  },
  isComplete: function () {
    return !this.current || this.currentTime >= this.current.duration;
  }
};
spine.SkeletonJson = function (attachmentLoader) {
  this.attachmentLoader = attachmentLoader;
};
spine.SkeletonJson.prototype = {
  scale: 1,
  readSkeletonData: function (root) {
    var skeletonData = new spine.SkeletonData();
    var bones = root["bones"];
    for (var i = 0, n = bones.length; i < n; i++) {
      var boneMap = bones[i];
      var parent = null;
      if (boneMap["parent"]) {
        parent = skeletonData.findBone(boneMap["parent"]);
        if (!parent)
          throw "Parent bone not found: " + boneMap["parent"];
      }
      var boneData = new spine.BoneData(boneMap["name"], parent);
      boneData.length = (boneMap["length"] || 0) * this.scale;
      boneData.x = (boneMap["x"] || 0) * this.scale;
      boneData.y = (boneMap["y"] || 0) * this.scale;
      boneData.rotation = boneMap["rotation"] || 0;
      boneData.scaleX = boneMap["scaleX"] || 1;
      boneData.scaleY = boneMap["scaleY"] || 1;
      skeletonData.bones.push(boneData);
    }
    var slots = root["slots"];
    for (var i = 0, n = slots.length; i < n; i++) {
      var slotMap = slots[i];
      var boneData = skeletonData.findBone(slotMap["bone"]);
      if (!boneData)
        throw "Slot bone not found: " + slotMap["bone"];
      var slotData = new spine.SlotData(slotMap["name"], boneData);
      var color = slotMap["color"];
      if (color) {
        slotData.r = spine.SkeletonJson.toColor(color, 0);
        slotData.g = spine.SkeletonJson.toColor(color, 1);
        slotData.b = spine.SkeletonJson.toColor(color, 2);
        slotData.a = spine.SkeletonJson.toColor(color, 3);
      }
      slotData.attachmentName = slotMap["attachment"];
      skeletonData.slots.push(slotData);
    }
    var skins = root["skins"];
    for (var skinName in skins) {
      if (!skins.hasOwnProperty(skinName))
        continue;
      var skinMap = skins[skinName];
      var skin = new spine.Skin(skinName);
      for (var slotName in skinMap) {
        if (!skinMap.hasOwnProperty(slotName))
          continue;
        var slotIndex = skeletonData.findSlotIndex(slotName);
        var slotEntry = skinMap[slotName];
        for (var attachmentName in slotEntry) {
          if (!slotEntry.hasOwnProperty(attachmentName))
            continue;
          var attachment = this.readAttachment(skin, attachmentName, slotEntry[attachmentName]);
          if (attachment != null)
            skin.addAttachment(slotIndex, attachmentName, attachment);
        }
      }
      skeletonData.skins.push(skin);
      if (skin.name == "default")
        skeletonData.defaultSkin = skin;
    }
    var animations = root["animations"];
    for (var animationName in animations) {
      if (!animations.hasOwnProperty(animationName))
        continue;
      this.readAnimation(animationName, animations[animationName], skeletonData);
    }
    return skeletonData;
  },
  readAttachment: function (skin, name, map) {
    name = map["name"] || name;
    var type = spine.AttachmentType[map["type"] || "region"];
    if (type == spine.AttachmentType.region) {
      var attachment = new spine.RegionAttachment();
      attachment.x = (map["x"] || 0) * this.scale;
      attachment.y = (map["y"] || 0) * this.scale;
      attachment.scaleX = map["scaleX"] || 1;
      attachment.scaleY = map["scaleY"] || 1;
      attachment.rotation = map["rotation"] || 0;
      attachment.width = (map["width"] || 32) * this.scale;
      attachment.height = (map["height"] || 32) * this.scale;
      attachment.updateOffset();
      attachment.rendererObject = {};
      attachment.rendererObject.name = name;
      attachment.rendererObject.scale = {};
      attachment.rendererObject.scale.x = attachment.scaleX;
      attachment.rendererObject.scale.y = attachment.scaleY;
      attachment.rendererObject.rotation = -attachment.rotation * Math.PI / 180;
      return attachment;
    }
    throw "Unknown attachment type: " + type;
  },
  readAnimation: function (name, map, skeletonData) {
    var timelines = [];
    var duration = 0;
    var bones = map["bones"];
    for (var boneName in bones) {
      if (!bones.hasOwnProperty(boneName))
        continue;
      var boneIndex = skeletonData.findBoneIndex(boneName);
      if (boneIndex == -1)
        throw "Bone not found: " + boneName;
      var boneMap = bones[boneName];
      for (var timelineName in boneMap) {
        if (!boneMap.hasOwnProperty(timelineName))
          continue;
        var values = boneMap[timelineName];
        if (timelineName == "rotate") {
          var timeline = new spine.RotateTimeline(values.length);
          timeline.boneIndex = boneIndex;
          var frameIndex = 0;
          for (var i = 0, n = values.length; i < n; i++) {
            var valueMap = values[i];
            timeline.setFrame(frameIndex, valueMap["time"], valueMap["angle"]);
            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
            frameIndex++;
          }
          timelines.push(timeline);
          duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);
        } else if (timelineName == "translate" || timelineName == "scale") {
          var timeline;
          var timelineScale = 1;
          if (timelineName == "scale")
            timeline = new spine.ScaleTimeline(values.length);
          else {
            timeline = new spine.TranslateTimeline(values.length);
            timelineScale = this.scale;
          }
          timeline.boneIndex = boneIndex;
          var frameIndex = 0;
          for (var i = 0, n = values.length; i < n; i++) {
            var valueMap = values[i];
            var x = (valueMap["x"] || 0) * timelineScale;
            var y = (valueMap["y"] || 0) * timelineScale;
            timeline.setFrame(frameIndex, valueMap["time"], x, y);
            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
            frameIndex++;
          }
          timelines.push(timeline);
          duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);
        } else
          throw "Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")";
      }
    }
    var slots = map["slots"];
    for (var slotName in slots) {
      if (!slots.hasOwnProperty(slotName))
        continue;
      var slotMap = slots[slotName];
      var slotIndex = skeletonData.findSlotIndex(slotName);
      for (var timelineName in slotMap) {
        if (!slotMap.hasOwnProperty(timelineName))
          continue;
        var values = slotMap[timelineName];
        if (timelineName == "color") {
          var timeline = new spine.ColorTimeline(values.length);
          timeline.slotIndex = slotIndex;
          var frameIndex = 0;
          for (var i = 0, n = values.length; i < n; i++) {
            var valueMap = values[i];
            var color = valueMap["color"];
            var r = spine.SkeletonJson.toColor(color, 0);
            var g = spine.SkeletonJson.toColor(color, 1);
            var b = spine.SkeletonJson.toColor(color, 2);
            var a = spine.SkeletonJson.toColor(color, 3);
            timeline.setFrame(frameIndex, valueMap["time"], r, g, b, a);
            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
            frameIndex++;
          }
          timelines.push(timeline);
          duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);
        } else if (timelineName == "attachment") {
          var timeline = new spine.AttachmentTimeline(values.length);
          timeline.slotIndex = slotIndex;
          var frameIndex = 0;
          for (var i = 0, n = values.length; i < n; i++) {
            var valueMap = values[i];
            timeline.setFrame(frameIndex++, valueMap["time"], valueMap["name"]);
          }
          timelines.push(timeline);
          duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
        } else
          throw "Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")";
      }
    }
    skeletonData.animations.push(new spine.Animation(name, timelines, duration));
  }
};
spine.SkeletonJson.readCurve = function (timeline, frameIndex, valueMap) {
  var curve = valueMap["curve"];
  if (!curve)
    return;
  if (curve == "stepped")
    timeline.curves.setStepped(frameIndex);
  else if (curve instanceof Array)
    timeline.curves.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
};
spine.SkeletonJson.toColor = function (hexString, colorIndex) {
  if (hexString.length != 8)
    throw "Color hexidecimal length must be 8, recieved: " + hexString;
  return parseInt(hexString.substring(colorIndex * 2, 2), 16) / 255;
};
spine.Atlas = function (atlasText, textureLoader) {
  this.textureLoader = textureLoader;
  this.pages = [];
  this.regions = [];
  var reader = new spine.AtlasReader(atlasText);
  var tuple = [];
  tuple.length = 4;
  var page = null;
  while (true) {
    var line = reader.readLine();
    if (line == null)
      break;
    line = reader.trim(line);
    if (line.length == 0)
      page = null;
    else if (!page) {
      page = new spine.AtlasPage();
      page.name = line;
      page.format = spine.Atlas.Format[reader.readValue()];
      reader.readTuple(tuple);
      page.minFilter = spine.Atlas.TextureFilter[tuple[0]];
      page.magFilter = spine.Atlas.TextureFilter[tuple[1]];
      var direction = reader.readValue();
      page.uWrap = spine.Atlas.TextureWrap.clampToEdge;
      page.vWrap = spine.Atlas.TextureWrap.clampToEdge;
      if (direction == "x")
        page.uWrap = spine.Atlas.TextureWrap.repeat;
      else if (direction == "y")
        page.vWrap = spine.Atlas.TextureWrap.repeat;
      else if (direction == "xy")
        page.uWrap = page.vWrap = spine.Atlas.TextureWrap.repeat;
      textureLoader.load(page, line);
      this.pages.push(page);
    } else {
      var region = new spine.AtlasRegion();
      region.name = line;
      region.page = page;
      region.rotate = reader.readValue() == "true";
      reader.readTuple(tuple);
      var x = parseInt(tuple[0]);
      var y = parseInt(tuple[1]);
      reader.readTuple(tuple);
      var width = parseInt(tuple[0]);
      var height = parseInt(tuple[1]);
      region.u = x / page.width;
      region.v = y / page.height;
      if (region.rotate) {
        region.u2 = (x + height) / page.width;
        region.v2 = (y + width) / page.height;
      } else {
        region.u2 = (x + width) / page.width;
        region.v2 = (y + height) / page.height;
      }
      region.x = x;
      region.y = y;
      region.width = Math.abs(width);
      region.height = Math.abs(height);
      if (reader.readTuple(tuple) == 4) {
        region.splits = [
          parseInt(tuple[0]),
          parseInt(tuple[1]),
          parseInt(tuple[2]),
          parseInt(tuple[3])
        ];
        if (reader.readTuple(tuple) == 4) {
          region.pads = [
            parseInt(tuple[0]),
            parseInt(tuple[1]),
            parseInt(tuple[2]),
            parseInt(tuple[3])
          ];
          reader.readTuple(tuple);
        }
      }
      region.originalWidth = parseInt(tuple[0]);
      region.originalHeight = parseInt(tuple[1]);
      reader.readTuple(tuple);
      region.offsetX = parseInt(tuple[0]);
      region.offsetY = parseInt(tuple[1]);
      region.index = parseInt(reader.readValue());
      this.regions.push(region);
    }
  }
};
spine.Atlas.prototype = {
  findRegion: function (name) {
    var regions = this.regions;
    for (var i = 0, n = regions.length; i < n; i++)
      if (regions[i].name == name)
        return regions[i];
    return null;
  },
  dispose: function () {
    var pages = this.pages;
    for (var i = 0, n = pages.length; i < n; i++)
      this.textureLoader.unload(pages[i].rendererObject);
  },
  updateUVs: function (page) {
    var regions = this.regions;
    for (var i = 0, n = regions.length; i < n; i++) {
      var region = regions[i];
      if (region.page != page)
        continue;
      region.u = region.x / page.width;
      region.v = region.y / page.height;
      if (region.rotate) {
        region.u2 = (region.x + region.height) / page.width;
        region.v2 = (region.y + region.width) / page.height;
      } else {
        region.u2 = (region.x + region.width) / page.width;
        region.v2 = (region.y + region.height) / page.height;
      }
    }
  }
};
spine.Atlas.Format = {
  alpha: 0,
  intensity: 1,
  luminanceAlpha: 2,
  rgb565: 3,
  rgba4444: 4,
  rgb888: 5,
  rgba8888: 6
};
spine.Atlas.TextureFilter = {
  nearest: 0,
  linear: 1,
  mipMap: 2,
  mipMapNearestNearest: 3,
  mipMapLinearNearest: 4,
  mipMapNearestLinear: 5,
  mipMapLinearLinear: 6
};
spine.Atlas.TextureWrap = {
  mirroredRepeat: 0,
  clampToEdge: 1,
  repeat: 2
};
spine.AtlasPage = function () {
};
spine.AtlasPage.prototype = {
  name: null,
  format: null,
  minFilter: null,
  magFilter: null,
  uWrap: null,
  vWrap: null,
  rendererObject: null,
  width: 0,
  height: 0
};
spine.AtlasRegion = function () {
};
spine.AtlasRegion.prototype = {
  page: null,
  name: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  u: 0,
  v: 0,
  u2: 0,
  v2: 0,
  offsetX: 0,
  offsetY: 0,
  originalWidth: 0,
  originalHeight: 0,
  index: 0,
  rotate: false,
  splits: null,
  pads: null
};
spine.AtlasReader = function (text) {
  this.lines = text.split(/\r\n|\r|\n/);
};
spine.AtlasReader.prototype = {
  index: 0,
  trim: function (value) {
    return value.replace(/^\s+|\s+$/g, "");
  },
  readLine: function () {
    if (this.index >= this.lines.length)
      return null;
    return this.lines[this.index++];
  },
  readValue: function () {
    var line = this.readLine();
    var colon = line.indexOf(":");
    if (colon == -1)
      throw "Invalid line: " + line;
    return this.trim(line.substring(colon + 1));
  },
  readTuple: function (tuple) {
    var line = this.readLine();
    var colon = line.indexOf(":");
    if (colon == -1)
      throw "Invalid line: " + line;
    var i = 0, lastMatch = colon + 1;
    for (; i < 3; i++) {
      var comma = line.indexOf(",", lastMatch);
      if (comma == -1) {
        if (i == 0)
          throw "Invalid line: " + line;
        break;
      }
      tuple[i] = this.trim(line.substr(lastMatch, comma - lastMatch));
      lastMatch = comma + 1;
    }
    tuple[i] = this.trim(line.substring(lastMatch));
    return i + 1;
  }
};
spine.AtlasAttachmentLoader = function (atlas) {
  this.atlas = atlas;
};
spine.AtlasAttachmentLoader.prototype = {
  newAttachment: function (skin, type, name) {
    switch (type) {
    case spine.AttachmentType.region:
      var region = this.atlas.findRegion(name);
      if (!region)
        throw "Region not found in atlas: " + name + " (" + type + ")";
      var attachment = new spine.RegionAttachment(name);
      attachment.rendererObject = region;
      attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
      attachment.regionOffsetX = region.offsetX;
      attachment.regionOffsetY = region.offsetY;
      attachment.regionWidth = region.width;
      attachment.regionHeight = region.height;
      attachment.regionOriginalWidth = region.originalWidth;
      attachment.regionOriginalHeight = region.originalHeight;
      return attachment;
    }
    throw "Unknown attachment type: " + type;
  }
};
PIXI.AnimCache = {};
spine.Bone.yDown = true;
PIXI.CustomRenderable = function () {
  PIXI.DisplayObject.call(this);
  this.renderable = true;
};
PIXI.CustomRenderable.prototype = Object.create(PIXI.DisplayObject.prototype);
PIXI.CustomRenderable.prototype.constructor = PIXI.CustomRenderable;
PIXI.CustomRenderable.prototype.renderCanvas = function (renderer) {
};
PIXI.CustomRenderable.prototype.initWebGL = function (renderer) {
};
PIXI.CustomRenderable.prototype.renderWebGL = function (renderGroup, projectionMatrix) {
};
PIXI.BaseTextureCache = {};
PIXI.texturesToUpdate = [];
PIXI.texturesToDestroy = [];
PIXI.BaseTexture = function (source, scaleMode) {
  PIXI.EventTarget.call(this);
  this.width = 100;
  this.height = 100;
  this.scaleMode = scaleMode || PIXI.BaseTexture.SCALE_MODE.DEFAULT;
  this.hasLoaded = false;
  this.source = source;
  if (!source)
    return;
  if (this.source instanceof Image || this.source instanceof HTMLImageElement) {
    if (this.source.complete) {
      this.hasLoaded = true;
      this.width = this.source.width;
      this.height = this.source.height;
      PIXI.texturesToUpdate.push(this);
    } else {
      var scope = this;
      this.source.onload = function () {
        scope.hasLoaded = true;
        scope.width = scope.source.width;
        scope.height = scope.source.height;
        PIXI.texturesToUpdate.push(scope);
        scope.dispatchEvent({
          type: "loaded",
          content: scope
        });
      };
    }
  } else {
    this.hasLoaded = true;
    this.width = this.source.width;
    this.height = this.source.height;
    PIXI.texturesToUpdate.push(this);
  }
  this._powerOf2 = false;
};
PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;
PIXI.BaseTexture.prototype.destroy = function () {
  if (this.source instanceof Image) {
    this.source.src = null;
  }
  this.source = null;
  PIXI.texturesToDestroy.push(this);
};
PIXI.BaseTexture.fromImage = function (imageUrl, crossorigin, scaleMode) {
  var baseTexture = PIXI.BaseTextureCache[imageUrl];
  if (!baseTexture) {
    var image = new Image();
    if (crossorigin) {
      image.crossOrigin = "";
    }
    image.src = imageUrl;
    baseTexture = new PIXI.BaseTexture(image, scaleMode);
    PIXI.BaseTextureCache[imageUrl] = baseTexture;
  }
  return baseTexture;
};
PIXI.BaseTexture.SCALE_MODE = {
  DEFAULT: 0,
  LINEAR: 0,
  NEAREST: 1
};
PIXI.TextureCache = {};
PIXI.FrameCache = {};
PIXI.Texture = function (baseTexture, frame) {
  PIXI.EventTarget.call(this);
  if (!frame) {
    this.noFrame = true;
    frame = new PIXI.Rectangle(0, 0, 1, 1);
  }
  if (baseTexture instanceof PIXI.Texture)
    baseTexture = baseTexture.baseTexture;
  this.baseTexture = baseTexture;
  this.frame = frame;
  this.trim = new PIXI.Point();
  this.scope = this;
  if (baseTexture.hasLoaded) {
    if (this.noFrame)
      frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);
    this.setFrame(frame);
  } else {
    var scope = this;
    baseTexture.addEventListener("loaded", function () {
      scope.onBaseTextureLoaded();
    });
  }
};
PIXI.Texture.prototype.constructor = PIXI.Texture;
PIXI.Texture.prototype.onBaseTextureLoaded = function (event) {
  var baseTexture = this.baseTexture;
  baseTexture.removeEventListener("loaded", this.onLoaded);
  if (this.noFrame)
    this.frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);
  this.noFrame = false;
  this.width = this.frame.width;
  this.height = this.frame.height;
  this.scope.dispatchEvent({
    type: "update",
    content: this
  });
};
PIXI.Texture.prototype.destroy = function (destroyBase) {
  if (destroyBase)
    this.baseTexture.destroy();
};
PIXI.Texture.prototype.setFrame = function (frame) {
  this.frame = frame;
  this.width = frame.width;
  this.height = frame.height;
  if (frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height) {
    throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
  }
  this.updateFrame = true;
  PIXI.Texture.frameUpdates.push(this);
};
PIXI.Texture.fromImage = function (imageUrl, crossorigin, scaleMode) {
  var texture = PIXI.TextureCache[imageUrl];
  if (!texture) {
    texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(imageUrl, crossorigin, scaleMode));
    PIXI.TextureCache[imageUrl] = texture;
  }
  return texture;
};
PIXI.Texture.fromFrame = function (frameId) {
  var texture = PIXI.TextureCache[frameId];
  if (!texture)
    throw new Error("The frameId '" + frameId + "' does not exist in the texture cache " + this);
  return texture;
};
PIXI.Texture.fromCanvas = function (canvas, scaleMode) {
  var baseTexture = new PIXI.BaseTexture(canvas, scaleMode);
  return new PIXI.Texture(baseTexture);
};
PIXI.Texture.addTextureToCache = function (texture, id) {
  PIXI.TextureCache[id] = texture;
};
PIXI.Texture.removeTextureFromCache = function (id) {
  var texture = PIXI.TextureCache[id];
  PIXI.TextureCache[id] = null;
  return texture;
};
PIXI.Texture.frameUpdates = [];
PIXI.Texture.SCALE_MODE = PIXI.BaseTexture.SCALE_MODE;
PIXI.RenderTexture = function (width, height) {
  PIXI.EventTarget.call(this);
  this.width = width || 100;
  this.height = height || 100;
  this.indetityMatrix = PIXI.mat3.create();
  this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);
  if (PIXI.gl) {
    this.initWebGL();
  } else {
    this.initCanvas();
  }
};
PIXI.RenderTexture.prototype = Object.create(PIXI.Texture.prototype);
PIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture;
PIXI.RenderTexture.prototype.initWebGL = function () {
  var gl = PIXI.gl;
  this.glFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer);
  this.glFramebuffer.width = this.width;
  this.glFramebuffer.height = this.height;
  this.baseTexture = new PIXI.BaseTexture();
  this.baseTexture.width = this.width;
  this.baseTexture.height = this.height;
  this.baseTexture._glTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  this.baseTexture.isRender = true;
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.baseTexture._glTexture, 0);
  this.projection = new PIXI.Point(this.width / 2, this.height / 2);
  this.render = this.renderWebGL;
};
PIXI.RenderTexture.prototype.resize = function (width, height) {
  this.width = width;
  this.height = height;
  if (PIXI.gl) {
    this.projection.x = this.width / 2;
    this.projection.y = this.height / 2;
    var gl = PIXI.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  } else {
    this.frame.width = this.width;
    this.frame.height = this.height;
    this.renderer.resize(this.width, this.height);
  }
};
PIXI.RenderTexture.prototype.initCanvas = function () {
  this.renderer = new PIXI.CanvasRenderer(this.width, this.height, null, 0);
  this.baseTexture = new PIXI.BaseTexture(this.renderer.view);
  this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);
  this.render = this.renderCanvas;
};
PIXI.RenderTexture.prototype.renderWebGL = function (displayObject, position, clear) {
  var gl = PIXI.gl;
  gl.colorMask(true, true, true, true);
  gl.viewport(0, 0, this.width, this.height);
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer);
  if (clear) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  var children = displayObject.children;
  var originalWorldTransform = displayObject.worldTransform;
  displayObject.worldTransform = PIXI.mat3.create();
  displayObject.worldTransform[4] = -1;
  displayObject.worldTransform[5] = this.projection.y * 2;
  if (position) {
    displayObject.worldTransform[2] = position.x;
    displayObject.worldTransform[5] -= position.y;
  }
  PIXI.visibleCount++;
  displayObject.vcount = PIXI.visibleCount;
  for (var i = 0, j = children.length; i < j; i++) {
    children[i].updateTransform();
  }
  var renderGroup = displayObject.__renderGroup;
  if (renderGroup) {
    if (displayObject == renderGroup.root) {
      renderGroup.render(this.projection);
    } else {
      renderGroup.renderSpecific(displayObject, this.projection);
    }
  } else {
    if (!this.renderGroup)
      this.renderGroup = new PIXI.WebGLRenderGroup(gl);
    this.renderGroup.setRenderable(displayObject);
    this.renderGroup.render(this.projection);
  }
  displayObject.worldTransform = originalWorldTransform;
};
PIXI.RenderTexture.prototype.renderCanvas = function (displayObject, position, clear) {
  var children = displayObject.children;
  displayObject.worldTransform = PIXI.mat3.create();
  if (position) {
    displayObject.worldTransform[2] = position.x;
    displayObject.worldTransform[5] = position.y;
  }
  for (var i = 0, j = children.length; i < j; i++) {
    children[i].updateTransform();
  }
  if (clear)
    this.renderer.context.clearRect(0, 0, this.width, this.height);
  this.renderer.renderDisplayObject(displayObject);
  this.renderer.context.setTransform(1, 0, 0, 1, 0, 0);
};
PIXI.AssetLoader = function (assetURLs, crossorigin) {
  PIXI.EventTarget.call(this);
  this.assetURLs = assetURLs;
  this.crossorigin = crossorigin;
  this.loadersByType = {
    "jpg": PIXI.ImageLoader,
    "jpeg": PIXI.ImageLoader,
    "png": PIXI.ImageLoader,
    "gif": PIXI.ImageLoader,
    "json": PIXI.JsonLoader,
    "anim": PIXI.SpineLoader,
    "xml": PIXI.BitmapFontLoader,
    "fnt": PIXI.BitmapFontLoader
  };
};
PIXI.AssetLoader.prototype.constructor = PIXI.AssetLoader;
PIXI.AssetLoader.prototype.load = function () {
  var scope = this;
  this.loadCount = this.assetURLs.length;
  for (var i = 0; i < this.assetURLs.length; i++) {
    var fileName = this.assetURLs[i];
    var fileType = fileName.split(".").pop().toLowerCase();
    var loaderClass = this.loadersByType[fileType];
    if (!loaderClass)
      throw new Error(fileType + " is an unsupported file type");
    var loader = new loaderClass(fileName, this.crossorigin);
    loader.addEventListener("loaded", function () {
      scope.onAssetLoaded();
    });
    loader.load();
  }
};
PIXI.AssetLoader.prototype.onAssetLoaded = function () {
  this.loadCount--;
  this.dispatchEvent({
    type: "onProgress",
    content: this
  });
  if (this.onProgress)
    this.onProgress();
  if (this.loadCount == 0) {
    this.dispatchEvent({
      type: "onComplete",
      content: this
    });
    if (this.onComplete)
      this.onComplete();
  }
};
PIXI.JsonLoader = function (url, crossorigin) {
  PIXI.EventTarget.call(this);
  this.url = url;
  this.crossorigin = crossorigin;
  this.baseUrl = url.replace(/[^\/]*$/, "");
  this.loaded = false;
};
PIXI.JsonLoader.prototype.constructor = PIXI.JsonLoader;
PIXI.JsonLoader.prototype.load = function () {
  this.ajaxRequest = new AjaxRequest();
  var scope = this;
  this.ajaxRequest.onreadystatechange = function () {
    scope.onJSONLoaded();
  };
  this.ajaxRequest.open("GET", this.url, true);
  if (this.ajaxRequest.overrideMimeType)
    this.ajaxRequest.overrideMimeType("application/json");
  this.ajaxRequest.send(null);
};
PIXI.JsonLoader.prototype.onJSONLoaded = function () {
  if (this.ajaxRequest.readyState == 4) {
    if (this.ajaxRequest.status == 200 || window.location.href.indexOf("http") == -1) {
      this.json = JSON.parse(this.ajaxRequest.responseText);
      if (this.json.frames) {
        var scope = this;
        var textureUrl = this.baseUrl + this.json.meta.image;
        var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
        var frameData = this.json.frames;
        this.texture = image.texture.baseTexture;
        image.addEventListener("loaded", function (event) {
          scope.onLoaded();
        });
        for (var i in frameData) {
          var rect = frameData[i].frame;
          if (rect) {
            PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {
              x: rect.x,
              y: rect.y,
              width: rect.w,
              height: rect.h
            });
            if (frameData[i].trimmed) {
              PIXI.TextureCache[i].realSize = frameData[i].spriteSourceSize;
              PIXI.TextureCache[i].trim.x = 0;
            }
          }
        }
        image.load();
      } else if (this.json.bones) {
        var spineJsonParser = new spine.SkeletonJson();
        var skeletonData = spineJsonParser.readSkeletonData(this.json);
        PIXI.AnimCache[this.url] = skeletonData;
        this.onLoaded();
      } else {
        this.onLoaded();
      }
    } else {
      this.onError();
    }
  }
};
PIXI.JsonLoader.prototype.onLoaded = function () {
  this.loaded = true;
  this.dispatchEvent({
    type: "loaded",
    content: this
  });
};
PIXI.JsonLoader.prototype.onError = function () {
  this.dispatchEvent({
    type: "error",
    content: this
  });
};
PIXI.SpriteSheetLoader = function (url, crossorigin) {
  PIXI.EventTarget.call(this);
  this.url = url;
  this.crossorigin = crossorigin;
  this.baseUrl = url.replace(/[^\/]*$/, "");
  this.texture = null;
  this.frames = {};
};
PIXI.SpriteSheetLoader.prototype.constructor = PIXI.SpriteSheetLoader;
PIXI.SpriteSheetLoader.prototype.load = function () {
  var scope = this;
  var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
  jsonLoader.addEventListener("loaded", function (event) {
    scope.json = event.content.json;
    scope.onJSONLoaded();
  });
  jsonLoader.load();
};
PIXI.SpriteSheetLoader.prototype.onJSONLoaded = function () {
  var scope = this;
  var textureUrl = this.baseUrl + this.json.meta.image;
  var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
  var frameData = this.json.frames;
  this.texture = image.texture.baseTexture;
  image.addEventListener("loaded", function (event) {
    scope.onLoaded();
  });
  for (var i in frameData) {
    var rect = frameData[i].frame;
    if (rect) {
      PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {
        x: rect.x,
        y: rect.y,
        width: rect.w,
        height: rect.h
      });
      if (frameData[i].trimmed) {
        PIXI.TextureCache[i].realSize = frameData[i].spriteSourceSize;
        PIXI.TextureCache[i].trim.x = 0;
      }
    }
  }
  image.load();
};
PIXI.SpriteSheetLoader.prototype.onLoaded = function () {
  this.dispatchEvent({
    type: "loaded",
    content: this
  });
};
PIXI.ImageLoader = function (url, crossorigin) {
  PIXI.EventTarget.call(this);
  this.texture = PIXI.Texture.fromImage(url, crossorigin);
  this.frames = [];
};
PIXI.ImageLoader.prototype.constructor = PIXI.ImageLoader;
PIXI.ImageLoader.prototype.load = function () {
  if (!this.texture.baseTexture.hasLoaded) {
    var scope = this;
    this.texture.baseTexture.addEventListener("loaded", function () {
      scope.onLoaded();
    });
  } else {
    this.onLoaded();
  }
};
PIXI.ImageLoader.prototype.onLoaded = function () {
  this.dispatchEvent({
    type: "loaded",
    content: this
  });
};
PIXI.ImageLoader.prototype.loadFramedSpriteSheet = function (frameWidth, frameHeight, textureName) {
  this.frames = [];
  var cols = Math.floor(this.texture.width / frameWidth);
  var rows = Math.floor(this.texture.height / frameHeight);
  var i = 0;
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++, i++) {
      var texture = new PIXI.Texture(this.texture, {
          x: x * frameWidth,
          y: y * frameHeight,
          width: frameWidth,
          height: frameHeight
        });
      this.frames.push(texture);
      if (textureName)
        PIXI.TextureCache[textureName + "-" + i] = texture;
    }
  }
  if (!this.texture.baseTexture.hasLoaded) {
    var scope = this;
    this.texture.baseTexture.addEventListener("loaded", function () {
      scope.onLoaded();
    });
  } else {
    this.onLoaded();
  }
};
PIXI.BitmapFontLoader = function (url, crossorigin) {
  PIXI.EventTarget.call(this);
  this.url = url;
  this.crossorigin = crossorigin;
  this.baseUrl = url.replace(/[^\/]*$/, "");
  this.texture = null;
};
PIXI.BitmapFontLoader.prototype.constructor = PIXI.BitmapFontLoader;
PIXI.BitmapFontLoader.prototype.load = function () {
  this.ajaxRequest = new XMLHttpRequest();
  var scope = this;
  this.ajaxRequest.onreadystatechange = function () {
    scope.onXMLLoaded();
  };
  this.ajaxRequest.open("GET", this.url, true);
  if (this.ajaxRequest.overrideMimeType)
    this.ajaxRequest.overrideMimeType("application/xml");
  this.ajaxRequest.send(null);
};
PIXI.BitmapFontLoader.prototype.onXMLLoaded = function () {
  if (this.ajaxRequest.readyState == 4) {
    if (this.ajaxRequest.status == 200 || window.location.href.indexOf("http") == -1) {
      var textureUrl = this.baseUrl + this.ajaxRequest.responseXML.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue;
      var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
      this.texture = image.texture.baseTexture;
      var data = {};
      var info = this.ajaxRequest.responseXML.getElementsByTagName("info")[0];
      var common = this.ajaxRequest.responseXML.getElementsByTagName("common")[0];
      data.font = info.attributes.getNamedItem("face").nodeValue;
      data.size = parseInt(info.attributes.getNamedItem("size").nodeValue, 10);
      data.lineHeight = parseInt(common.attributes.getNamedItem("lineHeight").nodeValue, 10);
      data.chars = {};
      var letters = this.ajaxRequest.responseXML.getElementsByTagName("char");
      for (var i = 0; i < letters.length; i++) {
        var charCode = parseInt(letters[i].attributes.getNamedItem("id").nodeValue, 10);
        var textureRect = new PIXI.Rectangle(parseInt(letters[i].attributes.getNamedItem("x").nodeValue, 10), parseInt(letters[i].attributes.getNamedItem("y").nodeValue, 10), parseInt(letters[i].attributes.getNamedItem("width").nodeValue, 10), parseInt(letters[i].attributes.getNamedItem("height").nodeValue, 10));
        data.chars[charCode] = {
          xOffset: parseInt(letters[i].attributes.getNamedItem("xoffset").nodeValue, 10),
          yOffset: parseInt(letters[i].attributes.getNamedItem("yoffset").nodeValue, 10),
          xAdvance: parseInt(letters[i].attributes.getNamedItem("xadvance").nodeValue, 10),
          kerning: {},
          texture: PIXI.TextureCache[charCode] = new PIXI.Texture(this.texture, textureRect)
        };
      }
      var kernings = this.ajaxRequest.responseXML.getElementsByTagName("kerning");
      for (i = 0; i < kernings.length; i++) {
        var first = parseInt(kernings[i].attributes.getNamedItem("first").nodeValue, 10);
        var second = parseInt(kernings[i].attributes.getNamedItem("second").nodeValue, 10);
        var amount = parseInt(kernings[i].attributes.getNamedItem("amount").nodeValue, 10);
        data.chars[second].kerning[first] = amount;
      }
      PIXI.BitmapText.fonts[data.font] = data;
      var scope = this;
      image.addEventListener("loaded", function () {
        scope.onLoaded();
      });
      image.load();
    }
  }
};
PIXI.BitmapFontLoader.prototype.onLoaded = function () {
  this.dispatchEvent({
    type: "loaded",
    content: this
  });
};
PIXI.SpineLoader = function (url, crossorigin) {
  PIXI.EventTarget.call(this);
  this.url = url;
  this.crossorigin = crossorigin;
  this.loaded = false;
};
PIXI.SpineLoader.prototype.constructor = PIXI.SpineLoader;
PIXI.SpineLoader.prototype.load = function () {
  var scope = this;
  var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
  jsonLoader.addEventListener("loaded", function (event) {
    scope.json = event.content.json;
    scope.onJSONLoaded();
  });
  jsonLoader.load();
};
PIXI.SpineLoader.prototype.onJSONLoaded = function (event) {
  var spineJsonParser = new spine.SkeletonJson();
  var skeletonData = spineJsonParser.readSkeletonData(this.json);
  PIXI.AnimCache[this.url] = skeletonData;
  this.onLoaded();
};
PIXI.SpineLoader.prototype.onLoaded = function () {
  this.loaded = true;
  this.dispatchEvent({
    type: "loaded",
    content: this
  });
};
if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    exports = module.exports = PIXI;
  }
  exports.PIXI = PIXI;
} else {
  root.PIXI = PIXI;
}

return module.exports;

});
define('math/math',['require','exports','module','../utils/support','../vendor/pixi'],function (require, exports, module) {
  

var support = require("../utils/support"), PIXI = require("../vendor/pixi");
var math = {
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    SEED: Math.random(),
    Matrix: PIXI.Matrix,
    mat3: PIXI.mat3,
    mat4: PIXI.mat4,
    floor: Math.floor,
    ceil: Math.ceil,
    random: Math.random,
    abs: Math.abs,
    sqrt: Math.sqrt,
    min: Math.min,
    max: Math.max,
    round: function (n) {
      return ~~(n + (n > 0 ? 0.5 : -0.5));
    },
    clamp: function (n, min, max) {
      return Math.max(min, Math.min(max, n));
    },
    truncate: function (n) {
      return n > 0 ? Math.floor(n) : Math.ceil(n);
    },
    snap: function (n, gap, offset) {
      if (gap === 0)
        return n;
      offset = offset || 0;
      n -= offset;
      n = gap * Math.round(n / gap);
      return offset + n;
    },
    snapFloor: function (n, gap, offset) {
      if (gap === 0)
        return n;
      offset = offset || 0;
      n -= offset;
      n = gap * Math.floor(n / gap);
      return offset + n;
    },
    snapCeil: function (n, gap, offset) {
      if (gap === 0)
        return n;
      offset = offset || 0;
      n -= offset;
      n = gap * Math.ceil(n / gap);
      return offset + n;
    },
    radiansToDegrees: function (angle) {
      return angle * math.RAD_TO_DEG;
    },
    degreesToRadians: function (angle) {
      return angle * math.DEG_TO_RAD;
    },
    angleBetween: function (pos1, pos2) {
      return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    },
    randomBool: function (chance) {
      if (chance === undefined)
        chance = 50;
      if (chance <= 0)
        return false;
      if (chance >= 100)
        return true;
      return Math.random() * 100 < chance;
    },
    randomInt: function (min, max) {
      if (min !== undefined && min === max)
        return min;
      min = min || 0;
      max = max || 100;
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomReal: function (min, max) {
      if (min !== undefined && min === max)
        return min;
      min = min || 0;
      max = max || 1;
      return math.random() * (max - min) + min;
    },
    randomSign: function (chance) {
      return math.randomBool(chance) ? 1 : -1;
    },
    randomString: function () {
      return Math.floor(Date.now() * Math.random()).toString();
    },
    randomUuid: function () {
      var buf = math.randomBytes(math.__uuidBytes);
      buf[6] = buf[6] & 15 | 64;
      buf[8] = buf[8] & 63 | 128;
      var i = 0, bth = math.__byteToHex;
      return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + "-" + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
    },
    __uuidBytes: new Uint8Array(16),
    __byteToHex: function () {
      var bth = [], htb = {};
      for (var i = 0; i < 256; i++) {
        bth[i] = (i + 256).toString(16).substr(1);
        htb[bth[i]] = i;
      }
      return bth;
    }(),
    randomBytes: function (ary) {
      ary = ary || new Uint8Array(16);
      window.crypto.getRandomValues(ary);
      return ary;
    },
    randomElement: function (array, start, end) {
      if (!array || !array.length)
        return null;
      if (array.length === 1)
        return array[0];
      if (!start || start < 0)
        start = start || 0;
      if (!end || end < 0)
        end = array.length - 1;
      return array[math.randomInt(start, end)];
    }
  };
math._getRandomValuesTyped = function (ary) {
  var buf = ary.buffer, len = buf.byteLength, view = new Uint8Array(buf);
  for (var i = 0, r; i < len; ++i) {
    if ((i & 3) === 0) {
      r = math.random() * 4294967296;
    }
    view[i] = r >>> ((i & 3) << 3) & 255;
  }
  return ary;
};
math._getRandomValuesArray = function (ary) {
  for (var i = 0; i < ary.length; ++i) {
    ary[i] = math.random() * 4294967296;
  }
  return ary;
};
if (!support.crypto) {
  window.crypto = window.crypto || {};
  if (support.typedArrays) {
    window.crypto.getRandomValues = math._getRandomValuesTyped;
  } else {
    window.crypto.getRandomValues = math._getRandomValuesArray;
  }
}
module.exports = math;

return module.exports;

});
define('geom/Rectangle',['require','exports','module','../utils/inherit','./Polygon','../math/Vector','../math/math','../constants'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Polygon = require("./Polygon"), Vector = require("../math/Vector"), math = require("../math/math"), C = require("../constants");
var Rectangle = function (x, y, width, height) {
  this.position = new Vector();
  this.x = x || 0;
  this.y = y || 0;
  this._width = width || 0;
  this._height = height || 0;
  this.halfWidth = this._width / 2;
  this.halfHeight = this._height / 2;
  this._shapetype = C.SHAPE.RECTANGLE;
};
inherit(Rectangle, Object, {
  clone: function () {
    return new Rectangle(this.x, this.y, this._width, this._height);
  },
  copy: function (rect) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
    return this;
  },
  contains: function (x, y) {
    if (this._width <= 0 || this._height <= 0)
      return false;
    var x1 = this.x;
    if (x >= x1 && x <= x1 + this._width) {
      var y1 = this.y;
      if (y >= y1 && y <= y1 + this._height) {
        return true;
      }
    }
    return false;
  },
  overlaps: function (rect) {
    return this.right > rect.x && this.x < rect.right && this.bottom > rect.y && this.y < rect.bottom;
  },
  toPolygon: function (pos) {
    pos = pos || this.position;
    return new Polygon(this.x - pos.x, this.y - pos.y, [
      new Vector(pos.x, pos.y),
      new Vector(this.width, pos.y),
      new Vector(this.width, this.height),
      new Vector(pos.x, this.height)
    ]);
  },
  equals: function (rect) {
    return this.position.equals(rect.position) && this._width === rect._width && this._height === rect._height;
  },
  union: function (rect, out) {
    out = out || new Rectangle();
    out.x = math.min(this.x, rect.x);
    out.y = math.min(this.y, rect.y);
    out.width = math.max(this.right, rect.right);
    out.height = math.max(this.bottom, rect.bottom);
    return out;
  }
});
Object.defineProperty(Rectangle.prototype, "x", {
  get: function () {
    return this.position.x;
  },
  set: function (v) {
    this.position.x = v;
  }
});
Object.defineProperty(Rectangle.prototype, "y", {
  get: function () {
    return this.position.y;
  },
  set: function (v) {
    this.position.y = v;
  }
});
Object.defineProperty(Rectangle.prototype, "width", {
  get: function () {
    return this._width;
  },
  set: function (w) {
    this._width = w || 0;
    this.halfWidth = this._width / 2;
  }
});
Object.defineProperty(Rectangle.prototype, "height", {
  get: function () {
    return this._height;
  },
  set: function (h) {
    this._height = h || 0;
    this.halfHeight = this._height / 2;
  }
});
Object.defineProperty(Rectangle.prototype, "right", {
  get: function () {
    return this.x + this._width;
  }
});
Object.defineProperty(Rectangle.prototype, "left", {
  get: function () {
    return this.x;
  }
});
Object.defineProperty(Rectangle.prototype, "top", {
  get: function () {
    return this.y;
  }
});
Object.defineProperty(Rectangle.prototype, "bottom", {
  get: function () {
    return this.y + this._height;
  }
});
Object.defineProperty(Rectangle.prototype, "perimeter", {
  get: function () {
    return 2 * (this._width + this._height);
  }
});
Object.defineProperty(Rectangle.prototype, "area", {
  get: function () {
    return this._width * this._height;
  }
});
module.exports = Rectangle;

return module.exports;

});
define('utils/utils',['require','exports','module','../math/Vector','../geom/Circle','../geom/Rectangle','../geom/Polygon'],function (require, exports, module) {
  

var Vector = require("../math/Vector"), Circle = require("../geom/Circle"), Rectangle = require("../geom/Rectangle"), Polygon = require("../geom/Polygon");
var utils = {
    _arrayDelim: /[|,]/,
    noop: function () {
    },
    getAbsoluteUrl: function (url) {
      var a = document.createElement("a");
      a.href = url;
      return a.href;
    },
    ajax: function (sets) {
      sets = sets || {};
      sets.method = sets.method || "GET";
      sets.dataType = sets.dataType || "text";
      if (!sets.url)
        throw new TypeError("Undefined URL passed to ajax");
      sets.progress = sets.progress || utils.noop;
      sets.load = sets.load || utils.noop;
      sets.error = sets.error || utils.noop;
      sets.abort = sets.abort || utils.noop;
      sets.complete = sets.complete || utils.noop;
      var xhr = utils.createAjaxRequest(), protocol = utils.getAbsoluteUrl(sets.url).split("/")[0];
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var res = xhr.response || xhr.responseText, err = null;
          if (protocol !== "file:" && xhr.status !== 200)
            err = "Non-200 status code returned: " + xhr.status;
          if (!err && typeof res === "string") {
            if (sets.dataType === "json") {
              try {
                res = JSON.parse(res);
              } catch (e) {
                err = e;
              }
            } else if (sets.dataType === "xml") {
              try {
                res = utils.parseXML(res);
              } catch (e) {
                err = e;
              }
            }
          }
          if (err) {
            if (sets.error)
              sets.error.call(xhr, err);
          } else {
            if (sets.load)
              sets.load.call(xhr, res);
          }
        }
      };
      if (sets.dataType !== "json" && sets.dataType !== "xml")
        xhr.responseType = sets.dataType;
      else
        xhr.responseType = "text";
      xhr.open(sets.method, sets.url, true);
      xhr.send();
      return xhr;
    },
    createAjaxRequest: function () {
      var activexmodes = [
          "Msxml2.XMLHTTP",
          "Microsoft.XMLHTTP"
        ];
      if (window.ActiveXObject) {
        for (var i = 0; i < activexmodes.length; i++) {
          try {
            return new window.ActiveXObject(activexmodes[i]);
          } catch (e) {
          }
        }
      } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else {
        return false;
      }
    },
    setValues: function (obj, values) {
      if (!values)
        return;
      for (var key in values) {
        var newVal = values[key];
        if (newVal === undefined) {
          continue;
        }
        if (key in obj) {
          var curVal = obj[key];
          if (typeof curVal === "number" && typeof newVal === "string") {
            var n;
            if (newVal.indexOf("0x") === 0)
              n = parseInt(newVal, 16);
            else
              n = parseInt(newVal, 10);
            if (!isNaN(n))
              obj[key] = n;
          } else if (curVal instanceof Vector && newVal instanceof Array) {
            curVal.set(parseFloat(newVal[0], 10) || 0, parseFloat(newVal[1], 10) || parseFloat(newVal[0], 10) || 0);
          } else if (curVal instanceof Vector && typeof newVal === "string") {
            var a = newVal.split(utils._arrayDelim, 2);
            curVal.set(parseFloat(a[0], 10) || 0, parseFloat(a[1], 10) || parseFloat(a[0], 10) || 0);
          } else if (curVal instanceof Vector && typeof newVal === "number") {
            curVal.set(newVal, newVal);
          } else if (curVal instanceof Array && typeof newVal === "string") {
            obj[key] = newVal.split(utils._arrayDelim);
            for (var i = 0, il = obj[key].length; i < il; ++i) {
              var val = obj[key][i];
              if (!isNaN(val))
                obj[key][i] = parseFloat(val, 10);
            }
          } else {
            obj[key] = newVal;
          }
        }
      }
      return obj;
    },
    extend: function () {
      var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; i++) {
        options = arguments[i];
        if (options !== null && options !== undefined) {
          for (name in options) {
            src = target[name];
            copy = options[name];
            if (target === copy) {
              continue;
            }
            if (deep && copy && (utils.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Array.isArray(src) ? src : [];
              } else {
                clone = src && utils.isPlainObject(src) ? src : {};
              }
              target[name] = utils.extend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    },
    isPlainObject: function (obj) {
      if (typeof obj !== "object" || obj.nodeType || obj === obj.window) {
        return false;
      }
      try {
        if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    getOffset: function (element) {
      var box = element.getBoundingClientRect(), clientTop = element.clientTop || document.body.clientTop || 0, clientLeft = element.clientLeft || document.body.clientLeft || 0, scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop, scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;
      return new Vector(box.left + scrollLeft - clientLeft, box.top + scrollTop - clientTop);
    },
    parseHitArea: function (hv) {
      var ha;
      if (hv.length % 2 !== 0 && hv.length !== 3) {
        throw new RangeError("Strange number of values for hitArea! Should be a flat array of values, like: [x,y,r] for a circle, [x,y,w,h] for a rectangle, or [x,y,x,y,...] for other polygons.");
      }
      if (hv.length === 3) {
        ha = new Circle(hv[0], hv[1], hv[2]);
      } else if (hv.length === 4) {
        ha = new Rectangle(hv[0], hv[1], hv[2], hv[3]);
      } else {
        ha = new Polygon(0, 0, hv);
      }
      return ha;
    },
    parseTiledProperties: function (obj) {
      if (!obj || obj.__tiledparsed)
        return obj;
      for (var k in obj) {
        var v = obj[k], n = parseFloat(v, 10);
        if (n === 0 || n)
          obj[k] = n;
        else if (v === "true")
          obj[k] = true;
        else if (v === "false")
          obj[k] = false;
        else {
          try {
            v = JSON.parse(v);
            obj[k] = v;
          } catch (e) {
          }
        }
      }
      if (obj.hitArea)
        obj.hitArea = utils.parseHitArea(obj.hitArea);
      if (obj.body === "static" || obj.sensor) {
        obj.mass = Infinity;
        obj.inertia = Infinity;
      }
      obj.__tiledparsed = true;
      return obj;
    },
    _logger: window.console || {},
    log: function () {
      if (utils._logger.log)
        utils._logger.log.apply(utils._logger, arguments);
    },
    warn: function () {
      if (utils._logger.warn)
        utils._logger.warn.apply(utils._logger, arguments);
    },
    error: function () {
      if (utils._logger.error)
        utils._logger.error.apply(utils._logger, arguments);
    }
  };
if (typeof window.DOMParser !== "undefined") {
  utils.parseXML = function (xmlStr) {
    return new window.DOMParser().parseFromString(xmlStr, "text/xml");
  };
} else if (typeof window.ActiveXObject !== "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
  utils.parseXML = function (xmlStr) {
    var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = "false";
    xmlDoc.loadXML(xmlStr);
    return xmlDoc;
  };
} else {
  utils.warn("XML parser not available, trying to parse any XML will result in an error.");
  utils.parseXML = function () {
    throw new Error("Trying to parse XML, but not XML parser is available in this environment");
  };
}
module.exports = utils;

return module.exports;

});
define('audio/AudioPlayer',['require','exports','module','./AudioPlayer','../utils/EventEmitter','../utils/utils','../utils/inherit','../utils/support'],function (require, exports, module) {
  

var AudioPlayer = require("./AudioPlayer"), EventEmitter = require("../utils/EventEmitter"), utils = require("../utils/utils"), inherit = require("../utils/inherit"), support = require("../utils/support");
var AudioPlayer = function (manager, audio, settings) {
  EventEmitter.call(this);
  this.src = "";
  this.game = manager.game;
  this.key = audio.key;
  this.autoplay = false;
  this.format = null;
  this.loop = false;
  this.pos3d = [
    0,
    0,
    -0.5
  ];
  this.sprite = {};
  Object.defineProperty(this, "volume", {
    get: this.getVolume.bind(this),
    set: this.setVolume.bind(this)
  });
  this._file = audio;
  this._volume = 1;
  this._duration = 0;
  this._loaded = false;
  this._manager = manager;
  this._webAudio = support.webAudio;
  this._nodes = [];
  this._onendTimer = [];
  utils.setValues(this, settings);
  if (this._webAudio) {
    this._setupAudioNode();
  }
  this._load();
};
inherit(AudioPlayer, Object, {
  _load: function () {
    var self = this, audio = this._file;
    if (audio.webAudio) {
      if (!audio.decoded) {
        this._manager.ctx.decodeAudioData(audio.data, function (buffer) {
          if (buffer) {
            audio.data = buffer;
            audio.decoded = true;
            self._loadSoundBuffer(buffer);
          }
        });
      } else {
        this._loadSoundBuffer(audio.data);
      }
    } else {
      var node = audio.data.cloneNode();
      this._nodes.push(node);
      node._pos = 0;
      node.volume = this._manager.muted ? 0 : this._volume * this._manager.volume;
      this._duration = node.duration;
      this.sprite._default = [
        0,
        node.duration * 1000
      ];
      if (!this._loaded) {
        this._loaded = true;
        this.emit("ready", this.src);
      }
      if (this.autoplay) {
        this.play();
      }
    }
    return this;
  },
  play: function (sprite, cb) {
    var self = this;
    if (typeof sprite === "function") {
      cb = sprite;
      sprite = null;
    }
    if (!sprite) {
      sprite = "_default";
    }
    if (!this._loaded) {
      this.on("ready", function () {
        self.play(sprite, cb);
      });
      return this;
    }
    if (!this.sprite[sprite]) {
      if (typeof cb === "function")
        cb();
      return this;
    }
    this._inactiveNode(function (node) {
      var pos = node._pos > 0 ? node._pos : self.sprite[sprite][0] / 1000, duration = self.sprite[sprite][1] / 1000 - node._pos, loop = self.loop || self.sprite[sprite][2], soundId = typeof cb === "string" ? cb : Math.round(Date.now() * Math.random()) + "", timerId;
      node._sprite = sprite;
      (function (o) {
        timerId = setTimeout(function () {
          if (!self._webAudio && o.loop) {
            self.stop(o.id, o.timer).play(o.sprite, o.id);
          }
          if (self._webAudio && !o.loop) {
            self._nodeById(o.id).paused = true;
          }
          if (!self._webAudio && !o.loop) {
            self.stop(o.id, o.timer);
          }
          self.emit("end", o.id);
        }, duration * 1000);
        self._onendTimer.push(timerId);
        o.timer = timerId;
      }({
        id: soundId,
        sprite: sprite,
        loop: loop
      }));
      if (self._webAudio) {
        node.id = soundId;
        node.paused = false;
        self._refreshBuffer([
          loop,
          pos,
          duration
        ], soundId);
        self._playStart = self._manager.ctx.currentTime;
        node.gain.value = self._volume;
        if (typeof node.bufferSource.start === "undefined") {
          node.bufferSource.noteGrainOn(0, pos, duration);
        } else {
          node.bufferSource.start(0, pos, duration);
        }
      } else {
        if (node.readyState === 4) {
          node.id = soundId;
          node.currentTime = pos;
          node.muted = self._manager.muted;
          node.volume = self._volume * self._manager.volume;
          node.play();
        } else {
          self._clearEndTimer(timerId);
          (function () {
            var sound = self, playSpr = sprite, fn = cb, newNode = node;
            var evt = function () {
              sound.play(playSpr, fn);
              newNode.removeEventListener("canplaythrough", evt, false);
            };
            newNode.addEventListener("canplaythrough", evt, false);
          }());
          return self;
        }
      }
      self.emit("play", soundId);
      if (typeof cb === "function")
        cb(soundId);
    });
    return this;
  },
  pause: function (id, timerId) {
    var self = this;
    if (!this._loaded) {
      this.on("play", function () {
        self.play(id, timerId);
      });
      return this;
    }
    this._clearEndTimer(timerId || 0);
    var activeNode = id ? this._nodeById(id) : this._activeNode();
    if (activeNode) {
      if (this._webAudio) {
        if (!activeNode.bufferSource)
          return this;
        activeNode.paused = true;
        activeNode._pos += this._manager.ctx.currentTime - this._playStart;
        if (typeof activeNode.bufferSource.stop === "undefined") {
          activeNode.bufferSource.noteOff(0);
        } else {
          activeNode.bufferSource.stop(0);
        }
      } else {
        activeNode._pos = activeNode.currentTime;
        activeNode.pause();
      }
    }
    this.emit("pause", activeNode ? activeNode.id : id);
    return this;
  },
  stop: function (id, timerId) {
    var self = this;
    if (!this._loaded) {
      this.on("play", function () {
        self.stop(id, timerId);
      });
      return this;
    }
    this._clearEndTimer(timerId || 0);
    var activeNode = id ? this._nodeById(id) : this._activeNode();
    if (activeNode) {
      activeNode._pos = 0;
      if (this._webAudio) {
        if (!activeNode.bufferSource)
          return this;
        activeNode.paused = true;
        if (typeof activeNode.bufferSource.stop === "undefined") {
          activeNode.bufferSource.noteOff(0);
        } else {
          activeNode.bufferSource.stop(0);
        }
      } else {
        activeNode.pause();
        activeNode.currentTime = 0;
      }
    }
    return this;
  },
  mute: function (id) {
    return this.setMuted(true, id);
  },
  unmute: function (id) {
    return this.setMuted(false, id);
  },
  setMuted: function (muted, id) {
    var self = this;
    if (!this._loaded) {
      this.on("play", function () {
        self.setMuted(muted, id);
      });
      return this;
    }
    var activeNode = id ? this._nodeById(id) : this._activeNode();
    if (activeNode) {
      if (this._webAudio) {
        activeNode.gain.value = muted ? 0 : this._volume;
      } else {
        activeNode.volume = muted ? 0 : this._volume;
      }
    }
    return this;
  },
  seek: function (pos, id) {
    var self = this;
    if (!this._loaded) {
      this.on("ready", function () {
        self.seek(pos, id);
      });
      return this;
    }
    if (!pos || pos < 0)
      pos = 0;
    var activeNode = id ? this._nodeById(id) : this._activeNode();
    if (activeNode) {
      if (this._webAudio) {
        activeNode._pos = pos;
        this.pause(activeNode.id).play(activeNode._sprite, id);
      } else {
        activeNode.currentTime = pos;
      }
    }
    return this;
  },
  getPosition: function (id) {
    var self = this;
    if (!this._loaded) {
      this.on("ready", function () {
        self.getPosition(id);
      });
      return this;
    }
    var activeNode = id ? this._nodeById(id) : this._activeNode();
    if (activeNode) {
      if (this._webAudio) {
        return activeNode._pos + (this._manager.ctx.currentTime - this._playStart);
      } else {
        return activeNode.currentTime;
      }
    }
    return 0;
  },
  fade: function (from, to, len, id, cb) {
    var self = this, diff = Math.abs(from - to), dir = from > to ? "dowm" : "up", steps = diff / 0.01, stepTime = len / steps;
    if (typeof id === "function") {
      cb = id;
      id = null;
    }
    if (!this._loaded) {
      this.on("ready", function () {
        self.fade(from, to, len, id, cb);
      });
      return this;
    }
    this.setVolume(from, id);
    for (var i = 1; i <= steps; ++i) {
      var change = this._volume + (dir === "up" ? 0.01 : -0.01) * i, vol = Math.round(1000 * change) / 1000, wait = stepTime * i;
      this._doFadeStep(vol, wait, to, id, cb);
    }
  },
  getVolume: function () {
    return this._volume;
  },
  setVolume: function (vol, id) {
    var self = this;
    vol = parseFloat(vol);
    if (!this._loaded) {
      this.on("play", function () {
        self.setVolume(vol, id);
      });
      return this;
    }
    if (vol >= 0 && vol <= 1) {
      this._volume = vol;
      var activeNode = id ? this._nodeById(id) : this._activeNode();
      if (activeNode) {
        if (this._webAudio) {
          activeNode.gain.volume = vol;
        } else {
          activeNode.volume = vol * this._manager.volume;
        }
      }
    }
    return this;
  },
  setPosition: function (x, y, z, id) {
    var self = this;
    x = !x ? 0 : x;
    y = !y ? 0 : y;
    z = !z && z !== 0 ? -0.5 : z;
    if (!this._loaded) {
      this.on("play", function () {
        self.setPosition(x, y, z, id);
      });
      return this;
    }
    if (this._webAudio) {
      var activeNode = id ? this._nodeById(id) : this._activeNode();
      if (activeNode) {
        this.pos3d[0] = x;
        this.pos3d[1] = y;
        this.pos3d[2] = z;
        activeNode.panner.setPosition(x, y, z);
      }
    }
    return this;
  },
  _doFadeStep: function (vol, wait, end, id, cb) {
    var self = this;
    setTimeout(function () {
      self.setVolume(vol, id);
      if (vol === end) {
        if (typeof cb === "function")
          cb();
      }
    }, wait);
  },
  _nodeById: function (id) {
    var node = this._nodes[0];
    for (var i = 0, il = this._nodes.length; i < il; ++i) {
      if (this._nodes[i].id === id) {
        node = this._nodes[i];
        break;
      }
    }
    return node;
  },
  _activeNode: function () {
    var node;
    for (var i = 0, il = this._nodes.length; i < il; ++i) {
      if (!this._nodes[i].paused) {
        node = this._nodes[i];
        break;
      }
    }
    this._drainPool();
    return node;
  },
  _inactiveNode: function (cb) {
    var node;
    for (var i = 0, il = this._nodes.length; i < il; ++i) {
      if (this._nodes[i].paused && this._nodes[i].readyState === 4) {
        cb(node = this._nodes[i]);
        break;
      }
    }
    this._drainPool();
    if (node)
      return;
    if (this._webAudio) {
      node = this._setupAudioNode();
      cb(node);
    } else {
      this._load();
      node = this._nodes[this.nodes.length - 1];
      node.addEventListener("loadedmetadata", function () {
        cb(node);
      });
    }
  },
  _drainPool: function () {
    var inactive = 0, i = 0, il = 0;
    for (i = 0, il = this._nodes.length; i < il; ++i) {
      if (this._nodes[i].paused) {
        inactive++;
      }
    }
    for (i = this._nodes.length - 1; i >= 0; --i) {
      if (inactive <= 5)
        break;
      if (this._nodes[i].paused) {
        inactive--;
        this._nodes.splice(i, 1);
      }
    }
  },
  _clearEndTimer: function (timerId) {
    var timer = this._onendTimer.indexOf(timerId);
    timer = timer >= 0 ? timer : 0;
    if (this._onendTimer[timer]) {
      clearTimeout(this._onendTimer[timer]);
      this._onendTimer.splice(timer, 1);
    }
  },
  _setupAudioNode: function () {
    var node = this._manager.ctx.createGain ? this._manager.ctx.createGain() : this._manager.ctx.createGainNode();
    this._nodes.push(node);
    node.gain.value = this._volume;
    node.paused = true;
    node._pos = 0;
    node.readyState = 4;
    node.connect(this._manager.masterGain);
    node.panner = this._manager.ctx.createPanner();
    node.panner.setPosition(this.pos3d[0], this.pos3d[1], this.pos3d[2]);
    node.panner.connect(node);
    return node;
  },
  _loadSoundBuffer: function (buffer) {
    this._duration = buffer ? buffer.duration : this._duration;
    this.sprite._default = [
      0,
      this._duration * 1000
    ];
    if (!this._loaded) {
      this._loaded = true;
      this.emit("ready", this.src);
    }
    if (this.autoplay) {
      this.play();
    }
  },
  _refreshBuffer: function (loop, id) {
    var node = this._nodeById(id);
    node.bufferSource = this._manager.ctx.createBufferSource();
    node.bufferSource.buffer = this._file.data;
    node.bufferSource.connect(node.panner);
    node.bufferSource.loop = loop[0];
    if (loop[0]) {
      node.bufferSource.loopStart = loop[1];
      node.bufferSource.loopEnd = loop[1] + loop[2];
    }
  }
});
module.exports = AudioPlayer;

return module.exports;

});
define('audio/AudioManager',['require','exports','module','./AudioPlayer','../utils/inherit','../utils/support'],function (require, exports, module) {
  

var AudioPlayer = require("./AudioPlayer"), inherit = require("../utils/inherit"), support = require("../utils/support");
var __AudioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext, __audioctx = support.webAudio ? new __AudioCtx() : null;
var AudioManager = function (game, parent) {
  this.game = game;
  this.parent = parent;
  this._muted = false;
  this._volume = 1;
  Object.defineProperty(this, "volume", {
    get: this.getVolume.bind(this),
    set: this.setVolume.bind(this)
  });
  this.ctx = __audioctx;
  this.canPlay = support.webAudio || support.htmlAudio;
  if (support.webAudio) {
    this.masterGain = this.ctx.createGain ? this.ctx.createGain() : this.ctx.createGainNode();
    this.masterGain.gain.value = 1;
    this.setParent(parent);
  }
  this.sounds = {};
};
inherit(AudioManager, Object, {
  getVolume: function () {
    return this._volume;
  },
  setVolume: function (v) {
    v = parseFloat(v, 10);
    if (!isNaN(v) && v >= 0 && v <= 1) {
      this._volume = v;
      if (support.webAudio)
        this.masterGain.gain.value = v;
      for (var key in this.sounds) {
        if (this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
          var player = this.sounds[key];
          for (var i = 0, il = player._nodes.length; i < il; ++i) {
            player._nodes[i].volume = player._volume * this._volume;
          }
        }
      }
    }
  },
  mute: function () {
    return this.setMuted(true);
  },
  unmute: function () {
    return this.setMuted(false);
  },
  setMuted: function (m) {
    this._muted = m = !!m;
    if (support.webAudio)
      this.masterGain.gain.value = m ? 0 : this._volume;
    for (var key in this.sounds) {
      if (this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
        var player = this.sounds[key];
        for (var i = 0, il = player._nodes.length; i < il; ++i) {
          player._nodes[i].mute();
        }
      }
    }
    return this;
  },
  setParent: function (parent) {
    this.parent = parent;
    if (support.webAudio) {
      if (parent && parent.masterGain) {
        this.masterGain.connect(parent.masterGain);
      } else {
        this.masterGain.connect(this.ctx.destination);
      }
    }
    return this;
  },
  attach: function (sound) {
    if (sound._manager !== this) {
      if (sound._manager)
        sound._manager.detach(sound);
      this.sounds[sound.key] = sound;
      sound._manager = this;
      if (support.webAudio) {
        for (var i = 0; i < sound._nodes.length; ++i) {
          sound._nodes[i].connect(this.masterGain);
        }
      }
    }
    return sound;
  },
  detach: function (sound) {
    if (sound._manager !== this) {
      delete this.sounds[sound.key];
      sound._manager = null;
      if (support.webAudio) {
        for (var i = 0; i < sound._nodes.length; ++i) {
          sound._nodes[i].disconnect();
        }
      }
    }
    return sound;
  },
  add: function (key, settings) {
    if (!this.canPlay) {
      return false;
    }
    var audio = this.game.cache.getAudio(key);
    if (!audio.player)
      audio.player = new AudioPlayer(this, audio, settings);
    return this.sounds[key] = audio.player;
  },
  remove: function (key) {
    var audio = this.sounds[key];
    if (audio) {
      audio.stop();
    }
    delete this.sounds[key];
    return audio ? audio : false;
  }
});
module.exports = AudioManager;

return module.exports;

});
define('physics/PhysicsTarget',['require','exports','module','../math/Vector'],function (require, exports, module) {
  

var Vector = require("../math/Vector");
module.exports = function () {
  this._phys = {};
  this.mass = 0;
  this.inertia = 0;
  this._velocity = new Vector();
  this.enablePhysics = function (sys, cb) {
    var self = this;
    if (typeof sys === "function") {
      cb = sys;
      sys = null;
    }
    if (sys) {
      if (this._phys.active) {
        this._phys.system.remove(this, function () {
          sys.add(self, cb);
        });
      } else {
        sys.add(this, cb);
      }
      this._phys.system = sys;
    } else {
      this._phys.system.add(this, cb);
    }
    return this;
  };
  this.disablePhysics = function (cb) {
    if (this._phys.system) {
      this._phys.system.remove(this, cb);
    }
    return this;
  };
  this.reindex = function (cb) {
    if (this._phys.system) {
      this._phys.system.reindex(this, cb);
    }
    return this;
  };
  this.setMass = function (mass) {
    if (this._phys.system) {
      this._phys.system.setMass(this, mass);
    }
    return this;
  };
  this.setVelocity = function (x, y) {
    y = x.y !== undefined ? x.y : y || 0;
    x = x.x !== undefined ? x.x : x || 0;
    this._velocity.set(x, y);
    if (this._phys.system) {
      this._phys.system.setVelocity(this, this._velocity);
    }
    return this;
  };
  this.setRotation = function (rads) {
    this.rotation = rads;
    if (this._phys.system) {
      this._phys.system.setRotation(this, rads);
    }
    return this;
  };
  this.setPosition = function (x, y) {
    y = x.y !== undefined ? x.y : y || 0;
    x = x.x !== undefined ? x.x : x || 0;
    this.position.set(x, y);
    if (this._phys.system) {
      this._phys.system.setPosition(this, this.position);
    }
    return this;
  };
  this.onCollision = function (obj, vec, colShape, myShape) {
    this.emit("collision", obj, vec, colShape, myShape);
  };
  this.onSeparate = function (obj, colShape, myShape) {
    this.emit("separate", obj, colShape, myShape);
  };
};

return module.exports;

});
define('display/Container',['require','exports','module','../utils/EventEmitter','../physics/PhysicsTarget','../utils/utils','../utils/inherit','../vendor/pixi'],function (require, exports, module) {
  

var EventEmitter = require("../utils/EventEmitter"), PhysicsTarget = require("../physics/PhysicsTarget"), utils = require("../utils/utils"), inherit = require("../utils/inherit"), PIXI = require("../vendor/pixi");
var Container = function (settings) {
  PIXI.DisplayObjectContainer.call(this);
  EventEmitter.call(this);
  PhysicsTarget.call(this);
  utils.setValues(this, settings);
};
inherit(Container, PIXI.DisplayObjectContainer, {
  show: function () {
    this.visible = true;
    return this;
  },
  hide: function () {
    this.visible = false;
    return this;
  },
  addChild: function (child) {
    PIXI.DisplayObjectContainer.prototype.addChild.apply(this, arguments);
    return child;
  },
  addChildAt: function (child) {
    PIXI.DisplayObjectContainer.prototype.addChildAt.apply(this, arguments);
    return child;
  },
  removeChild: function (child) {
    PIXI.DisplayObjectContainer.prototype.removeChild.apply(this, arguments);
    return child;
  },
  removeAllChildren: function () {
    while (this.children.length) {
      this.removeChild(this.children[0]);
    }
    return this;
  },
  bringChildToTop: function (child) {
    if (child.parent === this) {
      this.addChild(this.removeChild(child));
    }
    return child;
  },
  destroy: function () {
    this.disablePhysics();
    this.destroyAllChildren();
    if (this.parent)
      this.parent.removeChild(this);
  },
  destroyAllChildren: function () {
    while (this.children.length) {
      if (this.children[0].destroy) {
        this.children[0].destroy();
      } else {
        this.removeChild(this.children[0]);
      }
    }
    return this;
  },
  onCollide: function () {
  }
});
module.exports = Container;

return module.exports;

});
define('display/Texture',['require','exports','module','../vendor/pixi','../utils/utils','../vendor/pixi'],function (require, exports, module) {
  

var Texture = require("../vendor/pixi").Texture, utils = require("../utils/utils"), PIXI = require("../vendor/pixi");
Texture.fromJSON = function (key, json, baseTexture) {
  if (!json.frames) {
    utils.warn("Invalid Texture Atlas JSON for fromJSON, missing \"frames\" array, full json:", json);
    return;
  }
  var frames = json.frames, textures = {}, subkey;
  if (frames.length) {
    for (var i = 0, il = frames.length; i < il; ++i) {
      subkey = key + "_" + frames[i].filename;
      textures[frames[i].filename] = Texture._createFrame(subkey, frames[i], baseTexture);
    }
  } else {
    for (var k in frames) {
      subkey = key + "_" + k;
      textures[k] = Texture._createFrame(subkey, frames[k], baseTexture);
    }
  }
  return textures;
};
Texture._createFrame = function (key, data, baseTexture) {
  var rect = data.frame;
  if (rect) {
    var tx = PIXI.TextureCache[key] = new Texture(baseTexture, {
        x: rect.x,
        y: rect.y,
        width: rect.w,
        height: rect.h
      });
    tx.trimmed = data.trimmed;
    tx.rotated = data.rotated;
    tx.sourceSize = data.sourceSize;
    tx.realSize = data.spriteSourceSize;
    return tx;
  }
};
Texture.fromXML = function (key, xml, baseTexture) {
  if (!xml.getElementsByTagName("TextureAtlas")) {
    utils.warn("Invalid Texture Atlas XML given, missing <TextureAtlas> tag, full xml:", xml);
    return;
  }
  var frames = xml.getElementsByTagName("SubTexture") || xml.getElementsByTagName("sprite"), textures = {};
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i], attrs = frame.attributes, name = attrs.getNamedItem("name") || attrs.getNamedItem("n"), x = attrs.getNamedItem("x"), y = attrs.getNamedItem("y"), width = attrs.getNamedItem("width") || attrs.getNamedItem("w"), height = attrs.getNamedItem("height") || attrs.getNamedItem("h"), ox = attrs.getNamedItem("frameX") || attrs.getNamedItem("oX"), oy = attrs.getNamedItem("frameY") || attrs.getNamedItem("oY"), owidth = attrs.getNamedItem("frameWidth") || attrs.getNamedItem("oW"), oheight = attrs.getNamedItem("frameHeight") || attrs.getNamedItem("oH"), rotated = !!attrs.getNamedItem("r");
    var tx = textures[name] = PIXI.TextureCache[key + "_" + name] = new Texture(baseTexture, {
        x: parseInt(x.nodeValue, 10),
        y: parseInt(y.nodeValue, 10),
        width: parseInt(width.nodeValue, 10),
        height: parseInt(height.nodeValue, 10)
      });
    tx.trimmed = ox && oy;
    tx.rotated = rotated;
    if (tx.trimmed) {
      tx.sourceSize = {
        w: parseInt(owidth.nodeValue, 10),
        h: parseInt(oheight.nodeValue, 10)
      };
      tx.realSize = {
        x: Math.abs(parseInt(ox.nodeValue, 10)),
        y: Math.abs(parseInt(oy.nodeValue, 10)),
        w: parseInt(owidth.nodeValue, 10),
        h: parseInt(oheight.nodeValue, 10)
      };
    }
  }
  return textures;
};
Texture.fromSpritesheet = function (obj) {
  return obj;
};
module.exports = Texture;

return module.exports;

});
define('display/Sprite',['require','exports','module','../utils/EventEmitter','../geom/Rectangle','../physics/PhysicsTarget','../utils/inherit','./Texture','../math/math','../utils/utils','../vendor/pixi'],function (require, exports, module) {
  

var EventEmitter = require("../utils/EventEmitter"), Rectangle = require("../geom/Rectangle"), PhysicsTarget = require("../physics/PhysicsTarget"), inherit = require("../utils/inherit"), Texture = require("./Texture"), math = require("../math/math"), utils = require("../utils/utils"), PIXI = require("../vendor/pixi");
var Sprite = function (anims, speed, start) {
  EventEmitter.call(this);
  PhysicsTarget.call(this);
  if (!anims) {
    anims = Texture.__default;
  }
  if (anims instanceof Texture) {
    anims = { _default: { frames: [anims] } };
    start = "_default";
  } else if (anims instanceof Array) {
    anims = { _default: { frames: anims } };
    start = "_default";
  } else {
    for (var a in anims) {
      if (start === undefined)
        start = a;
      var anim = anims[a];
      if (anim instanceof Array)
        anims[a] = {
          name: a,
          frames: anim
        };
      else if (anim instanceof Texture)
        anims[a] = {
          name: a,
          frames: [anim]
        };
      else
        anims[a].name = a;
    }
  }
  PIXI.Sprite.call(this, anims[start].frames[0]);
  this.name = "";
  this.lifespan = Infinity;
  this.speed = speed || 1;
  this.loop = false;
  this.animations = anims;
  this.currentAnimation = start;
  this.currentFrame = 0;
  this.playing = false;
  this.hitArea = this.hitArea || new Rectangle(0, 0, this.width, this.height);
  this.goto(0, this.currentAnimation);
};
inherit(Sprite, PIXI.Sprite, {
  show: function () {
    this.visible = true;
    return this;
  },
  hide: function () {
    this.visible = false;
    return this;
  },
  clone: function () {
    var anims = utils.extend(true, {}, this.animations), spr = new Sprite(anims, this.speed, this.currentAnimation);
    spr.name = this.name;
    spr.loop = this.loop;
    spr.currentFrame = this.currentFrame;
    spr.playing = this.playing;
    spr.hitArea = this.hitArea.clone();
    spr.body = this.body.clone();
    spr.blendMode = this.blendMode;
    spr.anchor.x = this.anchor.x;
    spr.anchor.y = this.anchor.y;
    spr.position.x = this.position.x;
    spr.position.y = this.position.y;
    spr.scale.x = this.scale.x;
    spr.scale.y = this.scale.y;
    spr.pivot.x = this.pivot.x;
    spr.pivot.y = this.pivot.y;
    spr.rotation = this.rotation;
    spr.alpha = this.alpha;
    spr.visible = this.visible;
    spr.buttonMode = this.buttonMode;
    spr.renderable = this.renderable;
    return spr;
  },
  addAnimation: function (name, frames, speed, loop) {
    if (typeof name === "object") {
      this.animations[name.name] = name;
    } else {
      this.animations[name] = {
        name: name,
        frames: frames,
        speed: speed,
        loop: loop
      };
    }
    return this;
  },
  goto: function (frame, anim) {
    if (typeof frame === "string") {
      anim = frame;
      frame = 0;
    }
    this.currentFrame = frame || 0;
    this.lastRound = math.round(frame || 0);
    if (anim) {
      this.currentAnimation = anim;
    }
    this.setTexture(this.animations[this.currentAnimation].frames[this.currentFrame]);
    this.emit("frame", this.currentAnimation, this.lastRound);
    return this;
  },
  play: function () {
    this.playing = true;
    return this;
  },
  stop: function () {
    this.playing = false;
    return this;
  },
  destroy: function () {
    this.stop();
    this.disablePhysics();
    if (this.parent)
      this.parent.removeChild(this);
    this.name = null;
    this.lifetime = null;
    this.speed = null;
    this.loop = null;
    this.animations = null;
    this.currentAnimation = null;
    this.currentFrame = null;
    this.playing = null;
    this.hitArea = null;
  },
  updateTransform: function () {
    PIXI.Sprite.prototype.updateTransform.call(this);
    if (!this.playing)
      return;
    var anim = this.animations[this.currentAnimation], round, loop = anim.loop !== undefined ? anim.loop : this.loop;
    this.currentFrame += anim.speed || this.speed;
    round = math.round(this.currentFrame);
    if (round < anim.frames.length) {
      if (round !== this.lastRound) {
        this.lastRound = round;
        this.setTexture(anim.frames[round]);
        this.emit("frame", this.currentAnimation, round);
      }
    } else {
      if (loop) {
        this.goto(0);
      } else {
        this.stop();
        this.emit("complete", this.currentAnimation);
      }
    }
  }
});
module.exports = Sprite;

return module.exports;

});
define('utils/ObjectPool',['require','exports','module','./inherit'],function (require, exports, module) {
  

var inherit = require("./inherit");
var ObjectPool = function (type, parent) {
  this.type = type;
  this.pool = [];
  this.parent = parent;
};
inherit(ObjectPool, Object, {
  create: function () {
    var o = this.pool.pop();
    if (!o) {
      o = this._construct(this.type, arguments);
      if (this.parent)
        this.parent.addChild(o);
    }
    o.__allocated = true;
    return o;
  },
  free: function (o) {
    if (o.__allocated) {
      o.__allocated = false;
      this.pool.push(o);
    }
  },
  _construct: function (ctor, args) {
    function F() {
      return ctor.apply(this, args);
    }
    F.prototype = ctor.prototype;
    return new F();
  }
});
module.exports = ObjectPool;

return module.exports;

});
define('gui/GuiItem',['require','exports','module','../utils/inherit','../display/Sprite'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Sprite = require("../display/Sprite");
var GuiItem = function (texture, interactive) {
  this.draggable = false;
  this.dragging = false;
  Sprite.call(this, texture);
  this.interactive = interactive;
};
inherit(GuiItem, Sprite, {
  mousedown: function (e) {
    Sprite.prototype.mousedown.call(this, e);
    if (!this.draggable)
      return;
    this.dragging = e.data.getLocalPosition(e.object.parent);
  },
  mouseup: function (e) {
    Sprite.prototype.mouseup.call(this, e);
    this.dragging = false;
  },
  mousemove: function (e) {
    Sprite.prototype.mousemove.call(this, e);
    if (!this.draggable || !this.dragging)
      return;
    var pos = e.data.getLocalPosition(this.parent);
    this.position.x += pos.x - this.dragging.x;
    this.position.y += pos.y - this.dragging.y;
    this.dragging = pos;
  }
});
module.exports = GuiItem;

return module.exports;

});
define('geom/Ellipse',['require','exports','module','../vendor/pixi'],function (require, exports, module) {
  

var Ellipse = require("../vendor/pixi").Ellipse;
module.exports = Ellipse;

return module.exports;

});
define('tilemap/ObjectGroup',['require','exports','module','../display/Container','../math/Vector','../geom/Polygon','../geom/Ellipse','../geom/Rectangle','../utils/utils','../utils/inherit','../math/math'],function (require, exports, module) {
  

var Container = require("../display/Container"), Vector = require("../math/Vector"), Polygon = require("../geom/Polygon"), Ellipse = require("../geom/Ellipse"), Rectangle = require("../geom/Rectangle"), utils = require("../utils/utils"), inherit = require("../utils/inherit"), math = require("../math/math");
var ObjectGroup = function (map, group) {
  Container.call(this, group);
  this.map = map;
  this.game = map.game;
  this.state = map.state;
  this.name = group.name || "";
  this.color = group.color;
  this.properties = group.properties || {};
  this.objects = group.objects;
  this.type = group.type || "objectgroup";
  this.position.x = group.x || 0;
  this.position.y = group.y || 0;
  this.alpha = group.opacity !== undefined ? group.opacity : 1;
  this.visible = group.visible !== undefined ? group.visible : true;
};
inherit(ObjectGroup, Container, {
  spawn: function () {
    var game = this.game;
    for (var i = this.objects.length - 1; i >= 0; --i) {
      var o = this.objects[i], props = utils.parseTiledProperties(o.properties) || {}, set, interactive, obj;
      props.tileprops = {};
      if (o.gid) {
        set = this.parent.getTileset(o.gid);
        if (set) {
          props.texture = set.getTileTexture(o.gid);
          props.tileprops = set.getTileProperties(o.gid);
          if (!props.hitArea) {
            if (props.tileprops.hitArea)
              props.hitArea = props.tileprops.hitArea;
            else
              props.hitArea = set.properties.hitArea;
          }
        }
      } else {
        if (!props.hitArea) {
          if (o.polyline)
            props.hitArea = this._getPolyline(o);
          else if (o.polygon)
            props.hitArea = this._getPolygon(o);
          else if (o.ellipse)
            props.hitArea = this._getEllipse(o);
          else
            props.hitArea = this._getRectangle(o);
        }
      }
      o.name = o.name || props.name || props.tileprops.name;
      o.type = o.type || props.type || props.tileprops.type;
      if (typeof props.texture === "string") {
        props.texture = game.cache.getTexture(props.texture);
      }
      if (!props.texture) {
        obj = new Container();
        obj.width = o.width;
        obj.height = o.height;
        obj.name = o.name;
        obj.type = o.type;
        obj.rotation = o.rotation;
        obj.position.x = o.x;
        obj.position.y = o.y;
        obj.sensor = true;
        obj.hitArea = props.hitArea;
        obj.enablePhysics(game.physics);
      } else {
        props.width = o.width;
        props.height = o.height;
        props.zIndex = this.zIndex;
        obj = game.spritepool.create(o.name, props.texture, props);
        obj.name = o.name;
        obj.type = o.type;
        obj.position.x = o.x;
        obj.position.y = o.y;
        obj.mass = props.mass || props.tileprops.mass;
        obj.inertia = props.inertia || props.tileprops.inertia;
        obj.friction = props.friction || props.tileprops.friction;
        obj.sensor = props.sensor || props.tileprops.sensor;
        obj.hitArea = props.hitArea;
        var a = props.anchor || props.tileprops.anchor;
        obj.anchor.y = a ? a[1] : 1;
        obj.anchor.x = a ? a[0] : this.parent.orientation === "isometric" ? 0.5 : 0;
        if (obj.mass) {
          obj.enablePhysics(game.physics);
        }
        if (props.tileprops) {
          if (props.tileprops.flippedX) {
            obj.scale.x = -1;
            obj.anchor.x = a ? a[0] : 1;
          }
          if (props.tileprops.flippedY) {
            obj.scale.y = -1;
            obj.anchor.y = a ? a[1] : 0;
          }
          if (props.tileprops.rotatedCW) {
            obj.rotation = math.degreesToRadians(45);
          }
        }
        if (props.animation || props.tileprops.animation) {
          if (obj.goto) {
            obj.goto(0, props.animation || props.tileprops.animation).play();
          }
        }
        if (typeof o.rotation === "number")
          obj.setRotation(o.rotation);
      }
      obj.visible = o.visible !== undefined ? !!o.visible : true;
      if (this.parent.orientation === "isometric") {
        var toTileX = o.x / this.parent.tileSize.x, toTileY = o.y / this.parent.tileSize.y;
        o.x = toTileX * this.parent.tileSize.x - (toTileY - 1) * (this.parent.tileSize.x / 2);
        o.y = toTileY * this.parent.tileSize.y / 2 + toTileX * this.parent.tileSize.y;
      }
      interactive = this._getInteractive(set, props);
      if (interactive) {
        obj.interactive = interactive;
        obj.click = this.onObjectEvent.bind(this, "click", obj);
        obj.mousedown = this.onObjectEvent.bind(this, "mousedown", obj);
        obj.mouseup = this.onObjectEvent.bind(this, "mouseup", obj);
        obj.mousemove = this.onObjectEvent.bind(this, "mousemove", obj);
        obj.mouseout = this.onObjectEvent.bind(this, "mouseout", obj);
        obj.mouseover = this.onObjectEvent.bind(this, "mouseover", obj);
        obj.mouseupoutside = this.onObjectEvent.bind(this, "mouseupoutside", obj);
      }
      obj.properties = {};
      for (var t in props.tileprops)
        obj.properties[t] = props.tileprops[t];
      for (var k in props)
        if (k !== "tileprops")
          obj.properties[k] = props[k];
      obj._objIndex = i;
      this.addChild(obj);
    }
    return this;
  },
  onObjectEvent: function (eventName, obj, data) {
    this.parent.onObjectEvent(eventName, obj, data);
  },
  _getPolygon: function (o) {
    var points = [];
    for (var i = 0, il = o.polygon.length; i < il; ++i) {
      points.push(new Vector(o.polygon[i].x, o.polygon[i].y));
    }
    return new Polygon(points);
  },
  _getPolyline: function (o) {
    var points = [];
    for (var i = 0, il = o.polyline.length; i < il; ++i) {
      points.push(new Vector(o.polyline[i].x, o.polyline[i].y));
    }
    return new Polygon(points);
  },
  _getEllipse: function (o) {
    return new Ellipse(0, 0, o.width, o.height);
  },
  _getRectangle: function (o) {
    return new Rectangle(0, 0, o.width, o.height);
  },
  _getInteractive: function (set, props) {
    return props.interactive || props.tileprops.interactive || set && set.properties.interactive || this.properties.interactive || this.parent.properties.interactive;
  },
  despawn: function () {
    return Container.prototype.destroyAllChildren.call(this);
  },
  destroy: function () {
    this.despawn();
    Container.prototype.destroy.call(this);
    this.map = null;
    this.game = null;
    this.state = null;
    this.name = null;
    this.color = null;
    this.properties = null;
    this.objects = null;
    this.type = null;
  }
});
module.exports = ObjectGroup;

return module.exports;

});
define('tilemap/Tile',['require','exports','module','../display/Sprite','../utils/inherit'],function (require, exports, module) {
  

var Sprite = require("../display/Sprite"), inherit = require("../utils/inherit");
var Tile = function (texture) {
  Sprite.call(this, texture);
};
inherit(Tile, Sprite, {});
module.exports = Tile;

return module.exports;

});
define('tilemap/Tilelayer',['require','exports','module','../display/Container','../geom/Rectangle','../math/Vector','../display/Texture','./Tile','../math/math','../utils/utils','../utils/inherit','../utils/support'],function (require, exports, module) {
  

var Container = require("../display/Container"), Rectangle = require("../geom/Rectangle"), Vector = require("../math/Vector"), Texture = require("../display/Texture"), Tile = require("./Tile"), math = require("../math/math"), utils = require("../utils/utils"), inherit = require("../utils/inherit"), support = require("../utils/support");
var Tilelayer = function (map, layer) {
  Container.call(this, layer);
  this.map = map;
  this.state = map.state;
  this.state = map.state;
  this.tiles = [];
  this.name = layer.name || "";
  this.size = new Vector(layer.width || 0, layer.height || 0);
  this.tileIds = support.typedArrays ? new Uint32Array(layer.data) : layer.data;
  this.properties = utils.parseTiledProperties(layer.properties) || {};
  this.type = layer.type || "tilelayer";
  this.preRender = layer.preRender || this.properties.preRender || false;
  this.chunkSize = new Vector(layer.chunkSizeX || layer.chunkSize || this.properties.chunkSizeX || this.properties.chunkSize || 512, layer.chunkSizeY || layer.chunkSize || this.properties.chunkSizeY || this.properties.chunkSize || 512);
  this.position.x = layer.x || 0;
  this.position.y = layer.y || 0;
  this.alpha = layer.opacity !== undefined ? layer.opacity : 1;
  this.visible = layer.visible !== undefined ? layer.visible : true;
  this._preRendered = false;
  this._tilePool = [];
  this._buffered = {
    left: false,
    right: false,
    top: false,
    bottom: false
  };
  this._panDelta = new Vector();
  this._rendered = new Rectangle();
};
inherit(Tilelayer, Container, {
  render: function (x, y, width, height) {
    if (this.preRender) {
      if (!this._preRendered) {
        this._preRender();
      } else {
        for (var c = this.children.length - 1; c > -1; --c) {
          this.children[c].visible = true;
        }
      }
      return;
    }
    if (!this.tileSize)
      this.tileSize = this.map.tileSize;
    this.clearTiles();
    this._renderTiles(x, y, width, height);
    return this;
  },
  _preRender: function () {
    if (!this.visible)
      return;
    this._preRendered = true;
    this.tileSize = this.chunkSize.clone();
    var world = this.map, width = world.size.x * world.tileSize.x, height = world.size.y * world.tileSize.y, xChunks = math.ceil(width / this.chunkSize.x), yChunks = math.ceil(height / this.chunkSize.y);
    for (var x = 0; x < xChunks; ++x) {
      for (var y = 0; y < yChunks; ++y) {
        var cw = x === xChunks - 1 ? width - x * this.chunkSize.x : this.chunkSize.x, ch = y === yChunks - 1 ? height - y * this.chunkSize.y : this.chunkSize.y;
        this._preRenderChunk(x, y, cw, ch);
      }
    }
  },
  _preRenderChunk: function (cx, cy, w, h) {
    var world = this.map, tsx = world.tileSize.x, tsy = world.tileSize.y, xTiles = w / tsx, yTiles = h / tsy, nx = cx * this.chunkSize.x % tsx, ny = cy * this.chunkSize.y % tsy, tx = math.floor(cx * this.chunkSize.x / tsx), ty = math.floor(cy * this.chunkSize.y / tsy), sx = world.size.x, sy = world.size.y, canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    for (var x = 0; x < xTiles; ++x) {
      for (var y = 0; y < yTiles; ++y) {
        if (x + tx < sx && y + ty < sy) {
          var id = x + tx + (y + ty) * sx, tid = this.tileIds[id], set = world.getTileset(tid), tex, frame;
          if (set) {
            tex = set.getTileTexture(tid);
            frame = tex.frame;
            ctx.drawImage(tex.baseTexture.source, frame.x, frame.y, frame.width, frame.height, x * tsx - nx + set.tileoffset.x, y * tsy - ny + set.tileoffset.y, frame.width, frame.height);
          }
        }
      }
    }
    var tile = new Tile(Texture.fromCanvas(canvas));
    tile.setPosition(cx * this.chunkSize.x, cy * this.chunkSize.y);
    if (!this.tiles[cx])
      this.tiles[cx] = {};
    this.addChild(tile);
    this.tiles[cx][cy] = tile;
  },
  _renderTiles: function (sx, sy, sw, sh) {
    sx = math.floor(sx / this.map.scaledTileSize.x);
    sy = math.floor(sy / this.map.scaledTileSize.y);
    sx = sx < 0 ? 0 : sx;
    sy = sy < 0 ? 0 : sy;
    sw = math.ceil(sw / this.map.scaledTileSize.x) + 1;
    sh = math.ceil(sh / this.map.scaledTileSize.y) + 1;
    sw = sx + sw > this.map.size.x ? this.map.size.x - sx : sw;
    sh = sy + sh > this.map.size.y ? this.map.size.y - sy : sh;
    var endX = sx + sw, endY = sy + sh;
    for (var x = sx; x < endX; ++x) {
      for (var y = sy; y < endY; ++y) {
        this.moveTileSprite(-1, -1, x, y);
      }
    }
    this._rendered.x = sx;
    this._rendered.y = sy;
    this._rendered.width = sw;
    this._rendered.height = sh;
    this._buffered.left = this._buffered.right = this._buffered.top = this._buffered.bottom = false;
    this._panDelta.x = this.state.world.position.x % this.map.scaledTileSize.x;
    this._panDelta.y = this.state.world.position.y % this.map.scaledTileSize.y;
  },
  _freeTile: function (tx, ty) {
    if (this.tiles[tx] && this.tiles[tx][ty]) {
      this.clearTile(this.tiles[tx][ty]);
      this.tiles[tx][ty] = null;
    }
  },
  clearTiles: function (remove) {
    var c;
    if (this.preRender && !remove) {
      for (c = this.children.length - 1; c > -1; --c) {
        this.children[c].visible = false;
      }
      return;
    }
    this._preRendered = false;
    for (c = this.children.length - 1; c > -1; --c) {
      this.clearTile(this.children[c], remove);
    }
    this.tiles.length = 0;
    return this;
  },
  clearTile: function (tile, remove) {
    tile.visible = false;
    tile.disablePhysics();
    if (remove)
      this.removeChild(tile);
    else
      this._tilePool.push(tile);
    return this;
  },
  moveTileSprite: function (fromTileX, fromTileY, toTileX, toTileY) {
    if (toTileX < 0 || toTileY < 0 || toTileX >= this.map.size.x || toTileY >= this.map.size.y) {
      if (this.tiles[fromTileX] && this.tiles[fromTileX][fromTileY]) {
        this.tiles[fromTileX][fromTileY].disablePhysics();
      }
      return;
    }
    var tile, id = toTileX + toTileY * this.size.x, tileId = this.tileIds[id], set = this.map.getTileset(tileId), texture, props, position, hitArea, interactive;
    if (!set) {
      this._freeTile(fromTileX, fromTileY);
      return;
    }
    texture = set.getTileTexture(tileId);
    props = set.getTileProperties(tileId);
    hitArea = props.hitArea || set.properties.hitArea;
    interactive = this._getInteractive(set, props);
    position = [
      toTileX * this.map.tileSize.x + set.tileoffset.x,
      toTileY * this.map.tileSize.y + set.tileoffset.y
    ];
    position[1] += this.map.tileSize.y;
    if (this.tiles[fromTileX] && this.tiles[fromTileX][fromTileY]) {
      tile = this.tiles[fromTileX][fromTileY];
      this.tiles[fromTileX][fromTileY] = null;
      tile.disablePhysics();
    } else {
      tile = this._tilePool.pop();
    }
    if (!tile) {
      tile = new Tile(texture);
      tile.anchor.y = 1;
      this.addChild(tile);
    }
    tile.collisionType = props.type;
    tile.interactive = interactive;
    tile.hitArea = hitArea;
    tile.mass = props.mass || 0;
    tile.setTexture(texture);
    tile.setPosition(position[0], position[1]);
    tile.show();
    if (tile.mass) {
      tile.enablePhysics(this.state.physics);
    }
    if (interactive) {
      tile.click = this.onTileEvent.bind(this, "click", tile);
      tile.mousedown = this.onTileEvent.bind(this, "mousedown", tile);
      tile.mouseup = this.onTileEvent.bind(this, "mouseup", tile);
      tile.mousemove = this.onTileEvent.bind(this, "mousemove", tile);
      tile.mouseout = this.onTileEvent.bind(this, "mouseout", tile);
      tile.mouseover = this.onTileEvent.bind(this, "mouseover", tile);
      tile.mouseupoutside = this.onTileEvent.bind(this, "mouseupoutside", tile);
    }
    if (!this.tiles[toTileX])
      this.tiles[toTileX] = [];
    this.tiles[toTileX][toTileY] = tile;
    return tile;
  },
  onTileEvent: function (eventName, tile, data) {
    this.map.onTileEvent(eventName, tile, data);
  },
  _getInteractive: function (set, props) {
    return props.interactive || set && set.properties.interactive || this.properties.interactive || this.map.properties.interactive;
  },
  pan: function (dx, dy) {
    if (this.preRender)
      return;
    this._panDelta.x += dx;
    this._panDelta.y += dy;
    var tszX = this.map.scaledTileSize.x, tszY = this.map.scaledTileSize.y;
    if (dx > 0 && !this._buffered.left)
      this._renderLeft(this._buffered.left = true);
    else if (dx < 0 && !this._buffered.right)
      this._renderRight(this._buffered.right = true);
    if (dy > 0 && !this._buffered.top)
      this._renderUp(this._buffered.top = true);
    else if (dy < 0 && !this._buffered.bottom)
      this._renderDown(this._buffered.bottom = true);
    while (this._panDelta.x >= tszX) {
      this._renderLeft();
      this._panDelta.x -= tszX;
    }
    while (this._panDelta.x <= -tszX) {
      this._renderRight();
      this._panDelta.x += tszX;
    }
    while (this._panDelta.y >= tszY) {
      this._renderUp();
      this._panDelta.y -= tszY;
    }
    while (this._panDelta.y <= -tszY) {
      this._renderDown();
      this._panDelta.y += tszY;
    }
  },
  _renderLeft: function (forceNew) {
    for (var i = 0; i < this._rendered.height + 1; ++i) {
      this.moveTileSprite(forceNew ? -1 : this._rendered.right, forceNew ? -1 : this._rendered.top + i, this._rendered.left - 1, this._rendered.top + i);
    }
    this._rendered.x--;
    if (forceNew)
      this._rendered.width++;
  },
  _renderRight: function (forceNew) {
    for (var i = 0; i < this._rendered.height + 1; ++i) {
      this.moveTileSprite(forceNew ? -1 : this._rendered.left, forceNew ? -1 : this._rendered.top + i, this._rendered.right + 1, this._rendered.top + i);
    }
    if (!forceNew)
      this._rendered.x++;
    if (forceNew)
      this._rendered.width++;
  },
  _renderUp: function (forceNew) {
    for (var i = 0; i < this._rendered.width + 1; ++i) {
      this.moveTileSprite(forceNew ? -1 : this._rendered.left + i, forceNew ? -1 : this._rendered.bottom, this._rendered.left + i, this._rendered.top - 1);
    }
    this._rendered.y--;
    if (forceNew)
      this._rendered.height++;
  },
  _renderDown: function (forceNew) {
    for (var i = 0; i < this._rendered.width + 1; ++i) {
      this.moveTileSprite(forceNew ? -1 : this._rendered.left + i, forceNew ? -1 : this._rendered.top, this._rendered.left + i, this._rendered.bottom + 1);
    }
    if (!forceNew)
      this._rendered.y++;
    if (forceNew)
      this._rendered.height++;
  },
  destroy: function () {
    Container.prototype.destroy.call(this);
    this.clearTiles(true);
    this.state = null;
    this.name = null;
    this.size = null;
    this.tileIds = null;
    this.properties = null;
    this.type = null;
    this.position.x = null;
    this.position.y = null;
    this.alpha = null;
    this.visible = null;
    this.preRender = null;
    this.chunkSize = null;
    this._preRendered = null;
    this._tilePool = null;
    this._buffered = null;
    this._panDelta = null;
    this._rendered = null;
  }
});
module.exports = Tilelayer;

return module.exports;

});
define('tilemap/Tileset',['require','exports','module','../utils/utils','../utils/inherit','../math/math','../display/Texture','../math/Vector','../vendor/pixi'],function (require, exports, module) {
  

var utils = require("../utils/utils"), inherit = require("../utils/inherit"), math = require("../math/math"), Texture = require("../display/Texture"), Vector = require("../math/Vector"), PIXI = require("../vendor/pixi");
var Tileset = function (texture, settings) {
  Texture.call(this, texture.baseTexture || texture);
  this.firstgid = settings.firstgid || 1;
  this.name = settings.name;
  this.tileSize = new Vector(settings.tilewidth, settings.tileheight);
  this.spacing = settings.spacing || 0;
  this.margin = settings.margin || 0;
  this.tileoffset = new Vector(settings.tileoffset ? settings.tileoffset.x : 0, settings.tileoffset ? settings.tileoffset.y : 0);
  this.numTiles = new Vector(math.floor((this.baseTexture.source.width - this.margin) / (this.tileSize.x - this.spacing)), math.floor((this.baseTexture.source.height - this.margin) / (this.tileSize.y - this.spacing)));
  this.lastgid = this.firstgid + (this.numTiles.x * this.numTiles.y - 1 || 0);
  this.properties = settings.properties || {};
  this.tileproperties = settings.tileproperties || {};
  this.size = new Vector(settings.imagewidth || this.baseTexture.source.width, settings.imageheight || this.baseTexture.source.height);
  this.textures = [];
  this.properties = utils.parseTiledProperties(this.properties);
  for (var k in this.tileproperties) {
    this.tileproperties[k] = utils.parseTiledProperties(this.tileproperties[k]);
  }
  for (var t = 0, tl = this.lastgid - this.firstgid + 1; t < tl; ++t) {
    var y = math.floor(t / this.numTiles.x), x = t - y * this.numTiles.x;
    x = x * this.tileSize.x + x * this.spacing + this.margin;
    y = y * this.tileSize.y + y * this.spacing + this.margin;
    this.textures.push(new Texture(this.baseTexture, new PIXI.Rectangle(x, y, this.tileSize.x, this.tileSize.y)));
  }
};
inherit(Tileset, Texture, {
  getTileProperties: function (tileId) {
    if (!tileId)
      return null;
    var flags = Tileset.FLAGS, flippedX = tileId & flags.FlippedX, flippedY = tileId & flags.FlippedY, rotatedCW = tileId & flags.RotatedCW;
    tileId = (tileId & ~Tileset.FLAGS.ALL) - this.firstgid;
    if (tileId < 0)
      return null;
    var props = this.tileproperties[tileId] ? this.tileproperties[tileId] : this.tileproperties[tileId] = {
        collidable: false,
        breakable: false
      };
    props.flippedX = flippedX;
    props.flippedY = flippedY;
    props.rotatedCW = rotatedCW;
    return props;
  },
  getTileTexture: function (tileId) {
    if (!tileId)
      return null;
    tileId = (tileId & ~Tileset.FLAGS.ALL) - this.firstgid;
    if (tileId < 0)
      return null;
    return this.textures[tileId];
  },
  contains: function (tileId) {
    if (!tileId)
      return false;
    tileId &= ~Tileset.FLAGS.ALL;
    return tileId >= this.firstgid && tileId <= this.lastgid;
  }
});
Tileset.FLAGS = {
  FlippedX: 2147483648,
  FlippedY: 1073741824,
  RotatedCW: 536870912
};
var mask = 0;
for (var f in Tileset.FLAGS) {
  mask |= Tileset.FLAGS[f];
}
Tileset.FLAGS.ALL = mask;
module.exports = Tileset;

return module.exports;

});
define('tilemap/Tilemap',['require','exports','module','../display/Container','./ObjectGroup','../display/Sprite','../math/Vector','./Tilelayer','./Tileset','../utils/utils','../utils/inherit'],function (require, exports, module) {
  

var Container = require("../display/Container"), ObjectGroup = require("./ObjectGroup"), Sprite = require("../display/Sprite"), Vector = require("../math/Vector"), Tilelayer = require("./Tilelayer"), Tileset = require("./Tileset"), utils = require("../utils/utils"), inherit = require("../utils/inherit");
var Tilemap = function (state, map, tilesetTextures) {
  Container.call(this, map);
  this.state = state;
  this.game = state.game;
  this.properties = utils.parseTiledProperties(map.properties) || {};
  this.scale.x = this.properties.scale || 1;
  this.scale.y = this.properties.scale || 1;
  this.tileSize = new Vector(map.tilewidth, map.tileheight);
  this.size = new Vector(map.width, map.height);
  this.orientation = map.orientation;
  this.version = map.version;
  this.backgroundColor = map.backgroundColor;
  this.tilesets = [];
  this.scaledTileSize = new Vector(map.tilewidth * this.scale.x, map.tileheight * this.scale.y);
  this.realSize = new Vector(this.size.x * this.scaledTileSize.x, this.size.y * this.scaledTileSize.y);
  for (var t = 0, tl = map.tilesets.length; t < tl; ++t) {
    var ts = map.tilesets[t];
    this.tilesets.push(new Tileset(tilesetTextures[ts.name], ts));
  }
  for (var i = 0, il = map.layers.length; i < il; ++i) {
    var lyr;
    switch (map.layers[i].type) {
    case "tilelayer":
      lyr = new Tilelayer(this, map.layers[i]);
      break;
    case "objectgroup":
      lyr = new ObjectGroup(this, map.layers[i]);
      break;
    case "imagelayer":
      lyr = new Sprite(map.layers[i]);
      break;
    }
    this.addChild(lyr);
  }
  var w = this.game.state.active.world;
  w.bounds.width = Math.max(w.bounds.width, this.realSize.x);
  w.bounds.height = Math.max(w.bounds.height, this.realSize.y);
};
inherit(Tilemap, Container, {
  getTileset: function (tileId) {
    for (var i = 0, il = this.tilesets.length; i < il; ++i)
      if (this.tilesets[i].contains(tileId))
        return this.tilesets[i];
  },
  destroy: function () {
    Container.prototype.destroy.call(this);
    this.game = null;
    this.properties = null;
    this.tileSize = null;
    this.size = null;
    this.orientation = null;
    this.version = null;
    this.backgroundColor = null;
    this.tilesets = null;
    this.scaledTileSize = null;
    this.realSize = null;
  },
  spawnObjects: function () {
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.type === "objectgroup") {
        o.spawn();
      }
    }
    return this;
  },
  despawnObjects: function () {
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.type === "objectgroup") {
        o.despawn();
      }
    }
    return this;
  },
  clearTiles: function () {
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.type === "tilelayer") {
        o.clearTiles();
      }
    }
    return this;
  },
  onTileEvent: function (eventName, tile, data) {
    this.emit("tile." + eventName, {
      tile: tile,
      data: data
    });
  },
  onObjectEvent: function (eventName, obj, data) {
    this.emit("object." + eventName, {
      object: obj,
      data: data
    });
  },
  findLayer: function (name) {
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.name === name)
        return o;
    }
  },
  pan: function (x, y) {
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.pan)
        o.pan(x, y);
    }
    return this;
  },
  render: function (x, y, width, height) {
    x = x || -this.state.world.position.x;
    y = y || -this.state.world.position.y;
    width = width || this.game.width;
    height = height || this.game.height;
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.render)
        o.render(x, y, width, height);
    }
    return this;
  }
});
module.exports = Tilemap;

return module.exports;

});
define('text/BitmapText',['require','exports','module','../display/Container','../utils/ObjectPool','../display/Texture','../display/Sprite','../math/Vector','../geom/Rectangle','../utils/utils','../utils/inherit','../vendor/pixi'],function (require, exports, module) {
  

var Container = require("../display/Container"), ObjectPool = require("../utils/ObjectPool"), Texture = require("../display/Texture"), Sprite = require("../display/Sprite"), Vector = require("../math/Vector"), Rectangle = require("../geom/Rectangle"), utils = require("../utils/utils"), inherit = require("../utils/inherit"), PIXI = require("../vendor/pixi");
var BitmapText = function (text, font, style) {
  Container.call(this);
  this.dirty = false;
  this.font = font;
  this.monospace = 0;
  this._text = text;
  this.sprites = new ObjectPool(Sprite, this);
  this.text = text;
  this.setStyle(style);
};
inherit(BitmapText, Container, {
  setStyle: function (style) {
    style = style || {};
    this.align = style.align;
    this.size = style.size || this.font.size;
    this.dirty = true;
  },
  renderText: function () {
    var font = this.font, pos = new Vector(), prevCode = null, chars = [], maxLineWidth = 0, lineWidths = [], line = 0, scale = this.size / font.size;
    for (var i = 0; i < this.text.length; ++i) {
      var code = this.text.charCodeAt(i), ch = this.text.charAt(i);
      if (/(?:\r\n|\r|\n)/.test(ch)) {
        lineWidths.push(pos.x);
        maxLineWidth = Math.max(maxLineWidth, pos.x);
        line++;
        pos.x = 0;
        pos.y += font.lineHeight;
        prevCode = null;
        continue;
      }
      var data = font.chars[code];
      if (!data)
        continue;
      if (prevCode && data[prevCode]) {
        pos.x += data.kerning[prevCode] || 0;
      }
      chars.push({
        texture: data.texture,
        line: line,
        code: code,
        x: pos.x + data.xOffset,
        y: pos.y + data.yOffset
      });
      pos.x += this.monospace || data.xAdvance;
      prevCode = code;
    }
    lineWidths.push(pos.x);
    maxLineWidth = Math.max(maxLineWidth, pos.x);
    var lineAlignOffsets = [], align = this.align, offset = 0;
    for (i = 0; i <= line; ++i) {
      offset = 0;
      if (align === "right")
        offset = maxLineWidth - lineWidths[i];
      else if (align === "center")
        offset = (maxLineWidth - lineWidths[i]) / 2;
      lineAlignOffsets.push(offset);
    }
    for (i = 0; i < chars.length; ++i) {
      var c = this.sprites.create(chars[i].texture);
      c.setTexture(chars[i].texture);
      c.visible = true;
      c.position.x = (chars[i].x + lineAlignOffsets[chars[i].line]) * scale;
      c.position.y = chars[i].y * scale;
      c.scale.x = c.scale.y = scale;
      this.addChild(c);
    }
    this.width = pos.x * scale;
    this.height = (pos.y + font.lineHeight) * scale;
  },
  clone: function () {
    return new BitmapText(this._text, this.font, {
      align: this.align,
      size: this.size
    });
  },
  updateTransform: function () {
    if (this.dirty) {
      for (var c = 0, cl = this.children.length; c < cl; ++c) {
        var child = this.children[c];
        child.visible = false;
        this.sprites.free(child);
      }
      this.renderText();
      this.dirty = false;
    }
    Container.prototype.updateTransform.call(this);
  }
});
Object.defineProperty(BitmapText.prototype, "text", {
  get: function () {
    return this._text;
  },
  set: function (text) {
    this._text = text;
    this.dirty = true;
  }
});
BitmapText.parseXML = function (key, xml, texture) {
  var btx = texture.baseTexture;
  if (!xml.getElementsByTagName("font")) {
    utils.warn("Invalid XML for BitmapText.parseXML(), missing <font> tag. Full XML:", xml);
  }
  var data = {}, info = xml.getElementsByTagName("info")[0], common = xml.getElementsByTagName("common")[0];
  data.name = info.attributes.getNamedItem("face").nodeValue;
  data.size = parseInt(info.attributes.getNamedItem("size").nodeValue, 10);
  data.lineHeight = parseInt(common.attributes.getNamedItem("lineHeight").nodeValue, 10);
  data.chars = {};
  var chars = xml.getElementsByTagName("char");
  for (var i = 0, il = chars.length; i < il; ++i) {
    var letter = chars[i], attrs = letter.attributes, code = parseInt(attrs.getNamedItem("id").nodeValue, 10), rect = new Rectangle(parseInt(attrs.getNamedItem("x").nodeValue, 10), parseInt(attrs.getNamedItem("y").nodeValue, 10), parseInt(attrs.getNamedItem("width").nodeValue, 10), parseInt(attrs.getNamedItem("height").nodeValue, 10)), tx = PIXI.TextureCache[key + "_" + code] = new Texture(btx, rect);
    data.chars[code] = {
      xOffset: parseInt(attrs.getNamedItem("xoffset").nodeValue, 10),
      yOffset: parseInt(attrs.getNamedItem("yoffset").nodeValue, 10),
      xAdvance: parseInt(attrs.getNamedItem("xadvance").nodeValue, 10),
      kerning: {},
      texture: tx
    };
  }
  var kernings = xml.getElementsByTagName("kerning");
  for (i = 0, il = kernings.length; i < il; ++i) {
    var kern = kernings[i], attrs2 = kern.attributes, first = parseInt(attrs2.getNamedItem("first").nodeValue, 10), second = parseInt(attrs2.getNamedItem("second").nodeValue, 10), amount = parseInt(attrs2.getNamedItem("amount").nodeValue, 10);
    data.chars[second].kerning[first] = amount;
  }
  PIXI.BitmapText.fonts[data.name] = data;
  return data;
};
module.exports = BitmapText;

return module.exports;

});
define('utils/ObjectFactory',['require','exports','module','./inherit','../gui/GuiItem','../display/Sprite','../tilemap/Tilemap','../geom/Rectangle','../text/BitmapText','../constants'],function (require, exports, module) {
  

var inherit = require("./inherit"), GuiItem = require("../gui/GuiItem"), Sprite = require("../display/Sprite"), Tilemap = require("../tilemap/Tilemap"), Rectangle = require("../geom/Rectangle"), BitmapText = require("../text/BitmapText"), C = require("../constants");
var ObjectFactory = function (state, parent) {
  this.state = state;
  this.game = state.game;
  this.parent = parent;
};
inherit(ObjectFactory, Object, {
  obj: function (obj) {
    return this.parent.addChild(obj);
  },
  sprite: function (tx, frame, physics) {
    var spr, game = this.game;
    if (typeof tx === "string") {
      if (frame || frame === 0)
        tx = game.cache.getTextures(tx)[frame];
      else
        tx = game.cache.getTexture(tx);
    }
    if (!tx) {
      tx = game.cache.getTexture("__default");
    }
    spr = new Sprite(tx);
    if (physics || physics === undefined) {
      spr.enablePhysics(this.state.physics);
    }
    return this.parent.addChild(spr);
  },
  audio: function (key, settings) {
    return this.state.audio.add(key, settings);
  },
  tilemap: function (key, constrain) {
    var obj = this.game.cache.getTilemap(key) || {}, fmt = obj.format, data = obj.data, txs = obj.textures, tilemap;
    if (fmt === C.FILE_FORMAT.JSON) {
      tilemap = new Tilemap(this.state, data, txs);
    } else if (fmt === C.FILE_FORMAT.XML) {
      tilemap = Tilemap.fromXML(this.state, data, txs);
    } else if (fmt === C.FILE_FORMAT.CSV) {
      tilemap = Tilemap.fromCSV(this.state, data, txs);
    }
    if (constrain) {
      this.state.camera.constrain(new Rectangle(0, 0, tilemap.realSize.x, tilemap.realSize.y));
    }
    tilemap.render(-this.state.world.position.x, -this.state.world.position.x, this.game.width, this.game.height);
    tilemap._cachekey = key;
    return this.parent.addChild(tilemap);
  },
  gui: function (tx, interact) {
    if (typeof tx === "string")
      tx = this.game.cache.getTexture(tx);
    return this.parent.addChild(new GuiItem(tx, interact));
  },
  bitmaptext: function (text, font, style) {
    if (typeof font === "string")
      font = this.game.cache.getBitmapFont(font);
    return this.parent.addChild(new BitmapText(text, font, style));
  }
});
module.exports = ObjectFactory;

return module.exports;

});
define('display/Graphics',['require','exports','module','../vendor/pixi'],function (require, exports, module) {
  

var Graphics = require("../vendor/pixi").Graphics;
module.exports = Graphics;

return module.exports;

});
define('fx/camera/Effect',['require','exports','module','../../display/Container','../../utils/inherit','../../display/Graphics'],function (require, exports, module) {
  

var Container = require("../../display/Container"), inherit = require("../../utils/inherit"), Graphics = require("../../display/Graphics");
var Effect = function () {
  Container.call(this);
  this.gfx = this.addChild(new Graphics());
  this.gfx.visible = false;
  this.done = true;
};
inherit(Effect, Container, {
  start: function (cb) {
    this.done = false;
    this.cb = cb;
    return this;
  },
  stop: function () {
    this.done = true;
    return this;
  },
  update: function () {
    return this;
  },
  _complete: function () {
    this.done = true;
    if (typeof this.cb === "function") {
      var ret = this.cb();
      if (ret !== false)
        this.stop();
    } else {
      this.stop();
    }
  }
});
module.exports = Effect;

return module.exports;

});
define('fx/camera/Close',['require','exports','module','./Effect','../../utils/inherit'],function (require, exports, module) {
  

var Effect = require("./Effect"), inherit = require("../../utils/inherit");
var Close = function () {
  Effect.call(this);
};
inherit(Close, Effect, {
  start: function (shape, duration, pos, cb) {
    if (typeof pos === "function") {
      cb = pos;
      pos = null;
    }
    if (typeof duration === "function") {
      cb = duration;
      pos = null;
      duration = null;
    }
    if (typeof shape === "function") {
      cb = shape;
      pos = null;
      duration = null;
      shape = null;
    }
    Effect.prototype.start.call(this, cb);
    this.shape = shape || "circle";
    this.duration = duration && duration > 0 ? duration : 1000;
    this.cx = pos ? pos.x : this.parent.size.x / 2;
    this.cy = pos ? pos.y : this.parent.size.y / 2;
    this.w = this.mx = this.parent.size.x;
    this.h = this.my = this.parent.size.y;
    this.radius = this.maxRadius = Math.max(this.w / 2, this.h / 2);
    this.gfx.visible = true;
    this.gfx.position.x = this.cx;
    this.gfx.position.y = this.cy;
    this.parent.state.mask = this.gfx;
    if (shape === "ellipse") {
      this.gfx.scale.y = 0.5;
    } else {
      this.gfx.scale.y = 1;
    }
    return this;
  },
  stop: function () {
    Effect.prototype.stop.call(this);
    this.radius = this.sx = this.sy = 0;
    this.gfx.visible = false;
    if (this.parent.state.mask === this.gfx)
      this.parent.state.mask = null;
    return this;
  },
  update: function (dt) {
    if (this.done)
      return;
    var part = dt * 1000 / this.duration;
    this.gfx.clear();
    this.gfx.beginFill(16711935);
    switch (this.shape) {
    case "ellipse":
    case "circle":
      this.radius -= part * this.maxRadius;
      if (this.radius <= 0) {
        this._complete();
      } else {
        this.gfx.drawCircle(0, 0, this.radius);
      }
      break;
    case "rect":
    case "rectangle":
      this.w -= part * this.mx;
      this.h -= part * this.my;
      if (this.w <= 0) {
        this._complete();
      } else {
        this.gfx.drawRect(-(this.w / 2), -(this.h / 2), this.w, this.h);
      }
      break;
    }
    this.gfx.endFill();
    return this;
  }
});
module.exports = Close;

return module.exports;

});
define('fx/camera/Fade',['require','exports','module','./Effect','../../utils/inherit'],function (require, exports, module) {
  

var Effect = require("./Effect"), inherit = require("../../utils/inherit");
var Fade = function () {
  Effect.call(this);
};
inherit(Fade, Effect, {
  start: function (color, duration, alpha, cb) {
    if (typeof alpha === "function") {
      cb = duration;
      alpha = null;
    }
    if (typeof duration === "function") {
      cb = duration;
      alpha = null;
      duration = null;
    }
    if (typeof color === "function") {
      cb = color;
      alpha = null;
      duration = null;
      color = null;
    }
    Effect.prototype.start.call(this, cb);
    color = typeof color === "number" ? color : 16777215;
    this.goal = alpha || 1;
    this.duration = duration && duration > 0 ? duration : 1000;
    this.gfx.visible = true;
    this.gfx.alpha = 0;
    this.gfx.clear();
    this.gfx.beginFill(color);
    this.gfx.drawRect(0, 0, this.parent.size.x, this.parent.size.y);
    return this;
  },
  stop: function () {
    Effect.prototype.stop.call(this);
    this.gfx.alpha = 0;
    this.gfx.visible = false;
    return this;
  },
  update: function (dt) {
    if (this.done)
      return;
    if (this.gfx.alpha < this.goal) {
      this.gfx.alpha += dt * 1000 / this.duration;
      if (this.gfx.alpha >= this.goal) {
        this._complete();
      }
    }
    return this;
  }
});
module.exports = Fade;

return module.exports;

});
define('fx/camera/Flash',['require','exports','module','./Effect','../../utils/inherit'],function (require, exports, module) {
  

var Effect = require("./Effect"), inherit = require("../../utils/inherit");
var Flash = function () {
  Effect.call(this);
};
inherit(Flash, Effect, {
  start: function (color, duration, alpha, cb) {
    if (typeof alpha === "function") {
      cb = duration;
      alpha = null;
    }
    if (typeof duration === "function") {
      cb = duration;
      alpha = null;
      duration = null;
    }
    if (typeof color === "function") {
      cb = color;
      alpha = null;
      duration = null;
      color = null;
    }
    Effect.prototype.start.call(this, cb);
    alpha = alpha || 1;
    color = typeof color === "number" ? color : 16777215;
    this.duration = duration && duration > 0 ? duration : 1000;
    this.gfx.visible = true;
    this.gfx.alpha = alpha;
    this.gfx.clear();
    this.gfx.beginFill(color);
    this.gfx.drawRect(0, 0, this.parent.size.x, this.parent.size.y);
    return this;
  },
  stop: function () {
    Effect.prototype.stop.call(this);
    this.gfx.alpha = 0;
    this.gfx.visible = false;
    return this;
  },
  update: function (dt) {
    if (this.done)
      return;
    if (this.gfx.alpha > 0) {
      this.gfx.alpha -= dt * 1000 / this.duration;
      if (this.gfx.alpha <= 0) {
        this._complete();
      }
    }
    return this;
  }
});
module.exports = Flash;

return module.exports;

});
define('fx/camera/Scanlines',['require','exports','module','./Effect','../../utils/inherit','../../constants'],function (require, exports, module) {
  

var Effect = require("./Effect"), inherit = require("../../utils/inherit"), C = require("../../constants");
var Scanlines = function () {
  Effect.call(this);
};
inherit(Scanlines, Effect, {
  start: function (color, axis, spacing, thickness, alpha, cb) {
    if (typeof alpha === "function") {
      cb = alpha;
      alpha = null;
    }
    if (typeof thickness === "function") {
      cb = thickness;
      alpha = null;
      thickness = null;
    }
    if (typeof spacing === "function") {
      cb = spacing;
      alpha = null;
      thickness = null;
      spacing = null;
    }
    if (typeof axis === "function") {
      cb = spacing;
      alpha = null;
      thickness = null;
      spacing = null;
      axis = null;
    }
    if (typeof color === "function") {
      cb = spacing;
      alpha = null;
      thickness = null;
      spacing = null;
      axis = null;
      color = null;
    }
    Effect.prototype.start.call(this, cb);
    color = color || 0;
    axis = axis || C.AXIS.HORIZONTAL;
    spacing = spacing || 4;
    thickness = thickness || 1;
    alpha = alpha || 0.3;
    var sx = this.parent.size.x, sy = this.parent.size.y;
    this.gfx.clear();
    this.gfx.visible = true;
    this.gfx.beginFill(color, alpha);
    if (axis & C.AXIS.VERTICAL) {
      for (var x = 0; x < sx; x += spacing) {
        this.gfx.drawRect(x, 0, thickness, sy);
      }
    }
    if (axis & C.AXIS.HORIZONTAL) {
      for (var y = 0; y < sy; y += spacing) {
        this.gfx.drawRect(0, y, sx, thickness);
      }
    }
    this.gfx.endFill();
    return this;
  },
  stop: function () {
    Effect.prototype.stop.call(this);
    this.gfx.visible = false;
    return this;
  }
});
module.exports = Scanlines;

return module.exports;

});
define('fx/camera/Shake',['require','exports','module','./Effect','../../math/Vector','../../utils/inherit','../../math/math','../../constants'],function (require, exports, module) {
  

var Effect = require("./Effect"), Vector = require("../../math/Vector"), inherit = require("../../utils/inherit"), math = require("../../math/math"), C = require("../../constants");
var Shake = function () {
  Effect.call(this);
  this.offset = new Vector();
};
inherit(Shake, Effect, {
  start: function (intensity, duration, direction, cb) {
    if (typeof direction === "function") {
      cb = direction;
      direction = null;
    }
    if (typeof duration === "function") {
      cb = duration;
      direction = null;
      duration = null;
    }
    if (typeof intensity === "function") {
      cb = intensity;
      direction = null;
      duration = null;
      intensity = null;
    }
    Effect.prototype.start.call(this, cb);
    this.intensity = intensity || 0.01;
    this.duration = duration || 1000;
    this.direction = direction || C.AXIS.BOTH;
    this.offset.x = this.offset.y = 0;
    return this;
  },
  stop: function () {
    Effect.prototype.stop.call(this);
    this.duration = this.offset.x = this.offset.y = 0;
    return this;
  },
  update: function (dt) {
    if (this.done)
      return;
    this.duration -= dt * 1000;
    this.offset.x = -this.offset.x;
    this.offset.y = -this.offset.y;
    this.parent.pan(this.offset.x, this.offset.y);
    if (this.duration <= 0) {
      this._complete();
    } else {
      if (this.direction & C.AXIS.HORIZONTAL)
        this.offset.x = math.round(Math.random() * this.intensity * this.parent.size.x * 2 - this.intensity * this.parent.size.x);
      if (this.direction & C.AXIS.VERTICAL)
        this.offset.y = math.round(Math.random() * this.intensity * this.parent.size.y * 2 - this.intensity * this.parent.size.y);
      this.parent.pan(this.offset.x, this.offset.y);
    }
  }
});
module.exports = Shake;

return module.exports;

});
define('camera/Camera',['require','exports','module','../display/Container','../display/Sprite','../geom/Rectangle','../math/Vector','../utils/ObjectPool','../utils/ObjectFactory','../fx/camera/Close','../fx/camera/Fade','../fx/camera/Flash','../fx/camera/Scanlines','../fx/camera/Shake','../utils/inherit','../math/math','../constants'],function (require, exports, module) {
  

var Container = require("../display/Container"), Sprite = require("../display/Sprite"), Rectangle = require("../geom/Rectangle"), Vector = require("../math/Vector"), ObjectPool = require("../utils/ObjectPool"), ObjectFactory = require("../utils/ObjectFactory"), Close = require("../fx/camera/Close"), Fade = require("../fx/camera/Fade"), Flash = require("../fx/camera/Flash"), Scanlines = require("../fx/camera/Scanlines"), Shake = require("../fx/camera/Shake"), inherit = require("../utils/inherit"), math = require("../math/math"), C = require("../constants");
var Camera = function (state) {
  this.world = state.world;
  this.game = state.game;
  this.state = state;
  this.bounds = state.world.bounds.clone();
  this._deadzone = null;
  this._target = null;
  this._targetPos = new Vector();
  this.size = new Vector();
  this.hSize = new Vector();
  this.gui = new Container();
  this.add = new ObjectFactory(state, this.gui);
  this.fxpools = {
    flash: new ObjectPool(Flash, this),
    fade: new ObjectPool(Fade, this),
    shake: new ObjectPool(Shake, this),
    scanlines: new ObjectPool(Scanlines, this),
    close: new ObjectPool(Close, this)
  };
  var self = this;
  Object.keys(this.fxpools).forEach(function (key) {
    self[key] = function () {
      var e = self.fxpools[key].create(), args = Array.prototype.slice.call(arguments), cb = args.pop();
      if (cb !== undefined && typeof cb !== "function")
        args.push(cb);
      args.push(this._fxCallback.bind(this, e, key, cb));
      return e.start.apply(e, args);
    };
  });
  Container.call(this);
  this.addChild(this.gui);
};
inherit(Camera, Container, {
  _fxCallback: function (fx, type, cb) {
    var ret;
    if (typeof cb === "function")
      ret = cb();
    this.fxpools[type].free(fx);
    return ret;
  },
  follow: function (spr, style) {
    if (!(spr instanceof Sprite))
      return this;
    this._target = spr;
    this._targetPos.set(null, null);
    switch (style) {
    case C.CAMERA_FOLLOW.PLATFORMER:
      var w = this.size.x / 8;
      var h = this.size.y / 3;
      this._deadzone = new Rectangle((this.size.x - w) / 2, (this.size.y - h) / 2 - h / 4, w, h);
      break;
    case C.CAMERA_FOLLOW.TOPDOWN:
      var sq4 = Math.max(this.size.x, this.size.y) / 4;
      this._deadzone = new Rectangle((this.size.x - sq4) / 2, (this.size.y - sq4) / 2, sq4, sq4);
      break;
    case C.CAMERA_FOLLOW.TOPDOWN_TIGHT:
      var sq8 = Math.max(this.size.x, this.size.y) / 8;
      this._deadzone = new Rectangle((this.size.x - sq8) / 2, (this.size.y - sq8) / 2, sq8, sq8);
      break;
    case C.CAMERA_FOLLOW.LOCKON:
    default:
      this._deadzone = null;
      break;
    }
    this.focusSprite(this._target);
    return this;
  },
  unfollow: function () {
    this._target = null;
    this._targetPos.set(null, null);
    return this;
  },
  focusSprite: function (spr) {
    var x = spr.position.x, y = spr.position.y, p = spr.parent;
    while (p && p !== this.world) {
      x += p.position.x;
      y += p.position.y;
      p = p.parent;
    }
    return this.focus(math.floor(x * spr.worldTransform[0]), math.floor(y * spr.worldTransform[4]));
  },
  focus: function (x, y) {
    y = x.y !== undefined ? x.y : y || 0;
    x = x.x !== undefined ? x.x : x || 0;
    var goToX = x - this.hSize.x, goToY = y - this.hSize.y, dx = goToX + this.world.position.x, dy = goToY + this.world.position.y;
    return this.pan(dx, dy);
  },
  pan: function (dx, dy) {
    dy = dx.y !== undefined ? dx.y : dy || 0;
    dx = dx.x !== undefined ? dx.x : dx || 0;
    if (!dx && !dy)
      return;
    var pos = this.world.position, newX = pos.x - dx, newY = pos.y - dy, b = this.bounds;
    if (b) {
      if (this._outsideBounds(-newX, -pos.y)) {
        dx = (dx < 0 ? b.x : b.right - this.size.x) + pos.x;
      }
      if (this._outsideBounds(-pos.x, -newY)) {
        dy = (dy < 0 ? b.y : b.bottom - this.size.y) + pos.y;
      }
    }
    if (dx || dy) {
      if (!dx)
        dx = 0;
      if (!dy)
        dy = 0;
      this.world.pan(-dx, -dy);
    }
    return this;
  },
  _outsideBounds: function (x, y) {
    return !this.bounds.contains(x, y) || !this.bounds.contains(x, y + this.size.y) || !this.bounds.contains(x + this.size.x, y) || !this.bounds.contains(x + this.size.x, y + this.size.y);
  },
  resize: function (w, h) {
    this.size.set(w, h);
    this.hSize.set(math.round(this.size.x / 2), math.round(this.size.y / 2));
    return this;
  },
  constrain: function (shape) {
    this.bounds = shape;
    return this;
  },
  unconstrain: function () {
    this.bounds = null;
    return this;
  },
  update: function (dt) {
    if (this._target && !this._target.position.equals(this._targetPos)) {
      this._targetPos.copy(this._target.position);
      if (!this._deadzone) {
        this.focusSprite(this._target);
      } else {
        var moveX, moveY, dx, dy, camX = this._target.position.x + this.world.position.x, camY = this._target.position.y + this.world.position.y;
        moveX = moveY = dx = dy = 0;
        dx = camX - this._deadzone.x;
        dy = camY - this._deadzone.y;
        if (dx < 0)
          moveX = dx;
        if (dy < 0)
          moveY = dy;
        dx = camX - (this._deadzone.x + this._deadzone.width);
        dy = camY - (this._deadzone.y + this._deadzone.height);
        if (dx > 0)
          moveX = dx;
        if (dy > 0)
          moveY = dy;
        this.pan(math.round(moveX), math.round(moveY));
      }
    }
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var c = this.children[i];
      if (c.update)
        c.update(dt);
    }
    return this;
  }
});
module.exports = Camera;

return module.exports;

});
define('display/BaseTexture',['require','exports','module','../vendor/pixi'],function (require, exports, module) {
  

var BaseTexture = require("../vendor/pixi").BaseTexture;
module.exports = BaseTexture;

return module.exports;

});
define('display/RenderTexture',['require','exports','module','../vendor/pixi'],function (require, exports, module) {
  

var RenderTexture = require("../vendor/pixi").RenderTexture;
module.exports = RenderTexture;

return module.exports;

});
define('display/TilingSprite',['require','exports','module','../vendor/pixi'],function (require, exports, module) {
  

var TilingSprite = require("../vendor/pixi").TilingSprite;
module.exports = TilingSprite;

return module.exports;

});
define('particles/ParticleEmitter',['require','exports','module','../display/Sprite','../display/Texture','../display/Container','../math/Vector','../math/math','../utils/inherit','../constants'],function (require, exports, module) {
  

var Sprite = require("../display/Sprite"), Texture = require("../display/Texture"), Container = require("../display/Container"), Vector = require("../math/Vector"), math = require("../math/math"), inherit = require("../utils/inherit"), C = require("../constants");
var ParticleEmitter = function (name) {
  Container.call(this);
  this.name = name;
  this.maxParticles = 100;
  this.width = 0;
  this.height = 0;
  this.lifespan = 2000;
  this.minSpeed = new Vector(-100, -100);
  this.maxSpeed = new Vector(100, 100);
  this.minScale = 1;
  this.maxScale = 1;
  this.minRotation = -2 * Math.PI;
  this.maxRotation = 2 * Math.PI;
  this.delay = 100;
  this.active = false;
  this.particles = [];
  this._rate = 0;
  this._total = 0;
  this._emitted = 0;
  this._timer = 0;
  this._particle = null;
  this._textures = null;
  this._pool = [];
};
inherit(ParticleEmitter, Container, {
  start: function (lifespan, delay, rate, total) {
    this.active = true;
    this.lifespan = lifespan || 2000;
    this.delay = delay || 250;
    this._rate = rate || 1;
    this._total = total || C.PARTICLES.MAX_EMITTER_PARTICLES;
    this._timer = 0;
    return this;
  },
  stop: function () {
    this.active = false;
    return this;
  },
  setup: function (sprite, collide) {
    if (collide === undefined)
      collide = C.DIRECTION.ALL;
    if (sprite instanceof Texture) {
      this._particle = new Sprite(sprite);
      this._textures = [sprite];
    } else if (Array.isArray(sprite)) {
      this._particle = new Sprite(sprite[0]);
      this._textures = sprite;
    } else {
      this._particle = sprite;
      this._textures = [sprite.texture];
    }
    return this;
  },
  _get: function () {
    if (this._emitted >= this._total || this._emitted > this.maxParticles)
      return null;
    var spr = this._pool.pop();
    if (!spr) {
      spr = this._particle.clone();
    }
    spr.setTexture(math.randomElement(this._textures));
    spr.visible = true;
    this.addChild(spr);
    this._emitted++;
    return spr;
  },
  _free: function (spr) {
    spr.visible = false;
    this._pool.push(spr);
    this.removeChild(spr);
    this._emitted--;
  },
  emitParticle: function () {
    var part = this._get();
    if (!part)
      return;
    part.setPosition(math.randomInt(0, this.width), math.randomInt(0, this.height));
    part.scale.x = part.scale.y = math.randomReal(this.minScale, this.maxScale);
    part.lifespan = this.lifespan;
    part.setVelocity(math.randomInt(this.minSpeed.x, this.maxSpeed.x), math.randomInt(this.minSpeed.y, this.maxSpeed.y));
    return this;
  },
  update: function (dt) {
    var t = dt * 1000;
    for (var c = 0; c < this.children.length; ++c) {
      var child = this.children[c];
      child.lifespan -= t;
      if (child.lifespan <= 0)
        this._free(child);
    }
    if (!this.active)
      return;
    this._timer += t;
    if (this._timer >= this._delay) {
      this._timer -= this._delay;
      for (var i = 0; i < this._rate; ++i) {
        this.emitParticle();
      }
    }
  }
});
module.exports = ParticleEmitter;

return module.exports;

});
define('particles/ParticleSystem',['require','exports','module','./ParticleEmitter','../display/Container','../utils/inherit'],function (require, exports, module) {
  

var Emitter = require("./ParticleEmitter"), Contianer = require("../display/Container"), inherit = require("../utils/inherit");
var ParticleSystem = function () {
  Contianer.call(this);
  this.emitters = {};
  this.nextId = 0;
};
inherit(ParticleSystem, Contianer, {
  add: function (Name) {
    var emitter;
    if (typeof Name === "string") {
      emitter = new Emitter(Name);
    } else if (typeof Name === "function") {
      emitter = new Name();
    } else {
      emitter = Name;
    }
    if (!emitter.name)
      emitter.name = "emitter_" + this.nextId++;
    this.emitters[emitter.name] = emitter;
    this.addChild(emitter);
    return emitter;
  },
  remove: function (emitter) {
    if (typeof emitter === "string")
      emitter = this.emitters[emitter];
    if (emitter.parent)
      emitter.parent.removeChild(emitter);
    delete this.emitters[emitter.name];
    return this;
  },
  update: function (dt) {
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var emitter = this.children[i];
      if (emitter.update)
        emitter.update(dt);
    }
  }
});
module.exports = ParticleSystem;

return module.exports;

});
define('game/World',['require','exports','module','../utils/inherit','../display/Container','../geom/Rectangle','../utils/ObjectFactory','../particles/ParticleSystem','../math/math'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Container = require("../display/Container"), Rectangle = require("../geom/Rectangle"), ObjectFactory = require("../utils/ObjectFactory"), ParticleSystem = require("../particles/ParticleSystem"), math = require("../math/math");
var World = function (state) {
  Container.call(this);
  this.game = state.game;
  this.state = state;
  this.particles = this.addChild(new ParticleSystem());
  this.bounds = new Rectangle(0, 0, state.game.width, state.game.height);
  this.add = new ObjectFactory(state, this);
};
inherit(World, Container, {
  pan: function (x, y) {
    y = math.floor(x.y !== undefined ? x.y : y || 0);
    x = math.floor(x.x !== undefined ? x.x : x || 0);
    this.position.x += x * this.scale.x;
    this.position.y += y * this.scale.y;
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.pan)
        o.pan(x, y);
    }
    return this;
  },
  resize: function (w, h) {
    for (var i = 0, il = this.children.length; i < il; ++i) {
      var o = this.children[i];
      if (o.render)
        o.render(-this.position.x, -this.position.y, w, h);
    }
    return this;
  },
  update: function (dt) {
    this.particles.update(dt);
  }
});
module.exports = World;

return module.exports;

});
define('vendor/cp',['require','exports','module'],function (require, exports, module) {
  

Object.create = Object.create || function (o) {
  function F() {
  }
  F.prototype = o;
  return new F();
};
var cp;
if (typeof exports === "undefined") {
  cp = {};
  if (typeof window === "object") {
    window.cp = cp;
  }
} else {
  cp = exports;
}
var assert = function (value, message) {
  if (!value) {
    throw new Error("Assertion failed: " + message);
  }
};
var assertSoft = function (value, message) {
  if (!value && console && console.warn) {
    console.warn("ASSERTION FAILED: " + message);
    if (console.trace) {
      console.trace();
    }
  }
};
var mymin = function (a, b) {
  return a < b ? a : b;
};
var mymax = function (a, b) {
  return a > b ? a : b;
};
var min, max;
if (typeof window === "object" && window.navigator.userAgent.indexOf("Firefox") > -1) {
  min = Math.min;
  max = Math.max;
} else {
  min = mymin;
  max = mymax;
}
var hashPair = function (a, b) {
  return a < b ? a + " " + b : b + " " + a;
};
var deleteObjFromList = function (arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === obj) {
      arr[i] = arr[arr.length - 1];
      arr.length--;
      return;
    }
  }
};
var closestPointOnSegment = function (p, a, b) {
  var delta = vsub(a, b);
  var t = clamp01(vdot(delta, vsub(p, b)) / vlengthsq(delta));
  return vadd(b, vmult(delta, t));
};
var closestPointOnSegment2 = function (px, py, ax, ay, bx, by) {
  var deltax = ax - bx;
  var deltay = ay - by;
  var t = clamp01(vdot2(deltax, deltay, px - bx, py - by) / vlengthsq2(deltax, deltay));
  return new Vect(bx + deltax * t, by + deltay * t);
};
cp.momentForCircle = function (m, r1, r2, offset) {
  return m * (0.5 * (r1 * r1 + r2 * r2) + vlengthsq(offset));
};
cp.areaForCircle = function (r1, r2) {
  return Math.PI * Math.abs(r1 * r1 - r2 * r2);
};
cp.momentForSegment = function (m, a, b) {
  var offset = vmult(vadd(a, b), 0.5);
  return m * (vdistsq(b, a) / 12 + vlengthsq(offset));
};
cp.areaForSegment = function (a, b, r) {
  return r * (Math.PI * r + 2 * vdist(a, b));
};
cp.momentForPoly = function (m, verts, offset) {
  var sum1 = 0;
  var sum2 = 0;
  var len = verts.length;
  for (var i = 0; i < len; i += 2) {
    var v1x = verts[i] + offset.x;
    var v1y = verts[i + 1] + offset.y;
    var v2x = verts[(i + 2) % len] + offset.x;
    var v2y = verts[(i + 3) % len] + offset.y;
    var a = vcross2(v2x, v2y, v1x, v1y);
    var b = vdot2(v1x, v1y, v1x, v1y) + vdot2(v1x, v1y, v2x, v2y) + vdot2(v2x, v2y, v2x, v2y);
    sum1 += a * b;
    sum2 += a;
  }
  return m * sum1 / (6 * sum2);
};
cp.areaForPoly = function (verts) {
  var area = 0;
  for (var i = 0, len = verts.length; i < len; i += 2) {
    area += vcross(new Vect(verts[i], verts[i + 1]), new Vect(verts[(i + 2) % len], verts[(i + 3) % len]));
  }
  return -area / 2;
};
cp.centroidForPoly = function (verts) {
  var sum = 0;
  var vsum = new Vect(0, 0);
  for (var i = 0, len = verts.length; i < len; i += 2) {
    var v1 = new Vect(verts[i], verts[i + 1]);
    var v2 = new Vect(verts[(i + 2) % len], verts[(i + 3) % len]);
    var cross = vcross(v1, v2);
    sum += cross;
    vsum = vadd(vsum, vmult(vadd(v1, v2), cross));
  }
  return vmult(vsum, 1 / (3 * sum));
};
cp.recenterPoly = function (verts) {
  var centroid = cp.centroidForPoly(verts);
  for (var i = 0; i < verts.length; i += 2) {
    verts[i] -= centroid.x;
    verts[i + 1] -= centroid.y;
  }
};
cp.momentForBox = function (m, width, height) {
  return m * (width * width + height * height) / 12;
};
cp.momentForBox2 = function (m, box) {
  var width = box.r - box.l;
  var height = box.t - box.b;
  var offset = vmult([
      box.l + box.r,
      box.b + box.t
    ], 0.5);
  return cp.momentForBox(m, width, height) + m * vlengthsq(offset);
};
var loopIndexes = cp.loopIndexes = function (verts) {
    var start = 0, end = 0;
    var minx, miny, maxx, maxy;
    minx = maxx = verts[0];
    miny = maxy = verts[1];
    var count = verts.length >> 1;
    for (var i = 1; i < count; i++) {
      var x = verts[i * 2];
      var y = verts[i * 2 + 1];
      if (x < minx || x == minx && y < miny) {
        minx = x;
        miny = y;
        start = i;
      } else if (x > maxx || x == maxx && y > maxy) {
        maxx = x;
        maxy = y;
        end = i;
      }
    }
    return [
      start,
      end
    ];
  };
var SWAP = function (arr, idx1, idx2) {
  var tmp = arr[idx1 * 2];
  arr[idx1 * 2] = arr[idx2 * 2];
  arr[idx2 * 2] = tmp;
  tmp = arr[idx1 * 2 + 1];
  arr[idx1 * 2 + 1] = arr[idx2 * 2 + 1];
  arr[idx2 * 2 + 1] = tmp;
};
var QHullPartition = function (verts, offs, count, a, b, tol) {
  if (count === 0)
    return 0;
  var max = 0;
  var pivot = offs;
  var delta = vsub(b, a);
  var valueTol = tol * vlength(delta);
  var head = offs;
  for (var tail = offs + count - 1; head <= tail;) {
    var v = new Vect(verts[head * 2], verts[head * 2 + 1]);
    var value = vcross(delta, vsub(v, a));
    if (value > valueTol) {
      if (value > max) {
        max = value;
        pivot = head;
      }
      head++;
    } else {
      SWAP(verts, head, tail);
      tail--;
    }
  }
  if (pivot != offs)
    SWAP(verts, offs, pivot);
  return head - offs;
};
var QHullReduce = function (tol, verts, offs, count, a, pivot, b, resultPos) {
  if (count < 0) {
    return 0;
  } else if (count == 0) {
    verts[resultPos * 2] = pivot.x;
    verts[resultPos * 2 + 1] = pivot.y;
    return 1;
  } else {
    var left_count = QHullPartition(verts, offs, count, a, pivot, tol);
    var left = new Vect(verts[offs * 2], verts[offs * 2 + 1]);
    var index = QHullReduce(tol, verts, offs + 1, left_count - 1, a, left, pivot, resultPos);
    var pivotPos = resultPos + index++;
    verts[pivotPos * 2] = pivot.x;
    verts[pivotPos * 2 + 1] = pivot.y;
    var right_count = QHullPartition(verts, offs + left_count, count - left_count, pivot, b, tol);
    var right = new Vect(verts[(offs + left_count) * 2], verts[(offs + left_count) * 2 + 1]);
    return index + QHullReduce(tol, verts, offs + left_count + 1, right_count - 1, pivot, right, b, resultPos + index);
  }
};
cp.convexHull = function (verts, result, tolerance) {
  if (result) {
    for (var i = 0; i < verts.length; i++) {
      result[i] = verts[i];
    }
  } else {
    result = verts;
  }
  var indexes = loopIndexes(verts);
  var start = indexes[0], end = indexes[1];
  if (start == end) {
    result.length = 2;
    return result;
  }
  SWAP(result, 0, start);
  SWAP(result, 1, end == 0 ? start : end);
  var a = new Vect(result[0], result[1]);
  var b = new Vect(result[2], result[3]);
  var count = verts.length >> 1;
  var resultCount = QHullReduce(tolerance, result, 2, count - 2, a, b, a, 1) + 1;
  result.length = resultCount * 2;
  assertSoft(polyValidate(result), "Internal error: cpConvexHull() and cpPolyValidate() did not agree." + "Please report this error with as much info as you can.");
  return result;
};
var clamp = function (f, minv, maxv) {
  return min(max(f, minv), maxv);
};
var clamp01 = function (f) {
  return max(0, min(f, 1));
};
var lerp = function (f1, f2, t) {
  return f1 * (1 - t) + f2 * t;
};
var lerpconst = function (f1, f2, d) {
  return f1 + clamp(f2 - f1, -d, d);
};
var Vect = cp.Vect = function (x, y) {
    this.x = x;
    this.y = y;
  };
cp.v = function (x, y) {
  return new Vect(x, y);
};
var vzero = cp.vzero = new Vect(0, 0);
var vdot = cp.v.dot = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  };
var vdot2 = function (x1, y1, x2, y2) {
  return x1 * x2 + y1 * y2;
};
var vlength = cp.v.len = function (v) {
    return Math.sqrt(vdot(v, v));
  };
var vlength2 = cp.v.len2 = function (x, y) {
    return Math.sqrt(x * x + y * y);
  };
var veql = cp.v.eql = function (v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
  };
var vadd = cp.v.add = function (v1, v2) {
    return new Vect(v1.x + v2.x, v1.y + v2.y);
  };
Vect.prototype.add = function (v2) {
  this.x += v2.x;
  this.y += v2.y;
  return this;
};
var vsub = cp.v.sub = function (v1, v2) {
    return new Vect(v1.x - v2.x, v1.y - v2.y);
  };
Vect.prototype.sub = function (v2) {
  this.x -= v2.x;
  this.y -= v2.y;
  return this;
};
var vneg = cp.v.neg = function (v) {
    return new Vect(-v.x, -v.y);
  };
Vect.prototype.neg = function () {
  this.x = -this.x;
  this.y = -this.y;
  return this;
};
var vmult = cp.v.mult = function (v, s) {
    return new Vect(v.x * s, v.y * s);
  };
Vect.prototype.mult = function (s) {
  this.x *= s;
  this.y *= s;
  return this;
};
var vcross = cp.v.cross = function (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  };
var vcross2 = function (x1, y1, x2, y2) {
  return x1 * y2 - y1 * x2;
};
var vperp = cp.v.perp = function (v) {
    return new Vect(-v.y, v.x);
  };
var vpvrperp = cp.v.pvrperp = function (v) {
    return new Vect(v.y, -v.x);
  };
var vproject = cp.v.project = function (v1, v2) {
    return vmult(v2, vdot(v1, v2) / vlengthsq(v2));
  };
Vect.prototype.project = function (v2) {
  this.mult(vdot(this, v2) / vlengthsq(v2));
  return this;
};
var vrotate = cp.v.rotate = function (v1, v2) {
    return new Vect(v1.x * v2.x - v1.y * v2.y, v1.x * v2.y + v1.y * v2.x);
  };
Vect.prototype.rotate = function (v2) {
  this.x = this.x * v2.x - this.y * v2.y;
  this.y = this.x * v2.y + this.y * v2.x;
  return this;
};
var vunrotate = cp.v.unrotate = function (v1, v2) {
    return new Vect(v1.x * v2.x + v1.y * v2.y, v1.y * v2.x - v1.x * v2.y);
  };
var vlengthsq = cp.v.lengthsq = function (v) {
    return vdot(v, v);
  };
var vlengthsq2 = cp.v.lengthsq2 = function (x, y) {
    return x * x + y * y;
  };
var vlerp = cp.v.lerp = function (v1, v2, t) {
    return vadd(vmult(v1, 1 - t), vmult(v2, t));
  };
var vnormalize = cp.v.normalize = function (v) {
    return vmult(v, 1 / vlength(v));
  };
var vnormalize_safe = cp.v.normalize_safe = function (v) {
    return v.x === 0 && v.y === 0 ? vzero : vnormalize(v);
  };
var vclamp = cp.v.clamp = function (v, len) {
    return vdot(v, v) > len * len ? vmult(vnormalize(v), len) : v;
  };
var vlerpconst = cp.v.lerpconst = function (v1, v2, d) {
    return vadd(v1, vclamp(vsub(v2, v1), d));
  };
var vdist = cp.v.dist = function (v1, v2) {
    return vlength(vsub(v1, v2));
  };
var vdistsq = cp.v.distsq = function (v1, v2) {
    return vlengthsq(vsub(v1, v2));
  };
var vnear = cp.v.near = function (v1, v2, dist) {
    return vdistsq(v1, v2) < dist * dist;
  };
var vslerp = cp.v.slerp = function (v1, v2, t) {
    var omega = Math.acos(vdot(v1, v2));
    if (omega) {
      var denom = 1 / Math.sin(omega);
      return vadd(vmult(v1, Math.sin((1 - t) * omega) * denom), vmult(v2, Math.sin(t * omega) * denom));
    } else {
      return v1;
    }
  };
var vslerpconst = cp.v.slerpconst = function (v1, v2, a) {
    var angle = Math.acos(vdot(v1, v2));
    return vslerp(v1, v2, min(a, angle) / angle);
  };
var vforangle = cp.v.forangle = function (a) {
    return new Vect(Math.cos(a), Math.sin(a));
  };
var vtoangle = cp.v.toangle = function (v) {
    return Math.atan2(v.y, v.x);
  };
var vstr = cp.v.str = function (v) {
    return "(" + v.x.toFixed(3) + ", " + v.y.toFixed(3) + ")";
  };
var numBB = 0;
var BB = cp.BB = function (l, b, r, t) {
    this.l = l;
    this.b = b;
    this.r = r;
    this.t = t;
    numBB++;
  };
cp.bb = function (l, b, r, t) {
  return new BB(l, b, r, t);
};
var bbNewForCircle = function (p, r) {
  return new BB(p.x - r, p.y - r, p.x + r, p.y + r);
};
var bbIntersects = function (a, b) {
  return a.l <= b.r && b.l <= a.r && a.b <= b.t && b.b <= a.t;
};
var bbIntersects2 = function (bb, l, b, r, t) {
  return bb.l <= r && l <= bb.r && bb.b <= t && b <= bb.t;
};
var bbContainsBB = function (bb, other) {
  return bb.l <= other.l && bb.r >= other.r && bb.b <= other.b && bb.t >= other.t;
};
var bbContainsVect = function (bb, v) {
  return bb.l <= v.x && bb.r >= v.x && bb.b <= v.y && bb.t >= v.y;
};
var bbContainsVect2 = function (l, b, r, t, v) {
  return l <= v.x && r >= v.x && b <= v.y && t >= v.y;
};
var bbMerge = function (a, b) {
  return new BB(min(a.l, b.l), min(a.b, b.b), max(a.r, b.r), max(a.t, b.t));
};
var bbExpand = function (bb, v) {
  return new BB(min(bb.l, v.x), min(bb.b, v.y), max(bb.r, v.x), max(bb.t, v.y));
};
var bbArea = function (bb) {
  return (bb.r - bb.l) * (bb.t - bb.b);
};
var bbMergedArea = function (a, b) {
  return (max(a.r, b.r) - min(a.l, b.l)) * (max(a.t, b.t) - min(a.b, b.b));
};
var bbMergedArea2 = function (bb, l, b, r, t) {
  return (max(bb.r, r) - min(bb.l, l)) * (max(bb.t, t) - min(bb.b, b));
};
var bbIntersectsSegment = function (bb, a, b) {
  return bbSegmentQuery(bb, a, b) != Infinity;
};
var bbClampVect = function (bb, v) {
  var x = min(max(bb.l, v.x), bb.r);
  var y = min(max(bb.b, v.y), bb.t);
  return new Vect(x, y);
};
var bbWrapVect = function (bb, v) {
  var ix = Math.abs(bb.r - bb.l);
  var modx = (v.x - bb.l) % ix;
  var x = modx > 0 ? modx : modx + ix;
  var iy = Math.abs(bb.t - bb.b);
  var mody = (v.y - bb.b) % iy;
  var y = mody > 0 ? mody : mody + iy;
  return new Vect(x + bb.l, y + bb.b);
};
var shapeIDCounter = 0;
var CP_NO_GROUP = cp.NO_GROUP = 0;
var CP_ALL_LAYERS = cp.ALL_LAYERS = ~0;
cp.resetShapeIdCounter = function () {
  shapeIDCounter = 0;
};
var Shape = cp.Shape = function (body) {
    this.body = body;
    this.bb_l = this.bb_b = this.bb_r = this.bb_t = 0;
    this.hashid = shapeIDCounter++;
    this.sensor = false;
    this.e = 0;
    this.u = 0;
    this.surface_v = vzero;
    this.collision_type = 0;
    this.group = 0;
    this.layers = CP_ALL_LAYERS;
    this.space = null;
    this.collisionCode = this.collisionCode;
  };
Shape.prototype.setElasticity = function (e) {
  this.e = e;
};
Shape.prototype.setFriction = function (u) {
  this.body.activate();
  this.u = u;
};
Shape.prototype.setLayers = function (layers) {
  this.body.activate();
  this.layers = layers;
};
Shape.prototype.setSensor = function (sensor) {
  this.body.activate();
  this.sensor = sensor;
};
Shape.prototype.setCollisionType = function (collision_type) {
  this.body.activate();
  this.collision_type = collision_type;
};
Shape.prototype.getBody = function () {
  return this.body;
};
Shape.prototype.active = function () {
  return this.body && this.body.shapeList.indexOf(this) !== -1;
};
Shape.prototype.setBody = function (body) {
  assert(!this.active(), "You cannot change the body on an active shape. You must remove the shape from the space before changing the body.");
  this.body = body;
};
Shape.prototype.cacheBB = function () {
  return this.update(this.body.p, this.body.rot);
};
Shape.prototype.update = function (pos, rot) {
  assert(!isNaN(rot.x), "Rotation is NaN");
  assert(!isNaN(pos.x), "Position is NaN");
  this.cacheData(pos, rot);
};
Shape.prototype.pointQuery = function (p) {
  var info = this.nearestPointQuery(p);
  if (info.d < 0)
    return info;
};
Shape.prototype.getBB = function () {
  return new BB(this.bb_l, this.bb_b, this.bb_r, this.bb_t);
};
var PointQueryExtendedInfo = function (shape) {
  this.shape = shape;
  this.d = Infinity;
  this.n = vzero;
};
var NearestPointQueryInfo = function (shape, p, d) {
  this.shape = shape;
  this.p = p;
  this.d = d;
};
var SegmentQueryInfo = function (shape, t, n) {
  this.shape = shape;
  this.t = t;
  this.n = n;
};
SegmentQueryInfo.prototype.hitPoint = function (start, end) {
  return vlerp(start, end, this.t);
};
SegmentQueryInfo.prototype.hitDist = function (start, end) {
  return vdist(start, end) * this.t;
};
var CircleShape = cp.CircleShape = function (body, radius, offset) {
    this.c = this.tc = offset;
    this.r = radius;
    this.type = "circle";
    Shape.call(this, body);
  };
CircleShape.prototype = Object.create(Shape.prototype);
CircleShape.prototype.cacheData = function (p, rot) {
  var c = this.tc = vrotate(this.c, rot).add(p);
  var r = this.r;
  this.bb_l = c.x - r;
  this.bb_b = c.y - r;
  this.bb_r = c.x + r;
  this.bb_t = c.y + r;
};
CircleShape.prototype.nearestPointQuery = function (p) {
  var deltax = p.x - this.tc.x;
  var deltay = p.y - this.tc.y;
  var d = vlength2(deltax, deltay);
  var r = this.r;
  var nearestp = new Vect(this.tc.x + deltax * r / d, this.tc.y + deltay * r / d);
  return new NearestPointQueryInfo(this, nearestp, d - r);
};
var circleSegmentQuery = function (shape, center, r, a, b, info) {
  a = vsub(a, center);
  b = vsub(b, center);
  var qa = vdot(a, a) - 2 * vdot(a, b) + vdot(b, b);
  var qb = -2 * vdot(a, a) + 2 * vdot(a, b);
  var qc = vdot(a, a) - r * r;
  var det = qb * qb - 4 * qa * qc;
  if (det >= 0) {
    var t = (-qb - Math.sqrt(det)) / (2 * qa);
    if (0 <= t && t <= 1) {
      return new SegmentQueryInfo(shape, t, vnormalize(vlerp(a, b, t)));
    }
  }
};
CircleShape.prototype.segmentQuery = function (a, b) {
  return circleSegmentQuery(this, this.tc, this.r, a, b);
};
var SegmentShape = cp.SegmentShape = function (body, a, b, r) {
    this.a = a;
    this.b = b;
    this.n = vperp(vnormalize(vsub(b, a)));
    this.ta = this.tb = this.tn = null;
    this.r = r;
    this.a_tangent = vzero;
    this.b_tangent = vzero;
    this.type = "segment";
    Shape.call(this, body);
  };
SegmentShape.prototype = Object.create(Shape.prototype);
SegmentShape.prototype.cacheData = function (p, rot) {
  this.ta = vadd(p, vrotate(this.a, rot));
  this.tb = vadd(p, vrotate(this.b, rot));
  this.tn = vrotate(this.n, rot);
  var l, r, b, t;
  if (this.ta.x < this.tb.x) {
    l = this.ta.x;
    r = this.tb.x;
  } else {
    l = this.tb.x;
    r = this.ta.x;
  }
  if (this.ta.y < this.tb.y) {
    b = this.ta.y;
    t = this.tb.y;
  } else {
    b = this.tb.y;
    t = this.ta.y;
  }
  var rad = this.r;
  this.bb_l = l - rad;
  this.bb_b = b - rad;
  this.bb_r = r + rad;
  this.bb_t = t + rad;
};
SegmentShape.prototype.nearestPointQuery = function (p) {
  var closest = closestPointOnSegment(p, this.ta, this.tb);
  var deltax = p.x - closest.x;
  var deltay = p.y - closest.y;
  var d = vlength2(deltax, deltay);
  var r = this.r;
  var nearestp = d ? vadd(closest, vmult(new Vect(deltax, deltay), r / d)) : closest;
  return new NearestPointQueryInfo(this, nearestp, d - r);
};
SegmentShape.prototype.segmentQuery = function (a, b) {
  var n = this.tn;
  var d = vdot(vsub(this.ta, a), n);
  var r = this.r;
  var flipped_n = d > 0 ? vneg(n) : n;
  var n_offset = vsub(vmult(flipped_n, r), a);
  var seg_a = vadd(this.ta, n_offset);
  var seg_b = vadd(this.tb, n_offset);
  var delta = vsub(b, a);
  if (vcross(delta, seg_a) * vcross(delta, seg_b) <= 0) {
    var d_offset = d + (d > 0 ? -r : r);
    var ad = -d_offset;
    var bd = vdot(delta, n) - d_offset;
    if (ad * bd < 0) {
      return new SegmentQueryInfo(this, ad / (ad - bd), flipped_n);
    }
  } else if (r !== 0) {
    var info1 = circleSegmentQuery(this, this.ta, this.r, a, b);
    var info2 = circleSegmentQuery(this, this.tb, this.r, a, b);
    if (info1) {
      return info2 && info2.t < info1.t ? info2 : info1;
    } else {
      return info2;
    }
  }
};
SegmentShape.prototype.setNeighbors = function (prev, next) {
  this.a_tangent = vsub(prev, this.a);
  this.b_tangent = vsub(next, this.b);
};
SegmentShape.prototype.setEndpoints = function (a, b) {
  this.a = a;
  this.b = b;
  this.n = vperp(vnormalize(vsub(b, a)));
};
var polyValidate = function (verts) {
  var len = verts.length;
  for (var i = 0; i < len; i += 2) {
    var ax = verts[i];
    var ay = verts[i + 1];
    var bx = verts[(i + 2) % len];
    var by = verts[(i + 3) % len];
    var cx = verts[(i + 4) % len];
    var cy = verts[(i + 5) % len];
    if (vcross2(bx - ax, by - ay, cx - bx, cy - by) > 0) {
      return false;
    }
  }
  return true;
};
var PolyShape = cp.PolyShape = function (body, verts, offset) {
    this.setVerts(verts, offset);
    this.type = "poly";
    Shape.call(this, body);
  };
PolyShape.prototype = Object.create(Shape.prototype);
var SplittingPlane = function (n, d) {
  this.n = n;
  this.d = d;
};
SplittingPlane.prototype.compare = function (v) {
  return vdot(this.n, v) - this.d;
};
PolyShape.prototype.setVerts = function (verts, offset) {
  assert(verts.length >= 4, "Polygons require some verts");
  assert(typeof verts[0] === "number", "Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])");
  assert(polyValidate(verts), "Polygon is concave or has a reversed winding. Consider using cpConvexHull()");
  var len = verts.length;
  var numVerts = len >> 1;
  this.verts = new Array(len);
  this.tVerts = new Array(len);
  this.planes = new Array(numVerts);
  this.tPlanes = new Array(numVerts);
  for (var i = 0; i < len; i += 2) {
    var ax = verts[i] + offset.x;
    var ay = verts[i + 1] + offset.y;
    var bx = verts[(i + 2) % len] + offset.x;
    var by = verts[(i + 3) % len] + offset.y;
    var n = vnormalize(vperp(new Vect(bx - ax, by - ay)));
    this.verts[i] = ax;
    this.verts[i + 1] = ay;
    this.planes[i >> 1] = new SplittingPlane(n, vdot2(n.x, n.y, ax, ay));
    this.tPlanes[i >> 1] = new SplittingPlane(new Vect(0, 0), 0);
  }
};
var BoxShape = cp.BoxShape = function (body, width, height) {
    var hw = width / 2;
    var hh = height / 2;
    return BoxShape2(body, new BB(-hw, -hh, hw, hh));
  };
var BoxShape2 = cp.BoxShape2 = function (body, box) {
    var verts = [
        box.l,
        box.b,
        box.l,
        box.t,
        box.r,
        box.t,
        box.r,
        box.b
      ];
    return new PolyShape(body, verts, vzero);
  };
PolyShape.prototype.transformVerts = function (p, rot) {
  var src = this.verts;
  var dst = this.tVerts;
  var l = Infinity, r = -Infinity;
  var b = Infinity, t = -Infinity;
  for (var i = 0; i < src.length; i += 2) {
    var x = src[i];
    var y = src[i + 1];
    var vx = p.x + x * rot.x - y * rot.y;
    var vy = p.y + x * rot.y + y * rot.x;
    dst[i] = vx;
    dst[i + 1] = vy;
    l = min(l, vx);
    r = max(r, vx);
    b = min(b, vy);
    t = max(t, vy);
  }
  this.bb_l = l;
  this.bb_b = b;
  this.bb_r = r;
  this.bb_t = t;
};
PolyShape.prototype.transformAxes = function (p, rot) {
  var src = this.planes;
  var dst = this.tPlanes;
  for (var i = 0; i < src.length; i++) {
    var n = vrotate(src[i].n, rot);
    dst[i].n = n;
    dst[i].d = vdot(p, n) + src[i].d;
  }
};
PolyShape.prototype.cacheData = function (p, rot) {
  this.transformAxes(p, rot);
  this.transformVerts(p, rot);
};
PolyShape.prototype.nearestPointQuery = function (p) {
  var planes = this.tPlanes;
  var verts = this.tVerts;
  var v0x = verts[verts.length - 2];
  var v0y = verts[verts.length - 1];
  var minDist = Infinity;
  var closestPoint = vzero;
  var outside = false;
  for (var i = 0; i < planes.length; i++) {
    if (planes[i].compare(p) > 0)
      outside = true;
    var v1x = verts[i * 2];
    var v1y = verts[i * 2 + 1];
    var closest = closestPointOnSegment2(p.x, p.y, v0x, v0y, v1x, v1y);
    var dist = vdist(p, closest);
    if (dist < minDist) {
      minDist = dist;
      closestPoint = closest;
    }
    v0x = v1x;
    v0y = v1y;
  }
  return new NearestPointQueryInfo(this, closestPoint, outside ? minDist : -minDist);
};
PolyShape.prototype.segmentQuery = function (a, b) {
  var axes = this.tPlanes;
  var verts = this.tVerts;
  var numVerts = axes.length;
  var len = numVerts * 2;
  for (var i = 0; i < numVerts; i++) {
    var n = axes[i].n;
    var an = vdot(a, n);
    if (axes[i].d > an)
      continue;
    var bn = vdot(b, n);
    var t = (axes[i].d - an) / (bn - an);
    if (t < 0 || 1 < t)
      continue;
    var point = vlerp(a, b, t);
    var dt = -vcross(n, point);
    var dtMin = -vcross2(n.x, n.y, verts[i * 2], verts[i * 2 + 1]);
    var dtMax = -vcross2(n.x, n.y, verts[(i * 2 + 2) % len], verts[(i * 2 + 3) % len]);
    if (dtMin <= dt && dt <= dtMax) {
      return new SegmentQueryInfo(this, t, n);
    }
  }
};
PolyShape.prototype.valueOnAxis = function (n, d) {
  var verts = this.tVerts;
  var m = vdot2(n.x, n.y, verts[0], verts[1]);
  for (var i = 2; i < verts.length; i += 2) {
    m = min(m, vdot2(n.x, n.y, verts[i], verts[i + 1]));
  }
  return m - d;
};
PolyShape.prototype.containsVert = function (vx, vy) {
  var planes = this.tPlanes;
  for (var i = 0; i < planes.length; i++) {
    var n = planes[i].n;
    var dist = vdot2(n.x, n.y, vx, vy) - planes[i].d;
    if (dist > 0)
      return false;
  }
  return true;
};
PolyShape.prototype.containsVertPartial = function (vx, vy, n) {
  var planes = this.tPlanes;
  for (var i = 0; i < planes.length; i++) {
    var n2 = planes[i].n;
    if (vdot(n2, n) < 0)
      continue;
    var dist = vdot2(n2.x, n2.y, vx, vy) - planes[i].d;
    if (dist > 0)
      return false;
  }
  return true;
};
PolyShape.prototype.getNumVerts = function () {
  return this.verts.length / 2;
};
PolyShape.prototype.getVert = function (i) {
  return new Vect(this.verts[i * 2], this.verts[i * 2 + 1]);
};
var Body = cp.Body = function (m, i) {
    this.p = new Vect(0, 0);
    this.vx = this.vy = 0;
    this.f = new Vect(0, 0);
    this.w = 0;
    this.t = 0;
    this.v_limit = Infinity;
    this.w_limit = Infinity;
    this.v_biasx = this.v_biasy = 0;
    this.w_bias = 0;
    this.space = null;
    this.shapeList = [];
    this.arbiterList = null;
    this.constraintList = null;
    this.nodeRoot = null;
    this.nodeNext = null;
    this.nodeIdleTime = 0;
    this.setMass(m);
    this.setMoment(i);
    this.rot = new Vect(0, 0);
    this.setAngle(0);
  };
var createStaticBody = function () {
  var body = new Body(Infinity, Infinity);
  body.nodeIdleTime = Infinity;
  return body;
};
if (typeof DEBUG !== "undefined" && DEBUG) {
  var v_assert_nan = function (v, message) {
    assert(v.x == v.x && v.y == v.y, message);
  };
  var v_assert_infinite = function (v, message) {
    assert(Math.abs(v.x) !== Infinity && Math.abs(v.y) !== Infinity, message);
  };
  var v_assert_sane = function (v, message) {
    v_assert_nan(v, message);
    v_assert_infinite(v, message);
  };
  Body.prototype.sanityCheck = function () {
    assert(this.m === this.m && this.m_inv === this.m_inv, "Body's mass is invalid.");
    assert(this.i === this.i && this.i_inv === this.i_inv, "Body's moment is invalid.");
    v_assert_sane(this.p, "Body's position is invalid.");
    v_assert_sane(this.f, "Body's force is invalid.");
    assert(this.vx === this.vx && Math.abs(this.vx) !== Infinity, "Body's velocity is invalid.");
    assert(this.vy === this.vy && Math.abs(this.vy) !== Infinity, "Body's velocity is invalid.");
    assert(this.a === this.a && Math.abs(this.a) !== Infinity, "Body's angle is invalid.");
    assert(this.w === this.w && Math.abs(this.w) !== Infinity, "Body's angular velocity is invalid.");
    assert(this.t === this.t && Math.abs(this.t) !== Infinity, "Body's torque is invalid.");
    v_assert_sane(this.rot, "Body's rotation vector is invalid.");
    assert(this.v_limit === this.v_limit, "Body's velocity limit is invalid.");
    assert(this.w_limit === this.w_limit, "Body's angular velocity limit is invalid.");
  };
} else {
  Body.prototype.sanityCheck = function () {
  };
}
Body.prototype.getPos = function () {
  return this.p;
};
Body.prototype.getVel = function () {
  return new Vect(this.vx, this.vy);
};
Body.prototype.getAngVel = function () {
  return this.w;
};
Body.prototype.isSleeping = function () {
  return this.nodeRoot !== null;
};
Body.prototype.isStatic = function () {
  return this.nodeIdleTime === Infinity;
};
Body.prototype.isRogue = function () {
  return this.space === null;
};
Body.prototype.setMass = function (mass) {
  assert(mass > 0, "Mass must be positive and non-zero.");
  this.activate();
  this.m = mass;
  this.m_inv = 1 / mass;
};
Body.prototype.setMoment = function (moment) {
  assert(moment > 0, "Moment of Inertia must be positive and non-zero.");
  this.activate();
  this.i = moment;
  this.i_inv = 1 / moment;
};
Body.prototype.addShape = function (shape) {
  this.shapeList.push(shape);
};
Body.prototype.removeShape = function (shape) {
  deleteObjFromList(this.shapeList, shape);
};
var filterConstraints = function (node, body, filter) {
  if (node === filter) {
    return node.next(body);
  } else if (node.a === body) {
    node.next_a = filterConstraints(node.next_a, body, filter);
  } else {
    node.next_b = filterConstraints(node.next_b, body, filter);
  }
  return node;
};
Body.prototype.removeConstraint = function (constraint) {
  this.constraintList = filterConstraints(this.constraintList, this, constraint);
};
Body.prototype.setPos = function (pos) {
  this.activate();
  this.sanityCheck();
  if (pos === vzero) {
    pos = cp.v(0, 0);
  }
  this.p = pos;
};
Body.prototype.setVel = function (velocity) {
  this.activate();
  this.vx = velocity.x;
  this.vy = velocity.y;
};
Body.prototype.setAngVel = function (w) {
  this.activate();
  this.w = w;
};
Body.prototype.setAngleInternal = function (angle) {
  assert(!isNaN(angle), "Internal Error: Attempting to set body's angle to NaN");
  this.a = angle;
  this.rot.x = Math.cos(angle);
  this.rot.y = Math.sin(angle);
};
Body.prototype.setAngle = function (angle) {
  this.activate();
  this.sanityCheck();
  this.setAngleInternal(angle);
};
Body.prototype.velocity_func = function (gravity, damping, dt) {
  var vx = this.vx * damping + (gravity.x + this.f.x * this.m_inv) * dt;
  var vy = this.vy * damping + (gravity.y + this.f.y * this.m_inv) * dt;
  var v_limit = this.v_limit;
  var lensq = vx * vx + vy * vy;
  var scale = lensq > v_limit * v_limit ? v_limit / Math.sqrt(lensq) : 1;
  this.vx = vx * scale;
  this.vy = vy * scale;
  var w_limit = this.w_limit;
  this.w = clamp(this.w * damping + this.t * this.i_inv * dt, -w_limit, w_limit);
  this.sanityCheck();
};
Body.prototype.position_func = function (dt) {
  this.p.x += (this.vx + this.v_biasx) * dt;
  this.p.y += (this.vy + this.v_biasy) * dt;
  this.setAngleInternal(this.a + (this.w + this.w_bias) * dt);
  this.v_biasx = this.v_biasy = 0;
  this.w_bias = 0;
  this.sanityCheck();
};
Body.prototype.resetForces = function () {
  this.activate();
  this.f = new Vect(0, 0);
  this.t = 0;
};
Body.prototype.applyForce = function (force, r) {
  this.activate();
  this.f = vadd(this.f, force);
  this.t += vcross(r, force);
};
Body.prototype.applyImpulse = function (j, r) {
  this.activate();
  apply_impulse(this, j.x, j.y, r);
};
Body.prototype.getVelAtPoint = function (r) {
  return vadd(new Vect(this.vx, this.vy), vmult(vperp(r), this.w));
};
Body.prototype.getVelAtWorldPoint = function (point) {
  return this.getVelAtPoint(vsub(point, this.p));
};
Body.prototype.getVelAtLocalPoint = function (point) {
  return this.getVelAtPoint(vrotate(point, this.rot));
};
Body.prototype.eachShape = function (func) {
  for (var i = 0, len = this.shapeList.length; i < len; i++) {
    func(this.shapeList[i]);
  }
};
Body.prototype.eachConstraint = function (func) {
  var constraint = this.constraintList;
  while (constraint) {
    var next = constraint.next(this);
    func(constraint);
    constraint = next;
  }
};
Body.prototype.eachArbiter = function (func) {
  var arb = this.arbiterList;
  while (arb) {
    var next = arb.next(this);
    arb.swappedColl = this === arb.body_b;
    func(arb);
    arb = next;
  }
};
Body.prototype.local2World = function (v) {
  return vadd(this.p, vrotate(v, this.rot));
};
Body.prototype.world2Local = function (v) {
  return vunrotate(vsub(v, this.p), this.rot);
};
Body.prototype.kineticEnergy = function () {
  var vsq = this.vx * this.vx + this.vy * this.vy;
  var wsq = this.w * this.w;
  return (vsq ? vsq * this.m : 0) + (wsq ? wsq * this.i : 0);
};
var SpatialIndex = cp.SpatialIndex = function (staticIndex) {
    this.staticIndex = staticIndex;
    if (staticIndex) {
      if (staticIndex.dynamicIndex) {
        throw new Error("This static index is already associated with a dynamic index.");
      }
      staticIndex.dynamicIndex = this;
    }
  };
SpatialIndex.prototype.collideStatic = function (staticIndex, func) {
  if (staticIndex.count > 0) {
    var query = staticIndex.query;
    this.each(function (obj) {
      query(obj, new BB(obj.bb_l, obj.bb_b, obj.bb_r, obj.bb_t), func);
    });
  }
};
var BBTree = cp.BBTree = function (staticIndex) {
    SpatialIndex.call(this, staticIndex);
    this.velocityFunc = null;
    this.leaves = {};
    this.count = 0;
    this.root = null;
    this.pooledNodes = null;
    this.pooledPairs = null;
    this.stamp = 0;
  };
BBTree.prototype = Object.create(SpatialIndex.prototype);
var numNodes = 0;
var Node = function (tree, a, b) {
  this.obj = null;
  this.bb_l = min(a.bb_l, b.bb_l);
  this.bb_b = min(a.bb_b, b.bb_b);
  this.bb_r = max(a.bb_r, b.bb_r);
  this.bb_t = max(a.bb_t, b.bb_t);
  this.parent = null;
  this.setA(a);
  this.setB(b);
};
BBTree.prototype.makeNode = function (a, b) {
  var node = this.pooledNodes;
  if (node) {
    this.pooledNodes = node.parent;
    node.constructor(this, a, b);
    return node;
  } else {
    numNodes++;
    return new Node(this, a, b);
  }
};
var numLeaves = 0;
var Leaf = function (tree, obj) {
  this.obj = obj;
  tree.getBB(obj, this);
  this.parent = null;
  this.stamp = 1;
  this.pairs = null;
  numLeaves++;
};
BBTree.prototype.getBB = function (obj, dest) {
  var velocityFunc = this.velocityFunc;
  if (velocityFunc) {
    var coef = 0.1;
    var x = (obj.bb_r - obj.bb_l) * coef;
    var y = (obj.bb_t - obj.bb_b) * coef;
    var v = vmult(velocityFunc(obj), 0.1);
    dest.bb_l = obj.bb_l + min(-x, v.x);
    dest.bb_b = obj.bb_b + min(-y, v.y);
    dest.bb_r = obj.bb_r + max(x, v.x);
    dest.bb_t = obj.bb_t + max(y, v.y);
  } else {
    dest.bb_l = obj.bb_l;
    dest.bb_b = obj.bb_b;
    dest.bb_r = obj.bb_r;
    dest.bb_t = obj.bb_t;
  }
};
BBTree.prototype.getStamp = function () {
  var dynamic = this.dynamicIndex;
  return dynamic && dynamic.stamp ? dynamic.stamp : this.stamp;
};
BBTree.prototype.incrementStamp = function () {
  if (this.dynamicIndex && this.dynamicIndex.stamp) {
    this.dynamicIndex.stamp++;
  } else {
    this.stamp++;
  }
};
var numPairs = 0;
var Pair = function (leafA, nextA, leafB, nextB) {
  this.prevA = null;
  this.leafA = leafA;
  this.nextA = nextA;
  this.prevB = null;
  this.leafB = leafB;
  this.nextB = nextB;
};
BBTree.prototype.makePair = function (leafA, nextA, leafB, nextB) {
  var pair = this.pooledPairs;
  if (pair) {
    this.pooledPairs = pair.prevA;
    pair.prevA = null;
    pair.leafA = leafA;
    pair.nextA = nextA;
    pair.prevB = null;
    pair.leafB = leafB;
    pair.nextB = nextB;
    return pair;
  } else {
    numPairs++;
    return new Pair(leafA, nextA, leafB, nextB);
  }
};
Pair.prototype.recycle = function (tree) {
  this.prevA = tree.pooledPairs;
  tree.pooledPairs = this;
};
var unlinkThread = function (prev, leaf, next) {
  if (next) {
    if (next.leafA === leaf)
      next.prevA = prev;
    else
      next.prevB = prev;
  }
  if (prev) {
    if (prev.leafA === leaf)
      prev.nextA = next;
    else
      prev.nextB = next;
  } else {
    leaf.pairs = next;
  }
};
Leaf.prototype.clearPairs = function (tree) {
  var pair = this.pairs, next;
  this.pairs = null;
  while (pair) {
    if (pair.leafA === this) {
      next = pair.nextA;
      unlinkThread(pair.prevB, pair.leafB, pair.nextB);
    } else {
      next = pair.nextB;
      unlinkThread(pair.prevA, pair.leafA, pair.nextA);
    }
    pair.recycle(tree);
    pair = next;
  }
};
var pairInsert = function (a, b, tree) {
  var nextA = a.pairs, nextB = b.pairs;
  var pair = tree.makePair(a, nextA, b, nextB);
  a.pairs = b.pairs = pair;
  if (nextA) {
    if (nextA.leafA === a)
      nextA.prevA = pair;
    else
      nextA.prevB = pair;
  }
  if (nextB) {
    if (nextB.leafA === b)
      nextB.prevA = pair;
    else
      nextB.prevB = pair;
  }
};
Node.prototype.recycle = function (tree) {
  this.parent = tree.pooledNodes;
  tree.pooledNodes = this;
};
Leaf.prototype.recycle = function (tree) {
};
Node.prototype.setA = function (value) {
  this.A = value;
  value.parent = this;
};
Node.prototype.setB = function (value) {
  this.B = value;
  value.parent = this;
};
Leaf.prototype.isLeaf = true;
Node.prototype.isLeaf = false;
Node.prototype.otherChild = function (child) {
  return this.A == child ? this.B : this.A;
};
Node.prototype.replaceChild = function (child, value, tree) {
  assertSoft(child == this.A || child == this.B, "Node is not a child of parent.");
  if (this.A == child) {
    this.A.recycle(tree);
    this.setA(value);
  } else {
    this.B.recycle(tree);
    this.setB(value);
  }
  for (var node = this; node; node = node.parent) {
    var a = node.A;
    var b = node.B;
    node.bb_l = min(a.bb_l, b.bb_l);
    node.bb_b = min(a.bb_b, b.bb_b);
    node.bb_r = max(a.bb_r, b.bb_r);
    node.bb_t = max(a.bb_t, b.bb_t);
  }
};
Node.prototype.bbArea = Leaf.prototype.bbArea = function () {
  return (this.bb_r - this.bb_l) * (this.bb_t - this.bb_b);
};
var bbTreeMergedArea = function (a, b) {
  return (max(a.bb_r, b.bb_r) - min(a.bb_l, b.bb_l)) * (max(a.bb_t, b.bb_t) - min(a.bb_b, b.bb_b));
};
var bbProximity = function (a, b) {
  return Math.abs(a.bb_l + a.bb_r - b.bb_l - b.bb_r) + Math.abs(a.bb_b + a.bb_t - b.bb_b - b.bb_t);
};
var subtreeInsert = function (subtree, leaf, tree) {
  if (subtree == null) {
    return leaf;
  } else if (subtree.isLeaf) {
    return tree.makeNode(leaf, subtree);
  } else {
    var cost_a = subtree.B.bbArea() + bbTreeMergedArea(subtree.A, leaf);
    var cost_b = subtree.A.bbArea() + bbTreeMergedArea(subtree.B, leaf);
    if (cost_a === cost_b) {
      cost_a = bbProximity(subtree.A, leaf);
      cost_b = bbProximity(subtree.B, leaf);
    }
    if (cost_b < cost_a) {
      subtree.setB(subtreeInsert(subtree.B, leaf, tree));
    } else {
      subtree.setA(subtreeInsert(subtree.A, leaf, tree));
    }
    subtree.bb_l = min(subtree.bb_l, leaf.bb_l);
    subtree.bb_b = min(subtree.bb_b, leaf.bb_b);
    subtree.bb_r = max(subtree.bb_r, leaf.bb_r);
    subtree.bb_t = max(subtree.bb_t, leaf.bb_t);
    return subtree;
  }
};
Node.prototype.intersectsBB = Leaf.prototype.intersectsBB = function (bb) {
  return this.bb_l <= bb.r && bb.l <= this.bb_r && this.bb_b <= bb.t && bb.b <= this.bb_t;
};
var subtreeQuery = function (subtree, bb, func) {
  if (subtree.intersectsBB(bb)) {
    if (subtree.isLeaf) {
      func(subtree.obj);
    } else {
      subtreeQuery(subtree.A, bb, func);
      subtreeQuery(subtree.B, bb, func);
    }
  }
};
var nodeSegmentQuery = function (node, a, b) {
  var idx = 1 / (b.x - a.x);
  var tx1 = node.bb_l == a.x ? -Infinity : (node.bb_l - a.x) * idx;
  var tx2 = node.bb_r == a.x ? Infinity : (node.bb_r - a.x) * idx;
  var txmin = min(tx1, tx2);
  var txmax = max(tx1, tx2);
  var idy = 1 / (b.y - a.y);
  var ty1 = node.bb_b == a.y ? -Infinity : (node.bb_b - a.y) * idy;
  var ty2 = node.bb_t == a.y ? Infinity : (node.bb_t - a.y) * idy;
  var tymin = min(ty1, ty2);
  var tymax = max(ty1, ty2);
  if (tymin <= txmax && txmin <= tymax) {
    var min_ = max(txmin, tymin);
    var max_ = min(txmax, tymax);
    if (0 <= max_ && min_ <= 1)
      return max(min_, 0);
  }
  return Infinity;
};
var subtreeSegmentQuery = function (subtree, a, b, t_exit, func) {
  if (subtree.isLeaf) {
    return func(subtree.obj);
  } else {
    var t_a = nodeSegmentQuery(subtree.A, a, b);
    var t_b = nodeSegmentQuery(subtree.B, a, b);
    if (t_a < t_b) {
      if (t_a < t_exit)
        t_exit = min(t_exit, subtreeSegmentQuery(subtree.A, a, b, t_exit, func));
      if (t_b < t_exit)
        t_exit = min(t_exit, subtreeSegmentQuery(subtree.B, a, b, t_exit, func));
    } else {
      if (t_b < t_exit)
        t_exit = min(t_exit, subtreeSegmentQuery(subtree.B, a, b, t_exit, func));
      if (t_a < t_exit)
        t_exit = min(t_exit, subtreeSegmentQuery(subtree.A, a, b, t_exit, func));
    }
    return t_exit;
  }
};
BBTree.prototype.subtreeRecycle = function (node) {
  if (node.isLeaf) {
    this.subtreeRecycle(node.A);
    this.subtreeRecycle(node.B);
    node.recycle(this);
  }
};
var subtreeRemove = function (subtree, leaf, tree) {
  if (leaf == subtree) {
    return null;
  } else {
    var parent = leaf.parent;
    if (parent == subtree) {
      var other = subtree.otherChild(leaf);
      other.parent = subtree.parent;
      subtree.recycle(tree);
      return other;
    } else {
      parent.parent.replaceChild(parent, parent.otherChild(leaf), tree);
      return subtree;
    }
  }
};
var bbTreeIntersectsNode = function (a, b) {
  return a.bb_l <= b.bb_r && b.bb_l <= a.bb_r && a.bb_b <= b.bb_t && b.bb_b <= a.bb_t;
};
Leaf.prototype.markLeafQuery = function (leaf, left, tree, func) {
  if (bbTreeIntersectsNode(leaf, this)) {
    if (left) {
      pairInsert(leaf, this, tree);
    } else {
      if (this.stamp < leaf.stamp)
        pairInsert(this, leaf, tree);
      if (func)
        func(leaf.obj, this.obj);
    }
  }
};
Node.prototype.markLeafQuery = function (leaf, left, tree, func) {
  if (bbTreeIntersectsNode(leaf, this)) {
    this.A.markLeafQuery(leaf, left, tree, func);
    this.B.markLeafQuery(leaf, left, tree, func);
  }
};
Leaf.prototype.markSubtree = function (tree, staticRoot, func) {
  if (this.stamp == tree.getStamp()) {
    if (staticRoot)
      staticRoot.markLeafQuery(this, false, tree, func);
    for (var node = this; node.parent; node = node.parent) {
      if (node == node.parent.A) {
        node.parent.B.markLeafQuery(this, true, tree, func);
      } else {
        node.parent.A.markLeafQuery(this, false, tree, func);
      }
    }
  } else {
    var pair = this.pairs;
    while (pair) {
      if (this === pair.leafB) {
        if (func)
          func(pair.leafA.obj, this.obj);
        pair = pair.nextB;
      } else {
        pair = pair.nextA;
      }
    }
  }
};
Node.prototype.markSubtree = function (tree, staticRoot, func) {
  this.A.markSubtree(tree, staticRoot, func);
  this.B.markSubtree(tree, staticRoot, func);
};
Leaf.prototype.containsObj = function (obj) {
  return this.bb_l <= obj.bb_l && this.bb_r >= obj.bb_r && this.bb_b <= obj.bb_b && this.bb_t >= obj.bb_t;
};
Leaf.prototype.update = function (tree) {
  var root = tree.root;
  var obj = this.obj;
  if (!this.containsObj(obj)) {
    tree.getBB(this.obj, this);
    root = subtreeRemove(root, this, tree);
    tree.root = subtreeInsert(root, this, tree);
    this.clearPairs(tree);
    this.stamp = tree.getStamp();
    return true;
  }
  return false;
};
Leaf.prototype.addPairs = function (tree) {
  var dynamicIndex = tree.dynamicIndex;
  if (dynamicIndex) {
    var dynamicRoot = dynamicIndex.root;
    if (dynamicRoot) {
      dynamicRoot.markLeafQuery(this, true, dynamicIndex, null);
    }
  } else {
    var staticRoot = tree.staticIndex.root;
    this.markSubtree(tree, staticRoot, null);
  }
};
BBTree.prototype.insert = function (obj, hashid) {
  var leaf = new Leaf(this, obj);
  this.leaves[hashid] = leaf;
  this.root = subtreeInsert(this.root, leaf, this);
  this.count++;
  leaf.stamp = this.getStamp();
  leaf.addPairs(this);
  this.incrementStamp();
};
BBTree.prototype.remove = function (obj, hashid) {
  var leaf = this.leaves[hashid];
  delete this.leaves[hashid];
  this.root = subtreeRemove(this.root, leaf, this);
  this.count--;
  leaf.clearPairs(this);
  leaf.recycle(this);
};
BBTree.prototype.contains = function (obj, hashid) {
  return this.leaves[hashid] != null;
};
var voidQueryFunc = function (obj1, obj2) {
};
BBTree.prototype.reindexQuery = function (func) {
  if (!this.root)
    return;
  var hashid, leaves = this.leaves;
  for (hashid in leaves) {
    leaves[hashid].update(this);
  }
  var staticIndex = this.staticIndex;
  var staticRoot = staticIndex && staticIndex.root;
  this.root.markSubtree(this, staticRoot, func);
  if (staticIndex && !staticRoot)
    this.collideStatic(this, staticIndex, func);
  this.incrementStamp();
};
BBTree.prototype.reindex = function () {
  this.reindexQuery(voidQueryFunc);
};
BBTree.prototype.reindexObject = function (obj, hashid) {
  var leaf = this.leaves[hashid];
  if (leaf) {
    if (leaf.update(this))
      leaf.addPairs(this);
    this.incrementStamp();
  }
};
BBTree.prototype.pointQuery = function (point, func) {
  this.query(new BB(point.x, point.y, point.x, point.y), func);
};
BBTree.prototype.segmentQuery = function (a, b, t_exit, func) {
  if (this.root)
    subtreeSegmentQuery(this.root, a, b, t_exit, func);
};
BBTree.prototype.query = function (bb, func) {
  if (this.root)
    subtreeQuery(this.root, bb, func);
};
BBTree.prototype.count = function () {
  return this.count;
};
BBTree.prototype.each = function (func) {
  var hashid;
  for (hashid in this.leaves) {
    func(this.leaves[hashid].obj);
  }
};
var bbTreeMergedArea2 = function (node, l, b, r, t) {
  return (max(node.bb_r, r) - min(node.bb_l, l)) * (max(node.bb_t, t) - min(node.bb_b, b));
};
var partitionNodes = function (tree, nodes, offset, count) {
  if (count == 1) {
    return nodes[offset];
  } else if (count == 2) {
    return tree.makeNode(nodes[offset], nodes[offset + 1]);
  }
  var node = nodes[offset];
  var bb_l = node.bb_l, bb_b = node.bb_b, bb_r = node.bb_r, bb_t = node.bb_t;
  var end = offset + count;
  for (var i = offset + 1; i < end; i++) {
    node = nodes[i];
    bb_l = min(bb_l, node.bb_l);
    bb_b = min(bb_b, node.bb_b);
    bb_r = max(bb_r, node.bb_r);
    bb_t = max(bb_t, node.bb_t);
  }
  var splitWidth = bb_r - bb_l > bb_t - bb_b;
  var bounds = new Array(count * 2);
  if (splitWidth) {
    for (var i = offset; i < end; i++) {
      bounds[2 * i + 0] = nodes[i].bb_l;
      bounds[2 * i + 1] = nodes[i].bb_r;
    }
  } else {
    for (var i = offset; i < end; i++) {
      bounds[2 * i + 0] = nodes[i].bb_b;
      bounds[2 * i + 1] = nodes[i].bb_t;
    }
  }
  bounds.sort(function (a, b) {
    return a - b;
  });
  var split = (bounds[count - 1] + bounds[count]) * 0.5;
  var a_l = bb_l, a_b = bb_b, a_r = bb_r, a_t = bb_t;
  var b_l = bb_l, b_b = bb_b, b_r = bb_r, b_t = bb_t;
  if (splitWidth)
    a_r = b_l = split;
  else
    a_t = b_b = split;
  var right = end;
  for (var left = offset; left < right;) {
    var node = nodes[left];
    if (bbTreeMergedArea2(node, b_l, b_b, b_r, b_t) < bbTreeMergedArea2(node, a_l, a_b, a_r, a_t)) {
      right--;
      nodes[left] = nodes[right];
      nodes[right] = node;
    } else {
      left++;
    }
  }
  if (right == count) {
    var node = null;
    for (var i = offset; i < end; i++)
      node = subtreeInsert(node, nodes[i], tree);
    return node;
  }
  return NodeNew(tree, partitionNodes(tree, nodes, offset, right - offset), partitionNodes(tree, nodes, right, end - right));
};
BBTree.prototype.optimize = function () {
  var nodes = new Array(this.count);
  var i = 0;
  for (var hashid in this.leaves) {
    nodes[i++] = this.nodes[hashid];
  }
  tree.subtreeRecycle(root);
  this.root = partitionNodes(tree, nodes, nodes.length);
};
var nodeRender = function (node, depth) {
  if (!node.isLeaf && depth <= 10) {
    nodeRender(node.A, depth + 1);
    nodeRender(node.B, depth + 1);
  }
  var str = "";
  for (var i = 0; i < depth; i++) {
    str += " ";
  }
  console.log(str + node.bb_b + " " + node.bb_t);
};
BBTree.prototype.log = function () {
  if (this.root)
    nodeRender(this.root, 0);
};
var CollisionHandler = cp.CollisionHandler = function () {
    this.a = this.b = 0;
  };
CollisionHandler.prototype.begin = function (arb, space) {
  return true;
};
CollisionHandler.prototype.preSolve = function (arb, space) {
  return true;
};
CollisionHandler.prototype.postSolve = function (arb, space) {
};
CollisionHandler.prototype.separate = function (arb, space) {
};
var CP_MAX_CONTACTS_PER_ARBITER = 4;
var Arbiter = function (a, b) {
  this.e = 0;
  this.u = 0;
  this.surface_vr = vzero;
  this.a = a;
  this.body_a = a.body;
  this.b = b;
  this.body_b = b.body;
  this.thread_a_next = this.thread_a_prev = null;
  this.thread_b_next = this.thread_b_prev = null;
  this.contacts = null;
  this.stamp = 0;
  this.handler = null;
  this.swappedColl = false;
  this.state = "first coll";
};
Arbiter.prototype.getShapes = function () {
  if (this.swappedColl) {
    return [
      this.b,
      this.a
    ];
  } else {
    return [
      this.a,
      this.b
    ];
  }
};
Arbiter.prototype.totalImpulse = function () {
  var contacts = this.contacts;
  var sum = new Vect(0, 0);
  for (var i = 0, count = contacts.length; i < count; i++) {
    var con = contacts[i];
    sum.add(vmult(con.n, con.jnAcc));
  }
  return this.swappedColl ? sum : sum.neg();
};
Arbiter.prototype.totalImpulseWithFriction = function () {
  var contacts = this.contacts;
  var sum = new Vect(0, 0);
  for (var i = 0, count = contacts.length; i < count; i++) {
    var con = contacts[i];
    sum.add(new Vect(con.jnAcc, con.jtAcc).rotate(con.n));
  }
  return this.swappedColl ? sum : sum.neg();
};
Arbiter.prototype.totalKE = function () {
  var eCoef = (1 - this.e) / (1 + this.e);
  var sum = 0;
  var contacts = this.contacts;
  for (var i = 0, count = contacts.length; i < count; i++) {
    var con = contacts[i];
    var jnAcc = con.jnAcc;
    var jtAcc = con.jtAcc;
    sum += eCoef * jnAcc * jnAcc / con.nMass + jtAcc * jtAcc / con.tMass;
  }
  return sum;
};
Arbiter.prototype.ignore = function () {
  this.state = "ignore";
};
Arbiter.prototype.getA = function () {
  return this.swappedColl ? this.b : this.a;
};
Arbiter.prototype.getB = function () {
  return this.swappedColl ? this.a : this.b;
};
Arbiter.prototype.isFirstContact = function () {
  return this.state === "first coll";
};
var ContactPoint = function (point, normal, dist) {
  this.point = point;
  this.normal = normal;
  this.dist = dist;
};
Arbiter.prototype.getContactPointSet = function () {
  var set = new Array(this.contacts.length);
  var i;
  for (i = 0; i < set.length; i++) {
    set[i] = new ContactPoint(this.contacts[i].p, this.contacts[i].n, this.contacts[i].dist);
  }
  return set;
};
Arbiter.prototype.getNormal = function (i) {
  var n = this.contacts[i].n;
  return this.swappedColl ? vneg(n) : n;
};
Arbiter.prototype.getPoint = function (i) {
  return this.contacts[i].p;
};
Arbiter.prototype.getDepth = function (i) {
  return this.contacts[i].dist;
};
var unthreadHelper = function (arb, body, prev, next) {
  if (prev) {
    if (prev.body_a === body) {
      prev.thread_a_next = next;
    } else {
      prev.thread_b_next = next;
    }
  } else {
    body.arbiterList = next;
  }
  if (next) {
    if (next.body_a === body) {
      next.thread_a_prev = prev;
    } else {
      next.thread_b_prev = prev;
    }
  }
};
Arbiter.prototype.unthread = function () {
  unthreadHelper(this, this.body_a, this.thread_a_prev, this.thread_a_next);
  unthreadHelper(this, this.body_b, this.thread_b_prev, this.thread_b_next);
  this.thread_a_prev = this.thread_a_next = null;
  this.thread_b_prev = this.thread_b_next = null;
};
Arbiter.prototype.update = function (contacts, handler, a, b) {
  if (this.contacts) {
    for (var i = 0; i < this.contacts.length; i++) {
      var old = this.contacts[i];
      for (var j = 0; j < contacts.length; j++) {
        var new_contact = contacts[j];
        if (new_contact.hash === old.hash) {
          new_contact.jnAcc = old.jnAcc;
          new_contact.jtAcc = old.jtAcc;
        }
      }
    }
  }
  this.contacts = contacts;
  this.handler = handler;
  this.swappedColl = a.collision_type !== handler.a;
  this.e = a.e * b.e;
  this.u = a.u * b.u;
  this.surface_vr = vsub(a.surface_v, b.surface_v);
  this.a = a;
  this.body_a = a.body;
  this.b = b;
  this.body_b = b.body;
  if (this.state == "cached")
    this.state = "first coll";
};
Arbiter.prototype.preStep = function (dt, slop, bias) {
  var a = this.body_a;
  var b = this.body_b;
  for (var i = 0; i < this.contacts.length; i++) {
    var con = this.contacts[i];
    con.r1 = vsub(con.p, a.p);
    con.r2 = vsub(con.p, b.p);
    con.nMass = 1 / k_scalar(a, b, con.r1, con.r2, con.n);
    con.tMass = 1 / k_scalar(a, b, con.r1, con.r2, vperp(con.n));
    con.bias = -bias * min(0, con.dist + slop) / dt;
    con.jBias = 0;
    con.bounce = normal_relative_velocity(a, b, con.r1, con.r2, con.n) * this.e;
  }
};
Arbiter.prototype.applyCachedImpulse = function (dt_coef) {
  if (this.isFirstContact())
    return;
  var a = this.body_a;
  var b = this.body_b;
  for (var i = 0; i < this.contacts.length; i++) {
    var con = this.contacts[i];
    var nx = con.n.x;
    var ny = con.n.y;
    var jx = nx * con.jnAcc - ny * con.jtAcc;
    var jy = nx * con.jtAcc + ny * con.jnAcc;
    apply_impulses(a, b, con.r1, con.r2, jx * dt_coef, jy * dt_coef);
  }
};
var numApplyImpulse = 0;
var numApplyContact = 0;
Arbiter.prototype.applyImpulse = function () {
  numApplyImpulse++;
  var a = this.body_a;
  var b = this.body_b;
  var surface_vr = this.surface_vr;
  var friction = this.u;
  for (var i = 0; i < this.contacts.length; i++) {
    numApplyContact++;
    var con = this.contacts[i];
    var nMass = con.nMass;
    var n = con.n;
    var r1 = con.r1;
    var r2 = con.r2;
    var vrx = b.vx - r2.y * b.w - (a.vx - r1.y * a.w);
    var vry = b.vy + r2.x * b.w - (a.vy + r1.x * a.w);
    var vbn = n.x * (b.v_biasx - r2.y * b.w_bias - a.v_biasx + r1.y * a.w_bias) + n.y * (r2.x * b.w_bias + b.v_biasy - r1.x * a.w_bias - a.v_biasy);
    var vrn = vdot2(vrx, vry, n.x, n.y);
    var vrt = vdot2(vrx + surface_vr.x, vry + surface_vr.y, -n.y, n.x);
    var jbn = (con.bias - vbn) * nMass;
    var jbnOld = con.jBias;
    con.jBias = max(jbnOld + jbn, 0);
    var jn = -(con.bounce + vrn) * nMass;
    var jnOld = con.jnAcc;
    con.jnAcc = max(jnOld + jn, 0);
    var jtMax = friction * con.jnAcc;
    var jt = -vrt * con.tMass;
    var jtOld = con.jtAcc;
    con.jtAcc = clamp(jtOld + jt, -jtMax, jtMax);
    var bias_x = n.x * (con.jBias - jbnOld);
    var bias_y = n.y * (con.jBias - jbnOld);
    apply_bias_impulse(a, -bias_x, -bias_y, r1);
    apply_bias_impulse(b, bias_x, bias_y, r2);
    var rot_x = con.jnAcc - jnOld;
    var rot_y = con.jtAcc - jtOld;
    apply_impulses(a, b, r1, r2, n.x * rot_x - n.y * rot_y, n.x * rot_y + n.y * rot_x);
  }
};
Arbiter.prototype.callSeparate = function (space) {
  var handler = space.lookupHandler(this.a.collision_type, this.b.collision_type);
  handler.separate(this, space);
};
Arbiter.prototype.next = function (body) {
  return this.body_a == body ? this.thread_a_next : this.thread_b_next;
};
var numContacts = 0;
var Contact = function (p, n, dist, hash) {
  this.p = p;
  this.n = n;
  this.dist = dist;
  this.r1 = this.r2 = vzero;
  this.nMass = this.tMass = this.bounce = this.bias = 0;
  this.jnAcc = this.jtAcc = this.jBias = 0;
  this.hash = hash;
  numContacts++;
};
var NONE = [];
var circle2circleQuery = function (p1, p2, r1, r2) {
  var mindist = r1 + r2;
  var delta = vsub(p2, p1);
  var distsq = vlengthsq(delta);
  if (distsq >= mindist * mindist)
    return;
  var dist = Math.sqrt(distsq);
  return new Contact(vadd(p1, vmult(delta, 0.5 + (r1 - 0.5 * mindist) / (dist ? dist : Infinity))), dist ? vmult(delta, 1 / dist) : new Vect(1, 0), dist - mindist, 0);
};
var circle2circle = function (circ1, circ2) {
  var contact = circle2circleQuery(circ1.tc, circ2.tc, circ1.r, circ2.r);
  return contact ? [contact] : NONE;
};
var circle2segment = function (circleShape, segmentShape) {
  var seg_a = segmentShape.ta;
  var seg_b = segmentShape.tb;
  var center = circleShape.tc;
  var seg_delta = vsub(seg_b, seg_a);
  var closest_t = clamp01(vdot(seg_delta, vsub(center, seg_a)) / vlengthsq(seg_delta));
  var closest = vadd(seg_a, vmult(seg_delta, closest_t));
  var contact = circle2circleQuery(center, closest, circleShape.r, segmentShape.r);
  if (contact) {
    var n = contact.n;
    return closest_t === 0 && vdot(n, segmentShape.a_tangent) < 0 || closest_t === 1 && vdot(n, segmentShape.b_tangent) < 0 ? NONE : [contact];
  } else {
    return NONE;
  }
};
var last_MSA_min = 0;
var findMSA = function (poly, planes) {
  var min_index = 0;
  var min = poly.valueOnAxis(planes[0].n, planes[0].d);
  if (min > 0)
    return -1;
  for (var i = 1; i < planes.length; i++) {
    var dist = poly.valueOnAxis(planes[i].n, planes[i].d);
    if (dist > 0) {
      return -1;
    } else if (dist > min) {
      min = dist;
      min_index = i;
    }
  }
  last_MSA_min = min;
  return min_index;
};
var findVertsFallback = function (poly1, poly2, n, dist) {
  var arr = [];
  var verts1 = poly1.tVerts;
  for (var i = 0; i < verts1.length; i += 2) {
    var vx = verts1[i];
    var vy = verts1[i + 1];
    if (poly2.containsVertPartial(vx, vy, vneg(n))) {
      arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly1.hashid, i)));
    }
  }
  var verts2 = poly2.tVerts;
  for (var i = 0; i < verts2.length; i += 2) {
    var vx = verts2[i];
    var vy = verts2[i + 1];
    if (poly1.containsVertPartial(vx, vy, n)) {
      arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly2.hashid, i)));
    }
  }
  return arr;
};
var findVerts = function (poly1, poly2, n, dist) {
  var arr = [];
  var verts1 = poly1.tVerts;
  for (var i = 0; i < verts1.length; i += 2) {
    var vx = verts1[i];
    var vy = verts1[i + 1];
    if (poly2.containsVert(vx, vy)) {
      arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly1.hashid, i >> 1)));
    }
  }
  var verts2 = poly2.tVerts;
  for (var i = 0; i < verts2.length; i += 2) {
    var vx = verts2[i];
    var vy = verts2[i + 1];
    if (poly1.containsVert(vx, vy)) {
      arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly2.hashid, i >> 1)));
    }
  }
  return arr.length ? arr : findVertsFallback(poly1, poly2, n, dist);
};
var poly2poly = function (poly1, poly2) {
  var mini1 = findMSA(poly2, poly1.tPlanes);
  if (mini1 == -1)
    return NONE;
  var min1 = last_MSA_min;
  var mini2 = findMSA(poly1, poly2.tPlanes);
  if (mini2 == -1)
    return NONE;
  var min2 = last_MSA_min;
  if (min1 > min2)
    return findVerts(poly1, poly2, poly1.tPlanes[mini1].n, min1);
  else
    return findVerts(poly1, poly2, vneg(poly2.tPlanes[mini2].n), min2);
};
var segValueOnAxis = function (seg, n, d) {
  var a = vdot(n, seg.ta) - seg.r;
  var b = vdot(n, seg.tb) - seg.r;
  return min(a, b) - d;
};
var findPointsBehindSeg = function (arr, seg, poly, pDist, coef) {
  var dta = vcross(seg.tn, seg.ta);
  var dtb = vcross(seg.tn, seg.tb);
  var n = vmult(seg.tn, coef);
  var verts = poly.tVerts;
  for (var i = 0; i < verts.length; i += 2) {
    var vx = verts[i];
    var vy = verts[i + 1];
    if (vdot2(vx, vy, n.x, n.y) < vdot(seg.tn, seg.ta) * coef + seg.r) {
      var dt = vcross2(seg.tn.x, seg.tn.y, vx, vy);
      if (dta >= dt && dt >= dtb) {
        arr.push(new Contact(new Vect(vx, vy), n, pDist, hashPair(poly.hashid, i)));
      }
    }
  }
};
var seg2poly = function (seg, poly) {
  var arr = [];
  var planes = poly.tPlanes;
  var numVerts = planes.length;
  var segD = vdot(seg.tn, seg.ta);
  var minNorm = poly.valueOnAxis(seg.tn, segD) - seg.r;
  var minNeg = poly.valueOnAxis(vneg(seg.tn), -segD) - seg.r;
  if (minNeg > 0 || minNorm > 0)
    return NONE;
  var mini = 0;
  var poly_min = segValueOnAxis(seg, planes[0].n, planes[0].d);
  if (poly_min > 0)
    return NONE;
  for (var i = 0; i < numVerts; i++) {
    var dist = segValueOnAxis(seg, planes[i].n, planes[i].d);
    if (dist > 0) {
      return NONE;
    } else if (dist > poly_min) {
      poly_min = dist;
      mini = i;
    }
  }
  var poly_n = vneg(planes[mini].n);
  var va = vadd(seg.ta, vmult(poly_n, seg.r));
  var vb = vadd(seg.tb, vmult(poly_n, seg.r));
  if (poly.containsVert(va.x, va.y))
    arr.push(new Contact(va, poly_n, poly_min, hashPair(seg.hashid, 0)));
  if (poly.containsVert(vb.x, vb.y))
    arr.push(new Contact(vb, poly_n, poly_min, hashPair(seg.hashid, 1)));
  if (minNorm >= poly_min || minNeg >= poly_min) {
    if (minNorm > minNeg)
      findPointsBehindSeg(arr, seg, poly, minNorm, 1);
    else
      findPointsBehindSeg(arr, seg, poly, minNeg, -1);
  }
  if (arr.length === 0) {
    var mini2 = mini * 2;
    var verts = poly.tVerts;
    var poly_a = new Vect(verts[mini2], verts[mini2 + 1]);
    var con;
    if (con = circle2circleQuery(seg.ta, poly_a, seg.r, 0, arr))
      return [con];
    if (con = circle2circleQuery(seg.tb, poly_a, seg.r, 0, arr))
      return [con];
    var len = numVerts * 2;
    var poly_b = new Vect(verts[(mini2 + 2) % len], verts[(mini2 + 3) % len]);
    if (con = circle2circleQuery(seg.ta, poly_b, seg.r, 0, arr))
      return [con];
    if (con = circle2circleQuery(seg.tb, poly_b, seg.r, 0, arr))
      return [con];
  }
  return arr;
};
var circle2poly = function (circ, poly) {
  var planes = poly.tPlanes;
  var mini = 0;
  var min = vdot(planes[0].n, circ.tc) - planes[0].d - circ.r;
  for (var i = 0; i < planes.length; i++) {
    var dist = vdot(planes[i].n, circ.tc) - planes[i].d - circ.r;
    if (dist > 0) {
      return NONE;
    } else if (dist > min) {
      min = dist;
      mini = i;
    }
  }
  var n = planes[mini].n;
  var verts = poly.tVerts;
  var len = verts.length;
  var mini2 = mini << 1;
  var ax = verts[mini2];
  var ay = verts[mini2 + 1];
  var bx = verts[(mini2 + 2) % len];
  var by = verts[(mini2 + 3) % len];
  var dta = vcross2(n.x, n.y, ax, ay);
  var dtb = vcross2(n.x, n.y, bx, by);
  var dt = vcross(n, circ.tc);
  if (dt < dtb) {
    var con = circle2circleQuery(circ.tc, new Vect(bx, by), circ.r, 0, con);
    return con ? [con] : NONE;
  } else if (dt < dta) {
    return [new Contact(vsub(circ.tc, vmult(n, circ.r + min / 2)), vneg(n), min, 0)];
  } else {
    var con = circle2circleQuery(circ.tc, new Vect(ax, ay), circ.r, 0, con);
    return con ? [con] : NONE;
  }
};
CircleShape.prototype.collisionCode = 0;
SegmentShape.prototype.collisionCode = 1;
PolyShape.prototype.collisionCode = 2;
CircleShape.prototype.collisionTable = [
  circle2circle,
  circle2segment,
  circle2poly
];
SegmentShape.prototype.collisionTable = [
  null,
  function (segA, segB) {
    return NONE;
  },
  seg2poly
];
PolyShape.prototype.collisionTable = [
  null,
  null,
  poly2poly
];
var collideShapes = cp.collideShapes = function (a, b) {
    assert(a.collisionCode <= b.collisionCode, "Collided shapes must be sorted by type");
    return a.collisionTable[b.collisionCode](a, b);
  };
var defaultCollisionHandler = new CollisionHandler();
var Space = cp.Space = function () {
    this.stamp = 0;
    this.curr_dt = 0;
    this.bodies = [];
    this.rousedBodies = [];
    this.sleepingComponents = [];
    this.staticShapes = new BBTree(null);
    this.activeShapes = new BBTree(this.staticShapes);
    this.arbiters = [];
    this.contactBuffersHead = null;
    this.cachedArbiters = {};
    this.constraints = [];
    this.locked = 0;
    this.collisionHandlers = {};
    this.defaultHandler = defaultCollisionHandler;
    this.postStepCallbacks = [];
    this.iterations = 10;
    this.gravity = vzero;
    this.damping = 1;
    this.idleSpeedThreshold = 0;
    this.sleepTimeThreshold = Infinity;
    this.collisionSlop = 0.1;
    this.collisionBias = Math.pow(1 - 0.1, 60);
    this.collisionPersistence = 3;
    this.enableContactGraph = false;
    this.staticBody = new Body(Infinity, Infinity);
    this.staticBody.nodeIdleTime = Infinity;
    this.collideShapes = this.makeCollideShapes();
  };
Space.prototype.getCurrentTimeStep = function () {
  return this.curr_dt;
};
Space.prototype.setIterations = function (iter) {
  this.iterations = iter;
};
Space.prototype.isLocked = function () {
  return this.locked;
};
var assertSpaceUnlocked = function (space) {
  assert(!space.locked, "This addition/removal cannot be done safely during a call to cpSpaceStep()  or during a query. Put these calls into a post-step callback.");
};
Space.prototype.addCollisionHandler = function (a, b, begin, preSolve, postSolve, separate) {
  assertSpaceUnlocked(this);
  this.removeCollisionHandler(a, b);
  var handler = new CollisionHandler();
  handler.a = a;
  handler.b = b;
  if (begin)
    handler.begin = begin;
  if (preSolve)
    handler.preSolve = preSolve;
  if (postSolve)
    handler.postSolve = postSolve;
  if (separate)
    handler.separate = separate;
  this.collisionHandlers[hashPair(a, b)] = handler;
};
Space.prototype.removeCollisionHandler = function (a, b) {
  assertSpaceUnlocked(this);
  delete this.collisionHandlers[hashPair(a, b)];
};
Space.prototype.setDefaultCollisionHandler = function (begin, preSolve, postSolve, separate) {
  assertSpaceUnlocked(this);
  var handler = new CollisionHandler();
  if (begin)
    handler.begin = begin;
  if (preSolve)
    handler.preSolve = preSolve;
  if (postSolve)
    handler.postSolve = postSolve;
  if (separate)
    handler.separate = separate;
  this.defaultHandler = handler;
};
Space.prototype.lookupHandler = function (a, b) {
  return this.collisionHandlers[hashPair(a, b)] || this.defaultHandler;
};
Space.prototype.addShape = function (shape) {
  var body = shape.body;
  if (body.isStatic())
    return this.addStaticShape(shape);
  assert(!shape.space, "This shape is already added to a space and cannot be added to another.");
  assertSpaceUnlocked(this);
  body.activate();
  body.addShape(shape);
  shape.update(body.p, body.rot);
  this.activeShapes.insert(shape, shape.hashid);
  shape.space = this;
  return shape;
};
Space.prototype.addStaticShape = function (shape) {
  assert(!shape.space, "This shape is already added to a space and cannot be added to another.");
  assertSpaceUnlocked(this);
  var body = shape.body;
  body.addShape(shape);
  shape.update(body.p, body.rot);
  this.staticShapes.insert(shape, shape.hashid);
  shape.space = this;
  return shape;
};
Space.prototype.addBody = function (body) {
  assert(!body.isStatic(), "Static bodies cannot be added to a space as they are not meant to be simulated.");
  assert(!body.space, "This body is already added to a space and cannot be added to another.");
  assertSpaceUnlocked(this);
  this.bodies.push(body);
  body.space = this;
  return body;
};
Space.prototype.addConstraint = function (constraint) {
  assert(!constraint.space, "This shape is already added to a space and cannot be added to another.");
  assertSpaceUnlocked(this);
  var a = constraint.a, b = constraint.b;
  a.activate();
  b.activate();
  this.constraints.push(constraint);
  constraint.next_a = a.constraintList;
  a.constraintList = constraint;
  constraint.next_b = b.constraintList;
  b.constraintList = constraint;
  constraint.space = this;
  return constraint;
};
Space.prototype.filterArbiters = function (body, filter) {
  for (var hash in this.cachedArbiters) {
    var arb = this.cachedArbiters[hash];
    if (body === arb.body_a && (filter === arb.a || filter === null) || body === arb.body_b && (filter === arb.b || filter === null)) {
      if (filter && arb.state !== "cached")
        arb.callSeparate(this);
      arb.unthread();
      deleteObjFromList(this.arbiters, arb);
      delete this.cachedArbiters[hash];
    }
  }
};
Space.prototype.removeShape = function (shape) {
  var body = shape.body;
  if (body.isStatic()) {
    this.removeStaticShape(shape);
  } else {
    assert(this.containsShape(shape), "Cannot remove a shape that was not added to the space. (Removed twice maybe?)");
    assertSpaceUnlocked(this);
    body.activate();
    body.removeShape(shape);
    this.filterArbiters(body, shape);
    this.activeShapes.remove(shape, shape.hashid);
    shape.space = null;
  }
};
Space.prototype.removeStaticShape = function (shape) {
  assert(this.containsShape(shape), "Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)");
  assertSpaceUnlocked(this);
  var body = shape.body;
  if (body.isStatic())
    body.activateStatic(shape);
  body.removeShape(shape);
  this.filterArbiters(body, shape);
  this.staticShapes.remove(shape, shape.hashid);
  shape.space = null;
};
Space.prototype.removeBody = function (body) {
  assert(this.containsBody(body), "Cannot remove a body that was not added to the space. (Removed twice maybe?)");
  assertSpaceUnlocked(this);
  body.activate();
  deleteObjFromList(this.bodies, body);
  body.space = null;
};
Space.prototype.removeConstraint = function (constraint) {
  assert(this.containsConstraint(constraint), "Cannot remove a constraint that was not added to the space. (Removed twice maybe?)");
  assertSpaceUnlocked(this);
  constraint.a.activate();
  constraint.b.activate();
  deleteObjFromList(this.constraints, constraint);
  constraint.a.removeConstraint(constraint);
  constraint.b.removeConstraint(constraint);
  constraint.space = null;
};
Space.prototype.containsShape = function (shape) {
  return shape.space === this;
};
Space.prototype.containsBody = function (body) {
  return body.space == this;
};
Space.prototype.containsConstraint = function (constraint) {
  return constraint.space == this;
};
Space.prototype.uncacheArbiter = function (arb) {
  delete this.cachedArbiters[hashPair(arb.a.hashid, arb.b.hashid)];
  deleteObjFromList(this.arbiters, arb);
};
Space.prototype.eachBody = function (func) {
  this.lock();
  {
    var bodies = this.bodies;
    for (var i = 0; i < bodies.length; i++) {
      func(bodies[i]);
    }
    var components = this.sleepingComponents;
    for (var i = 0; i < components.length; i++) {
      var root = components[i];
      var body = root;
      while (body) {
        var next = body.nodeNext;
        func(body);
        body = next;
      }
    }
  }
  this.unlock(true);
};
Space.prototype.eachShape = function (func) {
  this.lock();
  {
    this.activeShapes.each(func);
    this.staticShapes.each(func);
  }
  this.unlock(true);
};
Space.prototype.eachConstraint = function (func) {
  this.lock();
  {
    var constraints = this.constraints;
    for (var i = 0; i < constraints.length; i++) {
      func(constraints[i]);
    }
  }
  this.unlock(true);
};
Space.prototype.reindexStatic = function () {
  assert(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
  this.staticShapes.each(function (shape) {
    var body = shape.body;
    shape.update(body.p, body.rot);
  });
  this.staticShapes.reindex();
};
Space.prototype.reindexShape = function (shape) {
  assert(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
  var body = shape.body;
  shape.update(body.p, body.rot);
  this.activeShapes.reindexObject(shape, shape.hashid);
  this.staticShapes.reindexObject(shape, shape.hashid);
};
Space.prototype.reindexShapesForBody = function (body) {
  for (var shape = body.shapeList; shape; shape = shape.next) {
    this.reindexShape(shape);
  }
};
Space.prototype.useSpatialHash = function (dim, count) {
  throw new Error("Spatial Hash not implemented.");
  var staticShapes = new SpaceHash(dim, count, null);
  var activeShapes = new SpaceHash(dim, count, staticShapes);
  this.staticShapes.each(function (shape) {
    staticShapes.insert(shape, shape.hashid);
  });
  this.activeShapes.each(function (shape) {
    activeShapes.insert(shape, shape.hashid);
  });
  this.staticShapes = staticShapes;
  this.activeShapes = activeShapes;
};
Space.prototype.activateBody = function (body) {
  assert(!body.isRogue(), "Internal error: Attempting to activate a rogue body.");
  if (this.locked) {
    if (this.rousedBodies.indexOf(body) === -1)
      this.rousedBodies.push(body);
  } else {
    this.bodies.push(body);
    for (var i = 0; i < body.shapeList.length; i++) {
      var shape = body.shapeList[i];
      this.staticShapes.remove(shape, shape.hashid);
      this.activeShapes.insert(shape, shape.hashid);
    }
    for (var arb = body.arbiterList; arb; arb = arb.next(body)) {
      var bodyA = arb.body_a;
      if (body === bodyA || bodyA.isStatic()) {
        var a = arb.a, b = arb.b;
        this.cachedArbiters[hashPair(a.hashid, b.hashid)] = arb;
        arb.stamp = this.stamp;
        arb.handler = this.lookupHandler(a.collision_type, b.collision_type);
        this.arbiters.push(arb);
      }
    }
    for (var constraint = body.constraintList; constraint; constraint = constraint.nodeNext) {
      var bodyA = constraint.a;
      if (body === bodyA || bodyA.isStatic())
        this.constraints.push(constraint);
    }
  }
};
Space.prototype.deactivateBody = function (body) {
  assert(!body.isRogue(), "Internal error: Attempting to deactivate a rogue body.");
  deleteObjFromList(this.bodies, body);
  for (var i = 0; i < body.shapeList.length; i++) {
    var shape = body.shapeList[i];
    this.activeShapes.remove(shape, shape.hashid);
    this.staticShapes.insert(shape, shape.hashid);
  }
  for (var arb = body.arbiterList; arb; arb = arb.next(body)) {
    var bodyA = arb.body_a;
    if (body === bodyA || bodyA.isStatic()) {
      this.uncacheArbiter(arb);
    }
  }
  for (var constraint = body.constraintList; constraint; constraint = constraint.nodeNext) {
    var bodyA = constraint.a;
    if (body === bodyA || bodyA.isStatic())
      deleteObjFromList(this.constraints, constraint);
  }
};
var componentRoot = function (body) {
  return body ? body.nodeRoot : null;
};
var componentActivate = function (root) {
  if (!root || !root.isSleeping(root))
    return;
  assert(!root.isRogue(), "Internal Error: componentActivate() called on a rogue body.");
  var space = root.space;
  var body = root;
  while (body) {
    var next = body.nodeNext;
    body.nodeIdleTime = 0;
    body.nodeRoot = null;
    body.nodeNext = null;
    space.activateBody(body);
    body = next;
  }
  deleteObjFromList(space.sleepingComponents, root);
};
Body.prototype.activate = function () {
  if (!this.isRogue()) {
    this.nodeIdleTime = 0;
    componentActivate(componentRoot(this));
  }
};
Body.prototype.activateStatic = function (filter) {
  assert(this.isStatic(), "Body.activateStatic() called on a non-static body.");
  for (var arb = this.arbiterList; arb; arb = arb.next(this)) {
    if (!filter || filter == arb.a || filter == arb.b) {
      (arb.body_a == this ? arb.body_b : arb.body_a).activate();
    }
  }
};
Body.prototype.pushArbiter = function (arb) {
  assertSoft((arb.body_a === this ? arb.thread_a_next : arb.thread_b_next) === null, "Internal Error: Dangling contact graph pointers detected. (A)");
  assertSoft((arb.body_a === this ? arb.thread_a_prev : arb.thread_b_prev) === null, "Internal Error: Dangling contact graph pointers detected. (B)");
  var next = this.arbiterList;
  assertSoft(next === null || (next.body_a === this ? next.thread_a_prev : next.thread_b_prev) === null, "Internal Error: Dangling contact graph pointers detected. (C)");
  if (arb.body_a === this) {
    arb.thread_a_next = next;
  } else {
    arb.thread_b_next = next;
  }
  if (next) {
    if (next.body_a === this) {
      next.thread_a_prev = arb;
    } else {
      next.thread_b_prev = arb;
    }
  }
  this.arbiterList = arb;
};
var componentAdd = function (root, body) {
  body.nodeRoot = root;
  if (body !== root) {
    body.nodeNext = root.nodeNext;
    root.nodeNext = body;
  }
};
var floodFillComponent = function (root, body) {
  if (!body.isRogue()) {
    var other_root = componentRoot(body);
    if (other_root == null) {
      componentAdd(root, body);
      for (var arb = body.arbiterList; arb; arb = arb.next(body)) {
        floodFillComponent(root, body == arb.body_a ? arb.body_b : arb.body_a);
      }
      for (var constraint = body.constraintList; constraint; constraint = constraint.next(body)) {
        floodFillComponent(root, body == constraint.a ? constraint.b : constraint.a);
      }
    } else {
      assertSoft(other_root === root, "Internal Error: Inconsistency detected in the contact graph.");
    }
  }
};
var componentActive = function (root, threshold) {
  for (var body = root; body; body = body.nodeNext) {
    if (body.nodeIdleTime < threshold)
      return true;
  }
  return false;
};
Space.prototype.processComponents = function (dt) {
  var sleep = this.sleepTimeThreshold !== Infinity;
  var bodies = this.bodies;
  for (var i = 0; i < bodies.length; i++) {
    var body = bodies[i];
    assertSoft(body.nodeNext === null, "Internal Error: Dangling next pointer detected in contact graph.");
    assertSoft(body.nodeRoot === null, "Internal Error: Dangling root pointer detected in contact graph.");
  }
  if (sleep) {
    var dv = this.idleSpeedThreshold;
    var dvsq = dv ? dv * dv : vlengthsq(this.gravity) * dt * dt;
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      var keThreshold = dvsq ? body.m * dvsq : 0;
      body.nodeIdleTime = body.kineticEnergy() > keThreshold ? 0 : body.nodeIdleTime + dt;
    }
  }
  var arbiters = this.arbiters;
  for (var i = 0, count = arbiters.length; i < count; i++) {
    var arb = arbiters[i];
    var a = arb.body_a, b = arb.body_b;
    if (sleep) {
      if (b.isRogue() && !b.isStatic() || a.isSleeping())
        a.activate();
      if (a.isRogue() && !a.isStatic() || b.isSleeping())
        b.activate();
    }
    a.pushArbiter(arb);
    b.pushArbiter(arb);
  }
  if (sleep) {
    var constraints = this.constraints;
    for (var i = 0; i < constraints.length; i++) {
      var constraint = constraints[i];
      var a = constraint.a, b = constraint.b;
      if (b.isRogue() && !b.isStatic())
        a.activate();
      if (a.isRogue() && !a.isStatic())
        b.activate();
    }
    for (var i = 0; i < bodies.length;) {
      var body = bodies[i];
      if (componentRoot(body) === null) {
        floodFillComponent(body, body);
        if (!componentActive(body, this.sleepTimeThreshold)) {
          this.sleepingComponents.push(body);
          for (var other = body; other; other = other.nodeNext) {
            this.deactivateBody(other);
          }
          continue;
        }
      }
      i++;
      body.nodeRoot = null;
      body.nodeNext = null;
    }
  }
};
Body.prototype.sleep = function () {
  this.sleepWithGroup(null);
};
Body.prototype.sleepWithGroup = function (group) {
  assert(!this.isStatic() && !this.isRogue(), "Rogue and static bodies cannot be put to sleep.");
  var space = this.space;
  assert(space, "Cannot put a rogue body to sleep.");
  assert(!space.locked, "Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback.");
  assert(group === null || group.isSleeping(), "Cannot use a non-sleeping body as a group identifier.");
  if (this.isSleeping()) {
    assert(componentRoot(this) === componentRoot(group), "The body is already sleeping and it's group cannot be reassigned.");
    return;
  }
  for (var i = 0; i < this.shapeList.length; i++) {
    this.shapeList[i].update(this.p, this.rot);
  }
  space.deactivateBody(this);
  if (group) {
    var root = componentRoot(group);
    this.nodeRoot = root;
    this.nodeNext = root.nodeNext;
    this.nodeIdleTime = 0;
    root.nodeNext = this;
  } else {
    this.nodeRoot = this;
    this.nodeNext = null;
    this.nodeIdleTime = 0;
    space.sleepingComponents.push(this);
  }
  deleteObjFromList(space.bodies, this);
};
Space.prototype.activateShapesTouchingShape = function (shape) {
  if (this.sleepTimeThreshold !== Infinity) {
    this.shapeQuery(shape, function (shape, points) {
      shape.body.activate();
    });
  }
};
Space.prototype.pointQuery = function (point, layers, group, func) {
  var helper = function (shape) {
    if (!(shape.group && group === shape.group) && layers & shape.layers && shape.pointQuery(point)) {
      func(shape);
    }
  };
  var bb = new BB(point.x, point.y, point.x, point.y);
  this.lock();
  {
    this.activeShapes.query(bb, helper);
    this.staticShapes.query(bb, helper);
  }
  this.unlock(true);
};
Space.prototype.pointQueryFirst = function (point, layers, group) {
  var outShape = null;
  this.pointQuery(point, layers, group, function (shape) {
    if (!shape.sensor)
      outShape = shape;
  });
  return outShape;
};
Space.prototype.nearestPointQuery = function (point, maxDistance, layers, group, func) {
  var helper = function (shape) {
    if (!(shape.group && group === shape.group) && layers & shape.layers) {
      var info = shape.nearestPointQuery(point);
      if (info.d < maxDistance)
        func(shape, info.d, info.p);
    }
  };
  var bb = bbNewForCircle(point, maxDistance);
  this.lock();
  {
    this.activeShapes.query(bb, helper);
    this.staticShapes.query(bb, helper);
  }
  this.unlock(true);
};
Space.prototype.nearestPointQueryNearest = function (point, maxDistance, layers, group) {
  var out;
  var helper = function (shape) {
    if (!(shape.group && group === shape.group) && layers & shape.layers && !shape.sensor) {
      var info = shape.nearestPointQuery(point);
      if (info.d < maxDistance && (!out || info.d < out.d))
        out = info;
    }
  };
  var bb = bbNewForCircle(point, maxDistance);
  this.activeShapes.query(bb, helper);
  this.staticShapes.query(bb, helper);
  return out;
};
Space.prototype.segmentQuery = function (start, end, layers, group, func) {
  var helper = function (shape) {
    var info;
    if (!(shape.group && group === shape.group) && layers & shape.layers && (info = shape.segmentQuery(start, end))) {
      func(shape, info.t, info.n);
    }
    return 1;
  };
  this.lock();
  {
    this.staticShapes.segmentQuery(start, end, 1, helper);
    this.activeShapes.segmentQuery(start, end, 1, helper);
  }
  this.unlock(true);
};
Space.prototype.segmentQueryFirst = function (start, end, layers, group) {
  var out = null;
  var helper = function (shape) {
    var info;
    if (!(shape.group && group === shape.group) && layers & shape.layers && !shape.sensor && (info = shape.segmentQuery(start, end)) && (out === null || info.t < out.t)) {
      out = info;
    }
    return out ? out.t : 1;
  };
  this.staticShapes.segmentQuery(start, end, 1, helper);
  this.activeShapes.segmentQuery(start, end, out ? out.t : 1, helper);
  return out;
};
Space.prototype.bbQuery = function (bb, layers, group, func) {
  var helper = function (shape) {
    if (!(shape.group && group === shape.group) && layers & shape.layers && bbIntersects2(bb, shape.bb_l, shape.bb_b, shape.bb_r, shape.bb_t)) {
      func(shape);
    }
  };
  this.lock();
  {
    this.activeShapes.query(bb, helper);
    this.staticShapes.query(bb, helper);
  }
  this.unlock(true);
};
Space.prototype.shapeQuery = function (shape, func) {
  var body = shape.body;
  if (body) {
    shape.update(body.p, body.rot);
  }
  var bb = new BB(shape.bb_l, shape.bb_b, shape.bb_r, shape.bb_t);
  var anyCollision = false;
  var helper = function (b) {
    var a = shape;
    if (a.group && a.group === b.group || !(a.layers & b.layers) || a === b)
      return;
    var contacts;
    if (a.collisionCode <= b.collisionCode) {
      contacts = collideShapes(a, b);
    } else {
      contacts = collideShapes(b, a);
      for (var i = 0; i < contacts.length; i++)
        contacts[i].n = vneg(contacts[i].n);
    }
    if (contacts.length) {
      anyCollision = !(a.sensor || b.sensor);
      if (func) {
        var set = new Array(contacts.length);
        for (var i = 0; i < contacts.length; i++) {
          set[i] = new ContactPoint(contacts[i].p, contacts[i].n, contacts[i].dist);
        }
        func(b, set);
      }
    }
  };
  this.lock();
  {
    this.activeShapes.query(bb, helper);
    this.staticShapes.query(bb, helper);
  }
  this.unlock(true);
  return anyCollision;
};
Space.prototype.addPostStepCallback = function (func) {
  assertSoft(this.locked, "Adding a post-step callback when the space is not locked is unnecessary. " + "Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query.");
  this.postStepCallbacks.push(func);
};
Space.prototype.runPostStepCallbacks = function () {
  for (var i = 0; i < this.postStepCallbacks.length; i++) {
    this.postStepCallbacks[i]();
  }
  this.postStepCallbacks = [];
};
Space.prototype.lock = function () {
  this.locked++;
};
Space.prototype.unlock = function (runPostStep) {
  this.locked--;
  assert(this.locked >= 0, "Internal Error: Space lock underflow.");
  if (this.locked === 0 && runPostStep) {
    var waking = this.rousedBodies;
    for (var i = 0; i < waking.length; i++) {
      this.activateBody(waking[i]);
    }
    waking.length = 0;
    this.runPostStepCallbacks();
  }
};
Space.prototype.makeCollideShapes = function () {
  var space_ = this;
  return function (a, b) {
    var space = space_;
    if (!(a.bb_l <= b.bb_r && b.bb_l <= a.bb_r && a.bb_b <= b.bb_t && b.bb_b <= a.bb_t) || a.body === b.body || a.group && a.group === b.group || !(a.layers & b.layers))
      return;
    var handler = space.lookupHandler(a.collision_type, b.collision_type);
    var sensor = a.sensor || b.sensor;
    if (sensor && handler === defaultCollisionHandler)
      return;
    if (a.collisionCode > b.collisionCode) {
      var temp = a;
      a = b;
      b = temp;
    }
    var contacts = collideShapes(a, b);
    if (contacts.length === 0)
      return;
    var arbHash = hashPair(a.hashid, b.hashid);
    var arb = space.cachedArbiters[arbHash];
    if (!arb) {
      arb = space.cachedArbiters[arbHash] = new Arbiter(a, b);
    }
    arb.update(contacts, handler, a, b);
    if (arb.state == "first coll" && !handler.begin(arb, space)) {
      arb.ignore();
    }
    if (arb.state !== "ignore" && handler.preSolve(arb, space) && !sensor) {
      space.arbiters.push(arb);
    } else {
      arb.contacts = null;
      if (arb.state !== "ignore")
        arb.state = "normal";
    }
    arb.stamp = space.stamp;
  };
};
Space.prototype.arbiterSetFilter = function (arb) {
  var ticks = this.stamp - arb.stamp;
  var a = arb.body_a, b = arb.body_b;
  if ((a.isStatic() || a.isSleeping()) && (b.isStatic() || b.isSleeping())) {
    return true;
  }
  if (ticks >= 1 && arb.state != "cached") {
    arb.callSeparate(this);
    arb.state = "cached";
  }
  if (ticks >= this.collisionPersistence) {
    arb.contacts = null;
    return false;
  }
  return true;
};
var updateFunc = function (shape) {
  var body = shape.body;
  shape.update(body.p, body.rot);
};
Space.prototype.step = function (dt) {
  if (dt === 0)
    return;
  assert(vzero.x === 0 && vzero.y === 0, "vzero is invalid");
  this.stamp++;
  var prev_dt = this.curr_dt;
  this.curr_dt = dt;
  var i;
  var j;
  var hash;
  var bodies = this.bodies;
  var constraints = this.constraints;
  var arbiters = this.arbiters;
  for (i = 0; i < arbiters.length; i++) {
    var arb = arbiters[i];
    arb.state = "normal";
    if (!arb.body_a.isSleeping() && !arb.body_b.isSleeping()) {
      arb.unthread();
    }
  }
  arbiters.length = 0;
  this.lock();
  {
    for (i = 0; i < bodies.length; i++) {
      bodies[i].position_func(dt);
    }
    this.activeShapes.each(updateFunc);
    this.activeShapes.reindexQuery(this.collideShapes);
  }
  this.unlock(false);
  this.processComponents(dt);
  this.lock();
  {
    for (hash in this.cachedArbiters) {
      if (!this.arbiterSetFilter(this.cachedArbiters[hash])) {
        delete this.cachedArbiters[hash];
      }
    }
    var slop = this.collisionSlop;
    var biasCoef = 1 - Math.pow(this.collisionBias, dt);
    for (i = 0; i < arbiters.length; i++) {
      arbiters[i].preStep(dt, slop, biasCoef);
    }
    for (i = 0; i < constraints.length; i++) {
      var constraint = constraints[i];
      constraint.preSolve(this);
      constraint.preStep(dt);
    }
    var damping = Math.pow(this.damping, dt);
    var gravity = this.gravity;
    for (i = 0; i < bodies.length; i++) {
      bodies[i].velocity_func(gravity, damping, dt);
    }
    var dt_coef = prev_dt === 0 ? 0 : dt / prev_dt;
    for (i = 0; i < arbiters.length; i++) {
      arbiters[i].applyCachedImpulse(dt_coef);
    }
    for (i = 0; i < constraints.length; i++) {
      constraints[i].applyCachedImpulse(dt_coef);
    }
    for (i = 0; i < this.iterations; i++) {
      for (j = 0; j < arbiters.length; j++) {
        arbiters[j].applyImpulse();
      }
      for (j = 0; j < constraints.length; j++) {
        constraints[j].applyImpulse();
      }
    }
    for (i = 0; i < constraints.length; i++) {
      constraints[i].postSolve(this);
    }
    for (i = 0; i < arbiters.length; i++) {
      arbiters[i].handler.postSolve(arbiters[i], this);
    }
  }
  this.unlock(true);
};
var relative_velocity = function (a, b, r1, r2) {
  var v1_sumx = a.vx + -r1.y * a.w;
  var v1_sumy = a.vy + r1.x * a.w;
  var v2_sumx = b.vx + -r2.y * b.w;
  var v2_sumy = b.vy + r2.x * b.w;
  return new Vect(v2_sumx - v1_sumx, v2_sumy - v1_sumy);
};
var normal_relative_velocity = function (a, b, r1, r2, n) {
  var v1_sumx = a.vx + -r1.y * a.w;
  var v1_sumy = a.vy + r1.x * a.w;
  var v2_sumx = b.vx + -r2.y * b.w;
  var v2_sumy = b.vy + r2.x * b.w;
  return vdot2(v2_sumx - v1_sumx, v2_sumy - v1_sumy, n.x, n.y);
};
var apply_impulse = function (body, jx, jy, r) {
  body.vx += jx * body.m_inv;
  body.vy += jy * body.m_inv;
  body.w += body.i_inv * (r.x * jy - r.y * jx);
};
var apply_impulses = function (a, b, r1, r2, jx, jy) {
  apply_impulse(a, -jx, -jy, r1);
  apply_impulse(b, jx, jy, r2);
};
var apply_bias_impulse = function (body, jx, jy, r) {
  body.v_biasx += jx * body.m_inv;
  body.v_biasy += jy * body.m_inv;
  body.w_bias += body.i_inv * vcross2(r.x, r.y, jx, jy);
};
var k_scalar_body = function (body, r, n) {
  var rcn = vcross(r, n);
  return body.m_inv + body.i_inv * rcn * rcn;
};
var k_scalar = function (a, b, r1, r2, n) {
  var value = k_scalar_body(a, r1, n) + k_scalar_body(b, r2, n);
  assertSoft(value !== 0, "Unsolvable collision or constraint.");
  return value;
};
var k_tensor = function (a, b, r1, r2, k1, k2) {
  var k11, k12, k21, k22;
  var m_sum = a.m_inv + b.m_inv;
  k11 = m_sum;
  k12 = 0;
  k21 = 0;
  k22 = m_sum;
  var a_i_inv = a.i_inv;
  var r1xsq = r1.x * r1.x * a_i_inv;
  var r1ysq = r1.y * r1.y * a_i_inv;
  var r1nxy = -r1.x * r1.y * a_i_inv;
  k11 += r1ysq;
  k12 += r1nxy;
  k21 += r1nxy;
  k22 += r1xsq;
  var b_i_inv = b.i_inv;
  var r2xsq = r2.x * r2.x * b_i_inv;
  var r2ysq = r2.y * r2.y * b_i_inv;
  var r2nxy = -r2.x * r2.y * b_i_inv;
  k11 += r2ysq;
  k12 += r2nxy;
  k21 += r2nxy;
  k22 += r2xsq;
  var determinant = k11 * k22 - k12 * k21;
  assertSoft(determinant !== 0, "Unsolvable constraint.");
  var det_inv = 1 / determinant;
  k1.x = k22 * det_inv;
  k1.y = -k12 * det_inv;
  k2.x = -k21 * det_inv;
  k2.y = k11 * det_inv;
};
var mult_k = function (vr, k1, k2) {
  return new Vect(vdot(vr, k1), vdot(vr, k2));
};
var bias_coef = function (errorBias, dt) {
  return 1 - Math.pow(errorBias, dt);
};
var Constraint = cp.Constraint = function (a, b) {
    this.a = a;
    this.b = b;
    this.space = null;
    this.next_a = null;
    this.next_b = null;
    this.maxForce = Infinity;
    this.errorBias = Math.pow(1 - 0.1, 60);
    this.maxBias = Infinity;
  };
Constraint.prototype.activateBodies = function () {
  if (this.a)
    this.a.activate();
  if (this.b)
    this.b.activate();
};
Constraint.prototype.preStep = function (dt) {
};
Constraint.prototype.applyCachedImpulse = function (dt_coef) {
};
Constraint.prototype.applyImpulse = function () {
};
Constraint.prototype.getImpulse = function () {
  return 0;
};
Constraint.prototype.preSolve = function (space) {
};
Constraint.prototype.postSolve = function (space) {
};
Constraint.prototype.next = function (body) {
  return this.a === body ? this.next_a : this.next_b;
};
var PinJoint = cp.PinJoint = function (a, b, anchr1, anchr2) {
    Constraint.call(this, a, b);
    this.anchr1 = anchr1;
    this.anchr2 = anchr2;
    var p1 = a ? vadd(a.p, vrotate(anchr1, a.rot)) : anchr1;
    var p2 = b ? vadd(b.p, vrotate(anchr2, b.rot)) : anchr2;
    this.dist = vlength(vsub(p2, p1));
    assertSoft(this.dist > 0, "You created a 0 length pin joint. A pivot joint will be much more stable.");
    this.r1 = this.r2 = null;
    this.n = null;
    this.nMass = 0;
    this.jnAcc = this.jnMax = 0;
    this.bias = 0;
  };
PinJoint.prototype = Object.create(Constraint.prototype);
PinJoint.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  this.r1 = vrotate(this.anchr1, a.rot);
  this.r2 = vrotate(this.anchr2, b.rot);
  var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
  var dist = vlength(delta);
  this.n = vmult(delta, 1 / (dist ? dist : Infinity));
  this.nMass = 1 / k_scalar(a, b, this.r1, this.r2, this.n);
  var maxBias = this.maxBias;
  this.bias = clamp(-bias_coef(this.errorBias, dt) * (dist - this.dist) / dt, -maxBias, maxBias);
  this.jnMax = this.maxForce * dt;
};
PinJoint.prototype.applyCachedImpulse = function (dt_coef) {
  var j = vmult(this.n, this.jnAcc * dt_coef);
  apply_impulses(this.a, this.b, this.r1, this.r2, j.x, j.y);
};
PinJoint.prototype.applyImpulse = function () {
  var a = this.a;
  var b = this.b;
  var n = this.n;
  var vrn = normal_relative_velocity(a, b, this.r1, this.r2, n);
  var jn = (this.bias - vrn) * this.nMass;
  var jnOld = this.jnAcc;
  this.jnAcc = clamp(jnOld + jn, -this.jnMax, this.jnMax);
  jn = this.jnAcc - jnOld;
  apply_impulses(a, b, this.r1, this.r2, n.x * jn, n.y * jn);
};
PinJoint.prototype.getImpulse = function () {
  return Math.abs(this.jnAcc);
};
var SlideJoint = cp.SlideJoint = function (a, b, anchr1, anchr2, min, max) {
    Constraint.call(this, a, b);
    this.anchr1 = anchr1;
    this.anchr2 = anchr2;
    this.min = min;
    this.max = max;
    this.r1 = this.r2 = this.n = null;
    this.nMass = 0;
    this.jnAcc = this.jnMax = 0;
    this.bias = 0;
  };
SlideJoint.prototype = Object.create(Constraint.prototype);
SlideJoint.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  this.r1 = vrotate(this.anchr1, a.rot);
  this.r2 = vrotate(this.anchr2, b.rot);
  var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
  var dist = vlength(delta);
  var pdist = 0;
  if (dist > this.max) {
    pdist = dist - this.max;
    this.n = vnormalize_safe(delta);
  } else if (dist < this.min) {
    pdist = this.min - dist;
    this.n = vneg(vnormalize_safe(delta));
  } else {
    this.n = vzero;
    this.jnAcc = 0;
  }
  this.nMass = 1 / k_scalar(a, b, this.r1, this.r2, this.n);
  var maxBias = this.maxBias;
  this.bias = clamp(-bias_coef(this.errorBias, dt) * pdist / dt, -maxBias, maxBias);
  this.jnMax = this.maxForce * dt;
};
SlideJoint.prototype.applyCachedImpulse = function (dt_coef) {
  var jn = this.jnAcc * dt_coef;
  apply_impulses(this.a, this.b, this.r1, this.r2, this.n.x * jn, this.n.y * jn);
};
SlideJoint.prototype.applyImpulse = function () {
  if (this.n.x === 0 && this.n.y === 0)
    return;
  var a = this.a;
  var b = this.b;
  var n = this.n;
  var r1 = this.r1;
  var r2 = this.r2;
  var vr = relative_velocity(a, b, r1, r2);
  var vrn = vdot(vr, n);
  var jn = (this.bias - vrn) * this.nMass;
  var jnOld = this.jnAcc;
  this.jnAcc = clamp(jnOld + jn, -this.jnMax, 0);
  jn = this.jnAcc - jnOld;
  apply_impulses(a, b, this.r1, this.r2, n.x * jn, n.y * jn);
};
SlideJoint.prototype.getImpulse = function () {
  return Math.abs(this.jnAcc);
};
var PivotJoint = cp.PivotJoint = function (a, b, anchr1, anchr2) {
    Constraint.call(this, a, b);
    if (typeof anchr2 === "undefined") {
      var pivot = anchr1;
      anchr1 = a ? a.world2Local(pivot) : pivot;
      anchr2 = b ? b.world2Local(pivot) : pivot;
    }
    this.anchr1 = anchr1;
    this.anchr2 = anchr2;
    this.r1 = this.r2 = vzero;
    this.k1 = new Vect(0, 0);
    this.k2 = new Vect(0, 0);
    this.jAcc = vzero;
    this.jMaxLen = 0;
    this.bias = vzero;
  };
PivotJoint.prototype = Object.create(Constraint.prototype);
PivotJoint.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  this.r1 = vrotate(this.anchr1, a.rot);
  this.r2 = vrotate(this.anchr2, b.rot);
  k_tensor(a, b, this.r1, this.r2, this.k1, this.k2);
  this.jMaxLen = this.maxForce * dt;
  var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
  this.bias = vclamp(vmult(delta, -bias_coef(this.errorBias, dt) / dt), this.maxBias);
};
PivotJoint.prototype.applyCachedImpulse = function (dt_coef) {
  apply_impulses(this.a, this.b, this.r1, this.r2, this.jAcc.x * dt_coef, this.jAcc.y * dt_coef);
};
PivotJoint.prototype.applyImpulse = function () {
  var a = this.a;
  var b = this.b;
  var r1 = this.r1;
  var r2 = this.r2;
  var vr = relative_velocity(a, b, r1, r2);
  var j = mult_k(vsub(this.bias, vr), this.k1, this.k2);
  var jOld = this.jAcc;
  this.jAcc = vclamp(vadd(this.jAcc, j), this.jMaxLen);
  apply_impulses(a, b, this.r1, this.r2, this.jAcc.x - jOld.x, this.jAcc.y - jOld.y);
};
PivotJoint.prototype.getImpulse = function () {
  return vlength(this.jAcc);
};
var GrooveJoint = cp.GrooveJoint = function (a, b, groove_a, groove_b, anchr2) {
    Constraint.call(this, a, b);
    this.grv_a = groove_a;
    this.grv_b = groove_b;
    this.grv_n = vperp(vnormalize(vsub(groove_b, groove_a)));
    this.anchr2 = anchr2;
    this.grv_tn = null;
    this.clamp = 0;
    this.r1 = this.r2 = null;
    this.k1 = new Vect(0, 0);
    this.k2 = new Vect(0, 0);
    this.jAcc = vzero;
    this.jMaxLen = 0;
    this.bias = null;
  };
GrooveJoint.prototype = Object.create(Constraint.prototype);
GrooveJoint.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  var ta = a.local2World(this.grv_a);
  var tb = a.local2World(this.grv_b);
  var n = vrotate(this.grv_n, a.rot);
  var d = vdot(ta, n);
  this.grv_tn = n;
  this.r2 = vrotate(this.anchr2, b.rot);
  var td = vcross(vadd(b.p, this.r2), n);
  if (td <= vcross(ta, n)) {
    this.clamp = 1;
    this.r1 = vsub(ta, a.p);
  } else if (td >= vcross(tb, n)) {
    this.clamp = -1;
    this.r1 = vsub(tb, a.p);
  } else {
    this.clamp = 0;
    this.r1 = vsub(vadd(vmult(vperp(n), -td), vmult(n, d)), a.p);
  }
  k_tensor(a, b, this.r1, this.r2, this.k1, this.k2);
  this.jMaxLen = this.maxForce * dt;
  var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
  this.bias = vclamp(vmult(delta, -bias_coef(this.errorBias, dt) / dt), this.maxBias);
};
GrooveJoint.prototype.applyCachedImpulse = function (dt_coef) {
  apply_impulses(this.a, this.b, this.r1, this.r2, this.jAcc.x * dt_coef, this.jAcc.y * dt_coef);
};
GrooveJoint.prototype.grooveConstrain = function (j) {
  var n = this.grv_tn;
  var jClamp = this.clamp * vcross(j, n) > 0 ? j : vproject(j, n);
  return vclamp(jClamp, this.jMaxLen);
};
GrooveJoint.prototype.applyImpulse = function () {
  var a = this.a;
  var b = this.b;
  var r1 = this.r1;
  var r2 = this.r2;
  var vr = relative_velocity(a, b, r1, r2);
  var j = mult_k(vsub(this.bias, vr), this.k1, this.k2);
  var jOld = this.jAcc;
  this.jAcc = this.grooveConstrain(vadd(jOld, j));
  apply_impulses(a, b, this.r1, this.r2, this.jAcc.x - jOld.x, this.jAcc.y - jOld.y);
};
GrooveJoint.prototype.getImpulse = function () {
  return vlength(this.jAcc);
};
GrooveJoint.prototype.setGrooveA = function (value) {
  this.grv_a = value;
  this.grv_n = vperp(vnormalize(vsub(this.grv_b, value)));
  this.activateBodies();
};
GrooveJoint.prototype.setGrooveB = function (value) {
  this.grv_b = value;
  this.grv_n = vperp(vnormalize(vsub(value, this.grv_a)));
  this.activateBodies();
};
var defaultSpringForce = function (spring, dist) {
  return (spring.restLength - dist) * spring.stiffness;
};
var DampedSpring = cp.DampedSpring = function (a, b, anchr1, anchr2, restLength, stiffness, damping) {
    Constraint.call(this, a, b);
    this.anchr1 = anchr1;
    this.anchr2 = anchr2;
    this.restLength = restLength;
    this.stiffness = stiffness;
    this.damping = damping;
    this.springForceFunc = defaultSpringForce;
    this.target_vrn = this.v_coef = 0;
    this.r1 = this.r2 = null;
    this.nMass = 0;
    this.n = null;
  };
DampedSpring.prototype = Object.create(Constraint.prototype);
DampedSpring.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  this.r1 = vrotate(this.anchr1, a.rot);
  this.r2 = vrotate(this.anchr2, b.rot);
  var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
  var dist = vlength(delta);
  this.n = vmult(delta, 1 / (dist ? dist : Infinity));
  var k = k_scalar(a, b, this.r1, this.r2, this.n);
  assertSoft(k !== 0, "Unsolvable this.");
  this.nMass = 1 / k;
  this.target_vrn = 0;
  this.v_coef = 1 - Math.exp(-this.damping * dt * k);
  var f_spring = this.springForceFunc(this, dist);
  apply_impulses(a, b, this.r1, this.r2, this.n.x * f_spring * dt, this.n.y * f_spring * dt);
};
DampedSpring.prototype.applyCachedImpulse = function (dt_coef) {
};
DampedSpring.prototype.applyImpulse = function () {
  var a = this.a;
  var b = this.b;
  var n = this.n;
  var r1 = this.r1;
  var r2 = this.r2;
  var vrn = normal_relative_velocity(a, b, r1, r2, n);
  var v_damp = (this.target_vrn - vrn) * this.v_coef;
  this.target_vrn = vrn + v_damp;
  v_damp *= this.nMass;
  apply_impulses(a, b, this.r1, this.r2, this.n.x * v_damp, this.n.y * v_damp);
};
DampedSpring.prototype.getImpulse = function () {
  return 0;
};
var defaultSpringTorque = function (spring, relativeAngle) {
  return (relativeAngle - spring.restAngle) * spring.stiffness;
};
var DampedRotarySpring = cp.DampedRotarySpring = function (a, b, restAngle, stiffness, damping) {
    Constraint.call(this, a, b);
    this.restAngle = restAngle;
    this.stiffness = stiffness;
    this.damping = damping;
    this.springTorqueFunc = defaultSpringTorque;
    this.target_wrn = 0;
    this.w_coef = 0;
    this.iSum = 0;
  };
DampedRotarySpring.prototype = Object.create(Constraint.prototype);
DampedRotarySpring.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  var moment = a.i_inv + b.i_inv;
  assertSoft(moment !== 0, "Unsolvable spring.");
  this.iSum = 1 / moment;
  this.w_coef = 1 - Math.exp(-this.damping * dt * moment);
  this.target_wrn = 0;
  var j_spring = this.springTorqueFunc(this, a.a - b.a) * dt;
  a.w -= j_spring * a.i_inv;
  b.w += j_spring * b.i_inv;
};
DampedRotarySpring.prototype.applyImpulse = function () {
  var a = this.a;
  var b = this.b;
  var wrn = a.w - b.w;
  var w_damp = (this.target_wrn - wrn) * this.w_coef;
  this.target_wrn = wrn + w_damp;
  var j_damp = w_damp * this.iSum;
  a.w += j_damp * a.i_inv;
  b.w -= j_damp * b.i_inv;
};
var RotaryLimitJoint = cp.RotaryLimitJoint = function (a, b, min, max) {
    Constraint.call(this, a, b);
    this.min = min;
    this.max = max;
    this.jAcc = 0;
    this.iSum = this.bias = this.jMax = 0;
  };
RotaryLimitJoint.prototype = Object.create(Constraint.prototype);
RotaryLimitJoint.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  var dist = b.a - a.a;
  var pdist = 0;
  if (dist > this.max) {
    pdist = this.max - dist;
  } else if (dist < this.min) {
    pdist = this.min - dist;
  }
  this.iSum = 1 / (1 / a.i + 1 / b.i);
  var maxBias = this.maxBias;
  this.bias = clamp(-bias_coef(this.errorBias, dt) * pdist / dt, -maxBias, maxBias);
  this.jMax = this.maxForce * dt;
  if (!this.bias)
    this.jAcc = 0;
};
RotaryLimitJoint.prototype.applyCachedImpulse = function (dt_coef) {
  var a = this.a;
  var b = this.b;
  var j = this.jAcc * dt_coef;
  a.w -= j * a.i_inv;
  b.w += j * b.i_inv;
};
RotaryLimitJoint.prototype.applyImpulse = function () {
  if (!this.bias)
    return;
  var a = this.a;
  var b = this.b;
  var wr = b.w - a.w;
  var j = -(this.bias + wr) * this.iSum;
  var jOld = this.jAcc;
  if (this.bias < 0) {
    this.jAcc = clamp(jOld + j, 0, this.jMax);
  } else {
    this.jAcc = clamp(jOld + j, -this.jMax, 0);
  }
  j = this.jAcc - jOld;
  a.w -= j * a.i_inv;
  b.w += j * b.i_inv;
};
RotaryLimitJoint.prototype.getImpulse = function () {
  return Math.abs(joint.jAcc);
};
var RatchetJoint = cp.RatchetJoint = function (a, b, phase, ratchet) {
    Constraint.call(this, a, b);
    this.angle = 0;
    this.phase = phase;
    this.ratchet = ratchet;
    this.angle = (b ? b.a : 0) - (a ? a.a : 0);
    this.iSum = this.bias = this.jAcc = this.jMax = 0;
  };
RatchetJoint.prototype = Object.create(Constraint.prototype);
RatchetJoint.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  var angle = this.angle;
  var phase = this.phase;
  var ratchet = this.ratchet;
  var delta = b.a - a.a;
  var diff = angle - delta;
  var pdist = 0;
  if (diff * ratchet > 0) {
    pdist = diff;
  } else {
    this.angle = Math.floor((delta - phase) / ratchet) * ratchet + phase;
  }
  this.iSum = 1 / (a.i_inv + b.i_inv);
  var maxBias = this.maxBias;
  this.bias = clamp(-bias_coef(this.errorBias, dt) * pdist / dt, -maxBias, maxBias);
  this.jMax = this.maxForce * dt;
  if (!this.bias)
    this.jAcc = 0;
};
RatchetJoint.prototype.applyCachedImpulse = function (dt_coef) {
  var a = this.a;
  var b = this.b;
  var j = this.jAcc * dt_coef;
  a.w -= j * a.i_inv;
  b.w += j * b.i_inv;
};
RatchetJoint.prototype.applyImpulse = function () {
  if (!this.bias)
    return;
  var a = this.a;
  var b = this.b;
  var wr = b.w - a.w;
  var ratchet = this.ratchet;
  var j = -(this.bias + wr) * this.iSum;
  var jOld = this.jAcc;
  this.jAcc = clamp((jOld + j) * ratchet, 0, this.jMax * Math.abs(ratchet)) / ratchet;
  j = this.jAcc - jOld;
  a.w -= j * a.i_inv;
  b.w += j * b.i_inv;
};
RatchetJoint.prototype.getImpulse = function (joint) {
  return Math.abs(joint.jAcc);
};
var GearJoint = cp.GearJoint = function (a, b, phase, ratio) {
    Constraint.call(this, a, b);
    this.phase = phase;
    this.ratio = ratio;
    this.ratio_inv = 1 / ratio;
    this.jAcc = 0;
    this.iSum = this.bias = this.jMax = 0;
  };
GearJoint.prototype = Object.create(Constraint.prototype);
GearJoint.prototype.preStep = function (dt) {
  var a = this.a;
  var b = this.b;
  this.iSum = 1 / (a.i_inv * this.ratio_inv + this.ratio * b.i_inv);
  var maxBias = this.maxBias;
  this.bias = clamp(-bias_coef(this.errorBias, dt) * (b.a * this.ratio - a.a - this.phase) / dt, -maxBias, maxBias);
  this.jMax = this.maxForce * dt;
};
GearJoint.prototype.applyCachedImpulse = function (dt_coef) {
  var a = this.a;
  var b = this.b;
  var j = this.jAcc * dt_coef;
  a.w -= j * a.i_inv * this.ratio_inv;
  b.w += j * b.i_inv;
};
GearJoint.prototype.applyImpulse = function () {
  var a = this.a;
  var b = this.b;
  var wr = b.w * this.ratio - a.w;
  var j = (this.bias - wr) * this.iSum;
  var jOld = this.jAcc;
  this.jAcc = clamp(jOld + j, -this.jMax, this.jMax);
  j = this.jAcc - jOld;
  a.w -= j * a.i_inv * this.ratio_inv;
  b.w += j * b.i_inv;
};
GearJoint.prototype.getImpulse = function () {
  return Math.abs(this.jAcc);
};
GearJoint.prototype.setRatio = function (value) {
  this.ratio = value;
  this.ratio_inv = 1 / value;
  this.activateBodies();
};
var SimpleMotor = cp.SimpleMotor = function (a, b, rate) {
    Constraint.call(this, a, b);
    this.rate = rate;
    this.jAcc = 0;
    this.iSum = this.jMax = 0;
  };
SimpleMotor.prototype = Object.create(Constraint.prototype);
SimpleMotor.prototype.preStep = function (dt) {
  this.iSum = 1 / (this.a.i_inv + this.b.i_inv);
  this.jMax = this.maxForce * dt;
};
SimpleMotor.prototype.applyCachedImpulse = function (dt_coef) {
  var a = this.a;
  var b = this.b;
  var j = this.jAcc * dt_coef;
  a.w -= j * a.i_inv;
  b.w += j * b.i_inv;
};
SimpleMotor.prototype.applyImpulse = function () {
  var a = this.a;
  var b = this.b;
  var wr = b.w - a.w + this.rate;
  var j = -wr * this.iSum;
  var jOld = this.jAcc;
  this.jAcc = clamp(jOld + j, -this.jMax, this.jMax);
  j = this.jAcc - jOld;
  a.w -= j * a.i_inv;
  b.w += j * b.i_inv;
};
SimpleMotor.prototype.getImpulse = function () {
  return Math.abs(this.jAcc);
};

return module.exports;

});
define('physics/PhysicsSystem',['require','exports','module','../geom/Rectangle','../geom/Circle','../geom/Polygon','../math/Vector','../tilemap/Tile','../utils/inherit','../vendor/cp'],function (require, exports, module) {
  

var Rectangle = require("../geom/Rectangle"), Circle = require("../geom/Circle"), Polygon = require("../geom/Polygon"), Vector = require("../math/Vector"), Tile = require("../tilemap/Tile"), inherit = require("../utils/inherit"), cp = require("../vendor/cp");
var PhysicsSystem = function (state, options) {
  options = options || {};
  options.gravity = options.gravity instanceof Vector ? options.gravity : new Vector(0, 9.87);
  options.sleepTimeThreshold = options.sleepTimeThreshold !== undefined ? options.sleepTimeThreshold : 0.2;
  options.collisionSlop = options.collisionSlop !== undefined ? options.collisionSlop : 0.1;
  this.state = state;
  this.space = new cp.Space();
  this.gravity = this.space.gravity = options.gravity;
  this.space.sleepTimeThreshold = options.sleepTimeThreshold;
  this.space.collisionSlop = options.collisionSlop;
  this.space.addCollisionHandler(PhysicsSystem.COLLISION_TYPE.SPRITE, PhysicsSystem.COLLISION_TYPE.SPRITE, this.onCollisionBegin.bind(this), null, this.onCollisionPostSolve.bind(this), this.onCollisionEnd.bind(this));
  this.space.addCollisionHandler(PhysicsSystem.COLLISION_TYPE.SPRITE, PhysicsSystem.COLLISION_TYPE.TILE, this.onCollisionBegin.bind(this), null, this.onCollisionPostSolve.bind(this), this.onCollisionEnd.bind(this));
  this.actionQueue = [];
  this.tickCallbacks = [];
  this._skip = 0;
};
inherit(PhysicsSystem, Object, {
  pause: function () {
    this._paused = true;
    return this;
  },
  resume: function () {
    this._paused = false;
    return this;
  },
  skip: function (num) {
    this._skip += num;
    return this;
  },
  skipNext: function () {
    return this.skip(1);
  },
  nextTick: function (fn) {
    this.tickCallbacks.push(fn);
    return this;
  },
  getCollisionType: function (spr) {
    if (spr instanceof Tile) {
      return PhysicsSystem.COLLISION_TYPE.TILE;
    } else {
      return PhysicsSystem.COLLISION_TYPE.SPRITE;
    }
  },
  add: function (spr, cb) {
    if (spr._phys.active)
      return;
    var body = this._createBody(spr), shape = this._createShape(spr, body), control;
    if (!body.isStatic()) {
      var cbody = new cp.Body(Infinity, Infinity), cpivot = new cp.PivotJoint(cbody, body, cp.vzero, cp.vzero), cgear = new cp.GearJoint(cbody, body, 0, 1);
      cpivot.maxBias = 0;
      cpivot.maxForce = 10000;
      cgear.errorBias = 0;
      cgear.maxBias = 1.2;
      cgear.maxForce = 50000;
      control = {};
      control.body = cbody;
      control.pivot = cpivot;
      control.gear = cgear;
    }
    spr._phys.active = true;
    this.actionQueue.push([
      "add",
      {
        spr: spr,
        body: body,
        shape: shape,
        control: control
      },
      cb
    ]);
    this.act();
    return spr;
  },
  remove: function (spr, cb) {
    if (!spr || !spr._phys.active)
      return;
    spr._phys.active = false;
    this.actionQueue.push([
      "remove",
      spr._phys,
      cb
    ]);
    this.act();
    return spr;
  },
  reindex: function (spr, cb) {
    if (!spr || !spr._phys.active)
      return;
    spr._phys._cb = cb;
    this.actionQueue.push([
      "reindex",
      spr._phys.shape,
      cb
    ]);
    this.act();
    return this;
  },
  reindexStatic: function (cb) {
    this.actionQueue.push([
      "reindexStatic",
      null,
      cb
    ]);
    this.act();
    return this;
  },
  addCustomShape: function (spr, poly, sensor, cb) {
    if (!spr || !spr._phys.body)
      return;
    var s = this._createShape(spr, spr._phys.body, poly);
    s.setSensor(sensor);
    s.width = spr.width;
    s.height = spr.height;
    s.sprite = spr;
    s.setElasticity(0);
    s.setSensor(sensor !== undefined ? sensor : spr.sensor);
    s.setCollisionType(this.getCollisionType(spr));
    s.setFriction(spr.friction || 0);
    this.actionQueue.push([
      "addCustomShape",
      {
        spr: spr,
        shape: s
      },
      cb
    ]);
    this.act();
    return s;
  },
  setMass: function (spr, mass) {
    if (!spr || !spr._phys.body)
      return;
    spr._phys.body.setMass(mass);
    return this;
  },
  setVelocity: function (spr, vel) {
    if (!spr)
      return;
    if (spr._phys.control) {
      spr._phys.control.body.setVel(vel);
    } else {
      spr._phys.body.setVel(vel);
    }
    return this;
  },
  setPosition: function (spr, pos) {
    if (!spr)
      return;
    if (spr._phys.body) {
      spr._phys.body.setPos(pos);
    }
    if (spr._phys.control) {
      spr._phys.control.body.setPos(pos);
    }
    return this;
  },
  setRotation: function (spr, rads) {
    if (!spr)
      return;
    if (spr._phys.control) {
      spr._phys.control.body.setAngle(rads);
    } else if (spr._phys.body) {
      spr._phys.body.setAngle(rads);
    }
    return this;
  },
  update: function (dt) {
    if (this._paused)
      return;
    while (this.tickCallbacks.length)
      this.tickCallbacks.shift().call(this);
    if (this._skip)
      return this._skip--;
    this.space.step(dt);
    this.space.activeShapes.each(function (shape) {
      var spr = shape.sprite;
      spr.position.x = shape.body.p.x;
      spr.position.y = shape.body.p.y;
      spr.rotation = shape.body.a;
      spr.emit("physUpdate");
    });
  },
  onCollisionBegin: function (arbiter) {
    var shapes = arbiter.getShapes(), spr1 = shapes[0].sprite, spr2 = shapes[1].sprite;
    if (shapes[0].sensor || shapes[1].sensor) {
      spr1.onCollision(spr2, arbiter.getNormal(0), shapes[1], shapes[0]);
      spr2.onCollision(spr1, arbiter.getNormal(0), shapes[0], shapes[1]);
    }
    return true;
  },
  onCollisionPostSolve: function (arbiter) {
    var shapes = arbiter.getShapes(), spr1 = shapes[0].sprite, spr2 = shapes[1].sprite;
    if (arbiter.isFirstContact()) {
      spr1.onCollision(spr2, arbiter.totalImpulse(), shapes[1], shapes[0]);
      spr2.onCollision(spr1, arbiter.totalImpulse(), shapes[0], shapes[1]);
    }
    return true;
  },
  onCollisionEnd: function (arbiter) {
    var shapes = arbiter.getShapes(), spr1 = shapes[0].sprite, spr2 = shapes[1].sprite;
    spr1.onSeparate(spr2, shapes[1], shapes[0]);
    spr2.onSeparate(spr1, shapes[0], shapes[1]);
    return true;
  },
  act: function () {
    if (this.space.locked) {
      this.space.addPostStepCallback(this.onPostStep.bind(this));
    } else {
      var self = this;
      setTimeout(function () {
        self.onPostStep();
      }, 1);
    }
  },
  onPostStep: function () {
    while (this.actionQueue.length) {
      var a = this.actionQueue.shift(), act = a[0], data = a[1], cb = a[2];
      switch (act) {
      case "add":
        data.body.setPos(data.spr.position);
        if (!data.body.isStatic()) {
          this.space.addBody(data.body);
        }
        this.space.addShape(data.shape);
        if (data.control) {
          data.control.body.setPos(data.spr.position);
          this.space.addConstraint(data.control.pivot);
          this.space.addConstraint(data.control.gear);
        }
        data.spr._phys.body = data.body;
        data.spr._phys.shape = data.shape;
        data.spr._phys.control = data.control;
        break;
      case "remove":
        if (data.body.space) {
          this.space.removeBody(data.body);
        }
        if (data.shape.space) {
          this.space.removeShape(data.shape);
        }
        if (data.customShapes) {
          for (var i = data.customShapes.length - 1; i > -1; --i) {
            this.space.removeShape(data.customShapes[i]);
          }
        }
        data.body = null;
        data.shape.sprite = null;
        data.shape = null;
        data.customShapes = null;
        break;
      case "reindex":
        this.space.reindexShape(data);
        break;
      case "reindexStatic":
        this.space.reindexStatic();
        break;
      case "addCustomShape":
        if (!data.spr._phys.customShapes) {
          data.spr._phys.customShapes = [];
        }
        data.spr._phys.customShapes.push(data.shape);
        this.space.addShape(data.shape);
        break;
      }
      if (cb)
        cb.call(this);
    }
  },
  _createBody: function (spr) {
    var body = new cp.Body(spr.mass || 1, spr.inertia || cp.momentForBox(spr.mass || 1, spr.width, spr.height) || Infinity);
    if (spr.mass === Infinity) {
      body.nodeIdleTime = Infinity;
    }
    return body;
  },
  _createShape: function (spr, body, poly) {
    var shape, hit = poly || spr.hitArea, ax = spr.anchor ? spr.anchor.x : 0, ay = spr.anchor ? spr.anchor.y : 0, aw = spr.width * ax, ah = spr.height * ay;
    if (hit) {
      if (hit instanceof Rectangle) {
        var l = hit.x, r = hit.x + hit.width, b = hit.y - spr.height, t = b + hit.height;
        l -= aw;
        r -= aw;
        b += spr.height - ah;
        t += spr.height - ah;
        shape = new cp.BoxShape2(body, new cp.BB(l, b, r, t));
      } else if (hit instanceof Circle) {
        var offset = new Vector(spr.width / 2 - aw + hit.x, spr.height / 2 - ah + hit.y);
        shape = new cp.CircleShape(body, hit.radius, offset);
      } else if (hit instanceof Polygon) {
        var points = [], ps = hit.points;
        for (var i = 0; i < ps.length; ++i) {
          var p = ps[i];
          points.push(p.x - aw);
          points.push(p.y - ah);
        }
        shape = new cp.PolyShape(body, cp.convexHull(points, null, 0), cp.vzero);
      }
    }
    if (!shape) {
      shape = new cp.BoxShape2(body, new cp.BB(0, -spr.height, spr.width, 0));
    }
    shape.width = spr.width;
    shape.height = spr.height;
    shape.sprite = spr;
    shape.setElasticity(0);
    shape.setSensor(spr.sensor);
    shape.setCollisionType(this.getCollisionType(spr));
    shape.setFriction(spr.friction || 0);
    return shape;
  }
});
PhysicsSystem.COLLISION_TYPE = {
  SPRITE: 0,
  TILE: 1
};
module.exports = PhysicsSystem;

return module.exports;

});
define('game/State',['require','exports','module','../audio/AudioManager','../display/Container','./World','../camera/Camera','../physics/PhysicsSystem','../math/math','../utils/inherit'],function (require, exports, module) {
  

var AudioManager = require("../audio/AudioManager"), Container = require("../display/Container"), World = require("./World"), Camera = require("../camera/Camera"), PhysicsSystem = require("../physics/PhysicsSystem"), math = require("../math/math"), inherit = require("../utils/inherit");
var State = function (game, name, physOptions) {
  if (!name)
    name = math.randomString();
  this.name = name;
  this.game = game;
  this.audio = new AudioManager(game, game.audio);
  this.world = new World(this);
  this.physics = new PhysicsSystem(this, physOptions);
  this.camera = new Camera(this);
  Container.call(this);
  this.visible = false;
  this.addChild(this.world);
  this.addChild(this.camera);
  this.camera.resize(game.width, game.height);
};
inherit(State, Container, {
  enable: function () {
    this.game.state.enable(this);
    return this;
  },
  resize: function (w, h) {
    this.camera.resize(w, h);
    this.world.resize(w, h);
    return this;
  },
  update: function (dt) {
    this.game.timings.cameraStart = this.game.clock.now();
    this.camera.update(dt);
    this.game.timings.cameraEnd = this.game.clock.now();
    this.game.timings.worldStart = this.game.clock.now();
    this.world.update(dt);
    this.game.timings.worldEnd = this.game.clock.now();
    this.game.timings.physicsStart = this.game.clock.now();
    this.physics.update(dt);
    this.game.timings.physicsEnd = this.game.clock.now();
    return this;
  }
});
module.exports = State;

return module.exports;

});
define('game/StateManager',['require','exports','module','../utils/inherit','./State'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), State = require("./State");
var StateManager = function (game) {
  this.game = game;
  this.states = {};
  this.active = null;
  this.count = 0;
  this._createDefault();
};
inherit(StateManager, Object, {
  _createDefault: function () {
    return this.add("__default", true);
  },
  add: function (Name, enable) {
    var state;
    if (typeof Name === "string") {
      state = new State(this.game, Name);
    } else if (typeof Name === "function") {
      state = new Name(this.game);
    } else {
      state = Name;
      state.game = this.game;
    }
    this.states[state.name] = state;
    this.game.stage.addChild(state);
    if (enable)
      this.enable(state);
    this.count++;
    return state;
  },
  remove: function (state) {
    if (typeof state === "string")
      state = this.states[state];
    if (state.parent)
      state.parent.removeChild(state);
    delete this.states[state.name];
    this.count--;
    return this;
  },
  enable: function (state) {
    if (typeof state !== "string")
      state = state.name;
    if (this.states[state]) {
      if (this.active) {
        this.active.visible = false;
      }
      this.active = this.states[state];
      this.active.visible = true;
    }
    return this;
  },
  destroy: function () {
    this.game = null;
    this.states = null;
  }
});
module.exports = StateManager;

return module.exports;

});
define('utils/Cache',['require','exports','module','./inherit','../constants','../display/Texture','../display/BaseTexture','../text/BitmapText','../vendor/pixi'],function (require, exports, module) {
  

var inherit = require("./inherit"), C = require("../constants"), Texture = require("../display/Texture"), BaseTexture = require("../display/BaseTexture"), BitmapText = require("../text/BitmapText"), PIXI = require("../vendor/pixi");
var Cache = function (game) {
  this.game = game;
  this._canvases = {};
  this._images = {};
  this._sounds = {};
  this._text = {};
  this._tilemaps = {};
  this.addDefaultImage();
};
inherit(Cache, Object, {
  addCanvas: function (obj) {
    this._canvases[obj.key] = obj;
  },
  addSpriteSheet: function (obj) {
    var key = obj.key;
    PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
    PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
    obj.texture = PIXI.TextureCache[key];
    obj.textures = Texture.fromSpritesheet(obj);
    this._images[key] = obj;
  },
  addTilemap: function (obj) {
    var key = obj.key, fmt = obj.format, tsets, name;
    if (fmt === C.FILE_FORMAT.XML)
      tsets = obj.data.getElementsByTagName("tilesets");
    else if (fmt === C.FILE_FORMAT.JSON)
      tsets = obj.data.tilesets;
    obj.textures = {};
    for (var i = 0, il = obj.images.length; i < il; ++i) {
      if (fmt === C.FILE_FORMAT.JSON)
        name = tsets[i].name;
      else if (fmt === C.FILE_FORMAT.XML)
        name = tsets[i].attributes.getNamedItem("name").nodeValue;
      var k = key + "_" + name;
      PIXI.BaseTextureCache[k] = new BaseTexture(obj.images[i]);
      PIXI.TextureCache[k] = new Texture(PIXI.BaseTextureCache[k]);
      obj.textures[name] = PIXI.TextureCache[k];
    }
    this._tilemaps[key] = obj;
  },
  addTextureAtlas: function (obj) {
    var key = obj.key;
    PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
    PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
    obj.texture = PIXI.TextureCache[key];
    if (obj.format === C.ATLAS_FORMAT.JSON_ARRAY || obj.format === C.ATLAS_FORMAT.JSON_HASH) {
      obj.textures = Texture.fromJSON(key, obj.data, obj.texture.baseTexture);
    } else if (obj.format === C.ATLAS_FORMAT.STARLING_XML) {
      obj.textures = Texture.fromXML(key, obj.data, obj.texture.baseTexture);
    }
    this._images[key] = obj;
  },
  addBitmapFont: function (obj) {
    var key = obj.key;
    PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
    PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
    obj.texture = PIXI.TextureCache[key];
    obj.font = BitmapText.parseXML(key, obj.data, obj.texture);
    this._images[key] = obj;
  },
  addImage: function (obj) {
    var key = obj.key;
    PIXI.BaseTextureCache[key] = new BaseTexture(obj.image);
    PIXI.TextureCache[key] = new Texture(PIXI.BaseTextureCache[key]);
    obj.texture = PIXI.TextureCache[key];
    this._images[key] = obj;
  },
  addAudio: function (obj) {
    var key = obj.key;
    if (!obj.webAudio) {
      obj.decoded = true;
    }
    obj.isDecoding = false;
    this._sounds[key] = obj;
  },
  updateSound: function (key, property, value) {
    if (this._sounds[key])
      this._sounds[key][property] = value;
  },
  addText: function (obj) {
    this._text[obj.key] = obj;
  },
  addDefaultImage: function () {
    var key = "__default";
    var base = new BaseTexture();
    base.width = 0;
    base.height = 0;
    base.hasLoaded = true;
    PIXI.BaseTextureCache[key] = base;
    PIXI.TextureCache[key] = new Texture(base);
    Texture.__default = PIXI.TextureCache[key];
    this._images[key] = { texture: PIXI.TextureCache[key] };
  },
  getCanvas: function (key) {
    if (this._canvases[key])
      return this._canvases[key].canvas;
  },
  getImage: function (key) {
    if (this._images[key])
      return this._images[key].image;
  },
  getTexture: function (key) {
    if (this._images[key])
      return this._images[key].texture;
  },
  getTextures: function (key) {
    if (this._images[key])
      return this._images[key].textures;
  },
  getBitmapFont: function (key) {
    if (this._images[key])
      return this._images[key].font;
  },
  getTilemap: function (key) {
    return this._tilemaps[key];
  },
  getAudio: function (key) {
    return this._sounds[key];
  },
  getAudioData: function (key) {
    if (this._sounds[key])
      return this._sounds[key].data;
  },
  getText: function (key) {
    if (this._text[key])
      return this._text[key].data;
  },
  removeCanvas: function (key) {
    delete this._canvases[key];
  },
  removeImage: function (key) {
    delete this._images[key];
  },
  removeSound: function (key) {
    delete this._sounds[key];
  },
  removeText: function (key) {
    delete this._text[key];
  },
  destroy: function () {
    this.game = null;
    this._canvases = null;
    this._images = null;
    this._sounds = null;
    this._text = null;
    this._tilemaps = null;
  }
});
module.exports = Cache;

return module.exports;

});
define('utils/Clock',['require','exports','module','./inherit'],function (require, exports, module) {
  

var inherit = require("./inherit");
var Clock = function () {
  this.startTime = 0;
  this.oldTime = 0;
  this.elapsedTime = 0;
  this.running = false;
  this.timer = window.performance && window.performance.now ? window.performance : Date;
};
inherit(Clock, Object, {
  now: function () {
    return this.timer.now();
  },
  start: function () {
    this.startTime = this.oldTime = this.now();
    this.running = true;
    return this;
  },
  stop: function () {
    this.getElapsedTime();
    this.running = false;
    return this;
  },
  reset: function () {
    this.elapsedTime = 0;
    this.startTime = this.oldTime = this.now();
    return this;
  },
  getElapsedTime: function () {
    this.getDelta();
    return this.elapsedTime;
  },
  getDelta: function () {
    var diff = 0;
    if (this.running) {
      var newTime = this.now();
      diff = 0.001 * (newTime - this.oldTime);
      this.oldTime = newTime;
      this.elapsedTime += diff;
    }
    return diff;
  }
});
module.exports = Clock;

return module.exports;

});
define('utils/SpritePool',['require','exports','module','./inherit','../display/Sprite'],function (require, exports, module) {
  

var inherit = require("./inherit"), Sprite = require("../display/Sprite");
var SpritePool = function (game) {
  this.types = {};
  this.game = game;
  this.add("_default", Sprite);
};
inherit(SpritePool, Object, {
  add: function (name, obj) {
    return this.types[name] = obj;
  },
  has: function (name) {
    return !!this.types[name];
  },
  create: function (name, texture, props) {
    if (!name || !this.types[name])
      name = "_default";
    return new this.types[name](texture, props);
  },
  free: function () {
    return;
  }
});
module.exports = SpritePool;

return module.exports;

});
define('loader/Loader',['require','exports','module','../utils/utils','../utils/inherit','../utils/support','../utils/EventEmitter','../constants'],function (require, exports, module) {
  

var utils = require("../utils/utils"), inherit = require("../utils/inherit"), support = require("../utils/support"), EventEmitter = require("../utils/EventEmitter"), C = require("../constants");
var Loader = function (game) {
  EventEmitter.call(this);
  this.game = game;
  this.keys = [];
  this.assets = {};
  this.total = 0;
  this.done = 0;
  this.isLoading = false;
  this.hasLoaded = false;
  this.progress = 0;
  this.crossOrigin = "";
  this.baseUrl = "";
};
inherit(Loader, Object, {
  hasKey: function (key) {
    return !!this.assets[key];
  },
  reset: function () {
    this.progress = 0;
    this.total = 0;
    this.done = 0;
    this.hasLoaded = false;
    this.isLoading = false;
    this.assets = {};
    this.keys.length = 0;
    return this;
  },
  add: function (type, key, url, opts) {
    var entry = {
        type: type,
        key: key,
        url: url,
        image: null,
        data: null,
        error: false,
        loaded: false
      };
    if (opts !== undefined) {
      for (var p in opts) {
        entry[p] = opts[p];
      }
    }
    this.assets[key] = entry;
    this.keys.push(key);
    this.total++;
    return this;
  },
  image: function (key, url, overwrite) {
    if (overwrite || !this.hasKey(key))
      this.add("image", key, url);
    return this;
  },
  text: function (key, url, overwrite) {
    if (overwrite || !this.hasKey(key))
      this.add("text", key, url);
    return this;
  },
  spritesheet: function (key, url, frameWidth, frameHeight, numFrames, overwrite) {
    if (overwrite || !this.hasKey(key))
      this.add("spritesheet", key, url, {
        frameWidth: frameWidth,
        frameHeight: frameHeight,
        numFrames: numFrames
      });
    return this;
  },
  audio: function (key, urls, overwrite) {
    if (overwrite || !this.hasKey(key))
      this.add("audio", key, urls);
    return this;
  },
  tilemap: function (key, url, data, format, overwrite) {
    if (overwrite || !this.hasKey(key)) {
      if (!format)
        format = C.FILE_FORMAT.JSON;
      if (typeof data === "string") {
        switch (format) {
        case C.FILE_FORMAT.JSON:
          data = JSON.parse(data);
          break;
        case C.FILE_FORMAT.XML:
          data = C.utils.parseXML(data);
          break;
        case C.FILE_FORMAT.CSV:
          break;
        }
      }
      this.add("tilemap", key, url, {
        data: data,
        format: format
      });
    }
    return this;
  },
  bitmapFont: function (key, textureUrl, dataUrl, data, format, overwrite) {
    if (overwrite || !this.hasKey(key)) {
      if (!format)
        format = C.FILE_FORMAT.XML;
      if (typeof data === "string") {
        switch (format) {
        case C.FILE_FORMAT.XML:
          data = utils.parseXML(data);
          break;
        case C.FILE_FORMAT.JSON:
          data = JSON.parse(data);
          break;
        }
      }
      this.add("bitmapfont", key, textureUrl, {
        dataUrl: dataUrl,
        data: data,
        format: format
      });
    }
    return this;
  },
  atlasJSONArray: function (key, textureURL, dataUrl, data) {
    return this.atlas(key, textureURL, dataUrl, data, C.ATLAS_FORMAT.JSON_ARRAY);
  },
  atlasJSONHash: function (key, textureURL, dataUrl, data) {
    return this.atlas(key, textureURL, dataUrl, data, C.ATLAS_FORMAT.JSON_HASH);
  },
  atlasXML: function (key, textureURL, dataUrl, data) {
    return this.atlas(key, textureURL, dataUrl, data, C.ATLAS_FORMAT.XML_STARLING);
  },
  atlas: function (key, textureUrl, dataUrl, data, format, overwrite) {
    if (overwrite || !this.hasKey(key)) {
      if (!format)
        format = C.ATLAS_FORMAT.JSON_ARRAY;
      if (typeof data === "string") {
        switch (format) {
        case C.ATLAS_FORMAT.XML_STARLING:
          data = utils.parseXML(data);
          break;
        case C.ATLAS_FORMAT.JSON_ARRAY:
        case C.ATLAS_FORMAT.JSON_HASH:
          data = JSON.parse(data);
          break;
        }
      }
      this.add("textureatlas", key, textureUrl, {
        dataUrl: dataUrl,
        data: data,
        format: format
      });
    }
    return this;
  },
  start: function () {
    if (this.isLoading)
      return;
    this.progress = 0;
    this.hasLoaded = false;
    this.isLoading = true;
    this.emit("start", this.keys.length);
    if (this.keys.length > 0) {
      while (this.keys.length > 0)
        this.loadFile();
    } else {
      this.progress = 100;
      this.hasLoaded = true;
      this.emit("complete");
    }
    return this;
  },
  loadFile: function () {
    var file = this.assets[this.keys.shift()], self = this;
    switch (file.type) {
    case "image":
    case "spritesheet":
    case "textureatlas":
    case "bitmapfont":
      file.image = new Image();
      file.image.name = file.key;
      file.image.addEventListener("load", this.fileComplete.bind(this, file.key), false);
      file.image.addEventListener("error", this.fileError.bind(this, file.key), false);
      file.image.crossOrigin = file.crossOrigin !== undefined ? file.crossOrigin : this.crossOrigin;
      file.image.src = this.baseUrl + file.url;
      break;
    case "tilemap":
      utils.ajax({
        url: this.baseUrl + file.url,
        dataType: this._getFormatAjaxType(file.format),
        load: function (data) {
          file.data = data;
          self.fileComplete(file.key);
        },
        error: function (err) {
          self.fileError(file.key, err);
        }
      });
      break;
    case "audio":
      file.url = this.getAudioUrl(file.url);
      if (file.url) {
        if (support.webAudio) {
          utils.ajax({
            url: this.baseUrl + file.url,
            dataType: "arraybuffer",
            load: function (data) {
              file.data = data;
              self.fileComplete(file.key);
            },
            error: function (err) {
              self.fileError(file.key, err);
            }
          });
        } else if (support.htmlAudio) {
          file.data = new Audio();
          file.data.name = file.key;
          file.data.preload = "auto";
          file.data.src = this.baseUrl + file.url;
          file.data.addEventListener("error", file._bndError = this.fileError.bind(this, file.key), false);
          file.data.addEventListener("canplaythrough", file._bndComplete = this.fileComplete.bind(this, file.key), false);
          file.data.load();
        }
      } else {
        this.fileError(file.key, "No supported audio URL could be determined!");
      }
      break;
    case "text":
      utils.ajax({
        url: this.baseUrl + file.url,
        dataType: "text",
        load: function (data) {
          file.data = data;
          self.fileComplete(file.key);
        },
        error: function (err) {
          self.fileError(file.key, err);
        }
      });
      break;
    }
    return this;
  },
  getAudioUrl: function (urls) {
    for (var i = 0, il = urls.length; i < il; ++i) {
      var url = urls[i], ext = url.match(/.+\.([^?]+)(\?|$)/);
      ext = ext && ext.length >= 2 ? ext[1] : url.match(/data\:audio\/([^?]+);/)[1];
      if (support.codec[ext]) {
        return url;
      }
    }
  },
  fileError: function (key, error) {
    this.assets[key].loaded = true;
    this.assets[key].error = error;
    this.fileDone(key, error);
  },
  fileComplete: function (key) {
    if (!this.assets[key])
      return utils.warn("fileComplete key is invalid!", key);
    this.assets[key].loaded = true;
    var file = this.assets[key], done = true, self = this;
    switch (file.type) {
    case "image":
      this.game.cache.addImage(file);
      break;
    case "spritesheet":
      this.game.cache.addSpriteSheet(file);
      break;
    case "tilemap":
      file.baseUrl = file.url.replace(/[^\/]*$/, "");
      file.numImages = file.numLoaded = 0;
      file.images = [];
      if (file.format === C.FILE_FORMAT.JSON) {
        done = false;
        this._loadJsonTilesets(file);
      } else if (file.format === C.FILE_FORMAT.XML) {
        done = false;
        this._loadXmlTilesets(file);
      }
      break;
    case "textureatlas":
      done = false;
      this._dataget(file, function () {
        self.game.cache.addTextureAtlas(file);
      });
      break;
    case "bitmapfont":
      done = false;
      this._dataget(file, function () {
        self.game.cache.addBitmapFont(file);
      });
      break;
    case "audio":
      if (support.webAudio) {
        file.webAudio = true;
        file.decoded = false;
      } else {
        file.data.removeEventListener("error", file._bndError);
        file.data.removeEventListener("canplaythrough", file._bndComplete);
      }
      this.game.cache.addAudio(file);
      break;
    case "text":
      this.game.cache.addText(file);
      break;
    }
    if (done) {
      this.fileDone(file.key);
    }
  },
  fileDone: function (key, error) {
    this.done++;
    this.progress = Math.round(this.done / this.total * 100);
    this.emit("progress", this.progress);
    if (error) {
      utils.warn("Error loading file \"" + key + "\", error received:", error);
      this.emit("error", error, key);
    }
    if (this.progress >= 100) {
      this.progress = 100;
      this.hasLoaded = true;
      this.isLoading = false;
      this.emit("complete");
    }
  },
  _getFormatAjaxType: function (type) {
    switch (type) {
    case C.ATLAS_FORMAT.JSON_ARRAY:
    case C.ATLAS_FORMAT.JSON_HASH:
    case C.FILE_FORMAT.JSON:
      return "json";
    case C.ATLAS_FORMAT.XML_STARLING:
    case C.FILE_FORMAT.XML:
      return "xml";
    case C.FILE_FORMAT.CSV:
      return "text";
    }
  },
  _dataget: function (file, cb) {
    var self = this;
    if (!file.dataUrl) {
      setTimeout(cb, 1);
    } else {
      utils.ajax({
        url: this.baseUrl + file.dataUrl,
        dataType: this._getFormatAjaxType(file.format),
        load: function (data) {
          file.data = data;
          if (cb)
            cb();
          self.fileDone(file.key);
        },
        error: function (err) {
          self.fileError(file.key, err);
        }
      });
    }
  },
  _loadJsonTilesets: function (file) {
    var data = file.data, baseUrl = file.baseUrl;
    for (var i = 0, il = data.tilesets.length; i < il; ++i) {
      var set = data.tilesets[i], img;
      if (!set.image)
        continue;
      file.numImages++;
      img = new Image();
      img.addEventListener("load", this._onTilesetLoaded.bind(this, file), false);
      img.addEventListener("error", this._onTilesetError.bind(this, file), false);
      img.crossOrigin = file.crossOrigin !== undefined ? file.crossOrigin : this.crossOrigin;
      img.src = this.baseUrl + baseUrl + set.image;
      file.images.push(img);
    }
  },
  _loadXmlTilesets: function (file) {
    var data = file.data, baseUrl = file.baseUrl, tilesets = data.getElementsByTagName("tileset");
    for (var i = 0, il = tilesets.length; i < il; ++i) {
      var set = tilesets[i], imgElm = set.getElementsByTagName("image")[0], img;
      if (!imgElm)
        continue;
      file.numImages++;
      img = new Image();
      img.addEventListener("load", this._onTilesetLoaded.bind(this, file), false);
      img.addEventListener("error", this._onTilesetError.bind(this, file), false);
      img.crossOrigin = file.crossOrigin !== undefined ? file.crossOrigin : this.crossOrigin;
      img.src = this.baseUrl + baseUrl + imgElm.attributes.getNamedItem("source").nodeValue;
      file.images.push(img);
    }
  },
  _onTilesetLoaded: function (file) {
    file.numLoaded++;
    if (file.numImages === file.numLoaded) {
      this.game.cache.addTilemap(file);
      this.fileDone(file.key);
    }
  },
  _onTilesetError: function (file, error) {
    file.error = error;
    file.numLoaded++;
    if (file.numImages === file.numLoaded) {
      this.fileDone(file.key, error);
    }
  }
});
module.exports = Loader;

return module.exports;

});
define('input/Input',['require','exports','module','../utils/inherit','../utils/EventEmitter'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), EventEmitter = require("../utils/EventEmitter");
var Input = function (game) {
  EventEmitter.call(this);
  this.game = game;
};
inherit(Input, Object, {});
module.exports = Input;

return module.exports;

});
define('input/Keyboard',['require','exports','module','../utils/inherit','./Input'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Input = require("./Input");
var Keyboard = function (game) {
  Input.call(this, game);
  this.sequence = [];
  this.sequenceTimeout = 500;
  this._clearSq = null;
  game.canvas.addEventListener("keydown", this.onKeyDown.bind(this), false);
  game.canvas.addEventListener("keyup", this.onKeyUp.bind(this), false);
};
inherit(Keyboard, Input, {
  onKeyDown: function (e, override) {
    return this.modifyKey(e, override || e.keyCode || e.which, true);
  },
  onKeyUp: function (e, override) {
    return this.modifyKey(e, override || e.keyCode || e.which, false);
  },
  modifyKey: function (e, key, down) {
    this.emit(key, this._getEventData(e, down));
    if (down) {
      this.sequence.push(key);
      var s = this.sequence.toString();
      if (s !== key.toString()) {
        this.emit(s, this._getEventData(e, down));
      }
      clearTimeout(this._clearSq);
      this._clearSq = setTimeout(this._clearSequence.bind(this), this.sequenceTimeout);
    }
  },
  _getEventData: function (e, down) {
    return {
      input: this,
      originalEvent: e,
      down: down
    };
  },
  _clearSequence: function () {
    this.sequence.length = 0;
  }
});
Keyboard.KEY = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  INSERT: 45,
  DELETE: 46,
  NUM0: 48,
  NUM1: 49,
  NUM2: 50,
  NUM3: 51,
  NUM4: 52,
  NUM5: 53,
  NUM6: 54,
  NUM7: 55,
  NUM8: 56,
  NUM9: 57,
  PLUS: 61,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  NUMPAD0: 96,
  NUMPAD1: 97,
  NUMPAD2: 98,
  NUMPAD3: 99,
  NUMPAD4: 100,
  NUMPAD5: 101,
  NUMPAD6: 102,
  NUMPAD7: 103,
  NUMPAD8: 104,
  NUMPAD9: 105,
  NUMPAD_STAR: 106,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_DOT: 110,
  NUMPAD_SLASH: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  MINUS: 173,
  TILDE: 192
};
module.exports = Keyboard;

return module.exports;

});
define('input/gamepad/GamepadButtons',['require','exports','module','../../utils/inherit','../Input'],function (require, exports, module) {
  

var inherit = require("../../utils/inherit"), Input = require("../Input");
var GamepadButtons = function () {
  Input.call(this);
  this.threshold = 0.4;
  this.buttons = {};
  for (var bt in GamepadButtons.BUTTON) {
    this.buttons[GamepadButtons.BUTTON[bt]] = {
      code: GamepadButtons.BUTTON[bt],
      name: bt,
      down: false,
      value: 0
    };
  }
};
inherit(GamepadButtons, Input, {
  pollStatus: function (pad) {
    for (var b = 0, bl = pad.buttons.length; b < bl; ++b) {
      var down = pad.buttons[b] > this.threshold, status = this.buttons[b];
      status.value = pad.buttons[b];
      if (status.down !== down) {
        status.down = down;
        this.emit(b, status);
      }
    }
  }
});
GamepadButtons.BUTTON = {
  FACE_1: 0,
  FACE_2: 1,
  FACE_3: 2,
  FACE_4: 3,
  LEFT_SHOULDER: 4,
  RIGHT_SHOULDER: 5,
  LEFT_TRIGGER: 6,
  RIGHT_TRIGGER: 7,
  SELECT: 8,
  START: 9,
  LEFT_ANALOGUE_STICK: 10,
  RIGHT_ANALOGUE_STICK: 11,
  PAD_TOP: 12,
  PAD_BOTTOM: 13,
  PAD_LEFT: 14,
  PAD_RIGHT: 15,
  SYSTEM_MENU: 16
};
GamepadButtons.getGpButtonName = function (i) {
  for (var k in GamepadButtons.BUTTON) {
    if (GamepadButtons.BUTTON[k] === i) {
      return k;
    }
  }
  return "";
};
module.exports = GamepadButtons;

return module.exports;

});
define('input/gamepad/GamepadSticks',['require','exports','module','../../utils/inherit','../Input'],function (require, exports, module) {
  

var inherit = require("../../utils/inherit"), Input = require("../Input");
var GamepadSticks = function () {
  Input.call(this);
  this.threshold = 0.5;
  this.axes = {};
  for (var ax in GamepadSticks.AXIS) {
    this.axes[GamepadSticks.AXIS[ax]] = {
      code: GamepadSticks.AXIS[ax],
      name: ax,
      value: 0
    };
  }
};
inherit(GamepadSticks, Input, {
  pollStatus: function (pad) {
    for (var a = 0, al = pad.axes.length; a < al; ++a) {
      var ax = pad.axes[a], status = this.axes[a];
      if (Math.abs(ax) >= this.threshold) {
        status.value = ax;
      } else {
        status.value = 0;
      }
      this.emit(a, status);
    }
  }
});
GamepadSticks.AXIS = {
  LEFT_ANALOGUE_HOR: 0,
  LEFT_ANALOGUE_VERT: 1,
  RIGHT_ANALOGUE_HOR: 2,
  RIGHT_ANALOGUE_VERT: 3
};
GamepadSticks.getGpAxisName = function (i) {
  for (var k in GamepadSticks.AXIS) {
    if (GamepadSticks.AXIS[k] === i) {
      return k;
    }
  }
  return "";
};
module.exports = GamepadSticks;

return module.exports;

});
define('input/Gamepad',['require','exports','module','../utils/inherit','./Input','./gamepad/GamepadButtons','./gamepad/GamepadSticks'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Input = require("./Input"), GamepadButtons = require("./gamepad/GamepadButtons"), GamepadSticks = require("./gamepad/GamepadSticks");
var Gamepad = function () {
  Input.call(this);
  this.ticking = false;
  this.pads = [];
  this.prevTimestamps = [];
  this.buttons = new GamepadButtons();
  this.sticks = new GamepadSticks();
  window.addEventListener("MozGamepadConnected", this.onGamepadConnect.bind(this), false);
  window.addEventListener("MozGamepadDisconnected", this.onGamepadDisconnect.bind(this), false);
  if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
    this.startPolling();
  }
};
inherit(Gamepad, Input, {
  onGamepadConnect: function (event) {
    this.pads.push(event.gamepad);
    this.startPolling();
  },
  onGamepadDisconnect: function (event) {
    for (var i = 0, il = this.pads.length; i < il; ++i) {
      if (this.pads[i].index === event.gamepad.index) {
        this.pads.splice(i, 1);
        break;
      }
    }
    if (this.pads.length === 0)
      this.stopPolling();
  },
  startPolling: function () {
    if (this.ticking)
      return;
    this.ticking = true;
    this.update();
  },
  stopPolling: function () {
    this.ticking = false;
  },
  pollGamepads: function () {
    var rawPads = navigator.webkitGetGamepads && navigator.webkitGetGamepads() || navigator.webkitGamepads;
    if (rawPads) {
      this.pads.length = 0;
      for (var i = 0, il = rawPads.length; i < il; ++i) {
        if (rawPads[i]) {
          this.pads.push(rawPads[i]);
        }
      }
    }
  },
  pollStatus: function () {
    for (var i = 0, il = this.pads.length; i < il; ++i) {
      var pad = this.pads[i];
      if (pad.timestamp && pad.timestamp === this.prevTimestamps[i])
        continue;
      this.prevTimestamps[i] = pad.timestamp;
      this.buttons.pollStatus(pad);
      this.sticks.pollStatus(pad);
    }
  },
  update: function () {
    if (!this.ticking)
      return;
    this.pollGamepads();
    this.pollStatus();
  }
});
module.exports = Gamepad;

return module.exports;

});
define('input/pointer/Pointer',['require','exports','module','../Input','../../math/Vector','../../utils/Clock','../../utils/inherit'],function (require, exports, module) {
  

var Input = require("../Input"), Vector = require("../../math/Vector"), Clock = require("../../utils/Clock"), inherit = require("../../utils/inherit");
var Pointer = function (id, manager) {
  Input.call(this);
  this.id = id;
  this.manager = manager;
  this.game = manager.game;
  this.active = false;
  this.mouse = id === 1;
  this.clock = new Clock();
  this.button = null;
  this.type = null;
  this._holdSent = false;
  this.position = new Vector();
  this.positionDown = new Vector();
};
inherit(Pointer, Input, {
  down: function (evt) {
    this.originalEvent = evt;
    this.timeDown = this.clock.now();
    this.timeHold = 0;
    this._holdSent = false;
    this.move(evt);
    this.positionDown.copy(this.position);
    this.button = evt.button;
    this.type = evt.pointerType;
    if (!this.active) {
      this.active = true;
      this.manager.activePointers++;
    }
  },
  up: function (evt) {
    var emit;
    this.originalEvent = evt;
    this.timeUp = this.clock.now();
    this.timeHold = this.timeUp - this.timeDown;
    if (this.timeHold >= 0 && this.timeHold <= this.manager.clickDelay) {
      if (this.timeUp - this.previousClickTime <= this.manager.doubleClickDelay) {
        emit = "doubleclick";
      } else {
        emit = "click";
      }
      this.previousClickTime = this.timeUp;
    }
    if (!this.mouse) {
      this.active = false;
      this.manager.activePointers--;
    }
    if (emit) {
      this.manager.emit(emit, this);
    }
  },
  move: function (evt) {
    this.originalEvent = evt;
    this.button = evt.button;
    this.type = evt.pointerType;
    this.position.set(evt.pageX - this.game.offset.x, evt.pageY - this.game.offset.y);
  },
  leave: function (evt) {
    this.move(evt);
  },
  update: function () {
    if (!this.active || this._holdSent)
      return;
    this.timeHold += this.clock.now() - this.timeDown;
    if (this.timeHold >= this.manager.holdDelay) {
      this._holdSent = true;
      this.manager.emit("hold", this);
    }
  },
  positionWorld: {}
});
Object.defineProperty(Pointer.prototype.positionWorld, "x", {
  get: function () {
    return this.position.x - this.game.world.position.x;
  }
});
Object.defineProperty(Pointer.prototype.positionWorld, "y", {
  get: function () {
    return this.position.y - this.game.world.position.y;
  }
});
Pointer.TYPE = {
  TOUCH: "touch",
  PEN: "pen",
  MOUSE: "mouse"
};
module.exports = Pointer;

return module.exports;

});
define('input/Pointers',['require','exports','module','../utils/inherit','./Input','./pointer/Pointer'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Input = require("./Input"), Pointer = require("./pointer/Pointer");
var Pointers = function (game) {
  Input.call(this, game);
  this.pointers = {};
  this.maxPointers = 10;
  this.clickDelay = 200;
  this.doubleClickDelay = 300;
  this.holdDelay = 2000;
  this.mouse = this.pointers[1] = new Pointer(1, this);
  this.activePointers = 0;
  game.canvas.addEventListener("pointerdown", this.onPointer.bind(this, "down"), false);
  game.canvas.addEventListener("pointerup", this.onPointer.bind(this, "up"), false);
  game.canvas.addEventListener("pointermove", this.onPointer.bind(this, "move"), false);
  game.canvas.addEventListener("pointerover", this.onPointer.bind(this, "over"), false);
  game.canvas.addEventListener("pointerout", this.onPointer.bind(this, "out"), false);
  game.canvas.addEventListener("pointercancel", this.onPointer.bind(this, "cancel"), false);
  game.canvas.addEventListener("pointerenter", this.onPointer.bind(this, "enter"), false);
  game.canvas.addEventListener("pointerleave", this.onPointer.bind(this, "leave"), false);
};
inherit(Pointers, Input, {
  onPointer: function (name, evt) {
    var id = evt.pointerId, pointer = this.pointers[id];
    if (!pointer) {
      if (this._numPointers < this.maxPointers) {
        this.pointers[id] = new Pointer(id, this);
      } else {
        return;
      }
    }
    if (pointer[name])
      pointer[name](evt);
    this.emit(name, pointer);
  },
  update: function (dt) {
    var p = this.pointers;
    for (var i = 0; i < p.length; ++i) {
      if (p[i]) {
        p[i].update(dt);
      }
    }
    return this;
  }
});
module.exports = Pointers;
(function () {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement) {
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 0) {
        n = Number(arguments[1]);
        if (n != n) {
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  var supportedEventsNames = [
      "PointerDown",
      "PointerUp",
      "PointerMove",
      "PointerOver",
      "PointerOut",
      "PointerCancel",
      "PointerEnter",
      "PointerLeave",
      "pointerdown",
      "pointerup",
      "pointermove",
      "pointerover",
      "pointerout",
      "pointercancel",
      "pointerenter",
      "pointerleave"
    ];
  var POINTER_TYPE_TOUCH = "touch";
  var POINTER_TYPE_PEN = "pen";
  var POINTER_TYPE_MOUSE = "mouse";
  var previousTargets = {};
  var checkPreventDefault = function (element) {
    while (element && element.handjs_forcePreventDefault !== true) {
      element = element.parentElement;
    }
    return element != null;
  };
  var generateTouchClonedEvent = function (sourceEvent, newName) {
    var evObj;
    if (document.createEvent) {
      evObj = document.createEvent("MouseEvents");
      evObj.initMouseEvent(newName, true, true, window, 1, sourceEvent.screenX, sourceEvent.screenY, sourceEvent.clientX, sourceEvent.clientY, sourceEvent.ctrlKey, sourceEvent.altKey, sourceEvent.shiftKey, sourceEvent.metaKey, sourceEvent.button, null);
    } else {
      evObj = document.createEventObject();
      evObj.screenX = sourceEvent.screenX;
      evObj.screenY = sourceEvent.screenY;
      evObj.clientX = sourceEvent.clientX;
      evObj.clientY = sourceEvent.clientY;
      evObj.ctrlKey = sourceEvent.ctrlKey;
      evObj.altKey = sourceEvent.altKey;
      evObj.shiftKey = sourceEvent.shiftKey;
      evObj.metaKey = sourceEvent.metaKey;
      evObj.button = sourceEvent.button;
    }
    if (evObj.offsetX === undefined) {
      if (sourceEvent.offsetX !== undefined) {
        if (Object && Object.defineProperty !== undefined) {
          Object.defineProperty(evObj, "offsetX", { writable: true });
          Object.defineProperty(evObj, "offsetY", { writable: true });
        }
        evObj.offsetX = sourceEvent.offsetX;
        evObj.offsetY = sourceEvent.offsetY;
      } else if (sourceEvent.layerX !== undefined) {
        evObj.offsetX = sourceEvent.layerX - sourceEvent.currentTarget.offsetLeft;
        evObj.offsetY = sourceEvent.layerY - sourceEvent.currentTarget.offsetTop;
      }
    }
    if (sourceEvent.isPrimary !== undefined)
      evObj.isPrimary = sourceEvent.isPrimary;
    else
      evObj.isPrimary = true;
    if (sourceEvent.pressure)
      evObj.pressure = sourceEvent.pressure;
    else {
      var button = 0;
      if (sourceEvent.which !== undefined)
        button = sourceEvent.which;
      else if (sourceEvent.button !== undefined) {
        button = sourceEvent.button;
      }
      evObj.pressure = button == 0 ? 0 : 0.5;
    }
    if (sourceEvent.rotation)
      evObj.rotation = sourceEvent.rotation;
    else
      evObj.rotation = 0;
    if (sourceEvent.hwTimestamp)
      evObj.hwTimestamp = sourceEvent.hwTimestamp;
    else
      evObj.hwTimestamp = 0;
    if (sourceEvent.tiltX)
      evObj.tiltX = sourceEvent.tiltX;
    else
      evObj.tiltX = 0;
    if (sourceEvent.tiltY)
      evObj.tiltY = sourceEvent.tiltY;
    else
      evObj.tiltY = 0;
    if (sourceEvent.height)
      evObj.height = sourceEvent.height;
    else
      evObj.height = 0;
    if (sourceEvent.width)
      evObj.width = sourceEvent.width;
    else
      evObj.width = 0;
    evObj.preventDefault = function () {
      if (sourceEvent.preventDefault !== undefined)
        sourceEvent.preventDefault();
    };
    if (evObj.stopPropagation !== undefined) {
      var current = evObj.stopPropagation;
      evObj.stopPropagation = function () {
        if (sourceEvent.stopPropagation !== undefined)
          sourceEvent.stopPropagation();
        current.call(this);
      };
    }
    evObj.POINTER_TYPE_TOUCH = POINTER_TYPE_TOUCH;
    evObj.POINTER_TYPE_PEN = POINTER_TYPE_PEN;
    evObj.POINTER_TYPE_MOUSE = POINTER_TYPE_MOUSE;
    evObj.pointerId = sourceEvent.pointerId;
    evObj.pointerType = sourceEvent.pointerType;
    switch (evObj.pointerType) {
    case 2:
      evObj.pointerType = evObj.POINTER_TYPE_TOUCH;
      break;
    case 3:
      evObj.pointerType = evObj.POINTER_TYPE_PEN;
      break;
    case 4:
      evObj.pointerType = evObj.POINTER_TYPE_MOUSE;
      break;
    }
    if (sourceEvent.currentTarget && checkPreventDefault(sourceEvent.currentTarget) === true) {
      evObj.preventDefault();
    }
    if (sourceEvent.target) {
      sourceEvent.target.dispatchEvent(evObj);
    } else {
      sourceEvent.srcElement.fireEvent("on" + getMouseEquivalentEventName(newName), evObj);
    }
  };
  var generateMouseProxy = function (evt, eventName) {
    evt.pointerId = 1;
    evt.pointerType = POINTER_TYPE_MOUSE;
    generateTouchClonedEvent(evt, eventName);
  };
  var generateTouchEventProxy = function (name, touchPoint, target, eventObject) {
    var touchPointId = touchPoint.identifier + 2;
    touchPoint.pointerId = touchPointId;
    touchPoint.pointerType = POINTER_TYPE_TOUCH;
    touchPoint.currentTarget = target;
    touchPoint.target = target;
    if (eventObject.preventDefault !== undefined) {
      touchPoint.preventDefault = function () {
        eventObject.preventDefault();
      };
    }
    generateTouchClonedEvent(touchPoint, name);
  };
  var checkRegisteredEvents = function (element, eventName) {
    while (element && !(element.__handjsGlobalRegisteredEvents && element.__handjsGlobalRegisteredEvents[eventName])) {
      element = element.parentElement;
    }
    return element != null;
  };
  var generateTouchEventProxyIfRegistered = function (eventName, touchPoint, target, eventObject) {
    if (checkRegisteredEvents(target, eventName)) {
      generateTouchEventProxy(eventName, touchPoint, target, eventObject);
    }
  };
  var handleOtherEvent = function (eventObject, name, useLocalTarget, checkRegistration) {
    if (eventObject.preventManipulation)
      eventObject.preventManipulation();
    for (var i = 0; i < eventObject.changedTouches.length; ++i) {
      var touchPoint = eventObject.changedTouches[i];
      if (useLocalTarget) {
        previousTargets[touchPoint.identifier] = touchPoint.target;
      }
      if (checkRegistration) {
        generateTouchEventProxyIfRegistered(name, touchPoint, previousTargets[touchPoint.identifier], eventObject);
      } else {
        generateTouchEventProxy(name, touchPoint, previousTargets[touchPoint.identifier], eventObject);
      }
    }
  };
  var getMouseEquivalentEventName = function (eventName) {
    return eventName.toLowerCase().replace("pointer", "mouse");
  };
  var getPrefixEventName = function (item, prefix, eventName) {
    var newEventName;
    if (eventName == eventName.toLowerCase()) {
      var indexOfUpperCase = supportedEventsNames.indexOf(eventName) - supportedEventsNames.length / 2;
      newEventName = prefix + supportedEventsNames[indexOfUpperCase];
    } else {
      newEventName = prefix + eventName;
    }
    if (newEventName === prefix + "PointerEnter" && item["on" + prefix.toLowerCase() + "pointerenter"] === undefined) {
      newEventName = prefix + "PointerOver";
    }
    if (newEventName === prefix + "PointerLeave" && item["on" + prefix.toLowerCase() + "pointerleave"] === undefined) {
      newEventName = prefix + "PointerOut";
    }
    return newEventName;
  };
  var registerOrUnregisterEvent = function (item, name, func, enable) {
    if (item.__handjsRegisteredEvents === undefined) {
      item.__handjsRegisteredEvents = [];
    }
    if (enable) {
      if (item.__handjsRegisteredEvents[name] !== undefined) {
        item.__handjsRegisteredEvents[name]++;
        return;
      }
      item.__handjsRegisteredEvents[name] = 1;
      item.addEventListener(name, func, false);
    } else {
      if (item.__handjsRegisteredEvents.indexOf(name) !== -1) {
        item.__handjsRegisteredEvents[name]--;
        if (item.__handjsRegisteredEvents[name] != 0) {
          return;
        }
      }
      item.removeEventListener(name, func);
      item.__handjsRegisteredEvents[name] = 0;
    }
  };
  var setTouchAware = function (item, eventName, enable) {
    if (item.onpointerdown !== undefined) {
      return;
    }
    if (item.onmspointerdown !== undefined) {
      var msEventName = getPrefixEventName(item, "MS", eventName);
      registerOrUnregisterEvent(item, msEventName, function (evt) {
        generateTouchClonedEvent(evt, eventName);
      }, enable);
      return;
    }
    if (item.ontouchstart !== undefined) {
      switch (eventName) {
      case "pointermove":
        registerOrUnregisterEvent(item, "touchmove", function (evt) {
          handleOtherEvent(evt, eventName);
        }, enable);
        break;
      case "pointercancel":
        registerOrUnregisterEvent(item, "touchcancel", function (evt) {
          handleOtherEvent(evt, eventName);
        }, enable);
        break;
      case "pointerdown":
      case "pointerup":
      case "pointerout":
      case "pointerover":
      case "pointerleave":
      case "pointerenter":
        if (!item.__handjsGlobalRegisteredEvents) {
          item.__handjsGlobalRegisteredEvents = [];
        }
        if (enable) {
          if (item.__handjsGlobalRegisteredEvents[eventName] !== undefined) {
            item.__handjsGlobalRegisteredEvents[eventName]++;
            return;
          }
          item.__handjsGlobalRegisteredEvents[eventName] = 1;
        } else {
          if (item.__handjsGlobalRegisteredEvents[eventName] !== undefined) {
            item.__handjsGlobalRegisteredEvents[eventName]--;
            if (item.__handjsGlobalRegisteredEvents[eventName] < 0) {
              item.__handjsGlobalRegisteredEvents[eventName] = 0;
            }
          }
        }
        break;
      }
    }
    switch (eventName) {
    case "pointerdown":
      registerOrUnregisterEvent(item, "mousedown", function (evt) {
        generateMouseProxy(evt, eventName);
      }, enable);
      break;
    case "pointermove":
      registerOrUnregisterEvent(item, "mousemove", function (evt) {
        generateMouseProxy(evt, eventName);
      }, enable);
      break;
    case "pointerup":
      registerOrUnregisterEvent(item, "mouseup", function (evt) {
        generateMouseProxy(evt, eventName);
      }, enable);
      break;
    case "pointerover":
      registerOrUnregisterEvent(item, "mouseover", function (evt) {
        generateMouseProxy(evt, eventName);
      }, enable);
      break;
    case "pointerout":
      registerOrUnregisterEvent(item, "mouseout", function (evt) {
        generateMouseProxy(evt, eventName);
      }, enable);
      break;
    case "pointerenter":
      if (item.onmouseenter === undefined) {
        registerOrUnregisterEvent(item, "mouseover", function (evt) {
          generateMouseProxy(evt, eventName);
        }, enable);
      } else {
        registerOrUnregisterEvent(item, "mouseenter", function (evt) {
          generateMouseProxy(evt, eventName);
        }, enable);
      }
      break;
    case "pointerleave":
      if (item.onmouseleave === undefined) {
        registerOrUnregisterEvent(item, "mouseout", function (evt) {
          generateMouseProxy(evt, eventName);
        }, enable);
      } else {
        registerOrUnregisterEvent(item, "mouseleave", function (evt) {
          generateMouseProxy(evt, eventName);
        }, enable);
      }
      break;
    }
  };
  var interceptAddEventListener = function (root) {
    var current = root.prototype ? root.prototype.addEventListener : root.addEventListener;
    var customAddEventListener = function (name, func, capture) {
      if (supportedEventsNames.indexOf(name) != -1) {
        setTouchAware(this, name, true);
      }
      if (current === undefined) {
        this.attachEvent("on" + getMouseEquivalentEventName(name), func);
      } else {
        current.call(this, name, func, capture);
      }
    };
    if (root.prototype) {
      root.prototype.addEventListener = customAddEventListener;
    } else {
      root.addEventListener = customAddEventListener;
    }
  };
  var interceptRemoveEventListener = function (root) {
    var current = root.prototype ? root.prototype.removeEventListener : root.removeEventListener;
    var customRemoveEventListener = function (name, func, capture) {
      if (supportedEventsNames.indexOf(name) != -1) {
        setTouchAware(this, name, false);
      }
      if (current === undefined) {
        this.detachEvent(getMouseEquivalentEventName(name), func);
      } else {
        current.call(this, name, func, capture);
      }
    };
    if (root.prototype) {
      root.prototype.removeEventListener = customRemoveEventListener;
    } else {
      root.removeEventListener = customRemoveEventListener;
    }
  };
  interceptAddEventListener(HTMLElement);
  interceptAddEventListener(document);
  interceptAddEventListener(HTMLBodyElement);
  interceptAddEventListener(HTMLDivElement);
  interceptAddEventListener(HTMLImageElement);
  interceptAddEventListener(HTMLUListElement);
  interceptAddEventListener(HTMLAnchorElement);
  interceptAddEventListener(HTMLLIElement);
  interceptAddEventListener(HTMLTableElement);
  if (window.HTMLSpanElement) {
    interceptAddEventListener(HTMLSpanElement);
  }
  if (window.HTMLCanvasElement) {
    interceptAddEventListener(HTMLCanvasElement);
  }
  if (window.SVGElement) {
    interceptAddEventListener(SVGElement);
  }
  interceptRemoveEventListener(HTMLElement);
  interceptRemoveEventListener(document);
  interceptRemoveEventListener(HTMLBodyElement);
  interceptRemoveEventListener(HTMLDivElement);
  interceptRemoveEventListener(HTMLImageElement);
  interceptRemoveEventListener(HTMLUListElement);
  interceptRemoveEventListener(HTMLAnchorElement);
  interceptRemoveEventListener(HTMLLIElement);
  interceptRemoveEventListener(HTMLTableElement);
  if (window.HTMLSpanElement) {
    interceptRemoveEventListener(HTMLSpanElement);
  }
  if (window.HTMLCanvasElement) {
    interceptRemoveEventListener(HTMLCanvasElement);
  }
  if (window.SVGElement) {
    interceptRemoveEventListener(SVGElement);
  }
  if (window.ontouchstart !== undefined) {
    window.addEventListener("touchstart", function (eventObject) {
      for (var i = 0; i < eventObject.changedTouches.length; ++i) {
        var touchPoint = eventObject.changedTouches[i];
        previousTargets[touchPoint.identifier] = touchPoint.target;
        generateTouchEventProxyIfRegistered("pointerenter", touchPoint, touchPoint.target, eventObject);
        generateTouchEventProxyIfRegistered("pointerover", touchPoint, touchPoint.target, eventObject);
        generateTouchEventProxyIfRegistered("pointerdown", touchPoint, touchPoint.target, eventObject);
      }
    });
    window.addEventListener("touchend", function (eventObject) {
      for (var i = 0; i < eventObject.changedTouches.length; ++i) {
        var touchPoint = eventObject.changedTouches[i];
        var currentTarget = previousTargets[touchPoint.identifier];
        generateTouchEventProxyIfRegistered("pointerup", touchPoint, currentTarget, eventObject);
        generateTouchEventProxyIfRegistered("pointerout", touchPoint, currentTarget, eventObject);
        generateTouchEventProxyIfRegistered("pointerleave", touchPoint, currentTarget, eventObject);
      }
    });
    window.addEventListener("touchmove", function (eventObject) {
      for (var i = 0; i < eventObject.changedTouches.length; ++i) {
        var touchPoint = eventObject.changedTouches[i];
        var newTarget = document.elementFromPoint(touchPoint.clientX, touchPoint.clientY);
        var currentTarget = previousTargets[touchPoint.identifier];
        if (currentTarget === newTarget) {
          continue;
        }
        if (currentTarget) {
          generateTouchEventProxyIfRegistered("pointerout", touchPoint, currentTarget, eventObject);
          if (!currentTarget.contains(newTarget)) {
            generateTouchEventProxyIfRegistered("pointerleave", touchPoint, currentTarget, eventObject);
          }
        }
        if (newTarget) {
          generateTouchEventProxyIfRegistered("pointerover", touchPoint, newTarget, eventObject);
          if (!newTarget.contains(currentTarget)) {
            generateTouchEventProxyIfRegistered("pointerenter", touchPoint, newTarget, eventObject);
          }
        }
        previousTargets[touchPoint.identifier] = newTarget;
      }
    });
  }
  if (navigator.pointerEnabled === undefined) {
    navigator.pointerEnabled = true;
    if (navigator.msPointerEnabled) {
      navigator.maxTouchPoints = navigator.msMaxTouchPoints;
    }
  }
  if (document.styleSheets && document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () {
      var trim = function (string) {
        return string.replace(/^\s+|\s+$/, "");
      };
      var processStylesheet = function (unfilteredSheet) {
        var globalRegex = new RegExp(".+?{.*?}", "m");
        var selectorRegex = new RegExp(".+?{", "m");
        while (unfilteredSheet != "") {
          var filter = globalRegex.exec(unfilteredSheet);
          if (!filter) {
            break;
          }
          var block = filter[0];
          unfilteredSheet = trim(unfilteredSheet.replace(block, ""));
          var selectorText = trim(selectorRegex.exec(block)[0].replace("{", ""));
          if (block.replace(/\s/g, "").indexOf("touch-action:none") != -1) {
            var elements = document.querySelectorAll(selectorText);
            for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
              var element = elements[elementIndex];
              if (element.style.msTouchAction !== undefined) {
                element.style.msTouchAction = "none";
              } else {
                element.handjs_forcePreventDefault = true;
              }
            }
          }
        }
      };
      try {
        for (var index = 0; index < document.styleSheets.length; index++) {
          var sheet = document.styleSheets[index];
          if (sheet.href == undefined) {
            continue;
          }
          var xhr = new XMLHttpRequest();
          xhr.open("get", sheet.href, false);
          xhr.send();
          var unfilteredSheet = xhr.responseText.replace(/(\n|\r)/g, "");
          processStylesheet(unfilteredSheet);
        }
      } catch (e) {
      }
      var styles = document.getElementsByTagName("style");
      for (var index = 0; index < styles.length; index++) {
        var inlineSheet = styles[index];
        var inlineUnfilteredSheet = trim(inlineSheet.innerHTML.replace(/(\n|\r)/g, ""));
        processStylesheet(inlineUnfilteredSheet);
      }
    }, false);
  }
}());

return module.exports;

});
define('input/InputManager',['require','exports','module','../utils/inherit','./Keyboard','./Gamepad','./Pointers'],function (require, exports, module) {
  

var inherit = require("../utils/inherit"), Keyboard = require("./Keyboard"), Gamepad = require("./Gamepad"), Pointers = require("./Pointers");
var InputManager = function (game) {
  this.game = game;
  this.canvas = game.canvas;
  this.keyboard = new Keyboard(game);
  this.pointers = new Pointers(game);
  this.gamepad = new Gamepad();
};
inherit(InputManager, Object, {
  update: function (dt) {
    this.pointers.update(dt);
    this.gamepad.update(dt);
  }
});
module.exports = InputManager;

return module.exports;

});
define('game/Game',['require','exports','module','./StateManager','../utils/EventEmitter','../utils/Cache','../utils/Clock','../utils/SpritePool','../loader/Loader','../input/InputManager','../audio/AudioManager','../math/Vector','../utils/utils','../utils/support','../utils/inherit','../vendor/pixi','../constants'],function (require, exports, module) {
  

var StateManager = require("./StateManager"), EventEmitter = require("../utils/EventEmitter"), Cache = require("../utils/Cache"), Clock = require("../utils/Clock"), SpritePool = require("../utils/SpritePool"), Loader = require("../loader/Loader"), InputManager = require("../input/InputManager"), AudioManager = require("../audio/AudioManager"), Vector = require("../math/Vector"), utils = require("../utils/utils"), support = require("../utils/support"), inherit = require("../utils/inherit"), PIXI = require("../vendor/pixi"), C = require("../constants");
var Game = function (container, settings) {
  EventEmitter.call(this);
  settings = settings || {};
  settings.width = settings.width || 800;
  settings.height = settings.height || 600;
  settings.renderer = settings.renderer || C.RENDERER.AUTO;
  settings.transparent = settings.transparent || false;
  settings.background = settings.background || "#FFF";
  settings.antialias = settings.antialias !== undefined ? settings.antialias : true;
  settings.canvas = settings.canvas || null;
  this.container = typeof container === "string" ? document.getElementById(container) : container;
  if (!this.container)
    this.container = document.body;
  this.width = settings.width;
  this.height = settings.height;
  this.renderMethod = settings.renderer;
  this.transparent = settings.transparent;
  this.background = settings.background;
  this.antialias = settings.antialias;
  this.canvas = settings.canvas;
  this.renderer = this._createRenderer();
  this.stage = new PIXI.Stage(this.background);
  this.clock = new Clock();
  this.audio = new AudioManager(this);
  this.load = new Loader(this);
  this.cache = new Cache(this);
  this.input = new InputManager(this);
  this.spritepool = new SpritePool(this);
  this.state = new StateManager(this);
  this.offset = new Vector();
  this.timings = {};
  var view = this.canvas;
  if (!view.getAttribute("tabindex"))
    view.setAttribute("tabindex", "1");
  view.focus();
  view.addEventListener("click", function () {
    view.focus();
  }, false);
};
inherit(Game, Object, {
  _createRenderer: function () {
    var method = this.renderMethod, render = null;
    if (!support.webgl && !support.canvas) {
      throw new Error("Neither WebGL nor Canvas is supported by this browser!");
    } else if ((method === C.RENDERER.WEBGL || method === C.RENDERER.AUTO) && support.webgl) {
      method = C.RENDERER.WEBGL;
      render = new PIXI.WebGLRenderer(this.width, this.height, this.canvas, this.transparent, this.antialias);
    } else if ((method === C.RENDERER.CANVAS || method === C.RENDERER.AUTO) && support.canvas) {
      method = C.RENDERER.CANVAS;
      render = new PIXI.CanvasRenderer(this.width, this.height, this.canvas, this.transparent);
    } else {
      throw new Error("Your render method (\"" + method + "\") is not supported by this browser!");
    }
    if (!this.canvas) {
      this.container.appendChild(render.view);
      this.canvas = render.view;
    }
    this.offset = utils.getOffset(this.canvas);
    this.renderMethod = method;
    return render;
  },
  resize: function (w, h) {
    this.renderer.resize(w, h);
    this.width = w;
    this.height = h;
    for (var i = 0, il = this.stage.children.length; i < il; ++i) {
      var o = this.stage.children[i];
      if (o.resize)
        o.resize(w, h);
    }
    return this;
  },
  requestFullscreen: function () {
    var elem = this.renderer.view;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    return this;
  },
  render: function () {
    this.clock.start();
    this._tick();
    return this;
  },
  _tick: function () {
    this.timings.tickStart = this.clock.now();
    window.requestAnimFrame(this._tick.bind(this));
    var dt = this.clock.getDelta();
    this.timings.lastDelta = dt;
    this.timings.inputStart = this.clock.now();
    this.input.update(dt);
    this.timings.inputEnd = this.clock.now();
    this.timings.stateStart = this.clock.now();
    this.state.active.update(dt);
    this.timings.stateEnd = this.clock.now();
    this.timings.userFuncsStart = this.clock.now();
    this.emit("tick", dt);
    this.timings.userFuncsEnd = this.clock.now();
    this.timings.renderStart = this.clock.now();
    this.renderer.render(this.stage);
    this.timings.renderEnd = this.clock.now();
    this.timings.tickEnd = this.clock.now();
  }
});
Object.defineProperty(Game.prototype, "physics", {
  get: function () {
    return this.state.active.physics;
  }
});
Object.defineProperty(Game.prototype, "camera", {
  get: function () {
    return this.state.active.camera;
  }
});
Object.defineProperty(Game.prototype, "world", {
  get: function () {
    return this.state.active.world;
  }
});
module.exports = Game;

return module.exports;

});
define('text/Text',['require','exports','module','../vendor/pixi'],function (require, exports, module) {
  

var Text = require("../vendor/pixi").Text;
module.exports = Text;

return module.exports;

});
define('plugin',['require','exports','module'],function (require, exports, module) {
  

var plugin = {
    patch: function (obj, name, fn) {
      if (obj.prototype !== undefined) {
        obj = obj.prototype;
      }
      if (typeof obj[name] !== "function") {
        throw new TypeError(name + " is not a function in the passed object.");
      }
      if (typeof fn !== "function") {
        throw new TypeError("The passed patch function is not a function.");
      }
      var _super = obj[name];
      obj[name] = function (name, fn) {
        return function () {
          var tmp = this._super;
          this._super = _super;
          var ret = fn.apply(this, arguments);
          this._super = tmp;
          return ret;
        };
      }(name, fn);
    },
    register: function (obj, name) {
      if (window.gf[name]) {
        throw new RangeError("Unable to register plugin: \"" + name + "\" already exists in the gf namespace, please choose something else!");
      }
      window.gf[name] = obj;
    }
  };
module.exports = plugin;

return module.exports;

});
define('core',['require', 'exports', 'module', './constants', './audio/AudioManager', './audio/AudioPlayer', './camera/Camera', './display/BaseTexture', './display/Container', './display/Graphics', './display/RenderTexture', './display/Sprite', './display/Texture', './display/TilingSprite', './fx/camera/Effect', './fx/camera/Close', './fx/camera/Fade', './fx/camera/Flash', './fx/camera/Scanlines', './fx/camera/Shake', './game/Game', './game/State', './game/StateManager', './game/World', './geom/Circle', './geom/Ellipse', './geom/Polygon', './geom/Rectangle', './gui/GuiItem', './input/Input', './input/InputManager', './input/Keyboard', './input/Gamepad', './input/gamepad/GamepadButtons', './input/gamepad/GamepadSticks', './input/Pointers', './input/pointer/Pointer', './loader/Loader', './math/math', './math/Vector', './particles/ParticleEmitter', './particles/ParticleSystem', './physics/PhysicsSystem', './physics/PhysicsTarget', './text/BitmapText', './text/Text', './tilemap/Tile', './tilemap/Tilelayer', './tilemap/Tilemap', './tilemap/Tileset', './tilemap/ObjectGroup', './utils/utils', './utils/support', './utils/inherit', './utils/Cache', './utils/Clock', './utils/EventEmitter', './utils/ObjectPool', './utils/SpritePool', './utils/ObjectFactory', './plugin', './vendor/pixi'], function (require, exports, module) {
  var __umodule__ = (function (require, exports, module) {
  

var gf = {
    AudioManager: require("./audio/AudioManager"),
    AudioPlayer: require("./audio/AudioPlayer"),
    Camera: require("./camera/Camera"),
    BaseTexture: require("./display/BaseTexture"),
    Container: require("./display/Container"),
    Graphics: require("./display/Graphics"),
    RenderTexture: require("./display/RenderTexture"),
    Sprite: require("./display/Sprite"),
    Texture: require("./display/Texture"),
    TilingSprite: require("./display/TilingSprite"),
    fx: {
      camera: {
        Effect: require("./fx/camera/Effect"),
        Close: require("./fx/camera/Close"),
        Fade: require("./fx/camera/Fade"),
        Flash: require("./fx/camera/Flash"),
        Scanlines: require("./fx/camera/Scanlines"),
        Shake: require("./fx/camera/Shake")
      }
    },
    Game: require("./game/Game"),
    State: require("./game/State"),
    StateManager: require("./game/StateManager"),
    World: require("./game/World"),
    Circle: require("./geom/Circle"),
    Ellipse: require("./geom/Ellipse"),
    Polygon: require("./geom/Polygon"),
    Rectangle: require("./geom/Rectangle"),
    GuiItem: require("./gui/GuiItem"),
    Input: require("./input/Input"),
    InputManager: require("./input/InputManager"),
    Keyboard: require("./input/Keyboard"),
    Gamepad: require("./input/Gamepad"),
    GamepadButtons: require("./input/gamepad/GamepadButtons"),
    GamepadSticks: require("./input/gamepad/GamepadSticks"),
    Pointers: require("./input/Pointers"),
    Pointer: require("./input/pointer/Pointer"),
    Loader: require("./loader/Loader"),
    math: require("./math/math"),
    Vector: require("./math/Vector"),
    ParticleEmitter: require("./particles/ParticleEmitter"),
    ParticleSystem: require("./particles/ParticleSystem"),
    PhysicsSystem: require("./physics/PhysicsSystem"),
    PhysicsTarget: require("./physics/PhysicsTarget"),
    BitmapText: require("./text/BitmapText"),
    Text: require("./text/Text"),
    Tile: require("./tilemap/Tile"),
    Tilelayer: require("./tilemap/Tilelayer"),
    Tilemap: require("./tilemap/Tilemap"),
    Tileset: require("./tilemap/Tileset"),
    ObjectGroup: require("./tilemap/ObjectGroup"),
    utils: require("./utils/utils"),
    support: require("./utils/support"),
    inherit: require("./utils/inherit"),
    Cache: require("./utils/Cache"),
    Clock: require("./utils/Clock"),
    EventEmitter: require("./utils/EventEmitter"),
    ObjectPool: require("./utils/ObjectPool"),
    SpritePool: require("./utils/SpritePool"),
    ObjectFactory: require("./utils/ObjectFactory"),
    plugin: require("./plugin"),
    PIXI: require("./vendor/pixi")
  };
gf.PIXI.Point = gf.Vector;
var C = require("./constants");
for (var k in C) {
  gf[k] = C[k];
}
module.exports = gf;

return module.exports;

}).call(this, require, exports, module);
var __old__gf = window.gf;
window.gf = __umodule__;

__umodule__.noConflict = function () {
  window.gf = __old__gf;
return __umodule__;
};
return __umodule__;
});    return require('core');
  };
if (__isAMD) {
  return define(bundleFactory);
} else {
    if (__isNode) {
        return module.exports = bundleFactory();
    } else {
        return bundleFactory();
    }
}
}).call(this, (typeof exports === 'object' ? global : window),
              (typeof exports === 'object' ? global : window))