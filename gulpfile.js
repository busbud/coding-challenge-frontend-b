var gulp        = require('gulp'),
	gutil       = require('gulp-util'),
	sass        = require('gulp-sass'),
	less        = require('gulp-less'),
	cleanCSS    = require('gulp-clean-css'),
	sourcemaps  = require('gulp-sourcemaps'),
	merge       = require('gulp-merge'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglify'),
	shell       = require('gulp-shell'),
	babel 	    = require('gulp-babel'),
	webpack     = require('webpack');
	gulpWebpack = require('gulp-webpack'),
	fs          = require('fs'),
	runSequence = require('run-sequence'),
	del         = require('del'),
	args        = require('yargs').argv,
	packageJson = require('./package.json'),
	path        = require('path'),
	
	BUILD_DIR   = path.resolve(__dirname, 'build'),
	SOURCE_DIR  = path.resolve(__dirname, 'src'),
	APP_DIR     = path.resolve(__dirname, SOURCE_DIR, 'client/app');
	
	//Probably a better way to do this. Still getting used to the webpack / ES6 build stuff
	process.env.NODE_ENV = args.debug ? 'development' : 'production';
	process.env.PROD_ENV = args.debug ? '0' : '1';
	  
function errorEater(error) {
  console.log(error.toString());
  this.emit('end')
}
	
gulp.task('default', function(callback) {
  return runSequence('clean', 'build', 'watch', callback);
});

gulp.task('clean', function () {
  return del([BUILD_DIR+'/**/*']);
});

gulp.task('build/directories', function() {
	if (!fs.existsSync(BUILD_DIR)) {
		return fs.mkdirSync(BUILD_DIR);
	}
})

gulp.task('build', function(callback) {
    return runSequence('build/directories', 'build/js', 'build/jsx', 'build/vendors', 'build/css', 'build/html', 'build/images', 'build/package.json', 'build/server', callback);
});

/* 
  Builds the CSS files. 
  This includes complilation of LESS and SCSS files, and copying of CSS files into a single resource (public/styles.css)
*/
gulp.task('build/css', function() {

    var lessStream = gulp.src(SOURCE_DIR+'/client/**/*.less')
        .pipe(less())
		.on('error', errorEater)
        .pipe(concat('less-files.less'));

    var scssStream = gulp.src(SOURCE_DIR+'/client/**/*.scss')
        .pipe(sass())
		.on('error', errorEater)
        .pipe(concat('scss-files.scss'));
    
    var cssStream = gulp.src(SOURCE_DIR+'/client/**/*.css')
		.on('error', errorEater)
        .pipe(concat('css-files.css'));

  var vendorStream = gulp.src(packageJson.vendorsCSS || [])
    	.on('error', errorEater)
        .pipe(concat('css-vendors-files.css'));
		
    var mergedStream = merge(vendorStream, lessStream, scssStream, cssStream)
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
		.on('error', errorEater)
        .pipe(gulp.dest(BUILD_DIR+'/public/'));

    return mergedStream;
});

/* 
  Builds the JS files.
  Concatenates, uglifies.
*/
gulp.task('build/js', function() {
	
  return gulp.src(SOURCE_DIR+'/client/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ["es2015", "react"]
    }))
	.on('error', errorEater)
    .pipe(concat('scripts.js'))
	.pipe(args.debug ? gutil.noop() : uglify().on('error', gutil.log))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest(BUILD_DIR+'/public/'));
	
});

/* 
  Builds the JSX files via WebPack
*/
gulp.task('build/jsx', function() {
	
	var webpackConfig = {
		entry: APP_DIR + '/App.jsx',
		devtool: 'source-map',
		output: {
			path: BUILD_DIR + '/public/',
			filename: 'bundle.js'
		},
		module : {
			loaders : [
				{
					test : /\.jsx?/,
					include : APP_DIR,
					loader : 'babel'
				}
			]
		},
		plugins: !args.debug ? [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false }
			})
		] : []
	};

	return gulp.src(SOURCE_DIR+'/client/app/index.jsx')
		.pipe(sourcemaps.init())
		.pipe(gulpWebpack(webpackConfig, webpack))
		.on('error', errorEater)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(BUILD_DIR+'/public/'));
	
});

/* 
  Concats all of the vendor scripts defined in package.json into a single resource (public/vendors.js)
*/
gulp.task('build/vendors', function() {
  return gulp.src(packageJson.vendorsJS || [])
    .pipe(sourcemaps.init())
    .pipe(concat('vendors.js'))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest(BUILD_DIR+'/public/'));
});

/* 
  Copies the server scripts into the build directory
*/
gulp.task('build/server', function() {
  return gulp.src([SOURCE_DIR+'/server/**/*'])
    .pipe(gulp.dest(BUILD_DIR+'/'));
});

/* 
  Copies the html files into the build directory
*/
gulp.task('build/html', function() {
  return gulp.src(SOURCE_DIR+'/client/*.html')
    .pipe(gulp.dest(BUILD_DIR+'/public/'));
});

/* 
  Copies the image files into the build directory
*/
gulp.task('build/images', function() {
  return gulp.src(SOURCE_DIR+'/client/images/**/*.*')
    .pipe(gulp.dest(BUILD_DIR+'/public/images/'));
});

/*
  Burns a build number into package.json
*/
gulp.task('build/package.json', function() {
	
	var buildTimeStamp = new Date().getTime();
	if(typeof packageJson.initialBuildTimeStamp !== 'number') {
		packageJson.initialBuildTimeStamp = buildTimeStamp
	}

	//Build number is number of hours which have passed since the first build
	packageJson.buildNumber = ((buildTimeStamp - packageJson.initialBuildTimeStamp) / 1000 / 60 / 60).toFixed(3);
	
	return fs.writeFile('package.json', JSON.stringify(packageJson, null, 4), (err) => {
		if (err) throw err;
		  return gulp.src(['package.json'])
			.pipe(gulp.dest(BUILD_DIR));
	});
	
});

gulp.task('watch', function() {
  gulp.watch(
    [SOURCE_DIR+'/server/**'], 
    ['build/server', 'build/package.json']
  );
  gulp.watch(
    [SOURCE_DIR+'/client/**/*.html'], 
    ['build/html', 'build/package.json']
  );
  gulp.watch(
    [SOURCE_DIR+'/client/images/**/*.*'], 
    ['build/images', 'build/package.json']
  );

  gulp.watch(
    [SOURCE_DIR+'/client/**/*.js'],
    ['build/js', 'build/package.json']
  );
  gulp.watch(
    [SOURCE_DIR+'/client/**/*.jsx'],
    ['build/jsx', 'build/package.json']
  );
  gulp.watch(
    [
		SOURCE_DIR+'/client/styles/*.scss', 
		SOURCE_DIR+'/client/styles/*.less', 
		SOURCE_DIR+'/client/styles/*.css'
	], 
    [
		'build/css', 
		'build/package.json'
	]
  );
});
