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
}
