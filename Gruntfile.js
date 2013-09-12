var path = require('path');

module.exports = function(grunt) {
    //explicity set source files because order is important
    var srcFiles = [
        '<%= dirs.src %>/core.js',
        '<%= dirs.src %>/plugin.js',

        '<%= dirs.src %>/utils/utils.js',
        '<%= dirs.src %>/utils/math.js',
        '<%= dirs.src %>/utils/Clock.js',
        '<%= dirs.src %>/utils/Vector.js',
        '<%= dirs.src %>/utils/EventEmitter.js',

        '<%= dirs.src %>/physics/PhysicsSystem.js',
        '<%= dirs.src %>/physics/PhysicsTarget.js',

        '<%= dirs.src %>/audio/AudioManager.js',
        '<%= dirs.src %>/audio/AudioPlayer.js',

        '<%= dirs.src %>/display/DisplayObjectContainer.js',
        '<%= dirs.src %>/display/Sprite.js',
        '<%= dirs.src %>/display/AnimatedSprite.js',

        '<%= dirs.src %>/camera/Camera.js',
        '<%= dirs.src %>/camera/fx/Effect.js',
        '<%= dirs.src %>/camera/fx/Close.js',
        '<%= dirs.src %>/camera/fx/Fade.js',
        '<%= dirs.src %>/camera/fx/Flash.js',
        '<%= dirs.src %>/camera/fx/Scanlines.js',
        '<%= dirs.src %>/camera/fx/Shake.js',

        '<%= dirs.src %>/font/Font.js',
        '<%= dirs.src %>/font/TextureFont.js',

        '<%= dirs.src %>/game/Game.js',
        '<%= dirs.src %>/game/GameState.js',

        '<%= dirs.src %>/gui/Gui.js',
        '<%= dirs.src %>/gui/GuiItem.js',

        '<%= dirs.src %>/input/InputManager.js',
        '<%= dirs.src %>/input/Input.js',
        '<%= dirs.src %>/input/Keyboard.js',
        '<%= dirs.src %>/input/Gamepad.js',
        '<%= dirs.src %>/input/GamepadButtons.js',
        '<%= dirs.src %>/input/GamepadSticks.js',

        '<%= dirs.src %>/loader/Loader.js',
        '<%= dirs.src %>/loader/AssetLoader.js',
        '<%= dirs.src %>/loader/AudioLoader.js',
        '<%= dirs.src %>/loader/JsonLoader.js',
        '<%= dirs.src %>/loader/TextureLoader.js',
        '<%= dirs.src %>/loader/parse/SpriteSheetLoader.js',
        '<%= dirs.src %>/loader/parse/WorldLoader.js',

        '<%= dirs.src %>/map/Map.js',
        '<%= dirs.src %>/map/Tile.js',
        '<%= dirs.src %>/map/Layer.js',
        '<%= dirs.src %>/map/ImageLayer.js',
        '<%= dirs.src %>/map/tiled/TiledMap.js',
        '<%= dirs.src %>/map/tiled/TiledLayer.js',
        '<%= dirs.src %>/map/tiled/TiledTileset.js',
        '<%= dirs.src %>/map/tiled/TiledObjectGroup.js',

        '<%= dirs.src %>/pool/ObjectPool.js',
        '<%= dirs.src %>/pool/SpritePool.js'
    ],
    vendorFiles = [
        '<%= dirs.vendor %>/es5-shim.min.js',
        '<%= dirs.vendor %>/es5-sham.min.js',
        '<%= dirs.vendor %>/pixi.dev.js',
        '<%= dirs.vendor %>/cp.js',
        '<%= dirs.vendor %>/semver.min.js'
    ],
    banner = [
        '/**',
        ' * @license',
        ' * <%= pkg.longName %> - v<%= pkg.version %>',
        ' * Copyright (c) 2012, Chad Engler',
        ' * <%= pkg.homepage %>',
        ' *',
        ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
        ' *',
        ' * <%= pkg.longName %> is licensed under the <%= pkg.license %> License.',
        ' * <%= pkg.licenseUrl %>',
        ' */',
        ''
    ].join('\n');

    //Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            dist: 'build/dist',
            docs: 'docs',
            src: 'src',
            test: 'test',
            tools: 'tools',
            vendor: 'vendor'
        },
        files: {
            vendorBlob: '<%= dirs.vendor %>/**/*js',
            srcBlob: '<%= dirs.src %>/**/*.js',
            testBlob: '<%= dirs.test %>/unit/**/*.js',
            dev: '<%= dirs.dist %>/<%= pkg.name %>.js',
            dist: '<%= dirs.dist %>/<%= pkg.name %>.min.js',
            bundle: 'bundle.js'
        },
        replace: {
            dist: {
                options: {
                    variables: {
                        'VERSION': '<%= pkg.version %>'
                    },
                    prefix: '@@'
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= files.dev %>', '<%= files.dist %>'],
                        dest: '<%= dirs.dist %>'
                    }
                ]
            }
        },
        jshint: {
            src: ['<%= files.srcBlob %>'],
            test: ['<%= files.testBlob %>'],
            options: {
                /* Enforcement options */
                bitwise: false,     //allow bitwise operators
                camelcase: false,   //must use camelCase or UPPER_CASE
                curly: false,       //one line conditionals w/o braces are allowed
                eqeqeq: true,       //must use === if possible
                forin: false,       //forin loops much check hasOwnProperty
                immed: true,        //self-calling functions must be wrapped in parens
                latedef: true,      //can't use a variable until it is defined
                newcap: true,       //ctor names must be Captialized
                noarg: true,        //arguments.caller/callee are deprecated, disallow
                noempty: true,      //warn about empty blocks
                nonew: true,        //no using `new Constructor();` without saving the value (no using only side-effects)
                plusplus: false,    //you can use unary increment and decrement operators
                quotmark: true,     //quotes must be consistent
                unused: true,       //warn about declared but not used variables
                strict: false,      //do not require functions to be able to run in strict-mode
                trailing: true,     //help prevent weird whitespace errors in multi-line strings using \ 
                maxlen: 200,        //no line should be longer than 120 characters

                /* Relaxing Options */
                boss: true,        //do not warn about the use of assignments in cases where comparisons are expected

                /* Environments */
                browser: true,      //this runs in a browser :)
                devel: false,       //warn about using console.log and the like
                jquery: false,      //no jquery used here
                node: false,        //no node support...YET! :)
                worker: true,       //web-workers are used

                /* Globals */
                undef: true,
                globals: {
                    /* For tests */
                    requirejs: false,
                    require: false,
                    define: false,
                    QUnit: false,
                    Q: false,
                    $: false,
                    gf: false,

                    /* For the library */
                    PIXI: false,
                    cp: false,
                    semver: false
                }
            }
        },
        connect: {
            test: {
                options: {
                    port: grunt.option('port-test') || 9002,
                    base: './',
                    keepalive: true
                }
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.longName %>',
                description: '<%= pkg.description %>',
                version: 'v<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                logo: 'https://en.gravatar.com/userimage/49218683/8654d0c767f327312ebb1ace7f5a8d8d.png',
                options: {
                    paths: '<%= dirs.src %>',
                    outdir: '<%= dirs.docs %>'
                }
            }
        },
        urequire: {
            dev: {
                template: 'combined',
                path: '<%= dirs.src %>',
                dstPath: '<%= files.dev %>',
                main: '<%= files.bundle %>'
            },

            dist: {
                template: 'combined',
                path: '<%= dirs.src %>',
                dstPath: '<%= files.dist %>',
                main: '<%= files.bundle %>',
                optimize: true
            },

            _defaults: {
                build: {
                    debugLevel: 0,
                    verbose: false,
                    scanAllow: true,
                    allNodeRequires: true,
                    noRootExports: false,
                    rootExports: 'gf'
                }
            }
        },
        build: {
            dev: {
                dest: '<%= files.dev %>',
                src: '<%= dirs.src %>',
                main: '<%= dirs.src %>/<%= files.bundle %>'
            },
            dist: {
                dest: '<%= files.dist %>',
                src: '<%= dirs.src %>',
                main: '<%= dirs.src %>/<%= files.bundle %>'
            }
        }
    });

    //load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-urequire');

    //load project tasks
    grunt.loadTasks('build/tasks');

    //setup shortcut tasks
    grunt.registerTask('default', ['build:dist:*']);
    //grunt.registerTask('build', ['jshint:src', 'bundle:*', 'urequire:combined', 'urequire:combinedMin', 'replace:dist']);
    grunt.registerTask('docs', ['yuidoc']);

    grunt.registerTask('testing', ['build:*']);
};