/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @module gf
 * @class Tiled Map
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
    PIXI.Texture.call(this, gf.assetCache[settings.name + '_texture'].baseTexture);

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

    //massage normal
    for(var i = 0, il = this.tileproperties.length; i < il; ++i) {
        var v = this.tileproperties[i];

        if(v.normal) v.normal = gf.utils.ensureVector(v.normal);

        if(v.isCollidable === 'true') v.isCollidable = true;
        if(v.isBreakable === 'true') v.isBreakable = true;
    }
};

gf.inherits(gf.TiledTileset, PIXI.Texture, {
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
     * Creates the sprite for a tile (used by the TiledLayer to render tiles)
     *
     * @method createTileSprite
     * @param tileId {Number} The id of the tile to get the properties for
     * @return {PIXI.Sprite} The sprite to display
     */
    createTileSprite: function(tileId) {
        if(tileId === undefined) return null;

        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(tileId / this.size.x),
            x = (tileId - (y * this.size.x));

        return new PIXI.Sprite(
            new PIXI.Texture(
                this.baseTexture,
                new PIXI.Rectangle(
                    x * this.tileSize.x, //offset of x
                    y * this.tileSize.y, //offset of y
                    this.tileSize.x, //size
                    this.tileSize.y
                )
            )
        );
    }
});
