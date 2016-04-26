"use strict";
var spy_1 = require("./spy/spy");
var QueueRunner_1 = require("../queue/QueueRunner");
var StackTrace_1 = require("../stacktrace/StackTrace");
var expectationAPI = {};
var expectationAPICount = 0;
var negatedExpectationAPI = {};
// add not api to expect api
expectationAPI["not"] = negatedExpectationAPI;
var note;
/**
 * argChecker - checks that the matcher has the
 * correct number of args passed to it.
 *
 * Allows for a fixed and a variable number of arguments.
 *
 * Returns true if # of args is correct & false otherwise.
 *
 * Example: To declare that a matcher can take
 * a variable number of args but must be passed
 * at least 1 arg then minArgs: 1 && maxArgs: -1.
 *
 * Example: To declare that a matcher can take
 * zero or more args then minArgs: 0 && maxArgs: -1.
 *
 * Example: To declare that a matcher can take
 * a fixed number of args then minArgs: n && maxArgs: n.
 *
 * Example: To declare that a matcher can take
 * from 3 to n args then minArgs: 3 && maxArgs: n.
 */
var argsChecker = function (matcher, argsLength) {
    // fails if minArgs > maxArgs
    if (matcher.minArgs !== -1 && matcher.maxArgs !== -1 &&
        matcher.minArgs > matcher.maxArgs) {
        return false;
    }
    // allows for a variable number of args.
    if (matcher.minArgs !== -1 && argsLength < matcher.minArgs ||
        matcher.maxArgs !== -1 && argsLength > matcher.maxArgs) {
        note.exception = new Error(matcher.apiName + "(): invalid arguments");
        return false;
    }
    return true;
};
var addNoteToIt = function (note) { return QueueRunner_1.currentIt.expectations.push(note); };
var showAs = function (value) {
    if (Array.isArray(value)) {
        return "array";
    }
    if (typeof (value) === "function") {
        return "function";
    }
    if (typeof (value) === "object") {
        return "object";
    }
    if (typeof (value) === "string") {
        return "\"" + value + "\"";
    }
    if (typeof (value) === "number") {
        return value;
    }
    if (typeof (value) === "boolean") {
        return value;
    }
    if (typeof (value) === "undefined") {
        return "undefined";
    }
};
var assignReason = function (note) {
    var reason;
    if (!note.result) {
        if (note.matcherValue != null) {
            reason = "expect(" + showAs(note.expectedValue) + ")." + note.apiName + "(" + showAs(note.matcherValue) + ") failed!";
        }
        else {
            reason = "expect(" + showAs(note.expectedValue) + ")." + note.apiName + "() failed!";
        }
        QueueRunner_1.currentIt.reasons.push({ reason: reason, stackTrace: note.stackTrace });
    }
};
// expect(value)
exports.expect = function (ev) {
    // if a callback was returned then call it and use what it returns for the expected value
    var expectedValue = ev;
    // capture the stack trace here when expect is called.
    var st = StackTrace_1.stackTrace.stackTrace;
    if (typeof (ev) === "function" && !ev.hasOwnProperty("_spyMarker")) {
        var spy = spy_1.spyOn(ev).and.callActual();
        expectedValue = spy();
    }
    note = { it: QueueRunner_1.currentIt, apiName: null, expectedValue: expectedValue, matcherValue: null, result: null, exception: null, stackTrace: st };
    return expectationAPI;
};
exports.registerMatcher = function (matcher) {
    var proxy = function (not) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            note.apiName = not ? "not." + matcher.apiName : matcher.apiName;
            if (argsChecker(matcher, args.length)) {
                // don't call matcher.api if it doesn't return a value (e.g. toBeTrue)
                note.matcherValue = matcher.minArgs > 0 ? matcher.api.apply(null, args) : note.matcherValue;
                // if a callback was returned then call it and use what it returns for the matcher value
                note.matcherValue = note.matcherValue && typeof (note.matcherValue) === "function" && note.matcherValue() || note.matcherValue;
                if (not) {
                    if (matcher.minArgs) {
                        note.result = !matcher.evaluator(note.expectedValue, note.matcherValue);
                    }
                    else {
                        note.result = !matcher.evaluator(note.expectedValue);
                    }
                }
                else {
                    if (matcher.minArgs) {
                        note.result = matcher.evaluator(note.expectedValue, note.matcherValue);
                    }
                    else {
                        note.result = matcher.evaluator(note.expectedValue);
                    }
                }
                addNoteToIt(note);
                assignReason(note);
                // set It's and its parent Describe's passed property to false when expectation fails
                QueueRunner_1.currentIt.passed = !note.result ? note.result : QueueRunner_1.currentIt.passed;
                QueueRunner_1.currentIt.parent.passed = !note.result ? note.result : QueueRunner_1.currentIt.parent.passed;
            }
            else {
            }
        };
    };
    // console.log("Registering matcher", matcher.apiName);
    expectationAPI[matcher.apiName] = proxy(false);
    if (matcher.negator) {
        negatedExpectationAPI[matcher.apiName] = proxy(true);
    }
    expectationAPICount++;
};
exports.matchersCount = function () { return expectationAPICount; };
//# sourceMappingURL=expect.js.map