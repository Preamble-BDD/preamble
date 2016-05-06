"use strict";
var BeforeEach_1 = require("../queue/BeforeEach");
var callstack_1 = require("./callstack");
var StackTrace_1 = require("../stacktrace/StackTrace");
exports.beforeEach = function (callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _beforeEach;
    if (arguments.length !== 1 && arguments.length !== 2) {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "function") {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    if (arguments.length === 2 && typeof (arguments[1]) !== "number") {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    // a BeforeEach object
    _beforeEach = new BeforeEach_1.BeforeEach(callstack_1.callStack.getTopOfStack(), callstack_1.callStack.uniqueId.toString(), callback, timeoutInterval, StackTrace_1.stackTrace.stackTrace);
    // add it to its parent describe
    callstack_1.callStack.getTopOfStack().beforeEach = _beforeEach;
};
