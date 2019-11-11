/**
 * SASS에서 적용할 생산 스타일 구축
 */
'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    cssnano = require('gulp-cssnano');

module.exports = function (options) {

    return function () {
        return gulp.src(`./${options.src}/scss/${options.mainScss}`)

            .pipe(rename(options.mainScss))
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sass({
                outputStyle: 'expanded' // compact
            }).on('error', function (err) {
                options.showError.apply(this, ['Sass compile error', err]);
            }))
            .pipe(autoprefixer(options.versions))
            .pipe(gcmq()) // 미디어쿼리 후처리
            .pipe(gulp.dest(`./${options.dest}/css`))

            .pipe(rename(options.mainScssMin))
            .pipe(cssnano({
                safe: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`./${options.dest}/css`));

        // .pipe(sass().on('error', function(err) {
        //   options.showError.apply(this, ['Sass compile error', err]);
        // }))
        // .pipe(rename(options.mainScssMin))
        // .pipe(gcmq())
        // .pipe(cssnano({
        //   safe: true
        // }))
        // .pipe(autoprefixer(options.versions))
        // .pipe(gulp.dest(`./${options.dest}/css`));
    };

};
