describe('Tilemap', function() {
    describe('#parseXMLMap', function() {
        it('should properly parse the xml', function(done) {
            var maps = [
                    'demo_zlib',
                    'desert_gzip',
                    'sewers_uncomp'
                ],
                count = maps.length;

            maps.forEach(function(m) {
                testMap('fixtures/maps/' + m + '.json',     'fixtures/maps/' + m + '.tmx', onMapTestDone);
            });

            function onMapTestDone(err) {
                if(err) done(err);
                if(--count) return;

                done();
            }
        });
    });
});

function testMap(jsonFile, tmxFile, cb) {
    var parsed, json,
        count = 2,
        epsilon = 0.01;

    //load tmx
    gf.utils.ajax({
        url: tmxFile,
        dataType: 'xml',
        load: function(data) {
            parsed = gf.Tilemap.parseXMLMap(data);
            onComplete();
        },
        error: function(err) {
            cb(err);
        }
    });

    //load json
    gf.utils.ajax({
        url: jsonFile,
        dataType: 'json',
        load: function(data) {
            json = data;
            onComplete();
        },
        error: function(err) {
            cb(err);
        }
    });

    function onComplete() {
        if(--count) return;

        //map immediate properties check
        parsed.version.should.equal(json.version, 'Map versions should match');
        parsed.width.should.equal(json.width, 'Map widths should match');
        parsed.height.should.equal(json.height, 'Map heights should match');
        parsed.tilewidth.should.equal(json.tilewidth, 'Map tilewidths should match');
        parsed.tileheight.should.equal(json.tileheight, 'Map tileheights should match');
        parsed.orientation.should.equal(json.orientation, 'Map orientations should match');
        parsed.properties.should.containDeep(json.properties, 'Map roperties should match');

        //check layers for equality
        parsed.layers.length.should.equal(json.layers.length, 'Map number of layers should match');
        for(var i = 0; i < parsed.layers.length; ++i) {
            var pl = parsed.layers[i],
                jl = json.layers[i];

            //common stuff
            pl.name.should.equal(jl.name, 'Layer names should match');
            pl.type.should.equal(jl.type, 'Layer types should match');
            pl.width.should.equal(jl.width, 'Layer widths should match');
            pl.height.should.equal(jl.height, 'Layer heights should match');
            pl.x.should.equal(jl.x, 'Layer x-coords should match');
            pl.y.should.equal(jl.y, 'Layer y-coords should match');
            pl.opacity.should.be.approximately(jl.opacity, epsilon, 'Layer opacitys should match');
            pl.visible.should.equal(jl.visible, 'Layer visibilities should match');

            //tilelayer specific
            if(jl.type === 'tilelayer') {
                pl.should.have.property('data');
                pl.data.should.eql(jl.data, 'Layer data should match, ' + jsonFile);
            }
            //objectgroup specific
            else if(jl.type === 'objectgroup') {
                pl.should.have.property('draworder');
                pl.draworder.should.equal(jl.draworder, 'Layer draworder should match');

                pl.should.have.property('objects');
                //check objects for equality
                pl.objects.length.should.equal(jl.objects.length, 'Layer number of objects should match');
                for(var o = 0; o < pl.objects.length; ++o) {
                    var pobj = pl.objects[o],
                        jobj = jl.objects[o];

                    if(jobj.gid != null)
                        pobj.gid.should.equal(jobj.gid);

                    pobj.name.should.equal(jobj.name, 'Object names should match');
                    pobj.type.should.equal(jobj.type, 'Object types should match');
                    pobj.width.should.be.approximately(jobj.width, epsilon, 'Object widths should match');
                    pobj.height.should.be.approximately(jobj.height, epsilon, 'Object heights should match');
                    pobj.visible.should.equal(jobj.visible, 'Object visibilities should match');
                    pobj.rotation.should.be.approximately(jobj.rotation, epsilon, 'Object rotations should match');
                    pobj.x.should.be.approximately(jobj.x, epsilon, 'Object x-coords should match');
                    pobj.y.should.be.approximately(jobj.y, epsilon, 'Object y-coords should match');
                    pobj.properties.should.containDeep(jobj.properties, 'Object roperties should match');
                }
            }
        }

        //check tilesets for equality
        parsed.tilesets.length.should.equal(json.tilesets.length, 'Map number of tilesets should match, ' + jsonFile);
        for(var t = 0; t < parsed.tilesets.length; ++t) {
            var pt = parsed.tilesets[t],
                jt = json.tilesets[t];

            if(jt.image) {
                pt.should.have.property('image');
                pt.should.have.property('imagewidth');
                pt.should.have.property('imageheight');

                pt.image.should.equal(jt.image, 'Tileset images should match');
                pt.imagewidth.should.equal(jt.imagewidth, 'Tileset imagewidths should match');
                pt.imageheight.should.equal(jt.imageheight, 'Tileset imageheights should match');
            }

            pt.name.should.equal(jt.name, 'Tileset names should match');
            pt.tilewidth.should.equal(jt.tilewidth, 'Tileset tilewidths should match');
            pt.tileheight.should.equal(jt.tileheight, 'Tileset tileheights should match');
            pt.margin.should.equal(jt.margin, 'Tileset margin should match');
            pt.spacing.should.equal(jt.spacing, 'Tileset spacing should match');
            pt.firstgid.should.equal(jt.firstgid, 'Tileset firstgid should match');
            pt.properties.should.containDeep(jt.properties, 'Tileset properties should match');

            if(jt.tiles) {
                pt.should.have.property('tiles');
                pt.tiles.should.containDeep(jt.tiles, 'Tileset tiles should match');
            }
        }

        cb();
    }
}
