(function() {
    var entObjects = {};

    gf.entityPool = {
        add: function(name, obj) {
            return entObjects[name] = obj;
        },
        has: function(name) {
            return !!entObjects[name];
        },
        create: function(name, props) {
            if(name && gf.entityPool.has(name)) {
                return new entObjects[name](props.pos || props.position || [props.x, props.y], props);
            }
            else if(props.texture) {
                return new gf.Sprite(props.pos || props.position || [props.x, props.y], props);
            }
            else {
                return new gf.Entity(props.pos || props.position || [props.x, props.y], props);
            }
        }
    };
})();