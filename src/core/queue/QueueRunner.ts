/**
 * Note: ts compiler will elide this import because q is only being
 * used as a type guard. See QueueManager construcor, particularly its
 * declaration of Q.
 */
import q = require("q");
import {IDescribe} from "./IDescribe";
import {IPrePostTest} from "./ipreposttest";
import {IIt} from "./IIt";
import {It} from "./It";
import {mix} from "./mix";
import {ICallStack} from "../callstack/ICallStack";

export class QueueRunner {
    constructor(private queue: IDescribe[], private configTimeoutInterval: number,
        private Q: typeof q, private callStack: ICallStack) { }
    /**
     * Call a function which must complete within a set amount of time asynchronously.
     * If the function fails to complete within its given time limit then its promise
     * is rejected. If the function completes within its given time limit then its
     * promise is resolved.
     *
     * Example:
     * beforeEach(cb, timeoutInterval) ==> asyncWithTimeLimit(cb(done), timoutInterval)
     */
    runBeforeAfter(fn: (done?: () => void) => any, ms: number, context: {}): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let completed = false;
        let timedOut = false;
        // A timer whose callback is triggered after ms have expired
        // and which rejects the promise if the promise isn't already
        // resolved.
        let timerId = setTimeout(function() {
            if (!completed) {
                timedOut = true;
                deferred.reject(
                    new Error(`Function failed to complete within {ms}`)
                );
            }
        }, ms);
        // A timer whose callback is triggered after 1 ms has expired which
        // calls fn passing it a callback that when called resolves the promise
        // if timedOut is false.
        if (fn.length) {
            // Asynchronous - call fn passing it done
            setTimeout(function() {
                fn.call(context, () => {
                    if (!timedOut) {
                        clearTimeout(timerId);
                        completed = true;
                        deferred.resolve();
                    }
                });
            }, 1);
        } else {
            // Synchronous
            setTimeout(function() {
                fn.call(context);
                if (!timedOut) {
                    clearTimeout(timerId);
                    completed = true;
                    deferred.resolve();
                }
            }, 1);
        }
        // Immediately return a promise to the caller.
        return deferred.promise;
    }
    runIt(it: It, beforeEach: IPrePostTest, afterEach: IPrePostTest,
        context: {}): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let timeoutInterval: number;
        setTimeout(() => {
            if (beforeEach) {
                timeoutInterval = beforeEach.timeoutInterval > 0 &&
                    beforeEach.timeoutInterval || this.configTimeoutInterval;
                this.runBeforeAfter(beforeEach.callback, timeoutInterval, context)
                    .then(function() {
                        console.log("runBeforeAfter success!");
                        console.log("describe.context", context);
                    }, function(err: Error) {
                        console.log("runBeforeAfter failed!");
                        console.log(err.message);
                    });
            }
        }, 1);
        return deferred.promise;
    }
    runDescribe(describe: IDescribe): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let timeoutInterval: number;
        let item: mix;
        setTimeout(() => {
            for (let i = 0; i < describe.items.length; i++) {
                item = describe.items[i];
                if (item instanceof It) {
                    console.log("item instance of It");
                    this.runIt(item, describe.beforeEach, describe.afterEach, describe.context);
                } else {
                    console.log("item instance of Describe");
                }
            }
        }, 1);
        return deferred.promise;
    }
    /**
     * Iterate through all the queue's top level Describes
     */
    run(): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let timeoutInterval: number;
        let item: mix;
        setTimeout(() => {
            for (let i = 0; i < this.queue.length; i++) {
                this.runDescribe(this.queue[i]);
            }
        }, 1);
        return deferred.promise;
    }
}
