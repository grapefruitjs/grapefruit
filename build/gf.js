/**
 * @license
 * GrapeFruit Game Engine - v0.0.2
 * Copyright (c) 2012, Chad Engler
 * https://github.com/englercj/grapefruit
 *
 * Compiled: 2013-04-17
 *
 * GrapeFruit Game Engine is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window, undefined) {
    document = window.document;

(function(f){"function"==typeof define?define(f):"function"==typeof YUI?YUI.add("es5-sham",f):f()})(function(){function f(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(c){}}var b=Function.prototype.call,g=Object.prototype,h=b.bind(g.hasOwnProperty),p,q,k,l,i;if(i=h(g,"__defineGetter__"))p=b.bind(g.__defineGetter__),q=b.bind(g.__defineSetter__),k=b.bind(g.__lookupGetter__),l=b.bind(g.__lookupSetter__);Object.getPrototypeOf||(Object.getPrototypeOf=function(a){return a.__proto__||
(a.constructor?a.constructor.prototype:g)});Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(a,c){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+a);if(h(a,c)){var d={enumerable:true,configurable:true};if(i){var b=a.__proto__;a.__proto__=g;var e=k(a,c),f=l(a,c);a.__proto__=b;if(e||f){if(e)d.get=e;if(f)d.set=f;return d}}d.value=a[c];return d}});Object.getOwnPropertyNames||(Object.getOwnPropertyNames=
function(a){return Object.keys(a)});if(!Object.create){var m;if(null===Object.prototype.__proto__||"undefined"==typeof document)m=function(){return{__proto__:null}};else{var r=function(){},b=document.createElement("iframe"),j=document.body||document.documentElement;b.style.display="none";j.appendChild(b);b.src="javascript:";var e=b.contentWindow.Object.prototype;j.removeChild(b);b=null;delete e.constructor;delete e.hasOwnProperty;delete e.propertyIsEnumerable;delete e.isPrototypeOf;delete e.toLocaleString;
delete e.toString;delete e.valueOf;e.__proto__=null;r.prototype=e;m=function(){return new r}}Object.create=function(a,c){function d(){}var b;if(a===null)b=m();else{if(typeof a!=="object"&&typeof a!=="function")throw new TypeError("Object prototype may only be an Object or null");d.prototype=a;b=new d;b.__proto__=a}c!==void 0&&Object.defineProperties(b,c);return b}}if(Object.defineProperty&&(b=f({}),j="undefined"==typeof document||f(document.createElement("div")),!b||!j))var n=Object.defineProperty,
o=Object.defineProperties;if(!Object.defineProperty||n)Object.defineProperty=function(a,c,d){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.defineProperty called on non-object: "+a);if(typeof d!="object"&&typeof d!="function"||d===null)throw new TypeError("Property description must be an object: "+d);if(n)try{return n.call(Object,a,c,d)}catch(b){}if(h(d,"value"))if(i&&(k(a,c)||l(a,c))){var e=a.__proto__;a.__proto__=g;delete a[c];a[c]=d.value;a.__proto__=e}else a[c]=
d.value;else{if(!i)throw new TypeError("getters & setters can not be defined on this javascript engine");h(d,"get")&&p(a,c,d.get);h(d,"set")&&q(a,c,d.set)}return a};if(!Object.defineProperties||o)Object.defineProperties=function(a,c){if(o)try{return o.call(Object,a,c)}catch(d){}for(var b in c)h(c,b)&&b!="__proto__"&&Object.defineProperty(a,b,c[b]);return a};Object.seal||(Object.seal=function(a){return a});Object.freeze||(Object.freeze=function(a){return a});try{Object.freeze(function(){})}catch(t){var s=
Object.freeze;Object.freeze=function(a){return typeof a=="function"?a:s(a)}}Object.preventExtensions||(Object.preventExtensions=function(a){return a});Object.isSealed||(Object.isSealed=function(){return false});Object.isFrozen||(Object.isFrozen=function(){return false});Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)!==a)throw new TypeError;for(var c="";h(a,c);)c=c+"?";a[c]=true;var b=h(a,c);delete a[c];return b})});

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

/**
 * @license
 * Pixi.JS - v1.0.0
 * Copyright (c) 2012, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2013-04-17
 *
 * Pixi.JS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
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
PIXI.Point.clone = function()
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
PIXI.Rectangle.clone = function()
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
	this.cacheVisible = false;
	
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
	
	this.renderable = false;
	
	// [readonly] best not to toggle directly! use setInteractive()
	this.interactive = false;
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
	localTransform[2] = this.position.x;
	localTransform[5] = this.position.y;
	
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

/**
 * Adds a child to the container.
 * @method addChild
 * @param  DisplayObject {DisplayObject}
 */
PIXI.DisplayObjectContainer.prototype.addChild = function(child)
{
	if(child.parent != undefined)
	{
		child.parent.removeChild(child)
	}
	
	child.parent = this;
	child.childIndex = this.children.length;
	
	this.children.push(child);	
	if(this.stage)
	{
		this.stage.__addChild(child);
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
	}
	else
	{
		// error!
		
		throw new Error(child + " The index "+ index +" supplied is out of bounds " + this.children.length);
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
		if(this.stage)this.stage.__removeChild(child);
		child.parent = undefined;
		//child.childIndex = 0
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
	this.width = 0;
	
	/**
	 * The height of the sprite (this is initially set by the texture)
	 * @property height
	 * @type #Number
	 */
	this.height = 0;
	
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
	
	// thi next bit is here for the docs...
	
	
}

// constructor
PIXI.Sprite.constructor = PIXI.Sprite;
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

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
	this.width   = texture.frame.width;
	this.height  = texture.frame.height;
	this.updateFrame = true;
}

/**
 * @private
 */
PIXI.Sprite.prototype.onTextureUpdate = function(event)
{
	this.width   = this.width || this.texture.frame.width;
	this.height  = this.height || this.texture.frame.height;
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
The interaction manager deals with mouse and touch events. At this moment only Sprite's can be interactive.
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
	
	
	{
		
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
	
	
	
}

PIXI.InteractionManager.prototype.update = function()
{
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
		  this.interactiveItems[i].interactiveChildren = true;
		}
		
		this.interactiveItems = [];
		
		if(this.stage.interactive)this.interactiveItems.push(this.stage);
		// go through and collect all the objects that are interactive..
		this.collectInteractiveSprite(this.stage, this.stage);
	}
	
	// loop through interactive objects!
	var length = this.interactiveItems.length;
	
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
				if(!item.__isOver)
				{
					if(item.buttonMode)this.target.view.style.cursor = "pointer";	
					if(item.mouseover)item.mouseover(this.mouse);
					item.__isOver = true;	
				}
			}
			else
			{
				if(item.__isOver)
				{
					// roll out!
					if(item.buttonMode)this.target.view.style.cursor = "default";	
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
	// --->--->--->--->
	// get interactive items under point??
	// --->--->--->--->
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
		
		var x1 = -item.width * item.anchor.x;
		
		if(x > x1 && x < x1 + item.width)
		{
			var y1 = -item.height * item.anchor.y;
			
			if(y > y1 && y < y1 + item.height)
			{
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
		var item = item.children[i];
		var hit = this.hitTest(item, interactionData);
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
	this.worldTransform = PIXI.mat3.create()//.//identity();
	this.__childrenAdded = [];
	this.__childrenRemoved = [];
	this.childIndex = 0;
	this.stage= this;
	
	this.stage.hitArea = new PIXI.Rectangle(0,0,100000, 100000);
	
	// interaction!
	this.interactive = !!interactive;
	this.interactionManager = new PIXI.InteractionManager(this);
	
	this.setBackgroundColor(backgroundColor);
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
	this.backgroundColorString =  "#" + this.backgroundColor.toString(16);
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
	
	this.__childrenRemoved.push(child);

	child.stage = undefined;
	
	if(child.children)
	{
		for(var i=0,j=child.children.length; i<j; i++)
		{
		  	this.__removeChild(child.children[i])
		}
	}
}

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();

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

var AjaxRequest = function()
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
	
PIXI.shaderFragmentSrc = [	"precision mediump float;",
					  		"varying vec2 vTextureCoord;",
					  		"varying float vColor;",
					  		"uniform sampler2D uSampler;",
					  		"void main(void) {",
					  		"gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
					  		"gl_FragColor = gl_FragColor * vColor;",
					  		"}"];

PIXI.shaderVertexSrc = [	"attribute vec2 aVertexPosition;",
	    					"attribute vec2 aTextureCoord;",
	    					"attribute float aColor;",
	  						"uniform mat4 uMVMatrix;",
							"varying vec2 vTextureCoord;",
							"varying float vColor;",
							"void main(void) {",
							"gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0);",
							"vTextureCoord = aTextureCoord;",
							"vColor = aColor;",
	   					 	"}"]

PIXI.CompileVertexShader = function(gl, shaderSrc)
{
	var src = "";
	
	for (var i=0; i < shaderSrc.length; i++) {
	  src += shaderSrc[i];
	};
	
	var shader;
    shader = gl.createShader(gl.VERTEX_SHADER);
       
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    
    return shader;
}

PIXI.CompileFragmentShader = function(gl, shaderSrc)
{
	var src = "";
	
	for (var i=0; i < shaderSrc.length; i++) {
	  src += shaderSrc[i];
	};
	
	var shader;
    shader = gl.createShader(gl.FRAGMENT_SHADER);
        
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
        this.gl = this.view.getContext("experimental-webgl",  {  	
    		 alpha: this.transparent,
    		 antialias:false, // SPEED UP??
    		 premultipliedAlpha:true
        });
    } 
    catch (e) 
    {
    	throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
    }
    
    this.initShaders();
    
    
    var gl = this.gl;
    
    this.batch = new PIXI.WebGLBatch(gl);
   	gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, this.transparent); 
    
    this.projectionMatrix =  PIXI.mat4.create();
    this.resize(this.width, this.height)
    this.contextLost = false;
}

// constructor
PIXI.WebGLRenderer.constructor = PIXI.WebGLRenderer;

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.initShaders = function() 
{
	var gl = this.gl;
	var fragmentShader = PIXI.CompileFragmentShader(gl, PIXI.shaderFragmentSrc);
	var vertexShader = PIXI.CompileVertexShader(gl, PIXI.shaderVertexSrc);
	
	this.shaderProgram = gl.createProgram();
	
	var shaderProgram = this.shaderProgram;
	
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
	
	PIXI.shaderProgram = this.shaderProgram;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.checkVisibility = function(displayObject, globalVisible)
{
	var children = displayObject.children;
	
	
	for (var i=0; i < children.length; i++) 
	{
		var child = children[i];
		
		// TODO optimize... shouldt need to loop through everything all the time
		var actualVisibility = child.visible && globalVisible;
		
		// everything should have a batch!
		// time to see whats new!
		if(child.textureChange)
		{
			child.textureChange = false;
			if(actualVisibility)
			{
				this.removeDisplayObject(child)
				this.addDisplayObject(child)
			}
			// update texture!!
		}
		
		if(child.cacheVisible != actualVisibility)
		{
			child.cacheVisible = actualVisibility;
			
			if(child.cacheVisible)
			{
				this.addDisplayObject(child);
			}
			else
			{
				this.removeDisplayObject(child);
			}
		}
		
		if(child.children.length > 0)
		{
			this.checkVisibility(child, actualVisibility);
		}
	};
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
		if(this.__stage)this.checkVisibility(this.__stage, false)
		this.__stage = stage;
	}
	
	// update children if need be
	// best to remove first!
	for (var i=0; i < stage.__childrenRemoved.length; i++)
	{
		this.removeDisplayObject(stage.__childrenRemoved[i]);
	}


	// update any textures	
	for (var i=0; i < PIXI.texturesToUpdate.length; i++) this.updateTexture(PIXI.texturesToUpdate[i]);
	
	// empty out the arrays
	stage.__childrenRemoved = [];
	stage.__childrenAdded = [];
	PIXI.texturesToUpdate = [];
	
	// recursivly loop through all items!
	this.checkVisibility(stage, true);
	
	// update the scene graph	
	stage.updateTransform();
	
	var gl = this.gl;
	
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.clearColor(stage.backgroundColorSplit[0], stage.backgroundColorSplit[1], stage.backgroundColorSplit[2], 0);     
	
	
	// set the correct blend mode!
 	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.projectionMatrix);
   
	// render all the batchs!	
	
	
	var renderable;
	for (var i=0; i < this.batchs.length; i++) 
	{
		renderable = this.batchs[i];
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
		}
		else if(renderable instanceof PIXI.Strip)
		{
			if(renderable.visible)this.renderStrip(renderable);
		}
	}
	
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
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.updateTexture = function(texture)
{
	var gl = this.gl;
	
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
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	//	gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
	this.refreshBatchs = true;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.addDisplayObject = function(displayObject)
{
	
	if(!displayObject.stage)return; // means it was removed 
	if(displayObject.__inWebGL)return; //means it is already in webgL
	
	//displayObject.cacheVisible = displayObject.visible;
	
	// TODO if objects parent is not visible then dont add to stage!!!!
	//if(!displayObject.visible)return;

	
	displayObject.batch = null;
	
	//displayObject.cacheVisible = true;
	if(!displayObject.renderable)return;

	// while looping below THE OBJECT MAY NOT HAVE BEEN ADDED
	displayObject.__inWebGL = true;

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
		
		if(previousSprite == displayObject.stage)break;
	}
	while(!previousSprite.renderable || !previousSprite.__inWebGL)
	//while(!(previousSprite instanceof PIXI.Sprite))

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
			// go along to the parent..
			while(nextSprite.childIndex == nextSprite.parent.children.length-1)
			{
				nextSprite = nextSprite.parent;
				if(nextSprite == displayObject.stage)
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
	while(!nextSprite.renderable || !nextSprite.__inWebGL)
	
	/*
	 * so now we have the next renderable and the previous renderable
	 * 
	 */
	
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch
		var nextBatch
		
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
							var batch = PIXI._getBatch(this.gl);

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
		
		var batch = PIXI._getBatch(this.gl);
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
	else if(displayObject instanceof PIXI.Strip)
	{
		// add to a batch!!
		this.initStrip(displayObject);
		this.batchs.push(displayObject);
		
	}

	// if its somthing else... then custom codes!
	this.batchUpdate = true;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.removeDisplayObject = function(displayObject)
{
	//if(displayObject.stage)return;
	displayObject.cacheVisible = false;//displayObject.visible;
	
	if(!displayObject.renderable)return;
	
	displayObject.__inWebGL = false;
		
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
			batchToRemove = batch
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
			if(batchToRemove instanceof PIXI.WebGLBatch)PIXI._returnBatch(batchToRemove);
		
			return;
		}
		
		if(this.batchs[index-1] instanceof PIXI.WebGLBatch && this.batchs[index+1] instanceof PIXI.WebGLBatch)
		{
			if(this.batchs[index-1].texture == this.batchs[index+1].texture && this.batchs[index-1].blendMode == this.batchs[index+1].blendMode)
			{
				//console.log("MERGE")
				this.batchs[index-1].merge(this.batchs[index+1]);
				
				if(batchToRemove instanceof PIXI.WebGLBatch)PIXI._returnBatch(batchToRemove);
				PIXI._returnBatch(this.batchs[index+1]);
				this.batchs.splice(index, 2);
				return;
			}
		}
		
		
		this.batchs.splice(index, 1);
		if(batchToRemove instanceof PIXI.WebGLBatch)PIXI._returnBatch(batchToRemove);
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
 * @private
 */
PIXI.WebGLRenderer.prototype.renderStrip = function(strip)
{
	var gl = this.gl;
	var shaderProgram = this.shaderProgram;
//	mat
	var mat4Real = PIXI.mat3.toMat4(strip.worldTransform);
	PIXI.mat4.transpose(mat4Real);
	PIXI.mat4.multiply(this.projectionMatrix, mat4Real, mat4Real )

	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mat4Real);
  
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
	
	gl.drawElements(gl.TRIANGLE_STRIP, strip.indices.length, gl.UNSIGNED_SHORT, 0);
    
    gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.projectionMatrix);
  
  //  console.log("!!!")
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
		width = displayObject.width;
		height = displayObject.height;
		
		aX = displayObject.anchor.x - displayObject.texture.trim.x
		aY = displayObject.anchor.y - displayObject.texture.trim.y
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
		
		if(displayObject.updateFrame)
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
		
		indexRun++;
		displayObject = displayObject.__next;
   }
}

/**
 * Draws the batch to the frame buffer
 * @method render
 */
PIXI.WebGLBatch.prototype.render = function()
{
	if(this.dirty)
	{
		this.refresh();
		this.dirty = false;
	}
	
	if (this.size == 0)return;
	
	this.update();
	var gl = this.gl;
	
	//TODO optimize this!
	if(this.blendMode == PIXI.blendModes.NORMAL)
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}
	else
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	}
	
	var shaderProgram = PIXI.shaderProgram;
	
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
	    
    // DRAW THAT this!
    gl.drawElements(gl.TRIANGLES, this.size * 6, gl.UNSIGNED_SHORT, 0);
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
	
	stage.__childrenAdded = [];
	stage.__childrenRemoved = [];
	
	// update textures if need be
	PIXI.texturesToUpdate = [];
	
	this.context.setTransform(1,0,0,1,0,0); 
	stage.updateTransform();
	  
	this.context.setTransform(1,0,0,1,0,0); 
	
	// update the background color
	if(this.view.style.backgroundColor!=stage.backgroundColorString && !this.transparent)this.view.style.backgroundColor = stage.backgroundColorString;

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
	context.globalCompositeOperation = "source-over"
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
				blit = false;
				context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
				context.drawImage(displayObject.texture.baseTexture.source, 
								   frame.x,
								   frame.y,
								   frame.width,
								   frame.height,
								   (displayObject.anchor.x - displayObject.texture.trim.x) * -frame.width, 
								   (displayObject.anchor.y - displayObject.texture.trim.y) * -frame.height,
								   displayObject.width,
								   displayObject.height);
			//}
		}					   
   	}
   	else if(displayObject instanceof PIXI.Strip)
	{
		context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
		this.renderStrip(displayObject);
	}
	
	// render!
	for (var i=0; i < displayObject.children.length; i++) 
	{
		this.renderDisplayObject(displayObject.children[i]);
	}
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
 		 
  		 var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2]* strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
   		 var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3]* strip.texture.height, v2 = uvs[index+5]* strip.texture.height;


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
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.BaseTextureCache = {};
PIXI.texturesToUpdate = [];

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
			
		//console.log(">!!",this.width)
		PIXI.texturesToUpdate.push(this);
	}
	
	
	
}

PIXI.BaseTexture.constructor = PIXI.BaseTexture;

PIXI.BaseTexture.prototype.fromImage = function(imageUrl)
{

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
	//this.updateFrame = true;
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
		var baseTexture = PIXI.BaseTextureCache[imageUrl];
		if(!baseTexture) 
		{
			var image = new Image();//new Image();
			if (crossorigin)
			{
				image.crossOrigin = '';
			}
			image.src = imageUrl;
			baseTexture = new PIXI.BaseTexture(image);
			PIXI.BaseTextureCache[imageUrl] = baseTexture;
		}
		texture = new PIXI.Texture(baseTexture);
		
		
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


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The sprite sheet loader is used to load in JSON sprite sheet data
 * To generate the data you can use http://www.codeandweb.com/texturepacker and publish the "JSON" format
 * There is a free version so thats nice, although the paid version is great value for money.
 * It is highly recommended to use Sprite sheets (also know as texture atlas') as it means sprite's can be batched and drawn together for highly increased rendering speed.
 * Once the data has been loaded the frames are stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFromeId()
 * This loader will also load the image file that the Spritesheet points to as well as the data.
 * When loaded this class will dispatch a 'loaded' event
 * @class SpriteSheetLoader
 * @extends EventTarget
 * @constructor
 * @param url {String} the url of the sprite sheet JSON file
 */

PIXI.SpriteSheetLoader = function(url)
{
	/*
	 * i use texture packer to load the assets..
	 * http://www.codeandweb.com/texturepacker
	 * make sure to set the format as "JSON"
	 */
	PIXI.EventTarget.call( this );
	this.url = url;
	this.baseUrl = url.replace(/[^\/]*$/, '');
	this.texture;
	this.frames = {};
	this.crossorigin = false;
}

// constructor
PIXI.SpriteSheetLoader.constructor = PIXI.SpriteSheetLoader;

/**
 * This will begin loading the JSON file
 */
PIXI.SpriteSheetLoader.prototype.load = function()
{
	this.ajaxRequest = new AjaxRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange=function()
	{
		scope.onLoaded();
	}
		
	this.ajaxRequest.open("GET", this.url, true)
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/json");
	this.ajaxRequest.send(null)
}

PIXI.SpriteSheetLoader.prototype.onLoaded = function()
{
	if (this.ajaxRequest.readyState==4)
	{
		 if (this.ajaxRequest.status==200 || window.location.href.indexOf("http")==-1)
	 	{
			var jsondata = eval("("+this.ajaxRequest.responseText+")");
			
			var textureUrl = this.baseUrl + jsondata.meta.image;
			
			this.texture = PIXI.Texture.fromImage(textureUrl, this.crossorigin).baseTexture;
			
		//	if(!this.texture)this.texture = new PIXI.Texture(textureUrl);
			
			var frameData = jsondata.frames;
			for (var i in frameData) 
			{
				var rect = frameData[i].frame;
				if (rect)
				{
					PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {x:rect.x, y:rect.y, width:rect.w, height:rect.h});
					
					if(frameData[i].trimmed)
					{
						//var realSize = frameData[i].spriteSourceSize;
						PIXI.TextureCache[i].realSize = frameData[i].spriteSourceSize;
						PIXI.TextureCache[i].trim.x = 0// (realSize.x / rect.w)
						// calculate the offset!
					}
	//				this.frames[i] = ;
				}
   			}
			
			if(this.texture.hasLoaded)
			{
				this.dispatchEvent( { type: 'loaded', content: this } );
			}
			else
			{
				var scope = this;
				// wait for the texture to load..
				this.texture.addEventListener('loaded', function(){
					
					scope.dispatchEvent( { type: 'loaded', content: scope } );
					
				});
			}
	 	}
	}
	
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Class that loads a bunch of images / sprite sheet files. Once the assets have been loaded they are added to the PIXI Texture cache and can be accessed easily through PIXI.Texture.fromFrame(), PIXI.Texture.fromImage() and PIXI.Sprite.fromImage(), PIXI.Sprite.fromFromeId()
 * When all items have been loaded this class will dispatch a 'loaded' event
 * As each individual item is loaded this class will dispatch a 'progress' event
 * @class AssetLoader
 * @constructor
 * @extends EventTarget
 * @param assetURLs {Array} an array of image/sprite sheet urls that you would like loaded supported. Supported image formats include "jpeg", "jpg", "png", "gif". Supported sprite sheet data formats only include "JSON" at this time
 */
PIXI.AssetLoader = function(assetURLs)
{
	PIXI.EventTarget.call( this );
	
	/**
	 * The array of asset URLs that are going to be loaded
	 * @property assetURLs
	 * @type Array
	 */
	this.assetURLs = assetURLs;
	
	this.assets = [];

	this.crossorigin = false;
}

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
	this.loadCount = this.assetURLs.length;
	var imageTypes = ["jpeg", "jpg", "png", "gif"];
	
	var spriteSheetTypes = ["json"];
	
	for (var i=0; i < this.assetURLs.length; i++) 
	{
		var filename = this.assetURLs[i];
		var fileType = filename.split('.').pop().toLowerCase();
		// what are we loading?
		var type = null;
		
		for (var j=0; j < imageTypes.length; j++) 
		{
			if(fileType == imageTypes[j])
			{
				type = "img";
				break;
			}
		}
		
		if(type != "img")
		{
			for (var j=0; j < spriteSheetTypes.length; j++) 
			{
				if(fileType == spriteSheetTypes[j])
				{
					type = "atlas";
					break;
				}
			}
		}
		
		if(type == "img")
		{
			
			var texture = PIXI.Texture.fromImage(filename, this.crossorigin);
			if(!texture.baseTexture.hasLoaded)
			{
				
				var scope = this;
				texture.baseTexture.addEventListener( 'loaded', function ( event ) 
				{
					scope.onAssetLoaded();
				});
	
				this.assets.push(texture);
			}
			else
			{
				
				// already loaded!
				this.loadCount--;
				// if this hits zero here.. then everything was cached!
				if(this.loadCount == 0)
				{
					this.dispatchEvent( { type: 'onComplete', content: this } );
					if(this.onComplete)this.onComplete();
				}
			}
			
		}
		else if(type == "atlas")
		{
			var spriteSheetLoader = new PIXI.SpriteSheetLoader(filename);
			spriteSheetLoader.crossorigin = this.crossorigin;
			this.assets.push(spriteSheetLoader);
			
			var scope = this;
			spriteSheetLoader.addEventListener( 'loaded', function ( event ) 
			{
				scope.onAssetLoaded();
			});
			
			spriteSheetLoader.load();
		}
		else
		{
			// dont know what the file is! :/
			//this.loadCount--;
			throw new Error(filename + " is an unsupported file type " + this);
		}
		
		//this.assets[i].load();
	};
}

PIXI.AssetLoader.prototype.onAssetLoaded = function()
{
	this.loadCount--;
	this.dispatchEvent( { type: 'onProgress', content: this } );
	if(this.onProgress)this.onProgress();
	
	if(this.loadCount == 0)
	{
		this.dispatchEvent( { type: 'onComplete', content: this } );
		if(this.onComplete)this.onComplete();
	}
}


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
 * Rectangle object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Rectangle.html">PIXI.Point</a>
 *
 * @module gf
 * @class Rectangle
 */
gf.Rectangle = PIXI.Rectangle;

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
     * Whether or not typed arrays are supported
     *
     * @property typedArrays
     * @type bool
     */
    typedArrays: !!('ArrayBuffer' in window),

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

/**
 * Main game object, controls the entire instance of the game
 *
 * @module gf
 * @class game
 * @constructor
 * @param contId {String} The container for the new canvas we will create for the game
 * @param opts {Object} Options such as gravity, friction, and renderMethod
 */
gf.Game = function(contId, settings) {
    var w = settings.width || gf.utils.getStyle(this.container, 'width'),
        h = settings.height || gf.utils.getStyle(this.container, 'height');

    /**
     * The default gravity to use for the game, defaults to 0.98 (Earth's Gravity)
     *
     * @property gravity
     * @type Number
     * @default 0.98
     */
    this.gravity = 0.98;

    /**
     * The default friction to use for the game, defaults to 0,0
     *
     * @property friction
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.friction = new gf.Vector(0, 0);

    /**
     * The method used to render values to the screen (either webgl, canvas, or css3)
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
     * The audio player for this game instance
     *
     * @property audio
     * @type AudioPlayer
     * @readOnly
     */
    this.audio = new gf.AudioPlayer(this);

    /**
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = new gf.InputManager(this);

    /**
     * The camera you view the scene through
     *
     * @property camera
     * @type Camera
     * @readOnly
     */
    this.camera = new gf.Camera(this);

    this.addObject(this.camera);

    this.camera.resize(w, h);

    //append the renderer view
    //this.renderer.view.style['z-index'] = opts.zIndex || 5;
    this.container.appendChild(this.renderer.view);

    //mixin user settings
    gf.utils.setValues(this, settings);
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
     * @method addObject
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    addObject: function(obj) {
        if(obj) {
            //we add the camera in the ctor and the map later when
            //.loadWorld is called. This way the camera is always the
            //last child of stage, so it is rendered on top!
            if(obj instanceof gf.Camera || obj instanceof gf.Map)
                this.stage.addChildAt(obj, 0);
            else if(obj instanceof gf.Gui)
                this.camera.addChild(obj);
            else
                this.world.addChild(obj);
        }

        return this;
    },
    /**
     * Removes a sprite from the stage
     *
     * @method removeObject
     * @param obj {Sprite} The sprite to the stage
     * @return {Game} Returns itself for chainability
     */
    removeObject: function(obj) {
        if(obj) {
            if(obj instanceof gf.Gui || obj instanceof gf.Hud)
                this.camera.removeChild(obj);
            else
                this.world.removeChild(obj);
        }

        return this;
    },
    /**
     * Loads the world map into the game
     *
     * @method loadWorld
     * @param world {String|Map} The map to load as the current world
     * @return {Game} Returns itself for chainability
     */
    loadWorld: function(world) {
        if(typeof world === 'string'){
            if(gf.assetCache[world]) world = gf.assetCache[world];
            else {
                throw 'World not found in assetCache!';
            }
        }

        this.world = new gf.TiledMap(this, world);
        this.addObject(this.world);
        this.camera.setBounds(0, 0, this.world.realSize.x, this.world.realSize.y);

        if(this.world.properties.music) {
            this.audio.play(this.world.properties.music, { loop: this.world.properties.music_loop === 'true' });
        }

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
     * Check if passed entity collides with any others
     *
     * @method checkCollisions
     * @param obj {Entity} The sprite to the stage
     * @return {Array} Returns an array of colliders
     */
    checkCollisions: function(ent) {
        var colliders = [];

        if(!ent.collidable) return colliders;

        for(var i = 0, il = this.stage.children; i < il; ++i) {
            var o = this.stage.children[i];

            //check if this object collides with any others
            if(o.visible && o.collidable && o.entity && (o !== ent)) {
                var collisionVector = o.checkCollision(ent);
                if(collisionVector.x !== 0 || collisionVector.y !== 0) {
                    colliders.push({
                        entity: o,
                        vector: collisionVector
                    });
                    o.onCollision(ent);
                }
            }
        }

        return colliders;
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
        this._delta = this.clock.getDelta();

        //update debug info
        gf.debug.update();

        this.input.update();

        this.camera.update();

        //update each object
        for(var i = 0, il = this.stage.children.length; i < il; ++i) {
            var o = this.stage.children[i];

            if(o.visible && o.update)
                o.update();
        }

        //render scene
        this.renderer.render(this.stage);
    }
});

/**
 * The AssetLoader loads and parses different game assets, such as sounds, textures,
 * TMX World JSON file (exported from the <a href="http://mapeditor.org">Tiled Editor</a>),
 * and Spritesheet JSON files (published from <a href="http://www.codeandweb.com/texturepacker">Texture Packer</a>).
 *
 * @module gf
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
                url = typeof resources[i] === 'string' ? resources[i] : resources[i].src,
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
 * @module gf
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
 * @module gf
 * @class DisplayObject
 * @extends PIXI.DisplayObjectContainer
 * @constructor
 */
gf.DisplayObject = function() {
    PIXI.DisplayObjectContainer.call(this);

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
    update: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.update)
                o.update();
        }
    },
    resize: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.resize)
                o.resize();
        }
    },
    removeAllChildren: function() {
        //remove each from the stage
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.stage) this.stage.__removeChild(this.children[i]);
        }

        //clear the list and let the GC clean up
        this.children = [];
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
 * @module gf
 * @class Camera
 * @extends DisplayObject
 * @constructor
 * @param game {Game} The game this camera belongs to
 * @param settings {Object} Any settings you want to override the default properties with
 */
gf.Camera = function(game, settings) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

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
            previous: new gf.Point(0, 0),
            complete: null
        }
    };

    gf.DisplayObject.call(this, settings);

    //mixin user's settings
    gf.utils.setValues(this, settings);
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
        this._fx.shake.previous.x = this.game.world.position.x;
        this._fx.shake.previous.y = this.game.world.position.y;
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
            this.focus(this._fx.shake.previous);
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
    update: function() {
        gf.DisplayObject.prototype.update.call(this);

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
            this._fx.flash.alpha -= (this.game._delta * 1000) / this._fx.flash.duration;

            if(this._fx.flash.alpha <= 0) {
                this._fx.flash.alpha = 0;

                if(this._fx.flash.complete)
                    this._fx.flash.complete();
            }
        }

        //update fade effect
        if(this._fx.fade.alpha > 0) {
            this._fx.fade.alpha += (this.game._delta * 1000) / this._fx.fade.duration;

            if(this._fx.fade.alpha >= 1) {
                this._fx.fade.alpha = 1;

                if(this._fx.fade.complete) {
                    this._fx.fade.complete();
                }
            }
        }

        //update shake effect
        if(this._fx.shake.duration > 0) {
            this._fx.shake.duration -= (this.game._delta * 1000);

            if(this._fx.shake.duration <= 0) {
                this._fx.shake.duration = 0;
                this._fx.shake.offset.x = 0;
                this._fx.shake.offset.y = 0;
                this.focus(this._fx.shake.previous);

                if(this._fx.shake.complete) {
                    this._fx.shake.complete();
                }
            }
            else {
                if((this._fx.shake.direction === gf.Camera.SHAKE.BOTH) || (this._fx.shake.direction === gf.Camera.SHAKE.HORIZONTAL))
                    this._fx.shake.offset.x = (Math.random() * this._fx.shake.intensity * this.size.x * 2 - this._fx.shake.intensity * this.size.x);

                if ((this._fx.shake.direction === gf.Camera.SHAKE.BOTH) || (this._fx.shake.direction === gf.Camera.SHAKE.VERTICAL))
                    this._fx.shake.offset.y = (Math.random() * this._fx.shake.intensity * this.size.y * 2 - this._fx.shake.intensity * this.size.y);
            }

            this.pan(this._fx.shake.offset);
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
/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @module gf
 * @class Sprite
 * @extends DisplayObject
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 * @example
 *      var spr = new gf.Sprite([10, 1], { name: 'MySprite' });
 */
gf.Sprite = function(pos, settings) {
    /**
     * The size of the sprite
     *
     * @property size
     * @type gf.Vector
     * @default new gf.Vector(0, 0);
     */
    this.size = new gf.Vector(0, 0);

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
     * Whether or not this Sprite is interactive. Please either pass this in with the
     * ctor or use setInteractive to change it later. Changing this property directly
     * on-the-fly will yield unexpected results.
     *
     * @property interactive
     * @type Boolean
     */
    this.interactive = false;

    //call base ctor
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, settings);

    this.position.x = pos.x || pos[0] || parseInt(pos, 10) || 0;
    this.position.y = pos.y || pos[1] || parseInt(pos, 10) || 0;

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
            if(settings.interactive) spr.setInteractive(true);
            this.addChild(spr);
            this.anim['default'] = spr;
        }
    }

    //copied from http://www.goodboydigital.com/pixijs/docs/files/src_pixi_Sprite.js.html

    /*
    * MOUSE Callbacks
    */
    /**
    * A callback that is used when the users clicks on the sprite with thier mouse
    * @method click
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user clicks the mouse down over the sprite
    * @method mousedown
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user releases the mouse that was over the sprite
    * for this callback to be fired the mouse must have been pressed down over the sprite
    * @method mouseup
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the users mouse rolls over the sprite
    * @method mouseover
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the users mouse leaves the sprite
    * @method mouseout
    * @param interactionData {InteractionData}
    */

    /*
    * TOUCH Callbacks
    */

    /**
    * A callback that is used when the users taps on the sprite with thier finger
    * basically a touch version of click
    * @method tap
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user touch's over the sprite
    * @method touchstart
    * @param interactionData {InteractionData}
    */

    /**
    * A callback that is used when the user releases the touch that was over the sprite
    * for this callback to be fired. The touch must have started over the sprite
    * @method touchend
    * @param interactionData {InteractionData}
    */
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
            this.currentAnim.gotoAndPlay(0);
        } else {
            throw 'Unknown animation ' + name;
        }

        return this;
    },
    /**
     * Convenience method for setting the position of the Sprite.
     *
     * @method setPosition
     * @param x {Number|Array|Vector|Point} X coord to put the sprite at.
     *       If an Array, Vector, or Point is passed then the y parameter is ignored
     * @param y {Number} Y coord to put the sprite at
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.setPosition(1, 1)
     *          .setPosition([5, 5])
     *          .setPosition(new gf.Point(10, 10))
     *          .setPosition(new gf.Vector(20, 20));
     */
    setPosition: function(x, y) {
        if(x instanceof gf.Vector || x instanceof gf.Point) {
            this.position.x = x.x;
            this.position.y = x.y;
        }
        else if(x instanceof Array) {
            this.position.x = x[0];
            this.position.y = x[1];
        } else {
            this.position.x = x;
            this.position.y = y;
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
 * @module gf
 * @class Entity
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the entity
 * @param settings {Object} Settings to override the defauls, acceptable values
 *          are size {Vector}, name {String}, animations {Object}
 * @example
 *      var ent = new gf.Entity([10, 1], { name: 'MyEntity' });
 */
gf.Entity = function(game, pos, settings) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The type of the entity
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.Entity.TYPE.NEUTRAL;

    /**
     * Can it collide with other entities
     *
     * @property collidable
     * @type Boolean
     * @default true
     */
    this.collidable = true;

    /**
     * Can collide with the map when moving
     *
     * @property mapCollidable
     * @type Boolean
     * @default true
     */
    this.mapCollidable = true;

    /**
     * Is an entity
     *
     * @property mapCollidable
     * @type Boolean
     * @default true
     * @readOnly
     */
    this.entity = true;

    /**
     * The velocity of the entity. You can set these in Tiled by using "x|y" notation
     * velocity of the entity (units per tick)
     *
     * @property velocity
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.velocity = new gf.Vector(0, 0);

    /**
     * Max velocity to cap the entity at (units per tick)
     *
     * @property maxVelocity
     * @type Vector
     * @default new gf.Vector(15, 15)
     */
    this.maxVelocity = new gf.Vector(15, 15);

    /**
     * Acceleration of the entity (units per second)
     *
     * @property accel
     * @type Vector
     * @default new gf.Vector(250, 250)
     */
    this.accel = new gf.Vector(250, 250);

    /**
     * Friction to apply to this entity
     *
     * @property friction
     * @type Vector
     * @default 0
     */
    this.friction = 0;

    /**
     * Gravity to apply to this entity
     *
     * @property gravity
     * @type Vector
     * @default 0.98 (earth's gravity)
     */
    this.gravity = 0;

    /**
     * Whether or not the entity is "alive", advisory only
     *
     * @property alive
     * @type Boolean
     * @default true
     */
    this.alive = true;

    /**
     * Whether the entity is falling (read only)
     *
     * @property falling
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.falling = false;

    /**
     * Whether the entity is jumping (read only)
     *
     * @property jumping
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.jumping = false;

    /**
     * Whether the entity is on a ladder tile (read only)
     *
     * @property onladder
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.onladder = false;

    /**
     * The view position is a whole-number version of position.
     *
     * @property viewPosition
     * @type Point
     * @readOnly
     */
    this.viewPosition = new gf.Point(0, 0);

    //call base ctor
    gf.Sprite.call(this, pos, settings);

    this.viewPosition.x = Math.round(this.position.x);
    this.viewPosition.y = Math.round(this.position.y);
};

gf.inherits(gf.Entity, gf.Sprite, {
    /**
     * Calculates distance between this object and another
     *
     * @method distanceTo
     * @param obj {Entity}
     * @return {Number} Distance between this entity and another
     */
    distanceTo: function(obj) {
        if(!obj || !obj.position)
            return -1;

        var dx = this.position.x - obj.position.x,
            dy = this.position.y - obj.position.y;

        return Math.sqrt(dx*dx + dy*dy);
    },
    /**
     * Computes the velocity taking into account gravity, friction, etc
     *
     * @method computeVelocity
     * @param vel {Vector} The Vector to apply the changes to
     * @return {Vector} The modified vector
     */
    computeVelocity: function(vel) {
        //apply gravity
        if(this.gravity) {
            vel.y -= !this.onladder ? (this.gravity * this.game._delta) : 0;

            //check if falling/jumping
            this.falling = (vel.y < 0);
            this.jumping = this.falling ? false : this.jumping;
        }

        //apply friction
        if(this.friction.x) vel.x = this.applyFriction(vel.x, this.friction.x);
        if(this.friction.y) vel.y = this.applyFriction(vel.y, this.friction.y);

        //cap velocity
        if(vel.x) vel.x = gf.utils.clamp(vel.x, -this.maxVelocity.x, this.maxVelocity.x);
        if(vel.y) vel.y = gf.utils.clamp(vel.y, -this.maxVelocity.y, this.maxVelocity.y);

        return vel;
    },
    /**
     * Applies friction to a velocity, usually the current velocity
     *
     * @method applyFriction
     * @param vel {Number} The velocity to apply the friction to
     * @param friction {Number} The friction factor to apply
     * @return {Object} The modified velocity, with friction applied
     */
    applyFriction: function(vel, friction) {
        return (
                    vel + friction < 0 ?
                    vel + (friction * (this.game._delta || 0)) :
                    (
                        vel - friction > 0 ?
                        vel - (friction * (this.game._delta || 0)) :
                        0
                    )
                );
    },
    /**
     * Checks if this entity intersects with the passed object
     * from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
     *
     * @method intersects
     * @param obj {Entity} The Entity to check if this intersects with
     * @return {Boolean}
     */
    intersects: function(obj)  {
        return (Math.abs(this.position.x - obj.position.x) * 2 < (this.size.x + obj.size.x)) &&
                (Math.abs(this.position.y - obj.position.y) * 2 < (this.size.y + obj.size.y));
    },
    /**
     * Checks if this entity collides with the passed Entity, a penetration vector is calculated.
     * This method is called from gf.game.checkCollisions(ent); That method will use this to check
     * for any collisions between that entity and all the others on the stage.
     * from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
     *
     * @method checkCollision
     * @param obj {Entity} The Entity to check if this entity collides with
     * @return {Vector}
     */
    checkCollision: function(obj) {
        //response vector
        var p = new gf.Vector(0, 0);

        //check if hitboxes intersect
        if(this.intersects(obj)) {
            //compute delta between this & entity
            var dx = this.position.x - obj.position.x,
                dy = this.position.y - obj.position.y;

            //compute penetration depth for both axis
            p.x = dx / 2;
            p.y = dy / 2;
        }

        return p;
    },
    /**
     * Calculate the velocity of the entity, and then apply it. This is different than moveEntity
     * because it checks for map collisions, and applies gravity and friction with computeVelocity
     *
     * @method updateMovement
     * @return {Array} Returns the map colliders that the entity is interacting with
     */
    updateMovement: function() {
        if(this.velocity.x === 0 && this.velocity.y === 0)
            return;

        //apply gravity, friction, etc to this velocity
        this.computeVelocity(this.velocity);

        //TODO: Edge rolling (if you are on the tip edge of a blocking tile, roll around it)
        //get the world colliders
        var colliders = (this.game.world === undefined || !this.mapCollidable) ? [] : this.game.world.checkCollision(this, this.velocity);
        if(colliders.length) window.console.log(colliders);

        //update flags
        this.onladder = false;

        //collisions
        for(var i = 0, il = colliders.length; i < il; ++i) {
            var collider = colliders[i],
                tile = collider.tile,
                axis = collider.axis;

            this.onladder = (tile.type === gf.Layer.COLLISION.LADDER ? true : this.onladder);

            //if a solid tile
            if(tile.type === gf.Layer.COLLISION.SOLID) {
                //if it is a slope, apply the normal
                if(tile.normal && (!this.velocity.x || !this.velocity.y)) {
                    var badMovement = tile.normal.clone().multiplyScalar(this.velocity.dot(tile.normal)),
                        newMovement = this.velocity.clone().sub(badMovement);

                    this.velocity.add(newMovement);
                    return false;
                }
                //otherwise just stop movement
                else {
                    this.velocity[axis] = 0;
                }
            }
        }

        //do the actual entity movement
        this.moveEntity();

        return colliders;
    },
    /**
     * Moves the entity to a new position using the velocity.
     *
     * @method moveEntity
     * @param vel {Vector} The optional velocity to move the entity.
     * @return {Entity} Returns itself for chainability
     */
    moveEntity: function(vel) {
        //param will override the entities current velocity
        vel = vel || this.velocity;

        if(vel.x === 0 && vel.y === 0)
            return;

        //update the entity position
        this.position.x += vel.x;
        this.position.y += vel.y;
        this.viewPosition.x = Math.round(this.position.x);
        this.viewPosition.y = Math.round(this.position.y);

        //onMove event
        this.onMove(vel);

        return this;
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
    setPosition: function(x, y) {
        gf.Sprite.prototype.setPosition.call(this, x, y);

        this.viewPosition.x = Math.round(this.position.x);
        this.viewPosition.y = Math.round(this.position.y);

        return this;
    },
    /**
     * Overrides base update to do some calculations. Called internally on each frame
     *
     * @method update
     */
    update: function() {
        gf.Sprite.prototype.update.call(this);

        this.updateMovement();
    },
    /**
     * On Collision Event
     *      called when this object is collided into by another, by default if something collides with
     *      a collectable entity we remove the collectable
     *
     * @method onCollision
     * @param vel {Vector} Collision Vector
     * @param obj {Entity} Colliding object
     * @return {Entity} Returns itself for chainability
     */
    onCollision: function() {
        if(this.collidable && this.type === gf.Entity.TYPE.COLLECTABLE)
            this.game.removeObject(this);

        return this;
    },
    /**
     * On Move Event
     *      called when this entity moves
     *
     * @method onMove
     * @param vel {Vector} Velocity the entity moved
     * @return {Entity} Returns itself for chainability
     */
    onMove: function() {
        return this;
    },
    /**
     * On Break Tile Event
     *      called when a tile is broken
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
    COLLECTABLE: 'collectable'
};
/**
 * Holds a pool of different Entities that can be created, makes it very
 * easy to quickly create different registered entities
 *
 * @module gf
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
 * A simple object to show some debug items
 *
 * @module gf
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

/**
 * High performance clock, from mrdoob's Three.js
 * https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
 *
 * @module gf
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
 * @module gf
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
    update: function() {
        this.gamepad.update();
    },
    isActionActive: function(action) {
        return this.mouse.isActionActive(action) ||
            this.keyboard.isActionActive(action) ||
            this.gamepad.isActionActive(action);
    }
});
/**
 * input submodule
 *
 * @module gf
 * @submodule input
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
 * @module gf
 * @submodule input
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

    gf.DisplayObject.call(this);

    gf.utils.setValues(this, settings);
};

gf.inherits(gf.Font, gf.DisplayObject, {
    setText: function(txt) {
        this.text = txt;
    }
});
gf.TextureFont = function(font, settings) {
    this.ext = '';

    this.map = {};

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

        if(!this.textures[ch + this.ext])
            throw 'there is no texture for character "' + ch + '" with extension "' + this.ext + '"';

        var texture = this.textures[ch + this.ext],
            spr = this.sprites.create(texture);

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
 * @module gf
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

    gf.DisplayObject.call(this, settings);

    //mixin user's settings
    gf.utils.setValues(this, settings);
};

gf.inherits(gf.Gui, gf.DisplayObject);

/**
 * The base GuiItem that represents an element of a gui on the screen.
 *
 * @module gf
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
    gf.Sprite.call(this, pos, settings);
};

gf.inherits(gf.GuiItem, gf.Sprite, {
    /**
     * Overrides base update to do some calculations. Called internally on each frame
     *
     * @method update
     */
    update: function() {
        gf.Sprite.prototype.update.call(this);
    }
});

/**
 * The Hud that holds HudItems to be presented as a Hud
 *
 * @module gf
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
 * @module gf
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
 * @module gf
 * @class Map
 * @extends DisplayObject
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.Map = function(game, map) {
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
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, map);
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
 * @module gf
 * @class Layer
 * @extends DisplayObject
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
gf.Layer = function(layer) {
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
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, layer);

    /**
     * Half of the size of the layer
     *
     * @property hSize
     * @type Vector
     * @private
     */
    this.hSize = this.size.clone().divideScalar(2);
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
 * Tile collision types
 *
 * @property COLLISION
 * @type Object
 */
gf.Layer.COLLISION = {
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
 * @module gf
 * @class TiledMap
 * @extends Map
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.TiledMap = function(game, map) {
    gf.Map.call(this, game, map);

    this.scale.x = parseInt(map.properties.scale, 10) || 1;
    this.scale.y = parseInt(map.properties.scale, 10) || 1;

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
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = map.properties || {};

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
     * The orientation of the map, currently only 'orthogonal' is supported
     *
     * @property orientation
     * @type String
     */
    this.orientation = map.orientation;

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

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

    /**
     * The layer for collisions
     *
     * @property collisionLayer
     * @type Array
     */
    this.collisionLayer = [];

    /**
     * The version of this map
     *
     * @property version
     * @type String
     */
    this.version = map.version;

    //create the layers
    var numX = Math.ceil(this.game.renderer.view.width / this.scaledTileSize.x),
        numY = Math.ceil(this.game.renderer.view.height / this.scaledTileSize.y);

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case 'tilelayer':
                lyr = new gf.TiledLayer(map.layers[i]);
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
                lyr = new gf.TiledObjectGroup(map.layers[i]);
                this.addChild(lyr);

                //auto spawn the player object group
                if(lyr.name === 'player' && !lyr.properties.manual)
                    lyr.spawn();
        }
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

            //get movement vector and normalize as our step
        var step = pv.clone().normalize(),
            //starting position
            start = ent.position,
            //end location
            end = new gf.Point(
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
            text = null,
            tMax = new gf.Point(),
            id = 0,
            tile = null,
            res = [];

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

        //check if we are on a colliding tile
        tile = this.collisionTileset.getTileProperties(this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))]);
        if(tile && tile.isCollidable) {
            res.push({ axis: 'x', tile: tile });
            res.push({ axis: 'y', tile: tile });
            return res;
        }

        //collider overlays
        if(gf.debug._showColliders) {
            this.sprites.freeAll();
            for(var s = 0; s < this.sprites.pool.length; ++s)
                this.sprites.pool[s].visible = false;
        }

        var spr;
        //scan all the tiles along the movement vector
        while(cell.x !== endCell.x || cell.y !== endCell.y) {
            if(tMax.x < tMax.y) {
                tMax.x += tDelta.x;
                cell.x += step.x;
                id = this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))];

                if(gf.debug._showColliders) {
                    text = this.collisionTileset.getTileTexture(id);
                    if(text) {
                        spr = this.sprites.create(text);
                        spr.position.x = cell.x * this.tileSize.x;
                        spr.position.y = cell.y * this.tileSize.y;
                        spr.alpha = 0.5;
                        spr.visible = true;
                        spr.setTexture(text);
                    }
                }

                tile = this.collisionTileset.getTileProperties(id);
                if(tile && tile.isCollidable) {
                    res.push({ axis: 'x', tile: tile });
                }
            } else {
                tMax.y += tDelta.y;
                cell.y += step.y;
                id = this.collisionLayer.tiles[(cell.x + (cell.y * this.collisionLayer.size.x))];

                if(gf.debug._showColliders) {
                    text = this.collisionTileset.getTileTexture(id);
                    if(text) {
                        spr = this.sprites.create(text);
                        spr.position.x = cell.x * this.tileSize.x;
                        spr.position.y = cell.y * this.tileSize.y;
                        spr.alpha = 0.5;
                        spr.visible = true;
                        spr.setTexture(text);
                    }
                }

                tile = this.collisionTileset.getTileProperties(id);
                if(tile && tile.isCollidable) {
                    res.push({ axis: 'y', tile: tile });
                }
            }
        }

        return res;
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
 * @module gf
 * @class TiledLayer
 * @extends Layer
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
gf.TiledLayer = function(layer) {
    gf.Layer.call(this, layer);

    /**
     * The tile IDs of the tilemap
     *
     * @property name
     * @type Uint32Array
     */
    this.tiles = gf.support.typedArrays ? new Uint32Array(layer.data) : layer.data;

    /**
     * The sprite pool for rendering tiles
     *
     * @property tilePool
     * @type Object
     */
    this.sprites = {};

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;

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
            for(var y = startY; y < numY; ++y) {
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
     * Creates the sprite for a tile and caches it in a position
     *
     * @method getTileSprite
     * @param tileX {Number} The x coord of the tile in units of tiles (not pixels)
     * @param tileY {Number} The y coord of the tile in units of tiles (not pixels)
     * @return {PIXI.Sprite} The sprite to display
     */
    getTileSprite: function(tileX, tileY) {
        if(this.sprites[tileX] && this.sprites[tileX][tileY])
            return this.sprites[tileX][tileY];

        if(!this.sprites[tileX]) this.sprites[tileX] = {};

        var id = (tileX + (tileY * this.size.x)),
            tile = this.tiles[id],
            set = this.parent.getTileset(tile);

        if(set) {
            this.sprites[tileX][tileY] = new PIXI.Sprite(set.getTileTexture(tile));
            this.addChild(this.sprites[tileX][tileY]);
        }

        return this.sprites[tileX][tileY];
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
        var spr = this.getTileSprite(fromTileX, fromTileY);

        if(!spr) return;

        var id = (toTileX + (toTileY * this.size.x)),
            tile = this.tiles[id],
            set = this.parent.getTileset(tile);

        if(set) spr.setTexture(set.getTileTexture(tile));
        spr.position.x = toTileX * this.parent.tileSize.x;
        spr.position.y = toTileY * this.parent.tileSize.y;

        //move the sprite in the pool
        if(!this.sprites[toTileX]) this.sprites[toTileX] = {};
        this.sprites[toTileX][toTileY] = spr;
        this.sprites[fromTileX][fromTileY] = null;

        return spr;
    },
    /**
     * Transforms an x,y coord into the index of a tile in the tiles array
     *
     * @method getTileIndex
     * @param x {Number|Vector} The x coord to transform, if a vector is passed it's x/y is used and the y param is ignored
     * @param y {Number} The y coord to transform
     * @return {Number}
     */
    getTileIndex: function(x, y) {
        x = x instanceof gf.Vector ? x.x : x;
        y = x instanceof gf.Vector ? x.y : y;

        //convert the position from units to tiles
        x = Math.floor(x / this.parent.tileSize.x);
        y = Math.floor(y / this.parent.tileSize.y);

        //calculate index of this tile
        return (x + (y * this.size.x));
    },
    /**
     * Transforms an x,y coord into the TiledTileset tile id
     *
     * @method getTileId
     * @param x {Number|Vector} The x coord to transform, if a vector is passed it's x/y is used and the y param is ignored
     * @param y {Number} The y coord to transform
     * @return {Number}
     */
    getTileId: function(x, y) {
        return this.tiles[this.getTileIndex(x, y)];
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
 * @module gf
 * @class TiledTileset
 * @extends Texture
 * @constructor
 * @param settings {Object} All the settings for the tileset
 */
gf.TiledTileset = function(settings) {
    if(!gf.assetCache[settings.name + '_texture']) {
        var loader = new gf.AssetLoader();
        loader.loadTexture(settings.name + '_texture', settings.image);
    }

    //initialize the base Texture class
    gf.Texture.call(this, gf.assetCache[settings.name + '_texture'].baseTexture);

    /**
     * The size of the tileset
     *
     * @property size
     * @type Vector
     */
    this.size = new gf.Vector(settings.imagewidth, settings.imageheight);

    /**
     * The size of a tile in the tileset
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(settings.tilewidth, settings.tileheight);

    /**
     * The name of the tileset
     *
     * @property name
     * @type String
     */
    this.name = settings.name;

    /**
     * The margin around a tile in the tileset
     *
     * @property margin
     * @type Number
     */
    this.margin = settings.margin;

    /**
     * The spacing around a tile in the tileset
     *
     * @property spacing
     * @type Number
     */
    this.spacing = settings.spacing;

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
     * The first tileId in the tileset
     *
     * @property firstgid
     * @type Number
     */
    this.firstgid = settings.firstgid;

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

    //massage tile properties
    for(var i in this.tileproperties) {
        var v = this.tileproperties[i];

        if(v.normal) v.normal = gf.utils.ensureVector(v.normal);

        if(v.isCollidable === 'true') v.isCollidable = true;
        if(v.isBreakable === 'true') v.isBreakable = true;
    }

    /**
     * The texture instances for each tile in the set
     *
     * @property textures
     * @type Array
     */
    this.textures = [];

    //generate tile textures
    for(var t = 0, tl = this.lastgid - this.firstgid; t < tl; ++t) {
        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(t / this.numTiles.x),
            x = (t - (y * this.numTiles.x));

        this.textures.push(
            new gf.Texture(
                this.baseTexture,
                new PIXI.Rectangle(
                    x * this.tileSize.x,
                    y * this.tileSize.y,
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
                    type: gf.Layer.COLLISION.NONE
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
 * @module gf
 * @class TiledObjectGroup
 * @extends Layer
 * @constructor
 * @param group {Object} All the settings for the layer
 */
 gf.TiledObjectGroup = function(group) {
    gf.Layer.call(this, group);

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
            props.visible = this.visible;
            props.position = [o.x, o.y];

            //spawn from entity pool
            this.addChild(gf.entityPool.create(this.parent.game, props.name, props));
            this.parent.game.players.push(this.children[i]);
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

//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
/**
 * Namespace for all plugins, it also provides methods for patching
 * core functions, and registering plugins.
 *
 * @module gf
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