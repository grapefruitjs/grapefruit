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

    DIRECTION: {
        BOTH: 0,
        HORIZONTAL: 1,
        VERTICAL: 2
    },

    SPRITE_TYPE: {
        PLAYER: 'player',
        ENEMY: 'enemy',
        FRIENDLY: 'friendly',
        NEUTRAL: 'neutral',
        COLLECTABLE: 'collectable',
        TILE: 'tile'
    },

    COLLISION_TYPE: {
        NONE: 'none',
        SOLID: 'solid',
        CLIFF: 'cliff',
        LADDER: 'ladder',
        WATER: 'water',
        DEEP_WATER: 'deep_water'
    }
};
