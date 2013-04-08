/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @module gf
 * @class TiledTileset
 * @extends Texture
 * @constructor
 * @param settings {Object} All the settings for the tileset
 */
gf.TiledTileset = function(settings) {
    if(!gf.assetCache[settings.name + '_texture']) {
        var loader = new gf.AssetLoader();
        loader.loadTexture(settings.name + '_texture', settings.image);
    }

    //initialize the base Texture class
    gf.Texture.call(this, gf.assetCache[settings.name + '_texture'].baseTexture);

    /**
     * The size of the tileset
     *
     * @property size
     * @type Vector
     */
    this.size = new gf.Vector(settings.imagewidth, settings.imageheight);

    /**
     * The size of a tile in the tileset
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(settings.tilewidth, settings.tileheight);

    /**
     * The name of the tileset
     *
     * @property name
     * @type String
     */
    this.name = settings.name;

    /**
     * The margin around a tile in the tileset
     *
     * @property margin
     * @type Number
     */
    this.margin = settings.margin;

    /**
     * The spacing around a tile in the tileset
     *
     * @property spacing
     * @type Number
     */
    this.spacing = settings.spacing;

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
     * The first tileId in the tileset
     *
     * @property firstgid
     * @type Number
     */
    this.firstgid = settings.firstgid;

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

    //massage tile properties
    for(var i = 0, il = this.tileproperties.length; i < il; ++i) {
        var v = this.tileproperties[i];

        if(v.normal) v.normal = gf.utils.ensureVector(v.normal);

        if(v.isCollidable === 'true') v.isCollidable = true;
        if(v.isBreakable === 'true') v.isBreakable = true;
    }

    /**
     * The texture instances for each tile in the set
     *
     * @property textures
     * @type Array
     */
    this.textures = [];

    //generate tile textures
    for(var t = 0, tl = this.lastgid - this.firstgid; t < tl; ++t) {
        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(t / this.numTiles.x),
            x = (t - (y * this.numTiles.x));

        this.textures.push(
            new gf.Texture(
                this.baseTexture,
                new PIXI.Rectangle(
                    x * this.tileSize.x,
                    y * this.tileSize.y,
                    this.tileSize.x,
                    this.tileSize.y
                )
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
                    type: gf.types.COLLISION.NONE
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
