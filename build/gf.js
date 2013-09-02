/**
 * @license
 * GrapeFruit Game Engine - v0.0.2
 * Copyright (c) 2012, Chad Engler
 * https://github.com/englercj/grapefruit
 *
 * Compiled: 2013-09-01
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
 * Pixi.JS - v1.3.0
 * Copyright (c) 2012, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2013-08-18
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
 * @module PIXI
 */
var PIXI = PIXI || {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 *
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
 * Creates a clone of this point
 *
 * @method clone
 * @return {Point} a copy of the point
 */
PIXI.Point.prototype.clone = function()
{
	return new PIXI.Point(this.x, this.y);
}

// constructor
PIXI.Point.prototype.constructor = PIXI.Point;


/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * the Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
 *
 * @class Rectangle
 * @constructor 
 * @param x {Number} The X coord of the upper-left corner of the rectangle
 * @param y {Number} The Y coord of the upper-left corner of the rectangle
 * @param width {Number} The overall wisth of this rectangle
 * @param height {Number} The overall height of this rectangle
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
 * Creates a clone of this Rectangle
 *
 * @method clone
 * @return {Rectangle} a copy of the rectangle
 */
PIXI.Rectangle.prototype.clone = function()
{
	return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this Rectangle
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this Rectangle
 */
PIXI.Rectangle.prototype.contains = function(x, y)
{
    if(this.width <= 0 || this.height <= 0)
        return false;

	var x1 = this.x;
	if(x >= x1 && x <= x1 + this.width)
	{
		var y1 = this.y;
		
		if(y >= y1 && y <= y1 + this.height)
		{
			return true;
		}
	}

	return false;
}

// constructor
PIXI.Rectangle.prototype.constructor = PIXI.Rectangle;


/**
 * @author Adrien Brault <adrien.brault@gmail.com>
 */

/**
 * @class Polygon
 * @constructor
 * @param points* {Array<Point>|Array<Number>|Point...|Number...} This can be an array of Points that form the polygon,
 *      a flat array of numbers that will be interpreted as [x,y, x,y, ...], or the arugments passed can be
 *      all the points of the polygon e.g. `new PIXI.Polygon(new PIXI.Point(), new PIXI.Point(), ...)`, or the
 *      arguments passed can be flat x,y values e.g. `new PIXI.Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are
 *      Numbers.
 */
PIXI.Polygon = function(points)
{
    //if points isn't an array, use arguments as the array
    if(!(points instanceof Array))
        points = Array.prototype.slice.call(arguments);

    //if this is a flat array of numbers, convert it to points
    if(typeof points[0] === 'number') {
        var p = [];
        for(var i = 0, il = points.length; i < il; i+=2) {
            p.push(
                new PIXI.Point(points[i], points[i + 1])
            );
        }

        points = p;
    }

	this.points = points;
}

/**
 * Creates a clone of this polygon
 *
 * @method clone
 * @return {Polygon} a copy of the polygon
 */
PIXI.Polygon.prototype.clone = function()
{
	var points = [];
	for (var i=0; i<this.points.length; i++) {
		points.push(this.points[i].clone());
	}

	return new PIXI.Polygon(points);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this polygon
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this polygon
 */
PIXI.Polygon.prototype.contains = function(x, y)
{
    var inside = false;

    // use some raycasting to test hits
    // https://github.com/substack/point-in-polygon/blob/master/index.js
    for(var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
        var xi = this.points[i].x, yi = this.points[i].y,
            xj = this.points[j].x, yj = this.points[j].y,
            intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if(intersect) inside = !inside;
    }

    return inside;
}

PIXI.Polygon.prototype.constructor = PIXI.Polygon;


/**
 * @author Chad Engler <chad@pantherdev.com>
 */

/**
 * The Circle object can be used to specify a hit area for displayobjects
 *
 * @class Circle
 * @constructor
 * @param x {Number} The X coord of the upper-left corner of the framing rectangle of this circle
 * @param y {Number} The Y coord of the upper-left corner of the framing rectangle of this circle
 * @param radius {Number} The radius of the circle
 */
PIXI.Circle = function(x, y, radius)
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
     * @property radius
     * @type Number
     * @default 0
     */
    this.radius = radius || 0;
}

/**
 * Creates a clone of this Circle instance
 *
 * @method clone
 * @return {Circle} a copy of the polygon
 */
PIXI.Circle.prototype.clone = function()
{
    return new PIXI.Circle(this.x, this.y, this.radius);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this circle
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this polygon
 */
PIXI.Circle.prototype.contains = function(x, y)
{
    if(this.radius <= 0)
        return false;

    var dx = (this.x - x),
        dy = (this.y - y),
        r2 = this.radius * this.radius;

    dx *= dx;
    dy *= dy;

    return (dx + dy <= r2);
}

PIXI.Circle.prototype.constructor = PIXI.Circle;


/**
 * @author Chad Engler <chad@pantherdev.com>
 */

/**
 * The Ellipse object can be used to specify a hit area for displayobjects
 *
 * @class Ellipse
 * @constructor
 * @param x {Number} The X coord of the upper-left corner of the framing rectangle of this ellipse
 * @param y {Number} The Y coord of the upper-left corner of the framing rectangle of this ellipse
 * @param width {Number} The overall height of this ellipse
 * @param height {Number} The overall width of this ellipse
 */
PIXI.Ellipse = function(x, y, width, height)
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
 * Creates a clone of this Ellipse instance
 *
 * @method clone
 * @return {Ellipse} a copy of the ellipse
 */
PIXI.Ellipse.prototype.clone = function()
{
    return new PIXI.Ellipse(this.x, this.y, this.width, this.height);
}

/**
 * Checks if the x, and y coords passed to this function are contained within this ellipse
 *
 * @method contains
 * @param x {Number} The X coord of the point to test
 * @param y {Number} The Y coord of the point to test
 * @return {Boolean} if the x/y coords are within this ellipse
 */
PIXI.Ellipse.prototype.contains = function(x, y)
{
    if(this.width <= 0 || this.height <= 0)
        return false;

    //normalize the coords to an ellipse with center 0,0
    //and a radius of 0.5
    var normx = ((x - this.x) / this.width) - 0.5,
        normy = ((y - this.y) / this.height) - 0.5;

    normx *= normx;
    normy *= normy;

    return (normx + normy < 0.25);
}

PIXI.Ellipse.getBounds = function()
{
    return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
}

PIXI.Ellipse.prototype.constructor = PIXI.Ellipse;




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


PIXI.mat3.identity = function(matrix)
{
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

PIXI.mat3.clone = function(mat)
{
	var matrix = new PIXI.Matrix(9);

	matrix[0] = mat[0];
	matrix[1] = mat[1];
	matrix[2] = mat[2];
	matrix[3] = mat[3];
	matrix[4] = mat[4];
	matrix[5] = mat[5];
	matrix[6] = mat[6];
	matrix[7] = mat[7];
	matrix[8] = mat[8];
	
	return matrix;
}

PIXI.mat3.transpose = function (mat, dest) 
{
 	// If we are transposing ourselves we can skip a few steps but have to cache some values
    if (!dest || mat === dest) {
        var a01 = mat[1], a02 = mat[2],
            a12 = mat[5];

        mat[1] = mat[3];
        mat[2] = mat[6];
        mat[3] = a01;
        mat[5] = mat[7];
        mat[6] = a02;
        mat[7] = a12;
        return mat;
    }

    dest[0] = mat[0];
    dest[1] = mat[3];
    dest[2] = mat[6];
    dest[3] = mat[1];
    dest[4] = mat[4];
    dest[5] = mat[7];
    dest[6] = mat[2];
    dest[7] = mat[5];
    dest[8] = mat[8];
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
 * The base class for all objects that are rendered on the screen.
 *
 * @class DisplayObject
 * @constructor
 */
PIXI.DisplayObject = function()
{
	this.last = this;
	this.first = this;

	/**
	 * The coordinate of the object relative to the local coordinates of the parent.
	 *
	 * @property position
	 * @type Point
	 */
	this.position = new PIXI.Point();

	/**
	 * The scale factor of the object.
	 *
	 * @property scale
	 * @type Point
	 */
	this.scale = new PIXI.Point(1,1);//{x:1, y:1};

	/**
	 * The pivot point of the displayObject that it rotates around
	 *
	 * @property pivot
	 * @type Point
	 */
	this.pivot = new PIXI.Point(0,0);

	/**
	 * The rotation of the object in radians.
	 *
	 * @property rotation
	 * @type Number
	 */
	this.rotation = 0;

	/**
	 * The opacity of the object.
	 *
	 * @property alpha
	 * @type Number
	 */	
	this.alpha = 1;

	/**
	 * The visibility of the object.
	 *
	 * @property visible
	 * @type Boolean
	 */	
	this.visible = true;

	/**
	 * This is the defined area that will pick up mouse / touch events. It is null by default.
	 * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
	 *
	 * @property hitArea
	 * @type Rectangle|Circle|Ellipse|Polygon
	 */	
	this.hitArea = null;

	/**
	 * This is used to indicate if the displayObject should display a mouse hand cursor on rollover
	 *
	 * @property buttonMode
	 * @type Boolean
	 */
	this.buttonMode = false;

	/**
	 * Can this object be rendered
	 *
	 * @property renderable
	 * @type Boolean
	 */
	this.renderable = false;

	/**
	 * [read-only] The display object container that contains this display object.
	 *
	 * @property parent
	 * @type DisplayObjectContainer
	 * @readOnly
	 */	
	this.parent = null;

	/**
	 * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
	 *
	 * @property stage
	 * @type Stage
	 * @readOnly
	 */	
	this.stage = null;

	/**
	 * [read-only] The multiplied alpha of the displayobject
	 *
	 * @property worldAlpha
	 * @type Number
	 * @readOnly
	 */
	this.worldAlpha = 1;

	/**
	 * [read-only] Whether or not the object is interactive, do not toggle directly! use the `interactive` property
	 *
	 * @property _interactive
	 * @type Boolean
	 * @readOnly
	 * @private
	 */
	this._interactive = false;

	/**
	 * [read-only] Current transform of the object based on world (parent) factors
	 *
	 * @property worldTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.worldTransform = PIXI.mat3.create()//mat3.identity();

	/**
	 * [read-only] Current transform of the object locally
	 *
	 * @property localTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.localTransform = PIXI.mat3.create()//mat3.identity();

	/**
	 * [NYI] Unkown
	 *
	 * @property color
	 * @type Array<>
	 * @private
	 */
	this.color = [];

	/**
	 * [NYI] Holds whether or not this object is dynamic, for rendering optimization
	 *
	 * @property dynamic
	 * @type Boolean
	 * @private
	 */
	this.dynamic = true;

	// chach that puppy!
	this._sr = 0;
	this._cr = 1;

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
PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;

/**
 * [Deprecated] Indicates if the sprite will have touch and mouse interactivity. It is false by default
 * Instead of using this function you can now simply set the interactive property to true or false
 *
 * @method setInteractive
 * @param interactive {Boolean}
 * @deprecated Simply set the `interactive` property directly
 */
PIXI.DisplayObject.prototype.setInteractive = function(interactive)
{
	this.interactive = interactive;
}

/**
 * Indicates if the sprite will have touch and mouse interactivity. It is false by default
 *
 * @property interactive
 * @type Boolean
 * @default false
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'interactive', {
    get: function() {
        return this._interactive;
    },
    set: function(value) {
    	this._interactive = value;
    	
    	// TODO more to be done here..
		// need to sort out a re-crawl!
		if(this.stage)this.stage.dirty = true;
    }
});

/**
 * Sets a mask for the displayObject. A mask is an object that limits the visibility of an object to the shape of the mask applied to it.
 * In PIXI a regular mask must be a PIXI.Ggraphics object. This allows for much faster masking in canvas as it utilises shape clipping.
 * To remove a mask, set this property to null.
 *
 * @property mask
 * @type Graphics
 */
Object.defineProperty(PIXI.DisplayObject.prototype, 'mask', {
    get: function() {
        return this._mask;
    },
    set: function(value) {
    	
        this._mask = value;
        
        if(value)
        {
	        this.addFilter(value)
        }
        else
        {
        	 this.removeFilter();
        }
    }
});

/*
 * Adds a filter to this displayObject
 *
 * @method addFilter
 * @param mask {Graphics} the graphics object to use as a filter
 * @private
 */
PIXI.DisplayObject.prototype.addFilter = function(mask)
{
	if(this.filter)return;
	this.filter = true;
	
	// insert a filter block..
	var start = new PIXI.FilterBlock();
	var end = new PIXI.FilterBlock();
	
	start.mask = mask;
	end.mask = mask;
	
	start.first = start.last =  this;
	end.first = end.last = this;
	
	start.open = true;
	
	/*
	 * insert start
	 */
	
	var childFirst = start
	var childLast = start
	var nextObject;
	var previousObject;
		
	previousObject = this.first._iPrev;
	
	if(previousObject)
	{
		nextObject = previousObject._iNext;
		childFirst._iPrev = previousObject;
		previousObject._iNext = childFirst;		
	}
	else
	{
		nextObject = this;
	}	
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	
	// now insert the end filter block..
	
	/*
	 * insert end filter
	 */
	var childFirst = end
	var childLast = end
	var nextObject = null;
	var previousObject = null;
		
	previousObject = this.last;
	nextObject = previousObject._iNext;
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	childFirst._iPrev = previousObject;
	previousObject._iNext = childFirst;	
	
	var updateLast = this;
	
	var prevLast = this.last;
	while(updateLast)
	{
		if(updateLast.last == prevLast)
		{
			updateLast.last = end;
		}
		updateLast = updateLast.parent;
	}
	
	this.first = start;
	
	// if webGL...
	if(this.__renderGroup)
	{
		this.__renderGroup.addFilterBlocks(start, end);
	}
	
	mask.renderable = false;
	
}

/*
 * Removes the filter to this displayObject
 *
 * @method removeFilter
 * @private
 */
PIXI.DisplayObject.prototype.removeFilter = function()
{
	if(!this.filter)return;
	this.filter = false;
	
	// modify the list..
	var startBlock = this.first;
	
	var nextObject = startBlock._iNext;
	var previousObject = startBlock._iPrev;
		
	if(nextObject)nextObject._iPrev = previousObject;
	if(previousObject)previousObject._iNext = nextObject;		
	
	this.first = startBlock._iNext;
	
	
	// remove the end filter
	var lastBlock = this.last;
	
	var nextObject = lastBlock._iNext;
	var previousObject = lastBlock._iPrev;
		
	if(nextObject)nextObject._iPrev = previousObject;
	previousObject._iNext = nextObject;		
	
	// this is always true too!
	var tempLast =  lastBlock._iPrev;	
	// need to make sure the parents last is updated too
	var updateLast = this;
	while(updateLast.last == lastBlock)
	{
		updateLast.last = tempLast;
		updateLast = updateLast.parent;
		if(!updateLast)break;
	}
	
	var mask = startBlock.mask
	mask.renderable = true;
	
	// if webGL...
	if(this.__renderGroup)
	{
		this.__renderGroup.removeFilterBlocks(startBlock, lastBlock);
	}
}

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.DisplayObject.prototype.updateTransform = function()
{
	// TODO OPTIMIZE THIS!! with dirty
	if(this.rotation !== this.rotationCache)
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
	
	// TODO --> do we even need a local matrix???
	
	var px = this.pivot.x;
	var py = this.pivot.y;
   	
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = localTransform[0], a01 = localTransform[1], a02 = this.position.x - localTransform[0] * px - py * localTransform[1],
        a10 = localTransform[3], a11 = localTransform[4], a12 = this.position.y - localTransform[4] * py - px * localTransform[3],

        b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2],
        b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];

	localTransform[2] = a02
	localTransform[5] = a12
	
    worldTransform[0] = b00 * a00 + b01 * a10;
    worldTransform[1] = b00 * a01 + b01 * a11;
    worldTransform[2] = b00 * a02 + b01 * a12 + b02;

    worldTransform[3] = b10 * a00 + b11 * a10;
    worldTransform[4] = b10 * a01 + b11 * a11;
    worldTransform[5] = b10 * a02 + b11 * a12 + b12;

	// because we are using affine transformation, we can optimise the matrix concatenation process.. wooo!
	// mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
	this.worldAlpha = this.alpha * this.parent.worldAlpha;
	
	this.vcount = PIXI.visibleCount;

}

PIXI.visibleCount = 0;
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A DisplayObjectContainer represents a collection of display objects.
 * It is the base class of all display objects that act as a container for other objects.
 *
 * @class DisplayObjectContainer 
 * @extends DisplayObject
 * @constructor
 */
PIXI.DisplayObjectContainer = function()
{
	PIXI.DisplayObject.call( this );
	
	/**
	 * [read-only] The of children of this container.
	 *
	 * @property children
	 * @type Array<DisplayObject>
	 * @readOnly
	 */	
	this.children = [];
}

// constructor
PIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );
PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;

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
 *
 * @method addChild
 * @param child {DisplayObject} The DisplayObject to add to the container
 */
PIXI.DisplayObjectContainer.prototype.addChild = function(child)
{
	if(child.parent != undefined)
	{
		
		//// COULD BE THIS???
		child.parent.removeChild(child);
	//	return;
	}

	child.parent = this;
	
	this.children.push(child);	
	
	// update the stage refference..
	
	if(this.stage)
	{
		var tmpChild = child;
		do
		{
			if(tmpChild.interactive)this.stage.dirty = true;
			tmpChild.stage = this.stage;
			tmpChild = tmpChild._iNext;
		}	
		while(tmpChild)
	}
	
	// LINKED LIST //
	
	// modify the list..
	var childFirst = child.first
	var childLast = child.last;
	var nextObject;
	var previousObject;
	
	// this could be wrong if there is a filter??
	if(this.filter)
	{
		previousObject =  this.last._iPrev;
	}
	else
	{
		previousObject = this.last;
	}

	nextObject = previousObject._iNext;
	
	// always true in this case
	// need to make sure the parents last is updated too
	var updateLast = this;
	var prevLast = previousObject;
	
	while(updateLast)
	{
		if(updateLast.last == prevLast)
		{
			updateLast.last = child.last;
		}
		updateLast = updateLast.parent;
	}
	
	if(nextObject)
	{
		nextObject._iPrev = childLast;
		childLast._iNext = nextObject;
	}
	
	childFirst._iPrev = previousObject;
	previousObject._iNext = childFirst;		

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
 *
 * @method addChildAt
 * @param child {DisplayObject} The child to add
 * @param index {Number} The index to place the child in
 */
PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	if(index >= 0 && index <= this.children.length)
	{
		if(child.parent != undefined)
		{
			child.parent.removeChild(child);
		}
		child.parent = this;
		
		if(this.stage)
		{
			var tmpChild = child;
			do
			{
				if(tmpChild.interactive)this.stage.dirty = true;
				tmpChild.stage = this.stage;
				tmpChild = tmpChild._iNext;
			}
			while(tmpChild)
		}
		
		// modify the list..
		var childFirst = child.first;
		var childLast = child.last;
		var nextObject;
		var previousObject;
		
		if(index == this.children.length)
		{
			previousObject =  this.last;
			var updateLast = this;
			var prevLast = this.last;
			while(updateLast)
			{
				if(updateLast.last == prevLast)
				{
					updateLast.last = child.last;
				}
				updateLast = updateLast.parent;
			}
		}
		else if(index == 0)
		{
			previousObject = this;
		}
		else
		{
			previousObject = this.children[index-1].last;
		}
		
		nextObject = previousObject._iNext;
		
		// always true in this case
		if(nextObject)
		{
			nextObject._iPrev = childLast;
			childLast._iNext = nextObject;
		}
		
		childFirst._iPrev = previousObject;
		previousObject._iNext = childFirst;		

		this.children.splice(index, 0, child);
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
		throw new Error(child + " The index "+ index +" supplied is out of bounds " + this.children.length);
	}
}

/**
 * [NYI] Swaps the depth of 2 displayObjects
 *
 * @method swapChildren
 * @param child {DisplayObject}
 * @param child2 {DisplayObject}
 * @private
 */
PIXI.DisplayObjectContainer.prototype.swapChildren = function(child, child2)
{
	/*
	 * this funtion needs to be recoded.. 
	 * can be done a lot faster..
	 */
	return;
	
	// need to fix this function :/
	/*
	// TODO I already know this??
	var index = this.children.indexOf( child );
	var index2 = this.children.indexOf( child2 );
	
	if ( index !== -1 && index2 !== -1 ) 
	{
		// cool
		
		/*
		if(this.stage)
		{
			// this is to satisfy the webGL batching..
			// TODO sure there is a nicer way to achieve this!
			this.stage.__removeChild(child);
			this.stage.__removeChild(child2);
			
			this.stage.__addChild(child);
			this.stage.__addChild(child2);
		}
		
		// swap the positions..
		this.children[index] = child2;
		this.children[index2] = child;
		
	}
	else
	{
		throw new Error(child + " Both the supplied DisplayObjects must be a child of the caller " + this);
	}*/
}

/**
 * Returns the Child at the specified index
 *
 * @method getChildAt
 * @param index {Number} The index to get the child from
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
 *
 * @method removeChild
 * @param child {DisplayObject} The DisplayObject to remove
 */
PIXI.DisplayObjectContainer.prototype.removeChild = function(child)
{
	var index = this.children.indexOf( child );
	if ( index !== -1 ) 
	{
		// unlink //
		// modify the list..
		var childFirst = child.first;
		var childLast = child.last;
		
		var nextObject = childLast._iNext;
		var previousObject = childFirst._iPrev;
			
		if(nextObject)nextObject._iPrev = previousObject;
		previousObject._iNext = nextObject;		
		
		if(this.last == childLast)
		{
			var tempLast =  childFirst._iPrev;	
			// need to make sure the parents last is updated too
			var updateLast = this;
			while(updateLast.last == childLast.last)
			{
				updateLast.last = tempLast;
				updateLast = updateLast.parent;
				if(!updateLast)break;
			}
		}
		
		childLast._iNext = null;
		childFirst._iPrev = null;
		 
		// update the stage reference..
		if(this.stage)
		{
			var tmpChild = child;
			do
			{
				if(tmpChild.interactive)this.stage.dirty = true;
				tmpChild.stage = null;
				tmpChild = tmpChild._iNext;
			}	
			while(tmpChild)
		}
	
		// webGL trim
		if(child.__renderGroup)
		{
			child.__renderGroup.removeDisplayObjectAndChildren(child);
		}
		
		child.parent = undefined;
		this.children.splice( index, 1 );
	}
	else
	{
		throw new Error(child + " The supplied DisplayObject must be a child of the caller " + this);
	}
}

/*
 * Updates the container's children's transform for rendering
 *
 * @method updateTransform
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
 * The SPrite object is the base for all textured objects that are rendered to the screen
 *
 * @class Sprite
 * @extends DisplayObjectContainer
 * @constructor
 * @param texture {Texture} The texture for this sprite
 * @type String
 */
PIXI.Sprite = function(texture)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * The anchor sets the origin point of the texture.
	 * The default is 0,0 this means the textures origin is the top left 
	 * Setting than anchor to 0.5,0.5 means the textures origin is centered
	 * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right
	 *
     * @property anchor
     * @type Point
     */
	this.anchor = new PIXI.Point();

	/**
	 * The texture that the sprite is using
	 *
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;

	/**
	 * The blend mode of sprite.
	 * currently supports PIXI.blendModes.NORMAL and PIXI.blendModes.SCREEN
	 *
	 * @property blendMode
	 * @type Number
	 */
	this.blendMode = PIXI.blendModes.NORMAL;

	/**
	 * The width of the sprite (this is initially set by the texture)
	 *
	 * @property _width
	 * @type Number
	 * @private
	 */
	this._width = 0;

	/**
	 * The height of the sprite (this is initially set by the texture)
	 *
	 * @property _height
	 * @type Number
	 * @private
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
}

// constructor
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Sprite.prototype.constructor = PIXI.Sprite;

/**
 * The width of the sprite, setting this will actually modify the scale to acheive the value set
 *
 * @property width
 * @type Number
 */
Object.defineProperty(PIXI.Sprite.prototype, 'width', {
    get: function() {
        return this.scale.x * this.texture.frame.width;
    },
    set: function(value) {
    	this.scale.x = value / this.texture.frame.width
        this._width = value;
    }
});

/**
 * The height of the sprite, setting this will actually modify the scale to acheive the value set
 *
 * @property height
 * @type Number
 */
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
 * Sets the texture of the sprite
 *
 * @method setTexture
 * @param texture {Texture} The PIXI texture that is displayed by the sprite
 */
PIXI.Sprite.prototype.setTexture = function(texture)
{
	// stop current texture;
	if(this.texture.baseTexture != texture.baseTexture)
	{
		this.textureChange = true;	
		
		if(this.__renderGroup)
		{
			this.texture = texture;
			this.__renderGroup.updateTexture(this);
		}
	}
	else
	{
		this.texture = texture;
	}
	
	this.updateFrame = true;
}

/**
 * When the texture is updated, this event will fire to update the scale and frame
 *
 * @method onTextureUpdate
 * @param event
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
 *
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
 *
 * @method fromImage
 * @static
 * @param imageId {String} The image url of the texture
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
 *
 * @class MovieClip
 * @extends Sprite
 * @constructor
 * @param textures {Array<Texture>} an array of {Texture} objects that make up the animation
 */
PIXI.MovieClip = function(textures)
{
	PIXI.Sprite.call(this, textures[0]);
	
	/**
	 * The array of textures that make up the animation
	 *
	 * @property textures
	 * @type Array
	 */
	this.textures = textures;
	
	/**
	 * The speed that the MovieClip will play at. Higher is faster, lower is slower
	 *
	 * @property animationSpeed
	 * @type Number
	 * @default 1
	 */
	this.animationSpeed = 1;

	/**
	 * Whether or not the movie clip repeats after playing.
	 *
	 * @property loop
	 * @type Boolean
	 * @default true
	 */
	this.loop = true;

	/**
	 * Function to call when a MovieClip finishes playing
	 *
	 * @property onComplete
	 * @type Function
	 */
	this.onComplete = null;
	
	/**
	 * [read-only] The index MovieClips current frame (this may not have to be a whole number)
	 *
	 * @property currentFrame
	 * @type Number
	 * @default 0
	 * @readOnly
	 */
	this.currentFrame = 0; 
	
	/**
	 * [read-only] Indicates if the MovieClip is currently playing
	 *
	 * @property playing
	 * @type Boolean
	 * @readOnly
	 */
	this.playing = false;
}

// constructor
PIXI.MovieClip.prototype = Object.create( PIXI.Sprite.prototype );
PIXI.MovieClip.prototype.constructor = PIXI.MovieClip;

/**
 * Stops the MovieClip
 *
 * @method stop
 */
PIXI.MovieClip.prototype.stop = function()
{
	this.playing = false;
}

/**
 * Plays the MovieClip
 *
 * @method play
 */
PIXI.MovieClip.prototype.play = function()
{
	this.playing = true;
}

/**
 * Stops the MovieClip and goes to a specific frame
 *
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
 *
 * @method gotoAndPlay
 * @param frameNumber {Number} frame index to start at
 */
PIXI.MovieClip.prototype.gotoAndPlay = function(frameNumber)
{
	this.currentFrame = frameNumber;
	this.playing = true;
}

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
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



PIXI.FilterBlock = function(mask)
{
	this.graphics = mask
	this.visible = true;
	this.renderable = true;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Text Object will create a line(s) of text to split a line you can use "\n"
 *
 * @class Text
 * @extends Sprite
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param [style] {Object} The style parameters
 * @param [style.font] {String} default "bold 20pt Arial" The style and size of the font
 * @param [style.fill="black"] {Object} A canvas fillstyle that will be used on the text eg "red", "#00FF00"
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 * @param [style.stroke] {String} A canvas fillstyle that will be used on the text stroke eg "blue", "#FCFF00"
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap
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
PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype);
PIXI.Text.prototype.constructor = PIXI.Text;

/**
 * Set the style of the text
 *
 * @method setStyle
 * @param [style] {Object} The style parameters
 * @param [style.font="bold 20pt Arial"] {String} The style and size of the font
 * @param [style.fill="black"] {Object} A canvas fillstyle that will be used on the text eg "red", "#00FF00"
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 * @param [style.stroke="black"] {String} A canvas fillstyle that will be used on the text stroke eg "blue", "#FCFF00"
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap
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
 *
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
 *
 * @method updateText
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
 *
 * @method updateTexture
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
 * Updates the transfor of this object
 *
 * @method updateTransform
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
 *
 * @method determineFontHeight
 * @param fontStyle {Object}
 * @private
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
 *
 * @method wordWrap
 * @param text {String}
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

/**
 * Destroys this text object
 *
 * @method destroy
 * @param destroyTexture {Boolean}
 */
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
 *
 * @class BitmapText
 * @extends DisplayObjectContainer
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param style {Object} The style parameters
 * @param style.font {String} The size (optional) and bitmap font id (required) eq "Arial" or "20px Arial" (must have loaded previously)
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
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
PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.BitmapText.prototype.constructor = PIXI.BitmapText;

/**
 * Set the copy for the text object
 *
 * @method setText
 * @param text {String} The copy that you would like the text to display
 */
PIXI.BitmapText.prototype.setText = function(text)
{
    this.text = text || " ";
    this.dirty = true;
};

/**
 * Set the style of the text
 *
 * @method setStyle
 * @param style {Object} The style parameters
 * @param style.font {String} The size (optional) and bitmap font id (required) eq "Arial" or "20px Arial" (must have loaded previously)
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
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
 *
 * @method updateText
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
        var c = new PIXI.Sprite(chars[i].texture)//PIXI.Sprite.fromFrame(chars[i].charCode);
        c.position.x = (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale;
        c.position.y = chars[i].position.y * scale;
        c.scale.x = c.scale.y = scale;
        this.addChild(c);
    }

    this.width = pos.x * scale;
    this.height = (pos.y + data.lineHeight) * scale;
};

/**
 * Updates the transfor of this object
 *
 * @method updateTransform
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
 * The interaction manager deals with mouse and touch events. Any DisplayObject can be interactive
 * This manager also supports multitouch.
 *
 * @class InteractionManager
 * @constructor
 * @param stage {Stage} The stage to handle interactions
 */
PIXI.InteractionManager = function(stage)
{
	/**
	 * a refference to the stage
	 *
	 * @property stage
	 * @type Stage
	 */
	this.stage = stage;

	/**
	 * the mouse data
	 *
	 * @property mouse
	 * @type InteractionData
	 */
	this.mouse = new PIXI.InteractionData();

	/**
	 * an object that stores current touches (InteractionData) by id reference
	 *
	 * @property touchs
	 * @type Object
	 */
	this.touchs = {};


	
	// helpers
	this.tempPoint = new PIXI.Point();
	//this.tempMatrix =  mat3.create();

	this.mouseoverEnabled = true;

	//tiny little interactiveData pool!
	this.pool = [];

	this.interactiveItems = [];
	
	
	this.last = 0;
}

// constructor
PIXI.InteractionManager.prototype.constructor = PIXI.InteractionManager;

/**
 * Collects an interactive sprite recursively to have their interactions managed
 *
 * @method collectInteractiveSprite
 * @param displayObject {DisplayObject} the displayObject to collect
 * @param iParent {DisplayObject}
 * @private
 */
PIXI.InteractionManager.prototype.collectInteractiveSprite = function(displayObject, iParent)
{
	var children = displayObject.children;
	var length = children.length;
	
	/// make an interaction tree... {item.__interactiveParent}
	for (var i = length-1; i >= 0; i--)
	{
		var child = children[i];
		
//		if(child.visible) {
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
//		}
	}
}

/**
 * Sets the target for event delegation
 *
 * @method setTarget
 * @param target {WebGLRenderer|CanvasRenderer} the renderer to bind events to
 * @private
 */
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
 	target.view.addEventListener('mouseout',   this.onMouseOut.bind(this), true);
	
	// aint no multi touch just yet!
	target.view.addEventListener("touchstart", this.onTouchStart.bind(this), true);
	target.view.addEventListener("touchend", this.onTouchEnd.bind(this), true);
	target.view.addEventListener("touchmove", this.onTouchMove.bind(this), true);
}

/**
 * updates the state of interactive objects
 *
 * @method update
 * @private
 */
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
		
		for (var i=0; i < len; i++) {
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
		
		
		//if(!item.visible)continue;
		
		// OPTIMISATION - only calculate every time if the mousemove function exists..
		// OK so.. does the object have any other interactive functions?
		// hit-test the clip!
		
		
		if(item.mouseover || item.mouseout || item.buttonMode)
		{
			// ok so there are some functions so lets hit test it..
			item.__hit = this.hitTest(item, this.mouse);
			this.mouse.target = item;
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

/**
 * Is called when the mouse moves accross the renderer element
 *
 * @method onMouseMove
 * @param event {Event} The DOM event of the mouse moving
 * @private
 */
PIXI.InteractionManager.prototype.onMouseMove = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
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

/**
 * Is called when the mouse button is pressed down on the renderer element
 *
 * @method onMouseDown
 * @param event {Event} The DOM event of a mouse button being pressed down
 * @private
 */
PIXI.InteractionManager.prototype.onMouseDown = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	
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


PIXI.InteractionManager.prototype.onMouseOut = function(event)
{
	var length = this.interactiveItems.length;
	
	this.target.view.style.cursor = "default";	
				
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		
		if(item.__isOver)
		{
			this.mouse.target = item;
			if(item.mouseout)item.mouseout(this.mouse);
			item.__isOver = false;	
		}
	}
}

/**
 * Is called when the mouse button is released on the renderer element
 *
 * @method onMouseUp
 * @param event {Event} The DOM event of a mouse button being released
 * @private
 */
PIXI.InteractionManager.prototype.onMouseUp = function(event)
{
	this.mouse.originalEvent = event || window.event; //IE uses window.event
	
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

/**
 * Tests if the current mouse coords hit a sprite
 *
 * @method hitTest
 * @param item {DisplayObject} The displayObject to test for a hit
 * @param interactionData {InteractionData} The interactiondata object to update in the case of a hit
 * @private
 */
PIXI.InteractionManager.prototype.hitTest = function(item, interactionData)
{
	var global = interactionData.global;
	
	if(item.vcount !== PIXI.visibleCount)return false;

	var isSprite = (item instanceof PIXI.Sprite),
		worldTransform = item.worldTransform,
		a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
		a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
		id = 1 / (a00 * a11 + a01 * -a10),
		x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id,
		y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;

	interactionData.target = item;
	
	//a sprite or display object with a hit area defined
	if(item.hitArea && item.hitArea.contains) {
		if(item.hitArea.contains(x, y)) {
			//if(isSprite)
			interactionData.target = item;

			return true;
		}
		
		return false;
	}
	// a sprite with no hitarea defined
	else if(isSprite)
	{
		var width = item.texture.frame.width,
			height = item.texture.frame.height,
			x1 = -width * item.anchor.x,
			y1;
		
		if(x > x1 && x < x1 + width)
		{
			y1 = -height * item.anchor.y;
		
			if(y > y1 && y < y1 + height)
			{
				// set the target property if a hit is true!
				interactionData.target = item
				return true;
			}
		}
	}

	var length = item.children.length;
	
	for (var i = 0; i < length; i++)
	{
		var tempItem = item.children[i];
		var hit = this.hitTest(tempItem, interactionData);
		if(hit)
		{
			// hmm.. TODO SET CORRECT TARGET?
			interactionData.target = item
			return true;
		}
	}

	return false;	
}

/**
 * Is called when a touch is moved accross the renderer element
 *
 * @method onTouchMove
 * @param event {Event} The DOM event of a touch moving accross the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchMove = function(event)
{
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		touchData.originalEvent =  event || window.event;
		
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

/**
 * Is called when a touch is started on the renderer element
 *
 * @method onTouchStart
 * @param event {Event} The DOM event of a touch starting on the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchStart = function(event)
{
	var rect = this.target.view.getBoundingClientRect();
	
	var changedTouches = event.changedTouches;
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		
		var touchData = this.pool.pop();
		if(!touchData)touchData = new PIXI.InteractionData();
		
		touchData.originalEvent =  event || window.event;
		
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

/**
 * Is called when a touch is ended on the renderer element
 *
 * @method onTouchEnd
 * @param event {Event} The DOM event of a touch ending on the renderer view
 * @private
 */
PIXI.InteractionManager.prototype.onTouchEnd = function(event)
{
	//this.mouse.originalEvent = event || window.event; //IE uses window.event
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
				touchData.originalEvent =  event || window.event;
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
 * Holds all information related to an Interaction event
 *
 * @class InteractionData
 * @constructor
 */
PIXI.InteractionData = function()
{
	/**
	 * This point stores the global coords of where the touch/mouse event happened
	 *
	 * @property global 
	 * @type Point
	 */
	this.global = new PIXI.Point();
	
	// this is here for legacy... but will remove
	this.local = new PIXI.Point();

	/**
	 * The target Sprite that was interacted with
	 *
	 * @property target
	 * @type Sprite
	 */
	this.target;

	/**
	 * When passed to an event handler, this will be the original DOM Event that was captured
	 *
	 * @property originalEvent
	 * @type Event
	 */
	this.originalEvent;
}

/**
 * This will return the local coords of the specified displayObject for this InteractionData
 *
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
PIXI.InteractionData.prototype.constructor = PIXI.InteractionData;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Stage represents the root of the display tree. Everything connected to the stage is rendered
 *
 * @class Stage
 * @extends DisplayObjectContainer
 * @constructor
 * @param backgroundColor {Number} the background color of the stage, easiest way to pass this in is in hex format
 *		like: 0xFFFFFF for white
 * @param interactive {Boolean} enable / disable interaction (default is false)
 */
PIXI.Stage = function(backgroundColor, interactive)
{
	PIXI.DisplayObjectContainer.call( this );

	/**
	 * [read-only] Current transform of the object based on world (parent) factors
	 *
	 * @property worldTransform
	 * @type Mat3
	 * @readOnly
	 * @private
	 */
	this.worldTransform = PIXI.mat3.create();

	/**
	 * Whether or not the stage is interactive
	 *
	 * @property interactive
	 * @type Boolean
	 */
	this.interactive = interactive;

	/**
	 * The interaction manage for this stage, manages all interactive activity on the stage
	 *
	 * @property interactive
	 * @type InteractionManager
	 */
	this.interactionManager = new PIXI.InteractionManager(this);

	/**
	 * Whether the stage is dirty and needs to have interactions updated
	 *
	 * @property dirty
	 * @type Boolean
	 * @private
	 */
	this.dirty = true;

	this.__childrenAdded = [];
	this.__childrenRemoved = [];

	//the stage is it's own stage
	this.stage = this;

	//optimize hit detection a bit
	this.stage.hitArea = new PIXI.Rectangle(0,0,100000, 100000);

	this.setBackgroundColor(backgroundColor);
	this.worldVisible = true;
}

// constructor
PIXI.Stage.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Stage.prototype.constructor = PIXI.Stage;

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
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
 * Sets the background color for the stage
 *
 * @method setBackgroundColor
 * @param backgroundColor {Number} the color of the background, easiest way to pass this in is in hex format
 *		like: 0xFFFFFF for white
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
 *
 * @method getMousePosition
 * @return {Point} The point containing the coords of the global InteractionData position.
 */
PIXI.Stage.prototype.getMousePosition = function()
{
	return this.interactionManager.mouse.global;
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

/**
 * A polyfill for requestAnimationFrame
 *
 * @method requestAnimationFrame
 */
/**
 * A polyfill for cancelAnimationFrame
 *
 * @method cancelAnimationFrame
 */
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

/**
 * Converts a hex color number to an [R, G, B] array
 *
 * @method HEXtoRGB
 * @param hex {Number}
 */
function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}

/**
 * A polyfill for Function.prototype.bind
 *
 * @method bind
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

/**
 * A wrapper for ajax requests to be handled cross browser
 *
 * @class AjaxRequest
 * @constructor
 */
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

/*
 * DEBUGGING ONLY
 */
PIXI.runList = function(item)
{
	console.log(">>>>>>>>>")
	console.log("_")
	var safe = 0;
	var tmp = item.first;
	console.log(tmp);
	
	while(tmp._iNext)
	{
		safe++;
		tmp = tmp._iNext;
		console.log(tmp);
	//	console.log(tmp);
	
		if(safe > 100)
		{
			console.log("BREAK")
			break
		}
	}	
}






/**
 * https://github.com/mrdoob/eventtarget.js/
 * THankS mr DOob!
 */

/**
 * Adds event emitter functionality to a class
 *
 * @class EventTarget
 * @example
 *		function MyEmitter() {
 *			PIXI.EventTarget.call(this); //mixes in event target stuff
 *		}
 *
 *		var em = new MyEmitter();
 *		em.emit({ type: 'eventName', data: 'some data' });
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

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This helper function will automatically detect which renderer you should be using.
 * WebGL is the preferred renderer as it is a lot fastest. If webGL is not supported by
 * the browser then this function will return a canvas renderer
 *
 * @method autoDetectRenderer
 * @static
 * @param width {Number} the width of the renderers view
 * @param height {Number} the height of the renderers view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 * @param antialias=false {Boolean} sets antialias (only applicable in webGL chrome at the moment)
 * 
 * antialias
 */
PIXI.autoDetectRenderer = function(width, height, view, transparent, antialias)
{
	if(!width)width = 800;
	if(!height)height = 600;

	// BORROWED from Mr Doob (mrdoob.com)
	var webgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();

	//console.log(webgl);
	if( webgl )
	{
		return new PIXI.WebGLRenderer(width, height, view, transparent, antialias);
	}

	return	new PIXI.CanvasRenderer(width, height, view, transparent);
};



/*
	PolyK library
	url: http://polyk.ivank.net
	Released under MIT licence.
	
	Copyright (c) 2012 Ivan Kuckir

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	This is an amazing lib! 
	
	slightly modified by mat groves (matgroves.com);
*/

PIXI.PolyK = {};

/**
 * Triangulates shapes for webGL graphic fills
 *
 * @method Triangulate
 * @namespace PolyK
 * @constructor
 */
PIXI.PolyK.Triangulate = function(p)
{
	var sign = true;
	
	var n = p.length>>1;
	if(n<3) return [];
	var tgs = [];
	var avl = [];
	for(var i=0; i<n; i++) avl.push(i);
	
	var i = 0;
	var al = n;
	while(al > 3)
	{
		var i0 = avl[(i+0)%al];
		var i1 = avl[(i+1)%al];
		var i2 = avl[(i+2)%al];
		
		var ax = p[2*i0],  ay = p[2*i0+1];
		var bx = p[2*i1],  by = p[2*i1+1];
		var cx = p[2*i2],  cy = p[2*i2+1];
		
		var earFound = false;
		if(PIXI.PolyK._convex(ax, ay, bx, by, cx, cy, sign))
		{
			earFound = true;
			for(var j=0; j<al; j++)
			{
				var vi = avl[j];
				if(vi==i0 || vi==i1 || vi==i2) continue;
				if(PIXI.PolyK._PointInTriangle(p[2*vi], p[2*vi+1], ax, ay, bx, by, cx, cy)) {earFound = false; break;}
			}
		}
		if(earFound)
		{
			tgs.push(i0, i1, i2);
			avl.splice((i+1)%al, 1);
			al--;
			i = 0;
		}
		else if(i++ > 3*al) 
		{
			// need to flip flip reverse it!
			// reset!
			if(sign)
			{
				var tgs = [];
				avl = [];
				for(var i=0; i<n; i++) avl.push(i);
				
				i = 0;
				al = n;
				
				sign = false;
			}
			else
			{
				console.log("PIXI Warning: shape too complex to fill")
				return [];
			}				
		}
	}
	tgs.push(avl[0], avl[1], avl[2]);
	return tgs;
}

/**
 * Checks if a point is within a triangle
 *
 * @class _PointInTriangle
 * @namespace PolyK
 * @private
 */
PIXI.PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy)
{
	var v0x = cx-ax;
	var v0y = cy-ay;
	var v1x = bx-ax;
	var v1y = by-ay;
	var v2x = px-ax;
	var v2y = py-ay;
	
	var dot00 = v0x*v0x+v0y*v0y;
	var dot01 = v0x*v1x+v0y*v1y;
	var dot02 = v0x*v2x+v0y*v2y;
	var dot11 = v1x*v1x+v1y*v1y;
	var dot12 = v1x*v2x+v1y*v2y;
	
	var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

	// Check if point is in triangle
	return (u >= 0) && (v >= 0) && (u + v < 1);
}

/**
 * Checks if a shape is convex
 *
 * @class _convex
 * @namespace PolyK
 * @private
 */
PIXI.PolyK._convex = function(ax, ay, bx, by, cx, cy, sign)
{
	return ((ay-by)*(cx-bx) + (bx-ax)*(cy-by) >= 0) == sign;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/*
 * the default suoer fast shader!
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
  //"uniform mat4 uMVMatrix;",
  
  "uniform vec2 projectionVector;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
   // "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0);",
    "gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
    "vTextureCoord = aTextureCoord;",
    "vColor = aColor;",
  "}"
];

/*
 * the triangle strip shader..
 */

PIXI.stripShaderFragmentSrc = [
  "precision mediump float;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "uniform float alpha;",
  "uniform sampler2D uSampler;",
  "void main(void) {",
    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
    "gl_FragColor = gl_FragColor * alpha;",
  "}"
];


PIXI.stripShaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  "uniform mat3 translationMatrix;",
  "uniform vec2 projectionVector;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
	"vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
    "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
    "vTextureCoord = aTextureCoord;",
    "vColor = aColor;",
  "}"
];


/*
 * primitive shader..
 */

PIXI.primitiveShaderFragmentSrc = [
  "precision mediump float;",
  "varying vec4 vColor;",
  "void main(void) {",
    "gl_FragColor = vColor;",
  "}"
];

PIXI.primitiveShaderVertexSrc = [
  "attribute vec2 aVertexPosition;",
  "attribute vec4 aColor;",
  "uniform mat3 translationMatrix;",
  "uniform vec2 projectionVector;",
  "uniform float alpha;",
  "varying vec4 vColor;",
  "void main(void) {",
  	"vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
    "gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
    "vColor = aColor  * alpha;",
  "}"
];

PIXI.initPrimitiveShader = function() 
{
	var gl = PIXI.gl;

	var shaderProgram = PIXI.compileProgram(PIXI.primitiveShaderVertexSrc, PIXI.primitiveShaderFragmentSrc)
	
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
    
    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    shaderProgram.translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    
	shaderProgram.alpha = gl.getUniformLocation(shaderProgram, "alpha");

	PIXI.primitiveProgram = shaderProgram;
}

PIXI.initDefaultShader = function() 
{
	var gl = this.gl;
	var shaderProgram = PIXI.compileProgram(PIXI.shaderVertexSrc, PIXI.shaderFragmentSrc)
	
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");

   // shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    
	PIXI.shaderProgram = shaderProgram;
}

PIXI.initDefaultStripShader = function() 
{
	var gl = this.gl;
	var shaderProgram = PIXI.compileProgram(PIXI.stripShaderVertexSrc, PIXI.stripShaderFragmentSrc)
	
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	shaderProgram.translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
	shaderProgram.alpha = gl.getUniformLocation(shaderProgram, "alpha");

	shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");

    shaderProgram.projectionVector = gl.getUniformLocation(shaderProgram, "projectionVector");
    
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    
	PIXI.stripShaderProgram = shaderProgram;
}

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


PIXI.compileProgram = function(vertexSrc, fragmentSrc)
{
	var gl = PIXI.gl;
	var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);
	var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);
	
	var shaderProgram = gl.createProgram();
	
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

	return shaderProgram;
} 


PIXI.activateDefaultShader = function()
{
	var gl = PIXI.gl;
	var shaderProgram = PIXI.shaderProgram;
	
	gl.useProgram(shaderProgram);
	
	
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    gl.enableVertexAttribArray(shaderProgram.colorAttribute);
}

	

PIXI.activatePrimitiveShader = function()
{
	var gl = PIXI.gl;
	
	gl.disableVertexAttribArray(PIXI.shaderProgram.textureCoordAttribute);
    gl.disableVertexAttribArray(PIXI.shaderProgram.colorAttribute);
    
	gl.useProgram(PIXI.primitiveProgram);
	
	gl.enableVertexAttribArray(PIXI.primitiveProgram.vertexPositionAttribute);
	gl.enableVertexAttribArray(PIXI.primitiveProgram.colorAttribute);
} 


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A set of functions used by the webGL renderer to draw the primitive graphics data
 *
 * @class CanvasGraphics
 */
PIXI.WebGLGraphics = function()
{
	
}

/**
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics {Graphics}
 * @param projection {Object}
 */
PIXI.WebGLGraphics.renderGraphics = function(graphics, projection)
{
	var gl = PIXI.gl;
	
	if(!graphics._webGL)graphics._webGL = {points:[], indices:[], lastIndex:0, 
										   buffer:gl.createBuffer(),
										   indexBuffer:gl.createBuffer()};
	
	if(graphics.dirty)
	{
		graphics.dirty = false;
		
		if(graphics.clearDirty)
		{
			graphics.clearDirty = false;
			
			graphics._webGL.lastIndex = 0;
			graphics._webGL.points = [];
			graphics._webGL.indices = [];
			
		}
		
		PIXI.WebGLGraphics.updateGraphics(graphics);
	}
	
	
	PIXI.activatePrimitiveShader();
	
	// This  could be speeded up fo sure!
	var m = PIXI.mat3.clone(graphics.worldTransform);
	
	PIXI.mat3.transpose(m);
	
	// set the matrix transform for the 
 	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
 	
 	gl.uniformMatrix3fv(PIXI.primitiveProgram.translationMatrix, false, m);
 	
	gl.uniform2f(PIXI.primitiveProgram.projectionVector, projection.x, projection.y);
	
	gl.uniform1f(PIXI.primitiveProgram.alpha, graphics.worldAlpha);

	gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
	
	// WHY DOES THIS LINE NEED TO BE THERE???
	gl.vertexAttribPointer(PIXI.shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	// its not even used.. but need to be set or it breaks?
	// only on pc though..
	
	gl.vertexAttribPointer(PIXI.primitiveProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 4 * 6, 0);
	gl.vertexAttribPointer(PIXI.primitiveProgram.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);
	
	// set the index buffer!
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
	
	gl.drawElements(gl.TRIANGLE_STRIP,  graphics._webGL.indices.length, gl.UNSIGNED_SHORT, 0 );
	
	// return to default shader...
	PIXI.activateDefaultShader();
}

/**
 * Updates the graphics object
 *
 * @static
 * @private
 * @method updateGraphics
 * @param graphics {Graphics}
 */
PIXI.WebGLGraphics.updateGraphics = function(graphics)
{
	for (var i=graphics._webGL.lastIndex; i < graphics.graphicsData.length; i++) 
	{
		var data = graphics.graphicsData[i];
		
		if(data.type == PIXI.Graphics.POLY)
		{
			if(data.fill)
			{
				if(data.points.length>3) 
				PIXI.WebGLGraphics.buildPoly(data, graphics._webGL);
			}
			
			if(data.lineWidth > 0)
			{
				PIXI.WebGLGraphics.buildLine(data, graphics._webGL);
			}
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
			PIXI.WebGLGraphics.buildRectangle(data, graphics._webGL);
		}
		else if(data.type == PIXI.Graphics.CIRC || data.type == PIXI.Graphics.ELIP)
		{
			PIXI.WebGLGraphics.buildCircle(data, graphics._webGL);
		}
	};
	
	graphics._webGL.lastIndex = graphics.graphicsData.length;
	
	var gl = PIXI.gl;

	graphics._webGL.glPoints = new Float32Array(graphics._webGL.points);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, graphics._webGL.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, graphics._webGL.glPoints, gl.STATIC_DRAW);
	
	graphics._webGL.glIndicies = new Uint16Array(graphics._webGL.indices);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, graphics._webGL.glIndicies, gl.STATIC_DRAW);
}

/**
 * Builds a rectangle to draw
 *
 * @static
 * @private
 * @method buildRectangle
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildRectangle = function(graphicsData, webGLData)
{
	// --- //
	// need to convert points to a nice regular data
	// 
	var rectData = graphicsData.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	
	
	if(graphicsData.fill)
	{
		var color = HEXtoRGB(graphicsData.fillColor);
		var alpha = graphicsData.fillAlpha;
		
		var r = color[0] * alpha;
		var g = color[1] * alpha;
		var b = color[2] * alpha;
	
		var verts = webGLData.points;
		var indices = webGLData.indices;
	
		var vertPos = verts.length/6;
		
		// start
		verts.push(x, y);
		verts.push(r, g, b, alpha);
		
		verts.push(x + width, y);
		verts.push(r, g, b, alpha);
		
		verts.push(x , y + height);
		verts.push(r, g, b, alpha);
		
		verts.push(x + width, y + height);
		verts.push(r, g, b, alpha);
		
		// insert 2 dead triangles..
		indices.push(vertPos, vertPos, vertPos+1, vertPos+2, vertPos+3, vertPos+3)
	}
	
	if(graphicsData.lineWidth)
	{
		graphicsData.points = [x, y,
				  x + width, y,
				  x + width, y + height,
				  x, y + height,
				  x, y];
	
		PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
	}
	
}

/**
 * Builds a circle to draw
 *
 * @static
 * @private
 * @method buildCircle
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildCircle = function(graphicsData, webGLData)
{
	// --- //
	// need to convert points to a nice regular data
	// 
	var rectData = graphicsData.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	
	var totalSegs = 40;
	var seg = (Math.PI * 2) / totalSegs ;
		
	if(graphicsData.fill)
	{
		var color = HEXtoRGB(graphicsData.fillColor);
		var alpha = graphicsData.fillAlpha;

		var r = color[0] * alpha;
		var g = color[1] * alpha;
		var b = color[2] * alpha;
	
		var verts = webGLData.points;
		var indices = webGLData.indices;
	
		var vecPos = verts.length/6;
		
		indices.push(vecPos);
		
		for (var i=0; i < totalSegs + 1 ; i++) 
		{
			verts.push(x,y, r, g, b, alpha);
			
			verts.push(x + Math.sin(seg * i) * width,
					   y + Math.cos(seg * i) * height,
					   r, g, b, alpha);
		
			indices.push(vecPos++, vecPos++);
		};
		
		indices.push(vecPos-1);
	}
	
	if(graphicsData.lineWidth)
	{
		graphicsData.points = [];
		
		for (var i=0; i < totalSegs + 1; i++) 
		{
			graphicsData.points.push(x + Math.sin(seg * i) * width,
									 y + Math.cos(seg * i) * height)
		};
		
		PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
	}
	
}

/**
 * Builds a line to draw
 *
 * @static
 * @private
 * @method buildLine
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildLine = function(graphicsData, webGLData)
{
	// TODO OPTIMISE!
	
	var wrap = true;
	var points = graphicsData.points;
	if(points.length == 0)return;
	
	// get first and last point.. figure out the middle!
	var firstPoint = new PIXI.Point( points[0], points[1] );
	var lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );
	
	// if the first point is the last point - goona have issues :)
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y)
	{
		points.pop();
		points.pop();
		
		lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );
		
		var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) *0.5;
		var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) *0.5;
		
		points.unshift(midPointX, midPointY);
		points.push(midPointX, midPointY)
	}
	
	var verts = webGLData.points;
	var indices = webGLData.indices;
	var length = points.length / 2;
	var indexCount = points.length;
	var indexStart = verts.length/6;
	
	// DRAW the Line
	var width = graphicsData.lineWidth / 2;
	
	// sort color
	var color = HEXtoRGB(graphicsData.lineColor);
	var alpha = graphicsData.lineAlpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	
	var p1x, p1y, p2x, p2y, p3x, p3y;
	var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
	var ipx, ipy;
	var a1, b1, c1, a2, b2, c2;
	var denom, pdist, dist;
	
	p1x = points[0];
	p1y = points[1];
	
	p2x = points[2];
	p2y = points[3];
	
	perpx = -(p1y - p2y);
	perpy =  p1x - p2x;
	
	dist = Math.sqrt(perpx*perpx + perpy*perpy);
	
	perpx /= dist;
	perpy /= dist;
	perpx *= width;
	perpy *= width;
	
	// start
	verts.push(p1x - perpx , p1y - perpy,
				r, g, b, alpha);
	
	verts.push(p1x + perpx , p1y + perpy,
				r, g, b, alpha);
	
	for (var i = 1; i < length-1; i++) 
	{
		p1x = points[(i-1)*2];
		p1y = points[(i-1)*2 + 1];
		
		p2x = points[(i)*2]
		p2y = points[(i)*2 + 1]
		
		p3x = points[(i+1)*2];
		p3y = points[(i+1)*2 + 1];
		
		perpx = -(p1y - p2y);
		perpy = p1x - p2x;
		
		dist = Math.sqrt(perpx*perpx + perpy*perpy);
		perpx /= dist;
		perpy /= dist;
		perpx *= width;
		perpy *= width;

		perp2x = -(p2y - p3y);
		perp2y = p2x - p3x;
		
		dist = Math.sqrt(perp2x*perp2x + perp2y*perp2y);
		perp2x /= dist;
		perp2y /= dist;
		perp2x *= width;
		perp2y *= width;
		
		a1 = (-perpy + p1y) - (-perpy + p2y);
	    b1 = (-perpx + p2x) - (-perpx + p1x);
	    c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
	    a2 = (-perp2y + p3y) - (-perp2y + p2y);
	    b2 = (-perp2x + p2x) - (-perp2x + p3x);
	    c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
	 
	    denom = a1*b2 - a2*b1;
	    
	    if (denom == 0) {
	    	denom+=1;
	    }
	    
	    px = (b1*c2 - b2*c1)/denom;
	    py = (a2*c1 - a1*c2)/denom;
		
		pdist = (px -p2x) * (px -p2x) + (py -p2y) + (py -p2y);
		
		if(pdist > 140 * 140)
		{
			perp3x = perpx - perp2x;
			perp3y = perpy - perp2y;
			
			dist = Math.sqrt(perp3x*perp3x + perp3y*perp3y);
			perp3x /= dist;
			perp3y /= dist;
			perp3x *= width;
			perp3y *= width;
			
			verts.push(p2x - perp3x, p2y -perp3y);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x + perp3x, p2y +perp3y);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x - perp3x, p2y -perp3y);
			verts.push(r, g, b, alpha);
			
			indexCount++;
		}
		else
		{
			verts.push(px , py);
			verts.push(r, g, b, alpha);
			
			verts.push(p2x - (px-p2x), p2y - (py - p2y));
			verts.push(r, g, b, alpha);
		}
	}
	
	p1x = points[(length-2)*2]
	p1y = points[(length-2)*2 + 1] 
	
	p2x = points[(length-1)*2]
	p2y = points[(length-1)*2 + 1]
	
	perpx = -(p1y - p2y)
	perpy = p1x - p2x;
	
	dist = Math.sqrt(perpx*perpx + perpy*perpy);
	perpx /= dist;
	perpy /= dist;
	perpx *= width;
	perpy *= width;
	
	verts.push(p2x - perpx , p2y - perpy)
	verts.push(r, g, b, alpha);
	
	verts.push(p2x + perpx , p2y + perpy)
	verts.push(r, g, b, alpha);
	
	indices.push(indexStart);
	
	for (var i=0; i < indexCount; i++) 
	{
		indices.push(indexStart++);
	};
	
	indices.push(indexStart-1);
}

/**
 * Builds a polygon to draw
 *
 * @static
 * @private
 * @method buildPoly
 * @param graphics {Graphics}
 * @param webGLData {Object}
 */
PIXI.WebGLGraphics.buildPoly = function(graphicsData, webGLData)
{
	var points = graphicsData.points;
	if(points.length < 6)return;
	
	// get first and last point.. figure out the middle!
	var verts = webGLData.points;
	var indices = webGLData.indices;
	
	var length = points.length / 2;
	
	// sort color
	var color = HEXtoRGB(graphicsData.fillColor);
	var alpha = graphicsData.fillAlpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	
	var triangles = PIXI.PolyK.Triangulate(points);
	
	var vertPos = verts.length / 6;
	
	for (var i=0; i < triangles.length; i+=3) 
	{
		indices.push(triangles[i] + vertPos);
		indices.push(triangles[i] + vertPos);
		indices.push(triangles[i+1] + vertPos);
		indices.push(triangles[i+2] +vertPos);
		indices.push(triangles[i+2] + vertPos);
	};
	
	for (var i = 0; i < length; i++) 
	{
		verts.push(points[i * 2], points[i * 2 + 1],
				   r, g, b, alpha);
	};
}

function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}





/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._defaultFrame = new PIXI.Rectangle(0,0,1,1);

// an instance of the gl context..
// only one at the moment :/
PIXI.gl;

/**
 * the WebGLRenderer is draws the stage and all its content onto a webGL enabled canvas. This renderer
 * should be used for browsers support webGL. This Render works by automatically managing webGLBatchs.
 * So no need for Sprite Batch's or Sprite Cloud's
 * Dont forget to add the view to your DOM or you will not see anything :)
 *
 * @class WebGLRenderer
 * @constructor
 * @param width=0 {Number} the width of the canvas view
 * @param height=0 {Number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 * @param antialias=false {Boolean} sets antialias (only applicable in chrome at the moment)
 * 
 */
PIXI.WebGLRenderer = function(width, height, view, transparent, antialias)
{
	// do a catch.. only 1 webGL renderer..

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
    		 antialias:!!antialias, // SPEED UP??
    		 premultipliedAlpha:false,
    		 stencil:true
        });
    } 
    catch (e) 
    {
    	throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
    }

    PIXI.initPrimitiveShader();
    PIXI.initDefaultShader();
    PIXI.initDefaultStripShader();

    PIXI.activateDefaultShader();

    var gl = this.gl;
    PIXI.WebGLRenderer.gl = gl;

    this.batch = new PIXI.WebGLBatch(gl);
   	gl.disable(gl.DEPTH_TEST);
   	gl.disable(gl.CULL_FACE);

    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, this.transparent); 

    PIXI.projection = new PIXI.Point(400, 300);

    this.resize(this.width, this.height);
    this.contextLost = false;

    this.stageRenderGroup = new PIXI.WebGLRenderGroup(this.gl);
}

// constructor
PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;

/**
 * Gets a new WebGLBatch from the pool
 *
 * @static
 * @method getBatch
 * @return {WebGLBatch}
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
 * Puts a batch back into the pool
 *
 * @static
 * @method returnBatch
 * @param batch {WebGLBatch} The batch to return
 * @private
 */
PIXI.WebGLRenderer.returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

/**
 * Renders the stage to its webGL view
 *
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.WebGLRenderer.prototype.render = function(stage)
{
	if(this.contextLost)return;
	
	
	// if rendering a new stage clear the batchs..
	if(this.__stage !== stage)
	{
		// TODO make this work
		// dont think this is needed any more?
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
		
	// update the scene graph	
	PIXI.visibleCount++;
	stage.updateTransform();
	
	var gl = this.gl;
	
	// -- Does this need to be set every frame? -- //
	gl.colorMask(true, true, true, this.transparent); 
	gl.viewport(0, 0, this.width, this.height);	
	
   	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		
	gl.clearColor(stage.backgroundColorSplit[0],stage.backgroundColorSplit[1],stage.backgroundColorSplit[2], !this.transparent);     
	gl.clear(gl.COLOR_BUFFER_BIT);

	// HACK TO TEST
	
	this.stageRenderGroup.backgroundColor = stage.backgroundColorSplit;
	this.stageRenderGroup.render(PIXI.projection);
	
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
 * Updates the textures loaded into this webgl renderer
 *
 * @static
 * @method updateTextures
 * @private
 */
PIXI.WebGLRenderer.updateTextures = function()
{
	//TODO break this out into a texture manager...
	for (var i=0; i < PIXI.texturesToUpdate.length; i++) PIXI.WebGLRenderer.updateTexture(PIXI.texturesToUpdate[i]);
	for (var i=0; i < PIXI.texturesToDestroy.length; i++) PIXI.WebGLRenderer.destroyTexture(PIXI.texturesToDestroy[i]);
	PIXI.texturesToUpdate = [];
	PIXI.texturesToDestroy = [];
}

/**
 * Updates a loaded webgl texture
 *
 * @static
 * @method updateTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.updateTexture = function(texture)
{
	//TODO break this out into a texture manager...
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
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

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

/**
 * Destroys a loaded webgl texture
 *
 * @method destroyTexture
 * @param texture {Texture} The texture to update
 * @private
 */
PIXI.WebGLRenderer.destroyTexture = function(texture)
{
	//TODO break this out into a texture manager...
	var gl = PIXI.gl;

	if(texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
		gl.deleteTexture(gl.TEXTURE_2D, texture._glTexture);
	}
}

/**
 * resizes the webGL view to the specified width and height
 *
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

	//var projectionMatrix = this.projectionMatrix;

	PIXI.projection.x =  this.width/2;
	PIXI.projection.y =  this.height/2;

//	projectionMatrix[0] = 2/this.width;
//	projectionMatrix[5] = -2/this.height;
//	projectionMatrix[12] = -1;
//	projectionMatrix[13] = 1;
}

/**
 * Handles a lost webgl context
 *
 * @method handleContextLost
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextLost = function(event)
{
	event.preventDefault();
	this.contextLost = true;
}

/**
 * Handles a restored webgl context
 *
 * @method handleContextRestored
 * @param event {Event}
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextRestored = function(event)
{
	this.gl = this.view.getContext("experimental-webgl",  {  	
		alpha: true
    });

	this.initShaders();	

	for(var key in PIXI.TextureCache) 
	{
        	var texture = PIXI.TextureCache[key].baseTexture;
        	texture._glTexture = null;
        	PIXI.WebGLRenderer.updateTexture(texture);
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
 * if a group of sprites all have the same baseTexture and blendMode then they can be grouped into a batch.
 * All the sprites in a batch can then be drawn in one go by the GPU which is hugely efficient. ALL sprites
 * in the webGL renderer are added to a batch even if the batch only contains one sprite. Batching is handled
 * automatically by the webGL renderer. A good tip is: the smaller the number of batchs there are, the faster
 * the webGL renderer will run.
 *
 * @class WebGLBatch
 * @constructor
 * @param gl {WebGLContext} an instance of the webGL context
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
PIXI.WebGLBatch.prototype.constructor = PIXI.WebGLBatch;

/**
 * Cleans the batch so that is can be returned to an object pool and reused
 *
 * @method clean
 */
PIXI.WebGLBatch.prototype.clean = function()
{
	this.verticies = [];
	this.uvs = [];
	this.indices = [];
	this.colors = [];
	this.dynamicSize = 1;
	this.texture = null;
	this.last = null;
	this.size = 0;
	this.head;
	this.tail;
}

/**
 * Recreates the buffers in the event of a context loss
 *
 * @method restoreLostContext
 * @param gl {WebGLContext}
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
 *
 * @method init
 * @param sprite {Sprite} the first sprite to be added to the batch. Only sprites with
 *		the same base texture and blend mode will be allowed to be added to this batch
 */	
PIXI.WebGLBatch.prototype.init = function(sprite)
{
	sprite.batch = this;
	this.dirty = true;
	this.blendMode = sprite.blendMode;
	this.texture = sprite.texture.baseTexture;
	this.head = sprite;
	this.tail = sprite;
	this.size = 1;

	this.growBatch();
}

/**
 * inserts a sprite before the specified sprite
 *
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
	}
}

/**
 * inserts a sprite after the specified sprite
 *
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
 *
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
 *
 * @method split
 * @param sprite {Sprite} the sprite that indicates where the batch should be split
 * @return {WebGLBatch} the new batch
 */
PIXI.WebGLBatch.prototype.split = function(sprite)
{
	this.dirty = true;

	var batch = new PIXI.WebGLBatch(this.gl);
	batch.init(sprite);
	batch.texture = this.texture;
	batch.tail = this.tail;

	this.tail = sprite.__prev;
	this.tail.__next = null;

	sprite.__prev = null;
	// return a splite batch!

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
 *
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
 * Grows the size of the batch. As the elements in the batch cannot have a dynamic size this
 * function is used to increase the size of the batch. It also creates a little extra room so
 * that the batch does not need to be resized every time a sprite is added
 *
 * @method growBatch
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

	this.uvs  = new Float32Array( this.dynamicSize * 8 );
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.uvs , gl.DYNAMIC_DRAW);

	this.dirtyUVS = true;

	this.colors  = new Float32Array( this.dynamicSize * 4 );
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
 *
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
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index;
	var a, b, c, d, tx, ty;

	var displayObject = this.head;

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
 *
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
		if(displayObject.vcount === PIXI.visibleCount)
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
 *
 * @method render
 */
PIXI.WebGLBatch.prototype.render = function(start, end)
{
	start = start || 0;

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

	var len = end - start;

    // DRAW THAT this!
    gl.drawElements(gl.TRIANGLES, len * 6, gl.UNSIGNED_SHORT, start * 2 * 6 );
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be
 * grouped into a batch. All the sprites in a batch can then be drawn in one go by the
 * GPU which is hugely efficient. ALL sprites in the webGL renderer are added to a batch
 * even if the batch only contains one sprite. Batching is handled automatically by the
 * webGL renderer. A good tip is: the smaller the number of batchs there are, the faster
 * the webGL renderer will run.
 *
 * @class WebGLBatch
 * @contructor
 * @param gl {WebGLContext} An instance of the webGL context
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
PIXI.WebGLRenderGroup.prototype.constructor = PIXI.WebGLRenderGroup;

/**
 * Add a display object to the webgl renderer
 *
 * @method setRenderable
 * @param displayObject {DisplayObject}
 * @private 
 */
PIXI.WebGLRenderGroup.prototype.setRenderable = function(displayObject)
{
	// has this changed??
	if(this.root)this.removeDisplayObjectAndChildren(this.root);
	
	displayObject.worldVisible = displayObject.visible;
	
	// soooooo //
	// to check if any batchs exist already??
	
	// TODO what if its already has an object? should remove it
	this.root = displayObject;
	this.addDisplayObjectAndChildren(displayObject);
}

/**
 * Renders the stage to its webgl view
 *
 * @method render
 * @param projection {Object}
 */
PIXI.WebGLRenderGroup.prototype.render = function(projection)
{
	PIXI.WebGLRenderer.updateTextures();
	
	var gl = this.gl;

	
	gl.uniform2f(PIXI.shaderProgram.projectionVector, projection.x, projection.y);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	
	// will render all the elements in the group
	var renderable;
	
	for (var i=0; i < this.batchs.length; i++) 
	{
		
		renderable = this.batchs[i];
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
			continue;
		}
		
		// non sprite batch..
		var worldVisible = renderable.vcount === PIXI.visibleCount;

		if(renderable instanceof PIXI.TilingSprite)
		{
			if(worldVisible)this.renderTilingSprite(renderable, projection);
		}
		else if(renderable instanceof PIXI.Strip)
		{
			if(worldVisible)this.renderStrip(renderable, projection);
		}
		else if(renderable instanceof PIXI.Graphics)
		{
			if(worldVisible && renderable.renderable) PIXI.WebGLGraphics.renderGraphics(renderable, projection);//, projectionMatrix);
		}
		else if(renderable instanceof PIXI.FilterBlock)
		{
			/*
			 * for now only masks are supported..
			 */
			if(renderable.open)
			{
    			gl.enable(gl.STENCIL_TEST);
					
				gl.colorMask(false, false, false, false);
				gl.stencilFunc(gl.ALWAYS,1,0xff);
				gl.stencilOp(gl.KEEP,gl.KEEP,gl.REPLACE);
  
				PIXI.WebGLGraphics.renderGraphics(renderable.mask, projection);
  					
				gl.colorMask(true, true, true, false);
				gl.stencilFunc(gl.NOTEQUAL,0,0xff);
				gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
			}
			else
			{
				gl.disable(gl.STENCIL_TEST);
			}
		}
	}
	
}

/**
 * Renders the stage to its webgl view
 *
 * @method handleFilter
 * @param filter {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.handleFilter = function(filter, projection)
{
	
}

/**
 * Renders a specific displayObject
 *
 * @method renderSpecific
 * @param displayObject {DisplayObject}
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderSpecific = function(displayObject, projection)
{
	PIXI.WebGLRenderer.updateTextures();
	
	var gl = this.gl;

	gl.uniform2f(PIXI.shaderProgram.projectionVector, projection.x, projection.y);

	// to do!
	// render part of the scene...
	
	var startIndex;
	var startBatchIndex;
	
	var endIndex;
	var endBatchIndex;
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.first;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
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
		else
		{
			this.renderSpecial(startBatch, projection);
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
	else
	{
		this.renderSpecial(startBatch, projection);
	}
	
	// DO the middle batchs..
	for (var i=startBatchIndex+1; i < endBatchIndex; i++) 
	{
		renderable = this.batchs[i];
	
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
		}
		else
		{
			this.renderSpecial(renderable, projection);
		}
	}
	
	// DO the last batch..
	if(endBatch instanceof PIXI.WebGLBatch)
	{
		endBatch.render(0, endIndex+1);
	}
	else
	{
		this.renderSpecial(endBatch, projection);
	}
}

/**
 * Renders a specific renderable
 *
 * @method renderSpecial
 * @param renderable {DisplayObject}
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderSpecial = function(renderable, projection)
{
	var worldVisible = renderable.vcount === PIXI.visibleCount

	if(renderable instanceof PIXI.TilingSprite)
	{
		if(worldVisible)this.renderTilingSprite(renderable, projection);
	}
	else if(renderable instanceof PIXI.Strip)
	{
		if(worldVisible)this.renderStrip(renderable, projection);
	}
	else if(renderable instanceof PIXI.CustomRenderable)
	{
		if(worldVisible) renderable.renderWebGL(this, projection);
	}
	else if(renderable instanceof PIXI.Graphics)
	{
		if(worldVisible && renderable.renderable) PIXI.WebGLGraphics.renderGraphics(renderable, projection);
	}
	else if(renderable instanceof PIXI.FilterBlock)
	{
		/*
		 * for now only masks are supported..
		 */

		var gl = PIXI.gl;

		if(renderable.open)
		{
			gl.enable(gl.STENCIL_TEST);
				
			gl.colorMask(false, false, false, false);
			gl.stencilFunc(gl.ALWAYS,1,0xff);
			gl.stencilOp(gl.KEEP,gl.KEEP,gl.REPLACE);
  
			PIXI.WebGLGraphics.renderGraphics(renderable.mask, projection);
			
			// we know this is a render texture so enable alpha too..
			gl.colorMask(true, true, true, true);
			gl.stencilFunc(gl.NOTEQUAL,0,0xff);
			gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
		}
		else
		{
			gl.disable(gl.STENCIL_TEST);
		}
	}
}

/**
 * Updates a webgl texture
 *
 * @method updateTexture
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.updateTexture = function(displayObject)
{
	
	// TODO definitely can optimse this function..
	
	this.removeObject(displayObject);
	
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousRenderable = displayObject.first;
	while(previousRenderable != this.root)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.last;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
	
	this.insertObject(displayObject, previousRenderable, nextRenderable);
}

/**
 * Adds filter blocks
 *
 * @method addFilterBlocks
 * @param start {FilterBlock}
 * @param end {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.addFilterBlocks = function(start, end)
{
	start.__renderGroup = this;
	end.__renderGroup = this;
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousRenderable = start;
	while(previousRenderable != this.root)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	this.insertAfter(start, previousRenderable);
		
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var previousRenderable2 = end;
	while(previousRenderable2 != this.root)
	{
		previousRenderable2 = previousRenderable2._iPrev;
		if(previousRenderable2.renderable && previousRenderable2.__renderGroup)break;
	}
	this.insertAfter(end, previousRenderable2);
}

/**
 * Remove filter blocks
 *
 * @method removeFilterBlocks
 * @param start {FilterBlock}
 * @param end {FilterBlock}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeFilterBlocks = function(start, end)
{
	this.removeObject(start);
	this.removeObject(end);
}

/**
 * Adds a display object and children to the webgl context
 *
 * @method addDisplayObjectAndChildren
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.addDisplayObjectAndChildren = function(displayObject)
{
	if(displayObject.__renderGroup)displayObject.__renderGroup.removeDisplayObjectAndChildren(displayObject);
	
	/*
	 *  LOOK FOR THE PREVIOUS RENDERABLE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	
	var previousRenderable = displayObject.first;
	while(previousRenderable != this.root.first)
	{
		previousRenderable = previousRenderable._iPrev;
		if(previousRenderable.renderable && previousRenderable.__renderGroup)break;
	}
	
	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 */
	var nextRenderable = displayObject.last;
	while(nextRenderable._iNext)
	{
		nextRenderable = nextRenderable._iNext;
		if(nextRenderable.renderable && nextRenderable.__renderGroup)break;
	}
	
	// one the display object hits this. we can break the loop	
	
	var tempObject = displayObject.first;
	var testObject = displayObject.last._iNext;
	do	
	{
		tempObject.__renderGroup = this;
		
		if(tempObject.renderable)
		{
		
			this.insertObject(tempObject, previousRenderable, nextRenderable);
			previousRenderable = tempObject;
		}
		
		tempObject = tempObject._iNext;
	}
	while(tempObject != testObject)
}

/**
 * Removes a display object and children to the webgl context
 *
 * @method removeDisplayObjectAndChildren
 * @param displayObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren = function(displayObject)
{
	if(displayObject.__renderGroup != this)return;
	
//	var displayObject = displayObject.first;
	var lastObject = displayObject.last;
	do	
	{
		displayObject.__renderGroup = null;
		if(displayObject.renderable)this.removeObject(displayObject);
		displayObject = displayObject._iNext;
	}
	while(displayObject)
}

/**
 * Inserts a displayObject into the linked list
 *
 * @method insertObject
 * @param displayObject {DisplayObject}
 * @param previousObject {DisplayObject}
 * @param nextObject {DisplayObject}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.insertObject = function(displayObject, previousObject, nextObject)
{
	// while looping below THE OBJECT MAY NOT HAVE BEEN ADDED
	var previousSprite = previousObject;
	var nextSprite = nextObject;
	
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
		
		return;
	}
	else if(displayObject instanceof PIXI.TilingSprite)
	{
		
		// add to a batch!!
		this.initTilingSprite(displayObject);
	//	this.batchs.push(displayObject);
		
	}
	else if(displayObject instanceof PIXI.Strip)
	{
		// add to a batch!!
		this.initStrip(displayObject);
	//	this.batchs.push(displayObject);
	}
	else if(displayObject)// instanceof PIXI.Graphics)
	{
		//displayObject.initWebGL(this);
		
		// add to a batch!!
		//this.initStrip(displayObject);
		//this.batchs.push(displayObject);
	}
	
	this.insertAfter(displayObject, previousSprite);
			
	// insert and SPLIT!

}

/**
 * Inserts a displayObject into the linked list
 *
 * @method insertAfter
 * @param item {DisplayObject}
 * @param displayObject {DisplayObject} The object to insert
 * @private
 */
PIXI.WebGLRenderGroup.prototype.insertAfter = function(item, displayObject)
{
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch = displayObject.batch;
		
		if(previousBatch)
		{
			// so this object is in a batch!
			
			// is it not? need to split the batch
			if(previousBatch.tail == displayObject)
			{
				// is it tail? insert in to batchs	
				var index = this.batchs.indexOf( previousBatch );
				this.batchs.splice(index+1, 0, item);
			}
			else
			{
				// TODO MODIFY ADD / REMOVE CHILD TO ACCOUNT FOR FILTERS (also get prev and next) //
				
				// THERE IS A SPLIT IN THIS BATCH! //
				var splitBatch = previousBatch.split(displayObject.__next);
				
				// COOL!
				// add it back into the array	
				/*
				 * OOPS!
				 * seems the new sprite is in the middle of a batch
				 * lets split it.. 
				 */
				var index = this.batchs.indexOf( previousBatch );
				this.batchs.splice(index+1, 0, item, splitBatch);
			}
		}
		else
		{
			this.batchs.push(item);
		}
	}
	else
	{
		var index = this.batchs.indexOf( displayObject );
		this.batchs.splice(index+1, 0, item);
	}
}

/**
 * Removes a displayObject from the linked list
 *
 * @method removeObject
 * @param displayObject {DisplayObject} The object to remove
 * @private
 */
PIXI.WebGLRenderGroup.prototype.removeObject = function(displayObject)
{
	// loop through children..
	// display object //
	
	// add a child from the render group..
	// remove it and all its children!
	//displayObject.cacheVisible = false;//displayObject.visible;

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

/**
 * Initializes a tiling sprite
 *
 * @method initTilingSprite
 * @param sprite {TilingSprite} The tiling sprite to initialize
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
 * Renders a Strip
 *
 * @method renderStrip
 * @param strip {Strip} The strip to render
 * @param projection {Object}
 * @private
 */
PIXI.WebGLRenderGroup.prototype.renderStrip = function(strip, projection)
{
	var gl = this.gl;
	var shaderProgram = PIXI.shaderProgram;
//	mat
	//var mat4Real = PIXI.mat3.toMat4(strip.worldTransform);
	//PIXI.mat4.transpose(mat4Real);
	//PIXI.mat4.multiply(projectionMatrix, mat4Real, mat4Real )

	
	gl.useProgram(PIXI.stripShaderProgram);

	var m = PIXI.mat3.clone(strip.worldTransform);
	
	PIXI.mat3.transpose(m);
	
	// set the matrix transform for the 
 	gl.uniformMatrix3fv(PIXI.stripShaderProgram.translationMatrix, false, m);
	gl.uniform2f(PIXI.stripShaderProgram.projectionVector, projection.x, projection.y);
	gl.uniform1f(PIXI.stripShaderProgram.alpha, strip.worldAlpha);

/*
	if(strip.blendMode == PIXI.blendModes.NORMAL)
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}
	else
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	}
	*/
	
	
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
	//console.log(gl.TRIANGLE_STRIP);
	
	gl.drawElements(gl.TRIANGLE_STRIP, strip.indices.length, gl.UNSIGNED_SHORT, 0);
    
  	gl.useProgram(PIXI.shaderProgram);
}

/**
 * Renders a TilingSprite
 *
 * @method renderTilingSprite
 * @param sprite {TilingSprite} The tiling sprite to render
 * @param projectionMatrix {Object}
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
 * Initializes a strip to be rendered
 *
 * @method initStrip
 * @param strip {Strip} The strip to initialize
 * @private
 */
PIXI.WebGLRenderGroup.prototype.initStrip = function(strip)
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
 *
 * @class CanvasRenderer
 * @constructor
 * @param width=0 {Number} the width of the canvas view
 * @param height=0 {Number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 * @param transparent=false {Boolean} the transparency of the render view, default false
 */
PIXI.CanvasRenderer = function(width, height, view, transparent)
{
	this.transparent = transparent;

	/**
	 * The width of the canvas view
	 *
	 * @property width
	 * @type Number
	 * @default 800
	 */
	this.width = width || 800;

	/**
	 * The height of the canvas view
	 *
	 * @property height
	 * @type Number
	 * @default 600
	 */
	this.height = height || 600;

	/**
	 * The canvas element that the everything is drawn to
	 *
	 * @property view
	 * @type Canvas
	 */
	this.view = view || document.createElement( 'canvas' );

	/**
	 * The canvas context that the everything is drawn to
	 * @property context
	 * @type Canvas 2d Context
	 */
	this.context = this.view.getContext("2d");

	this.refresh = true;
	// hack to enable some hardware acceleration!
	//this.view.style["transform"] = "translatez(0)";
	
    this.view.width = this.width;
	this.view.height = this.height;  
	this.count = 0;
}

// constructor
PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;

/**
 * Renders the stage to its canvas view
 *
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
 *
 * @method resize
 * @param width {Number} the new width of the canvas view
 * @param height {Number} the new height of the canvas view
 */
PIXI.CanvasRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.view.width = width;
	this.view.height = height;
}

/**
 * Renders a display object
 *
 * @method renderDisplayObject
 * @param displayObject {DisplayObject} The displayObject to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject)
{
	// no loger recurrsive!
	var transform;
	var context = this.context;
	
	context.globalCompositeOperation = 'source-over';
	
	// one the display object hits this. we can break the loop	
	var testObject = displayObject.last._iNext;
	displayObject = displayObject.first;
	
	do	
	{
		transform = displayObject.worldTransform;
		
		if(!displayObject.visible)
		{
			displayObject = displayObject.last._iNext;
			continue;
		}
		
		if(!displayObject.renderable)
		{
			displayObject = displayObject._iNext;
			continue;
		}
		
		if(displayObject instanceof PIXI.Sprite)
		{
				
			var frame = displayObject.texture.frame;
			
			if(frame)
			{
				context.globalAlpha = displayObject.worldAlpha;
				
				context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5]);
					
				context.drawImage(displayObject.texture.baseTexture.source, 
								   frame.x,
								   frame.y,
								   frame.width,
								   frame.height,
								   (displayObject.anchor.x) * -frame.width, 
								   (displayObject.anchor.y) * -frame.height,
								   frame.width,
								   frame.height);
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
		else if(displayObject instanceof PIXI.Graphics)
		{
			context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
			PIXI.CanvasGraphics.renderGraphics(displayObject, context);
		}
		else if(displayObject instanceof PIXI.FilterBlock)
		{
			if(displayObject.open)
			{
				context.save();
				
				var cacheAlpha = displayObject.mask.alpha;
				var maskTransform = displayObject.mask.worldTransform;
				
				context.setTransform(maskTransform[0], maskTransform[3], maskTransform[1], maskTransform[4], maskTransform[2], maskTransform[5])
				
				displayObject.mask.worldAlpha = 0.5;
				
				context.worldAlpha = 0;
				
				PIXI.CanvasGraphics.renderGraphicsMask(displayObject.mask, context);
				context.clip();
				
				displayObject.mask.worldAlpha = cacheAlpha;
			}
			else
			{
				context.restore();
			}
		}
	//	count++
		displayObject = displayObject._iNext;
		
		
	}
	while(displayObject != testObject)

	
}

/**
 * Renders a flat strip
 *
 * @method renderStripFlat
 * @param strip {Strip} The Strip to render
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
	
	context.fillStyle = "#FF0000";
	context.fill();
	context.closePath();
}

/**
 * Renders a tiling sprite
 *
 * @method renderTilingSprite
 * @param sprite {TilingSprite} The tilingsprite to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderTilingSprite = function(sprite)
{
	var context = this.context;
	
	context.globalAlpha = sprite.worldAlpha;
	
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
 * Renders a strip
 *
 * @method renderStrip
 * @param strip {Strip} The Strip to render
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStrip = function(strip)
{
	var context = this.context;

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
	
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A set of functions used by the canvas renderer to draw the primitive graphics data
 *
 * @class CanvasGraphics
 */
PIXI.CanvasGraphics = function()
{
	
}


/*
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics {Graphics}
 * @param context {Context2D}
 */
PIXI.CanvasGraphics.renderGraphics = function(graphics, context)
{
	var worldAlpha = graphics.worldAlpha;
	
	for (var i=0; i < graphics.graphicsData.length; i++) 
	{
		var data = graphics.graphicsData[i];
		var points = data.points;
		
		context.strokeStyle = color = '#' + ('00000' + ( data.lineColor | 0).toString(16)).substr(-6);

		context.lineWidth = data.lineWidth;
		
		if(data.type == PIXI.Graphics.POLY)
		{
			context.beginPath();
			
			context.moveTo(points[0], points[1]);
			
			for (var j=1; j < points.length/2; j++)
			{
				context.lineTo(points[j * 2], points[j * 2 + 1]);
			} 
	      	
	      	// if the first and last point are the same close the path - much neater :)
	      	if(points[0] == points[points.length-2] && points[1] == points[points.length-1])
	      	{
	      		context.closePath();
	      	}
			
			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
				
			// TODO - need to be Undefined!
			if(data.fillColor)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
				context.fillRect(points[0], points[1], points[2], points[3]);
				
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
				context.strokeRect(points[0], points[1], points[2], points[3]);
			}
			
		}
		else if(data.type == PIXI.Graphics.CIRC)
		{
			// TODO - need to be Undefined!
      		context.beginPath();
			context.arc(points[0], points[1], points[2],0,2*Math.PI);
			context.closePath();
			
			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
		else if(data.type == PIXI.Graphics.ELIP)
		{
			
			// elipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
			
			var elipseData =  data.points;
			
			var w = elipseData[2] * 2;
			var h = elipseData[3] * 2;
	
			var x = elipseData[0] - w/2;
			var y = elipseData[1] - h/2;
			
      		context.beginPath();
			
			var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle
			
			context.moveTo(x, ym);
			context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  
			context.closePath();
			
			if(data.fill)
			{
				context.globalAlpha = data.fillAlpha * worldAlpha;
				context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
      			context.fill();
			}
			if(data.lineWidth)
			{
				context.globalAlpha = data.lineAlpha * worldAlpha;
      			context.stroke();
			}
		}
      	
	};
}

/*
 * Renders a graphics mask
 *
 * @static
 * @private
 * @method renderGraphicsMask
 * @param graphics {Graphics}
 * @param context {Context2D}
 */
PIXI.CanvasGraphics.renderGraphicsMask = function(graphics, context)
{
	var worldAlpha = graphics.worldAlpha;
	
	var len = graphics.graphicsData.length;
	if(len > 1)
	{
		len = 1;
		console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object")
	}
	
	for (var i=0; i < 1; i++) 
	{
		var data = graphics.graphicsData[i];
		var points = data.points;
		
		if(data.type == PIXI.Graphics.POLY)
		{
			context.beginPath();
			context.moveTo(points[0], points[1]);
			
			for (var j=1; j < points.length/2; j++)
			{
				context.lineTo(points[j * 2], points[j * 2 + 1]);
			} 
	      	
	      	// if the first and last point are the same close the path - much neater :)
	      	if(points[0] == points[points.length-2] && points[1] == points[points.length-1])
	      	{
	      		context.closePath();
	      	}
			
		}
		else if(data.type == PIXI.Graphics.RECT)
		{
			context.beginPath();
			context.rect(points[0], points[1], points[2], points[3]);
			context.closePath();
		}
		else if(data.type == PIXI.Graphics.CIRC)
		{
			// TODO - need to be Undefined!
      		context.beginPath();
			context.arc(points[0], points[1], points[2],0,2*Math.PI);
			context.closePath();
		}
		else if(data.type == PIXI.Graphics.ELIP)
		{
			
			// elipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
			var elipseData =  data.points;
			
			var w = elipseData[2] * 2;
			var h = elipseData[3] * 2;
	
			var x = elipseData[0] - w/2;
			var y = elipseData[1] - h/2;
			
      		context.beginPath();
			
			var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle
			
			context.moveTo(x, ym);
			context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
			context.closePath();
		}
      	
	   
	};
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * The Graphics class contains a set of methods that you can use to create primitive shapes and lines. 
 * It is important to know that with the webGL renderer only simple polys can be filled at this stage
 * Complex polys will not be filled. Heres an example of a complex poly: http://www.goodboydigital.com/wp-content/uploads/2013/06/complexPolygon.png
 *
 * @class Graphics 
 * @extends DisplayObjectContainer
 * @constructor
 */
PIXI.Graphics = function()
{
	PIXI.DisplayObjectContainer.call( this );
	
	this.renderable = true;

    /**
     * The alpha of the fill of this graphics object
     *
     * @property fillAlpha
     * @type Number
     */
	this.fillAlpha = 1;

    /**
     * The width of any lines drawn
     *
     * @property lineWidth
     * @type Number
     */
	this.lineWidth = 0;

    /**
     * The color of any lines drawn
     *
     * @property lineColor
     * @type String
     */
	this.lineColor = "black";

    /**
     * Graphics data
     *
     * @property graphicsData
     * @type Array
     * @private
     */
	this.graphicsData = [];

    /**
     * Current path
     *
     * @property currentPath
     * @type Object
     * @private
     */
	this.currentPath = {points:[]};
}

// constructor
PIXI.Graphics.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Graphics.prototype.constructor = PIXI.Graphics;

/**
 * Specifies a line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
 *
 * @method lineStyle
 * @param lineWidth {Number} width of the line to draw, will update the object's stored style
 * @param color {Number} color of the line to draw, will update the object's stored style
 * @param alpha {Number} alpha of the line to draw, will update the object's stored style
 */
PIXI.Graphics.prototype.lineStyle = function(lineWidth, color, alpha)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.lineWidth = lineWidth || 0;
	this.lineColor = color || 0;
	this.lineAlpha = (alpha == undefined) ? 1 : alpha;
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};
	
	this.graphicsData.push(this.currentPath);
}

/**
 * Moves the current drawing position to (x, y).
 *
 * @method moveTo
 * @param x {Number} the X coord to move to
 * @param y {Number} the Y coord to move to
 */
PIXI.Graphics.prototype.moveTo = function(x, y)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};
	
	this.currentPath.points.push(x, y);
	
	this.graphicsData.push(this.currentPath);
}

/**
 * Draws a line using the current line style from the current drawing position to (x, y);
 * the current drawing position is then set to (x, y).
 *
 * @method lineTo
 * @param x {Number} the X coord to draw to
 * @param y {Number} the Y coord to draw to
 */
PIXI.Graphics.prototype.lineTo = function(x, y)
{
	this.currentPath.points.push(x, y);
	this.dirty = true;
}

/**
 * Specifies a simple one-color fill that subsequent calls to other Graphics methods
 * (such as lineTo() or drawCircle()) use when drawing.
 *
 * @method beginFill
 * @param color {uint} the color of the fill
 * @param alpha {Number} the alpha
 */
PIXI.Graphics.prototype.beginFill = function(color, alpha)
{
	this.filling = true;
	this.fillColor = color || 0;
	this.fillAlpha = (alpha == undefined) ? 1 : alpha;
}

/**
 * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
 *
 * @method endFill
 */
PIXI.Graphics.prototype.endFill = function()
{
	this.filling = false;
	this.fillColor = null;
	this.fillAlpha = 1;
}

/**
 * @method drawRect
 *
 * @param x {Number} The X coord of the top-left of the rectangle
 * @param y {Number} The Y coord of the top-left of the rectangle
 * @param width {Number} The width of the rectangle
 * @param height {Number} The height of the rectangle
 */
PIXI.Graphics.prototype.drawRect = function( x, y, width, height )
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, 
						points:[x, y, width, height], type:PIXI.Graphics.RECT};
						
	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Draws a circle.
 *
 * @method drawCircle
 * @param x {Number} The X coord of the center of the circle
 * @param y {Number} The Y coord of the center of the circle
 * @param radius {Number} The radius of the circle
 */
PIXI.Graphics.prototype.drawCircle = function( x, y, radius)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, 
						points:[x, y, radius, radius], type:PIXI.Graphics.CIRC};
						
	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Draws an elipse.
 *
 * @method drawElipse
 * @param x {Number}
 * @param y {Number}
 * @param width {Number}
 * @param height {Number}
 */
PIXI.Graphics.prototype.drawElipse = function( x, y, width, height)
{
	if(this.currentPath.points.length == 0)this.graphicsData.pop();
	
	this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha, 
						fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, 
						points:[x, y, width, height], type:PIXI.Graphics.ELIP};
						
	this.graphicsData.push(this.currentPath);
	this.dirty = true;
}

/**
 * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
 *
 * @method clear
 */
PIXI.Graphics.prototype.clear = function()
{
	this.lineWidth = 0;
	this.filling = false;
	
	this.dirty = true;
	this.clearDirty = true;
	this.graphicsData = [];
}

// SOME TYPES:
PIXI.Graphics.POLY = 0;
PIXI.Graphics.RECT = 1;
PIXI.Graphics.CIRC = 2;
PIXI.Graphics.ELIP = 3;

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
PIXI.Strip.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Strip.prototype.constructor = PIXI.Strip;

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
PIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );
PIXI.Rope.prototype.constructor = PIXI.Rope;

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
 *
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

	/**
	 * The texture that the sprite is using
	 *
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;

	/**
	 * The width of the tiling sprite
	 *
	 * @property width
	 * @type Number
	 */
	this.width = width;

	/**
	 * The height of the tiling sprite
	 *
	 * @property height
	 * @type Number
	 */
	this.height = height;

	/**
	 * The scaling of the image that is being tiled
	 *
	 * @property tileScale
	 * @type Point
	 */	
	this.tileScale = new PIXI.Point(1,1);

	/**
	 * The offset position of the image that is being tiled
	 *
	 * @property tilePosition
	 * @type Point
	 */	
	this.tilePosition = new PIXI.Point(0,0);

	this.renderable = true;
	
	this.blendMode = PIXI.blendModes.NORMAL
}

// constructor
PIXI.TilingSprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.TilingSprite.prototype.constructor = PIXI.TilingSprite;

/**
 * Sets the texture of the tiling sprite
 *
 * @method setTexture
 * @param texture {Texture} The PIXI texture that is displayed by the sprite
 */
PIXI.TilingSprite.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY
	
	// stop current texture 
	this.texture = texture;
	this.updateFrame = true;
}

/**
 * When the texture is updated, this event will fire to update the frame
 *
 * @method onTextureUpdate
 * @param event
 * @private
 */
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
 * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
 *
 * @class Spine
 * @extends DisplayObjectContainer
 * @constructor
 * @param url {String} The url of the spine anim file to be used
 */
PIXI.Spine = function (url) {
	PIXI.DisplayObjectContainer.call(this);

	this.spineData = PIXI.AnimCache[url];

	if (!this.spineData) {
		throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + url);
	}

	this.skeleton = new spine.Skeleton(this.spineData);
	this.skeleton.updateWorldTransform();

	this.stateData = new spine.AnimationStateData(this.spineData);
	this.state = new spine.AnimationState(this.stateData);

	this.slotContainers = [];

	for (var i = 0, n = this.skeleton.drawOrder.length; i < n; i++) {
		var slot = this.skeleton.drawOrder[i];
		var attachment = slot.attachment;
		var slotContainer = new PIXI.DisplayObjectContainer();
		this.slotContainers.push(slotContainer);
		this.addChild(slotContainer);
		if (!(attachment instanceof spine.RegionAttachment)) {
			continue;
		}
		var spriteName = attachment.rendererObject.name;
		var sprite = this.createSprite(slot, attachment.rendererObject);
		slot.currentSprite = sprite;
		slot.currentSpriteName = spriteName;
		slotContainer.addChild(sprite);
	}
};

PIXI.Spine.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.Spine.prototype.constructor = PIXI.Spine;

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.Spine.prototype.updateTransform = function () {
	this.lastTime = this.lastTime || Date.now();
	var timeDelta = (Date.now() - this.lastTime) * 0.001;
	this.lastTime = Date.now();
	this.state.update(timeDelta);
	this.state.apply(this.skeleton);
	this.skeleton.updateWorldTransform();

	var drawOrder = this.skeleton.drawOrder;
	for (var i = 0, n = drawOrder.length; i < n; i++) {
		var slot = drawOrder[i];
		var attachment = slot.attachment;
		var slotContainer = this.slotContainers[i];
		if (!(attachment instanceof spine.RegionAttachment)) {
			slotContainer.visible = false;
			continue;
		}

		if (attachment.rendererObject) {
			if (!slot.currentSpriteName || slot.currentSpriteName != attachment.name) {
				var spriteName = attachment.rendererObject.name;
				if (slot.currentSprite !== undefined) {
					slot.currentSprite.visible = false;
				}
				slot.sprites = slot.sprites || {};
				if (slot.sprites[spriteName] !== undefined) {
					slot.sprites[spriteName].visible = true;
				} else {
					var sprite = this.createSprite(slot, attachment.rendererObject);
					slotContainer.addChild(sprite);
				}
				slot.currentSprite = slot.sprites[spriteName];
				slot.currentSpriteName = spriteName;
			}
		}
		slotContainer.visible = true;

		var bone = slot.bone;

		slotContainer.position.x = bone.worldX + attachment.x * bone.m00 + attachment.y * bone.m01;
		slotContainer.position.y = bone.worldY + attachment.x * bone.m10 + attachment.y * bone.m11;
		slotContainer.scale.x = bone.worldScaleX;
		slotContainer.scale.y = bone.worldScaleY;

		slotContainer.rotation = -(slot.bone.worldRotation * Math.PI / 180);
	}

	PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};


PIXI.Spine.prototype.createSprite = function (slot, descriptor) {
	var name = PIXI.TextureCache[descriptor.name] ? descriptor.name : descriptor.name + ".png";
	var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(name));
	sprite.scale = descriptor.scale;
	sprite.rotation = descriptor.rotation;
	sprite.anchor.x = sprite.anchor.y = 0.5;

	slot.sprites = slot.sprites || {};
	slot.sprites[descriptor.name] = sprite;
	return sprite;
};

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
            return this.frames.length;
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
        defaultMix: 0,
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
            return time ? time : this.defaultMix;
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

		if (type == spine.AttachmentType.region) {
			var attachment = new spine.RegionAttachment();
			attachment.x = (map["x"] || 0) * this.scale;
			attachment.y = (map["y"] || 0) * this.scale;
			attachment.scaleX = map["scaleX"] || 1;
			attachment.scaleY = map["scaleY"] || 1;
			attachment.rotation = map["rotation"] || 0;
			attachment.width = (map["width"] || 32) * this.scale;
			attachment.height = (map["height"] || 32) * this.scale;
			attachment.updateOffset();

			attachment.rendererObject = {};
			attachment.rendererObject.name = name;
			attachment.rendererObject.scale = {};
			attachment.rendererObject.scale.x = attachment.scaleX;
			attachment.rendererObject.scale.y = attachment.scaleY;
			attachment.rendererObject.rotation = -attachment.rotation * Math.PI / 180;
			return attachment;
		}

            throw "Unknown attachment type: " + type;
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
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);

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
 * This object is one that will allow you to specify custom rendering functions based on render type
 *
 * @class CustomRenderable 
 * @extends DisplayObject
 * @constructor
 */
PIXI.CustomRenderable = function()
{
	PIXI.DisplayObject.call( this );
	
}

// constructor
PIXI.CustomRenderable.prototype = Object.create( PIXI.DisplayObject.prototype );
PIXI.CustomRenderable.prototype.constructor = PIXI.CustomRenderable;

/**
 * If this object is being rendered by a CanvasRenderer it will call this callback
 *
 * @method renderCanvas
 * @param renderer {CanvasRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.renderCanvas = function(renderer)
{
	// override!
}

/**
 * If this object is being rendered by a WebGLRenderer it will call this callback to initialize
 *
 * @method initWebGL
 * @param renderer {WebGLRenderer} The renderer instance
 */
PIXI.CustomRenderable.prototype.initWebGL = function(renderer)
{
	// override!
}

/**
 * If this object is being rendered by a WebGLRenderer it will call this callback
 *
 * @method renderWebGL
 * @param renderer {WebGLRenderer} The renderer instance
 */
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
 *
 * @class BaseTexture
 * @uses EventTarget
 * @constructor
 * @param source {String} the source object (image or canvas)
 */
PIXI.BaseTexture = function(source)
{
	PIXI.EventTarget.call( this );

	/**
	 * [read-only] The width of the base texture set when the image has loaded
	 *
	 * @property width
	 * @type Number
	 * @readOnly
	 */
	this.width = 100;

	/**
	 * [read-only] The height of the base texture set when the image has loaded
	 *
	 * @property height
	 * @type Number
	 * @readOnly
	 */
	this.height = 100;

	/**
	 * [read-only] Describes if the base texture has loaded or not
	 *
	 * @property hasLoaded
	 * @type Boolean
	 * @readOnly
	 */
	this.hasLoaded = false;

	/**
	 * The source that is loaded to create the texture
	 *
	 * @property source
	 * @type Image
	 */
	this.source = source;

	if(!source)return;

	if(this.source instanceof Image || this.source instanceof HTMLImageElement)
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

PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;

/**
 * Destroys this base texture
 *
 * @method destroy
 */
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
 * Helper function that returns a base texture based on an image url
 * If the image is not in the base texture cache it will be  created and loaded
 *
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
		// new Image() breaks tex loading in some versions of Chrome.
		// See https://code.google.com/p/chromium/issues/detail?id=238071
		var image = new Image();//document.createElement('img'); 
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
 * A texture stores the information that represents an image or part of an image. It cannot be added
 * to the display list directly. To do this use PIXI.Sprite. If no frame is provided then the whole image is used
 *
 * @class Texture
 * @uses EventTarget
 * @constructor
 * @param baseTexture {BaseTexture} The base texture source to create the texture from
 * @param frmae {Rectangle} The rectangle frame of the texture to show
 */
PIXI.Texture = function(baseTexture, frame)
{
	PIXI.EventTarget.call( this );

	if(!frame)
	{
		this.noFrame = true;
		frame = new PIXI.Rectangle(0,0,1,1);
	}

	if(baseTexture instanceof PIXI.Texture)
		baseTexture = baseTexture.baseTexture;

	/**
	 * The base texture of this texture
	 *
	 * @property baseTexture
	 * @type BaseTexture
	 */
	this.baseTexture = baseTexture;

	/**
	 * The frame specifies the region of the base texture that this texture uses
	 *
	 * @property frame
	 * @type Rectangle
	 */
	this.frame = frame;

	/**
	 * The trim point
	 *
	 * @property trim
	 * @type Point
	 */
	this.trim = new PIXI.Point();

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

PIXI.Texture.prototype.constructor = PIXI.Texture;

/**
 * Called when the base texture is loaded
 *
 * @method onBaseTextureLoaded
 * @param event
 * @private
 */
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
 * Destroys this texture
 *
 * @method destroy
 * @param destroyBase {Boolean} Whether to destroy the base texture as well
 */
PIXI.Texture.prototype.destroy = function(destroyBase)
{
	if(destroyBase)this.baseTexture.destroy();
}

/**
 * Specifies the rectangle region of the baseTexture
 *
 * @method setFrame
 * @param frame {Rectangle} The frame of the texture to set it to
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
 * Helper function that returns a texture based on an image url
 * If the image is not in the texture cache it will be  created and loaded
 *
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
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
 * Helper function that returns a texture based on a frame id
 * If the frame id is not in the texture cache an error will be thrown
 *
 * @static
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
 * Helper function that returns a texture based on a canvas element
 * If the canvas is not in the texture cache it will be  created and loaded
 *
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
 * Adds a texture to the textureCache.
 *
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
 * Remove a texture from the textureCache. 
 *
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
 A RenderTexture is a special texture that allows any pixi displayObject to be rendered to it.

 __Hint__: All DisplayObjects (exmpl. Sprites) that renders on RenderTexture should be preloaded. 
 Otherwise black rectangles will be drawn instead.  
 
 RenderTexture takes snapshot of DisplayObject passed to render method. If DisplayObject is passed to render method, position and rotation of it will be ignored. For example:
 
	var renderTexture = new PIXI.RenderTexture(800, 600);
	var sprite = PIXI.Sprite.fromImage("spinObj_01.png");
	sprite.position.x = 800/2;
	sprite.position.y = 600/2;
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	renderTexture.render(sprite);

 Sprite in this case will be rendered to 0,0 position. To render this sprite at center DisplayObjectContainer should be used:

	var doc = new PIXI.DisplayObjectContainer();
	doc.addChild(sprite);
	renderTexture.render(doc);  // Renders to center of renderTexture

 @class RenderTexture
 @extends Texture
 @constructor
 @param width {Number} The width of the render texture
 @param height {Number} The height of the render texture
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

PIXI.RenderTexture.prototype = Object.create( PIXI.Texture.prototype );
PIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture;

/**
 * Initializes the webgl data for this texture
 *
 * @method initWebGL
 * @private
 */
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

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	this.baseTexture.isRender = true;

	gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFramebuffer );
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.baseTexture._glTexture, 0);

	// create a projection matrix..
	this.projection = new PIXI.Point(this.width/2 , this.height/2);

	// set the correct render function..
	this.render = this.renderWebGL;

	
}


PIXI.RenderTexture.prototype.resize = function(width, height)
{

	this.width = width;
	this.height = height;
	
	if(PIXI.gl)
	{
		this.projection.x = this.width/2
		this.projection.y = this.height/2;
	
		var gl = PIXI.gl;
		gl.bindTexture(gl.TEXTURE_2D, this.baseTexture._glTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width,  this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	}
	else
	{
		
		this.frame.width = this.width
		this.frame.height = this.height;
		this.renderer.resize(this.width, this.height);
	}
}

/**
 * Initializes the canvas data for this texture
 *
 * @method initCanvas
 * @private
 */
PIXI.RenderTexture.prototype.initCanvas = function()
{
	this.renderer = new PIXI.CanvasRenderer(this.width, this.height, null, 0);

	this.baseTexture = new PIXI.BaseTexture(this.renderer.view);
	this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);

	this.render = this.renderCanvas;
}

/**
 * This function will draw the display object to the texture.
 *
 * @method renderWebGL
 * @param displayObject {DisplayObject} The display object to render this texture on
 * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
 * @private
 */
PIXI.RenderTexture.prototype.renderWebGL = function(displayObject, position, clear)
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
	var originalWorldTransform = displayObject.worldTransform;
	displayObject.worldTransform = PIXI.mat3.create();//sthis.indetityMatrix;
	// modify to flip...
	displayObject.worldTransform[4] = -1;
	displayObject.worldTransform[5] = this.projection.y * 2;

	
	if(position)
	{
		displayObject.worldTransform[2] = position.x;
		displayObject.worldTransform[5] -= position.y;
	}
	
	PIXI.visibleCount++;
	displayObject.vcount = PIXI.visibleCount;
	
	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}

	var renderGroup = displayObject.__renderGroup;

	if(renderGroup)
	{
		if(displayObject == renderGroup.root)
		{
			renderGroup.render(this.projection);
		}
		else
		{
			renderGroup.renderSpecific(displayObject, this.projection);
		}
	}
	else
	{
		if(!this.renderGroup)this.renderGroup = new PIXI.WebGLRenderGroup(gl);
		this.renderGroup.setRenderable(displayObject);
		this.renderGroup.render(this.projection);
	}

	displayObject.worldTransform = originalWorldTransform;
}


/**
 * This function will draw the display object to the texture.
 *
 * @method renderCanvas
 * @param displayObject {DisplayObject} The display object to render this texture on
 * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
 * @private
 */
PIXI.RenderTexture.prototype.renderCanvas = function(displayObject, position, clear)
{
	var children = displayObject.children;

	displayObject.worldTransform = PIXI.mat3.create();
	
	if(position)
	{
		displayObject.worldTransform[2] = position.x;
		displayObject.worldTransform[5] = position.y;
	}
	

	for(var i=0,j=children.length; i<j; i++)
	{
		children[i].updateTransform();	
	}

	if(clear)this.renderer.context.clearRect(0,0, this.width, this.height);
	
    this.renderer.renderDisplayObject(displayObject);
    
    this.renderer.context.setTransform(1,0,0,1,0,0); 
    

  //  PIXI.texturesToUpdate.push(this.baseTexture);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Class that loads a bunch of images / sprite sheet / bitmap font files. Once the
 * assets have been loaded they are added to the PIXI Texture cache and can be accessed
 * easily through PIXI.Texture.fromImage() and PIXI.Sprite.fromImage()
 * When all items have been loaded this class will dispatch a "onLoaded" event
 * As each individual item is loaded this class will dispatch a "onProgress" event
 *
 * @class AssetLoader
 * @constructor
 * @uses EventTarget
 * @param {Array<String>} assetURLs an array of image/sprite sheet urls that you would like loaded
 *      supported. Supported image formats include "jpeg", "jpg", "png", "gif". Supported
 *      sprite sheet data formats only include "JSON" at this time. Supported bitmap font
 *      data formats include "xml" and "fnt".
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.AssetLoader = function(assetURLs, crossorigin)
{
	PIXI.EventTarget.call(this);

	/**
	 * The array of asset URLs that are going to be loaded
     *
	 * @property assetURLs
	 * @type Array<String>
	 */
	this.assetURLs = assetURLs;

    /**
     * Whether the requests should be treated as cross origin
     *
     * @property crossorigin
     * @type Boolean
     */
	this.crossorigin = crossorigin;

    /**
     * Maps file extension to loader types
     *
     * @property loadersByType
     * @type Object
     */
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
 * Fired when an item has loaded
 * @event onProgress
 */

/**
 * Fired when all the assets have loaded
 * @event onComplete 
 */

// constructor
PIXI.AssetLoader.prototype.constructor = PIXI.AssetLoader;

/**
 * Starts loading the assets sequentially
 *
 * @method load
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
 *
 * @method onAssetLoaded
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
 *
 * @class JsonLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.JsonLoader = function (url, crossorigin) {
	PIXI.EventTarget.call(this);

	/**
	 * The url of the bitmap font data
	 *
	 * @property url
	 * @type String
	 */
	this.url = url;

	/**
	 * Whether the requests should be treated as cross origin
	 *
	 * @property crossorigin
	 * @type Boolean
	 */
	this.crossorigin = crossorigin;

	/**
	 * [read-only] The base url of the bitmap font data
	 *
	 * @property baseUrl
	 * @type String
	 * @readOnly
	 */
	this.baseUrl = url.replace(/[^\/]*$/, "");

	/**
	 * [read-only] Whether the data has loaded yet
	 *
	 * @property loaded
	 * @type Boolean
	 * @readOnly
	 */
	this.loaded = false;
	
};

// constructor
PIXI.JsonLoader.prototype.constructor = PIXI.JsonLoader;

/**
 * Loads the JSON data
 *
 * @method load
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
 *
 * @method onJSONLoaded
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
		}
		else
		{
			this.onError();
		}
	}
};

/**
 * Invoke when json file loaded
 *
 * @method onLoaded
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
 *
 * @method onError
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
 *
 * @class SpriteSheetLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the sprite sheet JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */

PIXI.SpriteSheetLoader = function (url, crossorigin) {
	/*
	 * i use texture packer to load the assets..
	 * http://www.codeandweb.com/texturepacker
	 * make sure to set the format as "JSON"
	 */
	PIXI.EventTarget.call(this);

	/**
	 * The url of the bitmap font data
	 *
	 * @property url
	 * @type String
	 */
	this.url = url;

	/**
	 * Whether the requests should be treated as cross origin
	 *
	 * @property crossorigin
	 * @type Boolean
	 */
	this.crossorigin = crossorigin;

	/**
	 * [read-only] The base url of the bitmap font data
	 *
	 * @property baseUrl
	 * @type String
	 * @readOnly
	 */
	this.baseUrl = url.replace(/[^\/]*$/, "");

    /**
     * The texture being loaded
     *
     * @property texture
     * @type Texture
     */
    this.texture = null;

    /**
     * The frames of the sprite sheet
     *
     * @property frames
     * @type Object
     */
	this.frames = {};
};

// constructor
PIXI.SpriteSheetLoader.prototype.constructor = PIXI.SpriteSheetLoader;

/**
 * This will begin loading the JSON file
 *
 * @method load
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
 *
 * @method onJSONLoaded
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
 *
 * @method onLoaded
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
 *
 * @class ImageLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the image
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.ImageLoader = function(url, crossorigin)
{
    PIXI.EventTarget.call(this);

    /**
     * The texture being loaded
     *
     * @property texture
     * @type Texture
     */
    this.texture = PIXI.Texture.fromImage(url, crossorigin);
};

// constructor
PIXI.ImageLoader.prototype.constructor = PIXI.ImageLoader;

/**
 * Loads image or takes it from cache
 *
 * @method load
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
 *
 * @method onLoaded
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
 *
 * @class BitmapFontLoader
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the sprite sheet JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.BitmapFontLoader = function(url, crossorigin)
{
    /*
     * i use texture packer to load the assets..
     * http://www.codeandweb.com/texturepacker
     * make sure to set the format as "JSON"
     */
    PIXI.EventTarget.call(this);

    /**
     * The url of the bitmap font data
     *
     * @property url
     * @type String
     */
    this.url = url;

    /**
     * Whether the requests should be treated as cross origin
     *
     * @property crossorigin
     * @type Boolean
     */
    this.crossorigin = crossorigin;

    /**
     * [read-only] The base url of the bitmap font data
     *
     * @property baseUrl
     * @type String
     * @readOnly
     */
    this.baseUrl = url.replace(/[^\/]*$/, "");

    /**
     * [read-only] The texture of the bitmap font
     *
     * @property baseUrl
     * @type String
     */
    this.texture = null;
};

// constructor
PIXI.BitmapFontLoader.prototype.constructor = PIXI.BitmapFontLoader;

/**
 * Loads the XML font data
 *
 * @method load
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
 * Invoked when XML file is loaded, parses the data
 *
 * @method onXMLLoaded
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
 *
 * @method onLoaded
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
 *
 * @class Spine
 * @uses EventTarget
 * @constructor
 * @param url {String} The url of the JSON file
 * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
 */
PIXI.SpineLoader = function(url, crossorigin) 
{
	PIXI.EventTarget.call(this);

	/**
	 * The url of the bitmap font data
	 *
	 * @property url
	 * @type String
	 */
	this.url = url;

	/**
	 * Whether the requests should be treated as cross origin
	 *
	 * @property crossorigin
	 * @type Boolean
	 */
	this.crossorigin = crossorigin;

	/**
	 * [read-only] Whether the data has loaded yet
	 *
	 * @property loaded
	 * @type Boolean
	 * @readOnly
	 */
	this.loaded = false;
}

PIXI.SpineLoader.prototype.constructor = PIXI.SpineLoader;

/**
 * Loads the JSON data
 *
 * @method load
 */
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
 *
 * @method onJSONLoaded
 * @private
 */
PIXI.SpineLoader.prototype.onJSONLoaded = function (event) {
	var spineJsonParser = new spine.SkeletonJson();
	var skeletonData = spineJsonParser.readSkeletonData(this.json);
	
	PIXI.AnimCache[this.url] = skeletonData;

	this.onLoaded();
};

/**
 * Invoke when JSON file is loaded
 *
 * @method onLoaded
 * @private
 */
PIXI.SpineLoader.prototype.onLoaded = function () {
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

!function(e){if(typeof module==="object"&&module.exports===e)e=module.exports=O;e.SEMVER_SPEC_VERSION="2.0.0";var r=e.re=[];var t=e.src=[];var n=0;var i=n++;t[i]="0|[1-9]\\d*";var s=n++;t[s]="[0-9]+";var o=n++;t[o]="\\d*[a-zA-Z-][a-zA-Z0-9-]*";var a=n++;t[a]="("+t[i]+")\\."+"("+t[i]+")\\."+"("+t[i]+")";var u=n++;t[u]="("+t[s]+")\\."+"("+t[s]+")\\."+"("+t[s]+")";var f=n++;t[f]="(?:"+t[i]+"|"+t[o]+")";var c=n++;t[c]="(?:"+t[s]+"|"+t[o]+")";var l=n++;t[l]="(?:-("+t[f]+"(?:\\."+t[f]+")*))";var p=n++;t[p]="(?:-?("+t[c]+"(?:\\."+t[c]+")*))";var h=n++;t[h]="[0-9A-Za-z-]+";var v=n++;t[v]="(?:\\+("+t[h]+"(?:\\."+t[h]+")*))";var m=n++;var g="v?"+t[a]+t[l]+"?"+t[v]+"?";t[m]="^"+g+"$";var d="[v=\\s]*"+t[u]+t[p]+"?"+t[v]+"?";var w=n++;t[w]="^"+d+"$";var y=n++;t[y]="((?:<|>)?=?)";var $=n++;t[$]=t[s]+"|x|X|\\*";var j=n++;t[j]=t[i]+"|x|X|\\*";var b=n++;t[b]="[v=\\s]*("+t[j]+")"+"(?:\\.("+t[j]+")"+"(?:\\.("+t[j]+")"+"(?:("+t[l]+")"+")?)?)?";var S=n++;t[S]="[v=\\s]*("+t[$]+")"+"(?:\\.("+t[$]+")"+"(?:\\.("+t[$]+")"+"(?:("+t[p]+")"+")?)?)?";var E=n++;t[E]="^"+t[y]+"\\s*"+t[b]+"$";var k=n++;t[k]="^"+t[y]+"\\s*"+t[S]+"$";var x=n++;t[x]="(?:~>?)";var R=n++;t[R]=t[x]+"s+";var V="$1";var I=n++;t[I]="^"+t[x]+t[b]+"$";var C=n++;t[C]="^"+t[x]+t[S]+"$";var A=n++;t[A]="^"+t[y]+"\\s*("+d+")$|^$";var T=n++;t[T]="^"+t[y]+"\\s*("+g+")$|^$";var z=n++;t[z]=t[y]+"\\s*("+d+"|"+t[b]+")";r[z]=new RegExp(t[z],"g");var M="$1$2 ";var P=n++;t[P]="^\\s*("+t[b]+")"+"\\s+-\\s+"+"("+t[b]+")"+"\\s*$";var Z=n++;t[Z]="^\\s*("+t[S]+")"+"\\s+-\\s+"+"("+t[S]+")"+"\\s*$";var q=n++;t[q]="(<|>)?=?\\s*\\*";for(var L=0;L<n;L++){if(!r[L])r[L]=new RegExp(t[L])}e.parse=X;function X(e,t){var n=t?r[w]:r[m];return n.test(e)?new O(e,t):null}e.valid=_;function _(e,r){var t=X(e,r);return t?t.version:null}e.clean=N;function N(e,r){var t=X(e,r);return t?t.version:null}e.SemVer=O;function O(e,t){if(e instanceof O){if(e.loose===t)return e;else e=e.version}if(!(this instanceof O))return new O(e,t);this.loose=t;var n=e.trim().match(t?r[w]:r[m]);if(!n)throw new TypeError("Invalid Version: "+e);this.raw=e;this.major=+n[1];this.minor=+n[2];this.patch=+n[3];if(!n[4])this.prerelease=[];else this.prerelease=n[4].split(".").map(function(e){return/^[0-9]+$/.test(e)?+e:e});this.build=n[5]?n[5].split("."):[];this.format()}O.prototype.format=function(){this.version=this.major+"."+this.minor+"."+this.patch;if(this.prerelease.length)this.version+="-"+this.prerelease.join(".");return this.version};O.prototype.inspect=function(){return'<SemVer "'+this+'">'};O.prototype.toString=function(){return this.version};O.prototype.compare=function(e){if(!(e instanceof O))e=new O(e,this.loose);return this.compareMain(e)||this.comparePre(e)};O.prototype.compareMain=function(e){if(!(e instanceof O))e=new O(e,this.loose);return F(this.major,e.major)||F(this.minor,e.minor)||F(this.patch,e.patch)};O.prototype.comparePre=function(e){if(!(e instanceof O))e=new O(e,this.loose);if(this.prerelease.length&&!e.prerelease.length)return-1;else if(!this.prerelease.length&&e.prerelease.length)return 1;else if(!this.prerelease.lenth&&!e.prerelease.length)return 0;var r=0;do{var t=this.prerelease[r];var n=e.prerelease[r];if(t===undefined&&n===undefined)return 0;else if(n===undefined)return 1;else if(t===undefined)return-1;else if(t===n)continue;else return F(t,n)}while(++r)};O.prototype.inc=function(e){switch(e){case"major":this.major++;this.minor=-1;case"minor":this.minor++;this.patch=-1;case"patch":this.patch++;this.prerelease=[];break;case"prerelease":if(this.prerelease.length===0)this.prerelease=[0];else{var r=this.prerelease.length;while(--r>=0){if(typeof this.prerelease[r]==="number"){this.prerelease[r]++;r=-2}}if(r===-1)this.prerelease.push(0)}break;default:throw new Error("invalid increment argument: "+e)}this.format();return this};e.inc=B;function B(e,r,t){try{return new O(e,t).inc(r).version}catch(n){return null}}e.compareIdentifiers=F;var D=/^[0-9]+$/;function F(e,r){var t=D.test(e);var n=D.test(r);if(t&&n){e=+e;r=+r}return t&&!n?-1:n&&!t?1:e<r?-1:e>r?1:0}e.rcompareIdentifiers=G;function G(e,r){return F(r,e)}e.compare=H;function H(e,r,t){return new O(e,t).compare(r)}e.compareLoose=J;function J(e,r){return H(e,r,true)}e.rcompare=K;function K(e,r,t){return H(r,e,t)}e.sort=Q;function Q(r,t){return r.sort(function(r,n){return e.compare(r,n,t)})}e.rsort=U;function U(r,t){return r.sort(function(r,n){return e.rcompare(r,n,t)})}e.gt=W;function W(e,r,t){return H(e,r,t)>0}e.lt=Y;function Y(e,r,t){return H(e,r,t)<0}e.eq=er;function er(e,r,t){return H(e,r,t)===0}e.neq=rr;function rr(e,r,t){return H(e,r,t)!==0}e.gte=tr;function tr(e,r,t){return H(e,r,t)>=0}e.lte=nr;function nr(e,r,t){return H(e,r,t)<=0}e.cmp=ir;function ir(e,r,t,n){var i;switch(r){case"===":i=e===t;break;case"!==":i=e!==t;break;case"":case"=":case"==":i=er(e,t,n);break;case"!=":i=rr(e,t,n);break;case">":i=W(e,t,n);break;case">=":i=tr(e,t,n);break;case"<":i=Y(e,t,n);break;case"<=":i=nr(e,t,n);break;default:throw new TypeError("Invalid operator: "+r)}return i}e.Comparator=sr;function sr(e,r){if(e instanceof sr){if(e.loose===r)return e;else e=e.value}if(!(this instanceof sr))return new sr(e,r);this.loose=r;this.parse(e);if(this.semver===or)this.value="";else this.value=this.operator+this.semver.version}var or={};sr.prototype.parse=function(e){var t=this.loose?r[A]:r[T];var n=e.match(t);if(!n)throw new TypeError("Invalid comparator: "+e);this.operator=n[1];if(!n[2])this.semver=or;else{this.semver=new O(n[2],this.loose);if(this.operator==="<"&&!this.semver.prerelease.length){this.semver.prerelease=["0"];this.semver.format()}}};sr.prototype.inspect=function(){return'<SemVer Comparator "'+this+'">'};sr.prototype.toString=function(){return this.value};sr.prototype.test=function(e){return this.semver===or?true:ir(e,this.operator,this.semver,this.loose)};e.Range=ar;function ar(e,r){if(e instanceof ar&&e.loose===r)return e;if(!(this instanceof ar))return new ar(e,r);this.loose=r;this.raw=e;this.set=e.split(/\s*\|\|\s*/).map(function(e){return this.parseRange(e.trim())},this).filter(function(e){return e.length});if(!this.set.length){throw new TypeError("Invalid SemVer Range: "+e)}this.format()}ar.prototype.inspect=function(){return'<SemVer Range "'+this.range+'">'};ar.prototype.format=function(){this.range=this.set.map(function(e){return e.join(" ").trim()}).join("||").trim();return this.range};ar.prototype.toString=function(){return this.range};ar.prototype.parseRange=function(e){var t=this.loose;e=e.trim();var n=t?r[Z]:r[P];e=e.replace(n,gr);e=e.replace(r[z],M);e=e.replace(r[R],V);e=e.split(/\s+/).join(" ");var i=t?r[A]:r[T];var s=e.split(" ").map(function(e){return fr(e,t)}).join(" ").split(/\s+/);if(this.loose){s=s.filter(function(e){return!!e.match(i)})}s=s.map(function(e){return new sr(e,t)});return s};e.toComparators=ur;function ur(e,r){return new ar(e,r).set.map(function(e){return e.map(function(e){return e.value}).join(" ").trim().split(" ")})}function fr(e,r){e=lr(e,r);e=hr(e,r);e=mr(e,r);return e}function cr(e){return!e||e.toLowerCase()==="x"||e==="*"}function lr(e,r){return e.trim().split(/\s+/).map(function(e){return pr(e,r)}).join(" ")}function pr(e,t){var n=t?r[C]:r[I];return e.replace(n,function(e,r,t,n,i){var s;if(cr(r))s="";else if(cr(t))s=">="+r+".0.0-0 <"+(+r+1)+".0.0-0";else if(cr(n))s=">="+r+"."+t+".0-0 <"+r+"."+(+t+1)+".0-0";else if(i){if(i.charAt(0)!=="-")i="-"+i;s=">="+r+"."+t+"."+n+i+" <"+r+"."+(+t+1)+".0-0"}else s=">="+r+"."+t+"."+n+"-0"+" <"+r+"."+(+t+1)+".0-0";return s})}function hr(e,r){return e.split(/\s+/).map(function(e){return vr(e,r)}).join(" ")}function vr(e,t){e=e.trim();var n=t?r[k]:r[E];return e.replace(n,function(e,r,t,n,i,s){var o=cr(t);var a=o||cr(n);var u=a||cr(i);var f=u;if(r==="="&&f)r="";if(r&&f){if(o)t=0;if(a)n=0;if(u)i=0;if(r===">"){r=">=";if(o){}else if(a){t=+t+1;n=0;i=0}else if(u){n=+n+1;i=0}}e=r+t+"."+n+"."+i+"-0"}else if(o){e="*"}else if(a){e=">="+t+".0.0-0 <"+(+t+1)+".0.0-0"}else if(u){e=">="+t+"."+n+".0-0 <"+t+"."+(+n+1)+".0-0"}return e})}function mr(e,t){return e.trim().replace(r[q],"")}function gr(e,r,t,n,i,s,o,a,u,f,c,l,p){if(cr(t))r="";else if(cr(n))r=">="+t+".0.0-0";else if(cr(i))r=">="+t+"."+n+".0-0";else r=">="+r;if(cr(u))a="";else if(cr(f))a="<"+(+u+1)+".0.0-0";else if(cr(c))a="<"+u+"."+(+f+1)+".0-0";else if(l)a="<="+u+"."+f+"."+c+"-"+l;else a="<="+a;return(r+" "+a).trim()}ar.prototype.test=function(e){if(!e)return false;for(var r=0;r<this.set.length;r++){if(dr(this.set[r],e))return true}return false};function dr(e,r){for(var t=0;t<e.length;t++){if(!e[t].test(r))return false}return true}e.satisfies=wr;function wr(e,r,t){try{r=new ar(r,t)}catch(n){return false}return r.test(e)}e.maxSatisfying=yr;function yr(e,r,t){return e.filter(function(e){return wr(e,r,t)}).sort(H)[0]||null}e.validRange=$r;function $r(e,r){try{return new ar(e,r).range||"*"}catch(t){return null}}if(typeof define==="function"&&define.amd)define(e)}(typeof exports==="object"?exports:typeof define==="function"&&define.amd?{}:semver={});
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
 * Point object, please see <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Point.html">PIXI.Point</a>
 *
 * @class Point
 * @namespace gf
 */
gf.Point = PIXI.Point;

/**
 * Rectangle object, please see <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Rectangle.html">PIXI.Rectangle</a>
 *
 * @class Rectangle
 * @namespace gf
 */
gf.Rectangle = PIXI.Rectangle;

/**
 * Circle object, please see <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Circle.html">PIXI.Circle</a>
 *
 * @class Circle
 * @namespace gf
 */
gf.Circle = PIXI.Circle;

/**
 * Ellipse object, please see <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Ellipse.html">PIXI.Ellipse</a>
 *
 * @class Ellipse
 * @namespace gf
 */
gf.Ellipse = PIXI.Ellipse;

/**
 * Polygon object, please see <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Polygon.html">PIXI.Polygon</a>
 *
 * @class Polygon
 * @namespace gf
 */
gf.Polygon = PIXI.Polygon;

/**
 * Texture object, please see <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Texture.html">PIXI.Texture</a>
 *
 * @class Texture
 * @namespace gf
 */
gf.Texture = PIXI.Texture;

/**
 * The current grapefruit version
 *
 * @property version
 * @type String
 */
gf.version = '0.0.2';

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
 * @namespace gf
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
    canvas: (function () { try { return !!window.CanvasRenderingContext2D && !!document.createElement('canvas').getContext('2d'); } catch(e) { return false; } })(),

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
     * Whether or not the Web Audio API is supported
     *
     * @property webAudio
     * @type Boolean
     */
    webAudio: !!window.AudioContext || !!window.webkitAudioContext || !!window.mozAudioContext,

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
 *
 * @method inherits
 * @param child {Function} The Child to inherit the prototype
 * @param parent {Function} The Parent to inherit from
 * @param proto {Object} The prototype to apply to the child
 */
gf.inherits = function(child, parent, proto) {
    proto = proto || {};

    //get the property descriptors from the child proto and the passed proto
    var desc = {};
    [child.prototype, proto].forEach(function (s) {
        Object.getOwnPropertyNames(s).forEach(function (k) {
            desc[k] = Object.getOwnPropertyDescriptor(s, k);
        });
    });

    //set the constructor descriptor
    desc.constructor = {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
    };

    //create the prototype
    child.prototype = Object.create(parent.prototype, desc);
};

//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
/**
 * Namespace for all plugins, it also provides methods for patching
 * core functions, and registering plugins.
 *
 * @class plugin
 * @extends Object
 * @namespace gf
 */
gf.plugin = {
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
     * Registers a plugin into the gf namespace.
     *
     * @method register
     * @param plugin {Object} The object to place in the namespace
     * @param name {String} The name of the plugin to use as the key
     * @example
     *      //For example, to register a new plugin:
     *      gf.plugin.register(MyPluginObject, 'MyPluginName');
     *      var plg = new gf.MyPluginName();
     */
    register: function(plugin, name) {
        //ensure we don't overrite a name
        if(gf[name]) {
            throw 'Grapefruit: Unable to register plugin: "' + name + '" already exists in the gf namespace, please choose something else!';
        }

        if(plugin.gfVersion && !semver.satisfies(gf.version, plugin.gfVersion)) {
            throw 'GrapeFruit: Plugin gfVersion mismatch, need grapefruit version ' + plugin.gfVersion + ', but using version ' + gf.version;
        }

        //store the plugin in the namespace
        gf[name] = plugin;
    }
};

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
    },
    parseHitArea: function(hv) {
        var ha;

        //odd number of values
        if(hv.length % 2 !== 0 && hv.length !== 3) {
            throw 'Strange number of values for hitArea! Should be a flat array of values, like: [x,y,r] for a circle, [x,y,w,h] for a rectangle, or [x,y,x,y,...] for other polygons.';
        }

        //a circle x,y,r
        if(hv.length === 3) {
            ha = new gf.Circle(hv[0], hv[1], hv[2]);
        }
        //a rectangle x,y,w,h
        else if(hv.length === 4) {
            ha = new gf.Rectangle(hv[0], hv[1], hv[2], hv[3]);
        }
        //generic polygon
        else {
            ha = new gf.Polygon(hv);
        }

        return ha;
    },
    parseTiledProperties: function(obj) {
        if(!obj || obj.__tiledparsed)
            return obj;

        for(var k in obj) {
            var v = obj[k];

            //try to massage numbers
            if(!isNaN(v))
                obj[k] = parseFloat(v, 10);
            //true values
            else if(v === 'true')
                obj[k] = true;
            //false values
            else if(v === 'false')
                obj[k] = false;
            //anything else is either a string or json, try json
            else {
                try{
                    v = JSON.parse(v);
                    obj[k] = v;
                } catch(e) {}
            }
        }

        //after parsing, check some other things
        if(obj.hitArea)
            obj.hitArea = gf.utils.parseHitArea(obj.hitArea);

        if(obj.static || obj.sensor) {
            obj.mass = Infinity;
            obj.inertia = Infinity;
        }

        obj.__tiledparsed = true;

        return obj;
    }
};

/**
 * The grapefruit math library, used to abstract commonly used math operations
 *
 * @class math
 * @extends Object
 * @namespace gf
 */
 gf.math = {
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    SEED: Math.random(),
    /**
     * Quickly rounds a number. This is about twice as fast as Math.round()
     *
     * @method round
     * @param num {Number} The number to round
     * @return {Number} The rounded value
     */
    round: function(n) {
        return ~~(n + (n > 0 ? 0.5 : -0.5));
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
    /**
     * Returns a random int between min and max.
     *
     * @method randomInt
     * @param min {Number} The minimun number that the result can be
     * @param max {Number} The maximun number that the result can be
     * @return {Number}
     */
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
 * High performance clock, from mrdoob's Three.js:
 * <a target="_blank" href="https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js">/src/core/Clock.js</a>
 *
 * @class Clock
 * @extends Object
 * @namespace gf
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

/**
 * A 2d Vector implementation stolen directly from mrdoob's THREE.js
 * thanks mrdoob: https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js
 *
 * @class Vector
 * @extends Object
 * @namespace gf
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

/**
 * Event emitter mixin. This will add emitter properties to an object so that
 * it can emit events, and have others listen for them. Based on
 * <a target="_blank" href="https://github.com/joyent/node/blob/master/lib/events.js">node.js event emitter</a>
 *
 * @class EventEmitter
 * @namespace gf
 * @constructor
 * @example
 *      function MyObject(clr) {
 *          this.color = clr;
 *      }
 *
 *      gf.inherits(MyObject, Object, {
 *          something: function(s) {
 *              this.emit('hey', { some: s });
 *          }
 *      });
 *      gf.EventEmitter.call(MyObject.prototype); //adds properties
 *
 *      //then later
 *      var o = new MyObject('red');
 *      o.on('hey', function(e) {
 *          console.log(this.color); //"this" refers to the instance, logs "red"
 *          console.log(e.some); //e is the data passed to emit, logs "hello"
 *      });
 *      o.something('hello');
 */
gf.EventEmitter = function() {
    this._events = this._events || {};

    /**
     * Registers a listener function to be run on an event occurance
     *
     * @method on
     * @param type {String} The event name to listen for
     * @param listener {Function} The function to execute when the event happens
     */
    this.addEventListener = this.on = function(type, listener) {
        if(typeof listener !== 'function')
            throw new TypeError('listener must be a function');

        if(!this._events)
            this._events = {};

        // Optimize the case of one listener. Don't need the extra array object.
        if (!this._events[type])
            this._events[type] = listener;
        // If we've already got an array, just append.
        else if (typeof this._events[type] === 'object')
            this._events[type].push(listener);
        // Adding the second element, need to change to array.
        else
            this._events[type] = [this._events[type], listener];

        return this;
    };

    /**
     * Emits an event which will run all registered listeners for the event type
     *
     * @method emit
     * @param type {String} The event name to emit
     * @param data {mixed} Any data you want passed along with the event
     */
    this.dispatchEvent = this.emit = function(type) {
        var handler, len, args, i, listeners;

        if(!this._events)
            this._events = {};

        handler = this._events[type];

        if(typeof handler === 'undefined')
            return false;

        if(typeof handler === 'function') {
            switch(arguments.length) {
              // fast cases
              case 1:
                handler.call(this);
                break;
              case 2:
                handler.call(this, arguments[1]);
                break;
              case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;
              // slower
              default:
                len = arguments.length;
                args = new Array(len - 1);
                for (i = 1; i < len; i++)
                  args[i - 1] = arguments[i];

                handler.apply(this, args);
            }
        } else if (typeof handler === 'object') {
            len = arguments.length;
            args = new Array(len - 1);
            for (i = 1; i < len; i++)
                args[i - 1] = arguments[i];

            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }

        return this;
    };

    /**
     * Removes a listener function for an event type
     *
     * @method off
     * @param type {String} The event name to emit
     * @param listener {Function} The function to remove
     */
    this.removeEventListener = this.off = function(type, listener) {
        var list, position, length, i;

        if(typeof listener !== 'function')
            throw new TypeError('listener must be a function');

        if(!this._events[type])
            return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if(list === listener || (typeof list.listener === 'function' && list.listener === listener)) {
            this._events[type] = undefined;

        } else if(typeof list === 'object') {
            for(i = length; i-- > 0;) {
                if(list[i] === listener || (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if(position < 0)
                return this;

            if(list.length === 1) {
                list.length = 0;
                this._events[type] = undefined;
            } else {
                list.splice(position, 1);
            }
        }
    };

    /**
     * Registers a one-time callback for an event
     *
     * @method once
     * @param type {String} The event name to listen for
     * @param listener {Function} the callback to call when the event occurs
     */
    this.once = function(type, listener) {
        if(typeof listener !== 'function')
            throw new TypeError('listener must be a function');

        function g() {
            this.off(type, g);
            listener.apply(this, arguments);
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    };
};
gf.PhysicsSystem = function(options) {
    options = options || {};

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

    //sprite - sprite collisions
    this.space.addCollisionHandler(
        gf.PhysicsSystem.COLLISION_TYPE.SPRITE,
        gf.PhysicsSystem.COLLISION_TYPE.SPRITE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        this.onCollisionPostSolve.bind(this), //postSolve
        this.onCollisionEnd.bind(this) //separate
    );

    //sprite - tile collisions
    this.space.addCollisionHandler(
        gf.PhysicsSystem.COLLISION_TYPE.SPRITE,
        gf.PhysicsSystem.COLLISION_TYPE.TILE,
        this.onCollisionBegin.bind(this), //begin
        null, //preSolve
        this.onCollisionPostSolve.bind(this), //postSolve
        this.onCollisionEnd.bind(this) //separate
    );

    this.actionQueue = [];
    this.tickCallbacks = [];
    this._skip = 0;
};

gf.inherits(gf.PhysicsSystem, Object, {
    _createBody: function(spr) {
        var body = new cp.Body(
            spr.mass || 1,
            spr.inertia || cp.momentForBox(spr.mass || 1, spr.width, spr.height) || Infinity
        );

        if(spr.mass === Infinity) {
            //inifinite mass means it is static, so make it static
            //and do not add it to the world (no need to simulate it)
            body.nodeIdleTime = Infinity;
        }// else {
            //this.space.addBody(body);
        //}

        return body;
    },
    _createShape: function(spr, body, poly) {
        var shape,
            hit = poly || spr.hitArea,
            ax = spr.anchor ? spr.anchor.x : 0,
            ay = spr.anchor ? spr.anchor.y : 0,
            aw = spr.width * ax,
            ah = spr.height * ay;

        //specified shape
        if(hit) {
            if(hit instanceof gf.Rectangle) {
                //convert the top-left anchored rectangle to left,right,bottom,top values
                //for chipmunk space that will corospond to our own
                var l = hit.x,
                    r = hit.x + hit.width,
                    b = hit.y - spr.height,
                    t = b + hit.height;

                l -= aw;
                r -= aw;

                b += spr.height - ah;
                t += spr.height - ah;

                shape = new cp.BoxShape2(body, new cp.BB(l, b, r, t));
            }
            else if(hit instanceof gf.Circle) {
                //the offset needs to move the circle to the sprite center based on the sprite's anchor (bottom-left)
                var offset = new gf.Vector(
                    ((spr.width / 2) - aw) + hit.x,
                    ((spr.height / 2) - ah) + hit.y
                );

                shape = new cp.CircleShape(body, hit.radius, offset);
            }
            else if(hit instanceof gf.Polygon) {
                //cp shapes anchors are 0.5,0.5, but a polygon uses 0,0 as the topleft
                //of the bounding rect so we have to convert
                var points = [],
                    ps = hit.points;

                for(var i = 0; i < ps.length; ++i) {
                    var p = ps[i];

                    points.push(p.x - aw);
                    points.push(p.y - ah);
                }

                shape = new cp.PolyShape(body, cp.convexHull(points, null, 0), cp.vzero);
            }
        }

        //default box shape
        if(!shape) {
            shape = new cp.BoxShape2(body, new cp.BB(0, -spr.height, spr.width, 0));
        }

        //this.space.addShape(shape);

        shape.width = spr.width;
        shape.height = spr.height;
        shape.sprite = spr;
        shape.setElasticity(0);
        shape.setSensor(spr.sensor);
        shape.setCollisionType(this.getCollisionType(spr));
        shape.setFriction(spr.friction || 0);

        return shape;
    },
    nextTick: function(fn) {
        this.tickCallbacks.push(fn);
    },
    reindexStatic: function() {
        this.actionQueue.push(['reindexStatic']);
        this.act();
    },
    getCollisionType: function(spr) {
        if(spr instanceof gf.Tile) {
            return gf.PhysicsSystem.COLLISION_TYPE.TILE;
        } else {
            return gf.PhysicsSystem.COLLISION_TYPE.SPRITE;
        }
    },
    add: function(spr) {
        //already in system
        if(spr._phys && spr._phys.body)
            return;

        var body = this._createBody(spr),
            shape = this._createShape(spr, body),
            control;

        //add control body and constraints
        if(!body.isStatic()) {
            var cbody = new cp.Body(Infinity, Infinity), //control body
                cpivot = new cp.PivotJoint(cbody, body, cp.vzero, cp.vzero),
                cgear = new cp.GearJoint(cbody, body, 0, 1);

            cpivot.maxBias = 0; //disable join correction
            cpivot.maxForce = 10000; //emulate linear friction

            cgear.errorBias = 0; //attempt to fully correct the joint each step
            cgear.maxBias = 1.2; //but limit the angular correction
            cgear.maxForce = 50000; //emulate angular friction

            control = {};
            control.body = cbody;
            control.pivot = cpivot;
            control.gear = cgear;
        }

        this.actionQueue.push(['add', {
            spr: spr,
            body: body,
            shape: shape,
            control: control
        }]);
        this.act();
    },
    remove: function(spr) {
        if(!spr || !spr._phys || !spr._phys.body || !spr._phys.shape)
            return;

        this.actionQueue.push(['remove', spr._phys]);
        this.act();
    },
    reindex: function(spr) {
        if(!spr || !spr._phys || !spr._phys.shape)
            return;

        this.actionQueue.push(['reindex', spr._phys.shape]);
        this.act();
    },
    addCustomShape: function(spr, poly, sensor) {
        if(spr && spr._phys && spr._phys.body) {
            var s = this._createShape(spr, spr._phys.body, poly);

            s.setSensor(sensor);
            s.width = spr.width;
            s.height = spr.height;
            s.sprite = spr;
            s.setElasticity(0);
            s.setSensor(sensor !== undefined ? sensor : spr.sensor);
            s.setCollisionType(this.getCollisionType(spr));
            s.setFriction(spr.friction || 0);

            this.actionQueue.push(['addCustomShape', { spr: spr, shape: s }]);
            this.act();

            return s;
        }
    },
    setMass: function(spr, mass) {
        if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setMass(mass);
    },
    setVelocity: function(spr, vel) {
        //update control body velocity (and pivot contraint makes regular follow)
        if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
            spr._phys.control.body.setVel(vel);

        //if no control body then update real body
        else if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setVel(vel);
    },
    setPosition: function(spr, pos) {
        //update body position
        if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setPos(pos);

        //update control body position
        if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
            spr._phys.control.body.setPos(pos);
    },
    setRotation: function(spr, rads) {
        //update control body rotation (and gear contraint makes regular follow)
        if(spr && spr._phys && spr._phys.control && spr._phys.control.body)
            spr._phys.control.body.setAngle(rads);

        //if no control body then update real body
        else if(spr && spr._phys && spr._phys.body)
            spr._phys.body.setAngle(rads);

    },
    update: function(dt) {
        if(this._paused)
            return;

        while(this.tickCallbacks.length)
            (this.tickCallbacks.shift()).call(this);

        if(this._skip)
            return this._skip--;

        //execute the physics step
        this.space.step(dt);

        //go through each changed shape
        this.space.activeShapes.each(function(shape) {
            //since the anchor for a cp shape is 0.5 0.5, we have to modify the pos a bit
            //to make it match the sprite's anchor point
            var spr = shape.sprite;
            spr.position.x = shape.body.p.x;// + ((spr.anchor.x * shape.width) - (shape.width / 2));
            spr.position.y = shape.body.p.y;// + ((spr.anchor.y * shape.height) - (shape.height / 2));
            spr.rotation = shape.body.a;

            spr.emit('physUpdate');
        });
    },
    onCollisionBegin: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        //only call the sensor collisions here
        if(shapes[0].sensor || shapes[1].sensor) {
            spr1.onCollision(spr2, arbiter.getNormal(0), shapes[1], shapes[0]);
            spr2.onCollision(spr1, arbiter.getNormal(0), shapes[0], shapes[1]);
        }

        //maintain the colliding state
        return true;
    },
    onCollisionPostSolve: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        if(arbiter.isFirstContact()) {
            spr1.onCollision(spr2, arbiter.totalImpulse(), shapes[1], shapes[0]);
            spr2.onCollision(spr1, arbiter.totalImpulse(), shapes[0], shapes[1]);
        }

        //maintain the colliding state
        return true;
    },
    onCollisionEnd: function(arbiter) {//, space) {
        var shapes = arbiter.getShapes(),
            spr1 = shapes[0].sprite,
            spr2 = shapes[1].sprite;

        spr1.onSeparate(spr2, shapes[1], shapes[0]);
        spr2.onSeparate(spr1, shapes[0], shapes[1]);

        //maintain the colliding state
        return true;
    },
    act: function() {
        if(this.space.locked) {
            this.space.addPostStepCallback(this.onPostStep.bind(this));
        } else {
            this.onPostStep();
        }
    },
    pause: function() {
        this._paused = true;
    },
    resume: function() {
        this._paused = false;
    },
    skip: function(num) {
        this._skip = num;
    },
    skipNext: function() {
        this.skip(1);
    },
    onPostStep: function() {
        //remove items
        while(this.actionQueue.length) {
            var a = this.actionQueue.shift(),
                act = a[0],
                data = a[1];

            switch(act) {
                case 'add':
                    data.body.setPos(data.spr.position);
                    if(!data.body.isStatic()) {
                        this.space.addBody(data.body);
                    }

                    this.space.addShape(data.shape);

                    if(data.control) {
                        data.control.body.setPos(data.spr.position);
                        this.space.addConstraint(data.control.pivot);
                        this.space.addConstraint(data.control.gear);
                    }

                    data.spr._phys = data;
                    break;

                case 'remove':
                    if(data.body.space)
                        this.space.removeBody(data.body);

                    if(data.shape.space)
                        this.space.removeShape(data.shape);

                    if(data.customShapes) {
                        for(var i = data.customShapes.length - 1; i > -1; --i) {
                            this.space.removeShape(data.customShapes[i]);
                        }
                    }

                    //remove references
                    data.body = null;
                    data.shape.sprite = null;
                    data.shape = null;
                    data.customShapes = null;
                    break;

                case 'reindex':
                    this.space.reindexShape(data);
                    break;

                case 'reindexStatic':
                    this.space.reindexStatic();
                    break;

                case 'addCustomShape':
                    if(!data.spr._phys.customShapes)
                        data.spr._phys.customShapes = [];

                    data.spr._phys.customShapes.push(data.shape);
                    this.space.addShape(data.shape);
                    break;

            }
        }
    }
});

gf.PhysicsSystem.COLLISION_TYPE = {
    SPRITE: 0,
    TILE: 1
};
/**
 * Physics mixin. This will add physics capabilities to the class it mixes into.
 *
 * @class PhysicsTarget
 * @namespace gf
 * @constructor
 * @example
 *      function MyObject(clr) {
 *          this.color = clr;
 *      }
 *
 *      gf.inherits(MyObject, Object, {
 *          something: function(s) {
 *          }
 *      });
 *      gf.PhysicsTarget.call(MyObject.prototype); //adds properties
 *
 *      //then later
 *      var o = new MyObject('red');
 *      o.enablePhysics(game.physics);
 */
 gf.PhysicsTarget = function() {
    /**
     * The physics system that this object is a part of. This is advisory only
     * please use enablePhysics() or disablePhysics() and do not set this value
     * directly.
     *
     * @property _psystem
     * @type PhysicsSystem
     * @default null
     * @private
     * @readOnly
     */
    this._psystem = null;

    /**
     * The mass of this object, please use setMass to set this value
     *
     * @property mass
     * @type Number
     * @default 0
     * @readOnly
     */
    this.mass = 0;

    /**
     * The moment of inertia of this object, only set this before enabling physics (has no effect after enabling)
     *
     * @property inertia
     * @type Number
     * @default 0
     */
    this.inertia = 0;

    /**
     * Enables physics for this sprite
     *
     * @method enablePhysics
     * @param system {PhysicsSystem} The system for the sprite to be in
     */
    this.enablePhysics = function(sys) {
        if(sys && this._psystem !== sys) {
            if(this._psystem)
                this._psystem.remove(this);

            this._psystem = sys;
        }

        this._psystem.add(this);
    };

    /**
     * Disbales physics for this sprite
     *
     * @method disablePhysics
     */
    this.disablePhysics = function() {
        if(this._psystem) {
            this._psystem.remove(this);
        }
    };

    /**
     * Reindexes the collisions for this sprite, useful when moving the sprite a great deal
     * (like to a new world)
     *
     * @method disablePhysics
     */
    this.reindex = function() {
        if(this._psystem) {
            this._psystem.reindex(this);
        }
    };

    /**
     * Sets the mass of this sprite
     *
     * @method setMass
     * @param mass {Number} The new mass of the object
     */
    this.setMass = function(mass) {
        if(this._psystem) {
            this._psystem.setMass(this, mass);
        }
    };

    /**
     * Sets the velocity of this sprite
     *
     * @method setVelocity
     * @param velocity {Vector} The new velocity of the object
     */
    this.setVelocity = function(vel) {
        if(this._psystem) {
            this._psystem.setVelocity(this, gf.utils.ensureVector(vel));
        }
    };

    /**
     * Sets the rotation of this sprite
     *
     * @method setRotation
     * @param rotation {Number} The new rotation of the object in radians
     */
    this.setRotation = function(rads) {
        this.rotation = rads;

        if(this._psystem) {
            this._psystem.setRotation(this, rads);
        }
    };

    /**
     * Sets the position of this sprite
     *
     * @method setPosition
     * @param x {Number}
     * @param y {Number}
     */
    this.setPosition = function(x, y) {
        this.position.x = x;
        this.position.y = y;

        if(this._psystem) {
            this._psystem.setPosition(this, this.position);
        }
    };

    /**
     * On Collision Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we destroy the collectable
     *      and if we collide with a solid tile we kill our velocity. This method will emit a
     *      'collision' event that you can listen for
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     * @param vec {Vector} Collision vector (for sensors this is normalized)
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {Sprite} Your physics shape that caused the collision
     */
    this.onCollision = function(obj, vec, colShape, myShape) {
        if(obj.type === gf.Sprite.TYPE.COLLECTABLE)
            obj.destroy();

        this.emit('collision', obj, vec, colShape, myShape);
    };

    /**
     * On Seperate Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we destroy the collectable
     *      and if we collide with a solid tile we kill our velocity. This method will emit a
     *      'collision' event that you can listen for
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     * @param colShape {cp.Shape} The colliding physics shape
     * @param myShape {Sprite} Your physics shape that caused the collision
     */
    this.onSeparate = function(obj, colShape, myShape) {
        this.emit('separate', obj, colShape, myShape);
    };
};
//you can only have 1 audio context on a page, so we store one for use in each manager
gf.__AudioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
gf.__audioctx = gf.support.webAudio ? new gf.__AudioCtx() : null;

/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 * The GF Audio API was based on
 * <a target="_blank" href="https://github.com/goldfire/howler.js">Howler.js</a>
 *
 * @class AudioManager
 * @extends Object
 * @namespace gf
 * @constructor
 */
gf.AudioManager = function() {
    /**
     * Whether the player is muted or not
     *
     * @property muted
     * @type Boolean
     * @default false
     * @private
     */
    this._muted = false;

    /**
     * The master volume of the player
     *
     * @property _volume
     * @type Number
     * @default 1
     * @private
     */
    this._volume = 1;

    /**
     * The master volume of all the audio playing
     *
     * @property volume
     * @type Number
     * @default 1
     */
    Object.defineProperty(this, 'volume', {
        get: this.getVolume.bind(this),
        set: this.setVolume.bind(this)
    });

    /**
     * The Web Audio API context if we are using it
     *
     * @property ctx
     * @type AudioContext
     * @readOnly
     */
    this.ctx = gf.__audioctx;

    /**
     * If we have some way of playing audio
     *
     * @property canPlay
     * @type Boolean
     * @readOnly
     */
    this.canPlay = gf.support.webAudio || gf.support.htmlAudio;

    /**
     * The codecs that the browser supports
     *
     * @property codecs
     * @type Object<Boolean>
     * @readOnly
     */
    if(this.canPlay) {
        var audioTest = new Audio();

        this.codecs = {
            mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/,''),
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,''),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,''),
            wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/,''),
            m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/,''),
            webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,'')
        };
    }

    //if we are using web audio, we need a master gain node
    if(gf.support.webAudio) {
        this.masterGain = this.ctx.createGain ? this.ctx.createGain() : this.ctx.createGainNode();
        this.masterGain.gain.value = 1;
        this.masterGain.connect(this.ctx.destination);
    }

    //map of elements to play audio with
    this.sounds = {};
};

gf.inherits(gf.AudioManager, Object, {
    /**
     * Returns the current master volume
     *
     * @method getVolume
     */
    getVolume: function() {
        return this._volume;
    },
    /**
     * Sets the current master volume
     *
     * @method setVolume
     * @param value {Number}
     */
    setVolume: function(v) {
        v = parseFloat(v, 10);

        if(!isNaN(v) && v >= 0 && v <= 1) {
            this._volume = v;

            if(gf.support.webAudio)
                this.masterGain.gain.value = v;

            //go through each audio element and change their volume
            for(var key in this.sounds) {
                if(this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
                    var player = this.sounds[key];
                    //loop through the audio nodes
                    for(var i = 0, il = player._nodes.length; i < il; ++i) {
                        player._nodes[i].volume = player._volume * this._volume;
                    }
                }
            }
        }
    },
    /**
     * Mutes all playing audio
     *
     * @method mute
     */
    mute: function() {
        return this.setMuted(true);
    },
    /**
     * Unmutes all playing audio
     *
     * @method unmute
     */
    unmute: function() {
        return this.setMuted(false);
    },
    /**
     * Sets whether or not this manager is muted
     *
     * @method setMuted
     */
    setMuted: function(m) {
        this._muted = m = !!m;

        if(gf.support.webAudio)
            this.masterGain.gain.value = m ? 0 : this._volume;

        //go through each audio element and mute/unmute them
        for(var key in this.sounds) {
            if(this.sounds.hasOwnProperty(key) && this.sounds[key]._webAudio === false) {
                var player = this.sounds[key];
                //loop through the audio nodes
                for(var i = 0, il = player._nodes.length; i < il; ++i) {
                    player._nodes[i].mute();
                }
            }
        }

        return this;
    },
    attach: function(sound) {
        //TODO: check name collision
        this.sounds[sound.src] = sound;

        sound._manager = this;

        if(gf.support.webAudio) {
            for(var i = 0; i < sound._nodes.length; ++i) {
                sound._nodes[i].disconnect();
                sound._nodes[i].connect(this.masterGain);
            }
        }
    },
    /**
     * Creates a new audio player for a peice of audio
     *
     * @method create
     * @param [name] {String} An name to uniquely identify this audio, if omitted one will be ranomly chosen
     * @param settings {Object} All the settings for the audio player
     * @param settings.urls {Array<String>} All the url possible for this audio (so we can choose the one this browser supports)
     * @param [settings.volume] {Number} The volume of this audio clip
     * @param [settings.autoplay] {Boolean} Automatically start playing after loaded
     * @param [settings.loop] {Boolean} Replay the audio when it finishes
     * @param [settings.sprite] {Object} A map of string names -> [start, duration] arrays. You can use it to put multiple sounds in one file
     * @param [settings.pos3d] {Array<Number>} 3D coords of where the audio should sound as if it came from (only works with WebAudio)
     * @param [settings.buffer] {Boolean} WebAudio will load the entire file before playing, making this true forces HTML5Audio which will buffer and play
     * @param [settings.format] {String} Force an extension override
     * @return {AudioPlayer} Will return the new audio player, or false if we couldn't determine a compatible url
     */
    create: function(name, settings) {
        //if we can't play audio return false
        if(!this.canPlay) {
            return false;
        }

        //name is "optional"
        if(typeof name !== 'string') {
            settings = name;
            name = null;
        }

        //make up an ID if none was passed
        if(!name)
            name = Math.round(Date.now() * Math.random()) + '';

        var src;

        //loop through each source url and pick the first that is compatible
        for(var i = 0, il = settings.urls.length; i < il; ++i) {
            var url = settings.urls[i],
                ext;

            //if they pass a format override, use that
            if(settings.format) {
                ext = settings.format;
            }
            //otherwise extract the format from the url
            else {
                ext = url.match(/.+\.([^?]+)(\?|$)/);
                ext = (ext && ext.length >= 2) ? ext[1] : url.match(/data\:audio\/([^?]+);/)[1];
            }

            //if we can play this url, then set the source of the player
            if(this.codecs[ext]) {
                src = url;
                break;
            }
        }

        //check if we found a usable url, if not return false
        if(!src) {
            return false;
        }

        //check if we already created a player for this audio
        if(gf.assetCache[src])
            return gf.assetCache[src];

        settings.src = src;
        return this.sounds[name] = gf.assetCache[src] = new gf.AudioPlayer(this, settings);
    }
});
/**
 * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
 * The GF Audio API was based on
 * <a target="_blank" href="https://github.com/goldfire/howler.js">Howler.js</a>
 *
 * @class AudoPlayer
 * @extends Object
 * @uses gf.EventEmitter
 * @namespace gf
 * @constructor
 * @param manager {AudioManager} AudioManager instance for this audio player
 * @param settings {Object} All the settings for this player instance
 */
gf.AudioPlayer = function(manager, settings) {
    gf.EventEmitter.call(this);

    /**
     * The source of the audio, the actual URL to load up
     *
     * @property src
     * @type String
     */
    this.src = '';

    /**
     * Play the audio immediately after loading
     *
     * @property autoplay
     * @type Boolean
     * @default false
     */
    this.autoplay = false;

    /**
     * Buffer forces use of HTML5Audio which will buffer and play
     * instead of loading the entire file and then playing
     *
     * @property buffer
     * @type Boolean
     * @default false
     */
    this.buffer = false;

    /**
     * Override the format determined from the extension with this extension
     *
     * @property format
     * @type String
     * @default null
     */
    this.format = null;

    /**
     * Replay the audio immediately after finishing
     *
     * @property loop
     * @type Boolean
     * @default false
     */
    this.loop = false;

    /**
     * A 3D position where the audio should sound like it is coming from
     *
     * @property pos3d
     * @type Array<Number>
     * @default [0, 0, -0.5]
     */
    this.pos3d = [0, 0, -0.5];

    /**
     * A sound sprite that maps string keys to [start, duration] arrays. These can
     * be used to put multiple sound bits in one file, and play them separately
     *
     * @property sprite
     * @type Object
     * @default {}
     */
    this.sprite = {};

    /**
     * The volume of the audio player
     *
     * @property volume
     * @type Number
     * @default 1
     */
    Object.defineProperty(this, 'volume', {
        get: this.getVolume.bind(this),
        set: this.setVolume.bind(this)
    });

    this._volume = 1;
    this._duration = 0;
    this._loaded = false;
    this._manager = manager;
    this._canPlay = manager.canPlay;
    this._codecs = manager.codecs;
    this._webAudio = gf.support.webAudio && !this.buffer;
    this._nodes = [];
    this._onendTimer = [];

    //mixin user's settings
    gf.utils.setValues(this, settings);

    if(this._webAudio) {
        this._setupAudioNode();
    }

    this.load();
};

gf.inherits(gf.AudioPlayer, Object, {
    /**
     * Load the audio file for this player, this is called from the ctor
     * there is no reason to call it manually.
     *
     * @method load
     * @return {AudioPlayer}
     * @private
     */
    load: function() {
        //if using web audio, load up the buffer
        if(this._webAudio) {
            this.loadBuffer(this.src);
        }
        //otherwise create some Audio nodes
        else {
            //create a new adio node
            var node = new Audio();
            this._nodes.push(node);

            //setup the audio node
            node.src = this.src;
            node._pos = 0;
            node.preload = 'auto';
            node.volume = this._manager.muted ? 0 : this._volume * this._manager.volume;

            //setup the event listener to start playing the sound when it has buffered
            var self = this, evt = function() {
                self._duration = node.duration;

                //setup a default sprite
                self.sprite._default = [0, node.duration * 1000];

                //check if loaded
                if(!self._loaded) {
                    self._loaded = true;
                    self.emit('load', {
                        message: 'Audio file loaded.',
                        data: self.src
                    });
                }

                //if autoplay then start it
                if(self.autoplay) {
                    self.play();
                }

                //clear the event listener
                node.removeEventListener('canplaythrough', evt, false);
            };
            node.addEventListener('canplaythrough', evt, false);
            node.load();
        }

        return this;
    },
    /**
     * Play a sound from the current time (0 by default).
     *
     * @method play
     * @param [sprite] {String} Plays from the specified position in the sound sprite definition.
     * @param [callback] {Function} Returns the unique playback id for this sound instance.
     * @return {AudioPlayer}
     */
    play: function(sprite, cb) {
        var self = this;

        if(typeof sprite === 'function') {
            cb = sprite;
            sprite = null;
        }

        //if no sprite specified, use default
        if(!sprite) {
            sprite = '_default';
        }

        //if we haven't loaded yet, wait until we do
        if(!this._loaded) {
            this.on('load', function() {
                self.play(sprite, cb);
            });

            return this;
        }

        //if the sprite doesn't exist, play nothing
        if(!this.sprite[sprite]) {
            if(typeof cb === 'function') cb();
            return this;
        }

        //get an audio node to use to play
        this._inactiveNode(function(node) {
            var pos = node._pos > 0 ? node._pos : self.sprite[sprite][0] / 1000,
            duration = (self.sprite[sprite][1] / 1000) - node._pos,
            loop = (self.loop || self.sprite[sprite][2]),
            soundId = (typeof cb === 'string') ? cb : (Math.round(Date.now() * Math.random()) + ''),
            timerId;

            node._sprite = sprite;

            //after the audio finishes:
            (function(o) {
                timerId = setTimeout(function() {
                    //if looping restsart it
                    if(!self._webAudio && o.loop) {
                        self.stop(o.id, o.timer).play(o.sprite, o.id);
                    }

                    // set web audio node to paused
                    if(self._webAudio && !o.loop) {
                        self._nodeById(o.id).paused = true;
                    }

                    //end the track if it is HTML audio and a sprite
                    if(!self._webAudio && !o.loop) {
                        self.stop(o.id, o.timer);
                    }

                    //fire off the end event
                    self.emit('end', {
                        message: 'Audio has finished playing',
                        data: o.id
                    });
                }, duration * 1000);

                //store the timer
                self._onendTimer.push(timerId);

                //remember which timer to kill
                o.timer = timerId;
            })({
                id: soundId,
                sprite: sprite,
                loop: loop
            });

            //setup webAudio functions
            if(self._webAudio) {
                //set the play id to this node and load into context
                node.id = soundId;
                node.paused = false;
                self.refreshBuffer([loop, pos, duration], soundId);
                self._playStart = self._manager.ctx.currentTime;
                node.gain.value = self._volume;

                if(typeof node.bufferSource.start === 'undefined') {
                    node.bufferSource.noteGrainOn(0, pos, duration);
                } else {
                    node.bufferSource.start(0, pos, duration);
                }
            } else {
                if(node.readyState === 4) {
                    node.id = soundId;
                    node.currentTime = pos;
                    node.muted = self._manager.muted;
                    node.volume = self._volume * self._manager.volume;
                    node.play();
                } else {
                    self._clearEndTimer(timerId);

                    (function() {
                        var sound = self,
                            playSpr = sprite,
                            fn = cb,
                            newNode = node;

                        var evt = function() {
                            sound.play(playSpr, fn);

                            //clear listener
                            newNode.removeEventListener('canplaythrough', evt, false);
                        };
                        newNode.addEventListener('canplaythrough', evt, false);
                    })();

                    return self;
                }
            }

            self.emit('play', {
                message: 'Playing audio file',
                data: soundId
            });

            if(typeof cb === 'function')
                cb(soundId);
        });

        return this;
    },
    /**
     * Pause playback and save the current position.
     *
     * @method pause
     * @param [id] {String} The play instance ID.
     * @param [timerId] {String} Clear the correct timeout ID.
     * @return {AudioPlayer}
     */
    pause: function(id, timerId) {
        var self = this;

        //if we haven't loaded this sound yet, wait until we play it to pause it
        if(!this._loaded) {
            this.on('play', function() {
                self.play(id);
            });

            return this;
        }

        //clear the onend timer
        this._clearEndTimer(timerId || 0);

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                //ensure the sound was created
                if(!activeNode.bufferSource)
                    return this;

                activeNode.paused = true;
                activeNode._pos += this._manager.ctx.currentTime - this._playStart;

                if(typeof activeNode.bufferSource.stop === 'undefined') {
                    activeNode.bufferSource.noteOff(0);
                } else {
                    activeNode.bufferSource.stop(0);
                }
            } else {
                activeNode._pos = activeNode.currentTime;
                activeNode.pause();
            }
        }

        this.emit('pause', {
            message: 'Audio file paused',
            data: id
        });

        return this;
    },
    /**
     * Stop playback and reset to start.
     *
     * @method stop
     * @param [id] {String} The play instance ID.
     * @param [timerId] {String} Clear the correct timeout ID.
     * @return {AudioPlayer}
     */
    stop: function(id, timerId) {
        var self = this;

        //if we haven't loaded this sound yet, wait until we play it to stop it
        if(!this._loaded) {
            this.on('play', function() {
                self.stop(id);
            });

            return this;
        }

        //clear onend timer
        this._clearEndTimer(timerId || 0);

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            activeNode._pos = 0;

            if(this._webAudio) {
                if(!activeNode.bufferSource)
                    return this;

                activeNode.paused = true;

                if(typeof activeNode.bufferSource.stop === 'undefined') {
                    activeNode.bufferSource.noteOff(0);
                } else {
                    activeNode.bufferSource.stop(0);
                }
            } else {
                activeNode.pause();
                activeNode.currentTime = 0;
            }
        }

        return this;
    },
    /**
     * Mute this sound.
     *
     * @method mute
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer}
     */
    mute: function(id) {
        return this.setMuted(true, id);
    },
    /**
     * Unmute this sound.
     *
     * @method unmute
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer}
     */
    unmute: function(id) {
        return this.setMuted(false, id);
    },
    /**
     * Set the muted state of this sound.
     *
     * @method setMuted
     * @param muted {Boolean}
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer}
     */
    setMuted: function(muted, id) {
        var self  = this;

        //if we haven't loaded this sound yet, wait until we play it to mute it
        if(!this._loaded) {
            this.on('play', function() {
                self.setMuted(muted, id);
            });

            return this;
        }

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                activeNode.gain.value = muted ? 0 : this._volume;
            } else {
                activeNode.volume =  muted ? 0 : this._volume;
            }
        }

        return this;
    },
    /**
     * Set the position of playback.
     *
     * @method seek
     * @param pos {Number} The position to move current playback to.
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer}
     */
    seek: function(pos, id) {
        var self = this;

        //if we haven't loaded this sound yet, wait until it is to seek it
        if(!this._loaded) {
            this.on('load', function() {
                self.seek(pos);
            });

            return this;
        }

        //if position is < 0, or invalid, then set to 0
        if(!pos || pos < 0)
            pos = 0;

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                activeNode._pos = pos;
                this.pause(activeNode.id).play(activeNode._sprite, id);
            } else {
                activeNode.currentTime = pos;
            }
        }

        return this;
    },
    /**
     * Get the position of playback.
     *
     * @method getPosition
     * @param [id] {String} The play instance ID.
     * @return {Number}
     */
    getPosition: function(id) {
        var self = this;

        //if we haven't loaded this sound yet, wait until it is to seek it
        if(!this._loaded) {
            this.on('load', function() {
                self.getPosition(id);
            });

            return this;
        }

        var activeNode = id ? this._nodeById(id) : this._activeNode();
        if(activeNode) {
            if(this._webAudio) {
                return activeNode._pos + (this._manager.ctx.currentTime - this._playStart);
            } else {
                return activeNode.currentTime;
            }
        }

        return 0;
    },
    /**
     * Fade a currently playing sound between two volumes.
     *
     * @method fade
     * @param from {Number} The volume to fade from (0.0 to 1.0).
     * @param to {Number} The volume to fade to (0.0 to 1.0).
     * @param len {Number} Time in milliseconds to fade.
     * @param [id] {String} The play instance ID.
     * @param [callback] {Function} Fired when the fade is complete.
     * @return {AudioPlayer}
     */
    fade: function(from, to, len, id, cb) {
        var self = this,
            diff = Math.abs(from - to),
            dir = from > to ? 'dowm' : 'up',
            steps = diff / 0.01,
            stepTime = len / steps;

        if(typeof id === 'function') {
            cb = id;
            id = null;
        }

        //if we haven't loaded this sound yet, wait until it is to seek it
        if(!this._loaded) {
            this.on('load', function() {
                self.fade(from, to, len, id, cb);
            });

            return this;
        }

        this.setVolume(from, id);

        for(var i = 1; i <= steps; ++i) {
            var change = this._volume + ((dir === 'up' ? 0.01 : -0.01) * i),
                vol = Math.round(1000 * change) / 1000,
                wait = stepTime * i;

            this._doFadeStep(vol, wait, to, id, cb);
        }
    },
    /**
     * Returns the current volume of the player
     *
     * @method getVolume
     * @return {Number} The current volume
     */
    getVolume: function() {
        return this._volume;
    },
    /**
     * Sets the current volume of the player
     *
     * @method setVolume
     * @param vol {Number} The current volume
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer}
     */
    setVolume: function(vol, id) {
        var self = this;

        // make sure volume is a number
        vol = parseFloat(vol);

        //if we haven't loaded this sound yet, wait until we play it to change the volume
        if(!this._loaded) {
            this.on('play', function() {
                self.setVolume(vol, id);
            });

            return this;
        }

        //set the volume
        if(vol >= 0 && vol <= 1) {
            this._volume = vol;

            var activeNode = id ? this._nodeById(id) : this._activeNode();
            if(activeNode) {
                if(this._webAudio) {
                    activeNode.gain.volume = vol;
                } else {
                    activeNode.volume = vol * this._manager.volume;
                }
            }
        }

        return this;
    },
    /**
     * Set the 3D position of the audio source.
     * The most common usage is to set the 'x' position
     * to affect the left/right ear panning. Setting any value higher than
     * 1.0 will begin to decrease the volume of the sound as it moves further away.
     * NOTE: This only works with Web Audio API, HTML5 Audio playback
     * will not be affected.
     *
     * @method setPosition
     * @param x {Number} The x-position of the playback from -1000.0 to 1000.0
     * @param y {Number} The y-position of the playback from -1000.0 to 1000.0
     * @param z {Number} The z-position of the playback from -1000.0 to 1000.0
     * @param [id] {String} The play instance ID.
     * @return {AudioPlayer}
     */
    setPosition: function(x, y, z, id) {
        var self = this;

        //set a default for the optional 'y' and 'z'
        x = !x ? 0 : x;
        y = !y ? 0 : y;
        z = (!z && z !== 0) ? -0.5 : z;

        //if we haven't loaded this sound yet, wait until we play it to change the position
        if(!this._loaded) {
            this.on('play', function() {
                self.setPosition(x, y, z, id);
            });

            return this;
        }

        if(this._webAudio) {
            var activeNode = id ? this._nodeById(id) : this._activeNode();
            if(activeNode) {
                this.pos3d[0] = x;
                this.pos3d[1] = y;
                this.pos3d[2] = z;
                activeNode.panner.setPosition(x, y, z);
            }
        }

        return this;
    },
    /**
     * Performs a step in the fade transition
     *
     * @method _doFadeStep
     * @private
     */
    _doFadeStep: function(vol, wait, end, id, cb) {
        var self = this;

        setTimeout(function() {
            self.setVolume(vol, id);

            if(vol === end) {
                if(typeof cb === 'function')
                    cb();
            }
        }, wait);
    },
    /**
     * Get an audio node by ID.
     *
     * @method _nodeById
     * @return {AudioPlayer} Audio node.
     * @private
     */
    _nodeById: function(id) {
        var node = this._nodes[0]; //default return value

        //find the node with this ID
        for(var i = 0, il = this._nodes.length; i < il; ++i) {
            if(this._nodes[i].id === id) {
                node = this._nodes[i];
                break;
            }
        }

        return node;
    },
    /**
     * Get the first active audio node.
     *
     * @method _activeNode
     * @return {AudioPlayer} Audio node.
     * @private
     */
    _activeNode: function() {
        var node;

        //find the first playing node
        for(var i = 0, il = this._nodes.length; i < il; ++i) {
            if(!this._nodes[i].paused) {
                node = this._nodes[i];
                break;
            }
        }

        //remove excess inactive nodes
        this._drainPool();

        return node;
    },
    /**
     * Get the first inactive audio node.
     * If there is none, create a new one and add it to the pool.
     *
     * @method _inactiveNode
     * @param cb {Function} callback Function to call when the audio node is ready.
     * @private
     */
    _inactiveNode: function(cb) {
        var node;

        //find first inactive node to recycle
        for(var i = 0, il = this._nodes.length; i < il; ++i) {
            if(this._nodes[i].paused && this._nodes[i].readyState === 4) {
                cb(node = this._nodes[i]);
                break;
            }
        }

        //remove excess inactive nodes
        this._drainPool();

        if(node) return;

        //create new node if there are no inactives
        if(this._webAudio) {
            node = this._setupAudioNode();
            cb(node);
        } else {
            this.load();
            node = this._nodes[this.nodes.length - 1];
            node.addEventListener('loadedmetadata', function() {
                cb(node);
            });
        }
    },
    /**
     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
     *
     * @method _drainPool
     * @private
     */
    _drainPool: function() {
        var inactive = 0,
            i = 0, il = 0;

        //count inactive nodes
        for(i = 0, il = this._nodes.length; i < il; ++i) {
            if(this._nodes[i].paused) {
                inactive++;
            }
        }

        //remove excess inactive nodes
        for(i = this._nodes.length; i >= 0; --i) {
            if(inactive <= 5)
                break;

            if(this._nodes[i].paused) {
                inactive--;
                this._nodes.splice(i, 1);
            }
        }
    },
    /**
     * Clear 'onend' timeout before it ends.
     *
     * @method _clearEndTimer
     * @param timerId {Number} timerId The ID of the sound to be cancelled.
     * @private
     */
    _clearEndTimer: function(timerId) {
        var timer = this._onendTimer.indexOf(timerId);

        //make sure the timer is cleared
        timer = timer >= 0 ? timer : 0;

        if(this._onendTimer[timer]) {
            clearTimeout(this._onendTimer[timer]);
            this._onendTimer.splice(timer, 1);
        }
    },
    /**
     * Setup the gain node and panner for a Web Audio instance.
     *
     * @method _setupAudioNode
     * @return {Object} The new audio node.
     * @private
     */
    _setupAudioNode: function() {
        var node = this._nodes,
            i = this._nodes.length;

        //create gain node
        node.push((typeof this._manager.ctx.createGain === 'undefined') ? this._manager.ctx.createGainNode : this._manager.ctx.createGain());
        node[i].gain.value = this._volume;
        node[i].paused = true;
        node[i]._pos = 0;
        node[i].readyState = 4;
        node[i].connect(this._manager.masterGain);

        //create the panner
        node[i].panner = this._manager.ctx.createPanner();
        node[i].panner.setPosition(this.pos3d[0], this.pos3d[1], this.pos3d[2]);
        node[i].panner.connect(node[i]);

        return node[i];
    }
});

//define some prototype functions that are only available when using the WebAudio API
if(gf.support.webAudio) {
    /**
     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
     *
     * @method loadBuffer
     * @param url {String} The path to the sound file.
     * @private
     */
    gf.AudioPlayer.prototype.loadBuffer = function(url) {
        //load from cache
        if(url in gf.assetCache) {
            this._duration = gf.assetCache[url].duration;
            this.loadSound();
        } else {
            //load the buffer from the URL
            var self = this;

            gf.utils.ajax({
                method: 'GET',
                url: url,
                dataType: 'arraybuffer',
                load: function(data) {
                    //decode the buffer into an audio source
                    self._manager.ctx.decodeAudioData(data, function(buffer) {
                        if(buffer) {
                            gf.assetCache[url] = buffer;
                            self.loadSound(buffer);
                        }
                    });
                },
                error: function() {
                    //if there was an error, switch to HTML Audio
                    if(self._webAudio) {
                        self._buffer = true;
                        self._webAudio = false;
                        self._nodes = [];
                        self.load();
                    }
                }
            });
        }
    };

    /**
     * Finishes loading the Web Audio API sound and fires the loaded event
     *
     * @method loadSound
     * @param buffer {Object} The decoded buffer sound source.
     * @private
     */
    gf.AudioPlayer.prototype.loadSound = function(buffer) {
        this._duration = buffer ? buffer.duration : this._duration;

        //setup a default sprite
        this.sprite._default = [0, this._duration * 1000];

        //fire the load event
        if(!this._loaded) {
            this._loaded = true;
            this.emit('load', {
                message: 'Audio file loaded.',
                data: this.src
            });
        }

        //autoplay is appropriate
        if(this.autoplay) {
            this.play();
        }
    };

    /**
     * Load the sound back into the buffer source.
     *
     * @method refreshBuffer
     * @param loop {Array} Loop boolean, pos, and duration.
     * @param [id] {String} The play instance ID.
     * @private
     */
    gf.AudioPlayer.prototype.refreshBuffer = function(loop, id) {
        var node = this._nodeById(id);

        //setup the buffer source for playback
        node.bufferSource = this._manager.ctx.createBufferSource();
        node.bufferSource.buffer = gf.assetCache[this.src];
        node.bufferSource.connect(node.panner);
        node.bufferSource.loop = loop[0];

        if(loop[0]) {
            node.bufferSource.loopStart = loop[1];
            node.bufferSource.loopEnd = loop[1] + loop[2];
        }
    };
}
/**
 * The base display object, that anything being put on the screen inherits from
 *
 * @class DisplayObjectContainer
 * @extends <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/DisplayObjectContainer.html">PIXI.DisplayObjectContainer</a>
 * @uses gf.EventEmitter
 * @uses gf.PhysicsTarget
 * @namespace gf
 * @constructor
 */
gf.DisplayObjectContainer = function(settings) {
    PIXI.DisplayObjectContainer.call(this);
    gf.PhysicsTarget.call(this);
    gf.EventEmitter.call(this);

    //mixin user's settings
    gf.utils.setValues(this, settings);

    //Add these properties in so that all objects can see them in the docs
    //these properties are inherited from PIXI.DisplayObjectContainer
    //most of these blocks are copied straight from PIXI source

    /**
     * [read-only] The of children of this object.
     * @property children {Array}
     * @readOnly
     */

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     * @property position
     * @type Point
     */

    /**
     * The scale factor of the object.
     *
     * @property scale
     * @type Point
     */

    /**
     * The rotation of the object in radians.
     *
     * @property rotation
     * @type Number
     */

    /**
     * The opacity of the object.
     *
     * @property alpha
     * @type Number
     */

    /**
     * The visibility of the object.
     *
     * @property visible
     * @type Boolean
     */

    /**
     * [read-only] The display object that contains this display object.
     *
     * @property parent
     * @type DisplayObject
     * @readOnly
     */

    /**
     * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
     *
     * @property stage
     * @type Stage
     * @readOnly
     */

    /**
     * This is the defined area that will pick up mouse / touch events. It is null by default.
     * Setting it is a neat way of optimising the hitTest function that the interactionManager
     * will use (as it will not need to hit test all the children)
     *
     * @property hitArea
     * @type Rectangle|Polygon|Circle|Ellipse
     */

    /**
     * Wether or not the object will handle mouse events
     *
     * @property interactive
     * @type Boolean
     * @default false
     */

    /**
     * Inherited Methods
     */

    /**
     * Adds a child to the object.
     *
     * @method addChild
     * @param child {DisplayObject}
     */

    /**
     * Adds a child to the object at a specified index. If the index is out of bounds an error will be thrown
     *
     * @method addChildAt
     * @param child {DisplayObject}
     * @param index {Number}
     */

    /**
     * Removes a child from the object.
     *
     * @method removeChild
     * @param child {DisplayObject}
     */
};

gf.inherits(gf.DisplayObjectContainer, PIXI.DisplayObjectContainer, {
    /**
     * Base resize function, all this does is ensure that all children resize functions get called as well
     *
     * @method resize
     */
    resize: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.resize)
                o.resize.apply(o, arguments);
        }
    },

    /**
     * Removes this object from the stage and the physics system
     *
     * @method destroy
     */
    destroy: function() {
        this.disablePhysics();

        if(this.parent)
            this.parent.removeChild(this);
    }
});

//Add event echos
['click', 'mousedown', 'mouseup', 'mouseupoutside', 'mouseover', 'mouseout', 'mousemove', 'tap', 'touchstart', 'touchend', 'touchendoutside'].forEach(function(evtname) {
    gf.DisplayObjectContainer.prototype[evtname] = function(e) {
        this.emit(evtname, e);
    };
});

/*
 * MOUSE Callbacks
 */

/**
 * A callback that is used when the users clicks on the displayObject with their mouse
 *
 * @event click
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user clicks the mouse down over the displayObject
 *
 * @event mousedown
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the displayObject
 * for this callback to be fired the mouse must have been pressed down over the displayObject
 *
 * @event mouseup
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
 * for this callback to be fired, The touch must have started over the displayObject
 *
 * @event mouseupoutside
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse rolls over the displayObject
 *
 * @event mouseover
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse leaves the displayObject
 *
 * @event mouseout
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user moves the mouse while over the displayObject
 *
 * @event mousemove
 * @param interactionData {InteractionData}
 */

/*
 * TOUCH Callbacks
 */

/**
 * A callback that is used when the users taps on the displayObject with their finger
 * basically a touch version of click
 *
 * @event tap
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user touch's over the displayObject
 *
 * @event touchstart
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases a touch over the displayObject
 *
 * @event touchend
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the touch that was over the displayObject
 * for this callback to be fired, The touch must have started over the displayObject
 *
 * @event touchendoutside
 * @param interactionData {InteractionData}
 */
/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @class Sprite
 * @extends <a target="_blank" href="http://www.goodboydigital.com/pixijs/docs/classes/Sprite.html">PIXI.Sprite</a>
 * @uses gf.EventEmitter
 * @uses gf.PhysicsTarget
 * @namespace gf
 * @constructor
 * @param texture {Texture} The texture to set the sprite to
 * @example
 *      var spr = new gf.Sprite(texture);
 */
gf.Sprite = function(tx) {
    PIXI.Sprite.call(this, tx);
    gf.PhysicsTarget.call(this);
    gf.EventEmitter.call(this);

    /**
     * The type of the sprite
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.Sprite.TYPE.NEUTRAL;
};

gf.inherits(gf.Sprite, PIXI.Sprite, {
    /**
     * Removes this sprite from the stage and the physics system
     *
     * @method destroy
     */
    destroy: function() {
        this.disablePhysics();

        if(this.parent)
            this.parent.removeChild(this);
    }
});

/**
 * Sprite types
 *
 * @property TYPE
 * @type Object
 * @static
 */
gf.Sprite.TYPE = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    FRIENDLY: 'friendly',
    NEUTRAL: 'neutral',
    COLLECTABLE: 'collectable',
    TILE: 'tile'
};

//Add event echos
['click', 'mousedown', 'mouseup', 'mouseupoutside', 'mouseover', 'mouseout', 'mousemove', 'tap', 'touchstart', 'touchend', 'touchendoutside'].forEach(function(evtname) {
    gf.Sprite.prototype[evtname] = function(e) {
        this.emit(evtname, e);
    };
});

/*
 * MOUSE Callbacks
 */

/**
 * A callback that is used when the users clicks on the sprite with their mouse
 *
 * @event click
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user clicks the mouse down over the sprite
 *
 * @event mousedown
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite
 * for this callback to be fired the mouse must have been pressed down over the sprite
 *
 * @event mouseup
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the mouse that was over the sprite but is no longer over the sprite
 * for this callback to be fired, The touch must have started over the sprite
 *
 * @event mouseupoutside
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse rolls over the sprite
 *
 * @event mouseover
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the users mouse leaves the sprite
 *
 * @event mouseout
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user moves the mouse while over the sprite
 *
 * @event mousemove
 * @param interactionData {InteractionData}
 */

/*
 * TOUCH Callbacks
 */

/**
 * A callback that is used when the users taps on the sprite with their finger
 * basically a touch version of click
 *
 * @event tap
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user touch's over the sprite
 *
 * @event touchstart
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases a touch over the sprite
 *
 * @event touchend
 * @param interactionData {InteractionData}
 */

/**
 * A callback that is used when the user releases the touch that was over the sprite
 * for this callback to be fired, The touch must have started over the sprite
 *
 * @event touchendoutside
 * @param interactionData {InteractionData}
 */
/**
 * The base AnimatedSprite class
 *
 * @class AnimatedSprite
 * @extends gf.Sprite
 * @namespace gf
 * @constructor
 * @param animations {Object} An object of the form `{ animationName: [frame1, frame2] }` or you can also specify overrides on a per-animation basis:
 *      `{ animationName: { frames: [frame1, frame2], speed: 2 } }`. Each frame is a Texture object
 * @param [speed] {Number} The speed of the animations (can be overriden on a specific animations)
 * @param [start] {String} The animation to start with, defaults to the first found key otherwise
 */
gf.AnimatedSprite = function(anims, speed, start) {
    if(anims instanceof Array) {
        anims = { _default: { frames: anims } };
        start = '_default';
    } else {
        //massage animations into full format
        for(var a in anims) {
            if(start === undefined)
                start = a;

            var anim = anims[a];

            if(anim instanceof Array)
                anims[a] = { frames: anim };
            else if(anim instanceof gf.Texture)
                anims[a] = { frames: [anim] };
        }
    }

    gf.Sprite.call(this, anims[start].frames[0]);

    /**
     * The animation speed for this sprite
     *
     * @property speed
     * @type Number
     * @default 1
     */
    this.speed = speed || 1;

    /**
     * Whether or not to loop the animations. This can be overriden
     * on a per-animation level
     *
     * @property loop
     * @type Boolean
     * @default false
     */
    this.loop = false;

    /**
     * The registerd animations for this AnimatedSprite
     *
     * @property animations
     * @type Object
     * @readOnly
     */
    this.animations = anims;

    /**
     * The currently playing animation
     *
     * @property currentAnimation
     * @type String
     * @readOnly
     */
    this.currentAnimation = start;

    /**
     * The current frame being shown
     *
     * @property currentFrame
     * @type Number
     * @readOnly
     */
    this.currentFrame = 0;

    /**
     * Whether or not the animation is currently playing
     *
     * @property playing
     * @type Boolean
     * @readOnly
     */
    this.playing = false;
};

gf.inherits(gf.AnimatedSprite, gf.Sprite, {
    /**
     * Adds a new animation to this animated sprite
     *
     * @method addAnimation
     * @param name {String} The string name of the animation
     * @param frames {Array<Texture>} The array of texture frames
     * @param [speed] {Number} The animation speed
     * @param [loop] {Boolean} Loop the animation or not
     */
    addAnimation: function(name, frames, speed, loop) {
        if(typeof name === 'object') {
            this.animations[name.name] = name;
        } else {
            this.animations[name] = {
                name: name,
                frames: frames,
                speed: speed,
                loop: loop
            };
        }
    },
    /**
     * Goes to a frame and starts playing the animation from there
     *
     * @method gotoAndPlay
     * @param [name] {String} The string name of the animation to play
     * @param frame {Number} The index of the frame to start on
     */
    gotoAndPlay: function(anim, frame) {
        if(typeof anim === 'number') {
            this.currentFrame = anim;
        } else {
            this.currentFrame = frame || 0;
            this.lastRound = gf.math.round(frame || 0);
            this.currentAnimation = anim;
        }
        this.playing = true;

        this.setTexture(this.animations[this.currentAnimation].frames[this.currentFrame]);
        this.emit('frame', this.currentAnimation, this.lastRound);
    },
    /**
     * Goes to a frame and stops playing the animation
     *
     * @method gotoAndStop
     * @param [name] {String} The string name of the animation to go to
     * @param frame {Number} The index of the frame to stop on
     */
    gotoAndStop: function(anim, frame) {
        if(typeof anim === 'number') {
            this.currentFrame = anim;
        } else {
            this.currentFrame = frame || 0;
            this.lastRound = gf.math.round(frame || 0);
            this.currentAnimation = anim;
        }
        this.playing = false;

        this.setTexture(this.animations[this.currentAnimation].frames[this.currentFrame]);
        this.emit('frame', this.currentAnimation, this.lastRound);
    },
    /**
     * Starts playing the currently active animation
     *
     * @method play
     */
    play: function() {
        this.playing = true;
    },
    /**
     * Stops playing the currently active animation
     *
     * @method stop
     */
    stop: function() {
        this.playing = false;
    },
    /**
     * Called by PIXI to update our textures and do the actual animation
     *
     * @method updateTransform
     * @private
     */
    updateTransform: function() {
        gf.Sprite.prototype.updateTransform.call(this);

        if(!this.playing) return;

        var anim = this.animations[this.currentAnimation],
            round,
            loop = anim.loop !== undefined ? anim.loop : this.loop;

        this.currentFrame += anim.speed || this.speed;
        round = gf.math.round(this.currentFrame);

        if(round < anim.frames.length) {
            if(round !== this.lastRound) {
                this.lastRound = round;
                this.setTexture(anim.frames[round]);
                this.emit('frame', this.currentAnimation, round);
            }
        }
        else {
            if(loop) {
                this.gotoAndPlay(0);
            } else {
                this.stop();
                this.emit('complete', this.currentAnimation);
            }
        }
    }
});
/**
 * A basic Camera object that provides some effects. It also will contain the HUD and GUI
 * to ensure they are using "screen-coords".
 *
 * @class Camera
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param game {gf.Game} The game this camera belongs to
 * @param settings {Object} Any settings you want to override the default properties with
 */
gf.Camera = function(game, settings) {
    /**
     * The bounds of that the camera can move to
     *
     * @property bounds
     * @type gf.Rectangle
     * @readOnly
     * @private
     */
    this._bounds = new gf.Rectangle(0, 0, 0, 0);

    /**
     * When following a sprite this is the space within the camera that it can move around
     * before the camera moves to track it.
     *
     * @property _deadzone
     * @type gf.Rectangle
     * @readOnly
     * @private
     */
    this._deadzone = null;

    /**
     * The target that the camera will follow
     *
     * @property _target
     * @type gf.Sprite
     * @readOnly
     * @private
     */
    this._target = null;

    /**
     * The size of the camera
     *
     * @property size
     * @type gf.Vector
     * @readOnly
     */
    this.size = new gf.Vector(0, 0);

    /**
     * Half of the size of the camera
     *
     * @property hSize
     * @type gf.Vector
     * @readOnly
     */
    this.hSize = new gf.Vector(0, 0);

    /**
     * The game this camera views
     *
     * @property game
     * @type gf.Game
     * @readOnly
     */
    this.game = game;

    /**
     * The fxpools for doing camera effects
     *
     * @property fxpools
     * @type Object
     * @private
     * @readOnly
     */
    this.fxpools = {
        flash: new gf.ObjectPool(gf.Camera.fx.Flash, this),
        fade: new gf.ObjectPool(gf.Camera.fx.Fade, this),
        shake: new gf.ObjectPool(gf.Camera.fx.Shake, this),
        scanlines: new gf.ObjectPool(gf.Camera.fx.Scanlines, this),
        close: new gf.ObjectPool(gf.Camera.fx.Close, this)
    };

    gf.DisplayObjectContainer.call(this, settings);

    /*
     * Dynamic addition of fx shortcuts
    var self = this;
    Object.keys(this.fxpools).forEach(function(key) {
        self[key] = function() {
            var e = self.fxpools[key].create(),
                args = Array.prototype.slice.call(arguments),
                cb = args.pop();

            if(typeof cb !== 'function')
                args.push(cb);

            args.push(function() {
                self.fxpools[key].free(e);
                if(typeof cb === 'function')
                    cb();
            });

            return e.start.apply(e, args);
        };
    });
    */
};

gf.inherits(gf.Camera, gf.DisplayObjectContainer, {
    _fxCallback: function(fx, type, cb) {
        var ret;

        if(typeof cb === 'function')
            ret = cb();

        this.fxpools[type].free(fx);

        return ret;
    },
    /**
     * Makes the camera flash with a certain color
     *
     * @method flash
     * @param [color=0xffffff] {Number} The color to flash the screen with
     * @param [duration=1000] {Number} The time in milliseconds to fade away
     * @param [alpha=1] {Number} The max opacity to start at (before fading away)
     * @param [callback] {Function} The callback to call when the flash has completed
     * @return {gf.Camera.fx.Flash} Returns the effect object
     */
    flash: function(color, duration, alpha, cb) {
        var flash = this.fxpools.flash.create();

        return flash.start(color, duration, alpha, this._fxCallback.bind(this, flash, 'flash', cb));
    },
    /**
     * Makes the camera fade into a color
     *
     * @method fade
     * @param [color=0xffffff] {Number} The color to fade into
     * @param [duration=1000] {Number} The time in milliseconds to take to fade in
     * @param [alpha=1] {Number} The max opacity to get to
     * @param [callback] {Function} The callback to call when the fade has completed
     * @return {gf.Camera.fx.Fade} Returns the effect object
     */
    fade: function(color, duration, alpha, cb) {
        var fade = this.fxpools.fade.create();

        return fade.start(color, duration, alpha, this._fxCallback.bind(this, fade, 'fade', cb));
    },
    /**
     * Shakes the camera around a bit, to show it who is boss.
     *
     * @method shake
     * @param [intensity=0.01] {Number} How hard to shake around
     * @param [duration=1000] {Number} The time in milliseconds to shake for
     * @param [direction=gf.Camera.DIRECTION.BOTH] {gf.Camera.DIRECTION} The axes to shake the camera in default is gf.Camera.SHAKE.BOTH
     * @param [callback] {Function} The callback to call when the shaking has stopped
     * @return {gf.Camera.fx.Shake} Returns the effect object
     */
    shake: function(intensity, duration, direction, cb) {
        var shake = this.fxpools.shake.create();

        return shake.start(intensity, duration, direction, this._fxCallback.bind(this, shake, 'shake', cb));
    },
    /**
     * Adds a mask that will hide the world via a close-in transition.
     *
     * @method scanlines
     * @param [shape='circle'] {String} The shape of the transition, either 'circle' or 'rectangle' or 'ellipse'
     * @param [duration=1000] {Number} The time in milliseconds it takes to close the transition
     * @param [position] {gf.Point|gf.Vector} The position to center on, defaults to the center of the screen
     * @return {gf.Camera.fx.Close} Returns the effect object
     */
    close: function(shape, duration, position, cb) {
        var close = this.fxpools.close.create();

        return close.start(shape, duration, position, this._fxCallback.bind(this, close, 'close', cb));
    },
    /**
     * Shows scanlines accross the screen, retro arcade style
     *
     * @method scanlines
     * @param [color=0x000000] {Number} The hex color the lines should be
     * @param [direction=gf.Camera.DIRECTION.HORIZONTAL] {gf.Camera.DIRECTION} The axes to shake the camera in default is gf.Camera.SHAKE.BOTH
     * @param [spacing=4] {Number} The spacing between each line
     * @param [thickness=1] {Number} The thickness of each line
     * @param [alpha=0.3] {Number} The alpha of each line
     * @return {gf.Camera.fx.Scanlines} Returns the effect object
     */
    scanlines: function(color, direction, spacing, thickness, alpha) {
        var scanlines = this.fxpools.scanlines.create();

        return scanlines.start(color, direction, spacing, thickness, alpha);
    },
    /**
     * Follows an sprite with the camera, ensuring they are always center view. You can
     * pass a follow style to change the area an sprite can move around in before we start
     * to move with them.
     *
     * @method follow
     * @param sprite {gf.Sprite} The sprite to follow
     * @param [style=gf.Camera.FOLLOW.LOCKON] {gf.Camera.FOLLOW} The style of following
     * @return {gf.Camera} Returns iteself for chainability
     */
    follow: function(spr, style) {
        if(!(spr instanceof gf.Sprite))
            return this;

        this._target = spr;

        switch(style) {
            case gf.Camera.FOLLOW.PLATFORMER:
                var w = this.size.x / 8;
                var h = this.size.y / 3;
                this._deadzone = new gf.Rectangle(
                    (this.size.x - w) / 2,
                    (this.size.y - h) / 2 - (h / 4),
                    w,
                    h
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN:
                var sq4 = Math.max(this.size.x, this.size.y) / 4;
                this._deadzone = new gf.Rectangle(
                    (this.size.x - sq4) / 2,
                    (this.size.y - sq4) / 2,
                    sq4,
                    sq4
                );
                break;
            case gf.Camera.FOLLOW.TOPDOWN_TIGHT:
                var sq8 = Math.max(this.size.x, this.size.y) / 8;
                this._deadzone = new gf.Rectangle(
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

        this.focusSprite(this._target);

        return this;
    },
    /**
     * Stops following any sprites
     *
     * @method unfollow
     * @return {gf.Camera} Returns iteself for chainability
     */
    unfollow: function() {
        this._target = null;
        return this;
    },
    /**
     * Focuses the camera on a sprite.
     *
     * @method focusSprite
     * @param sprite {gf.Sprite} The sprite to focus on
     * @return {gf.Camera} Returns iteself for chainability
     */
    focusSprite: function(spr) {
        return this.focus(
            gf.math.round(spr.position.x) * this.game.world.scale.x,
            gf.math.round(spr.position.y) * this.game.world.scale.y
        );
    },
    /**
     * Focuses the camera on an x,y position. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method focus
     * @param x {Number|gf.Point} The x coord to focus on, if a Point is passed the y param is ignored
     * @param y {Number} The y coord to focus on
     * @return {gf.Camera} Returns iteself for chainability
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
    /**
     * Pans the camera around by the x,y amount. Ensures that the camera does
     * not go outside the bounds set with setBounds()
     *
     * @method pan
     * @param x {Number|gf.Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {gf.Camera} Returns iteself for chainability
     */
    pan: function(dx, dy) {
        dy = dx instanceof gf.Point ? dx.y : (dy || 0);
        dx = dx instanceof gf.Point ? dx.x : (dx || 0);

        if(!dx && !dy) return;

            //world position
        var pos = this.game.world.position,
            //new world position
            newX = pos.x - dx,
            newY = pos.y - dy,
            b = this._bounds;

        if(this._bounds) {
            if(this._outsideBounds(-newX, -pos.y))
                dx = dx < 0 ? b.x + pos.x : (b.x + b.width) - this.size.x + pos.x; //how far can we move since dx is too much
            if(this._outsideBounds(-pos.x, -newY))
                dy = dy < 0 ? b.y + pos.y : (b.y + b.height) - this.size.y + pos.y;
        }

        if(dx || dy) {
            //if we move a lot, then just force a re render (less expensive then panning all the way there)
            if(Math.abs(dx) > this.hSize.x || Math.abs(dy) > this.hSize.y) {
                this.game.world.setPosition(this.game.world.position.x - dx, this.game.world.position.y - dy);
                this.game.world.resize(this.size.x, this.size.y);
            }
            //otherwise just pan
            else {
                this.game.world.pan(-dx, -dy);
            }
        }

        return this;
    },
    _outsideBounds: function(x, y) {
        return (
            !this._bounds.contains(x, y) || //top left
            !this._bounds.contains(x, y + this.size.y) || //bottom left
            !this._bounds.contains(x + this.size.x, y) || //top right
            !this._bounds.contains(x + this.size.x, y + this.size.y) //bottom right
        );
    },
    /**
     * Resizes the viewing area, this is called internally by your game instance
     * when you call mygame.resize(). DO NOT CALL THIS DIRECTLY
     *
     * @method resize
     * @private
     * @param w {Number} The new width
     * @param h {Number} The new height
     * @return {gf.Camera} Returns iteself for chainability
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
     * @method constrain
     * @param shape {gf.Rectangle|gf.Polygon|gf.Circle|gf.Ellipse} The shape to constrain the camera into
     * @return {gf.Camera} Returns iteself for chainability
     */
    constrain: function(shape, scaled) {
        this._bounds = shape;

        //scale the points
        if(!scaled) {
            if(shape instanceof gf.Rectangle) {
                shape.x *= this.game.world.scale.x;
                shape.y *= this.game.world.scale.y;
                shape.width *= this.game.world.scale.x;
                shape.height *= this.game.world.scale.y;
            } else if(shape instanceof gf.Polygon) {
                for(var i = 0; i < shape.points.length; ++i) {
                    var p = shape.points[i];

                    p.x *= this.game.world.scale.x;
                    p.y *= this.game.world.scale.y;
                }
            } else {
                shape.x *= this.game.world.scale.x;
                shape.y *= this.game.world.scale.y;
            }
        }

        return this;
    },
    unconstrain: function() {
        this._bounds = null;

        return this;
    },
    /**
     * Called internally every frame. Updates all effects and the follow
     *
     * @method update
     * @param dt {Number} The delta time (in seconds) since the last update
     * @return {gf.gf.Camera} Returns iteself for chainability
     * @private
     */
    update: function(dt) {
        //follow sprite
        if(this._target) {
            if(!this._deadzone) {
                this.focusSprite(this._target);
            } else {
                var moveX, moveY,
                    dx, dy,
                    //get the x,y of the sprite on the screen
                    camX = (this._target.position.x + (this.game.world.position.x / this.game.world.scale.x)) * this.game.world.scale.x,
                    camY = (this._target.position.y + (this.game.world.position.y / this.game.world.scale.y)) * this.game.world.scale.y;

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

        //update effects
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var c = this.children[i];
            if(c.update)
                c.update(dt);
        }

        return this;
    }
});

/**
 * Camera follow types (used for camera.follow())
 *
 * @property FOLLOW
 * @type Object
 * @static
 */
gf.Camera.FOLLOW = {
    PLATFORMER: 0,
    TOPDOWN: 1,
    TOPDOWN_TIGHT: 2,
    LOCKON: 3
};
gf.Camera.fx = {
    /**
     * Camera directions, used for certain effects (like shake and scanlines)
     *
     * @property DIRECTION
     * @type Object
     * @static
     */
    DIRECTION: {
        BOTH: 0,
        HORIZONTAL: 1,
        VERTICAL: 2
    }
};

gf.Camera.fx.Effect = function() {
    gf.DisplayObjectContainer.call(this);

    this.addChild(this.gfx = new PIXI.Graphics());
    this.gfx.visible = false;

    this.done = true;
};

gf.inherits(gf.Camera.fx.Effect, gf.DisplayObjectContainer, {
    start: function() {
        this.done = false;
        return this;
    },
    stop: function() {
        this.done = true;
        return this;
    },
    update: function() {
        return this;
    },
    _complete: function() {
        this.done = true;

        if(typeof this.cb === 'function') {
            var ret = this.cb();

            if(ret !== false)
                this.stop();
        } else {
            this.stop();
        }
    }
});
gf.Camera.fx.Close = function() {
    gf.Camera.fx.Effect.call(this);
};

gf.inherits(gf.Camera.fx.Close, gf.Camera.fx.Effect, {
    start: function(shape, duration, pos, cb) {
        gf.Camera.fx.Effect.prototype.start.call(this);

        if(typeof pos ==='function') {
            cb = pos;
            pos = null;
        }

        if(typeof duration === 'function') {
            cb = duration;
            pos = null;
            duration = null;
        }

        if(typeof shape === 'function') {
            cb = shape;
            pos = null;
            duration = null;
            shape = null;
        }

        this.shape = shape || 'circle';
        this.duration = duration && duration > 0 ? duration : 1000;
        this.cb = cb;

        this.cx = pos ? pos.x : this.parent.size.x / 2;
        this.cy = pos ? pos.y : this.parent.size.y / 2;
        this.w = this.mx = this.parent.size.x;
        this.h = this.my = this.parent.size.y;
        this.radius = this.maxRadius = Math.max(this.w / 2, this.h / 2);

        this.gfx.visible = true;
        this.gfx.position.x = this.cx;
        this.gfx.position.y = this.cy;

        this.parent.game.activeState.mask = this.gfx;

        if(shape === 'ellipse') {
            this.gfx.scale.y = 0.5;
        }
        else {
            this.gfx.scale.y = 1;
        }

        return this;
    },
    stop: function() {
        gf.Camera.fx.Effect.prototype.stop.call(this);

        this.radius = this.sx = this.sy = 0;
        this.gfx.visible = false;

        if(this.parent.game.activeState.mask === this.gfx)
            this.parent.game.activeState.mask = null;

        return this;
    },
    update: function(dt) {
        if(this.done) return;

        var part = (dt * 1000) / this.duration;

        this.gfx.clear();
        this.gfx.beginFill(0xff00ff);

        switch(this.shape) {
            case 'ellipse':
            case 'circle':
                this.radius -= (part * this.maxRadius);

                if(this.radius <= 0) {
                    this._complete();
                } else {
                    this.gfx.drawCircle(0, 0, this.radius);
                }
                break;

            case 'rect':
            case 'rectangle':
                this.w -= (part * this.mx);
                this.h -= (part * this.my);

                if(this.w <= 0) {
                    this._complete();
                } else {
                    this.gfx.drawRect(-(this.w / 2), -(this.h / 2), this.w, this.h);
                }
                break;
        }
        this.gfx.endFill();

        return this;
    }
});
gf.Camera.fx.Fade = function() {
    gf.Camera.fx.Effect.call(this);
};

gf.inherits(gf.Camera.fx.Fade, gf.Camera.fx.Effect, {
    start: function(color, duration, alpha, cb) {
        gf.Camera.fx.Effect.prototype.start.call(this);

        if(typeof alpha === 'function') {
            cb = duration;
            alpha = null;
        }

        if(typeof duration === 'function') {
            cb = duration;
            alpha = null;
            duration = null;
        }

        if(typeof color === 'function') {
            cb = color;
            alpha = null;
            duration = null;
            color = null;
        }

        color = typeof color === 'number' ? color : 0xFFFFFF;
        this.goal = alpha || 1;
        this.duration = duration && duration > 0 ? duration : 1000;
        this.cb = cb;

        this.gfx.visible = true;
        this.gfx.alpha = 0;
        this.gfx.clear();
        this.gfx.beginFill(color);
        this.gfx.drawRect(0, 0, this.parent.size.x, this.parent.size.y);

        return this;
    },
    stop: function() {
        gf.Camera.fx.Effect.prototype.stop.call(this);

        this.gfx.alpha = 0;
        this.gfx.visible = false;

        return this;
    },
    update: function(dt) {
        if(this.done) return;

        if(this.gfx.alpha < this.goal) {
            this.gfx.alpha += (dt * 1000) / this.duration;

            if(this.gfx.alpha >= this.goal) {
                this._complete();
            }
        }

        return this;
    }
});
gf.Camera.fx.Flash = function() {
    gf.Camera.fx.Effect.call(this);
};

gf.inherits(gf.Camera.fx.Flash, gf.Camera.fx.Effect, {
    start: function(color, duration, alpha, cb) {
        gf.Camera.fx.Effect.prototype.start.call(this);

        if(typeof alpha === 'function') {
            cb = duration;
            alpha = null;
        }

        if(typeof duration === 'function') {
            cb = duration;
            alpha = null;
            duration = null;
        }

        if(typeof color === 'function') {
            cb = color;
            alpha = null;
            duration = null;
            color = null;
        }

        alpha = alpha || 1;
        color = typeof color === 'number' ? color : 0xFFFFFF;
        this.duration = duration && duration > 0 ? duration : 1000;
        this.cb = cb;

        this.gfx.visible = true;
        this.gfx.alpha = alpha;
        this.gfx.clear();
        this.gfx.beginFill(color);
        this.gfx.drawRect(0, 0, this.parent.size.x, this.parent.size.y);

        return this;
    },
    stop: function() {
        gf.Camera.fx.Effect.prototype.stop.call(this);

        this.gfx.alpha = 0;
        this.gfx.visible = false;

        return this;
    },
    update: function(dt) {
        if(this.done) return;

        if(this.gfx.alpha > 0) {
            this.gfx.alpha -= (dt * 1000) / this.duration;

            if(this.gfx.alpha <= 0) {
                this._complete();
            }
        }

        return this;
    }
});
gf.Camera.fx.Scanlines = function() {
    gf.Camera.fx.Effect.call(this);
};

gf.inherits(gf.Camera.fx.Scanlines, gf.Camera.fx.Effect, {
    start: function(color, direction, spacing, thickness, alpha) {
        gf.Camera.fx.Effect.prototype.start.call(this);

        color = color || 0x000000;
        direction = direction || gf.Camera.fx.DIRECTION.HORIZONTAL;
        spacing = spacing || 4;
        thickness = thickness || 1;
        alpha = alpha || 0.3;

        var sx = this.parent.size.x,
            sy = this.parent.size.y;

        this.gfx.clear();
        this.gfx.visible = true;
        this.gfx.beginFill(color, alpha);

        //draw the lines
        if((direction === gf.Camera.fx.DIRECTION.BOTH) || (direction === gf.Camera.fx.DIRECTION.VERTICAL)) {
            for(var x = 0; x < sx; x += spacing) {
                this.gfx.drawRect(x, 0, thickness, sy);
            }
        }

        if((direction === gf.Camera.fx.DIRECTION.BOTH) || (direction === gf.Camera.fx.DIRECTION.HORIZONTAL)) {
            for(var y = 0; y < sy; y += spacing) {
                this.gfx.drawRect(0, y, sx, thickness);
            }
        }
        this.gfx.endFill();

        return this;
    },
    stop: function() {
        gf.Camera.fx.Effect.prototype.stop.call(this);

        this.gfx.visible = false;

        return this;
    }
});

gf.Camera.fx.Shake = function() {
    gf.Camera.fx.Effect.call(this);
    this.offset = new gf.Vector();
};

gf.inherits(gf.Camera.fx.Shake, gf.Camera.fx.Effect, {
    start: function(intensity, duration, direction, cb) {
        gf.Camera.fx.Effect.prototype.start.call(this);

        if(typeof direction === 'function') {
            cb = direction;
            direction = null;
        }

        if(typeof duration === 'function') {
            cb = duration;
            direction = null;
            duration = null;
        }

        if(typeof intensity === 'function') {
            cb = intensity;
            direction = null;
            duration = null;
            intensity = null;
        }

        this.intensity = intensity || 0.01;
        this.duration = duration || 1000;
        this.direction = direction || gf.Camera.fx.DIRECTION.BOTH;
        this.offset.x = this.offset.y = 0;
        this.cb = cb;

        return this;
    },
    stop: function() {
        gf.Camera.fx.Effect.prototype.stop.call(this);

        this.duration = this.offset.x = this.offset.y = 0;

        return this;
    },
    update: function(dt) {
        if(this.done) return;

        this.duration -= (dt * 1000);

        //pan back to the original position
        this.offset.x = -this.offset.x;
        this.offset.y = -this.offset.y;
        this.parent.pan(this.offset.x, this.offset.y);

        //check if we are complete
        if(this.duration <= 0) {
            this._complete();
        }
        //otherwise do the shake
        else {
            //pan to a random offset
            if((this.direction === gf.Camera.fx.DIRECTION.BOTH) || (this.direction === gf.Camera.fx.DIRECTION.HORIZONTAL))
                this.offset.x = gf.math.round(Math.random() * this.intensity * this.parent.size.x * 2 - this.intensity * this.parent.size.x);

            if ((this.direction === gf.Camera.fx.DIRECTION.BOTH) || (this.direction === gf.Camera.fx.DIRECTION.VERTICAL))
                this.offset.y = gf.math.round(Math.random() * this.intensity * this.parent.size.y * 2 - this.intensity * this.parent.size.y);

            this.parent.pan(this.offset.x, this.offset.y);
        }
    }
});

/**
 * Camera shake directions (used for camera.shake())
 *
 * @property SHAKE
 * @type Object
 * @static
 */
gf.Camera.fx.SHAKE = {
    BOTH: 0,
    HORIZONTAL: 1,
    VERTICAL: 2
};
/**
 * A texture font makes it easy to use a texture for writing generic text. Basically
 * this holds an array of textures each one representing a character, that all share
 * the same base texture (image). It is the same way a spritesheet works except you
 * use the textures for text instead of animation frames.
 *
 * For special characters, you can either use the `.map` property to map a character
 * to a texture name like `font.map['~'] = 'tilde'` so that any `~` uses the texture named
 * `tilde + font.ext` for rendering; or you can make the texture name be the character code
 * prefixed with `#`. So, for `~`, naming the texture `#126.png` with `font.ext = 'png'`
 * would just work automagically. There is a default map already that you can view in the source,
 * and if you follow that naming convention, it will work without modification as well.
 *
 * @class TextureFont
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param texture {Texture|String} The sprite sheet to use, if you pass a string make sure to preload it first
 * @param [settings] {Object} All the settings for the font
 * @param [settings.ext] {String} The extension used for the different texture names
 * @param [settings.map] {Object} Maps a special character to a string name
 * @param [settings.spaceSize] {Number} The size of a space character in pixels
 * @param [settings.lineWidth] {Number} The width factor of characters, default is 1 which is normal spacing
 * @param [settings.lineHeight] {Number} The height factor of characters, default is 1 which is normal spacing
 * @param [settings.text] {String} Starting text of the font
 */
gf.TextureFont = function(font, settings) {
    if(typeof font === 'string') {
        if(gf.assetCache[font])
            font = gf.assetCache[font];
        else
            throw 'Unknown texture ' + font + ', please load the sprite sheet first!';
    }

    /**
     * The extension to use with texture names
     *
     * @property ext
     * @type String
     * @default ''
     */
    this.ext = '';

    /**
     * Maps a special character to a string name
     *
     * @property map
     * @type Object
     */
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

    /**
     * The size of a space character in pixels
     *
     * @property spaceSize
     * @type Number
     */
    this.spaceSize = 15;

    /**
     * The width factor of characters, default is 1 which is normal spacing
     *
     * @property lineWidth
     * @type Number
     */
    this.lineWidth = 1;

    /**
     * The height factor of characters, default is 1 which is normal spacing
     *
     * @property lineHeight
     * @type Number
     */
    this.lineHeight = 1;

    /**
     * The fixed width for all characters, 0 means not forced monospace
     *
     * @property monospace
     * @type Number
     * @default 0
     */
    this.monospace = 0;

    /**
     * The textures for all the characters in the alphabet
     *
     * @property textures
     * @type Object<Texture>
     * @readOnly
     * @private
     */
    this.textures = font;

    /**
     * The sprite pool to grab character sprites from
     *
     * @property sprites
     * @type ObjectPool
     * @readOnly
     * @private
     */
    this.sprites = new gf.ObjectPool(gf.Sprite, this);

    //call base ctor
    gf.DisplayObjectContainer.call(this, settings);

    if(this.ext && this.ext.charAt(0) !== '.')
        this.ext = '.' + this.ext;

    if(settings.text)
        this.setText(settings.text);
};

gf.inherits(gf.TextureFont, gf.DisplayObjectContainer, {
    /**
     * Gets a sprite from the pool for the character pased
     *
     * @method _getSprite
     * @param character {String} The character to get a sprite for
     * @return Sprite
     */
    _getSprite: function(ch) {
        var offy = 0;

        if(this.map[ch])
            ch = this.map[ch];

        if(typeof ch === 'object') {
            offy = ch.yoffset || 0;
            ch = ch.name;
        }

        //skips spaces
        if(ch === '' || ch === ' ')
            return null;

        var texture = this.textures[ch + this.ext];

        //try character code
        if(!texture)
            texture = this.textures['#' + ch.charCodeAt(0) + this.ext];

        //if no match, error
        if(!texture)
            throw 'There is no texture for character "' + ch + '" with extension "' + this.ext + '"';

        var spr = this.sprites.create(texture);

        spr.setTexture(texture);
        spr.visible = true;

        spr.anchor.y = 1;
        spr.position.x = 0;
        spr.position.y = offy;

        return spr;
    },
    /**
     * Clones this font to get another just like it
     *
     * @method clone
     * @return TextureFont
     */
    clone: function() {
        return new gf.TextureFont(this.textures, {
            ext: this.ext,
            map: this.map,
            text: this.text,
            lineWidth: this.lineWidth,
            lineHeight: this.lineHeight
        });
    },
    /**
     * Sets the text of this font to the string passed
     *
     * @method setText
     * @param text {String} The text to display
     */
    setText: function(txt) {
        this.text = txt;
        this.width = 0;

        //free all sprites
        for(var c = 0, cl = this.children.length; c < cl; ++c) {
            var child = this.children[c];
            child.visible = false;
            this.sprites.free(child);
        }

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
                    spr.position.x += x;
                    spr.position.y += y;

                    if(spr.texture.frame.height > h)
                        h = spr.texture.frame.height;

                    x += this.monospace ? this.monospace * this.lineWidth : spr.texture.frame.width * this.lineWidth;
                } else {
                    x += this.monospace ? this.monospace * this.lineWidth : this.spaceSize * this.lineWidth;
                }

            }

            this.width = Math.max(x, this.width);

            y += h * this.lineHeight;
            x = 0;
        }
    }
});
/**
 * Main game object, controls the entire instance of the game
 *
 * @class Game
 * @extends Object
 * @uses gf.EventEmitter
 * @namespace gf
 * @constructor
 * @param contId {String} The container for the new canvas we will create for the game
 * @param settings {Object} All the settings for the game instance
 * @param settings.width {Number} The width of the viewport
 * @param settings.height {Number} The height of the viewport
 * @param [settings.view] {DOMElement} The canvas to render into
 * @param [settings.transparent] {Boolean} Whether the viewport should be transparent or not
 * @param [settings.renderMethod] {String} Can be 'canvas' or 'webgl' to force that render method
 * @param [settings.background] {Number} The background color of the stage
 * @param [settings.interactive] {Boolean} Whether the game will use mouse events or not
 */
gf.Game = function(contId, settings) {
    gf.EventEmitter.call(this);

    /**
     * The domElement that we are putting our rendering canvas into (the container)
     *
     * @property container
     * @type DOMELement
     * @readOnly
     */
    this.container = document.getElementById(contId);

    if(!this.container)
        this.container = document.body;

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
     * @readOnly
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
        settings.background,
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
        this.renderer = new PIXI.WebGLRenderer(settings.width, settings.height, settings.view, settings.transparent);
    } else if(this.renderMethod === 'canvas') {
        this.renderer = new PIXI.CanvasRenderer(settings.width, settings.height, settings.view, settings.transparent);
    }

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
     * The sprite pool to use to create registered entities
     *
     * @property spritepool
     * @type SpritePool
     * @readOnly
     */
    this.spritepool = new gf.SpritePool();

    /**
     * The input instance for this game
     *
     * @property input
     * @type InputManager
     * @readOnly
     */
    this.input = new gf.InputManager(this.renderer.view);

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
    this._defaultState = new gf.GameState('_default');

    /**
     * Holds timing data for the previous loop
     *
     * @property timings
     * @type Object
     * @readOnly
     */
    this.timings = {
        _timer: window.performance && window.performance.now ? window.performance : Date
    };

    //append the renderer view only if the user didn't pass their own
    if(!settings.view)
        this.container.appendChild(this.renderer.view);

    //mixin user settings
    gf.utils.setValues(this, settings);

    //enable default state
    this.addState(this._defaultState);
    this.enableState('_default');

    //define getters for common properties in GameState
    var self = this;
    ['audio', 'physics', 'camera', 'world'].forEach(function(prop) {
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
     * The world instance that holds all sprites and the map
     * (refers to the active GameState's world instance)
     *
     * @property world
     * @type Map
     * @readOnly
     */

     //pixi does some prevent default on mousedown, so we need to
     //make sure mousedown will focus the canvas or keyboard events break


    //ensure that key events will work
    var view = this.renderer.view;
    if(!view.getAttribute('tabindex'))
        view.setAttribute('tabindex','1');

    view.focus();
    view.addEventListener('click', function() {
        view.focus();
    }, false);
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

            if(o.resize)
                o.resize(w, h);
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
    requestFullscreen: function() {
        var elem = this.renderer.view;

        if(elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if(elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if(elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
    },
    /**
     * Adds a new game state to this game to be later enabled
     *
     * @method addState
     * @param state {GameState} The state to add to this game
     * @return {Game} Returns itself for chainability
     */
    addState: function(state) {
        var name = state.name;

        if(!name) {
            throw 'No state name could be determined, did you give the state a name when you created it?';
        } else if(this.states[name]) {
            throw 'A state with the name "' + name + '" already exists, did you try to add it twice?';
        } else {
            this.states[name] = state;
            this.stage.addChild(state);

            state.game = this;
        }

        return this;
    },
    /**
     * Removes a game state from the game
     *
     * @method removeState
     * @param state {GameState|String} The state to remove from the game, or the name of a state to remove
     * @return {Game} Returns itself for chainability
     */
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

        return this;
    },
    /**
     * Enables a state that has been added to the game
     *
     * @method enableState
     * @param state {GameState|String} The state to enable, or the name of a state to enable
     * @return {Game} Returns itself for chainability
     */
    enableState: function(state) {
        var name = (typeof state === 'string') ? state : state.name;

        if(this.activeState)
            this.activeState.disable();

        this.activeState = this.states[name];

        this.activeState.enable();

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
        this.timings.tickStart = this.timings._timer.now();

        //start render loop
        window.requestAnimFrame(this._tick.bind(this));

        var dt = this.clock.getDelta();

        //gather input from user
        this.timings.inputStart = this.timings._timer.now();
        this.input.update(dt);
        this.timings.inputEnd = this.timings._timer.now();

        //update this game state
        this.timings.stateStart = this.timings._timer.now();
        this.activeState.update(dt);
        this.timings.stateEnd = this.timings._timer.now();

        //render scene
        this.timings.renderStart = this.timings._timer.now();
        this.renderer.render(this.stage);
        this.timings.renderEnd = this.timings._timer.now();

        this.timings.tickEnd =  this.timings._timer.now();
    }
});

/**
 * GameStates are different , controls the entire instance of the game
 *
 * @class GameState
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param [name] {String} The name of this state
 * @param [settings] {Object} All the settings for this game state
 * @param [settings.gravity] {Number} The gravity constant for the physics system (default is 9.87, which is normal Earth gravity)
 * @example
 *      var state = new gf.GameState(game, 'battle');
 *      state.addChild(battlePlayer);
 *      state.addChild(enemy);
 *
 *      game.enableState(state); //or you can use the name from the ctor 'battle'
 */
gf.GameState = function(name, settings) {
    if(typeof name === 'object') {
        settings = name;
        name = Math.floor(Date.now() * Math.random()).toString();
    }

    settings = settings || {};

    /**
     * The name of this game state
     *
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * The audio player for this game instance
     *
     * @property audio
     * @type AudioPlayer
     * @readOnly
     */
    this.audio = new gf.AudioManager();

    /**
     * The physics system to simulate stuffs
     *
     * @property physics
     * @type PhysicsSystem
     * @readOnly
     */
    this.physics = new gf.PhysicsSystem({ gravity: settings.gravity });

    /**
     * The camera you view the scene through
     *
     * @property camera
     * @type Camera
     * @readOnly
     */
    this.camera = null; //need to be added to a game first

    /**
     * The world instance that holds all entites and the map
     *
     * @property world
     * @type Map
     * @readOnly
     */
    this.world = null;

    /**
     * The game instance that this state belongs too
     *
     * @property game
     * @type Game
     */
    Object.defineProperty(this, 'game', {
        get: function() { return this._game; },
        set: this._setGame.bind(this),
        enumerable: true
    });

    //call base ctor
    gf.DisplayObjectContainer.call(this, settings);

    //start disabled
    this.disable();
};

gf.inherits(gf.GameState, gf.DisplayObjectContainer, {
    /**
     * The setter for the game property, sets up the input and camera objects
     *
     * @method _setGame
     * @param game {Game}
     * @private
     */
    _setGame: function(game) {
        this._game = game;

        if(this.camera)
            this.removeChild(this.camera);

        this.camera = new gf.Camera(game);
        this.addChild(this.camera);
        this.camera.resize(game.renderer.width, game.renderer.height);
    },
    /**
     * Adds a child object to the GameState, this will add objects to either
     * the Camera or the Map depending on the type. Anything inheriting from
     * gf.Gui will be put to the camera, everything else goes in the world.
     *
     * @method addChild
     * @param obj {DisplayObject} Any generic object to add to the game state
     */
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
    /**
     * Loads a game world into the state
     *
     * @method loadWorld
     * @param world {String|Object} The world to load, if you pass a string be sure to preload it first
     */
    loadWorld: function(world) {
        if(typeof world === 'string'){
            if(gf.assetCache[world]) {
                world = gf.assetCache[world];
            } else {
                throw 'World "' + world + '" needs to be preloaded before being added to a game!';
            }
        }

        this.world = new gf.TiledMap(world);
        this.addChild(this.world);

        this.world.resize(this._game.renderer.width, this._game.renderer.height);

        this.camera.constrain(new gf.Rectangle(0, 0, this.world.realSize.x, this.world.realSize.y), true);

        return this;
    },
    /**
     * Enables (shows) the game state
     *
     * @method enable
     */
    enable: function() {
        this.visible = true;
    },
    /**
     * Disables (hides) the game state
     *
     * @method disable
     */
    disable: function() {
        this.visible = false;
    },
    /**
     * Called by the game each frame to update the input, camera, and physics objects
     *
     * @method update
     * @private
     */
    update: function(dt) {
        //update any camera effects
        this.game.timings.cameraStart = this.game.timings._timer.now();
        this.camera.update(dt);
        this.game.timings.cameraEnd = this.game.timings._timer.now();

        //simulate physics and detect/resolve collisions
        this.game.timings.physicsStart = this.game.timings._timer.now();
        this.physics.update(dt);
        this.game.timings.physicsEnd = this.game.timings._timer.now();
    }
});
/**
 * The base Gui that holds GuiItems to be added to the Camera
 *
 * @class Gui
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 */
gf.Gui = function(name) {
    /**
     * The name of the Gui
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = name || '';

    gf.DisplayObjectContainer.call(this);
};

gf.inherits(gf.Gui, gf.DisplayObjectContainer);

/**
 * The base GuiItem that represents an element of a gui on the screen.
 *
 * @class GuiItem
 * @extends gf.Sprite
 * @namespace gf
 * @constructor
 * @param texture {Texture} The texture to set the sprite to
 * @param interactive {Boolean} Whether this item should repsond to mouse events
 */
gf.GuiItem = function(texture, interactive) {
    /**
     * Sets whether or not you can drag the GuiItem around
     *
     * @property draggable
     * @type Boolean
     * @default false
     */
    this.draggable = false;

    /**
     * Describes if the current item is being dragged or not, if it is this
     * object will hold the last local position of the mouse (relative to this object's parent)
     *
     * @property dragging
     * @type Object
     * @default false
     * @readOnly
     */
    this.dragging = false;

    gf.Sprite.call(this, texture);
    this.interactive = interactive;
};

gf.inherits(gf.GuiItem, gf.Sprite, {
    mousedown: function(e) {
        gf.Sprite.prototype.mousedown.call(this, e);

        if(!this.draggable)
            return;

        this.dragging = e.data.getLocalPosition(e.object.parent);
    },
    mouseup: function(e) {
        gf.Sprite.prototype.mouseup.call(this, e);

        this.dragging = false;
    },
    mousemove: function(e) {
        gf.Sprite.prototype.mousemove.call(this, e);

        if(!this.draggable || !this.dragging)
            return;

        var pos = e.data.getLocalPosition(this.parent);

        //current position + (new mouse position - old mouse position) == current position + mousemove delta
        this.setPosition(
            this.position.x + (pos.x - this.dragging.x),
            this.position.y + (pos.y - this.dragging.y)
        );

        this.dragging = pos;
    }
});

/**
 * Manages all input handlers in a unified way
 *
 * @class InputManager
 * @extends Object
 * @namespace gf
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
gf.InputManager = function(view) {
    /**
     * The dom element to bind events to
     *
     * @property view
     * @type Game
     */
    this.view = view;

    /**
     * Holds the keyboard handler for keyboard events
     *
     * @property keyboard
     * @type Keyboard
     * @readOnly
     */
    this.keyboard = new gf.input.Keyboard(view);

    /**
     * Holds the gamepad handler for gamepad events
     *
     * @property gamepad
     * @type Keyboard
     * @readOnly
     */
    this.gamepad = new gf.input.Gamepad();
};

gf.inherits(gf.InputManager, Object, {
    /**
     * Called each frame to update state info for some input methods
     *
     * @method update
     * @private
     */
    update: function(dt) {
        this.gamepad.update(dt);
    }
});
/**
 * input object
 */
gf.input = {};

/**
 * The base Input object, holds common functions and properties between input types
 *
 * @class Input
 * @extends Object
 * @uses gf.EventEmitter
 * @namespace gf.input
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
gf.input.Input = function(view) {
    gf.EventEmitter.call(this);

    /**
     * For backwards compatibility
     *
     * @method bind
     * @deprecated use on
     */
    this.bind = this.on;

    /**
     * The dom element to bind events to
     *
     * @property view
     * @type Game
     */
    this.view = view;
};

gf.inherits(gf.input.Input, Object, {
    /**
     * Prevents the default action of an event
     *
     * @method preventDefault
     * @param event {DOMEvent} The event to prevent default actions for
     */
    preventDefault: function(e) {
        if(e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        return false;
    },
    /**
     * Prevents an event from bubbling up the DOM.
     *
     * @method stopPropogation
     * @param event {DOMEvent} The event to prevent bubbling for
     */
    stopPropogation: function(e) {
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
});

/**
 * Bindable keycodes
 *
 * @property KEY
 * @type Object
 * @static
 */
gf.input.KEY = {
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
};

/**
 * Controls keyboard input
 *
 * @class Keyboard
 * @extends gf.input.Input
 * @namespace gf.input
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
gf.input.Keyboard = function(view) {
    gf.input.Input.call(this, view);

    /**
     * The current sequence of keys that have been pressed
     *
     * @property sequence
     * @type Array<Number>
     * @readOnly
     */
    this.sequence = [];

    /**
     * The amount of time it takes for the sequence to clear out, in ms
     *
     * @property sequenceTimeout
     * @type Number
     * @default 500
     */
    this.sequenceTimeout = 500;

    /**
     * The timeout ID for the wait to clear the input sequence
     *
     * @property _clearSq
     * @type Number
     * @private 
     */
    this._clearSq = null;

    view.addEventListener('keydown', this.onKeyDown.bind(this), false);
    view.addEventListener('keyup', this.onKeyUp.bind(this), false);
};

gf.inherits(gf.input.Keyboard, gf.input.Input, {
    /**
     * Called when a key is pressed down
     *
     * @method onKeyDown
     * @param event {DOMEvent}
     * @param override {Number} The key code to use instead of checking event data
     * @private
     */
    onKeyDown: function(e, override) {
        //if(e.target === this.view.parentElement)
            return this.modifyKey(e, override || e.keyCode || e.which, true);
    },
    /**
     * Called when a key is released
     *
     * @method onKeyUp
     * @param event {DOMEvent}
     * @param override {Number} The key code to use instead of checking event data
     * @private
     */
    onKeyUp: function(e, override) {
        //if(e.target === this.view.parentElement)
            return this.modifyKey(e, override || e.keyCode || e.which, false);
    },
    /**
     * Called when a key state has changed, updates current sequence and emits events
     *
     * @method modifyKey
     * @param event {DOMEvent}
     * @param key {Number} The key code that has changed
     * @param down {Boolean} Whether the key has been pressed or not
     * @private
     */
    modifyKey: function(e, key, down) {
        //emit single key event
        this.emit(key, {
            input: this,
            originalEvent: e,
            down: down
        });

        //when pressed is when we process a key for a sequence
        if(down) {
            //update the key sequence
            this.sequence.push(key);

            //process current sequence
            var s = this.sequence.toString();
            if(s !== key.toString()) {
                this.emit(s, {
                    input: this,
                    originalEvent: e,
                    down: down
                });
            }

            //set timeout to clear sequence
            clearTimeout(this._clearSq);
            this._clearSq = setTimeout(this._clearSequence.bind(this), this.sequenceTimeout);
        }
    },
    /**
     * Clears the current sequence so that a new one can start
     *
     * @method _clearSequence
     * @private
     */
    _clearSequence: function() {
        this.sequence.length = 0;
    }
});
/**
 * Controls input from gamepads
 *
 * @class Gamepad
 * @extends gf.input.Input
 * @namespace gf.input
 * @constructor
 */
gf.input.Gamepad = function() {
    gf.input.Input.call(this);

    /**
     * Tracks if we are polling for status/connections
     *
     * @property ticking
     * @type Boolean
     * @readOnly
     */
    this.ticking = false;

    /**
     * The currently activated gamepads list
     *
     * @property pads
     * @type Array<Gamepad>
     * @readOnly
     */
    this.pads = [];

    /**
     * Timestamp tracking for state changes
     *
     * @property prevTimestamps
     * @type Array<Number>
     * @private
     */
    this.prevTimestamps = [];

    /**
     * Holds the button handler for gamepad button events
     *
     * @property buttons
     * @type GamepadButtons
     * @readOnly
     */
    this.buttons = new gf.input.GamepadButtons();

    /**
     * Holds the stick handler for gamepad stick events
     *
     * @property sticks
     * @type GamepadSticks
     * @readOnly
     */
    this.sticks = new gf.input.GamepadSticks();

    //Firefox uses connect/disconnect events so listen to those
    window.addEventListener('MozGamepadConnected', this.onGamepadConnect.bind(this), false);
    window.addEventListener('MozGamepadDisconnected', this.onGamepadDisconnect.bind(this), false);

    //Since chrome only supports polling, we have to start looping immediately
    if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
        this.startPolling();
    }
};

gf.inherits(gf.input.Gamepad, gf.input.Input, {
    /**
     * Called when a gamepad connects (FF Only)
     *
     * @method onGamepadDisconnect
     * @param event {GamepadConnectEvent}
     * @private
     */
    onGamepadConnect: function(event) {
        //add the gamepad to our list
        this.pads.push(event.gamepad);

        //start polling
        this.startPolling();
    },
    /**
     * Called when a gamepad disconnects (FF Only)
     *
     * @method onGamepadDisconnect
     * @param event {GamepadDisconnectEvent}
     * @private
     */
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
    /**
     * Stats polling for new gamepads and status updates
     *
     * @method startPolling
     */
    startPolling: function() {
        if(this.ticking) return;

        this.ticking = true;
        this.update();
    },
    /**
     * Stops polling for new gamepads and status updates
     *
     * @method stopPolling
     */
    stopPolling: function() {
        this.ticking = false;
    },
    /**
     * Polls for newly connected gamepads (Chrome Only)
     *
     * @method pollGamepads
     */
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
    /**
     * Polls the gamepad object for status updates and emits events when they occur
     *
     * @method pollStatus
     * @param pad {Gamepad} The gamepad object to check
     */
    pollStatus: function() {
        for(var i = 0, il = this.pads.length; i < il; ++i) {
            var pad = this.pads[i];
            //don't do anything if the current timestamp is the same as the previous one
            //(meaning the state has not changed). This is a chrome-only feature right now,
            //so first we have to check if it is empty as well
            if(pad.timestamp && (pad.timestamp === this.prevTimestamps[i]))
                continue;

            this.prevTimestamps[i] = pad.timestamp;
            this.buttons.pollStatus(pad);
            this.sticks.pollStatus(pad);
        }
    },
    /**
     * Called each frame to update polling mechanisms
     *
     * @method update
     */
    update: function() {
        if(!this.ticking) return;

        //pollin' fo' pads
        this.pollGamepads();

        //poll for the status of our gamepads
        this.pollStatus();
    }
});
/**
 * Bindable Gamepad Buttons
 *
 * @property GP_BUTTON
 * @type Object
 * @static
 */
gf.input.GP_BUTTON = {
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
    PAD_RIGHT: 15,
    SYSTEM_MENU: 16   // on console controllers this would be the button to open the system menu
};
gf.input.getGpButtonName = function(i) {
    for(var k in gf.input.GP_BUTTON) {
        if(gf.input.GP_BUTTON[k] === i) {
            return k;
        }
    }

    return '';
};
/**
 * Controls gamepad button input
 *
 * @class GamepadButtons
 * @extends gf.input.Input
 * @namespace gf.input
 * @constructor
 */
 gf.input.GamepadButtons = function() {
    gf.input.Input.call(this);

    /**
     * The threshold at which we consider a button "pressed"
     *
     * @property threshold
     * @type Number
     * @default 0.4
     */
    this.threshold = 0.4;

    /**
     * Track the status of each button
     *
     * @property buttons
     * @type Object
     * @private
     */
    this.buttons = {};

    //setup default objects for each axis
    for(var bt in gf.input.GP_BUTTON) {
        this.buttons[gf.input.GP_BUTTON[bt]] = {
            code: gf.input.GP_BUTTON[bt],
            name: bt,
            down: false,
            value: 0
        };
    }
};

gf.inherits(gf.input.GamepadButtons, gf.input.Input, {
    /**
     * Polls the gamepad object for status updates and emits events when they occur
     *
     * @method pollStatus
     * @param pad {Gamepad} The gamepad object to check
     */
    pollStatus: function(pad) {
        for(var b = 0, bl = pad.buttons.length; b < bl; ++b) {
            var down = (pad.buttons[b] > this.threshold),
                status = this.buttons[b];

            status.value = pad.buttons[b];

            //down state changed
            if(status.down !== down) {
                status.down = down;

                this.emit(b, status);
            }
        }
    }
});

/**
 * Bindable Gamepad Axes
 *
 * @property GP_AXIS
 * @type Object
 * @static
 */
 gf.input.GP_AXIS = {
    LEFT_ANALOGUE_HOR: 0,
    LEFT_ANALOGUE_VERT: 1,
    RIGHT_ANALOGUE_HOR: 2,
    RIGHT_ANALOGUE_VERT: 3
};
gf.input.getGpAxisName = function(i) {
    for(var k in gf.input.GP_AXIS) {
        if(gf.input.GP_AXIS[k] === i) {
            return k;
        }
    }

    return '';
};
/**
 * Controls gamepad stick input
 *
 * @class GamepadSticks
 * @extends gf.input.Input
 * @namespace gf.input
 * @constructor
 */
 gf.input.GamepadSticks = function() {
    gf.input.Input.call(this);

    /**
     * The threshold at which we consider a stick moved from center
     *
     * @property threshold
     * @type Number
     * @default 0.5
     */
    this.threshold = 0.5;

    /**
     * Track the status of each of the axes
     *
     * @property axes
     * @type Object
     * @private
     */
    this.axes = {};

    //setup default objects for each axis
    for(var ax in gf.input.GP_AXIS) {
        this.axes[gf.input.GP_AXIS[ax]] = {
            code: gf.input.GP_AXIS[ax],
            name: ax,
            value: 0
        };
    }
};

gf.inherits(gf.input.GamepadSticks, gf.input.Input, {
    /**
     * Polls the gamepad object for status updates and emits events when they occur
     *
     * @method pollStatus
     * @param pad {Gamepad} The gamepad object to check
     */
    pollStatus: function(pad) {
        for(var a = 0, al = pad.axes.length; a < al; ++a) {
            var ax = pad.axes[a],
                status = this.axes[a];

            //if we have moved off center by threshold, update the value
            if(Math.abs(ax) >= this.threshold) {
                status.value = ax;
            }
            //otherwise, set it back to zero
            else {
                status.value = 0;
            }

            this.emit(a, status);
        }
    }
});
/**
 * The Base loader class that all other loaders inherit from
 *
 * @class Loader
 * @extends Object
 * @uses gf.EventEmitter
 * @namespace gf
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param url {String} The url to load the resource from, also used as a key in the assetCache
 */
gf.Loader = function(name, url) {
    gf.EventEmitter.call(this);

    this.type = 'hey';

    this.name = name;
    this.url = url;
};

gf.inherits(gf.Loader, Object, {
    /**
     * Atempts to load a resource from the asset cache, if it finds the resource
     * in the cache, it will return the value and asynchronously emit the 'load' event
     *
     * @method load
     * @return {mixed} The cached value, or undefined if there is none cached
     */
    load: function() {
        var self = this;

        if(gf.assetCache[this.name]) {
            setTimeout(function() {
                self.done(gf.assetCache[self.name]);
            }, 0);
            return gf.assetCache[this.name];
        }
        else if(gf.assetCache[this.url]) {
            setTimeout(function() {
                self.done(gf.assetCache[self.url]);
            }, 0);
            return gf.assetCache[this.url];
        }
    },
    /**
     * Emits the 'load' event, passing the properties of this instance and the data passed
     *
     * @method done
     * @param data {mixed} The loaded data
     */
    done: function(data) {
        gf.assetCache[this.name] = data;

        //be async for sure
        var self = this;
        setTimeout(function() {
            self.emit('load', {
                name: self.name,
                assetType: self.type,
                url: self.url,
                data: data
            });
        }, 0);
    },
    /**
     * Emits the 'error' event, passing the properties of this instance and the message passed
     *
     * @method error
     * @param msg {String} The error message that occurred
     */
    error: function(msg) {
        //be async for sure
        var self = this;
        setTimeout(function() {
            self.emit('error', {
                name: self.name,
                assetType: self.type,
                url: self.url,
                message: msg
            });
        }, 0);
    }
});

/**
 * The AssetLoader loads and parses different game assets, such as sounds, textures,
 * TMX World JSON file (exported from the <a target="_blank" href="http://mapeditor.org">Tiled Editor</a>),
 * and Spritesheet JSON files (published from <a target="_blank" href="http://www.codeandweb.com/texturepacker">Texture Packer</a>).
 *
 * @class AssetLoader
 * @extends Object
 * @uses gf.EventEmitter
 * @namespace gf
 * @constructor
 * @param assets {Array} Array of assets to load when `.load()` is called
 * @example
 *      var loader = new AssetLoader(['/my/texture.png']);
 *      loader.load();
 *      //OR
 *      var loader = new AssetLoader();
 *      loader.load(['/my/texture.png']);
 */
gf.AssetLoader = function() {
    gf.EventEmitter.call(this);

    /**
     * The array of assets to load
     *
     * @property assets
     * @type Array
     */
    this.assets = [];

    /**
     * The count of remaining assets to load
     *
     * @property remaining
     * @type Number
     * @readOnly
     */
    this.remaining = 0;

    /**
     * A mapping of extensions to types
     *
     * @property loaders
     * @type Object
     * @readOnly
     * @private
     */
    this.loaders = {
        'texture': gf.TextureLoader,
        'jpeg': gf.TextureLoader,
        'jpg': gf.TextureLoader,
        'png': gf.TextureLoader,
        'gif': gf.TextureLoader,

        'audio': gf.AudioLoader,
        'music': gf.AudioLoader,
        'mp3': gf.AudioLoader,
        'ogg': gf.AudioLoader,
        'wma': gf.AudioLoader,
        'wav': gf.AudioLoader,

        'json': gf.JsonLoader
    };

    /**
     * Fired if a loader encounters an error
     *
     * @event error
     * @param eventData {Object}
     * @param eventData.assetType {String} The type of asset (loader name)
     * @param eventData.message {String} The message of the error
     */

    /**
     * Fired when an item has loaded
     *
     * @event progress
     * @param eventData {Object}
     * @param eventData.assetType {String} The type of asset (loader name)
     * @param eventData.url {String} The url the asset loaded from
     * @param eventData.data {mixed} The data that was loaded
     */

    /**
     * Fired when all the assets have loaded
     *
     * @event complete
     */
};

gf.inherits(gf.AssetLoader, Object, {
    /**
     * Adds a resource to the assets array.
     *
     * @method add
     * @param name {String} The name of the resource (to use as the key in the cache)
     * @param url {String} The URL to load the resource from (cross-domain not supported yet)
     */
    add: function(name, url) {
        this.assets.push({
            name: name,
            src: url
        });
    },
    /**
     * Starts the loading festivities. If called without any arguments it will load
     * the assets passed in at the ctor. If an array of assets are passed it will
     * load those instead.
     *
     * @method load
     * @param items {Array<String>|Array<Object>} Array of resources to load instead of the object's resources
     */
    load: function(items) {
        var assets = items || this.assets;

        for(var i = 0, il = assets.length; i < il; ++i) {
            var name = typeof assets[i] === 'string' ? assets[i] : assets[i].name,
                url = typeof assets[i] === 'string' ? assets[i] : (assets[i].src || assets[i].url || assets[i].uri),
                ext = assets[i].type || (url instanceof Array ? 'audio' : null) || url.split('.').pop(), //assume arrays of urls are for audio
                Loader = this.loaders[ext];

            if(!Loader)
                throw 'Unknown type "' + ext + '", unable to preload!';

            this.remaining++;
            var loader = new Loader(name, url);

            loader.on('load', this.onAssetLoaded.bind(this));
            loader.on('error', this.onAssetError.bind(this));
            loader.load();
        }
    },
    /**
     * Called whenever an asset is loaded, to keep track of when to emit complete and progress.
     *
     * @method onAssetLoaded
     * @param event {Object} The event object
     * @private
     */
    onAssetLoaded: function(e) {
        this.remaining--;

        this.emit('progress', {
            assetType: e.assetType,
            url: e.url,
            data: e.data
        });

        if(this.remaining === 0) {
            this.emit('complete');
        }
    },
    /**
     * Called whenever an asset loader encounters an error
     *
     * @method onAssetError
     * @param event {Object} The event object
     * @private
     */
    onAssetError: function(e) {
        this.remaining--;

        this.emit('error', {
            assetType: e.assetType,
            message: e.message
        });

        if(this.remaining === 0) {
            this.emit('complete');
        }
    }
});

/**
 * Loads an audio clip
 *
 * @class AudioLoader
 * @extends gf.Loader
 * @namespace gf
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param urls {Array<String>} All the urls for the different formats of this audio file
 */
gf.AudioLoader = function(name, urls) {
    gf.Loader.call(this, name, urls);

    this.type = 'audio';
    this.urls = typeof urls === 'string' ? [urls] : urls;
};

gf.inherits(gf.AudioLoader, gf.Loader, {
    /**
     * Loads the audio file described by the urls passed in to the ctor. Will intelligently
     * determine which url is supported by this browser.
     *
     * @method load
     */
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        var man = new gf.AudioManager(),
            player = man.create(name, { urls: this.urls });

        if(!player) {
            this.error('Cannot find a url for an audio type supported by this browser.');
        } else {
            var self = this;
            player.on('load', function() {
                self.done(player);
            });

            player.on('error', function(e) {
                self.error(e.message);
            });
        }
    }
});
/**
 * Loads json data
 *
 * @class JsonLoader
 * @extends gf.Loader
 * @namespace gf
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param url {String} The url to load the resource from, also used as a key in the assetCache
 */
gf.JsonLoader = function(name, url) {
    gf.Loader.call(this, name, url);

    this.type = 'json';
};

gf.inherits(gf.JsonLoader, gf.Loader, {
    /**
     * Loads the json data
     *
     * @method load
     */
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        var self = this,
            baseUrl = this.url.replace(/[^\/]*$/, '');

        gf.utils.ajax({
            method: 'GET',
            url: this.url,
            dataType: 'json',
            load: function(data) {
                var loader;

                //check some properties to see if this is a TiledMap Object
                if(data.orientation && data.layers && data.tilesets && data.version) {
                    loader = new gf.WorldLoader(self.name, baseUrl, data);
                }
                //this is a sprite sheet (published from TexturePacker)
                else if(data.frames && data.meta) {
                    loader = new gf.SpriteSheetLoader(self.name, baseUrl, data);
                }

                if(loader) {
                    loader.on('load', function(e) {
                        self.done(e.data);
                    });
                    loader.on('error', function(e) {
                        self.error(e.message);
                    });

                    loader.load();
                }
                //just some json data
                else {
                    self.done(data);
                }
            },
            error: function(err) {
                self.error(err.message || err);
            }
        });
    }
});
/**
 * Loads a texture image
 *
 * @class TextureLoader
 * @extends gf.Loader
 * @namespace gf
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param url {String} The url to load the resource from, also used as a key in the assetCache
 */
 gf.TextureLoader = function(name, url) {
    gf.Loader.call(this, name, url);

    this.type = 'texture';
};

gf.inherits(gf.TextureLoader, gf.Loader, {
    /**
     * Loads the texture data
     *
     * @method load
     */
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        var self = this,
            texture = gf.Texture.fromImage(this.url);

        if(!texture.baseTexture.hasLoaded) {
            texture.baseTexture.on('loaded', function() {
                self.done(texture);
            });
            texture.baseTexture.source.onerror = function() {
                self.error('Unable to load texture');
            };
        } else {
            this.done(texture);
        }
    }
});
gf.SpriteSheetLoader = function(name, baseUrl, data) {
    gf.Loader.call(this, name, baseUrl);

    this.type = 'spritesheet';
    this.data = data;
};

gf.inherits(gf.SpriteSheetLoader, gf.Loader, {
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        var self = this,
            data = this.data,
            txLoader = new gf.TextureLoader(this.name, this.url + data.meta.image);

        txLoader.on('load', function(e) {
            var texture =  e.data.baseTexture,
                frames = self.data.frames,
                assets = {};

            for(var f in frames) {
                var rect = frames[f].frame;

                if(rect) {
                    assets[f] = PIXI.TextureCache[f] = new gf.Texture(texture, {
                        x: rect.x,
                        y: rect.y,
                        width: rect.w,
                        height: rect.h
                    });

                    if(frames[f].trimmed) {
                        PIXI.TextureCache[f].realSize = frames[f].spriteSourceSize;
                        PIXI.TextureCache[f].trim.x = 0;
                    }
                }
            }

            self.done(assets);
        });

        txLoader.on('error', function(e) {
            self.error(e.message);
        });

        txLoader.load();
    }
});
gf.WorldLoader = function(name, baseUrl, data) {
    gf.Loader.call(this, name, baseUrl);

    this.type = 'world';
    this.data = data;
    this.numTextures = 0;
    this.errors = [];
};

gf.inherits(gf.WorldLoader, gf.Loader, {
    load: function() {
        //pull from cache
        if(gf.Loader.prototype.load.call(this)) return;

        //loop through each layer and load the sprites (objectgroup types)
        for(var i = 0, il = this.data.layers.length; i < il; ++i) {
            var layer = this.data.layers[i];
            if(layer.type !== 'objectgroup') continue;

            //loop through each object, and load the textures
            for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                var obj = layer.objects[o],
                    txLoader;

                if(!obj.properties.spritesheet) continue;
                this.numTextures++;

                txLoader = new gf.TextureLoader(layer.name + '_' + obj.name + '_texture', obj.properties.spritesheet);

                txLoader.on('load', this.onTextLoad.bind(this));
                txLoader.on('error', this.onTextError.bind(this));
                txLoader.load();
            }
        }

        //loop through each tileset and load the texture
        for(var s = 0, sl = this.data.tilesets.length; s < sl; ++s) {
            var set = this.data.tilesets[s],
                txLoader2;

            if(!set.image) continue;
            this.numTextures++;

            txLoader2 = new gf.TextureLoader(set.name + '_texture', this.url + set.image);

            txLoader2.on('load', this.onTextLoad.bind(this));
            txLoader2.on('error', this.onTextError.bind(this));
            txLoader2.load();
        }
    },
    onTextLoad: function() {
        this.numTextures--;

        if(this.numTextures === 0) {
            this.done();
        }
    },
    onTextError: function(e) {
        this.numTextures--;
        this.errors.push(e);

        if(this.numTextures === 0) {
            this.done();
        }
    },
    done: function() {
        if(this.errors.length)
            gf.Loader.prototype.error.call(this, this.errors);
        else
            gf.Loader.prototype.done.call(this, this.data);
    }
});
/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @class Map
 * @extends gf.DisplayObjectContainer
 * @namespace gf
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.Map = function(map) {
    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.size = new gf.Vector(map.width, map.height);

    //call base ctor
    gf.DisplayObjectContainer.call(this, map);
};

gf.inherits(gf.Map, gf.DisplayObjectContainer, {
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

            if(o.pan)
                o.pan(x, y);
        }
    },
    /**
     * Finds a layer based on the string name
     *
     * @method findLayer
     * @param name {String} The name of the layer to find
     * @return {Layer}
     */
    findLayer: function(name) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.name === name)
                return o;
        }
    }
});
/**
 * Base Tile implementation, a tile is a single tile in a tilemap layer
 *
 * @class Tile
 * @extends gf.Sprite
 * @namespace gf
 * @constructor
 * @param tile {Object} All the settings for the tile
 */
gf.Tile = function(texture) {
    this.collisionType = gf.Tile.TYPE.NONE;

    //call base ctor
    gf.Sprite.call(this, texture);

    this.type = gf.Sprite.TYPE.TILE;
};

gf.inherits(gf.Tile, gf.Sprite, {
    /**
     * On Collision Event
     *      called when this sprite collides into another, or is being collided into by another.
     *      By default if something collides with a collectable sprite we remove the collectable
     *      and if we collide with a solid tile we kill our velocity
     *
     * @method onCollision
     * @param obj {Sprite} Colliding sprite
     */
    onCollision: function(obj) {
        gf.Sprite.prototype.onCollision.call(this, obj);

        //I did a switch-case here because I feel like I
        //will be adding more defaults later
        switch(this.collisionType) {
            case gf.Tile.TYPE.SOLID:
                obj.setVelocity(0);
                break;
        }
    }
});

/**
 * Tile collision types
 *
 * @property TYPE
 * @type Object
 * @static
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
 * Base Layer implementation, provides common functions for all Layer types
 *
 * @class Layer
 * @extends gf.DisplayObjectContainer
 * @namespace gf
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
    gf.DisplayObjectContainer.call(this, layer);
};

gf.inherits(gf.Layer, gf.DisplayObjectContainer, {
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
 * ImageLayer is a layer represented by a single image
 *
 * @class ImageLayer
 * @extends gf.Layer
 * @namespace gf
 * @constructor
 * @param game {Game} The game the layer is in
 * @param position {Point|Vector|Array|Number} The starting position of the layer
 * @param layer {Object|Texture} All the settings for the layer, or the texture to use
 */
gf.ImageLayer = function(layer) {
    this.sprite = new gf.Sprite(layer.image || layer.texture || layer);

    this.addChild(this.sprite);

    //call base ctor
    gf.Layer.call(this, layer);
};

gf.inherits(gf.ImageLayer, gf.Layer);
/**
 * Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @class TiledMap
 * @extends gf.Map
 * @namespace gf
 * @constructor
 * @param game {Game} The game the map is in
 * @param position {Point|Vector|Array|Number} The starting position of the map
 * @param map {Object} All the settings for the map
 */
gf.TiledMap = function(map) {
    gf.Map.call(this, map);

    //Tiled Editor properties

    /**
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = gf.utils.parseTiledProperties(map.properties) || {};
    this.scale.x = this.properties.scale || 1;
    this.scale.y = this.properties.scale || 1;

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

    //Custom/Optional properties

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

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

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        this.tilesets.push(new gf.TiledTileset(map.tilesets[t]));
    }

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case 'tilelayer':
                lyr = new gf.TiledLayer(map.layers[i]);
                break;

            case 'objectgroup':
                lyr = new gf.TiledObjectGroup(map.layers[i]);
                break;

            case 'imagelayer':
                lyr = new gf.ImageLayer(map.layers[i]);
                break;
        }

        this.addChild(lyr);
    }

    this._showPhysics = false;
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
            if(this.tilesets[i].contains(tileId))
                return this.tilesets[i];
    },
    /**
     * Notifies the map it needs to resize, re renders the viewport
     *
     * @method resize
     */
    resize: function(width, height) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'tilelayer') {
                o.resize(width, height);
            }
        }
    },
    destroy: function() {
        gf.Map.prototype.destroy.call(this);

        for(var i = this.children.length - 1; i > -1; --i) {
            var o = this.children[i];

            if(o.destroy)
                o.destroy();
        }
    },
    /**
     * Spawns all the objects in the TiledObjectGroups of this map
     *
     * @method spawnObjects
     */
    spawnObjects: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'objectgroup') {
                o.spawn();
            }
        }
    },
    /**
     * Spawns all the objects in the TiledObjectGroups of this map
     *
     * @method spawnObjects
     */
    despawnObjects: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'objectgroup') {
                o.despawn();
            }
        }
    },
    /**
     * Called by a TiledLayer when a tile event occurs. This is so you can listen for
     * the emitted events on the world instead of the tile itself.
     *
     * @method onTileEvent
     * @param eventName {String} The event name to emit, the prefix 'tile.' will be added to it
     * @param tile {Tile} The tile that has the event
     * @param data {InteractionData} The raw interaction object for the event
     * @private
     */
    onTileEvent: function(eventName, tile, data) {
        this.emit('tile.' + eventName, {
            tile: tile,
            data: data
        });
    },
    /**
     * Called by a TiledObjectGroup when an object event occurs. This is so you can listen for
     * the emitted events on the world instead of the tile itself.
     *
     * @method onObjectEvent
     * @param eventName {String} The event name to emit, the prefix 'object.' will be added to it
     * @param obj {Sprite|DisplayObjectContainer} The object that has the event
     * @param data {InteractionData} The raw interaction object for the event
     * @private
     */
    onObjectEvent: function(eventName, obj, data) {
        this.emit('object.' + eventName, {
            object: obj,
            data: data
        });
    }
});

/**
 * The TiledLayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the TiledMap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @class TiledLayer
 * @extends gf.Layer
 * @namespace gf
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
    this.tileIds = gf.support.typedArrays ? new Uint32Array(layer.data) : layer.data;

    /**
     * The current map of all tiles on the screen
     *
     * @property tiles
     * @type Object
     */
    this.tiles = [];

    /**
     * The user-defined properties of this group. Usually defined in the TiledEditor
     *
     * @property properties
     * @type Object
     */
    this.properties = gf.utils.parseTiledProperties(layer.properties) || {};

    //translate some tiled properties to our inherited properties
    this.type = layer.type;
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;
    this.visible = layer.visible;

    this.preRender = this.properties.preRender;
    this.chunkSize = new gf.Vector(
        this.properties.chunkSizeX || this.properties.chunkSize || 512,
        this.properties.chunkSizeY || this.properties.chunkSize || 512
    );
    this._preRendered = false;

    this._tilePool = [];
    this._buffered = { left: false, right: false, top: false, bottom: false };
    this._panDelta = new gf.Vector();
    this._rendered = new gf.Rectangle();
};

gf.inherits(gf.TiledLayer, gf.Layer, {
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method resize
     * @param width {Number} The number of tiles in the X direction to render
     * @param height {Number} The number of tiles in the Y direction to render
     */
    resize: function(width, height) {
        if(this.preRender) {
            if(!this._preRendered)
                this._preRender();

            return;
        }

        //copy down our tilesize
        if(!this.tileSize)
            this.tileSize = this.parent.tileSize;

        //clear all the visual tiles
        this.clearTiles();

        //render the tiles on the screen
        this._renderTiles(
            -this.parent.position.x,
            -this.parent.position.y,
            width,
            height
        );

        this._updateRenderSq();

        if(this.hasPhysics) {
            //this -> map -> state -> physics
            this.parent.parent.physics.reindexStatic();
        }
    },
    //render the map onto a canvas once to use as a preRendered texture
    _preRender: function() {
        if(!this.visible)
            return;

        this._preRendered = true;
        this.tileSize = this.chunkSize.clone();

        var world = this.parent,
            width = world.size.x * world.tileSize.x,
            height = world.size.y * world.tileSize.y,
            xChunks = Math.ceil(width / this.chunkSize.x),
            yChunks = Math.ceil(height / this.chunkSize.y);

        //for each chunk
        for(var x = 0; x < xChunks; ++x) {
            for(var y = 0; y < yChunks; ++y) {
                var cw = (x === xChunks - 1) ? width - (x * this.chunkSize.x) : this.chunkSize.x,
                    ch = (y === yChunks - 1) ? height - (y * this.chunkSize.y) : this.chunkSize.y;

                this._preRenderChunk(x, y, cw, ch);
            }
        }
    },
    _preRenderChunk: function(cx, cy, w, h) {
        var world = this.parent,
            tsx = world.tileSize.x,
            tsy = world.tileSize.y,
            xTiles = w / tsx,
            yTiles = h / tsy,
            nx = (cx * this.chunkSize.x) % tsx,
            ny = (cy * this.chunkSize.y) % tsy,
            tx = Math.floor(cx * this.chunkSize.x / tsx),
            ty = Math.floor(cy * this.chunkSize.y / tsy),
            sx = world.size.x,
            sy = world.size.y,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = w;
        canvas.height = h;

        //draw all the tiles in this chunk to the canvas
        for(var x = 0; x < xTiles; ++x) {
            for(var y = 0; y < yTiles; ++y) {
                if(x + tx < sx && y + ty < sy) {
                    var id = ((x + tx) + ((y + ty) * sx)),
                        tid = this.tileIds[id],
                        set = world.getTileset(tid),
                        tex, frame;

                    if(set) {
                        tex = set.getTileTexture(tid);
                        frame = tex.frame;

                        ctx.drawImage(
                            tex.baseTexture.source,
                            frame.x,
                            frame.y,
                            frame.width,
                            frame.height,
                            (x * tsx) - nx + set.tileoffset.x,
                            (y * tsy) - ny + set.tileoffset.y,
                            frame.width,
                            frame.height
                        );
                    }
                }
            }
        }

        //use the canvas as a texture for a tile to display
        var tile = new gf.Tile(gf.Texture.fromCanvas(canvas));
        tile.setPosition(cx * this.chunkSize.x, cy * this.chunkSize.y);

        if(!this.tiles[cx])
            this.tiles[cx] = {};

        this.addChild(tile);
        this.tiles[cx][cy] = tile;
    },
    _renderTiles: function(sx, sy, sw, sh) {
        //convert to tile coords
        sx = Math.floor(sx / this.parent.scaledTileSize.x);
        sy = Math.floor(sy / this.parent.scaledTileSize.y);

        //ensure we don't go below 0
        sx = sx < 0 ? 0 : sx;
        sy = sy < 0 ? 0 : sy;

        //convert to tile sizes
        sw = Math.ceil(sw / this.parent.scaledTileSize.x) + 1;
        sh = Math.ceil(sh / this.parent.scaledTileSize.y) + 1;

        //ensure we don't go outside the map size
        sw = (sx + sw > this.parent.size.x) ? (this.parent.size.x - sx) : sw;
        sh = (sy + sh > this.parent.size.y) ? (this.parent.size.y - sy) : sh;

        //render new sprites
        var endX = sx + sw,
            endY = sy + sh;

        for(var x = sx; x < endX; ++x) {
            for(var y = sy; y < endY; ++y) {
                this.moveTileSprite(-1, -1, x, y);
            }
        }

        //set rendered area
        this._rendered.x = sx;
        this._rendered.y = sy;
        this._rendered.width = sw;
        this._rendered.height = sh;

        //reset buffered status
        this._buffered.left = this._buffered.right = this._buffered.top = this._buffered.bottom = false;

        //reset panDelta
        this._panDelta.x = this.parent.position.x % this.parent.scaledTileSize.x;
        this._panDelta.y = this.parent.position.y % this.parent.scaledTileSize.y;
    },
    _freeTile: function(tx, ty) {
        if(this.tiles[tx] && this.tiles[tx][ty]) {
            this.clearTile(this.tiles[tx][ty]);
            this.tiles[tx][ty] = null;
        }
    },
    destroy: function() {
        this.clearTiles(true);
        gf.Layer.prototype.destroy.call(this);
    },
    /**
     * Clears all the tiles currently used to render the layer
     *
     * @method clearTiles
     */
    clearTiles: function(remove) {
        for(var c = this.children.length - 1; c > -1; --c) {
            this.clearTile(this.children[c], remove);
        }

        this.tiles.length = 0;
    },
    clearTile: function(tile, remove) {
        tile.visible = false;
        tile.disablePhysics();

        if(remove)
            this.removeChild(tile);
        else
            this._tilePool.push(tile);
    },
    /**
     * Moves a tile sprite from one position to another, and creates a new tile
     * if the old position didn't have a sprite
     *
     * @method moveTileSprite
     * @param fromTileX {Number} The x coord of the tile in units of tiles (not pixels) to move from
     * @param fromTileY {Number} The y coord of the tile in units of tiles (not pixels) to move from
     * @param toTileX {Number} The x coord of the tile in units of tiles (not pixels) to move to
     * @param toTileY {Number} The y coord of the tile in units of tiles (not pixels) to move to
     * @return {Tile} The sprite to display
     */
    moveTileSprite: function(fromTileX, fromTileY, toTileX, toTileY) {
        //if off the map, just ignore it
        if(toTileX < 0 || toTileY < 0 || toTileX >= this.parent.size.x || toTileY >= this.parent.size.y) {
            return;
        }

        var tile,
            id = (toTileX + (toTileY * this.size.x)),
            tileId = this.tileIds[id],
            set = this.parent.getTileset(tileId),
            texture,
            props,
            position,
            hitArea,
            interactive;

        //if no tileset, just ensure the "from" tile is put back in the pool
        if(!set) {
            this._freeTile(fromTileX, fromTileY);
            return;
        }

        //grab some values for the tile
        texture = set.getTileTexture(tileId);
        props = set.getTileProperties(tileId);
        hitArea = props.hitArea || set.properties.hitArea;
        interactive = this._getInteractive(set, props);
        position = [
            (toTileX * this.parent.tileSize.x) + set.tileoffset.x,
            (toTileY * this.parent.tileSize.y) + set.tileoffset.y
        ];

        //due to the fact that we use top-left anchors for everything, but tiled uses bottom-left
        //we need to move the position of each tile down by a single map-tile height. That is why
        //there is an addition of "this.parent.tileSize.y" to the coords
        position[1] +=  this.parent.tileSize.y;

        //if there is one to move in the map, lets just move it
        if(this.tiles[fromTileX] && this.tiles[fromTileX][fromTileY]) {
            tile = this.tiles[fromTileX][fromTileY];
            this.tiles[fromTileX][fromTileY] = null;
            tile.disablePhysics();
        }
        //otherwise grab a new tile from the pool
        else {
            tile = this._tilePool.pop();
        }

        //if we couldn't find a tile from the pool, or one to move
        //then create a new tile
        if(!tile) {
            tile = new gf.Tile(texture);
            tile.mass = props.mass;
            tile.inertia = props.inertia;
            tile.anchor.y = 1;
            this.addChild(tile);
        }

        tile.collisionType = props.type;
        tile.visible = true;
        tile.hitArea = hitArea;
        tile.interactive = interactive;

        tile.setTexture(texture);
        tile.setPosition(position[0], position[1]);

        if(props.mass) {
            this.hasPhysics = true;
            tile.enablePhysics(this.parent.parent.physics); //this.TiledMap.GameState.physics
        }

        //pass through all events
        if(interactive) {
            tile.click = this.onTileEvent.bind(this, 'click', tile);
            tile.mousedown = this.onTileEvent.bind(this, 'mousedown', tile);
            tile.mouseup = this.onTileEvent.bind(this, 'mouseup', tile);
            tile.mousemove = this.onTileEvent.bind(this, 'mousemove', tile);
            tile.mouseout = this.onTileEvent.bind(this, 'mouseout', tile);
            tile.mouseover = this.onTileEvent.bind(this, 'mouseover', tile);
            tile.mouseupoutside = this.onTileEvent.bind(this, 'mouseupoutside', tile);
        }

        //update sprite position in the map
        if(!this.tiles[toTileX])
            this.tiles[toTileX] = [];

        this.tiles[toTileX][toTileY] = tile;

        return tile;
    },
    onTileEvent: function(eventName, tile, data) {
        this.parent.onTileEvent(eventName, tile, data);
    },
    _getInteractive: function(set, props) {
        //first check the lowest level value (on the tile iteself)
        return props.interactive || //obj interactive
                (set && set.properties.interactive) || //tileset interactive
                this.properties.interactive || //layer interactive
                this.parent.properties.interactive; //map interactive
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
        if(this.preRender)
            return;

        //track panning delta so we know when to render
        this._panDelta.x += dx;
        this._panDelta.y += dy;

        var tszX = this.parent.scaledTileSize.x,
            tszY = this.parent.scaledTileSize.y;

        //check if we need to build a buffer around the viewport
        //usually this happens on the first pan after a full render
        //caused by a viewport resize. WE do this buffering here instead
        //of in the initial render because in the initial render, the buffer
        //may try to go negative which has no tiles. Plus doing it here
        //reduces the number of tiles that need to be created initially.

        //moving world right, so left will be exposed
        if(dx > 0 && !this._buffered.left)
            this._renderLeft(this._buffered.left = true);
        //moving world left, so right will be exposed
        else if(dx < 0 && !this._buffered.right)
            this._renderRight(this._buffered.right = true);
        //moving world down, so top will be exposed
        else if(dy > 0 && !this._buffered.top)
            this._renderUp(this._buffered.top = true);
        //moving world up, so bottom will be exposed
        else if(dy < 0 && !this._buffered.bottom)
            this._renderDown(this._buffered.bottom = true);

        //Here is where the actual panning gets done, we check if the pan
        //delta is greater than a scaled tile and if so pan that direction.
        //The reason we do it in a while loop is because the delta can be
        //large than 1 scaled tile and may require multiple render pans
        //(this can happen if you can .pan(x, y) with large values)

        //moved position right, so render left
        while(this._panDelta.x >= tszX) {
            this._renderLeft();
            this._panDelta.x -= tszX;
        }

        //moved position left, so render right
        while(this._panDelta.x <= -tszX) {
            this._renderRight();
            this._panDelta.x += tszX;
        }

        //moved position down, so render up
        while(this._panDelta.y >= tszY) {
            this._renderUp();
            this._panDelta.y -= tszY;
        }

        //moved position up, so render down
        while(this._panDelta.y <= -tszY) {
            this._renderDown();
            this._panDelta.y += tszY;
        }

        if(this.hasPhysics) {
            this.parent.parent.physics.reindexStatic();
        }
    },
    _renderLeft: function(forceNew) {
        //move all the far right tiles to the left side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.right,
                forceNew ? -1 : this._rendered.top + i,
                this._rendered.left - 1,
                this._rendered.top + i
            );
        }
        this._rendered.x--;
        if(forceNew) this._rendered.width++;
        this._updateRenderSq();
    },
    _renderRight: function(forceNew) {
        //move all the far left tiles to the right side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left,
                forceNew ? -1 : this._rendered.top + i,
                this._rendered.right + 1,
                this._rendered.top + i
            );
        }
        if(!forceNew) this._rendered.x++;
        if(forceNew) this._rendered.width++;
        this._updateRenderSq();
    },
    _renderUp: function(forceNew) {
        //move all the far bottom tiles to the top side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left + i,
                forceNew ? -1 : this._rendered.bottom,
                this._rendered.left + i,
                this._rendered.top - 1
            );
        }
        this._rendered.y--;
        if(forceNew) this._rendered.height++;
        this._updateRenderSq();
    },
    _renderDown: function(forceNew) {
        //move all the far top tiles to the bottom side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left + i,
                forceNew ? -1 : this._rendered.top,
                this._rendered.left + i,
                this._rendered.bottom + 1
            );
        }
        if(!forceNew) this._rendered.y++;
        if(forceNew) this._rendered.height++;
        this._updateRenderSq();
    },
    _updateRenderSq: function() {
        this._rendered.left = this._rendered.x;
        this._rendered.right = this._rendered.x + this._rendered.width - 1;
        this._rendered.top = this._rendered.y;
        this._rendered.bottom = this._rendered.y + this._rendered.height - 1;
    }
});

/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @class TiledTileset
 * @extends gf.Texture
 * @namespace gf
 * @constructor
 * @param settings {Object} All the settings for the tileset
 */
//TODO: Support external tilesets (TSX files) via the "source" attribute
//see: https://github.com/bjorn/tiled/wiki/TMX-Map-Format#tileset
gf.TiledTileset = function(settings) {
    if(!gf.assetCache[settings.name + '_texture']) {
        throw 'You must preload the tileset images! Try loading the world file with the AssetLoader';
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
        ~~((this.baseTexture.source.width - this.margin) / (this.tileSize.x - this.spacing)), //75 / 
        ~~((this.baseTexture.source.height - this.margin) / (this.tileSize.y - this.spacing))
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

    //massages strings into the values they should be
    //i.e. "true" becomes the value: true
    this.properties = gf.utils.parseTiledProperties(this.properties);

    //massage tile properties
    for(var k in this.tileproperties) {
        this.tileproperties[k] = gf.utils.parseTiledProperties(this.tileproperties[k]);
    }

    //generate tile textures
    for(var t = 0, tl = this.lastgid - this.firstgid + 1; t < tl; ++t) {
        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(t / this.numTiles.x),
            x = (t - (y * this.numTiles.x));

        //get location in pixels
        x = (x * this.tileSize.x) + (x * this.spacing) + this.margin;
        y = (y * this.tileSize.y) + (y * this.spacing) + this.margin;

        this.textures.push(
            new gf.Texture(
                this.baseTexture,
                new PIXI.Rectangle(x, y, this.tileSize.x, this.tileSize.y)
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

        var flags = gf.TiledTileset.FLAGS,
            flippedX = tileId & flags.FlippedX,
            flippedY = tileId & flags.FlippedY,
            rotatedCW = tileId & flags.RotatedCW;

        //remove flags
        tileId &= ~(flags.FlippedX | flags.FlippedY | flags.RotatedCW);

        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        var props = this.tileproperties[tileId] ?
                //get this value
                this.tileproperties[tileId] :
                //set this id to default values and cache
                this.tileproperties[tileId] = {
                    collidable: false,
                    breakable: false,
                    type: gf.Tile.TYPE.NONE
                };

        props.flippedX = flippedX;
        props.flippedY = flippedY;
        props.rotatedCW = rotatedCW;

        return props;
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

        var flags = gf.TiledTileset.FLAGS;

        //remove flags
        tileId &= ~(flags.FlippedX | flags.FlippedY | flags.RotatedCW);

        //get the internal ID of the tile in this set (0 indexed)
        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        return this.textures[tileId];
    },
    contains: function(tileId) {
        if(tileId === undefined) return false;

        var flags = gf.TiledTileset.FLAGS;

        //remove flags
        tileId &= ~(flags.FlippedX | flags.FlippedY | flags.RotatedCW);

        return (tileId >= this.firstgid && tileId <= this.lastgid);
    }
});

//Tileset GID flags
gf.TiledTileset.FLAGS = {
    FlippedX: 0x80000000,
    FlippedY: 0x40000000,
    RotatedCW: 0x20000000
};
/**
 * Tiled object group is a special layer that contains entities
 * TODO: This is all trash
 *
 * @class TiledObjectGroup
 * @extends gf.Layer
 * @namespace gf
 * @constructor
 * @param group {Object} All the settings for the layer
 */
 gf.TiledObjectGroup = function(group) {
    gf.Layer.call(this, group);

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
    this.type = group.type;
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
        var game = this.parent.parent.game; //this.TiledMap.GameState.Game

        //we go through these backwards so that things that are higher in the
        //list of object gets rendered on top.
        for(var i = this.objects.length - 1; i >= 0; --i) {
            var o = this.objects[i],
                props = gf.utils.parseTiledProperties(o.properties) || {},
                set,
                interactive,
                obj;

            props.tileprops = {};

            //create a sprite with that texture
            if(o.gid) {
                set = this.parent.getTileset(o.gid);

                if(set) {
                    props.texture = set.getTileTexture(o.gid);
                    props.tileprops = set.getTileProperties(o.gid);

                    //if no hitArea then use the tileset's if available
                    if(!props.hitArea) {
                        if(props.tileprops.hitArea)
                            props.hitArea = props.tileprops.hitArea;
                        else
                            props.hitArea = set.properties.hitArea;
                    }
                }
            }
            //non-sprite object (usually to define an "area" on a map)
            else {
                if(!props.hitArea) {
                    //define a hitArea
                    if(o.polyline)
                        props.hitArea = this._getPolyline(o);
                    else if(o.polygon)
                        props.hitArea = this._getPolygon(o);
                    else if(o.ellipse)
                        props.hitArea = this._getEllipse(o);
                    else
                        props.hitArea = this._getRectangle(o);
                }
            }

            o.name = o.name || props.name || props.tileprops.name;
            o.type = o.type || props.type || props.tileprops.type;

            //a manually specified string texture
            if(typeof props.texture === 'string') {
                props.texture = gf.assetCache[props.texture];
            }

            //just a regular DisplayObject
            if(!props.texture) {
                obj = new gf.DisplayObjectContainer();

                obj.width = o.width;
                obj.height = o.height;
                obj.name = o.name;
                obj.type = o.type;
                obj.hitArea = props.hitArea;
                obj.rotation = o.rotation;
                obj.sensor = true;

                //these are treated as sensor bodies, so always enable physics
                obj.setPosition(o.x, o.y);
                obj.enablePhysics(game.physics);
                if(this.parent._showPhysics)
                    obj.showPhysics();
            } else {
                //some variable for the user if they want them
                //these will be passed through to a custom sprite if wanted
                props.width = o.width;
                props.height = o.height;
                props.zIndex = this.zIndex;

                obj = game.spritepool.create(o.name, props.texture, props);

                //assign some values
                obj.name = o.name;
                obj.type = o.type;
                obj.hitArea = props.hitArea;
                obj.mass = props.mass || props.tileprops.mass;
                obj.inertia = props.inertia || props.tileprops.inertia;
                obj.friction = props.friction || props.tileprops.friction;
                obj.sensor = props.sensor || props.tileprops.sensor;
                obj.setPosition(o.x, o.y);

                var a = props.anchor || props.tileprops.anchor;
                obj.anchor.y = a ? a[1] : 1;
                obj.anchor.x = a ? a[0] : (this.parent.orientation === 'isometric' ? 0.5 : 0);

                if(props.mass || props.tileprops.mass) {
                    obj.enablePhysics(game.physics);

                    if(this.parent._showPhysics)
                        obj.showPhysics();
                }

                if(props.tileprops) {
                    if(props.tileprops.flippedX) {
                        obj.scale.x = -1;
                        obj.anchor.x = a ? a[0] : 1;
                    }

                    if(props.tileprops.flippedY) {
                        obj.scale.y = -1;
                        obj.anchor.y = a ? a[1] : 0;
                    }

                    //IDK if this is right
                    if(props.tileprops.rotatedCW) {
                        obj.rotation = gf.math.degreesToRadians(45);
                    }
                }

                if(props.animation || props.tileprops.animation) {
                    if(obj.gotoAndPlay) {
                        obj.gotoAndPlay(props.animation || props.tileprops.animation);
                    }
                }

                //set some more stuffz
                if(typeof o.rotation === 'number')
                    obj.setRotation(o.rotation);
            }

            //visible was recently added to Tiled, default old versions to true
            obj.visible = o.visible !== undefined ? !!o.visible : true;

            if(this.parent.orientation === 'isometric') {
                var toTileX = o.x / this.parent.tileSize.x,
                    toTileY = o.y / this.parent.tileSize.y;

                //This cannot be the simplest form of this...
                o.x = (toTileX * this.parent.tileSize.x) - ((toTileY - 1) * (this.parent.tileSize.x / 2));
                o.y = (toTileY * this.parent.tileSize.y / 2) + (toTileX * this.parent.tileSize.y);
            }

            interactive = this._getInteractive(set, props);

            //pass through all events
            if(interactive) {
                obj.interactive = interactive;

                obj.click = this.onObjectEvent.bind(this, 'click', obj);
                obj.mousedown = this.onObjectEvent.bind(this, 'mousedown', obj);
                obj.mouseup = this.onObjectEvent.bind(this, 'mouseup', obj);
                obj.mousemove = this.onObjectEvent.bind(this, 'mousemove', obj);
                obj.mouseout = this.onObjectEvent.bind(this, 'mouseout', obj);
                obj.mouseover = this.onObjectEvent.bind(this, 'mouseover', obj);
                obj.mouseupoutside = this.onObjectEvent.bind(this, 'mouseupoutside', obj);
            }

            //set custom properties
            obj.properties = {};
            for(var t in props.tileprops)
                obj.properties[t] = props.tileprops[t];
            for(var k in props)
                if(k !== 'tileprops')
                    obj.properties[k] = props[k];

            obj._objIndex = i;
            this.addChild(obj);
        }

        return this;
    },
    onObjectEvent: function(eventName, obj, data) {
        this.parent.onObjectEvent(eventName, obj, data);
    },
    _getPolygon: function(o) {
        var points = [];
        for(var i = 0, il = o.polygon.length; i < il; ++i) {
            points.push(new gf.Point(o.polygon[i].x, o.polygon[i].y));
        }

        return new gf.Polygon(points);
    },
    _getPolyline: function(o) {
        var points = [];
        for(var i = 0, il = o.polyline.length; i < il; ++i) {
            points.push(new gf.Point(o.polyline[i].x, o.polyline[i].y));
        }

        return new gf.Polygon(points);
    },
    _getEllipse: function(o) {
        return new gf.Ellipse(0, 0, o.width, o.height);
    },
    _getRectangle: function(o) {
        return new gf.Rectangle(0, 0, o.width, o.height);
    },
    _getInteractive: function(set, props) {
        //first check the lowest level value (on the tile iteself)
        return props.interactive || //obj interactive
                props.tileprops.interactive || //tile object interactive
                (set && set.properties.interactive) || //tileset interactive
                this.properties.interactive || //layer interactive
                this.parent.properties.interactive; //map interactive
    },
    /**
     * Despawns all the sprites associated with this layer
     *
     * @method despawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    despawn: function() {
        //remove each sprite from the game
        for(var i = this.children.length - 1; i > -1; --i) {
            var c = this.children[i];

            if(c.destroy)
                c.destroy();
        }

        return this;
    },
    destroy: function() {
        this.despawn();
        gf.Layer.prototype.destroy.call(this);
    }
});

/**
 * Holds a pool of different Objects to help reduce the number times
 * an object is created and destroyed.
 *
 * @class ObjectPool
 * @extends Object
 * @namespace gf
 * @constructor
 * @param type {mixed} The object type that this pool will hold (like gf.Sprite, or gf.Tile)
 * @param parent {mixed} The parent that the objects will be added to. Passing this in will
 *      make the pool add any newly created objects as children to this object.
 */
gf.ObjectPool = function(type, parent) {
    this.type = type;
    this.pool = [];
    this.parent = parent;
};

gf.inherits(gf.ObjectPool, Object, {
    /**
     * Creates a new instance of the pool's object type, or if available
     * pulls one that is already created out of the pool
     *
     * @method create
     */
    create: function() {
        var o = this.pool.pop();

        if(!o) {
            o = this._construct(this.type, arguments);
            if(this.parent)
                this.parent.addChild(o);
        }

        o.__allocated = true;

        return o;
    },
    /**
     * Frees an object back into the pool to be recycled
     *
     * @method free
     */
    free: function(o) {
        //don't free something twice
        if(o.__allocated) {
            o.__allocated = false;
            this.pool.push(o);
        }
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
 * Holds a pool of different Sprites that can be created, makes it very
 * easy to quickly create different registered entities
 *
 * @class SpritePool
 * @extends Object
 * @namespace gf
 * @constructor
 */
gf.SpritePool = function() {
    this.types = {};

    this.add('_default', gf.Sprite);
};

gf.inherits(gf.SpritePool, Object, {
    /**
     * Adds an Sprite Type to the pool
     *
     * @method add
     * @param name {String} The user-defined name of the Sprite Type to add
     * @param obj {Sprite} The Sprite or decendant type to add to the pool
     * @return {Sprite} Returns the passed sprite
     */
    add: function(name, obj) {
        return this.types[name] = obj;
    },
    /**
     * Checks if the Sprite Type exists in the pool
     *
     * @method has
     * @param name {String} The user-defined name of the Sprite Type to check if is in the pool
     * @return {Boolean}
     */
    has: function(name) {
        return !!this.types[name];
    },
    /**
     * Creates a new sprite from the pool
     *
     * @method create
     * @param name {String} The user-defined name of the Sprite to check if is in the pool
     * @param texture {Texture} The texture for the sprite
     * @param props {Object} Extra object that will be passed along (for custom sprite options)
     * @return {Sprite} Returns a new instance of the object from the pool
     */
    create: function(name, texture, props) {
        if(!name || !this.types[name])
            name = '_default';

        return new this.types[name](texture, props);
    },
    //currently doesn't do any recycling unfortunately
    free: function() {
        return;
    }
});


})(window);