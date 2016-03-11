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
    private runBeforeItAfter(fn: (done?: () => void) => any, ms: number, context: {}): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let completed = false;
        let timedOut = false;

        setTimeout(() => {
            // A timer whose callback is triggered after ms have expired
            // and which rejects the promise if the promise isn't already
            // resolved.
            let timerId = setTimeout(() => {
                if (!completed) {
                    timedOut = true;
                    deferred.reject(
                        new Error(`function failed to complete within {ms}`)
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
        }, 1);
        // Immediately return a promise to the caller.
        return deferred.promise;
    }
    /**
     * runs ancestor hierarchy of BeforeEach with inherited contexts
     */
    private runBefores(hierarchy: IDescribe[]): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();

        let runner = (ndx) => {
            setTimeout(() => {
                if (ndx < hierarchy.length) {
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
                        this.runBeforeItAfter(hierarchy[ndx].beforeEach.callback, ms, hierarchy[ndx].context)
                            .then(
                            () => runner(++ndx),
                            () => deferred.reject(new Error("runBefore failed to run"))
                            );
                    } else {
                        runner(++ndx);
                    }
                } else {
                    deferred.resolve();
                }
            }, 1);
        };

        runner(0);

        return deferred.promise;
    }
    /**
     * runs ancestor hierarchy of AfterEach with inherited contexts
     */
    private runAfters(hierarchy: IDescribe[]): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();

        let runner = (ndx) => {
            setTimeout(() => {
                if (ndx < hierarchy.length) {
                    // setup the context for calling afterEach.callback
                    // if it is not the 1st ([0]) item in the array
                    if (ndx) {
                        // the current context is a result of applying its parent's context values ontop of its own current values
                        Object.assign(hierarchy[ndx].context, hierarchy[ndx - 1].context);
                        console.log("afterEach context for " + hierarchy[ndx].label, hierarchy[ndx].context);
                    }
                    if (hierarchy[ndx].afterEach) {
                        let ms = hierarchy[ndx].afterEach.timeoutInterval > 0
                            && hierarchy[ndx].afterEach.timeoutInterval || this.configTimeoutInterval;
                        this.runBeforeItAfter(hierarchy[ndx].afterEach.callback, ms, hierarchy[ndx].context)
                            .then(
                            () => runner(++ndx),
                            () => deferred.reject(new Error("runAfter failed to run"))
                            );
                    } else {
                        runner(++ndx);
                    }
                } else {
                    deferred.resolve();
                }
            }, 1);
        };

        runner(0);

        return deferred.promise;
    }
    /**
     * runs an It
     */
    private runIt(it: IIt) {
        let deferred = this.Q.defer<string | Error>();
        let hierarchy = this.getAncestorHierarchy(it.parent);
        let ms = it.timeoutInterval > 0 && it.timeoutInterval || this.configTimeoutInterval;

        setTimeout(() => {
            this.runBefores(hierarchy)
            .then(() => this.runBeforeItAfter(it.callback, ms, it.parent.context))
            .then(() => this.runAfters(hierarchy))
            .then(() => deferred.resolve(), (error) => deferred.reject(error));
        }, 1);

        return deferred.promise;
    }
    /**
     * build and return an ancestor hierarchy
     */
    private getAncestorHierarchy(describe: IDescribe): IDescribe[] {
        let parent = describe;
        let hierarchy: IDescribe[] = [];

        // build ancestor hierarchy adding parent to the top of the hierarcy
        while (parent) {
            hierarchy.unshift(parent);
            parent = parent.parent;
        }

        // return ancestor hierarchy
        return hierarchy;
    }
    /**
     * recursively iterates through all the queue's Its
     * asynchronously and returns a promise
     */
    run(): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let its = <IIt[]>this.queue.filter((element) => {
            return element.isA === "It";
        });
        // console.log("its", its);

        // recursive iterator
        let runner = (i: number) => {
            setTimeout(() => {
                if (i < its.length) {
                    this.runIt(its[i])
                        .then(() => runner(++i))
                        .fail((e) => deferred.reject(e));
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
