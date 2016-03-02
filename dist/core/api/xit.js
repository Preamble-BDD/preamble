"use strict";
var callstack_1 = require("./callstack");
var It_1 = require("../queue/It");
var QueueManager_1 = require("../queue/QueueManager");
var cs = callstack_1.callStack;
function xit(label, callback, timeoutInterval) {
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
    _it = new It_1.It(cs.uniqueId.toString(), label, callback, true, timeoutInterval);
    cs.getTopOfStack().items.push(_it);
    QueueManager_1.QueueManager.totIts++;
    QueueManager_1.QueueManager.totExclIts++;
}
exports.xit = xit;
//# sourceMappingURL=xit.js.map