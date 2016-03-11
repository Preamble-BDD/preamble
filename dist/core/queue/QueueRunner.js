"use strict";
require("../../polyfills/Object.assign");
var QueueRunner = (function () {
    function QueueRunner(queue, configTimeoutInterval, Q) {
        this.queue = queue;
        this.configTimeoutInterval = configTimeoutInterval;
        this.Q = Q;
    }
    QueueRunner.prototype.runBeforeItAfter = function (fn, ms, context) {
        var deferred = this.Q.defer();
        var completed = false;
        var timedOut = false;
        setTimeout(function () {
            var timerId = setTimeout(function () {
                if (!completed) {
                    timedOut = true;
                    deferred.reject(new Error("function failed to complete within {ms}"));
                }
            }, ms);
            if (fn.length) {
                setTimeout(function () {
                    fn.call(context, function () {
                        if (!timedOut) {
                            clearTimeout(timerId);
                            completed = true;
                            deferred.resolve();
                        }
                    });
                }, 1);
            }
            else {
                setTimeout(function () {
                    fn.call(context);
                    if (!timedOut) {
                        clearTimeout(timerId);
                        completed = true;
                        deferred.resolve();
                    }
                }, 1);
            }
        }, 1);
        return deferred.promise;
    };
    QueueRunner.prototype.runBefores = function (hierarchy) {
        var _this = this;
        var deferred = this.Q.defer();
        var runner = function (ndx) {
            setTimeout(function () {
                if (ndx < hierarchy.length) {
                    if (ndx) {
                        hierarchy[ndx].context = Object.assign({}, hierarchy[ndx - 1].context);
                        console.log("beforeEach context for " + hierarchy[ndx].label, hierarchy[ndx].context);
                    }
                    else {
                        hierarchy[ndx].context = {};
                    }
                    if (hierarchy[ndx].beforeEach) {
                        var ms = hierarchy[ndx].beforeEach.timeoutInterval > 0
                            && hierarchy[ndx].beforeEach.timeoutInterval || _this.configTimeoutInterval;
                        _this.runBeforeItAfter(hierarchy[ndx].beforeEach.callback, ms, hierarchy[ndx].context)
                            .then(function () { return runner(++ndx); }, function () { return deferred.reject(new Error("runBefore failed to run")); });
                    }
                    else {
                        runner(++ndx);
                    }
                }
                else {
                    deferred.resolve();
                }
            }, 1);
        };
        runner(0);
        return deferred.promise;
    };
    QueueRunner.prototype.runAfters = function (hierarchy) {
        var _this = this;
        var deferred = this.Q.defer();
        var runner = function (ndx) {
            setTimeout(function () {
                if (ndx < hierarchy.length) {
                    if (ndx) {
                        Object.assign(hierarchy[ndx].context, hierarchy[ndx - 1].context);
                        console.log("afterEach context for " + hierarchy[ndx].label, hierarchy[ndx].context);
                    }
                    if (hierarchy[ndx].afterEach) {
                        var ms = hierarchy[ndx].afterEach.timeoutInterval > 0
                            && hierarchy[ndx].afterEach.timeoutInterval || _this.configTimeoutInterval;
                        _this.runBeforeItAfter(hierarchy[ndx].afterEach.callback, ms, hierarchy[ndx].context)
                            .then(function () { return runner(++ndx); }, function () { return deferred.reject(new Error("runAfter failed to run")); });
                    }
                    else {
                        runner(++ndx);
                    }
                }
                else {
                    deferred.resolve();
                }
            }, 1);
        };
        runner(0);
        return deferred.promise;
    };
    QueueRunner.prototype.runIt = function (it) {
        var _this = this;
        var deferred = this.Q.defer();
        var hierarchy = this.getAncestorHierarchy(it.parent);
        var ms = it.timeoutInterval > 0 && it.timeoutInterval || this.configTimeoutInterval;
        setTimeout(function () {
            _this.runBefores(hierarchy)
                .then(function () { return _this.runBeforeItAfter(it.callback, ms, it.parent.context); })
                .then(function () { return _this.runAfters(hierarchy); })
                .then(function () { return deferred.resolve(); }, function (error) { return deferred.reject(error); });
        }, 1);
        return deferred.promise;
    };
    QueueRunner.prototype.getAncestorHierarchy = function (describe) {
        var parent = describe;
        var hierarchy = [];
        while (parent) {
            hierarchy.unshift(parent);
            parent = parent.parent;
        }
        return hierarchy;
    };
    QueueRunner.prototype.run = function () {
        var _this = this;
        var deferred = this.Q.defer();
        var its = this.queue.filter(function (element) {
            return element.isA === "It";
        });
        var runner = function (i) {
            setTimeout(function () {
                if (i < its.length) {
                    _this.runIt(its[i])
                        .then(function () { return runner(++i); })
                        .fail(function (e) { return deferred.reject(e); });
                }
                else {
                    deferred.resolve();
                }
            }, 1);
        };
        runner(0);
        return deferred.promise;
    };
    return QueueRunner;
}());
exports.QueueRunner = QueueRunner;
//# sourceMappingURL=QueueRunner.js.map