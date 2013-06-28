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
 */
window.gf = window.gf || {};

/**
 * Point object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Point.html">PIXI.Point</a>
 *
 * @class Point
 */
gf.Point = PIXI.Point;

/**
 * Rectangle object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Rectangle.html">PIXI.Rectangle</a>
 *
 * @class Rectangle
 */
gf.Rectangle = PIXI.Rectangle;

/**
 * Polygon object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Polygon.html">PIXI.Polygon</a>
 *
 * @class Polygon
 */
gf.Polygon = PIXI.Polygon;

/**
 * Texture object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Texture.html">PIXI.Texture</a>
 *
 * @class Texture
 */
gf.Texture = PIXI.Texture;

/**
 * EventTarget mixin, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/EventTarget.html">PIXI.EventTarget</a>
 *
 * @class EventTarget
 */
gf.EventTarget = PIXI.EventTarget;

/**
 * The current grapefruit version
 *
 * @property version
 * @type String
 */
gf.version = '@@VERSION';

/**
 * The cached assets loaded by any loader
 *
 * @property assetCache
 * @type Object
 */
gf.assetCache = {};

/**
 * Feature detection so we cans witch between renderers, play audio correctly, and other things.
 *
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
     * @type Boolean
     */
    canvas: !!window.CanvasRenderingContext2D,

    /**
     * Whether or not webgl is supported
     *
     * @property webgl
     * @type Boolean
     */
    webgl: (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })(),

    /**
     * Whether or not web workers are supported
     *
     * @property workers
     * @type Boolean
     */
    workers: !!window.Worker,

    /**
     * Whether or not Blob URLs are supported
     *
     * @property blobs
     * @type Boolean
     */
    blobUrls: !!window.Blob && !!window.URL && !!window.URL.createObjectURL,

    /**
     * Whether or not typed arrays are supported
     *
     * @property typedArrays
     * @type Boolean
     */
    typedArrays: !!window.ArrayBuffer,

    /**
     * Whether or not the filesystem API is supported
     *
     * @property fileapi
     * @type Boolean
     */
    fileapi: !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob,

    /**
     * Whether or not tje Web Audio API is supported
     *
     * @property webAudio
     * @type Boolean
     */
    webAudio: !!window.AudioContext || !!window.webkitAudioContext,

    /**
     * Whether html Audio is supported in this browser
     *
     * @property htmlAudio
     * @type Boolean
     */
    htmlAudio: !!document.createElement('audio').canPlayType,

    /**
     * Whether or not local storage is supported
     *
     * @property localStorage
     * @type Boolean
     */
    localStorage: !!window.localStorage,

    /**
     * Whether or not touch is supported
     *
     * @property touch
     * @type Boolean
     */
    touch: ('createTouch' in document) || ('ontouchstart' in window) || (navigator.isCocoonJS),

    /**
     * Whether or not the gamepad API is supported
     *
     * @property gamepad
     * @type Boolean
     */
    gamepad: !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') !== -1)
};

/**
 * Inherits the prototype of a parent object.
 * from: https://github.com/isaacs/inherits/blob/master/inherits.js
 *
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
