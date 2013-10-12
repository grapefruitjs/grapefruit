;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("should.js/index.js", function(exports, require, module){

module.exports = require('./lib/should');
});
require.register("should.js/lib/should.js", function(exports, require, module){
/*!
 * Should
 * Copyright(c) 2010-2012 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util = require('./util')
  , assert = require('./assert')
  , AssertionError = assert.AssertionError
  , statusCodes = require('./http').STATUS_CODES
  , eql = require('./eql')
  , inspect = util.inspect;

/**
 * Our function should
 * @param obj
 * @returns {Assertion}
 */
var should = function(obj) {
  return new Assertion(util.isWrapperType(obj) ? obj.valueOf(): obj);
};

should.inspect = inspect;

/**
 * Expose assert to should
 *
 * This allows you to do things like below
 * without require()ing the assert module.
 *
 *    should.equal(foo.bar, undefined);
 *
 */
util.merge(should, assert);


/**
 * Assert _obj_ exists, with optional message.
 *
 * @param {*} obj
 * @param {String} [msg]
 * @api public
 */
should.exist = should.exists = function(obj, msg) {
  if(null == obj) {
    throw new AssertionError({
      message: msg || ('expected ' + should.inspect(obj) + ' to exist')
      , stackStartFunction: should.exist
    });
  }
};

/**
 * Asserts _obj_ does not exist, with optional message.
 *
 * @param {*} obj
 * @param {String} [msg]
 * @api public
 */

should.not = {};
should.not.exist = should.not.exists = function(obj, msg){
  if (null != obj) {
    throw new AssertionError({
      message: msg || ('expected ' + should.inspect(obj) + ' to not exist')
      , stackStartFunction: should.not.exist
    });
  }
};

/**
 * Expose should to external world.
 */
exports = module.exports = should;


/**
 * Expose api via `Object#should`.
 *
 * @api public
 */

Object.defineProperty(Object.prototype, 'should', {
  set: function(){},
  get: function(){
    return should(this);
  },
  configurable: true
});

/**
 * Initialize a new `Assertion` with the given _obj_.
 *
 * @param {*} obj
 * @api private
 */

var Assertion = should.Assertion = function Assertion(obj) {
  this.obj = obj;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Prototype.
 */

Assertion.prototype = {

  /**
   * Assert _expr_ with the given _msg_ and _negatedMsg_.
   *
   * @param {Boolean} expr
   * @param {function} msg
   * @param {function} negatedMsg
   * @param {Object} [expected]
   * @param {Boolean} [showDiff]
   * @param {String} [description]
   * @api private
   */

  assert: function(expr, msg, negatedMsg, expected, showDiff, description){
    msg = this.negate ? negatedMsg : msg

    var ok = this.negate ? !expr : expr
      , obj = this.obj;

    if (ok) return;

    var err = new AssertionError({
        message: msg.call(this)
      , actual: obj
      , expected: expected
      , stackStartFunction: this.assert
      , negated: this.negate
    });

    err.showDiff = showDiff;
    err.description = description

    throw err;
  },

  /**
   * Dummy getter.
   *
   * @api public
   */

  get an() {
    return this;
  },

  /**
   * Dummy getter.
   *
   * @api public
   */

  get a() {
    return this;
  },

  /**
   * Dummy getter.
   *
   * @api public
   */

  get and() {
    return this;
  },

  /**
   * Dummy getter.
   *
   * @api public
   */

  get be() {
    return this;
  },

  /**
   * Dummy getter.
   *
   * @api public
   */

  get have() {
    return this;
  },

  /**
   * Dummy getter.
   *
   * @api public
   */

  get with() {
    return this;
  },

  /**
   * Negation modifier.
   *
   * @api public
   */

  get not() {
    this.negate = true;
    return this;
  },

  /**
   * Get object inspection string.
   *
   * @return {String}
   * @api private
   */

  get inspect() {
    return should.inspect(this.obj);
  },

  /**
   * Assert instanceof `Arguments`.
   *
   * @api public
   */

  get arguments() {
    this.assert(
        util.isArguments(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be arguments' }
      , function(){ return 'expected ' + this.inspect + ' to not be arguments' });
    return this;
  },

  /**
   * Assert that object is empty.
   *
   * @api public
   */

  get empty() {
    var length = this.obj.length;

    if(util.isString(this.obj) || Array.isArray(this.obj) || util.isArguments(this.obj)) {
      this.assert(
        0 === length
        , function(){ return 'expected ' + this.inspect + ' to be empty' }
        , function(){ return 'expected ' + this.inspect + ' not to be empty' });
    } else {
      var ok = true;
      for (var prop in this.obj) {
        if(hasOwnProperty.call(this.obj, prop)) {
          ok = false;
          break;
        }
      }

      this.assert(
        ok
        , function(){ return 'expected ' + this.inspect + ' to be empty' }
        , function(){ return 'expected ' + this.inspect + ' not to be empty' });

    }
    return this;
  },

  /**
   * Assert ok.
   *
   * @api public
   */

  get ok() {
    this.assert(
        this.obj
      , function(){ return 'expected ' + this.inspect + ' to be truthy' }
      , function(){ return 'expected ' + this.inspect + ' to be falsey' });
    return this;
  },

  /**
   * Assert true.
   *
   * @api public
   */

  get true() {
    this.assert(
        true === this.obj
      , function(){ return 'expected ' + this.inspect + ' to be true' }
      , function(){ return 'expected ' + this.inspect + ' not to be true' });
    return this;
  },

  /**
   * Assert false.
   *
   * @api public
   */

  get false() {
    this.assert(
        false === this.obj
      , function(){ return 'expected ' + this.inspect + ' to be false' }
      , function(){ return 'expected ' + this.inspect + ' not to be false' });
    return this;
  },

  /**
   * Assert NaN.
   *
   * @api public
   */

  get NaN() {
    this.assert(
        util.isNumber(this.obj) && isNaN(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be NaN' }
      , function(){ return 'expected ' + this.inspect + ' not to be NaN' });
    return this;
  },

  /**
   * Assert Infinity.
   *
   * @api public
   */

  get Infinity() {
    this.assert(
      util.isNumber(this.obj) && !isNaN(this.obj) && !isFinite(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be Infinity' }
      , function(){ return 'expected ' + this.inspect + ' not to be Infinity' });
    return this;
  },

  /**
   * Assert equal.
   *
   * @param {*} val
   * @param {String} description
   * @api public
   */

  eql: function(val, description){
    this.assert(
        eql(val, this.obj)
      , function(){ return 'expected ' + this.inspect + ' to equal ' + should.inspect(val) + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not equal ' + should.inspect(val) + (description ? " | " + description : "") }
      , val
      , true
      , description);
    return this;
  },

  /**
   * Assert strict equal.
   *
   * @param {*} val
   * @param {String} description
   * @api public
   */

  equal: function(val, description){
    this.assert(
        val === this.obj
      , function(){ return 'expected ' + this.inspect + ' to equal ' + should.inspect(val) + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not equal ' + should.inspect(val) + (description ? " | " + description : "") }
      , val
      , void 0
      , description);
    return this;
  },

  /**
   * Assert within start to finish (inclusive).
   *
   * @param {Number} start
   * @param {Number} finish
   * @param {String} description
   * @api public
   */

  within: function(start, finish, description){
    var range = start + '..' + finish;
    this.assert(
        this.obj >= start && this.obj <= finish
      , function(){ return 'expected ' + this.inspect + ' to be within ' + range + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not be within ' + range + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert within value +- delta (inclusive).
   *
   * @param {Number} value
   * @param {Number} delta
   * @param {String} description
   * @api public
   */

  approximately: function(value, delta, description) {
    this.assert(
      Math.abs(this.obj - value) <= delta
      , function(){ return 'expected ' + this.inspect + ' to be approximately ' + value + " +- " + delta + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not be approximately ' + value + " +- " + delta + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert typeof.
   *
   * @param {*} type
   * @param {String} description
   * @api public
   */
  type: function(type, description){
    this.assert(
        type == typeof this.obj
      , function(){ return 'expected ' + this.inspect + ' to have type ' + type + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' not to have type ' + type  + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert instanceof.
   *
   * @param {Function} constructor
   * @param {String} description
   * @api public
   */

  instanceof: function(constructor, description){
    var name = constructor.name;
    this.assert(
        this.obj instanceof constructor
      , function(){ return 'expected ' + this.inspect + ' to be an instance of ' + name + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' not to be an instance of ' + name + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert if given object is a function.
   */
  get Function(){
    this.assert(
      util.isFunction(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be a function' }
      , function(){ return 'expected ' + this.inspect + ' not to be a function' });
    return this;
  },

  /**
   * Assert given object is an object.
   */
  get Object(){
    this.assert(
      util.isObject(this.obj) && !Array.isArray(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be an object' }
      , function(){ return 'expected ' + this.inspect + ' not to be an object' });
    return this;
  },

  /**
   * Assert given object is a string
   */
  get String(){
    this.assert(
      util.isString(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be a string' }
      , function(){ return 'expected ' + this.inspect + ' not to be a string' });
    return this;
  },

  /**
   * Assert given object is an array
   */
  get Array(){
    this.assert(
      Array.isArray(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be an array' }
      , function(){ return 'expected ' + this.inspect + ' not to be an array' });
    return this;
  },

  /**
   * Assert given object is a number. NaN and Infinity are not numbers.
   */
  get Number(){
    this.assert(
      util.isNumber(this.obj) && isFinite(this.obj) && !isNaN(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be a number' }
      , function(){ return 'expected ' + this.inspect + ' not to be a number' });
    return this;
  },

  /**
   * Assert given object is a boolean
   */
  get Boolean(){
    this.assert(
      util.isBoolean(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be a boolean' }
      , function(){ return 'expected ' + this.inspect + ' not to be a boolean' });
    return this;
  },

  /**
   * Assert given object is an error
   */
  get Error() {
    this.assert(
      util.isError(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be an error' }
      , function(){ return 'expected ' + this.inspect + ' not to be an error' });
    return this;
  },
  /**
   * Assert numeric value above _n_.
   *
   * @param {Number} n
   * @param {String} description
   * @api public
   */

  above: function(n, description){
    this.assert(
        this.obj > n
      , function(){ return 'expected ' + this.inspect + ' to be above ' + n + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to be below ' + n + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert numeric value below _n_.
   *
   * @param {Number} n
   * @param {String} description
   * @api public
   */

  below: function(n, description){
    this.assert(
        this.obj < n
      , function(){ return 'expected ' + this.inspect + ' to be below ' + n + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to be above ' + n + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert string value matches _regexp_.
   *
   * @param {RegExp} regexp
   * @param {String} description
   * @api public
   */

  match: function(regexp, description){
    this.assert(
        regexp.exec(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to match ' + regexp + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' not to match ' + regexp + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert property "length" exists and has value of _n_.
   *
   * @param {Number} n
   * @param {String} description
   * @api public
   */

  length: function(n, description){
    this.obj.should.have.property('length');
    var len = this.obj.length;
    this.assert(
        n == len
      , function(){ return 'expected ' + this.inspect + ' to have a length of ' + n + ' but got ' + len + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not have a length of ' + len + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert property _name_ exists, with optional _val_.
   *
   * @param {String} name
   * @param {*} [val]
   * @param {String} description
   * @api public
   */

  property: function(name, val, description){
    if (this.negate && undefined !== val) {
      if (undefined === this.obj[name]) {
        throw new Error(this.inspect + ' has no property ' + should.inspect(name) + (description ? " | " + description : ""));
      }
    } else {
      this.assert(
          undefined !== this.obj[name]
        , function(){ return 'expected ' + this.inspect + ' to have a property ' + should.inspect(name) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not have a property ' + should.inspect(name) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    }

    if (undefined !== val) {
      this.assert(
          val === this.obj[name]
        , function(){ return 'expected ' + this.inspect + ' to have a property ' + should.inspect(name)
          + ' of ' + should.inspect(val) + ', but got ' + should.inspect(this.obj[name]) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not have a property ' + should.inspect(name) + ' of ' + should.inspect(val) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    }

    this.obj = this.obj[name];
    return this;
  },
  /**
   * Asset have given properties
   * @param {Array|String ...} names
   * @api public
   */
  properties: function(names) {
    var str
      , ok = true;

    names = names instanceof Array
      ? names
      : Array.prototype.slice.call(arguments);

    var len = names.length;

    if (!len) throw new Error('names required');

    // make sure they're all present
    ok = names.every(function(name){
      return this.obj[name] !== undefined;
    }, this);

    // key string
    if (len > 1) {
      names = names.map(function(name){
        return should.inspect(name);
      });
      var last = names.pop();
      str = names.join(', ') + ', and ' + last;
    } else {
      str = should.inspect(names[0]);
    }

    // message
    str = 'have ' + (len > 1 ? 'properties ' : 'a property ') + str;

    this.assert(
      ok
      , function(){ return 'expected ' + this.inspect + ' to ' + str }
      , function(){ return 'expected ' + this.inspect + ' to not ' + str });

    return this;
  },

  /**
   * Assert own property _name_ exists.
   *
   * @param {String} name
   * @param {String} description
   * @api public
   */

  ownProperty: function(name, description){
    this.assert(
      hasOwnProperty.call(this.obj, name)
      , function(){ return 'expected ' + this.inspect + ' to have own property ' + should.inspect(name) + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not have own property ' + should.inspect(name) + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    this.obj = this.obj[name];
    return this;
  },

  /**
   * Assert that string starts with `str`.
   * @param {String} str
   * @param {String} description
   * @api public
   */

  startWith: function(str, description) {
    this.assert(0 === this.obj.indexOf(str)
    , function() { return 'expected ' + this.inspect + ' to start with ' + should.inspect(str) + (description ? " | " + description : "") }
    , function() { return 'expected ' + this.inspect + ' to not start with ' + should.inspect(str) + (description ? " | " + description : "") }
    , void 0
    , void 0
    , description);
    return this;
  },

  /**
   * Assert that string ends with `str`.
   * @param {String} str
   * @param {String} description
   * @api public
   */

  endWith: function(str, description) {
    this.assert(-1 !== this.obj.indexOf(str, this.obj.length - str.length)
    , function() { return 'expected ' + this.inspect + ' to end with ' + should.inspect(str) + (description ? " | " + description : "") }
    , function() { return 'expected ' + this.inspect + ' to not end with ' + should.inspect(str) + (description ? " | " + description : "") }
    , void 0
    , void 0
    , description);
    return this;
  },

  /**
   * Assert that `obj` is present via `.indexOf()` or that `obj` contains some sub-object.
   *
   * @param {*} obj
   * @param {String} description
   * @api public
   */

  include: function(obj, description){
    if (!Array.isArray(this.obj) && !util.isString(this.obj)){
      var cmp = {};
      for (var key in obj) cmp[key] = this.obj[key];
      this.assert(
          eql(cmp, obj)
        , function(){ return 'expected ' + this.inspect + ' to include an object equal to ' + should.inspect(obj) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not include an object equal to ' + should.inspect(obj) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    } else {
      this.assert(
          ~this.obj.indexOf(obj)
        , function(){ return 'expected ' + this.inspect + ' to include ' + should.inspect(obj) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not include ' + should.inspect(obj) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    }
    return this;
  },

  /**
   * Assert that an object equal to `obj` is present.
   *
   * @param {Array} obj
   * @param {String} description
   * @api public
   */

  includeEql: function(obj, description){
    this.assert(
      this.obj.some(function(item) { return eql(obj, item); })
      , function(){ return 'expected ' + this.inspect + ' to include an object equal to ' + should.inspect(obj) + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not include an object equal to ' + should.inspect(obj) + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert exact keys or inclusion of keys by using
   * the `.include` modifier.
   *
   * @param {Array|String ...} keys
   * @api public
   */

  keys: function(keys){
    var str
      , ok = true;

    keys = keys instanceof Array
      ? keys
      : Array.prototype.slice.call(arguments);

    if (!keys.length) throw new Error('keys required');

    var actual = Object.keys(this.obj)
      , len = keys.length;

    // make sure they're all present
    ok = keys.every(function(key){
      return ~actual.indexOf(key);
    });

    // matching length
    ok = ok && keys.length == actual.length;

    // key string
    if (len > 1) {
      keys = keys.map(function(key){
        return should.inspect(key);
      });
      var last = keys.pop();
      str = keys.join(', ') + ', and ' + last;
    } else {
      str = should.inspect(keys[0]);
    }

    // message
    str = 'have ' + (len > 1 ? 'keys ' : 'key ') + str;

    this.assert(
        ok
      , function(){ return 'expected ' + this.inspect + ' to ' + str }
      , function(){ return 'expected ' + this.inspect + ' to not ' + str });

    return this;
  },

  /**
   * Assert that header `field` has the given `val`.
   *
   * @param {String} field
   * @param {String} val
   * @return {Assertion} for chaining
   * @api public
   */

  header: function(field, val){
    this.obj.should
      .have.property('headers').and
      .have.property(field.toLowerCase(), val);
    return this;
  },

  /**
   * Assert `.statusCode` of `code`.
   *
   * @param {Number} code
   * @return {Assertion} for chaining
   * @api public
   */

  status:  function(code){
    this.obj.should.have.property('statusCode');
    var status = this.obj.statusCode;

    this.assert(
        code == status
      , function(){ return 'expected response code of ' + code + ' ' + should.inspect(statusCodes[code])
        + ', but got ' + status + ' ' + should.inspect(statusCodes[status]) }
      , function(){ return 'expected to not respond with ' + code + ' ' + should.inspect(statusCodes[code]) });

    return this;
  },

  /**
   * Assert that this response has content-type: application/json.
   *
   * @return {Assertion} for chaining
   * @api public
   */

  get json() {
    this.obj.should.have.property('headers');
    this.obj.headers.should.have.property('content-type');
    this.obj.headers['content-type'].should.include('application/json');
    return this;
  },

  /**
   * Assert that this response has content-type: text/html.
   *
   * @return {Assertion} for chaining
   * @api public
   */

  get html() {
    this.obj.should.have.property('headers');
    this.obj.headers.should.have.property('content-type');
    this.obj.headers['content-type'].should.include('text/html');
    return this;
  },

  /**
   * Assert that this function will or will not
   * throw an exception.
   *
   * @return {Assertion} for chaining
   * @api public
   */

  throw: function(message){
    var fn = this.obj
      , err = {}
      , errorInfo = ''
      , ok = true;

    try {
      fn();
      ok = false;
    } catch (e) {
      err = e;
    }

    if (ok) {
      if ('string' == typeof message) {
        ok = message == err.message;
      } else if (message instanceof RegExp) {
        ok = message.test(err.message);
      } else if ('function' == typeof message) {
        ok = err instanceof message;
      }

      if (message && !ok) {
        if ('string' == typeof message) {
          errorInfo = " with a message matching '" + message + "', but got '" + err.message + "'";
        } else if (message instanceof RegExp) {
          errorInfo = " with a message matching " + message + ", but got '" + err.message + "'";
        } else if ('function' == typeof message) {
          errorInfo = " of type " + message.name + ", but got " + err.constructor.name;
        }
      }
    }

    this.assert(
        ok
      , function(){ return 'expected an exception to be thrown' + errorInfo }
      , function(){ return 'expected no exception to be thrown, got "' + err.message + '"' });

    return this;
  }
};

/**
 * Aliases.
 */

(function alias(name, as){
  Assertion.prototype[as] = Assertion.prototype[name];
  return alias;
})
('instanceof', 'instanceOf')
('throw', 'throwError')
('length', 'lengthOf')
('keys', 'key')
('ownProperty', 'haveOwnProperty')
('above', 'greaterThan')
('below', 'lessThan')
('include', 'contain')
('equal', 'exactly');


});
require.register("should.js/lib/assert.js", function(exports, require, module){
// UTILITY
var util = require('./util');

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  this.message = options.message || getMessage(this);
  var stackStartFunction = options.stackStartFunction || fail;
  Error.captureStackTrace(this, stackStartFunction);
};

// assert.AssertionError instanceof Error
assert.AssertionError.prototype = Object.create(Error.prototype);
assert.AssertionError.prototype.constructor = assert.AssertionError;

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

});
require.register("should.js/lib/http.js", function(exports, require, module){
//copy of node http module status codes
//https://github.com/joyent/node/blob/master/lib/_http_server.js

var STATUS_CODES = exports.STATUS_CODES = {
  100 : 'Continue',
  101 : 'Switching Protocols',
  102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
  200 : 'OK',
  201 : 'Created',
  202 : 'Accepted',
  203 : 'Non-Authoritative Information',
  204 : 'No Content',
  205 : 'Reset Content',
  206 : 'Partial Content',
  207 : 'Multi-Status',               // RFC 4918
  300 : 'Multiple Choices',
  301 : 'Moved Permanently',
  302 : 'Moved Temporarily',
  303 : 'See Other',
  304 : 'Not Modified',
  305 : 'Use Proxy',
  307 : 'Temporary Redirect',
  400 : 'Bad Request',
  401 : 'Unauthorized',
  402 : 'Payment Required',
  403 : 'Forbidden',
  404 : 'Not Found',
  405 : 'Method Not Allowed',
  406 : 'Not Acceptable',
  407 : 'Proxy Authentication Required',
  408 : 'Request Time-out',
  409 : 'Conflict',
  410 : 'Gone',
  411 : 'Length Required',
  412 : 'Precondition Failed',
  413 : 'Request Entity Too Large',
  414 : 'Request-URI Too Large',
  415 : 'Unsupported Media Type',
  416 : 'Requested Range Not Satisfiable',
  417 : 'Expectation Failed',
  418 : 'I\'m a teapot',              // RFC 2324
  422 : 'Unprocessable Entity',       // RFC 4918
  423 : 'Locked',                     // RFC 4918
  424 : 'Failed Dependency',          // RFC 4918
  425 : 'Unordered Collection',       // RFC 4918
  426 : 'Upgrade Required',           // RFC 2817
  428 : 'Precondition Required',      // RFC 6585
  429 : 'Too Many Requests',          // RFC 6585
  431 : 'Request Header Fields Too Large',// RFC 6585
  500 : 'Internal Server Error',
  501 : 'Not Implemented',
  502 : 'Bad Gateway',
  503 : 'Service Unavailable',
  504 : 'Gateway Time-out',
  505 : 'HTTP Version Not Supported',
  506 : 'Variant Also Negotiates',    // RFC 2295
  507 : 'Insufficient Storage',       // RFC 4918
  509 : 'Bandwidth Limit Exceeded',
  510 : 'Not Extended',               // RFC 2774
  511 : 'Network Authentication Required' // RFC 6585
};

module.exports.STATUS_CODES = STATUS_CODES;
});
require.register("should.js/lib/eql.js", function(exports, require, module){
// Taken from node's assert module, because it sucks
// and exposes next to nothing useful.
var util = require('./util');

module.exports = _deepEqual;

var pSlice = Array.prototype.slice;

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}


function objEquiv (a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (util.isArguments(a)) {
    if (!util.isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try{
    var ka = Object.keys(a),
      kb = Object.keys(b),
      key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

});
require.register("should.js/lib/util.js", function(exports, require, module){
/**
 * Check if given obj just a primitive type wrapper
 * @param {Object} obj
 * @returns {boolean}
 * @api private
 */
exports.isWrapperType = function(obj) {
    return isNumber(obj) || isString(obj) || isBoolean(obj);
}

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     utils.merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api private
 */

exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

function isNumber(arg) {
  return typeof arg === 'number' || arg instanceof Number;
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string' || arg instanceof String;
}

function isBoolean(arg) {
  return typeof arg === 'boolean' || arg instanceof Boolean;
}
exports.isBoolean = isBoolean;

exports.isString = isString;

function isBuffer(arg) {
  return typeof Buffer !== 'undefined' && arg instanceof Buffer;
}

exports.isBuffer = isBuffer;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

exports.isObject = isObject;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;


function isArguments(object) {
  return objectToString(object) === '[object Arguments]';
}

exports.isArguments = isArguments;

function isFunction(arg) {
  return typeof arg === 'function' || arg instanceof Function;
};

exports.isFunction = isFunction;

function isError(e) {
  return isObject(e) && objectToString(e) === '[object Error]';
}
exports.isError = isError;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


});
require.alias("should.js/index.js", "should.js/index.js");if (typeof exports == "object") {
  module.exports = require("should.js");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("should.js"); });
} else {
  this["should"] = require("should.js");
}})();