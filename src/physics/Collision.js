var inherit = require('../utils/inherit'),
    Vector = require('../math/Vector');

var Collision = module.exports = function() {
    this.a = null;
    this.b = null;

    this.aInB = false;
    this.bInA = false;

    this.overlap = Infinity;
    this.overlapN = new Vector();
    this.overlapV = new Vector();
};

inherit(Collision, Object, {
    clear: function() {
        this.aInB = true;
        this.bInA = true;
        this.overlap = Infinity;
    },
    clone: function() {
        var c = new Collision();

        c.a = this.a;
        c.b = this.b;
        c.aInB = this.aInB;
        c.bInA = this.bInA;
        c.overlap = this.overlap;
        c.overlapN = this.overlapN;
        c.overlapV = this.overlapV;

        return c;
    }
});
