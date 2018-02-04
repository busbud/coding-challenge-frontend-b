'use stric';

const gulp = require('gulp');
const pump = require('pump');
const change = require('gulp-change');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', cb => {
    pump([
        gulp.src('./src/styles/styles.scss'),

        sass.sync().on('error', sass.logError),

        clean({
            rebase: false,
            mediaMerging: true,
            keepBreaks: true
        }),

        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),

        gulp.dest('./src/styles/')
    ], () => {
        cb();
    });
});

gulp.task('watch', cb => {
    gulp.watch('./src/styles/styles.scss', ['sass']);
});