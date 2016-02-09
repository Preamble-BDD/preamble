import q = require("q");
export declare class QueueManager {
    private timerInterval;
    private stableRetryCount;
    private Q;
    static queue: {}[];
    constructor(timerInterval: number, stableRetryCount: number, Q: typeof q);
    run(): Q.Promise<string | Error>;
}
