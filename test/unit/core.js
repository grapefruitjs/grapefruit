define(function() {
    Q.module('Core');

    Q.test('Exports', function() {
        Q.ok(gf);
        Q.ok(gf.version);
        Q.ok(gf.types);
        Q.ok(gf.support);
        Q.ok(gf.checkVersion);
        Q.equal(typeof gf.checkVersion, 'function');
        Q.ok(gf.game);
    });
});