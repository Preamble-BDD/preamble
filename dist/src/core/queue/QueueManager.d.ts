import q = require("q");
import { IDescribe } from "./IDescribe";
export declare class QueueManager {
    private timerInterval;
    private stableRetryCount;
    private Q;
    static queue: IDescribe[];
    static totIts: number;
    static totExclIts: number;
    constructor(timerInterval: number, stableRetryCount: number, Q: typeof q);
    run(): Q.Promise<string | Error>;
    runBeforeAfter(fn: (done?: () => void) => any, ms: number, context: {}): Q.Promise<string | Error>;
    runTests(): Q.Promise<string | Error>;
}
