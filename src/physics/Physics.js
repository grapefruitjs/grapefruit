// Based heavily on SAT.js
// https://github.com/jriecken/sat-js

var QuadTree = require('../math/QuadTree'),
    Collision = require('./Collision'),
    Vector = require('../math/Vector'),
    inherit = require('../utils/inherit'),
    math = require('../math/math'),
    C = require('../constants');

/**
 * Pool of Vectors used in calculations.
 *
 * @type {Array<Vector>}
 */
var T_VECTORS = [];
for (var i = 0; i < 10; i++)
    T_VECTORS.push(new Vector());

/**
 * Pool of Arrays used in calculations.
 *
 * @type {Array<Array<mixed>>}
 */
var T_ARRAYS = [];
for (var i = 0; i < 5; i++)
    T_ARRAYS.push([]);

var Physics = function(state) {
    this.state = state;

    /**
     * The maximum objects the quad tree will tolerate in a single quadrant
     *
     * @property maxObjects
     * @type Number
     */
    this.maxObjects = C.PHYSICS.MAX_QUAD_OBJECTS;

    /**
     * The maximum levels deep the quad tree will go to
     *
     * @property maxLevels
     * @type Number
     */
    this.maxLevels = C.PHYSICS.MAX_QUAD_LEVELS;

    /**
     * The QuadTree used to help detect likely collisions
     *
     * @property tree
     * @type QuadTree
     */
    this.tree = new QuadTree(state.world.bounds.clone(), this.maxObjects, this.maxLevels);

    /**
     * The bodies that have been added to this physics system
     *
     * @property tree
     * @type QuadTree
     */
    this.bodies = [];

    /**
     * The gravity that the system will simulate
     *
     * @property gravity
     * @type Vector
     */
    this.gravity = new Vector(0, 9.87);

    this._collision = new Collision();
};

inherit(Physics, Object, {
    /**
     * Called each frame by the engine to calculate the quadtree, and update physical bodies
     *
     * @method update
     * @param deltaTime {Number} The delta in seconds since the last call
     */
    update: function(dt) {
        //clear quad tree
        this.tree.clear();

        var bods = this.bodies,
            body, i,
            pots, p,
            il = bods.length,
            pl,
            pot;

        //update bodies and build quadtree
        for(i = 0; i < il; ++i) {
            body = bods[i];

            body.update(dt, this.gravity);
            body._collided = false;

            //TODO: Check worldVisible so that children that are ".visible === true"
            // but are invisible due to parent are filtered out. However in that case
            // invisible collision layers will also not be put in; how to handle?!
            if(body.allowCollide && body.sprite.visible) {
                this.tree.insert(body);
            }
        }

        //select likely collisions
        for(i = 0; i < il; ++i) {
            body = bods[i];

            //get likely collisions
            pots = this.tree.retrieve(body);

            for(p = 0, pl = pots.length; p < pl; ++p) {
                pot = pots[p];

                //filter yourself
                if(pot === body)
                    continue;

                //ignore static/static collisions
                if(body.type === C.PHYSICS_TYPE.STATIC && pot.type === C.PHYSICS_TYPE.STATIC)
                    continue;

                //ignore repeat collisions
                if(body._collided && pot._collided)
                    continue;

                //clear previous collision value
                this._collision.clear();

                //check for a collision between the shapes using SAT
                if(this.checkShapeCollision(body, pot)) {
                    //if they do collide, run user callbacks so they can override if they want
                    if(body.sprite.onCollide(pot.sprite, this._collision.clone()) !== false && pot.sprite.onCollide(body.sprite, this._collision.clone()) !== false) {
                        //if neither override then mark both as collided and solve
                        body._collided = true;
                        pot._collided = true;
                        this.solveCollision(body, pot);
                        break;
                    }
                }
            }
        }
    },
    solveCollision: function(b1, b2) {
        var col = this._collision,
            ov = col.overlapV;

        //sensor bodies are only for detection, not to be solved
        if(b1.sensor || b2.sensor)
            return;

        //separate bodies
        if(ov.x)
            this._separate(b1, b2, ov.x, 'x');

        if(ov.y)
            this._separate(b1, b2, ov.y, 'y');

        //special case for things that carry stuff (like moving platforms)
        if(b2.carry && (b1.touching & C.DIRECTION.BOTTOM)) {
            b1.x += b2.deltaX();
        } else if(b1.carry && (b2.touching & C.DIRECTION.BOTTOM)) {
            b2.x += b1.deltaX();
        }

        //sync sprites and shapes
        b1.syncSprite();
        b1.syncShape();

        b2.syncSprite();
        b2.syncShape();
    },
    _separate: function(b1, b2, over, ax) {
        var v1 = b1.velocity[ax],
            v2 = b2.velocity[ax];

        //separate non-static bodies
        if(b1.type !== C.PHYSICS_TYPE.STATIC && b2.type !== C.PHYSICS_TYPE.STATIC) {
            over *= 0.5;

            //perform the actual separation
            b1[ax] -= over;
            b2[ax] += over;

            //update velocities
            var nv1 = math.sqrt((v2 * v2 * b2.mass) / b1.mass) * ((v2 > 0) ? 1 : -1),
                nv2 = math.sqrt((v1 * v1 * b1.mass) / b2.mass) * ((v1 > 0) ? 1 : -1),
                avg = (v1 + v2) * 0.5;

            nv1 -= avg;
            nv2 -= avg;

            b1.velocity[ax] = avg + (nv1 * b1.bounce[ax]);
            b2.velocity[ax] = avg + (nv2 * b2.bounce[ax]);
        }
        //body1 isn't static
        else if(b1.type !== C.PHYSICS_TYPE.STATIC) {
            b1[ax] -= over;
            b1.velocity[ax] = v2 - (v1 * b1.bounce[ax]);
        }
        //body2 isn't static
        else if(b2. type !== C.PHYSICS_TYPE.STATIC) {
            b2[ax] += over;
            b2.velocity[ax] = v1 - (v2 * b2.bounce[ax]);
        }
    },
    checkShapeCollision: function(b1, b2) {
        var hit = false;

        //if this is a circle
        if(b1.shape._shapetype === C.SHAPE.CIRCLE) {
            //circle-circle check
            if(b2.shape._shapetype === C.SHAPE.CIRCLE) {
                hit = this.testCircleCircle(b1.shape, b2.shape, this._collision);
            }
            //circle-polygon check
            else {
                hit = this.testCirclePolygon(b1.shape, b2.shape, this._collision);
            }
        }
        //otherwise a polygon
        else {
            //polygon-circle check
            if(b2.shape._shapetype === C.SHAPE.CIRCLE) {
                hit = this.testPolygonCircle(b1.shape, b2.shape, this._collision);
            }
            //polygon-polygon check
            else {
                hit = this.testPolygonPolygon(b1.shape, b2.shape, this._collision);
            }
        }

        //check allow collide flags
        if(hit) {
            var on = this._collision.overlapN,
                ov = this._collision.overlapV;

            //check x collision to the right
            if(on.x > 0) {
                if(!(b1.allowCollide & C.DIRECTION.RIGHT) || !(b2.allowCollide & C.DIRECTION.LEFT)) {
                    on.x = 0;
                    ov.x = 0;
                } else {
                    b1.touching |= C.DIRECTION.RIGHT;
                    b2.touching |= C.DIRECTION.LEFT;
                }
            }
            //check x collision to the left
            else if(on.x < 0) {
                if(!(b1.allowCollide & C.DIRECTION.LEFT) || !(b2.allowCollide & C.DIRECTION.RIGHT)) {
                    on.x = 0;
                    ov.x = 0;
                } else {
                    b1.touching |= C.DIRECTION.LEFT;
                    b2.touching |= C.DIRECTION.RIGHT;
                }
            }

            //check y collision down
            if(on.y > 0) {
                if(!(b1.allowCollide & C.DIRECTION.BOTTOM) || !(b2.allowCollide & C.DIRECTION.TOP)) {
                    on.y = 0;
                    ov.y = 0;
                } else {
                    b1.touching |= C.DIRECTION.BOTTOM;
                    b2.touching |= C.DIRECTION.TOP;
                }
            }
            //check y collision up
            else if(on.y < 0) {
                if(!(b1.allowCollide & C.DIRECTION.TOP) || !(b2.allowCollide & C.DIRECTION.BOTTOM)) {
                    on.y = 0;
                    ov.y = 0;
                } else {
                    b1.touching |= C.DIRECTION.TOP;
                    b2.touching |= C.DIRECTION.BOTTOM;
                }
            }

            if(!on.x && !on.y)
                hit = false;
        }

        return hit;
    },
    /**
     * Adds a sprite to the physics simulation
     *
     * @method addSprite
     * @param sprite {Sprite} The sprite to add to the simulation
     */
    addSprite: function(sprite) {
        this.addBody(sprite.body);
        sprite._physics = this;
    },
    /**
     * Removes a sprite from the physics simulation
     *
     * @method removeSprite
     * @param sprite {Sprite} The sprite to remove from the simulation
     */
    removeSprite: function(sprite) {
        this.removeBody(sprite.body);
        sprite._physics = null;
    },
    /**
     * Adds a body to the physics simulation
     *
     * @method addBody
     * @param body {Body} The body to add to the simulation
     */
    addBody: function(body) {
        this.bodies.push(body);
    },
    /**
     * Removes a body from the physics simulation
     *
     * @method removeSprite
     * @param body {Body} The body to remove from the simulation
     */
    removeBody: function(body) {
        var i = this.bodies.indexOf(body);

        if (i !== -1)
            this.bodies.splice(i, 1);
    },

    /****************************************************
     * Shape testing functions
     ****************************************************/
    /**
     * Check if two circles intersect.
     *
     * @param a {Circle} The first circle.
     * @param b {Circle} The second circle.
     * @param [response] {Collision} Collision object (optional) that will be populated if the circles intersect.
     * @return {Boolean} true if the circles intersect, false if they don't.
     */
    testCircleCircle: function(a, b, response) {
        var differenceV = T_VECTORS.pop().copy(b.position).sub(a.position),
            totalRadius = a.r + b.r,
            totalRadiusSq = totalRadius * totalRadius,
            distanceSq = differenceV.lengthSq();

        // They do not intersect
        if (distanceSq > totalRadiusSq) {
            T_VECTORS.push(differenceV);
            return false;
        }

        // They intersect.  If we're calculating a response, calculate the overlap.
        if (response) {
            var dist = math.sqrt(distanceSq);
            response.a = a;
            response.b = b;
            response.overlap = totalRadius - dist;
            response.overlapN.copy(differenceV.normalize());
            response.overlapV.copy(differenceV).multiplyScalar(response.overlap);
            response.aInB = a.r <= b.r && dist <= b.r - a.r;
            response.bInA = b.r <= a.r && dist <= a.r - b.r;
        }

        T_VECTORS.push(differenceV);

        return true;
    },
    /**
     * Check if a polygon and a circle intersect.
     *
     * @param polygon {Polygon} The polygon.
     * @param circle {Circle} The circle.
     * @param [response] {Collision} Collision object (optional) that will be populated if they interset.
     * @return {Boolean} true if they intersect, false if they don't.
     */
    testPolygonCircle: function(polygon, circle, response) {
        var circlePos = T_VECTORS.pop().copy(circle.position).sub(polygon.position),
            radius = circle.radius,
            radius2 = radius * radius,
            points = polygon.points,
            len = points.length,
            edge = T_VECTORS.pop(),
            point = T_VECTORS.pop();

        // For each edge in the polygon
        for (var i = 0; i < len; i++) {
            var next = i === len - 1 ? 0 : i + 1,
                prev = i === 0 ? len - 1 : i - 1,
                overlap = 0,
                overlapN = null,
                dist, distAbs;

            // Get the edge
            edge.copy(polygon.edges[i]);

            // Calculate the center of the circle relative to the starting point of the edge
            point.copy(circlePos).sub(points[i]);

            // If the distance between the center of the circle and the point
            // is bigger than the radius, the polygon is definitely not fully in
            // the circle.
            if (response && point.lengthSq() > radius2) {
                response.aInB = false;
            }

            // Calculate which Vornoi region the center of the circle is in.
            var region = this.vornoiRegion(edge, point);
            if (region === Physics.VORONOI_REGION.LEFT) {
                // Need to make sure we're in the VORNOI_REGION.RIGHT of the previous edge.
                edge.copy(polygon.edges[prev]);

                // Calculate the center of the circle relative the starting point of the previous edge
                var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);

                region = this.vornoiRegion(edge, point2);
                if (region === Physics.VORONOI_REGION.RIGHT) {
                    // It's in the region we want.  Check if the circle intersects the point.
                    dist = point.length();

                    // No intersection
                    if (dist > radius) {
                        T_VECTORS.push(circlePos);
                        T_VECTORS.push(edge);
                        T_VECTORS.push(point);
                        T_VECTORS.push(point2);
                        return false;
                    }
                    // It intersects, calculate the overlap
                    else if (response) {
                        response.bInA = false;
                        overlapN = point.normalize();
                        overlap = radius - dist;
                    }
                }
                T_VECTORS.push(point2);
            } else if (region === Physics.VORONOI_REGION.RIGHT) {
                // Need to make sure we're in the left region on the next edge
                edge.copy(polygon.edges[next]);

                // Calculate the center of the circle relative to the starting point of the next edge
                point.copy(circlePos).sub(points[next]);

                region = this.vornoiRegion(edge, point);
                if (region === Physics.VORONOI_REGION.LEFT) {
                    // It's in the region we want.  Check if the circle intersects the point.
                    dist = point.length();

                    // No intersection
                    if (dist > radius) {
                        T_VECTORS.push(circlePos);
                        T_VECTORS.push(edge);
                        T_VECTORS.push(point);
                        return false;
                    }
                    // It intersects, calculate the overlap
                    else if (response) {
                        response.bInA = false;
                        overlapN = point.normalize();
                        overlap = radius - dist;
                    }
                }
                // MIDDLE_VORNOI_REGION
            } else {
                // Need to check if the circle is intersecting the edge,
                // Change the edge into its "edge normal".
                var normal = edge.perp().normalize();

                // Find the perpendicular distance between the center of the 
                // circle and the edge.
                dist = point.dot(normal);
                distAbs = math.abs(dist);

                // If the circle is on the outside of the edge, there is no intersection
                if (dist > 0 && distAbs > radius) {
                    T_VECTORS.push(circlePos);
                    T_VECTORS.push(normal);
                    T_VECTORS.push(point);
                    return false;
                }
                // It intersects, calculate the overlap.
                else if (response) {
                    overlapN = normal;
                    overlap = radius - dist;

                    // If the center of the circle is on the outside of the edge, or part of the
                    // circle is on the outside, the circle is not fully inside the polygon.
                    if (dist >= 0 || overlap < 2 * radius) {
                        response.bInA = false;
                    }
                }
            }

            // If this is the smallest overlap we've seen, keep it. 
            // (overlapN may be null if the circle was in the wrong Vornoi region)
            if (overlapN && response && math.abs(overlap) < math.abs(response.overlap)) {
                response.overlap = overlap;
                response.overlapN.copy(overlapN);
            }
        }

        // Calculate the final overlap vector - based on the smallest overlap.
        if (response) {
            response.a = polygon;
            response.b = circle;
            response.overlapV.copy(response.overlapN).multiplyScalar(response.overlap);
        }

        T_VECTORS.push(circlePos);
        T_VECTORS.push(edge);
        T_VECTORS.push(point);

        return true;
    },
    /**
     * Check if a circle and a polygon intersect.
     *
     * NOTE: This runs slightly slower than polygonCircle as it just
     * runs polygonCircle and reverses everything at the end.
     *
     * @param circle {Circle} The circle.
     * @param Polygon {Polygon} The polygon.
     * @param [response] {Collision} Collision object (optional) that will be populated if they interset.
     * @return {Boolean} true if they intersect, false if they don't.
     */
    testCirclePolygon: function(circle, polygon, response) {
        var result = this.testPolygonCircle(polygon, circle, response);

        if (result && response) {
            // Swap A and B in the response.
            var a = response.a,
                aInB = response.aInB;

            response.overlapN.negate();
            response.overlapV.negate();
            response.a = response.b;
            response.b = a;
            response.aInB = response.bInA;
            response.bInA = aInB;
        }

        return result;
    },
    /**
     * Checks whether two convex, clockwise polygons intersect.
     *
     * @param a {Polygon} The first polygon.
     * @param b {Polygon} The second polygon.
     * @param [response] {Collision} Collision object (optional) that will be populated if they interset.
     * @return {Boolean} true if they intersect, false if they don't.
     */
    testPolygonPolygon: function(a, b, response) {
        var aPoints = a.points,
            aLen = aPoints.length,
            bPoints = b.points,
            bLen = bPoints.length,
            i;

        // If any of the edge normals of A is a separating axis, no intersection.
        for (i = 0; i < aLen; i++) {
            if (this.isSeparatingAxis(a.position, b.position, aPoints, bPoints, a.normals[i], response)) {
                return false;
            }
        }

        // If any of the edge normals of B is a separating axis, no intersection.
        for (i = 0; i < bLen; i++) {
            if (this.isSeparatingAxis(a.position, b.position, aPoints, bPoints, b.normals[i], response)) {
                return false;
            }
        }
        // Since none of the edge normals of A or B are a separating axis, there is an intersection
        // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
        // final overlap vector.
        if (response) {
            response.a = a;
            response.b = b;
            response.overlapV.copy(response.overlapN).multiplyScalar(response.overlap);
        }

        return true;
    },

    /****************************************************
     * Utility functions
     ****************************************************/
    /**
     * Flattens the specified array of points onto a unit vector axis,
     * resulting in a one dimensional range of the minimum and
     * maximum value on that axis.
     *
     * @param points {Array<Vector>} The points to flatten.
     * @param normal {Vector} The unit vector axis to flatten on.
     * @param [result] {Array<Number>} After calling this function,
     *   result[0] will be the minimum value,
     *   result[1] will be the maximum value.
     *
     * @return {Array} If you do not pass a `result` array, a new one is created for you
     */
    flattenPointsOn: function(points, normal, result) {
        var min = Number.MAX_VALUE,
            max = -Number.MAX_VALUE,
            len = points.length;

        for (var i = 0; i < len; ++i) {
            //get the magnitude of the projection of the point onto the normal
            var dot = points[i].dot(normal);
            min = math.min(dot, min);
            max = math.max(dot, max);
        }

        result = result || [];
        result[0] = min;
        result[1] = max;

        return result;
    },
    /**
     * Check whether two convex clockwise polygons are separated by the specified
     * axis (must be a unit vector).
     *
     * @param aPos {Vector} The position of the first polygon.
     * @param bPos {Vector} The position of the second polygon.
     * @param aPoints {Array<Vector>} The points in the first polygon.
     * @param bPoints {Array<Vector>} The points in the second polygon.
     * @param axis {Vector} The axis (unit sized) to test against. The points of both polygons
     *      will be projected onto this axis.
     * @param [response] {Collision=} A Collision object (optional) which will be populated
     *      if the axis is not a separating axis.
     * @return {boolean} true if it is a separating axis, false otherwise. If false,
     *      and a response is passed in, information about how much overlap and
     *      the direction of the overlap will be populated.
     */
    isSeparatingAxis: function(aPos, bPos, aPoints, bPoints, axis, response) {
        var rangeA = T_ARRAYS.pop(),
            rangeB = T_ARRAYS.pop(),
            // Get the magnitude of the offset between the two polygons
            offsetV = T_VECTORS.pop().copy(bPos).sub(aPos),
            projectedOffset = offsetV.dot(axis),
            option1, option2;

        // Project the polygons onto the axis.
        this.flattenPointsOn(aPoints, axis, rangeA);
        this.flattenPointsOn(bPoints, axis, rangeB);

        // Move B's range to its position relative to A.
        rangeB[0] += projectedOffset;
        rangeB[1] += projectedOffset;

        // Check if there is a gap. If there is, this is a separating axis and we can stop
        if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
            T_VECTORS.push(offsetV);
            T_ARRAYS.push(rangeA);
            T_ARRAYS.push(rangeB);

            return true;
        }

        // If we're calculating a response, calculate the overlap.
        if (response) {
            var overlap = 0;

            // A starts further left than B
            if (rangeA[0] < rangeB[0]) {
                response.aInB = false;

                // A ends before B does. We have to pull A out of B
                if (rangeA[1] < rangeB[1]) {
                    overlap = rangeA[1] - rangeB[0];
                    response.bInA = false;
                }
                // B is fully inside A.  Pick the shortest way out.
                else {
                    option1 = rangeA[1] - rangeB[0];
                    option2 = rangeB[1] - rangeA[0];

                    overlap = option1 < option2 ? option1 : -option2;
                }
            }
            // B starts further left than A
            else {
                response.bInA = false;

                // B ends before A ends. We have to push A out of B
                if (rangeA[1] > rangeB[1]) {
                    overlap = rangeA[0] - rangeB[1];
                    response.aInB = false;
                }
                // A is fully inside B.  Pick the shortest way out.
                else {
                    option1 = rangeA[1] - rangeB[0];
                    option2 = rangeB[1] - rangeA[0];

                    overlap = option1 < option2 ? option1 : -option2;
                }
            }
            // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
            var absOverlap = math.abs(overlap);
            if (absOverlap < response.overlap) {
                response.overlap = absOverlap;
                response.overlapN.copy(axis);

                if (overlap < 0) {
                    response.overlapN.negate();
                }
            }
        }

        T_VECTORS.push(offsetV);
        T_ARRAYS.push(rangeA);
        T_ARRAYS.push(rangeB);

        return false;
    },
    /**
     * Calculates which Vornoi region a point is on a line segment.
     * It is assumed that both the line and the point are relative to (0, 0)
     *
     *             |       (0)      |
     *      (-1)  [0]--------------[1]  (1)
     *             |       (0)      |
     *
     * @param line {Vector} The line segment.
     * @param point {Vector} The point.
     * @return {Number} LEFT_VORNOI_REGION (-1) if it is the left region,
     *          MIDDLE_VORNOI_REGION (0) if it is the middle region,
     *          RIGHT_VORNOI_REGION (1) if it is the right region.
     */
    vornoiRegion: function(line, point) {
        var len2 = line.lengthSq(),
            dp = point.dot(line);

        if (dp < 0)
            return Physics.VORONOI_REGION.LEFT;
        else if (dp > len2)
            return Physics.VORONOI_REGION.RIGHT;
        else
            return Physics.VORONOI_REGION.MIDDLE;
    }
});

Physics.VORONOI_REGION = {
    LEFT: -1,
    MIDDLE: 0,
    RIGHT: 1
};

module.exports = Physics;
