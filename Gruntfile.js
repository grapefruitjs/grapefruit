module.exports = function(grunt) {
    var path = require('path'),
        glob = require('glob'),
        source = glob.sync('src/**/*.js').filter(function(v) { return v.indexOf('vendor') === -1 }),
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
            dist: 'build',
            docs: 'docs',
            src: 'src',
            test: 'test',
            tools: 'tools',
            vendor: 'vendor'
        },
        files: {
            testBlob: '<%= dirs.test %>/unit/**/*.js',
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
            src: source,
            //test: ['<%= files.testBlob %>'],
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
                    module: false,
                    require: false
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
                }
            }
        }
    });

    //load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-urequire');

    //setup shortcut tasks
    grunt.registerTask('default', ['jshint', 'build']);
    grunt.registerTask('build', ['urequire:dev', 'urequire:dist', 'replace:dist']);
    grunt.registerTask('docs', ['yuidoc']);
};