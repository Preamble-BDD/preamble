"use strict";
var BeforeEach = (function () {
    function BeforeEach(parent, id, callback, timeoutInterval) {
        this.parent = parent;
        this.id = id;
        this.callback = callback;
        this.timeoutInterval = timeoutInterval;
    }
    return BeforeEach;
}());
exports.BeforeEach = BeforeEach;
