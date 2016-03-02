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
//# sourceMappingURL=StackTrace.js.map