/**
 * Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @class TiledMap
 * @extends Map
 * @constructor
 * @param game {Game} The game the map is in
 * @param position {Point|Vector|Array|Number} The starting position of the map
 * @param map {Object} All the settings for the map
 */
gf.TiledMap = function(map) {
    gf.Map.call(this, map);

    //Tiled Editor properties

    /**
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = map.properties || {};
    this.scale.x = parseFloat(this.properties.scale, 10) || 1;
    this.scale.y = parseFloat(this.properties.scale, 10) || 1;

    /**
     * The tile size
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(
        map.tilewidth,
        map.tileheight
    );

    /**
     * The orientation of the map
     *
     * @property orientation
     * @type String
     */
    this.orientation = map.orientation;

    /**
     * The version of the TMX format
     *
     * @property version
     * @type Number
     */
    this.version = map.version;

    /**
     * The background color of the map (since Tiled 0.9.0)
     *
     * @property backgroundColor
     * @type Number
     */
    this.backgroundColor = map.backgroundColor;

    //Custom/Optional properties

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

    /**
     * The scaled tile size
     *
     * @property scaledTileSize
     * @type Vector
     */
    this.scaledTileSize = new gf.Vector(
        map.tilewidth * this.scale.x,
        map.tileheight * this.scale.y
    );

    /**
     * The real size (size * scaledTileSize)
     *
     * @property realSize
     * @type Vector
     */
    this.realSize = new gf.Vector(
        this.size.x * this.scaledTileSize.x,
        this.size.y * this.scaledTileSize.y
    );

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        this.tilesets.push(new gf.TiledTileset(map.tilesets[t]));
    }

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case 'tilelayer':
                lyr = new gf.TiledLayer(map.layers[i]);
                break;

            case 'objectgroup':
                lyr = new gf.TiledObjectGroup(map.layers[i]);
                break;

            case 'imagelayer':
                lyr = new gf.ImageLayer(map.layers[i]);
                break;
        }

        this.addChild(lyr);
    }

    //rotate for isometric maps
    this.offset = new gf.Point();
    if(this.orientation === 'isometric') {
        this.offset.x = (this.realSize.x / 2) - (this.tileSize.x / 2);
        this.position.x += this.offset.x;
    }
};

gf.inherits(gf.TiledMap, gf.Map, {
    /**
     * Gets the tileset that an ID is associated with
     *
     * @method getTileset
     * @param tileId {Number} The id of the tile to find the tileset for
     * @return {TiledTileset}
     */
    getTileset: function(tileId) {
        for(var i = 0, il = this.tilesets.length; i < il; ++i)
            if(tileId >= this.tilesets[i].firstgid && tileId <= this.tilesets[i].lastgid)
                return this.tilesets[i];
    },
    /**
     * Notifies the map it needs to resize, re renders the viewport
     *
     * @method resize
     * @private
     */
    resize: function(width, height) {
        var numX = Math.ceil(width / this.scaledTileSize.x),
            numY = Math.ceil(height / this.scaledTileSize.y);

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o instanceof gf.TiledLayer) {
                o.renderTiles(
                    Math.floor((Math.abs(this.position.x) - this.offset.x) / this.scaledTileSize.x),
                    Math.floor((Math.abs(this.position.y) - this.offset.y) / this.scaledTileSize.y),
                    numX,
                    numY
                );
            }
        }
    },
    spawnObjects: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o instanceof gf.TiledObjectGroup) {
                o.spawn();
            }
        }
    },
    onTileEvent: function(eventName, tile, data) {
        this.emit({
            type: 'tile.' + eventName,
            tile: tile,
            data: data
        });
    },
    onObjectEvent: function(eventName, obj, data) {
        this.emit({
            type: 'object.' + eventName,
            object: obj,
            data: data
        });
    }
});
