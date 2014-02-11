var Container = require('../display/Container'),
    ObjectGroup = require('./ObjectGroup'),
    Sprite = require('../display/Sprite'),
    Vector = require('../math/Vector'),
    Rectangle = require('../geom/Rectangle'),
    Tilelayer = require('./Tilelayer'),
    Tileset = require('./Tileset'),
    utils = require('../utils/utils'),
    math = require('../math/math'),
    inherit = require('../utils/inherit');

/**
 * Tiled map that represents an entire tile map with multiple layers or object groups.
 * Often it is easier to create a tilemap using the object factor on a world, rather
 * than doing it manually yourself.
 *
 * @class Tilemap
 * @extends Container
 * @constructor
 * @param state {State} The game state the map belongs to
 * @param map {Object} All the settings for the map
 * @param tilesetTextures {Object} An object whose keys are the tileset name,
 *      and whose values are the textures for the tileset. For example:
 *      `{ tileset1: new Texture(), ... }`
 */
var Tilemap = function(state, map, tilesetTextures) {
    //call base ctor
    Container.call(this, map);

    /**
     * The state instance this tilemap belongs to
     *
     * @property state
     * @type Game
     */
    this.state = state;

    /**
     * The game instance this tilemap belongs to
     *
     * @property game
     * @type Game
     */
    this.game = state.game;


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

    //create each tileset
    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        var ts = map.tilesets[t];
        this.tilesets.push(new Tileset(tilesetTextures[ts.name], ts));
    }

    //create each layer
    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
        case 'tilelayer':
            lyr = new Tilelayer(this, map.layers[i]);
            break;

        case 'objectgroup':
            lyr = new ObjectGroup(this, map.layers[i]);
            break;

        case 'imagelayer':
            lyr = new Sprite(map.layers[i]);
            break;
        }

        this.addChild(lyr);
    }

    this._bounds = new Rectangle(0, 0, this.realSize.x, this.realSize.y);

    //update the world bounds
    var w = this.game.state.active.world;
    w.bounds.width = Math.max(w.bounds.width, this.realSize.x);
    w.bounds.height = Math.max(w.bounds.height, this.realSize.y);
};

inherit(Tilemap, Container, {
    getBounds: function() {
        this.scaledTileSize.set(
            this.tileSize.x * this.scale.x,
            this.tileSize.y * this.scale.y
        );
        this.realSize.set(
            this.size.x * this.scaledTileSize.x,
            this.size.y * this.scaledTileSize.y
        );
        this._bounds.width = math.min(this.realSize.x, this.state.game.width);
        this._bounds.height = math.min(this.realSize.y, this.state.game.height);

        return this._bounds;
    },
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
     * @return {Tilemap} Returns itself.
     * @chainable
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
     * @return {Tilemap} Returns itself.
     * @chainable
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
     * Clears all the tiles that are currently used on all tile layers
     *
     * @method clearTiles
     * @return {Tilemap} Returns itself.
     * @chainable
     */
    clearTiles: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.type === 'tilelayer') {
                o.clearTiles();
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
     * Pans the map around
     *
     * @method pan
     * @param x {Number|Point} The x amount to pan, if a Point is passed the y param is ignored
     * @param y {Number} The y ammount to pan
     * @return {Tilemap} Returns itself.
     * @chainable
     */
    pan: function(x, y) {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.pan)
                o.pan(x, y);
        }

        return this;
    },
    /**
     * Called on resize to render the viewport again
     *
     * @method render
     * @param x {Number} The x offset to consider the top-left
     * @param y {Number} The y offset to consider the top-left
     * @param width {Number} The width (in pixels) to render
     * @param height {Number} The height (in pixels) to render
     * @return {Tilemap} Returns itself.
     * @chainable
     */
    render: function(x, y, width, height) {
        //defaults
        x = x || -this.state.world.position.x;
        y = y || -this.state.world.position.y;
        width = width || this.game.width;
        height = height || this.game.height;

        //render the layers
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.render)
                o.render(x, y, width, height);
        }

        return this;
    }
});

Tilemap.parseXmlMap = function(key, data, images) {
    var mapElement = data.getElementsByTagName('map')[0],
        map = {
            version: parseInt(mapElement.attributes.getNamedItem('version').nodeValue, 10),
            width:  mapElement.attributes.getNamedItem('width').nodeValue,
            height:  mapElement.attributes.getNamedItem('height').nodeValue,
            tilewidth:  mapElement.attributes.getNamedItem('tilewidth').nodeValue,
            tileheight:  mapElement.attributes.getNamedItem('tileheight').nodeValue,
            orientation: mapElement.attributes.getNamedItem('orientation').nodeValue,
            layers: [],
            properties: {},
            tilesets: []
        };

    //TODO: add the layers

    //TODO: add the properties

    //add the tilesets
    var tilesets = mapElement.getElementsByTagName('tileset');

    for(var i = 0, il = tsets.length; i < il; ++i) {
        var tset = tsets[i],
            tiles = tset.getElementsByTagName('tile'),
            tileset = {
                name: tset.attributes.getNamedItem('name').nodeValue,
                firstgid: parseInt(tset.attributes.getNamedItem('firstgid').nodeValue, 10),
                tilewidth: parseInt(tset.attributes.getNamedItem('tilewidth').nodeValue, 10),
                tileheight: parseInt(tset.attributes.getNamedItem('tileheight').nodeValue, 10),
                imagewidth: 0,
                imageheight: 0,
                image: '',
                margin: 0,
                spacing: 0,
                tileoffset: { x: 0, y: 0 },
                terrains: [],
                properties: {},
                tileproperties: {},
                tiles: {}
            };

        //add spacing / margin attributes if exist
        var spacing = tset.attributes.getNamedItem('spacing');
        if(spacing) {
            tileset.spacing = parseInt(spacing.nodeValue, 10);
        }

        var margin = tset.attributes.getNamedItem('margin');
        if(margin) {
            tileset.margin = parseInt(spacing.nodeValue, 10);
        }

        //add .properties if element exists
        var properties = tset.getElementsByTagName('properties');
        if(properties.length) {
            for(var p = 0; p < properties.length; ++p) {
                var prop = properties[p];

                tileset.properties[prop.attributes.getNamedItem('name').nodeValue] = prop.attributes.getNamedItem('value').nodeValue;
            }
        }

        //add .tiles if multi-image set
        for(var t = 0; t < tiles.length; ++t) {
            var tile = tiles[i],
                id = tile.attributes.getNamedItem('id').nodeValue,
                terr = tile.attributes.getNamedItem('terrain'),
                img = tile.getElementsByTagName('image');

            //check if a tile has a terrain
            if(terr) {
                tileset.tiles[id] = tileoffset.tiles[id] || {};
                tileset.tiles[id].terrain = terr.nodeValue.split(',');
            }

            //check if it has an image child
            if(img.length) {
                tileset.tiles[id] = tileset.tiles[id] || {};
                tileset.tiles[id].image = img[0].attributes.getNamedItem('source').nodeValue;
            }

            //add all the tile properties
            var tileprops = tile.getElementsByTagName('properties');
            if(tileprops.length) {
                tileset.tileproperties[id] = {};
                tileprops = tileprops[0].getElementsByTagName('property');
                for(var tp = 0; tp < tileprops.length; ++tp) {
                    var prop = tileprops[tp];
                    tileset.tileproperties[id][prop.getNamedItem('name').nodeValue] = prop.getNamedItem('value').nodeValue;
                }
            }
        }

        //check for terraintypes and add those
        var terrains = tset.getElementsByTagName('terraintypes');
        if(terrains.length) {
            terrains = terrains[0].getElementsByTagName('terrain');
            for(var tr = 0; tr < terrains.length; ++tr) {
                tileset.terrains.push({
                    name: terrains[tr].attributes.getNamedItem('name').nodeValue,
                    tile: parseInt(terrains[tr].attributes.getNamedItem('tile').nodeValue, 10)
                });
            }
        }

        //check for tileoffset and add that
        var offset = tset.getElementsByTagName('tileoffset');
        if(offset.length) {
            tileset.tileoffset.x = parseInt(offset[0].attributes.getNamedItem('x').nodeValue, 10);
            tileset.tileoffset.y = parseInt(offset[0].attributes.getNamedItem('y').nodeValue, 10);
        }

        //TODO: image, imagewidth, imageheight
        var image = tset.
    }
};

/*
Tilemap.fromCSV = function(state, data) {

};
*/

module.exports = Tilemap;
