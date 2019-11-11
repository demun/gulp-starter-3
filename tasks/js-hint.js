/**
 * Jshint ES
 */
"use strict";

const gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish");

module.exports = function(options) {
    return cb => {
        gulp.src(`./${options.src}/js/combine/**/*.js`)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));

        cb();
    };
};
