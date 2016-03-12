export class StackTrace {
    stackTraceProperty: string;
    constructor() {
        // determine the Error object's stack trace property
        try {
            throw new Error("testing for stack or stacktrace");
        } catch (error) {
            this.stackTraceProperty = error.stack ? "stack" : error.stacktrace ?
                "stacktrace" : undefined;
        }
    }
    // TODO(JS): might not want to do this and instead might want to include references to preamble.js or even make it configurable
    filterstackTrace(st): string[] {
        let reFileFromStackTrace = /file:\/\/\/\S+\.js:[0-9]+[:0-9]*/g;
        // Get all file references ...
        let matches = st.match(reFileFromStackTrace);
        // ... and return an array of file references except those to preamble.js
        return matches.filter(function(el) {
            return el.search(/preamble.js/) === -1;
        });
    }
    stackTraceFromError(): string {
        let stackTrace = null;
        if (this.stackTraceProperty) {
            try {
                throw new Error();
            } catch (error) {
                stackTrace = error[this.stackTraceProperty];
            }
        }
        return stackTrace;
    }
    get stackTrace(): string[] {
        let st: string;
        let flt: string[] = null;
        st = this.stackTraceFromError();
        if (st) {
            flt = this.filterstackTrace(st);
        }
        return flt;
    }
}
