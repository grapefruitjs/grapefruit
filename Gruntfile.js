var path = require('path');

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //explicity set source files because order is important
    var srcFiles = [
        '<%= dirs.src %>/core.js',
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
        '<%= dirs.src %>/plugin/plugin.js',
        '<%= dirs.src %>/utils/utils.js'
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
                browser: true
            }
        }
    });

    //Load tasks
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('build', ['concat', 'uglify']);
};