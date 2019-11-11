/**
 * browserSync 서버 시작
 */
"use strict";

const gulp = require("gulp"),
    fs = require("fs");

module.exports = function(options) {
    return () => {
        // index.html이 존재하면 - 그것을 연다. 그렇지 않으면 폴더를 보여준다.
        let listDirectory = fs.existsSync(options.mainHtml) ? false : true;

        options.browserSync.init({
            notify: false,
            server: {
                baseDir: "./",
                directory: listDirectory
            },
            snippetOptions: {
                // 스니펫 삽입을위한 사용자 정의 정규식 제공
                rule: {
                    match: /$/i,
                    fn: (snippet, match) => snippet + match
                }
            },
            port: 8080
        });
    };
};
