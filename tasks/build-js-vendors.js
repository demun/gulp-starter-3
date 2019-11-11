/**
 * JS 공급 업체 구축 (공급 업체 배열 연결)
 */
"use strict";

const gulp = require("gulp"),
    filesExist = require("files-exist"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat");

module.exports = function(options) {
    return cb => {
        let jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);

        if (jsVendors.length == 0) {
            return cb();
        }

        return (
            gulp
                .src(filesExist(jsVendors))
                // .pipe(sourcemaps.init({
                //     loadMaps: true,
                //     debug: true
                // }))
                .pipe(concat(options.vendorJs))
                .pipe(gulp.dest(`./${options.dest}/js`))
                .pipe(uglify())
                .pipe(
                    rename({
                        // basename: "base",
                        // prefix: "sub-",
                        suffix: ".min"
                    })
                )
                // .pipe(sourcemaps.write("./"))
                .pipe(gulp.dest(`./${options.dest}/js`))
        );
        // .pipe(concat(options.vendorJsMin))
        // .pipe(uglify())
        // .pipe(gulp.dest(`./${options.dest}/js`));
    };
};
