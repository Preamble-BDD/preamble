"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var vinylSource = require("vinyl-source-stream");
var watcher = gulp.watch(["dist/**/*.js", "!dist/preamble-ts.js"], ["bundle"]);

watcher.on("change", function(event) {
  console.log("File " + event.path + " was " + event.type + ", running tasks...");
});

gulp.task("bundle", function () {
    // run browserify passing the entry point
    var b = browserify("dist/main.js");

    // generate a named external require
    b.require("./dist/main.js", {expose: "main"});

    // and output bundle names preamble-ts.js to ./dist
    b.bundle()
    .pipe(vinylSource("preamble-ts.js"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("default", ["bundle"]);
