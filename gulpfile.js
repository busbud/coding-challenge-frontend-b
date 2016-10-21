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
  babel       = require('gulp-babel'),
  webpack     = require('webpack');
  gulpWebpack = require('gulp-webpack'),
  fs          = require('fs'),
  runSequence = require('run-sequence'),
  del         = require('del'),
  args        = require('yargs').argv,
  packageJSON = require('./package.json'),
  buildJSON   = require('./buildinfo.json'),
  path        = require('path'),
  
  BUILD_DIR   = path.resolve(__dirname, 'public'),
  SOURCE_DIR  = path.resolve(__dirname, 'client'),
  APP_DIR     = path.resolve(__dirname, SOURCE_DIR, 'app');
  
  //Probably a better way to do this. Still getting used to the webpack / ES6 universe
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

gulp.task('build', function(callback) {
  return runSequence('build/css', 'build/html', 'build/images', 'build/buildinfo', 'build/jsx', callback);
});

/* 
  Builds the CSS files. 
  This includes complilation of LESS and SCSS files, and copying of CSS files into a single resource (public/styles.css)
*/
gulp.task('build/css', function() {

  var lessStream = gulp.src(SOURCE_DIR+'/**/*.less')
      .pipe(less())
      .on('error', errorEater)
      .pipe(concat('less-files.less'));

  var scssStream = gulp.src(SOURCE_DIR+'/**/*.scss')
      .pipe(sass())
      .on('error', errorEater)
      .pipe(concat('scss-files.scss'));
  
  var cssStream = gulp.src(SOURCE_DIR+'/**/*.css')
      .on('error', errorEater)
      .pipe(concat('css-files.css'));

var vendorStream = gulp.src(packageJSON.vendorsCSS || [])
    .on('error', errorEater)
    .pipe(concat('css-vendors-files.css'));
  
  var mergedStream = merge(vendorStream, lessStream, scssStream, cssStream)
      .pipe(concat('styles.css'))
      .pipe(cleanCSS())
      .on('error', errorEater)
      .pipe(gulp.dest(BUILD_DIR));

  return mergedStream;

});

/*
  Builds the JSX files via WebPack
*/
gulp.task('build/jsx', function() {
  
  var webpackConfig = {
    entry: APP_DIR + '/App.jsx',
    devtool: 'source-map',
    output: {
      path: BUILD_DIR,
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
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } }),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ] : []
  };

  return gulp.src(SOURCE_DIR+'/app/index.jsx')
    .pipe(sourcemaps.init())
    .pipe(gulpWebpack(webpackConfig, webpack))
    .on('error', errorEater)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(BUILD_DIR));
  
});

/* 
  Copies the html files into the build directory
*/
gulp.task('build/html', function() {
  return gulp.src(SOURCE_DIR+'/**/*.html')
    .pipe(gulp.dest(BUILD_DIR));
});

/* 
  Copies the image files into the build directory
*/
gulp.task('build/images', function() {
  return gulp.src(SOURCE_DIR+'/images/**/*.*')
    .pipe(gulp.dest(BUILD_DIR+'/images/'));
});

/*
  Burns a build number into package.json
*/
gulp.task('build/buildinfo', function() {
  
  var buildTimeStamp = new Date().getTime();
  if(typeof buildJSON.initialBuildTimeStamp !== 'number') {
    buildJSON.initialBuildTimeStamp = buildTimeStamp
  }

  //Build number is number of hours which have passed since the first build
  buildJSON.buildNumber = ((buildTimeStamp - buildJSON.initialBuildTimeStamp) / 1000 / 60 / 60).toFixed(3);
  
  return fs.writeFile('buildinfo.json', JSON.stringify(buildJSON, null, 4), (err) => {
    if (err) throw err;
  });
  
});

gulp.task('watch', function() {
  gulp.watch(
    ['./server/**'], 
    ['build/buildinfo']
  );
  gulp.watch(
    [SOURCE_DIR+'/**/*.html'], 
    ['build/html', 'build/buildinfo']
  );
  gulp.watch(
    [SOURCE_DIR+'/images/**/*.*'], 
    ['build/images', 'build/buildinfo']
  );
  gulp.watch(
    [SOURCE_DIR+'/app/**/*.jsx'],
    ['build/jsx', 'build/buildinfo']
  );
  gulp.watch(
    [
    SOURCE_DIR+'/styles/*.scss', 
    SOURCE_DIR+'/styles/*.less', 
    SOURCE_DIR+'/styles/*.css'
  ], 
    [
    'build/css', 
    'build/buildinfo'
  ]
  );
});
