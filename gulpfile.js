var gulp = require('gulp');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require("browserify");
var cleanCSS = require('gulp-clean-css');

// Convert scss/sass files to css
gulp.task('compass', function() {
	return gulp.src('./src/scss/**/*.sass')
		.pipe(plumber())
		.pipe(compass({
			css: 'css/',
			sass: 'src/scss/',
			style: 'compact',
			sourcemap: true
		}))
		.on('error', function(err){
			console.log(err.message);
			this.emit('end');
		})
		.pipe(concat('style.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css/'));
});

// Convert jsx to js
gulp.task('react', function() {
	return browserify({
				entries: 'src/js/app.js',
				//extensions: ['.jsx'],
				debug: true
			})
			.transform("babelify", {
				presets: ["es2015", "react"]
			})
			.bundle()
			.on('error', function(err){
				console.log(err.message);
				this.emit('end');
			})
			.pipe(source('app.js'))
			.pipe(gulp.dest('./js/'));
});

// Watch files
gulp.task('watch', function () {
	gulp.watch('./src/scss/**/*.sass', ['compass']);
	gulp.watch('./src/js/**/*.{jsx,js}', ['react']);
});

// Build all assets
gulp.task('build', ['compass', 'react']);

// Run all tasks if no args
gulp.task('default', ['watch']);
