/**
 * Lint ES
 */
"use strict";

const gulp = require("gulp"),
    esLint = require("gulp-eslint");

module.exports = function(options) {
    return cb => {
        gulp.src(`./${options.src}/js/**/*.js`)
            .pipe(esLint())
            // eslint.format()은 린트 결과를 콘솔에 출력합니다.
            // 또는 eslint.formatEach()를 사용하십시오 (문서 참조).
            .pipe(esLint.format());

        // 린트 오류시 오류 코드(1)로 프로세스를 종료하려면 스트림과 파이프를 failAfterError로 마지막으로 리턴하십시오.
        // .pipe(esLint.failAfterError());

        cb();
    };
};
