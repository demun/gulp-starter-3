/**
 * Start browserSync server
 */
'use strict';

const gulp = require('gulp'),
    fs = require('fs');

module.exports = function (options) {

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
                // Provide a custom Regex for inserting the snippet
                rule: {
                    match: /$/i,
                    fn: (snippet, match) => snippet + match
                }
            },
            port: 8080
        });
    };

};