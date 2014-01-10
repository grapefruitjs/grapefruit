var Controls = require('./Controls');

/**
 * @class TopDownControls
 * @extends Controls
 * @constructor
 * @param game {Game} The game instance this will operate within
 */
var TopDownControls = function(game) {
    Controls.call(this, game);
};

inherit(TopDownControls, Controls, {
});

module.exports = TopDownControls;
