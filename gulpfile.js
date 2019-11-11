/**
 *
 *  Web Starter Kit
 *
 */

(() => {
    "use strict";

    const cfg = require("./gulp-config.js"),
        self = this,
        gulp = require("gulp"),
        del = require("del"),
        path = require("path"),
        notifier = require("node-notifier"),
        gutil = require("gulp-util"),
        browserSync = require("browser-sync").create();

    /**
     * 파일에서 Gulp 작업 필요
     * @param  {string} taskName     작업명
     * @param  {String} path         작업 파일의 경로
     * @param  {Object} options     작업 옵션
     * @param  {Array}  dependencies 작업 의존성
     */
    function requireTask(taskName, path, options, dependencies) {
        let settings = options || {};
        const taskFunction = function(callback) {
            if (settings.checkProduction) {
                settings.isProduction =
                    process.argv[process.argv.length - 1] === "production";
            }

            let task = require(path + taskName + ".js").call(this, settings);

            return task(callback);
        };

        settings.taskName = taskName;

        if (!Array.isArray(dependencies)) {
            gulp.task(taskName, taskFunction);
        } else if (dependencies.length === 1) {
            gulp.task(taskName, gulp.series(dependencies[0], taskFunction));
        } else {
            gulp.task(taskName, gulp.series(dependencies, taskFunction));
        }
    }

    /**
     * HTML 템플릿
     */

    requireTask(`${cfg.task.fileInclude}`, `./${cfg.folder.tasks}/`, {
        templates: cfg.fileInclude.templates,
        dest: cfg.fileInclude.dest
    });

    /**
     * Hint HTML
     */

    requireTask(`${cfg.task.htmlHint}`, `./${cfg.folder.tasks}/`);

    /**
     * Hint JS
     */

    requireTask(`${cfg.task.jsHint}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src
    });

    /**
     * Lint ES
     */

    requireTask(`${cfg.task.esLint}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src
    });

    /**
     * Lint SASS
     */

    requireTask(`${cfg.task.sassLint}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src
    });

    /**
     * 커스텀 js 빌드
     */
    requireTask(`${cfg.task.buildCustomJs}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src,
        dest: cfg.folder.build,
        mainJs: cfg.file.mainJs,
        checkProduction: true,
        showError: showError
    });

    /**
     * JS 벤더 구축 (공급 업체 배열로 연결)
     */
    requireTask(`${cfg.task.buildJsVendors}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src,
        dest: cfg.folder.build,
        vendorJs: cfg.file.vendorJs,
        vendorJsMin: cfg.file.vendorJsMin
    });

    /**
     * SASS에서 적용할 수 있는 스타일 구축
     */
    requireTask(`${cfg.task.buildSass}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src,
        dest: cfg.folder.build,
        mainScss: cfg.file.mainScss,
        mainScssMin: cfg.file.mainScssMin,
        versions: cfg.autoprefixer.versions,
        self: self,
        showError: showError
    });

    /**
     * 구성에 나열된 scss 파일 컴파일
     */
    requireTask(`${cfg.task.buildSassFiles}`, `./${cfg.folder.tasks}/`, {
        sassFilesInfo: cfg.getPathesForSassCompiling(),
        dest: cfg.folder.build,
        versions: cfg.autoprefixer.versions,
        self: self,
        showError: showError
    });

    /**
     * SASS에서 적용할 생산 스타일 구축
     */
    requireTask(`${cfg.task.buildSassProd}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src,
        dest: cfg.folder.build,
        mainScss: cfg.file.mainScss,
        mainScssMin: cfg.file.mainScssMin,
        versions: cfg.autoprefixer.versions,
        showError: showError
    });

    /**
     * SASS 공급 업체를 위한 스타일 구축
     */
    requireTask(`${cfg.task.buildStylesVendors}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src,
        dest: cfg.folder.build,
        vendorScss: cfg.file.vendorScss,
        vendorScssMin: cfg.file.vendorScssMin,
        showError: showError
    });

    /**
     * images 최적화
     */
    requireTask(`${cfg.task.imageMin}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.src,
        dest: cfg.folder.build
    });

    /**
     * 빌드 폴더에 이미지 비우기
     */
    requireTask(`${cfg.task.imageClean}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.build
    });

    /**
     * 빌드 폴더 비우기
     */
    requireTask(`${cfg.task.cleanBuild}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.build
    });

    /**
     * 프로덕션 폴더 비우기
     */
    requireTask(`${cfg.task.cleanProd}`, `./${cfg.folder.tasks}/`, {
        src: cfg.folder.prod
    });

    /**
     * 폴더를 빌드 폴더로 복사
     */
    requireTask(`${cfg.task.copyFolders}`, `./${cfg.folder.tasks}/`, {
        dest: cfg.folder.build,
        foldersToCopy: cfg.getPathesToCopy()
    });

    /**
     * 프로덕션 폴더로 폴더 복사
     */
    requireTask(`${cfg.task.copyFoldersProduction}`, `./${cfg.folder.tasks}/`, {
        dest: cfg.folder.prod,
        foldersToCopy: cfg.getPathesToCopyForProduction()
    });

    /**
     * browserSync 서버 시작
     */
    requireTask(`${cfg.task.browserSync}`, `./${cfg.folder.tasks}/`, {
        mainHtml: cfg.file.mainHtml,
        browserSync: browserSync
    });

    /**
     * 파일 변경 사항 감시
     */
    requireTask(
        `${cfg.task.watch}`,
        `./${cfg.folder.tasks}/`,
        {
            sassFilesInfo: cfg.getPathesForSassCompiling(),
            src: cfg.folder.src,
            templates: cfg.folder.templates,
            dest: cfg.folder.build,
            imageExtensions: cfg.imageExtensions,
            browserSync: browserSync,
            deleteFile: deleteFile,
            tasks: {
                buildSassFiles: cfg.task.buildSassFiles,
                buildCustomJs: cfg.task.buildCustomJs,
                buildSass: cfg.task.buildSass,
                esLint: cfg.task.esLint,
                jsHint: cfg.task.jsHint,
                sassLint: cfg.task.sassLint,
                fileInclude: cfg.task.fileInclude,
                htmlHint: cfg.task.htmlHint,
                imageMin: cfg.task.imageMin
            }
        },
        false
    );

    /**
     * 기본 Gulp 작업
     */
    gulp.task(
        "default",
        gulp.series(
            cfg.task.cleanBuild,
            gulp.parallel(
                cfg.task.buildCustomJs,
                cfg.task.buildJsVendors,
                cfg.task.buildSass,
                cfg.task.buildSassFiles,
                cfg.task.buildStylesVendors,
                cfg.task.fileInclude,
                cfg.task.htmlHint,
                cfg.task.esLint,
                cfg.task.jsHint,
                cfg.task.sassLint,
                cfg.task.imageMin
            ),
            cfg.task.copyFolders,
            gulp.parallel(cfg.task.browserSync, cfg.task.watch)
        )
    );

    /**
     * browserSync를 사용하지 않는 Dev Gulp 작업
     */
    gulp.task(
        "dev",
        gulp.series(
            cfg.task.cleanBuild,
            gulp.parallel(
                cfg.task.buildCustomJs,
                cfg.task.buildJsVendors,
                cfg.task.buildSass,
                cfg.task.buildSassFiles,
                cfg.task.buildStylesVendors,
                cfg.task.fileInclude,
                cfg.task.htmlHint,
                cfg.task.imageMin
            ),
            cfg.task.copyFolders,
            cfg.task.watch
        )
    );

    /**
     * 불필요한 파일없이 프로덕션 폴더 생성
     */
    gulp.task(
        "production",
        gulp.series(
            gulp.parallel(cfg.task.cleanProd, cfg.task.cleanBuild),
            gulp.parallel(
                cfg.task.buildCustomJs,
                cfg.task.buildJsVendors,
                cfg.task.buildSassProd,
                cfg.task.buildSassFiles,
                cfg.task.buildStylesVendors,
                cfg.task.fileInclude,
                cfg.task.htmlHint,
                cfg.task.esLint,
                cfg.task.jsHint,
                cfg.task.sassLint,
                cfg.task.imageMin
            ),
            cfg.task.copyFolders,
            cfg.task.copyFoldersProduction
        ),
        true
    );

    /**
     * 해당 이미지가 소스 폴더에서 삭제된 경우 빌드 폴더에서 이미지 제거
     * @param  {Object} event    이벤트 객체
     * @param  {String} src      소스 폴더의 이름
     * @param  {String} dest     대상 폴더의 이름
     */
    function deleteFile(file, src, dest) {
        let fileName = file.path
            .toString()
            .split("/")
            .pop();
        let fileEventWord = file.event == "unlink" ? "deleted" : file.event;

        let filePathFromSrc = path.relative(path.resolve(src), file.path);
        let destFilePath = path.resolve(dest, filePathFromSrc);

        try {
            del.sync(destFilePath);
            console.log(` \u{1b}[32m${fileEventWord}: ${fileName}\u{1b}[0m`);
        } catch (error) {
            console.log(` \u{1b}[31mFile has already deleted\u{1b}[0m`);
        }
    }

    /**
     * 콘솔에 오류 표시
     * @param  {String} preffix 오류의 제목
     * @param  {String} err     에러 메시지
     */
    function showError(preffix, err) {
        gutil.log(
            gutil.colors.white.bgRed(" " + preffix + " "),
            gutil.colors.white.bgBlue(" " + err.message + " ")
        );
        notifier.notify({
            title: preffix,
            message: err.message
        });
        this.emit("end");
    }
})();
