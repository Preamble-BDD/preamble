"use strict";
var StackTrace_1 = require("../stacktrace/StackTrace");
var stackTrace = new StackTrace_1.StackTrace();
function throwException(errMessage) {
    throw new Error(errMessage);
}
function expect(actual) {
    if (arguments.length !== 1) {
        throwException("\"expect\" requires 1 argument, found " + arguments.length);
    }
    if (typeof (actual) === "function" && !("_snoopsterMaker" in actual)) {
        actual();
    }
}
exports.expect = expect;
//# sourceMappingURL=expectations.js.map