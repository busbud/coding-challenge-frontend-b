var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

gulp.task('build', function(cb) {
  runSequence(['build:js', 'build:css'], cb);
});

gulp.task('build:js', function(cb) {
  return gulp.src('./src/**/*.jsx')
    .pipe(webpackStream({
      entry: [
        'babel-polyfill',
        'whatwg-fetch',
        './src/app.jsx',
      ],
      output: {
        filename: 'app.js',
      },
      module: {
        loaders: [{
          test: /\.jsx?$/,
          ignore: 'node_modules/',
          loader: 'babel-loader',
        }],
      },
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
      },
      devtool: 'source-map',
    }))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('build:css', function(cb) {
  return css = gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('dev', ['build'], function(cb) {
  browserSync.init({
    proxy: 'http://localhost:5000/',
  });

  gulp.watch('src/**/*.js*', ['build:js']);
  gulp.watch('src/**/*.scss', ['build:css']);
  gulp.watch('public/**/*', browserSync.reload);
});
