var Container = require('../display/Container'),
    ObjectGroup = require('./ObjectGroup'),
    BaseTexture = require('../display/BaseTexture'),
    Texture = require('../display/Texture'),
    Sprite = require('../display/Sprite'),
    Vector = require('../math/Vector'),
    Tilelayer = require('./Tilelayer'),
    Tileset = require('./Tileset'),
    PIXI = require('../vendor/pixi'),
    utils = require('../utils/utils'),
    C = require('../constants');

/**
 * Tiled map, expects a Tiled TMX file loaded by the loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @class Tilemap
 * @extends Container
 * @constructor
 * @param map {Object} All the settings for the map
 */
var Tilemap = module.exports = function(game, map) {
    //call base ctor
    Container.call(this, map);

    /**
     * The game instance this tilemap belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;


    //Tiled Editor properties

    /**
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = utils.parseTiledProperties(map.properties) || {};
    this.scale.x = this.properties.scale || 1;
    this.scale.y = this.properties.scale || 1;

    /**
     * The tile size
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new Vector(map.tilewidth, map.tileheight);

    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new Vector(0, 0)
     */
    this.size = new Vector(map.width, map.height);

    /**
     * The orientation of the map
     *
     * @property orientation
     * @type String
     */
    this.orientation = map.orientation;

    /**
     * The version of the TMX format
     *
     * @property version
     * @type Number
     */
    this.version = map.version;

    /**
     * The background color of the map (since Tiled 0.9.0)
     *
     * @property backgroundColor
     * @type Number
     */
    this.backgroundColor = map.backgroundColor;

    //Custom/Optional properties

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

    /**
     * The scaled tile size
     *
     * @property scaledTileSize
     * @type Vector
     */
    this.scaledTileSize = new Vector(
        map.tilewidth * this.scale.x,
        map.tileheight * this.scale.y
    );

    /**
     * The real size (size * scaledTileSize)
     *
     * @property realSize
     * @type Vector
     */
    this.realSize = new Vector(
        this.size.x * this.scaledTileSize.x,
        this.size.y * this.scaledTileSize.y
    );

    //the buffer to draw to
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.btx = new BaseTexture(this.canvas);
    this.tx = new Texture(this.btx);
    this.addChild(this.spr = new Sprite(this.tx));

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        var ts = map.tilesets[t];
        this.tilesets.push(new Tileset(map.textures[ts.name], ts));
    }

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case 'tilelayer':
                lyr = new Tilelayer(this, map.layers[i]);
                break;

            case 'objectgroup':
                lyr = new ObjectGroup(this.game, map.layers[i]);
                break;

            case 'imagelayer':
                lyr = new Sprite(map.layers[i]);
                break;
        }

        this.addChild(lyr);
    }

    //cache the last rendered x/y so we don't do duplicates
    this._cache = {
        x: null,
        y: null,
        width: null,
        height: null
    };
};

utils.inherits(Tilemap, Container, {
    /**
     * Gets the tileset that an ID is associated with
     *
     * @method getTileset
     * @param tileId {Number} The id of the tile to find the tileset for
     * @return {TiledTileset} Returns the tileset if found, undefined if not
     */
    getTileset: function(tileId) {
        for(var i = 0, il = this.tilesets.length; i < il; ++i)
            if(this.tilesets[i].contains(tileId))
                return this.tilesets[i];
    },
    /**
     * Destroys the tilemap instance
     *
     * @method destroy
     */
    destroy: function() {
        Container.prototype.destroy.call(this);

        this.game = null;
        this.properties = null;
        this.tileSize = null;
        this.size = null;
        this.orientation = null;
        this.version = null;
        this.backgroundColor = null;
        this.tilesets = null;
        this.scaledTileSize = null;
        this.realSize = null;
    },
    /**
     * Spawns all the objects in the ObjectGroups of this map
     *
     * @method spawnObjects
     */
    spawnObjects: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'objectgroup') {
                o.spawn();
            }
        }

        return this;
    },
    /**
     * Spawns all the objects in the ObjectGroups of this map
     *
     * @method despawnObjects
     */
    despawnObjects: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'objectgroup') {
                o.despawn();
            }
        }

        return this;
    },
    /**
     * Called by a Tilelayer when a tile event occurs. This is so you can listen for
     * the emitted events on the world instead of the tile itself.
     *
     * @method onTileEvent
     * @param eventName {String} The event name to emit, the prefix 'tile.' will be added to it
     * @param tile {Tile} The tile that has the event
     * @param data {InteractionData} The raw interaction object for the event
     * @private
     */
    onTileEvent: function(eventName, tile, data) {
        this.emit('tile.' + eventName, {
            tile: tile,
            data: data
        });
    },
    /**
     * Called by a ObjectGroup when an object event occurs. This is so you can listen for
     * the emitted events on the world instead of the tile itself.
     *
     * @method onObjectEvent
     * @param eventName {String} The event name to emit, the prefix 'object.' will be added to it
     * @param obj {Sprite|Container} The object that has the event
     * @param data {InteractionData} The raw interaction object for the event
     * @private
     */
    onObjectEvent: function(eventName, obj, data) {
        this.emit('object.' + eventName, {
            object: obj,
            data: data
        });
    },
    /**
     * Finds a layer based on the string name
     *
     * @method findLayer
     * @param name {String} The name of the layer to find
     * @return {Tilelayer|ObjectGroup|Sprite} Returns the layer if found, undefined if not
     */
    findLayer: function(name) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.name === name)
                return o;
        }
    },
    /**
     * Called each frame to render the texture of the world map
     *
     * @method render
     * @param x {Number} The x offset to consider the top-left
     * @param y {Number} The y offset to consider the top-left
     * @param width {Number} The width (in pixels) to render
     * @param height {Number} The height (in pixels) to render
     * @return {Tilemap}
     */
    render: function(x, y, width, height) {
        if(this._cache.x === x && this._cache.y === y && this._cache.w === width && this._cache.h === height)
            return this;

        //update cache
        this._cache.x = x;
        this._cache.y = y;
        this._cache.w = width;
        this._cache.h = height;

        //clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);

        //render the layers
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.render)
                o.render(this.ctx, x, y, width, height);
        }

        //tell pixi to update this texture
        if(this.game.renderMethod === C.RENDERER.WEBGL)
            PIXI.texturesToUpdate.push(this.btx);

        return this;
    },
    /**
     * Resizes the canvas used for the tilemap texture
     *
     * @method resize
     * @param width {Number} Width to resize to
     * @param height {Number} Height to resize to
     * @return {Tilemap}
     */
    resize: function(w, h) {
        this.canvas.width = w;
        this.canvas.height = h;

        return this;
    }
});

/*
Tilemap.fromXML = function(game, data) {

};

Tilemap.fromCSV = function(game, data) {

};
*/
