var Container = require('../display/Container'),
    Vector = require('../math/Vector'),
    Polygon = require('../geom/Polygon'),
    Ellipse = require('../geom/Ellipse'),
    Rectangle = require('../geom/Rectangle'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    math = require('../math/math'),
    PIXI = require('pixi.js');

/**
 * Tiled object group is a special layer that contains entities
 * TODO: This is all trash
 *
 * @class ObjectGroup
 * @extends Container
 * @constructor
 * @param map {Tilemap} The tilemap instance that this belongs to
 * @param group {Object} All the settings for the layer
 */
var ObjectGroup = function(map, group) {
    Container.call(this, group);

    /**
     * The map instance this object group belongs to
     *
     * @property map
     * @type Tilemap
     */
    this.map = map;

    /**
     * The game instance this object group belongs to
     *
     * @property game
     * @type Game
     */
    this.game = map.game;

    /**
     * The state instance this object group belongs to
     *
     * @property state
     * @type Game
     */
    this.state = map.state;

    /**
     * The name of the group
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = group.name || '';

    /**
     * The color to display objects in this group
     *
     * @property color
     * @type
     */
    this.color = group.color;

    /**
     * The user-defined properties of this group. Usually defined in the TiledEditor
     *
     * @property properties
     * @type Object
     */
    this.properties = group.properties || {};

    /**
     * The objects in this group that can be spawned
     *
     * @property objects
     * @type Array
     */
    this.objects = group.objects;

    //translate some tiled properties to our inherited properties
    /**
     * The type of the layer, should always be 'objectgroup'
     *
     * @property type
     * @type String
     * @default 'objectgroup'
     */
    this.type = group.type || 'objectgroup';

    //translate some tiled properties to our inherited properties
    this.position.x = group.x || 0;
    this.position.y = group.y || 0;
    this.alpha = group.opacity !== undefined ? group.opacity : 1;
    this.visible = group.visible !== undefined ? group.visible : true;
};

inherit(ObjectGroup, Container, {
    getBounds: function() {
        return this.map.getBounds();
    },
    /**
     * Spawns all the entities associated with this layer, and properly sets their attributes
     *
     * @method spawn
     * @return {ObjectGroup} Returns itself.
     * @chainable
     */
    spawn: function() {
        var game = this.game; //this.Tilemap.GameState.Game

        //we go through these backwards so that things that are higher in the
        //list of object gets rendered on top.
        for(var i = this.objects.length - 1; i >= 0; --i) {
            var o = this.objects[i],
                props = utils.parseTiledProperties(o.properties) || {},
                set,
                interactive,
                obj;

            props.tileprops = {};

            //create a sprite with that texture
            if(o.gid) {
                set = this.parent.getTileset(o.gid);

                if(set) {
                    props.texture = set.getTileTexture(o.gid);
                    props.tileprops = set.getTileProperties(o.gid);

                    //if no hitArea then use the tileset's if available
                    if(!props.hitArea) {
                        if(props.tileprops.hitArea)
                            props.hitArea = props.tileprops.hitArea;
                        else
                            props.hitArea = set.properties.hitArea;
                    }
                }
            }
            //non-sprite object (usually to define an "area" on a map)
            else {
                if(!props.hitArea) {
                    //define a hitArea
                    if(o.polyline)
                        props.hitArea = this._getPolyline(o);
                    else if(o.polygon)
                        props.hitArea = this._getPolygon(o);
                    else if(o.ellipse)
                        props.hitArea = this._getEllipse(o);
                    else
                        props.hitArea = this._getRectangle(o);
                }
            }

            o.name = o.name || props.name || props.tileprops.name;
            o.type = o.type || props.type || props.tileprops.type;

            //a manually specified string texture
            if(typeof props.texture === 'string') {
                props.texture = game.cache.getTexture(props.texture);
            }

            //just a regular DisplayObject
            if(!props.texture) {
                obj = new Container();

                obj.width = o.width;
                obj.height = o.height;
                obj.name = o.name;
                obj.type = o.type;
                obj.rotation = o.rotation;

                //these are treated as sensor bodies, so always enable physics
                obj.position.x = o.x;
                obj.position.y = o.y;

                obj.sensor = true;
                obj.hitArea = props.hitArea;

                obj.enablePhysics(game.physics);
            } else {
                //some variable for the user if they want them
                //these will be passed through to a custom sprite if wanted
                props.width = o.width;
                props.height = o.height;
                props.zIndex = this.zIndex;

                obj = game.spritepool.create(o.name, props.texture, props);

                //assign some values
                obj.name = o.name;
                obj.type = o.type;
                obj.position.x = o.x;
                obj.position.y = o.y;

                obj.mass = props.mass || props.tileprops.mass;
                obj.inertia = props.inertia || props.tileprops.inertia;
                obj.friction = props.friction || props.tileprops.friction;
                obj.sensor = props.sensor || props.tileprops.sensor;
                obj.hitArea = props.hitArea;
                obj.blendMode = (props.blendMode || this.properties.blendMode) ? PIXI.blendModes[(props.blendMode || this.properties.blendMode)] : PIXI.blendModes.NORMAL;

                var a = props.anchor || props.tileprops.anchor;
                obj.anchor.y = a ? a[1] : 1;
                obj.anchor.x = a ? a[0] : (this.parent.orientation === 'isometric' ? 0.5 : 0);

                if(obj.mass) {
                    obj.enablePhysics(game.physics);
                }

                if(props.tileprops) {
                    if(props.tileprops.flippedX) {
                        obj.scale.x = -1;
                        obj.anchor.x = a ? a[0] : 1;
                    }

                    if(props.tileprops.flippedY) {
                        obj.scale.y = -1;
                        obj.anchor.y = a ? a[1] : 0;
                    }

                    //IDK if this is the correct angle, there are no docs for `rotatedCW`
                    if(props.tileprops.rotatedCW) {
                        obj.rotation = math.degreesToRadians(45);
                    }
                }

                if(props.animation || props.tileprops.animation) {
                    if(obj.goto) {
                        obj.goto(0, props.animation || props.tileprops.animation).play();
                    }
                }

                //set some more stuffz
                if(typeof o.rotation === 'number')
                    obj.setRotation(o.rotation);
            }

            //visible was recently added to Tiled, default old versions to true
            obj.visible = o.visible !== undefined ? !!o.visible : true;

            if(this.parent.orientation === 'isometric') {
                var toTileX = o.x / this.parent.tileSize.x,
                    toTileY = o.y / this.parent.tileSize.y;

                //This cannot be the simplest form of this...
                o.x = (toTileX * this.parent.tileSize.x) - ((toTileY - 1) * (this.parent.tileSize.x / 2));
                o.y = (toTileY * this.parent.tileSize.y / 2) + (toTileX * this.parent.tileSize.y);
            }

            interactive = this._getInteractive(set, props);

            //pass through all events
            if(interactive) {
                obj.interactive = interactive;

                obj.click = this.onObjectEvent.bind(this, 'click', obj);
                obj.mousedown = this.onObjectEvent.bind(this, 'mousedown', obj);
                obj.mouseup = this.onObjectEvent.bind(this, 'mouseup', obj);
                obj.mousemove = this.onObjectEvent.bind(this, 'mousemove', obj);
                obj.mouseout = this.onObjectEvent.bind(this, 'mouseout', obj);
                obj.mouseover = this.onObjectEvent.bind(this, 'mouseover', obj);
                obj.mouseupoutside = this.onObjectEvent.bind(this, 'mouseupoutside', obj);
            }

            //set custom properties
            obj.properties = {};
            for(var t in props.tileprops)
                obj.properties[t] = props.tileprops[t];
            for(var k in props)
                if(k !== 'tileprops')
                    obj.properties[k] = props[k];

            obj._objIndex = i;
            this.addChild(obj);
        }

        return this;
    },
    /**
     * Called internally whenever an event happens on an object, used to echo to the parent.
     *
     * @method onObjectEvent
     * @param eventName {String} The name of the event
     * @param obj {Container|Sprite} The object the event happened to
     * @param data {mixed} The event data that was passed along
     * @private
     */
    onObjectEvent: function(eventName, obj, data) {
        this.parent.onObjectEvent(eventName, obj, data);
    },
    /**
     * Creates a polygon from the vertices in a polygon Tiled property
     *
     * @method _getPolygon
     * @param obj {Object} The polygon Tiled object
     * @return {Polygon} The polygon created
     * @private
     */
    _getPolygon: function(o) {
        var points = [];
        for(var i = 0, il = o.polygon.length; i < il; ++i) {
            points.push(new Vector(o.polygon[i].x, o.polygon[i].y));
        }

        return new Polygon(points);
    },
    /**
     * Creates a polyline from the vertices in a polyline Tiled property
     *
     * @method _getPolyline
     * @param obj {Object} The polyline Tiled object
     * @return {Polygon} The polyline created
     * @private
     */
    _getPolyline: function(o) {
        var points = [];
        for(var i = 0, il = o.polyline.length; i < il; ++i) {
            points.push(new Vector(o.polyline[i].x, o.polyline[i].y));
        }

        return new Polygon(points);
    },
    /**
     * Creates a ellipse from the vertices in a ellipse Tiled property
     *
     * @method _getEllipse
     * @param obj {Object} The ellipse Tiled object
     * @return {Ellipse} The ellipse created
     * @private
     */
    _getEllipse: function(o) {
        return new Ellipse(0, 0, o.width, o.height);
    },
    /**
     * Creates a rectangle from the vertices in a rectangle Tiled property
     *
     * @method _getRectangle
     * @param obj {Object} The rectangle Tiled object
     * @return {Rectangle} The rectangle created
     * @private
     */
    _getRectangle: function(o) {
        return new Rectangle(0, 0, o.width, o.height);
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
        //TODO: This is wrong, if 'false' is set on a lower level a higher level will override
        //first check the lowest level value (on the tile iteself)
        return props.interactive || //obj interactive
                props.tileprops.interactive || //tile object interactive
                (set && set.properties.interactive) || //tileset interactive
                this.properties.interactive || //layer interactive
                this.parent.properties.interactive; //map interactive
    },
    /**
     * Despawns all the sprites associated with this layer
     *
     * @method despawn
     * @return {ObjectGroup} Returns itself.
     * @chainable
     */
    despawn: function() {
        return Container.prototype.destroyAllChildren.call(this);
    },
    /**
     * Destroys the group completely
     *
     * @method destroy
     */
    destroy: function() {
        this.despawn();
        Container.prototype.destroy.call(this);

        this.map = null;
        this.game = null;
        this.state = null;
        this.name = null;
        this.color = null;
        this.properties = null;
        this.objects = null;
        this.type = null;
    }
});

module.exports = ObjectGroup;
