"use strict";
require("../../polyfills/Object.assign");
var QueueRunner = (function () {
    function QueueRunner(queue, configTimeoutInterval, Q) {
        this.queue = queue;
        this.configTimeoutInterval = configTimeoutInterval;
        this.Q = Q;
    }
    QueueRunner.prototype.runBeforeAfterIt = function (fn, ms, context) {
        var deferred = this.Q.defer();
        var completed = false;
        var timedOut = false;
        setTimeout(function () {
            var timerId = setTimeout(function () {
                if (!completed) {
                    timedOut = true;
                    deferred.reject(new Error("Function failed to complete within {ms}"));
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
                        console.log("context for " + hierarchy[ndx].label, hierarchy[ndx].context);
                    }
                    else {
                        hierarchy[ndx].context = {};
                    }
                    if (hierarchy[ndx].beforeEach) {
                        var ms = hierarchy[ndx].beforeEach.timeoutInterval > 0
                            && hierarchy[ndx].beforeEach.timeoutInterval || _this.configTimeoutInterval;
                        _this.runBeforeAfterIt(hierarchy[ndx].beforeEach.callback, ms, hierarchy[ndx].context).then(function () {
                            runner(++ndx);
                        });
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
                        hierarchy[ndx].context = Object.assign({}, hierarchy[ndx - 1].context);
                        console.log("context for " + hierarchy[ndx].label, hierarchy[ndx].context);
                    }
                    else {
                        hierarchy[ndx].context = {};
                    }
                    if (hierarchy[ndx].afterEach) {
                        var ms = hierarchy[ndx].afterEach.timeoutInterval > 0
                            && hierarchy[ndx].afterEach.timeoutInterval || _this.configTimeoutInterval;
                        _this.runBeforeAfterIt(hierarchy[ndx].afterEach.callback, ms, hierarchy[ndx].context).then(function () {
                            runner(++ndx);
                        });
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
        var ms;
        setTimeout(function () {
            _this.runBefores(hierarchy)
                .then(function () {
                console.log("It's parent context", it.parent.context);
                ms = it.timeoutInterval > 0
                    && it.timeoutInterval || _this.configTimeoutInterval;
                _this.runBeforeAfterIt(it.callback, ms, it.parent.context)
                    .then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject(new Error("it failed"));
                });
            }, function () {
                deferred.reject(new Error("beforeEach failed"));
            });
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
        console.log("its", its);
        var runner = function (i) {
            setTimeout(function () {
                if (i < its.length) {
                    _this.runIt(its[i]).then(function () { return runner(++i); });
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