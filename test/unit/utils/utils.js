define(function() {
    Q.module('Utils');

    Q.test('#_arrayDelim', function() {
        Q.strictEqual(gf.utils._arrayDelim, '|', 'Array delim is set to "|"');
    });

    Q.test('#ensureVector', function() {
        var v2s = gf.utils.ensureVector('10|5'),
            v2a = gf.utils.ensureVector([10,5]);

        Q.ok(v2s instanceof gf.Vector, 'String converts to a Vector2');
        Q.ok(v2a instanceof gf.Vector, 'Array converts to a Vector2');

        Q.strictEqual(v2s.x, 10, 'String (V2) has X set correctly');
        Q.strictEqual(v2s.y, 5, 'String (V2) has Y set correctly');
        Q.strictEqual(v2a.x, 10, 'Array (V2) has Y set correctly');
        Q.strictEqual(v2a.y, 5, 'Array (V2) has Y set correctly');
    });

    Q.test('#noop', function() {
        Q.equal(gf.utils.noop.toString(), function() {}.toString());
    });

    Q.test('#ajax', function() {
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

    Q.test('#clamp', function() {
        Q.equal(gf.utils.clamp(5, 0, 10), 5, 'Clamp returns number when within range');
        Q.equal(gf.utils.clamp(-1, 0, 10), 0, 'Clamp returns min when below range');
        Q.equal(gf.utils.clamp(11, 0, 10), 10, 'Clamp returns max when above range');
        Q.equal(gf.utils.clamp(500, 0, 10), 10, 'Clamp returns max when way above range');
        Q.equal(gf.utils.clamp(-500, 0, 10), 0, 'Clamp returns min when way below range');

        Q.equal(gf.utils.clamp(-50, -10, -1), -10, 'Clamp handles below negative range');
        Q.equal(gf.utils.clamp(0, -10, -1), -1, 'Clamp handles above negative ranges');
        Q.equal(gf.utils.clamp(-50, -10, 10), -10, 'Clamp handles below cross ranges');
        Q.equal(gf.utils.clamp(50, -10, 10), 10, 'Clamp handles above cross ranges');
    });
});