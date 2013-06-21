/**
 * Holds a pool of different Entities that can be created, makes it very
 * easy to quickly create different registered entities
 *
 * @class entityPool
 */
gf.EntityPool = function(game) {
    this.game = game;
    this.types = {};

    this.add('_default', gf.Entity);
};

gf.inherits(gf.EntityPool, Object, {
    /**
     * Adds an Entity Type to the pool
     *
     * @method add
     * @param name {String} The user-defined name of the Entity Type to add
     * @param obj {Object} The Entity or decendant type to add to the pool
     * @return {Object} Returns the passed object
     * @example
     *      //create a new class to be instantiated
     *      var Bug = function(game, pos, settings) {
     *          gf.Entity.call(this, game, pos, settings);
     *          this.color = 'red';
     *      };
     *
     *      //inherit from Entity
     *      gf.inherits(Bug, gf.Entity, {
     *          beBug: function() {
     *              console.log("I'm a bug");
     *          }
     *      });
     *
     *      //add to our game's entity pool
     *      game.entitypool.add('bug', Bug);
     *
     *      //then later in your game code, create one
     *      var mybug = gf.entityPool.create('bug', {
     *          pos: [10, 10] //pos, position, or x and y properties are sent as the "pos" param to the ctor
     *      });
     */
    add: function(name, obj) {
        return this.types[name] = obj;
    },
    /**
     * Checks if the Entity Type exists in the pool
     *
     * @method has
     * @param name {String} The user-defined name of the Entity Type to check if is in the pool
     * @return {Boolean}
     */
    has: function(name) {
        return !!this.types[name];
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
     *      var Bug = function(game, pos, settings) {
     *          gf.Entity.call(this, game, pos, settings);
     *          this.color = 'red';
     *      };
     *
     *      //inherit from Entity
     *      gf.inherits(Bug, gf.Entity, {
     *          beBug: function() {
     *              console.log("I'm a bug");
     *          }
     *      });
     *
     *      //add to our game's entity pool
     *      game.entitypool.add('bug', Bug);
     *
     *      //then later in your game code
     *      var mybug = gf.entityPool.create('bug', {
     *          pos: [10, 10] //pos, position, or x and y properties are sent as the "pos" param to the ctor
     *      });
     */
    create: function(name, props) {
        if(!name || !this.types[name])
            name = '_default';

        //create a new object
        var pos = props.pos || props.position || [props.x, props.y],
            o = new this.types[name](this.game, pos, props);

        return o;
    },
    //currently doesn't do any recycling unfortunately
    free: function() {
        return;
    }
});
