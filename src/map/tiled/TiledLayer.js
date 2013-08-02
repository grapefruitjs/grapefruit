/**
 * The TiledLayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the TiledMap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @class TiledLayer
 * @extends gf.Layer
 * @namespace gf
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
gf.TiledLayer = function(layer) {
    gf.Layer.call(this, layer);

    /**
     * The tile IDs of the tilemap
     *
     * @property name
     * @type Uint32Array
     */
    this.tileIds = gf.support.typedArrays ? new Uint32Array(layer.data) : layer.data;

    /**
     * The current map of all tiles on the screen
     *
     * @property tiles
     * @type Object
     */
    this.tiles = {};

    /**
     * The user-defined properties of this group. Usually defined in the TiledEditor
     *
     * @property properties
     * @type Object
     */
    this.properties = gf.utils.parseTiledProperties(layer.properties) || {};

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;
    this.visible = layer.visible;

    this.preRender = this.properties.preRender;
    this.chunkSize = new gf.Vector(
        this.properties.chunkSizeX || this.properties.chunkSize || 512,
        this.properties.chunkSizeY || this.properties.chunkSize || 512
    );
    this._preRendered = false;

    this._tilePool = [];
    this._buffered = { left: false, right: false, top: false, bottom: false };
    this._panDelta = new gf.Vector();
    this._rendered = new gf.Rectangle();
};

gf.inherits(gf.TiledLayer, gf.Layer, {
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

        if(!this.tileSize)
            this.tileSize = this.parent.tileSize;

        //clear all the visual tiles
        this.clearTiles();

        if(this.parent.orientation === 'isometric') {
            this._renderIsoTiles(
                -this.parent.position.x,
                -this.parent.position.y,
                width,
                height
            );
        }
        else {
            this._renderOrthoTiles(
                -this.parent.position.x,
                -this.parent.position.y,
                width,
                height
            );
        }

        this._updateRenderSq();
        if(this.hasPhysics) {
            this.parent.parent.physics.invalidCollisions();
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
        var tile = new gf.Tile(gf.Texture.fromCanvas(canvas));
        tile.setPosition(cx * this.chunkSize.x, cy * this.chunkSize.y);

        if(!this.tiles[cx])
            this.tiles[cx] = {};

        this.addChild(tile);
        this.tiles[cx][cy] = tile;
    },
    _renderOrthoTiles: function(sx, sy, sw, sh) {
        //convert to tile coords
        sx = Math.floor(sx / this.parent.scaledTileSize.x);
        sy = Math.floor(sy / this.parent.scaledTileSize.y);
        //ensure we don't go below 0
        sx = sx < 0 ? 0 : sx;
        sy = sy < 0 ? 0 : sy;

        //convert to tile coords
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
                this.moveTileSprite(x, y, x, y);
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
    _renderIsoTiles: function(sx, sy, sw, sh) {
        this._rendered.x = sx;
        this._rendered.y = sx;
        this._rendered.width = sw;
        this._rendered.height = sh;

        var scaled = this.parent.scaledTileSize;

        //convert to tile coords
        sx = Math.floor(sx / (scaled.x / 2));
        sy = Math.floor(sy / scaled.y);

        //convert to tile units
        sw = Math.ceil(sw / (scaled.x / 2));
        sh = Math.ceil(sh / (scaled.y / 2));

        //in this function i,j represents the coord system in the isometric plane
        var iStart = Math.floor(this._isoToI(sx, sy)) - 1,
            jStart = Math.floor(this._isoToJ(sx, sy)),
            iMax = Math.ceil(this._isoToI(sx + sw, sy + sh)) + 1,
            jMax = Math.ceil(this._isoToJ(sx, sy + sh)) + 2,
            jMin = Math.floor(this._isoToJ(sx + sw, sy)),

            iParentMax = this.parent.size.x,
            jParentMax = this.parent.size.y,

            nBump = false, //have we reached minimum j (the bump)
            mBump = false, //have we reached maximum j (the bump)
            n = 0, nBuffer = 1,
            m = 1, mBuffer = 0;

        for(var i = iStart; i < iMax; ++i) {
            for(var j = jStart - n; j < jStart + m; ++j) {
                if(i < 0 || j < 0 || i >= iParentMax || j >= jParentMax)
                    continue;

                this.moveTileSprite(i, j, i, j);
            }

            if(!nBump) {
                //we have not reached lowest j point, increment n to go even lower next iteration
                n++;

                //check if we reached lowest j point
                if((jStart - n) === jMin) {
                    nBump = true;
                }
            } else {
                //if we have reached deepest j start decreasing after the buffer is gone
                if(nBuffer > 0) {
                    nBuffer--;
                }
                //the buffer is gone, start decreasing n each iteration
                else {
                    n--;
                }
            }

            if(!mBump) {
                //we have not reached the highest j point, increase m to go even higher next iteration
                m++;

                if((jStart + m) === jMax) {
                    mBump = true;
                }
            } else {
                //we have reached max j, start decreasing m after the buffer is gone
                if(mBuffer > 0) {
                    mBuffer--;
                }
                //the buffer is gone, start decreasing m each iteration
                else {
                    m--;
                }
            }
        }
    },
    _freeTile: function(tx, ty) {
        if(this.tiles[tx] && this.tiles[tx][ty]) {
            var t = this.tiles[tx][ty];

            if(t) {
                t.visible = false;
                t.disablePhysics();
                this._tilePool.push(t);
                this.tiles[tx][ty] = null;
                this.removeChild(t);
            }
        }

        // make this first-in-first-out instead of a stack
        // see: http://jsperf.com/queue-push-unshift-vs-shift-pop/3
        //this._tilePool.reverse();
    },
    _isoToI: function(x, y) {
        // converts world isometric coordinates into the i position of the 2D-Array
        return ((y + x) / 2);
    },
    _isoToJ: function(x, y) {
        // converts world isometric coordinates into the j position of the 2D-Array
        return ((y - x) / 2);
    },
    /**
     * Clears all the tiles currently used to render the layer
     *
     * @method clearTiles
     */
    clearTiles: function() {
        //hide/free each tile and remove from the memory map
        for(var x in this.tiles) {
            for(var y in this.tiles[x]) {
                this._freeTile(x, y);
            }
        }
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
        var tile,
            id = (toTileX + (toTileY * this.size.x)),
            tileId = this.tileIds[id],
            set = this.parent.getTileset(tileId),
            iso = (this.parent.orientation === 'isometric'),
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
        position = iso ?
            // Isometric position
            [
                (toTileX * (this.parent.tileSize.x / 2)) - (toTileY * (this.parent.tileSize.x / 2)) + set.tileoffset.x,
                (toTileY * (this.parent.tileSize.y / 2)) + (toTileX * (this.parent.tileSize.y / 2)) + set.tileoffset.y
            ]
            :
            // Orthoganal position
            [
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
            tile = new gf.Tile(texture);
            tile.mass = props.mass;
            tile.inertia = props.inertia;
            tile.anchor.y = 1;
        }
        this.addChild(tile);

        tile.collisionType = props.type;
        tile.visible = true;
        tile.hitArea = hitArea;
        tile.interactive = interactive;

        tile.setTexture(texture);
        tile.setPosition(position[0], position[1]);

        if(props.mass) {
            this.hasPhysics = true;
            tile.enablePhysics(this.parent.parent.physics); //this.TiledMap.GameState.physics

            if(this.parent._showPhysics)
                tile.showPhysics();
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
            this.tiles[toTileX] = {};

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

        //isometric pan (just re render everything)
        if(this.parent.orientation === 'isometric')
            return this.resize(this._rendered.width, this._rendered.height);

        //optimized ortho pan, move only what is needed to move
        this._panDelta.x += dx;
        this._panDelta.y += dy;

        //check if we need to build a buffer around the viewport
        //usually this happens on the first pan after a full render

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

        //moved position right, so render left
        while(this._panDelta.x >= this.parent.scaledTileSize.x) {
            this._renderLeft();
            this._panDelta.x -= this.parent.scaledTileSize.x;
        }

        //moved position left, so render right
        while(this._panDelta.x <= -this.parent.scaledTileSize.x) {
            this._renderRight();
            this._panDelta.x += this.parent.scaledTileSize.x;
        }

        //moved position down, so render up
        while(this._panDelta.y >= this.parent.scaledTileSize.y) {
            this._renderUp();
            this._panDelta.y -= this.parent.scaledTileSize.y;
        }

        //moved position up, so render down
        while(this._panDelta.y <= -this.parent.scaledTileSize.y) {
            this._renderDown();
            this._panDelta.y += this.parent.scaledTileSize.y;
        }

        if(this.hasPhysics) {
            this.parent.parent.physics.invalidCollisions();
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
