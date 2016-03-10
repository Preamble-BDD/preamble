export declare class StackTrace {
    stackTraceProperty: string;
    constructor();
    filterstackTrace(st: any): string[];
    stackTraceFromError(): string;
    readonly stackTrace: string[];
}
