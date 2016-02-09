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
    return QueueManager;
}());
exports.QueueManager = QueueManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVldWVNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvcXVldWUvUXVldWVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFjQTtJQUVJLHNCQUFvQixhQUFxQixFQUFVLGdCQUF3QixFQUFVLENBQVc7UUFBNUUsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFBVSxNQUFDLEdBQUQsQ0FBQyxDQUFVO0lBQTBCLENBQUM7SUFDM0gsMEJBQUcsR0FBSDtRQUFBLGlCQXNCQztRQXJCRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBa0IsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBVyxDQUFDLENBQUM7UUFDM0IsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO3dCQUMxQyxRQUFRLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUM5RixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBeEJNLGtCQUFLLEdBQVMsRUFBRSxDQUFDO0lBeUI1QixtQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksb0JBQVksZUEwQnhCLENBQUEifQ==