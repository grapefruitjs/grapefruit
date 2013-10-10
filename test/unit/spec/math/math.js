describe('math', function() {
    describe('#DEG_TO_RAD', function() {
        it('should be Math.PI / 180', function() {
            gf.math.DEG_TO_RAD.should.equal(Math.PI / 180);
        });
    });

    describe('#RAD_TO_DEG', function() {
        it('should be 180 / Math.PI', function() {
            gf.math.RAD_TO_DEG.should.equal(180 / Math.PI);
        });
    });

    describe('#floor', function() {
        it('should floor values properly', function() {
            gf.math.floor(10.9856).should.equal(10);
            gf.math.floor(10.5856).should.equal(10);
            gf.math.floor(10.4856).should.equal(10);
            gf.math.floor(10.1856).should.equal(10);
            gf.math.floor(10.0000).should.equal(10);

            gf.math.floor(-10.9856).should.equal(-11);
            gf.math.floor(-10.5856).should.equal(-11);
            gf.math.floor(-10.4856).should.equal(-11);
            gf.math.floor(-10.1856).should.equal(-11);
            gf.math.floor(-10.0000).should.equal(-10);
        });
    });

    describe('#ceil', function() {
        it('should ceiling values properly', function() {
            gf.math.ceil(10.9856).should.equal(11);
            gf.math.ceil(10.5856).should.equal(11);
            gf.math.ceil(10.4856).should.equal(11);
            gf.math.ceil(10.1856).should.equal(11);
            gf.math.ceil(10.0000).should.equal(10);

            gf.math.ceil(-10.9856).should.equal(-10);
            gf.math.ceil(-10.5856).should.equal(-10);
            gf.math.ceil(-10.4856).should.equal(-10);
            gf.math.ceil(-10.1856).should.equal(-10);
            gf.math.ceil(-10.0000).should.equal(-10);
        });
    });

    describe('#random', function() {
        it('should return a random value between 0 and 1', function() {
            gf.math.random().should.be.within(0, 1);
            gf.math.random().should.be.within(0, 1);
            gf.math.random().should.be.within(0, 1);
            gf.math.random().should.be.within(0, 1);
            gf.math.random().should.be.within(0, 1);
        });
    });

    describe('#abs', function() {
        it('should return the absolute value of a number', function() {
            gf.math.abs( 10.0000).should.equal(10);
            gf.math.abs(  5.5683).should.equal(5.5683);

            gf.math.abs(-10.0000).should.equal(10);
            gf.math.abs(- 5.5683).should.equal(5.5683);
        });
    });

    describe('#sqrt', function() {
        it('should square root values properly', function() {
            gf.math.sqrt(4).should.equal(2);
            gf.math.sqrt(15).should.equal(3.8729833462074168851792653997824);
            gf.math.sqrt(153).should.equal(12.369316876852981649464229567922);
            gf.math.sqrt(387648348248834).should.equal(19688787.373752452609424444696363);

            gf.math.sqrt(-4).should.be.NaN;
            gf.math.sqrt(-15).should.be.NaN;
            gf.math.sqrt(-153).should.be.NaN;
            gf.math.sqrt(-387648348248834).should.be.NaN;
        });
    });

    describe('#min', function() {
        it('should choose the minimum of arguments passed', function() {
            gf.math.min(0, 100).should.equal(0);
            gf.math.min(10, 100).should.equal(10);
            gf.math.min(100, 100).should.equal(100);
            gf.math.min(100.678, 100.567).should.equal(100.567);

            gf.math.min(0, -100).should.equal(-100);
            gf.math.min(-10, -100).should.equal(-100);
            gf.math.min(-100, -100).should.equal(-100);
            gf.math.min(-100.678, -100.567).should.equal(-100.678);

            gf.math.min(10, 100, 1000, 10000, 1, 0, -10).should.equal(-10);
        });
    });

    describe('#max', function() {
        it('should choose the maximum of arguments passed', function() {
            gf.math.max(0, 100).should.equal(100);
            gf.math.max(10, 100).should.equal(100);
            gf.math.max(100, 100).should.equal(100);
            gf.math.max(100.678, 100.567).should.equal(100.678);

            gf.math.max(0, -100).should.equal(0);
            gf.math.max(-10, -100).should.equal(-10);
            gf.math.max(-100, -100).should.equal(-100);
            gf.math.max(-100.678, -100.567).should.equal(-100.567);

            gf.math.max(10, 100, 1000, 10000, 1, 0, -10).should.equal(10000);
        });
    });

    describe('#round', function() {
        it('should round values properly', function() {
            gf.math.round(10.9856).should.equal(11);
            gf.math.round(10.5856).should.equal(11);
            gf.math.round(10.4856).should.equal(10);
            gf.math.round(10.1856).should.equal(10);
            gf.math.round(10.0000).should.equal(10);

            gf.math.round(-10.9856).should.equal(-11);
            gf.math.round(-10.5856).should.equal(-11);
            gf.math.round(-10.4856).should.equal(-10);
            gf.math.round(-10.1856).should.equal(-10);
            gf.math.round(-10.0000).should.equal(-10);
        });
    });

    describe('#clamp', function() {
        it('should clamp values properly', function() {
            gf.math.clamp(10.000, -100, 100).should.equal(10);
            gf.math.clamp(10.567, -100, 100).should.equal(10.567);
            gf.math.clamp(10.567, 11, 100).should.equal(11);
            gf.math.clamp(10.567, 10, 10.5).should.equal(10.5);

            gf.math.clamp(-10.000, -100, 100).should.equal(-10);
            gf.math.clamp(-10.567, -100, 100).should.equal(-10.567);
            gf.math.clamp(-10.567, -10, 100).should.equal(-10);
            gf.math.clamp(-10.567, -11, -10.6).should.equal(-10.6);
        });
    });

    describe('#truncate', function() {
        it('should truncate values properly', function() {
            gf.math.truncate(10.9856).should.equal(10);
            gf.math.truncate(10.5856).should.equal(10);
            gf.math.truncate(10.4856).should.equal(10);
            gf.math.truncate(10.1856).should.equal(10);
            gf.math.truncate(10.0000).should.equal(10);

            gf.math.truncate(-10.9856).should.equal(-10);
            gf.math.truncate(-10.5856).should.equal(-10);
            gf.math.truncate(-10.4856).should.equal(-10);
            gf.math.truncate(-10.1856).should.equal(-10);
            gf.math.truncate(-10.0000).should.equal(-10);
        });
    });

    describe('#snap', function() {
        it('should snap values properly', function() {
            gf.math.snap(1, 16).should.equal(0, '1 snap to 16');
            gf.math.snap(15, 16).should.equal(16, '15 snap to 16');
            gf.math.snap(16, 16).should.equal(16, '16 snap to 16');
            gf.math.snap(22, 16).should.equal(16, '22 snap to 16');
            gf.math.snap(30, 16).should.equal(32, '30 snap to 16');
            gf.math.snap(35, 16).should.equal(32, '35 snap to 16');

            gf.math.snap(25, 8, 5).should.equal(29, '25 snap to 8, offset 5'); //24
            gf.math.snap(30, 8, 5).should.equal(29, '30 snap to 8, offset 5');
            gf.math.snap(37, 8, 5).should.equal(37, '37 snap to 8, offset 5');
            gf.math.snap(4, 8, 5).should.equal(5, '0 snap to 8, offset 5');
        });
    });

    describe('#snapFloor', function() {
        it('should snap values to floor properly', function() {
            gf.math.snapFloor(1, 16).should.equal(0, '1 snap to 16');
            gf.math.snapFloor(15, 16).should.equal(0, '15 snap to 16');
            gf.math.snapFloor(16, 16).should.equal(16, '16 snap to 16');
            gf.math.snapFloor(22, 16).should.equal(16, '22 snap to 16');
            gf.math.snapFloor(30, 16).should.equal(16, '39 snap to 16');
            gf.math.snapFloor(35, 16).should.equal(32, '35 snap to 16');

            gf.math.snapFloor(25, 8, 5).should.equal(21, '25 snap to 8, offset 5');
            gf.math.snapFloor(30, 8, 5).should.equal(29, '30 snap to 8, offset 5');
            gf.math.snapFloor(37, 8, 5).should.equal(37, '37 snap to 8, offset 5');
            gf.math.snapFloor(4, 8, 5).should.equal(-3, '4 snap to 8, offset 5');
        });
    });

    describe('#snapCeil', function() {
        it('should snap values to ceiling properly', function() {
            gf.math.snapCeil(1, 16).should.equal(16, '1 snap to 16');
            gf.math.snapCeil(15, 16).should.equal(16, '15 snap to 16');
            gf.math.snapCeil(16, 16).should.equal(16, '16 snap to 16');
            gf.math.snapCeil(22, 16).should.equal(32, '22 snap to 16');
            gf.math.snapCeil(30, 16).should.equal(32, '30 snap to 16');
            gf.math.snapCeil(35, 16).should.equal(48, '35 snap to 16');

            gf.math.snapCeil(25, 8, 5).should.equal(29, '25 snap to 8, offset 5');
            gf.math.snapCeil(30, 8, 5).should.equal(37, '30 snap to 8, offset 5');
            gf.math.snapCeil(37, 8, 5).should.equal(37, '37 snap to 8, offset 5');
            gf.math.snapCeil(4, 8, 5).should.equal(5, '4 snap to 8, offset 5');
        });
    });

    describe('#radiansToDegrees', function() {
        it('should convert radians to degrees properly', function() {
            gf.math.radiansToDegrees(Math.PI / 2).should.equal(90, 'π/2r === 90d');
            gf.math.radiansToDegrees(Math.PI).should.equal(180, 'πr === 180d');
            gf.math.radiansToDegrees((3 * Math.PI)/2).should.equal(270, '3π/2r === 270d');
            gf.math.radiansToDegrees((11 * Math.PI)/6).should.equal(330, '11π/6r === 330d');
            gf.math.radiansToDegrees(2 * Math.PI).should.equal(360, '2πr === 360d');
        });
    });

    describe('#degreesToRadians', function() {
        it('should convert degrees to radians properly', function() {
            gf.math.degreesToRadians(90).should.equal(Math.PI / 2, 'π/2r === 90d');
            gf.math.degreesToRadians(180).should.equal(Math.PI, 'πr === 180d');
            gf.math.degreesToRadians(270).should.equal((3 * Math.PI)/2, '3π/2r === 270d');
            gf.math.degreesToRadians(330).should.equal((11 * Math.PI)/6, '11π/6r === 330d');
            gf.math.degreesToRadians(360).should.equal(2 * Math.PI, '2πr === 360d');
        });
    });

    describe('#angleBetween', function() {
        it('should return the correct angle between two vectors');
    });

    describe('#randomBool', function() {
        it('should return a random boolean value', function() {
            gf.math.randomBool().should.be.Boolean;
        });
    });

    describe('#randomInt', function() {
        it('should return a random integer value', function() {
            gf.math.randomInt().should.be.Number;

            var i = 0,
                count = 50;

            for(i = 0; i < count; ++i)
                gf.math.randomInt().should.be.within(0, 100);

            for(i = 0; i < count; ++i)
                gf.math.randomInt(-10, 10).should.be.within(-10, 10);

            for(i = 0; i < count; ++i)
                gf.math.randomInt(-1, 1).should.be.within(-1, 1);
        });
    });

    describe('#randomReal', function() {
        it('should return a random real value', function() {
            gf.math.randomReal().should.be.Number;

            var i = 0,
                count = 50;

            for(i = 0; i < count; ++i)
                gf.math.randomReal().should.be.within(0, 1);

            for(i = 0; i < count; ++i)
                gf.math.randomReal(-10, 10).should.be.within(-10, 10);

            for(i = 0; i < count; ++i)
                gf.math.randomReal(-1, 1).should.be.within(-1, 1);
        });
    });

    describe('#randomSign', function() {
        it('should return a random sign value (either 1 or -1)', function() {
            gf.math.randomSign().should.be.Number;

            var i = 0,
                count = 50;

            for(i = 0; i < count; ++i)
                gf.math.randomSign().should.be.within(-1, 1);
        });
    });

    describe('#randomString', function() {
        it('should return a random string value');
    });

    describe('#randomUuid', function() {
        it('should return a random string uuid');
    });

    describe('#randomBytes', function() {
        it('should return an array of random bytes');
    });

    describe('#randomElement', function() {
        it('should return a random element from an array');
    });
});
