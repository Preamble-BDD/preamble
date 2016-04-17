# Preamble-ts
An environment neutral JavaScript BDD testing framework written using TypeScript. Supports writing test suites using TypeScript.

This is not your father's Preamble. Preamble-ts is a complete rewrite of the old but now it is written in TypeScript. Out with the old and in with the new!

Want to run your tests in the browser? Then download or clone the [Preamble-Standalone](https://github.com/Preamble-BDD/standalone), which includes everything you need to author and run your tests, all wrapped up in one tidy repo:

* SpecRunner.html - a spec runner html file
* dist/core/matchers/preamble-matchers.js - the default matchers via a matchers plugin
* dist/core/htmlReporter/htmlReport.js - the default html reporter via a reporter plugin

In addition to the above, Standalone also includes two additional files:

* specs/suite.ts, which is provided for your convenience for authoring your own test suites.
* specs/sanitycheck.ts, which is the test suite that is used to test Preamble-ts itself. It also serves as a reference to the APIs that are available for authoring your own test suites.

If you are looking for earlier releases of Preamble, please go to [https://github.com/jeffschwartz/preamble](https://github.com/jeffschwartz/preamble)
