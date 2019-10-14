/**
 * Lint SASS
 */
'use strict';

const gulp = require('gulp'),
    sassLint = require('gulp-sass-lint');

module.exports = function (options) {

    return cb => {
        gulp.src(`./${options.src}/scss/**`)
            .pipe(sassLint({
                configFile: './sass-lint.yml'
            }))
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError());

        cb();
    };

};
