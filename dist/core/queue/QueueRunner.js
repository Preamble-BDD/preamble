"use strict";
require("../../polyfills/Object.assign");
var QueueRunner = (function () {
    function QueueRunner(queue, configTimeoutInterval, Q) {
        this.queue = queue;
        this.configTimeoutInterval = configTimeoutInterval;
        this.Q = Q;
    }
    QueueRunner.prototype.runBeforeAfter = function (fn, ms, context) {
        var deferred = this.Q.defer();
        return function () {
            var completed = false;
            var timedOut = false;
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
            return deferred.promise;
        };
    };
    QueueRunner.prototype.runBefores = function (hierarchy) {
        var _this = this;
        var deferred = this.Q.defer();
        var result = Q("");
        var timeoutInterval;
        var befores = [];
        hierarchy.forEach(function (describe) {
            if (describe.beforeEach) {
                befores.push(_this.runBeforeAfter(describe.beforeEach.callback, describe.beforeEach.timeoutInterval > 0 &&
                    describe.beforeEach.timeoutInterval || _this.configTimeoutInterval, describe.parent && Object.assign({}, describe.parent.context) || describe.context));
            }
        });
        return befores.reduce(Q.when);
    };
    QueueRunner.prototype.runAfters = function () {
    };
    QueueRunner.prototype.runIt = function (it) {
        var _this = this;
        var deferred = this.Q.defer();
        var hierarchy = this.getAncestorHierarchy(it.parent);
        setTimeout(function () {
            _this.runBefores(hierarchy)
                .then(function () {
                deferred.resolve();
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
            hierarchy.push(parent);
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
                    _this.runIt(its[i]).then(function () { return runner(i++); });
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