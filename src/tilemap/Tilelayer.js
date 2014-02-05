var SpriteBatch = require('../display/SpriteBatch'),
    Sprite = require('../display/Sprite'),
    Rectangle = require('../geom/Rectangle'),
    Vector = require('../math/Vector'),
    Texture = require('../display/Texture'),
    //Tile = require('./Tile'),
    math = require('../math/math'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    support = require('../utils/support'),
    PIXI = require('../vendor/pixi');

/**
 * The Tilelayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the Tilemap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @class Tilelayer
 * @extends SpriteBatch
 * @constructor
 * @param map {Tilemap} The tilemap instance that this belongs to
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
var Tilelayer = function(map, layer) {
    SpriteBatch.call(this);

    /**
     * The map instance this tilelayer belongs to
     *
     * @property map
     * @type Tilemap
     */
    this.map = map;

    /**
     * The state instance this tilelayer belongs to
     *
     * @property state
     * @type Game
     */
    this.state = map.state;

    /**
     * The state instance this tilelayer belongs to
     *
     * @property state
     * @type Game
     */
    this.state = map.state;

    /**
     * The current map of all tiles on the screen
     *
     * @property tiles
     * @type Object
     */
    this.tiles = [];

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

    /**
     * The Tiled type of tile layer, should always be 'tilelayer'
     *
     * @property type
     * @type String
     * @default 'tilelayer'
     */
    this.type = layer.type || 'tilelayer';

    /**
     * Is this layer supposed to be preRendered?
     *
     * @property preRender
     * @type Boolean
     * @default false
     */
    this.preRender = layer.preRender || this.properties.preRender || false;

    /**
     * The size of a chunk when pre rendering
     *
     * @property chunkSize
     * @type Vector
     * @default new Vector(512, 512)
     */
    this.chunkSize = new Vector(
        layer.chunkSizeX || layer.chunkSize || this.properties.chunkSizeX || this.properties.chunkSize || 512,
        layer.chunkSizeY || layer.chunkSize || this.properties.chunkSizeY || this.properties.chunkSize || 512
    );

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x || 0;
    this.position.y = layer.y || 0;
    this.alpha = layer.opacity !== undefined ? layer.opacity : 1;
    this.visible = layer.visible !== undefined ? layer.visible : true;

    //some private trackers
    this._preRendered = false;
    this._tilePool = [];
    this._buffered = { left: false, right: false, top: false, bottom: false };
    this._panDelta = new Vector();
    this._rendered = new Rectangle();


    this.requiresUpdate = false;
    this.buffer = new PIXI.CanvasBuffer(this.map.game.width, this.map.game.height);
    this.texture = Texture.fromCanvas(this.buffer.canvas);
    this.sprite = new Sprite(this.texture);
    this.addChild(this.sprite);

    this._cache = {
        sx: 0,
        sy: 0,
        w: 0,
        h: 0
    };
};

inherit(Tilelayer, SpriteBatch, {
    getBounds: function() {
        return this.map.getBounds();
    },
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method resize
     * @param x {Number} The x-coord in the map to start rendering
     * @param y {Number} The y-coord in the map to start rendering
     * @param width {Number} The width of the viewport
     * @param height {Number} The height of the viewport
     * @return {Tilelayer} Returns itself.
     * @chainable
     */
    render: function(sx, sy, w, h) {
        //copy down our tilesize
        if(!this.tileSize)
            this.tileSize = this.map.tileSize;

        if(this._cache.sx === sx && this._cache.sy === sy && this._cache.w === w && this._cache.h === h)
            return;

        this._cache.sx = sx;
        this._cache.sy = sy;
        this._cache.w = w;
        this._cache.h = h;

        //resize our buffer
        this.buffer.resize(w, h);
        this.buffer.context.clearRect(0, 0, w, h);

        ///////////////////////////

        var tsx = this.tileSize.x,
            tsy = this.tileSize.y,
            startX = math.max(0, math.floor(sx / tsx)),
            startY = math.max(0, math.floor(sy / tsy)),
            maxX = math.min(math.ceil(w / tsx) + 1, this.map.size.x),
            maxY = math.min(math.ceil(h / tsy) + 1, this.map.size.y),
            dx = -(sx - (startX * tsx)),
            dy = -(sy - (startY * tsy)),
            tx = dx,
            ty = dy;

        for(var x = startX; x < startX + maxX; ++x) {
            for(var y = startY; y < startY + maxY; ++y) {
                var id = (x + (y * this.map.size.x)),
                    tid = this.tileIds[id],
                    set = this.map.getTileset(tid),
                    tex, frame;

                if(set) {
                    tex = set.getTileTexture(tid);
                    frame = tex.frame;

                    this.buffer.context.drawImage(
                        tex.baseTexture.source,
                        frame.x,
                        frame.y,
                        tsx,
                        tsy,
                        math.floor(tx) + set.tileoffset.x,
                        math.floor(ty) + set.tileoffset.y,
                        tsx,
                        tsy
                    );
                }

                ty += tsy;
            }

            tx += tsx;
            ty = dy;
        }

        /*var mapScaledTileSize = this.map.scaledTileSize,
            mapSize = this.map.size;

        //setup position in tiles
        sx = math.floor(sx / mapScaledTileSize.x);
        sy = math.floor(sy / mapScaledTileSize.y);

        sx = sx < 0 ? 0 : sx;
        sy = sy < 0 ? 0 : sy;

        //setup size in tiles
        w = math.ceil(w / mapScaledTileSize.x);
        h = math.ceil(h / mapScaledTileSize.y);

        //ensure we don't go outside the map size
        w = (sx + w > mapSize.x) ? (mapSize.x - sx) : w;
        h = (sy + h > mapSize.y) ? (mapSize.y - sy) : h;

        var tx = 0,
            ty = 0;

        //iterate and draw each tile
        for(var y = sy; y < sy + h; ++y) {
            for(var x = sx; x < sx + w; ++x) {
                var id = (x + (y * mapSize.x)),
                    tid = this.tileIds[id],
                    set = this.map.getTileset(tid),
                    tex, frame;

                if(set) {
                    tex = set.getTileTexture(tid);
                    frame = tex.frame;

                    this.buffer.context.drawImage(
                        tex.baseTexture.source,
                        frame.x,
                        frame.y,
                        frame.width,
                        frame.height,
                        tx + set.tileoffset.x,
                        ty + set.tileoffset.y,
                        frame.width,
                        frame.height
                    );
                }

                tx += this.tileSize.x;

                //TODO: If physical, spawn an actual tile
            }

            tx = sx * this.tileSize.x;
            ty += this.tileSize.y;
        }*/

        this.requiresUpdate = true;

        return this;
    },
    /**
     * Destroys the tile layer completely
     *
     * @method destroy
     */
    destroy: function() {
        SpriteBatch.prototype.destroy.call(this);

        this.clearTiles(true);

        this.state = null;
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
    },
    _renderWebGL: function(renderSession) {
        if(this.requiresUpdate) {
            this.requiresUpdate = false;
            PIXI.updateWebGLTexture(this.texture.baseTexture, renderSession.gl);
        }

        PIXI.SpriteBatch.prototype._renderWebGL.call(this, renderSession);
    }
});

module.exports = Tilelayer;
