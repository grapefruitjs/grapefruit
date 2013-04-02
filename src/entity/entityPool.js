(function() {
    var entObjects = {};

    /**
     * Holds a pool of different Entities that can be created, makes it very
     * easy to quickly create different registered entities
     *
     * @module gf
     * @class entityPool
     */
    gf.entityPool = {
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
            return entObjects[name] = obj;
        },
        /**
         * Checks if the entity exists in the pool
         *
         * @method add
         * @param name {String} The user-defined name of the Entity to check if is in the pool
         * @return {Boolean} Returns the passed object
         */
        has: function(name) {
            return !!entObjects[name];
        },
        /**
         * Creates a new entity from the pool
         *
         * @method add
         * @param name {String} The user-defined name of the Entity to check if is in the pool
         * @param props {Object} The properties that would normally be passed as the "settings" of the Entity
         * @return {Entity} Returns a new instance of the object from the pool
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
        create: function(name, props) {
            //if the name is in our pool, create it
            if(name && gf.entityPool.has(name)) {
                return new entObjects[name](props.pos || props.position || [props.x, props.y], props);
            }
            //otherwise create a general Entity
            else {
                return new gf.Entity(props.pos || props.position || [props.x, props.y], props);
            }
        }
    };
})();