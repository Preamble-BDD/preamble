/**
 * Note: ts compiler will elide this import because q is only being
 * used as a type guard. See QueueManager construcor, particularly its
 * declaration of Q.
 */
import q = require("q");
import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";
import {IPrePostTest} from "./ipreposttest";
import {IIt} from "./IIt";
import {It} from "./It";
import {mix} from "./mix";
import {ICallStack} from "../callstack/ICallStack";
import "../../polyfills/Object.assign"; // prevent eliding import

export class QueueRunner {
    constructor(private queue: mix[], private configTimeoutInterval: number,
        private Q: typeof q) { }
    /**
     * Returns a function (closure) which must complete within a set amount of time
     * asynchronously. If the function fails to complete within its given time limit
     * then its promise is rejected. If the function completes within its given time
     * limit then its promise is resolved.
     *
     * Example:
     * beforeEach(function(done) {...}, 1);
     */
    private runBeforeAfter(fn: (done?: () => void) => any, ms: number, context: {}): () => Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        return function() {
            let completed = false;
            let timedOut = false;
            // A timer whose callback is triggered after ms have expired
            // and which rejects the promise if the promise isn't already
            // resolved.
            let timerId = setTimeout(() => {
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
        };
    }
    private runBefores(hierarchy: IDescribe[]): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let result: Q.Promise<string | Error> = Q("");
        let timeoutInterval: number;
        let befores = [];
        // build array of functions that return promises
        hierarchy.forEach((describe) => {
            if (describe.beforeEach) {
                befores.push(this.runBeforeAfter(
                    describe.beforeEach.callback,
                    describe.beforeEach.timeoutInterval > 0 &&
                    describe.beforeEach.timeoutInterval || this.configTimeoutInterval,
                    describe.parent && Object.assign({}, describe.parent.context) || describe.context
                ));
            }
        });
        // run the functions in sequence and return a single promise for all of them
        return befores.reduce(Q.when);
    }
    private runAfters(): void {
        // will be same as runBefores but use Describe.AfterEach instead
    }
    // private runIt(it: It, beforeEach: IPrePostTest, afterEach: IPrePostTest,
    //     context: {}): Q.Promise<string | Error> {
    //     let deferred = this.Q.defer<string | Error>();
    //     let timeoutInterval: number;
    //     // run the BeforeEach chain - setup the context for each
    //     // run the It - pass it the context
    //     // run the AfterEach chain
    //     setTimeout(() => {
    //         if (beforeEach) {
    //             timeoutInterval = beforeEach.timeoutInterval > 0 &&
    //                 beforeEach.timeoutInterval || this.configTimeoutInterval;
    //             this.runBeforeAfter(beforeEach.callback, timeoutInterval, context)
    //                 .then(() => {
    //                     console.log("runBeforeAfter success!");
    //                     console.log("describe.context", context);
    //                 }, (err: Error) => {
    //                     console.log("runBeforeAfter failed!");
    //                     console.log(err.message);
    //                 });
    //         }
    //     }, 1);
    //     return deferred.promise;
    // }
    private runIt(it: IIt) {
        let deferred = this.Q.defer<string | Error>();
        let hierarchy = this.getAncestorHierarchy(it.parent);
        setTimeout(() => {
            this.runBefores(hierarchy)
                .then(() => {
                    deferred.resolve();
                }, () => {
                    deferred.reject(new Error("beforeEach failed"));
                });
        }, 1);
        return deferred.promise;
    }
    /**
     * build and return an ancestor hierarchy
     */
    private getAncestorHierarchy(describe: IDescribe): IDescribe[] {
        let parent = describe;
        let hierarchy: IDescribe[] = [];

        // build ancestor hierarchy
        while (parent) {
            hierarchy.push(parent);
            parent = parent.parent;
        }

        // return ancestor hierarchy
        return hierarchy;
    }
    /**
     * recursively iterates through all the queue's top-level Describes
     * asynchronously and returns a promise
     */
    run(): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let its = <IIt[]> this.queue.filter((element) => {
            return element.isA === "It";
        });
        console.log("its", its);

        // recursive iterator
        let runner = (i: number) => {
            setTimeout(() => {
                if (i < its.length) {
                    this.runIt(its[i]).then( () => runner(i++));
                } else {
                    deferred.resolve();
                }
            }, 1);
        };

        // call recursive runner to begin iterating through the queue
        runner(0);

        // return a promise to caller
        return deferred.promise;
    }
}
