define(function() {
    Q.module('Math');

    Q.test('#clamp', function() {
        Q.equal(gf.math.clamp(5, 0, 10), 5, 'Clamp returns number when within range');
        Q.equal(gf.math.clamp(-1, 0, 10), 0, 'Clamp returns min when below range');
        Q.equal(gf.math.clamp(11, 0, 10), 10, 'Clamp returns max when above range');
        Q.equal(gf.math.clamp(500, 0, 10), 10, 'Clamp returns max when way above range');
        Q.equal(gf.math.clamp(-500, 0, 10), 0, 'Clamp returns min when way below range');

        Q.equal(gf.math.clamp(-50, -10, -1), -10, 'Clamp handles below negative range');
        Q.equal(gf.math.clamp(0, -10, -1), -1, 'Clamp handles above negative ranges');
        Q.equal(gf.math.clamp(-50, -10, 10), -10, 'Clamp handles below cross ranges');
        Q.equal(gf.math.clamp(50, -10, 10), 10, 'Clamp handles above cross ranges');
    });

    Q.test('#truncate', function() {
        Q.skip('Need Tests');
    });

    Q.test('#snap', function() {
        Q.skip('Need Tests');
    });

    Q.test('#snapFloor', function() {
        Q.skip('Need Tests');
    });

    Q.test('#snapCeil', function() {
        Q.skip('Need Tests');
    });

    Q.test('#radiansToDegrees', function() {
        Q.skip('Need Tests');
    });

    Q.test('#degreesToRadians', function() {
        Q.skip('Need Tests');
    });

    Q.test('#angleBetween', function() {
        Q.skip('Need Tests');
    });

    Q.test('#randomBool', function() {
        Q.skip('Need Tests');
    });

    Q.test('#randomInt', function() {
        Q.skip('Need Tests');
    });

    Q.test('#randomSign', function() {
        Q.skip('Need Tests');
    });

    Q.test('#randomElement', function() {
        Q.skip('Need Tests');
    });
});