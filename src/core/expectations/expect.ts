// TODO(js): this needs to be refactored so it can be configured by main.
// For examele, this module currently has to import configuration so that
// it has access to the short circuit property, which main should really
// be passing to configure expectations.

import {IMatcher} from "./matchers/IMatcher";
import {INote} from "./INote";
import {spyOn} from "./spy/spy";
import {currentIt} from "../queue/QueueRunner";
import {stackTrace} from "../stacktrace/StackTrace";
import {DeepRecursiveCompare} from "./comparators/deeprecursiveequal";
import {configuration} from "../configuration/configuration";

let expectationAPI = {};
let expectationAPICount = 0;
let negatedExpectationAPI = {};

// add not api to expect api
expectationAPI["not"] = negatedExpectationAPI;

interface Proxy {
    (...args): void;
}

let note: INote;

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
let argsChecker = (matcher, argsLength): boolean => {
    // fails if minArgs > maxArgs
    if (matcher.minArgs !== -1 && matcher.maxArgs !== -1 &&
        matcher.minArgs > matcher.maxArgs) {
        return false;
    }
    // allows for a variable number of args.
    if (matcher.minArgs !== -1 && argsLength < matcher.minArgs ||
        matcher.maxArgs !== -1 && argsLength > matcher.maxArgs) {
        note.exception = new Error(`${matcher.apiName}(): invalid arguments`);
        return false;
    }
    return true;
};

let addNoteToIt = (note: INote) => currentIt.expectations.push(note);

let showAs = (value: any): string => {
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
        return `"${value}"`;
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

let assignReason = (note: INote) => {
    let reason: string;
    if (!note.result) {
        if (note.matcherValue != null) {
            reason = `expect(${showAs(note.expectedValue)}).${note.apiName}(${showAs(note.matcherValue)}) failed`;
        } else {
            reason = `expect(${showAs(note.expectedValue)}).${note.apiName}() failed`;
        }
        console.log("configuration.shortCircuit", configuration.shortCircuit);
        reason = configuration.shortCircuit ? reason + " and testing has been short circuited" : reason;
        reason += "!";
        currentIt.reasons.push({ reason: reason, stackTrace: note.stackTrace });
    }
};

export interface Expect {
    (ev: any): {};
}

// expect(value)
export let expect: Expect = (ev: any): {} => {
    // if a callback was returned then call it and use what it returns for the expected value
    let expectedValue = ev;
    // capture the stack trace here when expect is called.
    let st = stackTrace.stackTrace;
    if (typeof (ev) === "function" && !ev.hasOwnProperty("_spyMarker")) {
        let spy = spyOn(ev).and.callActual();
        expectedValue = spy();
    }
    note = { it: currentIt, apiName: null, expectedValue: expectedValue, matcherValue: null, result: null, exception: null, stackTrace: st };
    return expectationAPI;
};

export interface RegisterMatcher {
    (matcher: IMatcher): void;
}

export interface RegisterMatcherHelpers {
    deepRecursiveCompare: DeepRecursiveCompare;
}

export interface RegisterMatchers {
    (registerMatcher: RegisterMatcher, helpers: RegisterMatcherHelpers): void;
}

export let registerMatcher: RegisterMatcher = (matcher: IMatcher): void => {
    let proxy = (not: boolean): Proxy => {
        return (...args): void => {
            note.apiName = not ? "not." + matcher.apiName : matcher.apiName;
            if (argsChecker(matcher, args.length)) {
                // don't call matcher.api if it doesn't return a value (e.g. toBeTrue)
                note.matcherValue = matcher.minArgs > 0 ? matcher.api.apply(null, args) : note.matcherValue;
                // if a callback was returned then call it and use what it returns for the matcher value
                note.matcherValue = note.matcherValue && typeof (note.matcherValue) === "function" && note.matcherValue() || note.matcherValue;
                if (not) {
                    if (matcher.minArgs) {
                        note.result = !matcher.evaluator(note.expectedValue, note.matcherValue);
                    } else {
                        note.result = !matcher.evaluator(note.expectedValue);
                    }
                } else {
                    if (matcher.minArgs) {
                        note.result = matcher.evaluator(note.expectedValue, note.matcherValue);
                    } else {
                        note.result = matcher.evaluator(note.expectedValue);
                    }
                }
                addNoteToIt(note);
                assignReason(note);
                // set It's and its parent Describe's passed property to false when expectation fails
                currentIt.passed = !note.result ? note.result : currentIt.passed;
                currentIt.parent.passed = !note.result ? note.result : currentIt.parent.passed;
                // console.log("note", note);
            } else {
                // console.log("note", note);
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

export let matchersCount = (): number => expectationAPICount;
