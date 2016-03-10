import q = require("q");
import { mix } from "./mix";
import "../../polyfills/Object.assign";
export declare class QueueRunner {
    private queue;
    private configTimeoutInterval;
    private Q;
    constructor(queue: mix[], configTimeoutInterval: number, Q: typeof q);
    private runBeforeAfter(fn, ms, context);
    private runBefores(hierarchy);
    private runAfters(hierarchy);
    private runIt(it);
    private getAncestorHierarchy(describe);
    run(): Q.Promise<string | Error>;
}
