//need to allow script urls so that mocha: works below
/* jshint scripturl:true */
module.exports = function(grunt) {
    var testPort = grunt.option('port-test') || 9002,
        pkg = grunt.file.read('package.json'),
        banner = [
            '/**',
            ' * @license',
            ' * <%= pkg.longName %> - v<%= pkg.version %>',
            ' * Copyright © 2012-2014, Chad Engler',
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
        pkg: JSON.parse(pkg),
        dirs: {
            dist: 'build',
            docs: 'docs',
            src: 'src',
            test: 'test',
            tools: 'tools',
            vendor: 'src/vendor'
        },
        files: {
            dev: '<%= dirs.dist %>/gf.js',
            dist: '<%= dirs.dist %>/gf.min.js',
            sourceMap: '<%= dirs.dist %>/gf.min.map',
            main: '<%= dirs.src %>/core.js'
        },
        browserify: {
            options: {
                standalone: 'gf'
            },
            dev: {
                src: '<%= files.main %>',
                dest: '<%= files.dev %>'
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: banner
            },
            dev: {
                src: ['<%= files.dev %>'],
                dest: '<%= files.dev %>'
            }
        },
        uglify: {
            options: {
                banner: banner,
                mangle: true,
                report: 'min',
                sourceMap: true,
                sourceMapName: '<%= files.sourceMap %>'
            },
            dist: {
                files: {
                    '<%= files.dist %>': '<%= files.dev %>'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: '<%= dirs.vendor %>/**.js'
            },
            src: '<%= dirs.src %>/**/*.js'
        },
        connect: {
            dev: {
                options: {
                    hostname: '0.0.0.0',
                    port: testPort,
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
                logo: 'http://www.gravatar.com/avatar/e60ee7bcb380d1ab175251890046b3d8.png',
                options: {
                    paths: '<%= dirs.src %>',
                    exclude: 'vendor',
                    outdir: '<%= dirs.docs %>'
                }
            }
        },
        mocha: {
            dist: {
                src: ['test/unit/index.html'],
                options: {
                    mocha: {
                        ignoreLeaks: false,
                    },
                    log: true,
                    reporter: 'Spec',
                    run: true/*,
                    '--remote-debugger-port': 9000,
                    '--proxy-type=none': 'none'*/
                }
            }
        },
        watch: {
            options: {
                interrupt: true,
                spawn: false
            },
            src: {
                files: ['<%= dirs.src %>/**/*.js'],
                tasks: ['build:dev']
            }
        }
    });

    //load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha');

    //default
    grunt.registerTask('default', ['jshint', 'build']);

    //build taks
    grunt.registerTask('build:dev', ['browserify:dev', 'concat:dev']);
    grunt.registerTask('build:dist', ['build:dev', 'uglify:dist']);
    grunt.registerTask('build', ['build:dist']);

    //test tasks
    grunt.registerTask('test', ['mocha:dist']);
    grunt.registerTask('testci', ['jshint', 'mocha:dist']);

    //misc tasks
    grunt.registerTask('docs', ['yuidoc']);
    grunt.registerTask('dev', ['build', 'watch:src']);
};
