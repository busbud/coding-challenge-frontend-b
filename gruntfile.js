module.exports = function(grunt) {
    //grunt wrapper function
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            clean: ['./build/*', './dist/*']
        },

        copy: {
            font: {
                expand: true,
                cwd: './app/shared/font',
                src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
                dest: './dist/public/'
            },
            node_modules: {
                expand: true,
                cwd: './node_modules/',
                flatten: true,
                src: ['bootstrap/dist/css/bootstrap.min.css','font-awesome/css/**', 'font-awesome/fonts/**'],
                dest: './dist/public/'
            },
            font_awesome:{
              expand: true,
              cwd: './node_modules/font-awesome/',
              src: ['css/**', 'fonts/**'],
              dest: './dist/public/'
            },
            views: {
                expand: true,
                cwd: './app/',
                src: ['**/*.html', '**/*.css', '**/*.png', '**/*.ejs'],
                flatten: true,
                dest: './dist/public/'
            },
            js: {
                expand: true,
                cwd: './app/',
                src: ['server.js', 'serverDepartureAPI.js' ],
                flatten: true,
                dest: './dist/'

            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {
                            presets: ['es2015', 'react']
                        }]
                    ]
                },
                src: ['app/app-client.js'],
                dest: 'dist/public/app.js',
            }
        },

        watch: {
            browserify: {
                files: ['app/**/*.jsx', 'app/**/*.js'],
                tasks: ['browserify']
            },
            server:{
                files: ['app/server.js', 'app/components/serverDepartureAPI.js'],
                tasks: ['copy:js']
            },
            views:{
                files: ['app/**/*.css', 'app/**/*.html'],
                tasks: ['copy:views']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/**'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        }
    });


    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');

    //register grunt default task
    grunt.registerTask('heroku', ['clean', 'copy', 'browserify']);
    grunt.registerTask('default', ['clean', 'copy', 'browserify']);
    grunt.registerTask('dev', ['clean', 'copy', 'browserify', 'browserSync', 'watch']);
}
