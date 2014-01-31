var SpriteBatch = require('../display/SpriteBatch'),
    Rectangle = require('../geom/Rectangle'),
    Vector = require('../math/Vector'),
    Texture = require('../display/Texture'),
    Tile = require('./Tile'),
    math = require('../math/math'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    support = require('../utils/support'),
    PIXI = require('pixi.js');

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
    this.preRender = layer.preRender || this.properties.preRender || this.map.properties.preRender || false;

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

    this.physicsContainer = new SpriteBatch();
    this.createPhysicalTiles();
};

inherit(Tilelayer, SpriteBatch, {
    getBounds: function() {
        return this.map.getBounds();
    },
    createPhysicalTiles: function() {
        var tid, tex, set, props, tile,
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
            tile = new Tile(tex);
            this.physicsContainer.addChild(tile);

            tile.mass = props.mass;
            tile.hitArea = props.hitArea || set.properties.hitArea;
            tile.setPosition(
                ((i % szx) * tsx) + set.tileoffset.x,
                (math.floor(i / szx) * tsy) + set.tileoffset.y + tsy
            );

            tile.enablePhysics(this.state.physics);
        }
    },
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method resize
     * @param width {Number} The number of tiles in the X direction to render
     * @param height {Number} The number of tiles in the Y direction to render
     * @return {Tilelayer} Returns itself.
     * @chainable
     */
    render: function(x, y, width, height) {
        if(this.preRender) {
            if(!this._preRendered) {
                this._preRender();
            } else {
                for(var c = this.children.length - 1; c > -1; --c) {
                    this.children[c].visible = true;
                }
            }

            return;
        }

        //copy down our tilesize
        if(!this.tileSize)
            this.tileSize = this.map.tileSize;

        //clear all the visual tiles
        this.clearTiles();

        //render the tiles on the screen
        this._renderTiles(x, y, width, height);

        return this;
    },
    /**
     * Renders the map onto different canvases, one per chunk. This only runs once
     * then the canvases are used as a textures for tiles the size of chunks.
     *
     * @method _preRender
     * @private
     */
    _preRender: function() {
        if(!this.visible)
            return;

        this._preRendered = true;
        this.tileSize = this.chunkSize.clone();

        var world = this.map,
            width = world.size.x * world.tileSize.x,
            height = world.size.y * world.tileSize.y,
            xChunks = math.ceil(width / this.chunkSize.x),
            yChunks = math.ceil(height / this.chunkSize.y);

        //for each chunk
        for(var x = 0; x < xChunks; ++x) {
            for(var y = 0; y < yChunks; ++y) {
                var cw = (x === xChunks - 1) ? width - (x * this.chunkSize.x) : this.chunkSize.x,
                    ch = (y === yChunks - 1) ? height - (y * this.chunkSize.y) : this.chunkSize.y;

                this._preRenderChunk(x, y, cw, ch);
            }
        }
    },
    /**
     * Renders a single chunk to a single canvas and creates/places the tile instance for it.
     *
     * @method _preRenderChunk
     * @param cx {Number} The x-coord of this chunk's top left
     * @param cy {Number} The y-coord of this chunk's top left
     * @param w {Number} The width of this chunk
     * @param h {Number} The height of this chunk
     * @private
     */
    _preRenderChunk: function(cx, cy, w, h) {
        var world = this.map,
            tsx = world.tileSize.x,
            tsy = world.tileSize.y,
            xTiles = w / tsx,
            yTiles = h / tsy,
            nx = (cx * this.chunkSize.x) % tsx,
            ny = (cy * this.chunkSize.y) % tsy,
            tx = math.floor(cx * this.chunkSize.x / tsx),
            ty = math.floor(cy * this.chunkSize.y / tsy),
            sx = world.size.x,
            sy = world.size.y,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = w;
        canvas.height = h;

        //draw all the tiles in this chunk to the canvas
        for(var x = 0; x < xTiles; ++x) {
            for(var y = 0; y < yTiles; ++y) {
                if(x + tx < sx && y + ty < sy) {
                    var id = ((x + tx) + ((y + ty) * sx)),
                        tid = this.tileIds[id],
                        set = world.getTileset(tid),
                        tex, frame;

                    if(set) {
                        tex = set.getTileTexture(tid);
                        frame = tex.frame;

                        ctx.drawImage(
                            tex.baseTexture.source,
                            frame.x,
                            frame.y,
                            frame.width,
                            frame.height,
                            (x * tsx) - nx + set.tileoffset.x,
                            (y * tsy) - ny + set.tileoffset.y,
                            frame.width,
                            frame.height
                        );
                    }
                }
            }
        }

        //use the canvas as a texture for a tile to display
        var tile = new Tile(Texture.fromCanvas(canvas));
        tile.setPosition(
            cx * this.chunkSize.x,
            cy * this.chunkSize.y
        );

        if(!this.tiles[cx])
            this.tiles[cx] = {};

        this.addChild(tile);
        this.tiles[cx][cy] = tile;
    },
    /**
     * Renders the tiles for the viewport
     *
     * @method _renderTiles
     * @param sx {Number} The x-coord in the map to start rendering
     * @param sy {Number} The y-coord in the map to start rendering
     * @param sw {Number} The width of the viewport
     * @param sh {Number} The height of the viewport
     * @private
     */
    _renderTiles: function(sx, sy, sw, sh) {
        //convert to tile coords
        sx = math.floor(sx / this.map.scaledTileSize.x);
        sy = math.floor(sy / this.map.scaledTileSize.y);

        //ensure we don't go below 0
        sx = sx < 0 ? 0 : sx;
        sy = sy < 0 ? 0 : sy;

        //convert to tile sizes
        sw = math.ceil(sw / this.map.scaledTileSize.x) + 1;
        sh = math.ceil(sh / this.map.scaledTileSize.y) + 1;

        //ensure we don't go outside the map size
        sw = (sx + sw > this.map.size.x) ? (this.map.size.x - sx) : sw;
        sh = (sy + sh > this.map.size.y) ? (this.map.size.y - sy) : sh;

        //render new sprites
        var endX = sx + sw,
            endY = sy + sh;

        for(var x = sx; x < endX; ++x) {
            for(var y = sy; y < endY; ++y) {
                this.moveTileSprite(-1, -1, x, y);
            }
        }

        //set rendered area
        this._rendered.x = sx;
        this._rendered.y = sy;
        this._rendered.width = sw - 1;
        this._rendered.height = sh - 1;

        //reset buffered status
        this._buffered.left = this._buffered.right = this._buffered.top = this._buffered.bottom = false;

        //reset panDelta
        this._panDelta.x = this.state.world.position.x % this.map.scaledTileSize.x;
        this._panDelta.y = this.state.world.position.y % this.map.scaledTileSize.y;
    },
    /**
     * Frees a tile in the list back into the pool
     *
     * @method _freeTile
     * @param tx {Number} The x-coord of the tile in tile coords (not world coords)
     * @param ty {Number} The y-coord of the tile in tile coords (not world coords)
     * @private
     */
    _freeTile: function(tx, ty) {
        if(this.tiles[tx] && this.tiles[tx][ty]) {
            this.clearTile(this.tiles[tx][ty]);
            this.tiles[tx][ty] = null;
        }
    },
    /**
     * Clears all the tiles currently used to render the layer
     *
     * @method clearTiles
     * @param remove {Boolean} Should this tile be completely removed (never to bee seen again)
     * @return {Tilelayer} Returns itself.
     * @chainable
     */
    clearTiles: function(remove) {
        var c;

        if(this.preRender && !remove) {
            for(c = this.children.length - 1; c > -1; --c) {
                this.children[c].visible = false;
            }

            return;
        }

        //force rerender later
        this._preRendered = false;

        for(c = this.children.length - 1; c > -1; --c) {
            this.clearTile(this.children[c], remove);
        }

        this.tiles.length = 0;

        return this;
    },
    /**
     * Clears a tile currently used to render the layer
     *
     * @method clearTile
     * @param tile {Tile} The tile object to clear
     * @param remove {Boolean} Should this tile be completely removed (never to bee seen again)
     * @return {Tilelayer} Returns itself.
     * @chainable
     */
    clearTile: function(tile, remove) {
        tile.visible = false;
        //tile.disablePhysics();

        if(remove)
            this.removeChild(tile);
        else
            this._tilePool.push(tile);

        return this;
    },
    /**
     * Moves a tile sprite from one position to another, and creates a new tile
     * if the old position didn't have a sprite
     *
     * @method moveTileSprite
     * @param fromTileX {Number} The x coord of the tile in units of tiles (not pixels) to move from
     * @param fromTileY {Number} The y coord of the tile in units of tiles (not pixels) to move from
     * @param toTileX {Number} The x coord of the tile in units of tiles (not pixels) to move to
     * @param toTileY {Number} The y coord of the tile in units of tiles (not pixels) to move to
     * @return {Tile} The sprite to display
     */
    moveTileSprite: function(fromTileX, fromTileY, toTileX, toTileY) {
        //free the tiles we are dealing with
        this._freeTile(toTileX, toTileY);
        this._freeTile(fromTileX, fromTileY);

        //if off the map, just ignore it
        if(toTileX < 0 || toTileY < 0 || toTileX >= this.map.size.x || toTileY >= this.map.size.y) {
            return;
        }

        var tile,
            id = (toTileX + (toTileY * this.size.x)),
            tileId = this.tileIds[id],
            set = this.map.getTileset(tileId),
            texture,
            props,
            position,
            hitArea,
            interactive;

        //if no tileset, return
        if(!set) return;

        //grab some values for the tile
        texture = set.getTileTexture(tileId);
        props = set.getTileProperties(tileId);
        hitArea = props.hitArea || set.properties.hitArea;
        interactive = this._getInteractive(set, props);
        position = [
            (toTileX * this.map.tileSize.x) + set.tileoffset.x,
            (toTileY * this.map.tileSize.y) + set.tileoffset.y
        ];

        //due to the fact that we use top-left anchors for everything, but tiled uses bottom-left
        //we need to move the position of each tile down by a single map-tile height. That is why
        //there is an addition of "this.map.tileSize.y" to the coords
        position[1] += this.map.tileSize.y;

        //grab a new tile from the pool
        tile = this._tilePool.pop();

        //if we couldn't find a tile from the pool, then create a new tile
        if(!tile) {
            tile = new Tile(texture);
            tile.anchor.y = 1;
            this.addChild(tile);
        }

        tile.interactive = interactive;
        tile.hitArea = hitArea;
        tile.mass = 0;//props.mass || 0;
        tile.blendMode = (props.blendMode || this.properties.blendMode) ? PIXI.blendModes[(props.blendMode || this.properties.blendMode)] : PIXI.blendModes.NORMAL;
        tile.mass = 0;//props.mass || 0;
        tile.mass = props.mass || 0;

        tile.setTexture(texture);
        tile.setPosition(position[0], position[1]);
        tile.show();

        /*if(tile.mass) {
            tile.enablePhysics(this.state.physics);
        }*/

        //pass through all events
        if(interactive) {
            tile.click = this.onTileEvent.bind(this, 'click', tile);
            tile.mousedown = this.onTileEvent.bind(this, 'mousedown', tile);
            tile.mouseup = this.onTileEvent.bind(this, 'mouseup', tile);
            tile.mousemove = this.onTileEvent.bind(this, 'mousemove', tile);
            tile.mouseout = this.onTileEvent.bind(this, 'mouseout', tile);
            tile.mouseover = this.onTileEvent.bind(this, 'mouseover', tile);
            tile.mouseupoutside = this.onTileEvent.bind(this, 'mouseupoutside', tile);
        }

        //update sprite position in the map
        if(!this.tiles[toTileX])
            this.tiles[toTileX] = [];

        this.tiles[toTileX][toTileY] = tile;

        return tile;
    },
    /**
     * Called whenever a tile event occurs, this is used to echo to the parent.
     *
     * @method onTileEvent
     * @param eventName {String} The name of the event
     * @param tile {Tile} The tile the event happened to
     * @param data {mixed} The event data that was passed along
     * @private
     */
    onTileEvent: function(eventName, tile, data) {
        this.map.onTileEvent(eventName, tile, data);
    },
    /**
     * Checks if an object should be marked as interactive
     *
     * @method _getInteractive
     * @param set {Tileset} The tileset for the object
     * @param props {Object} The Tiled properties object
     * @return {Boolean} Whether or not the item is interactive
     * @private
     */
    _getInteractive: function(set, props) {
        //first check the lowest level value (on the tile iteself)
        return props.interactive || //obj interactive
                (set && set.properties.interactive) || //tileset interactive
                this.properties.interactive || //layer interactive
                this.map.properties.interactive; //map interactive
    },
    /**
     * Pans the layer around, rendering stuff if necessary
     *
     * @method pan
     * @param dx {Number|Point} The x amount to pan, if a Point is passed the dy param is ignored
     * @param dy {Number} The y ammount to pan
     * @return {Tilelayer} Returns itself.
     * @chainable
     */
    pan: function(dx, dy) {
        if(this.preRender)
            return;

        //track panning delta so we know when to render
        this._panDelta.x += dx;
        this._panDelta.y += dy;

        var tszX = this.map.scaledTileSize.x,
            tszY = this.map.scaledTileSize.y;

        //check if we need to build a buffer around the viewport
        //usually this happens on the first pan after a full render
        //caused by a viewport resize. We do this buffering here instead
        //of in the initial render because in the initial render, the buffer
        //may try to go negative which has no tiles. Plus doing it here
        //reduces the number of tiles that need to be created initially.

        //moving world right, so left will be exposed
        if(dx > 0 && !this._buffered.left)
            this._renderLeft(this._buffered.left = true);
        //moving world left, so right will be exposed
        else if(dx < 0 && !this._buffered.right)
            this._renderRight(this._buffered.right = true);

        //moving world down, so top will be exposed
        if(dy > 0 && !this._buffered.top)
            this._renderUp(this._buffered.top = true);
        //moving world up, so bottom will be exposed
        else if(dy < 0 && !this._buffered.bottom)
            this._renderDown(this._buffered.bottom = true);

        //Here is where the actual panning gets done, we check if the pan
        //delta is greater than a scaled tile and if so pan that direction.
        //The reason we do it in a while loop is because the delta can be
        //large than 1 scaled tile and may require multiple render pans
        //(this can happen if you can .pan(x, y) with large values)

        //moved position right, so render left
        while(this._panDelta.x >= tszX) {
            this._renderLeft();
            this._panDelta.x -= tszX;
        }

        //moved position left, so render right
        while(this._panDelta.x <= -tszX) {
            this._renderRight();
            this._panDelta.x += tszX;
        }

        //moved position down, so render up
        while(this._panDelta.y >= tszY) {
            this._renderUp();
            this._panDelta.y -= tszY;
        }

        //moved position up, so render down
        while(this._panDelta.y <= -tszY) {
            this._renderDown();
            this._panDelta.y += tszY;
        }
    },
    /**
     * Renders tiles to the left, pulling from the far right
     *
     * @method _renderLeft
     * @param [forceNew=false] {Boolean} If set to true, new tiles are created instead of trying to recycle
     * @private
     */
    _renderLeft: function(forceNew) {
        //move all the far right tiles to the left side
        for(var i = 0; i < this._rendered.height + 1; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.right,
                forceNew ? -1 : this._rendered.top + i,
                this._rendered.left - 1,
                this._rendered.top + i
            );
        }
        this._rendered.x--;
        if(forceNew) this._rendered.width++;
    },
    /**
     * Renders tiles to the right, pulling from the far left
     *
     * @method _renderRight
     * @param [forceNew=false] {Boolean} If set to true, new tiles are created instead of trying to recycle
     * @private
     */
    _renderRight: function(forceNew) {
        //move all the far left tiles to the right side
        for(var i = 0; i < this._rendered.height + 1; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left,
                forceNew ? -1 : this._rendered.top + i,
                this._rendered.right + 1,
                this._rendered.top + i
            );
        }
        if(!forceNew) this._rendered.x++;
        if(forceNew) this._rendered.width++;
    },
    /**
     * Renders tiles to the top, pulling from the far bottom
     *
     * @method _renderUp
     * @param [forceNew=false] {Boolean} If set to true, new tiles are created instead of trying to recycle
     * @private
     */
    _renderUp: function(forceNew) {
        //move all the far bottom tiles to the top side
        for(var i = 0; i < this._rendered.width + 1; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left + i,
                forceNew ? -1 : this._rendered.bottom,
                this._rendered.left + i,
                this._rendered.top - 1
            );
        }
        this._rendered.y--;
        if(forceNew) this._rendered.height++;
    },
    /**
     * Renders tiles to the bottom, pulling from the far top
     *
     * @method _renderDown
     * @param [forceNew=false] {Boolean} If set to true, new tiles are created instead of trying to recycle
     * @private
     */
    _renderDown: function(forceNew) {
        //move all the far top tiles to the bottom side
        for(var i = 0; i < this._rendered.width + 1; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left + i,
                forceNew ? -1 : this._rendered.top,
                this._rendered.left + i,
                this._rendered.bottom + 1
            );
        }
        if(!forceNew) this._rendered.y++;
        if(forceNew) this._rendered.height++;
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
    }
});

module.exports = Tilelayer;
