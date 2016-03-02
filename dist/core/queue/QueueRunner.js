"use strict";
var It_1 = require("./It");
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
    QueueRunner.prototype.runIt = function (hierarchy, it, describe) {
        var _this = this;
        var deferred = this.Q.defer();
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
    QueueRunner.prototype.runDescribe = function (describe, ndx) {
        var deferred = this.Q.defer();
        var timeoutInterval;
        var parent = describe;
        var hierarchy = [];
        while (parent) {
            hierarchy.push(parent);
            parent = parent.parent;
        }
        var runner = function (d) {
            var _this = this;
            setTimeout(function () {
                var item;
                if (ndx < describe.items.length) {
                    item = describe.items[ndx];
                    if (item instanceof It_1.It) {
                        console.log("item instance of It");
                        _this.runIt(hierarchy, item, describe).then(function () {
                            _this.runDescribe(describe, ndx + 1);
                        });
                    }
                    else {
                        console.log("item instance of Describe");
                        _this.runDescribe(item, 0).then(function () {
                            _this.runDescribe(describe, ndx + 1);
                        });
                    }
                }
                else {
                    deferred.resolve();
                }
            }, 1);
        };
        runner(describe);
        return deferred.promise;
    };
    QueueRunner.prototype.run = function (ndx) {
        var deferred = this.Q.defer();
        var runner = function (i) {
            var _this = this;
            setTimeout(function () {
                if (i < _this.queue.length) {
                    _this.runDescribe(_this.queue[i], 0)
                        .then(function () {
                        _this.runner(i + 1);
                    });
                }
                else {
                    deferred.resolve();
                }
            }, 1);
        };
        runner(ndx);
        return deferred.promise;
    };
    return QueueRunner;
}());
exports.QueueRunner = QueueRunner;
//# sourceMappingURL=QueueRunner.js.map