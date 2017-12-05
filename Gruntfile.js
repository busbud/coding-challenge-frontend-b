module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.initConfig({
        sass: {
            busbud: {
                files: {
                    'src/css/busbud.css': 'scss/busbud.scss'
                }
            }
        },
        clean: {
            dist: ['dist', '.tmp'],
            tmp: ['.tmp']
        },
        copy: {
            dist: {
                files: [
                    {
                        src: ['src/index.html', 'src/assets/**/*', 'src/favicon.ico'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        useminPrepare: {
            html: 'dist/src/index.html',
            options: {
                root: 'src',
                dest: 'dist/src'
            }
        },
        usemin: {
            html: ['dist/src/index.html']
        },
        ngtemplates: {
            src: {
                cwd: 'src',
                src: [
                    '**/*.html',
                    '!**/bower_components/**',
                    '!**/index.html'
                ],
                dest: '.tmp/templates.js',
                options: {
                    module: 'busbud.components',
                    usemin: 'app.js',
                    htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true, removeComments: true}
                }
            }
        },
        ngAnnotate: {
            options: {
            },
            angular: {
                files: {
                    '.tmp/concat/app.js': [".tmp/concat/app.js"]
                }
            }
        },
        uglify: {
            options: {
                beautify: false,
                mangle: false
            }
        }
    });

    grunt.registerTask('build', [
        "sass",
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'ngtemplates',
        'concat:generated',
        'ngAnnotate',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'clean:tmp'
    ]);
};
