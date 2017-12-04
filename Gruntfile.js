module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        sass: {
            busbud: {
                files: {
                    'src/css/busbud.css': 'scss/busbud.scss'
                }
            }
        }
    });

    grunt.registerTask("build", ["sass"]);
};
