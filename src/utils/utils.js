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
            if(vec instanceof THREE.Vector2 || vec instanceof THREE.Vector3)
                return vec;

            var a = vec;
            if(typeof vec == 'string') a = vec.split(gf.utils._arrayDelim);

            if(vec instanceof Array) {
                switch(vec.length) {
                    case 2: return new THREE.Vector2(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
                    case 3: return new THREE.Vector3(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10));
                }
            }
            else {
                return new THREE.Vector2();
            }
        },
        spawnSquare: function(x, y, w, h, color) {
            var mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(w || 1, h || 1),
                new THREE.MeshBasicMaterial({ color: color || 0xff0000 })
            );
            mesh.position.set(x || 0, y || 0, 400);
            gf.game._scene.add(mesh);
        },
        numToHexColor: function(num) { return ("00000000" + num.toString(16)).substr(-8); },
        RGBToHex: function(r, g, b) { return r.toHex() + g.toHex() + b.toHex(); },
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
                            curVal = n;
                        else
                            console.warn('Object parameter "' + key + '" evaluated to NaN, using default. Value passed: ' + newVal);

                    } else if(curVal instanceof THREE.Color && typeof newVal === 'number') {
                        curVal.setHex(newVal);
                    } else if(curVal instanceof THREE.Vector2 && newVal instanceof Array) {
                        curVal.set(newVal[0] || 0, newVal[1] || 0);
                    } else if(curVal instanceof THREE.Vector3 && newVal instanceof Array) {
                        curVal.set(newVal[0] || 0, newVal[1] || 0, newVal[2] || 0);
                    } else if(curVal instanceof THREE.Vector2 && typeof newVal === 'string') {
                        var a = newVal.split(gf.utils._arrayDelim, 2);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
                    } else if(curVal instanceof THREE.Vector3 && typeof newVal === 'string') {
                        var a = newVal.split(gf.utils._arrayDelim, 3);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0);
                    } else if(curVal instanceof Array && typeof newVal === 'string') {
                        curVal = newVal.split(gf.utils._arrayDelim);
                        gf.utils.each(curVal, function(i, val) {
                            if(!isNaN(val)) curVal[i] = parseInt(val, 10);
                        });
                    } else {
                        obj[key] = newVal;
                    }
                }
            }

            return obj;
        },
        clamp: function(n, min, max) { return Math.max(min, Math.min(max, n)); },
        isPowerOfTwo: function(x) { return ((x & (x - 1)) === 0); },
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
        project: {
            _projector: new THREE.Projector(),
            positionToViewport: function(position) {
                var vector = gf.utils.project._projector.projectVector(position, gf.game._camera),
                    hWidth = gf.game._$domElement.width() / 2,
                    hHeight = gf.game._$domElement.height() / 2;

                return new THREE.Vector2(
                    Math.round(vector.x * hWidth + hWidth),
                    Math.round(-vector.y * hHeight + hHeight)
                );
            },
            positionToScreen: function(position) {
                var pos = gf.utils.project.positionToViewport(position);

                pos.x += gf.game._$domElement.offset().left;
                pos.y += gf.game._$domElement.offset().top;

                return pos;
            },
            screenToPosition: function(pos) {
                var vector = new THREE.Vector3(
                        (pos.x * 2) - 1,
                        (-pos.y * 2) + 1,
                        0.5
                    );

                gf.utils.project._projector.unprojectVector(vector, gf.game._camera);

                var dir = vector.subSelf(gf.game._camera.position).normalize(),
                    ray = new THREE.Ray(gf.game._camera.position, dir),
                    distance = - gf.game._camera.position.z / dir.z;

                return gf.game._camera.position.clone().addSelf(dir.multiplyScalar(distance));
            }
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