"use strict";
var It = (function () {
    function It(id, label, callback, excluded, timeoutInterval) {
        if (excluded === void 0) { excluded = false; }
        this.id = id;
        this.label = label;
        this.callback = callback;
        this.excluded = excluded;
        this.timeoutInterval = timeoutInterval;
        this.expectations = [];
        this.scope = {};
    }
    return It;
}());
exports.It = It;
//# sourceMappingURL=It.js.map