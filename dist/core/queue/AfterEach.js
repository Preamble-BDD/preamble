"use strict";
var AfterEach = (function () {
    function AfterEach(parent, id, callback, timeoutInterval, callStack) {
        this.parent = parent;
        this.id = id;
        this.callback = callback;
        this.timeoutInterval = timeoutInterval;
        this.callStack = callStack;
    }
    return AfterEach;
}());
exports.AfterEach = AfterEach;
