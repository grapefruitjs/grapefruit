var path = require('path');

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    //explicity set source files because order is important
    var srcFiles = [
        '<%= dirs.src %>/core.js',
        '<%= dirs.src %>/utils/utils.js',
        '<%= dirs.src %>/utils/vector.js',
        '<%= dirs.src %>/audio/audio.js',
        '<%= dirs.src %>/controls/controls.js',
        '<%= dirs.src %>/controls/gamepad.js',
        '<%= dirs.src %>/debug/debug.js',
        '<%= dirs.src %>/entity/SceneObject.js',
        '<%= dirs.src %>/entity/Entity.js',
        '<%= dirs.src %>/entity/Sprite.js',
        '<%= dirs.src %>/entity/entityPool.js',
        '<%= dirs.src %>/gui/gui.js',
        '<%= dirs.src %>/gui/hud.js',
        '<%= dirs.src %>/gui/hud/HudItem.js',
        '<%= dirs.src %>/loader/loader.js',
        '<%= dirs.src %>/map/Map.js',
        '<%= dirs.src %>/map/Layer.js',
        '<%= dirs.src %>/map/tiled/TiledMap.js',
        '<%= dirs.src %>/map/tiled/TiledLayer.js',
        '<%= dirs.src %>/map/tiled/TiledTileset.js',
        '<%= dirs.src %>/map/tiled/TiledObjectGroup.js',
        '<%= dirs.src %>/plugin/plugin.js'
    ]

    var banner = [
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
            build: 'build',
            docs: 'docs',
            src: 'src',
            test: 'test',
            tools: 'tools',
            vendor: 'vendor'
        },
        files: {
            vendor: '<%= dirs.vendor %>/**/*js',
            intro: '<%= dirs.src %>/intro.js',
            outro: '<%= dirs.src %>/outro.js',
            build: '<%= dirs.build %>/<%= pkg.name %>.js',
            buildMin: '<%= dirs.build %>/<%= pkg.name %>.min.js'
        },
        concat: {
            options: {
                banner: banner
            },
            dist: {
                src: ['<%= files.intro %>', '<%= files.vendor %>'].concat(srcFiles).concat(['<%= files.outro %>']),
                dest: '<%= files.build %>'
            }
        },
        uglify: {
            options: {
                banner: banner,
                mangle: false
            },
            dist: {
                src: '<%= files.build %>',
                dest: '<%= files.buildMin %>'
            }
        },
        jshint: {
            options: {
                /* Enforcement options */
                bitwise: false,     //allow bitwise operators
                camelcase: true,    //must use camelCase or UPPER_CASE
                curly: false,       //one line conditionals w/o braces are allowed
                eqeqeq: true,       //must use === if possible
                forin: true,        //forin loops much check hasOwnProperty
                immed: true,        //self-calling functions must be wrapped in parens
                latedef: true,      //can't use a variable until it is defined
                newcap: true,       //ctor names must be Captialized
                noarg: true,        //arguments.caller/callee are deprecated, disallow
                noempty: true,      //warn about empty blocks
                nonew: true,        //no using `new Constructor();` without saving the value (no using only side-effects)
                plusplus: false,    //you can use unary increment and decrement operators
                quotmark: true,     //quotes must be consistent
                unused: true,       //warn about declared but not used variables
                strict: true,       //require functions to be able to run in strict-mode
                trailing: true,     //help prevent weird whitespace errors in multi-line strings using \ 
                maxlen: 200,        //no line should be longer than 120 characters

                /* Environments */
                browser: true,      //this runs in a browser :)
                devel: false,       //warn about using console.log and the like
                jquery: false,      //no jquery used here
                node: false,        //no node support...YET! :)
                worker: true,       //web-workers are used

                /* Globals */
                undef: true,
                globals: {
                    requirejs: false,
                    require: false,
                    define: false
                }
            }
        },
        connect: {
            qunit: {
                options: {
                    port: grunt.option('port-test') | 9002,
                    base: './'
                }
            },
            test: {
                options: {
                    port: grunt.option('port-test') | 9002,
                    base: './',
                    keepalive: true
                }
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:' + (grunt.option('port-test') || 9002) + '/test/index.html']
                }
            }
        }
    });

    //Load tasks
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('test', ['concat', 'connect:qunit', 'qunit']);
};