define(function(require) {
    QUnit.module('Core');

    QUnit.test('Exports', function() {
        QUnit.ok(gf);
        QUnit.ok(gf.version);
        QUnit.ok(gf.types);
        QUnit.ok(gf.support);
        QUnit.ok(gf.checkVersion)
        QUnit.equal(typeof gf.checkVersion, 'function');
        QUnit.ok(gf.game);
    });
});