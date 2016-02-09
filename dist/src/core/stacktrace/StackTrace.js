"use strict";
var StackTrace = (function () {
    function StackTrace() {
        try {
            throw new Error("testing for stack or stacktrace");
        }
        catch (error) {
            this.stackTraceProperty = error.stack ? "stack" : error.stacktrace ?
                "stacktrace" : undefined;
        }
    }
    StackTrace.prototype.filterstackTrace = function (st) {
        var reFileFromStackTrace = /file:\/\/\/\S+\.js:[0-9]+[:0-9]*/g;
        var matches = st.match(reFileFromStackTrace);
        return matches.filter(function (el) {
            return el.search(/preamble.js/) === -1;
        });
    };
    StackTrace.prototype.stackTraceFromError = function () {
        var stackTrace = null;
        if (this.stackTraceProperty) {
            try {
                throw new Error();
            }
            catch (error) {
                stackTrace = error[this.stackTraceProperty];
            }
        }
        return stackTrace;
    };
    Object.defineProperty(StackTrace.prototype, "stackTrace", {
        get: function () {
            var st;
            var flt = null;
            st = this.stackTraceFromError();
            if (st) {
                flt = this.filterstackTrace(st);
            }
            return flt;
        },
        enumerable: true,
        configurable: true
    });
    return StackTrace;
}());
exports.StackTrace = StackTrace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tUcmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3N0YWNrdHJhY2UvU3RhY2tUcmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFFSTtRQUVJLElBQUksQ0FBQztZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUN2RCxDQUFFO1FBQUEsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBVTtnQkFDOUQsWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFnQixHQUFoQixVQUFpQixFQUFFO1FBQ2YsSUFBSSxvQkFBb0IsR0FBRyxtQ0FBbUMsQ0FBQztRQUUvRCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBUyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELHdDQUFtQixHQUFuQjtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoRCxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUNELHNCQUFJLGtDQUFVO2FBQWQ7WUFDSSxJQUFJLEVBQVUsQ0FBQztZQUNmLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQztZQUN6QixFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTCxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQzs7O09BQUE7SUFDTCxpQkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksa0JBQVUsYUF5Q3RCLENBQUEifQ==