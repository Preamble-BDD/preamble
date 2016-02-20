"use strict";
var It_1 = require("./It");
var QueueRunner = (function () {
    function QueueRunner(queue, configTimeoutInterval, Q) {
        this.queue = queue;
        this.configTimeoutInterval = configTimeoutInterval;
        this.Q = Q;
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
    QueueRunner.prototype.run = function () {
        var deferred = this.Q.defer();
        var timeoutInterval;
        var item;
        setTimeout(function () {
            var _loop_1 = function(i) {
                var describe = this_1.queue[i];
                for (var ii = 0; ii < describe.items.length; ii++) {
                    item = describe.items[ii];
                    if (item instanceof It_1.It) {
                        console.log("item instance of It");
                        if (describe.beforeEach) {
                            timeoutInterval = describe.beforeEach.timeoutInterval > 0 &&
                                describe.beforeEach.timeoutInterval || this_1.configTimeoutInterval;
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
            for (var i = 0; i < this.queue.length; i++) {
                _loop_1(i);
            }
        }, 1);
        return deferred.promise;
    };
    return QueueRunner;
}());
exports.QueueRunner = QueueRunner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVldWVSdW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9xdWV1ZS9RdWV1ZVJ1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsbUJBQWlCLE1BQU0sQ0FBQyxDQUFBO0FBR3hCO0lBQ0kscUJBQW9CLEtBQWtCLEVBQVUscUJBQTZCLEVBQVUsQ0FBVztRQUE5RSxVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQVUsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFRO1FBQVUsTUFBQyxHQUFELENBQUMsQ0FBVTtJQUFJLENBQUM7SUFVdkcsb0NBQWMsR0FBZCxVQUFlLEVBQThCLEVBQUUsRUFBVSxFQUFFLE9BQVc7UUFDbEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQWtCLENBQUM7UUFDOUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUlyQixJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNiLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLFFBQVEsQ0FBQyxNQUFNLENBQ1gsSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FDdkQsQ0FBQztZQUNOLENBQUM7UUFDTCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFJUCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUVaLFVBQVUsQ0FBQztnQkFDUCxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ1osWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUNqQixRQUFRLENBQUMsT0FBTyxF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