"use strict";
var hierarchy_1 = require("./hierarchy");
/**
* returns an It ancestor hierarchy
*/
var It = (function () {
    function It(parent, id, label, callback, excluded, timeoutInterval, callStack) {
        if (excluded === void 0) { excluded = false; }
        this.parent = parent;
        this.id = id;
        this.label = label;
        this.callback = callback;
        this.excluded = excluded;
        this.timeoutInterval = timeoutInterval;
        this.callStack = callStack;
        this.expectations = [];
        this.scope = {};
        this.isA = "It";
        this.passed = true;
        this.hierarchy = hierarchy_1.ancestorHierarchy(parent);
        this.reasons = [];
    }
    return It;
}());
exports.It = It;
