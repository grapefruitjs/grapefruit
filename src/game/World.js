var inherit = require('../utils/inherit'),
    Container = require('../display/Container'),
    Rectangle = require('../geom/Rectangle'),
    ObjectFactory = require('../utils/ObjectFactory');

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
});

module.exports = World;
