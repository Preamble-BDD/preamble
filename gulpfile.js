"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var vinylSource = require("vinyl-source-stream");
var ts = require("gulp-typescript");
var merge = require("merge2");
var watchedFiles = ["src/**/*.ts", "spec/**/*.ts"];
var destFolder = "./dist";
var batch = require("gulp-batch");
var spawn = require("child_process").spawnSync;
var testExitCode = 0;

/**
 * Watch files for changes
 * batch calls its callback only once, after all chaged events have fired.
 * So even if 2 or more files are changed, callback is only called once.
 */
gulp.task("watch", function () {
  var watcher = gulp.watch(watchedFiles, batch(function(events, done) {
      gulp.start("test");
      // call done to signal this task is finished
      done();
  }));

  watcher.on("change", function(event) {
    console.log("File " + event.path + " was " + event.type + ", running tasks...");
  });
});

/**
 * delete the  dist/ folder
 */
gulp.task("clean", function () {
  spawn ("rm", ["-rf", destFolder], {
    stdio: "inherit"
  });
});

/**
 * Compile the typescript project into dist/ to generate the .js and .d.ts files
 */
gulp.task("typescript", ["clean"], function() {
    var tsProject = ts.createProject("tsconfig.json", {
        declaration: true,
        typescript: require("typescript")
    });
    var tsResult = tsProject.src()
    .pipe(ts(tsProject));
    return merge([
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

    // and output bundle preamble-ts.js to ./dist
    return b.bundle()
    .pipe(vinylSource("preamble-ts.js"))
    .pipe(gulp.dest("./dist/"));
});

/**
 * run the sanity test
 */
gulp.task("test", ["bundle"], function () {
  var test = spawn ("preamble", ["-s", "./dist/test/sanitycheck.js", "-n", "Sanity Check Suite"], {
    stdio: "inherit"
  });
  testExitCode = test.status;
  console.log("test exited with a code of", test.status);
  return test;
});

/**
 * copyfiles
 *  copy dist/preamble-ts.js to standalone
 */
 gulp.task("copyfiles", ["test"], function () {
   if (!testExitCode) {
     // copy bundle to standaone
     spawn ("cp", ["./dist/preamble-ts.js", "../preamble-ts-standalone/dist/core"], {
       stdio: "inherit"
     });
     console.log("copied ./dist/preamble-ts.js to ../preamble-ts-standalone/dist/core");
   } else {
     console.log("prod not run due to test exit code!");
   }
 });

/**
 * npm link this package
 */
gulp.task("link", function () {
  spawn ("npm", ["link"], {
    stdio: "inherit"
  });
});

/**
 * npm unlink this package
 */
gulp.task("unlink", function () {
  spawn ("npm", ["unlink"], {
    stdio: "inherit"
  });
});

/**
 * default task i.e. $ gulp
 */
gulp.task("default", ["watch"]);

/**
 * prod task
 */
 gulp.task("prod", ["copyfiles"]);
