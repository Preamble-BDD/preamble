"use strict";
var AfterEach = (function () {
    function AfterEach(id, callback, timeoutInterval) {
        this.id = id;
        this.callback = callback;
        this.timeoutInterval = timeoutInterval;
    }
    return AfterEach;
}());
exports.AfterEach = AfterEach;
//# sourceMappingURL=AfterEach.js.map