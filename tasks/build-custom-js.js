/**
 * Build custom js
 * https://github.com/daniil-aleksieiev/web-starter-kit/blob/master/tasks/build-custom-js.js
 */

"use strict";

const gulp = require("gulp"),
    browserify = require("browserify"),
    babelify = require("babelify"),
    source = require("vinyl-source-stream"),
    browserSync = require("browser-sync").create(),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename");

module.exports = function(options) {
    return function() {
        return (
            gulp
                .src(`./${options.src}/js/combine/**/*.js`)
                .pipe(
                    sourcemaps.init({
                        loadMaps: true,
                        debug: true
                    })
                )
                // .pipe(concat('all.js'))
                .pipe(concat(options.mainJs))
                .pipe(gulp.dest(`./${options.dest}/js`))
                .pipe(uglify())
                .pipe(
                    rename({
                        // basename: "base",
                        // prefix: "sub-",
                        suffix: ".min"
                    })
                )
                .pipe(sourcemaps.write("./"))
                .pipe(gulp.dest(`./${options.dest}/js`))
                .pipe(browserSync.stream())
        );
    };
};
