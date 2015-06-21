module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerRequirejs: {
            target: {
                rjsConfig: 'client/config.js'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.registerTask('default', ['bowerRequirejs']);

};