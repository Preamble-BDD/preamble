"use strict";
var QueueManager = (function () {
    function QueueManager(timerInterval, stableRetryCount, Q) {
        this.timerInterval = timerInterval;
        this.stableRetryCount = stableRetryCount;
        this.Q = Q;
    }
    QueueManager.prototype.run = function () {
        var _this = this;
        var deferred = this.Q.defer();
        var retryCount = 0;
        var prevCount = 0;
        var intervalId = setInterval(function () {
            console.log("QueueManager checking queue length stability");
            if (QueueManager.queue.length === prevCount) {
                retryCount++;
                if (retryCount > _this.stableRetryCount) {
                    clearInterval(intervalId);
                    if (QueueManager.queue.length === 0) {
                        deferred.reject(new Error("Nothing to test!"));
                    }
                    else {
                        console.log("QueueManager queue stable.");
                        deferred.resolve("QueueManager.queue loaded. Count = " + QueueManager.queue.length + ".");
                    }
                }
            }
            else if (QueueManager.queue.length > prevCount) {
                prevCount = QueueManager.queue.length;
            }
        }, this.timerInterval);
        return deferred.promise;
    };
    QueueManager.queue = [];
    QueueManager.totIts = 0;
    QueueManager.totExclIts = 0;
    return QueueManager;
}());
exports.QueueManager = QueueManager;
//# sourceMappingURL=QueueManager.js.map