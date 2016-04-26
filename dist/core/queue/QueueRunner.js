"use strict";
var QueueManager_1 = require("./QueueManager");
require("../../polyfills/Object.assign"); // prevent eliding import
// TODO(JS): Show .fails (i.e. timeouts) in the done???
var QueueRunner = (function () {
    function QueueRunner(queue, configTimeoutInterval, queueManager, reportDispatch, Q) {
        this.queue = queue;
        this.configTimeoutInterval = configTimeoutInterval;
        this.queueManager = queueManager;
        this.reportDispatch = reportDispatch;
        this.Q = Q;
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
    QueueRunner.prototype.runBeforeItAfter = function (fn, context, timeoutInterval) {
        var deferred = this.Q.defer();
        setTimeout(function () {
            var resolve = function () {
                if (deferred.promise.isPending()) {
                    deferred.resolve();
                }
            };
            if (fn.length) {
                // Asynchronously calls fn passing callback for done parameter
                setTimeout(function () {
                    fn.call(context, function () { return resolve(); });
                }, 1);
            }
            else {
                // Synchronously calls fn
                setTimeout(function () {
                    fn.call(context);
                    resolve();
                }, 1);
            }
            // a timer that expires after timeoutInterval miliseconds
            setTimeout(function () {
                if (deferred.promise.isPending()) {
                    // timedOut = true;
                    deferred.reject(new Error("timed out after " + timeoutInterval + "ms"));
                }
            }, timeoutInterval);
        }, 1);
        // Immediately return a promise to the caller.
        return deferred.promise;
    };
    /**
     * runs ancestor hierarchy of BeforeEach with inherited contexts
     */
    // TODO(js): combine runBefores and runAfters into one routine using a callback to determine whether to run the before or after
    QueueRunner.prototype.runBefores = function (hierarchy) {
        var _this = this;
        var deferred = this.Q.defer();
        var runner = function (ndx) {
            setTimeout(function () {
                if (ndx < hierarchy.length && deferred.promise.isPending()) {
                    // setup the context for calling BeforeEach.callback
                    // if it is not the 1st ([0]) item in the array
                    if (ndx) {
                        // the current context is a result of applying its parent's context values to a blank object
                        hierarchy[ndx].context = Object.assign({}, hierarchy[ndx - 1].context);
                    }
                    else {
                        hierarchy[ndx].context = {};
                    }
                    if (hierarchy[ndx].beforeEach) {
                        var ms = hierarchy[ndx].beforeEach.timeoutInterval > 0
                            && hierarchy[ndx].beforeEach.timeoutInterval || _this.configTimeoutInterval;
                        _this.runBeforeItAfter(hierarchy[ndx].beforeEach.callback, hierarchy[ndx].context, ms)
                            .then(function () { return runner(++ndx); }, function (error) {
                            deferred.reject(new Error("beforeEach " + error.message));
                        });
                    }
                    else {
                        runner(++ndx);
                    }
                }
                else {
                    if (deferred.promise.isPending()) {
                        deferred.resolve();
                    }
                }
            }, 1);
        };
        runner(0);
        return deferred.promise;
    };
    /**
     * runs ancestor hierarchy of AfterEach with inherited contexts
     */
    // TODO(js): combine runBefores and runAfters into one routine using a callback to determine whether to run the before or after
    QueueRunner.prototype.runAfters = function (hierarchy) {
        var _this = this;
        var deferred = this.Q.defer();
        var runner = function (ndx) {
            setTimeout(function () {
                if (ndx < hierarchy.length && deferred.promise.isPending()) {
                    // setup the context for calling BeforeEach.callback
                    // if it is not the 1st ([0]) item in the array
                    if (ndx) {
                        // the current context is a result of applying its parent's context values to a blank object
                        hierarchy[ndx].context = Object.assign({}, hierarchy[ndx - 1].context);
                    }
                    else {
                        hierarchy[ndx].context = {};
                    }
                    if (hierarchy[ndx].afterEach) {
                        var ms = hierarchy[ndx].afterEach.timeoutInterval > 0
                            && hierarchy[ndx].afterEach.timeoutInterval || _this.configTimeoutInterval;
                        _this.runBeforeItAfter(hierarchy[ndx].afterEach.callback, hierarchy[ndx].context, ms)
                            .then(function () { return runner(++ndx); }, function (error) {
                            deferred.reject(new Error("afterEach " + error.message));
                        });
                    }
                    else {
                        runner(++ndx);
                    }
                }
                else {
                    if (deferred.promise.isPending()) {
                        deferred.resolve();
                    }
                }
            }, 1);
        };
        runner(0);
        return deferred.promise;
    };
    /**
     * runs an It
     */
    QueueRunner.prototype.runIt = function (it) {
        var _this = this;
        var deferred = this.Q.defer();
        var ms = it.timeoutInterval > 0 && it.timeoutInterval || this.configTimeoutInterval;
        setTimeout(function () {
            _this.runBeforeItAfter(it.callback, it.parent.context, ms).
                then(function () {
                deferred.resolve();
            }, function (error) {
                deferred.reject(new Error("it " + error.message));
            });
        }, 1);
        return deferred.promise;
    };
    /**
     * run before/it/after block
     */
    QueueRunner.prototype.runBIA = function (it) {
        var _this = this;
        var deferred = this.Q.defer();
        setTimeout(function () {
            exports.currentIt = it;
            _this.runBefores(it.hierarchy).then(function () {
                _this.runIt(it).then(function () {
                    _this.runAfters(it.hierarchy).then(function () {
                        deferred.resolve();
                    }, function (error) {
                        it.reasons.push({ reason: error.message, stackTrace: it.parent.afterEach.callStack });
                        it.passed = false;
                        deferred.reject(error);
                    });
                }, function (error) {
                    it.reasons.push({ reason: error.message, stackTrace: it.callStack });
                    it.passed = false;
                    deferred.reject(error);
                });
            }, function (error) {
                it.reasons.push({ reason: error.message, stackTrace: it.parent.beforeEach.callStack });
                it.passed = false;
                deferred.reject(error);
            });
        }, 1);
        return deferred.promise;
    };
    /**
     * recursively iterates through all the queue's Its
     * asynchronously and returns a promise
     */
    QueueRunner.prototype.run = function () {
        var _this = this;
        var deferred = this.Q.defer();
        var its = this.queue.filter(function (element) { return element.isA === "It"; });
        var it;
        // console.log("its", its);
        // recursive iterator
        var runner = function (i) {
            setTimeout(function () {
                if (i < its.length) {
                    it = its[i];
                    // TODO(js): is parent.excluded check really needed????
                    if (it.excluded || it.parent.excluded) {
                        _this.reportDispatch.reportSpec(it);
                        runner(++i);
                    }
                    else {
                        _this.runBIA(it).then(function () {
                            if (!it.passed) {
                                QueueManager_1.QueueManager.bumpTotFailedItsCount();
                            }
                            _this.reportDispatch.reportSummary();
                            _this.reportDispatch.reportSpec(it);
                            runner(++i);
                        }).fail(function () {
                            // an it timed out or one or more expectations failed
                            _this.reportDispatch.reportSummary();
                            _this.reportDispatch.reportSpec(it);
                            runner(++i);
                        });
                    }
                }
                else {
                    deferred.resolve();
                }
            }, 1);
        };
        // call recursive runner to begin iterating through the queue
        runner(0);
        // return a promise to caller
        return deferred.promise;
    };
    return QueueRunner;
}());
exports.QueueRunner = QueueRunner;
//# sourceMappingURL=QueueRunner.js.map