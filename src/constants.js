module.exports = {
    version: '@@VERSION',

    RENDERER: {
        AUTO: 'auto',
        CANVAS: 'canvas',
        WEBGL: 'webgl'
    },

    FILE_FORMAT: {
        JSON: 0,
        XML: 1,
        CSV: 2
    },

    ATLAS_FORMAT: {
        JSON_ARRAY: 0,
        JSON_HASH: 1,
        STARLING_XML: 2
    },

    CAMERA_FOLLOW: {
        PLATFORMER: 0,
        TOPDOWN: 1,
        TOPDOWN_TIGHT: 2,
        LOCKON: 3
    },

    //Axis flags
    AXIS: {
        NONE: 0,        // 0000
        HORIZONTAL: 1,  // 0001
        VERTICAL: 2,    // 0010
        BOTH: 3         // 0011
    },

    //Directional Flags
    DIRECTION: {
        NONE: 0,        // 0000
        LEFT: 1,        // 0001
        RIGHT: 2,       // 0010
        TOP: 4,         // 0100
        BOTTOM: 8,      // 1000
        ALL: 15         // 1111
    },

    SHAPE: {
        CIRCLE: 1,
        POLYGON: 2,
        RECTANGLE: 3
    },

    PHYSICS_TYPE: {
        STATIC: 0,      //doesn't move
        KINEMATIC: 1,   //gravity doesn't effect it, and solver doesn't solve it
        DYNAMIC: 2      //totally dynamic (moves and gravity etc)
    },

    PHYSICS: {
        MAX_QUAD_OBJECTS: 10,   //max number of objects before a quadrant splits in the physics quad tree
        MAX_QUAD_LEVELS: 5      //max levels deep the physics quad tree can go
    },

    PARTICLES: {
        MAX_PARTICLES: 100      //max number of particles that can exist per emitter
    }
};
