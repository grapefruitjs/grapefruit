var Container = require('../display/Container'),
    Vector = require('../math/Vector'),
    math = require('../math/math'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    support = require('../utils/support');

/**
 * The Tilelayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the Tilemap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @class Tilelayer
 * @extends Container
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
var Tilelayer = module.exports = function(map, layer) {
    Container.call(this, layer);

    /**
     * The map instance this tilelayer belongs to
     *
     * @property map
     * @type Tilemap
     */
    this.map = map;

    /**
     * The game instance this tilemap belongs to
     *
     * @property game
     * @type Game
     */
    this.game = map.game;

    /**
     * The name of the layer
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = layer.name || '';

    /**
     * The size of the layer
     *
     * @property size
     * @type Vector
     * @default new Vector(1, 1)
     */
    this.size = new Vector(layer.width || 0, layer.height || 0);

    /**
     * The tile IDs of the tilemap
     *
     * @property tileIds
     * @type Uint32Array
     */
    this.tileIds = support.typedArrays ? new Uint32Array(layer.data) : layer.data;

    /**
     * The user-defined properties of this group. Usually defined in the TiledEditor
     *
     * @property properties
     * @type Object
     */
    this.properties = utils.parseTiledProperties(layer.properties) || {};

    //translate some tiled properties to our inherited properties
    this.type = layer.type;
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;
    this.visible = layer.visible;

    //temp vars for overlap testing
    this._overlaps = [];
    this._tempTileBlock = [];
    this._tempTileX = 0;
    this._tempTileY = 0;
    this._tempTileW = 0;
    this._tempTileH = 0;
};

inherit(Tilelayer, Container, {
    /**
     * Renders a layer onto a context
     *
     * @method render
     * @param ctx {CanvasRenderingContext2D} The context to render to
     * @param x {Number} The x offset to consider the top-left
     * @param y {Number} The y offset to consider the top-left
     * @param width {Number} The width (in pixels) to render
     * @param height {Number} The height (in pixels) to render
     */
    render: function(ctx, x, y, width, height) {
        var map = this.map,
            tsx = map.tileSize.x,
            tsy = map.tileSize.y,
            startX = Math.floor(x / tsx),
            startY = Math.floor(y / tsy),
            maxX = Math.ceil(width / tsx),
            maxY = Math.ceil(height / tsx),
            nx = (x * width) % tsx,
            ny = (y * height) % tsy,
            sx = map.size.x;

        for(var i = startX; i < maxX; ++i) {
            for(var j = startY; j < maxY; ++j) {
                var id = (i + (j * sx)),
                    tid = this.tileIds[id],
                    set = map.getTileset(tid);

                if(set) {
                    var tx = set.getTileTexture(tid),
                        frame = tx.frame;

                    ctx.drawImage(
                        tx.baseTexture.source,
                        frame.x,
                        frame.y,
                        frame.width,
                        frame.height,
                        (i * tsx) - nx + set.tileoffset.x,
                        (j * tsy) - ny + set.tileoffset.y,
                        frame.width,
                        frame.height
                    );
                }
            }
        }
    },
    /**
     * Get tiles overlaps the given sprite.
     *
     * @method getTileOverlaps
     * @param sprite {Sprite} Tiles you want to get that overlaps this.
     * @return {array} Array with tiles informations. (Each contains x, y and the tile.)
     */
    getTileOverlaps: function(sprite) {

        this._overlaps.length = 0;

        //If the sprite is outside of the world coordinates then abort the check (tilemap has to exist within world bounds)
        if(sprite.body.x < 0 || sprite.body.x > this.map.realSize.x || sprite.body.y < 0 || sprite.body.y > this.map.realSize.y) {
            return this._overlaps;
        }

        //What tiles do we need to check against?
        this._tempTileX = math.snapFloor(sprite.body.x, this.map.tileSize.x) / this.map.tileSize.x;
        this._tempTileY = math.snapFloor(sprite.body.y, this.map.tileSize.y) / this.map.tileSize.y;
        this._tempTileW = (math.snapCeil(sprite.body.width, this.map.tileSize.x) + this.map.tileSize.x) / this.map.tileSize.x;
        this._tempTileH = (math.snapCeil(sprite.body.height, this.map.tileSize.y) + this.map.tileSize.y) / this.map.tileSize.y;

        //  Loop through the tiles we've got and check overlaps accordingly (the results are stored in this._tempTileBlock)
        this.getTempBlock(this._tempTileX, this._tempTileY, this._tempTileW, this._tempTileH, true);

        for(var i = 0, il = this._tempTileBlock.length; i < il; ++i) {
            var block = this._tempTileBlock[i];
            //separateTile: function (sprite, x, y, width, height, mass, collideLeft, collideRight, collideUp, collideDown, separateX, separateY)            
            if(
                this.game.physics.separateTile(
                    sprite,
                    block.x * this.map.tileSize.x,
                    block.y * this.map.tileSize.y,
                    this.map.tileSize.x,
                    this.map.tileSize.y,
                    block.tile.mass || 1,
                    block.tile.collideLeft,
                    block.tile.collideRight,
                    block.tile.collideUp,
                    block.tile.collideDown,
                    block.tile.separateX,
                    block.tile.separateY
                )
            ) {
                this._overlaps.push(block);
            }
        }

        return this._overlaps;
    },
    /**
     * Get a tile block with its position and size. (This method does not return, it'll set result to _tempTileBlock)
     *
     * @method getTempBlock
     * @param x {number} X position of block's left-top corner.
     * @param y {number} Y position of block's left-top corner.
     * @param width {number} Width of block.
     * @param height {number} Height of block.
     * @param collisionOnly {bool} Whethor or not ONLY return tiles which will collide (its allowCollisions value is not Collision.NONE).
     */
    getTempBlock: function (x, y, width, height, collisionOnly) {
        collisionOnly = collisionOnly || false;

        var map = this.map,
            sx = map.size.x,
            sy = map.size.y;

        if(x < 0)
            x = 0;

        if(y < 0)
            y = 0;

        if(width > sx)
            width = sx;

        if (height > sy)
            height = sy;

        this._tempTileBlock.length = 0;

        for(var ty = y; ty < y + height; ty++) {
            for(var tx = x; tx < x + width; tx++) {
                var id = (tx + (ty * sx)),
                    tid = this.tileIds[id],
                    set = map.getTileset(tid),
                    props;

                if(!set)
                    continue;

                props = set.getTileProperties(tid);

                if(!collisionOnly || props.collidable) {
                    this._tempTileBlock.push({
                        x: tx,
                        y: ty,
                        tile: props
                    });
                }
            }
        }
    },
    destroy: function() {
        Container.prototype.destroy.call(this);

        this.game = null;
        this.name = null;
        this.size = null;
        this.tileIds = null;
        this.properties = null;
        this.type = null;
        this.position.x = null;
        this.position.y = null;
        this.alpha = null;
        this.visible = null;
        this.preRender = null;
        this.chunkSize = null;
        this._preRendered = null;
        this._tilePool = null;
        this._buffered = null;
        this._panDelta = null;
        this._rendered = null;
    }
});
