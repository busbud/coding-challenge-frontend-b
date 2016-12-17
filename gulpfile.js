/*jslint node: true */
"use strict";

var $           = require('gulp-load-plugins')();
var argv        = require('yargs').argv;
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var merge       = require('merge-stream');
var sequence    = require('run-sequence');
var colors      = require('colors');
var dateFormat  = require('dateformat');
var del         = require('del');
var cleanCSS    = require('gulp-clean-css');

// Enter URL of your local server here
// Example: 'http://localwebsite.dev'
var URL = '';

// Check for --production flag
var isProduction = !!(argv.production);

// Browsers to target when prefixing CSS.
var COMPATIBILITY = [
  'ie >= 10',
  'iOS >= 7',
  'Android >= 4'
];

// File paths to various assets are defined here.
var PATHS = {
  sass: [
    'public/assets/components/foundation-sites/scss',
  ],
  javascript: [
    'public/assets/components/jquery/dist/jquery.min.js',
    'public/assets/components/angular/angular.min.js',
    'public/assets/components/what-input/what-input.js',
    'public/assets/components/foundation-sites/js/foundation.core.js',
    'public/assets/components/foundation-sites/js/foundation.util.*.js',

    // Paths to individual JS components defined below
    //'public/assets/components/foundation-sites/js/foundation.abide.js',
    //'public/assets/components/foundation-sites/js/foundation.accordion.js',
    //'public/assets/components/foundation-sites/js/foundation.accordionMenu.js',
    //'public/assets/components/foundation-sites/js/foundation.drilldown.js',
    //'public/assets/components/foundation-sites/js/foundation.dropdown.js',
    //'public/assets/components/foundation-sites/js/foundation.dropdownMenu.js',
    //'public/assets/components/foundation-sites/js/foundation.equalizer.js',
    //'public/assets/components/foundation-sites/js/foundation.interchange.js',
    //'public/assets/components/foundation-sites/js/foundation.magellan.js',
    'public/assets/components/foundation-sites/js/foundation.offcanvas.js',
    //'public/assets/components/foundation-sites/js/foundation.orbit.js',
    //'public/assets/components/foundation-sites/js/foundation.responsiveMenu.js',
    //'public/assets/components/foundation-sites/js/foundation.responsiveToggle.js',
    //'public/assets/components/foundation-sites/js/foundation.reveal.js',
    //'public/assets/components/foundation-sites/js/foundation.slider.js',
    //'public/assets/components/foundation-sites/js/foundation.sticky.js',
    //'public/assets/components/foundation-sites/js/foundation.tabs.js',
    //'public/assets/components/foundation-sites/js/foundation.toggler.js',
    //'public/assets/components/foundation-sites/js/foundation.tooltip.js',
    // Motion UI
    //'public/assets/components/motion-ui/motion-ui.js',
    // Include your own custom scripts (located in the custom folder)
    'public/assets/javascript/custom/*.js'
  ]
};

// Browsersync task
gulp.task('browser-sync', ['build'], function() {

  var files = [
            '**/*.php',
            '**/*.html',
            '**/*.json',
            '**/*.{png,jpg,gif}',
          ];

  browserSync.init(files, {
    // Proxy address
    proxy: URL,

    // Port #
    // port: PORT
  });
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
  return gulp.src('public/assets/scss/challenge.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    }))
    .on('error', $.notify.onError({
        message: "<%= error.message %>",
        title: "Sass Error"
    }))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(isProduction, cleanCSS()))
    .pipe($.if(!isProduction, $.sourcemaps.write('.')))
    .pipe(gulp.dest('public/assets/stylesheets'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Compile Sass into CSS for IE9
gulp.task('ie9-sass', function() {
  return gulp.src('public/assets/scss/ie9.scss')
    .pipe($.sass({
      includePaths: PATHS.sass
    }))
    .on('error', $.notify.onError({
        message: "<%= error.message %>",
        title: "Sass Error"
    }))
    .pipe($.autoprefixer({
      browsers: ['ie >= 9']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/assets/stylesheets'))
});

// Lint all JS files in custom directory
gulp.task('lint', function() {
  return gulp.src('public/assets/javascript/custom/*.js')
    .pipe($.jshint())
    .pipe($.notify(function (file) {
      if (file.jshint.success) {
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }));
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.uglify()
    .on('error', $.notify.onError({
      message: "<%= error.message %>",
      title: "Uglify JS Error"
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('challenge.js', {
      newLine:'\n;'
    }))
    .pipe($.if(isProduction, uglify))
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('public/assets/javascript'))
    .pipe(browserSync.stream());
});

// Build task
gulp.task('build', ['clean'], function(done) {
  sequence(['sass', 'ie9-sass', 'javascript', 'lint'],
          done);
});

// Clean task
gulp.task('clean', function(done) {
  sequence(['clean:javascript', 'clean:css'],
            done);
});

// Clean JS
gulp.task('clean:javascript', function() {
  return del([
      'public/assets/javascript/challenge.js'
  ]);
});

// Clean CSS
gulp.task('clean:css', function() {
  return del([
      'public/assets/stylesheets/challenge.css',
      'public/assets/stylesheets/challenge.css.map'
    ]);
});

// Default gulp task
// Run build task and watch for file changes
gulp.task('default', ['build', 'browser-sync'], function() {
  // Log file changes to console
  function logFileChange(event) {
    var fileName = require('path').relative(__dirname, event.path);
    console.log('[' + 'WATCH'.green + '] ' + fileName.magenta + ' was ' + event.type + ', running tasks...');
  }

  // Sass Watch
  gulp.watch(['public/assets/scss/**/*.scss'], ['clean:css', 'sass'])
    .on('change', function(event) {
      logFileChange(event);
    });

  // JS Watch
  gulp.watch(['public/assets/javascript/custom/**/*.js'], ['clean:javascript', 'javascript', 'lint'])
    .on('change', function(event) {
      logFileChange(event);
    });
});
