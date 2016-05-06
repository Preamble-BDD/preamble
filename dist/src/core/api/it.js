"use strict";
var It_1 = require("../queue/It");
var callstack_1 = require("./callstack");
var QueueManager_1 = require("../queue/QueueManager");
var StackTrace_1 = require("../stacktrace/StackTrace");
exports.it = function (label, callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _it;
    var excluded;
    if (arguments.length !== 2 && arguments.length !== 3) {
        throw new TypeError("it called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    if (arguments.length === 3 && typeof (arguments[2]) !== "number") {
        throw new TypeError("it called with invalid parameters");
    }
    // mark the It excluded if any of its parents are excluded
    excluded = callstack_1.callStack.stack.some(function (item) {
        return item.excluded;
    });
    // an It object
    _it = new It_1.It(callstack_1.callStack.getTopOfStack(), callstack_1.callStack.uniqueId.toString(), label, callback, excluded, timeoutInterval, StackTrace_1.stackTrace.stackTrace);
    // push It onto the queue
    QueueManager_1.QueueManager.queue.push(_it);
    // increment totIts count
    QueueManager_1.QueueManager.bumpTotItsCount();
    // increment total excluded Its if excluded
    if (excluded) {
        QueueManager_1.QueueManager.bumpTotExcItsCount();
    }
};
//# sourceMappingURL=it.js.map