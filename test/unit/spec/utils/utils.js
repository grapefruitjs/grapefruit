describe('utils', function() {
    describe('#_arrayDelim', function() {
        it('should be /[|,]/', function() {
            gf.utils._arrayDelim.should.be.RegExp;
            gf.utils._arrayDelim.should.eql(/[|,]/);
        });
    });

    describe('#noop', function() {
        it('should be an empty function', function() {
            gf.utils.noop.toString().should.match(/^function\s\(\)\s{\s+}$/);
        });
    });

    describe('#getAbsoluteUrl', function() {
        it('should return the absolute version of a url', function() {
            gf.utils.getAbsoluteUrl('/file/here').should.equal('file:///file/here');
            gf.utils.getAbsoluteUrl('file/here').should.match(/^file:\/\/\/.+\/test\/unit\/file\/here$/);
            gf.utils.getAbsoluteUrl('/here.html').should.equal('file:///here.html');
            gf.utils.getAbsoluteUrl('here.png').should.match(/^file:\/\/\/.+\/test\/unit\/here\.png$/);

            gf.utils.getAbsoluteUrl('some/big/long/path/that/is/stupid/because/it/is/so/long.jpg')
                        .should.match(/^file:\/\/\/.+\/test\/unit\/some\/big\/long\/path\/that\/is\/stupid\/because\/it\/is\/so\/long\.jpg$/);
        });
    });

    describe('#ajax', function() {
        it('should perform an ajax request');
    });

    describe('#createAjaxRequest', function() {
        it('should create the proper xhr object');
    });

    describe('#setValues', function() {
        it('should properly update an object\'s values', function() {
            var o = { a: 1, b: 'string', c: 'd' },
                s = { a: 5, c: 'f' };

            gf.utils.setValues(o, s);

            o.a.should.equal(5);
            o.b.should.equal('string');
            o.c.should.equal('f');
        });

        it('should parse a vector from a string, array, number, or vector', function() {
            var o = { v: new gf.Vector() },
                s = { v: '10,1' },
                a = { v: [5, 7] },
                n = { v: 8 },
                v = { v: new gf.Vector(11, 15) };

            gf.utils.setValues(o, s);
            o.v.x.should.equal(10);
            o.v.y.should.equal(1);

            gf.utils.setValues(o, a);
            o.v.x.should.equal(5);
            o.v.y.should.equal(7);

            gf.utils.setValues(o, n);
            o.v.x.should.equal(8);
            o.v.y.should.equal(8);

            gf.utils.setValues(o, v);
            o.v.x.should.equal(11);
            o.v.y.should.equal(15);
        });

        it('should parse an array from a string, or array', function() {
            var o = { a: [] },
                s = { a: '15,22' },
                a = { a: [22, 15] };

            gf.utils.setValues(o, s);
            o.a.should.eql([15, 22]);

            gf.utils.setValues(o, a);
            o.a.should.eql([22, 15]);
        });

        it('should parse a number from a string, or number', function() {
            var o = { n: 10 },
                s = { n: '15' },
                n = { n: 22 };

            gf.utils.setValues(o, s);
            o.n.should.equal(15);

            gf.utils.setValues(o, n);
            o.n.should.equal(22);
        });
    });

    describe('#extend', function() {
        // TAKEN STRAIGHT FROM JQUERY: https://github.com/jquery/jquery/blob/master/test/unit/core.js
        // refactored to use should.js
        it('should extend an object with values', function() {
            var empty, optionsWithLength, optionsWithDate, myKlass,
                customObject, optionsWithCustomObject, MyNumber, ret,
                nullUndef, target, recursive, obj,
                defaults, defaultsCopy, options1, options1Copy, options2, options2Copy, merged2,
                settings = { "xnumber1": 5, "xnumber2": 7, "xstring1": "peter", "xstring2": "pan" },
                options = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" },
                optionsCopy = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" },
                merged = { "xnumber1": 5, "xnumber2": 1, "xstring1": "peter", "xstring2": "x", "xxx": "newstring" },
                deep1 = { "foo": { "bar": true } },
                deep2 = { "foo": { "baz": true }, "foo2": document },
                deep2copy = { "foo": { "baz": true }, "foo2": document },
                deepmerged = { "foo": { "bar": true, "baz": true }, "foo2": document },
                arr = [1, 2, 3],
                nestedarray = { "arr": arr };

            gf.utils.extend(settings, options);
            settings.should.eql(merged, "Check if extended: settings must be extended");
            options.should.eql(optionsCopy, "Check if not modified: options must not be modified");

            gf.utils.extend(settings, null, options);
            settings.should.eql(merged, "Check if extended: settings must be extended");
            options.should.eql(optionsCopy, "Check if not modified: options must not be modified");

            gf.utils.extend(true, deep1, deep2);
            deep1["foo"].should.eql(deepmerged["foo"], "Check if foo: settings must be extended");
            deep2["foo"].should.eql(deep2copy["foo"], "Check if not deep2: options must not be modified");
            deep1["foo2"].should.equal(document, "Make sure that a deep clone was not attempted on the document");

            gf.utils.extend(true, {}, nestedarray)["arr"].should.not.equal(arr, "Deep extend of object must clone child array");

            // #5991
            gf.utils.extend(true, { "arr": {} }, nestedarray)["arr"].should.be.an.Array; //"Cloned array have to be an Array"
            gf.utils.extend(true, { "arr": arr }, { "arr": {} })["arr"].should.be.an.Object; //"Cloned object have to be an plain object"

            empty = {};
            optionsWithLength = { "foo": { "length": -1 } };
            gf.utils.extend(true, empty, optionsWithLength);
            empty["foo"].should.eql(optionsWithLength["foo"], "The length property must copy correctly");

            empty = {};
            optionsWithDate = { "foo": { "date": new Date() } };
            gf.utils.extend(true, empty, optionsWithDate);
            empty["foo"].should.eql(optionsWithDate["foo"], "Dates copy correctly");

            /** @constructor */
            myKlass = function() {};
            customObject = new myKlass();
            optionsWithCustomObject = { "foo": { "date": customObject } };
            empty = {};
            gf.utils.extend(true, empty, optionsWithCustomObject);
            empty["foo"].should.be.ok;
            empty["foo"]["date"].should.equal(customObject, "Custom objects copy correctly (no methods)");

            // Makes the class a little more realistic
            myKlass.prototype = { "someMethod": function(){} };
            empty = {};
            gf.utils.extend(true, empty, optionsWithCustomObject);
            empty["foo"].should.be.ok;
            empty["foo"]["date"].should.equal(customObject, "Custom objects copy correctly");

            MyNumber = Number;

            ret = gf.utils.extend(true, { "foo": 4 }, { "foo": new MyNumber(5) } );
            parseInt(ret.foo, 10).should.equal(5, "Wrapped numbers copy correctly");

            nullUndef;
            nullUndef = gf.utils.extend({}, options, { "xnumber2": null });
            (nullUndef["xnumber2"] === null).should.be.ok; //"Check to make sure null values are copied"

            nullUndef = gf.utils.extend({}, options, { "xnumber2": undefined });
            nullUndef["xnumber2"].should.equal(options["xnumber2"], "Check to make sure undefined values are not copied");

            nullUndef = gf.utils.extend({}, options, { "xnumber0": null });
            (nullUndef["xnumber0"] === null).should.be.ok; //"Check to make sure null values are inserted");

            target = {};
            recursive = { foo:target, bar:5 };
            gf.utils.extend(true, target, recursive);
            target.should.eql({ bar:5 }, "Check to make sure a recursive obj doesn't go never-ending loop by not copying it over");

            ret = gf.utils.extend(true, { foo: [] }, { foo: [0] } ); // 1907
            ret.foo.length.should.equal(1, "Check to make sure a value with coercion 'false' copies over when necessary to fix #1907");

            ret = gf.utils.extend(true, { foo: "1,2,3" }, { foo: [1, 2, 3] } );
            ret.foo.should.not.be.a.String; //"Check to make sure values equal with coercion (but not actually equal) overwrite correctly"

            ret = gf.utils.extend(true, { foo:"bar" }, { foo:null } );
            (ret.foo === null).should.be.ok; //"Make sure a null value doesn't crash with deep extend, for #1908"

            obj = { foo:null };
            gf.utils.extend(true, obj, { foo:"notnull" } );
            obj.foo.should.equal("notnull", "Make sure a null value can be overwritten");

            function func() {}
            gf.utils.extend(func, { key: "value" } );
            func.key.should.equal("value", "Verify a function can be extended");

            defaults = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" };
            defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" };
            options1 = { xnumber2: 1, xstring2: "x" };
            options1Copy = { xnumber2: 1, xstring2: "x" };
            options2 = { xstring2: "xx", xxx: "newstringx" };
            options2Copy = { xstring2: "xx", xxx: "newstringx" };
            merged2 = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "xx", xxx: "newstringx" };

            settings = gf.utils.extend({}, defaults, options1, options2);
            settings.should.eql(merged2, "Check if extended: settings must be extended");
            defaults.should.eql(defaultsCopy, "Check if not modified: options1 must not be modified");
            options1.should.eql(options1Copy, "Check if not modified: options1 must not be modified");
            options2.should.eql(options2Copy, "Check if not modified: options2 must not be modified");
        });
    });

    describe('#isPlainObject', function() {
        it('should return true of an object is a plain object');
    });

    describe('#getOffset', function() {
        it('should return the DOM offset of an element');
    });

    describe('#parseHitArea', function() {
        it('should parse a string into a geometric object');
    });

    describe('#parseTiledProperties', function() {
        it('should parse tiled properties into js types');
    });

    describe('#_logger', function() {
        it('should be window.console');
    });

    describe('#log', function() {
        it('should call _logger.log');
    });

    describe('#warn', function() {
        it('should call _logger.warn');
    });

    describe('#error', function() {
        it('should call _logger.error');
    });

    describe('#parseXML', function() {
        it('should have a parseXML function');
        it('should parse an xml string into a document');
        it('should throw an error if no parser is available');
    });
});
