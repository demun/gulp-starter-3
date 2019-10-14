/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    prettify = require('gulp-prettify');

module.exports = function (options) {

    return function () {
        return gulp.src(`./${options.templates}/**/*.html`)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: `./${options.templates}`
            }))
            .pipe(prettify())
            .pipe(gulp.dest(options.dest));
    };

};