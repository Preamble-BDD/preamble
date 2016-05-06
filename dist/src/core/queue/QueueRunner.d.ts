/**
 * Note: ts compiler will elide this import because q is only being
 * used as a type guard. See QueueManager construcor, particularly its
 * declaration of Q.
 */
import q = require("q");
import { QueueManager } from "./QueueManager";
import { IIt } from "./IIt";
import { mix } from "./mix";
import { IReportDispatch } from "../reporters/reportdispatch";
import "../../polyfills/Object.assign";
export declare let getCurrentIt: () => IIt;
export declare class QueueRunner {
    private queue;
    private configTimeoutInterval;
    private configShortCircuit;
    private queueManager;
    private reportDispatch;
    private Q;
    private errors;
    private isShortCircuited;
    constructor(queue: mix[], configTimeoutInterval: number, configShortCircuit: boolean, queueManager: QueueManager, reportDispatch: IReportDispatch, Q: typeof q);
    /**
     * Returns a function (closure) which must complete within a set amount of time
     * asynchronously. If the function fails to complete within its given time limit
     * then its promise is rejected. If the function completes within its given time
     * limit then its promise is resolved.
     *
     * Example:
     * beforeEach(function(done) {...}, 1);
     */
    private runBeforeItAfter(fn, context, timeoutInterval);
    /**
     * runs ancestor hierarchy of BeforeEach or AfterEach with inherited contexts
     */
    private runBeforesAfters(hierarchy, runAs);
    /**
     * runs an It
     */
    private runIt(it);
    /**
     * run before/it/after block
     */
    private runBIA(it);
    /**
     * recursively iterates through all the queue's Its
     * asynchronously and returns a promise
     */
    run(): Q.Promise<string | Error>;
}
