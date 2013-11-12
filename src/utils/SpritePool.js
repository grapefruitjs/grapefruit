var inherit = require('./inherit'),
    Sprite = require('../display/Sprite');

/**
 * Holds a pool of different Sprites that can be created, makes it very
 * easy to quickly create different registered entities
 *
 * @class SpritePool
 * @extends Object
 * @constructor
 * @param game {Game} The game instance this sprite pool belongs to
 */
var SpritePool = function(game) {
    this.types = {};

    /**
     * The game instance this pool belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    this.add('_default', Sprite);
};

inherit(SpritePool, Object, {
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
    /**
     * Frees an object back into the pool to be recycled, currently doesn't do any recycling unfortunately
     *
     * @method free
     */
    free: function() {
        return;
    }
});

module.exports = SpritePool;
