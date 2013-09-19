var Container = require('../display/Container'),
    Vector = require('../math/Vector'),
    utils = require('../utils/utils'),
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
    this.name = '';

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
     * @property name
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
};

utils.inherits(Tilelayer, Container, {
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
