"use strict";
var It = (function () {
    function It(parent, id, label, callback, excluded, timeoutInterval) {
        if (excluded === void 0) { excluded = false; }
        this.parent = parent;
        this.id = id;
        this.label = label;
        this.callback = callback;
        this.excluded = excluded;
        this.timeoutInterval = timeoutInterval;
        this.expectations = [];
        this.scope = {};
        this.isA = "It";
    }
    return It;
}());
exports.It = It;
