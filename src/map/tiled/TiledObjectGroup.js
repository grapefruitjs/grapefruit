/**
 * Tiled object group is a special layer that contains entities
 * TODO: This is all trash
 *
 * @class TiledObjectGroup
 * @extends gf.Layer
 * @namespace gf
 * @constructor
 * @param group {Object} All the settings for the layer
 */
 gf.TiledObjectGroup = function(group) {
    gf.Layer.call(this, group);

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
    this.alpha = group.opacity;
    this.visible = group.visible;
};

gf.inherits(gf.TiledObjectGroup, gf.Layer, {
    /**
     * Spawns all the entities associated with this layer, and properly sets their attributes
     *
     * @method spawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    spawn: function() {
        var game = this.parent.parent.game; //this.TiledMap.GameState.Game

        //we go through these backwards so that things that are higher in the
        //list of object gets rendered on top.
        for(var i = this.objects.length - 1; i >= 0; --i) {
            var o = this.objects[i],
                props = o.properties || {},
                set,
                interactive,
                obj;

            //create a sprite with that texture
            if(o.gid) {
                //check for a custom object hitArea
                if(props.hitArea) {
                    var h = props.hitArea.split(gf.utils._arrayDelim);

                    //odd number of values
                    if(h.length % 2 !== 0) {
                        throw 'Uneven number of values for hitArea on Tiled Object! Should be a flat array of x/y values.';
                    }

                    var hv = [];
                    for(var x = 0, xl = h.length; x < xl; ++x) {
                        hv.push(parseFloat(h[x], 10));
                    }
                    props.hitArea = new gf.Polygon(hv);
                }

                set = this.parent.getTileset(o.gid);

                if(set) {
                    props.texture = set.getTileTexture(o.gid);

                    //if no hitArea then use the tileset's if available
                    if(!props.hitArea) {
                        props.hitArea = set.properties.hitArea;
                    }
                }
            }
            //non-sprite object (usually to define an "area" on a map)
            else {
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

            //a manually specified string texture
            if(typeof props.texture === 'string') {
                props.texture = gf.assetCache[props.texture];
            }

            //just a regular DisplayObject
            if(!props.texture) {
                obj = new gf.DisplayObjectContainer();

                obj.width = o.width;
                obj.height = o.height;
                obj.name = o.name;
                obj.hitArea = props.hitArea;
                obj.rotation = o.rotation;
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
                obj.hitArea = props.hitArea;
                obj.anchor.y = o.gid !== undefined ? 1 : 0;
                obj.anchor.x = this.parent.orientation === 'isometric' ? 0.5 : 0;

                if(props.physical === 'true' || props.physics === 'true')
                    obj.enablePhysics(game.physics);

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

            interactive = this._getInteractive(set, o);

            //pass through all events
            if(interactive) {
                obj.setInteractive(interactive);

                obj.click = this.onObjectEvent.bind(this, 'click', obj);
                obj.mousedown = this.onObjectEvent.bind(this, 'mousedown', obj);
                obj.mouseup = this.onObjectEvent.bind(this, 'mouseup', obj);
                obj.mousemove = this.onObjectEvent.bind(this, 'mousemove', obj);
                obj.mouseout = this.onObjectEvent.bind(this, 'mouseout', obj);
                obj.mouseover = this.onObjectEvent.bind(this, 'mouseover', obj);
                obj.mouseupoutside = this.onObjectEvent.bind(this, 'mouseupoutside', obj);
            }

            obj.setPosition(o.x, o.y);
            this.addChild(obj);
        }

        return this;
    },
    onObjectEvent: function(eventName, obj, data) {
        this.parent.onObjectEvent(eventName, obj, data);
    },
    _getPolygon: function(o) {
        var points = [];
        for(var i = 0, il = o.polygon.length; i < il; ++i) {
            points.push(new gf.Point(o.polygon[i].x, o.polygon[i].y));
        }

        return new gf.Polygon(points);
    },
    _getPolyline: function(o) {
        var points = [];
        for(var i = 0, il = o.polyline.length; i < il; ++i) {
            points.push(new gf.Point(o.polyline[i].x, o.polyline[i].y));
        }

        return new gf.Polygon(points);
    },
    _getEllipse: function(o) {
        return new gf.Ellipse(0, 0, o.width, o.height);
    },
    _getRectangle: function(o) {
        return new gf.Rectangle(0, 0, o.width, o.height);
    },
    _getInteractive: function(set, o) {
        var v;

        //first check the lowest level value (on the tile iteself)
        if(o.interactive !== undefined || o.interactiveTiles !== undefined)
            v = o;
        //next check if the tileset has the value
        else if(set && (set.properties.interactive !== undefined || set.properties.interactiveTiles !== undefined))
            v = set.properties;
        //next check if this layer has interactive tiles
        else if(this.properties.interactive !== undefined || this.properties.interactiveTiles !== undefined)
            v = this.properties;
        //finally check if the map as a whole has interactive tiles
        else if(this.parent.properties.interactive !== undefined || this.parent.properties.interactiveTiles !== undefined)
            v = this.parent.properties;

        //see if anything has a value to use
        if(v) {
            //if they do, lets grab what the interactive value is
            return !!(v.interactive || v.interactiveTiles);
        }

        return false;
    },
    /**
     * Despawns all the sprites associated with this layer
     *
     * @method despawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    despawn: function() {
        //remove each sprite from the game
        for(var i = this.children.length; i > -1; --i) {
            this.removeChild(this.children[i]);
        }

        return this;
    }
});
