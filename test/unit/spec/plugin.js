describe('plugin', function() {
    var obj, fn;

    beforeEach(function() {
        obj = {};
        fn = function() {
            false.should.be.ok;
        };

        obj.func = fn;
    });

    describe('#patch()', function() {
        it('should patch a function into being called', function() {
            var func = function() {
                true.should.be.ok;
            };

            gf.plugin.patch(obj, 'func', func);
            obj.func();
        });

        it('should correctly set _super', function() {
            var func = function() {
                this._super.should.equal(fn);
            };

            gf.plugin.patch(obj, 'func', func);
            obj.func();
        });

        it('should throw an error when no function is passed', function() {
            (function() {
                gf.plugin.patch(obj, 'func');
            }).should.throwError('The passed patch function is not a function.');
        });

        it('should throw an error when no function name is matched', function() {
            (function() {
                gf.plugin.patch(obj, 'func123');
            }).should.throwError('func123 is not a function in the passed object.');
        });
    });

    describe('#register()', function() {
        it('should register an object to the gf namespace', function() {
            gf.plugin.register(obj, 'testing');

            gf.testing.should.equal(obj);
        });

        it('should throw an error if the name is already taken', function() {
            (function() {
                gf.plugin.register(obj, 'Sprite');
            }).should.throwError('Unable to register plugin: "Sprite" already exists in the gf namespace, please choose something else!');
        });
    });
});
