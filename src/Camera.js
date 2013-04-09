//based on: https://github.com/photonstorm/kiwi-lite/blob/master/Kiwi%20Lite/Camera.ts
gf.Camera = function(game, settings) {
    /**
     * The game instance this belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;

    gf.DisplayObject.call(this, settings);

    //mixin user's settings
    gf.utils.setValues(this, settings);
};

gf.inherits(gf.Camera, gf.DisplayObject, {
    flash: function(color, duration, cb) {},
    fade: function(color, duration, cb) {},
    shake: function(intensity, duration, direction, cb) {},
    stopFx: function() {},

    follow: function(ent) {
    },
    focus: function(x, y) {

    },
    setBounds: function() {

    },

    update: function() {
    }
});