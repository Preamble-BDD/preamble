export interface AStackTrace {
    stackTrace: string[];
}
export declare class StackTrace implements AStackTrace {
    stackTraceProperty: string;
    constructor();
    private filterstackTrace(st);
    private stackTraceFromError();
    stackTrace: string[];
}
export declare let stackTrace: StackTrace;
