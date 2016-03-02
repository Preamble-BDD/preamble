"use strict";
var callstack_1 = require("./callstack");
var Describe_1 = require("../queue/Describe");
var QueueManager_1 = require("../queue/QueueManager");
var cs = callstack_1.callStack;
function describe(label, callback) {
    var _describe;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("describe called with invalid parameters");
    }
    _describe = new Describe_1.Describe(cs.uniqueId.toString(), label, callback, cs.length && cs.getTopOfStack() || null, cs.length && cs.getTopOfStack().excluded || false);
    if (cs.length === 0) {
        QueueManager_1.QueueManager.queue.push(_describe);
    }
    else {
        cs.getTopOfStack().items.push(_describe);
    }
    cs.pushDescribe(_describe);
    try {
        _describe.callback.call(_describe.context);
    }
    catch (error) {
        console.log(error);
        alert("Error caught when calling Describe callback. See console for more information");
        throw new Error("Terminating test!");
    }
    cs.popDescribe();
    if (cs.length === 0) {
        console.log("QueueManager queue", QueueManager_1.QueueManager.queue);
    }
}
exports.describe = describe;
//# sourceMappingURL=describe.js.map