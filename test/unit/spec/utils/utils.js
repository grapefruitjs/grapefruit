describe('utils', function() {
    describe('#_arrayDelim', function() {
        it('should be /[|,]/', function() {
            gf.utils._arrayDelim.should.be.RegExp;
            gf.utils._arrayDelim.toString().should.equal('[|,]');
        });
    });

    describe('#noop', function() {
        it('should be an empty function', function() {
            gf.utils.noop.toString().should.equal((function() {}).toString());
        });
    });

    describe('#getAbsoluteUrl', function() {
        it('should return the absolute version of a url', function() {
            gf.utils.getAbsoluteUrl('/file/here').should.equal('http://localhost/file/here');
            gf.utils.getAbsoluteUrl('file/here').should.equal('http://localhost/file/here');
            gf.utils.getAbsoluteUrl('/here.html').should.equal('http://localhost/here.html');
            gf.utils.getAbsoluteUrl('here.png').should.equal('http://localhost/here.png');

            gf.utils.getAbsoluteUrl('some/big/long/path/that/is/stupid/because/it/is/so/long.jpg')
                        .should.equal('http://localhost/some/big/long/path/that/is/stupid/because/it/is/so/long.jpg');
        });
    });

    describe('#ajax', function() {
        it('should perform an ajax request');
    });

    describe('#createAjaxRequest', function() {
        it('should create the proper xhr object');
    });

    describe('#setValues', function() {
        it('should properly update an object with values');
    });

    describe('#extend', function() {
        it('should extend an object with values');
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
