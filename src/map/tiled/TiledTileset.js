/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @class TiledTileset
 * @extends Texture
 * @constructor
 * @param settings {Object} All the settings for the tileset
 */
//TODO: Support external tilesets (TSX files) via the "source" attribute
//see: https://github.com/bjorn/tiled/wiki/TMX-Map-Format#tileset
gf.TiledTileset = function(settings) {
    if(!gf.assetCache[settings.name + '_texture']) {
        throw 'You must preload the tileset images! Try loading the world file with the AssetLoader';
    }

    //initialize the base Texture class
    gf.Texture.call(this, gf.assetCache[settings.name + '_texture'].baseTexture);

    //Tiled Editor properties

    /**
     * The first tileId in the tileset
     *
     * @property firstgid
     * @type Number
     */
    this.firstgid = settings.firstgid;

    /**
     * The name of the tileset
     *
     * @property name
     * @type String
     */
    this.name = settings.name;

    /**
     * The size of a tile in the tileset
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(settings.tilewidth, settings.tileheight);

    /**
     * The spacing around a tile in the tileset
     *
     * @property spacing
     * @type Number
     */
    this.spacing = settings.spacing || 0;

    /**
     * The margin around a tile in the tileset
     *
     * @property margin
     * @type Number
     */
    this.margin = settings.margin || 0;

    /**
     * The offset of tile positions when rendered
     *
     * @property tileoffset
     * @type Number
     */
    this.tileoffset = new gf.Vector(
        settings.tileoffset ? settings.tileoffset.x : 0,
        settings.tileoffset ? settings.tileoffset.y : 0
    );

    //TODO: Support for "tileoffset," "terraintypes," "image"
    //see: https://github.com/bjorn/tiled/wiki/TMX-Map-Format#tileset

    //Custom/Optional properties

    /**
     * The number of tiles calculated based on size, margin, and spacing
     *
     * @property numTiles
     * @type Vector
     */
    this.numTiles = new gf.Vector(
        ~~((this.baseTexture.source.width - this.margin) / (this.tileSize.x + this.spacing)),
        ~~((this.baseTexture.source.height - this.margin) / (this.tileSize.y + this.spacing))
    );

    /**
     * The last tileId in the tileset
     *
     * @property lastgid
     * @type Number
     */
    this.lastgid = this.firstgid + (((this.numTiles.x * this.numTiles.y) - 1) || 0);

    /**
     * The properties of the tileset
     *
     * @property properties
     * @type Object
     */
    this.properties = settings.properties || {};

    /**
     * The properties of the tiles in the tileset (like collision stuff)
     *
     * @property tileproperties
     * @type Object
     */
    this.tileproperties = settings.tileproperties || {};

    /**
     * The size of the tileset
     *
     * @property size
     * @type Vector
     */
    this.size = new gf.Vector(settings.imagewidth, settings.imageheight);

    /**
     * The texture instances for each tile in the set
     *
     * @property textures
     * @type Array
     */
    this.textures = [];

    //ensure hitArea is an array of points
    if(this.properties.tileHitArea) {
        var h = this.properties.tileHitArea.split(gf.utils._arrayDelim);

        //odd number of values
        if(h.length % 2 !== 0) {
            throw 'Uneven number of values for tileHitArea on tileset! Should be a flat array of x/y values.';
        }

        var hv =  = [];
        for(var i = 0, il = h.length; i < il; i+=2) {
            hv.push(
                new gf.Point(
                    parseFloat(h[i], 10),
                    parseFloat(h[i + 1], 10)
                )
            );
        }
        this.properties.tileHitArea = new gf.Polygon(hv);
    }

    //massage tile properties
    for(var k in this.tileproperties) {
        var v = this.tileproperties[k];

        if(v.normal) v.normal = gf.utils.ensureVector(v.normal);

        if(v.isCollidable === 'true') v.isCollidable = true;
        if(v.isBreakable === 'true') v.isBreakable = true;

        if(v.hitArea) {
            var ha = v.hitArea.split(gf.utils._arrayDelim);

            //odd number of values
            if(ha.length % 2 !== 0) {
                throw 'Uneven number of values for hitArea on a tile of a tileset! Should be a flat array of x/y values.';
            }

            var hav = [];
            for(var i = 0, il = h.length; i < il; i+=2) {
                hav.push(
                    new gf.Point(
                        parseFloat(h[i], 10),
                        parseFloat(h[i + 1], 10)
                    )
                );
            }
            v.hitArea = new gf.Polygon(hav);
        }
    }

    //generate tile textures
    for(var t = 0, tl = this.lastgid - this.firstgid + 1; t < tl; ++t) {
        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(t / this.numTiles.x),
            x = (t - (y * this.numTiles.x));

        //get location in pixels
        x = (x * this.tileSize.x) + (x * this.spacing) + this.margin;
        y = (y * this.tileSize.y) + (y * this.spacing) + this.margin;

        this.textures.push(
            new gf.Texture(
                this.baseTexture,
                new PIXI.Rectangle(x, y, this.tileSize.x, this.tileSize.y)
            )
        );
    }
};

gf.inherits(gf.TiledTileset, gf.Texture, {
    /**
     * Gets the tile properties for a tile based on it's ID
     *
     * @method getTileProperties
     * @param tileId {Number} The id of the tile to get the properties for
     * @return {Object} The properties of the tile
     */
    getTileProperties: function(tileId) {
        if(tileId === undefined) return null;

        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        return this.tileproperties[tileId] ?
                //get this value
                this.tileproperties[tileId] :
                //set this id to default values and cache
                this.tileproperties[tileId] = {
                    isCollidable: false,
                    isBreakable: false,
                    type: gf.Tile.TYPE.NONE
                };
    },
    /**
     * Gets the tile texture for a tile based on it's ID
     *
     * @method getTileTexture
     * @param tileId {Number} The id of the tile to get the texture for
     * @return {Texture} The texture for the tile
     */
    getTileTexture: function(tileId) {
        if(tileId === undefined) return null;

        //get the internal ID of the tile in this set (0 indexed)
        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        return this.textures[tileId];
    }
});
