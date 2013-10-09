var inherit = require('../utils/inherit'),
    State = require('./State');

var StateManager = module.exports = function(game) {
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
    _createDefault: function() {
        return this.add('__default', true);
    },
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
    remove: function(state) {
        if(typeof state === 'string')
            state = this.states[state];

        if(state.parent)
            state.parent.removeChild(state);

        delete this.states[state.name];

        this.count--;

        return this;
    },
    enable: function(state) {
        if(typeof state !== 'string')
            state = state.name;

        if(this.states[state]) {
            if(this.active)
                this.active.disable();

            this.active = this.states[state].enable();
        }

        return this;
    },
    destroy: function() {
        this.game = null;
        this.states = {};
    }
});
