/**
 * QueueManager
 * Periodically checks the length of the queue.
 * If it remains stable over a period of time it
 * signals that the queue is ready to be processed.
 */
"use strict";
;
;
var QueueManager = (function () {
    function QueueManager(timerInterval, stableRetryCount, Q /** see Note above */) {
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
            // console.log("QueueManager checking queue length stability");
            if (QueueManager.queue.length === prevCount) {
                retryCount++;
                if (retryCount > _this.stableRetryCount) {
                    clearInterval(intervalId);
                    if (QueueManager.queue.length === 0) {
                        deferred.reject(new Error("Nothing to test!"));
                    }
                    else {
                        // console.log("QueueManager queue stable.");
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
    QueueManager.startTimer = function () {
        QueueManager.queueManagerStats.timeKeeper.startTime = Date.now();
    };
    QueueManager.stopTimer = function () {
        QueueManager.queueManagerStats.timeKeeper.endTime = Date.now();
        QueueManager.queueManagerStats.timeKeeper.totTime =
            QueueManager.queueManagerStats.timeKeeper.endTime -
                QueueManager.queueManagerStats.timeKeeper.startTime;
    };
    QueueManager.bumpTotDescribesCount = function () {
        QueueManager.queueManagerStats.totDescribes++;
    };
    QueueManager.bumpTotExcDescribesCount = function () {
        QueueManager.queueManagerStats.totExcDescribes++;
    };
    QueueManager.bumpTotItsCount = function () {
        QueueManager.queueManagerStats.totIts++;
    };
    QueueManager.bumpTotExcItsCount = function () {
        QueueManager.queueManagerStats.totExcIts++;
    };
    QueueManager.bumpTotFailedItsCount = function () {
        QueueManager.queueManagerStats.totFailedIts++;
    };
    QueueManager.queue = [];
    QueueManager.queueManagerStats = {
        totDescribes: 0,
        totExcDescribes: 0,
        totIts: 0,
        totExcIts: 0,
        totFailedIts: 0,
        timeKeeper: {
            startTime: 0,
            endTime: 0,
            totTime: 0
        }
    };
    return QueueManager;
}());
exports.QueueManager = QueueManager;
//# sourceMappingURL=QueueManager.js.map