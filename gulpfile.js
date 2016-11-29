'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
 
 //BABEL TASK
gulp.task('babel', () => {
    return gulp.src('./public/javascripts/src/source.jsx')
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest('./public/javascripts/lib'));
});

 //BROWSERIFY TASK
gulp.task('browserify', ['babel'], function () {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './public/javascripts/lib/source.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/javascripts/'));
});

//WATCH TASKS
gulp.task('watch', () => {
  gulp.watch('./public/javascripts/src/source.jsx', ['browserify']);
})

//DEFAULT TASK
gulp.task('default', ['browserify', 'watch']);