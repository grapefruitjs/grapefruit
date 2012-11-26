var path = require('path');

module.exports = function(grunt) {
    var fSrc = [
            '<%= dirs.src %>/core.js',
            '<%= dirs.src %>/audio/audio.js',
            '<%= dirs.src %>/controls/controls.js',
            '<%= dirs.src %>/debug/debug.js',
            '<%= dirs.src %>/entity/SceneObject.js',
            '<%= dirs.src %>/entity/camera.js',
            '<%= dirs.src %>/entity/Entity.js',
            '<%= dirs.src %>/entity/Sprite.js',
            '<%= dirs.src %>/gui/gui.js',
            '<%= dirs.src %>/loader/loader.js',
            '<%= dirs.src %>/renderer/renderer.js',
            '<%= dirs.src %>/utils/utils.js',
            '<%= dirs.src %>/vendor/game-shim.js',
            '<%= dirs.src %>/vendor/pubsub.js',
            '<%= dirs.src %>/world/worldManger.js',
            '<%= dirs.src %>/world/Tilemap.js',
            '<%= dirs.src %>/world/TilemapLayer.js'
        ],
        tSrc = [
        ];

    //Project Configuration
    grunt.initConfig({
        meta: {
            name: 'GrapeFruit Game Engine',
            fname: 'gf',
            version: '0.0.1',
            url: 'http://patherdev.com',
            license: 'MIT License',
            licenseUrl: 'http://www.opensource.org/licenses/mit-license.php',
            banner: [
                '/**',
                ' * @license <%= meta.name %> - v<%= meta.version %>',
                ' * Copyright (c) 2012, Chad Engler',
                ' * <%= meta.url %>',
                ' *',
                ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
                ' *',
                ' * <%= meta.name %> is licensed under the <%= meta.license %>.',
                ' * <%= meta.licenseUrl %>',
                ' */'
            ].join('\n')
        },
        dirs: {
            build: 'build',
            docs: 'docs',
            src: 'src',
            test: 'test',
            tools: 'tools'
        },
        files: {
            core: 'core.js',
            intro: '<%= dirs.src %>/intro.js',
            outro: '<%= dirs.src %>/outro.js',
            globSrc: '<%= dirs.src %>/**/*.js',
            globTest: '<%= dirs.src %>/**/*.js',
            build: '<%= dirs.build %>/<%= meta.fname %>.js',
            buildMin: '<%= dirs.build %>/<%= meta.fname %>.min.js'
        },
        concat: {
            dist: {
                src: ['<banner>', '<%= files.intro %>'].concat(fSrc).concat(['<%= files.outro %>']),
                dest: '<%= files.build %>'
            }
        },
        min: {
            dist: {
                src: ['<banner>', '<%= files.intro %>'].concat(fSrc).concat(['<%= files.outro %>']),
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
    grunt.registerTask('default', 'concat min');
    grunt.registerTask('build', 'concat min');
};