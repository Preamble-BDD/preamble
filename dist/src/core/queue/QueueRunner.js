"use strict";
var It_1 = require("./It");
var QueueRunner = (function () {
    function QueueRunner(queue, configTimeoutInterval, Q, callStack) {
        this.queue = queue;
        this.configTimeoutInterval = configTimeoutInterval;
        this.Q = Q;
        this.callStack = callStack;
    }
    QueueRunner.prototype.runBeforeAfter = function (fn, ms, context) {
        var deferred = this.Q.defer();
        var completed = false;
        var timedOut = false;
        var timerId = setTimeout(function () {
            if (!completed) {
                timedOut = true;
                deferred.reject(new Error("Function failed to complete within {ms}"));
            }
        }, ms);
        if (fn.length) {
            setTimeout(function () {
                fn.call(context, function () {
                    if (!timedOut) {
                        clearTimeout(timerId);
                        completed = true;
                        deferred.resolve();
                    }
                });
            }, 1);
        }
        else {
            setTimeout(function () {
                fn.call(context);
                if (!timedOut) {
                    clearTimeout(timerId);
                    completed = true;
                    deferred.resolve();
                }
            }, 1);
        }
        return deferred.promise;
    };
    QueueRunner.prototype.runIt = function (it, beforeEach, afterEach, context) {
        var _this = this;
        var deferred = this.Q.defer();
        var timeoutInterval;
        setTimeout(function () {
            if (beforeEach) {
                timeoutInterval = beforeEach.timeoutInterval > 0 &&
                    beforeEach.timeoutInterval || _this.configTimeoutInterval;
                _this.runBeforeAfter(beforeEach.callback, timeoutInterval, context)
                    .then(function () {
                    console.log("runBeforeAfter success!");
                    console.log("describe.context", context);
                }, function (err) {
                    console.log("runBeforeAfter failed!");
                    console.log(err.message);
                });
            }
        }, 1);
        return deferred.promise;
    };
    QueueRunner.prototype.runDescribe = function (describe) {
        var _this = this;
        var deferred = this.Q.defer();
        var timeoutInterval;
        var item;
        setTimeout(function () {
            for (var i = 0; i < describe.items.length; i++) {
                item = describe.items[i];
                if (item instanceof It_1.It) {
                    console.log("item instance of It");
                    _this.runIt(item, describe.beforeEach, describe.afterEach, describe.context);
                }
                else {
                    console.log("item instance of Describe");
                }
            }
        }, 1);
        return deferred.promise;
    };
    QueueRunner.prototype.run = function () {
        var _this = this;
        var deferred = this.Q.defer();
        var timeoutInterval;
        var item;
        setTimeout(function () {
            for (var i = 0; i < _this.queue.length; i++) {
                _this.runDescribe(_this.queue[i]);
            }
        }, 1);
        return deferred.promise;
    };
    return QueueRunner;
}());
exports.QueueRunner = QueueRunner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVldWVSdW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9xdWV1ZS9RdWV1ZVJ1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBU0EsbUJBQWlCLE1BQU0sQ0FBQyxDQUFBO0FBSXhCO0lBQ0kscUJBQW9CLEtBQWtCLEVBQVUscUJBQTZCLEVBQ2pFLENBQVcsRUFBVSxTQUFxQjtRQURsQyxVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQVUsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFRO1FBQ2pFLE1BQUMsR0FBRCxDQUFDLENBQVU7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQUksQ0FBQztJQVUzRCxvQ0FBYyxHQUFkLFVBQWUsRUFBOEIsRUFBRSxFQUFVLEVBQUUsT0FBVztRQUNsRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBa0IsQ0FBQztRQUM5QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBSXJCLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDaEIsUUFBUSxDQUFDLE1BQU0sQ0FDWCxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUN2RCxDQUFDO1lBQ04sQ0FBQztRQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUlQLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRVosVUFBVSxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDWixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RCLFNBQVMs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