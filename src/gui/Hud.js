/**
 * The Hud that holds HudItems to be presented as a Hud
 *
 * @class Hud
 * @extends DisplayObject
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls
 */
gf.Hud = function(pos, settings) {
    gf.Gui.call(this, pos, settings);
};

gf.inherits(gf.Hud, gf.Gui);
