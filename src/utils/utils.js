(function() {
    gf.utils = {
        applyFriction: function(vel, friction) {
            return (
                        vel + friction < 0 ? 
                        vel + (friction * gf.game._delta) : 
                        (
                            vel - friction > 0 ? 
                            vel - (friction * gf.game._delta) : 
                            0
                        )
                    );
        },
        _arrayDelim: '|',
        ensureVector: function(vec) {
            if(vec instanceof gf.Vector)
                return vec;

            var a = vec;
            if(typeof vec == 'string')
                a = vec.split(gf.utils._arrayDelim);

            if(a instanceof Array) {
                switch(a.length) {
                    case 1: return new gf.Vector(parseInt(a[0], 10) || 0, parseInt(a[0], 10) || 0);
                    case 2: return new gf.Vector(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
                }
            }
            else {
                return new gf.Vector();
            }
        },
        numToHexColor: function(num) { return ('00000000' + num.toString(16)).substr(-8); },
        noop: function() {},
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

            //start the XHR request
            var xhr = new XMLHttpRequest();

            xhr.addEventListener('progress', sets.progress.bind(xhr), false);
            xhr.addEventListener('error', sets.error.bind(xhr), false);
            xhr.addEventListener('abort', sets.abort.bind(xhr), false);
            xhr.addEventListener('loadend', sets.complete.bind(xhr), false);
            xhr.addEventListener('load', function() {
                var res = xhr.response,
                    err = null;

                if(sets.dataType === 'json' && typeof res === 'string') {
                    try { res = JSON.parse(res); }
                    catch(e) { err = e; }
                }

                if(err) {
                    if(sets.error) sets.error.call(xhr, err);
                } else {
                    if(sets.load) sets.load.call(xhr, res);
                }
            }, false);

            xhr.open(sets.method, sets.url, true);
            xhr.send();
        },
        //similar to https://github.com/mrdoob/three.js/blob/master/src/materials/Material.js#L42
        setValues: function(obj, values) {
            if(!values) return;

            for(var key in values) {
                var newVal = values[key];

                if(newVal === undefined) {
                    console.warn('Object parameter "' + key + '" is undefined.');
                    continue;
                }
                if(key in obj) {
                    var curVal = obj[key];

                    //type massaging
                    if(typeof curVal === 'number' && typeof newVal === 'string') {
                        var n;
                        if(newVal.indexOf('0x') === 0) n = parseInt(newVal, 16);
                        else n = parseInt(newVal, 10);

                        if(!isNaN(n))
                            obj[key] = n;
                        else
                            console.warn('Object parameter "' + key + '" evaluated to NaN, using default. Value passed: ' + newVal);

                    } else if(curVal instanceof THREE.Color && typeof newVal === 'number') {
                        curVal.setHex(newVal);
                    } else if(curVal instanceof gf.Vector && newVal instanceof Array) {
                        curVal.set(parseInt(newVal[0], 10) || 0, parseInt(newVal[1], 10) || 0);
                    } else if(curVal instanceof gf.Vector && typeof newVal === 'string') {
                        var a = newVal.split(gf.utils._arrayDelim, 2);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
                    } else if(curVal instanceof THREE.Vector3 && typeof newVal === 'string') {
                        var a = newVal.split(gf.utils._arrayDelim, 3);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0);
                    } else if(curVal instanceof Array && typeof newVal === 'string') {
                        obj[key] = newVal.split(gf.utils._arrayDelim);
                        gf.utils.each(obj[key], function(i, val) {
                            if(!isNaN(val)) obj[key][i] = parseInt(val, 10);
                        });
                    } else {
                        obj[key] = newVal;
                    }
                }
            }

            return obj;
        },
        clamp: function(n, min, max) { return Math.max(min, Math.min(max, n)); },
        isPowerOfTwo: function(n) { return ((n & (n - 1)) === 0); },
        nextPowerofTwo: function(n) { return Math.pow(2, Math.ceil(Math.log(n)/Math.LN2)); },
        //http://jsperf.com/find-power
        getPowerofTwoPower: function(n) {
            if(!gf.utils.isPowerOfTwo(n) || n === 0) return undefined;

            var p = 0;
            while (n >>= 1) ++p;
            return p;
        },
        getPosition: function(o) {
            var l = o.offsetLeft,
                t = o.offsetTop;

            while(o = o.offsetParent) {
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
                docElem = doc.documentElement;

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
        },
        each: function(object, callback, args) {
            var name, i = 0,
                length = object.length,
                isObj = length === undefined || typeof object == 'function';
            if (args) {
                if (isObj) {
                    for (name in object) {
                        if (callback.apply(object[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(object[i++], args) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isObj) {
                    for (name in object) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.call(object[i], i, object[i++]) === false) {
                            break;
                        }
                    }
                }
            }
            return object;
        },
        b64: {
            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode: (window.btoa !== undefined) ? function() { return window.btoa.apply(window, arguments); } : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = gf.util.b64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode: (window.atob !== undefined) ? function() { return window.atob.apply(window, arguments); } : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = gf.util.b64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while ( i < utftext.length ) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }

                }

                return string;
            }
        }
    };
})();
