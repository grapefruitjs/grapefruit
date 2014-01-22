describe('constants', function() {
    it('should export correct constant values', function() {
        //renderer types
        gf.RENDERER.AUTO.should.equal('auto');
        gf.RENDERER.CANVAS.should.equal('canvas');
        gf.RENDERER.WEBGL.should.equal('webgl');

        //file format types
        gf.FILE_FORMAT.JSON.should.equal('json');
        gf.FILE_FORMAT.XML.should.equal('xml');
        gf.FILE_FORMAT.CSV.should.equal('csv');

        //atlas format types
        gf.ATLAS_FORMAT.JSON_ARRAY.should.equal('json_array');
        gf.ATLAS_FORMAT.JSON_HASH.should.equal('json_hash');
        gf.ATLAS_FORMAT.XML_STARLING.should.equal('xml_starling');

        //camera follow values
        gf.CAMERA_FOLLOW.PLATFORMER.should.equal(0);
        gf.CAMERA_FOLLOW.TOPDOWN.should.equal(1);
        gf.CAMERA_FOLLOW.TOPDOWN_TIGHT.should.equal(2);
        gf.CAMERA_FOLLOW.LOCKON.should.equal(3);

        //axis flags
        gf.AXIS.NONE.should.equal(0);
        gf.AXIS.HORIZONTAL.should.equal(1);
        gf.AXIS.VERTICAL.should.equal(2);
        gf.AXIS.BOTH.should.equal(gf.AXIS.HORIZONTAL | gf.AXIS.VERTICAL);

        //Directional Flags
        gf.DIRECTION.NONE.should.equal(0);
        gf.DIRECTION.LEFT.should.equal(1);
        gf.DIRECTION.RIGHT.should.equal(2);
        gf.DIRECTION.UP.should.equal(4);
        gf.DIRECTION.DOWN.should.equal(8);
        gf.DIRECTION.ALL.should.equal(
            gf.DIRECTION.LEFT | gf.DIRECTION.RIGHT |
            gf.DIRECTION.UP | gf.DIRECTION.DOWN
        );

        //types of shapes for quick shape test checking in physics
        gf.SHAPE.CIRCLE.should.equal(1);
        gf.SHAPE.POLYGON.should.equal(2);
        gf.SHAPE.RECTANGLE.should.equal(3);
    });
});
