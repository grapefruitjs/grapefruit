var DisplayObjectContainer = require('../display/DisplayObjectContainer'),
    ObjectGroup = require('./ObjectGroup'),
    Sprite = require('../display/Sprite'),
    Vector = require('../math/Vector'),
    Tilelayer = require('./Tilelayer'),
    Tileset = require('./Tileset'),
    utils = require('../utils/utils');

/**
 * Tiled map, expects a Tiled TMX file loaded by the loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @class Tilemap
 * @extends DisplayObjectContainer
 * @constructor
 * @param map {Object} All the settings for the map
 */
var Tilemap = module.exports = function(game, map) {
    //call base ctor
    DisplayObjectContainer.call(this, map);

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
    this.tileSize = new Vector(
        map.tilewidth,
        map.tileheight
    );

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

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        this.tilesets.push(new Tileset(map.tilesets[t]));
    }

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case 'tilelayer':
                lyr = new Tilelayer(this.game, map.layers[i]);
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

    this._showPhysics = false;
};

utils.inherits(Tilemap, DisplayObjectContainer, {
    /**
     * Gets the tileset that an ID is associated with
     *
     * @method getTileset
     * @param tileId {Number} The id of the tile to find the tileset for
     * @return {TiledTileset}
     */
    getTileset: function(tileId) {
        for(var i = 0, il = this.tilesets.length; i < il; ++i)
            if(this.tilesets[i].contains(tileId))
                return this.tilesets[i];
    },
    /**
     * Notifies the map it needs to resize, re renders the viewport
     *
     * @method resize
     */
    resize: function(width, height) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'tilelayer') {
                o.resize(width, height);
            }
        }
    },
    destroy: function() {
        DisplayObjectContainer.prototype.destroy.call(this);

        for(var i = this.children.length - 1; i > -1; --i) {
            var o = this.children[i];

            if(o.destroy)
                o.destroy();
        }
    },
    /**
     * Spawns all the objects in the TiledObjectGroups of this map
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
    },
    /**
     * Spawns all the objects in the TiledObjectGroups of this map
     *
     * @method spawnObjects
     */
    despawnObjects: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'objectgroup') {
                o.despawn();
            }
        }
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
     * Called by a TiledObjectGroup when an object event occurs. This is so you can listen for
     * the emitted events on the world instead of the tile itself.
     *
     * @method onObjectEvent
     * @param eventName {String} The event name to emit, the prefix 'object.' will be added to it
     * @param obj {Sprite|DisplayObjectContainer} The object that has the event
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
     * Pans the map around
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Tilemap} Returns itself for chainability
     */
    pan: function(x, y) {
        y = x.y !== undefined ? x.y : (y || 0);
        x = x.x !== undefined ? x.x : (x || 0);

        this.position.x += x;
        this.position.y += y;

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.pan)
                o.pan(x, y);
        }
    },
    /**
     * Finds a layer based on the string name
     *
     * @method findLayer
     * @param name {String} The name of the layer to find
     * @return {Tilelayer|ObjectGroup|Sprite}
     */
    findLayer: function(name) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.name === name)
                return o;
        }
    }
});

/*
Tilemap.fromXML = function(game, data) {

};

Tilemap.fromCSV = function(game, data) {

};
*/
