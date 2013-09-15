var DisplayObjectContainer = require('../display/DisplayObjectContainer'),
    Sprite = require('../display/Sprite'),
    Vector = require('../math/Vector'),
    Rectangle = require('../math/Rectangle'),
    Texture = require('../display/Texture'),
    Tile = require('./Tile'),
    utils = require('../utils/utils'),
    support = require('../utils/support'),
    globals = require('../globals');

/**
 * The TiledLayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the TiledMap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @class Layer
 * @extends DisplayObjectContainer
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
var Layer = module.exports = function(layer) {
    DisplayObjectContainer.call(this, layer);

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
     * The current map of all tiles on the screen
     *
     * @property tiles
     * @type Object
     */
    this.tiles = [];

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

    this.preRender = this.properties.preRender;
    this.chunkSize = new Vector(
        this.properties.chunkSizeX || this.properties.chunkSize || 512,
        this.properties.chunkSizeY || this.properties.chunkSize || 512
    );
    this._preRendered = false;

    this._tilePool = [];
    this._buffered = { left: false, right: false, top: false, bottom: false };
    this._panDelta = new Vector();
    this._rendered = new Rectangle();
};

globals.inherits(Layer, DisplayObjectContainer, {
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method resize
     * @param width {Number} The number of tiles in the X direction to render
     * @param height {Number} The number of tiles in the Y direction to render
     */
    resize: function(width, height) {
        if(this.preRender) {
            if(!this._preRendered)
                this._preRender();

            return;
        }

        //copy down our tilesize
        if(!this.tileSize)
            this.tileSize = this.parent.tileSize;

        //clear all the visual tiles
        this.clearTiles();

        //render the tiles on the screen
        this._renderTiles(
            -this.parent.position.x,
            -this.parent.position.y,
            width,
            height
        );

        this._updateRenderSq();

        if(this.hasPhysics) {
            //this -> map -> state -> physics
            this.parent.parent.physics.reindexStatic();
        }
    },
    //render the map onto a canvas once to use as a preRendered texture
    _preRender: function() {
        if(!this.visible)
            return;

        this._preRendered = true;
        this.tileSize = this.chunkSize.clone();

        var world = this.parent,
            width = world.size.x * world.tileSize.x,
            height = world.size.y * world.tileSize.y,
            xChunks = Math.ceil(width / this.chunkSize.x),
            yChunks = Math.ceil(height / this.chunkSize.y);

        //for each chunk
        for(var x = 0; x < xChunks; ++x) {
            for(var y = 0; y < yChunks; ++y) {
                var cw = (x === xChunks - 1) ? width - (x * this.chunkSize.x) : this.chunkSize.x,
                    ch = (y === yChunks - 1) ? height - (y * this.chunkSize.y) : this.chunkSize.y;

                this._preRenderChunk(x, y, cw, ch);
            }
        }
    },
    _preRenderChunk: function(cx, cy, w, h) {
        var world = this.parent,
            tsx = world.tileSize.x,
            tsy = world.tileSize.y,
            xTiles = w / tsx,
            yTiles = h / tsy,
            nx = (cx * this.chunkSize.x) % tsx,
            ny = (cy * this.chunkSize.y) % tsy,
            tx = Math.floor(cx * this.chunkSize.x / tsx),
            ty = Math.floor(cy * this.chunkSize.y / tsy),
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
        tile.setPosition(cx * this.chunkSize.x, cy * this.chunkSize.y);

        if(!this.tiles[cx])
            this.tiles[cx] = {};

        this.addChild(tile);
        this.tiles[cx][cy] = tile;
    },
    _renderTiles: function(sx, sy, sw, sh) {
        //convert to tile coords
        sx = Math.floor(sx / this.parent.scaledTileSize.x);
        sy = Math.floor(sy / this.parent.scaledTileSize.y);

        //ensure we don't go below 0
        sx = sx < 0 ? 0 : sx;
        sy = sy < 0 ? 0 : sy;

        //convert to tile sizes
        sw = Math.ceil(sw / this.parent.scaledTileSize.x) + 1;
        sh = Math.ceil(sh / this.parent.scaledTileSize.y) + 1;

        //ensure we don't go outside the map size
        sw = (sx + sw > this.parent.size.x) ? (this.parent.size.x - sx) : sw;
        sh = (sy + sh > this.parent.size.y) ? (this.parent.size.y - sy) : sh;

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
        this._rendered.width = sw;
        this._rendered.height = sh;

        //reset buffered status
        this._buffered.left = this._buffered.right = this._buffered.top = this._buffered.bottom = false;

        //reset panDelta
        this._panDelta.x = this.parent.position.x % this.parent.scaledTileSize.x;
        this._panDelta.y = this.parent.position.y % this.parent.scaledTileSize.y;
    },
    _freeTile: function(tx, ty) {
        if(this.tiles[tx] && this.tiles[tx][ty]) {
            this.clearTile(this.tiles[tx][ty]);
            this.tiles[tx][ty] = null;
        }
    },
    destroy: function() {
        this.clearTiles(true);
        Layer.prototype.destroy.call(this);
    },
    /**
     * Clears all the tiles currently used to render the layer
     *
     * @method clearTiles
     */
    clearTiles: function(remove) {
        for(var c = this.children.length - 1; c > -1; --c) {
            this.clearTile(this.children[c], remove);
        }

        this.tiles.length = 0;
    },
    clearTile: function(tile, remove) {
        tile.visible = false;
        tile.disablePhysics();

        if(remove)
            this.removeChild(tile);
        else
            this._tilePool.push(tile);
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
        //if off the map, just ignore it
        if(toTileX < 0 || toTileY < 0 || toTileX >= this.parent.size.x || toTileY >= this.parent.size.y) {
            return;
        }

        var tile,
            id = (toTileX + (toTileY * this.size.x)),
            tileId = this.tileIds[id],
            set = this.parent.getTileset(tileId),
            texture,
            props,
            position,
            hitArea,
            interactive;

        //if no tileset, just ensure the "from" tile is put back in the pool
        if(!set) {
            this._freeTile(fromTileX, fromTileY);
            return;
        }

        //grab some values for the tile
        texture = set.getTileTexture(tileId);
        props = set.getTileProperties(tileId);
        hitArea = props.hitArea || set.properties.hitArea;
        interactive = this._getInteractive(set, props);
        position = [
            (toTileX * this.parent.tileSize.x) + set.tileoffset.x,
            (toTileY * this.parent.tileSize.y) + set.tileoffset.y
        ];

        //due to the fact that we use top-left anchors for everything, but tiled uses bottom-left
        //we need to move the position of each tile down by a single map-tile height. That is why
        //there is an addition of "this.parent.tileSize.y" to the coords
        position[1] +=  this.parent.tileSize.y;

        //if there is one to move in the map, lets just move it
        if(this.tiles[fromTileX] && this.tiles[fromTileX][fromTileY]) {
            tile = this.tiles[fromTileX][fromTileY];
            this.tiles[fromTileX][fromTileY] = null;
            tile.disablePhysics();
        }
        //otherwise grab a new tile from the pool
        else {
            tile = this._tilePool.pop();
        }

        //if we couldn't find a tile from the pool, or one to move
        //then create a new tile
        if(!tile) {
            tile = new Tile(texture);
            tile.mass = props.mass;
            tile.inertia = props.inertia;
            tile.anchor.y = 1;
            this.addChild(tile);
        }

        tile.collisionType = props.type;
        tile.visible = true;
        tile.hitArea = hitArea;
        tile.interactive = interactive;

        tile.setTexture(texture);
        tile.setPosition(position[0], position[1]);

        if(props.mass) {
            this.hasPhysics = true;
            tile.enablePhysics(this.parent.parent.physics); //this.TiledMap.GameState.physics
        }

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
    onTileEvent: function(eventName, tile, data) {
        this.parent.onTileEvent(eventName, tile, data);
    },
    _getInteractive: function(set, props) {
        //first check the lowest level value (on the tile iteself)
        return props.interactive || //obj interactive
                (set && set.properties.interactive) || //tileset interactive
                this.properties.interactive || //layer interactive
                this.parent.properties.interactive; //map interactive
    },
    /**
     * Pans the layer around, rendering stuff if necessary
     *
     * @method pan
     * @param dx {Number|Point} The x amount to pan, if a Point is passed the dy param is ignored
     * @param dy {Number} The y ammount to pan
     * @return {Layer} Returns itself for chainability
     */
    pan: function(dx, dy) {
        if(this.preRender)
            return;

        //track panning delta so we know when to render
        this._panDelta.x += dx;
        this._panDelta.y += dy;

        var tszX = this.parent.scaledTileSize.x,
            tszY = this.parent.scaledTileSize.y;

        //check if we need to build a buffer around the viewport
        //usually this happens on the first pan after a full render
        //caused by a viewport resize. WE do this buffering here instead
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
        else if(dy > 0 && !this._buffered.top)
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

        if(this.hasPhysics) {
            this.parent.parent.physics.reindexStatic();
        }
    },
    _renderLeft: function(forceNew) {
        //move all the far right tiles to the left side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.right,
                forceNew ? -1 : this._rendered.top + i,
                this._rendered.left - 1,
                this._rendered.top + i
            );
        }
        this._rendered.x--;
        if(forceNew) this._rendered.width++;
        this._updateRenderSq();
    },
    _renderRight: function(forceNew) {
        //move all the far left tiles to the right side
        for(var i = 0; i < this._rendered.height; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left,
                forceNew ? -1 : this._rendered.top + i,
                this._rendered.right + 1,
                this._rendered.top + i
            );
        }
        if(!forceNew) this._rendered.x++;
        if(forceNew) this._rendered.width++;
        this._updateRenderSq();
    },
    _renderUp: function(forceNew) {
        //move all the far bottom tiles to the top side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left + i,
                forceNew ? -1 : this._rendered.bottom,
                this._rendered.left + i,
                this._rendered.top - 1
            );
        }
        this._rendered.y--;
        if(forceNew) this._rendered.height++;
        this._updateRenderSq();
    },
    _renderDown: function(forceNew) {
        //move all the far top tiles to the bottom side
        for(var i = 0; i < this._rendered.width; ++i) {
            this.moveTileSprite(
                forceNew ? -1 : this._rendered.left + i,
                forceNew ? -1 : this._rendered.top,
                this._rendered.left + i,
                this._rendered.bottom + 1
            );
        }
        if(!forceNew) this._rendered.y++;
        if(forceNew) this._rendered.height++;
        this._updateRenderSq();
    },
    _updateRenderSq: function() {
        this._rendered.left = this._rendered.x;
        this._rendered.right = this._rendered.x + this._rendered.width - 1;
        this._rendered.top = this._rendered.y;
        this._rendered.bottom = this._rendered.y + this._rendered.height - 1;
    }
});
