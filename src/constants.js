var constants = {
    /**
     * The types of renderers supported. These are generally passed in to the constructor of
     * a {{#crossLink "Game"}}{{/crossLink}} instance.
     *
     * @class RENDERER
     * @static
     * @final
     */
    RENDERER: {
        /**
         * Represents automatically choosing a renderer
         *
         * @property AUTO
         * @type String
         * @default 'auto'
         * @static
         * @final
         */
        AUTO: 'auto',
        /**
         * Represents the canvas renderer
         *
         * @property CANVAS
         * @type String
         * @default 'canvas'
         * @static
         * @final
         */
        CANVAS: 'canvas',
        /**
         * Represents the webgl renderer
         *
         * @property WEBGL
         * @type String
         * @default 'webgl'
         * @static
         * @final
         */
        WEBGL: 'webgl'
    },

    /**
     * The types of files that the loader supports for types that have multiple formats (like tilemaps).
     *
     * @class FILE_FORMAT
     * @static
     * @final
     */
    FILE_FORMAT: {
        /**
         * Represents the json file type
         *
         * @property JSON
         * @type String
         * @default 'json'
         * @static
         * @final
         */
        JSON: 'json',
        /**
         * Represents the xml file type
         *
         * @property XML
         * @type String
         * @default 'xml'
         * @static
         * @final
         */
        XML: 'xml',
        /**
         * Represents the csv file type
         *
         * @property CSV
         * @type String
         * @default 'csv'
         * @static
         * @final
         */
        CSV: 'csv'
    },

    /**
     * The types of texture atlas file formats that the loader supports.
     *
     * @class ATLAS_FORMAT
     * @static
     * @final
     */
    ATLAS_FORMAT: {
        /**
         * Represents the JSON Array export type of TexturePacker
         *
         * @property JSON_ARRAY
         * @type String
         * @default 'json_array'
         * @static
         * @final
         */
        JSON_ARRAY: 'json_array',
        /**
         * Represents the JSON Hash export type of TexturePacker
         *
         * @property JSON_HASH
         * @type String
         * @default 'json_hash'
         * @static
         * @final
         */
        JSON_HASH: 'json_hash',
        /**
         * Represents the Starling XML format, this export type is supported by TexturePacker
         *
         * @property XML_STARLING
         * @type String
         * @default 'xml_starling'
         * @static
         * @final
         */
        XML_STARLING: 'xml_starling'
    },

    /**
     * The follow types that the camera can execute
     *
     * @class CAMERA_FOLLOW
     * @static
     * @final
     */
    CAMERA_FOLLOW: {
        /**
         * Represents platformer follow style
         *
         * @property PLATFORMER
         * @type Number
         * @default 0
         * @static
         * @final
         */
        PLATFORMER: 0,
        /**
         * Represents topdown follow style
         *
         * @property TOPDOWN
         * @type Number
         * @default 1
         * @static
         * @final
         */
        TOPDOWN: 1,
        /**
         * Represents a tight topdown follow style
         *
         * @property TOPDOWN_TIGHT
         * @type Number
         * @default 2
         * @static
         * @final
         */
        TOPDOWN_TIGHT: 2,
        /**
         * Represents a lockon follow style, this has no deadzone and the camera will
         * follow the target movement exactly.
         *
         * @property LOCKON
         * @type Number
         * @default 3
         * @static
         * @final
         */
        LOCKON: 3
    },

    /**
     * These represent different axis. They are bitwise flags and can be combined together.
     *
     * @class AXIS
     * @static
     * @final
     */
    AXIS: {
        /**
         * Represents no axis, binary value: 0000
         *
         * @property NONE
         * @type Number
         * @default 0
         * @static
         * @final
         */
        NONE: 0,
        /**
         * Represents a horizontal axis, binary value: 0001
         *
         * @property HORIZONTAL
         * @type Number
         * @default 1
         * @static
         * @final
         */
        HORIZONTAL: 1,
        /**
         * Represents a vertical axis, binary value: 0010
         *
         * @property VERTICAL
         * @type Number
         * @default 2
         * @static
         * @final
         */
        VERTICAL: 2,
        /**
         * Represents both axes, binary value: 0011
         *
         * @property VERTICAL
         * @type Number
         * @default 3
         * @static
         * @final
         */
        BOTH: 3
    },

    /**
     * These represent different directions in the world. They are bitwise flags and can be combined together.
     *
     * @class DIRECTION
     * @static
     * @final
     */
    DIRECTION: {
        /**
         * Represents no direction, binary value: 0000
         *
         * @property NONE
         * @type Number
         * @default 0
         * @static
         * @final
         */
        NONE: 0,
        /**
         * Represents left direction, binary value: 0001
         *
         * @property LEFT
         * @type Number
         * @default 1
         * @static
         * @final
         */
        LEFT: 1,
        /**
         * Represents right direction, binary value: 0010
         *
         * @property RIGHT
         * @type Number
         * @default 2
         * @static
         * @final
         */
        RIGHT: 2,
        /**
         * Represents up direction, binary value: 0100
         *
         * @property UP
         * @type Number
         * @default 4
         * @static
         * @final
         */
        UP: 4,
        /**
         * Represents down direction, binary value: 1000
         *
         * @property DOWN
         * @type Number
         * @default 8
         * @static
         * @final
         */
        DOWN: 8,
        /**
         * Represents all directions, binary value: 1111
         *
         * @property ALL
         * @type Number
         * @default 15
         * @static
         * @final
         */
        ALL: 15
    },

    SHAPE: {
        CIRCLE: 1,
        POLYGON: 2,
        RECTANGLE: 3
    }
};

module.exports = constants;

/**
 * The pkg object contains all the grapefruit package information from package.json,
 * inserted at build time.
 *
 * @class pkg
 * @static
 * @final
 */
