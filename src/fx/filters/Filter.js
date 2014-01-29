var PIXI = require('../../vendor/pixi');

/**
 *
 * @class Filter
 * @extends PIXI.AbstractFilter
 * @constructor
 * @param fragmentSrc {Array<String>} The source of the fragment shader
 * @param uniforms {Object} The uniforms for this filter
 */
var Filter = PIXI.AbstractFilter;

/**
 * An array of passes - some filters contain a few steps this array simply stores the steps in a liniear fashion.
 * For example the blur filter has two passes blurX and blurY.
 *
 * @property passes
 * @type An array of filter objects
 * @private
 */

/**
 * The raw PIXI.Shader instances that were created by a WebGLRenderer.
 *
 * @property shaders
 * @type An array of shader objects
 * @private
 */

/**
 * The uniforms used by this filter (and associated fragment shader)
 *
 * @property uniforms
 * @type Object
 * @private
 */

/**
 * The fragment shader source in a line-by-line array
 *
 * @property fragmentSrc
 * @type Array<String>
 * @private
 */

module.exports = Filter;
