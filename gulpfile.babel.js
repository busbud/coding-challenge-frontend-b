import autoprefixer from 'autoprefixer';
import babelify     from 'babelify';
import browser      from 'browser-sync';
import browserify   from 'browserify';
import buffer       from 'vinyl-buffer';
import cssnano      from 'cssnano';
import del          from 'del';
import gulp         from 'gulp';
import plugins      from 'gulp-load-plugins';
import source       from 'vinyl-source-stream';
import watchify     from 'watchify';

const $ = plugins();
const arg = process.argv[2];
const prod = (arg === 'prod');

gulp.task('build',
  gulp.parallel(clean, move, scripts, styles));

gulp.task('default',
  gulp.series('build', browsersync, watch));

gulp.task('prod',
  gulp.series('build'));

// Move files to build dir
const filesToMove = [
  'app/index.html',
  'app/favicon.ico',
  'app/assets/**/*',
];
function move(done) {
  gulp.src(filesToMove, { base: './app' })
  .pipe($.if(prod, $.imagemin()))
  .pipe(gulp.dest('dist'));
  done();
}

// Compile ES6, ES7 and React into JS
function buildScript(file, jswatch) {
  const props = {
    entries: [`./app/scripts/${file}`],
    debug: true,
    cache: {},
    packageCache: {},
    transform: [babelify.configure({
      presets: ['es2015', 'react'],
    })],
  };

  // watchify() if watch requested, otherwise run browserify() once
  const bundler = jswatch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    const stream = bundler.bundle();
    return stream
      .pipe(source(file))
      .pipe(buffer())
      .pipe($.if(prod, $.uglify()))
      .pipe(gulp.dest('dist'))
      .pipe(browser.reload({ stream: true }));
  }

  // listen for an update and run rebundle
  bundler.on('update', () => {
    rebundle();
    $.util.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// Compile Sass into CSS
function styles(done) {
  const processors = [
    autoprefixer,
    cssnano,
  ];
  gulp.src('app/styles/main.scss')
  .pipe($.sourcemaps.init())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.postcss(processors))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
  .pipe(browser.stream({ match: '**/*.css' })); // Filters out map from stream
  done();
}

// Delete build folder and contents
function clean(done) {
  del('dist/**/*');
  done();
}

// Proxy the server with browsersync
function browsersync(done) {
  browser.init({
    tunnel: true,
    ghost: false,
    server: {
      baseDir: './dist',
    },
  });
  done();
}

function scripts(done) {
  buildScript('main.js', false);
  done();
}

// Watch for file changes
function watch(done) {
  gulp.watch(filesToMove).on('change', gulp.series(move, browser.reload));
  gulp.watch('app/styles/**/*.scss').on('change', gulp.series(styles));
  buildScript('main.js', true);
  done();
}
