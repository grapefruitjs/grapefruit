describe('math', function() {
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
        });
    });

    describe('#snap', function() {
        it('should snap values properly', function() {
        });
    });

    describe('#snapFloor', function() {
        it('should snap values to floor properly', function() {
        });
    });

    describe('#snapCeil', function() {
        it('should snap values to ceiling properly', function() {
        });
    });

    describe('#radiansToDegrees', function() {
        it('should convert radians to degrees properly', function() {
        });
    });

    describe('#degreesToRadians', function() {
        it('should convert degrees to radians properly', function() {
        });
    });

    describe('#angleBetween', function() {
        it('should return the correct angle between two vectors', function() {
        });
    });

    describe('#randomBool', function() {
        it('should return a random boolean value', function() {
        });
    });

    describe('#randomInt', function() {
        it('should return a random integer value', function() {
        });
    });

    describe('#randomReal', function() {
        it('should return a random real value', function() {
        });
    });

    describe('#randomSign', function() {
        it('should return a random sign value (either 1 or -1)', function() {
        });
    });

    describe('#randomString', function() {
        it('should return a random string value', function() {
        });
    });

    describe('#randomUuid', function() {
        it('should return a random string uuid', function() {
        });
    });

    describe('#randomBytes', function() {
        it('should return an array of random bytes', function() {
        });
    });

    describe('#randomElement', function() {
        it('should return a random element from an array', function() {
        });
    });
});
