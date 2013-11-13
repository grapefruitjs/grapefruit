//need to allow script urls so that mocha: works below
/* jshint scripturl:true */
module.exports = function(grunt) {
    var glob = require('glob'),
        source = glob.sync('src/**/*.js').filter(function(v) { return v.indexOf('vendor') === -1; }),
        testPort = grunt.option('port-test') || 9002;
        //banner = [
        //    '/**',
        //    ' * @license',
        //    ' * <%= pkg.longName %> - v<%= pkg.version %>',
        //    ' * Copyright (c) 2012, Chad Engler',
        //    ' * <%= pkg.homepage %>',
        //    ' *',
        //    ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
        //    ' *',
        //    ' * <%= pkg.longName %> is licensed under the <%= pkg.license %> License.',
        //    ' * <%= pkg.licenseUrl %>',
        //    ' */',
        //    ''
        //].join('\n');

    //Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            main: 'core.js'
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
            src: source.concat('Gruntfile.js'),
            options: {
                jshintrc: '.jshintrc'
            }
        },
        connect: {
            test: {
                options: {
                    port: testPort,
                    base: './'
                }
            },
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
                logo: 'https://en.gravatar.com/userimage/49218683/8654d0c767f327312ebb1ace7f5a8d8d.png',
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
                    debugLevel: 0,
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
                tasks: ['build']
            }
        }
    });

    //load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-urequire');

    //setup shortcut tasks
    grunt.registerTask('default', ['jshint', 'build']);
    grunt.registerTask('build', ['urequire:dev', 'urequire:dist', 'replace:dist']);
    grunt.registerTask('test', ['mocha:dist']);
    grunt.registerTask('testci', ['jshint', 'mocha:dist']);
    grunt.registerTask('docs', ['yuidoc']);

    grunt.registerTask('dev', ['watch:src']);
};