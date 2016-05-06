/**
 * Mock API
 * WARNING: mock is an experimental api and may not be included in the official release.
 */
"use strict";
var spy_1 = require("./spy/spy");
var QueueRunner_1 = require("../../queue/QueueRunner");
var StackTrace_1 = require("../../stacktrace/StackTrace");
var mockAPI = { not: {} };
var mockAPICount = 0;
var negatedMockAPI = {};
var registerMatcher = function (matcher) {
    if (matcher.negator) {
        mockAPI.not["not." + matcher.apiName] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return !matcher.evaluator.apply(null, args);
        };
    }
    mockAPI[matcher.apiName] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return matcher.evaluator.apply(null, args);
    };
};
registerMatcher({
    apiName: "toBeCalled",
    api: function () { },
    evaluator: function (expectedValue) { return expectedValue.calls.count() > 0; },
    negator: true,
    minArgs: 0,
    maxArgs: 0
});
registerMatcher({
    apiName: "toBeCalledWith",
    api: function () {
        var matcherValue = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            matcherValue[_i - 0] = arguments[_i];
        }
        return matcherValue;
    },
    evaluator: function (expectedValue, matcherValue) {
        return expectedValue.calls.wasCalledWith.apply(null, matcherValue);
    },
    negator: true,
    minArgs: 1,
    maxArgs: -1
});
registerMatcher({
    apiName: "toBeCalledWithContext",
    api: function (matcherValue) { return matcherValue; },
    evaluator: function (expectedValue, matcherValue) {
        return expectedValue.calls.wasCalledWithContext(matcherValue);
    },
    negator: true,
    minArgs: 1,
    maxArgs: 1
});
registerMatcher({
    apiName: "toReturnValue",
    api: function (matcherValue) { return matcherValue; },
    evaluator: function (expectedValue, matcherValue) {
        return expectedValue.calls.returned(matcherValue);
    },
    negator: true,
    minArgs: 1,
    maxArgs: 1
});
registerMatcher({
    apiName: "toThrow",
    api: function () { },
    evaluator: function (expectedValue) {
        return expectedValue.calls.threw();
    },
    negator: true,
    minArgs: 0,
    maxArgs: 0
});
registerMatcher({
    apiName: "toThrowWithMessage",
    api: function (matcherValue) { return matcherValue; },
    evaluator: function (expectedValue, matcherValue) {
        return expectedValue.calls.threwWithMessage(matcherValue);
    },
    negator: true,
    minArgs: 1,
    maxArgs: 1
});
registerMatcher({
    apiName: "toThrowWithName",
    api: function (matcherValue) { return matcherValue; },
    evaluator: function (expectedValue, matcherValue) {
        return expectedValue.calls.threwWithName(matcherValue);
    },
    negator: true,
    minArgs: 1,
    maxArgs: 1
});
exports.mock = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var st = StackTrace_1.stackTrace.stackTrace;
    var aSpy = spy_1.spyOn.apply(null, args);
    var _mockProxyStatic = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        // when called _mockProxyStatic delegates its calls to the spy
        aSpy.apply(this, args);
    };
    // mock api
    var _mock = _mockProxyStatic;
    var apisToCall = [];
    _mock.and = {};
    _mock.and.expect = { it: { not: {} } };
    _mock.and.expect.it.toBeCalled = function () {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "toBeCalled", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toBeCalled = function () {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "not.toBeCalled", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toBeCalledWith = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "toBeCalledWith", expectedValue: aSpy, matcherValue: args, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toBeCalledWith = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "not.toBeCalledWith", expectedValue: aSpy, matcherValue: args, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toBeCalledWithContext = function (context) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "toBeCalledWithContext", expectedValue: aSpy, matcherValue: context, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toBeCalledWithContext = function (context) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "not.toBeCalledWithContext", expectedValue: aSpy, matcherValue: context, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toReturnValue = function (value) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "toReturnValue", expectedValue: aSpy, matcherValue: value, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toReturnValue = function (value) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "not.toReturnValue", expectedValue: aSpy, matcherValue: value, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toThrow = function () {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "toThrow", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toThrow = function () {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "not.toThrow", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toThrowWithName = function (name) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "toThrowWithName", expectedValue: aSpy, matcherValue: name, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toThrowWithName = function (name) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "not.toThrowWithName", expectedValue: aSpy, matcherValue: name, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toThrowWithMessage = function (message) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "toThrowWithMessage", expectedValue: aSpy, matcherValue: message, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toThrowWithMessage = function (message) {
        apisToCall.push({
            note: { it: QueueRunner_1.getCurrentIt(), apiName: "not.toThrowWithMessage", expectedValue: aSpy, matcherValue: message, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    // methods that delegate to the spy property
    _mock.and.reset = function () {
        aSpy.and.reset();
        return _mock;
    };
    _mock.and.callWithContext = function (context) {
        aSpy.and.callWithContext(context);
        return _mock;
    };
    _mock.and.throw = function () {
        aSpy.and.throw();
        return _mock;
    };
    _mock.and.throwWithMessage = function (message) {
        aSpy.and.throwWithMessage(message);
        return _mock;
    };
    _mock.and.throwWithName = function (name) {
        aSpy.and.throwWithName(name);
        return _mock;
    };
    _mock.and.return = function (ret) {
        aSpy.and.return(ret);
        return _mock;
    };
    _mock.and.callFake = function (fn) {
        aSpy.and.callFake(fn);
        return _mock;
    };
    _mock.and.callActual = function () {
        aSpy.and.callActual();
        return _mock;
    };
    _mock.and.callStub = function () {
        aSpy.and.callStub();
        return _mock;
    };
    // mock validtation
    _mock.validate = function () {
        apisToCall.forEach(function (apiToCall) {
            var negated = /not\./.test(apiToCall.note.apiName);
            var reason;
            if (apiToCall.note.matcherValue) {
                apiToCall.note.result = negated ?
                    mockAPI.not[apiToCall.note.apiName](apiToCall.note.expectedValue, apiToCall.note.matcherValue) :
                    mockAPI[apiToCall.note.apiName](apiToCall.note.expectedValue, apiToCall.note.matcherValue);
            }
            else {
                apiToCall.note.result = negated ?
                    mockAPI.not[apiToCall.note.apiName](apiToCall.note.expectedValue) :
                    mockAPI[apiToCall.note.apiName](apiToCall.note.expectedValue);
            }
            QueueRunner_1.getCurrentIt().passed = apiToCall.note.result && QueueRunner_1.getCurrentIt().passed || false;
            QueueRunner_1.getCurrentIt().parent.passed = apiToCall.note.result && QueueRunner_1.getCurrentIt().passed || false;
            QueueRunner_1.getCurrentIt().expectations.push(apiToCall.note);
            if (!apiToCall.note.result) {
                if (apiToCall.note.matcherValue) {
                    reason = "mock().and.expect.it." + apiToCall.note.apiName + "(" + apiToCall.note.matcherValue + ") failed!";
                }
                else {
                    reason = "mock().and.expect.it." + apiToCall.note.apiName + "() failed!";
                }
                QueueRunner_1.getCurrentIt().reasons.push({ reason: reason, stackTrace: apiToCall.note.stackTrace });
            }
        });
    };
    return _mock;
};
// test api here
// let aMock = mock().and.expect.it.toBeCalled();
//# sourceMappingURL=mock.js.map