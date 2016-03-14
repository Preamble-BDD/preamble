import {IMatcher} from "./matchers/IMatcher";

let expectationAPI = {};
let negatedExpectationAPI = {};
let expectedValue: any;
let actualValue: any;
let result: any;

// add not api to expect api
expectationAPI["not"] = negatedExpectationAPI;

export let expect = <expectationAPI>(ev: any) => {
    expectedValue = ev;
    return expectationAPI;
};

export let registerMatcher = (matcher: IMatcher) => {
    expectationAPI[matcher.apiName] = matcher.evalueator;
    if (matcher.negator) {
        negatedExpectationAPI[matcher.apiName] = matcher.evalueator;
    }
};
