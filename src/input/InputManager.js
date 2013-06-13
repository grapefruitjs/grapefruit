gf.InputManager = function(game) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    this.mouse = new gf.input.Mouse(this, game);
    this.keyboard = new gf.input.Keyboard(this, game);
    this.gamepad = new gf.input.Gamepad(this, game);
};

gf.inherits(gf.InputManager, Object, {
    update: function(dt) {
        this.gamepad.update(dt);
    },
    isActionActive: function(action) {
        return this.mouse.isActionActive(action) ||
            this.keyboard.isActionActive(action) ||
            this.gamepad.isActionActive(action);
    }
});