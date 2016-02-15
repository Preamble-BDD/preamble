"use strict";
var It_1 = require("./It");
var configuration_1 = require("../configuration/configuration");
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
    QueueManager.prototype.runBeforeAfter = function (fn, ms, context) {
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
    QueueManager.prototype.runTests = function () {
        var deferred = this.Q.defer();
        var timeoutInterval;
        var item;
        var _loop_1 = function(i) {
            var describe = QueueManager.queue[i];
            for (var ii = 0; ii < describe.items.length; ii++) {
                item = describe.items[ii];
                if (item instanceof It_1.It) {
                    console.log("item instance of It");
                    if (describe.beforeEach) {
                        timeoutInterval = describe.beforeEach.timeoutInterval > 0 &&
                            describe.beforeEach.timeoutInterval || configuration_1.configuration.timeoutInterval;
                        this_1.runBeforeAfter(describe.beforeEach.callback, timeoutInterval, describe.context)
                            .then(function () {
                            console.log("runBeforeAfter success!");
                            console.log("describe.context", describe.context);
                        }, function (err) {
                            console.log("runBeforeAfter failed!");
                            console.log(err.message);
                        });
                    }
                }
                else {
                    console.log("item instance of Describe");
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < QueueManager.length; i++) {
            _loop_1(i);
        }
        return deferred.promise;
    };
    QueueManager.queue = [];
    QueueManager.totIts = 0;
    QueueManager.totExclIts = 0;
    return QueueManager;
}());
exports.QueueManager = QueueManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVldWVNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvcXVldWUvUXVldWVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFlQSxtQkFBaUIsTUFBTSxDQUFDLENBQUE7QUFHeEIsOEJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFFN0Q7SUFJSSxzQkFBb0IsYUFBcUIsRUFBVSxnQkFBd0IsRUFBVSxDQUFXO1FBQTVFLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1FBQVUsTUFBQyxHQUFELENBQUMsQ0FBVTtJQUEwQixDQUFDO0lBQzNILDBCQUFHLEdBQUg7UUFBQSxpQkFzQkM7UUFyQkcsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQWtCLENBQUM7UUFDOUMsSUFBSSxVQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztRQUMxQixJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQzVELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLFVBQVUsRUFBRSxDQUFDO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzFCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQzt3QkFDMUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDOUYsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQVVELHFDQUFjLEdBQWQsVUFBZSxFQUE4QixFQUFFLEVBQVUsRUFBRSxPQUFXO1FBQ2xFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFrQixDQUFDO1FBQzlDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFJckIsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDYixRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixRQUFRLENBQUMsTUFBTSxDQUNYLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQ3ZELENBQUM7WUFDTixDQUFDO1FBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSVAsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFWixVQUFVLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNaLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDakIsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN2QixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosVUFBVSxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDWixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RCLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQztZQUNMLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUM7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBQ0QsK0JBQVEsR0FBUjtRQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFrQixDQUFDO1FBQzlDLElBQUksZUFBdUIsQ0FBQztRQUM1QixJQUFJLElBQVMsQ0FBQztRQUNkLDBCQUE4QyxDQUFDO1lBQzNDLElBQUksUUFBUSxHQUFjLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNoRCxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLE9BQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDbkMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLGVBQWUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxDQUFDOzRCQUNyRCxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsSUFBSSw2QkFBYSxDQUFDLGVBQWUsQ0FBQzt3QkFDekUsTUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQzs2QkFDL0UsSUFBSSxDQUFDOzRCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQzs0QkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RELENBQUMsRUFBRSxVQUFTLEdBQVU7NEJBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQzs0QkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzdCLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQzs7UUF0QkQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTs7U0FzQjNDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQTNHTSxrQkFBSyxHQUFnQixFQUFFLENBQUM7SUFDeEIsbUJBQU0sR0FBVyxDQUFDLENBQUM7SUFDbkIsdUJBQVUsR0FBVyxDQUFDLENBQUM7SUEwR2xDLG1CQUFDO0FBQUQsQ0FBQyxBQTdHRCxJQTZHQztBQTdHWSxvQkFBWSxlQTZHeEIsQ0FBQSJ9