var Container = require('../display/Container'),
    Rectangle = require('../geom/Rectangle'),
    Vector = require('../math/Vector'),
    Texture = require('../display/Texture'),
    Tile = require('./Tile'),
    math = require('../math/math'),
	maputils = require('../utils/maputils'),
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
 * @param map {Tilemap} The tilemap instance that this belongs to
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
var Tilelayer = function(map, layer) {
    Container.call(this, layer);

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

	this.maxSizeX = 0;
	this.maxSizeY = 0;
	
	for(var i = 0; i < this.tileIds.length; ++i) {
		var set = this.map.getTileset(this.tileIds[i]);
		if(set) {
			this.maxSizeX = Math.max(this.maxSizeX, (set.tileSize.x / this.map.tileSize.x) + 1);
			this.maxSizeY = Math.max(this.maxSizeY, (set.tileSize.y / this.map.tileSize.y) + 1);
		}
	}

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
};

inherit(Tilelayer, Container, {
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
 	  var upperLeft = maputils.screenToMap(0, 0, sx, sy, sw, sh, this.map.unitsPerPixel).floor();
      var maxTilesWidth = math.floor(sw / this.map.scaledTileSize.x + this.maxSizeX * 2);
      var maxTilesHeight = math.floor((2 * sh / this.map.scaledTileSize.y + 2 * this.maxSizeY) * 2);
      
	  var j = upperLeft.y - this.maxSizeY + this.maxSizeX;
      var i = upperLeft.x - this.maxSizeY - this.maxSizeX;
		
		for (var y = maxTilesHeight; y; --y) {
			var tilesWidth = 0;
		 
			if(i < -1) {
				j += i + 1;
				tilesWidth -= i + 1;
				i = -1;
			}
			
			var d = j-this.map.size.y;
			if(d >= 0) {
				j -= d;
				tilesWidth += d;
				i += d;
			}

			var jEnd = math.max(math.floor(j+i-this.map.size.x+1), math.max(math.floor(j-maxTilesWidth), 0));
			
			var p = maputils.mapToScreen(i,j,sx,sy,sw,sh,this.map.unitsPerPixel);
			p = maputils.centerTile(p, this.map.scaledTileSize.y);
			
			while (j > jEnd) {
				--j;
				++i;
				++tilesWidth;
				p.x += this.map.scaledTileSize.x;
				this.moveIsoTileSprite(-1, -1, i, j, p);
				
			}
			j += tilesWidth;
			i -= tilesWidth;
			// Go one line deeper, the starting position goes zig-zag
			if (y % 2)
				i++;
			else
				j++;
		}
				
		this._rendered.x = sx;
		this._rendered.y = sy;
		this._rendered.width = sw;
		this._rendered.height = sh;

		//reset buffered status
		this._buffered.left = this._buffered.right = this._buffered.top = this._buffered.bottom = false;

		//reset panDelta
		this._panDelta.x = this.map.position.x % this.map.scaledTileSize.x;
		this._panDelta.y = this.map.position.y % this.map.scaledTileSize.y;
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
        tile.disablePhysics();

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
        //if off the map, just ignore it
        if(toTileX < 0 || toTileY < 0 || toTileX >= this.map.size.x || toTileY >= this.map.size.y) {
            //remove the from tile's physics
            if(this.tiles[fromTileX] && this.tiles[fromTileX][fromTileY]) {
                this.tiles[fromTileX][fromTileY].disablePhysics();
            }
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
            (toTileX * this.map.tileSize.x) + set.tileoffset.x,
            (toTileY * this.map.tileSize.y) + set.tileoffset.y
        ];

        //due to the fact that we use top-left anchors for everything, but tiled uses bottom-left
        //we need to move the position of each tile down by a single map-tile height. That is why
        //there is an addition of "this.map.tileSize.y" to the coords
        position[1] +=  this.map.tileSize.y;

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
            tile.anchor.y = 1;
            this.addChild(tile);
        }

        tile.collisionType = props.type;
        tile.interactive = interactive;
        tile.hitArea = hitArea;
        tile.mass = props.mass || 0;

        tile.setTexture(texture);
        tile.setPosition(position[0], position[1]);
        tile.show();

        if(tile.mass) {
            tile.enablePhysics(this.state.physics);
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
        Container.prototype.destroy.call(this);

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
