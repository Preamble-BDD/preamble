import q = require("q");
import { IDescribe } from "./IDescribe";
import "../../polyfills/Object.assign";
export declare class QueueRunner {
    private queue;
    private configTimeoutInterval;
    private Q;
    constructor(queue: IDescribe[], configTimeoutInterval: number, Q: typeof q);
    private runBeforeAfter(fn, ms, context);
    private runBefores(hierarchy);
    private runAfters();
    private runIt(hierarchy, it, describe);
    private runDescribe(describe, ndx);
    run(ndx: number): Q.Promise<string | Error>;
}
