/**
 * Feature detection so we cans witch between renderers, play audio correctly, and other things.
 *
 * @class support
 * @namespace gf
 */
var support = module.exports = {
    /**
     * The current user agent string
     *
     * @property ua
     * @type String
     */
    //__global is set by urequire
    ua: __global.navigator ? __global.navigator.userAgent.toLowerCase() : 'nodejs',

    /**
     * Whether or not canvas is supported
     *
     * @property canvas
     * @type Boolean
     */
    canvas: (function () { try { return !!__global.CanvasRenderingContext2D && !!document.createElement('canvas').getContext('2d'); } catch(e) { return false; } })(),

    /**
     * Whether or not webgl is supported
     *
     * @property webgl
     * @type Boolean
     */
    webgl: (function () { try { return !!__global.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })(),

    /**
     * Whether or not web workers are supported
     *
     * @property workers
     * @type Boolean
     */
    workers: !!__global.Worker,

    /**
     * Whether or not Blob URLs are supported
     *
     * @property blobs
     * @type Boolean
     */
    blobUrls: !!__global.Blob && !!__global.URL && !!__global.URL.createObjectURL,

    /**
     * Whether or not typed arrays are supported
     *
     * @property typedArrays
     * @type Boolean
     */
    typedArrays: !!__global.ArrayBuffer,

    /**
     * Whether or not the filesystem API is supported
     *
     * @property fileapi
     * @type Boolean
     */
    fileapi: !!__global.File && !!__global.FileReader && !!__global.FileList && !!__global.Blob,

    /**
     * Whether or not the Web Audio API is supported
     *
     * @property webAudio
     * @type Boolean
     */
    webAudio: !!__global.AudioContext || !!__global.webkitAudioContext || !!__global.mozAudioContext,

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
    localStorage: !!__global.localStorage,

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

var audioTest = new Audio();

support.codecs = {
    mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/,''),
    opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,''),
    ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,''),
    wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/,''),
    m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/,''),
    webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,'')
};
