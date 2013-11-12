var inherit = require('../utils/inherit'),
    Vector = require('../math/Vector'),
    C = require('../constants');

/**
 * A *convex* clockwise Polygon.
 *
 * @class Polygon
 * @constructor
 * @param x {Number} The X origin of the polygon, all X coords for all points are relative to this
 * @param y {Number} The Y origin of the polygon, all Y coords for all points are relative to this
 * @param points {Array<Vector>|Array<Number>} This can be an array of Vectors that form the polygon,
 *      a flat array of numbers that will be interpreted as [x,y, x,y, ...]
 * @param scale {Number} The scale of the polygon
 */
var Polygon = function(x, y, points, scale) {
    /**
     * The origin point of the polygon, all points are relative to this
     *
     * @property position
     * @type Vector
     */
    this.position = new Vector();

    /**
     * The unscaled points of the polygon, the X & Y values here should be
     * relative to the origin X & Y.
     *
     * @property _points
     * @type Array<Vector>
     * @default []
     * @private
     */
    this._points = null;

    /**
     * The scale of the polygon
     *
     * @property scale
     * @type Vector
     * @default new Vector(1, 1)
     */
    this.scale = scale || new Vector(1, 1);

    /**
     * The points of the polygon, the X & Y values here should be
     * relative to the origin X & Y values.
     *
     * @property points
     * @type Array<Vector>
     * @default []
     */
    this.points = [];

    /**
     * These vectors are calculated by `this.recalc()` and represent the edges
     * of the polygon defined by it's points.
     *
     * @property edges
     * @type Array<Vector>
     * @default []
     * @readOnly
     */
    this.edges = [];

    /**
     * These vectors are calculated by `this.recalc()` and represent the normals
     * of the polygon edges defined by it's points.
     *
     * @property normals
     * @type Array<Vector>
     * @default []
     * @readOnly
     */
    this.normals = [];

    //if this is a flat array of numbers, convert it to points
    if(typeof points[0] === 'number') {
        var p = [];
        for(var i = 0, il = points.length; i < il; i+=2) {
            p.push(
                new Vector(points[i], points[i + 1])
            );
        }

        points = p;
    }

    //assign the points
    this._points = points;

    //set position
    this.x = x || 0;
    this.y = y || 0;

    //recalculate scaled points, edges, and normals
    this.recalc();

    //internal shape type
    this._shapetype = C.SHAPE.POLYGON;
};

inherit(Polygon, Object, {
    /**
     * Creates a clone of this polygon
     *
     * @method clone
     * @return {Polygon} a copy of the polygon
     */
    clone: function() {
        var points = [];
        for (var i=0; i<this._points.length; i++) {
            points.push(this._points[i].clone());
        }

        return new Polygon(points, this.scale);
    },

    /**
     * Copies the values from another polygon to this one
     *
     * @method copy
     * @param polygon {Polygon} The polygon to copy vlaues from
     * @return {Polygon} Returns itself.
     * @chainable
     */
    copy: function(poly) {
        //copy the position
        this.position.copy(poly.position);

        //clone the points to this polygon
        this._points.length = this.points.length = 0;
        for(var i = 0; i < poly._points.length; ++i) {
            this._points.push(poly._points[i].clone());
        }

        this.scale.copy(poly.scale);

        //update our edges and normals
        this.recalc();

        return this;
    },

    /**
     * Checks if the x, and y coords passed to this function are contained within this polygon
     *
     * @method contains
     * @param x {Number} The X coord of the point to test
     * @param y {Number} The Y coord of the point to test
     * @return {Boolean} if the x/y coords are within this polygon
     */
    contains: function(x, y) {
        var inside = false;

        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        for(var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            var xi = this.points[i].x, yi = this.points[i].y,
                xj = this.points[j].x, yj = this.points[j].y,
                intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if(intersect) inside = !inside;
        }

        return inside;
    },

    /**
     * Checks if this polygon's values are equal to anothers
     *
     * @method equals
     * @param polygon {Polygon} The polygon to check against
     * @return {Boolean} True if they are equal
     */
    equals: function(poly) {
        //check position and points array length
        if(!this.position.equals(poly.position) || this.points.length !== poly.points.length) {
            return false;
        }

        //check each point
        for(var i = 0; i < poly.points.length; ++i) {
            if(!this.points[i].equals(poly.points[i])) {
                return false;
            }
        }

        return true;
    },

    /**
     * Recalculates the scaled points, edges, and normals of this polygon
     * based on the relative points
     *
     * @method recalc
     * @return {Polygon} Returns itself.
     * @chainable
     */
    recalc: function() {
        var points = this._points,
            len = points.length,
            p1, p2, e, n, i = 0;

        //scale our points
        for(i = 0; i < len; i++) {
            if(!this.points[i])
                this.points[i] = new Vector();

            this.points[i].set(
                this._points[i].x * this.scale.x,
                this._points[i].y * this.scale.y
            );
        }

        // reset edges and normals
        this.edges.length = this.normals.length = 0;

        //calculate edges and normals
        for(i = 0; i < len; ++i) {
            p1 = points[i];
            p2 = i < len - 1 ? points[i + 1] : points[0];
            e = p2.clone().sub(p1);
            n = e.clone().perp().normalize();

            this.edges.push(e);
            this.normals.push(n);
        }

        return this;
    }
});

/**
 * The origin X coord of the polygon
 *
 * @property x
 * @type Number
 * @default 0
 */
Object.defineProperty(Polygon.prototype, 'x', {
    get: function() {
        return this.position.x;
    },
    set: function(v) {
        this.position.x = v;
    }
});

/**
 * The origin Y coord of the polygon
 *
 * @property x
 * @type Number
 * @default 0
 */
Object.defineProperty(Polygon.prototype, 'y', {
    get: function() {
        return this.position.y;
    },
    set: function(v) {
        this.position.y = v;
    }
});

module.exports = Polygon;
