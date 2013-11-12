var inherit = require('../utils/inherit'),
    State = require('./State');

/**
 * A state manager is a container for all the states in a game.
 *
 * @class StateManager
 * @extends Object
 * @constructor
 * @param game {Game} The game this manager bleongs to.
 */
var StateManager = function(game) {
    /**
     * The game instance that this manager belongs to.
     *
     * @property game
     * @type Game
     */
    this.game = game;

    /**
     * The states managed by this manager, keyed on the state name
     *
     * @property states
     * @type Object<State>
     */
    this.states = {};

    /**
     * The currently active state
     *
     * @property active
     * @type State
     */
    this.active = null;

    /**
     * The count of states in this manager
     *
     * @property count
     * @type Number
     */
    this.count = 0;

    //create a default state
    this._createDefault();
};

inherit(StateManager, Object, {
    /**
     * Creates the default state
     *
     * @method _createDefault
     * @return {State} The default state
     */
    _createDefault: function() {
        return this.add('__default', true);
    },
    /**
     * Adds a state to the game, creating one if necessary.
     *
     * There are 3 ways to use this function to add a state to the manager. The simplest case
     * is to pass a string for the name, and let the manager create a normal gf.State for you
     * with the name you provided. The second usage is to pass a class that is a decendant of gf.State.
     *
     * For example:
     *
     * ```
     * function MyState(game) {
     *     gf.State.call(game, 'some-name');
     * }
     * gf.inherit(MyState, gf.State);
     *
     * game.state.add(MyState); //adds a new instance of your state
     * ```
     *
     * The final usage is to pass a state that is already created. In this case the manager will
     * add the state to the list based on `state.name` and set the game to be the manager's game
     * instance with `state.game = this.game`;
     *
     * @method add
     * @param state {String|Function|State} The state name, constructor, or state instance to add.
     * @return {State} The state that was added
     */
    add: function(Name, enable) {
        var state;

        //create a state if a string is passed
        if(typeof Name === 'string') {
            state = new State(this.game, Name);
        }
        //create a state of the instance passed
        else if(typeof Name === 'function') {
            state = new Name(this.game);
        }
        //a pre-created state, ensure game is set correctly
        else {
            state = Name;
            state.game = this.game;
        }

        this.states[state.name] = state;
        this.game.stage.addChild(state);

        if(enable)
            this.enable(state);

        this.count++;

        return state;
    },
    /**
     * Removes a state from the game
     *
     * @method remove
     * @param state {String|State} The name of the state to remove, or the state instance itself.
     * @return {StateManager} Returns itself.
     * @chainable
     */
    remove: function(state) {
        if(typeof state === 'string')
            state = this.states[state];

        if(state.parent)
            state.parent.removeChild(state);

        delete this.states[state.name];

        this.count--;

        return this;
    },
    /**
     * Enables a state in the game.
     *
     * @method enable
     * @param state {String|State} The name of the state to enable, or the state instance itself.
     * @return {StateManager} Returns itself.
     * @chainable
     */
    enable: function(state) {
        if(typeof state !== 'string')
            state = state.name;

        if(this.states[state]) {
            if(this.active) {
                this.active.visible = false;
            }

            this.active = this.states[state];
            this.active.visible = true;
        }

        return this;
    },
    /**
     * Destroys the state manager completely
     *
     * @method destroy
     */
    destroy: function() {
        this.game = null;
        this.states = null;
    }
});

module.exports = StateManager;
