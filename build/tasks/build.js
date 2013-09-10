//Based on jquery's build task: https://github.com/jquery/jquery/blob/master/build/tasks/build.js

module.exports = function(grunt) {
    var fs = require('fs'),
        flags = this.flags,
        version = grunt.config('pkg.version');

    grunt.registerMultiTask('build', 'Create a distributable build of grapefruit', function() {
        var modules = grunt.file.readJSON('build/modules.json'),
            bundle = 'module.exports={';

        console.log(this);

        if(!this.flags.core)
            this.flags.core = true;

        Object.keys(this.flags).forEach(function(f) {
            if(modules[f]) {
                bundle += f + ':require("' + f + '/' + f + '"),';
            }
        });

        bundle = bundle.substr(0, bundle.length - 1);
        bundle += '};';

        grunt.file.write('src/bundle.js', bundle);

        //run urequire
        grunt.task.run([ 'urequire:' + this.target ]);
    });

    // Special "alias" task to make custom build creation less grawlix-y
    // Translation example
    //
    //   grunt custom:+ajax,-dimensions,-effects,-offset
    //
    // Becomes:
    //
    //   grunt build:*:*:+ajax:-dimensions:-effects:-offset
    grunt.registerTask('custom', function() {
        var args = [].slice.call(arguments),
            modules = args.length ? args[0].replace(/,/g, ':') : '';

        grunt.log.writeln('Creating custom build...\n');
        grunt.task.run([ 'build:*:*:' + modules ]);
    });
};