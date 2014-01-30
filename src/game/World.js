var inherit = require('../utils/inherit'),
    Container = require('../display/Container'),
    Rectangle = require('../geom/Rectangle'),
    ObjectFactory = require('../utils/ObjectFactory'),
    math = require('../math/math');

/**
 * The world is the container for all game objects in a game state.
 *
 * @class World
 * @extends Container
 * @constructor
 */
var World = function(state) {
    Container.call(this);

    /**
     * The game instance this world belongs to
     *
     * @property game
     * @type Game
     */
    this.game = state.game;

    /**
     * The game state this world belongs to
     *
     * @property state
     * @type State
     */
    this.state = state;

    /**
     * The bounds of the world
     *
     * @property bounds
     * @type Rectangle
     */
    this.bounds = new Rectangle(0, 0, state.game.width, state.game.height);

    /**
     * An object factory for creating game objects
     *
     * @property add
     * @type ObjectFactory
     */
    this.add = new ObjectFactory(state, this);
};

inherit(World, Container, {
    /**
     * Pans the world around
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Vector is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {World} Returns itself.
     * @chainable
     */
    pan: function(x, y) {
        y = math.floor(x.y !== undefined ? x.y : (y || 0));
        x = math.floor(x.x !== undefined ? x.x : (x || 0));

        this.position.x += x * this.scale.x;
        this.position.y += y * this.scale.y;

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.pan)
                o.pan(x, y);
        }

        return this;
    },
    /**
     * Resizes the children of the world, called by game.resize()
     *
     * @method resize
     * @param width {Number} Width to resize to
     * @param height {Number} Height to resize to
     * @return {World} Returns itself.
     * @chainable
     */
    resize: function(w, h) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.render)
                o.render(-this.position.x, -this.position.y, w, h);
        }

        return this;
    }
});

module.exports = World;
