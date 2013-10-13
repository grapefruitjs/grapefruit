var inherit = require('../utils/inherit'),
    Vector = require('../math/Vector');

var Collision = function() {
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
        this.a = null;
        this.b = null;
        this.aInB = false;
        this.bInA = false;
        this.overlap = Infinity;
        this.overlapN.set(0, 0);
        this.overlapV.set(0, 0);
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

module.exports = Collision;
