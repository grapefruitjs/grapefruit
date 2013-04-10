/**
* @license GrapeFruit Game Engine
* Copyright (c) 2012, Chad Engler
*
* GrapeFruit is licensed under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
*
* Known Limiting Features:
*   - Canvas
*       - IE 9+
*       - FF 2+
*       - Chrome 4+
*       - Safari 3.1+
*       - Opera 9+
*
*   - WebGL
*       - IE 11+
*       - FF 4+
*       - Chrome 8+
*       - Safari 6+
*       - Opera 12+
*
*   - Object.create
*       - IE 9+
*       - FF 4+
*       - Chrome 7+
*       - Safari 5+
*       - Opera 12+
*/

/**
 * The base grapefruit object
 *
 * @module gf
 * @main gf
 */
window.gf = window.gf || {};

/**
 * Point object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Point.html">PIXI.Point</a>
 *
 * @module gf
 * @class Point
 */
gf.Point = PIXI.Point;

/**
 * Texture object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Texture.html">PIXI.Texture</a>
 *
 * @module gf
 * @class Texture
 */
gf.Texture = PIXI.Texture;

/**
 * EventTarget mixin, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/EventTarget.html">PIXI.EventTarget</a>
 *
 * @module gf
 * @class EventTarget
 */
gf.EventTarget = PIXI.EventTarget;

/**
 * The current grapefruit version
 *
 * @module gf
 * @property version
 * @type String
 */
gf.version = '0.0.2';

/**
 * The cached assets loaded by any loader
 *
 * @module gf
 * @property assetCache
 * @type Object
 */
gf.assetCache = {};

/**
 * Feature detection so we cans witch between renderers, play audio correctly, and other things.
 *
 * @module gf
 * @class support
 */
gf.support = {
    /**
     * The current user agent string
     *
     * @property ua
     * @type String
     */
    ua: navigator.userAgent.toLowerCase(),

    /**
     * Whether or not canvas is supported
     *
     * @property canvas
     * @type bool
     */
    canvas: !!window.CanvasRenderingContext2D,

    /**
     * Whether or not webgl is supported
     *
     * @property webgl
     * @type bool
     */
    webgl: (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })(),

    /**
     * Whether or not web workers are supported
     *
     * @property workers
     * @type bool
     */
    workers: !!window.Worker,

    /**
     * Whether or not the filesystem API is supported
     *
     * @property fileapi
     * @type bool
     */
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    /**
     * Whether or not the audio elements are supported, and if so which types
     *
     * @property audio
     * @type Object
     */
    audio: {
        play: !!document.createElement('audio').canPlayType,
        m4a: false,
        mp3: false,
        ogg: false,
        wav: false
    },

    /**
     * Whether or not local storage is supported
     *
     * @property localStorage
     * @type bool
     */
    localStorage: !!window.localStorage,

    /**
     * Whether or not touch is supported
     *
     * @property touch
     * @type bool
     */
    touch: ('createTouch' in document) || ('ontouchstart' in window) || (navigator.isCocoonJS),

    /**
     * Whether or not the gamepad API is supported
     *
     * @property gamepad
     * @type bool
     */
    gamepad: !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') !== -1)
};

//additional audio support checks
if(gf.support.audio.play) {
    var a = document.createElement('audio');

    gf.support.audio.m4a = !!a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, '');
    gf.support.audio.mp3 = !!a.canPlayType('audio/mpeg').replace(/no/, '');
    gf.support.audio.ogg = !!a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '');
    gf.support.audio.wav = !!a.canPlayType('audio/wav; codecs="1"').replace(/no/, '');

    //check for specific platforms
    if(gf.support.ua.search('iphone') > -1 || gf.support.ua.search('ipod') > -1 ||
        gf.support.ua.search('ipad') > -1 || gf.support.ua.search('android') > -1) {

        //if on mobile device, without a specific HTML5 acceleration framework
        if(!navigator.isCocoonJS) {
            gf.support.audio.play = false;
        }
    }
}

/**
 * Compares version numbers, useful for plugins to specify a required gf version
 *
 * @module gf
 * @method checkVersion
 * @param first {String} The first version
 * @param second {String} The second version
 * @return {Number}
 *      returns a number representing how far off a version is.
 *
 *      will return a negative value if the first version is behind the second,
 *      the negative number will show how many versions behind it is on largest version
 *      point.
 *      That is: '1.0' compared with '1.1' will yield -1
 *      and    : '1.2.3' compared with '1.2.1' will yield -2
 *
 *      0 is returned if the versions match, and a positive number is returned if
 *      the first version is larger than the second.
 */
gf.checkVersion = function(first, second) {
    second = second || gf.version;

    var a = first.split('.'),
        b = second.split('.'),
        len = Math.min(a.length, b.length),
        result = 0;

    for(var i = 0; i < len; ++i) {
        result = +a[i] - +b[i];
        if(result) break;
    }

    return result ? result : a.length - b.length;
};

/**
 * Inherits the prototype of a parent object.
 * from: https://github.com/isaacs/inherits/blob/master/inherits.js
 *
 * @module gf
 * @method inherits
 * @param child {Object} The Child to inherit the prototype
 * @param parent {Object} The Parent to inherit from
 * @param proto {Object} The prototype
 */
gf.inherits = function(c, p, proto) {
  proto = proto || {};
  var e = {};
  [c.prototype, proto].forEach(function (s) {
    Object.getOwnPropertyNames(s).forEach(function (k) {
      e[k] = Object.getOwnPropertyDescriptor(s, k);
    });
  });
  c.prototype = Object.create(p.prototype, e);
  c['super'] = p;
};
