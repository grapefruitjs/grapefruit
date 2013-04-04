/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @module gf
 * @class Tiled Map
 */
gf.TiledTileset = function(settings) {
    //first build the baseTexture
    var image = new Image();
    image.src = settings.image;
    baseTexture = new PIXI.BaseTexture(image);
    PIXI.BaseTextureCache[settings.image] = baseTexture;

    //initialize the base Texture class
    PIXI.Texture.call(this, baseTexture);

    this.size = new gf.Vector(settings.imagewidth, settings.imageheight);
    this.tileSize = new gf.Vector(settings.tilewidth, settings.tileheight);

    this.name = settings.name;
    this.margin = settings.margin;
    this.spacing = settings.spacing;

    this.numTiles = new gf.Vector(
        ~~((this.baseTexture.source.width - this.margin) / (this.tileSize.x + this.spacing)),
        ~~((this.baseTexture.source.height - this.margin) / (this.tileSize.y + this.spacing))
    );

    this.firstgid = settings.firstgid;
    this.lastgid = this.firstgid + (((this.numTiles.x * this.numTiles.y) - 1) || 0);

    this.properties = settings.properties || {};
    this.tileproperties = settings.tileproperties || {};

    //massage normal
    for(var i = 0, il = this.tileproperties.length; i < il; ++i) {
        if(v.normal) v.normal = gf.utils.ensureVector(v.normal);

        if(v.isCollidable === 'true') v.isCollidable = true;
        if(v.isBreakable === 'true') v.isBreakable = true;
    }
};

gf.inherits(gf.TiledTileset, PIXI.Texture, {
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
    createTileSprite: function(tileId) {
        if(tileId === undefined) return null;

        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(tileId / this.size.x),
            x = (id - (y * this.size.x));

        return new PIXI.Sprite(
            new PIXI.Texture(
                this.baseTexture,
                new Rectangle(
                    x * this.tileSize.x, //offset of x
                    y * this.tileSize.y, //offset of y
                    this.tileSize.x, //size
                    this.tileSize.y
                )
            )
        );
    }
});
