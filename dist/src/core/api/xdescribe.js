"use strict";
var callstack_1 = require("./callstack");
var Describe_1 = require("../queue/Describe");
var QueueManager_1 = require("../queue/QueueManager");
exports.xdescribe = function (label, callback) {
    var _describe;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("describe called with invalid parameters");
    }
    // a Description object
    _describe = new Describe_1.Describe(callstack_1.callStack.uniqueId.toString(), label, callback, callstack_1.callStack.length && callstack_1.callStack.getTopOfStack() || null, true);
    // push Describe onto the queue
    QueueManager_1.QueueManager.queue.push(_describe);
    // increment totDescribes count
    QueueManager_1.QueueManager.bumpTotDescribesCount();
    // increment totExcDescribes count
    QueueManager_1.QueueManager.bumpTotExcDescribesCount();
    // push Describe object onto the callstack
    callstack_1.callStack.pushDescribe(_describe);
    // call callback to register the beforeEach, afterEach, it and describe calls
    try {
        _describe.callback();
    }
    catch (error) {
        // TODO(js): this should be reported
        throw new Error(error.message);
    }
    // pop Describe object off of the callstack
    callstack_1.callStack.popDescribe();
};
//# sourceMappingURL=xdescribe.js.map