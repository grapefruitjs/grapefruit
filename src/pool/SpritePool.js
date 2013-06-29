/**
 * Holds a pool of different Sprites that can be created, makes it very
 * easy to quickly create different registered entities
 *
 * @class SpritePool
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
     * @param props {Sprite} The properties that would normally be passed as the "settings" of the Sprite
     * @return {Sprite} Returns a new instance of the object from the pool
     */
    create: function(name, props) {
        if(!name || !this.types[name])
            name = '_default';

        return new this.types[name](props);
    },
    //currently doesn't do any recycling unfortunately
    free: function() {
        return;
    }
});
