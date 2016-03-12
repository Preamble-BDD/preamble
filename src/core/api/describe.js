"use strict";
var callstack_1 = require("./callstack");
var Describe_1 = require("../queue/Describe");
var QueueManager_1 = require("../queue/QueueManager");
function describe(label, callback) {
    var _describe;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("describe called with invalid parameters");
    }
    _describe = new Describe_1.Describe(callstack_1.callStack.uniqueId.toString(), label, callback, callstack_1.callStack.length && callstack_1.callStack.getTopOfStack() || null, callstack_1.callStack.length && callstack_1.callStack.getTopOfStack().excluded || false);
    QueueManager_1.QueueManager.queue.push(_describe);
    callstack_1.callStack.pushDescribe(_describe);
    try {
        _describe.callback();
    }
    catch (error) {
        console.log(error);
        alert("Error caught when calling Describe callback. See console for more information");
        throw new Error("Terminating test!");
    }
    callstack_1.callStack.popDescribe();
}
exports.describe = describe;
