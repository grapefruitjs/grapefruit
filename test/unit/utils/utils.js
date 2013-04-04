define(function() {
    Q.module('Utils');

    Q.test('#applyFriction', function() {
        gf.game._delta = 0.002;

        Q.equal(gf.utils.applyFriction(100, 0), 100, 'No friction doesn\'t change the velocity');

        Q.equal(gf.utils.applyFriction(100, 10), 99.98);

        Q.equal(gf.utils.applyFriction(100, 99), 99.802);

        Q.equal(gf.utils.applyFriction(100, 100), 0);
    });

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

    Q.test('#numToHexColor', function() {
        var clr1 = [gf.utils.numToHexColor(0x12ffeeff), '12ffeeff'],
            clr2 = [gf.utils.numToHexColor(0x54165fff), '54165fff'],
            clr3 = [gf.utils.numToHexColor(0x900054ff), '900054ff'];

        Q.strictEqual(clr1[0], clr1[1], 'Color number 0x12ffeeff outputs "12ffeeff"');
        Q.strictEqual(clr2[0], clr2[1], 'Color number 0x54165fff outputs "54165fff"');
        Q.strictEqual(clr3[0], clr3[1], 'Color number 0x900054ff outputs "900054ff"');
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

    Q.test('#isPowerOfTwo', function() {
        Q.ok(gf.utils.isPowerOfTwo(1), '1 is a power of two');
        Q.ok(gf.utils.isPowerOfTwo(2), '2 is a power of two');
        Q.ok(gf.utils.isPowerOfTwo(4), '3 is a power of two');
        Q.ok(gf.utils.isPowerOfTwo(8), '8 is a power of two');
        Q.ok(gf.utils.isPowerOfTwo(16), '16 is a power of two');
        Q.ok(gf.utils.isPowerOfTwo(256), '256 is a power of two');
        Q.ok(gf.utils.isPowerOfTwo(1024), '1024 is a power of two');

        Q.ok(!gf.utils.isPowerOfTwo(15), '15 is not a power of two');
        Q.ok(!gf.utils.isPowerOfTwo(27), '27 is not a power of two');
        Q.ok(!gf.utils.isPowerOfTwo(90), '90 is not a power of two');
        Q.ok(!gf.utils.isPowerOfTwo(426463418), '426463418 is not a power of two');
    });

    Q.test('#nextPowerofTwo', function() {
        Q.strictEqual(gf.utils.nextPowerofTwo(3), 4, '4 is the next power of two after 3');
        Q.strictEqual(gf.utils.nextPowerofTwo(25), 32, '32 is the next power of two after 25');
        Q.strictEqual(gf.utils.nextPowerofTwo(32), 32, '32 is the next power of two after 32');
        Q.strictEqual(gf.utils.nextPowerofTwo(257), 512, '512 is the next power of two after 257');
        Q.strictEqual(gf.utils.nextPowerofTwo(1), 1, '1 is the next power of two after 1');
        Q.strictEqual(gf.utils.nextPowerofTwo(100), 128, '128 is the next power of two after 100');
    });

    Q.test('#getPowerofTwoPower', function() {
        Q.strictEqual(gf.utils.getPowerofTwoPower(Math.pow(2, 2)), 2, '4 is 2^2');
        Q.strictEqual(gf.utils.getPowerofTwoPower(Math.pow(2, 5)), 5, '32 is 2^5');
        Q.strictEqual(gf.utils.getPowerofTwoPower(Math.pow(2, 13)), 13, '8192 is 2^13');
        Q.strictEqual(gf.utils.getPowerofTwoPower(Math.pow(2, 30)), 30, '1073741824 is 2^30');

        Q.strictEqual(gf.utils.getPowerofTwoPower(257), undefined, '257 is not a power of two');
        Q.strictEqual(gf.utils.getPowerofTwoPower(8574), undefined, '8574 is not a power of two');
    });

    Q.test('#getPosition', function() {
        Q.skip('DOM stuff should be removed');

        Q.deepEqual(
            gf.utils.getPosition(document.getElementById('qunit-header')),
            $('#qunit-header').position(),
            'Has the same position as jQuery for the #qunit-header'
        );

        Q.deepEqual(
            gf.utils.getPosition(document.getElementById('qunit-userAgent')),
            $('#qunit-userAgent').position(),
            'Has the same position as jQuery for the #qunit-userAgent'
        );

        Q.deepEqual(
            gf.utils.getPosition(document.getElementById('qunit-banner')),
            $('#qunit-banner').position(),
            'Has the same position as jQuery for the #qunit-banner'
        );

        Q.deepEqual(
            gf.utils.getPosition(document.getElementById('qunit-testrunner-toolbar')),
            $('#qunit-testrunner-toolbar').position(),
            'Has the same position as jQuery for the #qunit-testrunner-toolbar'
        );

        Q.deepEqual(
            gf.utils.getPosition(document.getElementById('qunit-tests')),
            $('#qunit-tests').position(),
            'Has the same position as jQuery for the #qunit-tests'
        );
    });

    Q.test('#getStyle', function() {
        Q.skip('DOM stuff should be removed');

        Q.skipIf(!window.getComputedStyle, 'No getComputedStyle support in this browser, need a fallback...', function() {
            Q.deepEqual(
                gf.utils.getStyle(document.getElementById('qunit-header'), 'margin-top'),
                parseInt($('#qunit-header').css('margin-top').replace(/px|em|%|pt/, ''), 10),
                'Has the same css as jQuery for the #qunit-header, margin-top'
            );

            Q.deepEqual(
                gf.utils.getStyle(document.getElementById('qunit-userAgent'), 'margin-top'),
                parseInt($('#qunit-userAgent').css('margin-top').replace(/px|em|%|pt/, ''), 10),
                'Has the same css as jQuery for the #qunit-userAgent'
            );

            Q.deepEqual(
                gf.utils.getStyle(document.getElementById('qunit-banner'), 'margin-top'),
                parseInt($('#qunit-banner').css('margin-top').replace(/px|em|%|pt/, ''), 10),
                'Has the same css as jQuery for the #qunit-banner'
            );
        });
    });

    Q.test('#setStyle', function() {
        Q.skip('DOM stuff should be removed');
    });

    Q.test('#getOffset', function() {
        Q.skip('DOM stuff should be removed');
    });

    Q.test('#b64.encode', function() {
        var str1 = ['SoMeThInG CoOl!@(*%', 'U29NZVRoSW5HIENvT2whQCgqJQ=='],
            str2 = ['\x52\x12\xA5\xB5\x20\x81\xA4', 'UhKltSCBpA=='],
            str3 = ['szxedcrfvtghjnkm, ;/l.\'>l;,mhb vgfc', 'c3p4ZWRjcmZ2dGdoam5rbSwgOy9sLic+bDssbWhiIHZnZmM='],
            str4 = ['a307f460-97f7-11e2-9e96-0800200c9a66', 'YTMwN2Y0NjAtOTdmNy0xMWUyLTllOTYtMDgwMDIwMGM5YTY2'];

        Q.strictEqual(gf.utils.b64.encode(str1[0]), str1[1], 'Encodes normal strings');
        Q.strictEqual(gf.utils.b64.encode(str2[0]), str2[1], 'Encodes utf8 weird strings');
        Q.strictEqual(gf.utils.b64.encode(str3[0]), str3[1], 'Encodes faceroll strings');
        Q.strictEqual(gf.utils.b64.encode(str4[0]), str4[1], 'Encodes uuid strings');
    });

    Q.test('#b64.decode', function() {
        var str1 = ['SoMeThInG CoOl!@(*%', 'U29NZVRoSW5HIENvT2whQCgqJQ=='],
            str2 = ['\x52\x12\xA5\xB5\x20\x81\xA4', 'UhKltSCBpA=='],
            str3 = ['szxedcrfvtghjnkm, ;/l.\'>l;,mhb vgfc', 'c3p4ZWRjcmZ2dGdoam5rbSwgOy9sLic+bDssbWhiIHZnZmM='],
            str4 = ['a307f460-97f7-11e2-9e96-0800200c9a66', 'YTMwN2Y0NjAtOTdmNy0xMWUyLTllOTYtMDgwMDIwMGM5YTY2'];

        Q.strictEqual(gf.utils.b64.decode(str1[1]), str1[0], 'Decodes normal strings');
        Q.strictEqual(gf.utils.b64.decode(str2[1]), str2[0], 'Decodes utf8 weird strings');
        Q.strictEqual(gf.utils.b64.decode(str3[1]), str3[0], 'Decodes faceroll strings');
        Q.strictEqual(gf.utils.b64.decode(str4[1]), str4[0], 'Decodes uuid strings');
    });
});