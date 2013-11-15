//need to allow script urls so that mocha: works below
/* jshint scripturl:true */
module.exports = function(grunt) {
    var glob = require('glob'),
        source = glob.sync('src/**/*.js').filter(function(v) { return v.indexOf('vendor') === -1; }),
        testPort = grunt.option('port-test') || 9002,
        pkg = grunt.file.read('package.json'),
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
        pkg: JSON.parse(pkg),
        dirs: {
            dist: 'build',
            docs: 'docs',
            src: 'src',
            test: 'test',
            tools: 'tools',
            vendor: 'vendor'
        },
        files: {
            dev: '<%= dirs.dist %>/<%= pkg.name %>.js',
            dist: '<%= dirs.dist %>/<%= pkg.name %>.min.js',
            sourceMap: '<%= dirs.dist %>/<%= pkg.name %>.min.map',
            main: 'core.js'
        },
        concat: {
            options: {
                stripBanners: true,
                banner: banner
            },
            dev: {
                src: ['<%= files.dev %>'],
                dest: '<%= files.dev %>'
            },
            dist: {
                src: ['<%= files.dist %>'],
                dest: '<%= files.dist %>'
            }
        },
        jshint: {
            src: source.concat('Gruntfile.js'),
            options: {
                jshintrc: '.jshintrc'
            }
        },
        connect: {
            dev: {
                options: {
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
        urequire: {
            dev: {
                template: 'combined',
                path: '<%= dirs.src %>',
                dstPath: '<%= files.dev %>',
                main: '<%= files.main %>'
            },

            dist: {
                template: 'combined',
                path: '<%= dirs.src %>',
                dstPath: '<%= files.dist %>',
                main: '<%= files.main %>',
                optimize: true
            },

            _defaults: {
                build: {
                    debugLevel: 1,
                    verbose: false,
                    scanAllow: true,
                    allNodeRequires: true,
                    noRootExports: false
                },
                dependencies: {
                    exports: {
                        root: {
                            'core': ['gf']
                        }
                    }
                },
                resources: [
                    ['+inject:VERSION', ['constants.js'], function(m) {
                        m.afterBody = 'constants.pkg = ' + pkg + ';';
                    }]
                ]
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
                tasks: ['build']
            }
        }
    });

    //load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-urequire');

    //setup shortcut tasks
    grunt.registerTask('default', ['jshint', 'build']);
    grunt.registerTask('test', ['mocha:dist']);
    grunt.registerTask('testci', ['jshint', 'mocha:dist']);
    grunt.registerTask('docs', ['yuidoc']);

    grunt.registerTask('dev', ['watch:src']);

    //build task
    var _buildTasks = ['urequire:%t', 'concat:%t'];

    grunt.registerTask('build', 'Builds the compiled Grapefruit files', function(type) {
        if(type) {
            grunt.task.run(_replace(type));
        } else {
            grunt.task.run(_replace('dev').concat(_replace('dist')));
        }
    });

    function _replace(type) {
        return _buildTasks.map(function(v) { return v.replace('%t', type); });
    }
};