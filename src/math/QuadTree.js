/*
 * Javascript QuadTree 
 * @version 1.0
 * @author Timo Hausmann
 *
 * @version 1.1, September 19th 2013
 * @author Chad Engler
 * Adapted the tree to Grapefruit structure and tweaked it a bit.
 *
 * Original version at https://github.com/timohausmann/quadtree-js/
 */

/*
 Copyright © 2012 Timo Hausmann

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var Rectangle = require('../math/Rectangle'),
    math = require('./math'),
    inherit = require('../utils/inherit');

/*
* QuadTree
*
* @class QuadTree
* @constructor
* @param bounds {Rectangle} The bounds of the quad tree
* @param [maxObjects=10] {Number} Max objects a node can hold before splitting into 4 subnodes
* @param [maxLevels=4] {Number} Total max levels inside root QuadTree
* @param [level] {Number} Deepth level, required for subnodes  
*/
var QuadTree = module.exports = function(bounds, maxObjects, maxLevels, level) {
    this.maxObjects = maxObjects || 10;
    this.maxLevels = maxLevels || 4;
    this.level = level || 0;

    this.setBounds(bounds);

    this.objects = [];
    this.nodes = [];
};

inherit(QuadTree, Object, {
    /**
     * Split the node into 4 subnodes
     *
     * @method split
     */
    split: function() {
        var b = this.bounds,
            next = this.level + 1;

        //top right node
        this.nodes[0] = new QuadTree(new Rectangle(b.midX, b.y, b.subWidth, b.subHeight), this.maxObjects, this.maxLevels, next);

        //top left node
        this.nodes[1] = new QuadTree(new Rectangle(b.x, b.y, b.subWidth, b.subHeight), this.maxObjects, this.maxLevels, next);

        //bottom left node
        this.nodes[2] = new QuadTree(new Rectangle(b.x, b.midY, b.subWidth, b.subHeight), this.maxObjects, this.maxLevels, next);

        //bottom right node
        this.nodes[3] = new QuadTree(new Rectangle(b.midX, b.midY, b.subWidth, b.subHeight), this.maxObjects, this.maxLevels, next);
    },

    /*
     * Insert an object into the node. If the node exceeds the max capacity, it will split and add all
     * objects to their corresponding subnodes.
     *
     * @method insert
     * @param body {Body} The physics body to add to the tree
     */
    insert: function(body) {
        var i = 0,
            index = -1;

        //if we have subnodes ...
        if(this.nodes[0]) {
            index = this.getIndex(body);

            if(index !== -1) {
                this.nodes[index].insert(body);
                return;
            }
        }

        this.objects.push(body);

        //if we are full, split and push down
        if(this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            //split if we don't already have subnodes
            if(!this.nodes[0]) {
                this.split();
            }

            //add all objects to there corresponding subnodes
            while(i < this.objects.length) {
                index = this.getIndex(this.objects[i]);

                if(index !== -1) {
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                } else {
                    i++;
                }
            }
        }
     },

    /*
     * Determine which node the object belongs to
     *
     * @method getIndex
     * @param body {Body} The body to check for which quad it goes into
     * @return Number Index of the subnode (0-3), or -1 if the body cannot completely fit within a subnode and is part of the parent node
     */
    getIndex: function(body) {
        //default is that body doesn't fit, i.e. it straddles the internal quadrants
        var index = -1;

        //body can completely fit within left quadrants
        if(body.x < this.bounds.midX && body.right < this.bounds.midX) {
            //body fits within the top-left quadrant of this quadtree
            if((body.y < this.bounds.midY && body.bottom < this.bounds.midY)) {
                index = 1;
            }
            //body fits within the bottom-left quadrant of this quadtree
            else if((body.y > this.bounds.midY)) {
                index = 2;
            }
        }
        //body can completely fit within the right quadrants
        else if (body.x > this.bounds.midX) {
            //body fits within the top-right quadrant of this quadtree
            if((body.y < this.bounds.midY && body.bottom < this.bounds.midY)) {
                index = 0;
            }
            //body fits within the bottom-right quadrant of this quadtree
            else if((body.y > this.bounds.midY)) {
                index = 3;
            }
        }

        return index;
    },

     /*
     * Return all objects that could collide with the given body
     *
     * @method retrieve
     * @param body {Body} The body to be checked
     * @return Array<Body> Array with all detected bodies
     */
    retrieve: function(body) {
        var returnObjects = this.objects,
            index = this.getIndex(body);

        if(this.nodes[0]) {
            //if body fits into a subnode
            if(index !== -1) {
                returnObjects = returnObjects.concat(this.nodes[index].retrieve(body));
            }
            //if body does not fit into a subnode, check it against all subnodes (unrolled for speed)
            else {
                returnObjects = returnObjects.concat(this.nodes[0].retrieve(body));
                returnObjects = returnObjects.concat(this.nodes[1].retrieve(body));
                returnObjects = returnObjects.concat(this.nodes[2].retrieve(body));
                returnObjects = returnObjects.concat(this.nodes[3].retrieve(body));
            }
        }

        return returnObjects;
    },

    /*
     * Clear the quadtree, removing all bodies
     *
     * @method clear
     */
    clear: function() {
        //remove each node (unrolled for speed)
        if(this.nodes[0]) {
            this.nodes[0].clear();
            this.nodes[1].clear();
            this.nodes[2].clear();
            this.nodes[3].clear();
        }

        //clear arrays
        this.objects.length = 0;
        this.nodes.length = 0;
    },
    setBounds: function(bounds) {
        this.bounds = bounds;

        //precalculate some bounds values
        bounds.x = math.round(bounds.x);
        bounds.y = math.round(bounds.y);
        bounds.width = math.round(bounds.width);
        bounds.height = math.round(bounds.height);

        bounds.subWidth = Math.floor(bounds.width / 2);
        bounds.subHeight = Math.floor(bounds.height / 2);
        bounds.midX = bounds.x + bounds.subWidth;
        bounds.midY = bounds.y + bounds.subHeight;
    }
});
