describe('Vector', function() {
    var vec = new gf.Vector(),
        vec1 = new gf.Vector(),
        vec2 = new gf.Vector();

    beforeEach(function() {
        vec.x = 0;
        vec.y = 0;
        vec1.x = 0;
        vec1.y = 0;
        vec2.x = 0;
        vec2.y = 0;
    });

    describe('#constructor', function() {
        it('should set initial x/y values', function() {
            var v = new gf.Vector(10, 100);
            v.x.should.equal(10);
            v.y.should.equal(100);
        });
    });

    describe('#set', function() {
        it('should set x/y values', function() {
            vec.set(100, 1000);
            vec.x.should.equal(100);
            vec.y.should.equal(1000);
        });
    });

    describe('#setX', function() {
        it('should set x value', function() {
            vec.setX(1000);
            vec.x.should.equal(1000);
        });
    });

    describe('#setY', function() {
        it('should set y value', function() {
            vec.setY(2000);
            vec.y.should.equal(2000);
        });
    });

    describe('#setComponent', function() {
        it('should set the x component when index === 0', function() {
            vec.setComponent(0, 50);
            vec.x.should.equal(50);
        });

        it('should set the y component when index === 1', function() {
            vec.setComponent(1, 50);
            vec.y.should.equal(50);
        });

        it('should throw an error when index is neither 0 nor 1', function() {
            var i = 0,
                count = 20,
                index;

            for(i = 0; i < count; ++i) {
                do { index = Math.floor(Math.random() * 10); } while(index === 0 || index === 1);

                (function() {
                    vec.setComponent(index, 100);
                }).should.throwError('index is out of range: ' + index)
            }
        });
    });

    describe('#getComponent', function() {
        it('should get the x component when index === 0', function() {
            vec.set(100, 500);
            vec.getComponent(0).should.equal(100);
        });

        it('should get the y component when index === 1', function() {
            vec.set(100, 500);
            vec.getComponent(1).should.equal(500);
        });

        it('should throw an error when index is neither 0 nor 1', function() {
            var i = 0,
                count = 20,
                index;

            for(i = 0; i < count; ++i) {
                do { index = Math.floor(Math.random() * 10); } while(index === 0 || index === 1);

                (function() {
                    vec.getComponent(index);
                }).should.throwError('index is out of range: ' + index)
            }
        });
    });

    describe('#copy', function() {
        it('should copy the passed vector values', function() {
            vec1.set(10, 100);

            vec.copy(vec1);

            vec.x.should.equal(10);
            vec.y.should.equal(100);
        });
    });

    describe('#floor', function() {
        it('should floor the x/y values of the vector', function() {
            vec.set(1.578, 2.9999);

            vec.floor();
            vec.x.should.equal(1);
            vec.y.should.equal(2);
        });
    });

    describe('#ceil', function() {
        it('should ceiling the x/y values of the vector', function() {
            vec.set(1.578, 2.9999);

            vec.ceil();
            vec.x.should.equal(2);
            vec.y.should.equal(3);
        });
    });

    describe('#add', function() {
        it('should add the passed vector to the current one', function() {
            vec.set(20, 50);
            vec1.set(10, 30);

            vec.add(vec1);
            vec.x.should.equal(30);
            vec.y.should.equal(80);
        });
    });

    describe('#addVectors', function() {
        it('should add two vectors and save it to the current one', function() {
            vec1.set(10, 30),
            vec2.set(20, 50);

            vec.addVectors(vec1, vec2);
            vec.x.should.equal(30);
            vec.y.should.equal(80);
        });
    });

    describe('#addScalar', function() {
        it('should add a scalar value to both x/y values', function() {
            vec.set(10, 20);

            vec.addScalar(5);

            vec.x.should.equal(15);
            vec.y.should.equal(25);
        });
    });

    describe('#sub', function() {
        it('should subtract the passed vector from the current one', function() {
            vec.set(20, 50);
            vec1.set(10, 30);

            vec.sub(vec1);
            vec.x.should.equal(10);
            vec.y.should.equal(20);
        });
    });

    describe('#subVectors', function() {
        it('should subtract two vectors and save it from the current one', function() {
            vec1.set(10, 30),
            vec2.set(20, 50);

            vec.subVectors(vec1, vec2);
            vec.x.should.equal(-10);
            vec.y.should.equal(-20);
        });
    });

    describe('#multiplyScalar', function() {
        it('should multiply the x/y values by a scalar', function() {
            vec.set(5, 10);

            vec.multiplyScalar(5);

            vec.x.should.equal(25);
            vec.y.should.equal(50);
        });
    });

    describe('#divideScalar', function() {
        it('should divide the x/y values by a scalar', function() {
            vec.set(5, 10);

            vec.divideScalar(5);

            vec.x.should.equal(1);
            vec.y.should.equal(2);
        });
    });

    describe('#min', function() {
        it('should set the vector\'s x/y values to the minimum between it and the passed vector', function() {
            vec.set(5, 100);
            vec1.set(1, 500);

            vec.min(vec1);

            vec.x.should.equal(1);
            vec.y.should.equal(100);
        });
    });

    describe('#max', function() {
        it('should set the vector\'s x/y values to the maximum between it and the passed vector', function() {
            vec.set(5, 100);
            vec1.set(1, 500);

            vec.max(vec1);

            vec.x.should.equal(5);
            vec.y.should.equal(500);
        });
    });

    describe('#clamp', function() {
        it('should clamp the vector\'s x/y values', function() {
            vec1.set(10, 20),
            vec2.set(100, 200);

            vec.set(5, 500);

            vec.clamp(vec1, vec2);

            vec.x.should.equal(10);
            vec.y.should.equal(200);
        });
    });

    describe('#negate', function() {
        it('should negate the x/y values', function() {
            vec.negate();

            vec.x.should.equal(0);
            vec.y.should.equal(0);

            vec.set(10, 200);
            vec.negate();

            vec.x.should.equal(-10);
            vec.y.should.equal(-200);
        });
    });

    describe('#project', function() {
        it('should project a vector onto another', function() {
            vec.set(10, 100);
            vec1.set(1, 2);

            vec.project(vec1);

            vec.x.should.equal(42);
            vec.y.should.equal(84);
        });
    });

    describe('#projectN', function() {
        it('should project a vector onto a normal', function() {
            vec.set(10, 100);
            vec1.set(1, -1);

            vec.projectN(vec1);

            vec.x.should.equal(-90);
            vec.y.should.equal(90);
        });
    });

    describe('#reflect', function() {
        it('should reflect a vector on an axis', function() {
            vec.set(10, 100);
            vec1.set(2, 5);

            vec.reflect(vec1);

            vec.x.should.equal(61.72413793103448);
            vec.y.should.equal(79.31034482758619);
        });
    });

    describe('#reflectN', function() {
        it('should reflect a vector on an axis, represented by a unit vector', function() {
            vec.set(10, 100);
            vec1.set(1, 0);

            vec.reflectN(vec1);

            vec.x.should.equal(10);
            vec.y.should.equal(-100);
        });
    });

    describe('#lengthSq', function() {
        it('should return the length of the vector sqaured', function() {
            vec.set(10, 100).lengthSq().should.equal(10100);
        });
    });

    describe('#length', function() {
        it('should return the length of the vector', function() {
            vec.set(10, 100).length().should.equal(100.4987562112089);
        });
    });

    describe('#normalize', function() {
        it('should return the normalized vector', function() {
            //arbitrary
            vec.set(10, 100);

            vec.normalize();

            vec.x.should.equal(0.09950371902099892);
            vec.y.should.equal(0.9950371902099892);

            //normal
            vec.set(0.5, 0);

            vec.normalize();

            vec.x.should.equal(1);
            vec.y.should.equal(0);
        });
    });

    describe('#distanceTo', function() {
        it('should return the distance between two vectors', function() {
            vec.set(100, 200);
            vec1.set(1, 1);

            vec.distanceToSquared(vec1).should.equal(49402);
        });
    });

    describe('#distanceToSquared', function() {
        it('should return the distance between two vectors squared', function() {
            vec.set(100, 200);
            vec1.set(1, 1);

            vec.distanceTo(vec1).should.equal(222.26560687609768);
        });
    });

    describe('#setLength', function() {
        it('should modify the x/y values to achieve the correct length', function() {
            vec.set(5, 10);

            vec.setLength(10).length().should.equal(10);
            vec.x.should.equal(4.47213595499958);
            vec.y.should.equal(8.94427190999916);
        });
    });

    describe('#lerp', function() {
        it('should interpolate between two vectors', function() {
            vec.set(5, 10);
            vec1.set(10, 20);

            vec.lerp(vec1, 0.5);

            vec.x.should.equal(7.5);
            vec.y.should.equal(15);
        });
    });

    describe('#perp', function() {
        it('should modify the vector to be rotated by 90 degrees', function() {
            vec.set(5, 10).perp();

            vec.x.should.equal(10);
            vec.y.should.equal(-5);
        });
    });

    describe('#equals', function() {
        it('should return true if x/y values are matching', function() {
            vec.set(10, 100);
            vec1.set(10, 100);

            vec.equals(vec1).should.be.true;
        });

        it('should return false if x/y values do not match', function() {
            vec.set(10, 100);
            vec1.set(10, 120);

            vec.equals(vec1).should.be.false;

            vec.set(20, 100);
            vec1.set(10, 100);

            vec.equals(vec1).should.be.false;

            vec.set(20, 100);
            vec1.set(10, 120);

            vec.equals(vec1).should.be.false;
        });
    });

    describe('#toArray', function() {
        it('should return an array with the values in the form [x, y]', function() {
            var a = vec.set(5, 10).toArray();

            a.length.should.equal(2);
            a[0].should.equal(5);
            a[1].should.equal(10);
        });
    });

    describe('#clone', function() {
        it('should return a vector with the same values', function() {
            var v = vec.set(5, 10).clone();

            v.x.should.equal(5);
            v.y.should.equal(10);
            v.equals(vec).should.be.true;
        });
    });
});
