var SpriteBatch = require('../display/SpriteBatch'),
    Sprite = require('../display/Sprite'),
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
     * The name of the layer
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = layer.name || '';

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

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x || 0;
    this.position.y = layer.y || 0;
    this.alpha = layer.opacity !== undefined ? layer.opacity : 1;
    this.visible = layer.visible !== undefined ? layer.visible : true;

    //privates
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
    render: function(sx, sy, w, h, ctx) {
        if(this._cache.sx === sx && this._cache.sy === sy && this._cache.w === w && this._cache.h === h)
            return;

        //only resize if we need to
        if(this._cache.w !== w || this._cache.h !== h)
            this.buffer.resize(w, h);

        //update cache
        this._cache.sx = sx;
        this._cache.sy = sy;
        this._cache.w = w;
        this._cache.h = h;

        //get the context
        ctx = ctx || this.buffer.context;

        //clear the context
        ctx.clearRect(0, 0, w, h);

        ///////////////////////////
        var tsx = this.map.tileSize.x,
            tsy = this.map.tileSize.y,
            stsx = this.map.scaledTileSize.x,
            stsy = this.map.scaledTileSize.y,
            startX = math.max(0, math.floor(sx / stsx)),
            startY = math.max(0, math.floor(sy / stsy)),
            maxX = math.min(math.ceil(w / stsx) + 1, this.map.size.x - startX),
            maxY = math.min(math.ceil(h / stsy) + 1, this.map.size.y - startY),
            tx = 0;
            ty = 0;

        this.sprite.position.x = startX * tsx;
        this.sprite.position.y = startY * tsy;

        for(var x = startX; x < startX + maxX; ++x) {
            for(var y = startY; y < startY + maxY; ++y) {
                var id = (x + (y * this.map.size.x)),
                    tid = this.tileIds[id],
                    set = this.map.getTileset(tid),
                    tex, frame;

                if(set) {
                    tex = set.getTileTexture(tid);
                    frame = tex.frame;

                    ctx.drawImage(
                        tex.baseTexture.source,
                        frame.x,
                        frame.y,
                        tsx,
                        tsy,
                        tx + set.tileoffset.x,
                        ty + set.tileoffset.y,
                        tsx,
                        tsy
                    );

                    //TODO: add physics bodies
                }

                ty += tsy;
            }

            tx += tsx;
            ty = 0;
        }

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
        this.tileIds = null;
        this.properties = null;
        this.type = null;
    },
    updateTransform: function() {
        this.render(
            this.state.camera.viewport.x,
            this.state.camera.viewport.y,
            this.state.camera.viewport.width,
            this.state.camera.viewport.height
        );

        SpriteBatch.prototype.updateTransform.call(this);
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
