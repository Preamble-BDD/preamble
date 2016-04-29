"use strict";
var StackTrace = (function () {
    function StackTrace() {
        // determine the Error object's stack trace property
        try {
            throw new Error("testing for stack or stacktrace");
        }
        catch (error) {
            this.stackTraceProperty = error.stack ? "stack" : error.stacktrace ?
                "stacktrace" : undefined;
        }
    }
    // TODO(JS): might not want to do this and instead might want to
    // include references to preamble.js or even make it configurable
    StackTrace.prototype.filterstackTrace = function (st) {
        var reFileFromStackTrace = /file:\/\/\/\S+\.js:[0-9]+[:0-9]*/g;
        var reFileFromStackTraceNode = /\(\S+\.js:[0-9]+[:0-9]*\)/g;
        // Get all file references ...
        var matches = st.match(reFileFromStackTrace);
        if (!matches) {
            matches = st.match(reFileFromStackTraceNode);
        }
        // ... and return an array of file references except those to preamble.js
        return matches.filter(function (el) {
            return el.search(/preamble-ts.js/) === -1;
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
exports.stackTrace = new StackTrace();
//# sourceMappingURL=StackTrace.js.map