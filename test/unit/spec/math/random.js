describe('random', function() {
    var loopCount = 50,
        i = 0;

    describe('#seed', function() {
        it('should update _x and _y to the correct values', function() {
            var sx = 12345,
                sy = 54321,
                sz = 51423;

            gf.math.rand.seed(sx);
            gf.math.rand._x.should.equal(sx * 3253);
            gf.math.rand._y.should.equal(36969 * ((sx * 3253) & 0xFFFF) + ((sx * 3253) >> 16));

            gf.math.rand.seed(sx, sy);
            gf.math.rand._x.should.equal(sx * 2549 + sy * 3571);
            gf.math.rand._y.should.equal(sy * 2549 + sx * 3571);

            gf.math.rand.seed(sx, sy, sz);
            gf.math.rand._x.should.equal(sx * 2549 + sy * 3571 + sz * 3253);
            gf.math.rand._y.should.equal(sx * 3253 + sy * 2549 + sz * 3571);
        });
    });

    describe('#next', function() {
        it('should return the next random value between 0 and 1', function() {
            for(i = 0; i < loopCount; ++i) {
                gf.math.rand.next().should.be.within(0, 1);
            }
        });
    });

    describe('#bool', function() {
        it('should return a random boolean value', function() {
            gf.math.rand.bool().should.be.Boolean;
        });
    });

    describe('#int', function() {
        it('should return a random integer value', function() {
            gf.math.rand.int().should.be.Number;

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.int().should.be.within(0, 100);

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.int(-10, 10).should.be.within(-10, 10);

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.int(-1, 1).should.be.within(-1, 1);
        });
    });

    describe('#real', function() {
        it('should return a random real value', function() {
            gf.math.rand.real().should.be.Number;

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.real().should.be.within(0, 1);

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.real(-10, 10).should.be.within(-10, 10);

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.real(-1, 1).should.be.within(-1, 1);
        });
    });

    describe('#sign', function() {
        it('should return a random sign value (either 1 or -1)', function() {
            gf.math.rand.sign().should.be.Number;

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.sign().should.be.within(-1, 1);
        });
    });

    describe('#string', function() {
        it('should return a random string value', function() {
            gf.math.rand.string().should.be.String;

            for(i = 0; i < loopCount; ++i) {
                gf.math.rand.string(i).length.should.equal(i || 16);
            }
        });
    });

    describe('#uuid', function() {
        it('should return a random string uuid', function() {
            gf.math.rand.uuid().should.be.String;

            for(i = 0; i < loopCount; ++i)
                gf.math.rand.uuid().should.match(/\b([0-9a-f]{8}-?([0-9a-f]{4}-?){3}[0-9a-f]{12})\b/i);
        });
    });

    describe('#bytes', function() {
        it('should fill a Uint8Array with random values', function() {
            var a = new Uint8Array(128),
                pass = false;

            gf.math.rand.bytes(a).should.be.Uint8Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }

            pass.should.be.ok;
        });

        it('should fill a Uint16Array with random values', function() {
            var a = new Uint16Array(64),
                pass = false;

            gf.math.rand.bytes(a).should.be.Uint16Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }
        });

        it('should fill a Int32Array with random values', function() {
            var a = new Int32Array(32),
                pass = false;

            gf.math.rand.bytes(a).should.be.Int32Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }
        });

        it('should fill a Int16Array with random values', function() {
            var a = new Int16Array(64),
                pass = false;

            gf.math.rand.bytes(a).should.be.Int16Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }
        });
    });

    describe('#element', function() {
        it('should return a random numeric element from an array', function() {
            var a = [1,2,3,4,5,6,7,8,9,10];

            a.should.containDeep([gf.math.rand.element(a)]);
        });

        it('should return a random string element from an array', function() {
            var a = ['a','b','c','d','e','f','g','h'];

            a.should.containDeep([gf.math.rand.element(a)]);
        });

        it('should return a random object element from an array', function() {
            var a = [{k:1},{k:2},{k:3},{k:4},{k:5},{k:6},{k:7},{k:8}];

            a.should.containDeep([gf.math.rand.element(a)]);
        });
    });

    describe('#_getRandomValuesTyped', function() {
        it('should fill a Uint8Array with random values', function() {
            var a = new Uint8Array(128),
                pass = false;

            gf.math.rand._getRandomValuesTyped(a).should.be.Uint8Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }

            pass.should.be.ok;
        });

        it('should fill a Uint16Array with random values', function() {
            var a = new Uint16Array(64),
                pass = false;

            gf.math.rand._getRandomValuesTyped(a).should.be.Uint16Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }
        });

        it('should fill a Int32Array with random values', function() {
            var a = new Int32Array(32),
                pass = false;

            gf.math.rand._getRandomValuesTyped(a).should.be.Int32Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }
        });

        it('should fill a Int16Array with random values', function() {
            var a = new Int16Array(64),
                pass = false;

            gf.math.rand._getRandomValuesTyped(a).should.be.Int16Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }
        });
    });

    describe('#_getRandomValuesArray', function() {
        it('should return an array of random bytes', function() {
            var a = new Array(64),
                pass = false;

            gf.math.rand._getRandomValuesArray(a).should.be.Array;

            var x = a[0];
            for(i = 1; i < a.length; ++i) {
                if(x !== a[i]) {
                    pass = true;
                    break;
                }
            }
        });
    });
});
