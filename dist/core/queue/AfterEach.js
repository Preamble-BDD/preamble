"use strict";
var AfterEach = (function () {
    function AfterEach(parent, id, callback, timeoutInterval) {
        this.parent = parent;
        this.id = id;
        this.callback = callback;
        this.timeoutInterval = timeoutInterval;
    }
    return AfterEach;
}());
exports.AfterEach = AfterEach;
//# sourceMappingURL=AfterEach.js.map