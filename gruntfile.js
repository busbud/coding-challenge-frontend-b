module.exports = function(grunt) {
    //grunt wrapper function
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            clean: ['./build/*', './dist/*']
        },

        eslint: {
            target: ['./app/*.js']
        },

        copy: {
            font: {
                expand: true,
                cwd: './app/shared/font',
                src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
                dest: './dist/'
            },
            node_modules:{
              expand: true,
              cwd: './node_modules/',
              flatten: true,
              src: ['angular/angular.min.js', 'angular-route/angular-route.min.js',
              'moment/min/moment.min.js', 'bootstrap/dist/css/bootstrap.min.css',
              'angular-ui-swiper/dist/angular-ui-swiper.js'],
              dest: './dist/'
            },

            views: {
              expand: true,
              cwd: './app/',
              src: ['**/*.html'],
              flatten: true,
              dest: './dist/'
            },

            components: {
              expand: true,
              cwd: './app/',
              src: ['components'],
              flatten: true,
              dest: './dist/'
            }
        },
        babel: {
        options: {
            sourceMap: true,
            presets: ['es2015', 'react']
        },
        dist: {
            files: {
                'dist/app.js': 'src/app.js'
            }
        }
    }

    });


    //load grunt tasks
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('load-grunt-tasks');

    //register grunt default task
    grunt.registerTask('test', ['eslint', 'clean', 'concat', 'copy', 'uglify']);
}
