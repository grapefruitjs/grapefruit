var utils = require('../utils/utils'),
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

    //create a default state
    this._createDefault();
};

utils.inherits(StateManager, Object, {
    _createDefault: function() {
        var state = new State('__default');
        state.setup(this.game);
        this._push(state).enable(state);

        return this;
    },
    _push: function(state) {
        this.states[state.name] = state;

        return this;
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

        if(enable)
            this.enable(state);

        return this;
    },
    remove: function(state) {
        if(typeof state !== 'string')
            state = state.name;

        delete this.states[state];
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
