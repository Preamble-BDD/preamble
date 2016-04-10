/**
 * Note: ts compiler will elide this import because q is only being
 * used as a type guard. See QueueManager construcor, particularly its
 * declaration of Q.
 */
import q = require("q");
import {QueueManager} from "./QueueManager";
import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";
import {IPrePostTest} from "./ipreposttest";
import {IIt} from "./IIt";
import {It} from "./It";
import {mix} from "./mix";
import {IReportDispatch} from "../reporters/reportdispatch";
import "../../polyfills/Object.assign"; // prevent eliding import

export let currentIt: IIt;

// TODO(JS): Add .fail api to done???
export class QueueRunner {
    private errors: string[];
    constructor(private queue: mix[], private configTimeoutInterval: number,
        private queueManager: QueueManager, private reportDispatch: IReportDispatch,
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
    private runBeforeItAfter(fn: (done?: () => void) => any, context: {}, timeoutInterval: number): Q.Promise<any> {
        let deferred = this.Q.defer<any>();

        setTimeout(() => {
            let resolve = () => {
                if (deferred.promise.isPending()) {
                    deferred.resolve();
                }
            };

            if (fn.length) {
                // Asynchronously calls fn passing callback for done parameter
                setTimeout(() => {
                    fn.call(context, () => resolve());
                }, 1);
            } else {
                // Synchronously calls fn
                setTimeout(() => {
                    fn.call(context);
                    resolve();
                }, 1);
            }

            // a timer that expires after timeoutInterval miliseconds
            setTimeout(() => {
                if (deferred.promise.isPending()) {
                    // timedOut = true;
                    deferred.reject(new Error(`timed out after ${timeoutInterval}ms`));
                }
            }, timeoutInterval);
        }, 1);

        // Immediately return a promise to the caller.
        return deferred.promise;
    }
    /**
     * runs ancestor hierarchy of BeforeEach with inherited contexts
     */
    // TODO(js): combine runBefores and runAfters into one routine using a callback to determine whether to run the before or after
    private runBefores(hierarchy: IDescribe[]): Q.Promise<any> {
        let deferred = this.Q.defer<any>();

        let runner = (ndx) => {
            setTimeout(() => {
                if (ndx < hierarchy.length && deferred.promise.isPending()) {
                    // setup the context for calling BeforeEach.callback
                    // if it is not the 1st ([0]) item in the array
                    if (ndx) {
                        // the current context is a result of applying its parent's context values to a blank object
                        hierarchy[ndx].context = Object.assign({}, hierarchy[ndx - 1].context);
                        console.log("beforeEach context for " + hierarchy[ndx].label, hierarchy[ndx].context);
                    } else {
                        hierarchy[ndx].context = {};
                    }
                    if (hierarchy[ndx].beforeEach) {
                        let ms = hierarchy[ndx].beforeEach.timeoutInterval > 0
                            && hierarchy[ndx].beforeEach.timeoutInterval || this.configTimeoutInterval;

                        this.runBeforeItAfter(hierarchy[ndx].beforeEach.callback, hierarchy[ndx].context, ms)
                            .then(() => runner(++ndx),
                            (error: Error) => {
                                deferred.reject(new Error(`beforeEach ${error.message}`));
                            });
                    } else {
                        runner(++ndx);
                    }
                } else {
                    if (deferred.promise.isPending()) {
                        deferred.resolve();
                    }
                }
            }, 1);
        };

        runner(0);

        return deferred.promise;
    }
    /**
     * runs ancestor hierarchy of AfterEach with inherited contexts
     */
    // TODO(js): combine runBefores and runAfters into one routine using a callback to determine whether to run the before or after
    private runAfters(hierarchy: IDescribe[]): Q.Promise<any> {
        let deferred = this.Q.defer<any>();

        let runner = (ndx) => {
            setTimeout(() => {
                if (ndx < hierarchy.length && deferred.promise.isPending()) {
                    // setup the context for calling BeforeEach.callback
                    // if it is not the 1st ([0]) item in the array
                    if (ndx) {
                        // the current context is a result of applying its parent's context values to a blank object
                        hierarchy[ndx].context = Object.assign({}, hierarchy[ndx - 1].context);
                        console.log("afterEach context for " + hierarchy[ndx].label, hierarchy[ndx].context);
                    } else {
                        hierarchy[ndx].context = {};
                    }
                    if (hierarchy[ndx].afterEach) {
                        let ms = hierarchy[ndx].afterEach.timeoutInterval > 0
                            && hierarchy[ndx].afterEach.timeoutInterval || this.configTimeoutInterval;

                        this.runBeforeItAfter(hierarchy[ndx].afterEach.callback, hierarchy[ndx].context, ms)
                            .then(() => runner(++ndx),
                            (error: Error) => {
                                deferred.reject(new Error(`afterEach ${error.message}`));
                            });
                    } else {
                        runner(++ndx);
                    }
                } else {
                    if (deferred.promise.isPending()) {
                        deferred.resolve();
                    }
                }
            }, 1);
        };

        runner(0);

        return deferred.promise;
    }
    /**
     * runs an It
     */
    private runIt(it: IIt): Q.Promise<any> {
        let deferred = this.Q.defer<any>();
        let ms = it.timeoutInterval > 0 && it.timeoutInterval || this.configTimeoutInterval;

        setTimeout(() => {
            this.runBeforeItAfter(it.callback, it.parent.context, ms).
                then(() => {
                    deferred.resolve();
                }, (error: Error) => {
                    deferred.reject(new Error(`it ${error.message}`));
                });
        }, 1);

        return deferred.promise;
    }
    /**
     * run before/it/after block
     */
    private runBIA(it: IIt): Q.Promise<any> {
        let deferred = this.Q.defer<any>();

        setTimeout(() => {
            currentIt = it;
            this.runBefores(it.hierarchy).then(() => {
                this.runIt(it).then(() => {
                    this.runAfters(it.hierarchy).then(() => {
                        deferred.resolve();
                    }, (error: Error) => {
                        it.reasons.push({ reason: error.message, stackTrace: it.parent.afterEach.callStack });
                        it.passed = false;
                        deferred.reject(error);
                    });
                }, (error: Error) => {
                    it.reasons.push({ reason: error.message, stackTrace: it.callStack });
                    it.passed = false;
                    deferred.reject(error);
                });
            }, (error: Error) => {
                it.reasons.push({ reason: error.message, stackTrace: it.parent.beforeEach.callStack });
                it.passed = false;
                deferred.reject(error);
            });
        }, 1);

        return deferred.promise;
    }
    /**
     * recursively iterates through all the queue's Its
     * asynchronously and returns a promise
     */
    run(): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let its: IIt[] = <IIt[]>this.queue.filter(element => element.isA === "It");
        let it: It;
        // console.log("its", its);

        // recursive iterator
        let runner = (i: number) => {
            setTimeout(() => {
                if (i < its.length) {
                    it = its[i];
                    // TODO(js): is parent.excluded check really needed????
                    if (it.excluded || it.parent.excluded) {
                        this.reportDispatch.reportSpec(it);
                        runner(++i);
                    } else {
                        this.runBIA(it).then(() => {
                            if (!it.passed) {
                                QueueManager.bumpTotFailedItsCount();
                            }
                            this.reportDispatch.reportSummary();
                            this.reportDispatch.reportSpec(it);
                            runner(++i);
                        }).fail(() => {
                            // an it timed out or one or more expectations failed
                            this.reportDispatch.reportSummary();
                            this.reportDispatch.reportSpec(it);
                            runner(++i);
                        });
                    }
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
