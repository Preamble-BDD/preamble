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

let currentIt: IIt;
export let getCurrentIt = (): IIt => currentIt;

export class QueueRunner {
    private errors: string[];
    private isShortCircuited: boolean;
    constructor(private queue: mix[], private configTimeoutInterval: number,
        private configShortCircuit: boolean, private queueManager: QueueManager,
        private reportDispatch: IReportDispatch, private Q: typeof q) {
        this.isShortCircuited = false;
    }
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
                let errorMsg = `timed out after ${timeoutInterval}ms`;
                if (this.isShortCircuited) {
                    errorMsg += " and testing has been short circuited";
                }
                if (deferred.promise.isPending()) {
                    // timedOut = true;
                    deferred.reject(new Error(errorMsg));
                }
            }, timeoutInterval);
        }, 1);

        // Immediately return a promise to the caller.
        return deferred.promise;
    }
    /**
     * runs ancestor hierarchy of BeforeEach or AfterEach with inherited contexts
     */
    private runBeforesAfters(hierarchy: IDescribe[], runAs: string): Q.Promise<any> {
        let deferred = this.Q.defer<any>();

        let runner = (ndx) => {
            setTimeout(() => {
                if (ndx < hierarchy.length && deferred.promise.isPending()) {
                    // setup the context for calling BeforeEach.callback
                    // if it is not the 1st ([0]) item in the array
                    if (ndx) {
                        // the current context is a result of applying its parent's context values to a blank object
                        hierarchy[ndx].context = Object.assign({}, hierarchy[ndx - 1].context);
                    } else {
                        hierarchy[ndx].context = {};
                    }
                    if (runAs === "beforeEach") {
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
                    } else if (runAs === "afterEach") {
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
                        throw new Error(`runAs expects a string whose value is either
                            "beforeEach" or "afterEach" but instead found ${runAs}`);
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
        let shortCircuitMessage = (message: string): string => {
            return this.configShortCircuit && message + " and testing has been short circuited!" || message;
        };

        setTimeout(() => {
            currentIt = it;
            this.runBeforesAfters(it.hierarchy, "beforeEach").then(() => {
                this.runIt(it).then(() => {
                    this.runBeforesAfters(it.hierarchy, "afterEach").then(() => {
                        deferred.resolve();
                    }, (error: Error) => {
                        it.reasons.push({
                            reason: shortCircuitMessage(error.message),
                            stackTrace: it.parent.afterEach.callStack
                        });
                        it.passed = false;
                        deferred.reject(error);
                    });
                }, (error: Error) => {
                    it.reasons.push({
                        reason: shortCircuitMessage(error.message),
                        stackTrace: it.callStack
                    });
                    it.passed = false;
                    deferred.reject(error);
                });
            }, (error: Error) => {
                it.reasons.push({
                    reason: shortCircuitMessage(error.message),
                    stackTrace: it.parent.beforeEach.callStack
                });
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
                if (!this.isShortCircuited && i < its.length) {
                    it = its[i];
                    if (it.excluded || it.parent.excluded) {
                        this.reportDispatch.reportSpec(it);
                        runner(++i);
                    } else {
                        this.runBIA(it).then(() => {
                            if (!it.passed) {
                                QueueManager.bumpTotFailedItsCount();
                                if (this.configShortCircuit) {
                                    this.isShortCircuited = true;
                                }
                            }
                            this.reportDispatch.reportSummary();
                            this.reportDispatch.reportSpec(it);
                            runner(++i);
                        }).fail(() => {
                            // an it timed out or one or more expectations failed
                            QueueManager.bumpTotFailedItsCount();
                            this.reportDispatch.reportSummary();
                            this.reportDispatch.reportSpec(it);
                            if (this.configShortCircuit) {
                                this.isShortCircuited = true;
                            }
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
