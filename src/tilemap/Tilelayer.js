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
    this._webglTextureUpdate = false;
    this.tempBuffer = new PIXI.CanvasBuffer(this.map.game.width, this.map.game.height);
    this.buffer = new PIXI.CanvasBuffer(this.map.game.width, this.map.game.height);
    this.texture = Texture.fromCanvas(this.buffer.canvas);
    this.sprite = new Sprite(this.texture);
    this.addChild(this.sprite);

    this._cache = {
        sx: 0,
        sy: 0,
        w: 0,
        h: 0,

        startX: 0,
        startY: 0,
        maxX: 0,
        maxY: 0,
        tx: 0,
        ty: 0,

        dx: 0,
        dy: 0
    };

    this.physicsContainer = new SpriteBatch();
    this.createPhysicalTiles();
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
    render: function(sx, sy, w, h, buffer) {
        if(this._cache.sx === sx && this._cache.sy === sy && this._cache.w === w && this._cache.h === h)
            return;

        var full = !this._cache.w || !this._cache.h;

        //we do old position - new position so that the delta will be the translation
        //that is necessary for the buffer.
        this._cache.dx += this._cache.sx - sx;
        this._cache.dy += this._cache.sy - sy;

        //update cache
        this._cache.sx = sx;
        this._cache.sy = sy;
        this._cache.w = w;
        this._cache.h = h;

        //select the buffer
        buffer = buffer || this.buffer;

        //calculate some values needed for rendering
        this._cache.startX = math.max(0, math.floor(sx / this.map.scaledTileSize.x));
        this._cache.startY = math.max(0, math.floor(sy / this.map.scaledTileSize.y));
        this._cache.maxX = math.min(math.ceil(w / this.map.scaledTileSize.x) + 1, this.map.size.x - this._cache.startX);
        this._cache.maxY = math.min(math.ceil(h / this.map.scaledTileSize.y) + 1, this.map.size.y - this._cache.startY);

        //set the size to the max value including our buffer area
        w = math.max(w, this._cache.maxX * this.map.scaledTileSize.x);
        h = math.max(h, this._cache.maxY * this.map.scaledTileSize.y);

        //only resize if we need to
        if(buffer.width !== w || buffer.height !== h) {
            buffer.resize(w, h);
            this.tempBuffer.resize(w, h);

            this.texture.frame.width = w;
            this.texture.frame.height = h;
            this.texture.baseTexture.width = w;
            this.texture.baseTexture.height = h;

            full = true;
        }

        //update the sprite's position to keep centered on screen based on scroll position
        this.sprite.position.x = this._cache.startX * this.map.tileSize.x;
        this.sprite.position.y = this._cache.startY * this.map.tileSize.y;

        //perform render
        if(full) {
            this.renderFull(buffer, sx, sy, w, h);
        } else {
            //this.renderPan(buffer, this._cache.dx, this._cache.dy, w, h);
        }
    },
    renderPan: function(buffer, dx, dy, w, h) {
        //convert delta to tiles instead of pixels
        var tdx = dx < 0 ? math.ceil(dx / this.map.scaledTileSize.x) : math.floor(dx / this.map.scaledTileSize.x),
            tdy = dy < 0 ? math.ceil(dy / this.map.scaledTileSize.y) : math.floor(dy / this.map.scaledTileSize.y);

        if(!tdx && !tdy) return;

        dx = tdx * this.map.scaledTileSize.x;
        dy = tdy * this.map.scaledTileSize.y;

        this._cache.dx -= dx;
        this._cache.dy -= dy;

        var startX = dx < 0 ? this._cache.maxX - math.abs(tdx) : 0,
            startY = dy < 0 ? this._cache.maxY - math.abs(tdy) : 0,
            maxX = dx < 0 ? this._cache.maxX : math.abs(tdx),
            maxY = dy < 0 ? this._cache.maxY : math.abs(tdy),
            x = 0,
            y = 0;

        //clear the temporary buffer, and draw scene to it
        this.tempBuffer.context.clearRect(0, 0, w, h);
        this.tempBuffer.context.drawImage(buffer.canvas, 0, 0);

        //clear the main buffer, translate for movement, redraw scene.
        buffer.context.clearRect(0, 0, w, h);
        buffer.context.save();
        buffer.context.translate(dx, dy);
        buffer.context.drawImage(this.tempBuffer.canvas, 0, 0);
        buffer.context.restore();

        //for each horizontal line (y = n) that got exposed, draw the tile
        /*if(dy) {
            for(y = startY; y < maxY; ++y) {
                for(x = 0; x < this._cache.maxX; ++x) {
                    this.drawTile(buffer.context, x, y, x * this.map.tileSize.x, y * this.map.tileSize.y);
                }
            }
        }

        //for each vertical line (x = n) that got exposed, draw the tile
        if(dx) {
            for(x = startX; x < maxX; ++x) {
                for(y = 0; y < this._cache.maxY; ++y) {
                    this.drawTile(buffer.context, x, y, x * this.map.tileSize.x, y * this.map.tileSize.y);
                }
            }
        }*/

        this._webglTextureUpdate = true;
    },
    renderFull: function(buffer, sx, sy, w, h) {
        //clear the context
        buffer.context.clearRect(0, 0, w, h);

        var tsx = this.map.tileSize.x,
            tsy = this.map.tileSize.y,
            xLen = this._cache.startX + this._cache.maxX,
            yLen = this._cache.startY + this._cache.maxY;

        this._cache.ty = this._cache.tx = 0;

        for(var x = this._cache.startX; x < xLen; ++x) {
            for(var y = this._cache.startY; y < yLen; ++y) {
                this.drawTile(buffer.context, x, y, this._cache.tx, this._cache.ty);

                this._cache.ty += tsy;
            }

            this._cache.tx += tsx;
            this._cache.ty = 0;
        }

        this._webglTextureUpdate = true;

        return this;
    },
    drawTile: function(ctx, x, y, tx, ty) {
        var id = (x + (y * this.map.size.x)),
            tid = this.tileIds[id],
            set = this.map.getTileset(tid),
            tex, frame, props;

        if(set) {
            tex = set.getTileTexture(tid);
            frame = tex.frame;

            ctx.drawImage(
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
    },
    createPhysicalTiles: function() {
        var tid, tex, set, props, tile, x, y,
            szx = this.map.size.x,
            tsx = this.map.tileSize.x,
            tsy = this.map.tileSize.y;

        for(var i = 0; i < this.tileIds.length; ++i) {
            tid = this.tileIds[i];
            set = this.map.getTileset(tid);

            if(!set) continue;

            props = set.getTileProperties(tid);

            if(!props.mass) continue;

            tex = set.getTileTexture(tid);
            tile = new Sprite(tex);
            this.physicsContainer.addChild(tile);

            tile.mass = props.mass;
            tile.hitArea = props.hitArea || set.properties.hitArea;
            tile.setPosition(
                (i % szx) * tsx,
                math.floor(i / szx) * tsy
            );

            tile.enablePhysics(this.state.physics);
        }
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
        SpriteBatch.prototype.updateTransform.call(this);

        this.render(
            this.state.camera.viewport.x,
            this.state.camera.viewport.y,
            this.state.camera.viewport.width,
            this.state.camera.viewport.height
        );
    },
    _renderWebGL: function(renderSession) {
        if(this._webglTextureUpdate) {
            this._webglTextureUpdate = false;
            PIXI.updateWebGLTexture(this.texture.baseTexture, renderSession.gl);
        }

        PIXI.SpriteBatch.prototype._renderWebGL.call(this, renderSession);
    }
});

module.exports = Tilelayer;
