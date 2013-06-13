define(function() {
    Q.module('Utils');

    Q.test('#_arrayDelim', function() {
        Q.strictEqual(gf.utils._arrayDelim, '|', 'Array delim is set to "|"');
    });

    Q.test('#ensureVector', function() {
        var v2s = gf.utils.ensureVector('10|5'),
            v2a = gf.utils.ensureVector([10,5]),
            v2i = gf.utils.ensureVector(10);

        Q.ok(v2s instanceof gf.Vector, 'String converts to a Vector2');
        Q.ok(v2a instanceof gf.Vector, 'Array converts to a Vector2');
        Q.ok(v2i instanceof gf.Vector, 'Number converts to a Vector2');

        Q.strictEqual(v2s.x, 10, 'String (V2) has X set correctly');
        Q.strictEqual(v2s.y, 5, 'String (V2) has Y set correctly');
        Q.strictEqual(v2a.x, 10, 'Array (V2) has Y set correctly');
        Q.strictEqual(v2a.y, 5, 'Array (V2) has Y set correctly');
        Q.strictEqual(v2i.x, 10, 'Number (V2) has Y set correctly');
        Q.strictEqual(v2i.y, 10, 'Number (V2) has Y set correctly');
    });

    Q.test('#noop', function() {
        Q.equal(gf.utils.noop.toString(), function() {}.toString());
    });

    Q.test('#ajax', function() {
        Q.skip('Need Tests');
    });

    Q.test('#AjaxRequest', function() {
        Q.skip('Need Tests');
    });

    Q.test('#setValues', function() {
        // Numbers
        Q.deepEqual(
            gf.utils.setValues({ num: 1 }, { num: '2' }),
            { num: 2 },
            'Strings convert to numbers'
        );

        Q.deepEqual(
            gf.utils.setValues({ num: 1 }, { num: 2 }),
            { num: 2 },
            'Numbers override numbers'
        );

        Q.deepEqual(
            gf.utils.setValues({ num: 1 }, {}),
            { num: 1 },
            'Numbers retain their value'
        );

        // Vector2s
        Q.deepEqual(
            gf.utils.setValues({ vec2: new gf.Vector(10, 10) }, { vec2: '2|5' }),
            { vec2: new gf.Vector(2, 5) },
            'Strings convert to vector2s'
        );

        Q.deepEqual(
            gf.utils.setValues({ vec2: new gf.Vector(10, 10) }, { vec2: [2, 5] }),
            { vec2: new gf.Vector(2, 5) },
            'Arrays convert to vector2s'
        );

        // Arrays
        Q.deepEqual(
            gf.utils.setValues({ arr: [] }, { arr: '5|4|3' }),
            { arr: [5, 4, 3] },
            'Strings are converted to arrays'
        );

        // Normal Values Override
        Q.deepEqual(
            gf.utils.setValues({ not: 1, over: 's' }, { over: 'q' }),
            { not: 1, over: 'q' },
            'Defaults are overriden'
        );
    });
});