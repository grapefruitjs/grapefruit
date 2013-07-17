/**
 * The grapefruit utility object, used for misc functions used throughout the code base
 *
 * @class utils
 * @extends Object
 * @namespace gf
 */
 gf.utils = {
    _arrayDelim: /[|,]/,
    /**
     * Ensures that some input is a vector, converts strings and arrays into vector objects
     *
     * @method ensureVector
     * @param vec {Array|String|Vector} The object to ensure becomes a vector
     * @return {Vector} The vector created with the passed values, if the values can't be made
     *      into a Vector, then a new Vector with 0,0 is returned
     */
    ensureVector: function(vec) {
        if(vec instanceof gf.Vector)
            return vec;

        var a = vec;
        if(typeof vec === 'string')
            a = vec.split(gf.utils._arrayDelim);

        if(a instanceof Array) {
            switch(a.length) {
                case 1: return new gf.Vector(parseFloat(a[0], 10) || 0, parseFloat(a[0], 10) || 0);
                case 2: return new gf.Vector(parseFloat(a[0], 10) || 0, parseFloat(a[1], 10) || 0);
            }
        }
        else if(typeof a === 'number') {
            return new gf.Vector(a, a);
        }
        else {
            return new gf.Vector();
        }
    },
    /**
     * An empty function that performs no action
     *
     * @method noop
     */
    noop: function() {},
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
        sets.progress = sets.progress || gf.utils.noop;
        sets.load = sets.load || gf.utils.noop;
        sets.error = sets.error || gf.utils.noop;
        sets.abort = sets.abort || gf.utils.noop;
        sets.complete = sets.complete || gf.utils.noop;

        var xhr = gf.utils.createAjaxRequest();

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                var res = xhr.response || xhr.responseText,
                    err = null;

                if(xhr.status !== 200)
                    err = 'Non-200 status code returned: ' + xhr.status;

                if(!err && typeof res === 'string' && sets.dataType === 'json') {
                    try {
                        res = JSON.parse(res);
                    } catch(e) {
                        err = e;
                    }
                }

                if(err) {
                    if(sets.error) sets.error.call(xhr, err);
                } else {
                    if(sets.load) sets.load.call(xhr, res);
                }
            }
        };

        //chrome doesn't support json responseType
        if(sets.dataType !== 'json')
            xhr.responseType = sets.dataType;

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
     *      var obj = { vec: new gf.Vector(), arr: [] },
     *          vals = { vec: '2|5', arr: '5|10|11' };
     *      gf.setValues(obj, vals);
     *      //now obj is:
     *      // { vec: gf.Vector(2, 5), arr: [5, 10, 11] }
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
                else if(curVal instanceof gf.Vector && newVal instanceof Array) {
                    curVal.set(parseFloat(newVal[0], 10) || 0, parseFloat(newVal[1], 10) || parseFloat(newVal[0], 10) || 0);
                } else if(curVal instanceof gf.Vector && typeof newVal === 'string') {
                    var a = newVal.split(gf.utils._arrayDelim, 2);
                    curVal.set(parseFloat(a[0], 10) || 0, parseFloat(a[1], 10) || parseFloat(a[0], 10) || 0);
                } else if(curVal instanceof gf.Vector && typeof newVal === 'number') {
                    curVal.set(newVal, newVal);
                }
                //massage points
                else if(curVal instanceof gf.Point && newVal instanceof Array) {
                    curVal.x = parseFloat(newVal[0], 10) || 0;
                    curVal.y = parseFloat(newVal[1], 10) || parseFloat(newVal[0], 10) || 0;
                } else if(curVal instanceof gf.Point && typeof newVal === 'string') {
                    var a2 = newVal.split(gf.utils._arrayDelim, 2);
                    curVal.x = parseFloat(a2[0], 10) || 0;
                    curVal.y = parseFloat(a2[1], 10) || parseFloat(a2[0], 10) || 0;
                } else if(curVal instanceof gf.Point && typeof newVal === 'number') {
                    curVal.x = newVal;
                    curVal.y = newVal;
                }
                //massage arrays
                else if(curVal instanceof Array && typeof newVal === 'string') {
                    obj[key] = newVal.split(gf.utils._arrayDelim);
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
    }
};
