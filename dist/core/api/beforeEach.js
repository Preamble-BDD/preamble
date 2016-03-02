"use strict";
var BeforeEach_1 = require("../queue/BeforeEach");
var callstack_1 = require("./callstack");
var cs = callstack_1.callStack;
function beforeEach(callback, timeoutInterval) {
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
    _beforeEach = new BeforeEach_1.BeforeEach(cs.uniqueId.toString(), callback, timeoutInterval);
    cs.getTopOfStack().beforeEach = _beforeEach;
}
exports.beforeEach = beforeEach;
//# sourceMappingURL=beforeEach.js.map