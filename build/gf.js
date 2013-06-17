/**
 * @license
 * GrapeFruit Game Engine - v0.0.3
 * Copyright (c) 2012, Chad Engler
 * https://github.com/englercj/grapefruit
 *
 * Compiled: 2013-06-17
 *
 * GrapeFruit Game Engine is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window, undefined) {
    document = window.document;

(function(o){"function"==typeof define?define(o):"function"==typeof YUI?YUI.add("es5",o):o()})(function(){function o(){}function v(a){a=+a;a!==a?a=0:0!==a&&(a!==1/0&&a!==-(1/0))&&(a=(0<a||-1)*Math.floor(Math.abs(a)));return a}function s(a){var b=typeof a;return null===a||"undefined"===b||"boolean"===b||"number"===b||"string"===b}Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError("Function.prototype.bind called on incompatible "+b);
var d=q.call(arguments,1),c=function(){if(this instanceof c){var e=b.apply(this,d.concat(q.call(arguments)));return Object(e)===e?e:this}return b.apply(a,d.concat(q.call(arguments)))};b.prototype&&(o.prototype=b.prototype,c.prototype=new o,o.prototype=null);return c});var k=Function.prototype.call,p=Object.prototype,q=Array.prototype.slice,h=k.bind(p.toString),t=k.bind(p.hasOwnProperty);t(p,"__defineGetter__")&&(k.bind(p.__defineGetter__),k.bind(p.__defineSetter__),k.bind(p.__lookupGetter__),k.bind(p.__lookupSetter__));
if(2!=[1,2].splice(0).length){var y=Array.prototype.splice;Array.prototype.splice=function(a,b){return arguments.length?y.apply(this,[a===void 0?0:a,b===void 0?this.length-a:b].concat(q.call(arguments,2))):[]}}if(1!=[].unshift(0)){var z=Array.prototype.unshift;Array.prototype.unshift=function(){z.apply(this,arguments);return this.length}}Array.isArray||(Array.isArray=function(a){return h(a)=="[object Array]"});var k=Object("a"),l="a"!=k[0]||!(0 in k);Array.prototype.forEach||(Array.prototype.forEach=
function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=-1,f=c.length>>>0;if(h(a)!="[object Function]")throw new TypeError;for(;++e<f;)e in c&&a.call(b,c[e],e,d)});Array.prototype.map||(Array.prototype.map=function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0,f=Array(e);if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var g=0;g<e;g++)g in c&&(f[g]=a.call(b,c[g],g,d));return f});Array.prototype.filter||(Array.prototype.filter=
function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0,f=[],g;if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var i=0;i<e;i++)if(i in c){g=c[i];a.call(b,g,i,d)&&f.push(g)}return f});Array.prototype.every||(Array.prototype.every=function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0;if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var f=0;f<e;f++)if(f in c&&!a.call(b,c[f],
f,d))return false;return true});Array.prototype.some||(Array.prototype.some=function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0;if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var f=0;f<e;f++)if(f in c&&a.call(b,c[f],f,d))return true;return false});Array.prototype.reduce||(Array.prototype.reduce=function(a){var b=n(this),d=l&&h(this)=="[object String]"?this.split(""):b,c=d.length>>>0;if(h(a)!="[object Function]")throw new TypeError(a+
" is not a function");if(!c&&arguments.length==1)throw new TypeError("reduce of empty array with no initial value");var e=0,f;if(arguments.length>=2)f=arguments[1];else{do{if(e in d){f=d[e++];break}if(++e>=c)throw new TypeError("reduce of empty array with no initial value");}while(1)}for(;e<c;e++)e in d&&(f=a.call(void 0,f,d[e],e,b));return f});Array.prototype.reduceRight||(Array.prototype.reduceRight=function(a){var b=n(this),d=l&&h(this)=="[object String]"?this.split(""):b,c=d.length>>>0;if(h(a)!=
"[object Function]")throw new TypeError(a+" is not a function");if(!c&&arguments.length==1)throw new TypeError("reduceRight of empty array with no initial value");var e,c=c-1;if(arguments.length>=2)e=arguments[1];else{do{if(c in d){e=d[c--];break}if(--c<0)throw new TypeError("reduceRight of empty array with no initial value");}while(1)}do c in this&&(e=a.call(void 0,e,d[c],c,b));while(c--);return e});if(!Array.prototype.indexOf||-1!=[0,1].indexOf(1,2))Array.prototype.indexOf=function(a){var b=l&&
h(this)=="[object String]"?this.split(""):n(this),d=b.length>>>0;if(!d)return-1;var c=0;arguments.length>1&&(c=v(arguments[1]));for(c=c>=0?c:Math.max(0,d+c);c<d;c++)if(c in b&&b[c]===a)return c;return-1};if(!Array.prototype.lastIndexOf||-1!=[0,1].lastIndexOf(0,-3))Array.prototype.lastIndexOf=function(a){var b=l&&h(this)=="[object String]"?this.split(""):n(this),d=b.length>>>0;if(!d)return-1;var c=d-1;arguments.length>1&&(c=Math.min(c,v(arguments[1])));for(c=c>=0?c:d-Math.abs(c);c>=0;c--)if(c in b&&
a===b[c])return c;return-1};if(!Object.keys){var w=!0,x="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),A=x.length,r;for(r in{toString:null})w=!1;Object.keys=function(a){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.keys called on a non-object");var b=[],d;for(d in a)t(a,d)&&b.push(d);if(w)for(d=0;d<A;d++){var c=x[d];t(a,c)&&b.push(c)}return b}}if(!Date.prototype.toISOString||-1===(new Date(-621987552E5)).toISOString().indexOf("-000001"))Date.prototype.toISOString=
function(){var a,b,d,c;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");c=this.getUTCFullYear();a=this.getUTCMonth();c=c+Math.floor(a/12);a=[(a%12+12)%12+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];c=(c<0?"-":c>9999?"+":"")+("00000"+Math.abs(c)).slice(0<=c&&c<=9999?-4:-6);for(b=a.length;b--;){d=a[b];d<10&&(a[b]="0"+d)}return c+"-"+a.slice(0,2).join("-")+"T"+a.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+
"Z"};r=!1;try{r=Date.prototype.toJSON&&null===(new Date(NaN)).toJSON()&&-1!==(new Date(-621987552E5)).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(H){}r||(Date.prototype.toJSON=function(){var a=Object(this),b;a:if(s(a))b=a;else{b=a.valueOf;if(typeof b==="function"){b=b.call(a);if(s(b))break a}b=a.toString;if(typeof b==="function"){b=b.call(a);if(s(b))break a}throw new TypeError;}if(typeof b==="number"&&!isFinite(b))return null;b=a.toISOString;
if(typeof b!="function")throw new TypeError("toISOString property is not callable");return b.call(a)});var g=Date,m=function(a,b,d,c,e,f,h){var i=arguments.length;if(this instanceof g){i=i==1&&String(a)===a?new g(m.parse(a)):i>=7?new g(a,b,d,c,e,f,h):i>=6?new g(a,b,d,c,e,f):i>=5?new g(a,b,d,c,e):i>=4?new g(a,b,d,c):i>=3?new g(a,b,d):i>=2?new g(a,b):i>=1?new g(a):new g;i.constructor=m;return i}return g.apply(this,arguments)},u=function(a,b){var d=b>1?1:0;return B[b]+Math.floor((a-1969+d)/4)-Math.floor((a-
1901+d)/100)+Math.floor((a-1601+d)/400)+365*(a-1970)},C=RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),B=[0,31,59,90,120,151,181,212,243,273,304,334,365],j;for(j in g)m[j]=g[j];m.now=g.now;m.UTC=g.UTC;m.prototype=g.prototype;m.prototype.constructor=m;m.parse=function(a){var b=C.exec(a);if(b){var d=Number(b[1]),c=Number(b[2]||1)-1,e=Number(b[3]||1)-1,f=Number(b[4]||0),h=Number(b[5]||0),i=Number(b[6]||
0),j=Number(b[7]||0),m=!b[4]||b[8]?0:Number(new g(1970,0)),k=b[9]==="-"?1:-1,l=Number(b[10]||0),b=Number(b[11]||0);if(f<(h>0||i>0||j>0?24:25)&&h<60&&i<60&&j<1E3&&c>-1&&c<12&&l<24&&b<60&&e>-1&&e<u(d,c+1)-u(d,c)){d=((u(d,c)+e)*24+f+l*k)*60;d=((d+h+b*k)*60+i)*1E3+j+m;if(-864E13<=d&&d<=864E13)return d}return NaN}return g.parse.apply(this,arguments)};Date=m;Date.now||(Date.now=function(){return(new Date).getTime()});if("0".split(void 0,0).length){var D=String.prototype.split;String.prototype.split=function(a,
b){return a===void 0&&b===0?[]:D.apply(this,arguments)}}if("".substr&&"b"!=="0b".substr(-1)){var E=String.prototype.substr;String.prototype.substr=function(a,b){return E.call(this,a<0?(a=this.length+a)<0?0:a:a,b)}}j="\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";if(!String.prototype.trim||j.trim()){j="["+j+"]";var F=RegExp("^"+j+j+"*"),G=RegExp(j+j+"*$");String.prototype.trim=function(){if(this===void 0||this===
null)throw new TypeError("can't convert "+this+" to object");return String(this).replace(F,"").replace(G,"")}}var n=function(a){if(a==null)throw new TypeError("can't convert "+a+" to object");return Object(a)}});

(function(f){"function"==typeof define?define(f):"function"==typeof YUI?YUI.add("es5-sham",f):f()})(function(){function f(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(c){}}var b=Function.prototype.call,g=Object.prototype,h=b.bind(g.hasOwnProperty),p,q,k,l,i;if(i=h(g,"__defineGetter__"))p=b.bind(g.__defineGetter__),q=b.bind(g.__defineSetter__),k=b.bind(g.__lookupGetter__),l=b.bind(g.__lookupSetter__);Object.getPrototypeOf||(Object.getPrototypeOf=function(a){return a.__proto__||
(a.constructor?a.constructor.prototype:g)});Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(a,c){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+a);if(h(a,c)){var d={enumerable:true,configurable:true};if(i){var b=a.__proto__;a.__proto__=g;var e=k(a,c),f=l(a,c);a.__proto__=b;if(e||f){if(e)d.get=e;if(f)d.set=f;return d}}d.value=a[c];return d}});Object.getOwnPropertyNames||(Object.getOwnPropertyNames=
function(a){return Object.keys(a)});if(!Object.create){var m;if(null===Object.prototype.__proto__||"undefined"==typeof document)m=function(){return{__proto__:null}};else{var r=function(){},b=document.createElement("iframe"),j=document.body||document.documentElement;b.style.display="none";j.appendChild(b);b.src="javascript:";var e=b.contentWindow.Object.prototype;j.removeChild(b);b=null;delete e.constructor;delete e.hasOwnProperty;delete e.propertyIsEnumerable;delete e.isPrototypeOf;delete e.toLocaleString;
delete e.toString;delete e.valueOf;e.__proto__=null;r.prototype=e;m=function(){return new r}}Object.create=function(a,c){function d(){}var b;if(a===null)b=m();else{if(typeof a!=="object"&&typeof a!=="function")throw new TypeError("Object prototype may only be an Object or null");d.prototype=a;b=new d;b.__proto__=a}c!==void 0&&Object.defineProperties(b,c);return b}}if(Object.defineProperty&&(b=f({}),j="undefined"==typeof document||f(document.createElement("div")),!b||!j))var n=Object.defineProperty,
o=Object.defineProperties;if(!Object.defineProperty||n)Object.defineProperty=function(a,c,d){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.defineProperty called on non-object: "+a);if(typeof d!="object"&&typeof d!="function"||d===null)throw new TypeError("Property description must be an object: "+d);if(n)try{return n.call(Object,a,c,d)}catch(b){}if(h(d,"value"))if(i&&(k(a,c)||l(a,c))){var e=a.__proto__;a.__proto__=g;delete a[c];a[c]=d.value;a.__proto__=e}else a[c]=
d.value;else{if(!i)throw new TypeError("getters & setters can not be defined on this javascript engine");h(d,"get")&&p(a,c,d.get);h(d,"set")&&q(a,c,d.set)}return a};if(!Object.defineProperties||o)Object.defineProperties=function(a,c){if(o)try{return o.call(Object,a,c)}catch(d){}for(var b in c)h(c,b)&&b!="__proto__"&&Object.defineProperty(a,b,c[b]);return a};Object.seal||(Object.seal=function(a){return a});Object.freeze||(Object.freeze=function(a){return a});try{Object.freeze(function(){})}catch(t){var s=
Object.freeze;Object.freeze=function(a){return typeof a=="function"?a:s(a)}}Object.preventExtensions||(Object.preventExtensions=function(a){return a});Object.isSealed||(Object.isSealed=function(){return false});Object.isFrozen||(Object.isFrozen=function(){return false});Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)!==a)throw new TypeError;for(var c="";h(a,c);)c=c+"?";a[c]=true;var b=h(a,c);delete a[c];return b})});

/**
 * @license
 * Pixi.JS - v1.0.0
 * Copyright (c) 2012, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2013-06-17
 *
 * Pixi.JS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

(function(){

	var root = this;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
@module PIXI
 */
var PIXI = PIXI || {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @class Point
 * @constructor 
 * @param x {Number} position of the point
 * @param y {Number} position of the point
 */
PIXI.Point = function(x, y)
{
	/**
	 * @property x 
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;
	
	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;
}

/** 
 * @method clone
 * @return a copy of the point
 */
PIXI.Point.prototype.clone = function()
{
	return new PIXI.Point(this.x, this.y);
}

// constructor
PIXI.Point.constructor = PIXI.Point;


/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * the Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
 * @class Rectangle
 * @constructor 
 * @param x {Number} position of the rectangle
 * @param y {Number} position of the rectangle
 * @param width {Number} of the rectangle
 * @param height {Number} of the rectangle
 */
PIXI.Rectangle = function(x, y, width, height)
{
	/**
	 * @property x
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;
	
	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;
	
	/**
	 * @property width
	 * @type Number
	 * @default 0
	 */
	this.width = width || 0;
	
	/**
	 * @property height
	 * @type Number
	 * @default 0
	 */
	this.height = height || 0;
}

/** 
 * @method clone
 * @return a copy of the rectangle
 */
PIXI.Rectangle.prototype.clone = function()
{
	return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
}

// constructor
PIXI.Rectangle.constructor = PIXI.Rectangle;


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * this is the base class for all objects that are rendered on the screen.
 * @class DisplayObject
 * @constructor
 */
PIXI.DisplayObject = function()
{
	/**
	 * The coordinate of the object relative to the local coordinates of the parent.
	 * @property position
	 * @type Point
	 */
	this.position = new PIXI.Point();
	
	/**
	 * The scale factor of the object.
	 * @property scale
	 * @type Point
	 */
	this.scale = new PIXI.Point(1,1);//{x:1, y:1};
	
	/**
	 * The pivot point of the displayObject that it rotates around
	 * @property pivot
	 * @type Point
	 */
	this.pivot = new PIXI.Point(0,0);
	
	/**
	 * The rotation of the object in radians.
	 * @property rotation
	 * @type Number
	 */
	this.rotation = 0;
	
	/**
	 * The opacity of the object.
	 * @property alpha
	 * @type Number
	 */	
	this.alpha = 1;
	
	/**
	 * The visibility of the object.
	 * @property visible
	 * @type Boolean
	 */	
	this.visible = true;
	this.worldVisible = false;
	
	/**
	 * [read-only] The display object container that contains this display object.
	 * @property parent
	 * @type DisplayObjectContainer
	 */	
	this.parent = null;
	
	/**
	 * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
	 * @property stage
	 * @type Stage
	 */	
	this.stage = null;
	
	/**
	 * This is the defined area that will pick up mouse / touch events. It is null by default.
	 * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
	 * @property hitArea
	 * @type Rectangle
	 */	
	this.hitArea = null;
	
	this.worldAlpha = 1;
	this.color = [];
	
	this.worldTransform = PIXI.mat3.create()//mat3.identity();
	this.localTransform = PIXI.mat3.create()//mat3.identity();
	
	this.dynamic = true;
	// chach that puppy!
	this._sr = 0;
	this._cr = 1;
	
	this.childIndex = 0;
	
	this.renderable = false;
	
	// [readonly] best not to toggle directly! use setInteractive()
	this.interactive = false;
	
	/**
	 * This is used to indicate if the displayObject should display a mouse hand cursor on rollover
	 * @property buttonMode
	 * @type Boolean
	 */
	this.buttonMode = false;
	
	/*
	 * MOUSE Callbacks
	 */
	
	/**
	 * A callback that is used when the users clicks on the displayObject with their mouse
	 * @method click
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the user clicks the mouse down over the sprite
	 * @method mousedown
	 * @param interactionData {InteractionData}
	 */
	 
	/**
	 * A callback that is used when the user releases the mouse that was over the displayObject
	 * for this callback to be fired the mouse must have been pressed down over the displayObject
	 * @method mouseup
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
	 * for this callback to be fired, The touch must have started over the displayObject
	 * @method mouseupoutside
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the users mouse rolls over the displayObject
	 * @method mouseover
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the users mouse leaves the displayObject
	 * @method mouseout
	 * @param interactionData {InteractionData}
	 */
	
	
	/*
	 * TOUCH Callbacks
	 */
	
	/**
	 * A callback that is used when the users taps on the sprite with their finger
	 * basically a touch version of click
	 * @method tap
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the user touch's over the displayObject
	 * @method touchstart
	 * @param interactionData {InteractionData}
	 */
	 
	/**
	 * A callback that is used when the user releases a touch over the displayObject
	 * @method touchend
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the user releases the touch that was over the displayObject
	 * for this callback to be fired, The touch must have started over the sprite
	 * @method touchendoutside
	 * @param interactionData {InteractionData}
	 */
}

// constructor
PIXI.DisplayObject.constructor = PIXI.DisplayObject;

//TODO make visible a getter setter
/*
Object.defineProperty(PIXI.DisplayObject.prototype, 'visible', {
    get: function() {
        return this._visible;
    },
    set: function(value) {
        this._visible = value;
    }
});*/

/**
 * Indicates if the sprite will have touch and mouse interactivity. It is false by default
 * @method setInteractive
 * @param interactive {Boolean}
 */
PIXI.DisplayObject.prototype.setInteractive = function(interactive)
{
	this.interactive = interactive;
	// TODO more to be done here..
	// need to sort out a re-crawl!
	if(this.stage)this.stage.dirty = true;
}


/**
 * @private
 */
PIXI.DisplayObject.prototype.updateTransform = function()
{
	// TODO OPTIMIZE THIS!! with dirty
	if(this.rotation != this.rotationCache)
	{
		this.rotationCache = this.rotation;
		this._sr =  Math.sin(this.rotation);
		this._cr =  Math.cos(this.rotation);
	}	
	
	var localTransform = this.localTransform;
	var parentTransform = this.parent.worldTransform;
	var worldTransform = this.worldTransform;
	//console.log(localTransform)
	localTransform[0] = this._cr * this.scale.x;
	localTransform[1] = -this._sr * this.scale.y
	localTransform[3] = this._sr * this.scale.x;
	localTransform[4] = this._cr * this.scale.y;
	
	///AAARR GETTER SETTTER!
	//localTransform[2] = this.position.x;
	//localTransform[5] = this.position.y;
	
	var px = this.pivot.x;
	var py = this.pivot.y;
   	
   	///AAARR GETTER SETTTER!
	localTransform[2] = this.position.x - localTransform[0] * px - py * localTransform[1];
	localTransform[5] = this.position.y - localTransform[4] * py - px * localTransform[3];

    // Cache the matrix values (makes for huge speed increases!)
    var a00 = localTransform[0], a01 = localTransform[1], a02 = localTransform[2],
        a10 = localTransform[3], a11 = localTransform[4], a12 = localTransform[5],

        b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2],
        b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];

    worldTransform[0] = b00 * a00 + b01 * a10;
    worldTransform[1] = b00 * a01 + b01 * a11;
    worldTransform[2] = b00 * a02 + b01 * a12 + b02;

    worldTransform[3] = b10 * a00 + b11 * a10;
    worldTransform[4] = b10 * a01 + b11 * a11;
    worldTransform[5] = b10 * a02 + b11 * a12 + b12;

	// because we are using affine transformation, we can optimise the matrix concatenation process.. wooo!
	// mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
	this.worldAlpha = this.alpha * this.parent.worldAlpha;

	
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A DisplayObjectContainer represents a collection of display objects. It is the base class of all display objects that act as a container for other objects.
 * @class DisplayObjectContainer 
 * @extends DisplayObject
 * @constructor
 */
PIXI.DisplayObjectContainer = function()
{
	PIXI.DisplayObject.call( this );
	
	/**
	 * [read-only] The of children of this container.
	 * @property children {Array}
	 */	
	this.children = [];
	//s
	this.renderable = false;
}

// constructor
PIXI.DisplayObjectContainer.constructor = PIXI.DisplayObjectContainer;
PIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );

//TODO make visible a getter setter
/*
Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'visible', {
    get: function() {
        return this._visible;
    },
    set: function(value) {
        this._visible = value;
        
    }
});*/

/**
 * Adds a child to the container.
 * @method addChild
 * @param  DisplayObject {DisplayObject}
 */
PIXI.DisplayObjectContainer.prototype.addChild = function(child)
{
	if(child.parent != undefined)
	{
		child.parent.removeChild(child);
	}
	
	child.parent = this;
	child.childIndex = this.children.length;
	
	this.children.push(child);	
	
	if(this.stage)
	{
		this.stage.__addChild(child);
	}
	
	// need to remove any render groups..
	if(this.__renderGroup)
	{
		// being used by a renderTexture.. if it exists then it must be from a render texture;
		if(child.__renderGroup)child.__renderGroup.removeDisplayObjectAndChildren(child);
		// add them to the new render group..
		this.__renderGroup.addDisplayObjectAndChildren(child);
	}
}

/**
 * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
 * @method addChildAt
 * @param DisplayObject {DisplayObject}
 * @param index {Number}
 */
PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	if(index >= 0 && index <= this.children.length)
	{
		if(child.parent != undefined)
		{
			child.parent.removeChild(child);
		}
	
		if (index == this.children.length)
		{
		  	this.children.push(child);
		}	
		else 
		{
			this.children.splice(index, 0, child);
		}

		child.parent = this;
		child.childIndex = index;
		
		var length = this.children.length;
		for (var i=index; i < length; i++) 
		{
		  this.children[i].childIndex = i;
		}
		
		if(this.stage)
		{
			this.stage.__addChild(child);
		}
		
		// need to remove any render groups..
		if(this.__renderGroup)
		{
			// being used by a renderTexture.. if it exists then it must be from a render texture;
			if(child.__renderGroup)child.__renderGroup.removeDisplayObjectAndChildren(child);
			// add them to the new render group..
			this.__renderGroup.addDisplayObjectAndChildren(child);
		}
	}
	else
	{
		// error!
		
		throw new Error(child + " The index "+ index +" supplied is out of bounds " + this.children.length);
	}
}

/**
 * Swaps the depth of 2 displayObjects
 * @method swapChildren
 * @param  DisplayObject {DisplayObject}
 * @param  DisplayObject2 {DisplayObject}
 */
PIXI.DisplayObjectContainer.prototype.swapChildren = function(child, child2)
{
	// TODO I already know this??
	var index = this.children.indexOf( child );
	var index2 = this.children.indexOf( child2 );
	
	if ( index !== -1 && index2 !== -1 ) 
	{
		// cool
		if(this.stage)
		{
			// this is to satisfy the webGL batching..
			// TODO sure there is a nicer way to achieve this!
			this.stage.__removeChild(child);
			this.stage.__removeChild(child2);
			
			this.stage.__addChild(child);
			this.stage.__addChild(child2);
		}
		
		// swap the indexes..
		child.childIndex = index2;
		child2.childIndex = index;
		// swap the positions..
		this.children[index] = child2;
		this.children[index2] = child;
		
	}
	else
	{
		throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
	}
}

/**
 * Returns the Child at the specified index
 * @method getChildAt
 * @param  index {Number}
 */
PIXI.DisplayObjectContainer.prototype.getChildAt = function(index)
{
	if(index >= 0 && index < this.children.length)
	{
		return this.children[index];
	}
	else
	{
		throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
	
	}
}

/**
 * Removes a child from the container.
 * @method removeChild
 * @param  DisplayObject {DisplayObject}
 */
PIXI.DisplayObjectContainer.prototype.removeChild = function(child)
{
	var index = this.children.indexOf( child );
	
	if ( index !== -1 ) 
	{
		if(this.stage)
		{
			this.stage.__removeChild(child);
		}
		
		// webGL trim
		if(child.__renderGroup)
		{
			child.__renderGroup.removeDisplayObjectAndChildren(child);
		}
		
	//	console.log(">" + child.__renderGroup)
		child.parent = undefined;

		this.children.splice( index, 1 );
	
		// update in dexs!
		for(var i=index,j=this.children.length; i<j; i++)
		{
			this.children[i].childIndex -= 1;
		}
	}
	else
	{
		throw new Error(child + " The supplied DisplayObject must be a child of the caller " + this);
	}
}


/**
 * @private
 */
PIXI.DisplayObjectContainer.prototype.updateTransform = function()
{
	if(!this.visible)return;
	
	PIXI.DisplayObject.prototype.updateTransform.call( this );
	
	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.blendModes = {};
PIXI.blendModes.NORMAL = 0;
PIXI.blendModes.SCREEN = 1;


/**
@class Sprite
@extends DisplayObjectContainer
@constructor
@param texture {Texture}
@type String
*/
PIXI.Sprite = function(texture)
{
	PIXI.DisplayObjectContainer.call( this );
	
	 /**
	 * The anchor sets the origin point of the texture.
	 * The default is 0,0 this means the textures origin is the top left 
	 * Setting than anchor to 0.5,0.5 means the textures origin is centered
	 * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right
     * @property anchor
     * @type Point
     */
	this.anchor = new PIXI.Point();
	
	/**
	 * The texture that the sprite is using
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;
	
	/**
	 * The blend mode of sprite.
	 * currently supports PIXI.blendModes.NORMAL and PIXI.blendModes.SCREEN
	 * @property blendMode
	 * @type uint
	 */
	this.blendMode = PIXI.blendModes.NORMAL;
	
	/**
	 * The width of the sprite (this is initially set by the texture)
	 * @property width
	 * @type #Number
	 */
	this._width = 0;
	
	/**
	 * The height of the sprite (this is initially set by the texture)
	 * @property height
	 * @type #Number
	 */
	this._height = 0;
	
	if(texture.baseTexture.hasLoaded)
	{
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}
	
	this.renderable = true;
	
	// thi next bit is here for the docs...
	
	
}

// constructor
PIXI.Sprite.constructor = PIXI.Sprite;
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

// OOH! shiney new getters and setters for width and height
// The width and height now modify the scale (this is what flash does, nice and tidy!)
Object.defineProperty(PIXI.Sprite.prototype, 'width', {
    get: function() {
        return this.scale.x * this.texture.frame.width;
    },
    set: function(value) {
    	this.scale.x = value / this.texture.frame.width
        this._width = value;
    }
});

Object.defineProperty(PIXI.Sprite.prototype, 'height', {
    get: function() {
        return  this.scale.y * this.texture.frame.height;
    },
    set: function(value) {
    	this.scale.y = value / this.texture.frame.height
        this._height = value;
    }
});
 
/**
@method setTexture
@param texture {Texture} The PIXI texture that is displayed by the sprite
*/
PIXI.Sprite.prototype.setTexture = function(texture)
{
	// stop current texture;
	if(this.texture.baseTexture != texture.baseTexture)
	{
		this.textureChange = true;	
	}
	
	this.texture = texture;
	this.updateFrame = true;
}

/**
 * @private
 */
PIXI.Sprite.prototype.onTextureUpdate = function(event)
{
	//this.texture.removeEventListener( 'update', this.onTextureUpdateBind );
	
	// so if _width is 0 then width was not set..
	if(this._width)this.scale.x = this._width / this.texture.frame.width;
	if(this._height)this.scale.y = this._height / this.texture.frame.height;
	
	this.updateFrame = true;
}

// some helper functions..

/**
 * 
 * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
 * The frame ids are created when a Texture packer file has been loaded
 * @method fromFrame
 * @static
 * @param frameId {String} The frame Id of the texture in the cache
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the frameId
 */
PIXI.Sprite.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache" + this);
	return new PIXI.Sprite(texture);
}

/**
 * 
 * Helper function that creates a sprite that will contain a texture based on an image url
 * If the image is not in the texture cache it will be loaded
 * @method fromImage
 * @static
 * @param The image url of the texture
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the image id
 */
PIXI.Sprite.fromImage = function(imageId)
{
	var texture = PIXI.Texture.fromImage(imageId);
	return new PIXI.Sprite(texture);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A MovieClip is a simple way to display an animation depicted by a list of textures.
 * @class MovieClip
 * @extends Sprite
 * @constructor
 * @param textures {Array} an array of {Texture} objects that make up the animation
 */
PIXI.MovieClip = function(textures)
{
	PIXI.Sprite.call( this, textures[0]);
	
	/**
	 * The array of textures that make up the animation
	 * @property textures
	 * @type Array
	 */
	this.textures = textures;
	
	/**
	 * [read only] The index MovieClips current frame (this may not have to be a whole number)
	 * @property currentFrame
	 * @type Number
	 */
	this.currentFrame = 0; 
	
	/**
	 * The speed that the MovieClip will play at. Higher is faster, lower is slower
	 * @property animationSpeed
	 * @type Number
	 */
	this.animationSpeed = 1;

	/**
	 * Whether or not the movie clip repeats after playing.
	 * @property loop
	 * @type Boolean
	 */
	this.loop = true;

	/**
	 * Function to call when a MovieClip finishes playing
	 * @property onComplete
	 * @type Function
	 */
	this.onComplete = null;
	
	/**
	 * [read only] indicates if the MovieClip is currently playing
	 * @property playing
	 * @type Boolean
	 */
	this.playing;
}

// constructor
PIXI.MovieClip.constructor = PIXI.MovieClip;
PIXI.MovieClip.prototype = Object.create( PIXI.Sprite.prototype );

/**
 * Stops the MovieClip
 * @method stop
 */
PIXI.MovieClip.prototype.stop = function()
{
	this.playing = false;
}

/**
 * Plays the MovieClip
 * @method play
 */
PIXI.MovieClip.prototype.play = function()
{
	this.playing = true;
}

/**
 * Stops the MovieClip and goes to a specific frame
 * @method gotoAndStop
 * @param frameNumber {Number} frame index to stop at
 */
PIXI.MovieClip.prototype.gotoAndStop = function(frameNumber)
{
	this.playing = false;
	this.currentFrame = frameNumber;
	var round = (this.currentFrame + 0.5) | 0;
	this.setTexture(this.textures[round % this.textures.length]);
}

/**
 * Goes to a specific frame and begins playing the MovieClip
 * @method gotoAndPlay
 * @param frameNumber {Number} frame index to start at
 */
PIXI.MovieClip.prototype.gotoAndPlay = function(frameNumber)
{
	this.currentFrame = frameNumber;
	this.playing = true;
}

PIXI.MovieClip.prototype.updateTransform = function()
{
	PIXI.Sprite.prototype.updateTransform.call(this);
	
	if(!this.playing)return;
	
	this.currentFrame += this.animationSpeed;
	var round = (this.currentFrame + 0.5) | 0;
	if(this.loop || round < this.textures.length)
	{
		this.setTexture(this.textures[round % this.textures.length]);
	}
	else if(round >= this.textures.length)
	{
		this.gotoAndStop(this.textures.length - 1);
		if(this.onComplete)
		{
			this.onComplete();
		}
	}
}
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Text Object will create a line(s) of text to split a line you can use "\n"
 * @class Text
 * @extends Sprite
 * @constructor
 * @param {String} text The copy that you would like the text to display
 * @param {Object} [style] The style parameters
 * @param {String} [style.font] default "bold 20pt Arial" The style and size of the font
 * @param {Object} [style.fill="black"] A canvas fillstyle that will be used on the text eg "red", "#00FF00"
 * @param {String} [style.align="left"] An alignment of the multiline text ("left", "center" or "right")
 * @param {String} [style.stroke] A canvas fillstyle that will be used on the text stroke eg "blue", "#FCFF00"
 * @param {Number} [style.strokeThickness=0] A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param {Boolean} [style.wordWrap=false] Indicates if word wrap should be used
 * @param {Number} [style.wordWrapWidth=100] The width at which text will wrap
 */
PIXI.Text = function(text, style)
{
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas));

    this.setText(text);
    this.setStyle(style);
    
     this.updateText();
    this.dirty = false;
};

// constructor
PIXI.Text.constructor = PIXI.Text;
PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype);

/**
 * Set the style of the text
 * @method setStyle
 * @param {Object} [style] The style parameters
 * @param {String} [style.font="bold 20pt Arial"] The style and size of the font
 * @param {Object} [style.fill="black"] A canvas fillstyle that will be used on the text eg "red", "#00FF00"
 * @param {String} [style.align="left"] An alignment of the multiline text ("left", "center" or "right")
 * @param {String} [style.stroke="black"] A canvas fillstyle that will be used on the text stroke eg "blue", "#FCFF00"
 * @param {Number} [style.strokeThickness=0] A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param {Boolean} [style.wordWrap=false] Indicates if word wrap should be used
 * @param {Number} [style.wordWrapWidth=100] The width at which text will wrap
 */
PIXI.Text.prototype.setStyle = function(style)
{
    style = style || {};
    style.font = style.font || "bold 20pt Arial";
    style.fill = style.fill || "black";
    style.align = style.align || "left";
    style.stroke = style.stroke || "black"; //provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.wordWrapWidth = style.wordWrapWidth || 100;
    this.style = style;
    this.dirty = true;
};

/**
 * Set the copy for the text object. To split a line you can use "\n"
 * @methos setText
 * @param {String} text The copy that you would like the text to display
 */
PIXI.Sprite.prototype.setText = function(text)
{
    this.text = text.toString() || " ";
    this.dirty = true;
};

/**
 * Renders text
 * @private
 */
PIXI.Text.prototype.updateText = function()
{
	this.context.font = this.style.font;
	
	var outputText = this.text;
	
	// word wrap
	// preserve original text
	if(this.style.wordWrap)outputText = this.wordWrap(this.text);

	//split text into lines
	var lines = outputText.split(/(?:\r\n|\r|\n)/);

	//calculate text width
	var lineWidths = [];
	var maxLineWidth = 0;
	for (var i = 0; i < lines.length; i++)
	{
		var lineWidth = this.context.measureText(lines[i]).width;
		lineWidths[i] = lineWidth;
		maxLineWidth = Math.max(maxLineWidth, lineWidth);
	}
	this.canvas.width = maxLineWidth + this.style.strokeThickness;
	
	//calculate text height
	var lineHeight = this.determineFontHeight("font: " + this.style.font  + ";") + this.style.strokeThickness;
	this.canvas.height = lineHeight * lines.length;

	//set canvas text styles
	this.context.fillStyle = this.style.fill;
	this.context.font = this.style.font;
	
	this.context.strokeStyle = this.style.stroke;
	this.context.lineWidth = this.style.strokeThickness;

	this.context.textBaseline = "top";

	//draw lines line by line
	for (i = 0; i < lines.length; i++)
	{
		var linePosition = new PIXI.Point(this.style.strokeThickness / 2, this.style.strokeThickness / 2 + i * lineHeight);
	
		if(this.style.align == "right")
		{
			linePosition.x += maxLineWidth - lineWidths[i];
		}
		else if(this.style.align == "center")
		{
			linePosition.x += (maxLineWidth - lineWidths[i]) / 2;
		}

		if(this.style.stroke && this.style.strokeThickness)
		{
			this.context.strokeText(lines[i], linePosition.x, linePosition.y);
		}

		if(this.style.fill)
		{
			this.context.fillText(lines[i], linePosition.x, linePosition.y);
		}
	}
	
    this.updateTexture();
};

/**
 * Updates texture size based on canvas size
 * @private
 */
PIXI.Text.prototype.updateTexture = function()
{

    this.texture.baseTexture.width = this.canvas.width;
    this.texture.baseTexture.height = this.canvas.height;
    this.texture.frame.width = this.canvas.width;
    this.texture.frame.height = this.canvas.height;
    
  	this._width = this.canvas.width;
    this._height = this.canvas.height;
	
    PIXI.texturesToUpdate.push(this.texture.baseTexture);
};

/**
 * @private
 */
PIXI.Text.prototype.updateTransform = function()
{
	if(this.dirty)
	{
		this.updateText();	
		this.dirty = false;
	}
	
	PIXI.Sprite.prototype.updateTransform.call(this);
};

/*
 * http://stackoverflow.com/users/34441/ellisbben
 * great solution to the problem!
 */
PIXI.Text.prototype.determineFontHeight = function(fontStyle) 
{
	// build a little reference dictionary so if the font style has been used return a
	// cached version...
	var result = PIXI.Text.heightCache[fontStyle];
	
	if(!result)
	{
		var body = document.getElementsByTagName("body")[0];
		var dummy = document.createElement("div");
		var dummyText = document.createTextNode("M");
		dummy.appendChild(dummyText);
		dummy.setAttribute("style", fontStyle + ';position:absolute;top:0;left:0');
		body.appendChild(dummy);
		
		result = dummy.offsetHeight;
		PIXI.Text.heightCache[fontStyle] = result;
		
		body.removeChild(dummy);
	}
	
	return result;
};

/**
 * A Text Object will apply wordwrap
 * @private
 */
PIXI.Text.prototype.wordWrap = function(text)
{
	// search good wrap position
	var searchWrapPos = function(ctx, text, start, end, wrapWidth)
	{
		var p = Math.floor((end-start) / 2) + start;
		if(p == start) {
			return 1;
		}
		
		if(ctx.measureText(text.substring(0,p)).width <= wrapWidth)
		{
			if(ctx.measureText(text.substring(0,p+1)).width > wrapWidth)
			{
				return p;
			}
			else
			{
				return arguments.callee(ctx, text, p, end, wrapWidth);
			}
		}
		else
		{
			return arguments.callee(ctx, text, start, p, wrapWidth);
		}
	};
	 
	var lineWrap = function(ctx, text, wrapWidth)
	{
		if(ctx.measureText(text).width <= wrapWidth || text.length < 1)
		{
			return text;
		}
		var pos = searchWrapPos(ctx, text, 0, text.length, wrapWidth);
		return text.substring(0, pos) + "\n" + arguments.callee(ctx, text.substring(pos), wrapWidth);
	};
	
	var result = "";
	var lines = text.split("\n");
	for (var i = 0; i < lines.length; i++)
	{
		result += lineWrap(this.context, lines[i], this.style.wordWrapWidth) + "\n";
	}
	
	return result;
};

PIXI.Text.prototype.destroy = function(destroyTexture)
{
	if(destroyTexture)
	{
		this.texture.destroy();
	}
		
};

PIXI.Text.heightCache = {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Text Object will create a line(s) of text using bitmap font. To split a line you can use "\n", "\r" or "\r\n"
 * You can generate the fnt files using 
 * http://www.angelcode.com/products/bmfont/ for windows or
 * http://www.bmglyph.com/ for mac.
 * @class BitmapText
 * @extends DisplayObjectContainer
 * @constructor
 * @param {String} text The copy that you would like the text to display
 * @param {Object} style The style parameters
 * @param {String} style.font The size (optional) and bitmap font id (required) eq "Arial" or "20px Arial" (must have loaded previously)
 * @param {String} [style.align="left"] An alignment of the multiline text ("left", "center" or "right")
 */
PIXI.BitmapText = function(text, style)
{
    PIXI.DisplayObjectContainer.call(this);

    this.setText(text);
    this.setStyle(style);
    this.updateText();
    this.dirty = false

};

// constructor
PIXI.BitmapText.constructor = PIXI.BitmapText;
PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

/**
 * Set the copy for the text object
 * @method setText
 * @param {String} text The copy that you would like the text to display
 */
PIXI.BitmapText.prototype.setText = function(text)
{
    this.text = text || " ";
    this.dirty = true;
};

/**
 * Set the style of the text
 * @method setStyle
 * @param {Object} style The style parameters
 * @param {String} style.font The size (optional) and bitmap font id (required) eq "Arial" or "20px Arial" (must have loaded previously)
 * @param {String} [style.align="left"] An alignment of the multiline text ("left", "center" or "right")
 */
PIXI.BitmapText.prototype.setStyle = function(style)
{
    style = style || {};
    style.align = style.align || "left";
    this.style = style;

    var font = style.font.split(" ");
    this.fontName = font[font.length - 1];
    this.fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : PIXI.BitmapText.fonts[this.fontName].size;

    this.dirty = true;
};

/**
 * Renders text
 * @private
 */
PIXI.BitmapText.prototype.updateText = function()
{
    var data = PIXI.BitmapText.fonts[this.fontName];
    var pos = new PIXI.Point();
    var prevCharCode = null;
    var chars = [];
    var maxLineWidth = 0;
    var lineWidths = [];
    var line = 0;
    var scale = this.fontSize / data.size;
    for(var i = 0; i < this.text.length; i++)
    {
        var charCode = this.text.charCodeAt(i);
        if(/(?:\r\n|\r|\n)/.test(this.text.charAt(i)))
        {
            lineWidths.push(pos.x);
            maxLineWidth = Math.max(maxLineWidth, pos.x);
            line++;

            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
            continue;
        }
        
        var charData = data.chars[charCode];
        if(!charData) continue;

        if(prevCharCode && charData[prevCharCode])
        {
           pos.x += charData.kerning[prevCharCode];
        }
        chars.push({texture:charData.texture, line: line, charCode: charCode, position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)});
        pos.x += charData.xAdvance;

        prevCharCode = charCode;
    }

    lineWidths.push(pos.x);
    maxLineWidth = Math.max(maxLineWidth, pos.x);

    var lineAlignOffsets = [];
    for(i = 0; i <= line; i++)
    {
        var alignOffset = 0;
        if(this.style.align == "right")
        {
            alignOffset = maxLineWidth - lineWidths[i];
        }
        else if(this.style.align == "center")
        {
            alignOffset = (maxLineWidth - lineWidths[i]) / 2;
        }
        lineAlignOffsets.push(alignOffset);
    }

    for(i = 0; i < chars.length; i++)
    {
        var char = new PIXI.Sprite(chars[i].texture)//PIXI.Sprite.fromFrame(chars[i].charCode);
        char.position.x = (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale;
        char.position.y = chars[i].position.y * scale;
        char.scale.x = char.scale.y = scale;
        this.addChild(char);
    }

    this.width = pos.x * scale;
    this.height = (pos.y + data.lineHeight) * scale;
};

/**
 * @private
 */
PIXI.BitmapText.prototype.updateTransform = function()
{
	if(this.dirty)
	{
        while(this.children.length > 0)
        {
            this.removeChild(this.getChildAt(0));
        }
        this.updateText();

        this.dirty = false;
	}
	
	PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

PIXI.BitmapText.fonts = {};
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



/**
The interaction manager deals with mouse and touch events. Any DisplayObject can be interactive
This manager also supports multitouch.
@class InteractionManager
@constructor
@param stage {Stage}
@type Stage
*/
PIXI.InteractionManager = function(stage)
{
	/**
	 * a refference to the stage
	 * @property stage
	 * @type Stage
	 */
	this.stage = stage;

	// helpers
	this.tempPoint = new PIXI.Point();
	//this.tempMatrix =  mat3.create();
	
	this.mouseoverEnabled = true;
	
	/**
	 * the mouse data 
	 * @property mouse
	 * @type InteractionData
	 */
	this.mouse = new PIXI.InteractionData();
	
	/**
	 * an object that stores current touches (InteractionData) by id reference 
	 * @property touchs
	 * @type Object
	 */
	this.touchs = {};
	
	//tiny little interactiveData pool!
	this.pool = [];
	
	this.interactiveItems = [];

	this.last = 0;
}

// constructor
PIXI.InteractionManager.constructor = PIXI.InteractionManager;

PIXI.InteractionManager.prototype.collectInteractiveSprite = function(displayObject, iParent)
{
	var children = displayObject.children;
	var length = children.length;
	
	//this.interactiveItems = [];
	/// make an interaction tree... {item.__interactiveParent}
	for (var i = length-1; i >= 0; i--)
	{
		var child = children[i];
		
		// push all interactive bits
		if(child.interactive)
		{
			iParent.interactiveChildren = true;
			//child.__iParent = iParent;
			this.interactiveItems.push(child);
			
			if(child.children.length > 0)
			{
				this.collectInteractiveSprite(child, child);
			}
		}
		else
		{
			child.__iParent = null;
			
			if(child.children.length > 0)
			{
				this.collectInteractiveSprite(child, iParent);
			}
		}
	}
}

PIXI.InteractionManager.prototype.setTarget = function(target)
{
	if (window.navigator.msPointerEnabled) 
	{
		// time to remove some of that zoom in ja..
		target.view.style["-ms-content-zooming"] = "none";
    	target.view.style["-ms-touch-action"] = "none"
    
		// DO some window specific touch!
	}
	
	this.target = target;
	target.view.addEventListener('mousemove',  this.onMouseMove.bind(this), true);
	target.view.addEventListener('mousedown',  this.onMouseDown.bind(this), true);
 	document.body.addEventListener('mouseup',  this.onMouseUp.bind(this), true);
 	target.view.addEventListener('mouseout',   this.onMouseUp.bind(this), true);
	
	// aint no multi touch just yet!
	target.view.addEventListener("touchstart", this.onTouchStart.bind(this), true);
	target.view.addEventListener("touchend", this.onTouchEnd.bind(this), true);
	target.view.addEventListener("touchmove", this.onTouchMove.bind(this), true);
}

PIXI.InteractionManager.prototype.update = function()
{
	if(!this.target)return;
	
	// frequency of 30fps??
	var now = Date.now();
	var diff = now - this.last;
	diff = (diff * 30) / 1000;
	if(diff < 1)return;
	this.last = now;
	//
	
	// ok.. so mouse events??
	// yes for now :)
	// OPTIMSE - how often to check??
	if(this.dirty)
	{
		this.dirty = false;
		
		var len = this.interactiveItems.length;
		
		for (var i=0; i < this.interactiveItems.length; i++) {
		  this.interactiveItems[i].interactiveChildren = false;
		}
		
		this.interactiveItems = [];
		
		if(this.stage.interactive)this.interactiveItems.push(this.stage);
		// go through and collect all the objects that are interactive..
		this.collectInteractiveSprite(this.stage, this.stage);
	}
	
	// loop through interactive objects!
	var length = this.interactiveItems.length;
	
	this.target.view.style.cursor = "default";	
				
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		if(!item.visible)continue;
		
		// OPTIMISATION - only calculate every time if the mousemove function exists..
		// OK so.. does the object have any other interactive functions?
		// hit-test the clip!
		
		
		if(item.mouseover || item.mouseout || item.buttonMode)
		{
			// ok so there are some functions so lets hit test it..
			item.__hit = this.hitTest(item, this.mouse);
			// ok so deal with interactions..
			// loks like there was a hit!
			if(item.__hit)
			{
				if(item.buttonMode)this.target.view.style.cursor = "pointer";	
				
				if(!item.__isOver)
				{
					
					if(item.mouseover)item.mouseover(this.mouse);
					item.__isOver = true;	
				}
			}
			else
			{
				if(item.__isOver)
				{
					// roll out!
					if(item.mouseout)item.mouseout(this.mouse);
					item.__isOver = false;	
				}
			}
		}
		
		// --->
	}
}

PIXI.InteractionManager.prototype.onMouseMove = function(event)
{
	event.preventDefault();
	
	// TODO optimize by not check EVERY TIME! maybe half as often? //
	var rect = this.target.view.getBoundingClientRect();
	
	this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width);
	this.mouse.global.y = (event.clientY - rect.top) * ( this.target.height / rect.height);
	
	var length = this.interactiveItems.length;
	var global = this.mouse.global;
	
	
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mousemove)
		{
			//call the function!
			item.mousemove(this.mouse);
		}
	}
}

PIXI.InteractionManager.prototype.onMouseDown = function(event)
{
	event.preventDefault();
	
	// loop through inteaction tree...
	// hit test each item! -> 
	// get interactive items under point??
	//stage.__i
	var length = this.interactiveItems.length;
	var global = this.mouse.global;
	
	var index = 0;
	var parent = this.stage;
	
	// while 
	// hit test 
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mousedown || item.click)
		{
			item.__mouseIsDown = true;
			item.__hit = this.hitTest(item, this.mouse);
			
			if(item.__hit)
			{
				//call the function!
				if(item.mousedown)item.mousedown(this.mouse);
				item.__isDown = true;
				
				// just the one!
				if(!item.interactiveChildren)break;
			}
		}
	}
}

PIXI.InteractionManager.prototype.onMouseUp = function(event)
{
	event.preventDefault();
	var global = this.mouse.global;
	
	
	var length = this.interactiveItems.length;
	var up = false;
	
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.mouseup || item.mouseupoutside || item.click)
		{
			item.__hit = this.hitTest(item, this.mouse);
			
			if(item.__hit && !up)
			{
				//call the function!
				if(item.mouseup)
				{
					item.mouseup(this.mouse);
				}
				if(item.__isDown)
				{
					if(item.click)item.click(this.mouse);
				}
				
				if(!item.interactiveChildren)up = true;
			}
			else
			{
				if(item.__isDown)
				{
					if(item.mouseupoutside)item.mouseupoutside(this.mouse);
				}
			}
		
			item.__isDown = false;	
		}
	}
}

PIXI.InteractionManager.prototype.hitTest = function(item, interactionData)
{
	var global = interactionData.global;
	
	if(!item.visible)return false;
	
	if(item instanceof PIXI.Sprite)
	{
		var worldTransform = item.worldTransform;
		
		var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
            a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
            id = 1 / (a00 * a11 + a01 * -a10);
		
		var x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id; 
		var y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;
		
		var width = item.texture.frame.width;
		var height = item.texture.frame.height;
		
		var x1 = -width * item.anchor.x;
		
		if(x > x1 && x < x1 + width)
		{
			var y1 = -height * item.anchor.y;
			
			if(y > y1 && y < y1 + height)
			{
				// set the target property if a hit is true!
				interactionData.target = item
				return true;
			}
		}
	}
	else if(item.hitArea)
	{
		var worldTransform = item.worldTransform;
		var hitArea = item.hitArea;
		
		var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
            a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
            id = 1 / (a00 * a11 + a01 * -a10);
		
		var x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id; 
		var y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;
		
		var x1 = hitArea.x;
		if(x > x1 && x < x1 + hitArea.width)
		{
			var y1 = hitArea.y;
			
			if(y > y1 && y < y1 + hitArea.height)
			{
				return true;
			}
		}
	}
	
	var length = item.children.length;
	
	for (var i = 0; i < length; i++)
	{
		var tempItem = item.children[i];
		var hit = this.hitTest(tempItem, interactionData);
		if(hit)return true;
	}
		
	return false;	
}



PIXI.InteractionManager.prototype.onTouchMove = function(event)
{
	event.preventDefault();
	
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		
		// update the touch position
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
	}
	
	var length = this.interactiveItems.length;
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		if(item.touchmove)item.touchmove(touchData);
	}
}

PIXI.InteractionManager.prototype.onTouchStart = function(event)
{
	event.preventDefault();
	var rect = this.target.view.getBoundingClientRect();
	
	var changedTouches = event.changedTouches;
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		
		var touchData = this.pool.pop();
		if(!touchData)touchData = new PIXI.InteractionData();
		
		this.touchs[touchEvent.identifier] = touchData;
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
		
		var length = this.interactiveItems.length;
		
		for (var j = 0; j < length; j++)
		{
			var item = this.interactiveItems[j];
			
			if(item.touchstart || item.tap)
			{
				item.__hit = this.hitTest(item, touchData);
				
				if(item.__hit)
				{
					//call the function!
					if(item.touchstart)item.touchstart(touchData);
					item.__isDown = true;
					item.__touchData = touchData;
					
					if(!item.interactiveChildren)break;
				}
			}
		}
	}
	
}

PIXI.InteractionManager.prototype.onTouchEnd = function(event)
{
	event.preventDefault();
	
	
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		 
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		var up = false;
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
		
		var length = this.interactiveItems.length;
		for (var j = 0; j < length; j++)
		{
			var item = this.interactiveItems[j];
			var itemTouchData = item.__touchData; // <-- Here!
			item.__hit = this.hitTest(item, touchData);
		
			if(itemTouchData == touchData)
			{
				// so this one WAS down...
				
				// hitTest??
				
				if(item.touchend || item.tap)
				{
					if(item.__hit && !up)
					{
						if(item.touchend)item.touchend(touchData);
						if(item.__isDown)
						{
							if(item.tap)item.tap(touchData);
						}
						
						if(!item.interactiveChildren)up = true;
					}
					else
					{
						if(item.__isDown)
						{
							if(item.touchendoutside)item.touchendoutside(touchData);
						}
					}
					
					item.__isDown = false;
				}
				
				item.__touchData = null;
					
			}
			else
			{
				
			}
		}
		// remove the touch..
		this.pool.push(touchData);
		this.touchs[touchEvent.identifier] = null;
	}
}

/**
@class InteractionData
@constructor
*/
PIXI.InteractionData = function()
{
	/**
	 * This point stores the global coords of where the touch/mouse event happened
	 * @property global 
	 * @type Point
	 */
	this.global = new PIXI.Point();
	
	// this is here for legacy... but will remove
	this.local = new PIXI.Point();

	/**
	 * The target Sprite that was interacted with
	 * @property target
	 * @type Sprite
	 */
	this.target;
}

/**
 * This will return the local coords of the specified displayObject for this InteractionData
 * @method getLocalPosition
 * @param displayObject {DisplayObject} The DisplayObject that you would like the local coords off
 * @return {Point} A point containing the coords of the InteractionData position relative to the DisplayObject
 */
PIXI.InteractionData.prototype.getLocalPosition = function(displayObject)
{
	var worldTransform = displayObject.worldTransform;
	var global = this.global;
	
	// do a cheeky transform to get the mouse coords;
	var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
        a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
        id = 1 / (a00 * a11 + a01 * -a10);
	// set the mouse coords...
	return new PIXI.Point(a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id,
							   a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id)
}

// constructor
PIXI.InteractionData.constructor = PIXI.InteractionData;



/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
A Stage represents the root of the display tree. Everything connected to the stage is rendered
@class Stage
@extends DisplayObjectContainer
@constructor
@param backgroundColor {Number} the background color of the stage
@param interactive {Boolean} enable / disable interaction (default is false)
*/
PIXI.Stage = function(backgroundColor, interactive)
{
	
	PIXI.DisplayObjectContainer.call( this );
	this.worldTransform = PIXI.mat3.create()
	this.__childrenAdded = [];
	this.__childrenRemoved = [];
	this.childIndex = 0;
	this.stage= this;
	
	this.stage.hitArea = new PIXI.Rectangle(0,0,100000, 100000);
	
	// interaction!
	this.interactive = !!interactive;
	this.interactionManager = new PIXI.InteractionManager(this);
	
	this.setBackgroundColor(backgroundColor);
	this.worldVisible = true;
	
	this.stage.dirty = true;
}

// constructor
PIXI.Stage.constructor = PIXI.Stage;

PIXI.Stage.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

/**
@method updateTransform
@internal
*/
PIXI.Stage.prototype.updateTransform = function()
{
	this.worldAlpha = 1;		
	
	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
	
	if(this.dirty)
	{
		this.dirty = false;
		// update interactive!
		this.interactionManager.dirty = true;
	}

	if(this.interactive)this.interactionManager.update();
}

/**
 * @method setBackgroundColor
 * @param backgroundColor {Number}
 */
PIXI.Stage.prototype.setBackgroundColor = function(backgroundColor)
{
	this.backgroundColor = backgroundColor || 0x000000;
	this.backgroundColorSplit = HEXtoRGB(this.backgroundColor);
	var hex = this.backgroundColor.toString(16);
	hex = "000000".substr(0, 6 - hex.length) + hex;
	this.backgroundColorString = "#" + hex;
}

/**
 * This will return the point containing global coords of the mouse.
 * @method getMousePosition
 * @return {Point} The point containing the coords of the global InteractionData position.
 */
PIXI.Stage.prototype.getMousePosition = function()
{
	return this.interactionManager.mouse.global;
}

PIXI.Stage.prototype.__addChild = function(child)
{
	if(child.interactive)this.dirty = true;
	
	child.stage = this;
	
	if(child.children)
	{
		for (var i=0; i < child.children.length; i++) 
		{
		  	this.__addChild(child.children[i]);
		};
	}
	
}


PIXI.Stage.prototype.__removeChild = function(child)
{
	if(child.interactive)this.dirty = true;
	
	child.stage = undefined;
	
	if(child.children)
	{
		for(var i=0,j=child.children.length; i<j; i++)
		{
		  	this.__removeChild(child.children[i]);
		}
	}
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license


    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

window.requestAnimFrame = window.requestAnimationFrame;

function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}

/**
 * Provides bind in a cross browser way.
 */
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = (function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);
 
      if (typeof target != 'function') throw new TypeError();
 
      function bound() {
	var args = boundArgs.concat(slice.call(arguments));
	target.apply(this instanceof bound ? this : thisArg, args);
      }
 
      bound.prototype = (function F(proto) {
          proto && (F.prototype = proto);
          if (!(this instanceof F)) return new F;          
	})(target.prototype);
 
      return bound;
    };
  })();
}

var AjaxRequest = PIXI.AjaxRequest = function()
{
	var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
	
	if (window.ActiveXObject)
	{ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		for (var i=0; i<activexmodes.length; i++)
		{
			try{
				return new ActiveXObject(activexmodes[i])
			}
   			catch(e){
    			//suppress error
   			}
		}
	}
	else if (window.XMLHttpRequest) // if Mozilla, Safari etc
  	{
  		return new XMLHttpRequest()
 	}
 	else
 	{
		return false;
 	}
}








/**
 * https://github.com/mrdoob/eventtarget.js/
 * THankS mr DOob!
 */

PIXI.EventTarget = function () {

	var listeners = {};
	
	this.addEventListener = this.on = function ( type, listener ) {
		
		
		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];
			
		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );
		}

	};

	this.dispatchEvent = this.emit = function ( event ) {
		
		for ( var listener in listeners[ event.type ] ) {

			listeners[ event.type ][ listener ]( event );
			
		}

	};

	this.removeEventListener = this.off = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			listeners[ type ].splice( index, 1 );

		}

	};

};



/*
 * A lighter version of the rad gl-matrix created by Brandon Jones, Colin MacKenzie IV
 * you both rock!
 */

function determineMatrixArrayType() {
    PIXI.Matrix = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
    return PIXI.Matrix;
}

determineMatrixArrayType();

PIXI.mat3 = {};

PIXI.mat3.create = function()
{
	var matrix = new PIXI.Matrix(9);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 1;
	matrix[5] = 0;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 1;
	
	return matrix;
}

PIXI.mat4 = {};

PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	
	return matrix;
}

PIXI.mat3.multiply = function (mat, mat2, dest) 
{
	if (!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2],
	    a10 = mat[3], a11 = mat[4], a12 = mat[5],
	    a20 = mat[6], a21 = mat[7], a22 = mat[8],
	
	    b00 = mat2[0], b01 = mat2[1], b02 = mat2[2],
	    b10 = mat2[3], b11 = mat2[4], b12 = mat2[5],
	    b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];
	
	dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
	dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
	dest[2] = b00 * a02 + b01 * a12 + b02 * a22;
	
	dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
	dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
	dest[5] = b10 * a02 + b11 * a12 + b12 * a22;
	
	dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
	dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
	dest[8] = b20 * a02 + b21 * a12 + b22 * a22;
	
	return dest;
}


PIXI.mat3.toMat4 = function (mat, dest) 
{
	if (!dest) { dest = PIXI.mat4.create(); }
	
	dest[15] = 1;
	dest[14] = 0;
	dest[13] = 0;
	dest[12] = 0;
	
	dest[11] = 0;
	dest[10] = mat[8];
	dest[9] = mat[7];
	dest[8] = mat[6];
	
	dest[7] = 0;
	dest[6] = mat[5];
	dest[5] = mat[4];
	dest[4] = mat[3];
	
	dest[3] = 0;
	dest[2] = mat[2];
	dest[1] = mat[1];
	dest[0] = mat[0];
	
	return dest;
}


/////


PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	
	return matrix;
}

PIXI.mat4.transpose = function (mat, dest) 
{
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if (!dest || mat === dest) 
	{
	    var a01 = mat[1], a02 = mat[2], a03 = mat[3],
	        a12 = mat[6], a13 = mat[7],
	        a23 = mat[11];
	
	    mat[1] = mat[4];
	    mat[2] = mat[8];
	    mat[3] = mat[12];
	    mat[4] = a01;
	    mat[6] = mat[9];
	    mat[7] = mat[13];
	    mat[8] = a02;
	    mat[9] = a12;
	    mat[11] = mat[14];
	    mat[12] = a03;
	    mat[13] = a13;
	    mat[14] = a23;
	    return mat;
	}
	
	dest[0] = mat[0];
	dest[1] = mat[4];
	dest[2] = mat[8];
	dest[3] = mat[12];
	dest[4] = mat[1];
	dest[5] = mat[5];
	dest[6] = mat[9];
	dest[7] = mat[13];
	dest[8] = mat[2];
	dest[9] = mat[6];
	dest[10] = mat[10];
	dest[11] = mat[14];
	dest[12] = mat[3];
	dest[13] = mat[7];
	dest[14] = mat[11];
	dest[15] = mat[15];
	return dest;
}

PIXI.mat4.multiply = function (mat, mat2, dest) 
{
	if (!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[ 0], a01 = mat[ 1], a02 = mat[ 2], a03 = mat[3];
	var a10 = mat[ 4], a11 = mat[ 5], a12 = mat[ 6], a13 = mat[7];
	var a20 = mat[ 8], a21 = mat[ 9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	// Cache only the current line of the second matrix
    var b0  = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];  
    dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[4];
    b1 = mat2[5];
    b2 = mat2[6];
    b3 = mat2[7];
    dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[8];
    b1 = mat2[9];
    b2 = mat2[10];
    b3 = mat2[11];
    dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[12];
    b1 = mat2[13];
    b2 = mat2[14];
    b3 = mat2[15];
    dest[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    return dest;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This helper function will automatically detect which renderer you should be using.
 * WebGL is the preferred renderer as it is a lot fastest. If webGL is not supported by the browser then this function will return a canvas renderer
 * @method autoDetectRenderer
 * @static
 * @param width {Number} the width of the renderers view
 * @param height {Number} the height of the renderers view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent {Boolean} the transparency of the render view, default false
 * @default false
 */
PIXI.autoDetectRenderer = function(width, height, view, transparent)
{
	if(!width)width = 800;
	if(!height)height = 600;

	// BORROWED from Mr Doob (mrdoob.com)
	var webgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();

	//console.log(webgl);
	if( webgl )
	{
		return new PIXI.WebGLRenderer(width, height, view, transparent);
	}

	return	new PIXI.CanvasRenderer(width, height, view, transparent);
};




/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.shaderFragmentSrc = [
  "precision mediump float;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "uniform sampler2D uSampler;",
  "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
    "gl_FragColor = gl_FragColor * vColor;",
  "}"
];

PIXI.shaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  "uniform mat4 uMVMatrix;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
    "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0);",
    "vTextureCoord = aTextureCoord;",
    "vColor = aColor;",
  "}"
];

PIXI.CompileVertexShader = function(gl, shaderSrc)
{
  return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
}

PIXI.CompileFragmentShader = function(gl, shaderSrc)
{
  return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
}

PIXI._CompileShader = function(gl, shaderSrc, shaderType)
{
  var src = shaderSrc.join("\n");
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._defaultFrame = new PIXI.Rectangle(0,0,1,1);

// an instance of the gl context..
// only one at the moment :/
PIXI.gl;

/**
 * the WebGLRenderer is draws the stage and all its content onto a webGL enabled canvas. This renderer should be used for browsers support webGL. This Render works by automatically managing webGLBatchs. So no need for Sprite Batch's or Sprite Cloud's
 * Dont forget to add the view to your DOM or you will not see anything :)
 * @class WebGLRenderer
 * @constructor
 * @param width {Number} the width of the canvas view
 * @default 0
 * @param height {Number} the height of the canvas view
 * @default 0
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent {Boolean} the transparency of the render view, default false
 * @default false
 * 
 */
PIXI.WebGLRenderer = function(width, height, view, transparent)
{
	// do a catch.. only 1 webGL renderer..

	//console.log(transparent)
	this.transparent = !!transparent;
	
	this.width = width || 800;
	this.height = height || 600;
	
	this.view = view || document.createElement( 'canvas' ); 
    this.view.width = this.width;
	this.view.height = this.height;  
	
	// deal with losing context..	
    var scope = this;
	this.view.addEventListener('webglcontextlost', function(event) { scope.handleContextLost(event); }, false)
	this.view.addEventListener('webglcontextrestored', function(event) { scope.handleContextRestored(event); }, false)

	this.batchs = [];
	
	try 
 	{
        PIXI.gl = this.gl = this.view.getContext("experimental-webgl",  {  	
    		 alpha: this.transparent,
    		 antialias:false, // SPEED UP??
    		 premultipliedAlpha:false
        });
    } 
    catch (e) 
    {
    	throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
    }
    
    this.initShaders();
    
    
    var gl = this.gl;
    PIXI.WebGLRenderer.gl = gl;
    
    this.batch = new PIXI.WebGLBatch(gl);
   	gl.disable(gl.DEPTH_TEST);
   	gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, this.transparent); 
    
    this.projectionMatrix =  PIXI.mat4.create();
    this.resize(this.width, this.height);
    this.contextLost = false;
    
    this.stageRenderGroup = new PIXI.WebGLRenderGroup(this.gl);
}

// constructor
PIXI.WebGLRenderer.constructor = PIXI.WebGLRenderer;

/**
 * @private 
 */
PIXI.WebGLRenderer.getBatch = function()
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(PIXI.WebGLRenderer.gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * @private
 */
PIXI.WebGLRenderer.returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}


/**
 * @private
 */
PIXI.WebGLRenderer.prototype.initShaders = function() 
{
	var gl = this.gl;
	var fragmentShader = PIXI.CompileFragmentShader(gl, PIXI.shaderFragmentSrc);
	var vertexShader = PIXI.CompileVertexShader(gl, PIXI.shaderVertexSrc);
	
	PIXI.shaderProgram = gl.createProgram();
	
	var shaderProgram = PIXI.shaderProgram;
	
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	
	shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
    gl.enableVertexAttribArray(shaderProgram.colorAttribute);


    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
}


/**
 * Renders the stage to its webGL view
 * @method render
 * @param stage {Stage} the PIXI.Stage element to be rendered
 */
PIXI.WebGLRenderer.prototype.render = function(stage)
{
	if(this.contextLost)return;
	
	
	// if rendering a new stage clear the batchs..
	if(this.__stage !== stage)
	{
		// TODO make this work
		// dont think this is needed any more?
		//if(this.__stage)this.checkVisibility(this.__stage, false)
		
		this.__stage = stage;
		this.stageRenderGroup.setRenderable(stage);
	}
	
	// TODO not needed now... 
	// update children if need be
	// best to remove first!
	/*for (var i=0; i < stage.__childrenRemoved.length; i++)
	{
		var group = stage.__childrenRemoved[i].__renderGroup
		if(group)group.removeDisplayObject(stage.__childrenRemoved[i]);
	}*/

	// update any textures	
	PIXI.WebGLRenderer.updateTextures();
		
	// recursivly loop through all items!
	//this.checkVisibility(stage, true);
	
	// update the scene graph	
	stage.updateTransform();
	
	var gl = this.gl;
	
	// -- Does this need to be set every frame? -- //
	gl.colorMask(true, true, true, this.transparent); 
	gl.viewport(0, 0, this.width, this.height);	
	
	// set the correct matrix..	
   // gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.projectionMatrix);
   
   	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		
	gl.clearColor(stage.backgroundColorSplit[0],stage.backgroundColorSplit[1],stage.backgroundColorSplit[2], !this.transparent);     
	gl.clear(gl.COLOR_BUFFER_BIT);


	this.stageRenderGroup.backgroundColor = stage.backgroundColorSplit;
	this.stageRenderGroup.render(this.projectionMatrix);
	
	// interaction
	// run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
	
	// after rendering lets confirm all frames that have been uodated..
	if(PIXI.Texture.frameUpdates.length > 0)
	{
		for (var i=0; i < PIXI.Texture.frameUpdates.length; i++) 
		{
		  	PIXI.Texture.frameUpdates[i].updateFrame = false;
		};
		
		PIXI.Texture.frameUpdates = [];
	}
}

/**
 * @private
 */

PIXI.WebGLRenderer.updateTextures = function()
{
	for (var i=0; i < PIXI.texturesToUpdate.length; i++) this.updateTexture(PIXI.texturesToUpdate[i]);
	for (var i=0; i < PIXI.texturesToDestroy.length; i++) this.destroyTexture(PIXI.texturesToDestroy[i]);
	PIXI.texturesToUpdate = [];
	PIXI.texturesToDestroy = [];
}

PIXI.WebGLRenderer.updateTexture = function(texture)
{
	var gl = PIXI.gl;
	
	if(!texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
	}
	
	if(texture.hasLoaded)
	{
		gl.bindTexture(gl.TEXTURE_2D, texture._glTexture);
	 	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	 	
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		
		// reguler...
		
		if(!texture._powerOf2)
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}
		else
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		}
		
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
}

PIXI.WebGLRenderer.prototype.destroyTexture = function(texture)
{
	var gl = this.gl;
	
	if(texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
		gl.deleteTexture(gl.TEXTURE_2D, texture._glTexture);
	}
}

/**
 * resizes the webGL view to the specified width and height
 * @method resize
 * @param width {Number} the new width of the webGL view
 * @param height {Number} the new height of the webGL view
 */
PIXI.WebGLRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.view.width = width;
	this.view.height = height;
	
	this.gl.viewport(0, 0, this.width, this.height);	
	
	var projectionMatrix = this.projectionMatrix;
	
	projectionMatrix[0] = 2/this.width;
	projectionMatrix[5] = -2/this.height;
	projectionMatrix[12] = -1;
	projectionMatrix[13] = 1;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextLost = function(event)
{
	event.preventDefault();
	this.contextLost = true;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextRestored = function(event)
{
	this.gl = this.view.getContext("experimental-webgl",  {  	
		alpha: true
    });
        
	this.initShaders();	
	
	for (var i=0; i < PIXI.TextureCache.length; i++) 
	{
		this.updateTexture(PIXI.TextureCache[i]);
	};
	
	for (var i=0; i <  this.batchs.length; i++) 
	{
		this.batchs[i].restoreLostContext(this.gl)//
		this.batchs[i].dirty = true;
	};
	
	PIXI._restoreBatchs(this.gl);
	
	this.contextLost = false;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._batchs = [];

/**
 * @private
 */
PIXI._getBatch = function(gl)
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * @private
 */
PIXI._returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

/**
 * @private
 */
PIXI._restoreBatchs = function(gl)
{
	for (var i=0; i < PIXI._batchs.length; i++) 
	{
	  PIXI._batchs[i].restoreLostContext(gl);
	};
}

/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be grouped into a batch. All the sprites in a batch can then be drawn in one go by the GPU which is hugely efficient. ALL sprites in the webGL renderer are added to a batch even if the batch only contains one sprite. Batching is handled automatically by the webGL renderer. A good tip is: the smaller the number of batchs there are, the faster the webGL renderer will run. 
 * @class WebGLBatch
 * @param an instance of the webGL context
 * @return {PIXI.renderers.WebGLBatch} WebGLBatch {@link PIXI.renderers.WebGLBatch}
 */
PIXI.WebGLBatch = function(gl)
{
	this.gl = gl;
	
	this.size = 0;

	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
	this.blendMode = PIXI.blendModes.NORMAL;
	this.dynamicSize = 1;
}


// constructor
PIXI.WebGLBatch.constructor = PIXI.WebGLBatch;

/**
 * Cleans the batch so that is can be returned to an object pool and reused
 */
PIXI.WebGLBatch.prototype.clean = function()
{
	this.verticies = [];
	this.uvs = [];
	this.indices = [];
	this.colors = [];
	//this.sprites = [];
	this.dynamicSize = 1;
	this.texture = null;
	this.last = null;
	this.size = 0;
	
	this.head;
	this.tail;
}

/*
 * recreates the buffers in the event of a context loss
 */
PIXI.WebGLBatch.prototype.restoreLostContext = function(gl)
{
	this.gl = gl;
	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
}

/**
 * inits the batch's texture and blend mode based if the supplied sprite
 * @method init
 * @param sprite {Sprite} the first sprite to be added to the batch. Only sprites with the same base texture and blend mode will be allowed to be added to this batch
 */	
PIXI.WebGLBatch.prototype.init = function(sprite)
{
	sprite.batch = this;
	this.dirty = true;
	this.blendMode = sprite.blendMode;
	this.texture = sprite.texture.baseTexture;
//	this.sprites.push(sprite);
	this.head = sprite;
	this.tail = sprite;
	this.size = 1;
	
	this.growBatch();
}

/**
 * inserts a sprite before the specified sprite
 * @method insertBefore
 * @param sprite {Sprite} the sprite to be added
 * @param nextSprite {nextSprite} the first sprite will be inserted before this sprite
 */	
PIXI.WebGLBatch.prototype.insertBefore = function(sprite, nextSprite)
{
	this.size++;
	
	sprite.batch = this;
	this.dirty = true;
	var tempPrev = nextSprite.__prev;
	nextSprite.__prev = sprite;
	sprite.__next = nextSprite;
	
	if(tempPrev)
	{
		sprite.__prev = tempPrev;
		tempPrev.__next = sprite;
	}
	else
	{
		this.head = sprite;
		//this.head.__prev = null
	}
}

/**
 * inserts a sprite after the specified sprite
 * @method insertAfter
 * @param sprite {Sprite} the sprite to be added
 * @param  previousSprite {Sprite} the first sprite will be inserted after this sprite
 */	
PIXI.WebGLBatch.prototype.insertAfter = function(sprite, previousSprite)
{
	this.size++;
	
	
	sprite.batch = this;
	this.dirty = true;
	
	var tempNext = previousSprite.__next;
	previousSprite.__next = sprite;
	sprite.__prev = previousSprite;
	
	if(tempNext)
	{
		sprite.__next = tempNext;
		tempNext.__prev = sprite;
	}
	else
	{
		this.tail = sprite
	}
	
}

/**
 * removes a sprite from the batch
 * @method remove
 * @param sprite {Sprite} the sprite to be removed
 */	
PIXI.WebGLBatch.prototype.remove = function(sprite)
{
	this.size--;
	
	if(this.size == 0)
	{
		sprite.batch = null;
		sprite.__prev = null;
		sprite.__next = null;
		return;
	}
	
	if(sprite.__prev)
	{
		sprite.__prev.__next = sprite.__next;
	}
	else
	{
		this.head = sprite.__next;
		this.head.__prev = null;
	}
	
	if(sprite.__next)
	{
		sprite.__next.__prev = sprite.__prev;
	}
	else
	{
		this.tail = sprite.__prev;
		this.tail.__next = null
	}
	
	sprite.batch = null;
	sprite.__next = null;
	sprite.__prev = null;
	this.dirty = true;
}

/**
 * Splits the batch into two with the specified sprite being the start of the new batch.
 * @method split
 * @param sprite {Sprite} the sprite that indicates where the batch should be split
 * @return {WebGLBatch} the new batch
 */
PIXI.WebGLBatch.prototype.split = function(sprite)
{
	
	//console.log("Splitting batch :" + this.size)
//	console.log(sprite)
//	console.log("-------")
	this.dirty = true;
	
	//var val = (this.tail == this.head)
	//console.log(val + " SAME?");
	var batch = new PIXI.WebGLBatch(this.gl)//PIXI._getBatch(this.gl);
	batch.init(sprite);
	batch.texture = this.texture;
	batch.tail = this.tail;
	//console.log("id is " +batcheee.id)
	
	this.tail = sprite.__prev;
	this.tail.__next = null;
	
	sprite.__prev = null;
	// return a splite batch!
	//sprite.__prev.__next = null;
	//sprite.__prev = null;
	
	
	// TODO this size is wrong!
	// need to recalculate :/ problem with a linked list!
	// unless it gets calculated in the "clean"?
	
	// need to loop through items as there is no way to know the length on a linked list :/
	var tempSize = 0;
	while(sprite)
	{
		tempSize++;
		sprite.batch = batch;
		sprite = sprite.__next;
	}
	
	batch.size = tempSize;
	this.size -= tempSize;
	
	return batch;
}

/**
 * Merges two batchs together
 * @method merge
 * @param batch {WebGLBatch} the batch that will be merged 
 */
PIXI.WebGLBatch.prototype.merge = function(batch)
{
	this.dirty = true;
	
	this.tail.__next = batch.head;
	batch.head.__prev = this.tail;
	
	this.size += batch.size;
			
	this.tail = batch.tail;
	
	var sprite = batch.head;
	while(sprite)
	{
		sprite.batch = this;
		sprite = sprite.__next;
	}
	
}

/**
 * Grows the size of the batch. As the elements in the batch cannot have a dynamic size this function is used to increase the size of the batch. It also creates a little extra room so that the batch does not need to be resized every time a sprite is added
 * @methos growBatch
 */
PIXI.WebGLBatch.prototype.growBatch = function()
{
	var gl = this.gl;
	if( this.size == 1)
	{
		this.dynamicSize = 1;
	}
	else
	{
		this.dynamicSize = this.size * 1.5
	}
	// grow verts
	this.verticies = new Float32Array(this.dynamicSize * 8);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,this.verticies , gl.DYNAMIC_DRAW);
	
	this.uvs  = new Float32Array( this.dynamicSize * 8 )  
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.uvs , gl.DYNAMIC_DRAW);
	
	this.dirtyUVS = true;
	
	this.colors  = new Float32Array( this.dynamicSize * 4 )  
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.colors , gl.DYNAMIC_DRAW);
	
	this.dirtyColors = true;
	
	this.indices = new Uint16Array(this.dynamicSize * 6); 
	var length = this.indices.length/6;
	
	for (var i=0; i < length; i++) 
	{
	    var index2 = i * 6;
	    var index3 = i * 4;
		this.indices[index2 + 0] = index3 + 0;
		this.indices[index2 + 1] = index3 + 1;
		this.indices[index2 + 2] = index3 + 2;
		this.indices[index2 + 3] = index3 + 0;
		this.indices[index2 + 4] = index3 + 2;
		this.indices[index2 + 5] = index3 + 3;
	};
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
	
}

/**
 * Refresh's all the data in the batch and sync's it with the webGL buffers
 * @method refresh
 */
PIXI.WebGLBatch.prototype.refresh = function()
{
	var gl = this.gl;
	
	if (this.dynamicSize < this.size)
	{
		this.growBatch();
	}

	var indexRun = 0;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index
	var a, b, c, d, tx, ty
	
	var displayObject = this.head

	while(displayObject)
	{
		index = indexRun * 8;
		
		var texture = displayObject.texture;
			
		var frame = texture.frame;
		var tw = texture.baseTexture.width;
		var th = texture.baseTexture.height;
		
		this.uvs[index + 0] = frame.x / tw;
		this.uvs[index +1] = frame.y / th;
		
		this.uvs[index +2] = (frame.x + frame.width) / tw;
		this.uvs[index +3] = frame.y / th;
		
		this.uvs[index +4] = (frame.x + frame.width) / tw;
		this.uvs[index +5] = (frame.y + frame.height) / th; 
		
		this.uvs[index +6] = frame.x / tw;
		this.uvs[index +7] = (frame.y + frame.height) / th;
		
		displayObject.updateFrame = false;
		
		colorIndex = indexRun * 4;
		this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;
		
		displayObject = displayObject.__next;
		
		indexRun ++;
	}
	
	this.dirtyUVS = true;
	this.dirtyColors = true;
}

/**
 * Updates all the relevant geometry and uploads the data to the GPU
 * @method update
 */
PIXI.WebGLBatch.prototype.update = function()
{
	var gl = this.gl;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index, index2, index3
	
	var a, b, c, d, tx, ty;
	
	var indexRun = 0;
	
	var displayObject = this.head;
	
	while(displayObject)
	{
		if(displayObject.worldVisible)
		{
			width = displayObject.texture.frame.width;
			height = displayObject.texture.frame.height;
			
			// TODO trim??
			aX = displayObject.anchor.x;// - displayObject.texture.trim.x
			aY = displayObject.anchor.y; //- displayObject.texture.trim.y
			w0 = width * (1-aX);
			w1 = width * -aX;
			 
			h0 = height * (1-aY);
			h1 = height * -aY;
			 
			index = indexRun * 8;
	
			worldTransform = displayObject.worldTransform;
		
			a = worldTransform[0];
			b = worldTransform[3];
			c = worldTransform[1];
			d = worldTransform[4];
			tx = worldTransform[2];
			ty = worldTransform[5];
		
			this.verticies[index + 0 ] = a * w1 + c * h1 + tx; 
			this.verticies[index + 1 ] = d * h1 + b * w1 + ty;
			 
			this.verticies[index + 2 ] = a * w0 + c * h1 + tx; 
			this.verticies[index + 3 ] = d * h1 + b * w0 + ty; 
			
			this.verticies[index + 4 ] = a * w0 + c * h0 + tx; 
			this.verticies[index + 5 ] = d * h0 + b * w0 + ty; 
			
			this.verticies[index + 6] =  a * w1 + c * h0 + tx; 
			this.verticies[index + 7] =  d * h0 + b * w1 + ty; 
			
			
			if(displayObject.updateFrame || displayObject.texture.updateFrame)
			{
				this.dirtyUVS = true;
				
				var texture = displayObject.texture;
				
				var frame = texture.frame;
				var tw = texture.baseTexture.width;
				var th = texture.baseTexture.height;
				
				this.uvs[index + 0] = frame.x / tw;
				this.uvs[index +1] = frame.y / th;
				
				this.uvs[index +2] = (frame.x + frame.width) / tw;
				this.uvs[index +3] = frame.y / th;
				
				this.uvs[index +4] = (frame.x + frame.width) / tw;
				this.uvs[index +5] = (frame.y + frame.height) / th; 
				
				this.uvs[index +6] = frame.x / tw;
				this.uvs[index +7] = (frame.y + frame.height) / th;
				
				displayObject.updateFrame = false;
			}
			
			// TODO this probably could do with some optimisation....
			if(displayObject.cacheAlpha != displayObject.worldAlpha)
			{
				displayObject.cacheAlpha = displayObject.worldAlpha;
				
				var colorIndex = indexRun * 4;
				this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;
				this.dirtyColors = true;
			}
		}
		else
		{
			index = indexRun * 8;
			
			this.verticies[index + 0 ] = 0;
			this.verticies[index + 1 ] = 0;
			 
			this.verticies[index + 2 ] = 0;
			this.verticies[index + 3 ] = 0;
			
			this.verticies[index + 4 ] = 0;
			this.verticies[index + 5 ] = 0;
			
			this.verticies[index + 6] = 0;
			this.verticies[index + 7] = 0;
		}
		
		indexRun++;
		displayObject = displayObject.__next;
   }
}

/**
 * Draws the batch to the frame buffer
 * @method render
 */
PIXI.WebGLBatch.prototype.render = function(start, end)
{
//	console.log(start + " :: " + end + " : " + this.size);
	start = start || 0;
	//end = end || this.size;
	if(end == undefined)end = this.size;

	if(this.dirty)
	{
		this.refresh();
		this.dirty = false;
		
	}
	
	if (this.size == 0)return;
	
	this.update();
	var gl = this.gl;
	
	//TODO optimize this!
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	
	var shaderProgram = PIXI.shaderProgram;
	gl.useProgram(shaderProgram);
	
	// update the verts..
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	// ok..
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.verticies)
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	
	// update the uvs
   	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);

    if(this.dirtyUVS)
    {
    	this.dirtyUVS = false;
    	gl.bufferSubData(gl.ARRAY_BUFFER,  0, this.uvs);
    }
    
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture._glTexture);
	
	// update color!
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

	if(this.dirtyColors)
    {
    	this.dirtyColors = false;
    	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colors);
	}
	
    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
	
	// dont need to upload!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	
	
	//var startIndex = 0//1;
	var len = end - start;
	// console.log(this.size)
    // DRAW THAT this!
    gl.drawElements(gl.TRIANGLES, len * 6, gl.UNSIGNED_SHORT, start * 2 * 6 );
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */




/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be grouped into a batch. All the sprites in a batch can then be drawn in one go by the GPU which is hugely efficient. ALL sprites in the webGL renderer are added to a batch even if the batch only contains one sprite. Batching is handled automatically by the webGL renderer. A good tip is: the smaller the number of batchs there are, the faster the webGL renderer will run. 
 * @class WebGLBatch
 * @param an instance of the webGL context
 * @return {PIXI.renderers.WebGLBatch} WebGLBatch {@link PIXI.renderers.WebGLBatch}
 */
PIXI.WebGLRenderGroup = function(gl)
{
	this.gl = gl;
	this.root;
	
	this.backgroundColor;
	this.batchs = [];
	this.toRemove = [];
}


// constructor
PIXI.WebGLRenderGroup.constructor = PIXI.WebGLRenderGroup;

PIXI.WebGLRenderGroup.prototype.setRenderable = function(displayObject)
{
	// has this changed??
	if(this.root)this.removeDisplayObjectAndChildren(this.root);
	
	displayObject.worldVisible = displayObject.visible;
	
	// soooooo //
	// to check if any batchs exist already??
	
	// TODO what if its already has an object? should remove it
	this.root = displayObject;
	//displayObject.__renderGroup = this;
	this.addDisplayObjectAndChildren(displayObject);
	//displayObject
}

PIXI.WebGLRenderGroup.prototype.render = function(projectionMatrix)
{
	
	PIXI.WebGLRenderer.updateTextures();
	
	var gl = this.gl;
	
	// set the flipped matrix..
	gl.uniformMatrix4fv(PIXI.shaderProgram.mvMatrixUniform, false, projectionMatrix);
	
	// TODO remove this by replacing visible with getter setters..	
	this.checkVisibility(this.root, this.root.visible);
	
	// will render all the elements in the group
	var renderable;
	
	
	for (var i=0; i < this.batchs.length; i++) 
	{
		renderable = this.batchs[i];
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
		}
		else if(renderable instanceof PIXI.TilingSprite)
		{
			if(renderable.visible)this.renderTilingSprite(renderable, projectionMatrix);
		}
		else if(renderable instanceof PIXI.Strip)
		{
			if(renderable.visible)this.renderStrip(renderable, projectionMatrix);
		}
	}
	
}

PIXI.WebGLRenderGroup.prototype.renderSpecific = function(displayObject, projectionMatrix)
{
	PIXI.WebGLRenderer.updateTextures();
	
	var gl = this.gl;
	this.checkVisibility(displayObject, displayObject.visible);
	gl.uniformMatrix4fv(PIXI.shaderProgram.mvMatrixUniform, false, projectionMatrix);
	
	
	//console.log("SPECIFIC");
	// to do!
	// render part of the scene...
	
	var startIndex;
	var startBatchIndex;
	
	var endIndex;
	var endBatchIndex;
	
	// get NEXT Renderable!
	var nextRenderable = displayObject.renderable ? displayObject : this.getNextRenderable(displayObject);
	var startBatch = nextRenderable.batch;
	
	if(nextRenderable instanceof PIXI.Sprite)
	{
		startBatch = nextRenderable.batch;
		
		var head = startBatch.head;
		var next = head;
		
		// ok now we have the batch.. need to find the start index!
		if(head == nextRenderable)
		{
			startIndex = 0;
		}
		else
		{
			startIndex = 1;
			
			while(head.__next != nextRenderable)
			{
				startIndex++;
				head = head.__next;
			}
		}
	}
	else
	{
		startBatch = nextRenderable;
	}
	
	// Get the LAST renderable object
	var lastRenderable = displayObject;
	var endBatch;
	var lastItem = displayObject;
	while(lastItem.children.length > 0)
	{
		lastItem = lastItem.children[lastItem.children.length-1];
		if(lastItem.renderable)lastRenderable = lastItem;
	}
	
	if(lastRenderable instanceof PIXI.Sprite)
	{
		endBatch = lastRenderable.batch;
		
		var head = endBatch.head;
		
		if(head == lastRenderable)
		{
			endIndex = 0;
		}
		else
		{
			endIndex = 1;
			
			while(head.__next != lastRenderable)
			{
				endIndex++;
				head = head.__next;
			}
		}
	}
	else
	{
		endBatch = lastRenderable;
	}
	
	// TODO - need to fold this up a bit!
	
	
	if(startBatch == endBatch)
	{
		if(startBatch instanceof PIXI.WebGLBatch)
		{
			startBatch.render(startIndex, endIndex+1);
		}
		else if(startBatch instanceof PIXI.TilingSprite)
		{
			if(startBatch.visible)this.renderTilingSprite(startBatch, projectionMatrix);
		}
		else if(startBatch instanceof PIXI.Strip)
		{
			if(startBatch.visible)this.renderStrip(startBatch, projectionMatrix);
		}
		else if(startBatch instanceof PIXI.CustomRenderable)
		{
			if(startBatch.visible) startBatch.renderWebGL(this, projectionMatrix);
		}
		
		return;
	}
	
	// now we have first and last!
	startBatchIndex = this.batchs.indexOf(startBatch);
	endBatchIndex = this.batchs.indexOf(endBatch);
	
	// DO the first batch
	if(startBatch instanceof PIXI.WebGLBatch)
	{
		startBatch.render(startIndex);
	}
	else if(startBatch instanceof PIXI.TilingSprite)
	{
		if(startBatch.visible)this.renderTilingSprite(startBatch, projectionMatrix);
	}
	else if(startBatch instanceof PIXI.Strip)
	{
		if(startBatch.visible)this.renderStrip(startBatch, projectionMatrix);
	}
	else if(startBatch instanceof PIXI.CustomRenderable)
	{
		if(startBatch.visible) startBatch.renderWebGL(this, projectionMatrix);
	}
	
	// DO the middle batchs..
	for (var i=startBatchIndex+1; i < endBatchIndex; i++) 
	{
		renderable = this.batchs[i];
	
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
		}
		else if(renderable instanceof PIXI.TilingSprite)
		{
			if(renderable.visible)this.renderTilingSprite(renderable, projectionMatrix);
		}
		else if(renderable instanceof PIXI.Strip)
		{
			if(renderable.visible)this.renderStrip(renderable, projectionMatrix);
		}
		else if(renderable instanceof PIXI.CustomRenderable)
		{
			if(renderable.visible) renderable.renderWebGL(this, projectionMatrix);
		}
		
	}
	
	// DO the last batch..
	if(endBatch instanceof PIXI.WebGLBatch)
	{
		endBatch.render(0, endIndex+1);
	}
	else if(endBatch instanceof PIXI.TilingSprite)
	{
		if(endBatch.visible)this.renderTilingSprite(endBatch);
	}
	else if(endBatch instanceof PIXI.Strip)
	{
		if(endBatch.visible)this.renderStrip(endBatch);
	}
	else if(endBatch instanceof PIXI.CustomRenderable)
	{
		if(endBatch.visible) endBatch.renderWebGL(this, projectionMatrix);
	}
}

PIXI.WebGLRenderGroup.prototype.checkVisibility = function(displayObject, globalVisible)
{
	// give the dp a refference to its renderGroup...
	var children = displayObject.children;
	//displayObject.worldVisible = globalVisible;
	for (var i=0; i < children.length; i++) 
	{
		var child = children[i];
		
		// TODO optimize... shouldt need to loop through everything all the time
		child.worldVisible = child.visible && globalVisible;
		
		// everything should have a batch!
		// time to see whats new!
		if(child.textureChange)
		{
			child.textureChange = false;
			if(child.worldVisible)
			{
				this.removeDisplayObject(child);
				this.addDisplayObject(child);
				//this.updateTexture(child);
			}
			// update texture!!
		}
		
		if(child.children.length > 0)
		{
			this.checkVisibility(child, child.worldVisible);
		}
	};
}

PIXI.WebGLRenderGroup.prototype.updateTexture = function(displayObject)
{
	// we know this exists..
	// is it in a batch..
	// check batch length
	if(displayObject.batch.length == 1)
	{
		// just one! this guy! so simply swap the texture
		displayObject.batch.texture = displayObject.texture.baseTexture;
		return;
	}
	
	// early out!
	if(displayObject.batch.texture == displayObject.texture.baseTexture)return;
	
	
	if(displayObject.batch.head == displayObject)
	{
		//console.log("HEAD")
		var currentBatch = displayObject.batch;
		
		var index = this.batchs.indexOf( currentBatch );
		var previousBatch =  this.batchs[index-1];
		currentBatch.remove(displayObject);
		
		if(previousBatch)
		{
			if(previousBatch.texture == displayObject.texture.baseTexture && previousBatch.blendMode == displayObject.blendMode)
			{
				previousBatch.insertAfter(displayObject, previousBatch.tail);
			}
			else
			{
				// add it before..
				var batch = PIXI.WebGLRenderer.getBatch();
				batch.init(displayObject);
				this.batchs.splice(index-1, 0, batch);
			}
			
		}
		else
		{
			// we are 0!
			var batch = PIXI.WebGLRenderer.getBatch();
			batch.init(displayObject);
			this.batchs.splice(0, 0, batch);
		}
		
	}
	else if(displayObject.batch.tail == displayObject)
	{
		var currentBatch = displayObject.batch;
		
		var index = this.batchs.indexOf( currentBatch );
		var nextBatch =  this.batchs[index+1];
		currentBatch.remove(displayObject);
		
		if(nextBatch)
		{
			if(nextBatch.texture == displayObject.texture.baseTexture && nextBatch.blendMode == displayObject.blendMode)
			{
				nextBatch.insertBefore(displayObject, nextBatch.head);
				return;
			}
			else
			{
				// add it before..
				var batch = PIXI.WebGLRenderer.getBatch();
				batch.init(displayObject);
				this.batchs.splice(index+1, 0, batch);
			}
			
		}
		else
		{
			// we are 0!
			var batch = PIXI.WebGLRenderer.getBatch();
			batch.init(displayObject);
			this.batchs.push(batch);
		}
	}
	else
	{
	//	console.log("MIDDLE")
		var currentBatch = displayObject.batch;
		
		// split the batch into 2
		// AH! dont split on the current display object as the texture is wrong!
		var splitBatch = currentBatch.split(displayObject);
		
		// now remove the display object
		splitBatch.remove(displayObject);
		
		var batch = PIXI.WebGLRenderer.getBatch();
		var index = this.batchs.indexOf( currentBatch );
		batch.init(displayObject);
		this.batchs.splice(index+1, 0, batch, splitBatch);
	}
}

PIXI.WebGLRenderGroup.prototype.addDisplayObject = function(displayObject)
{
	// add a child to the render group..
	if(displayObject.__renderGroup)displayObject.__renderGroup.removeDisplayObjectAndChildren(displayObject);

	// DONT htink this is needed?
	//	displayObject.batch = null;
	
	displayObject.__renderGroup = this;

	//displayObject.cacheVisible = true;
	if(!displayObject.renderable)return;

	// while looping below THE OBJECT MAY NOT HAVE BEEN ADDED
	//displayObject.__inWebGL = true;
	
	var previousSprite = this.getPreviousRenderable(displayObject);
	var nextSprite = this.getNextRenderable(displayObject);
	

	/*
	 * so now we have the next renderable and the previous renderable
	 * 
	 */
	
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch
		var nextBatch
		
		//console.log( previousSprite)
		if(previousSprite instanceof PIXI.Sprite)
		{
			previousBatch = previousSprite.batch;
			if(previousBatch)
			{
				if(previousBatch.texture == displayObject.texture.baseTexture && previousBatch.blendMode == displayObject.blendMode)
				{
					previousBatch.insertAfter(displayObject, previousSprite);
					return;
				}
			}
		}
		else
		{
			// TODO reword!
			previousBatch = previousSprite;
		}
	
		if(nextSprite)
		{
			if(nextSprite instanceof PIXI.Sprite)
			{
				nextBatch = nextSprite.batch;
			
				//batch may not exist if item was added to the display list but not to the webGL
				if(nextBatch)
				{
					if(nextBatch.texture == displayObject.texture.baseTexture && nextBatch.blendMode == displayObject.blendMode)
					{
						nextBatch.insertBefore(displayObject, nextSprite);
						return;
					}
					else
					{
						if(nextBatch == previousBatch)
						{
							// THERE IS A SPLIT IN THIS BATCH! //
							var splitBatch = previousBatch.split(nextSprite);
							// COOL!
							// add it back into the array	
							/*
							 * OOPS!
							 * seems the new sprite is in the middle of a batch
							 * lets split it.. 
							 */
							var batch = PIXI.WebGLRenderer.getBatch();

							var index = this.batchs.indexOf( previousBatch );
							batch.init(displayObject);
							this.batchs.splice(index+1, 0, batch, splitBatch);
							
							return;
						}
					}
				}
			}
			else
			{
				// TODO re-word!
				nextBatch = nextSprite;
			}
		}
		
		/*
		 * looks like it does not belong to any batch!
		 * but is also not intersecting one..
		 * time to create anew one!
		 */
		
		var batch =  PIXI.WebGLRenderer.getBatch();
		batch.init(displayObject);

		if(previousBatch) // if this is invalid it means 
		{
			var index = this.batchs.indexOf( previousBatch );
			this.batchs.splice(index+1, 0, batch);
		}
		else
		{
			this.batchs.push(batch);
		}
	
	}
	else if(displayObject instanceof PIXI.TilingSprite)
	{
		// add to a batch!!
		this.initTilingSprite(displayObject);
		this.batchs.push(displayObject);
		
	}
	else if(displayObject instanceof PIXI.Strip)
	{
		// add to a batch!!
		this.initStrip(displayObject);
		this.batchs.push(displayObject);
	}
	
	// if its somthing else... then custom codes!
	this.batchUpdate = true;
}

PIXI.WebGLRenderGroup.prototype.addDisplayObjectAndChildren = function(displayObject)
{
	// TODO - this can be faster - but not as important right now
	
	this.addDisplayObject(displayObject);
	var children = displayObject.children;
	
	for (var i=0; i < children.length; i++) 
	{
	  	this.addDisplayObjectAndChildren(children[i]);
	};
}

PIXI.WebGLRenderGroup.prototype.removeDisplayObject = function(displayObject)
{
	// loop through children..
	// display object //
	
	// add a child from the render group..
	// remove it and all its children!
	//displayObject.cacheVisible = false;//displayObject.visible;
	displayObject.__renderGroup = null;
	
	if(!displayObject.renderable)return;
	
	/*
	 * removing is a lot quicker..
	 * 
	 */
	var batchToRemove;
	
	if(displayObject instanceof PIXI.Sprite)
	{
		// should always have a batch!
		var batch = displayObject.batch;
		if(!batch)return; // this means the display list has been altered befre rendering
		
		batch.remove(displayObject);
		
		if(batch.size==0)
		{
			batchToRemove = batch;
		}
	}
	else
	{
		batchToRemove = displayObject;
	}
	
	/*
	 * Looks like there is somthing that needs removing!
	 */
	if(batchToRemove)	
	{
		var index = this.batchs.indexOf( batchToRemove );
		if(index == -1)return;// this means it was added then removed before rendered
		
		// ok so.. check to see if you adjacent batchs should be joined.
		// TODO may optimise?
		if(index == 0 || index == this.batchs.length-1)
		{
			// wha - eva! just get of the empty batch!
			this.batchs.splice(index, 1);
			if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
		
			return;
		}
		
		if(this.batchs[index-1] instanceof PIXI.WebGLBatch && this.batchs[index+1] instanceof PIXI.WebGLBatch)
		{
			if(this.batchs[index-1].texture == this.batchs[index+1].texture && this.batchs[index-1].blendMode == this.batchs[index+1].blendMode)
			{
				//console.log("MERGE")
				this.batchs[index-1].merge(this.batchs[index+1]);
				
				if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
				PIXI.WebGLRenderer.returnBatch(this.batchs[index+1]);
				this.batchs.splice(index, 2);
				return;
			}
		}
		
		
		this.batchs.splice(index, 1);
		if(batchToRemove instanceof PIXI.WebGLBatch)PIXI.WebGLRenderer.returnBatch(batchToRemove);
	}
}

PIXI.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren = function(displayObject)
{
	// TODO - this can be faster - but not as important right now
	if(displayObject.__renderGroup != this)return;
	
	this.removeDisplayObject(displayObject);
	var children = displayObject.children;
	
	for (var i=0; i < children.length; i++) 
	{
	  	this.removeDisplayObjectAndChildren(children[i]);
	};
}

/**
 * @private
 */

PIXI.WebGLRenderGroup.prototype.getNextRenderable = function(displayObject)
{
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 * 
	 *  These look a lot scarier than the actually are...
	 */
	
	var nextSprite = displayObject;
	do
	{
		// moving forward!
		// if it has no children.. 
		if(nextSprite.children.length == 0)
		{
			//maynot have a parent
			if(!nextSprite.parent)return null;
			
			// go along to the parent..
			while(nextSprite.childIndex == nextSprite.parent.children.length-1)
			{
				nextSprite = nextSprite.parent;
				//console.log(">" + nextSprite);
//				console.log(">-" + this.root);
				if(nextSprite ==  this.root || !nextSprite.parent)//displayObject.stage)
				{
					nextSprite = null
					break;
				}
			}
			
			if(nextSprite)nextSprite = nextSprite.parent.children[nextSprite.childIndex+1];
		}
		else
		{
			nextSprite = nextSprite.children[0];
		}

		if(!nextSprite)break;
	}
	while(!nextSprite.renderable || !nextSprite.__renderGroup)
	
	return nextSprite;
}

PIXI.WebGLRenderGroup.prototype.getPreviousRenderable = function(displayObject)
{
	/*
	 *  LOOK FOR THE PREVIOUS SPRITE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousSprite = displayObject;
	do
	{
		if(previousSprite.childIndex == 0)
		{
			previousSprite = previousSprite.parent;
			if(!previousSprite)return null;
		}
		else
		{
			
			previousSprite = previousSprite.parent.children[previousSprite.childIndex-1];
			// what if the bloop has children???
			while(previousSprite.children.length != 0)
			{
				// keep diggin till we get to the last child
				previousSprite = previousSprite.children[previousSprite.children.length-1];
			}
		}
		
		if(previousSprite == this.root)break;
	}
	while(!previousSprite.renderable || !previousSprite.__renderGroup);
	
	return previousSprite;
}

/**
 * @private
 */
PIXI.WebGLRenderGroup.prototype.initTilingSprite = function(sprite)
{
	var gl = this.gl;

	// make the texture tilable..
			
	sprite.verticies = new Float32Array([0, 0,
										  sprite.width, 0,
										  sprite.width,  sprite.height,
										 0,  sprite.height]);
					
	sprite.uvs = new Float32Array([0, 0,
									1, 0,
									1, 1,
									0, 1]);
				
	sprite.colors = new Float32Array([1,1,1,1]);
	
	sprite.indices =  new Uint16Array([0, 1, 3,2])//, 2]);
	
	
	sprite._vertexBuffer = gl.createBuffer();
	sprite._indexBuffer = gl.createBuffer();
	sprite._uvBuffer = gl.createBuffer();
	sprite._colorBuffer = gl.createBuffer();
						
	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sprite.verticies, gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  sprite.uvs, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, sprite._colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sprite.colors, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sprite._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sprite.indices, gl.STATIC_DRAW);
    
//    return ( (x > 0) && ((x & (x - 1)) == 0) );

	if(sprite.texture.baseTexture._glTexture)
	{
    	gl.bindTexture(gl.TEXTURE_2D, sprite.texture.baseTexture._glTexture);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		sprite.texture.baseTexture._powerOf2 = true;
	}
	else
	{
		sprite.texture.baseTexture._powerOf2 = true;
	}
}

/**
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderStrip = function(strip, projectionMatrix)
{
	var gl = this.gl;
	var shaderProgram = PIXI.shaderProgram;
//	mat
	var mat4Real = PIXI.mat3.toMat4(strip.worldTransform);
	PIXI.mat4.transpose(mat4Real);
	PIXI.mat4.multiply(projectionMatrix, mat4Real, mat4Real )

	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mat4Real);
  
	if(strip.blendMode == PIXI.blendModes.NORMAL)
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}
	else
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	}
	
	if(!strip.dirty)
	{
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, strip.verticies)
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
    
	
	}
	else
	{
		strip.dirty = false;
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	   	gl.bufferData(gl.ARRAY_BUFFER, strip.uvs, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
	    
	}
	//console.log(gl.TRIANGLE_STRIP)
	gl.drawElements(gl.TRIANGLE_STRIP, strip.indices.length, gl.UNSIGNED_SHORT, 0);
    
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, projectionMatrix);
  
}


/**
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderTilingSprite = function(sprite, projectionMatrix)
{
	var gl = this.gl;
	var shaderProgram = PIXI.shaderProgram;
	
	var tilePosition = sprite.tilePosition;
	var tileScale = sprite.tileScale;
	
	var offsetX =  tilePosition.x/sprite.texture.baseTexture.width;
	var offsetY =  tilePosition.y/sprite.texture.baseTexture.height;
	
	var scaleX =  (sprite.width / sprite.texture.baseTexture.width)  / tileScale.x;
	var scaleY =  (sprite.height / sprite.texture.baseTexture.height) / tileScale.y;

	sprite.uvs[0] = 0 - offsetX;
	sprite.uvs[1] = 0 - offsetY;
	
	sprite.uvs[2] = (1 * scaleX)  -offsetX;
	sprite.uvs[3] = 0 - offsetY;
	
	sprite.uvs[4] = (1 *scaleX) - offsetX;
	sprite.uvs[5] = (1 *scaleY) - offsetY;
	
	sprite.uvs[6] = 0 - offsetX;
	sprite.uvs[7] = (1 *scaleY) - offsetY;
	
	gl.bindBuffer(gl.ARRAY_BUFFER, sprite._uvBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, sprite.uvs)
	
	this.renderStrip(sprite, projectionMatrix);
}



/**
 * @private
 */
PIXI.WebGLRenderer.prototype.initStrip = function(strip)
{
	// build the strip!
	var gl = this.gl;
	var shaderProgram = this.shaderProgram;
	
	strip._vertexBuffer = gl.createBuffer();
	strip._indexBuffer = gl.createBuffer();
	strip._uvBuffer = gl.createBuffer();
	strip._colorBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.DYNAMIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  strip.uvs, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW);

	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * the CanvasRenderer draws the stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
 * Dont forget to add the view to your DOM or you will not see anything :)
 * @class CanvasRenderer
 * @constructor
 * @param width {Number} the width of the canvas view
 * @default 0
 * @param height {Number} the height of the canvas view
 * @default 0
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent {Boolean} the transparency of the render view, default false
 * @default false
 * 
 */
PIXI.CanvasRenderer = function(width, height, view, transparent)
{
	this.transparent = transparent;
	
	/**
	 * The width of the canvas view
	 * @property width
	 * @type Number
	 * @default 800
	 */
	this.width = width || 800;
	/**
	 * The height of the canvas view
	 * @property height
	 * @type Number
	 * @default 600
	 */
	this.height = height || 600;
	
	this.refresh = true;
	
	/**
	 * The canvas element that the everything is drawn to
	 * @property view
	 * @type Canvas
	 */
	this.view = view || document.createElement( 'canvas' ); 
	
	// hack to enable some hardware acceleration!
	//this.view.style["transform"] = "translatez(0)";
	
    this.view.width = this.width;
	this.view.height = this.height;  
	this.count = 0;
	
	/**
	 * The canvas context that the everything is drawn to
	 * @property context
	 * @type Canvas 2d Context
	 */
	this.context = this.view.getContext("2d");
}

// constructor
PIXI.CanvasRenderer.constructor = PIXI.CanvasRenderer;

/**
 * Renders the stage to its canvas view
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.CanvasRenderer.prototype.render = function(stage)
{
	// update children if need be
	
	//stage.__childrenAdded = [];
	//stage.__childrenRemoved = [];
	
	// update textures if need be
	PIXI.texturesToUpdate = [];
	PIXI.texturesToDestroy = [];
	
	stage.updateTransform();
	
	// update the background color
	if(this.view.style.backgroundColor!=stage.backgroundColorString && !this.transparent)this.view.style.backgroundColor = stage.backgroundColorString;

	this.context.setTransform(1,0,0,1,0,0); 
	this.context.clearRect(0, 0, this.width, this.height)
    this.renderDisplayObject(stage);
    //as
   
    // run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
	
	// remove frame updates..
	if(PIXI.Texture.frameUpdates.length > 0)
	{
		PIXI.Texture.frameUpdates = [];
	}
}

/**
 * resizes the canvas view to the specified width and height
 * @param the new width of the canvas view
 * @param the new height of the canvas view
 */
PIXI.CanvasRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.view.width = width;
	this.view.height = height;
}

/**
 * @private
 */

PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject)
{
	var transform = displayObject.worldTransform;
	var context = this.context;
	//context.globalCompositeOperation = "source-over"
	var blit = false;
	
	if(!displayObject.visible)return;
		
	if(displayObject instanceof PIXI.Sprite)
	{
		var frame = displayObject.texture.frame;
		
		if(frame)
		{
			context.globalAlpha = displayObject.worldAlpha;
			
			// BLITZ!!!
			/*
			 * if the rotation is 0 then we can blitz it
			 * meaning we dont need to do a transform and also we
			 * can round to the nearest round number for a little extra speed!
			 */
			/*if(displayObject.rotation == 0)
			{
				if(!blit)this.context.setTransform(1,0,0,1,0,0); 
				blit = true;
				context.drawImage(displayObject.texture.baseTexture.image, 
								   frame.x,
								   frame.y,
								   frame.width,
								   frame.height,
								   (transform[2]+ ((displayObject.anchor.x - displayObject.texture.trim.x) * -frame.width) * transform[0]),
								   (transform[5]+ ((displayObject.anchor.y - displayObject.texture.trim.y) * -frame.height)* transform[4]),
								   (displayObject.width * transform[0]),
								   (displayObject.height * transform[4]));
				
			}	
			else
			{*/
			//	blit = false;
				context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
				
				context.drawImage(displayObject.texture.baseTexture.source, 
								   frame.x,
								   frame.y,
								   frame.width,
								   frame.height,
								   (displayObject.anchor.x) * -frame.width, 
								   (displayObject.anchor.y) * -frame.height,
								 //   (displayObject.anchor.x - displayObject.texture.trim.x) * -frame.width, 
								  // (displayObject.anchor.y - displayObject.texture.trim.y) * -frame.height,
								  
								   frame.width,
								   frame.height);
			//}
		}					   
   	}
   	else if(displayObject instanceof PIXI.Strip)
	{
		context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
		this.renderStrip(displayObject);
	}
	else if(displayObject instanceof PIXI.TilingSprite)
	{
		context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
		this.renderTilingSprite(displayObject);
	}
	else if(displayObject instanceof PIXI.CustomRenderable)
	{
		displayObject.renderCanvas(this);
	}
	
	// render!
	if(displayObject.children)
	{
		for (var i=0; i < displayObject.children.length; i++) 
		{
			this.renderDisplayObject(displayObject.children[i]);
		}
	}
	
	this.context.setTransform(1,0,0,1,0,0); 
}

/**
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStripFlat = function(strip)
{
	var context = this.context;
	var verticies = strip.verticies;
	var uvs = strip.uvs;
	
	var length = verticies.length/2;
	this.count++;
	
	context.beginPath();
	for (var i=1; i < length-2; i++) 
	{
		
		// draw some triangles!
		var index = i*2;
		
		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];
 		 
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);
		
	};	
	
//	context.globalCompositeOperation = 'lighter';
	context.fillStyle = "#FF0000";
	context.fill();
	context.closePath();
	//context.globalCompositeOperation = 'source-over';	
}

/**
 * @private
 */
PIXI.CanvasRenderer.prototype.renderTilingSprite = function(sprite)
{
	var context = this.context;
	
 	if(!sprite.__tilePattern) sprite.__tilePattern = context.createPattern(sprite.texture.baseTexture.source, "repeat");
 	
	context.beginPath();
	
	var tilePosition = sprite.tilePosition;
	var tileScale = sprite.tileScale;
	
    // offset
    context.scale(tileScale.x,tileScale.y);
    context.translate(tilePosition.x, tilePosition.y);
 	
	context.fillStyle = sprite.__tilePattern;
	context.fillRect(-tilePosition.x,-tilePosition.y,sprite.width / tileScale.x, sprite.height / tileScale.y);
	
	context.scale(1/tileScale.x, 1/tileScale.y);
    context.translate(-tilePosition.x, -tilePosition.y);
    
    context.closePath();
}



/**
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStrip = function(strip)
{
	var context = this.context;
	//context.globalCompositeOperation = 'lighter';
	// draw triangles!!
	var verticies = strip.verticies;
	var uvs = strip.uvs;
	
	var length = verticies.length/2;
	this.count++;
	for (var i=1; i < length-2; i++) 
	{
		
		// draw some triangles!
		var index = i*2;
		
		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];
 		 
  		 var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2] * strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
   		 var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3] * strip.texture.height, v2 = uvs[index+5]* strip.texture.height;


		context.save();
		context.beginPath();
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);
		context.closePath();
		
	//	context.fillStyle = "white"//rgb(1, 1, 1,1));
	//	context.fill();
		context.clip();
		
		
        // Compute matrix transform
        var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
        var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
        var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
        var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
        var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
        var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
        var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;
		
		
		
		    
        context.transform(delta_a/delta, delta_d/delta,
                      delta_b/delta, delta_e/delta,
                      delta_c/delta, delta_f/delta);
                 
		context.drawImage(strip.texture.baseTexture.source, 0, 0);
	  	context.restore();
	};
	
//	context.globalCompositeOperation = 'source-over';	
}









/**
 * @author Mat Groves http://matgroves.com/
 */

PIXI.Strip = function(texture, width, height)
{
	PIXI.DisplayObjectContainer.call( this );
	this.texture = texture;
	this.blendMode = PIXI.blendModes.NORMAL;
	
	try
	{
		this.uvs = new Float32Array([0, 1,
				1, 1,
				1, 0, 0,1]);
	
		this.verticies = new Float32Array([0, 0,
						  0,0,
						  0,0, 0,
						  0, 0]);
						  
		this.colors = new Float32Array([1, 1, 1, 1]);
		
		this.indices = new Uint16Array([0, 1, 2, 3]);
	}
	catch(error)
	{
		this.uvs = [0, 1,
				1, 1,
				1, 0, 0,1];
	
		this.verticies = [0, 0,
						  0,0,
						  0,0, 0,
						  0, 0];
						  
		this.colors = [1, 1, 1, 1];
		
		this.indices = [0, 1, 2, 3];
	}
	
	
	/*
	this.uvs = new Float32Array()
	this.verticies = new Float32Array()
	this.colors = new Float32Array()
	this.indices = new Uint16Array()
*/
	this.width = width;
	this.height = height;
	
	// load the texture!
	if(texture.baseTexture.hasLoaded)
	{
		this.width   = this.texture.frame.width;
		this.height  = this.texture.frame.height;
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}
	
	this.renderable = true;
}

// constructor
PIXI.Strip.constructor = PIXI.Strip;
PIXI.Strip.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

PIXI.Strip.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY
	
	// stop current texture 
	this.texture = texture;
	this.width   = texture.frame.width;
	this.height  = texture.frame.height;
	this.updateFrame = true;
}

PIXI.Strip.prototype.onTextureUpdate = function(event)
{
	this.updateFrame = true;
}
// some helper functions..


/**
 * @author Mat Groves http://matgroves.com/
 */


PIXI.Rope = function(texture, points)
{
	PIXI.Strip.call( this, texture );
	this.points = points;
	
	try
	{
		this.verticies = new Float32Array( points.length * 4);
		this.uvs = new Float32Array( points.length * 4);
		this.colors = new Float32Array(  points.length * 2);
		this.indices = new Uint16Array( points.length * 2);
	}
	catch(error)
	{
		this.verticies = verticies
		
		this.uvs = uvs
		this.colors = colors
		this.indices = indices
	}
	
	this.refresh();
}


// constructor
PIXI.Rope.constructor = PIXI.Rope;
PIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );

PIXI.Rope.prototype.refresh = function()
{
	var points = this.points;
	if(points.length < 1)return;
	
	var uvs = this.uvs
	var indices = this.indices;
	var colors = this.colors;
	
	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];
	
	this.count-=0.2;
	
	
	uvs[0] = 0
	uvs[1] = 1
	uvs[2] = 0
	uvs[3] = 1
	
	colors[0] = 1;
	colors[1] = 1;
	
	indices[0] = 0;
	indices[1] = 1;
	
	var total = points.length;
		
	for (var i =  1; i < total; i++) 
	{
		
		var point = points[i];
		var index = i * 4;
		// time to do some smart drawing!
		var amount = i/(total-1)
		
		if(i%2)
		{
			uvs[index] = amount;
			uvs[index+1] = 0;
			
			uvs[index+2] = amount
			uvs[index+3] = 1
		
		}
		else
		{
			uvs[index] = amount
			uvs[index+1] = 0
			
			uvs[index+2] = amount
			uvs[index+3] = 1
		}
		
		index = i * 2;
		colors[index] = 1;
		colors[index+1] = 1;
		
		index = i * 2;
		indices[index] = index;
		indices[index + 1] = index + 1;
		
		lastPoint = point;
	}
}

PIXI.Rope.prototype.updateTransform = function()
{
	
	var points = this.points;
	if(points.length < 1)return;
	
	var verticies = this.verticies 
	
	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];
	
	this.count-=0.2;
	
	verticies[0] = point.x + perp.x 
	verticies[1] = point.y + perp.y //+ 200
	verticies[2] = point.x - perp.x 
	verticies[3] = point.y - perp.y//+200
	// time to do some smart drawing!
	
	var total = points.length;
		
	for (var i =  1; i < total; i++) 
	{
		
		var point = points[i];
		var index = i * 4;
		
		if(i < points.length-1)
		{
			nextPoint = points[i+1];
		}
		else
		{
			nextPoint = point
		}
		
		perp.y = -(nextPoint.x - lastPoint.x);
		perp.x = nextPoint.y - lastPoint.y;
		
		var ratio = (1 - (i / (total-1))) * 10;
				if(ratio > 1)ratio = 1;
				
		var perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
		var num = this.texture.height/2//(20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio;
		perp.x /= perpLength;
		perp.y /= perpLength;
	
		perp.x *= num;
		perp.y *= num;
		
		verticies[index] = point.x + perp.x 
		verticies[index+1] = point.y + perp.y
		verticies[index+2] = point.x - perp.x 
		verticies[index+3] = point.y - perp.y

		lastPoint = point;
	}
	
	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

PIXI.Rope.prototype.setTexture = function(texture)
{
	// stop current texture 
	this.texture = texture;
	this.updateFrame = true;
}





/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * A tiling sprite is a fast way of rendering a tiling image
 * @class TilingSprite
 * @extends DisplayObjectContainer
 * @constructor
 * @param texture {Texture} the texture of the tiling sprite
 * @param width {Number}  the width of the tiling sprite
 * @param height {Number} the height of the tiling sprite
 */
PIXI.TilingSprite = function(texture, width, height)
{
	PIXI.DisplayObjectContainer.call( this );
	
	this.texture = texture;
	this.width = width;
	this.height = height;
	this.renderable = true;
	
	/**
	 * The scaling of the image that is being tiled
	 * @property tileScale
	 * @type Point
	 */	
	this.tileScale = new PIXI.Point(1,1);
	/**
	 * The offset position of the image that is being tiled
	 * @property tilePosition
	 * @type Point
	 */	
	this.tilePosition = new PIXI.Point(0,0);
	
	this.blendMode = PIXI.blendModes.NORMAL
}

// constructor
PIXI.TilingSprite.constructor = PIXI.TilingSprite;
PIXI.TilingSprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

PIXI.TilingSprite.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY
	
	// stop current texture 
	this.texture = texture;
	this.updateFrame = true;
}

PIXI.TilingSprite.prototype.onTextureUpdate = function(event)
{
	this.updateFrame = true;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * based on pixi impact spine implementation made by Eemeli Kelokorpi (@ekelokorpi) https://github.com/ekelokorpi
 * 
 * Awesome JS run time provided by EsotericSoftware
 * https://github.com/EsotericSoftware/spine-runtimes
 * 
 */

/**
 * A class that enables the you to import and run your spine animations in pixi.
 * Spine animation data needs to be loaded using the PIXI.AssetLoader or PIXI.SpineLoader before it can be used by this class
 * Also due to a clash of names  You will need to change the extension of the spine file from *.json to *.anim for it to load
 * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
 * @class Spine
 * @constructor
 * @extends 
 * @param {String} url the url of the spine anim file to be used
 */
PIXI.Spine = function(url)
{
	PIXI.DisplayObjectContainer.call(this);
	
	this.spineData = PIXI.AnimCache[url];
	
	if(!this.spineData)
	{
		throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + url);
		return;
	}
	
	this.count = 0;
	
	this.sprites = [];
	
	this.skeleton = new spine.Skeleton(this.spineData);
	this.skeleton.updateWorldTransform();

	this.stateData = new spine.AnimationStateData(this.spineData);	
	this.state = new spine.AnimationState(this.stateData);
	
	// add the sprites..
	for (var i = 0; i < this.skeleton.drawOrder.length; i++) {
		
		var attachmentName = this.skeleton.drawOrder[i].data.attachmentName;
		
		// kind of an assumtion here. that its a png
		if(!PIXI.TextureCache[attachmentName])
		{
			attachmentName += ".png";
		}
		
		
		var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(attachmentName));
		sprite.anchor.x = sprite.anchor.y = 0.5;
		this.addChild(sprite);
		this.sprites.push(sprite);
	};
}

PIXI.Spine.constructor = PIXI.Spine;
PIXI.Spine.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Spine.prototype.updateTransform = function()
{
	// TODO should make this time based really..
	this.state.update(1/60);
	this.state.apply(this.skeleton);
	this.skeleton.updateWorldTransform();

	
	for (var i = 0; i < this.skeleton.drawOrder.length; i++) 
	{
		var slot = this.skeleton.drawOrder[i];

		var x = slot.bone.worldX + slot.attachment.x * slot.bone.m00 + slot.attachment.y * slot.bone.m01 + slot.attachment.width * 0.5;
		var y = slot.bone.worldY + slot.attachment.x * slot.bone.m10 + slot.attachment.y * slot.bone.m11 + slot.attachment.height * 0.5;
		//console.log(x + ' : ' + y);
		
		 
			//console.log(slot.attachment.name)
			if(slot.cacheName != slot.attachment.name)
			{
				var attachmentName = slot.attachment.name;
		
				if(!PIXI.TextureCache[attachmentName])
				{
					attachmentName += ".png";
				}
				
				this.sprites[i].setTexture(PIXI.TextureCache[attachmentName]);
				
				slot.cacheName = slot.attachment.name;
			}
		
		x += -((slot.attachment.width * (slot.bone.worldScaleX + slot.attachment.scaleX - 1))>>1);
		y += -((slot.attachment.height * (slot.bone.worldScaleY + slot.attachment.scaleY - 1))>>1);
		
		
		this.sprites[i].position.x = x;
		this.sprites[i].position.y = y;
		this.sprites[i].rotation = (-(slot.bone.worldRotation + slot.attachment.rotation)) * (Math.PI/180);
	}	
	
	PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
}

/*
 * Awesome JS run time provided by EsotericSoftware
 * 
 * https://github.com/EsotericSoftware/spine-runtimes
 * 
 */

var spine = {};

spine.BoneData = function (name, parent) {
	this.name = name;
	this.parent = parent;
};
spine.BoneData.prototype = {
	length: 0,
	x: 0, y: 0,
	rotation: 0,
	scaleX: 1, scaleY: 1
};

spine.SlotData = function (name, boneData) {
	this.name = name;
	this.boneData = boneData;
};
spine.SlotData.prototype = {
	r: 1, g: 1, b: 1, a: 1,
	attachmentName: null
};

spine.Bone = function (boneData, parent) {
	this.data = boneData;
	this.parent = parent;
	this.setToSetupPose();
};
spine.Bone.yDown = false;
spine.Bone.prototype = {
	x: 0, y: 0,
	rotation: 0,
	scaleX: 1, scaleY: 1,
	m00: 0, m01: 0, worldX: 0, // a b x
	m10: 0, m11: 0, worldY: 0, // c d y
	worldRotation: 0,
	worldScaleX: 1, worldScaleY: 1,
	updateWorldTransform: function (flipX, flipY) {
		var parent = this.parent;
		if (parent != null) {
			this.worldX = this.x * parent.m00 + this.y * parent.m01 + parent.worldX;
			this.worldY = this.x * parent.m10 + this.y * parent.m11 + parent.worldY;
			this.worldScaleX = parent.worldScaleX * this.scaleX;
			this.worldScaleY = parent.worldScaleY * this.scaleY;
			this.worldRotation = parent.worldRotation + this.rotation;
		} else {
			this.worldX = this.x;
			this.worldY = this.y;
			this.worldScaleX = this.scaleX;
			this.worldScaleY = this.scaleY;
			this.worldRotation = this.rotation;
		}
		var radians = this.worldRotation * Math.PI / 180;
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		this.m00 = cos * this.worldScaleX;
		this.m10 = sin * this.worldScaleX;
		this.m01 = -sin * this.worldScaleY;
		this.m11 = cos * this.worldScaleY;
		if (flipX) {
			this.m00 = -this.m00;
			this.m01 = -this.m01;
		}
		if (flipY) {
			this.m10 = -this.m10;
			this.m11 = -this.m11;
		}
		if (spine.Bone.yDown) {
			this.m10 = -this.m10;
			this.m11 = -this.m11;
		}
	},
	setToSetupPose: function () {
		var data = this.data;
		this.x = data.x;
		this.y = data.y;
		this.rotation = data.rotation;
		this.scaleX = data.scaleX;
		this.scaleY = data.scaleY;
	}
};

spine.Slot = function (slotData, skeleton, bone) {
	this.data = slotData;
	this.skeleton = skeleton;
	this.bone = bone;
	this.setToSetupPose();
};
spine.Slot.prototype = {
	r: 1, g: 1, b: 1, a: 1,
	_attachmentTime: 0,
	attachment: null,
	setAttachment: function (attachment) {
		this.attachment = attachment;
		this._attachmentTime = this.skeleton.time;
	},
	setAttachmentTime: function (time) {
		this._attachmentTime = this.skeleton.time - time;
	},
	getAttachmentTime: function () {
		return this.skeleton.time - this._attachmentTime;
	},
	setToSetupPose: function () {
		var data = this.data;
		this.r = data.r;
		this.g = data.g;
		this.b = data.b;
		this.a = data.a;
		
		var slotDatas = this.skeleton.data.slots;
		for (var i = 0, n = slotDatas.length; i < n; i++) {
			if (slotDatas[i] == data) {
				this.setAttachment(!data.attachmentName ? null : this.skeleton.getAttachmentBySlotIndex(i, data.attachmentName));
				break;
			}
		}
	}
};

spine.Skin = function (name) {
	this.name = name;
	this.attachments = {};
};
spine.Skin.prototype = {
	addAttachment: function (slotIndex, name, attachment) {
		this.attachments[slotIndex + ":" + name] = attachment;
	},
	getAttachment: function (slotIndex, name) {
		return this.attachments[slotIndex + ":" + name];
	},
	_attachAll: function (skeleton, oldSkin) {
		for (var key in oldSkin.attachments) {
			var colon = key.indexOf(":");
			var slotIndex = parseInt(key.substring(0, colon));
			var name = key.substring(colon + 1);
			var slot = skeleton.slots[slotIndex];
			if (slot.attachment && slot.attachment.name == name) {
				var attachment = this.getAttachment(slotIndex, name);
				if (attachment) slot.setAttachment(attachment);
			}
		}
	}
};

spine.Animation = function (name, timelines, duration) {
	this.name = name;
	this.timelines = timelines;
	this.duration = duration;
};
spine.Animation.prototype = {
	apply: function (skeleton, time, loop) {
		if (loop && this.duration != 0) time %= this.duration;
		var timelines = this.timelines;
		for (var i = 0, n = timelines.length; i < n; i++)
			timelines[i].apply(skeleton, time, 1);
	},
	mix: function (skeleton, time, loop, alpha) {
		if (loop && this.duration != 0) time %= this.duration;
		var timelines = this.timelines;
		for (var i = 0, n = timelines.length; i < n; i++)
			timelines[i].apply(skeleton, time, alpha);
	}
};

spine.binarySearch = function (values, target, step) {
	var low = 0;
	var high = Math.floor(values.length / step) - 2;
	if (high == 0) return step;
	var current = high >>> 1;
	while (true) {
		if (values[(current + 1) * step] <= target)
			low = current + 1;
		else
			high = current;
		if (low == high) return (low + 1) * step;
		current = (low + high) >>> 1;
	}
};
spine.linearSearch = function (values, target, step) {
	for (var i = 0, last = values.length - step; i <= last; i += step)
		if (values[i] > target) return i;
	return -1;
};

spine.Curves = function (frameCount) {
	this.curves = []; // dfx, dfy, ddfx, ddfy, dddfx, dddfy, ...
	this.curves.length = (frameCount - 1) * 6;
};
spine.Curves.prototype = {
	setLinear: function (frameIndex) {
		this.curves[frameIndex * 6] = 0/*LINEAR*/;
	},
	setStepped: function (frameIndex) {
		this.curves[frameIndex * 6] = -1/*STEPPED*/;
	},
	/** Sets the control handle positions for an interpolation bezier curve used to transition from this keyframe to the next.
	 * cx1 and cx2 are from 0 to 1, representing the percent of time between the two keyframes. cy1 and cy2 are the percent of
	 * the difference between the keyframe's values. */
	setCurve: function (frameIndex, cx1, cy1, cx2, cy2) {
		var subdiv_step = 1 / 10/*BEZIER_SEGMENTS*/;
		var subdiv_step2 = subdiv_step * subdiv_step;
		var subdiv_step3 = subdiv_step2 * subdiv_step;
		var pre1 = 3 * subdiv_step;
		var pre2 = 3 * subdiv_step2;
		var pre4 = 6 * subdiv_step2;
		var pre5 = 6 * subdiv_step3;
		var tmp1x = -cx1 * 2 + cx2;
		var tmp1y = -cy1 * 2 + cy2;
		var tmp2x = (cx1 - cx2) * 3 + 1;
		var tmp2y = (cy1 - cy2) * 3 + 1;
		var i = frameIndex * 6;
		var curves = this.curves;
		curves[i] = cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
		curves[i + 1] = cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;
		curves[i + 2] = tmp1x * pre4 + tmp2x * pre5;
		curves[i + 3] = tmp1y * pre4 + tmp2y * pre5;
		curves[i + 4] = tmp2x * pre5;
		curves[i + 5] = tmp2y * pre5;
	},
	getCurvePercent: function (frameIndex, percent) {
		percent = percent < 0 ? 0 : (percent > 1 ? 1 : percent);
		var curveIndex = frameIndex * 6;
		var curves = this.curves;
		var dfx = curves[curveIndex];
		if (!dfx/*LINEAR*/) return percent;
		if (dfx == -1/*STEPPED*/) return 0;
		var dfy = curves[curveIndex + 1];
		var ddfx = curves[curveIndex + 2];
		var ddfy = curves[curveIndex + 3];
		var dddfx = curves[curveIndex + 4];
		var dddfy = curves[curveIndex + 5];
		var x = dfx, y = dfy;
		var i = 10/*BEZIER_SEGMENTS*/ - 2;
		while (true) {
			if (x >= percent) {
				var lastX = x - dfx;
				var lastY = y - dfy;
				return lastY + (y - lastY) * (percent - lastX) / (x - lastX);
			}
			if (i == 0) break;
			i--;
			dfx += ddfx;
			dfy += ddfy;
			ddfx += dddfx;
			ddfy += dddfy;
			x += dfx;
			y += dfy;
		}
		return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
	}
};

spine.RotateTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, angle, ...
	this.frames.length = frameCount * 2;
};
spine.RotateTimeline.prototype = {
	boneIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 2;
	},
	setFrame: function (frameIndex, time, angle) {
		frameIndex *= 2;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = angle;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var bone = skeleton.bones[this.boneIndex];

		if (time >= frames[frames.length - 2]) { // Time is after last frame.
			var amount = bone.data.rotation + frames[frames.length - 1] - bone.rotation;
			while (amount > 180)
				amount -= 360;
			while (amount < -180)
				amount += 360;
			bone.rotation += amount * alpha;
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 2);
		var lastFrameValue = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex - 2/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 2 - 1, percent);

		var amount = frames[frameIndex + 1/*FRAME_VALUE*/] - lastFrameValue;
		while (amount > 180)
			amount -= 360;
		while (amount < -180)
			amount += 360;
		amount = bone.data.rotation + (lastFrameValue + amount * percent) - bone.rotation;
		while (amount > 180)
			amount -= 360;
		while (amount < -180)
			amount += 360;
		bone.rotation += amount * alpha;
	}
};

spine.TranslateTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, x, y, ...
	this.frames.length = frameCount * 3;
};
spine.TranslateTimeline.prototype = {
	boneIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 3;
	},
	setFrame: function (frameIndex, time, x, y) {
		frameIndex *= 3;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = x;
		this.frames[frameIndex + 2] = y;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var bone = skeleton.bones[this.boneIndex];

		if (time >= frames[frames.length - 3]) { // Time is after last frame.
			bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha;
			bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha;
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 3);
		var lastFrameX = frames[frameIndex - 2];
		var lastFrameY = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);
		bone.x += (bone.data.x + lastFrameX + (frames[frameIndex + 1/*FRAME_X*/] - lastFrameX) * percent - bone.x) * alpha;
		bone.y += (bone.data.y + lastFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - lastFrameY) * percent - bone.y) * alpha;
	}
};

spine.ScaleTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, x, y, ...
	this.frames.length = frameCount * 3;
};
spine.ScaleTimeline.prototype = {
	boneIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 3;
	},
	setFrame: function (frameIndex, time, x, y) {
		frameIndex *= 3;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = x;
		this.frames[frameIndex + 2] = y;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.
		
		var bone = skeleton.bones[this.boneIndex];

		if (time >= frames[frames.length - 3]) { // Time is after last frame.
			bone.scaleX += (bone.data.scaleX - 1 + frames[frames.length - 2] - bone.scaleX) * alpha;
			bone.scaleY += (bone.data.scaleY - 1 + frames[frames.length - 1] - bone.scaleY) * alpha;
			
			
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 3);
		var lastFrameX = frames[frameIndex - 2];
		var lastFrameY = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

		bone.scaleX += (bone.data.scaleX - 1 + lastFrameX + (frames[frameIndex + 1/*FRAME_X*/] - lastFrameX) * percent - bone.scaleX) * alpha;
		bone.scaleY += (bone.data.scaleY - 1 + lastFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - lastFrameY) * percent - bone.scaleY) * alpha;
	}
};

spine.ColorTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, r, g, b, a, ...
	this.frames.length = frameCount * 5;
};
spine.ColorTimeline.prototype = {
	slotIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 2;
	},
	setFrame: function (frameIndex, time, x, y) {
		frameIndex *= 5;
		this.frames[frameIndex] = time;
		this.frames[frameIndex + 1] = r;
		this.frames[frameIndex + 2] = g;
		this.frames[frameIndex + 3] = b;
		this.frames[frameIndex + 4] = a;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.
		var slot = skeleton.slots[this.slotIndex];

		if (time >= frames[frames.length - 5]) { // Time is after last frame.
			var i = frames.length - 1;
			slot.r = frames[i - 3];
			slot.g = frames[i - 2];
			slot.b = frames[i - 1];
			slot.a = frames[i];
			return;
		}

		// Interpolate between the last frame and the current frame.
		var frameIndex = spine.binarySearch(frames, time, 5);
		var lastFrameR = frames[frameIndex - 4];
		var lastFrameG = frames[frameIndex - 3];
		var lastFrameB = frames[frameIndex - 2];
		var lastFrameA = frames[frameIndex - 1];
		var frameTime = frames[frameIndex];
		var percent = 1 - (time - frameTime) / (frames[frameIndex - 5/*LAST_FRAME_TIME*/] - frameTime);
		percent = this.curves.getCurvePercent(frameIndex / 5 - 1, percent);

		var r = lastFrameR + (frames[frameIndex + 1/*FRAME_R*/] - lastFrameR) * percent;
		var g = lastFrameG + (frames[frameIndex + 2/*FRAME_G*/] - lastFrameG) * percent;
		var b = lastFrameB + (frames[frameIndex + 3/*FRAME_B*/] - lastFrameB) * percent;
		var a = lastFrameA + (frames[frameIndex + 4/*FRAME_A*/] - lastFrameA) * percent;
		if (alpha < 1) {
			slot.r += (r - slot.r) * alpha;
			slot.g += (g - slot.g) * alpha;
			slot.b += (b - slot.b) * alpha;
			slot.a += (a - slot.a) * alpha;
		} else {
			slot.r = r;
			slot.g = g;
			slot.b = b;
			slot.a = a;
		}
	}
};

spine.AttachmentTimeline = function (frameCount) {
	this.curves = new spine.Curves(frameCount);
	this.frames = []; // time, ...
	this.frames.length = frameCount;
	this.attachmentNames = []; // time, ...
	this.attachmentNames.length = frameCount;
};
spine.AttachmentTimeline.prototype = {
	slotIndex: 0,
	getFrameCount: function () {
		return this.frames.length / 2;
	},
	setFrame: function (frameIndex, time, attachmentName) {
		this.frames[frameIndex] = time;
		this.attachmentNames[frameIndex] = attachmentName;
	},
	apply: function (skeleton, time, alpha) {
		var frames = this.frames;
		if (time < frames[0]) return; // Time is before first frame.

		var frameIndex;
		if (time >= frames[frames.length - 1]) // Time is after last frame.
			frameIndex = frames.length - 1;
		else
			frameIndex = spine.binarySearch(frames, time, 1) - 1;

		var attachmentName = this.attachmentNames[frameIndex];
		//console.log(skeleton.slots[this.slotIndex])
		
		// change the name!
	//	skeleton.slots[this.slotIndex].attachmentName = attachmentName;
		
		skeleton.slots[this.slotIndex].setAttachment(!attachmentName ? null : skeleton.getAttachmentBySlotIndex(this.slotIndex, attachmentName));
	}
};

spine.SkeletonData = function () {
	this.bones = [];
	this.slots = [];
	this.skins = [];
	this.animations = [];
};
spine.SkeletonData.prototype = {
	defaultSkin: null,
	/** @return May be null. */
	findBone: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].name == boneName) return bones[i];
		return null;
	},
	/** @return -1 if the bone was not found. */
	findBoneIndex: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].name == boneName) return i;
		return -1;
	},
	/** @return May be null. */
	findSlot: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++) {
			if (slots[i].name == slotName) return slot[i];
		}
		return null;
	},
	/** @return -1 if the bone was not found. */
	findSlotIndex: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			if (slots[i].name == slotName) return i;
		return -1;
	},
	/** @return May be null. */
	findSkin: function (skinName) {
		var skins = this.skins;
		for (var i = 0, n = skins.length; i < n; i++)
			if (skins[i].name == skinName) return skins[i];
		return null;
	},
	/** @return May be null. */
	findAnimation: function (animationName) {
		var animations = this.animations;
		for (var i = 0, n = animations.length; i < n; i++)
			if (animations[i].name == animationName) return animations[i];
		return null;
	}
};

spine.Skeleton = function (skeletonData) {
	this.data = skeletonData;

	this.bones = [];
	for (var i = 0, n = skeletonData.bones.length; i < n; i++) {
		var boneData = skeletonData.bones[i];
		var parent = !boneData.parent ? null : this.bones[skeletonData.bones.indexOf(boneData.parent)];
		this.bones.push(new spine.Bone(boneData, parent));
	}

	this.slots = [];
	this.drawOrder = [];
	for (var i = 0, n = skeletonData.slots.length; i < n; i++) {
		var slotData = skeletonData.slots[i];
		var bone = this.bones[skeletonData.bones.indexOf(slotData.boneData)];
		var slot = new spine.Slot(slotData, this, bone);
		this.slots.push(slot);
		this.drawOrder.push(slot);
	}
};
spine.Skeleton.prototype = {
	x: 0, y: 0,
	skin: null,
	r: 1, g: 1, b: 1, a: 1,
	time: 0,
	flipX: false, flipY: false,
	/** Updates the world transform for each bone. */
	updateWorldTransform: function () {
		var flipX = this.flipX;
		var flipY = this.flipY;
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			bones[i].updateWorldTransform(flipX, flipY);
	},
	/** Sets the bones and slots to their setup pose values. */
	setToSetupPose: function () {
		this.setBonesToSetupPose();
		this.setSlotsToSetupPose();
	},
	setBonesToSetupPose: function () {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			bones[i].setToSetupPose();
	},
	setSlotsToSetupPose: function () {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			slots[i].setToSetupPose(i);
	},
	/** @return May return null. */
	getRootBone: function () {
		return this.bones.length == 0 ? null : this.bones[0];
	},
	/** @return May be null. */
	findBone: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].data.name == boneName) return bones[i];
		return null;
	},
	/** @return -1 if the bone was not found. */
	findBoneIndex: function (boneName) {
		var bones = this.bones;
		for (var i = 0, n = bones.length; i < n; i++)
			if (bones[i].data.name == boneName) return i;
		return -1;
	},
	/** @return May be null. */
	findSlot: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			if (slots[i].data.name == slotName) return slots[i];
		return null;
	},
	/** @return -1 if the bone was not found. */
	findSlotIndex: function (slotName) {
		var slots = this.slots;
		for (var i = 0, n = slots.length; i < n; i++)
			if (slots[i].data.name == slotName) return i;
		return -1;
	},
	setSkinByName: function (skinName) {
		var skin = this.data.findSkin(skinName);
		if (!skin) throw "Skin not found: " + skinName;
		this.setSkin(skin);
	},
	/** Sets the skin used to look up attachments not found in the {@link SkeletonData#getDefaultSkin() default skin}. Attachments
	 * from the new skin are attached if the corresponding attachment from the old skin was attached.
	 * @param newSkin May be null. */
	setSkin: function (newSkin) {
		if (this.skin && newSkin) newSkin._attachAll(this, this.skin);
		this.skin = newSkin;
	},
	/** @return May be null. */
	getAttachmentBySlotName: function (slotName, attachmentName) {
		return this.getAttachmentBySlotIndex(this.data.findSlotIndex(slotName), attachmentName);
	},
	/** @return May be null. */
	getAttachmentBySlotIndex: function (slotIndex, attachmentName) {
		if (this.skin) {
			var attachment = this.skin.getAttachment(slotIndex, attachmentName);
			if (attachment) return attachment;
		}
		if (this.data.defaultSkin) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
		return null;
	},
	/** @param attachmentName May be null. */
	setAttachment: function (slotName, attachmentName) {
		var slots = this.slots;
		for (var i = 0, n = slots.size; i < n; i++) {
			var slot = slots[i];
			if (slot.data.name == slotName) {
				var attachment = null;
				if (attachmentName) {
					
					attachment = this.getAttachment(i, attachmentName);
					if (attachment == null) throw "Attachment not found: " + attachmentName + ", for slot: " + slotName;
				}
				
				slot.setAttachment(attachment);
				return;
			}
		}
		throw "Slot not found: " + slotName;
	},
	update: function (delta) {
		time += delta;
	}
};

spine.AttachmentType = {
	region: 0
};

spine.RegionAttachment = function () {
	this.offset = [];
	this.offset.length = 8;
	this.uvs = [];
	this.uvs.length = 8;
};
spine.RegionAttachment.prototype = {
	x: 0, y: 0,
	rotation: 0,
	scaleX: 1, scaleY: 1,
	width: 0, height: 0,
	rendererObject: null,
	regionOffsetX: 0, regionOffsetY: 0,
	regionWidth: 0, regionHeight: 0,
	regionOriginalWidth: 0, regionOriginalHeight: 0,
	setUVs: function (u, v, u2, v2, rotate) {
		var uvs = this.uvs;
		if (rotate) {
			uvs[2/*X2*/] = u;
			uvs[3/*Y2*/] = v2;
			uvs[4/*X3*/] = u;
			uvs[5/*Y3*/] = v;
			uvs[6/*X4*/] = u2;
			uvs[7/*Y4*/] = v;
			uvs[0/*X1*/] = u2;
			uvs[1/*Y1*/] = v2;
		} else {
			uvs[0/*X1*/] = u;
			uvs[1/*Y1*/] = v2;
			uvs[2/*X2*/] = u;
			uvs[3/*Y2*/] = v;
			uvs[4/*X3*/] = u2;
			uvs[5/*Y3*/] = v;
			uvs[6/*X4*/] = u2;
			uvs[7/*Y4*/] = v2;
		}
	},
	updateOffset: function () {
		var regionScaleX = this.width / this.regionOriginalWidth * this.scaleX;
		var regionScaleY = this.height / this.regionOriginalHeight * this.scaleY;
		var localX = -this.width / 2 * this.scaleX + this.regionOffsetX * regionScaleX;
		var localY = -this.height / 2 * this.scaleY + this.regionOffsetY * regionScaleY;
		var localX2 = localX + this.regionWidth * regionScaleX;
		var localY2 = localY + this.regionHeight * regionScaleY;
		var radians = this.rotation * Math.PI / 180;
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		var localXCos = localX * cos + this.x;
		var localXSin = localX * sin;
		var localYCos = localY * cos + this.y;
		var localYSin = localY * sin;
		var localX2Cos = localX2 * cos + this.x;
		var localX2Sin = localX2 * sin;
		var localY2Cos = localY2 * cos + this.y;
		var localY2Sin = localY2 * sin;
		var offset = this.offset;
		offset[0/*X1*/] = localXCos - localYSin;
		offset[1/*Y1*/] = localYCos + localXSin;
		offset[2/*X2*/] = localXCos - localY2Sin;
		offset[3/*Y2*/] = localY2Cos + localXSin;
		offset[4/*X3*/] = localX2Cos - localY2Sin;
		offset[5/*Y3*/] = localY2Cos + localX2Sin;
		offset[6/*X4*/] = localX2Cos - localYSin;
		offset[7/*Y4*/] = localYCos + localX2Sin;
	},
	computeVertices: function (x, y, bone, vertices) {
		
		x += bone.worldX;
		y += bone.worldY;
		var m00 = bone.m00;
		var m01 = bone.m01;
		var m10 = bone.m10;
		var m11 = bone.m11;
		var offset = this.offset;
		vertices[0/*X1*/] = offset[0/*X1*/] * m00 + offset[1/*Y1*/] * m01 + x;
		vertices[1/*Y1*/] = offset[0/*X1*/] * m10 + offset[1/*Y1*/] * m11 + y;
		vertices[2/*X2*/] = offset[2/*X2*/] * m00 + offset[3/*Y2*/] * m01 + x;
		vertices[3/*Y2*/] = offset[2/*X2*/] * m10 + offset[3/*Y2*/] * m11 + y;
		vertices[4/*X3*/] = offset[4/*X3*/] * m00 + offset[5/*X3*/] * m01 + x;
		vertices[5/*X3*/] = offset[4/*X3*/] * m10 + offset[5/*X3*/] * m11 + y;
		vertices[6/*X4*/] = offset[6/*X4*/] * m00 + offset[7/*Y4*/] * m01 + x;
		vertices[7/*Y4*/] = offset[6/*X4*/] * m10 + offset[7/*Y4*/] * m11 + y;
	}
}

spine.AnimationStateData = function (skeletonData) {
	this.skeletonData = skeletonData;
	this.animationToMixTime = {};
};
spine.AnimationStateData.prototype = {
	setMixByName: function (fromName, toName, duration) {
		var from = this.skeletonData.findAnimation(fromName);
		if (!from) throw "Animation not found: " + fromName;
		var to = this.skeletonData.findAnimation(toName);
		if (!to) throw "Animation not found: " + toName;
		this.setMix(from, to, duration);
	},
	setMix: function (from, to, duration) {
		this.animationToMixTime[from.name + ":" + to.name] = duration;
	},
	getMix: function (from, to) {
		var time = this.animationToMixTime[from.name + ":" + to.name];
		return time ? time : 0;
	}
};

spine.AnimationState = function (stateData) {
	this.data = stateData;
	this.queue = [];
};
spine.AnimationState.prototype = {
	current: null,
	previous: null,
	currentTime: 0,
	previousTime: 0,
	currentLoop: false,
	previousLoop: false,
	mixTime: 0,
	mixDuration: 0,
	update: function (delta) {
		this.currentTime += delta;
		this.previousTime += delta;
		this.mixTime += delta;

		if (this.queue.length > 0) {
			var entry = this.queue[0];
			if (this.currentTime >= entry.delay) {
				this._setAnimation(entry.animation, entry.loop);
				this.queue.shift();
			}
		}
	},
	apply: function (skeleton) {
		if (!this.current) return;
		if (this.previous) {
			this.previous.apply(skeleton, this.previousTime, this.previousLoop);
			var alpha = this.mixTime / this.mixDuration;
			if (alpha >= 1) {
				alpha = 1;
				this.previous = null;
			}
			this.current.mix(skeleton, this.currentTime, this.currentLoop, alpha);
		} else 
			this.current.apply(skeleton, this.currentTime, this.currentLoop);
	},
	clearAnimation: function () {
		this.previous = null;
		this.current = null;
		this.queue.length = 0;
	},
	_setAnimation: function (animation, loop) {
		this.previous = null;
		if (animation && this.current) {
			this.mixDuration = this.data.getMix(this.current, animation);
			if (this.mixDuration > 0) {
				this.mixTime = 0;
				this.previous = this.current;
				this.previousTime = this.currentTime;
				this.previousLoop = this.currentLoop;
			}
		}
		this.current = animation;
		this.currentLoop = loop;
		this.currentTime = 0;
	},
	/** @see #setAnimation(Animation, Boolean) */
	setAnimationByName: function (animationName, loop) {
		var animation = this.data.skeletonData.findAnimation(animationName);
		if (!animation) throw "Animation not found: " + animationName;
		this.setAnimation(animation, loop);
	},
	/** Set the current animation. Any queued animations are cleared and the current animation time is set to 0.
	 * @param animation May be null. */
	setAnimation: function (animation, loop) {
		this.queue.length = 0;
		this._setAnimation(animation, loop);
	},
	/** @see #addAnimation(Animation, Boolean, Number) */
	addAnimationByName: function (animationName, loop, delay) {
		var animation = this.data.skeletonData.findAnimation(animationName);
		if (!animation) throw "Animation not found: " + animationName;
		this.addAnimation(animation, loop, delay);
	},
	/** Adds an animation to be played delay seconds after the current or last queued animation.
	 * @param delay May be <= 0 to use duration of previous animation minus any mix duration plus the negative delay. */
	addAnimation: function (animation, loop, delay) {
		var entry = {};
		entry.animation = animation;
		entry.loop = loop;

		if (!delay || delay <= 0) {
			var previousAnimation = this.queue.length == 0 ? this.current : this.queue[this.queue.length - 1].animation;
			if (previousAnimation != null)
				delay = previousAnimation.duration - this.data.getMix(previousAnimation, animation) + (delay || 0);
			else
				delay = 0;
		}
		entry.delay = delay;

		this.queue.push(entry);
	},
	/** Returns true if no animation is set or if the current time is greater than the animation duration, regardless of looping. */
	isComplete: function () {
		return !this.current || this.currentTime >= this.current.duration;
	}
};

spine.SkeletonJson = function (attachmentLoader) {
	this.attachmentLoader = attachmentLoader;
};
spine.SkeletonJson.prototype = {
	scale: 1,
	readSkeletonData: function (root) {
		var skeletonData = new spine.SkeletonData();

		// Bones.
		var bones = root["bones"];
		for (var i = 0, n = bones.length; i < n; i++) {
			var boneMap = bones[i];
			var parent = null;
			if (boneMap["parent"]) {
				parent = skeletonData.findBone(boneMap["parent"]);
				if (!parent) throw "Parent bone not found: " + boneMap["parent"];
			}
			var boneData = new spine.BoneData(boneMap["name"], parent);
			boneData.length = (boneMap["length"] || 0) * this.scale;
			boneData.x = (boneMap["x"] || 0) * this.scale;
			boneData.y = (boneMap["y"] || 0) * this.scale;
			boneData.rotation = (boneMap["rotation"] || 0);
			boneData.scaleX = boneMap["scaleX"] || 1;
			boneData.scaleY = boneMap["scaleY"] || 1;
			skeletonData.bones.push(boneData);
		}

		// Slots.
		var slots = root["slots"];
		for (var i = 0, n = slots.length; i < n; i++) {
			var slotMap = slots[i];
			var boneData = skeletonData.findBone(slotMap["bone"]);
			if (!boneData) throw "Slot bone not found: " + slotMap["bone"];
			var slotData = new spine.SlotData(slotMap["name"], boneData);

			var color = slotMap["color"];
			if (color) {
				slotData.r = spine.SkeletonJson.toColor(color, 0);
				slotData.g = spine.SkeletonJson.toColor(color, 1);
				slotData.b = spine.SkeletonJson.toColor(color, 2);
				slotData.a = spine.SkeletonJson.toColor(color, 3);
			}

			slotData.attachmentName = slotMap["attachment"];

			skeletonData.slots.push(slotData);
		}

		// Skins.
		var skins = root["skins"];
		for (var skinName in skins) {
			if (!skins.hasOwnProperty(skinName)) continue;
			var skinMap = skins[skinName];
			var skin = new spine.Skin(skinName);
			for (var slotName in skinMap) {
				if (!skinMap.hasOwnProperty(slotName)) continue;
				var slotIndex = skeletonData.findSlotIndex(slotName);
				var slotEntry = skinMap[slotName];
				for (var attachmentName in slotEntry) {
					if (!slotEntry.hasOwnProperty(attachmentName)) continue;
					var attachment = this.readAttachment(skin, attachmentName, slotEntry[attachmentName]);
					if (attachment != null) skin.addAttachment(slotIndex, attachmentName, attachment);
				}
			}
			skeletonData.skins.push(skin);
			if (skin.name == "default") skeletonData.defaultSkin = skin;
		}

		// Animations.
		var animations = root["animations"];
		for (var animationName in animations) {
			if (!animations.hasOwnProperty(animationName)) continue;
			this.readAnimation(animationName, animations[animationName], skeletonData);
		}

		return skeletonData;
	},
	readAttachment: function (skin, name, map) {
		name = map["name"] || name;

		var type = spine.AttachmentType[map["type"] || "region"];
		
		// @ekelokorpi
		// var attachment = this.attachmentLoader.newAttachment(skin, type, name);
		var attachment = new spine.RegionAttachment();
		
		// @Doormat23
		// add the name of the attachment
		attachment.name = name;
		
		if (type == spine.AttachmentType.region) {
			attachment.x = (map["x"] || 0) * this.scale;
			attachment.y = (map["y"] || 0) * this.scale;
			attachment.scaleX = map["scaleX"] || 1;
			attachment.scaleY = map["scaleY"] || 1;
			attachment.rotation = map["rotation"] || 0;
			attachment.width = (map["width"] || 32) * this.scale;
			attachment.height = (map["height"] || 32) * this.scale;
			attachment.updateOffset();
		}

		return attachment;
	},
	readAnimation: function (name, map, skeletonData) {
		var timelines = [];
		var duration = 0;

		var bones = map["bones"];
		for (var boneName in bones) {
			if (!bones.hasOwnProperty(boneName)) continue;
			var boneIndex = skeletonData.findBoneIndex(boneName);
			if (boneIndex == -1) throw "Bone not found: " + boneName;
			var boneMap = bones[boneName];

			for (var timelineName in boneMap) {
				if (!boneMap.hasOwnProperty(timelineName)) continue;
				var values = boneMap[timelineName];
				if (timelineName == "rotate") {
					var timeline = new spine.RotateTimeline(values.length);
					timeline.boneIndex = boneIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						timeline.setFrame(frameIndex, valueMap["time"], valueMap["angle"]);
						spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
						frameIndex++;
					}
					timelines.push(timeline);
					duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);

				} else if (timelineName == "translate" || timelineName == "scale") {
					var timeline;
					var timelineScale = 1;
					if (timelineName == "scale")
						timeline = new spine.ScaleTimeline(values.length);
					else {
						timeline = new spine.TranslateTimeline(values.length);
						timelineScale = this.scale;
					}
					timeline.boneIndex = boneIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						var x = (valueMap["x"] || 0) * timelineScale;
						var y = (valueMap["y"] || 0) * timelineScale;
						timeline.setFrame(frameIndex, valueMap["time"], x, y);
						spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
						frameIndex++;
					}
					timelines.push(timeline);
					duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);
					
				} else
					throw "Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")";
			}
		}
		var slots = map["slots"];
		for (var slotName in slots) {
			if (!slots.hasOwnProperty(slotName)) continue;
			var slotMap = slots[slotName];
			var slotIndex = skeletonData.findSlotIndex(slotName);

			for (var timelineName in slotMap) {
				if (!slotMap.hasOwnProperty(timelineName)) continue;
				var values = slotMap[timelineName];
				if (timelineName == "color") {
					var timeline = new spine.ColorTimeline(values.length);
					timeline.slotIndex = slotIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						var color = valueMap["color"];
						var r = spine.SkeletonJson.toColor(color, 0);
						var g = spine.SkeletonJson.toColor(color, 1);
						var b = spine.SkeletonJson.toColor(color, 2);
						var a = spine.SkeletonJson.toColor(color, 3);
						timeline.setFrame(frameIndex, valueMap["time"], r, g, b, a);
						spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
						frameIndex++;
					}
					timelines.push(timeline);
					duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);

				} else if (timelineName == "attachment") {
					var timeline = new spine.AttachmentTimeline(values.length);
					timeline.slotIndex = slotIndex;

					var frameIndex = 0;
					for (var i = 0, n = values.length; i < n; i++) {
						var valueMap = values[i];
						timeline.setFrame(frameIndex++, valueMap["time"], valueMap["name"]);
					}
					timelines.push(timeline);
					// PIXI FIX
					duration = Math.max(duration, timeline.frames[Math.floor(timeline.getFrameCount()) - 1]);
				} else
					throw "Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")";
			}
		}
		skeletonData.animations.push(new spine.Animation(name, timelines, duration));
	}
};
spine.SkeletonJson.readCurve = function (timeline, frameIndex, valueMap) {
	var curve = valueMap["curve"];
	if (!curve) return;
	if (curve == "stepped")
		timeline.curves.setStepped(frameIndex);
	else if (curve instanceof Array)
		timeline.curves.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
};
spine.SkeletonJson.toColor = function (hexString, colorIndex) {
	if (hexString.length != 8) throw "Color hexidecimal length must be 8, recieved: " + hexString;
	return parseInt(hexString.substring(colorIndex * 2, 2), 16) / 255;
};

spine.Atlas = function (atlasText, textureLoader) {
	this.textureLoader = textureLoader;
	this.pages = [];
	this.regions = [];

	var reader = new spine.AtlasReader(atlasText);
	var tuple = [];
	tuple.length = 4;
	var page = null;
	while (true) {
		var line = reader.readLine();
		if (line == null) break;
		line = reader.trim(line);
		if (line.length == 0)
			page = null;
		else if (!page) {
			page = new spine.AtlasPage();
			page.name = line;

			page.format = spine.Atlas.Format[reader.readValue()];

			reader.readTuple(tuple);
			page.minFilter = spine.Atlas.TextureFilter[tuple[0]];
			page.magFilter = spine.Atlas.TextureFilter[tuple[1]];

			var direction = reader.readValue();
			page.uWrap = spine.Atlas.TextureWrap.clampToEdge;
			page.vWrap = spine.Atlas.TextureWrap.clampToEdge;
			if (direction == "x")
				page.uWrap = spine.Atlas.TextureWrap.repeat;
			else if (direction == "y")
				page.vWrap = spine.Atlas.TextureWrap.repeat;
			else if (direction == "xy")
				page.uWrap = page.vWrap = spine.Atlas.TextureWrap.repeat;

			textureLoader.load(page, line);

			this.pages.push(page);

		} else {
			var region = new spine.AtlasRegion();
			region.name = line;
			region.page = page;

			region.rotate = reader.readValue() == "true";

			reader.readTuple(tuple);
			var x = parseInt(tuple[0]);
			var y = parseInt(tuple[1]);

			reader.readTuple(tuple);
			var width = parseInt(tuple[0]);
			var height = parseInt(tuple[1]);

			region.u = x / page.width;
			region.v = y / page.height;
			if (region.rotate) {
				region.u2 = (x + height) / page.width;
				region.v2 = (y + width) / page.height;
			} else {
				region.u2 = (x + width) / page.width;
				region.v2 = (y + height) / page.height;
			}
			region.x = x;
			region.y = y;
			region.width = Math.abs(width);
			region.height = Math.abs(height);

			if (reader.readTuple(tuple) == 4) { // split is optional
				region.splits = [parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3])];

				if (reader.readTuple(tuple) == 4) { // pad is optional, but only present with splits
					region.pads = [parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3])];

					reader.readTuple(tuple);
				}
			}

			region.originalWidth = parseInt(tuple[0]);
			region.originalHeight = parseInt(tuple[1]);

			reader.readTuple(tuple);
			region.offsetX = parseInt(tuple[0]);
			region.offsetY = parseInt(tuple[1]);

			region.index = parseInt(reader.readValue());

			this.regions.push(region);
		}
	}
};
spine.Atlas.prototype = {
	findRegion: function (name) {
		var regions = this.regions;
		for (var i = 0, n = regions.length; i < n; i++)
			if (regions[i].name == name) return regions[i];
		return null;
	},
	dispose: function () {
		var pages = this.pages;
		for (var i = 0, n = pages.length; i < n; i++)
			this.textureLoader.unload(pages[i].rendererObject);
	},
	updateUVs: function (page) {
		var regions = this.regions;
		for (var i = 0, n = regions.length; i < n; i++) {
			var region = regions[i];
			if (region.page != page) continue;
			region.u = region.x / page.width;
			region.v = region.y / page.height;
			if (region.rotate) {
				region.u2 = (region.x + region.height) / page.width;
				region.v2 = (region.y + region.width) / page.height;
			} else {
				region.u2 = (region.x + region.width) / page.width;
				region.v2 = (region.y + region.height) / page.height;
			}
		}
	}
};

spine.Atlas.Format = {
	alpha: 0,
	intensity: 1,
	luminanceAlpha: 2,
	rgb565: 3,
	rgba4444: 4,
	rgb888: 5,
	rgba8888: 6
};

spine.Atlas.TextureFilter = {
	nearest: 0,
	linear: 1,
	mipMap: 2,
	mipMapNearestNearest: 3,
	mipMapLinearNearest: 4,
	mipMapNearestLinear: 5,
	mipMapLinearLinear: 6
};

spine.Atlas.TextureWrap = {
	mirroredRepeat: 0,
	clampToEdge: 1,
	repeat: 2
};

spine.AtlasPage = function () {};
spine.AtlasPage.prototype = {
	name: null,
	format: null,
	minFilter: null,
	magFilter: null,
	uWrap: null,
	vWrap: null,
	rendererObject: null,
	width: 0,
	height: 0
};

spine.AtlasRegion = function () {};
spine.AtlasRegion.prototype = {
	page: null,
	name: null,
	x: 0, y: 0,
	width: 0, height: 0,
	u: 0, v: 0, u2: 0, v2: 0,
	offsetX: 0, offsetY: 0,
	originalWidth: 0, originalHeight: 0,
	index: 0,
	rotate: false,
	splits: null,
	pads: null,
};

spine.AtlasReader = function (text) {
	this.lines = text.split(/\r\n|\r|\n/);
};
spine.AtlasReader.prototype = {
	index: 0,
	trim: function (value) {
		return value.replace(/^\s+|\s+$/g, "");
	},
	readLine: function () {
		if (this.index >= this.lines.length) return null;
		return this.lines[this.index++];
	},
	readValue: function () {
		var line = this.readLine();
		var colon = line.indexOf(":");
		if (colon == -1) throw "Invalid line: " + line;
		return this.trim(line.substring(colon + 1));
	},
	/** Returns the number of tuple values read (2 or 4). */
	readTuple: function (tuple) {
		var line = this.readLine();
		var colon = line.indexOf(":");
		if (colon == -1) throw "Invalid line: " + line;
		var i = 0, lastMatch= colon + 1;
		for (; i < 3; i++) {
			var comma = line.indexOf(",", lastMatch);
			if (comma == -1) {
				if (i == 0) throw "Invalid line: " + line;
				break;
			}
			tuple[i] = this.trim(line.substr(lastMatch, comma - lastMatch));
			lastMatch = comma + 1;
		}
		tuple[i] = this.trim(line.substring(lastMatch));
		return i + 1;
	}
}

spine.AtlasAttachmentLoader = function (atlas) {
	this.atlas = atlas;
}
spine.AtlasAttachmentLoader.prototype = {
	newAttachment: function (skin, type, name) {
		switch (type) {
		case spine.AttachmentType.region:
			var region = this.atlas.findRegion(name);
			if (!region) throw "Region not found in atlas: " + name + " (" + type + ")";
			var attachment = new spine.RegionAttachment(name);
			attachment.rendererObject = region;
			attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
			attachment.regionOffsetX = region.offsetX;
			attachment.regionOffsetY = region.offsetY;
			attachment.regionWidth = region.width;
			attachment.regionHeight = region.height;
			attachment.regionOriginalWidth = region.originalWidth;
			attachment.regionOriginalHeight = region.originalHeight;
			return attachment;
		}
		throw "Unknown attachment type: " + type;
	}
}

PIXI.AnimCache = {};
spine.Bone.yDown = true;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * Need to finalize this a bit more but works! Its in but will be working on this feature properly next..:)
 * @class CustomRenderable 
 * @extends DisplayObject
 * @constructor
 */
PIXI.CustomRenderable = function()
{
	PIXI.DisplayObject.call( this );
	
}

// constructor
PIXI.CustomRenderable.constructor = PIXI.CustomRenderable;
PIXI.CustomRenderable.prototype = Object.create( PIXI.DisplayObject.prototype );

PIXI.CustomRenderable.prototype.renderCanvas = function(renderer)
{
	// override!
}


PIXI.CustomRenderable.prototype.initWebGL = function(renderer)
{
	// override!
}


PIXI.CustomRenderable.prototype.renderWebGL = function(renderGroup, projectionMatrix)
{
	// not sure if both needed? but ya have for now!
	// override!
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.BaseTextureCache = {};
PIXI.texturesToUpdate = [];
PIXI.texturesToDestroy = [];

/**
 * A texture stores the information that represents an image. All textures have a base texture
 * @class BaseTexture
 * @extends EventTarget
 * @constructor
 * @param source {String} the source object (image or canvas)
 */
PIXI.BaseTexture = function(source)
{
	PIXI.EventTarget.call( this );
	
	/*
	 * The url of the texture
	 * @property imageUrl
	 * @type String
	 */
	//this.imageUrl = source.src;
	
	/**
	 * [read only] The width of the base texture set when the image has loaded
	 * @property width
	 * @type Number
	 */
	this.width = 100;
	/**
	 * [read only] The height of the base texture set when the image has loaded
	 * @property height
	 * @type Number
	 */
	this.height = 100;
	
	/**
	 * The source that is loaded to create the texture
	 * @property source
	 * @type Image
	 */
	this.source = source//new Image();
	
	if(!source)return;
	
	if(this.source instanceof Image)
	{
		if(this.source.complete)
		{
			this.hasLoaded = true;
			this.width = this.source.width;
			this.height = this.source.height;
			
			PIXI.texturesToUpdate.push(this);
		}
		else
		{
			
			var scope = this;
			this.source.onload = function(){
				
				scope.hasLoaded = true;
				scope.width = scope.source.width;
				scope.height = scope.source.height;
			
				// add it to somewhere...
				PIXI.texturesToUpdate.push(scope);
				scope.dispatchEvent( { type: 'loaded', content: scope } );
			}
			//	this.image.src = imageUrl;
		}
	}
	else
	{
		this.hasLoaded = true;
		this.width = this.source.width;
		this.height = this.source.height;
			
		PIXI.texturesToUpdate.push(this);
	}
	
	this._powerOf2 = false;
	
}

PIXI.BaseTexture.constructor = PIXI.BaseTexture;

PIXI.BaseTexture.prototype.destroy = function()
{
	if(this.source instanceof Image)
	{
		this.source.src = null;
	}
	this.source = null;
	PIXI.texturesToDestroy.push(this);
}

/**
 * 
 * Helper function that returns a base texture based on an image url
 * If the image is not in the base texture cache it will be  created and loaded
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @return BaseTexture
 */
PIXI.BaseTexture.fromImage = function(imageUrl, crossorigin)
{
	var baseTexture = PIXI.BaseTextureCache[imageUrl];
	if(!baseTexture)
	{
		var image = new Image();
		if (crossorigin)
		{
			image.crossOrigin = '';
		}
		image.src = imageUrl;
		baseTexture = new PIXI.BaseTexture(image);
		PIXI.BaseTextureCache[imageUrl] = baseTexture;
	}

	return baseTexture;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.TextureCache = {};
PIXI.FrameCache = {};

/**
 * A texture stores the information that represents an image or part of an image. It cannot be added to the display list directly. To do this use PIXI.Sprite. If no frame is provided then the whole image is used
 * @class Texture
 * @extends EventTarget
 * @constructor
 * @param baseTexture {BaseTexture}
 * @param frmae {Rectangle}
 */
PIXI.Texture = function(baseTexture, frame)
{
	PIXI.EventTarget.call( this );
	
	if(!frame)
	{
		this.noFrame = true;
		frame = new PIXI.Rectangle(0,0,1,1);
	}
	
	this.trim = new PIXI.Point();

	if(baseTexture instanceof PIXI.Texture)
		baseTexture = baseTexture.baseTexture;
	
	/**
	 * The base texture of this texture
	 * @property baseTexture
	 * @type BaseTexture
	 */
	this.baseTexture = baseTexture;
	
	
	
	/**
	 * The frame specifies the region of the base texture that this texture uses
	 * @property frame
	 * @type #Rectangle
	 */
	this.frame = frame;
	
	this.scope = this;
	
	if(baseTexture.hasLoaded)
	{
		if(this.noFrame)frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
		//console.log(frame)
		
		this.setFrame(frame);
	}
	else
	{
		var scope = this;
		baseTexture.addEventListener( 'loaded', function(){ scope.onBaseTextureLoaded()} );
	}
}

PIXI.Texture.constructor = PIXI.Texture;

PIXI.Texture.prototype.onBaseTextureLoaded = function(event)
{
	var baseTexture = this.baseTexture;
	baseTexture.removeEventListener( 'loaded', this.onLoaded );
	
	if(this.noFrame)this.frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
	this.noFrame = false;
	this.width = this.frame.width;
	this.height = this.frame.height;
	
	this.scope.dispatchEvent( { type: 'update', content: this } );
}

PIXI.Texture.prototype.destroy = function(destroyBase)
{
	if(destroyBase)this.baseTexture.destroy();
}

/**
 * Specifies the rectangle region of the baseTexture
 * @method setFrame
 * @param frame {Rectangle}
 */
PIXI.Texture.prototype.setFrame = function(frame)
{
	this.frame = frame;
	this.width = frame.width;
	this.height = frame.height;
	
	if(frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height)
	{
		throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
	}
	
	this.updateFrame = true;
	
	PIXI.Texture.frameUpdates.push(this);
	//this.dispatchEvent( { type: 'update', content: this } );
}

/**
 * 
 * Helper function that returns a texture based on an image url
 * If the image is not in the texture cache it will be  created and loaded
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @return Texture
 */
PIXI.Texture.fromImage = function(imageUrl, crossorigin)
{
	var texture = PIXI.TextureCache[imageUrl];
	
	if(!texture)
	{
		texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(imageUrl, crossorigin));
		PIXI.TextureCache[imageUrl] = texture;
	}
	
	return texture;
}

/**
 * 
 * Helper function that returns a texture based on a frame id
 * If the frame id is not in the texture cache an error will be thrown
 * @method fromFrame
 * @param frameId {String} The frame id of the texture
 * @return Texture
 */
PIXI.Texture.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache " + this);
	return texture;
}

/**
 * 
 * Helper function that returns a texture based on a canvas element
 * If the canvas is not in the texture cache it will be  created and loaded
 * @static
 * @method fromCanvas
 * @param canvas {Canvas} The canvas element source of the texture
 * @return Texture
 */
PIXI.Texture.fromCanvas = function(canvas)
{
	var	baseTexture = new PIXI.BaseTexture(canvas);
	return new PIXI.Texture(baseTexture);
}


/**
 * 
 * Adds a texture to the textureCache. 
 * @static
 * @method addTextureToCache
 * @param texture {Texture}
 * @param id {String} the id that the texture will be stored against.
 */
PIXI.Texture.addTextureToCache = function(texture, id)
{
	PIXI.TextureCache[id] = texture;
}

/**
 * 
 * Remove a texture from the textureCache. 
 * @static
 * @method removeTextureFromCache
 * @param id {String} the id of the texture to be removed
 * @return {Texture} the texture that was removed
 */
PIXI.Texture.removeTextureFromCache = function(id)
{
	var texture = PIXI.TextureCache[id]
	PIXI.TextureCache[id] = null;
	return texture;
}

// this is more for webGL.. it contains updated frames..
PIXI.Texture.frameUpdates = [];


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A RenderTexture is a special texture that allows any pixi displayObject to be rendered to it. 
 * @class RenderTexture
 * @extends Texture
 * @constructor
 * @param width {Number}
 * @param height {Number}
 */
PIXI.RenderTexture = function(width, height)
{
	PIXI.EventTarget.call( this );
	
	this.width = width || 100;
	this.height = height || 100;

	this.indetityMatrix = PIXI.mat3.create();
	
	this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);	
	
	if(PIXI.gl)
	{
		this.initWebGL();
	}
	else
	{
		this.initCanvas();
	}
}

PIXI.RenderTexture.constructor = PIXI.RenderTexture;
PIXI.RenderTexture.prototype = Object.create( PIXI.Texture.prototype );

PIXI.RenderTexture.prototype.initWebGL = function()
{
	var gl = PIXI.gl;
	this.glFramebuffer = gl.createFramebuffer();
	
   	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );

    this.glFramebuffer.width = this.width;
    this.glFramebuffer.height = this.height;	
  
	this.baseTexture = new PIXI.BaseTexture();

	this.baseTexture.width = this.width;
	this.baseTexture.height = this.height;

    this.baseTexture._glTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);
	 	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width,  this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	this.baseTexture.isRender = true;
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.baseTexture._glTexture, 0);
	
	// create a projection matrix..
	this.projectionMatrix =  PIXI.mat4.create();
	
	this.projectionMatrix[5] = 2/this.height// * 0.5;
	this.projectionMatrix[13] = -1;
	
	this.projectionMatrix[0] = 2/this.width;
	this.projectionMatrix[12] = -1;

	// set the correct render function..
	this.render = this.renderWebGL;
}

PIXI.RenderTexture.prototype.initCanvas = function()
{
	this.renderer = new PIXI.CanvasRenderer(this.width, this.height, null, 0);
	
	this.baseTexture = new PIXI.BaseTexture(this.renderer.view);
	this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);
	
	this.render = this.renderCanvas;
}

/**
 * This function will draw the display object to the texture.
 * @method render
 * @param displayObject {DisplayObject}
 * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
 */
PIXI.RenderTexture.prototype.renderWebGL = function(displayObject, clear)
{
	var gl = PIXI.gl;
	
	// enable the alpha color mask..
	gl.colorMask(true, true, true, true); 
	
	gl.viewport(0, 0, this.width, this.height);	
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );
	
	if(clear)
	{
		gl.clearColor(0,0,0, 0);     
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	
	// THIS WILL MESS WITH HIT TESTING!
	var children = displayObject.children;
	
	//TODO -? create a new one??? dont think so!
	displayObject.worldTransform = PIXI.mat3.create();//sthis.indetityMatrix;
	
	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}
	
	var renderGroup = displayObject.__renderGroup;

	if(renderGroup)
	{
		if(displayObject == renderGroup.root)
		{
			renderGroup.render(this.projectionMatrix);
		}
		else
		{
			renderGroup.renderSpecific(displayObject, this.projectionMatrix);
		}
	}
	else
	{
		if(!this.renderGroup)this.renderGroup = new PIXI.WebGLRenderGroup(gl);
		this.renderGroup.setRenderable(displayObject);
		this.renderGroup.render(this.projectionMatrix);
	}
	
}

PIXI.RenderTexture.prototype.renderCanvas = function(displayObject, clear)
{
	var children = displayObject.children;
	
	displayObject.worldTransform = PIXI.mat3.create();
	
	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}

	if(clear)this.renderer.context.clearRect(0,0, this.width, this.height);
    this.renderer.renderDisplayObject(displayObject);
    
    PIXI.texturesToUpdate.push(this.baseTexture);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Class that loads a bunch of images / sprite sheet / bitmap font files. Once the assets have been loaded they are added to the PIXI Texture cache and can be accessed easily through PIXI.Texture.fromImage() and PIXI.Sprite.fromImage()
 * When all items have been loaded this class will dispatch a "onLoaded" event
 * As each individual item is loaded this class will dispatch a "onProgress" event
 * @class AssetLoader
 * @constructor
 * @extends EventTarget
 * @param {Array} assetURLs an array of image/sprite sheet urls that you would like loaded supported. Supported image formats include "jpeg", "jpg", "png", "gif". Supported sprite sheet data formats only include "JSON" at this time. Supported bitmap font data formats include "xml" and "fnt".
 */
PIXI.AssetLoader = function(assetURLs)
{
	PIXI.EventTarget.call(this);
	
	/**
	 * The array of asset URLs that are going to be loaded
	 * @property assetURLs
	 * @type Array
	 */
	this.assetURLs = assetURLs;

	this.crossorigin = false;

    this.loadersByType = {
        "jpg":  PIXI.ImageLoader,
        "jpeg": PIXI.ImageLoader,
        "png":  PIXI.ImageLoader,
        "gif":  PIXI.ImageLoader,
        "json": PIXI.JsonLoader,
        "anim": PIXI.SpineLoader,
        "xml":  PIXI.BitmapFontLoader,
        "fnt":  PIXI.BitmapFontLoader
    };
    
    
};

/**
Fired when an item has loaded
@event onProgress
**/

/**
Fired when all the assets have loaded
@event onComplete 
**/

// constructor
PIXI.AssetLoader.constructor = PIXI.AssetLoader;

/**
 * This will begin loading the assets sequentially
 */
PIXI.AssetLoader.prototype.load = function()
{
    var scope = this;

	this.loadCount = this.assetURLs.length;

    for (var i=0; i < this.assetURLs.length; i++)
	{
		var fileName = this.assetURLs[i];
		var fileType = fileName.split(".").pop().toLowerCase();

        var loaderClass = this.loadersByType[fileType];
        if(!loaderClass)
            throw new Error(fileType + " is an unsupported file type");

        var loader = new loaderClass(fileName, this.crossorigin);

        loader.addEventListener("loaded", function()
        {
            scope.onAssetLoaded();
        });
        loader.load();
	}
};

/**
 * Invoked after each file is loaded
 * @private
 */
PIXI.AssetLoader.prototype.onAssetLoaded = function()
{
    this.loadCount--;
	this.dispatchEvent({type: "onProgress", content: this});
	if(this.onProgress) this.onProgress();
	
	if(this.loadCount == 0)
	{
		this.dispatchEvent({type: "onComplete", content: this});
		if(this.onComplete) this.onComplete();
	}
};


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The json file loader is used to load in JSON data and parsing it
 * When loaded this class will dispatch a "loaded" event
 * If load failed this class will dispatch a "error" event
 * @class JsonLoader
 * @extends EventTarget
 * @constructor
 * @param {String} url the url of the JSON file
 * @param {Boolean} crossorigin
 */

PIXI.JsonLoader = function (url, crossorigin) {
	PIXI.EventTarget.call(this);
	this.url = url;
	this.baseUrl = url.replace(/[^\/]*$/, "");
	this.crossorigin = crossorigin;
	this.loaded = false;
	
};

// constructor
PIXI.JsonLoader.constructor = PIXI.JsonLoader;

/**
 * This will begin loading the JSON file
 */
PIXI.JsonLoader.prototype.load = function () {
	this.ajaxRequest = new AjaxRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange = function () {
		scope.onJSONLoaded();
	};

	this.ajaxRequest.open("GET", this.url, true);
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/json");
	this.ajaxRequest.send(null);
};

/**
 * Invoke when JSON file is loaded
 * @private
 */
PIXI.JsonLoader.prototype.onJSONLoaded = function () {
	if (this.ajaxRequest.readyState == 4) {
		if (this.ajaxRequest.status == 200 || window.location.href.indexOf("http") == -1) {
			this.json = JSON.parse(this.ajaxRequest.responseText);
			
			if(this.json.frames)
			{
				// sprite sheet
				var scope = this;
				var textureUrl = this.baseUrl + this.json.meta.image;
				var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
				var frameData = this.json.frames;
			
				this.texture = image.texture.baseTexture;
				image.addEventListener("loaded", function (event) {
					scope.onLoaded();
				});
			
				for (var i in frameData) {
					var rect = frameData[i].frame;
					if (rect) {
						PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {
							x: rect.x,
							y: rect.y,
							width: rect.w,
							height: rect.h
						});
						if (frameData[i].trimmed) {
							//var realSize = frameData[i].spriteSourceSize;
							PIXI.TextureCache[i].realSize = frameData[i].spriteSourceSize;
							PIXI.TextureCache[i].trim.x = 0; // (realSize.x / rect.w)
							// calculate the offset!
						}
					}
				}
			
				image.load();
				
			}
			else if(this.json.bones)
			{
				// spine animation
				var spineJsonParser = new spine.SkeletonJson();
				var skeletonData = spineJsonParser.readSkeletonData(this.json);
				PIXI.AnimCache[this.url] = skeletonData;
				this.onLoaded();
			}
			else
			{
				this.onLoaded();
			}
			
			
			
			
		} else {
			this.onError();
		}
	}
};

/**
 * Invoke when json file loaded
 * @private
 */
PIXI.JsonLoader.prototype.onLoaded = function () {
	this.loaded = true;
	this.dispatchEvent({
		type: "loaded",
		content: this
	});
};

/**
 * Invoke when error occured
 * @private
 */
PIXI.JsonLoader.prototype.onError = function () {
	this.dispatchEvent({
		type: "error",
		content: this
	});
};
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The sprite sheet loader is used to load in JSON sprite sheet data
 * To generate the data you can use http://www.codeandweb.com/texturepacker and publish the "JSON" format
 * There is a free version so thats nice, although the paid version is great value for money.
 * It is highly recommended to use Sprite sheets (also know as texture atlas") as it means sprite"s can be batched and drawn together for highly increased rendering speed.
 * Once the data has been loaded the frames are stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFromeId()
 * This loader will also load the image file that the Spritesheet points to as well as the data.
 * When loaded this class will dispatch a "loaded" event
 * @class SpriteSheetLoader
 * @extends EventTarget
 * @constructor
 * @param {String} url the url of the sprite sheet JSON file
 * @param {Boolean} crossorigin
 */

PIXI.SpriteSheetLoader = function (url, crossorigin) {
	/*
	 * i use texture packer to load the assets..
	 * http://www.codeandweb.com/texturepacker
	 * make sure to set the format as "JSON"
	 */
	PIXI.EventTarget.call(this);
	this.url = url;
	this.baseUrl = url.replace(/[^\/]*$/, "");
	this.texture = null;
	this.frames = {};
	this.crossorigin = crossorigin;
};

// constructor
PIXI.SpriteSheetLoader.constructor = PIXI.SpriteSheetLoader;

/**
 * This will begin loading the JSON file
 */
PIXI.SpriteSheetLoader.prototype.load = function () {
	var scope = this;
	var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
	jsonLoader.addEventListener("loaded", function (event) {
		scope.json = event.content.json;
		scope.onJSONLoaded();
	});
	jsonLoader.load();
};

/**
 * Invoke when JSON file is loaded
 * @private
 */
PIXI.SpriteSheetLoader.prototype.onJSONLoaded = function () {
	var scope = this;
	var textureUrl = this.baseUrl + this.json.meta.image;
	var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
	var frameData = this.json.frames;

	this.texture = image.texture.baseTexture;
	image.addEventListener("loaded", function (event) {
		scope.onLoaded();
	});

	for (var i in frameData) {
		var rect = frameData[i].frame;
		if (rect) {
			PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {
				x: rect.x,
				y: rect.y,
				width: rect.w,
				height: rect.h
			});
			if (frameData[i].trimmed) {
				//var realSize = frameData[i].spriteSourceSize;
				PIXI.TextureCache[i].realSize = frameData[i].spriteSourceSize;
				PIXI.TextureCache[i].trim.x = 0; // (realSize.x / rect.w)
				// calculate the offset!
			}
		}
	}

	image.load();
};
/**
 * Invoke when all files are loaded (json and texture)
 * @private
 */
PIXI.SpriteSheetLoader.prototype.onLoaded = function () {
	this.dispatchEvent({
		type: "loaded",
		content: this
	});
};
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The image loader class is responsible for loading images file formats ("jpeg", "jpg", "png" and "gif")
 * Once the image has been loaded it is stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFromeId()
 * When loaded this class will dispatch a 'loaded' event
 * @class ImageLoader
 * @extends EventTarget
 * @constructor
 * @param {String} url The url of the image
 * @param {Boolean} crossorigin
 */
PIXI.ImageLoader = function(url, crossorigin)
{
    PIXI.EventTarget.call(this);
    this.texture = PIXI.Texture.fromImage(url, crossorigin);
};

// constructor
PIXI.ImageLoader.constructor = PIXI.ImageLoader;

/**
 * Loads image or takes it from cache
 */
PIXI.ImageLoader.prototype.load = function()
{
    if(!this.texture.baseTexture.hasLoaded)
    {
        var scope = this;
        this.texture.baseTexture.addEventListener("loaded", function()
        {
            scope.onLoaded();
        });
    }
    else
    {
        this.onLoaded();
    }
};

/**
 * Invoked when image file is loaded or it is already cached and ready to use
 * @private
 */
PIXI.ImageLoader.prototype.onLoaded = function()
{
    this.dispatchEvent({type: "loaded", content: this});
};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The xml loader is used to load in XML bitmap font data ("xml" or "fnt")
 * To generate the data you can use http://www.angelcode.com/products/bmfont/
 * This loader will also load the image file as the data.
 * When loaded this class will dispatch a "loaded" event
 * @class BitmapFontLoader
 * @extends EventTarget
 * @constructor
 * @param {String} url the url of the sprite sheet JSON file
 * @param {Boolean} crossorigin
 */

PIXI.BitmapFontLoader = function(url, crossorigin)
{
    /*
     * i use texture packer to load the assets..
     * http://www.codeandweb.com/texturepacker
     * make sure to set the format as "JSON"
     */
    PIXI.EventTarget.call(this);
    this.url = url;
    this.baseUrl = url.replace(/[^\/]*$/, "");
    this.texture = null;
    this.crossorigin = crossorigin;
};

// constructor
PIXI.BitmapFontLoader.constructor = PIXI.BitmapFontLoader;

/**
 * This will begin loading the JSON file
 */
PIXI.BitmapFontLoader.prototype.load = function()
{
    this.ajaxRequest = new XMLHttpRequest();
    var scope = this;
    this.ajaxRequest.onreadystatechange = function()
    {
        scope.onXMLLoaded();
    };

    this.ajaxRequest.open("GET", this.url, true);
    if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/xml");
    this.ajaxRequest.send(null)
};

/**
 * Invoked when XML file is loaded
 * @private
 */
PIXI.BitmapFontLoader.prototype.onXMLLoaded = function()
{
    if (this.ajaxRequest.readyState == 4)
    {
        if (this.ajaxRequest.status == 200 || window.location.href.indexOf("http") == -1)
        {
            var textureUrl = this.baseUrl + this.ajaxRequest.responseXML.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue;
            var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
            this.texture = image.texture.baseTexture;

            var data = {};
            var info = this.ajaxRequest.responseXML.getElementsByTagName("info")[0];
            var common = this.ajaxRequest.responseXML.getElementsByTagName("common")[0];
            data.font = info.attributes.getNamedItem("face").nodeValue;
            data.size = parseInt(info.attributes.getNamedItem("size").nodeValue, 10);
            data.lineHeight = parseInt(common.attributes.getNamedItem("lineHeight").nodeValue, 10);
            data.chars = {};

            //parse letters
            var letters = this.ajaxRequest.responseXML.getElementsByTagName("char");

            for (var i = 0; i < letters.length; i++)
            {
                var charCode = parseInt(letters[i].attributes.getNamedItem("id").nodeValue, 10);

                var textureRect = {
                    x: parseInt(letters[i].attributes.getNamedItem("x").nodeValue, 10),
                    y: parseInt(letters[i].attributes.getNamedItem("y").nodeValue, 10),
                    width: parseInt(letters[i].attributes.getNamedItem("width").nodeValue, 10),
                    height: parseInt(letters[i].attributes.getNamedItem("height").nodeValue, 10)
                };
                PIXI.TextureCache[charCode] = new PIXI.Texture(this.texture, textureRect);

                data.chars[charCode] = {
                    xOffset: parseInt(letters[i].attributes.getNamedItem("xoffset").nodeValue, 10),
                    yOffset: parseInt(letters[i].attributes.getNamedItem("yoffset").nodeValue, 10),
                    xAdvance: parseInt(letters[i].attributes.getNamedItem("xadvance").nodeValue, 10),
                    kerning: {},
                    texture:new PIXI.Texture(this.texture, textureRect)

                };
            }

            //parse kernings
            var kernings = this.ajaxRequest.responseXML.getElementsByTagName("kerning");
            for (i = 0; i < kernings.length; i++)
            {
               var first = parseInt(kernings[i].attributes.getNamedItem("first").nodeValue, 10);
               var second = parseInt(kernings[i].attributes.getNamedItem("second").nodeValue, 10);
               var amount = parseInt(kernings[i].attributes.getNamedItem("amount").nodeValue, 10);

                data.chars[second].kerning[first] = amount;

            }

            PIXI.BitmapText.fonts[data.font] = data;

            var scope = this;
            image.addEventListener("loaded", function() {
                scope.onLoaded();
            });
            image.load();
        }
    }
};

/**
 * Invoked when all files are loaded (xml/fnt and texture)
 * @private
 */
PIXI.BitmapFontLoader.prototype.onLoaded = function()
{
    this.dispatchEvent({type: "loaded", content: this});
};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * based on pixi impact spine implementation made by Eemeli Kelokorpi (@ekelokorpi) https://github.com/ekelokorpi
 * 
 * Awesome JS run time provided by EsotericSoftware
 * https://github.com/EsotericSoftware/spine-runtimes
 * 
 */

/**
 * The Spine loader is used to load in JSON spine data
 * To generate the data you need to use http://esotericsoftware.com/ and export the "JSON" format
 * Due to a clash of names  You will need to change the extension of the spine file from *.json to *.anim for it to load
 * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
 * You will need to generate a sprite sheet to accompany the spine data 
 * When loaded this class will dispatch a "loaded" event
 * @class Spine
 * @constructor
 * @extends 
 * @param {String} url the url of the sprite sheet JSON file
 * @param {Boolean} crossorigin
 */
PIXI.SpineLoader = function(url, crossorigin) 
{
	PIXI.EventTarget.call(this);
	this.url = url;
	this.crossorigin = crossorigin;
	this.loaded = false;
}

PIXI.SpineLoader.constructor = PIXI.SpineLoader;

PIXI.SpineLoader.prototype.load = function()
{
	new PIXI.JsonLoader(this.url, this.crossorigin);
		jsonLoader.addEventListener("loaded", function (event) {
			scope.json = event.content.json;
			scope.onJSONLoaded();
		});
		jsonLoader.load();
};

PIXI.SpineLoader.prototype.load = function () {
	
	var scope = this;
	var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
	jsonLoader.addEventListener("loaded", function (event) {
		scope.json = event.content.json;
		scope.onJSONLoaded();
	});
	jsonLoader.load();
};

/**
 * Invoke when JSON file is loaded
 * @private
 */
PIXI.SpineLoader.prototype.onJSONLoaded = function (event) {
	
	var spineJsonParser = new spine.SkeletonJson();
	
	var skeletonData = spineJsonParser.readSkeletonData(this.json);
	
	PIXI.AnimCache[this.url] = skeletonData;

	this.onLoaded();
};


			
PIXI.SpineLoader.prototype.onLoaded = function()
{
	this.loaded = true;
    this.dispatchEvent({type: "loaded", content: this});
};


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

 if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = PIXI;
    }
    exports.PIXI = PIXI;
  } else {
    root.PIXI = PIXI;
  }


}).call(this);
(function(){
/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

Object.create = Object.create || function(o) {
	function F() {}
	F.prototype = o;
	return new F();
};
 
//var VERSION = CP_VERSION_MAJOR + "." + CP_VERSION_MINOR + "." + CP_VERSION_RELEASE;

var cp;
if(typeof exports === 'undefined'){
	cp = {};

	if(typeof window === 'object'){
		window.cp = cp;
	}
} else {
	cp = exports;
}

var assert = function(value, message)
{
	if (!value) {
		throw new Error('Assertion failed: ' + message);
	}
};

var assertSoft = function(value, message)
{
	if(!value && console && console.warn) {
		console.warn("ASSERTION FAILED: " + message);
		if(console.trace) {
			console.trace();
		}
	}
};

var mymin = function(a, b)
{
	return a < b ? a : b;
};
var mymax = function(a, b)
{
	return a > b ? a : b;
};

var min, max;
if (typeof window === 'object' && window.navigator.userAgent.indexOf('Firefox') > -1){
	// On firefox, Math.min and Math.max are really fast:
	// http://jsperf.com/math-vs-greater-than/8
	min = Math.min;
	max = Math.max;
} else {
	// On chrome and safari, Math.min / max are slooow. The ternery operator above is faster
	// than the builtins because we only have to deal with 2 arguments that are always numbers.
	min = mymin;
	max = mymax;
}

/* The hashpair function takes two numbers and returns a hash code for them.
 * Required that hashPair(a, b) === hashPair(b, a).
 * Chipmunk's hashPair function is defined as:
 *   #define CP_HASH_COEF (3344921057ul)
 *   #define CP_HASH_PAIR(A, B) ((cpHashValue)(A)*CP_HASH_COEF ^ (cpHashValue)(B)*CP_HASH_COEF)
 * But thats not suitable in javascript because multiplying by a large number will make the number
 * a large float.
 *
 * The result of hashPair is used as the key in objects, so it returns a string.
 */
var hashPair = function(a, b)
{
	//assert(typeof(a) === 'number', "HashPair used on something not a number");
	return a < b ? a + ' ' + b : b + ' ' + a;
};

var deleteObjFromList = function(arr, obj)
{
	for(var i=0; i<arr.length; i++){
		if(arr[i] === obj){
			arr[i] = arr[arr.length - 1];
			arr.length--;
			
			return;
		}
	}
};

var closestPointOnSegment = function(p, a, b)
{
	var delta = vsub(a, b);
	var t = clamp01(vdot(delta, vsub(p, b))/vlengthsq(delta));
	return vadd(b, vmult(delta, t));
};

var closestPointOnSegment2 = function(px, py, ax, ay, bx, by)
{
	var deltax = ax - bx;
	var deltay = ay - by;
	var t = clamp01(vdot2(deltax, deltay, px - bx, py - by)/vlengthsq2(deltax, deltay));
	return new Vect(bx + deltax * t, by + deltay * t);
};

cp.momentForCircle = function(m, r1, r2, offset)
{
	return m*(0.5*(r1*r1 + r2*r2) + vlengthsq(offset));
};

cp.areaForCircle = function(r1, r2)
{
	return Math.PI*Math.abs(r1*r1 - r2*r2);
};

cp.momentForSegment = function(m, a, b)
{
	var offset = vmult(vadd(a, b), 0.5);
	return m*(vdistsq(b, a)/12 + vlengthsq(offset));
};

cp.areaForSegment = function(a, b, r)
{
	return r*(Math.PI*r + 2*vdist(a, b));
};

cp.momentForPoly = function(m, verts, offset)
{
	var sum1 = 0;
	var sum2 = 0;
	var len = verts.length;
	for(var i=0; i<len; i+=2){
		var v1x = verts[i] + offset.x;
	 	var v1y = verts[i+1] + offset.y;
		var v2x = verts[(i+2)%len] + offset.x;
		var v2y = verts[(i+3)%len] + offset.y;

		var a = vcross2(v2x, v2y, v1x, v1y);
		var b = vdot2(v1x, v1y, v1x, v1y) + vdot2(v1x, v1y, v2x, v2y) + vdot2(v2x, v2y, v2x, v2y);
		
		sum1 += a*b;
		sum2 += a;
	}
	
	return (m*sum1)/(6*sum2);
};

cp.areaForPoly = function(verts)
{
	var area = 0;
	for(var i=0, len=verts.length; i<len; i+=2){
		area += vcross(new Vect(verts[i], verts[i+1]), new Vect(verts[(i+2)%len], verts[(i+3)%len]));
	}
	
	return -area/2;
};

cp.centroidForPoly = function(verts)
{
	var sum = 0;
	var vsum = new Vect(0,0);
	
	for(var i=0, len=verts.length; i<len; i+=2){
		var v1 = new Vect(verts[i], verts[i+1]);
		var v2 = new Vect(verts[(i+2)%len], verts[(i+3)%len]);
		var cross = vcross(v1, v2);
		
		sum += cross;
		vsum = vadd(vsum, vmult(vadd(v1, v2), cross));
	}
	
	return vmult(vsum, 1/(3*sum));
};

cp.recenterPoly = function(verts)
{
	var centroid = cp.centroidForPoly(verts);
	
	for(var i=0; i<verts.length; i+=2){
		verts[i] -= centroid.x;
		verts[i+1] -= centroid.y;
	}
};

cp.momentForBox = function(m, width, height)
{
	return m*(width*width + height*height)/12;
};

cp.momentForBox2 = function(m, box)
{
	var width = box.r - box.l;
	var height = box.t - box.b;
	var offset = vmult([box.l + box.r, box.b + box.t], 0.5);
	
	// TODO NaN when offset is 0 and m is INFINITY	
	return cp.momentForBox(m, width, height) + m*vlengthsq(offset);
};

// Quick hull

var loopIndexes = cp.loopIndexes = function(verts)
{
	var start = 0, end = 0;
	var minx, miny, maxx, maxy;
	minx = maxx = verts[0];
	miny = maxy = verts[1];
	
	var count = verts.length >> 1;
  for(var i=1; i<count; i++){
		var x = verts[i*2];
		var y = verts[i*2 + 1];
		
    if(x < minx || (x == minx && y < miny)){
			minx = x;
			miny = y;
      start = i;
    } else if(x > maxx || (x == maxx && y > maxy)){
			maxx = x;
			maxy = y;
			end = i;
		}
	}
	return [start, end];
};

var SWAP = function(arr, idx1, idx2)
{
	var tmp = arr[idx1*2];
	arr[idx1*2] = arr[idx2*2];
	arr[idx2*2] = tmp;

	tmp = arr[idx1*2+1];
	arr[idx1*2+1] = arr[idx2*2+1];
	arr[idx2*2+1] = tmp;
};

var QHullPartition = function(verts, offs, count, a, b, tol)
{
	if(count === 0) return 0;
	
	var max = 0;
	var pivot = offs;
	
	var delta = vsub(b, a);
	var valueTol = tol * vlength(delta);
	
	var head = offs;
	for(var tail = offs+count-1; head <= tail;){
		var v = new Vect(verts[head * 2], verts[head * 2 + 1]);
		var value = vcross(delta, vsub(v, a));
		if(value > valueTol){
			if(value > max){
				max = value;
				pivot = head;
			}
			
			head++;
		} else {
			SWAP(verts, head, tail);
			tail--;
		}
	}
	
	// move the new pivot to the front if it's not already there.
	if(pivot != offs) SWAP(verts, offs, pivot);
	return head - offs;
};

var QHullReduce = function(tol, verts, offs, count, a, pivot, b, resultPos)
{
	if(count < 0){
		return 0;
	} else if(count == 0) {
		verts[resultPos*2] = pivot.x;
		verts[resultPos*2+1] = pivot.y;
		return 1;
	} else {
		var left_count = QHullPartition(verts, offs, count, a, pivot, tol);
		var left = new Vect(verts[offs*2], verts[offs*2+1]);
		var index = QHullReduce(tol, verts, offs + 1, left_count - 1, a, left, pivot, resultPos);
		
		var pivotPos = resultPos + index++;
		verts[pivotPos*2] = pivot.x;
		verts[pivotPos*2+1] = pivot.y;
		
		var right_count = QHullPartition(verts, offs + left_count, count - left_count, pivot, b, tol);
		var right = new Vect(verts[(offs+left_count)*2], verts[(offs+left_count)*2+1]);
		return index + QHullReduce(tol, verts, offs + left_count + 1, right_count - 1, pivot, right, b, resultPos + index);
	}
};

// QuickHull seemed like a neat algorithm, and efficient-ish for large input sets.
// My implementation performs an in place reduction using the result array as scratch space.
//
// Pass an Array into result to put the result of the calculation there. Otherwise, pass null
// and the verts list will be edited in-place.
//
// Expects the verts to be described in the same way as cpPolyShape - which is to say, it should
// be a list of [x1,y1,x2,y2,x3,y3,...].
//
// tolerance is in world coordinates. Eg, 2.
cp.convexHull = function(verts, result, tolerance)
{
	if(result){
		// Copy the line vertexes into the empty part of the result polyline to use as a scratch buffer.
		for (var i = 0; i < verts.length; i++){
			result[i] = verts[i];
		}
	} else {
		// If a result array was not specified, reduce the input instead.
		result = verts;
	}
	
	// Degenerate case, all points are the same.
	var indexes = loopIndexes(verts);
	var start = indexes[0], end = indexes[1];
	if(start == end){
		//if(first) (*first) = 0;
		result.length = 2;
		return result;
	}
	
	SWAP(result, 0, start);
	SWAP(result, 1, end == 0 ? start : end);
	
	var a = new Vect(result[0], result[1]);
	var b = new Vect(result[2], result[3]);
	
	var count = verts.length >> 1;
	//if(first) (*first) = start;
	var resultCount = QHullReduce(tolerance, result, 2, count - 2, a, b, a, 1) + 1;
	result.length = resultCount*2;

	assertSoft(polyValidate(result),
		"Internal error: cpConvexHull() and cpPolyValidate() did not agree." +
		"Please report this error with as much info as you can.");
	return result;
};

/// Clamp @c f to be between @c min and @c max.
var clamp = function(f, minv, maxv)
{
	return min(max(f, minv), maxv);
};

/// Clamp @c f to be between 0 and 1.
var clamp01 = function(f)
{
	return max(0, min(f, 1));
};

/// Linearly interpolate (or extrapolate) between @c f1 and @c f2 by @c t percent.
var lerp = function(f1, f2, t)
{
	return f1*(1 - t) + f2*t;
};

/// Linearly interpolate from @c f1 to @c f2 by no more than @c d.
var lerpconst = function(f1, f2, d)
{
	return f1 + clamp(f2 - f1, -d, d);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// I'm using an array tuple here because (at time of writing) its about 3x faster
// than an object on firefox, and the same speed on chrome.

//var numVects = 0;

var Vect = cp.Vect = function(x, y)
{
	this.x = x;
	this.y = y;
	//numVects++;

//	var s = new Error().stack;
//	traces[s] = traces[s] ? traces[s]+1 : 1;
};

cp.v = function (x,y) { return new Vect(x, y) };

var vzero = cp.vzero = new Vect(0,0);

// The functions below *could* be rewritten to be instance methods on Vect. I don't
// know how that would effect performance. For now, I'm keeping the JS similar to
// the original C code.

/// Vector dot product.
var vdot = cp.v.dot = function(v1, v2)
{
	return v1.x*v2.x + v1.y*v2.y;
};

var vdot2 = function(x1, y1, x2, y2)
{
	return x1*x2 + y1*y2;
};

/// Returns the length of v.
var vlength = cp.v.len = function(v)
{
	return Math.sqrt(vdot(v, v));
};

var vlength2 = cp.v.len2 = function(x, y)
{
	return Math.sqrt(x*x + y*y);
};

/// Check if two vectors are equal. (Be careful when comparing floating point numbers!)
var veql = cp.v.eql = function(v1, v2)
{
	return (v1.x === v2.x && v1.y === v2.y);
};

/// Add two vectors
var vadd = cp.v.add = function(v1, v2)
{
	return new Vect(v1.x + v2.x, v1.y + v2.y);
};

Vect.prototype.add = function(v2)
{
	this.x += v2.x;
	this.y += v2.y;
	return this;
};

/// Subtract two vectors.
var vsub = cp.v.sub = function(v1, v2)
{
	return new Vect(v1.x - v2.x, v1.y - v2.y);
};

Vect.prototype.sub = function(v2)
{
	this.x -= v2.x;
	this.y -= v2.y;
	return this;
};

/// Negate a vector.
var vneg = cp.v.neg = function(v)
{
	return new Vect(-v.x, -v.y);
};

Vect.prototype.neg = function()
{
	this.x = -this.x;
	this.y = -this.y;
	return this;
};

/// Scalar multiplication.
var vmult = cp.v.mult = function(v, s)
{
	return new Vect(v.x*s, v.y*s);
};

Vect.prototype.mult = function(s)
{
	this.x *= s;
	this.y *= s;
	return this;
};

/// 2D vector cross product analog.
/// The cross product of 2D vectors results in a 3D vector with only a z component.
/// This function returns the magnitude of the z value.
var vcross = cp.v.cross = function(v1, v2)
{
	return v1.x*v2.y - v1.y*v2.x;
};

var vcross2 = function(x1, y1, x2, y2)
{
	return x1*y2 - y1*x2;
};

/// Returns a perpendicular vector. (90 degree rotation)
var vperp = cp.v.perp = function(v)
{
	return new Vect(-v.y, v.x);
};

/// Returns a perpendicular vector. (-90 degree rotation)
var vpvrperp = cp.v.pvrperp = function(v)
{
	return new Vect(v.y, -v.x);
};

/// Returns the vector projection of v1 onto v2.
var vproject = cp.v.project = function(v1, v2)
{
	return vmult(v2, vdot(v1, v2)/vlengthsq(v2));
};

Vect.prototype.project = function(v2)
{
	this.mult(vdot(this, v2) / vlengthsq(v2));
	return this;
};

/// Uses complex number multiplication to rotate v1 by v2. Scaling will occur if v1 is not a unit vector.
var vrotate = cp.v.rotate = function(v1, v2)
{
	return new Vect(v1.x*v2.x - v1.y*v2.y, v1.x*v2.y + v1.y*v2.x);
};

Vect.prototype.rotate = function(v2)
{
	this.x = this.x * v2.x - this.y * v2.y;
	this.y = this.x * v2.y + this.y * v2.x;
	return this;
};

/// Inverse of vrotate().
var vunrotate = cp.v.unrotate = function(v1, v2)
{
	return new Vect(v1.x*v2.x + v1.y*v2.y, v1.y*v2.x - v1.x*v2.y);
};

/// Returns the squared length of v. Faster than vlength() when you only need to compare lengths.
var vlengthsq = cp.v.lengthsq = function(v)
{
	return vdot(v, v);
};

var vlengthsq2 = cp.v.lengthsq2 = function(x, y)
{
	return x*x + y*y;
};

/// Linearly interpolate between v1 and v2.
var vlerp = cp.v.lerp = function(v1, v2, t)
{
	return vadd(vmult(v1, 1 - t), vmult(v2, t));
};

/// Returns a normalized copy of v.
var vnormalize = cp.v.normalize = function(v)
{
	return vmult(v, 1/vlength(v));
};

/// Returns a normalized copy of v or vzero if v was already vzero. Protects against divide by zero errors.
var vnormalize_safe = cp.v.normalize_safe = function(v)
{
	return (v.x === 0 && v.y === 0 ? vzero : vnormalize(v));
};

/// Clamp v to length len.
var vclamp = cp.v.clamp = function(v, len)
{
	return (vdot(v,v) > len*len) ? vmult(vnormalize(v), len) : v;
};

/// Linearly interpolate between v1 towards v2 by distance d.
var vlerpconst = cp.v.lerpconst = function(v1, v2, d)
{
	return vadd(v1, vclamp(vsub(v2, v1), d));
};

/// Returns the distance between v1 and v2.
var vdist = cp.v.dist = function(v1, v2)
{
	return vlength(vsub(v1, v2));
};

/// Returns the squared distance between v1 and v2. Faster than vdist() when you only need to compare distances.
var vdistsq = cp.v.distsq = function(v1, v2)
{
	return vlengthsq(vsub(v1, v2));
};

/// Returns true if the distance between v1 and v2 is less than dist.
var vnear = cp.v.near = function(v1, v2, dist)
{
	return vdistsq(v1, v2) < dist*dist;
};

/// Spherical linearly interpolate between v1 and v2.
var vslerp = cp.v.slerp = function(v1, v2, t)
{
	var omega = Math.acos(vdot(v1, v2));
	
	if(omega) {
		var denom = 1/Math.sin(omega);
		return vadd(vmult(v1, Math.sin((1 - t)*omega)*denom), vmult(v2, Math.sin(t*omega)*denom));
	} else {
		return v1;
	}
};

/// Spherical linearly interpolate between v1 towards v2 by no more than angle a radians
var vslerpconst = cp.v.slerpconst = function(v1, v2, a)
{
	var angle = Math.acos(vdot(v1, v2));
	return vslerp(v1, v2, min(a, angle)/angle);
};

/// Returns the unit length vector for the given angle (in radians).
var vforangle = cp.v.forangle = function(a)
{
	return new Vect(Math.cos(a), Math.sin(a));
};

/// Returns the angular direction v is pointing in (in radians).
var vtoangle = cp.v.toangle = function(v)
{
	return Math.atan2(v.y, v.x);
};

///	Returns a string representation of v. Intended mostly for debugging purposes and not production use.
var vstr = cp.v.str = function(v)
{
	return "(" + v.x.toFixed(3) + ", " + v.y.toFixed(3) + ")";
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/// Chipmunk's axis-aligned 2D bounding box type along with a few handy routines.

var numBB = 0;

// Bounding boxes are JS objects with {l, b, r, t} = left, bottom, right, top, respectively.
var BB = cp.BB = function(l, b, r, t)
{
	this.l = l;
	this.b = b;
	this.r = r;
	this.t = t;

	numBB++;
};

cp.bb = function(l, b, r, t) { return new BB(l, b, r, t); };

var bbNewForCircle = function(p, r)
{
	return new BB(
			p.x - r,
			p.y - r,
			p.x + r,
			p.y + r
		);
};

/// Returns true if @c a and @c b intersect.
var bbIntersects = function(a, b)
{
	return (a.l <= b.r && b.l <= a.r && a.b <= b.t && b.b <= a.t);
};
var bbIntersects2 = function(bb, l, b, r, t)
{
	return (bb.l <= r && l <= bb.r && bb.b <= t && b <= bb.t);
};

/// Returns true if @c other lies completely within @c bb.
var bbContainsBB = function(bb, other)
{
	return (bb.l <= other.l && bb.r >= other.r && bb.b <= other.b && bb.t >= other.t);
};

/// Returns true if @c bb contains @c v.
var bbContainsVect = function(bb, v)
{
	return (bb.l <= v.x && bb.r >= v.x && bb.b <= v.y && bb.t >= v.y);
};
var bbContainsVect2 = function(l, b, r, t, v)
{
	return (l <= v.x && r >= v.x && b <= v.y && t >= v.y);
};

/// Returns a bounding box that holds both bounding boxes.
var bbMerge = function(a, b){
	return new BB(
			min(a.l, b.l),
			min(a.b, b.b),
			max(a.r, b.r),
			max(a.t, b.t)
		);
};

/// Returns a bounding box that holds both @c bb and @c v.
var bbExpand = function(bb, v){
	return new BB(
			min(bb.l, v.x),
			min(bb.b, v.y),
			max(bb.r, v.x),
			max(bb.t, v.y)
		);
};

/// Returns the area of the bounding box.
var bbArea = function(bb)
{
	return (bb.r - bb.l)*(bb.t - bb.b);
};

/// Merges @c a and @c b and returns the area of the merged bounding box.
var bbMergedArea = function(a, b)
{
	return (max(a.r, b.r) - min(a.l, b.l))*(max(a.t, b.t) - min(a.b, b.b));
};

var bbMergedArea2 = function(bb, l, b, r, t)
{
	return (max(bb.r, r) - min(bb.l, l))*(max(bb.t, t) - min(bb.b, b));
};

/// Return true if the bounding box intersects the line segment with ends @c a and @c b.
var bbIntersectsSegment = function(bb, a, b)
{
	return (bbSegmentQuery(bb, a, b) != Infinity);
};

/// Clamp a vector to a bounding box.
var bbClampVect = function(bb, v)
{
	var x = min(max(bb.l, v.x), bb.r);
	var y = min(max(bb.b, v.y), bb.t);
	return new Vect(x, y);
};

// TODO edge case issue
/// Wrap a vector to a bounding box.
var bbWrapVect = function(bb, v)
{
	var ix = Math.abs(bb.r - bb.l);
	var modx = (v.x - bb.l) % ix;
	var x = (modx > 0) ? modx : modx + ix;
	
	var iy = Math.abs(bb.t - bb.b);
	var mody = (v.y - bb.b) % iy;
	var y = (mody > 0) ? mody : mody + iy;
	
	return new Vect(x + bb.l, y + bb.b);
};
/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
 
/// Segment query info struct.
/* These are created using literals where needed.
typedef struct cpSegmentQueryInfo {
	/// The shape that was hit, null if no collision occured.
	cpShape *shape;
	/// The normalized distance along the query segment in the range [0, 1].
	cpFloat t;
	/// The normal of the surface hit.
	cpVect n;
} cpSegmentQueryInfo;
*/

var shapeIDCounter = 0;

var CP_NO_GROUP = cp.NO_GROUP = 0;
var CP_ALL_LAYERS = cp.ALL_LAYERS = ~0;

cp.resetShapeIdCounter = function()
{
	shapeIDCounter = 0;
};

/// The cpShape struct defines the shape of a rigid body.
//
/// Opaque collision shape struct. Do not create directly - instead use
/// PolyShape, CircleShape and SegmentShape.
var Shape = cp.Shape = function(body) {
	/// The rigid body this collision shape is attached to.
	this.body = body;

	/// The current bounding box of the shape.
	this.bb_l = this.bb_b = this.bb_r = this.bb_t = 0;

	this.hashid = shapeIDCounter++;

	/// Sensor flag.
	/// Sensor shapes call collision callbacks but don't produce collisions.
	this.sensor = false;
	
	/// Coefficient of restitution. (elasticity)
	this.e = 0;
	/// Coefficient of friction.
	this.u = 0;
	/// Surface velocity used when solving for friction.
	this.surface_v = vzero;
	
	/// Collision type of this shape used when picking collision handlers.
	this.collision_type = 0;
	/// Group of this shape. Shapes in the same group don't collide.
	this.group = 0;
	// Layer bitmask for this shape. Shapes only collide if the bitwise and of their layers is non-zero.
	this.layers = CP_ALL_LAYERS;
	
	this.space = null;

	// Copy the collision code from the prototype into the actual object. This makes collision
	// function lookups slightly faster.
	this.collisionCode = this.collisionCode;
};

Shape.prototype.setElasticity = function(e) { this.e = e; };
Shape.prototype.setFriction = function(u) { this.body.activate(); this.u = u; };
Shape.prototype.setLayers = function(layers) { this.body.activate(); this.layers = layers; };
Shape.prototype.setSensor = function(sensor) { this.body.activate(); this.sensor = sensor; };
Shape.prototype.setCollisionType = function(collision_type) { this.body.activate(); this.collision_type = collision_type; };
Shape.prototype.getBody = function() { return this.body; };

Shape.prototype.active = function()
{
// return shape->prev || (shape->body && shape->body->shapeList == shape);
	return this.body && this.body.shapeList.indexOf(this) !== -1;
};

Shape.prototype.setBody = function(body)
{
	assert(!this.active(), "You cannot change the body on an active shape. You must remove the shape from the space before changing the body.");
	this.body = body;
};

Shape.prototype.cacheBB = function()
{
	return this.update(this.body.p, this.body.rot);
};

Shape.prototype.update = function(pos, rot)
{
	assert(!isNaN(rot.x), 'Rotation is NaN');
	assert(!isNaN(pos.x), 'Position is NaN');
	this.cacheData(pos, rot);
};

Shape.prototype.pointQuery = function(p)
{
	var info = this.nearestPointQuery(p);
	if (info.d < 0) return info;
};

Shape.prototype.getBB = function()
{
	return new BB(this.bb_l, this.bb_b, this.bb_r, this.bb_t);
};

/* Not implemented - all these getters and setters. Just edit the object directly.
CP_DefineShapeStructGetter(cpBody*, body, Body);
void cpShapeSetBody(cpShape *shape, cpBody *body);

CP_DefineShapeStructGetter(cpBB, bb, BB);
CP_DefineShapeStructProperty(cpBool, sensor, Sensor, cpTrue);
CP_DefineShapeStructProperty(cpFloat, e, Elasticity, cpFalse);
CP_DefineShapeStructProperty(cpFloat, u, Friction, cpTrue);
CP_DefineShapeStructProperty(cpVect, surface_v, SurfaceVelocity, cpTrue);
CP_DefineShapeStructProperty(cpDataPointer, data, UserData, cpFalse);
CP_DefineShapeStructProperty(cpCollisionType, collision_type, CollisionType, cpTrue);
CP_DefineShapeStructProperty(cpGroup, group, Group, cpTrue);
CP_DefineShapeStructProperty(cpLayers, layers, Layers, cpTrue);
*/

/// Extended point query info struct. Returned from calling pointQuery on a shape.
var PointQueryExtendedInfo = function(shape)
{
	/// Shape that was hit, NULL if no collision occurred.
	this.shape = shape;
	/// Depth of the point inside the shape.
	this.d = Infinity;
	/// Direction of minimum norm to the shape's surface.
	this.n = vzero;
};

var NearestPointQueryInfo = function(shape, p, d)
{
	/// The nearest shape, NULL if no shape was within range.
	this.shape = shape;
	/// The closest point on the shape's surface. (in world space coordinates)
	this.p = p;
	/// The distance to the point. The distance is negative if the point is inside the shape.
	this.d = d;
};

var SegmentQueryInfo = function(shape, t, n)
{
	/// The shape that was hit, NULL if no collision occured.
	this.shape = shape;
	/// The normalized distance along the query segment in the range [0, 1].
	this.t = t;
	/// The normal of the surface hit.
	this.n = n;
};

/// Get the hit point for a segment query.
SegmentQueryInfo.prototype.hitPoint = function(start, end)
{
	return vlerp(start, end, this.t);
};

/// Get the hit distance for a segment query.
SegmentQueryInfo.prototype.hitDist = function(start, end)
{
	return vdist(start, end) * this.t;
};

// Circles.

var CircleShape = cp.CircleShape = function(body, radius, offset)
{
	this.c = this.tc = offset;
	this.r = radius;
	
	this.type = 'circle';

	Shape.call(this, body);
};

CircleShape.prototype = Object.create(Shape.prototype);

CircleShape.prototype.cacheData = function(p, rot)
{
	//var c = this.tc = vadd(p, vrotate(this.c, rot));
	var c = this.tc = vrotate(this.c, rot).add(p);
	//this.bb = bbNewForCircle(c, this.r);
	var r = this.r;
	this.bb_l = c.x - r;
	this.bb_b = c.y - r;
	this.bb_r = c.x + r;
	this.bb_t = c.y + r;
};

/// Test if a point lies within a shape.
/*CircleShape.prototype.pointQuery = function(p)
{
	var delta = vsub(p, this.tc);
	var distsq = vlengthsq(delta);
	var r = this.r;
	
	if(distsq < r*r){
		var info = new PointQueryExtendedInfo(this);
		
		var dist = Math.sqrt(distsq);
		info.d = r - dist;
		info.n = vmult(delta, 1/dist);
		return info;
	}
};*/

CircleShape.prototype.nearestPointQuery = function(p)
{
	var deltax = p.x - this.tc.x;
	var deltay = p.y - this.tc.y;
	var d = vlength2(deltax, deltay);
	var r = this.r;
	
	var nearestp = new Vect(this.tc.x + deltax * r/d, this.tc.y + deltay * r/d);
	return new NearestPointQueryInfo(this, nearestp, d - r);
};

var circleSegmentQuery = function(shape, center, r, a, b, info)
{
	// offset the line to be relative to the circle
	a = vsub(a, center);
	b = vsub(b, center);
	
	var qa = vdot(a, a) - 2*vdot(a, b) + vdot(b, b);
	var qb = -2*vdot(a, a) + 2*vdot(a, b);
	var qc = vdot(a, a) - r*r;
	
	var det = qb*qb - 4*qa*qc;
	
	if(det >= 0)
	{
		var t = (-qb - Math.sqrt(det))/(2*qa);
		if(0 <= t && t <= 1){
			return new SegmentQueryInfo(shape, t, vnormalize(vlerp(a, b, t)));
		}
	}
};

CircleShape.prototype.segmentQuery = function(a, b)
{
	return circleSegmentQuery(this, this.tc, this.r, a, b);
};

// The C API has these, and also getters. Its not idiomatic to
// write getters and setters in JS.
/*
CircleShape.prototype.setRadius = function(radius)
{
	this.r = radius;
}

CircleShape.prototype.setOffset = function(offset)
{
	this.c = offset;
}*/

// Segment shape

var SegmentShape = cp.SegmentShape = function(body, a, b, r)
{
	this.a = a;
	this.b = b;
	this.n = vperp(vnormalize(vsub(b, a)));

	this.ta = this.tb = this.tn = null;
	
	this.r = r;
	
	this.a_tangent = vzero;
	this.b_tangent = vzero;
	
	this.type = 'segment';
	Shape.call(this, body);
};

SegmentShape.prototype = Object.create(Shape.prototype);

SegmentShape.prototype.cacheData = function(p, rot)
{
	this.ta = vadd(p, vrotate(this.a, rot));
	this.tb = vadd(p, vrotate(this.b, rot));
	this.tn = vrotate(this.n, rot);
	
	var l,r,b,t;
	
	if(this.ta.x < this.tb.x){
		l = this.ta.x;
		r = this.tb.x;
	} else {
		l = this.tb.x;
		r = this.ta.x;
	}
	
	if(this.ta.y < this.tb.y){
		b = this.ta.y;
		t = this.tb.y;
	} else {
		b = this.tb.y;
		t = this.ta.y;
	}
	
	var rad = this.r;

	this.bb_l = l - rad;
	this.bb_b = b - rad;
	this.bb_r = r + rad;
	this.bb_t = t + rad;
};

SegmentShape.prototype.nearestPointQuery = function(p)
{
	var closest = closestPointOnSegment(p, this.ta, this.tb);
		
	var deltax = p.x - closest.x;
	var deltay = p.y - closest.y;
	var d = vlength2(deltax, deltay);
	var r = this.r;
	
	var nearestp = (d ? vadd(closest, vmult(new Vect(deltax, deltay), r/d)) : closest);
	return new NearestPointQueryInfo(this, nearestp, d - r);
};

SegmentShape.prototype.segmentQuery = function(a, b)
{
	var n = this.tn;
	var d = vdot(vsub(this.ta, a), n);
	var r = this.r;
	
	var flipped_n = (d > 0 ? vneg(n) : n);
	var n_offset = vsub(vmult(flipped_n, r), a);
	
	var seg_a = vadd(this.ta, n_offset);
	var seg_b = vadd(this.tb, n_offset);
	var delta = vsub(b, a);
	
	if(vcross(delta, seg_a)*vcross(delta, seg_b) <= 0){
		var d_offset = d + (d > 0 ? -r : r);
		var ad = -d_offset;
		var bd = vdot(delta, n) - d_offset;
		
		if(ad*bd < 0){
			return new SegmentQueryInfo(this, ad/(ad - bd), flipped_n);
		}
	} else if(r !== 0){
		var info1 = circleSegmentQuery(this, this.ta, this.r, a, b);
		var info2 = circleSegmentQuery(this, this.tb, this.r, a, b);
		
		if (info1){
			return info2 && info2.t < info1.t ? info2 : info1;
		} else {
			return info2;
		}
	}
};

SegmentShape.prototype.setNeighbors = function(prev, next)
{
	this.a_tangent = vsub(prev, this.a);
	this.b_tangent = vsub(next, this.b);
};

SegmentShape.prototype.setEndpoints = function(a, b)
{
	this.a = a;
	this.b = b;
	this.n = vperp(vnormalize(vsub(b, a)));
};

/*
cpSegmentShapeSetRadius(cpShape *shape, cpFloat radius)
{
	this.r = radius;
}*/

/*
CP_DeclareShapeGetter(cpSegmentShape, cpVect, A);
CP_DeclareShapeGetter(cpSegmentShape, cpVect, B);
CP_DeclareShapeGetter(cpSegmentShape, cpVect, Normal);
CP_DeclareShapeGetter(cpSegmentShape, cpFloat, Radius);
*/

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
 
/// Check that a set of vertexes is convex and has a clockwise winding.
var polyValidate = function(verts)
{
	var len = verts.length;
	for(var i=0; i<len; i+=2){
		var ax = verts[i];
	 	var ay = verts[i+1];
		var bx = verts[(i+2)%len];
		var by = verts[(i+3)%len];
		var cx = verts[(i+4)%len];
		var cy = verts[(i+5)%len];
		
		//if(vcross(vsub(b, a), vsub(c, b)) > 0){
		if(vcross2(bx - ax, by - ay, cx - bx, cy - by) > 0){
			return false;
		}
	}
	
	return true;
};

/// Initialize a polygon shape.
/// The vertexes must be convex and have a clockwise winding.
var PolyShape = cp.PolyShape = function(body, verts, offset)
{
	this.setVerts(verts, offset);
	this.type = 'poly';
	Shape.call(this, body);
};

PolyShape.prototype = Object.create(Shape.prototype);

var SplittingPlane = function(n, d)
{
	this.n = n;
	this.d = d;
};

SplittingPlane.prototype.compare = function(v)
{
	return vdot(this.n, v) - this.d;
};

PolyShape.prototype.setVerts = function(verts, offset)
{
	assert(verts.length >= 4, "Polygons require some verts");
	assert(typeof(verts[0]) === 'number',
			'Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])');

	// Fail if the user attempts to pass a concave poly, or a bad winding.
	assert(polyValidate(verts), "Polygon is concave or has a reversed winding. Consider using cpConvexHull()");
	
	var len = verts.length;
	var numVerts = len >> 1;

	// This a pretty bad way to do this in javascript. As a first pass, I want to keep
	// the code similar to the C.
	this.verts = new Array(len);
	this.tVerts = new Array(len);
	this.planes = new Array(numVerts);
	this.tPlanes = new Array(numVerts);
	
	for(var i=0; i<len; i+=2){
		//var a = vadd(offset, verts[i]);
		//var b = vadd(offset, verts[(i+1)%numVerts]);
		var ax = verts[i] + offset.x;
	 	var ay = verts[i+1] + offset.y;
		var bx = verts[(i+2)%len] + offset.x;
		var by = verts[(i+3)%len] + offset.y;

		// Inefficient, but only called during object initialization.
		var n = vnormalize(vperp(new Vect(bx-ax, by-ay)));

		this.verts[i  ] = ax;
		this.verts[i+1] = ay;
		this.planes[i>>1] = new SplittingPlane(n, vdot2(n.x, n.y, ax, ay));
		this.tPlanes[i>>1] = new SplittingPlane(new Vect(0,0), 0);
	}
};

/// Initialize a box shaped polygon shape.
var BoxShape = cp.BoxShape = function(body, width, height)
{
	var hw = width/2;
	var hh = height/2;
	
	return BoxShape2(body, new BB(-hw, -hh, hw, hh));
};

/// Initialize an offset box shaped polygon shape.
var BoxShape2 = cp.BoxShape2 = function(body, box)
{
	var verts = [
		box.l, box.b,
		box.l, box.t,
		box.r, box.t,
		box.r, box.b,
	];
	
	return new PolyShape(body, verts, vzero);
};

PolyShape.prototype.transformVerts = function(p, rot)
{
	var src = this.verts;
	var dst = this.tVerts;
	
	var l = Infinity, r = -Infinity;
	var b = Infinity, t = -Infinity;
	
	for(var i=0; i<src.length; i+=2){
		//var v = vadd(p, vrotate(src[i], rot));
		var x = src[i];
	 	var y = src[i+1];

		var vx = p.x + x*rot.x - y*rot.y;
		var vy = p.y + x*rot.y + y*rot.x;

		//console.log('(' + x + ',' + y + ') -> (' + vx + ',' + vy + ')');
		
		dst[i] = vx;
		dst[i+1] = vy;

		l = min(l, vx);
		r = max(r, vx);
		b = min(b, vy);
		t = max(t, vy);
	}

	this.bb_l = l;
	this.bb_b = b;
	this.bb_r = r;
	this.bb_t = t;
};

PolyShape.prototype.transformAxes = function(p, rot)
{
	var src = this.planes;
	var dst = this.tPlanes;
	
	for(var i=0; i<src.length; i++){
		var n = vrotate(src[i].n, rot);
		dst[i].n = n;
		dst[i].d = vdot(p, n) + src[i].d;
	}
};

PolyShape.prototype.cacheData = function(p, rot)
{
	this.transformAxes(p, rot);
	this.transformVerts(p, rot);
};

PolyShape.prototype.nearestPointQuery = function(p)
{
	var planes = this.tPlanes;
	var verts = this.tVerts;
	
	var v0x = verts[verts.length - 2];
	var v0y = verts[verts.length - 1];
	var minDist = Infinity;
	var closestPoint = vzero;
	var outside = false;
	
	for(var i=0; i<planes.length; i++){
		if(planes[i].compare(p) > 0) outside = true;
		
		var v1x = verts[i*2];
		var v1y = verts[i*2 + 1];
		var closest = closestPointOnSegment2(p.x, p.y, v0x, v0y, v1x, v1y);
		
		var dist = vdist(p, closest);
		if(dist < minDist){
			minDist = dist;
			closestPoint = closest;
		}
		
		v0x = v1x;
		v0y = v1y;
	}
	
	return new NearestPointQueryInfo(this, closestPoint, (outside ? minDist : -minDist));
};

PolyShape.prototype.segmentQuery = function(a, b)
{
	var axes = this.tPlanes;
	var verts = this.tVerts;
	var numVerts = axes.length;
	var len = numVerts * 2;
	
	for(var i=0; i<numVerts; i++){
		var n = axes[i].n;
		var an = vdot(a, n);
		if(axes[i].d > an) continue;
		
		var bn = vdot(b, n);
		var t = (axes[i].d - an)/(bn - an);
		if(t < 0 || 1 < t) continue;
		
		var point = vlerp(a, b, t);
		var dt = -vcross(n, point);
		var dtMin = -vcross2(n.x, n.y, verts[i*2], verts[i*2+1]);
		var dtMax = -vcross2(n.x, n.y, verts[(i*2+2)%len], verts[(i*2+3)%len]);

		if(dtMin <= dt && dt <= dtMax){
			// josephg: In the original C code, this function keeps
			// looping through axes after finding a match. I *think*
			// this code is equivalent...
			return new SegmentQueryInfo(this, t, n);
		}
	}
};

PolyShape.prototype.valueOnAxis = function(n, d)
{
	var verts = this.tVerts;
	var m = vdot2(n.x, n.y, verts[0], verts[1]);
	
	for(var i=2; i<verts.length; i+=2){
		m = min(m, vdot2(n.x, n.y, verts[i], verts[i+1]));
	}
	
	return m - d;
};

PolyShape.prototype.containsVert = function(vx, vy)
{
	var planes = this.tPlanes;
	
	for(var i=0; i<planes.length; i++){
		var n = planes[i].n;
		var dist = vdot2(n.x, n.y, vx, vy) - planes[i].d;
		if(dist > 0) return false;
	}
	
	return true;
};

PolyShape.prototype.containsVertPartial = function(vx, vy, n)
{
	var planes = this.tPlanes;
	
	for(var i=0; i<planes.length; i++){
		var n2 = planes[i].n;
		if(vdot(n2, n) < 0) continue;
		var dist = vdot2(n2.x, n2.y, vx, vy) - planes[i].d;
		if(dist > 0) return false;
	}
	
	return true;
};

// These methods are provided for API compatibility with Chipmunk. I recommend against using
// them - just access the poly.verts list directly.
PolyShape.prototype.getNumVerts = function() { return this.verts.length / 2; };
PolyShape.prototype.getVert = function(i)
{
	return new Vect(this.verts[i * 2], this.verts[i * 2 + 1]);
};

/* Copyright (c) 2007 Scott Lembcke
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/// @defgroup cpBody cpBody
/// Chipmunk's rigid body type. Rigid bodies hold the physical properties of an object like
/// it's mass, and position and velocity of it's center of gravity. They don't have an shape on their own.
/// They are given a shape by creating collision shapes (cpShape) that point to the body.
/// @{

var Body = cp.Body = function(m, i) {
	/// Mass of the body.
	/// Must agree with cpBody.m_inv! Use body.setMass() when changing the mass for this reason.
	//this.m;
	/// Mass inverse.
	//this.m_inv;

	/// Moment of inertia of the body.
	/// Must agree with cpBody.i_inv! Use body.setMoment() when changing the moment for this reason.
	//this.i;
	/// Moment of inertia inverse.
	//this.i_inv;

	/// Position of the rigid body's center of gravity.
	this.p = new Vect(0,0);
	/// Velocity of the rigid body's center of gravity.
	this.vx = this.vy = 0;
	/// Force acting on the rigid body's center of gravity.
	this.f = new Vect(0,0);

	/// Rotation of the body around it's center of gravity in radians.
	/// Must agree with cpBody.rot! Use cpBodySetAngle() when changing the angle for this reason.
	//this.a;
	/// Angular velocity of the body around it's center of gravity in radians/second.
	this.w = 0;
	/// Torque applied to the body around it's center of gravity.
	this.t = 0;

	/// Cached unit length vector representing the angle of the body.
	/// Used for fast rotations using cpvrotate().
	//cpVect rot;

	/// Maximum velocity allowed when updating the velocity.
	this.v_limit = Infinity;
	/// Maximum rotational rate (in radians/second) allowed when updating the angular velocity.
	this.w_limit = Infinity;

	// This stuff is all private.
	this.v_biasx = this.v_biasy = 0;
	this.w_bias = 0;

	this.space = null;

	this.shapeList = [];
	this.arbiterList = null; // These are both wacky linked lists.
	this.constraintList = null;

	// This stuff is used to track information on the collision graph.
	this.nodeRoot = null;
	this.nodeNext = null;
	this.nodeIdleTime = 0;

	// Set this.m and this.m_inv
	this.setMass(m);

	// Set this.i and this.i_inv
	this.setMoment(i);

	// Set this.a and this.rot
	this.rot = new Vect(0,0);
	this.setAngle(0);
};

// I wonder if this should use the constructor style like Body...
var createStaticBody = function()
{
	var body = new Body(Infinity, Infinity);
	body.nodeIdleTime = Infinity;

	return body;
};

if (typeof DEBUG !== 'undefined' && DEBUG) {
	var v_assert_nan = function(v, message){assert(v.x == v.x && v.y == v.y, message); };
	var v_assert_infinite = function(v, message){assert(Math.abs(v.x) !== Infinity && Math.abs(v.y) !== Infinity, message);};
	var v_assert_sane = function(v, message){v_assert_nan(v, message); v_assert_infinite(v, message);};

	Body.prototype.sanityCheck = function()
	{
		assert(this.m === this.m && this.m_inv === this.m_inv, "Body's mass is invalid.");
		assert(this.i === this.i && this.i_inv === this.i_inv, "Body's moment is invalid.");

		v_assert_sane(this.p, "Body's position is invalid.");
		v_assert_sane(this.f, "Body's force is invalid.");
		assert(this.vx === this.vx && Math.abs(this.vx) !== Infinity, "Body's velocity is invalid.");
		assert(this.vy === this.vy && Math.abs(this.vy) !== Infinity, "Body's velocity is invalid.");

		assert(this.a === this.a && Math.abs(this.a) !== Infinity, "Body's angle is invalid.");
		assert(this.w === this.w && Math.abs(this.w) !== Infinity, "Body's angular velocity is invalid.");
		assert(this.t === this.t && Math.abs(this.t) !== Infinity, "Body's torque is invalid.");

		v_assert_sane(this.rot, "Body's rotation vector is invalid.");

		assert(this.v_limit === this.v_limit, "Body's velocity limit is invalid.");
		assert(this.w_limit === this.w_limit, "Body's angular velocity limit is invalid.");
	};
} else {
	Body.prototype.sanityCheck = function(){};
}

Body.prototype.getPos = function() { return this.p; };
Body.prototype.getVel = function() { return new Vect(this.vx, this.vy); };
Body.prototype.getAngVel = function() { return this.w; };

/// Returns true if the body is sleeping.
Body.prototype.isSleeping = function()
{
	return this.nodeRoot !== null;
};

/// Returns true if the body is static.
Body.prototype.isStatic = function()
{
	return this.nodeIdleTime === Infinity;
};

/// Returns true if the body has not been added to a space.
Body.prototype.isRogue = function()
{
	return this.space === null;
};

// It would be nicer to use defineProperty for this, but its about 30x slower:
// http://jsperf.com/defineproperty-vs-setter
Body.prototype.setMass = function(mass)
{
	assert(mass > 0, "Mass must be positive and non-zero.");

	//activate is defined in cpSpaceComponent
	this.activate();
	this.m = mass;
	this.m_inv = 1/mass;
};

Body.prototype.setMoment = function(moment)
{
	assert(moment > 0, "Moment of Inertia must be positive and non-zero.");

	this.activate();
	this.i = moment;
	this.i_inv = 1/moment;
};

Body.prototype.addShape = function(shape)
{
	this.shapeList.push(shape);
};

Body.prototype.removeShape = function(shape)
{
	// This implementation has a linear time complexity with the number of shapes.
	// The original implementation used linked lists instead, which might be faster if
	// you're constantly editing the shape of a body. I expect most bodies will never
	// have their shape edited, so I'm just going to use the simplest possible implemention.
	deleteObjFromList(this.shapeList, shape);
};

var filterConstraints = function(node, body, filter)
{
	if(node === filter){
		return node.next(body);
	} else if(node.a === body){
		node.next_a = filterConstraints(node.next_a, body, filter);
	} else {
		node.next_b = filterConstraints(node.next_b, body, filter);
	}

	return node;
};

Body.prototype.removeConstraint = function(constraint)
{
	// The constraint must be in the constraints list when this is called.
	this.constraintList = filterConstraints(this.constraintList, this, constraint);
};

Body.prototype.setPos = function(pos)
{
	this.activate();
	this.sanityCheck();
	// If I allow the position to be set to vzero, vzero will get changed.
	if (pos === vzero) {
		pos = cp.v(0,0);
	}
	this.p = pos;
};

Body.prototype.setVel = function(velocity)
{
	this.activate();
	this.vx = velocity.x;
	this.vy = velocity.y;
};

Body.prototype.setAngVel = function(w)
{
	this.activate();
	this.w = w;
};

Body.prototype.setAngleInternal = function(angle)
{
	assert(!isNaN(angle), "Internal Error: Attempting to set body's angle to NaN");
	this.a = angle;//fmod(a, (cpFloat)M_PI*2.0f);

	//this.rot = vforangle(angle);
	this.rot.x = Math.cos(angle);
	this.rot.y = Math.sin(angle);
};

Body.prototype.setAngle = function(angle)
{
	this.activate();
	this.sanityCheck();
	this.setAngleInternal(angle);
};

Body.prototype.velocity_func = function(gravity, damping, dt)
{
	//this.v = vclamp(vadd(vmult(this.v, damping), vmult(vadd(gravity, vmult(this.f, this.m_inv)), dt)), this.v_limit);
	var vx = this.vx * damping + (gravity.x + this.f.x * this.m_inv) * dt;
	var vy = this.vy * damping + (gravity.y + this.f.y * this.m_inv) * dt;

	//var v = vclamp(new Vect(vx, vy), this.v_limit);
	//this.vx = v.x; this.vy = v.y;
	var v_limit = this.v_limit;
	var lensq = vx * vx + vy * vy;
	var scale = (lensq > v_limit*v_limit) ? v_limit / Math.sqrt(lensq) : 1;
	this.vx = vx * scale;
	this.vy = vy * scale;

	var w_limit = this.w_limit;
	this.w = clamp(this.w*damping + this.t*this.i_inv*dt, -w_limit, w_limit);

	this.sanityCheck();
};

Body.prototype.position_func = function(dt)
{
	//this.p = vadd(this.p, vmult(vadd(this.v, this.v_bias), dt));

	//this.p = this.p + (this.v + this.v_bias) * dt;
	this.p.x += (this.vx + this.v_biasx) * dt;
	this.p.y += (this.vy + this.v_biasy) * dt;

	this.setAngleInternal(this.a + (this.w + this.w_bias)*dt);

	this.v_biasx = this.v_biasy = 0;
	this.w_bias = 0;

	this.sanityCheck();
};

Body.prototype.resetForces = function()
{
	this.activate();
	this.f = new Vect(0,0);
	this.t = 0;
};

Body.prototype.applyForce = function(force, r)
{
	this.activate();
	this.f = vadd(this.f, force);
	this.t += vcross(r, force);
};

Body.prototype.applyImpulse = function(j, r)
{
	this.activate();
	apply_impulse(this, j.x, j.y, r);
};

Body.prototype.getVelAtPoint = function(r)
{
	return vadd(new Vect(this.vx, this.vy), vmult(vperp(r), this.w));
};

/// Get the velocity on a body (in world units) at a point on the body in world coordinates.
Body.prototype.getVelAtWorldPoint = function(point)
{
	return this.getVelAtPoint(vsub(point, this.p));
};

/// Get the velocity on a body (in world units) at a point on the body in local coordinates.
Body.prototype.getVelAtLocalPoint = function(point)
{
	return this.getVelAtPoint(vrotate(point, this.rot));
};

Body.prototype.eachShape = function(func)
{
	for(var i = 0, len = this.shapeList.length; i < len; i++) {
		func(this.shapeList[i]);
	}
};

Body.prototype.eachConstraint = function(func)
{
	var constraint = this.constraintList;
	while(constraint) {
		var next = constraint.next(this);
		func(constraint);
		constraint = next;
	}
};

Body.prototype.eachArbiter = function(func)
{
	var arb = this.arbiterList;
	while(arb){
		var next = arb.next(this);

		arb.swappedColl = (this === arb.body_b);
		func(arb);

		arb = next;
	}
};

/// Convert body relative/local coordinates to absolute/world coordinates.
Body.prototype.local2World = function(v)
{
	return vadd(this.p, vrotate(v, this.rot));
};

/// Convert body absolute/world coordinates to	relative/local coordinates.
Body.prototype.world2Local = function(v)
{
	return vunrotate(vsub(v, this.p), this.rot);
};

/// Get the kinetic energy of a body.
Body.prototype.kineticEnergy = function()
{
	// Need to do some fudging to avoid NaNs
	var vsq = this.vx*this.vx + this.vy*this.vy;
	var wsq = this.w * this.w;
	return (vsq ? vsq*this.m : 0) + (wsq ? wsq*this.i : 0);
};

/* Copyright (c) 2010 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
	@defgroup cpSpatialIndex cpSpatialIndex
	
	Spatial indexes are data structures that are used to accelerate collision detection
	and spatial queries. Chipmunk provides a number of spatial index algorithms to pick from
	and they are programmed in a generic way so that you can use them for holding more than
	just Shapes.
	
	It works by using pointers to the objects you add and using a callback to ask your code
	for bounding boxes when it needs them. Several types of queries can be performed an index as well
	as reindexing and full collision information. All communication to the spatial indexes is performed
	through callback functions.
	
	Spatial indexes should be treated as opaque structs.
	This means you shouldn't be reading any of the fields directly.

	All spatial indexes define the following methods:
		
	// The number of objects in the spatial index.
	count = 0;

	// Iterate the objects in the spatial index. @c func will be called once for each object.
	each(func);
	
	// Returns true if the spatial index contains the given object.
	// Most spatial indexes use hashed storage, so you must provide a hash value too.
	contains(obj, hashid);

	// Add an object to a spatial index.
	insert(obj, hashid);

	// Remove an object from a spatial index.
	remove(obj, hashid);
	
	// Perform a full reindex of a spatial index.
	reindex();

	// Reindex a single object in the spatial index.
	reindexObject(obj, hashid);

	// Perform a point query against the spatial index, calling @c func for each potential match.
	// A pointer to the point will be passed as @c obj1 of @c func.
	// func(shape);
	pointQuery(point, func);

	// Perform a segment query against the spatial index, calling @c func for each potential match.
	// func(shape);
	segmentQuery(vect a, vect b, t_exit, func);

	// Perform a rectangle query against the spatial index, calling @c func for each potential match.
	// func(shape);
	query(bb, func);

	// Simultaneously reindex and find all colliding objects.
	// @c func will be called once for each potentially overlapping pair of objects found.
	// If the spatial index was initialized with a static index, it will collide it's objects against that as well.
	reindexQuery(func);
*/

var SpatialIndex = cp.SpatialIndex = function(staticIndex)
{
	this.staticIndex = staticIndex;
	

	if(staticIndex){
		if(staticIndex.dynamicIndex){
			throw new Error("This static index is already associated with a dynamic index.");
		}
		staticIndex.dynamicIndex = this;
	}
};

// Collide the objects in an index against the objects in a staticIndex using the query callback function.
SpatialIndex.prototype.collideStatic = function(staticIndex, func)
{
	if(staticIndex.count > 0){
		var query = staticIndex.query;

		this.each(function(obj) {
			query(obj, new BB(obj.bb_l, obj.bb_b, obj.bb_r, obj.bb_t), func);
		});
	}
};


/* Copyright (c) 2009 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This file implements a modified AABB tree for collision detection.

var BBTree = cp.BBTree = function(staticIndex)
{
	SpatialIndex.call(this, staticIndex);
	
	this.velocityFunc = null;

	// This is a hash from object ID -> object for the objects stored in the BBTree.
	this.leaves = {};
	// A count of the number of leaves in the BBTree.
	this.count = 0;

	this.root = null;
	
	// A linked list containing an object pool of tree nodes and pairs.
	this.pooledNodes = null;
	this.pooledPairs = null;
	
	this.stamp = 0;
};

BBTree.prototype = Object.create(SpatialIndex.prototype);

var numNodes = 0;

var Node = function(tree, a, b)
{
	this.obj = null;
	this.bb_l = min(a.bb_l, b.bb_l);
	this.bb_b = min(a.bb_b, b.bb_b);
	this.bb_r = max(a.bb_r, b.bb_r);
	this.bb_t = max(a.bb_t, b.bb_t);
	this.parent = null;
	
	this.setA(a);
	this.setB(b);
};

BBTree.prototype.makeNode = function(a, b)
{
	var node = this.pooledNodes;
	if(node){
		this.pooledNodes = node.parent;
		node.constructor(this, a, b);
		return node;
	} else {
		numNodes++;
		return new Node(this, a, b);
	}
};

var numLeaves = 0;
var Leaf = function(tree, obj)
{
	this.obj = obj;
	tree.getBB(obj, this);

	this.parent = null;

	this.stamp = 1;
	this.pairs = null;
	numLeaves++;
};

// **** Misc Functions

BBTree.prototype.getBB = function(obj, dest)
{
	var velocityFunc = this.velocityFunc;
	if(velocityFunc){
		var coef = 0.1;
		var x = (obj.bb_r - obj.bb_l)*coef;
		var y = (obj.bb_t - obj.bb_b)*coef;
		
		var v = vmult(velocityFunc(obj), 0.1);

		dest.bb_l = obj.bb_l + min(-x, v.x);
		dest.bb_b = obj.bb_b + min(-y, v.y);
		dest.bb_r = obj.bb_r + max( x, v.x);
		dest.bb_t = obj.bb_t + max( y, v.y);
	} else {
		dest.bb_l = obj.bb_l;
		dest.bb_b = obj.bb_b;
		dest.bb_r = obj.bb_r;
		dest.bb_t = obj.bb_t;
	}
};

BBTree.prototype.getStamp = function()
{
	var dynamic = this.dynamicIndex;
	return (dynamic && dynamic.stamp ? dynamic.stamp : this.stamp);
};

BBTree.prototype.incrementStamp = function()
{
	if(this.dynamicIndex && this.dynamicIndex.stamp){
		this.dynamicIndex.stamp++;
	} else {
		this.stamp++;
	}
}

// **** Pair/Thread Functions

var numPairs = 0;
// Objects created with constructors are faster than object literals. :(
var Pair = function(leafA, nextA, leafB, nextB)
{
	this.prevA = null;
	this.leafA = leafA;
	this.nextA = nextA;

	this.prevB = null;
	this.leafB = leafB;
	this.nextB = nextB;
};

BBTree.prototype.makePair = function(leafA, nextA, leafB, nextB)
{
	//return new Pair(leafA, nextA, leafB, nextB);
	var pair = this.pooledPairs;
	if (pair)
	{
		this.pooledPairs = pair.prevA;

		pair.prevA = null;
		pair.leafA = leafA;
		pair.nextA = nextA;

		pair.prevB = null;
		pair.leafB = leafB;
		pair.nextB = nextB;

		//pair.constructor(leafA, nextA, leafB, nextB);
		return pair;
	} else {
		numPairs++;
		return new Pair(leafA, nextA, leafB, nextB);
	}
};

Pair.prototype.recycle = function(tree)
{
	this.prevA = tree.pooledPairs;
	tree.pooledPairs = this;
};

var unlinkThread = function(prev, leaf, next)
{
	if(next){
		if(next.leafA === leaf) next.prevA = prev; else next.prevB = prev;
	}
	
	if(prev){
		if(prev.leafA === leaf) prev.nextA = next; else prev.nextB = next;
	} else {
		leaf.pairs = next;
	}
};

Leaf.prototype.clearPairs = function(tree)
{
	var pair = this.pairs,
		next;

	this.pairs = null;
	
	while(pair){
		if(pair.leafA === this){
			next = pair.nextA;
			unlinkThread(pair.prevB, pair.leafB, pair.nextB);
		} else {
			next = pair.nextB;
			unlinkThread(pair.prevA, pair.leafA, pair.nextA);
		}
		pair.recycle(tree);
		pair = next;
	}
};

var pairInsert = function(a, b, tree)
{
	var nextA = a.pairs, nextB = b.pairs;
	var pair = tree.makePair(a, nextA, b, nextB);
	a.pairs = b.pairs = pair;

	if(nextA){
		if(nextA.leafA === a) nextA.prevA = pair; else nextA.prevB = pair;
	}
	
	if(nextB){
		if(nextB.leafA === b) nextB.prevA = pair; else nextB.prevB = pair;
	}
};

// **** Node Functions

Node.prototype.recycle = function(tree)
{
	this.parent = tree.pooledNodes;
	tree.pooledNodes = this;
};

Leaf.prototype.recycle = function(tree)
{
	// Its not worth the overhead to recycle leaves.
};

Node.prototype.setA = function(value)
{
	this.A = value;
	value.parent = this;
};

Node.prototype.setB = function(value)
{
	this.B = value;
	value.parent = this;
};

Leaf.prototype.isLeaf = true;
Node.prototype.isLeaf = false;

Node.prototype.otherChild = function(child)
{
	return (this.A == child ? this.B : this.A);
};

Node.prototype.replaceChild = function(child, value, tree)
{
	assertSoft(child == this.A || child == this.B, "Node is not a child of parent.");
	
	if(this.A == child){
		this.A.recycle(tree);
		this.setA(value);
	} else {
		this.B.recycle(tree);
		this.setB(value);
	}
	
	for(var node=this; node; node = node.parent){
		//node.bb = bbMerge(node.A.bb, node.B.bb);
		var a = node.A;
		var b = node.B;
		node.bb_l = min(a.bb_l, b.bb_l);
		node.bb_b = min(a.bb_b, b.bb_b);
		node.bb_r = max(a.bb_r, b.bb_r);
		node.bb_t = max(a.bb_t, b.bb_t);
	}
};

Node.prototype.bbArea = Leaf.prototype.bbArea = function()
{
	return (this.bb_r - this.bb_l)*(this.bb_t - this.bb_b);
};

var bbTreeMergedArea = function(a, b)
{
	return (max(a.bb_r, b.bb_r) - min(a.bb_l, b.bb_l))*(max(a.bb_t, b.bb_t) - min(a.bb_b, b.bb_b));
};

// **** Subtree Functions

// Would it be better to make these functions instance methods on Node and Leaf?

var bbProximity = function(a, b)
{
	return Math.abs(a.bb_l + a.bb_r - b.bb_l - b.bb_r) + Math.abs(a.bb_b + a.bb_t - b.bb_b - b.bb_t);
};

var subtreeInsert = function(subtree, leaf, tree)
{
//	var s = new Error().stack;
//	traces[s] = traces[s] ? traces[s]+1 : 1;

	if(subtree == null){
		return leaf;
	} else if(subtree.isLeaf){
		return tree.makeNode(leaf, subtree);
	} else {
		var cost_a = subtree.B.bbArea() + bbTreeMergedArea(subtree.A, leaf);
		var cost_b = subtree.A.bbArea() + bbTreeMergedArea(subtree.B, leaf);
		
		if(cost_a === cost_b){
			cost_a = bbProximity(subtree.A, leaf);
			cost_b = bbProximity(subtree.B, leaf);
		}	

		if(cost_b < cost_a){
			subtree.setB(subtreeInsert(subtree.B, leaf, tree));
		} else {
			subtree.setA(subtreeInsert(subtree.A, leaf, tree));
		}
		
//		subtree.bb = bbMerge(subtree.bb, leaf.bb);
		subtree.bb_l = min(subtree.bb_l, leaf.bb_l);
		subtree.bb_b = min(subtree.bb_b, leaf.bb_b);
		subtree.bb_r = max(subtree.bb_r, leaf.bb_r);
		subtree.bb_t = max(subtree.bb_t, leaf.bb_t);

		return subtree;
	}
};

Node.prototype.intersectsBB = Leaf.prototype.intersectsBB = function(bb)
{
	return (this.bb_l <= bb.r && bb.l <= this.bb_r && this.bb_b <= bb.t && bb.b <= this.bb_t);
};

var subtreeQuery = function(subtree, bb, func)
{
	//if(bbIntersectsBB(subtree.bb, bb)){
	if(subtree.intersectsBB(bb)){
		if(subtree.isLeaf){
			func(subtree.obj);
		} else {
			subtreeQuery(subtree.A, bb, func);
			subtreeQuery(subtree.B, bb, func);
		}
	}
};

/// Returns the fraction along the segment query the node hits. Returns Infinity if it doesn't hit.
var nodeSegmentQuery = function(node, a, b)
{
	var idx = 1/(b.x - a.x);
	var tx1 = (node.bb_l == a.x ? -Infinity : (node.bb_l - a.x)*idx);
	var tx2 = (node.bb_r == a.x ?  Infinity : (node.bb_r - a.x)*idx);
	var txmin = min(tx1, tx2);
	var txmax = max(tx1, tx2);
	
	var idy = 1/(b.y - a.y);
	var ty1 = (node.bb_b == a.y ? -Infinity : (node.bb_b - a.y)*idy);
	var ty2 = (node.bb_t == a.y ?  Infinity : (node.bb_t - a.y)*idy);
	var tymin = min(ty1, ty2);
	var tymax = max(ty1, ty2);
	
	if(tymin <= txmax && txmin <= tymax){
		var min_ = max(txmin, tymin);
		var max_ = min(txmax, tymax);
		
		if(0.0 <= max_ && min_ <= 1.0) return max(min_, 0.0);
	}
	
	return Infinity;
};

var subtreeSegmentQuery = function(subtree, a, b, t_exit, func)
{
	if(subtree.isLeaf){
		return func(subtree.obj);
	} else {
		var t_a = nodeSegmentQuery(subtree.A, a, b);
		var t_b = nodeSegmentQuery(subtree.B, a, b);
		
		if(t_a < t_b){
			if(t_a < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.A, a, b, t_exit, func));
			if(t_b < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.B, a, b, t_exit, func));
		} else {
			if(t_b < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.B, a, b, t_exit, func));
			if(t_a < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.A, a, b, t_exit, func));
		}
		
		return t_exit;
	}
};

BBTree.prototype.subtreeRecycle = function(node)
{
	if(node.isLeaf){
		this.subtreeRecycle(node.A);
		this.subtreeRecycle(node.B);
		node.recycle(this);
	}
};

var subtreeRemove = function(subtree, leaf, tree)
{
	if(leaf == subtree){
		return null;
	} else {
		var parent = leaf.parent;
		if(parent == subtree){
			var other = subtree.otherChild(leaf);
			other.parent = subtree.parent;
			subtree.recycle(tree);
			return other;
		} else {
			parent.parent.replaceChild(parent, parent.otherChild(leaf), tree);
			return subtree;
		}
	}
};

// **** Marking Functions

/*
typedef struct MarkContext {
	bbTree *tree;
	Node *staticRoot;
	cpSpatialIndexQueryFunc func;
} MarkContext;
*/

var bbTreeIntersectsNode = function(a, b)
{
	return (a.bb_l <= b.bb_r && b.bb_l <= a.bb_r && a.bb_b <= b.bb_t && b.bb_b <= a.bb_t);
};

Leaf.prototype.markLeafQuery = function(leaf, left, tree, func)
{
	if(bbTreeIntersectsNode(leaf, this)){
    if(left){
      pairInsert(leaf, this, tree);
    } else {
      if(this.stamp < leaf.stamp) pairInsert(this, leaf, tree);
      if(func) func(leaf.obj, this.obj);
    }
  }
};

Node.prototype.markLeafQuery = function(leaf, left, tree, func)
{
	if(bbTreeIntersectsNode(leaf, this)){
    this.A.markLeafQuery(leaf, left, tree, func);
    this.B.markLeafQuery(leaf, left, tree, func);
	}
};

Leaf.prototype.markSubtree = function(tree, staticRoot, func)
{
	if(this.stamp == tree.getStamp()){
		if(staticRoot) staticRoot.markLeafQuery(this, false, tree, func);
		
		for(var node = this; node.parent; node = node.parent){
			if(node == node.parent.A){
				node.parent.B.markLeafQuery(this, true, tree, func);
			} else {
				node.parent.A.markLeafQuery(this, false, tree, func);
			}
		}
	} else {
		var pair = this.pairs;
		while(pair){
			if(this === pair.leafB){
				if(func) func(pair.leafA.obj, this.obj);
				pair = pair.nextB;
			} else {
				pair = pair.nextA;
			}
		}
	}
};

Node.prototype.markSubtree = function(tree, staticRoot, func)
{
  this.A.markSubtree(tree, staticRoot, func);
  this.B.markSubtree(tree, staticRoot, func);
};

// **** Leaf Functions

Leaf.prototype.containsObj = function(obj)
{
	return (this.bb_l <= obj.bb_l && this.bb_r >= obj.bb_r && this.bb_b <= obj.bb_b && this.bb_t >= obj.bb_t);
};

Leaf.prototype.update = function(tree)
{
	var root = tree.root;
	var obj = this.obj;

	//if(!bbContainsBB(this.bb, bb)){
	if(!this.containsObj(obj)){
		tree.getBB(this.obj, this);
		
		root = subtreeRemove(root, this, tree);
		tree.root = subtreeInsert(root, this, tree);
		
		this.clearPairs(tree);
		this.stamp = tree.getStamp();
		
		return true;
	}
	
	return false;
};

Leaf.prototype.addPairs = function(tree)
{
	var dynamicIndex = tree.dynamicIndex;
	if(dynamicIndex){
		var dynamicRoot = dynamicIndex.root;
		if(dynamicRoot){
			dynamicRoot.markLeafQuery(this, true, dynamicIndex, null);
		}
	} else {
		var staticRoot = tree.staticIndex.root;
		this.markSubtree(tree, staticRoot, null);
	}
};

// **** Insert/Remove

BBTree.prototype.insert = function(obj, hashid)
{
	var leaf = new Leaf(this, obj);

	this.leaves[hashid] = leaf;
	this.root = subtreeInsert(this.root, leaf, this);
	this.count++;
	
	leaf.stamp = this.getStamp();
	leaf.addPairs(this);
	this.incrementStamp();
};

BBTree.prototype.remove = function(obj, hashid)
{
	var leaf = this.leaves[hashid];

	delete this.leaves[hashid];
	this.root = subtreeRemove(this.root, leaf, this);
	this.count--;

	leaf.clearPairs(this);
	leaf.recycle(this);
};

BBTree.prototype.contains = function(obj, hashid)
{
	return this.leaves[hashid] != null;
};

// **** Reindex
var voidQueryFunc = function(obj1, obj2){};

BBTree.prototype.reindexQuery = function(func)
{
	if(!this.root) return;
	
	// LeafUpdate() may modify this.root. Don't cache it.
	var hashid,
		leaves = this.leaves;
	for (hashid in leaves)
	{
		leaves[hashid].update(this);
	}
	
	var staticIndex = this.staticIndex;
	var staticRoot = staticIndex && staticIndex.root;
	
	this.root.markSubtree(this, staticRoot, func);
	if(staticIndex && !staticRoot) this.collideStatic(this, staticIndex, func);
	
	this.incrementStamp();
};

BBTree.prototype.reindex = function()
{
	this.reindexQuery(voidQueryFunc);
};

BBTree.prototype.reindexObject = function(obj, hashid)
{
	var leaf = this.leaves[hashid];
	if(leaf){
		if(leaf.update(this)) leaf.addPairs(this);
		this.incrementStamp();
	}
};

// **** Query

// This has since been removed from upstream Chipmunk - which recommends you just use query() below
// directly.
BBTree.prototype.pointQuery = function(point, func)
{
	this.query(new BB(point.x, point.y, point.x, point.y), func);
};

BBTree.prototype.segmentQuery = function(a, b, t_exit, func)
{
	if(this.root) subtreeSegmentQuery(this.root, a, b, t_exit, func);
};

BBTree.prototype.query = function(bb, func)
{
	if(this.root) subtreeQuery(this.root, bb, func);
};

// **** Misc

BBTree.prototype.count = function()
{
	return this.count;
};

BBTree.prototype.each = function(func)
{
	var hashid;
	for(hashid in this.leaves)
	{
		func(this.leaves[hashid].obj);
	}
};

// **** Tree Optimization

var bbTreeMergedArea2 = function(node, l, b, r, t)
{
	return (max(node.bb_r, r) - min(node.bb_l, l))*(max(node.bb_t, t) - min(node.bb_b, b));
};

var partitionNodes = function(tree, nodes, offset, count)
{
	if(count == 1){
		return nodes[offset];
	} else if(count == 2) {
		return tree.makeNode(nodes[offset], nodes[offset + 1]);
	}
	
	// Find the AABB for these nodes
	//var bb = nodes[offset].bb;
	var node = nodes[offset];
	var bb_l = node.bb_l,
		bb_b = node.bb_b,
		bb_r = node.bb_r,
		bb_t = node.bb_t;

	var end = offset + count;
	for(var i=offset + 1; i<end; i++){
		//bb = bbMerge(bb, nodes[i].bb);
		node = nodes[i];
		bb_l = min(bb_l, node.bb_l);
		bb_b = min(bb_b, node.bb_b);
		bb_r = max(bb_r, node.bb_r);
		bb_t = max(bb_t, node.bb_t);
	}
	
	// Split it on it's longest axis
	var splitWidth = (bb_r - bb_l > bb_t - bb_b);
	
	// Sort the bounds and use the median as the splitting point
	var bounds = new Array(count*2);
	if(splitWidth){
		for(var i=offset; i<end; i++){
			bounds[2*i + 0] = nodes[i].bb_l;
			bounds[2*i + 1] = nodes[i].bb_r;
		}
	} else {
		for(var i=offset; i<end; i++){
			bounds[2*i + 0] = nodes[i].bb_b;
			bounds[2*i + 1] = nodes[i].bb_t;
		}
	}
	
	bounds.sort(function(a, b) {
		// This might run faster if the function was moved out into the global scope.
		return a - b;
	});
	var split = (bounds[count - 1] + bounds[count])*0.5; // use the median as the split

	// Generate the child BBs
	//var a = bb, b = bb;
	var a_l = bb_l, a_b = bb_b, a_r = bb_r, a_t = bb_t;
	var b_l = bb_l, b_b = bb_b, b_r = bb_r, b_t = bb_t;

	if(splitWidth) a_r = b_l = split; else a_t = b_b = split;
	
	// Partition the nodes
	var right = end;
	for(var left=offset; left < right;){
		var node = nodes[left];
//	if(bbMergedArea(node.bb, b) < bbMergedArea(node.bb, a)){
		if(bbTreeMergedArea2(node, b_l, b_b, b_r, b_t) < bbTreeMergedArea2(node, a_l, a_b, a_r, a_t)){
			right--;
			nodes[left] = nodes[right];
			nodes[right] = node;
		} else {
			left++;
		}
	}
	
	if(right == count){
		var node = null;
		for(var i=offset; i<end; i++) node = subtreeInsert(node, nodes[i], tree);
		return node;
	}
	
	// Recurse and build the node!
	return NodeNew(tree,
		partitionNodes(tree, nodes, offset, right - offset),
		partitionNodes(tree, nodes, right, end - right)
	);
};

//static void
//bbTreeOptimizeIncremental(bbTree *tree, int passes)
//{
//	for(int i=0; i<passes; i++){
//		Node *root = tree.root;
//		Node *node = root;
//		int bit = 0;
//		unsigned int path = tree.opath;
//		
//		while(!NodeIsLeaf(node)){
//			node = (path&(1<<bit) ? node.a : node.b);
//			bit = (bit + 1)&(sizeof(unsigned int)*8 - 1);
//		}
//		
//		root = subtreeRemove(root, node, tree);
//		tree.root = subtreeInsert(root, node, tree);
//	}
//}

BBTree.prototype.optimize = function()
{
	var nodes = new Array(this.count);
	var i = 0;

	for (var hashid in this.leaves)
	{
		nodes[i++] = this.nodes[hashid];
	}
	
	tree.subtreeRecycle(root);
	this.root = partitionNodes(tree, nodes, nodes.length);
};

// **** Debug Draw

var nodeRender = function(node, depth)
{
	if(!node.isLeaf && depth <= 10){
		nodeRender(node.A, depth + 1);
		nodeRender(node.B, depth + 1);
	}
	
	var str = '';
	for(var i = 0; i < depth; i++) {
		str += ' ';
	}

	console.log(str + node.bb_b + ' ' + node.bb_t);
};

BBTree.prototype.log = function(){
	if(this.root) nodeRender(this.root, 0);
};

/*
static void
NodeRender(Node *node, int depth)
{
	if(!NodeIsLeaf(node) && depth <= 10){
		NodeRender(node.a, depth + 1);
		NodeRender(node.b, depth + 1);
	}
	
	bb bb = node.bb;
	
//	GLfloat v = depth/2.0f;	
//	glColor3f(1.0f - v, v, 0.0f);
	glLineWidth(max(5.0f - depth, 1.0f));
	glBegin(GL_LINES); {
		glVertex2f(bb.l, bb.b);
		glVertex2f(bb.l, bb.t);
		
		glVertex2f(bb.l, bb.t);
		glVertex2f(bb.r, bb.t);
		
		glVertex2f(bb.r, bb.t);
		glVertex2f(bb.r, bb.b);
		
		glVertex2f(bb.r, bb.b);
		glVertex2f(bb.l, bb.b);
	}; glEnd();
}

void
bbTreeRenderDebug(cpSpatialIndex *index){
	if(index.klass != &klass){
		cpAssertWarn(false, "Ignoring bbTreeRenderDebug() call to non-tree spatial index.");
		return;
	}
	
	bbTree *tree = (bbTree *)index;
	if(tree.root) NodeRender(tree.root, 0);
}
*/
/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/// @defgroup cpArbiter cpArbiter
/// The cpArbiter struct controls pairs of colliding shapes.
/// They are also used in conjuction with collision handler callbacks
/// allowing you to retrieve information on the collision and control it.


// **** Collision Handlers
//
// Collision handlers are user-defined objects to describe the behaviour of colliding
// objects.
var CollisionHandler = cp.CollisionHandler = function()
{
	// The collision type
	this.a = this.b = 0;
};

/// Collision begin event callback
/// Returning false from a begin callback causes the collision to be ignored until
/// the the separate callback is called when the objects stop colliding.
CollisionHandler.prototype.begin = function(arb, space){return true;};

/// Collision pre-solve event callback
/// Returning false from a pre-step callback causes the collision to be ignored until the next step.
CollisionHandler.prototype.preSolve = function(arb, space){return true;};

/// Collision post-solve event function callback type.
CollisionHandler.prototype.postSolve = function(arb, space){};
/// Collision separate event function callback type.
CollisionHandler.prototype.separate = function(arb, space){};


var CP_MAX_CONTACTS_PER_ARBITER = 4;

// Arbiter states
//
// Arbiter is active and its the first collision.
//	'first coll'
// Arbiter is active and its not the first collision.
//	'normal',
// Collision has been explicitly ignored.
// Either by returning false from a begin collision handler or calling cpArbiterIgnore().
//	'ignore',
// Collison is no longer active. A space will cache an arbiter for up to cpSpace.collisionPersistence more steps.
//	'cached'

/// A colliding pair of shapes.
var Arbiter = function(a, b) {
	/// Calculated value to use for the elasticity coefficient.
	/// Override in a pre-solve collision handler for custom behavior.
	this.e = 0;
	/// Calculated value to use for the friction coefficient.
	/// Override in a pre-solve collision handler for custom behavior.
	this.u = 0;
	/// Calculated value to use for applying surface velocities.
	/// Override in a pre-solve collision handler for custom behavior.
	this.surface_vr = vzero;
	
	this.a = a; this.body_a = a.body;
	this.b = b; this.body_b = b.body;
	
	this.thread_a_next = this.thread_a_prev = null;
	this.thread_b_next = this.thread_b_prev = null;
	
	this.contacts = null;
	
	this.stamp = 0;
	this.handler = null;
	this.swappedColl = false;
	this.state = 'first coll';
};

Arbiter.prototype.getShapes = function()
{
	if (this.swappedColl){
		return [this.b, this.a];
	}else{
		return [this.a, this.b];
	}
}

/// Calculate the total impulse that was applied by this arbiter.
/// This function should only be called from a post-solve, post-step or cpBodyEachArbiter callback.
Arbiter.prototype.totalImpulse = function()
{
	var contacts = this.contacts;
	var sum = new Vect(0,0);
	
	for(var i=0, count=contacts.length; i<count; i++){
		var con = contacts[i];
		sum.add(vmult(con.n, con.jnAcc));
	}
	
	return this.swappedColl ? sum : sum.neg();
};

/// Calculate the total impulse including the friction that was applied by this arbiter.
/// This function should only be called from a post-solve, post-step or cpBodyEachArbiter callback.
Arbiter.prototype.totalImpulseWithFriction = function()
{
	var contacts = this.contacts;
	var sum = new Vect(0,0);
	
	for(var i=0, count=contacts.length; i<count; i++){
		var con = contacts[i];
		sum.add(new Vect(con.jnAcc, con.jtAcc).rotate(con.n));
	}

	return this.swappedColl ? sum : sum.neg();
};

/// Calculate the amount of energy lost in a collision including static, but not dynamic friction.
/// This function should only be called from a post-solve, post-step or cpBodyEachArbiter callback.
Arbiter.prototype.totalKE = function()
{
	var eCoef = (1 - this.e)/(1 + this.e);
	var sum = 0;
	
	var contacts = this.contacts;
	for(var i=0, count=contacts.length; i<count; i++){
		var con = contacts[i];
		var jnAcc = con.jnAcc;
		var jtAcc = con.jtAcc;
		
		sum += eCoef*jnAcc*jnAcc/con.nMass + jtAcc*jtAcc/con.tMass;
	}
	
	return sum;
};

/// Causes a collision pair to be ignored as if you returned false from a begin callback.
/// If called from a pre-step callback, you will still need to return false
/// if you want it to be ignored in the current step.
Arbiter.prototype.ignore = function()
{
	this.state = 'ignore';
};

/// Return the colliding shapes involved for this arbiter.
/// The order of their cpSpace.collision_type values will match
/// the order set when the collision handler was registered.
Arbiter.prototype.getA = function()
{
	return this.swappedColl ? this.b : this.a;
};

Arbiter.prototype.getB = function()
{
	return this.swappedColl ? this.a : this.b;
};

/// Returns true if this is the first step a pair of objects started colliding.
Arbiter.prototype.isFirstContact = function()
{
	return this.state === 'first coll';
};

/// A struct that wraps up the important collision data for an arbiter.
var ContactPoint = function(point, normal, dist)
{
	this.point = point;
	this.normal = normal;
	this.dist = dist;
};

/// Return a contact set from an arbiter.
Arbiter.prototype.getContactPointSet = function()
{
	var set = new Array(this.contacts.length);
	
	var i;
	for(i=0; i<set.length; i++){
		set[i] = new ContactPoint(this.contacts[i].p, this.contacts[i].n, this.contacts[i].dist);
	}
	
	return set;
};

/// Get the normal of the @c ith contact point.
Arbiter.prototype.getNormal = function(i)
{
	var n = this.contacts[i].n;
	return this.swappedColl ? vneg(n) : n;
};

/// Get the position of the @c ith contact point.
Arbiter.prototype.getPoint = function(i)
{
	return this.contacts[i].p;
};

/// Get the depth of the @c ith contact point.
Arbiter.prototype.getDepth = function(i)
{
	return this.contacts[i].dist;
};

/*
Arbiter.prototype.threadForBody = function(body)
{
	return (this.body_a === body ? this.thread_a : this.thread_b);
};*/

var unthreadHelper = function(arb, body, prev, next)
{
	// thread_x_y is quite ugly, but it avoids making unnecessary js objects per arbiter.
	if(prev){
		// cpArbiterThreadForBody(prev, body)->next = next;
		if(prev.body_a === body) {
			prev.thread_a_next = next;
		} else {
			prev.thread_b_next = next;
		}
	} else {
		body.arbiterList = next;
	}
	
	if(next){
		// cpArbiterThreadForBody(next, body)->prev = prev;
		if(next.body_a === body){
			next.thread_a_prev = prev;
		} else {
			next.thread_b_prev = prev;
		}
	}
};

Arbiter.prototype.unthread = function()
{
	unthreadHelper(this, this.body_a, this.thread_a_prev, this.thread_a_next);
	unthreadHelper(this, this.body_b, this.thread_b_prev, this.thread_b_next);
	this.thread_a_prev = this.thread_a_next = null;
	this.thread_b_prev = this.thread_b_next = null;
};

//cpFloat
//cpContactsEstimateCrushingImpulse(cpContact *contacts, int numContacts)
//{
//	cpFloat fsum = 0;
//	cpVect vsum = vzero;
//	
//	for(int i=0; i<numContacts; i++){
//		cpContact *con = &contacts[i];
//		cpVect j = vrotate(con.n, v(con.jnAcc, con.jtAcc));
//		
//		fsum += vlength(j);
//		vsum = vadd(vsum, j);
//	}
//	
//	cpFloat vmag = vlength(vsum);
//	return (1 - vmag/fsum);
//}

Arbiter.prototype.update = function(contacts, handler, a, b)
{
	// Arbiters without contact data may exist if a collision function rejected the collision.
	if(this.contacts){
		// Iterate over the possible pairs to look for hash value matches.
		for(var i=0; i<this.contacts.length; i++){
			var old = this.contacts[i];
			
			for(var j=0; j<contacts.length; j++){
				var new_contact = contacts[j];
				
				// This could trigger false positives, but is fairly unlikely nor serious if it does.
				if(new_contact.hash === old.hash){
					// Copy the persistant contact information.
					new_contact.jnAcc = old.jnAcc;
					new_contact.jtAcc = old.jtAcc;
				}
			}
		}
	}
	
	this.contacts = contacts;
	
	this.handler = handler;
	this.swappedColl = (a.collision_type !== handler.a);
	
	this.e = a.e * b.e;
	this.u = a.u * b.u;
	this.surface_vr = vsub(a.surface_v, b.surface_v);
	
	// For collisions between two similar primitive types, the order could have been swapped.
	this.a = a; this.body_a = a.body;
	this.b = b; this.body_b = b.body;
	
	// mark it as new if it's been cached
	if(this.state == 'cached') this.state = 'first coll';
};

Arbiter.prototype.preStep = function(dt, slop, bias)
{
	var a = this.body_a;
	var b = this.body_b;
	
	for(var i=0; i<this.contacts.length; i++){
		var con = this.contacts[i];
		
		// Calculate the offsets.
		con.r1 = vsub(con.p, a.p);
		con.r2 = vsub(con.p, b.p);
		
		// Calculate the mass normal and mass tangent.
		con.nMass = 1/k_scalar(a, b, con.r1, con.r2, con.n);
		con.tMass = 1/k_scalar(a, b, con.r1, con.r2, vperp(con.n));
	
		// Calculate the target bias velocity.
		con.bias = -bias*min(0, con.dist + slop)/dt;
		con.jBias = 0;
		
		// Calculate the target bounce velocity.
		con.bounce = normal_relative_velocity(a, b, con.r1, con.r2, con.n)*this.e;
	}
};

Arbiter.prototype.applyCachedImpulse = function(dt_coef)
{
	if(this.isFirstContact()) return;
	
	var a = this.body_a;
	var b = this.body_b;
	
	for(var i=0; i<this.contacts.length; i++){
		var con = this.contacts[i];
		//var j = vrotate(con.n, new Vect(con.jnAcc, con.jtAcc));
		var nx = con.n.x;
		var ny = con.n.y;
		var jx = nx*con.jnAcc - ny*con.jtAcc;
		var jy = nx*con.jtAcc + ny*con.jnAcc;
		//apply_impulses(a, b, con.r1, con.r2, vmult(j, dt_coef));
		apply_impulses(a, b, con.r1, con.r2, jx * dt_coef, jy * dt_coef);
	}
};

// TODO is it worth splitting velocity/position correction?

var numApplyImpulse = 0;
var numApplyContact = 0;

Arbiter.prototype.applyImpulse = function()
{
	numApplyImpulse++;
	//if (!this.contacts) { throw new Error('contacts is undefined'); }
	var a = this.body_a;
	var b = this.body_b;
	var surface_vr = this.surface_vr;
	var friction = this.u;

	for(var i=0; i<this.contacts.length; i++){
		numApplyContact++;
		var con = this.contacts[i];
		var nMass = con.nMass;
		var n = con.n;
		var r1 = con.r1;
		var r2 = con.r2;
		
		//var vr = relative_velocity(a, b, r1, r2);
		var vrx = b.vx - r2.y * b.w - (a.vx - r1.y * a.w);
		var vry = b.vy + r2.x * b.w - (a.vy + r1.x * a.w);
		
		//var vb1 = vadd(vmult(vperp(r1), a.w_bias), a.v_bias);
		//var vb2 = vadd(vmult(vperp(r2), b.w_bias), b.v_bias);
		//var vbn = vdot(vsub(vb2, vb1), n);

		var vbn = n.x*(b.v_biasx - r2.y * b.w_bias - a.v_biasx + r1.y * a.w_bias) +
				n.y*(r2.x*b.w_bias + b.v_biasy - r1.x * a.w_bias - a.v_biasy);

		var vrn = vdot2(vrx, vry, n.x, n.y);
		//var vrt = vdot(vadd(vr, surface_vr), vperp(n));
		var vrt = vdot2(vrx + surface_vr.x, vry + surface_vr.y, -n.y, n.x);
		
		var jbn = (con.bias - vbn)*nMass;
		var jbnOld = con.jBias;
		con.jBias = max(jbnOld + jbn, 0);
		
		var jn = -(con.bounce + vrn)*nMass;
		var jnOld = con.jnAcc;
		con.jnAcc = max(jnOld + jn, 0);
		
		var jtMax = friction*con.jnAcc;
		var jt = -vrt*con.tMass;
		var jtOld = con.jtAcc;
		con.jtAcc = clamp(jtOld + jt, -jtMax, jtMax);
		
		//apply_bias_impulses(a, b, r1, r2, vmult(n, con.jBias - jbnOld));
		var bias_x = n.x * (con.jBias - jbnOld);
		var bias_y = n.y * (con.jBias - jbnOld);
		apply_bias_impulse(a, -bias_x, -bias_y, r1);
		apply_bias_impulse(b, bias_x, bias_y, r2);

		//apply_impulses(a, b, r1, r2, vrotate(n, new Vect(con.jnAcc - jnOld, con.jtAcc - jtOld)));
		var rot_x = con.jnAcc - jnOld;
		var rot_y = con.jtAcc - jtOld;

		// Inlining apply_impulses decreases speed for some reason :/
		apply_impulses(a, b, r1, r2, n.x*rot_x - n.y*rot_y, n.x*rot_y + n.y*rot_x);
	}
};

Arbiter.prototype.callSeparate = function(space)
{
	// The handler needs to be looked up again as the handler cached on the arbiter may have been deleted since the last step.
	var handler = space.lookupHandler(this.a.collision_type, this.b.collision_type);
	handler.separate(this, space);
};

// From chipmunk_private.h
Arbiter.prototype.next = function(body)
{
	return (this.body_a == body ? this.thread_a_next : this.thread_b_next);
};
/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var numContacts = 0;

var Contact = function(p, n, dist, hash)
{
	this.p = p;
	this.n = n;
	this.dist = dist;
	
	this.r1 = this.r2 = vzero;
	this.nMass = this.tMass = this.bounce = this.bias = 0;

	this.jnAcc = this.jtAcc = this.jBias = 0;
	
	this.hash = hash;
	numContacts++;
};

var NONE = [];

// Add contact points for circle to circle collisions.
// Used by several collision tests.
var circle2circleQuery = function(p1, p2, r1, r2)
{
	var mindist = r1 + r2;
	var delta = vsub(p2, p1);
	var distsq = vlengthsq(delta);
	if(distsq >= mindist*mindist) return;
	
	var dist = Math.sqrt(distsq);

	// Allocate and initialize the contact.
	return new Contact(
		vadd(p1, vmult(delta, 0.5 + (r1 - 0.5*mindist)/(dist ? dist : Infinity))),
		(dist ? vmult(delta, 1/dist) : new Vect(1, 0)),
		dist - mindist,
		0
	);
};

// Collide circle shapes.
var circle2circle = function(circ1, circ2)
{
	var contact = circle2circleQuery(circ1.tc, circ2.tc, circ1.r, circ2.r);
	return contact ? [contact] : NONE;
};

var circle2segment = function(circleShape, segmentShape)
{
	var seg_a = segmentShape.ta;
	var seg_b = segmentShape.tb;
	var center = circleShape.tc;
	
	var seg_delta = vsub(seg_b, seg_a);
	var closest_t = clamp01(vdot(seg_delta, vsub(center, seg_a))/vlengthsq(seg_delta));
	var closest = vadd(seg_a, vmult(seg_delta, closest_t));
	
	var contact = circle2circleQuery(center, closest, circleShape.r, segmentShape.r);
	if(contact){
		var n = contact.n;
		
		// Reject endcap collisions if tangents are provided.
		return (
			(closest_t === 0 && vdot(n, segmentShape.a_tangent) < 0) ||
			(closest_t === 1 && vdot(n, segmentShape.b_tangent) < 0)
		) ? NONE : [contact];
	} else {
		return NONE;
	}
}

// Find the minimum separating axis for the given poly and axis list.
//
// This function needs to return two values - the index of the min. separating axis and
// the value itself. Short of inlining MSA, returning values through a global like this
// is the fastest implementation.
//
// See: http://jsperf.com/return-two-values-from-function/2
var last_MSA_min = 0;
var findMSA = function(poly, planes)
{
	var min_index = 0;
	var min = poly.valueOnAxis(planes[0].n, planes[0].d);
	if(min > 0) return -1;
	
	for(var i=1; i<planes.length; i++){
		var dist = poly.valueOnAxis(planes[i].n, planes[i].d);
		if(dist > 0) {
			return -1;
		} else if(dist > min){
			min = dist;
			min_index = i;
		}
	}
	
	last_MSA_min = min;
	return min_index;
};

// Add contacts for probably penetrating vertexes.
// This handles the degenerate case where an overlap was detected, but no vertexes fall inside
// the opposing polygon. (like a star of david)
var findVertsFallback = function(poly1, poly2, n, dist)
{
	var arr = [];

	var verts1 = poly1.tVerts;
	for(var i=0; i<verts1.length; i+=2){
		var vx = verts1[i];
		var vy = verts1[i+1];
		if(poly2.containsVertPartial(vx, vy, vneg(n))){
			arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly1.hashid, i)));
		}
	}
	
	var verts2 = poly2.tVerts;
	for(var i=0; i<verts2.length; i+=2){
		var vx = verts2[i];
		var vy = verts2[i+1];
		if(poly1.containsVertPartial(vx, vy, n)){
			arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly2.hashid, i)));
		}
	}
	
	return arr;
};

// Add contacts for penetrating vertexes.
var findVerts = function(poly1, poly2, n, dist)
{
	var arr = [];

	var verts1 = poly1.tVerts;
	for(var i=0; i<verts1.length; i+=2){
		var vx = verts1[i];
		var vy = verts1[i+1];
		if(poly2.containsVert(vx, vy)){
			arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly1.hashid, i>>1)));
		}
	}
	
	var verts2 = poly2.tVerts;
	for(var i=0; i<verts2.length; i+=2){
		var vx = verts2[i];
		var vy = verts2[i+1];
		if(poly1.containsVert(vx, vy)){
			arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly2.hashid, i>>1)));
		}
	}
	
	return (arr.length ? arr : findVertsFallback(poly1, poly2, n, dist));
};

// Collide poly shapes together.
var poly2poly = function(poly1, poly2)
{
	var mini1 = findMSA(poly2, poly1.tPlanes);
	if(mini1 == -1) return NONE;
	var min1 = last_MSA_min;
	
	var mini2 = findMSA(poly1, poly2.tPlanes);
	if(mini2 == -1) return NONE;
	var min2 = last_MSA_min;
	
	// There is overlap, find the penetrating verts
	if(min1 > min2)
		return findVerts(poly1, poly2, poly1.tPlanes[mini1].n, min1);
	else
		return findVerts(poly1, poly2, vneg(poly2.tPlanes[mini2].n), min2);
};

// Like cpPolyValueOnAxis(), but for segments.
var segValueOnAxis = function(seg, n, d)
{
	var a = vdot(n, seg.ta) - seg.r;
	var b = vdot(n, seg.tb) - seg.r;
	return min(a, b) - d;
};

// Identify vertexes that have penetrated the segment.
var findPointsBehindSeg = function(arr, seg, poly, pDist, coef) 
{
	var dta = vcross(seg.tn, seg.ta);
	var dtb = vcross(seg.tn, seg.tb);
	var n = vmult(seg.tn, coef);
	
	var verts = poly.tVerts;
	for(var i=0; i<verts.length; i+=2){
		var vx = verts[i];
		var vy = verts[i+1];
		if(vdot2(vx, vy, n.x, n.y) < vdot(seg.tn, seg.ta)*coef + seg.r){
			var dt = vcross2(seg.tn.x, seg.tn.y, vx, vy);
			if(dta >= dt && dt >= dtb){
				arr.push(new Contact(new Vect(vx, vy), n, pDist, hashPair(poly.hashid, i)));
			}
		}
	}
};

// This one is complicated and gross. Just don't go there...
// TODO: Comment me!
var seg2poly = function(seg, poly)
{
	var arr = [];

	var planes = poly.tPlanes;
	var numVerts = planes.length;
	
	var segD = vdot(seg.tn, seg.ta);
	var minNorm = poly.valueOnAxis(seg.tn, segD) - seg.r;
	var minNeg = poly.valueOnAxis(vneg(seg.tn), -segD) - seg.r;
	if(minNeg > 0 || minNorm > 0) return NONE;
	
	var mini = 0;
	var poly_min = segValueOnAxis(seg, planes[0].n, planes[0].d);
	if(poly_min > 0) return NONE;
	for(var i=0; i<numVerts; i++){
		var dist = segValueOnAxis(seg, planes[i].n, planes[i].d);
		if(dist > 0){
			return NONE;
		} else if(dist > poly_min){
			poly_min = dist;
			mini = i;
		}
	}
	
	var poly_n = vneg(planes[mini].n);
	
	var va = vadd(seg.ta, vmult(poly_n, seg.r));
	var vb = vadd(seg.tb, vmult(poly_n, seg.r));
	if(poly.containsVert(va.x, va.y))
		arr.push(new Contact(va, poly_n, poly_min, hashPair(seg.hashid, 0)));
	if(poly.containsVert(vb.x, vb.y))
		arr.push(new Contact(vb, poly_n, poly_min, hashPair(seg.hashid, 1)));
	
	// Floating point precision problems here.
	// This will have to do for now.
//	poly_min -= cp_collision_slop; // TODO is this needed anymore?
	
	if(minNorm >= poly_min || minNeg >= poly_min) {
		if(minNorm > minNeg)
			findPointsBehindSeg(arr, seg, poly, minNorm, 1);
		else
			findPointsBehindSeg(arr, seg, poly, minNeg, -1);
	}
	
	// If no other collision points are found, try colliding endpoints.
	if(arr.length === 0){
		var mini2 = mini * 2;
		var verts = poly.tVerts;

		var poly_a = new Vect(verts[mini2], verts[mini2+1]);
		
		var con;
		if((con = circle2circleQuery(seg.ta, poly_a, seg.r, 0, arr))) return [con];
		if((con = circle2circleQuery(seg.tb, poly_a, seg.r, 0, arr))) return [con];

		var len = numVerts * 2;
		var poly_b = new Vect(verts[(mini2+2)%len], verts[(mini2+3)%len]);
		if((con = circle2circleQuery(seg.ta, poly_b, seg.r, 0, arr))) return [con];
		if((con = circle2circleQuery(seg.tb, poly_b, seg.r, 0, arr))) return [con];
	}

//	console.log(poly.tVerts, poly.tPlanes);
//	console.log('seg2poly', arr);
	return arr;
};

// This one is less gross, but still gross.
// TODO: Comment me!
var circle2poly = function(circ, poly)
{
	var planes = poly.tPlanes;
	
	var mini = 0;
	var min = vdot(planes[0].n, circ.tc) - planes[0].d - circ.r;
	for(var i=0; i<planes.length; i++){
		var dist = vdot(planes[i].n, circ.tc) - planes[i].d - circ.r;
		if(dist > 0){
			return NONE;
		} else if(dist > min) {
			min = dist;
			mini = i;
		}
	}
	
	var n = planes[mini].n;

	var verts = poly.tVerts;
	var len = verts.length;
	var mini2 = mini<<1;

	//var a = poly.tVerts[mini];
	//var b = poly.tVerts[(mini + 1)%poly.tVerts.length];
	var ax = verts[mini2];
	var ay = verts[mini2+1];
	var bx = verts[(mini2+2)%len];
	var by = verts[(mini2+3)%len];

	var dta = vcross2(n.x, n.y, ax, ay);
	var dtb = vcross2(n.x, n.y, bx, by);
	var dt = vcross(n, circ.tc);
		
	if(dt < dtb){
		var con = circle2circleQuery(circ.tc, new Vect(bx, by), circ.r, 0, con);
		return con ? [con] : NONE;
	} else if(dt < dta) {
		return [new Contact(
			vsub(circ.tc, vmult(n, circ.r + min/2)),
			vneg(n),
			min,
			0
		)];
	} else {
		var con = circle2circleQuery(circ.tc, new Vect(ax, ay), circ.r, 0, con);
		return con ? [con] : NONE;
	}
};

// The javascripty way to do this would be either nested object or methods on the prototypes.
// 
// However, the *fastest* way is the method below.
// See: http://jsperf.com/dispatch

// These are copied from the prototypes into the actual objects in the Shape constructor.
CircleShape.prototype.collisionCode = 0;
SegmentShape.prototype.collisionCode = 1;
PolyShape.prototype.collisionCode = 2;

CircleShape.prototype.collisionTable = [
	circle2circle,
	circle2segment,
	circle2poly
];

SegmentShape.prototype.collisionTable = [
	null,
	function(segA, segB) { return NONE; }, // seg2seg
	seg2poly
];

PolyShape.prototype.collisionTable = [
	null,
	null,
	poly2poly
];

var collideShapes = cp.collideShapes = function(a, b)
{
	assert(a.collisionCode <= b.collisionCode, 'Collided shapes must be sorted by type');
	return a.collisionTable[b.collisionCode](a, b);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var defaultCollisionHandler = new CollisionHandler();

/// Basic Unit of Simulation in Chipmunk
var Space = cp.Space = function() {
	this.stamp = 0;
	this.curr_dt = 0;

	this.bodies = [];
	this.rousedBodies = [];
	this.sleepingComponents = [];
	
	this.staticShapes = new BBTree(null);
	this.activeShapes = new BBTree(this.staticShapes);
	
	this.arbiters = [];
	this.contactBuffersHead = null;
	this.cachedArbiters = {};
	//this.pooledArbiters = [];
	
	this.constraints = [];
	
	this.locked = 0;
	
	this.collisionHandlers = {};
	this.defaultHandler = defaultCollisionHandler;

	this.postStepCallbacks = [];
	
	/// Number of iterations to use in the impulse solver to solve contacts.
	this.iterations = 10;
	
	/// Gravity to pass to rigid bodies when integrating velocity.
	this.gravity = vzero;
	
	/// Damping rate expressed as the fraction of velocity bodies retain each second.
	/// A value of 0.9 would mean that each body's velocity will drop 10% per second.
	/// The default value is 1.0, meaning no damping is applied.
	/// @note This damping value is different than those of cpDampedSpring and cpDampedRotarySpring.
	this.damping = 1;
	
	/// Speed threshold for a body to be considered idle.
	/// The default value of 0 means to let the space guess a good threshold based on gravity.
	this.idleSpeedThreshold = 0;
	
	/// Time a group of bodies must remain idle in order to fall asleep.
	/// Enabling sleeping also implicitly enables the the contact graph.
	/// The default value of Infinity disables the sleeping algorithm.
	this.sleepTimeThreshold = Infinity;
	
	/// Amount of encouraged penetration between colliding shapes..
	/// Used to reduce oscillating contacts and keep the collision cache warm.
	/// Defaults to 0.1. If you have poor simulation quality,
	/// increase this number as much as possible without allowing visible amounts of overlap.
	this.collisionSlop = 0.1;
	
	/// Determines how fast overlapping shapes are pushed apart.
	/// Expressed as a fraction of the error remaining after each second.
	/// Defaults to pow(1.0 - 0.1, 60.0) meaning that Chipmunk fixes 10% of overlap each frame at 60Hz.
	this.collisionBias = Math.pow(1 - 0.1, 60);
	
	/// Number of frames that contact information should persist.
	/// Defaults to 3. There is probably never a reason to change this value.
	this.collisionPersistence = 3;
	
	/// Rebuild the contact graph during each step. Must be enabled to use the cpBodyEachArbiter() function.
	/// Disabled by default for a small performance boost. Enabled implicitly when the sleeping feature is enabled.
	this.enableContactGraph = false;
	
	/// The designated static body for this space.
	/// You can modify this body, or replace it with your own static body.
	/// By default it points to a statically allocated cpBody in the cpSpace struct.
	this.staticBody = new Body(Infinity, Infinity);
	this.staticBody.nodeIdleTime = Infinity;

	// Cache the collideShapes callback function for the space.
	this.collideShapes = this.makeCollideShapes();
};

Space.prototype.getCurrentTimeStep = function() { return this.curr_dt; };

Space.prototype.setIterations = function(iter) { this.iterations = iter; };

/// returns true from inside a callback and objects cannot be added/removed.
Space.prototype.isLocked = function()
{
	return this.locked;
};

var assertSpaceUnlocked = function(space)
{
	assert(!space.locked, "This addition/removal cannot be done safely during a call to cpSpaceStep() \
 or during a query. Put these calls into a post-step callback.");
};

// **** Collision handler function management

/// Set a collision handler to be used whenever the two shapes with the given collision types collide.
/// You can pass null for any function you don't want to implement.
Space.prototype.addCollisionHandler = function(a, b, begin, preSolve, postSolve, separate)
{
	assertSpaceUnlocked(this);
		
	// Remove any old function so the new one will get added.
	this.removeCollisionHandler(a, b);
	
	var handler = new CollisionHandler();
	handler.a = a;
	handler.b = b;
	if(begin) handler.begin = begin;
	if(preSolve) handler.preSolve = preSolve;
	if(postSolve) handler.postSolve = postSolve;
	if(separate) handler.separate = separate;

	this.collisionHandlers[hashPair(a, b)] = handler;
};

/// Unset a collision handler.
Space.prototype.removeCollisionHandler = function(a, b)
{
	assertSpaceUnlocked(this);
	
	delete this.collisionHandlers[hashPair(a, b)];
};

/// Set a default collision handler for this space.
/// The default collision handler is invoked for each colliding pair of shapes
/// that isn't explicitly handled by a specific collision handler.
/// You can pass null for any function you don't want to implement.
Space.prototype.setDefaultCollisionHandler = function(begin, preSolve, postSolve, separate)
{
	assertSpaceUnlocked(this);

	var handler = new CollisionHandler();
	if(begin) handler.begin = begin;
	if(preSolve) handler.preSolve = preSolve;
	if(postSolve) handler.postSolve = postSolve;
	if(separate) handler.separate = separate;

	this.defaultHandler = handler;
};

Space.prototype.lookupHandler = function(a, b)
{
	return this.collisionHandlers[hashPair(a, b)] || this.defaultHandler;
};

// **** Body, Shape, and Joint Management

/// Add a collision shape to the simulation.
/// If the shape is attached to a static body, it will be added as a static shape.
Space.prototype.addShape = function(shape)
{
	var body = shape.body;
	if(body.isStatic()) return this.addStaticShape(shape);
	
	assert(!shape.space, "This shape is already added to a space and cannot be added to another.");
	assertSpaceUnlocked(this);
	
	body.activate();
	body.addShape(shape);
	
	shape.update(body.p, body.rot);
	this.activeShapes.insert(shape, shape.hashid);
	shape.space = this;
		
	return shape;
};

/// Explicity add a shape as a static shape to the simulation.
Space.prototype.addStaticShape = function(shape)
{
	assert(!shape.space, "This shape is already added to a space and cannot be added to another.");
	assertSpaceUnlocked(this);
	
	var body = shape.body;
	body.addShape(shape);

	shape.update(body.p, body.rot);
	this.staticShapes.insert(shape, shape.hashid);
	shape.space = this;
	
	return shape;
};

/// Add a rigid body to the simulation.
Space.prototype.addBody = function(body)
{
	assert(!body.isStatic(), "Static bodies cannot be added to a space as they are not meant to be simulated.");
	assert(!body.space, "This body is already added to a space and cannot be added to another.");
	assertSpaceUnlocked(this);
	
	this.bodies.push(body);
	body.space = this;
	
	return body;
};

/// Add a constraint to the simulation.
Space.prototype.addConstraint = function(constraint)
{
	assert(!constraint.space, "This shape is already added to a space and cannot be added to another.");
	assertSpaceUnlocked(this);
	
	var a = constraint.a, b = constraint.b;

	a.activate();
	b.activate();
	this.constraints.push(constraint);
	
	// Push onto the heads of the bodies' constraint lists
	constraint.next_a = a.constraintList; a.constraintList = constraint;
	constraint.next_b = b.constraintList; b.constraintList = constraint;
	constraint.space = this;
	
	return constraint;
};

Space.prototype.filterArbiters = function(body, filter)
{
	for (var hash in this.cachedArbiters)
	{
		var arb = this.cachedArbiters[hash];

		// Match on the filter shape, or if it's null the filter body
		if(
			(body === arb.body_a && (filter === arb.a || filter === null)) ||
			(body === arb.body_b && (filter === arb.b || filter === null))
		){
			// Call separate when removing shapes.
			if(filter && arb.state !== 'cached') arb.callSeparate(this);
			
			arb.unthread();

			deleteObjFromList(this.arbiters, arb);
			//this.pooledArbiters.push(arb);
			
			delete this.cachedArbiters[hash];
		}
	}
};

/// Remove a collision shape from the simulation.
Space.prototype.removeShape = function(shape)
{
	var body = shape.body;
	if(body.isStatic()){
		this.removeStaticShape(shape);
	} else {
		assert(this.containsShape(shape),
			"Cannot remove a shape that was not added to the space. (Removed twice maybe?)");
		assertSpaceUnlocked(this);
		
		body.activate();
		body.removeShape(shape);
		this.filterArbiters(body, shape);
		this.activeShapes.remove(shape, shape.hashid);
		shape.space = null;
	}
};

/// Remove a collision shape added using addStaticShape() from the simulation.
Space.prototype.removeStaticShape = function(shape)
{
	assert(this.containsShape(shape),
		"Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)");
	assertSpaceUnlocked(this);
	
	var body = shape.body;
	if(body.isStatic()) body.activateStatic(shape);
	body.removeShape(shape);
	this.filterArbiters(body, shape);
	this.staticShapes.remove(shape, shape.hashid);
	shape.space = null;
};

/// Remove a rigid body from the simulation.
Space.prototype.removeBody = function(body)
{
	assert(this.containsBody(body),
		"Cannot remove a body that was not added to the space. (Removed twice maybe?)");
	assertSpaceUnlocked(this);
	
	body.activate();
//	this.filterArbiters(body, null);
	deleteObjFromList(this.bodies, body);
	body.space = null;
};

/// Remove a constraint from the simulation.
Space.prototype.removeConstraint = function(constraint)
{
	assert(this.containsConstraint(constraint),
		"Cannot remove a constraint that was not added to the space. (Removed twice maybe?)");
	assertSpaceUnlocked(this);
	
	constraint.a.activate();
	constraint.b.activate();
	deleteObjFromList(this.constraints, constraint);
	
	constraint.a.removeConstraint(constraint);
	constraint.b.removeConstraint(constraint);
	constraint.space = null;
};

/// Test if a collision shape has been added to the space.
Space.prototype.containsShape = function(shape)
{
	return (shape.space === this);
};

/// Test if a rigid body has been added to the space.
Space.prototype.containsBody = function(body)
{
	return (body.space == this);
};

/// Test if a constraint has been added to the space.
Space.prototype.containsConstraint = function(constraint)
{
	return (constraint.space == this);
};

Space.prototype.uncacheArbiter = function(arb)
{
	delete this.cachedArbiters[hashPair(arb.a.hashid, arb.b.hashid)];
	deleteObjFromList(this.arbiters, arb);
};


// **** Iteration

/// Call @c func for each body in the space.
Space.prototype.eachBody = function(func)
{
	this.lock(); {
		var bodies = this.bodies;
		
		for(var i=0; i<bodies.length; i++){
			func(bodies[i]);
		}
		
		var components = this.sleepingComponents;
		for(var i=0; i<components.length; i++){
			var root = components[i];
			
			var body = root;
			while(body){
				var next = body.nodeNext;
				func(body);
				body = next;
			}
		}
	} this.unlock(true);
};

/// Call @c func for each shape in the space.
Space.prototype.eachShape = function(func)
{
	this.lock(); {
		this.activeShapes.each(func);
		this.staticShapes.each(func);
	} this.unlock(true);
};

/// Call @c func for each shape in the space.
Space.prototype.eachConstraint = function(func)
{
	this.lock(); {
		var constraints = this.constraints;
		
		for(var i=0; i<constraints.length; i++){
			func(constraints[i]);
		}
	} this.unlock(true);
};

// **** Spatial Index Management

/// Update the collision detection info for the static shapes in the space.
Space.prototype.reindexStatic = function()
{
	assert(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
	
	this.staticShapes.each(function(shape){
		var body = shape.body;
		shape.update(body.p, body.rot);
	});
	this.staticShapes.reindex();
};

/// Update the collision detection data for a specific shape in the space.
Space.prototype.reindexShape = function(shape)
{
	assert(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
	
	var body = shape.body;
	shape.update(body.p, body.rot);
	
	// attempt to rehash the shape in both hashes
	this.activeShapes.reindexObject(shape, shape.hashid);
	this.staticShapes.reindexObject(shape, shape.hashid);
};

/// Update the collision detection data for all shapes attached to a body.
Space.prototype.reindexShapesForBody = function(body)
{
	for(var shape = body.shapeList; shape; shape = shape.next){
		this.reindexShape(shape);
	}
};

/// Switch the space to use a spatial has as it's spatial index.
Space.prototype.useSpatialHash = function(dim, count)
{
	throw new Error('Spatial Hash not implemented.');
	
	var staticShapes = new SpaceHash(dim, count, null);
	var activeShapes = new SpaceHash(dim, count, staticShapes);
	
	this.staticShapes.each(function(shape){
		staticShapes.insert(shape, shape.hashid);
	});
	this.activeShapes.each(function(shape){
		activeShapes.insert(shape, shape.hashid);
	});
		
	this.staticShapes = staticShapes;
	this.activeShapes = activeShapes;
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
 
/// **** Sleeping Functions

Space.prototype.activateBody = function(body)
{
	assert(!body.isRogue(), "Internal error: Attempting to activate a rogue body.");
	
	if(this.locked){
		// cpSpaceActivateBody() is called again once the space is unlocked
		if(this.rousedBodies.indexOf(body) === -1) this.rousedBodies.push(body);
	} else {
		this.bodies.push(body);

		for(var i = 0; i < body.shapeList.length; i++){
			var shape = body.shapeList[i];
			this.staticShapes.remove(shape, shape.hashid);
			this.activeShapes.insert(shape, shape.hashid);
		}
		
		for(var arb = body.arbiterList; arb; arb = arb.next(body)){
			var bodyA = arb.body_a;
			if(body === bodyA || bodyA.isStatic()){
				//var contacts = arb.contacts;
				
				// Restore contact values back to the space's contact buffer memory
				//arb.contacts = cpContactBufferGetArray(this);
				//memcpy(arb.contacts, contacts, numContacts*sizeof(cpContact));
				//cpSpacePushContacts(this, numContacts);
				
				// Reinsert the arbiter into the arbiter cache
				var a = arb.a, b = arb.b;
				this.cachedArbiters[hashPair(a.hashid, b.hashid)] = arb;
				
				// Update the arbiter's state
				arb.stamp = this.stamp;
				arb.handler = this.lookupHandler(a.collision_type, b.collision_type);
				this.arbiters.push(arb);
			}
		}
		
		for(var constraint = body.constraintList; constraint; constraint = constraint.nodeNext){
			var bodyA = constraint.a;
			if(body === bodyA || bodyA.isStatic()) this.constraints.push(constraint);
		}
	}
};

Space.prototype.deactivateBody = function(body)
{
	assert(!body.isRogue(), "Internal error: Attempting to deactivate a rogue body.");
	
	deleteObjFromList(this.bodies, body);
	
	for(var i = 0; i < body.shapeList.length; i++){
		var shape = body.shapeList[i];
		this.activeShapes.remove(shape, shape.hashid);
		this.staticShapes.insert(shape, shape.hashid);
	}
	
	for(var arb = body.arbiterList; arb; arb = arb.next(body)){
		var bodyA = arb.body_a;
		if(body === bodyA || bodyA.isStatic()){
			this.uncacheArbiter(arb);
			
			// Save contact values to a new block of memory so they won't time out
			//size_t bytes = arb.numContacts*sizeof(cpContact);
			//cpContact *contacts = (cpContact *)cpcalloc(1, bytes);
			//memcpy(contacts, arb.contacts, bytes);
			//arb.contacts = contacts;
		}
	}
		
	for(var constraint = body.constraintList; constraint; constraint = constraint.nodeNext){
		var bodyA = constraint.a;
		if(body === bodyA || bodyA.isStatic()) deleteObjFromList(this.constraints, constraint);
	}
};

var componentRoot = function(body)
{
	return (body ? body.nodeRoot : null);
};

var componentActivate = function(root)
{
	if(!root || !root.isSleeping(root)) return;
	assert(!root.isRogue(), "Internal Error: componentActivate() called on a rogue body.");
	
	var space = root.space;
	var body = root;
	while(body){
		var next = body.nodeNext;
		
		body.nodeIdleTime = 0;
		body.nodeRoot = null;
		body.nodeNext = null;
		space.activateBody(body);
		
		body = next;
	}
	
	deleteObjFromList(space.sleepingComponents, root);
};

Body.prototype.activate = function()
{
	if(!this.isRogue()){
		this.nodeIdleTime = 0;
		componentActivate(componentRoot(this));
	}
};

Body.prototype.activateStatic = function(filter)
{
	assert(this.isStatic(), "Body.activateStatic() called on a non-static body.");
	
	for(var arb = this.arbiterList; arb; arb = arb.next(this)){
		if(!filter || filter == arb.a || filter == arb.b){
			(arb.body_a == this ? arb.body_b : arb.body_a).activate();
		}
	}
	
	// TODO should also activate joints!
};

Body.prototype.pushArbiter = function(arb)
{
	assertSoft((arb.body_a === this ? arb.thread_a_next : arb.thread_b_next) === null,
		"Internal Error: Dangling contact graph pointers detected. (A)");
	assertSoft((arb.body_a === this ? arb.thread_a_prev : arb.thread_b_prev) === null,
		"Internal Error: Dangling contact graph pointers detected. (B)");
	
	var next = this.arbiterList;
	assertSoft(next === null || (next.body_a === this ? next.thread_a_prev : next.thread_b_prev) === null,
		"Internal Error: Dangling contact graph pointers detected. (C)");

	if(arb.body_a === this){
		arb.thread_a_next = next;
	} else {
		arb.thread_b_next = next;
	}

	if(next){
		if (next.body_a === this){
			next.thread_a_prev = arb;
		} else {
			next.thread_b_prev = arb;
		}
	}
	this.arbiterList = arb;
};

var componentAdd = function(root, body){
	body.nodeRoot = root;

	if(body !== root){
		body.nodeNext = root.nodeNext;
		root.nodeNext = body;
	}
};

var floodFillComponent = function(root, body)
{
	// Rogue bodies cannot be put to sleep and prevent bodies they are touching from sleeping anyway.
	// Static bodies (which are a type of rogue body) are effectively sleeping all the time.
	if(!body.isRogue()){
		var other_root = componentRoot(body);
		if(other_root == null){
			componentAdd(root, body);
			for(var arb = body.arbiterList; arb; arb = arb.next(body)){
				floodFillComponent(root, (body == arb.body_a ? arb.body_b : arb.body_a));
			}
			for(var constraint = body.constraintList; constraint; constraint = constraint.next(body)){
				floodFillComponent(root, (body == constraint.a ? constraint.b : constraint.a));
			}
		} else {
			assertSoft(other_root === root, "Internal Error: Inconsistency detected in the contact graph.");
		}
	}
};

var componentActive = function(root, threshold)
{
	for(var body = root; body; body = body.nodeNext){
		if(body.nodeIdleTime < threshold) return true;
	}
	
	return false;
};

Space.prototype.processComponents = function(dt)
{
	var sleep = (this.sleepTimeThreshold !== Infinity);
	var bodies = this.bodies;

	// These checks can be removed at some stage (if DEBUG == undefined)
	for(var i=0; i<bodies.length; i++){
		var body = bodies[i];
		
		assertSoft(body.nodeNext === null, "Internal Error: Dangling next pointer detected in contact graph.");
		assertSoft(body.nodeRoot === null, "Internal Error: Dangling root pointer detected in contact graph.");
	}

	// Calculate the kinetic energy of all the bodies
	if(sleep){
		var dv = this.idleSpeedThreshold;
		var dvsq = (dv ? dv*dv : vlengthsq(this.gravity)*dt*dt);
	
		for(var i=0; i<bodies.length; i++){
			var body = bodies[i];

			// Need to deal with infinite mass objects
			var keThreshold = (dvsq ? body.m*dvsq : 0);
			body.nodeIdleTime = (body.kineticEnergy() > keThreshold ? 0 : body.nodeIdleTime + dt);
		}
	}

	// Awaken any sleeping bodies found and then push arbiters to the bodies' lists.
	var arbiters = this.arbiters;
	for(var i=0, count=arbiters.length; i<count; i++){
		var arb = arbiters[i];
		var a = arb.body_a, b = arb.body_b;
	
		if(sleep){	
			if((b.isRogue() && !b.isStatic()) || a.isSleeping()) a.activate();
			if((a.isRogue() && !a.isStatic()) || b.isSleeping()) b.activate();
		}
		
		a.pushArbiter(arb);
		b.pushArbiter(arb);
	}
	
	if(sleep){
		// Bodies should be held active if connected by a joint to a non-static rouge body.
		var constraints = this.constraints;
		for(var i=0; i<constraints.length; i++){
			var constraint = constraints[i];
			var a = constraint.a, b = constraint.b;
			
			if(b.isRogue() && !b.isStatic()) a.activate();
			if(a.isRogue() && !a.isStatic()) b.activate();
		}
		
		// Generate components and deactivate sleeping ones
		for(var i=0; i<bodies.length;){
			var body = bodies[i];
			
			if(componentRoot(body) === null){
				// Body not in a component yet. Perform a DFS to flood fill mark 
				// the component in the contact graph using this body as the root.
				floodFillComponent(body, body);
				
				// Check if the component should be put to sleep.
				if(!componentActive(body, this.sleepTimeThreshold)){
					this.sleepingComponents.push(body);
					for(var other = body; other; other = other.nodeNext){
						this.deactivateBody(other);
					}
					
					// deactivateBody() removed the current body from the list.
					// Skip incrementing the index counter.
					continue;
				}
			}
			
			i++;
			
			// Only sleeping bodies retain their component node pointers.
			body.nodeRoot = null;
			body.nodeNext = null;
		}
	}
};

Body.prototype.sleep = function()
{
	this.sleepWithGroup(null);
};

Body.prototype.sleepWithGroup = function(group){
	assert(!this.isStatic() && !this.isRogue(), "Rogue and static bodies cannot be put to sleep.");
	
	var space = this.space;
	assert(space, "Cannot put a rogue body to sleep.");
	assert(!space.locked, "Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback.");
	assert(group === null || group.isSleeping(), "Cannot use a non-sleeping body as a group identifier.");
	
	if(this.isSleeping()){
		assert(componentRoot(this) === componentRoot(group), "The body is already sleeping and it's group cannot be reassigned.");
		return;
	}
	
	for(var i = 0; i < this.shapeList.length; i++){
		this.shapeList[i].update(this.p, this.rot);
	}
	space.deactivateBody(this);
	
	if(group){
		var root = componentRoot(group);
		
		this.nodeRoot = root;
		this.nodeNext = root.nodeNext;
		this.nodeIdleTime = 0;
		
		root.nodeNext = this;
	} else {
		this.nodeRoot = this;
		this.nodeNext = null;
		this.nodeIdleTime = 0;
		
		space.sleepingComponents.push(this);
	}
	
	deleteObjFromList(space.bodies, this);
};

Space.prototype.activateShapesTouchingShape = function(shape){
	if(this.sleepTimeThreshold !== Infinity){
		this.shapeQuery(shape, function(shape, points) {
			shape.body.activate();
		});
	}
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Point query functions

/// Query the space at a point and call @c func for each shape found.
Space.prototype.pointQuery = function(point, layers, group, func)
{
	var helper = function(shape){
		if(
			!(shape.group && group === shape.group) && (layers & shape.layers) &&
			shape.pointQuery(point)
		){
			func(shape);
		}
	};

	var bb = new BB(point.x, point.y, point.x, point.y);
	this.lock(); {
		this.activeShapes.query(bb, helper);
		this.staticShapes.query(bb, helper);
	} this.unlock(true);
};

/// Query the space at a point and return the first shape found. Returns null if no shapes were found.
Space.prototype.pointQueryFirst = function(point, layers, group)
{
	var outShape = null;
	this.pointQuery(point, layers, group, function(shape) {
		if(!shape.sensor) outShape = shape;
	});
	
	return outShape;
};

// Nearest point query functions

Space.prototype.nearestPointQuery = function(point, maxDistance, layers, group, func)
{
	var helper = function(shape){
		if(!(shape.group && group === shape.group) && (layers & shape.layers)){
			var info = shape.nearestPointQuery(point);

			if(info.d < maxDistance) func(shape, info.d, info.p);
		}
	};

	var bb = bbNewForCircle(point, maxDistance);

	this.lock(); {
		this.activeShapes.query(bb, helper);
		this.staticShapes.query(bb, helper);
	} this.unlock(true);
};

// Unlike the version in chipmunk, this returns a NearestPointQueryInfo object. Use its .shape
// property to get the actual shape.
Space.prototype.nearestPointQueryNearest = function(point, maxDistance, layers, group)
{
	var out;

	var helper = function(shape){
		if(!(shape.group && group === shape.group) && (layers & shape.layers) && !shape.sensor){
			var info = shape.nearestPointQuery(point);

			if(info.d < maxDistance && (!out || info.d < out.d)) out = info;
		}
	};

	var bb = bbNewForCircle(point, maxDistance);
	this.activeShapes.query(bb, helper);
	this.staticShapes.query(bb, helper);

	return out;
};

/// Perform a directed line segment query (like a raycast) against the space calling @c func for each shape intersected.
Space.prototype.segmentQuery = function(start, end, layers, group, func)
{
	var helper = function(shape){
		var info;
		
		if(
			!(shape.group && group === shape.group) && (layers & shape.layers) &&
			(info = shape.segmentQuery(start, end))
		){
			func(shape, info.t, info.n);
		}
		
		return 1;
	};

	this.lock(); {
		this.staticShapes.segmentQuery(start, end, 1, helper);
		this.activeShapes.segmentQuery(start, end, 1, helper);
	} this.unlock(true);
};

/// Perform a directed line segment query (like a raycast) against the space and return the first shape hit.
/// Returns null if no shapes were hit.
Space.prototype.segmentQueryFirst = function(start, end, layers, group)
{
	var out = null;

	var helper = function(shape){
		var info;
		
		if(
			!(shape.group && group === shape.group) && (layers & shape.layers) &&
			!shape.sensor &&
			(info = shape.segmentQuery(start, end)) &&
			(out === null || info.t < out.t)
		){
			out = info;
		}
		
		return out ? out.t : 1;
	};

	this.staticShapes.segmentQuery(start, end, 1, helper);
	this.activeShapes.segmentQuery(start, end, out ? out.t : 1, helper);
	
	return out;
};

/// Perform a fast rectangle query on the space calling @c func for each shape found.
/// Only the shape's bounding boxes are checked for overlap, not their full shape.
Space.prototype.bbQuery = function(bb, layers, group, func)
{
	var helper = function(shape){
		if(
			!(shape.group && group === shape.group) && (layers & shape.layers) &&
			bbIntersects2(bb, shape.bb_l, shape.bb_b, shape.bb_r, shape.bb_t)
		){
			func(shape);
		}
	};
	
	this.lock(); {
		this.activeShapes.query(bb, helper);
		this.staticShapes.query(bb, helper);
	} this.unlock(true);
};

/// Query a space for any shapes overlapping the given shape and call @c func for each shape found.
Space.prototype.shapeQuery = function(shape, func)
{
	var body = shape.body;

	//var bb = (body ? shape.update(body.p, body.rot) : shape.bb);
	if(body){
		shape.update(body.p, body.rot);
	}
	var bb = new BB(shape.bb_l, shape.bb_b, shape.bb_r, shape.bb_t);

	//shapeQueryContext context = {func, data, false};
	var anyCollision = false;
	
	var helper = function(b){
		var a = shape;
		// Reject any of the simple cases
		if(
			(a.group && a.group === b.group) ||
			!(a.layers & b.layers) ||
			a === b
		) return;
		
		var contacts;
		
		// Shape 'a' should have the lower shape type. (required by collideShapes() )
		if(a.collisionCode <= b.collisionCode){
			contacts = collideShapes(a, b);
		} else {
			contacts = collideShapes(b, a);
			for(var i=0; i<contacts.length; i++) contacts[i].n = vneg(contacts[i].n);
		}
		
		if(contacts.length){
			anyCollision = !(a.sensor || b.sensor);
			
			if(func){
				var set = new Array(contacts.length);
				for(var i=0; i<contacts.length; i++){
					set[i] = new ContactPoint(contacts[i].p, contacts[i].n, contacts[i].dist);
				}
				
				func(b, set);
			}
		}
	};

	this.lock(); {
		this.activeShapes.query(bb, helper);
		this.staticShapes.query(bb, helper);
	} this.unlock(true);
	
	return anyCollision;
};

/* Copyright (c) 2007 Scott Lembcke
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// **** Post Step Callback Functions

/// Schedule a post-step callback to be called when cpSpaceStep() finishes.
Space.prototype.addPostStepCallback = function(func)
{
	assertSoft(this.locked,
		"Adding a post-step callback when the space is not locked is unnecessary. " +
		"Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query.");

	this.postStepCallbacks.push(func);
};

Space.prototype.runPostStepCallbacks = function()
{
	// Don't cache length because post step callbacks may add more post step callbacks
	// directly or indirectly.
	for(var i = 0; i < this.postStepCallbacks.length; i++){
		this.postStepCallbacks[i]();
	}
	this.postStepCallbacks = [];
};

// **** Locking Functions

Space.prototype.lock = function()
{
	this.locked++;
};

Space.prototype.unlock = function(runPostStep)
{
	this.locked--;
	assert(this.locked >= 0, "Internal Error: Space lock underflow.");

	if(this.locked === 0 && runPostStep){
		var waking = this.rousedBodies;
		for(var i=0; i<waking.length; i++){
			this.activateBody(waking[i]);
		}

		waking.length = 0;

		this.runPostStepCallbacks();
	}
};

// **** Contact Buffer Functions

/* josephg:
 *
 * This code might be faster in JS than just allocating objects each time - I'm
 * really not sure. If the contact buffer solution is used, there will also
 * need to be changes in cpCollision.js to fill a passed array instead of creating
 * new arrays each time.
 *
 * TODO: Benchmark me once chipmunk is working.
 */

/*
var ContactBuffer = function(stamp, splice)
{
	this.stamp = stamp;
	// Contact buffers are a circular linked list.
	this.next = splice ? splice.next : this;
	this.contacts = [];
};

Space.prototype.pushFreshContactBuffer = function()
{
	var stamp = this.stamp;

	var head = this.contactBuffersHead;

	if(!head){
		// No buffers have been allocated, make one
		this.contactBuffersHead = new ContactBuffer(stamp, null);
	} else if(stamp - head.next.stamp > this.collisionPersistence){
		// The tail buffer is available, rotate the ring
		var tail = head.next;
		tail.stamp = stamp;
		tail.contacts.length = 0;
		this.contactBuffersHead = tail;
	} else {
		// Allocate a new buffer and push it into the ring
		var buffer = new ContactBuffer(stamp, head);
		this.contactBuffersHead = head.next = buffer;
	}
};

cpContact *
cpContactBufferGetArray(cpSpace *space)
{
	if(space.contactBuffersHead.numContacts + CP_MAX_CONTACTS_PER_ARBITER > CP_CONTACTS_BUFFER_SIZE){
		// contact buffer could overflow on the next collision, push a fresh one.
		space.pushFreshContactBuffer();
	}

	cpContactBufferHeader *head = space.contactBuffersHead;
	return ((cpContactBuffer *)head)->contacts + head.numContacts;
}

void
cpSpacePushContacts(cpSpace *space, int count)
{
	cpAssertHard(count <= CP_MAX_CONTACTS_PER_ARBITER, "Internal Error: Contact buffer overflow!");
	space.contactBuffersHead.numContacts += count;
}

static void
cpSpacePopContacts(cpSpace *space, int count){
	space.contactBuffersHead.numContacts -= count;
}
*/

// **** Collision Detection Functions

/* Use this to re-enable object pools.
static void *
cpSpaceArbiterSetTrans(cpShape **shapes, cpSpace *space)
{
	if(space.pooledArbiters.num == 0){
		// arbiter pool is exhausted, make more
		int count = CP_BUFFER_BYTES/sizeof(cpArbiter);
		cpAssertHard(count, "Internal Error: Buffer size too small.");

		cpArbiter *buffer = (cpArbiter *)cpcalloc(1, CP_BUFFER_BYTES);
		cpArrayPush(space.allocatedBuffers, buffer);

		for(int i=0; i<count; i++) cpArrayPush(space.pooledArbiters, buffer + i);
	}

	return cpArbiterInit((cpArbiter *)cpArrayPop(space.pooledArbiters), shapes[0], shapes[1]);
}*/

// Callback from the spatial hash.
Space.prototype.makeCollideShapes = function()
{
	// It would be nicer to use .bind() or something, but this is faster.
	var space_ = this;
	return function(a, b){
		var space = space_;

		// Reject any of the simple cases
		if(
			// BBoxes must overlap
			//!bbIntersects(a.bb, b.bb)
			!(a.bb_l <= b.bb_r && b.bb_l <= a.bb_r && a.bb_b <= b.bb_t && b.bb_b <= a.bb_t)
			// Don't collide shapes attached to the same body.
			|| a.body === b.body
			// Don't collide objects in the same non-zero group
			|| (a.group && a.group === b.group)
			// Don't collide objects that don't share at least on layer.
			|| !(a.layers & b.layers)
		) return;

		var handler = space.lookupHandler(a.collision_type, b.collision_type);

		var sensor = a.sensor || b.sensor;
		if(sensor && handler === defaultCollisionHandler) return;

		// Shape 'a' should have the lower shape type. (required by cpCollideShapes() )
		if(a.collisionCode > b.collisionCode){
			var temp = a;
			a = b;
			b = temp;
		}

		// Narrow-phase collision detection.
		//cpContact *contacts = cpContactBufferGetArray(space);
		//int numContacts = cpCollideShapes(a, b, contacts);
		var contacts = collideShapes(a, b);
		if(contacts.length === 0) return; // Shapes are not colliding.
		//cpSpacePushContacts(space, numContacts);

		// Get an arbiter from space.arbiterSet for the two shapes.
		// This is where the persistant contact magic comes from.
		var arbHash = hashPair(a.hashid, b.hashid);
		var arb = space.cachedArbiters[arbHash];
		if (!arb){
			arb = space.cachedArbiters[arbHash] = new Arbiter(a, b);
		}

		arb.update(contacts, handler, a, b);

		// Call the begin function first if it's the first step
		if(arb.state == 'first coll' && !handler.begin(arb, space)){
			arb.ignore(); // permanently ignore the collision until separation
		}

		if(
			// Ignore the arbiter if it has been flagged
			(arb.state !== 'ignore') &&
			// Call preSolve
			handler.preSolve(arb, space) &&
			// Process, but don't add collisions for sensors.
			!sensor
		){
			space.arbiters.push(arb);
		} else {
			//cpSpacePopContacts(space, numContacts);

			arb.contacts = null;

			// Normally arbiters are set as used after calling the post-solve callback.
			// However, post-solve callbacks are not called for sensors or arbiters rejected from pre-solve.
			if(arb.state !== 'ignore') arb.state = 'normal';
		}

		// Time stamp the arbiter so we know it was used recently.
		arb.stamp = space.stamp;
	};
};

// Hashset filter func to throw away old arbiters.
Space.prototype.arbiterSetFilter = function(arb)
{
	var ticks = this.stamp - arb.stamp;

	var a = arb.body_a, b = arb.body_b;

	// TODO should make an arbiter state for this so it doesn't require filtering arbiters for
	// dangling body pointers on body removal.
	// Preserve arbiters on sensors and rejected arbiters for sleeping objects.
	// This prevents errant separate callbacks from happenening.
	if(
		(a.isStatic() || a.isSleeping()) &&
		(b.isStatic() || b.isSleeping())
	){
		return true;
	}

	// Arbiter was used last frame, but not this one
	if(ticks >= 1 && arb.state != 'cached'){
		arb.callSeparate(this);
		arb.state = 'cached';
	}

	if(ticks >= this.collisionPersistence){
		arb.contacts = null;

		//cpArrayPush(this.pooledArbiters, arb);
		return false;
	}

	return true;
};

// **** All Important cpSpaceStep() Function

var updateFunc = function(shape)
{
	var body = shape.body;
	shape.update(body.p, body.rot);
};

/// Step the space forward in time by @c dt.
Space.prototype.step = function(dt)
{
	// don't step if the timestep is 0!
	if(dt === 0) return;

	assert(vzero.x === 0 && vzero.y === 0, "vzero is invalid");

	this.stamp++;

	var prev_dt = this.curr_dt;
	this.curr_dt = dt;

    var i;
    var j;
    var hash;
	var bodies = this.bodies;
	var constraints = this.constraints;
	var arbiters = this.arbiters;

	// Reset and empty the arbiter lists.
	for(i=0; i<arbiters.length; i++){
		var arb = arbiters[i];
		arb.state = 'normal';

		// If both bodies are awake, unthread the arbiter from the contact graph.
		if(!arb.body_a.isSleeping() && !arb.body_b.isSleeping()){
			arb.unthread();
		}
	}
	arbiters.length = 0;

	this.lock(); {
		// Integrate positions
		for(i=0; i<bodies.length; i++){
			bodies[i].position_func(dt);
		}

		// Find colliding pairs.
		//this.pushFreshContactBuffer();
		this.activeShapes.each(updateFunc);
		this.activeShapes.reindexQuery(this.collideShapes);
	} this.unlock(false);

	// Rebuild the contact graph (and detect sleeping components if sleeping is enabled)
	this.processComponents(dt);

	this.lock(); {
		// Clear out old cached arbiters and call separate callbacks
		for(hash in this.cachedArbiters) {
			if(!this.arbiterSetFilter(this.cachedArbiters[hash])) {
				delete this.cachedArbiters[hash];
			}
		}

		// Prestep the arbiters and constraints.
		var slop = this.collisionSlop;
		var biasCoef = 1 - Math.pow(this.collisionBias, dt);
		for(i=0; i<arbiters.length; i++){
			arbiters[i].preStep(dt, slop, biasCoef);
		}

		for(i=0; i<constraints.length; i++){
			var constraint = constraints[i];

			constraint.preSolve(this);
			constraint.preStep(dt);
		}

		// Integrate velocities.
		var damping = Math.pow(this.damping, dt);
		var gravity = this.gravity;
		for(i=0; i<bodies.length; i++){
			bodies[i].velocity_func(gravity, damping, dt);
		}

		// Apply cached impulses
		var dt_coef = (prev_dt === 0 ? 0 : dt/prev_dt);
		for(i=0; i<arbiters.length; i++){
			arbiters[i].applyCachedImpulse(dt_coef);
		}

		for(i=0; i<constraints.length; i++){
			constraints[i].applyCachedImpulse(dt_coef);
		}

		// Run the impulse solver.
		for(i=0; i<this.iterations; i++){
			for(j=0; j<arbiters.length; j++){
				arbiters[j].applyImpulse();
			}

			for(j=0; j<constraints.length; j++){
				constraints[j].applyImpulse();
			}
		}

		// Run the constraint post-solve callbacks
		for(i=0; i<constraints.length; i++){
			constraints[i].postSolve(this);
		}

		// run the post-solve callbacks
		for(i=0; i<arbiters.length; i++){
			arbiters[i].handler.postSolve(arbiters[i], this);
		}
	} this.unlock(true);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// These are utility routines to use when creating custom constraints.
// I'm not sure if this should be part of the private API or not.
// I should probably clean up the naming conventions if it is...

//#define J_MAX(constraint, dt) (((cpConstraint *)constraint)->maxForce*(dt))

// a and b are bodies.
var relative_velocity = function(a, b, r1, r2){
	//var v1_sum = vadd(a.v, vmult(vperp(r1), a.w));
	var v1_sumx = a.vx + (-r1.y) * a.w;
	var v1_sumy = a.vy + ( r1.x) * a.w;

	//var v2_sum = vadd(b.v, vmult(vperp(r2), b.w));
	var v2_sumx = b.vx + (-r2.y) * b.w;
	var v2_sumy = b.vy + ( r2.x) * b.w;
	
//	return vsub(v2_sum, v1_sum);
	return new Vect(v2_sumx - v1_sumx, v2_sumy - v1_sumy);
};

var normal_relative_velocity = function(a, b, r1, r2, n){
	//return vdot(relative_velocity(a, b, r1, r2), n);
	var v1_sumx = a.vx + (-r1.y) * a.w;
	var v1_sumy = a.vy + ( r1.x) * a.w;
	var v2_sumx = b.vx + (-r2.y) * b.w;
	var v2_sumy = b.vy + ( r2.x) * b.w;

	return vdot2(v2_sumx - v1_sumx, v2_sumy - v1_sumy, n.x, n.y);
};

/*
var apply_impulse = function(body, j, r){
	body.v = vadd(body.v, vmult(j, body.m_inv));
	body.w += body.i_inv*vcross(r, j);
};

var apply_impulses = function(a, b, r1, r2, j)
{
	apply_impulse(a, vneg(j), r1);
	apply_impulse(b, j, r2);
};
*/

var apply_impulse = function(body, jx, jy, r){
//	body.v = body.v.add(vmult(j, body.m_inv));
	body.vx += jx * body.m_inv;
	body.vy += jy * body.m_inv;
//	body.w += body.i_inv*vcross(r, j);
	body.w += body.i_inv*(r.x*jy - r.y*jx);
};

var apply_impulses = function(a, b, r1, r2, jx, jy)
{
	apply_impulse(a, -jx, -jy, r1);
	apply_impulse(b, jx, jy, r2);
};

var apply_bias_impulse = function(body, jx, jy, r)
{
	//body.v_bias = vadd(body.v_bias, vmult(j, body.m_inv));
	body.v_biasx += jx * body.m_inv;
	body.v_biasy += jy * body.m_inv;
	body.w_bias += body.i_inv*vcross2(r.x, r.y, jx, jy);
};

/*
var apply_bias_impulses = function(a, b, r1, r2, j)
{
	apply_bias_impulse(a, vneg(j), r1);
	apply_bias_impulse(b, j, r2);
};*/

var k_scalar_body = function(body, r, n)
{
	var rcn = vcross(r, n);
	return body.m_inv + body.i_inv*rcn*rcn;
};

var k_scalar = function(a, b, r1, r2, n)
{
	var value = k_scalar_body(a, r1, n) + k_scalar_body(b, r2, n);
	assertSoft(value !== 0, "Unsolvable collision or constraint.");
	
	return value;
};

// k1 and k2 are modified by the function to contain the outputs.
var k_tensor = function(a, b, r1, r2, k1, k2)
{
	// calculate mass matrix
	// If I wasn't lazy and wrote a proper matrix class, this wouldn't be so gross...
	var k11, k12, k21, k22;
	var m_sum = a.m_inv + b.m_inv;
	
	// start with I*m_sum
	k11 = m_sum; k12 = 0;
	k21 = 0;     k22 = m_sum;
	
	// add the influence from r1
	var a_i_inv = a.i_inv;
	var r1xsq =  r1.x * r1.x * a_i_inv;
	var r1ysq =  r1.y * r1.y * a_i_inv;
	var r1nxy = -r1.x * r1.y * a_i_inv;
	k11 += r1ysq; k12 += r1nxy;
	k21 += r1nxy; k22 += r1xsq;
	
	// add the influnce from r2
	var b_i_inv = b.i_inv;
	var r2xsq =  r2.x * r2.x * b_i_inv;
	var r2ysq =  r2.y * r2.y * b_i_inv;
	var r2nxy = -r2.x * r2.y * b_i_inv;
	k11 += r2ysq; k12 += r2nxy;
	k21 += r2nxy; k22 += r2xsq;
	
	// invert
	var determinant = k11*k22 - k12*k21;
	assertSoft(determinant !== 0, "Unsolvable constraint.");
	
	var det_inv = 1/determinant;

	k1.x =  k22*det_inv; k1.y = -k12*det_inv;
	k2.x = -k21*det_inv; k2.y =  k11*det_inv;
};

var mult_k = function(vr, k1, k2)
{
	return new Vect(vdot(vr, k1), vdot(vr, k2));
};

var bias_coef = function(errorBias, dt)
{
	return 1 - Math.pow(errorBias, dt);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// TODO: Comment me!

// a and b are bodies that the constraint applies to.
var Constraint = cp.Constraint = function(a, b)
{
	/// The first body connected to this constraint.
	this.a = a;
	/// The second body connected to this constraint.
	this.b = b;
	
	this.space = null;

	this.next_a = null;
	this.next_b = null;
	
	/// The maximum force that this constraint is allowed to use.
	this.maxForce = Infinity;
	/// The rate at which joint error is corrected.
	/// Defaults to pow(1 - 0.1, 60) meaning that it will
	/// correct 10% of the error every 1/60th of a second.
	this.errorBias = Math.pow(1 - 0.1, 60);
	/// The maximum rate at which joint error is corrected.
	this.maxBias = Infinity;
};

Constraint.prototype.activateBodies = function()
{
	if(this.a) this.a.activate();
	if(this.b) this.b.activate();
};

/// These methods are overridden by the constraint itself.
Constraint.prototype.preStep = function(dt) {};
Constraint.prototype.applyCachedImpulse = function(dt_coef) {};
Constraint.prototype.applyImpulse = function() {};
Constraint.prototype.getImpulse = function() { return 0; };

/// Function called before the solver runs. This can be overridden by the user
/// to customize the constraint.
/// Animate your joint anchors, update your motor torque, etc.
Constraint.prototype.preSolve = function(space) {};

/// Function called after the solver runs. This can be overridden by the user
/// to customize the constraint.
/// Use the applied impulse to perform effects like breakable joints.
Constraint.prototype.postSolve = function(space) {};

Constraint.prototype.next = function(body)
{
	return (this.a === body ? this.next_a : this.next_b);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var PinJoint = cp.PinJoint = function(a, b, anchr1, anchr2)
{
	Constraint.call(this, a, b);
	
	this.anchr1 = anchr1;
	this.anchr2 = anchr2;
	
	// STATIC_BODY_CHECK
	var p1 = (a ? vadd(a.p, vrotate(anchr1, a.rot)) : anchr1);
	var p2 = (b ? vadd(b.p, vrotate(anchr2, b.rot)) : anchr2);
	this.dist = vlength(vsub(p2, p1));
	
	assertSoft(this.dist > 0, "You created a 0 length pin joint. A pivot joint will be much more stable.");

	this.r1 = this.r2 = null;
	this.n = null;
	this.nMass = 0;

	this.jnAcc = this.jnMax = 0;
	this.bias = 0;
};

PinJoint.prototype = Object.create(Constraint.prototype);

PinJoint.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	this.r1 = vrotate(this.anchr1, a.rot);
	this.r2 = vrotate(this.anchr2, b.rot);
	
	var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	var dist = vlength(delta);
	this.n = vmult(delta, 1/(dist ? dist : Infinity));
	
	// calculate mass normal
	this.nMass = 1/k_scalar(a, b, this.r1, this.r2, this.n);
	
	// calculate bias velocity
	var maxBias = this.maxBias;
	this.bias = clamp(-bias_coef(this.errorBias, dt)*(dist - this.dist)/dt, -maxBias, maxBias);
	
	// compute max impulse
	this.jnMax = this.maxForce * dt;
};

PinJoint.prototype.applyCachedImpulse = function(dt_coef)
{
	var j = vmult(this.n, this.jnAcc*dt_coef);
	apply_impulses(this.a, this.b, this.r1, this.r2, j.x, j.y);
};

PinJoint.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	var n = this.n;

	// compute relative velocity
	var vrn = normal_relative_velocity(a, b, this.r1, this.r2, n);
	
	// compute normal impulse
	var jn = (this.bias - vrn)*this.nMass;
	var jnOld = this.jnAcc;
	this.jnAcc = clamp(jnOld + jn, -this.jnMax, this.jnMax);
	jn = this.jnAcc - jnOld;
	
	// apply impulse
	apply_impulses(a, b, this.r1, this.r2, n.x*jn, n.y*jn);
};

PinJoint.prototype.getImpulse = function()
{
	return Math.abs(this.jnAcc);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var SlideJoint = cp.SlideJoint = function(a, b, anchr1, anchr2, min, max)
{
	Constraint.call(this, a, b);
	
	this.anchr1 = anchr1;
	this.anchr2 = anchr2;
	this.min = min;
	this.max = max;

	this.r1 = this.r2 = this.n = null;
	this.nMass = 0;
	
	this.jnAcc = this.jnMax = 0;
	this.bias = 0;
};

SlideJoint.prototype = Object.create(Constraint.prototype);

SlideJoint.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	this.r1 = vrotate(this.anchr1, a.rot);
	this.r2 = vrotate(this.anchr2, b.rot);
	
	var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	var dist = vlength(delta);
	var pdist = 0;
	if(dist > this.max) {
		pdist = dist - this.max;
		this.n = vnormalize_safe(delta);
	} else if(dist < this.min) {
		pdist = this.min - dist;
		this.n = vneg(vnormalize_safe(delta));
	} else {
		this.n = vzero;
		this.jnAcc = 0;
	}
	
	// calculate mass normal
	this.nMass = 1/k_scalar(a, b, this.r1, this.r2, this.n);
	
	// calculate bias velocity
	var maxBias = this.maxBias;
	this.bias = clamp(-bias_coef(this.errorBias, dt)*pdist/dt, -maxBias, maxBias);
	
	// compute max impulse
	this.jnMax = this.maxForce * dt;
};

SlideJoint.prototype.applyCachedImpulse = function(dt_coef)
{
	var jn = this.jnAcc * dt_coef;
	apply_impulses(this.a, this.b, this.r1, this.r2, this.n.x * jn, this.n.y * jn);
};

SlideJoint.prototype.applyImpulse = function()
{
	if(this.n.x === 0 && this.n.y === 0) return;  // early exit

	var a = this.a;
	var b = this.b;
	
	var n = this.n;
	var r1 = this.r1;
	var r2 = this.r2;
		
	// compute relative velocity
	var vr = relative_velocity(a, b, r1, r2);
	var vrn = vdot(vr, n);
	
	// compute normal impulse
	var jn = (this.bias - vrn)*this.nMass;
	var jnOld = this.jnAcc;
	this.jnAcc = clamp(jnOld + jn, -this.jnMax, 0);
	jn = this.jnAcc - jnOld;
	
	// apply impulse
	apply_impulses(a, b, this.r1, this.r2, n.x * jn, n.y * jn);
};

SlideJoint.prototype.getImpulse = function()
{
	return Math.abs(this.jnAcc);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Pivot joints can also be created with (a, b, pivot);
var PivotJoint = cp.PivotJoint = function(a, b, anchr1, anchr2)
{
	Constraint.call(this, a, b);
	
	if(typeof anchr2 === 'undefined') {
		var pivot = anchr1;

		anchr1 = (a ? a.world2Local(pivot) : pivot);
		anchr2 = (b ? b.world2Local(pivot) : pivot);
	}

	this.anchr1 = anchr1;
	this.anchr2 = anchr2;

	this.r1 = this.r2 = vzero;
	
	this.k1 = new Vect(0,0); this.k2 = new Vect(0,0);

	this.jAcc = vzero;

	this.jMaxLen = 0;
	this.bias = vzero;
};

PivotJoint.prototype = Object.create(Constraint.prototype);

PivotJoint.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	this.r1 = vrotate(this.anchr1, a.rot);
	this.r2 = vrotate(this.anchr2, b.rot);
	
	// Calculate mass tensor. Result is stored into this.k1 & this.k2.
	k_tensor(a, b, this.r1, this.r2, this.k1, this.k2);
	
	// compute max impulse
	this.jMaxLen = this.maxForce * dt;
	
	// calculate bias velocity
	var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	this.bias = vclamp(vmult(delta, -bias_coef(this.errorBias, dt)/dt), this.maxBias);
};

PivotJoint.prototype.applyCachedImpulse = function(dt_coef)
{
	apply_impulses(this.a, this.b, this.r1, this.r2, this.jAcc.x * dt_coef, this.jAcc.y * dt_coef);
};

PivotJoint.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	
	var r1 = this.r1;
	var r2 = this.r2;
		
	// compute relative velocity
	var vr = relative_velocity(a, b, r1, r2);
	
	// compute normal impulse
	var j = mult_k(vsub(this.bias, vr), this.k1, this.k2);
	var jOld = this.jAcc;
	this.jAcc = vclamp(vadd(this.jAcc, j), this.jMaxLen);
	
	// apply impulse
	apply_impulses(a, b, this.r1, this.r2, this.jAcc.x - jOld.x, this.jAcc.y - jOld.y);
};

PivotJoint.prototype.getImpulse = function()
{
	return vlength(this.jAcc);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var GrooveJoint = cp.GrooveJoint = function(a, b, groove_a, groove_b, anchr2)
{
	Constraint.call(this, a, b);
	
	this.grv_a = groove_a;
	this.grv_b = groove_b;
	this.grv_n = vperp(vnormalize(vsub(groove_b, groove_a)));
	this.anchr2 = anchr2;
	
	this.grv_tn = null;
	this.clamp = 0;
	this.r1 = this.r2 = null;

	this.k1 = new Vect(0,0);
	this.k2 = new Vect(0,0);

	this.jAcc = vzero;
	this.jMaxLen = 0;
	this.bias = null;
};

GrooveJoint.prototype = Object.create(Constraint.prototype);

GrooveJoint.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	// calculate endpoints in worldspace
	var ta = a.local2World(this.grv_a);
	var tb = a.local2World(this.grv_b);

	// calculate axis
	var n = vrotate(this.grv_n, a.rot);
	var d = vdot(ta, n);
	
	this.grv_tn = n;
	this.r2 = vrotate(this.anchr2, b.rot);
	
	// calculate tangential distance along the axis of r2
	var td = vcross(vadd(b.p, this.r2), n);
	// calculate clamping factor and r2
	if(td <= vcross(ta, n)){
		this.clamp = 1;
		this.r1 = vsub(ta, a.p);
	} else if(td >= vcross(tb, n)){
		this.clamp = -1;
		this.r1 = vsub(tb, a.p);
	} else {
		this.clamp = 0;
		this.r1 = vsub(vadd(vmult(vperp(n), -td), vmult(n, d)), a.p);
	}
	
	// Calculate mass tensor
	k_tensor(a, b, this.r1, this.r2, this.k1, this.k2);	
	
	// compute max impulse
	this.jMaxLen = this.maxForce * dt;
	
	// calculate bias velocity
	var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	this.bias = vclamp(vmult(delta, -bias_coef(this.errorBias, dt)/dt), this.maxBias);
};

GrooveJoint.prototype.applyCachedImpulse = function(dt_coef)
{
	apply_impulses(this.a, this.b, this.r1, this.r2, this.jAcc.x * dt_coef, this.jAcc.y * dt_coef);
};

GrooveJoint.prototype.grooveConstrain = function(j){
	var n = this.grv_tn;
	var jClamp = (this.clamp*vcross(j, n) > 0) ? j : vproject(j, n);
	return vclamp(jClamp, this.jMaxLen);
};

GrooveJoint.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	
	var r1 = this.r1;
	var r2 = this.r2;
	
	// compute impulse
	var vr = relative_velocity(a, b, r1, r2);

	var j = mult_k(vsub(this.bias, vr), this.k1, this.k2);
	var jOld = this.jAcc;
	this.jAcc = this.grooveConstrain(vadd(jOld, j));
	
	// apply impulse
	apply_impulses(a, b, this.r1, this.r2, this.jAcc.x - jOld.x, this.jAcc.y - jOld.y);
};

GrooveJoint.prototype.getImpulse = function()
{
	return vlength(this.jAcc);
};

GrooveJoint.prototype.setGrooveA = function(value)
{
	this.grv_a = value;
	this.grv_n = vperp(vnormalize(vsub(this.grv_b, value)));
	
	this.activateBodies();
};

GrooveJoint.prototype.setGrooveB = function(value)
{
	this.grv_b = value;
	this.grv_n = vperp(vnormalize(vsub(value, this.grv_a)));
	
	this.activateBodies();
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var defaultSpringForce = function(spring, dist){
	return (spring.restLength - dist)*spring.stiffness;
};

var DampedSpring = cp.DampedSpring = function(a, b, anchr1, anchr2, restLength, stiffness, damping)
{
	Constraint.call(this, a, b);
	
	this.anchr1 = anchr1;
	this.anchr2 = anchr2;
	
	this.restLength = restLength;
	this.stiffness = stiffness;
	this.damping = damping;
	this.springForceFunc = defaultSpringForce;

	this.target_vrn = this.v_coef = 0;

	this.r1 = this.r2 = null;
	this.nMass = 0;
	this.n = null;
};

DampedSpring.prototype = Object.create(Constraint.prototype);

DampedSpring.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	this.r1 = vrotate(this.anchr1, a.rot);
	this.r2 = vrotate(this.anchr2, b.rot);
	
	var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	var dist = vlength(delta);
	this.n = vmult(delta, 1/(dist ? dist : Infinity));
	
	var k = k_scalar(a, b, this.r1, this.r2, this.n);
	assertSoft(k !== 0, "Unsolvable this.");
	this.nMass = 1/k;
	
	this.target_vrn = 0;
	this.v_coef = 1 - Math.exp(-this.damping*dt*k);

	// apply this force
	var f_spring = this.springForceFunc(this, dist);
	apply_impulses(a, b, this.r1, this.r2, this.n.x * f_spring * dt, this.n.y * f_spring * dt);
};

DampedSpring.prototype.applyCachedImpulse = function(dt_coef){};

DampedSpring.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	
	var n = this.n;
	var r1 = this.r1;
	var r2 = this.r2;

	// compute relative velocity
	var vrn = normal_relative_velocity(a, b, r1, r2, n);
	
	// compute velocity loss from drag
	var v_damp = (this.target_vrn - vrn)*this.v_coef;
	this.target_vrn = vrn + v_damp;
	
	v_damp *= this.nMass;
	apply_impulses(a, b, this.r1, this.r2, this.n.x * v_damp, this.n.y * v_damp);
};

DampedSpring.prototype.getImpulse = function()
{
	return 0;
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var defaultSpringTorque = function(spring, relativeAngle){
	return (relativeAngle - spring.restAngle)*spring.stiffness;
}

var DampedRotarySpring = cp.DampedRotarySpring = function(a, b, restAngle, stiffness, damping)
{
	Constraint.call(this, a, b);
	
	this.restAngle = restAngle;
	this.stiffness = stiffness;
	this.damping = damping;
	this.springTorqueFunc = defaultSpringTorque;

	this.target_wrn = 0;
	this.w_coef = 0;
	this.iSum = 0;
};

DampedRotarySpring.prototype = Object.create(Constraint.prototype);

DampedRotarySpring.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	var moment = a.i_inv + b.i_inv;
	assertSoft(moment !== 0, "Unsolvable spring.");
	this.iSum = 1/moment;

	this.w_coef = 1 - Math.exp(-this.damping*dt*moment);
	this.target_wrn = 0;

	// apply this torque
	var j_spring = this.springTorqueFunc(this, a.a - b.a)*dt;
	a.w -= j_spring*a.i_inv;
	b.w += j_spring*b.i_inv;
};

// DampedRotarySpring.prototype.applyCachedImpulse = function(dt_coef){};

DampedRotarySpring.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	
	// compute relative velocity
	var wrn = a.w - b.w;//normal_relative_velocity(a, b, r1, r2, n) - this.target_vrn;
	
	// compute velocity loss from drag
	// not 100% certain spring is derived correctly, though it makes sense
	var w_damp = (this.target_wrn - wrn)*this.w_coef;
	this.target_wrn = wrn + w_damp;
	
	//apply_impulses(a, b, this.r1, this.r2, vmult(this.n, v_damp*this.nMass));
	var j_damp = w_damp*this.iSum;
	a.w += j_damp*a.i_inv;
	b.w -= j_damp*b.i_inv;
};

// DampedRotarySpring.prototype.getImpulse = function(){ return 0; };

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var RotaryLimitJoint = cp.RotaryLimitJoint = function(a, b, min, max)
{
	Constraint.call(this, a, b);
	
	this.min = min;
	this.max = max;

	this.jAcc = 0;

	this.iSum = this.bias = this.jMax = 0;
};

RotaryLimitJoint.prototype = Object.create(Constraint.prototype);

RotaryLimitJoint.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	var dist = b.a - a.a;
	var pdist = 0;
	if(dist > this.max) {
		pdist = this.max - dist;
	} else if(dist < this.min) {
		pdist = this.min - dist;
	}
	
	// calculate moment of inertia coefficient.
	this.iSum = 1/(1/a.i + 1/b.i);
	
	// calculate bias velocity
	var maxBias = this.maxBias;
	this.bias = clamp(-bias_coef(this.errorBias, dt)*pdist/dt, -maxBias, maxBias);
	
	// compute max impulse
	this.jMax = this.maxForce * dt;

	// If the bias is 0, the joint is not at a limit. Reset the impulse.
	if(!this.bias) this.jAcc = 0;
};

RotaryLimitJoint.prototype.applyCachedImpulse = function(dt_coef)
{
	var a = this.a;
	var b = this.b;
	
	var j = this.jAcc*dt_coef;
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

RotaryLimitJoint.prototype.applyImpulse = function()
{
	if(!this.bias) return; // early exit

	var a = this.a;
	var b = this.b;
	
	// compute relative rotational velocity
	var wr = b.w - a.w;
	
	// compute normal impulse	
	var j = -(this.bias + wr)*this.iSum;
	var jOld = this.jAcc;
	if(this.bias < 0){
		this.jAcc = clamp(jOld + j, 0, this.jMax);
	} else {
		this.jAcc = clamp(jOld + j, -this.jMax, 0);
	}
	j = this.jAcc - jOld;
	
	// apply impulse
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

RotaryLimitJoint.prototype.getImpulse = function()
{
	return Math.abs(joint.jAcc);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var RatchetJoint = cp.RatchetJoint = function(a, b, phase, ratchet)
{
	Constraint.call(this, a, b);

	this.angle = 0;
	this.phase = phase;
	this.ratchet = ratchet;
	
	// STATIC_BODY_CHECK
	this.angle = (b ? b.a : 0) - (a ? a.a : 0);
	
	this.iSum = this.bias = this.jAcc = this.jMax = 0;
};

RatchetJoint.prototype = Object.create(Constraint.prototype);

RatchetJoint.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	var angle = this.angle;
	var phase = this.phase;
	var ratchet = this.ratchet;
	
	var delta = b.a - a.a;
	var diff = angle - delta;
	var pdist = 0;
	
	if(diff*ratchet > 0){
		pdist = diff;
	} else {
		this.angle = Math.floor((delta - phase)/ratchet)*ratchet + phase;
	}
	
	// calculate moment of inertia coefficient.
	this.iSum = 1/(a.i_inv + b.i_inv);
	
	// calculate bias velocity
	var maxBias = this.maxBias;
	this.bias = clamp(-bias_coef(this.errorBias, dt)*pdist/dt, -maxBias, maxBias);
	
	// compute max impulse
	this.jMax = this.maxForce * dt;

	// If the bias is 0, the joint is not at a limit. Reset the impulse.
	if(!this.bias) this.jAcc = 0;
};

RatchetJoint.prototype.applyCachedImpulse = function(dt_coef)
{
	var a = this.a;
	var b = this.b;
	
	var j = this.jAcc*dt_coef;
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

RatchetJoint.prototype.applyImpulse = function()
{
	if(!this.bias) return; // early exit

	var a = this.a;
	var b = this.b;
	
	// compute relative rotational velocity
	var wr = b.w - a.w;
	var ratchet = this.ratchet;
	
	// compute normal impulse	
	var j = -(this.bias + wr)*this.iSum;
	var jOld = this.jAcc;
	this.jAcc = clamp((jOld + j)*ratchet, 0, this.jMax*Math.abs(ratchet))/ratchet;
	j = this.jAcc - jOld;
	
	// apply impulse
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

RatchetJoint.prototype.getImpulse = function(joint)
{
	return Math.abs(joint.jAcc);
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var GearJoint = cp.GearJoint = function(a, b, phase, ratio)
{
	Constraint.call(this, a, b);
	
	this.phase = phase;
	this.ratio = ratio;
	this.ratio_inv = 1/ratio;
	
	this.jAcc = 0;

	this.iSum = this.bias = this.jMax = 0;
};

GearJoint.prototype = Object.create(Constraint.prototype);

GearJoint.prototype.preStep = function(dt)
{
	var a = this.a;
	var b = this.b;
	
	// calculate moment of inertia coefficient.
	this.iSum = 1/(a.i_inv*this.ratio_inv + this.ratio*b.i_inv);
	
	// calculate bias velocity
	var maxBias = this.maxBias;
	this.bias = clamp(-bias_coef(this.errorBias, dt)*(b.a*this.ratio - a.a - this.phase)/dt, -maxBias, maxBias);
	
	// compute max impulse
	this.jMax = this.maxForce * dt;
};

GearJoint.prototype.applyCachedImpulse = function(dt_coef)
{
	var a = this.a;
	var b = this.b;
	
	var j = this.jAcc*dt_coef;
	a.w -= j*a.i_inv*this.ratio_inv;
	b.w += j*b.i_inv;
};

GearJoint.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	
	// compute relative rotational velocity
	var wr = b.w*this.ratio - a.w;
	
	// compute normal impulse	
	var j = (this.bias - wr)*this.iSum;
	var jOld = this.jAcc;
	this.jAcc = clamp(jOld + j, -this.jMax, this.jMax);
	j = this.jAcc - jOld;
	
	// apply impulse
	a.w -= j*a.i_inv*this.ratio_inv;
	b.w += j*b.i_inv;
};

GearJoint.prototype.getImpulse = function()
{
	return Math.abs(this.jAcc);
};

GearJoint.prototype.setRatio = function(value)
{
	this.ratio = value;
	this.ratio_inv = 1/value;
	this.activateBodies();
};

/* Copyright (c) 2007 Scott Lembcke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var SimpleMotor = cp.SimpleMotor = function(a, b, rate)
{
	Constraint.call(this, a, b);
	
	this.rate = rate;
	
	this.jAcc = 0;

	this.iSum = this.jMax = 0;
};

SimpleMotor.prototype = Object.create(Constraint.prototype);

SimpleMotor.prototype.preStep = function(dt)
{
	// calculate moment of inertia coefficient.
	this.iSum = 1/(this.a.i_inv + this.b.i_inv);
	
	// compute max impulse
	this.jMax = this.maxForce * dt;
};

SimpleMotor.prototype.applyCachedImpulse = function(dt_coef)
{
	var a = this.a;
	var b = this.b;
	
	var j = this.jAcc*dt_coef;
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

SimpleMotor.prototype.applyImpulse = function()
{
	var a = this.a;
	var b = this.b;
	
	// compute relative rotational velocity
	var wr = b.w - a.w + this.rate;
	
	// compute normal impulse	
	var j = -wr*this.iSum;
	var jOld = this.jAcc;
	this.jAcc = clamp(jOld + j, -this.jMax, this.jMax);
	j = this.jAcc - jOld;
	
	// apply impulse
	a.w -= j*a.i_inv;
	b.w += j*b.i_inv;
};

SimpleMotor.prototype.getImpulse = function()
{
	return Math.abs(this.jAcc);
};

})();

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
 * Rectangle object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Rectangle.html">PIXI.Point</a>
 *
 * @class Rectangle
 */
gf.Rectangle = PIXI.Rectangle;

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
gf.version = '0.0.3';

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
     * Whether or not Blob URLs are supported
     *
     * @property blobs
     * @type bool
     */
    blobUrls: !!window.Blob && !!window.URL && !!window.URL.createObjectURL,

    /**
     * Whether or not typed arrays are supported
     *
     * @property typedArrays
     * @type bool
     */
    typedArrays: !!window.ArrayBuffer,

    /**
     * Whether or not the filesystem API is supported
     *
     * @property fileapi
     * @type bool
     */
    fileapi: !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob,

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

/**
 * Main game object, controls the entire instance of the game
 *
 * @class Game
 * @constructor
 * @param contId {String} The container for the new canvas we will create for the game
 * @param settings {Object} Options such as renderMethod and interactive (whether the stage can be clicked)
 */
gf.Game = function(contId, settings) {
    var w = settings.width || gf.utils.getStyle(this.container, 'width'),
        h = settings.height || gf.utils.getStyle(this.container, 'height');

    /**
     * The method used to render values to the screen (either webgl, or canvas)
     *
     * @property renderMethod
     * @type String
     * @default 'webgl'
     */
    this.renderMethod = 'webgl';

    /**
     * The player entities added into the game
     *
     * @property players
     * @type {Array}
     */
    this.players = [];

    /**
     * Raw PIXI.stage instance
     *
     * @property stage
     * @type PIXI.Stage
     * @readOnly
     */
    this.stage = new PIXI.Stage(
        settings.background || 0xff00ff,
        settings.interactive !== undefined ? settings.interactive : true
    );

    /**
     * Raw Clock instance for internal timing
     *
     * @property clock
     * @type Clock
     * @readOnly
     */
    this.clock = new gf.Clock(false);

    /**
     * Raw rendering engine
     *
     * @property renderer
     * @type PIXI.WebGLRenderer|PIXI.CanvasRenderer
     * @readOnly
     */
    this.renderer = null;

    //if they speciy a method, check if it is available
    if(settings.renderMethod) {
        if(!gf.support[settings.renderMethod]) {
            throw 'Render method ' + settings.renderMethod + ' is not supported by this browser!';
        }
        this.renderMethod = settings.renderMethod;
    }
    //if they don't specify a method, guess the best to use
    else {
        if(gf.support.webgl) this.renderMethod = 'webgl';
        else if(gf.support.canvas) this.renderMethod = 'canvas';
        else {
            throw 'Neither WebGL nor Canvas is supported by this browser!';
        }
    }

    //initialize the correct renderer
    if(this.renderMethod === 'webgl') {
        this.renderer = new PIXI.WebGLRenderer(w, h);
    } else if(this.renderMethod === 'canvas') {
        this.renderer = new PIXI.CanvasRenderer(w, h);
    }

    /**
     * The domElement that we are putting our rendering canvas into (the container)
     *
     * @property container
     * @type DOMELement
     * @readOnly
     */
    this.container = document.getElementById(contId);

    /**
     * Maximum Z value
     *
     * @property MAX_Z
     * @type {Number}
     * @default 500
     * @private
     * @readOnly
     */
    this.MAX_Z = 500;

    /**
     * The loader for this game instance
     *
     * @property loader
     * @type AssetLoader
     * @readOnly
     */
    this.loader = new gf.AssetLoader();

    /**
     * The GameStates added to the game
     *
     * @property states
     * @type Array
     * @readOnly
     */
    this.states = {};

    /**
     * The currently active GameState
     *
     * @property activeState
     * @type GameState
     * @readOnly
     */
    this.activeState = null;
    this._defaultState = new gf.GameState(this, '_default');

    //append the renderer view
    //this.renderer.view.style['z-index'] = opts.zIndex || 5;
    this.container.appendChild(this.renderer.view);

    //mixin user settings
    gf.utils.setValues(this, settings);

    this.enableState('_default');

    //define getters for common properties in GameState
    var self = this;
    ['audio', 'input', 'physics', 'camera', 'world'].forEach(function(prop) {
        self.__defineGetter__(prop, function() {
            return self.activeState[prop];
        });
    });

    //some docs for the getters above

    /**
     * The audio player for this game instance
     * (refers to the active GameState's audio instance)
     *
     * @property audio
     * @type AudioPlayer
     * @readOnly
     */

    /**
     * The input instance for this game
     * (refers to the active GameState's input instance)
     *
     * @property input
     * @type InputManager
     * @readOnly
     */

    /**
     * The physics system to simulate stuffs
     * (refers to the active GameState's physics instance)
     *
     * @property physics
     * @type PhysicsSystem
     * @readOnly
     */

    /**
     * The camera you view the scene through
     * (refers to the active GameState's camera instance)
     *
     * @property camera
     * @type Camera
     * @readOnly
     */

    /**
     * The world instance that holds all entites and the map
     * (refers to the active GameState's world instance)
     *
     * @property world
     * @type Map
     * @readOnly
     */
};

gf.inherits(gf.Game, Object, {
    /**
     * Allows you to resize the game area
     *
     * @method resize
     * @param width {Number} Width to resize to
     * @param height {Number} Height to resize to
     * @return {Game} Returns itself for chainability
     */
    resize: function(w, h) {
        this.renderer.resize(w, h);

        for(var i = 0, il = this.stage.children.length; i < il; ++i) {
            var o = this.stage.children[i];

            if(o.resize) o.resize(w, h);
        }

        return this;
    },
    /**
     * Adds an object to the current stage
     *
     * @method addChild
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    addChild: function(obj) {
        this.activeState.addChild(obj);

        return this;
    },
    /**
     * Removes a sprite from the stage
     *
     * @method removeChild
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    removeChild: function(obj) {
        if(obj) {
            if(obj instanceof gf.Gui)
                this.camera.removeChild(obj);
            else
                this.world.removeChild(obj);
        }

        return this;
    },
    addState: function(state) {
        var name = state.name;

        if(!name) {
            throw 'No state name could be determined, did you give the state a name when you created it?';
        } else if(this.states[name]) {
            throw 'A state with the name "' + name + '" already exists, did you try to add it twice?';
        } else {
            this.states[name] = state;
            this.stage.addChild(state);
        }
    },
    removeState: function(state) {
        var name = (typeof state === 'string') ? state : state.name;

        if(!name) {
            throw 'No state name could be determined, are you sure you passed me a game state?';
        } else if(!this.states[name]) {
            throw 'A state with the name "' + name + '" does not exist, are you sure you added it?';
        } else {
            //don't remove the default state
            if(name === '_default') return;

            //if this is the active state, revert to the default state
            if(name === this.activeState.name) {
                this.enableState('_default');
            }

            delete this.states[name];
        }
    },
    enableState: function(state) {
        var name = (typeof state === 'string') ? state : state.name;

        if(this.activeState)
            this.activeState.disable();

        this.activeState = this.states[name];

        this.activeState.enable();
    },
    /**
     * Loads the world map into the game
     *
     * @method loadWorld
     * @param world {String|Map} The map to load as the current world
     * @return {Game} Returns itself for chainability
     */
    loadWorld: function(world) {
        this.activeState.loadWorld(world);

        return this;
    },
    /**
     * Begins the render loop
     *
     * @method render
     * @return {Game} Returns itself for chainability
     */
    render: function() {
        this.clock.start();
        this._tick();

        return this;
    },
    /**
     * The looping render tick
     *
     * @method _tick
     * @private
     */
    _tick: function() {
        //start render loop
        window.requestAnimFrame(this._tick.bind(this));

        //get clock delta
        var dt = this.clock.getDelta();

        //update debug info
        gf.debug.update(dt);

        //update this game state
        this.activeState.update(dt);

        //render scene
        this.renderer.render(this.stage);
    }
});

/**
 * The AssetLoader loads and parses different game assets, such as sounds, textures,
 * TMX World JSON file (exported from the <a href="http://mapeditor.org">Tiled Editor</a>),
 * and Spritesheet JSON files (published from <a href="http://www.codeandweb.com/texturepacker">Texture Packer</a>).
 *
 * @class AssetLoader
 * @constructor
 * @param resources {Array} Array of resources to load when `.load()` is called
 * @example
 *      var loader = new AssetLoader(['/my/texture.png']);
 *      loader.load();
 *      //OR
 *      var loader = new AssetLoader();
 *      loader.load(['/my/texture.png']);
 */
gf.AssetLoader = function(resources) {
    //mixin the Event Target methods
    gf.EventTarget.call(this);

    /**
     * The array of asset URLs that are going to be loaded
     *
     * @property assetURLs
     * @type Array
     */
    this.resources = resources || [];

    /**
     * The count of remaining assets to load
     *
     * @property loadCount
     * @type Number
     * @readOnly
     */
    this.loadCount = 0;

    /**
     * A reference to the assets loaded by this loader. They are also put
     * in the global gf.assetCache
     *
     * @property assets
     * @type Object
     */
    this.assets = {};

    /**
     * A mapping of extensions to types. We assume all images are textures :)
     *
     * @property exts
     * @type Object
     * @readOnly
     * @private
     */
    this.exts = {
        imgs: ['jpeg', 'jpg', 'png', 'gif'],
        sound: ['mp3', 'ogg', 'wma', 'wav'],
        data: ['json']
    };
};

gf.inherits(gf.AssetLoader, Object, {
    /**
     * Starts the loading festivities. If called without any arguments it will load
     * the resources passed in at the ctor. If an array of resources is passed it will
     * load those instead.
     *
     * @method load
     * @param items {Array} Array of resources to load instead of the object's resources
     */
    load: function(items) {
        var resources = items || this.resources;

        for(var i = 0, il = resources.length; i < il; ++i) {
            var name = typeof resources[i] === 'string' ? resources[i] : resources[i].name,
                url = typeof resources[i] === 'string' ? resources[i] : (resources[i].src || resources[i].url || resources[i].uri),
                ext = url.split('.').pop().toLowerCase();

            //load a texture
            if(this.exts.imgs.indexOf(ext) !== -1) {
                this.loadTexture(name, url);
            }
            //load a sound clip
            else if(this.exts.sound.indexOf(ext) !== -1) {
                this.loadAudio(name, url);
            }
            //load a data file (world, spritesheet, etc)
            else if(this.exts.data.indexOf(ext) !== -1) {
                this.loadData(name, url);
            }
        }
    },
    /**
     * Adds a resource to the resources array.
     *
     * @method add
     * @param name {String} The name of the resource (to use as the key in the cache)
     * @param url {String} The URL to load the resource from (cross-domain not supported yet)
     */
    add: function(name, url) {
        this.resources.push({
            name: name,
            src: url
        });
    },
    /**
     * Loads a texture image and caches the result
     *
     * @method loadTexture
     * @param name {String} The name of the resource (to use as the key in the cache)
     * @param url {String} The URL to load the resource from (cross-domain not supported yet)
     * @return {Texture} Returns the texture object, so it can be used even before it is fully loaded
     */
    loadTexture: function(name, url) {
        this.loadCount++;

        var self = this,
            texture = gf.Texture.fromImage(url);

        this._storeAsset(name, texture);

        if(!texture.baseTexture.hasLoaded) {
            texture.baseTexture.on('loaded', function() {
                self.onAssetLoaded(null, 'texture', texture);
            });
            texture.baseTexture.source.onerror = function() {
                self.onAssetLoaded(new Error('Unable to load texture'), 'texture', texture);
            };
        } else {
            self.onAssetLoaded(null, 'texture', texture);
        }

        return texture;
    },
    /**
     * Loads an audio clip and caches the result
     *
     * @method loadAudio
     * @param name {String} The name of the resource (to use as the key in the cache)
     * @param url {String} The URL to load the resource from (cross-domain not supported yet)
     * @return {Audio} Returns the audio object, so it can be used even before it is fully loaded
     */
    loadAudio: function(name, url) {
        this.loadCount++;

        var self = this,
            audio = new Audio(url);

        audio.preload = 'auto';

        this._storeAsset(name, audio);

        audio.addEventListener('canplaythrough', function() {
            self.onAssetLoaded(null, 'audio', audio);
        }, false);

        audio.addEventListener('error', function() {
            self.onAssetLoaded(new Error('Failed to load audio "' + name + '" at url: ' + url), 'audio');
        }, false);

        audio.load();

        return audio;
    },
    /**
     * Loads a data (json) object. This is usually either SpriteSheet or TMX Map
     *
     * @method loadData
     * @param name {String} The name of the resource (to use as the key in the cache)
     * @param url {String} The URL to load the resource from (cross-domain not supported yet)
     */
    loadData: function(name, url) {
        this.loadCount++;

        var self = this,
            baseUrl = url.replace(/[^\/]*$/, '');

        gf.utils.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
            load: function(data) {
                //check some properties to see if this is a TiledMap Object
                if(data.orientation && data.layers && data.tilesets && data.version) {
                    self._storeAsset(name, data);

                    //loop through each layer and load the sprites (objectgroup types)
                    for(var i = 0, il = data.layers.length; i < il; ++i) {
                        var layer = data.layers[i];
                        if(layer.type !== 'objectgroup') continue;

                        //loop through each object, and load the textures
                        for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                            var obj = layer.objects[o];
                            if(!obj.properties.spritesheet) continue;

                            self.loadTexture(layer.name + '_' + obj.name + '_texture', obj.properties.spritesheet);
                        }
                    }

                    //loop through each tileset and load the texture
                    for(var s = 0, sl = data.tilesets.length; s < sl; ++s) {
                        var set = data.tilesets[s];
                        if(!set.image) continue;

                        self.loadTexture(set.name + '_texture', baseUrl + set.image);
                    }

                    self.onAssetLoaded(null, 'world', data);
                }
                //this is a sprite sheet (published from TexturePacker)
                else if(data.frames && data.meta) {
                    var textureUrl = baseUrl + data.meta.image,
                        texture =  gf.Texture.fromImage(textureUrl).baseTexture,
                        frames = data.frames,
                        assets = {};

                    for(var f in frames) {
                        var rect = frames[f].frame;

                        PIXI.TextureCache[f] = new gf.Texture(texture, { x: rect.x, y: rect.y, width: rect.w, height: rect.h });

                        if(frames[f].trimmed) {
                            PIXI.TextureCache[f].realSize = frames[f].spriteSourceSize;
                            PIXI.TextureCache[f].trim.x = 0;
                        }

                        assets[f] = PIXI.TextureCache[f];
                    }

                    self._storeAsset(name, assets);

                    if(texture.hasLoaded) {
                        self.onAssetLoaded(null, 'spritesheet', assets);
                    }
                    else {
                        texture.addEventListener('loaded', function() {
                            self.onAssetLoaded(null, 'spritesheet', assets);
                        });
                    }
                }
            },
            error: function(err) {
                self.onAssetLoaded(err);
            }
        });
    },
    /**
     * Called whenever an asset is loaded, to keep track of when to emit complete and progress.
     *
     * @method onAssetLoaded
     * @private
     * @param err {String} An option error if there was an issue loading that resource
     * @param type {String} The type of asset loaded (texture, audio, world, or spritesheet)
     * @param asset {Texture|Audio|Object} The actual asset that was loaded
     */
    onAssetLoaded: function(err, type, asset) {
        //texture (image)
        //audio
        //spritesheet (json sheet)
        //world (TiledEditor Json data)
        this.loadCount--;

        this.emit({ type: 'progress', error: err, assetType: type, asset: asset });
        if(this.onProgress) this.onProgress(err, type, asset);

        if(this.loadCount === 0) {
            this.dispatchEvent({ type: 'complete' });
            if(this.onComplete) this.onComplete();
        }
    },
    /**
     * Stores a reference to an asset into the global and local caches
     *
     * @method _storeAsset
     * @private
     * @param name {String} The name of the resource (to use as the key in the cache)
     * @param asset {Texture|Audio|Object} The actual asset that was loaded
     */
    _storeAsset: function(name, asset) {
        this.assets[name] = asset;
        gf.assetCache[name] = asset;
    }
});

/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 *
 * @class AudoPlayer
 * @constructor
 * @param game {Game} Game instance for this audio player
 */
gf.AudioPlayer = function(game) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The pool of audio objects to play sounds with
     *
     * @property playing
     * @type Object
     * @private
     * @readOnly
     */
    this.playing = {};

    /**
     * When stopping or starting a sound, this is the time index to reset to
     *
     * @property resetTime
     * @type number
     * @default 0
     */
    this.resetTime = 0;
};

gf.inherits(gf.AudioPlayer, Object, {
    _getOpen: function(id) {
        var chans = this.playing[id];

        //find an open channel
        for(var i = 0, il = chans.length; i < il; ++i) {
            var clip = chans[i++];
            if(clip.ended || !clip.currentTime) {
                clip.currentTime = this.resetTime;
                return clip;
            }
        }

        //create a new channel
        var sound = new Audio(chans[0].src);
        sound.preload = 'auto';
        sound.load();
        sound.channel = chans.length;
        chans.push(sound);

        return chans[chans.length - 1];
    },
    /**
     * Plays a loaded audio clip
     *
     * @method play
     * @param id {String|Object} The id of the sound clip to play. You can also pass the object returned from a previous play
     * @param options {Object} The options object you can pass properties like "loop," "volume," "channel"
     * @param callback {Function} The callback to call after the sound finishes playing
     * @return {Object} The object returned can be passed to any audio function in the
     *      first parameter to control that audio clip
     */
    play: function(id, opts, cb) {
        if(!gf.assetCache[id]) {
            throw 'Tried to play unloaded audio: ' + id;
        }

        if(typeof opts === 'function') {
            cb = opts;
            opts = null;
        }

        if(typeof id === 'object') {
            opts = id;
            id = opts.id;
        }

        opts = opts || {};

        opts.id = id;
        opts.loop = opts.loop || false;
        opts.volume = opts.volume || 1;

        //resume a paused channel
        if(opts.channel !== undefined && this.playing[id]) {
            this.playing[id][opts.channel].play();
            return opts;
        }

        //we haven't played this sound yet, create a new channel list
        if(!this.playing[id]) {
            this.playing[id] = [gf.assetCache[id]];
            this.playing[id][0].channel = 0;
        }

        var sound = this._getOpen(id);
        sound.loop = opts.loop;
        sound.volume = opts.volume;
        sound.play();

        opts.channel = sound.channel;

        if(!opts.loop) {
            var self = this,
                ended = function() {
                    sound.removeEventListener('ended', ended, false);
                    self.stop(opts);
                    if(cb) cb();
                };
            sound.addEventListener('ended', ended, false);
        }

        return opts;
    },
    /**
     * Stops a playing audio clip
     *
     * @method stop
     * @param id {String|Object} The id of the sound clip to stop. You can also pass the object returned from a previous play
     * @param channel {Number} The channel that the clip is playing on (not needed if you pass the clip object as the first parameter)
     */
    stop: function(id, channel) {
        if(typeof id === 'object') {
            channel = id.channel;
            id = id.id;
        }

        if(!this.playing[id]) return;
        if(!this.playing[id][channel]) return;

        this.playing[id][channel].pause();
        this.playing[id][channel].currentTime = this.resetTime;
        this.playing[id][channel].ended = true;
    },
    /**
     * Pauses a playing audio clip
     *
     * @method stop
     * @param id {String|Object} The id of the sound clip to pause. You can also pass the object returned from a previous play
     * @param channel {Number} The channel that the clip is playing on (not needed if you pass the clip object as the first parameter)
     */
    pause: function(id, channel) {
        if(typeof id === 'object') {
            channel = id.channel;
            id = id.id;
        }

        if(!this.playing[id]) return;
        if(!this.playing[id][channel]) return;

        this.playing[id][channel].pause();
    },
    /**
     * Plays all currently paused or stopped audio clips (only ones that have previously been started with gf.play)
     *
     * @method playAll
     */
    playAll: function() {
        for(var sid in this.playing) {
            var chans = this.playing[sid];

            for(var i = 0, il = chans.length; i < il; ++i)
                this.play({ id: sid, channel: i });
        }
    },
    /**
     * Stops all currently paused or playing audio clips
     *
     * @method stopAll
     */
    stopAll: function() {
        for(var sid in this.playing) {
            var chans = this.playing[sid];

            for(var i = 0, il = chans.length; i < il; ++i)
                this.stop(sid, i);
        }
    },
    /**
     * Pauses all currently playing audio clips
     *
     * @method pauseAll
     */
    pauseAll: function() {
        for(var sid in this.playing) {
            var chans = this.playing[sid];

            for(var i = 0, il = chans.length; i < il; ++i)
                this.pause(sid, i);
        }
    }
});
/**
 * The base display object, that anything being put on the screen inherits from
 *
 * @class DisplayObject
 * @extends PIXI.DisplayObjectContainer
 * @constructor
 */
gf.DisplayObject = function(game, pos, settings) {
    PIXI.DisplayObjectContainer.call(this);

    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    //mixin user's settings
    gf.utils.setValues(this, settings);

    this.setPosition(pos);

    //Add these properties in so that all objects can see them in the docs
    //these properties are inherited from PIXI.DisplayObjectContainer
    //most of these blocks are copied straight from PIXI source

    /**
     * [read-only] The of children of this object.
     * @property children {Array}
     */

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     * @property position
     * @type Point
     */

    /**
     * The scale factor of the object.
     * @property scale
     * @type Point
     */

    /**
     * The rotation of the object in radians.
     * @property rotation
     * @type Number
     */

    /**
     * The opacity of the object.
     * @property alpha
     * @type Number
     */

    /**
     * The visibility of the object.
     * @property visible
     * @type Boolean
     */

    /**
     * [read-only] The display object that contains this display object.
     * @property parent
     * @type DisplayObject
     */

    /**
     * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
     * @property stage
     * @type Stage
     */

    /**
     * This is the defined area that will pick up mouse / touch events. It is null by default.
     * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
     * @property hitArea
     * @type Rectangle
     */

    /*
     * MOUSE Callbacks
     */

    /**
     * A callback that is used when the users clicks on the displayObject with their mouse
     * @method click
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user clicks the mouse down over the sprite
     * @method mousedown
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the mouse that was over the displayObject
     * for this callback to be fired the mouse must have been pressed down over the displayObject
     * @method mouseup
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
     * for this callback to be fired, The touch must have started over the displayObject
     * @method mouseupoutside
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the users mouse rolls over the displayObject
     * @method mouseover
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the users mouse leaves the displayObject
     * @method mouseout
     * @param interactionData {InteractionData}
     */

    /*
     * TOUCH Callbacks
     */

    /**
     * A callback that is used when the users taps on the sprite with their finger
     * basically a touch version of click
     * @method tap
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user touch's over the displayObject
     * @method touchstart
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases a touch over the displayObject
     * @method touchend
     * @param interactionData {InteractionData}
     */

    /**
     * A callback that is used when the user releases the touch that was over the displayObject
     * for this callback to be fired, The touch must have started over the sprite
     * @method touchendoutside
     * @param interactionData {InteractionData}
     */

    /**
     * Inherited Methods
     */

    /**
     * Indicates if the sprite will have touch and mouse interactivity. It is false by default
     * @method setInteractive
     * @param interactive {Boolean}
     */

    /**
     * Adds a child to the object.
     * @method addChild
     * @param child {DisplayObject}
     */

    /**
     * Adds a child to the object at a specified index. If the index is out of bounds an error will be thrown
     * @method addChildAt
     * @param child {DisplayObject}
     * @param index {Number}
     */

    /**
     * Removes a child from the object.
     * @method removeChild
     * @param child {DisplayObject}
     */
};

gf.inherits(gf.DisplayObject, PIXI.DisplayObjectContainer, {
    resize: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.resize)
                o.resize.apply(o, arguments);
        }
    },
    removeAllChildren: function() {
        //remove each from the stage
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.stage) this.stage.__removeChild(this.children[i]);
        }

        //clear the list and let the GC clean up
        this.children = [];
    },
    forEachEntity: function(fn) {
        //go through each child and call recurse children for each one
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.children[i].forEachEntity)
                this.children[i].forEachEntity(fn);
        }

        if(fn && this instanceof gf.Entity)
            fn(this);
    },
    /**
     * Convenience method for setting the position of the Object.
     *
     * @method setPosition
     * @param x {Number|Array|Vector|Point} X coord to put the sprite at.
     *       If an Array, Vector, or Point is passed then the y parameter is ignored
     * @param y {Number} Y coord to put the sprite at
     * @return {DisplayObject} Returns itself for chainability
     * @example
     *      spr.setPosition(1, 1)
     *          .setPosition([5, 5])
     *          .setPosition(new gf.Point(10, 10))
     *          .setPosition(new gf.Vector(20, 20));
     */
    setPosition: function(x, y) {
        //passed in a vector or point object
        if(x instanceof gf.Vector || x instanceof gf.Point) {
            this.position.x = x.x;
            this.position.y = x.y;
        }
        //passed in an array of form [x, y]
        else if(x instanceof Array) {
            this.position.x = x[0];
            this.position.y = x[1];
        }
        //passed in a single number, that will apply to both
        else if(typeof x === 'number' && y === undefined) {
            this.position.x = x;
            this.position.y = x;
        }
        //passed in something else, lets try to massage it into numbers
        else {
            this.position.x = parseFloat(x, 10) || 0;
            this.position.y = parseFloat(y, 10) || 0;
        }

        return this;
    }
});
/**
 * A basic Camera object that provides some effects. It also will contain the HUD and GUI
 * to ensure they are using "screen-coords".
 * This camera instance is based on
 * <a href="https://github.com/photonstorm/kiwi-lite/blob/master/Kiwi%20Lite/Camera.ts">Kiwi-Lite's Camera</a>.
 *
 * TODO: Currently fade/flash don't show the colors. How should I actually show them, a PIXI.Sprite?
 *
 * @class Camera
 * @extends DisplayObject
 * @constructor
 * @param game {Game} The game this camera belongs to
 * @param settings {Object} Any settings you want to override the default properties with
 */
gf.Camera = function(game, pos, settings) {
    /**
     * The bounds of that the camera can move to
     *
     * @property bounds
     * @type PIXI.Rectangle
     * @readOnly
     * @private
     */
    this._bounds = new PIXI.Rectangle(0, 0, 0, 0);

    /**
     * When following an entity this is the space within the camera that it can move around
     * before the camera moves to track it.
     *
     * @property _deadzone
     * @type PIXI.Rectangle
     * @readOnly
     * @private
     */
    this._deadzone = null;

    /**
     * The target that the camera will follow
     *
     * @property _target
     * @type Entity
     * @readOnly
     * @private
     */
    this._target = null;

    /**
     * The size of the camera
     *
     * @property size
     * @type Vector
     * @readOnly
     */
    this.size = new gf.Vector(0, 0);

    /**
     * Half of the size of the camera
     *
     * @property hSize
     * @type Vector
     * @readOnly
     */
    this.hSize = new gf.Vector(0, 0);

    /**
     * The _fx namespace has all the instance variables for all the fx
     *
     * @property _fx
     * @type Object
     * @private
     * @readOnly
     */
    this._fx = {
        flash: {
            alpha: 0,
            complete: null
        },
        fade: {
            alpha: 0,
            complete: null
        },
        shake: {
            intensity: 0,
            duration: 0,
            direction: gf.Camera.SHAKE.BOTH,
            offset: new gf.Point(0, 0),
            complete: null
        }
    };

    gf.DisplayObject.call(this, game, pos, settings);
};

gf.inherits(gf.Camera, gf.DisplayObject, {
    /**
     * Makes the camera flash with a certain color
     *
     * @method flash
     * @param color {Number} The color to flash the screen with
     * @param duration {Number} The time in milliseconds to fade away
     * @param callback {Function} The callback to call when the flash has completed
     * @return {Camera} Returns iteself for chainability
     */
    flash: function(color, duration, cb) {
        if(this._fx.flash.alpha > 0) return this;

        if(typeof duration === 'function') {
            cb = duration;
            duration = 1;
        }

        if(typeof color === 'function') {
            cb = color;
            duration = 1;
            color = 0xFFFFFF;
        }

        duration = duration || 1;
        if(duration < 0) duration = 1;

        if(color === undefined)
            color = 0xFFFFFF;

        /*var red = color >> 16 & 0xFF,
            green = color >> 8 & 0xFF,
            blue = color & 0xFF;*/

        this._fx.flash.color = color;
        this._fx.flash.duration = duration;
        this._fx.flash.alpha = 1;
        this._fx.flash.complete = cb;

        return this;
    },
    /**
     * Stops a running flash, instantly hiding it
     *
     * @method stopFlash
     * @return {Camera} Returns iteself for chainability
     */
    stopFlash: function() {
        this._fx.flash.alpha = 0;

        return this;
    },
    /**
     * Makes the camera fade into a color
     *
     * @method fade
     * @param color {Number} The color to fade into
     * @param duration {Number} The time in milliseconds to take to fade in
     * @param callback {Function} The callback to call when the fade has completed
     * @return {Camera} Returns iteself for chainability
     */
    fade: function(color, duration, cb) {
        if(this._fx.fade.alpha > 0) return this;

        if(typeof duration === 'function') {
            cb = duration;
            duration = 1;
        }

        if(typeof color === 'function') {
            cb = color;
            duration = 1;
            color = 0xFFFFFF;
        }

        duration = duration || 1;
        if(duration < 0) duration = 1;

        if(color === undefined)
            color = 0xFFFFFF;

        /*var red = color >> 16 & 0xFF,
            green = color >> 8 & 0xFF,
            blue = color & 0xFF;*/

        this._fx.fade.color = color;
        this._fx.fade.duration = duration;
        this._fx.fade.alpha = 0.01;
        this._fx.fade.complete = cb;

        return this;
    },
    /**
     * Stops a running fade, instantly hiding it
     *
     * @method stopFade
     * @return {Camera} Returns iteself for chainability
     */
    stopFade: function() {
        this._fx.fade.alpha = 0;

        return this;
    },
    /**
     * Shakes the camera around a bit, to show it who is boss.
     *
     * @method shake
     * @param intensity {Number} How hard to shake around
     * @param duration {Number} The time in milliseconds to shake for
     * @param direction {Camera.SHAKE} The axes to shake the camera in default is gf.Camera.SHAKE.BOTH
     * @param callback {Function} The callback to call when the shaking has stopped
     * @return {Camera} Returns iteself for chainability
     */
    shake: function(intensity, duration, direction, cb) {
        //already shaking (call stop first)
        if(this._fx.shake.offset.x !== 0 || this._fx.shake.offset.y !== 0)
            return this;

        if(typeof direction === 'function') {
            cb = direction;
            direction = gf.Camera.SHAKE.BOTH;
        }

        if(typeof duration === 'function') {
            cb = duration;
            direction = gf.Camera.SHAKE.BOTH;
            duration = null;
        }

        if(typeof intensity === 'function') {
            cb = intensity;
            direction = gf.Camera.SHAKE.BOTH;
            duration = null;
            intensity = null;
        }

        intensity = intensity || 0.01;
        duration = duration || 1000;
        direction = direction || gf.Camera.SHAKE.BOTH;

        //setup a shake effect
        this._fx.shake.intensity = intensity;
        this._fx.shake.duration = duration;
        this._fx.shake.direction = direction;
        this._fx.shake.offset.x = 0;
        this._fx.shake.offset.y = 0;
        this._fx.shake.complete = cb;

        return this;
    },
    /**
     * Stops a running shake effect
     *
     * @method stopShake
     * @return {Camera} Returns iteself for chainability
     */
    stopShake: function() {
        if(this._fx.shake.duration !== 0) {
            this._fx.shake.duration = 0;
            this._fx.shake.offset.x = 0;
            this._fx.shake.offset.y = 0;
        }

        return this;
    },
    /**
     * Stops all currently running effects (flash, fade, shake)
     *
     * @method stopAll
     * @return {Camera} Returns iteself for chainability
     */
    stopAll: function() {
        this.stopFlash();
        this.stopFade();
        this.stopShake();

        return this;
    },
    /**
     * Follows an entity with the camera, ensuring they are always center view. You can
     * pass a follow style to change the area an entity can move around in before we start
     * to move with them.
     *
     * @method follow
     * @param entity {Entity} The entity to follow
     * @param style {Camera.FOLLOW} The style of following, defaults to gf.Camera.FOLLOW.LOCKON
     * @return {Camera} Returns iteself for chainability
     */
    follow: function(ent, style) {
        if(!(ent instanceof gf.Entity)) return this;

        this._target = ent;

        switch(style) {
            case gf.Camera.FOLLOW.PLATFORMER:
                var w = this.size.x / 8;
                var h = this.size.y / 3;
                this._deadzone = new PIXI.Rectangle(
                    (this.size.x - w) / 2,
                    (this.size.y - h) / 2 - (h / 4),
                    w,
                    h
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN:
                var sq4 = Math.max(this.size.x, this.size.y) / 4;
                this._deadzone = new PIXI.Rectangle(
                    (this.size.x - sq4) / 2,
                    (this.size.y - sq4) / 2,
                    sq4,
                    sq4
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN_TIGHT:
                var sq8 = Math.max(this.size.x, this.size.y) / 8;
                this._deadzone = new PIXI.Rectangle(
                    (this.size.x - sq8) / 2,
                    (this.size.y - sq8) / 2,
                    sq8,
                    sq8
                );
                break;
            case gf.Camera.FOLLOW.LOCKON:
                /* falls through */
            default:
                this._deadzone = null;
                break;
        }

        this.focusEntity(this._target);

        return this;
    },
    /**
     * Stops following any entities
     *
     * @method unfollow
     * @return {Camera} Returns iteself for chainability
     */
    unfollow: function() {
        this._target = null;
        return this;
    },
    /**
     * Focuses the camera on an x,y position. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method focus
     * @param x {Number|Point} The x coord to focus on, if a Point is passed the y param is ignored
     * @param y {Number} The y coord to focus on
     * @return {Camera} Returns iteself for chainability
     */
    focus: function(x, y) {
        y = x instanceof gf.Point ? x.y : (y || 0);
        x = x instanceof gf.Point ? x.x : (x || 0);
        //x += (x > 0) ? 0.0000001 : -0.0000001;
        //y += (y > 0) ? 0.0000001 : -0.0000001;

        //calculate how much we need to pan
        var goToX = x - this.hSize.x,
            goToY = y - this.hSize.y,
            dx = goToX + this.game.world.position.x, //world pos is negative
            dy = goToY + this.game.world.position.y;

        return this.pan(dx, dy);
    },
    focusEntity: function(ent) {
        this.focus(
            ent.viewPosition.x * this.game.world.scale.x,
            ent.viewPosition.y * this.game.world.scale.y
        );
    },
    /**
     * Pans the camera around by the x,y amount. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Camera} Returns iteself for chainability
     */
    pan: function(dx, dy) {
        dy = dx instanceof gf.Point ? dx.y : (dy || 0);
        dx = dx instanceof gf.Point ? dx.x : (dx || 0);

        if(!dx && !dy) return;

        var newX = this.game.world.position.x - dx,
            newY = this.game.world.position.y - dy;

        //move only the difference that puts us at 0
        if(newX > 0)
            dx = 0 + this.game.world.position.x;
        //move only the difference that puts us at max (remember that position is negative)
        else if(newX < -this._bounds.maxPanX)
            dx = this._bounds.maxPanX + this.game.world.position.x;

        if(newY > 0)
            dy = 0 - Math.abs(this.game.world.position.y);
        else if(newY < -this._bounds.maxPanY)
            dy = this._bounds.maxPanY + this.game.world.position.y;

        if(dx || dy)
            this.game.world.pan(-dx, -dy);

        return this;
    },
    /**
     * Resizes the viewing area, this is called internally by your game instance
     * when you call mygame.resize(). DO NOT CALL THIS DIRECTLY
     *
     * @method resize
     * @private
     * @param w {Number} The new width
     * @param h {Number} The new height
     * @return {Camera} Returns iteself for chainability
     */
    resize: function(w, h) {
        this.size.set(w, h);
        this.hSize.set(
            Math.round(this.size.x / 2),
            Math.round(this.size.y / 2)
        );

        return this;
    },
    /**
     * Sets the bounds the camera is allowed to go. Usually this is the world's
     * min and max, and is set for you.
     *
     * @method setBounds
     * @param x {Number} The minimum x coord (usually 0)
     * @param y {Number} The minimum y coord (usually 0)
     * @param width {Number} The maximum x coord (usually map width)
     * @param height {Number} The maximum y coord (usually map height)
     * @return {Camera} Returns iteself for chainability
     */
    setBounds: function(x, y, width, height) {
        this._bounds.x = x;
        this._bounds.y = y;
        this._bounds.width = width;
        this._bounds.height = height;

        this._bounds.maxX = this._bounds.x + this._bounds.width;
        this._bounds.maxY = this._bounds.y + this._bounds.height;

        this._bounds.maxPanX = width - this.size.x;
        this._bounds.maxPanY = height - this.size.y;

        return this;
    },
    /**
     * Called internally every frame. Updates all effects and the follow
     *
     * @method update
     * @return {Camera} Returns iteself for chainability
     */
    update: function(dt) {
        //follow entity
        if(this._target) {
            if(!this._deadzone) {
                this.focusEntity(this._target);
            } else {
                var moveX, moveY,
                    dx, dy,
                    //get the x,y of the sprite on the screen
                    camX = (this._target.position.x + (this.game.world.position.x / this.game.world.scale.x)) * this.game.world.scale.x,
                    camY = (this._target.position.y + (this.game.world.position.y / this.game.world.scale.y)) * this.game.world.scale.x;

                moveX = moveY = dx = dy = 0;

                //check less than
                dx = camX - this._deadzone.x;
                dy = camY - this._deadzone.y;

                if(dx < 0)
                    moveX = dx;
                if(dy < 0)
                    moveY = dy;

                //check greater than
                dx = camX - (this._deadzone.x + this._deadzone.width);
                dy = camY - (this._deadzone.y + this._deadzone.height);

                if(dx > 0)
                    moveX = dx;
                if(dy > 0)
                    moveY = dy;

                this.pan(
                    Math.round(moveX),
                    Math.round(moveY)
                );
            }
        }

        //update flash effect
        if(this._fx.flash.alpha > 0) {
            this._fx.flash.alpha -= (dt * 1000) / this._fx.flash.duration;

            if(this._fx.flash.alpha <= 0) {
                this._fx.flash.alpha = 0;

                if(this._fx.flash.complete)
                    this._fx.flash.complete();
            }
        }

        //update fade effect
        if(this._fx.fade.alpha > 0) {
            this._fx.fade.alpha += (dt * 1000) / this._fx.fade.duration;

            if(this._fx.fade.alpha >= 1) {
                this._fx.fade.alpha = 1;

                if(this._fx.fade.complete) {
                    this._fx.fade.complete();
                }
            }
        }

        //update shake effect
        if(this._fx.shake.duration > 0) {
            this._fx.shake.duration -= (dt * 1000);

            //pan back to the original position
            this._fx.shake.offset.x = -this._fx.shake.offset.x;
            this._fx.shake.offset.y = -this._fx.shake.offset.y;
            this.pan(this._fx.shake.offset);

            if(this._fx.shake.duration <= 0) {
                this._fx.shake.duration = 0;
                this._fx.shake.offset.x = 0;
                this._fx.shake.offset.y = 0;

                if(this._fx.shake.complete) {
                    this._fx.shake.complete();
                }
            }
            else {
                //pan to a random offset
                if((this._fx.shake.direction === gf.Camera.SHAKE.BOTH) || (this._fx.shake.direction === gf.Camera.SHAKE.HORIZONTAL))
                    this._fx.shake.offset.x = Math.round(Math.random() * this._fx.shake.intensity * this.size.x * 2 - this._fx.shake.intensity * this.size.x);

                if ((this._fx.shake.direction === gf.Camera.SHAKE.BOTH) || (this._fx.shake.direction === gf.Camera.SHAKE.VERTICAL))
                    this._fx.shake.offset.y = Math.round(Math.random() * this._fx.shake.intensity * this.size.y * 2 - this._fx.shake.intensity * this.size.y);

                this.pan(this._fx.shake.offset);
            }
        }

        return this;
    }
});

gf.Camera.FOLLOW = {
    PLATFORMER: 0,
    TOPDOWN: 1,
    TOPDOWN_TIGHT: 2,
    LOCKON: 3
};

gf.Camera.SHAKE = {
    BOTH: 0,
    HORIZONTAL: 1,
    VERTICAL: 2
};
function setTextureWrapper(t) {
    PIXI.Sprite.prototype.setTexture.call(this, t);

    if(!this.currentAnim) return;

    this.parent.width = this.currentAnim.width;
    this.parent.height = this.currentAnim.height;
}

function onTextureUpdateWrapper(e) {
    PIXI.Sprite.prototype.onTextureUpdate.call(this, e);

    if(!this.currentAnim) return;

    this.parent.width = this.currentAnim.width;
    this.parent.height = this.currentAnim.height;
}

/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @class Sprite
 * @extends DisplayObject
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 * @example
 *      var spr = new gf.Sprite([10, 1], { name: 'MySprite' });
 */
gf.Sprite = function(game, pos, settings) {
    /**
     * The width of the sprite
     *
     * @property width
     * @type Number
     * @default 0
     */
    this.width = 0;

    /**
     * The height of the sprite
     *
     * @property height
     * @type Number
     * @default 0
     */
    this.height = 0;

    /**
     * The name of this sprite
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    /**
     * The defined animations for this Sprite, this maps the names to the childIndexes
     *
     * @property anim
     * @private
     * @readOnly
     * @type Object
     */
    this.anim = {};

    /**
     * The currently active animation
     *
     * @property currentAnim
     * @private
     * @readOnly
     * @type Object
     */
    this.currentAnim = null;

    /**
     * The the anchor point for the textures
     *
     * @property anchor
     * @type Point
     */
    this.anchor = new gf.Point();

    //call base ctor
    gf.DisplayObject.call(this, game, pos, settings);

    //add the animations passed to ctor
    if(settings.animations) {
        for(var name in settings.animations) {
            this.addAnimation(name, settings.animations[name]);
        }
    }

    //if a texture is passed, make this just display the texture
    if(settings.texture) {
        if(typeof settings.texture === 'string') {
            if(gf.assetCache[settings.texture])
                settings.texture = gf.assetCache[settings.texture];
            else {
                var loader = new gf.AssetLoader();
                settings.texture = loader.loadTexture(settings.texture, settings.texture);
            }
        }

        if(settings.texture instanceof gf.Texture) {
            var spr = new PIXI.Sprite(settings.texture);
            this.addChild(spr);
            this.anim['default'] = spr.childIndex;
            this.width = this.width || spr.width;
            this.height = this.height || spr.height;
            spr.anchor = this.anchor;
            spr.setTexture = setTextureWrapper;
            spr.onTextureUpdate = onTextureUpdateWrapper;

            this.setTexture = spr.setTexture.bind(spr);
        }
    }
};

gf.inherits(gf.Sprite, gf.DisplayObject, {
    /**
     * Defines a new animation on the Sprite
     *
     * @method addAnimation
     * @param name {String} The name of the animation, any string you want to name it
     * @param frames {Texture|Array} The frames of the animation, you can pass one gf.Texture
     *      as a frame, or an Array of gf.Texture's
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.addAnimation('walk-left', new gf.Texture())
     *          .addAnimation('walk-right', [new gf.Texture(), new gf.Texture()]);
     */
    addAnimation: function(name, frames, speed) {
        if(!frames)
            throw 'No textures passed to addAnimation()';

        //ensure all the items in the array are textures
        if(frames instanceof Array) {
            for(var i = 0, il = frames.length; i < il; ++i) {
                if(typeof frames[i] === 'string') {
                    if(!PIXI.TextureCache[frames[i]])
                        throw 'Texture ' + frames[i] + ' is not in cache, please load it first';

                    frames[i] = PIXI.TextureCache[frames[i]];
                }
            }
        }

        //if there is a single texture passed, then put it in an array
        if(frames instanceof gf.Texture)
            frames = [frames];

        //if a string is passed, get it from the texture cache
        if(typeof frames === 'string') {
            if(!PIXI.TextureCache[frames])
                throw 'Texture ' + frames + ' is not in cache, please load it first';

            frames = [PIXI.TextureCache[frames]];
        }

        //create a movie clip from the textures
        var clip = new PIXI.MovieClip(frames);
        clip.stop();
        clip.visible = false;
        clip.name = name;
        clip.anchor = this.anchor;
        clip.setTexture = setTextureWrapper;
        clip.onTextureUpdate = onTextureUpdateWrapper;

        if(this.interactive)
            clip.setInteractive(this.interactive);

        if(speed)
            clip.animationSpeed = speed;

        this.addChild(clip);

        this.anim[name] = clip.childIndex;

        return this;
    },
    /**
     * Sets the active animation of the sprite, and starts the animation at index 0
     *
     * @method setActiveAnimation
     * @param name {String} The name of the animation to play (defined with addAnimation());
     * @param cb {Function} Callback when the animation completes, NOT YET IMPLEMENTED
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.addAnimation('me', new gf.Texture())
     *          .setActiveAnimation('me');
     */
    setActiveAnimation: function(name, loop, cb) {
        if(typeof loop === 'function') {
            cb = loop;
            loop = false;
        }

        if(this.anim[name] !== undefined) {
            if(this.currentAnim) {
                this.currentAnim.stop();
                this.currentAnim.visible = false;
            }

            this.currentAnim = this.children[this.anim[name]];
            this.currentAnim.visible = true;
            this.currentAnim.loop = loop;
            this.currentAnim.onComplete = cb;
            this.width = this.currentAnim.width;
            this.height = this.currentAnim.height;
            this.currentAnim.gotoAndPlay(0);
        } else {
            throw 'Unknown animation ' + name;
        }

        return this;
    },
    /**
     * Checks if the name is the active animation
     *
     * @method isActiveAnimation
     * @param name {String} The name of the animation to check if it is currently active
     * @return {Boolean} true if the animation is active, false otherwise.
     * @example
     *      spr.addAnimation('walk-left', new gf.Texture())
     *          .isActiveAnimation('walk-left'); //false
     *
     *      spr.setActiveAnimation('walk-left')
     *          .isActiveAnimation('walk-left'); //true
     */
    isActiveAnimation: function(name) {
        return this.currentAnim.name === name;
    },
    /**
     * Sets whether or not this sprite is interactive (can be clicked)
     *
     * @method setInteractive
     * @param interactive {Boolean}
     */
    setInteractive: function(interactive) {
        this.interactive = interactive;
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.children[i].setInteractive)
                this.children[i].setInteractive(interactive);
        }
    }
});

//Add some PIXI.MovieClip functions that just call that
// function for the currently playing animation
['stop', 'play', 'gotoAndStop', 'gotoAndPlay'].forEach(function(fn) {
    gf.Sprite.prototype[fn] = function() {
        if(this.currentAnim && this.currentAnim[fn])
            this.currentAnim[fn].apply(this.currentAnim, arguments);
    };
});

/**
 * Stops the currently active animation
 * @method stop
 */

/**
 * Plays the currently active animation
 * @method play
 */

/**
 * Stops the currently active animation and goes to a specific frame
 * @method gotoAndStop
 * @param frameNumber {Number} frame index to stop at
 */

/**
 * Goes to a specific frame and begins playing the currently active animation
 * @method gotoAndPlay
 * @param frameNumber {Number} frame index to start at
 */
//Features TODO:
//      - flipX
//      - flipY
//      - doWalk
//      - doClimb
//      - doJump
//      - forceJump
//      - checkSlope
//      - updateMovement (slopes/breakable tiles)

/**
 * The base Entity class. This class is the base for all entities interacting on the stage
 *
 * @class Entity
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the entity
 * @param settings {Object} Settings to override the defauls
 * @example
 *      var ent = new gf.Entity([10, 1], { name: 'MyEntity' });
 */
gf.Entity = function(game, pos, settings) {
    if(!game)
        throw 'No game instance passed to Entity, a game instance is required!';

    /**
     * The type of the entity
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.Entity.TYPE.NEUTRAL;

    /**
     * Whether or not the entity is "alive", advisory only
     *
     * @property alive
     * @type Boolean
     * @default true
     */
    this.alive = true;

    /**
     * Can it collide with other entities
     *
     * @property collidable
     * @type Boolean
     * @default true
     * @readOnly
     */
    this.collidable = true;

    /**
     * The mass of the entity
     *
     * @property mass
     * @type Number
     * @default 1
     * @readOnly
     */
    this.mass = 1;

    /**
     * The view position is a whole-number version of position.
     *
     * @property viewPosition
     * @type Point
     * @readOnly
     */
    this.viewPosition = new gf.Point(0, 0);

    //call base ctor
    gf.Sprite.call(this, game, pos, settings);

    if(!this.width || !this.height)
        throw 'Entities must have a width and height.';

    this.viewPosition.x = Math.round(this.position.x);
    this.viewPosition.y = Math.round(this.position.y);

    //setup physics
    this.setCollidable(this.collidable);
    this.setPosition(this.position);
};

gf.inherits(gf.Entity, gf.Sprite, {
    setCollidable: function(canCollide) {
        //turning off collisions
        if(this.collidable && !canCollide)
            this.game.physics.remove(this);
        //turning on collisions
        else if((!this.collidable && canCollide) || (canCollide && !this.body))
            this.game.physics.add(this);
    },
    setMass: function(mass) {
        this.mass = mass < 0 ? 0 : mass;
        this.game.physics.setMass(this, mass);

        if(this.mass === 0)
            this.collidable = false;
    },
    setVelocity: function(vel) {
        this.game.physics.setVelocity(this, gf.utils.ensureVector(vel));
    },
    setRotation: function(rads) {
        this.rotation = rads;
        this.game.physics.setRotation(this, rads);
    },
    /**
     * Convenience method for setting the position of an Entity.
     *
     * @method setPosition
     * @param x {Number|Array|Vector|Point} X coord to put the sprite at.
     *       If an Array, Vector, or Point is passed then the y parameter is ignored
     * @param y {Number} Y coord to put the sprite at
     * @return {Entity} Returns itself for chainability
     * @example
     *      spr.setPosition(1, 1)
     *          .setPosition([5, 5])
     *          .setPosition(new gf.Point(10, 10))
     *          .setPosition(new gf.Vector(20, 20));
     */
    setPosition: function(x, y, skipPhysics) {
        gf.Sprite.prototype.setPosition.call(this, x, y);

        this.viewPosition.x = Math.round(this.position.x);
        this.viewPosition.y = Math.round(this.position.y);

        if(!skipPhysics) {
            this.game.physics.setPosition(this, this.position);
        }

        return this;
    },
    /**
     * On Collision Event
     *      called when this object collides into another, or is being collided into by another
     *      by default if something collides with a collectable entity we remove the collectable
     *      and if we collide with a solid tile we kill our velocity
     *
     * @method onCollision
     * @param obj {Entity} Colliding object
     * @return {Entity} Returns itself for chainability
     */
    onCollision: function(obj) {
        if(this.type === gf.Entity.TYPE.COLLECTABLE)
            this.parent.removeChild(this);

        if(obj.collisionType === gf.Tile.TYPE.SOLID)
            this.setVelocity(0);

        return this;
    },
    /**
     * On Move Event
     *      called when this entity moves
     *
     * @method onMove
     * @param vel {Vector} The difference of position that the entity moved
     * @return {Entity} Returns itself for chainability
     */
    onMove: function() {
        return this;
    },
    /**
     * On Break Tile Event
     *      called when a tile is broken by this entity
     *
     * @method onBreakTile
     * @param tile {Unkown} the tile that is broken
     * @return {Entity} Returns itself for chainability
     */
    onBreakTile: function() {
        return this;
    }
});

/**
 * Entity types
 *
 * @property TYPE
 * @type Object
 */
gf.Entity.TYPE = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    FRIENDLY: 'friendly',
    NEUTRAL: 'neutral',
    COLLECTABLE: 'collectable',
    TILE: 'tile'
};
/**
 * Holds a pool of different Entities that can be created, makes it very
 * easy to quickly create different registered entities
 *
 * @class entityPool
 */
gf.entityPool = {
    _objects: {},
    /**
     * Adds an entity Object to the pool
     *
     * @method add
     * @param name {String} The user-defined name of the Entity to add
     * @param obj {Object} The Entity or decendant to add to the pool
     * @return {Object} Returns the passed object
     * @example
     *      //create a new ckass to be instantiated
     *      var Bug = gf.entityPool.add('bug', gf.Entity.extend({
     *          //ctor function
     *          init: function(pos, settings) {
     *              //call the base ctor
     *              this._super(pos, settings);
     *
     *              this.color = 'red';
     *          },
     *          beBug: function() {
     *              console.log("I'm a bug");
     *          }
     *      }));
     *
     *      //then later in your game code
     *      var mybug = gf.entityPool.create('bug', {
     *          pos: [10, 10]
     *      });
     */
    add: function(name, obj) {
        return gf.entityPool._objects[name] = obj;
    },
    /**
     * Checks if the entity exists in the pool
     *
     * @method has
     * @param name {String} The user-defined name of the Entity to check if is in the pool
     * @return {Boolean} Returns the passed object
     */
    has: function(name) {
        return !!gf.entityPool._objects[name];
    },
    /**
     * Creates a new entity from the pool
     *
     * @method create
     * @param name {String} The user-defined name of the Entity to check if is in the pool
     * @param props {Object} The properties that would normally be passed as the "settings" of the Entity
     * @return {Entity} Returns a new instance of the object from the pool
     * @example
     *      //create a new ckass to be instantiated
     *      var Bug = function(pos, settings) {
     *          gf.Entity.call(this, pos, settings);
     *          this.color = 'red';
     *      };
     *
     *      gf.inherits(Bug, gf.Entity, {
     *          beBug: function() {
     *              console.log("I'm a bug");
     *          }
     *      });
     *
     *      //then later in your game code
     *      var mybug = gf.entityPool.create('bug', {
     *          pos: [10, 10] //pos, and/or position properties get sent as the first param to the ctor
     *      });
     */
    create: function(game, name, props) {
        //if the name is in our pool, create it
        if(name && gf.entityPool.has(name)) {
            return new gf.entityPool._objects[name](game, props.pos || props.position || [props.x, props.y], props);
        }
        //otherwise create a general Entity
        else {
            return new gf.Entity(game, props.pos || props.position || [props.x, props.y], props);
        }
    }
};

/**
 * GameStates are different , controls the entire instance of the game
 *
 * @class GameState
 * @constructor
 * @param game {Game} The game instance this GameState belongs to
 * @param name {String} 
 * @example
 *      var state = new gf.GameState(game, 'battle');
 *      state.addChild(battlePlayer);
 *      state.addChild(enemy);
 *
 *      game.enableState(state); //or you can use the name from the ctor 'battle'
 */
gf.GameState = function(game, name, settings) {
    settings = settings || {};
    this.name = name;

    /**
     * The audio player for this game instance
     *
     * @property audio
     * @type AudioPlayer
     * @readOnly
     */
    this.audio = new gf.AudioPlayer(game);

    /**
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = new gf.InputManager(game);

    /**
     * The physics system to simulate stuffs
     *
     * @property physics
     * @type PhysicsSystem
     * @readOnly
     */
    this.physics = new gf.PhysicsSystem(game, settings.gravity);

    /**
     * The camera you view the scene through
     *
     * @property camera
     * @type Camera
     * @readOnly
     */
    this.camera = new gf.Camera(game);

    /**
     * The world instance that holds all entites and the map
     *
     * @property world
     * @type Map
     * @readOnly
     */
    this.world = null;

    //call base ctor
    gf.DisplayObject.call(this, game, [0, 0], settings);

    //start disabled
    this.disable();

    //add camera
    this.addChild(this.camera);
    this.camera.resize(this.game.renderer.width, this.game.renderer.height);

    //add this state to the game
    this.game.addState(this);
};

gf.inherits(gf.GameState, gf.DisplayObject, {
    addChild: function(obj) {
        if(obj) {
            //we add the camera in the ctor and the map later when
            //.loadWorld is called. This way the camera is always the
            //last child of stage, so it is rendered on top!
            if(obj instanceof gf.Camera || obj instanceof gf.Map)
                this.addChildAt(obj, 0);
            else if(obj instanceof gf.Gui)
                this.camera.addChild(obj);
            else
                this.world.addChild(obj);
        }
    },
    loadWorld: function(world) {
        if(typeof world === 'string'){
            if(gf.assetCache[world]) {
                world = gf.assetCache[world];
            } else {
                throw 'World "' + world + '" needs to be preloaded before being added to a game!';
            }
        }

        this.world = new gf.TiledMap(this.game, 0, world);
        this.addChild(this.world);
        this.camera.setBounds(0, 0, this.world.realSize.x, this.world.realSize.y);

        if(this.world.properties.music) {
            this.audio.play(this.world.properties.music, { loop: this.world.properties.music_loop === 'true' });
        }

        return this;
    },
    enable: function() {
        this.visible = true;
    },
    disable: function() {
        this.visible = false;
    },
    update: function(dt) {
        //gather input from user
        this.input.update(dt);

        //update any camera effects
        this.camera.update(dt);

        //simulate physics and detect/resolve collisions
        this.physics.update(dt);
    }
});
/**
 * A simple object to show some debug items
 *
 * @class debug
 */
 gf.debug = {
    /**
     * The styles applied to the fps box after it is created
     *
     * @property fpsStyle
     */
    fpsStyle: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        'z-index': 10
    },
    /**
     * Shows the FPS Counter
     *
     * @method showFpsCounter
     */
    showFpsCounter: function() {
        gf.debug._fpsCounter = new gf.debug.FpsCounter();
        for(var s in gf.debug.fpsStyle) {
            gf.debug._fpsCounter.domElement.style[s] = gf.debug.fpsStyle[s];
        }
        document.body.appendChild(gf.debug._fpsCounter.domElement);
    },
    /**
     * Shows some debug info such as player position and the gamepad state
     *
     * @method showDebugInfo
     * @param game {Game} The game instance to show info for
     * @param pad {Boolean} Whether or not to show gamepad info (defaults to true)
     */
    showDebugInfo: function(game, pad) {
        gf.debug._info = new gf.debug.Info(game, pad);
        document.body.appendChild(gf.debug._info.domElement);
    },
    /**
     * Called internally by the Game instance
     *
     * @method update
     * @private
     */
    update: function() {
        //update fps box
        if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

        //update debug info
        if(gf.debug._info) gf.debug._info.update();
    },
    Info: function(game, pad) {
        this.game = game;
        this.showGamepad = pad !== undefined ? pad : true;

        var br = document.createElement('br');

        //container
        var container = document.createElement('div');
        container.id = 'gf-debug-info';
        container.style['position'] = 'absolute';
        container.style['top'] = '50px';
        container.style['left'] = '0';
        container.style['z-index'] = '10';
        container.style['color'] = '#FFF';
        container.style['font-size'] = '0.9em';

        //title
        var title = document.createElement('h3');
        title.id = 'gf-debug-info-title';
        title.textContent = 'Debug Info';
        title.style.cssText = 'margin:1px;display:block;';

        container.appendChild(title);

        //player position
        var pos = document.createElement('span'),
            posVal = document.createElement('span');
        pos.id = 'gf-debug-info-position';
        posVal.id = 'gf-debug-info-position-value';
        pos.textContent = 'Player Position: ';
        posVal.textContent = 'X: 0, Y: 0';

        //gamepads
        var pads = document.createElement('span');
        pads.id = 'gf-debug-info-gamepads';

        container.appendChild(pads);

        pos.appendChild(posVal);
        container.appendChild(pos);
        container.appendChild(br.cloneNode());

        this.player = 

        this.REVISION = 1;
        this.domElement = container;
        this.update = function() {
            posVal.textContent = this.game.players[0] ?
                                    'X: ' + this.game.players[0].position.x.toFixed(1) + ', Y: ' + this.game.players[0].position.y.toFixed(1) :
                                    'none';

            if(this.showGamepad) {
                pads.innerHTML = '';
                if(this.game.input.gamepad.pads && this.game.input.gamepad.pads.length) {
                    for(var i = 0, il = this.game.input.gamepad.pads.length; i < il; ++i) {
                        var pad = this.game.input.gamepad.pads[i];

                        pads.innerHTML += 'Gamepad: [' + pad.index + '] ' + pad.id + '<br/>';
                        pads.innerHTML += '&nbsp;&nbsp;&nbsp;Buttons:<br/>' + 
                                            pad.buttons.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.input.getGpButtonName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                        pads.innerHTML += '&nbsp;&nbsp;&nbsp;Axes:<br/>' + 
                                            pad.axes.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.input.getGpAxisName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                    }
                }
            }
        };
    },
    //mrdoob's stats.js (stats.js r10 - http://github.com/mrdoob/stats.js)
    FpsCounter:function(){var l=Date.now(),m=l,g=0,n=1E3,o=0,h=0,p=1E3,q=0,r=0,s=0,f=document.createElement("div");f.id="gf-stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
    k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
    "block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
    a+"px",m=b,r=0);return b},update:function(){l=this.end()}}}
};

/**
 * The grapefruit utility object, used for misc functions used throughout the code base
 *
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
    },
    getStyle: function(elm, prop) {
        var style = window.getComputedStyle(elm),
            val = style.getPropertyValue(prop).replace(/px|em|%|pt/, '');

        if(!isNaN(val))
            val = parseInt(val, 10);

        return val;
    },
    //Some things stolen from jQuery, used for mouse input
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
    /////////////////////////////////////////////////////////////////////////////
};

/**
 * The grapefruit math library, used to abstract commonly used math operations
 *
 * @class math
 */
 gf.math = {
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    SEED: Math.random(),
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
    /**
     * Truncates the decimal from a number
     *
     * @method truncate
     * @param num {Number} The number to truncate
     * @return {Number} The truncated value
     */
    truncate: function(n) {
        return (n > 0) ? Math.floor(n) : Math.ceil(n);
    },
    /**
     * Snaps a number to a grid value.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 10; a position of 18 would snap to 20
     *
     * @method snap
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param offset {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snap: function(n, gap, offset) {
        if(gap === 0) return n;

        n -= offset;
        n = gap * Math.round(n / gap);

        return offset + n;
    },
    /**
     * Snaps a number to a grid value, using floor.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 10; a position of 18 would also snap to 10
     *
     * @method snapFloor
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param offset {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snapFloor: function(n, gap, offset) {
        if(gap === 0) return n;

        n -= offset;
        n = gap * Math.floor(n / gap);

        return offset + n;
    },
    /**
     * Snaps a number to a grid value, using ceiling.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 20; a position of 18 would also snap to 20
     *
     * @method snapCeil
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param offset {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snapCeil: function(n, gap, offset) {
        if(gap === 0) return n;

        n -= offset;
        n = gap * Math.ceil(n / gap);

        return offset + n;
    },
    /**
     * Convert radians to degrees
     *
     * @method radiansToDegrees
     * @param angle {Number} The angle in radians to convert
     * @return {Number} The angle in degrees
     */
    radiansToDegrees: function(angle) {
        return angle * gf.math.RAD_TO_DEG;
    },
    /**
     * Convert radians to degrees
     *
     * @method degreesToRadians
     * @param angle {Number} The angle in degrees to convert
     * @return {Number} The angle in radians
     */
    degreesToRadians: function(angle) {
        return angle * gf.math.DEG_TO_RAD;
    },
    /**
     * Calculates the angle between two points
     *
     * @method angleBetween
     * @param pos1 {Vector|Point} The first position
     * @param pos2 {Vector|Point} The second position
     * @return {Number} The angle in radians
     */
    angleBetween: function(pos1, pos2) {
        return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    },
    /**
     * Returns a random boolean based on the provided chance. The chance represents the
     * percentage chance of returning: true.
     *
     * @method randomBool
     * @param chance {Number} The % chance of getting true (0 - 100), defaults to 50%
     * @return {Boolean}
     */
    randomBool: function(chance) {
        if(chance === undefined)
            chance = 50;

        //no chance of true
        if(chance <= 0)
            return false;

        //must always be true
        if(chance >= 100)
            return true;

        //if roll is larger than chance, return false
        if(Math.random() * 100 >= chance)
            return false;

        //roll passed, return true
        return true;
    },
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
     * Returns a random sign based on the provided chance. The chance represents the
     * percentage chance of returning 1 (positive).
     *
     * @method randomSign
     * @param chance {Number} The % chance of getting true (0 - 100), defaults to 50%
     * @return {Number} either 1 or -1
     */
    randomSign: function(chance) {
        return gf.math.randomBool(chance) ? 1 : -1;
    },
    /**
     * Returns a random element of an array.
     *
     * @method randomElement
     * @param array {Array} The array to choose from
     * @param start {Number} The index of the first element to include, defaults to 0
     * @param length {Number} The number of elements from the start to include, defaults to the length of the array (minus the start index)
     * @return {Number} either 1 or -1
     */
    randomElement: function(array, start, len) {
        //default for start
        if(!start || start < 0)
            start = start || 0;

        //default for len
        if(!len || len < 1 || len > array.length - start)
            len = array.length - start;

        //ensure we have an array, and there are elements to check
        if(!array || len < 1)
            return null;

        return array[start + Math.floor(Math.random() * len)];
    }
 };
/**
 * High performance clock, from mrdoob's Three.js
 * https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
 *
 * @class Clock
 * @constructor
 * @param autoStart {Boolean} Automatically start the counter or not
 * @example
 *      var clock = new gf.Clock(false);
 *      //... some code ...
 *      clock.start();
 *      //... some long code ...
 *      var delta = clock.getDelta();
 */
gf.Clock = function(autoStart) {
    this.autoStart = (autoStart !== undefined) ? autoStart : true;

    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;

    this.running = false;
};

gf.inherits(gf.Clock, Object, {
    /**
     * Starts the timer
     *
     * @method start
     * @example
     *      clock.start();
     */
    start: function() {
        this.startTime = window.performance !== undefined && window.performance.now !== undefined ?
                            window.performance.now() : Date.now();

        this.oldTime = this.startTime;
        this.running = true;
    },
    /**
     * Stops the timer
     *
     * @method stop
     * @example
     *      clock.stop();
     */
    stop: function() {
        this.getElapsedTime();
        this.running = false;
    },
    /**
     * Gets the total time that the timer has been running
     *
     * @method getElapsedTime
     * @return {Number} Total ellapsed time in ms
     * @example
     *      clock.getElapsedTime();
     */
    getElapsedTime: function() {
        this.getDelta();

        return this.elapsedTime;
    },
    /**
     * Gets the difference in time since getDelta() was called last
     *
     * @method getDelta
     * @return {Number} Ellapsed time since last call in seconds
     * @example
     *      clock.getDelta();
     */
    getDelta: function() {
        var diff = 0;

        if(this.autoStart && !this.running) {
            this.start();
        }

        if(this.running) {
            var newTime = window.performance !== undefined && window.performance.now !== undefined ?
                                window.performance.now() : Date.now();

            diff = 0.001 * (newTime - this.oldTime);
            this.oldTime = newTime;

            this.elapsedTime += diff;
        }

        return diff;
    }
});

gf.ObjectPool = function(type, parent) {
    this.type = type;
    this.pool = [];
    this.alloced = [];
    this.parent = parent;
};

gf.inherits(gf.ObjectPool, Object, {
    create: function() {
        var o = this.pool.pop();

        if(!o) {
            o = this._construct(this.type, arguments);
            if(this.parent)
                this.parent.addChild(o);
        }

        this.alloced.push(o);

        return o;
    },
    free: function(o) {
        this.pool.push(o);
    },
    freeAll: function() {
        for(var i = 0, il = this.alloced.length; i < il; ++i) {
            this.free(this.alloced[i]);
        }

        this.alloced.length = 0;
    },
    //have to do this hack around to be able to use
    //apply and new together
    _construct: function(ctor, args) {
        function F() {
            return ctor.apply(this, args);
        }
        F.prototype = ctor.prototype;
        return new F();
    }
});
/**
 * A 2d Vector implementation stolen directly from mrdoob's THREE.js
 * thanks mrdoob: https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js
 *
 * @class Vector
 * @constructor
 * @param x {Number} The x component of the vector
 * @param y {Number} The y component of the vector
 */
gf.Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

gf.inherits(gf.Vector, Object, {
    /**
     * Sets the value of the vector
     *
     * @method set
     * @param x {Number} The x component of the vector
     * @param y {Number} The y component of the vector
     * @return {Vector} Returns itself
     */
    set: function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    },
    /**
     * Sets the X value of the vector
     *
     * @method setX
     * @param x {Number} The x component of the vector
     * @return {Vector} Returns itself
     */
    setX: function(x) {
        this.x = x;

        return this;
    },
    /**
     * Sets the Y value of the vector
     *
     * @method setY
     * @param y {Number} The y component of the vector
     * @return {Vector} Returns itself
     */
    setY: function(y) {
        this.y = y;

        return this;
    },
    /**
     * Sets a component value of the vector
     *
     * @method setComponent
     * @param index {Number} The index of the component to set (0 = x, 1 = y)
     * @param value {Number} The value to set the component to
     * @return {Vector} Returns itself
     */
    setComponent: function(index, value) {
        switch(index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);
        }

        return this;
    },
    /**
     * Gets a component value of the vector
     *
     * @method getComponent
     * @param index {Number} The index of the component to set (0 = x, 1 = y)
     * @return {Number} Returns the component value
     */
    getComponent: function(index) {
        switch(index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);
        }
    },
    /**
     * Copies the passed vector's components to this vector
     *
     * @method copy
     * @param vector {Vector} The vector to copy the values from
     * @return {Vector} Returns itself
     */
    copy: function(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    },
    /**
     * Floors the vector components
     *
     * @method floor
     * @return {Vector} Returns itself
     */
    floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;
    },
    /**
     * Ceils the vector components
     *
     * @method ceil
     * @return {Vector} Returns itself
     */
    ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;
    },
    /**
     * Adds a vector to this one
     *
     * @method add
     * @param vector {Vector} The vector to add to this one
     * @return {Vector} Returns itself
     */
    add: function(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    },
    /**
     * Adds two vectors to each other and stores the result in this vector
     *
     * @method addVectors
     * @param vector1 {Vector}
     * @param vector2 {Vector}
     * @return {Vector} Returns itself
     */
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;
    },
    /**
     * Adds a scalar value to the x and y components of this vector
     *
     * @method addScalar
     * @param scalar {Number} The scalar value to add
     * @return {Vector} Returns itself
     */
    addScalar: function(s) {
        this.x += s;
        this.y += s;

        return this;
    },
    /**
     * Subtracts a vector from this one
     *
     * @method sub
     * @param vector {Vector} The vector to subtract from this one
     * @return {Vector} Returns itself
     */
    sub: function(v) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    },
    /**
     * Subtracts two vectors from each other and stores the result in this vector
     *
     * @method subVectors
     * @param vector1 {Vector}
     * @param vector2 {Vector}
     * @return {Vector} Returns itself
     */
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    },
    /**
     * Multiplies the x and y components of this vector by a scalar value
     *
     * @method multiplyScalar
     * @param scalar {Number} The value to multiply by
     * @return {Vector} Returns itself
     */
    multiplyScalar: function(s) {
        this.x *= s;
        this.y *= s;

        return this;
    },
    /**
     * Divides the x and y components of this vector by a scalar value
     *
     * @method divideScalar
     * @param scalar {Number} The value to divide by
     * @return {Vector} Returns itself
     */
    divideScalar: function(s) {
        if(s !== 0) {
            this.x /= s;
            this.y /= s;
        } else {
            this.set(0, 0);
        }

        return this;
    },
    /**
     * Sets this vector components to the minimum value when compared to the passed vector's components
     *
     * @method min
     * @param vector {Vector} The vector to compare to
     * @return {Vector} Returns itself
     */
    min: function(v) {
        if(this.x > v.x) {
            this.x = v.x;
        }

        if(this.y > v.y) {
            this.y = v.y;
        }

        return this;
    },
    /**
     * Sets this vector components to the maximum value when compared to the passed vector's components
     *
     * @method max
     * @param vector {Vector} The vector to compare to
     * @return {Vector} Returns itself
     */
    max: function(v) {
        if(this.x < v.x) {
            this.x = v.x;
        }

        if(this.y < v.y) {
            this.y = v.y;
        }

        return this;
    },
    /**
     * Clamps the vectors components to be between min and max
     *
     * @method max
     * @param min {Number} The minimum value a component can be
     * @param max {Number} The maximum value a component can be
     * @return {Vector} Returns itself
     */
    clamp: function(min, max) {
        // This function assumes min < max, if this assumption
        //isn't true it will not operate correctly
        if(this.x < min.x) {
            this.x = min.x;
        } else if(this.x > max.x) {
            this.x = max.x;
        }

        if(this.y < min.y) {
            this.y = min.y;
        } else if(this.y > max.y) {
            this.y = max.y;
        }

        return this;
    },
    /**
     * Negates this vector (multiplies by -1)
     *
     * @method negate
     * @return {Vector} Returns itself
     */
    negate: function() {
        return this.multiplyScalar(-1);
    },
    /**
     * Performs the dot product between this vector and the passed one and returns the result
     *
     * @method dot
     * @param vector {Vector}
     * @return {Number} Returns the dot product
     */
    dot: function(v) {
        return this.x * v.x + this.y * v.y;
    },
    /**
     * Calculates the square length of the vector
     *
     * @method lengthSq
     * @return {Number} Returns the square length of the vector
     */
    lengthSq: function() {
        return this.x * this.x + this.y * this.y;
    },
    /**
     * Calculates the length of the vector
     *
     * @method length
     * @return {Number} Returns the length of the vector
     */
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    /**
     * Normalizes this vector (divides by its length)
     *
     * @method normalize
     * @return {Vector} Returns the normalized vector
     */
    normalize: function() {
        return this.divideScalar(this.length());
    },
    /**
     * Calculates the distance to the passed vector
     *
     * @method distanceTo
     * @param vector {Vector}
     * @return {Number} The distance
     */
    distanceTo: function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    },
    /**
     * Calculates the square distance to the passed vector
     *
     * @method distanceToSquared
     * @param vector {Vector}
     * @return {Number} The square distance
     */
    distanceToSquared: function(v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    },
    /**
     * Sets the length of the vector
     *
     * @method setLength
     * @param length {Number}
     * @return {Vector} Returns itself
     */
    setLength: function(l) {
        var oldLength = this.length();

        if(oldLength !== 0 && l !== oldLength) {
            this.multiplyScalar(l / oldLength);
        }

        return this;
    },
    /**
     * Performs a linear interpolation between this vector and the passed vector
     *
     * @method lerp
     * @param vector {Vector}
     * @param alpha {Number}
     * @return {Vector} Returns itself
     */
    lerp: function(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;
    },
    /**
     * Checks if this vector is equal to another
     *
     * @method equals
     * @param vector {Vector} The vector to compare with
     * @return {Vector} Returns itself
     */
    equals: function(v) {
        return ((v.x === this.x) && (v.y === this.y));
    },
    /**
     * Returns an array with the components of this vector as the elements
     *
     * @method toArray
     * @return {Vector} Returns an array of [x,y] form
     */
    toArray: function () {
        return [this.x, this.y];
    },
    /**
     * Creates a new instance of Vector, with the same components as this vector
     *
     * @method clone
     * @return {Vector} Returns a new Vector with the same values
     */
    clone: function () {
        return new gf.Vector(this.x, this.y);
    }
});

gf.InputManager = function(game) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    this.mouse = new gf.input.Mouse(this, game);
    this.keyboard = new gf.input.Keyboard(this, game);
    this.gamepad = new gf.input.Gamepad(this, game);
};

gf.inherits(gf.InputManager, Object, {
    update: function(dt) {
        this.gamepad.update(dt);
    },
    isActionActive: function(action) {
        return this.mouse.isActionActive(action) ||
            this.keyboard.isActionActive(action) ||
            this.gamepad.isActionActive(action);
    }
});
/**
 * input object
 */
gf.input = {
    /**
     * Bindable keycodes
     *
     * @property KEY
     * @type Object
     */
    KEY: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        NUM0: 48,
        NUM1: 49,
        NUM2: 50,
        NUM3: 51,
        NUM4: 52,
        NUM5: 53,
        NUM6: 54,
        NUM7: 55,
        NUM8: 56,
        NUM9: 57,
        PLUS: 61,
        A : 65,
        B : 66,
        C : 67,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        H : 72,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        M : 77,
        N : 78,
        O : 79,
        P : 80,
        Q : 81,
        R : 82,
        S : 83,
        T : 84,
        U : 85,
        V : 86,
        W : 87,
        X : 88,
        Y : 89,
        Z : 90,
        NUMPAD0: 96,
        NUMPAD1: 97,
        NUMPAD2: 98,
        NUMPAD3: 99,
        NUMPAD4: 100,
        NUMPAD5: 101,
        NUMPAD6: 102,
        NUMPAD7: 103,
        NUMPAD8: 104,
        NUMPAD9: 105,
        NUMPAD_STAR: 106,
        NUMPAD_PLUS: 107,
        NUMPAD_MINUS: 109,
        NUMPAD_DOT: 110,
        NUMPAD_SLASH: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        MINUS: 173,
        TILDE: 192
    },
    /**
     * Bindable Mouse Events
     *
     * @property MOUSE
     * @type Object
     */
    MOUSE: {
        WHEEL: 'mousewheel',
        MOVE: 'mousemove',
        DOWN: 'mousedown',
        UP: 'mouseup',
        CLICK: 'click',
        DBLCLICK: 'dblclick',
        RCLICK: 'contextmenu',
        CONTEXTMENU: 'contextmenu'
    },
    /**
     * Bindable Touch Events
     *
     * @property TOUCH
     * @type Object
     */
    TOUCH: {
        //WHEEL: undefined,
        MOVE: 'touchmove',
        START: 'touchstart',
        END: 'touchend',
        TAP: 'tap',
        DBLTAP: 'dbltap'
        //RCLICK: undefined,
        //CONTEXTMENU: undefined
    },
    /**
     * Bindable Gamepad Buttons
     *
     * @property GP_BUTTON
     * @type Object
     */
    GP_BUTTON: {
        FACE_1: 0, // Face (main) buttons
        FACE_2: 1,
        FACE_3: 2,
        FACE_4: 3,
        LEFT_SHOULDER: 4, // Top shoulder buttons
        RIGHT_SHOULDER: 5,
        LEFT_TRIGGER: 6, // Bottom shoulder buttons
        RIGHT_TRIGGER: 7,
        SELECT: 8,
        START: 9,
        LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
        RIGHT_ANALOGUE_STICK: 11,
        PAD_TOP: 12, // Directional (discrete) pad
        PAD_BOTTOM: 13,
        PAD_LEFT: 14,
        PAD_RIGHT: 15
    },
    getGpButtonName: function(i) {
        for(var k in gf.input.GP_BUTTON) {
            if(gf.input.GP_BUTTON[k] === i) {
                return k;
            }
        }

        return '';
    },
    /**
     * Bindable Gamepad Axes
     *
     * @property GP_AXIS
     * @type Object
     */
    GP_AXIS: {
        LEFT_ANALOGUE_HOR: 0,
        LEFT_ANALOGUE_VERT: 1,
        RIGHT_ANALOGUE_HOR: 2,
        RIGHT_ANALOGUE_VERT: 3
    },
    getGpAxisName: function(i) {
        for(var k in gf.input.GP_AXIS) {
            if(gf.input.GP_AXIS[k] === i) {
                return k;
            }
        }

        return '';
    }
};

/**
 * The base Input object, holds common functions and properties between input types
 *
 * @class Input
 * @constructor
 * @param manager {InputManager} The InputManager instance that this Input object is managed by
 * @param game {Game} The game this camera belongs to
 */
gf.input.Input = function(man, game) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The input manager this belongs to
     *
     * @property manager
     * @type InputManager
     */
    this.manager = man;

    /**
     * The binds that map an action to an input value
     *
     * @property binds
     * @type Object
     * @readOnly
     */
    this.binds = {};

    /**
     * The callbacks that map from an action
     *
     * @property callbacks
     * @type Object
     * @readOnly
     */
    this.callbacks = {};

    /**
     * The count of how many actions an input value is bound to
     *
     * @property callbacks
     * @type Object
     * @readOnly
     */
    this.bindCount = {};

    /**
     * Tracks the status of each action
     *
     * @property status
     * @type Object
     * @readOnly
     */
    this.status = {};
};

gf.inherits(gf.input.Input, Object, {
    _doBind: function(code, action, cb) {
        this.binds[code] = action;
        this.status[action] = false;

        if(!this.bindCount[action])
            this.bindCount[action] = 1;
        else
            this.bindCount[action]++;

        if(cb) {
            if(this.callbacks[action])
                this.callbacks[action].push({ code: code, cb: cb });
            else
                this.callbacks[action] = [{ code: code, cb: cb }];
        }

        return this;
    },
    _doUnbind: function(code, action) {
        //remove the bind (code -> action)
        delete this.binds[code];

        //reduce bind count
        this.bindCount[action]--;

        //if this action isn't bound anymore clean it up
        if(this.bindCount[action] <= 0) {
            this.bindCount[action] = 0;
            delete this.status[action];
            delete this.callbacks[action];
        }

        return gf.controls;
    },
    //helper to prevent default stuffs accross different browsers
    preventDefault: function(e) {
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;

        if(e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        return false;
    },
    bind: function(code, action, cb) {
        return this._doBind(code, action, cb);
    },
    unbind: function(code, action) {
        return this._doUnbind(code, action);
    },
    runCallbacks: function(code, args) {
        args = args || [];
        args.unshift(this.binds[code]);

        var cbs = this.callbacks[this.binds[code]];

        if(cbs)
            for(var i = 0, il = cbs.length; i < il; ++i)
                if(cbs[i].code === code)
                    cbs[i].cb.apply(this, args);
    },
    isActionActive: function(action) {
        return this.status[action];
    }
});
gf.input.Mouse = function(man, game) {
    gf.input.Input.call(this, man, game);

    /**
     * The current screen touches
     *
     * @property touches
     * @type Array
     * @readOnly
     */
    this.touches = [{ x: 0, y: 0 }];

    /**
     * The current position of the mouse
     *
     * @property position
     * @type Point
     * @readOnly
     */
    this.position = new gf.Point(0, 0);

    /**
     * The current position of the mouse
     *
     * @property position
     * @type Point
     * @readOnly
     */
    this.offset = gf.utils.getOffset(game.renderer.view);

    //bind touch events
    game.renderer.view.addEventListener('touchmove', this.onMouseMove.bind(this), false);
    for(var t in gf.input.Mouse.TOUCH_EVENT) {
        if(gf.input.Mouse.TOUCH_EVENT[t] === 'touchmove') return;
        game.renderer.view.addEventListener(gf.input.Mouse.TOUCH_EVENT[t], this.onTouch.bind(this), false);
    }

    //Bind mouse events
    game.renderer.view.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    document.addEventListener('mousewheel', this.onMouseWheel.bind(this), false); //needs to be document and check target?

    for(var k in gf.input.Mouse.EVENT) {
        var v = gf.input.Mouse.EVENT[k];
        if(v === 'mousemove'|| v === 'mousewheel') return;

        game.renderer.view.addEventListener(v, this.onMouse.bind(this), false);
    }
};

gf.inherits(gf.input.Mouse, gf.input.Input, {
    //mouse/touch move event
    onMouseMove: function(e) {
        this.updateCoords(e);

        if(this.dispatchMouseEvent(e))
            return this.preventDefault(e);

        return true;
    },
    //generic mouse event (click, down, up, etc)
    onMouse: function(e) {
        this.updateCoords(e);

        if(this.dispatchMouseEvent(e))
            return this.preventDefault(e);

        //incase touch event button is undefined
        var keycode = this.binds[e.button || 0];

        if(keycode) {
            if(e.type === 'mousedown' || e.type === 'touchstart')
                return this.manager.keyboard.onKeyDown(e, keycode);
            else
                return this.manager.keyboard.onKeyUp(e, keycode);
        }

        return true;
    },
    onMouseWheel: function(e) {
        if(e.target === this.game.renderer.view)
            if(this.dispatchMouseEvent(e))
                return this.preventDefault(e);

        return true;
    },
    //generic touch event (tap, start, end, etc)
    onTouch: function(e) {
        this.updateCoords(e);

        return this.onMouse(e);
    },
    //update the mouse coords
    updateCoords: function(e) {
        this.touches.length = 0;

        var off = this.offset;

        //mouse event
        if(!e.touches) {
            this.touches.push({
                x: e.pageX - off.left,
                y: e.pageY - off.top,
                id: 0
            });
        }
        //touch event
        else {
            for(var i = 0, il = e.changedTouches.length; i < il; ++i) {
                var t = e.changedTouches[i];

                this.touches.push({
                    x: t.clientX - off.left,
                    y: t.clientY - off.top
                });
            }
        }
        this.position.x = this.touches[0].x;
        this.position.y = this.touches[0].y;
    },
    dispatchMouseEvent: function(e) {
        if(this.binds[e.type]) {
            //track that action is active
            this.status[this.binds[e.type]] = true;

            //for each touch
            if(this.callbacks[this.binds[e.type]]) {
                for(var t = 0, tl = this.touches.length; t < tl; ++t) {
                    this.runCallbacks(e.type, [this.touches[t]]);
                }

                return this.preventDefault(e);
            }

            return true;
        }
    }
});

gf.input.Mouse.EVENT = {
    WHEEL: 'mousewheel',
    MOVE: 'mousemove',
    DOWN: 'mousedown',
    UP: 'mouseup',
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    RCLICK: 'contextmenu',
    CONTEXTMENU: 'contextmenu'
};

gf.input.Mouse.TOUCH_EVENT = {
    MOVE: 'touchmove',
    START: 'touchstart',
    END: 'touchend',
    TAP: 'tap',
    DBLTAP: 'dbltap'
};
gf.input.Keyboard = function(man, game) {
    gf.input.Input.call(this, man, game);

    /**
     * Tracks if a key is already down, so we don't repeat
     *
     * @property keydown
     * @type Object
     * @readOnly
     */
    this.keydown = {};

    document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    document.addEventListener('keyup', this.onKeyUp.bind(this), false);
};

gf.inherits(gf.input.Keyboard, gf.input.Input, {
    //on keydown event set gf.controls keycode's action as active
    //and call any registered callbacks
    onKeyDown: function(e, override) {
        return this.modifyKey(e, override || e.keyCode || e.which, true);
    },
    onKeyUp: function(e, override) {
        return this.modifyKey(e, override || e.keyCode || e.which, false);
    },
    modifyKey: function(e, key, val) {
        if(this.binds[key]) {
            //Don't fire events for repeats
            if(this.keydown[key] === val)
                return this.preventDefault(e);

            //track that the action has changed state
            this.keydown[key] = val;
            this.status[this.binds[key]] = val;

            //call each callback
            this.runCallbacks(key, [val]);

            return this.preventDefault(e);
        }

        return true;
    }
});
gf.input.Gamepad = function(man, game) {
    gf.input.Input.call(this, man, game);

    //are we polling for status/connections?
    this.ticking = false;

    //the currently activated gamepads list
    this.pads = [];

    //timestamp tracking for state changes
    this.prevTimestamps = [];

    this.buttons = new gf.input.GamepadButtons(man, game);
    this.sticks = new gf.input.GamepadSticks(man, game);

    //Firefox uses connect/disconnect events so listen to those
    window.addEventListener('MozGamepadConnected', this.onGamepadConnect.bind(this), false);
    window.addEventListener('MozGamepadDisconnected', this.onGamepadDisconnect.bind(this), false);

    //Since chrome only supports polling, we have to start looping immediately
    if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
        this.startPolling();
    }
};

gf.inherits(gf.input.Gamepad, gf.input.Input, {
    //When a gamepad is connected (currently FF only)
    onGamepadConnect: function(event) {
        //add the gamepad to our list
        this.pads.push(event.gamepad);

        //start polling
        this.startPolling();
    },
    onGamepadDisconnect: function(event) {
        //remove the gamepad from our list
        for(var i = 0, il = this.pads.length; i < il; ++i) {
            if(this.pads[i].index === event.gamepad.index) {
                this.pads.splice(i, 1);
                break;
            }
        }

        //if no pads left connected, stop polling
        if(this.pads.length === 0)
            this.stopPolling();
    },
    startPolling: function() {
        if(this.ticking) return;

        this.ticking = true;
        this.update();
    },
    stopPolling: function() {
        this.ticking = false;
    },
    //called on Chrome, which doesn't do the connect/disconnect events
    pollGamepads: function() {
        //get a list of connected gamepads
        var rawPads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

        if(rawPads) {
            //reset the pads list
            this.pads.length = 0;

            //don't use the raw array from the browser, since it can have "holes"
            //if you plug in 2, then remove the first the second one is still index 1 (not 0)
            for(var i = 0, il = rawPads.length; i < il; ++i) {
                if(rawPads[i]) {
                    this.pads.push(rawPads[i]);
                }
            }
        }
    },
    pollStatus: function() {
        for(var i = 0, il = this.pads.length; i < il; ++i) {
            var pad = this.pads[i];
            //don't do anything if the current timestamp is the same as the previous one
            //(meaning the state has not changed). This is a chrome-only feature right now,
            //so first we have to check if it is empty as well
            if(pad.timestamp && (pad.timestamp === gf.gamepad.prevTimestamps[i]))
                continue;

            this.prevTimestamps[i] = pad.timestamp;
            this.buttons.pollStatus(pad);
            this.sticks.pollStatus(pad);
        }
    },
    update: function() {
        if(!this.ticking) return;

        //DAMN YOU CHROME!
        this.pollGamepads();

        //poll for the status of our gamepads
        this.pollStatus();
    },
    bindButton: function(code, action, cb) {
        this.buttons.bind(code, action, cb);
        return this;
    },
    //bind an action to a stick movement
    bindStick: function(code, negative, action, cb) {
        this.sticks.bind(code, negative, action, cb);
        return this;
    },
    //unbind an action from a gamepad button
    unbindButton: function(code, action) {
        this.buttons.unbind(code, action);
        return this;
    },
    //bind an action to a stick movement
    unbindStick: function(code, negative, action) {
        this.sticks.unbind(code, negative, action);
        return this;
    }
});
gf.input.GamepadButtons = function(man, game) {
    gf.input.Input.call(this, man, game);

    /**
     * The threshold at which we consider a button "pressed"
     *
     * @property threshold
     * @type Number
     * @default 0.4
     */
    this.threshold = 0.4;

    //track the status of each button
    this.buttons = {};
};

gf.inherits(gf.input.GamepadButtons, gf.input.Input, {
    pollStatus: function(pad) {
        //I would like to be able to emit events when something updates, but for now
        //just update the status of bound keys in controls; controls only has 1 "gamepad"
        //so this loop will blow away the changes each iteration (only the "last" gamepad is supported)
        for(var b = 0, bl = pad.buttons.length; b < bl; ++b) {
            if(!this.binds[b]) continue;

            var pressed = (pad.buttons[b] > this.threshold);

            if(!this.buttons[b])
                this.buttons[b] = { pressed: false, code: b };

            this.buttons[b].val = pad.buttons[b];

            //state changed
            if(this.buttons[b].pressed !== pressed) {
                this.buttons[b].pressed = pressed;
                this.status[this.binds[b]] = pressed;
                this.runCallbacks(b, [pressed]);
            }
        }
    }
});
gf.input.GamepadSticks = function(man, game) {
    gf.input.Input.call(this, man, game);

    /**
     * The threshold at which we consider a stick "moved"
     *
     * @property threshold
     * @type Number
     * @default 0.5
     */
    this.threshold = 0.5;

    //track the status of the axes
    this.axes = {};
};

gf.inherits(gf.input.GamepadSticks, gf.input.Input, {
    bind: function(code, negative, action, cb) {
        negative = !!negative; //I want negative to be true/false, not truthy or falsey

        return this._doBind(code + negative, action, cb);
    },
    unbind: function(code, negative, action) {
        negative = !!negative; //I want negative to be true/false, not truthy or falsey

        return this._doUnbind(code + negative, action);
    },
    pollStatus: function(pad) {
        for(var a = 0, al = pad.axes.length; a < al; ++a) {
            var neg = ['true', 'false'];
            for(var i = 0, il = neg.length; i < il; ++i) {
                var v = neg[i];
                if(!this.binds[a + v]) continue;

                var moved = v === 'true' ? (pad.axes[a] < -gf.gamepad.AXIS_THRESHOLD) : (pad.axes[a] > gf.gamepad.AXIS_THRESHOLD);

                if(!this.axes[a + v])
                    this.axes[a + v] = { moved: false, code: a, negative: v === 'true' };

                this.axes[a + v].val = pad.axes[a];

                //movement state updated
                if(this.axes[a + v].moved !== moved) {
                    this.axes[a + v].moved = moved;
                    this.status[this.binds[a + v]] = moved;
                    this.runCallbacks(a + v, [pad.axes[a]]);
                }
            }
        }
    }
});
gf.Font = function(font, settings) {
    this.align = 'left';
    this.baseline = 'top';
    this.lineWidth = 1;
    this.lineHeight = 1;

    this.text = '';

    gf.DisplayObject.call(this, null, 0, settings);
};

gf.inherits(gf.Font, gf.DisplayObject, {
    setText: function(txt) {
        this.text = txt;
    }
});
gf.TextureFont = function(font, settings) {
    this.ext = '';

    this.map = {
        '`': 'accent',
        '~': 'tilde',
        '!': 'exclamation',
        '@': 'at',
        '#': 'hash',
        '$': 'dollar',
        '%': 'percent',
        '^': 'carret',
        '&': 'ampersand',
        '*': 'asterisk',
        '(': 'open-parenthesis',
        ')': 'close-parenthesis',
        '-': 'dash',
        '_': 'underscore',
        '+': 'plus',
        '=': 'equal',
        '{': 'open-brace',
        '}': 'close-brace',
        '[': 'open-bracket',
        ']': 'close-bracket',
        '\\': 'backslash',
        '|': 'pipe',
        ':': 'colon',
        ';': 'semicolon',
        '"': 'quote',
        '\'': 'single-quote',
        '<': 'less-than',
        '>': 'greater-than',
        ',': 'comma',
        '.': 'period',
        '?': 'question',
        '/': 'slash'
    };

    this.spaceSize = 15;

    gf.Font.call(this, font, settings);

    if(typeof font === 'string') {
        if(gf.assetCache[font])
            font = gf.assetCache[font];
        else
            throw 'Unknown texture ' + font + ', please load the sprite sheet first!';
    }

    this.textures = font;

    if(this.ext && this.ext.charAt(0) !== '.')
        this.ext = '.' + this.ext;

    this.sprites = new gf.ObjectPool(PIXI.Sprite, this);
};

gf.inherits(gf.TextureFont, gf.Font, {
    _getSprite: function(ch) {
        if(this.map[ch])
            ch = this.map[ch];

        //skips spaces
        if(ch === '' || ch === ' ')
            return null;

        var texture = this.textures[ch + this.ext];

        //try character code
        if(!texture)
            texture = this.textures['#' + ch.charCodeAt(0) + this.ext];

        //if no match, error
        if(!texture)
            throw 'there is no texture for character "' + ch + '" with extension "' + this.ext + '"';

        var spr = this.sprites.create(texture);

        spr.setTexture(texture);
        spr.visible = true;

        return spr;
    },
    clone: function() {
        return new gf.TextureFont(this.textures, {
            ext: this.ext,
            map: this.map,
            text: this.text,
            align: this.align,
            baseline: this.baseline,
            lineWidth: this.lineWidth,
            lineHeight: this.lineHeight
        });
    },
    setText: function(txt) {
        this.text = txt;

        //free all sprites
        this.sprites.freeAll();
        for(var c = 0, cl = this.children.length; c < cl; ++c)
            this.children[c].visible = false;

        //add text sprites
        var strs = this.text.toString().split('\n'),
            h = 0,
            x = 0,
            y = 0;

        for(var i = 0, il = strs.length; i < il; ++i) {
            var str = strs[i];

            //create the string sprites
            for(var s = 0, sl = str.length; s < sl; ++s) {
                var ch = str.charAt(s),
                    spr = this._getSprite(ch);

                if(spr !== null) {
                    spr.position.x = x;
                    spr.position.y = y;

                    if(spr.texture.frame.height > h)
                        h = spr.texture.frame.height;

                    x += spr.texture.frame.width * this.lineWidth;
                } else {
                    x += this.spaceSize * this.lineWidth;
                }

            }

            y += h * this.lineHeight;
        }
    }
});
/**
 * The base Gui that holds GuiItems to be presented as a Gui
 *
 * @class Gui
 * @extends DisplayObject
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.Gui = function(pos, settings) {
    /**
     * The name of the Gui
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    gf.DisplayObject.call(this, null, pos, settings);
};

gf.inherits(gf.Gui, gf.DisplayObject);

/**
 * The base GuiItem that represents an element of a gui on the screen.
 *
 * @class GuiItem
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.GuiItem = function(pos, settings) {
    /**
     * Whether or not the item needs an update
     *
     * @property dirty
     * @type Boolean
     * @default true
     */
    this.dirty = true;

    //allow user to pass the sprite texture as "image" to a GuiItem.
    settings.texture = settings.texture || settings.image;
    gf.Sprite.call(this, null, pos, settings);
};

gf.inherits(gf.GuiItem, gf.Sprite, {
});

/**
 * The Hud that holds HudItems to be presented as a Hud
 *
 * @class Hud
 * @extends DisplayObject
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.Hud = function(pos, settings) {
    gf.Gui.call(this, pos, settings);
};

gf.inherits(gf.Hud, gf.Gui);

/**
 * The base HudItem that represents an element of a hud on the screen.
 *
 * @class HudItem
 * @extends GuiItem
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.HudItem = function(pos, settings) {
    /**
     * The value of the item
     *
     * @property name
     * @type Mixed
     * @default ''
     */
    this.value = '';

    /**
     * Sets whether or not you can drag the HudItem around
     *
     * @property draggable
     * @type Boolean
     * @default false
     */
    this.draggable = false;

    /**
     * [read only] Describes if the current item is being dragged or not
     *
     * @property dragging
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.dragging = false;

    /**
     * The font to use for text
     *
     * @property font
     * @type Font
     */
    this.font = null;

    gf.GuiItem.call(this, pos, settings);

    /**
     * The initial value of the item to reset to
     *
     * @property initialValue
     * @type Mixed
     */
    this.initialValue = this.value;

    if(this.font instanceof gf.Font)
        this.addChild(this.font);
    else {
        this.font = new gf.Font();
        this.addChild(this.font);
    }

    this.sprites = new gf.ObjectPool(PIXI.Sprite, this);
};

gf.inherits(gf.HudItem, gf.GuiItem, {
    /**
     * Resets the value to the initialValue
     *
     * @method reset
     * @return {HudItem} Returns itself for chainability
     */
    reset: function() {
        return this.set(this.initialValue);
    },
    /**
     * Sets the value of the item
     *
     * @method set
     * @return {HudItem} Returns itself for chainability
     */
    set: function(val) {
        this.font.setText(val);
        this.value = val;
        return this;
    },

    onDragStart: function() {},
    onDragEnd: function() {},

    click: function() {},
    mousedown: function(e) {
        if(!this.draggable) return;

        this.dragging = {
            x: e.clientX,
            y: e.clientY
        };
        this.onDragStart(e);
    },
    mouseup: function(e) {
        this.dragging = false;
        this.onDragEnd(e);
    },
    mousemove: function(e) {
        if(!this.draggable || !this.dragging) return;

        var diffX = e.clientX - this.dragging.x,
            diffY = e.clientY - this.dragging.y,
            pos = gf.utils.getPosition(this.elm);

        this.dragging.x = e.clientX;
        this.dragging.y = e.clientY;

        this.elm.style.top = pos.top + diffY;
        this.elm.style.left = pos.left + diffX;
    }
});

/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @class Map
 * @extends DisplayObject
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.Map = function(game, pos, map) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.size = new gf.Vector(map.width, map.height);

    //call base ctor
    gf.DisplayObject.call(this, game, pos, map);
};

gf.inherits(gf.Map, gf.DisplayObject, {
    /**
     * Gets a layer based on the layer's id or name
     *
     * @method getLayer
     * @param id {Number|String} The layer's number id or string name.
     * @return {Layer} Returns the found layer, or null if not found
     */
    getLayer: function(id) {
        if(typeof id === 'number')
            return this.layers[id] || null; //return null if not found

        if(typeof id === 'string')
            for(var i = 0, il = this.children.length; i < il; ++i)
                if(this.children[i].name === id)
                    return this.children[i];

        return null;
    },
    /**
     * Pans the map around
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Map} Returns itself for chainability
     */
    pan: function(x, y) {
        y = x instanceof gf.Point ? x.y : (y || 0);
        x = x instanceof gf.Point ? x.x : (x || 0);

        this.position.x += x;
        this.position.y += y;

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.pan)
                o.pan(x, y);
        }
    }
});
/**
 * Base Layer implementation, provides common functions for all Layer types
 *
 * @class Layer
 * @extends DisplayObject
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
gf.Layer = function(game, pos, layer) {
    /**
     * The name of the layer
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    /**
     * The size of the layer
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(1, 1)
     */
    this.size = new gf.Vector(layer.width || 0, layer.height || 0);

    //call base ctor
    gf.DisplayObject.call(this, game, pos, layer);
};

gf.inherits(gf.Layer, gf.DisplayObject, {
    /**
     * Pans the layer around, rendering stuff if necessary
     *
     * @method pan
     * @param dx {Number|Point} The x amount to pan, if a Point is passed the dy param is ignored
     * @param dy {Number} The y ammount to pan
     * @return {Layer} Returns itself for chainability
     */
    pan: function() {
    }
});
/**
 * Base Tile implementation, a tile is a single tile in a tilemap layer
 *
 * @class Tile
 * @extends Entity
 * @constructor
 * @param tile {Object} All the settings for the tile
 */
gf.Tile = function(game, pos, settings) {
    this.collisionType = gf.Tile.TYPE.NONE;

    //call base ctor
    gf.Entity.call(this, game, pos, settings);

    this.type = gf.Entity.TYPE.TILE;

    /*
    var spr = this.tiles[tileX][tileY];
    spr.tile = tile;
    spr.setInteractive(true);
    spr.click = function() {
        window.console.log(spr.tile, spr.parent.name);
    };
    */
};

gf.inherits(gf.Tile, gf.Entity, {
});

/**
 * Tile collision types
 *
 * @property COLLISION
 * @type Object
 */
gf.Tile.TYPE = {
    NONE: 'none',
    SOLID: 'solid',
    CLIFF: 'cliff',
    LADDER: 'ladder',
    WATER: 'water',
    DEEP_WATER: 'deep_water'
};
/**
 * Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @class TiledMap
 * @extends Map
 * @constructor
 * @param game {Game} The game the map is in
 * @param position {Point|Vector|Array|Number} The starting position of the map
 * @param map {Object} All the settings for the map
 */
gf.TiledMap = function(game, pos, map) {
    gf.Map.call(this, game, pos, map);

    this.scale.x = parseFloat(map.properties.scale, 10) || 1;
    this.scale.y = parseFloat(map.properties.scale, 10) || 1;

    //Tiled Editor properties

    /**
     * The tile size
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(
        map.tilewidth,
        map.tileheight
    );

    /**
     * The orientation of the map
     *
     * @property orientation
     * @type String
     */
    this.orientation = map.orientation;

    /**
     * The version of the TMX format
     *
     * @property version
     * @type Number
     */
    this.version = map.version;

    /**
     * The background color of the map (since Tiled 0.9.0)
     *
     * @property backgroundColor
     * @type Number
     */
    this.backgroundColor = map.backgroundColor;

    /**
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = map.properties || {};

    //Custom/Optional properties

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

    /**
     * The layer for collisions
     *
     * @property collisionLayer
     * @type Array
     */
    this.collisionLayer = [];

    /**
     * The scaled tile size
     *
     * @property scaledTileSize
     * @type Vector
     */
    this.scaledTileSize = new gf.Vector(
        map.tilewidth * this.scale.x,
        map.tileheight * this.scale.y
    );

    /**
     * The real size (size * scaledTileSize)
     *
     * @property realSize
     * @type Vector
     */
    this.realSize = new gf.Vector(
        this.size.x * this.scaledTileSize.x,
        this.size.y * this.scaledTileSize.y
    );

    /**
     * The tileset for the collision layer
     *
     * @property collisionTileset
     * @type TiledTileset
     */
    this.collisionTileset = null;

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        var len = this.tilesets.push(new gf.TiledTileset(map.tilesets[t]));

        if(this.tilesets[len-1].name.toLowerCase().indexOf('collider') === 0)
            this.collisionTileset = this.tilesets[len-1];
    }

    //create the layers
    var numX = Math.ceil(this.game.renderer.view.width / this.scaledTileSize.x),
        numY = Math.ceil(this.game.renderer.view.height / this.scaledTileSize.y);

    //special case where viewport is larger than map
    if(numX > this.size.x)
        numX = this.size.x;

    if(numY > this.size.y)
        numY = this.size.y;

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case 'tilelayer':
                lyr = new gf.TiledLayer(this.game, 0, map.layers[i]);
                this.addChild(lyr);

                //lyr.scale = this.scale;
                lyr.renderTiles(
                    Math.floor(this.position.x / this.tileSize.x),
                    Math.floor(this.position.y / this.tileSize.y),
                    numX,
                    numY
                );

                if(lyr.name.toLowerCase().indexOf('collision') === 0) {
                    this.collisionLayer = lyr;

                    if(!gf.debug.showMapColliders)
                        lyr.visible = false;
                }
                break;

            case 'objectgroup':
                lyr = new gf.TiledObjectGroup(this.game, 0, map.layers[i]);
                this.addChild(lyr);

                //auto spawn the player object group
                if(lyr.name === 'player' && !lyr.properties.manual)
                    lyr.spawn();

                break;

            case 'imagelayer':
                lyr = new gf.ImageLayer(this.game, 0, {
                    texture: map.layers[i]
                });
                this.addChild(lyr);

                break;
        }
    }

    //rotate for isometric maps
    if(this.orientation === 'isometric') {
        this.position.x += (this.realSize.x / 2) - (this.tileSize.x / 2);
    }
};

gf.inherits(gf.TiledMap, gf.Map, {
    /**
     * Gets the tileset that an ID is associated with
     *
     * @method getTileset
     * @param tileId {Number} The id of the tile to find the tileset for
     * @return {TiledTileset}
     */
    getTileset: function(tileId) {
        for(var i = 0, il = this.tilesets.length; i < il; ++i)
            if(tileId >= this.tilesets[i].firstgid && tileId <= this.tilesets[i].lastgid)
                return this.tilesets[i];
    },
    /**
     * Checks an entities collision with the collision layer of this map
     *
     * @method checkCollision
     * @param ent {Entity} The entity to check
     * @param sz {Vector} The size of the entity
     * @param pv {Vector} The potential movement vector
     */
    //see: http://stackoverflow.com/questions/2576412/tile-map-collision-detection
    checkCollision: function(ent, pv) {
        if(!this.collisionLayer || !this.collisionTileset || (pv.x === 0 && pv.y === 0))
            return [];

        if(gf.debug._showColliders && !this.sprites) {
            this.sprites = new gf.ObjectPool(PIXI.Sprite, this);
        }

        //collider overlays
        if(gf.debug._showColliders) {
            this.sprites.freeAll();
            for(var s = 0; s < this.sprites.pool.length; ++s)
                this.sprites.pool[s].visible = false;
        }

            //get movement vector and normalize as our step
        var step = pv.clone().normalize(),
            pos = ent.position,
            width = ent.currentAnim ? ent.currentAnim.width : pos.x,
            height = ent.currentAnim ? ent.currentAnim.height : pos.y,
            i = 0,
            il = 0,
            tile = null,
            res = [];

        //scan along the right face of the bound box
        if(step.x > 0) {
            for(i = pos.y, il = pos.y + height; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        pos.x + width,
                        i
                    ),
                    step,
                    pv,
                    'x'
                );
                if(tile) break;
            }
        }
        //scan along the left face of the bound box
        else if(step.x < 0) {
            for(i = pos.y, il = pos.y + height; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        pos.x,
                        i
                    ),
                    step,
                    pv,
                    'x'
                );
                if(tile) break;
            }
        }

        if(tile) {
            res.push(tile);
            tile = null;
        }

        //scan along the bottom face of the bound box
        if(step.y > 0) {
            for(i = pos.x, il = pos.x + width; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        i,
                        pos.y + height
                    ),
                    step,
                    pv,
                    'y'
                );
                if(tile) break;
            }
        }
        //scan along the top face of the bound box
        else if(step.y < 0) {
            for(i = pos.x, il = pos.x + width; i < il; ++i) {
                tile = this._checkPoint(
                    new gf.Point(
                        i,
                        pos.y
                    ),
                    step,
                    pv,
                    'y'
                );
                if(tile) break;
            }
        }

        if(tile) {
            res.push(tile);
            tile = null;
        }

        return res;
    },
    _showCollider: function(id, cell) {
        var text = this.collisionTileset.getTileTexture(id);
        if(text) {
            var spr = this.sprites.create(text);
            spr.position.x = cell.x * this.tileSize.x;
            spr.position.y = cell.y * this.tileSize.y;
            spr.alpha = 0.5;
            spr.visible = true;
            spr.setTexture(text);
        }
    },
    _checkPoint: function(start, step, pv, ax) {
        step = step.clone();

        //end location
        var end = new gf.Point(
            (start.x + pv.x),
            (start.y + pv.y)
        ),
        //original cell location
        cell = new gf.Point(
            Math.floor(start.x / this.tileSize.x),
            Math.floor(start.y / this.tileSize.y)
        ),
        //end cell
        endCell = new gf.Point(
            Math.floor(end.x / this.tileSize.x),
            Math.floor(end.y / this.tileSize.y)
        ),
        //the distance between 2 consectutive vertical lines
        tDelta = new gf.Vector(
            this.tileSize.x / Math.abs(step.x),
            this.tileSize.y / Math.abs(step.y)
        ),
        //temp and return vars
        tMax = new gf.Point(),
        id = 0,
        tile = null;

        if(end.x > start.x) {
            tMax.x = step.x === 0 ? 0 : ((cell.x + 1) * this.tileSize.x - start.x) / step.x;
        } else {
            tMax.x = step.x === 0 ? 0 : (cell.x * this.tileSize.x - start.x) / step.x;
        }

        if(end.y > start.y) {
            tMax.y = step.y === 0 ? 0 : ((cell.y + 1) * this.tileSize.y - start.y) / step.y;
        } else {
            tMax.y = step.y === 0 ? 0 : (cell.y * this.tileSize.y - start.y) / step.y;
        }

        //ceil afterwards so tDelta and tMax are correct
        step.x = step.x < 0 ? Math.floor(step.x) : Math.ceil(step.x);
        step.y = step.y < 0 ? Math.floor(step.y) : Math.ceil(step.y);

        //check the cell currently on
        id = this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))];
        tile = this.collisionTileset.getTileProperties(id);
        if(tile && tile.isCollidable) {
            if(gf.debug._showColliders)
                this._showCollider(id, cell);

            return { axis: ax, tile: tile };
        }

        //scan all the tiles along the movement vector
        while(cell.x !== endCell.x || cell.y !== endCell.y) {
            if(tMax.x < tMax.y) {
                tMax.x += tDelta.x;
                cell.x += step.x;
                ax = 'x';
            } else {
                tMax.y += tDelta.y;
                cell.y += step.y;
                ax = 'y';
            }

            id = this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))];
            tile = this.collisionTileset.getTileProperties(id);
            if(tile && tile.isCollidable) {
                if(gf.debug._showColliders)
                    this._showCollider(id, cell);

                return { axis: ax, tile: tile };
            }
        }
    },
    /**
     * Notifies the map it needs to resize, re renders the viewport
     *
     * @method resize
     * @private
     */
    resize: function() {
        var numX = Math.ceil(this.game.renderer.view.width / this.scaledTileSize.x),
            numY = Math.ceil(this.game.renderer.view.height / this.scaledTileSize.y);

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o instanceof gf.TiledLayer && o.visible) {
                o.renderTiles(
                    Math.floor(this.position.x / this.scaledTileSize.x),
                    Math.floor(this.position.y / this.scaledTileSize.y),
                    numX,
                    numY
                );
            }
        }
    },
    forEachEntity: function(fn) {
        //go through each object group and call for each entity. This is slightly more efficient
        //than the generic DisplayObject version since we can skip over checking all the TiledLayers
        //which will never have any Entities in them.
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.children[i] instanceof gf.TiledObjectGroup)
                this.children[i].forEachEntity(fn);

            if(this.children[i] instanceof gf.Entity)
                fn(this.children[i]);
        }
    },
    //WIP
    _checkHalfBlock: function(half, x, y) {
        var tx = Math.floor(x / this.scaledTileSize.x) * this.scaledTileSize.x,
            ty = Math.floor(y / this.scaledTileSize.y) * this.scaledTileSize.y,
            midX = tx + ((this.scaledTileSize.x) / 2),
            endX = tx + (this.scaledTileSize.x),
            midY = ty - ((this.scaledTileSize.y) / 2),
            endY = ty - (this.scaledTileSize.y);

        switch(half) {
            case gf.types.HALF.LEFT:
                return (x > tx && x < midX);

            case gf.types.HALF.RIGHT:
                return (x > midX && x < endX);

            case gf.types.HALF.TOP:
                return (y > midY && y < ty);

            case gf.types.HALF.BOTTOM:
                return (y > endY && y < midY);
        }

        return false;
    }
});

/**
 * The TiledLayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the TiledMap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @class TiledLayer
 * @extends Layer
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
gf.TiledLayer = function(game, pos, layer) {
    gf.Layer.call(this, game, pos, layer);

    //Tiled Editor properties

    /**
     * The tile IDs of the tilemap
     *
     * @property name
     * @type Uint32Array
     */
    this.tileIds = gf.support.typedArrays ? new Uint32Array(layer.data) : layer.data;

    /**
     * The tile pool for rendering tiles
     *
     * @property tilePool
     * @type Object
     */
    this.tiles = {};

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;
    this.visible = layer.visible;

    this._tileBufferSize = 2;
    this._panDelta = new gf.Vector(0, 0);
    this._rendered = new PIXI.Rectangle(0, 0, 0, 0);
};

gf.inherits(gf.TiledLayer, gf.Layer, {
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method renderTiles
     */
    renderTiles: function(startX, startY, numX, numY) {
        //add a tile buffer around the viewport
        startX -= this._tileBufferSize;
        numX += this._tileBufferSize * 2;
        startY -= this._tileBufferSize;
        numY += this._tileBufferSize * 2;

        //render new sprites
        for(var x = startX; x < numX; ++x) {
            //skip things outside the map size
            if(x < 0 || x >= this.parent.size.x)
                continue;

            for(var y = startY; y < numY; ++y) {
                //skip things outside the map size
                if(y < 0 || y >= this.parent.size.y)
                    continue;

                this.moveTileSprite(x, y, x, y);
            }
        }

        this._rendered.x = startX;
        this._rendered.y = startY;
        this._rendered.width = numX;
        this._rendered.height = numY;
        this._rendered.left = this._rendered.x;
        this._rendered.right = this._rendered.x + this._rendered.width;
        this._rendered.top = this._rendered.y;
        this._rendered.bottom = this._rendered.y + this._rendered.height;
    },
    /**
     * Moves a tile sprite from one position to another,
     * creating it if the old position didn't have a sprite
     *
     * @method moveTileSprite
     * @param fromTileX {Number} The x coord of the tile in units of tiles (not pixels) to move from
     * @param fromTileY {Number} The y coord of the tile in units of tiles (not pixels) to move from
     * @param toTileX {Number} The x coord of the tile in units of tiles (not pixels) to move to
     * @param toTileY {Number} The y coord of the tile in units of tiles (not pixels) to move to
     * @return {PIXI.Sprite} The sprite to display
     */
    moveTileSprite: function(fromTileX, fromTileY, toTileX, toTileY) {
        var tile,
            id = (toTileX + (toTileY * this.size.x)),
            tileId = this.tileIds[id],
            set = this.parent.getTileset(tileId),
            iso = (this.parent.orientation === 'isometric'),
            texture,
            props,
            position;

        if(!set) return;

        texture = set.getTileTexture(tileId);
        props = set.getTileProperties(tileId);
        position = iso ?
            // Isometric position
            [
                (toTileX * this.parent.tileSize.y) - (toTileY * (this.parent.tileSize.x / 2)),// + set.tileoffset.x,
                (toTileY * (this.parent.tileSize.y / 2)) + (toTileX * (this.parent.tileSize.y / 2))// + set.tileoffset.y
            ]
            :
            // Orthoganal position
            [
                toTileX * this.parent.tileSize.x,
                toTileY * this.parent.tileSize.y
            ];

        //get the cached tile from the pool, and set the properties
        if(this.tiles[fromTileX] && this.tiles[fromTileX][fromTileY]) {
            tile = this.tiles[fromTileX][fromTileY];

            tile.collisionType = props.type;
            tile.setTexture(texture);
            tile.setCollidable(props.isCollidable);
            tile.setPosition(position);

            //move the sprite in the pool
            if(!this.tiles[toTileX]) this.tiles[toTileX] = {};

            this.tiles[toTileX][toTileY] = tile;
            this.tiles[fromTileX][fromTileY] = null;
        }
        //if there is no tile there yet, create one
        else {
            if(!this.tiles[toTileX])
                this.tiles[toTileX] = {};

            tile = this.tiles[toTileX][toTileY] = new gf.Tile(this.game, position, {
                texture: texture,
                mass: Infinity,
                width: set.tileSize.x,
                height: set.tileSize.y,
                collidable: props.isCollidable,
                collisionType: props.type
            });

            this.addChild(tile);
        }

        return tile;
    },
    /**
     * Pans the layer around, rendering stuff if necessary
     *
     * @method pan
     * @param dx {Number|Point} The x amount to pan, if a Point is passed the dy param is ignored
     * @param dy {Number} The y ammount to pan
     * @return {Layer} Returns itself for chainability
     */
    pan: function(dx, dy) {
        this._panDelta.x += dx;
        this._panDelta.y += dy;

        //moved position right, so render left
        while(this._panDelta.x >= this.parent.scaledTileSize.x) {
            this._renderLeft();
            this._panDelta.x -= this.parent.scaledTileSize.x;
        }

        //moved position left, so render right
        while(this._panDelta.x <= -this.parent.scaledTileSize.x) {
            this._renderRight();
            this._panDelta.x += this.parent.scaledTileSize.x;
        }

        //moved position down, so render up
        while(this._panDelta.y >= this.parent.scaledTileSize.y) {
            this._renderUp();
            this._panDelta.y -= this.parent.scaledTileSize.y;
        }

        //moved position up, so render down
        while(this._panDelta.y <= -this.parent.scaledTileSize.y) {
            this._renderDown();
            this._panDelta.y += this.parent.scaledTileSize.y;
        }
    },
    _renderLeft: function() {
        //move all the far right tiles to the left side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                this._rendered.right, this._rendered.top + i,
                this._rendered.left, this._rendered.top + i
            );
        }
        this._rendered.x--;
        this._rendered.left--;
        this._rendered.right--;
    },
    _renderRight: function() {
        //move all the far left tiles to the right side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                this._rendered.left, this._rendered.top + i,
                this._rendered.right, this._rendered.top + i
            );
        }
        this._rendered.x++;
        this._rendered.left++;
        this._rendered.right++;
    },
    _renderUp: function() {
        //move all the far bottom tiles to the top side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                this._rendered.left + i, this._rendered.bottom,
                this._rendered.left + i, this._rendered.top
            );
        }
        this._rendered.y--;
        this._rendered.top--;
        this._rendered.bottom--;
    },
    _renderDown: function() {
        //move all the far top tiles to the bottom side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                this._rendered.left + i, this._rendered.top,
                this._rendered.left + i, this._rendered.bottom
            );
        }
        this._rendered.y++;
        this._rendered.top++;
        this._rendered.bottom++;
    }
});

/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @class TiledTileset
 * @extends Texture
 * @constructor
 * @param settings {Object} All the settings for the tileset
 */
//TODO: Support external tilesets (TSX files) via the "source" attribute
//see: https://github.com/bjorn/tiled/wiki/TMX-Map-Format#tileset
gf.TiledTileset = function(settings) {
    if(!gf.assetCache[settings.name + '_texture']) {
        var loader = new gf.AssetLoader();
        loader.loadTexture(settings.name + '_texture', settings.image);
    }

    //initialize the base Texture class
    gf.Texture.call(this, gf.assetCache[settings.name + '_texture'].baseTexture);

    //Tiled Editor properties

    /**
     * The first tileId in the tileset
     *
     * @property firstgid
     * @type Number
     */
    this.firstgid = settings.firstgid;

    /**
     * The name of the tileset
     *
     * @property name
     * @type String
     */
    this.name = settings.name;

    /**
     * The size of a tile in the tileset
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(settings.tilewidth, settings.tileheight);

    /**
     * The spacing around a tile in the tileset
     *
     * @property spacing
     * @type Number
     */
    this.spacing = settings.spacing || 0;

    /**
     * The margin around a tile in the tileset
     *
     * @property margin
     * @type Number
     */
    this.margin = settings.margin || 0;

    /**
     * The offset of tile positions when rendered
     *
     * @property tileoffset
     * @type Number
     */
    this.tileoffset = new gf.Vector(
        settings.tileoffset ? settings.tileoffset.x : 0,
        settings.tileoffset ? settings.tileoffset.y : 0
    );

    //TODO: Support for "tileoffset," "terraintypes," "image"
    //see: https://github.com/bjorn/tiled/wiki/TMX-Map-Format#tileset

    //Custom/Optional properties

    /**
     * The number of tiles calculated based on size, margin, and spacing
     *
     * @property numTiles
     * @type Vector
     */
    this.numTiles = new gf.Vector(
        ~~((this.baseTexture.source.width - this.margin) / (this.tileSize.x + this.spacing)),
        ~~((this.baseTexture.source.height - this.margin) / (this.tileSize.y + this.spacing))
    );

    /**
     * The last tileId in the tileset
     *
     * @property lastgid
     * @type Number
     */
    this.lastgid = this.firstgid + (((this.numTiles.x * this.numTiles.y) - 1) || 0);

    /**
     * The properties of the tileset
     *
     * @property properties
     * @type Object
     */
    this.properties = settings.properties || {};

    /**
     * The properties of the tiles in the tileset (like collision stuff)
     *
     * @property tileproperties
     * @type Object
     */
    this.tileproperties = settings.tileproperties || {};

    /**
     * The size of the tileset
     *
     * @property size
     * @type Vector
     */
    this.size = new gf.Vector(settings.imagewidth, settings.imageheight);

    /**
     * The texture instances for each tile in the set
     *
     * @property textures
     * @type Array
     */
    this.textures = [];

    //massage tile properties
    for(var i in this.tileproperties) {
        var v = this.tileproperties[i];

        if(v.normal) v.normal = gf.utils.ensureVector(v.normal);

        if(v.isCollidable === 'true') v.isCollidable = true;
        if(v.isBreakable === 'true') v.isBreakable = true;
    }

    //generate tile textures
    for(var t = 0, tl = this.lastgid - this.firstgid + 1; t < tl; ++t) {
        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(t / this.numTiles.x),
            x = (t - (y * this.numTiles.x));

        this.textures.push(
            new gf.Texture(
                this.baseTexture,
                new PIXI.Rectangle(
                    (x * this.tileSize.x),
                    (y * this.tileSize.y),
                    this.tileSize.x,
                    this.tileSize.y
                )
            )
        );
    }
};

gf.inherits(gf.TiledTileset, gf.Texture, {
    /**
     * Gets the tile properties for a tile based on it's ID
     *
     * @method getTileProperties
     * @param tileId {Number} The id of the tile to get the properties for
     * @return {Object} The properties of the tile
     */
    getTileProperties: function(tileId) {
        if(tileId === undefined) return null;

        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        return this.tileproperties[tileId] ?
                //get this value
                this.tileproperties[tileId] :
                //set this id to default values and cache
                this.tileproperties[tileId] = {
                    isCollidable: false,
                    isBreakable: false,
                    type: gf.Tile.TYPE.NONE
                };
    },
    /**
     * Gets the tile texture for a tile based on it's ID
     *
     * @method getTileTexture
     * @param tileId {Number} The id of the tile to get the texture for
     * @return {Texture} The texture for the tile
     */
    getTileTexture: function(tileId) {
        if(tileId === undefined) return null;

        //get the internal ID of the tile in this set (0 indexed)
        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        return this.textures[tileId];
    }
});

/**
 * Tiled object group is a special layer that contains entities
 *
 * @class TiledObjectGroup
 * @extends Layer
 * @constructor
 * @param group {Object} All the settings for the layer
 */
 gf.TiledObjectGroup = function(game, pos, group) {
    gf.Layer.call(this, game, pos, group);

    /**
     * The color to display objects in this group
     *
     * @property color
     * @type
     */
    this.color = group.color;

    /**
     * The user-defined properties of this group. Usually defined in the TiledEditor
     *
     * @property properties
     * @type Object
     */
    this.properties = group.properties || {};

    /**
     * The objects in this group that can be spawned
     *
     * @property objects
     * @type Array
     */
    this.objects = group.objects;

    //translate some tiled properties to our inherited properties
    this.position.x = group.x;
    this.position.y = group.y;
    this.alpha = group.opacity;
    this.visible = group.visible;
};

gf.inherits(gf.TiledObjectGroup, gf.Layer, {
    /**
     * Spawns all the entities associated with this layer, and properly sets their attributes
     *
     * @method spawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    spawn: function() {
        for(var i = 0, il = this.objects.length; i < il; ++i) {
            var o = this.objects[i],
                props = o.properties || {};

            props.name = o.name;
            props.type = o.type;
            props.size = [o.width, o.height];
            props.zIndex = this.zIndex;
            props.opacity = this.opacity;
            props.visible = o.visible !== undefined ? (o.visible === 1) : true; //recently added, default old versions to true
            props.position = [o.x, o.y];
            props.rotation = o.rotation;
            props.gid = o.gid;

            //spawn from entity pool
            this.addChild(gf.entityPool.create(this.game, props.name, props));
            this.game.players.push(this.children[i]);
        }

        return this;
    },
    /**
     * Despawns all the entities associated with this layer
     *
     * @method despawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    despawn: function() {
        //remove each entity from the game
        for(var i = this.children.length; i > -1; --i) {
            this.removeChild(this.children[i]);
        }

        return this;
    }
});

var COLLISION_TYPE = {
    ENTITY: 0,
    TILE: 1
};

gf.PhysicsSystem = function(game, options) {
    options = options || {};
    this.game = game;

    this.space = new cp.Space();
    this.space.gravity = gf.utils.ensureVector(options.gravity !== undefined ? options.gravity : 9.87);

    //Time a body must remain idle to fall asleep
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#a928d74741904aae266a9efff5b5f68f7
    this.space.sleepTimeThreshold = options.sleepTimeThreshold || 0.2;

    //Amount of encouraged penetration between colliding shapes.
    //see: http://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_space.html#af1bec644a24e12bfc642a942a88520f7
    this.space.collisionSlop = options.collisionSlop || 0.1;

    //These two collision scenarios are separate because we don't
    //want tiles to collide with tiles all the time

    //entity - entity collisions
    this.space.addCollisionHandler(
        COLLISION_TYPE.ENTITY,
        COLLISION_TYPE.ENTITY,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );

    //entity - tile collisions
    this.space.addCollisionHandler(
        COLLISION_TYPE.ENTITY,
        COLLISION_TYPE.TILE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        null, //postSolve
        null //separate
    );

    //the entity/body pairs added to the physics world
    this.entities = [];
};

gf.PhysicsSystem.prototype._createBody = function(ent) {
    var b;

    if(ent.mass === Infinity) {
        b = this.space.staticBody;
    } else {
        b = this.space.addBody(new cp.Body(
            ent.mass,
            Infinity //cp.momentForBox(ent.mass, ent.width, ent.height)
        ));
    }

    return b;
};

gf.PhysicsSystem.prototype._createShape = function(ent, body) {
    var shape = this.space.addShape(
        new cp.BoxShape(
            body,
            ent.width,
            ent.height
        )
    );

    shape.setElasticity(0);
    shape.setFriction(ent.friction || 0.1);
    shape.gfEntity = ent;
    shape.setCollisionType(this.getCollisionType(ent));

    return shape;
};

gf.PhysicsSystem.prototype.getCollisionType = function(ent) {
    if(ent instanceof gf.Tile) {
        return COLLISION_TYPE.TILE;
    } else {
        return COLLISION_TYPE.ENTITY;
    }
};

gf.PhysicsSystem.prototype.add = function(ent) {
    var body = this._createBody(ent),
        shape = this._createShape(ent, body);


    if(!ent._phys)
        ent._phys = {};

    ent._phys.id = (this.entities.push(ent)) - 1;
    ent._phys.body = body;
    ent._phys.shape = shape;

    //add control body and constraints
    if(body.m !== Infinity) {
        var cbody = new cp.Body(Infinity, Infinity), //control body
            cpivot = this.space.addConstraint(new cp.PivotJoint(cbody, body, cp.vzero, cp.vzero)),
            cgear = this.space.addConstraint(new cp.GearJoint(cbody, body, 0, 1));

        cpivot.maxBias = 0; //disable join correction
        cpivot.maxForce = 10000; //emulate linear friction

        cgear.errorBias = 0; //attempt to fully correct the joint each step
        cgear.maxBias = 1.2; //but limit the angular correction
        cgear.maxForce = 50000; //emulate angular friction

        if(!ent._phys.control)
            ent._phys.control = {};

        ent._phys.control.body = cbody;
        ent._phys.control.pivot = cpivot;
        ent._phys.control.gear = cgear;
    }
};

gf.PhysicsSystem.prototype.remove = function(ent) {
    if(!ent || !ent._phys || !ent._phys.body || !ent._phys.shape)
        return;

    this.space.remove(ent._phys.body);
    this.space.remove(ent._phys.shape);

    ent._phys.shape.gfEntity = null;

    //remove references
    ent._phys.id = null;
    ent._phys.body = null;
    ent._phys.shape = null;
};

gf.PhysicsSystem.prototype.setMass = function(ent, mass) {
    if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setMass(mass);
};

gf.PhysicsSystem.prototype.setVelocity = function(ent, vel) {
    //update control body velocity (and pivot contraint makes regular follow)
    if(ent && ent._phys && ent._phys.control && ent._phys.control.body)
        ent._phys.control.body.setVel(vel);

    //if no control body then update real body
    else if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setVel(vel);
};

gf.PhysicsSystem.prototype.setPosition = function(ent, pos) {
    //update body position
    if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setPos(pos);

    //update control body position
    if(ent && ent._phys && ent._phys.control && ent._phys.control.body)
        ent._phys.control.body.setPos(pos);
};

gf.PhysicsSystem.prototype.setRotation = function(ent, rads) {
    //update control body rotation (and gear contraint makes regular follow)
    if(ent && ent._phys && ent._phys.control && ent._phys.control.body)
        ent._phys.control.body.setAngle(rads);

    //if no control body then update real body
    else if(ent && ent._phys && ent._phys.body)
        ent._phys.body.setAngle(rads);

};

gf.PhysicsSystem.prototype.update = function(dt) {
    //execute the physics step
    this.space.step(dt);

    //go through each changed shape
    this.space.activeShapes.each(function(shape) {
        shape.gfEntity.setPosition(shape.body.p.x, shape.body.p.y, true);
        shape.gfEntity.rotation = shape.body.a;
    });
};

gf.PhysicsSystem.prototype.onCollisionBegin = function(arbiter) {//, space) {
    var shapes = arbiter.getShapes(),
        ent1 = shapes[0].gfEntity,
        ent2 = shapes[1].gfEntity;

    ent1.onCollision(ent2);
    ent2.onCollision(ent1);

    //maintain the colliding state
    return true;
};
//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
/**
 * Namespace for all plugins, it also provides methods for patching
 * core functions, and registering plugins.
 *
 * @class plugin
 */
gf.plugin = {
    Base: function() {},
    /**
     * Patches a core function with a new one. The function you override with has a special property
     * called `this._super` which is a reference to the function you are overriding.
     *
     * @method patch
     * @param obj {Object} The object with the method to override
     * @param name {String} The name of the method to override
     * @param fn {Function} The function to override with
     * @example
     *      //For example, to patch the gf.Sprite.prototype.isActiveAnimation function:
     *
     *      gf.plugin.patch(gf.Sprite, 'isActiveAnimation', function() {
     *          //display a console message
     *          console.log('checking animation!');
     *          //call the original function
     *          this._super();
     *      });
     */
    patch: function(obj, name, fn) {
        if(obj.prototype !== undefined) {
            obj = obj.prototype;
        }

        if(typeof obj[name] === 'function' && typeof fn === 'function') {
            var _super = obj[name];

            obj[name] = (function(name, fn) {
                return function() {
                    var tmp = this._super;

                    this._super = _super;

                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, fn);
        }
        else {
            throw (name + ' is not a function in the passed object.');
        }
    },
    /**
     * Registers a plugin into the gf.plugin namespace.
     *
     * @method register
     * @param plugin {Object} The object to place in the namespace
     * @param name {String} The name of the plugin to use as the key
     * @example
     *      //For example, to register a new plugin:
     *      gf.plugin.register(MyPluginObject, 'myPluginName');
     *      var plg = new gf.plugin.myPluginName();
     *      //OR
     *      gf.plugin.myPluginName.someFunction();
     */
    register: function(plugin, name) {
        //ensure we don't overrite a name
        if(gf.plugin[name]) {
            throw 'plugin ' + name + ' already registered!';
        }

        if(plugin.prototype.gfVersion === undefined) {
            throw 'GradeFruitJS: Plugin gfVersion not defined for ' + name;
        } else if(gf.checkVersion(plugin.prototype.gfVersion) > 0) {
            throw 'GradeFruitJS: Plugin gfVersion mismatch, expected: ' + plugin.prototype.gfVersion + ', got: ' + gf.version;
        }

        //store the plugin in the namespace
        gf.plugin[name] = plugin;
    }
};


})(window);