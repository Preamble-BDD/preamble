"use strict";
var AfterEach_1 = require("../queue/AfterEach");
var callstack_1 = require("./callstack");
var StackTrace_1 = require("../stacktrace/StackTrace");
exports.afterEach = function (callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _afterEach;
    if (arguments.length !== 1 && arguments.length !== 2) {
        throw new TypeError("afterEach called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "function") {
        throw new TypeError("afterEach called with invalid parameters");
    }
    if (arguments.length === 2 && typeof (arguments[1]) !== "number") {
        throw new TypeError("afterEach called with invalid parameters");
    }
    // an AfterEach object
    _afterEach = new AfterEach_1.AfterEach(callstack_1.callStack.getTopOfStack(), callstack_1.callStack.uniqueId.toString(), callback, timeoutInterval, StackTrace_1.stackTrace.stackTrace);
    // add it to its parent describe
    callstack_1.callStack.getTopOfStack().afterEach = _afterEach;
};
