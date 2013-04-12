/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @module gf
 * @class utils
 */
 gf.utils = {
    _arrayDelim: '|',
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
                case 1: return new gf.Vector(parseInt(a[0], 10) || 0, parseInt(a[0], 10) || 0);
                case 2: return new gf.Vector(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
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
     * @return {AjaxRequest} An XHR object
     */
    ajax: function(sets) {
        //base settings
        sets = sets || {};
        sets.method = sets.method || 'GET';
        sets.dataType = sets.dataType || 'text';

        //callbacks
        sets.progress = sets.progress || gf.utils.noop;
        sets.load = sets.load || gf.utils.noop;
        sets.error = sets.error || gf.utils.noop;
        sets.abort = sets.abort || gf.utils.noop;
        sets.complete = sets.complete || gf.utils.noop;

        var xhr = new gf.utils.AjaxRequest();

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                var res = xhr.responseText,
                    err = null;

                if(sets.dataType === 'json') {
                    try { res = JSON.parse(res); }
                    catch(e) { err = e; }
                }

                if(xhr.status !== 200)
                    err = 'Non-200 status code returned: ' + xhr.status;

                if(err) {
                    if(sets.error) sets.error.call(xhr, err);
                } else {
                    if(sets.load) sets.load.call(xhr, res);
                }
            }
        };

        xhr.open(sets.method, sets.url, true);
        xhr.send();

        return xhr;
    },
    /**
     * Wraps XMLHttpRequest in a cross-browser way.
     *
     * @method AjaxRequest
     * @return {ActiveXObject|XMLHttpRequest}
     */
    //from pixi.js
    AjaxRequest: function() {
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
                    curVal.set(parseInt(newVal[0], 10) || 0, parseInt(newVal[1], 10) || parseInt(newVal[0], 10) || 0);
                } else if(curVal instanceof gf.Vector && typeof newVal === 'string') {
                    var a = newVal.split(gf.utils._arrayDelim, 2);
                    curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || parseInt(a[0], 10) || 0);
                } else if(curVal instanceof gf.Vector && typeof newVal === 'number') {
                    curVal.set(newVal, newVal);
                }
                //massage points
                else if(curVal instanceof gf.Point && newVal instanceof Array) {
                    curVal.x = parseInt(newVal[0], 10) || 0;
                    curVal.y = parseInt(newVal[1], 10) || parseInt(newVal[0], 10) || 0;
                } else if(curVal instanceof gf.Point && typeof newVal === 'string') {
                    var a2 = newVal.split(gf.utils._arrayDelim, 2);
                    curVal.x = parseInt(a2[0], 10) || 0;
                    curVal.y = parseInt(a2[1], 10) || parseInt(a2[0], 10) || 0;
                } else if(curVal instanceof gf.Point && typeof newVal === 'number') {
                    curVal.x = newVal;
                    curVal.y = newVal;
                }
                //massage arrays
                else if(curVal instanceof Array && typeof newVal === 'string') {
                    obj[key] = newVal.split(gf.utils._arrayDelim);
                    for(var i = 0, il = obj[key].length; i < il; ++i) {
                        var val = obj[key][i];
                        if(!isNaN(val)) obj[key][i] = parseInt(val, 10);
                    }
                } else {
                    obj[key] = newVal;
                }
            }
        }

        return obj;
    },
    /**
     * Clamps a number between two values.
     *
     * @method clamp
     * @param num {Number} The number to clamp
     * @param min {Number} The minimum value the number is allowed to be
     * @param max {Number} The maximum value the number is allowed to be
     * @return {Number} The clamped value
     */
    clamp: function(n, min, max) {
        return Math.max(min, Math.min(max, n));
    },
    ////////////////////////////////////////////////////////////////////////////////
    // DOM Manipulation stuff will be removed with the GUI rewrite
    getPosition: function(o) {
        var l = o.offsetLeft,
            t = o.offsetTop;

        while(!!(o = o.offsetParent)) {
            l += o.offsetLeft;
            t += o.offsetTop;
        }

        return {
            top: t,
            left: l
        };
    },
    getStyle: function(elm, prop) {
        var style = window.getComputedStyle(elm),
            val = style.getPropertyValue(prop).replace(/px|em|%|pt/, '');

        if(!isNaN(val))
            val = parseInt(val, 10);

        return val;
    },
    setStyle: function(elm, prop, value) {
        var style = window.getComputedStyle(elm);

        return style.setPropertyValue(prop, value);
    },
    //Some things stolen from jQuery
    getOffset: function(elem) {
        var doc = elem && elem.ownerDocument,
            docElem = doc.documentElement,
            box;

        try {
            box = elem.getBoundingClientRect();
        } catch(e) {}

        // Make sure we're not dealing with a disconnected DOM node
        if (!box || !(docElem !== elem && (docElem.contains ? docElem.contains(elem) : true))) {  //(!box || !jQuery.contains(docElem, elem)) {
            return box ? {
                top: box.top,
                left: box.left
            } : {
                top: 0,
                left: 0
            };
        }

        var body = doc.body,
            win = window,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
            top = box.top + scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left
        };
    }
    /////////////////////////////////////////////////////////////////////////////
};
