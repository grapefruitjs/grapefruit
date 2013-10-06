var Vector = require('../math/Vector'),
    Circle = require('../math/Circle'),
    Rectangle = require('../math/Rectangle'),
    Polygon = require('../math/Polygon');

/**
 * The grapefruit utility object, used for misc functions used throughout the code base
 *
 * @class utils
 * @extends Object
 * @namespace gf
 */
var utils = module.exports = {
    _arrayDelim: /[|,]/,
    /**
     * An empty function that performs no action
     *
     * @method noop
     */
    noop: function() {},
    /**
     * Gets the absolute url from a relative one
     *
     * @method getAbsoluteUrl
     * @param url {String} The relative url to translate into absolute
     * @return {String} The absolute url (fully qualified)
     */
    getAbsoluteUrl: function(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
    },
    /**
     * Performs an ajax request, and manages the callbacks passed in
     *
     * @method ajax
     * @param settings {Object} The settings of the ajax request, similar to jQuery's ajax function
     * @return {XMLHttpRequest|ActiveXObject} An XHR object
     */
    ajax: function(sets) {
        //base settings
        sets = sets || {};
        sets.method = sets.method || 'GET';
        sets.dataType = sets.dataType || 'text';

        if(!sets.url)
            throw 'No URL passed to ajax';

        //callbacks
        sets.progress = sets.progress || utils.noop;
        sets.load = sets.load || utils.noop;
        sets.error = sets.error || utils.noop;
        sets.abort = sets.abort || utils.noop;
        sets.complete = sets.complete || utils.noop;

        var xhr = utils.createAjaxRequest(),
            protocol = utils.getAbsoluteUrl(sets.url).split('/')[0];

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                var res = xhr.response || xhr.responseText,
                    err = null;

                //The 'file:' protocol doesn't give response codes
                if(protocol !== 'file:' && xhr.status !== 200)
                    err = 'Non-200 status code returned: ' + xhr.status;

                if(!err && typeof res === 'string') {
                    if(sets.dataType === 'json') {
                        try {
                            res = JSON.parse(res);
                        } catch(e) {
                            err = e;
                        }
                    } else if(sets.dataType === 'xml') {
                        try {
                            res = utils.parseXML(res);
                        } catch(e) {
                            err = e;
                        }
                    }
                }

                if(err) {
                    if(sets.error) sets.error.call(xhr, err);
                } else {
                    if(sets.load) sets.load.call(xhr, res);
                }
            }
        };

        //chrome doesn't support json responseType, some browsers choke on XML type
        if(sets.dataType !== 'json' && sets.dataType !== 'xml')
            xhr.responseType = sets.dataType;
        else
            xhr.responseType = 'text';

        xhr.open(sets.method, sets.url, true);
        xhr.send();

        return xhr;
    },
    /**
     * Wraps XMLHttpRequest in a cross-browser way.
     *
     * @method AjaxRequest
     * @return {XMLHttpRequest|ActiveXObject}
     */
    //from pixi.js
    createAjaxRequest: function() {
        //activeX versions to check for in IE
        var activexmodes = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];

        //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
        if(window.ActiveXObject) {
            for(var i=0; i<activexmodes.length; i++) {
                try {
                    return new window.ActiveXObject(activexmodes[i]);
                }
                catch(e) {
                    //suppress error
                }
            }
        }
        // if Mozilla, Safari etc
        else if(window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        else {
            return false;
        }
    },
    /**
     * This will take values and override the passed obj's properties with those values.
     * The difference from a normal object extend is that this will try to massage the passed
     * value into the same type as the object's property. Also if the key for the value is not
     * in the original object, it is not copied.
     *
     * @method setValues
     * @param obj {Object} The object to extend the values into
     * @param values {Object} The values to put into the object
     * @return {Object} returns the updated object
     * @example
     *      var obj = { vec: new Vector(), arr: [] },
     *          vals = { vec: '2|5', arr: '5|10|11' };
     *      utils.setValues(obj, vals);
     *      //now obj is:
     *      // { vec: Vector(2, 5), arr: [5, 10, 11] }
     *      
     */
    //similar to https://github.com/mrdoob/three.js/blob/master/src/materials/Material.js#L42
    setValues: function(obj, values) {
        if(!values) return;

        for(var key in values) {
            var newVal = values[key];

            if(newVal === undefined) {
                //console.warn('Object parameter '' + key + '' is undefined.');
                continue;
            }
            if(key in obj) {
                var curVal = obj[key];

                //massage strings into numbers
                if(typeof curVal === 'number' && typeof newVal === 'string') {
                    var n;
                    if(newVal.indexOf('0x') === 0) n = parseInt(newVal, 16);
                    else n = parseInt(newVal, 10);

                    if(!isNaN(n))
                        obj[key] = n;
                    /*else
                        console.warn('Object parameter '' + key + '' evaluated to NaN, using default. Value passed: ' + newVal);*/

                }
                //massage vectors
                else if(curVal instanceof Vector && newVal instanceof Array) {
                    curVal.set(parseFloat(newVal[0], 10) || 0, parseFloat(newVal[1], 10) || parseFloat(newVal[0], 10) || 0);
                } else if(curVal instanceof Vector && typeof newVal === 'string') {
                    var a = newVal.split(utils._arrayDelim, 2);
                    curVal.set(parseFloat(a[0], 10) || 0, parseFloat(a[1], 10) || parseFloat(a[0], 10) || 0);
                } else if(curVal instanceof Vector && typeof newVal === 'number') {
                    curVal.set(newVal, newVal);
                }
                //massage points
                else if(curVal.x !== undefined && newVal instanceof Array) {
                    curVal.x = parseFloat(newVal[0], 10) || 0;
                    curVal.y = parseFloat(newVal[1], 10) || parseFloat(newVal[0], 10) || 0;
                } else if(curVal.x !== undefined && typeof newVal === 'string') {
                    var a2 = newVal.split(utils._arrayDelim, 2);
                    curVal.x = parseFloat(a2[0], 10) || 0;
                    curVal.y = parseFloat(a2[1], 10) || parseFloat(a2[0], 10) || 0;
                } else if(curVal.x !== undefined && typeof newVal === 'number') {
                    curVal.x = newVal;
                    curVal.y = newVal;
                }
                //massage arrays
                else if(curVal instanceof Array && typeof newVal === 'string') {
                    obj[key] = newVal.split(utils._arrayDelim);
                    for(var i = 0, il = obj[key].length; i < il; ++i) {
                        var val = obj[key][i];
                        if(!isNaN(val)) obj[key][i] = parseFloat(val, 10);
                    }
                } else {
                    obj[key] = newVal;
                }
            }
        }

        return obj;
    },
    /**
     * From jQuery.extend, extends one object into another
     * taken straight from jQuery 2.0.3
     *
     * @method extend
     */
    extend: function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        //if (length === i) {
        //    target = this;
        //    --i;
        //}

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            options = arguments[i];
            if (options !== null && options !== undefined) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (utils.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && utils.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = utils.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    },
    /**
     * From jQuery.isPlainObject, checks if an object is a plain object
     * taken straight from jQuery 2.0.3
     *
     * @method isPlainObject
     */
    isPlainObject: function(obj) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof obj !== 'object' || obj.nodeType || obj === obj.window) {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try {
            if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
                return false;
            }
        } catch(e) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    },
    /**
     * Get the DOM offset values of any given element
     *
     * @method getOffset
     * @param element {HTMLElement} The targeted element that we want to retrieve the offset
     * @return {Vector} The offset of the element
     */
    getOffset: function(element) {
        var box = element.getBoundingClientRect(),
            clientTop = element.clientTop || document.body.clientTop || 0,
            clientLeft = element.clientLeft || document.body.clientLeft || 0,
            scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop,
            scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

        return new Vector(
            box.left + scrollLeft - clientLeft,
            box.top + scrollTop - clientTop
        );
    },
    parseHitArea: function(hv) {
        var ha;

        //odd number of values
        if(hv.length % 2 !== 0 && hv.length !== 3) {
            throw 'Strange number of values for hitArea! Should be a flat array of values, like: [x,y,r] for a circle, [x,y,w,h] for a rectangle, or [x,y,x,y,...] for other polygons.';
        }

        //a circle x,y,r
        if(hv.length === 3) {
            ha = new Circle(hv[0], hv[1], hv[2]);
        }
        //a rectangle x,y,w,h
        else if(hv.length === 4) {
            ha = new Rectangle(hv[0], hv[1], hv[2], hv[3]);
        }
        //generic polygon
        else {
            ha = new Polygon(hv);
        }

        return ha;
    },
    parseTiledProperties: function(obj) {
        if(!obj || obj.__tiledparsed)
            return obj;

        for(var k in obj) {
            var v = obj[k];

            //try to massage numbers
            if(!isNaN(v))
                obj[k] = parseFloat(v, 10);
            //true values
            else if(v === 'true')
                obj[k] = true;
            //false values
            else if(v === 'false')
                obj[k] = false;
            //anything else is either a string or json, try json
            else {
                try{
                    v = JSON.parse(v);
                    obj[k] = v;
                } catch(e) {}
            }
        }

        //after parsing, check some other things
        if(obj.hitArea)
            obj.hitArea = utils.parseHitArea(obj.hitArea);

        if(obj.static || obj.sensor) {
            obj.mass = Infinity;
            obj.inertia = Infinity;
        }

        obj.__tiledparsed = true;

        return obj;
    },
    log: window.console && window.console.log,
    warn: window.console && window.console.warn,
    error: window.console && window.console.error
};

//XML Parser
if(typeof window.DOMParser !== 'undefined') {
    utils.parseXML = function(xmlStr) {
        return (new window.DOMParser()).parseFromString(xmlStr, 'text/xml');
    };
} else if(typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
    utils.parseXML = function(xmlStr) {
        var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = 'false';
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    //node.js environment
    /*if(__isNode) {
        utils.parseXML = function(xmlStr) {
            var DOMParser = require('xmldom').DOMParser;
            return (new DOMParser()).parseFromString(xmlStr, "text/xml");
        };
    } else {*/
        utils.warn('XML parser not available, trying to parse any XML will result in an error.');
        utils.parseXML = function() {
            throw 'Trying to parse XML, but not XML parser is available in this environment';
        };
    //}
}
