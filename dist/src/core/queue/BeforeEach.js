"use strict";
var BeforeEach = (function () {
    function BeforeEach(parent, id, callback, timeoutInterval, callStack) {
        this.parent = parent;
        this.id = id;
        this.callback = callback;
        this.timeoutInterval = timeoutInterval;
        this.callStack = callStack;
    }
    return BeforeEach;
}());
exports.BeforeEach = BeforeEach;
//# sourceMappingURL=BeforeEach.js.map