module.exports = function(grunt) {
    // instructions for grunt
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: {
            all: {
                options: {
                    compress: true,
                    dumpLineNumbers: "comments",
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["> 2%"]})
                    ]
                },
                files: {
                    "public/css/styles.min.css": [
                        "src/styles/normalize.less",
                        "src/styles/grid.less",
                        "src/styles/definitions.less",
                        "src/styles/structure.less",
                        "src/styles/searchBox.less",
                        "src/styles/result.less",
                        "src/styles/loader.less"
                    ]
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "src/images/",
                        src: "**",
                        dest: "public/images/"
                    }
                ]
            }
        },
        jshint: {
            src: ["src/scripts/**/*.js"]
        },
        jscs: {
            src: "src/scripts/**/*.js"
        },
        mkdir: {
            all: {
                options: {
                    create: ["public", "public/css", "public/js", "public/images"]
                }
            }
        },
        exec: {
            app_dev: "browserify src/scripts/frontend.js > public/js/app.min.js",
            app_prod: "browserify src/scripts/frontend.js -d -p [ minifyify --no-map --uglify [ -c ] ] > public/js/app.min.js",
            handlebars: "handlebars src/templates -f public/js/compiledTemplates.js -m",
            "unit_tests": "mocha tests/unit/"
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-mkdir");
    grunt.loadNpmTasks("grunt-exec");
    
    // dev build starts by wiping build/dev/ clean
    grunt.registerTask("test", ["jshint", "jscs", "exec:unit_tests"]);
    grunt.registerTask("build", ["mkdir", "copy:images", "less", "exec:app_prod", "exec:handlebars"]);
};
