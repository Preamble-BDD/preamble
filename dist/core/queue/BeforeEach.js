"use strict";
var BeforeEach = (function () {
    function BeforeEach(id, callback, timeoutInterval) {
        this.id = id;
        this.callback = callback;
        this.timeoutInterval = timeoutInterval;
    }
    return BeforeEach;
}());
exports.BeforeEach = BeforeEach;
//# sourceMappingURL=BeforeEach.js.map