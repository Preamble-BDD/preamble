"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var vinylSource = require("vinyl-source-stream");
var watcher = gulp.watch("src/**/*.ts", ["bundle"]);

watcher.on("change", function(event) {
  console.log("File " + event.path + " was " + event.type + ", running tasks...");
});

gulp.task("bundle", function () {
    return browserify("dist/src/main.js", "debug")
    .bundle()
    .pipe(vinylSource("preamble-ts.js"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("default", ["bundle"]);
