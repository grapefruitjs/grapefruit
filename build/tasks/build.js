//Based on jquery's build task: https://github.com/jquery/jquery/blob/master/build/tasks/build.js

module.exports = function(grunt) {
    var fs = require('fs'),
        flags = this.flags,
        version = grunt.config('pkg.version'),
        modules = grunt.file.readJSON('build/modules.json');

    grunt.registerMultiTask('build', 'Create a distributable build of grapefruit', function() {
        var flags = this.flags,
            bundle;

        if(flags['*']) {
            bundle = getModuleBundle(modules);
        } else {
            if(!flags.core)
                flags.core = true;

            bundle = getModuleBundle(flags);
        }

        grunt.file.write(this.data.main, bundle);

        //run urequire
        grunt.task.run([ 'urequire:' + this.target ]);
    });

    function getModuleBundle(mods) {
        var str = 'module.exports={';

        Object.keys(mods).forEach(function(f) {
            if(modules[f]) {
                str += f + ':require("./' + f + '/' + f + '"),';
            }
        });

        str = str.substr(0, str.length - 1);
        str += '};';

        return str;
    }
};