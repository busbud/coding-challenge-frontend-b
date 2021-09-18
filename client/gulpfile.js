const { src, dest, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const concatCss = require("gulp-concat-css");
const gulpBrotli = require("gulp-brotli");
const gulpGzip = require("gulp-gzip");
const zlib = require("zlib");

const sassConf = {
  source: "./src/**/*.sass",
  destination: "./public/dist",
};

function sassBuild() {
  return src(sassConf.source)
    .pipe(sass().on("error", sass.logError))
    .pipe(concatCss("styles.css"))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest(sassConf.destination));
}

function processStyles() {
  return src(sassConf.source)
    .pipe(sass().on("error", sass.logError))
    .pipe(concatCss("styles.css"))
    .pipe(dest(sassConf.destination));
}
function watchStyles() {
  return watch(sassConf.source, { ignoreInitial: false }, processStyles);
}

const compressTxtOpts = {
  source: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./public/**/*.json",
    "./public/**/*.css",
    "./public/**/*.svg",
  ],
  destination: "./public",
};

function brotli() {
  return src(compressTxtOpts.source)
    .pipe(
      gulpBrotli({
        skipLarger: true,
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MAX_QUALITY,
        },
      })
    )
    .pipe(dest(compressTxtOpts.destination));
}

function gzip() {
  return src(compressTxtOpts.source)
    .pipe(gulpGzip({ skipGrowingFiles: true, gzipOptions: { level: 9 } }))
    .pipe(dest(compressTxtOpts.destination));
}

exports.sassBuild = sassBuild;
exports.optimize = parallel(brotli, gzip);
exports.watchStyles = watchStyles;
