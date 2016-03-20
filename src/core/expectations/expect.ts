import {IMatcher} from "./matchers/IMatcher";
import {spyOn} from "./spy/spy";

let matchers: IMatcher[] = [];
let expectationAPI = {};
let expectationAPICount = 0;
let negatedExpectationAPI = {};

interface INote {
    apiName: string;
    expectedValue: any;
    matcherValue: any;
    result: boolean;
    exception?: Error;
}

let note: INote;

let argsChecker = (matcher, argsLength): boolean => {
    // TODO(JS): allow for an unknow max number of args
    if (argsLength < matcher.minArgs || argsLength > matcher.maxArgs) {
        note.exception = new Error(`${matcher.apiName}(): invalid arguments`);
        return false;
    }
    return true;
};

// add not api to expect api
expectationAPI["not"] = negatedExpectationAPI;

// expect(value)
export let expect = (ev: any): {} => {
    // if a callback was returned then call it and use what it returns for the expected value
    let expectedValue = ev;
    if (typeof (ev) === "function" && !ev.hasOwnProperty("_snoopsterMaker")) {
        let spy = spyOn(ev).and.callActual();
        expectedValue = spy();
    }
    note = { apiName: null, expectedValue: expectedValue, matcherValue: null, result: null, exception: null };
    return expectationAPI;
};

export let registerMatcher = (matcher: IMatcher): void => {
    let proxy = (...args): void => {
        note.apiName = matcher.apiName;
        if (argsChecker(matcher, args.length)) {
            // don't call matcher.api if it doesn't return a value (e.g. toBeTrue)
            note.matcherValue = matcher.minArgs > 0 && matcher.api.apply(null, args) || note.matcherValue;
            // if a callback was returned then call it and use what it returns for the matcher value
            note.matcherValue = note.matcherValue && typeof (note.matcherValue) === "function" && note.matcherValue() || note.matcherValue;
            if (matcher.minArgs) {
                note.result = matcher.evalueator(note.expectedValue, note.matcherValue);
            } else {
                note.result = matcher.evalueator(note.expectedValue);
            }
            console.log("note", note);
        } else {
            console.log("note", note);
        }
    };
    let proxyNot = (...args): void => {
        note.apiName = "not." + matcher.apiName;
        if (argsChecker(matcher, args.length)) {
            // don't call matcher.api if it doesn't return a value (e.g. toBeTrue)
            note.matcherValue = matcher.minArgs > 0 && matcher.api.apply(null, args) || note.matcherValue;
            // if a callback was returned then call it and use what it returns for the matcher value
            note.matcherValue = note.matcherValue && typeof (note.matcherValue) === "function" && note.matcherValue() || note.matcherValue;
            if (matcher.minArgs) {
                note.result = !matcher.evalueator(note.expectedValue, note.matcherValue);
            } else {
                note.result = !matcher.evalueator(note.expectedValue);
            }
            console.log("note", note);
        } else {
            console.log("note", note);
        }
    };
    console.log("Registering matcher", matcher.apiName);
    expectationAPI[matcher.apiName] = proxy;
    if (matcher.negator) {
        negatedExpectationAPI[matcher.apiName] = proxyNot;
    }
    expectationAPICount++;
};

export let matchersCount = (): number => expectationAPICount;
