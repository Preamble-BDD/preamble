"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var vinylSource = require("vinyl-source-stream");
var ts = require("gulp-typescript");
var merge = require("merge2");
var watchedFiles = ["src/**/*.ts", "spec/**/*.ts"];
var batch = require("gulp-batch");

/**
 * batch calls its callback only once, after all chaged events have fired.
 * So even if 2 or more files are changed, callback is only called once.
 */
var watcher = gulp.watch(watchedFiles, batch(function(events, done) {
    // running the bundle task will cause the typescript task
    // to run first/ because it is a dependency of the bundle task
    gulp.start("bundle");
    // call done to signal this task is finished
    done();
}));

watcher.on("change", function(event) {
  console.log("File " + event.path + " was " + event.type + ", running tasks...");
});

/**
 * Compile the typescript project into dist/ to generate the .js and .d.ts files
 */
gulp.task("typescript", function() {
    var tsProject = ts.createProject("tsconfig.json", {
        declaration: true,
        typescript: require("typescript")
    });
    var tsResult = tsProject.src()
    .pipe(ts(tsProject));
    merge([
        tsResult.dts.pipe(gulp.dest("dist")),
        tsResult.js.pipe(gulp.dest("dist"))
    ]);
});

/**
 * Generate a browserify bundle in dist/
 */
gulp.task("bundle", ["typescript"], function () {
    // run browserify passing the entry point
    var b = browserify("dist/main.js");

    // generate a named external require
    b.require("./dist/main.js", {expose: "main"});

    // and output bundle names preamble-ts.js to ./dist
    b.bundle()
    .pipe(vinylSource("preamble-ts.js"))
    .pipe(gulp.dest("./dist/"));
});

/**
 * default task i.e. $ gulp
 */
gulp.task("default", ["typescript"]);
