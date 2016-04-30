"use strict";
var It_1 = require("../queue/It");
var callstack_1 = require("./callstack");
var QueueManager_1 = require("../queue/QueueManager");
var StackTrace_1 = require("../stacktrace/StackTrace");
exports.xit = function (label, callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _it;
    if (arguments.length !== 2 && arguments.length !== 3) {
        throw new TypeError("it called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    if (arguments.length === 3 && typeof (arguments[2]) !== "number") {
        throw new TypeError("it called with invalid parameters");
    }
    // an It object
    _it = new It_1.It(callstack_1.callStack.getTopOfStack(), callstack_1.callStack.uniqueId.toString(), label, callback, true, timeoutInterval, StackTrace_1.stackTrace.stackTrace);
    // push Describe onto the queue
    QueueManager_1.QueueManager.queue.push(_it);
    // Increment totIts count
    QueueManager_1.QueueManager.bumpTotItsCount();
    // Increment totExclIts count
    QueueManager_1.QueueManager.bumpTotExcItsCount();
};
