gf.InputManager = function(view) {
    /**
     * The dom element to bind events to
     *
     * @property view
     * @type Game
     */
    this.view = view;

    //this.mouse = new gf.input.Mouse(view);
    this.keyboard = new gf.input.Keyboard(view);
    this.gamepad = new gf.input.Gamepad();
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