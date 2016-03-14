import {IMatcher} from "./matchers/IMatcher";

let expectationAPI = {};
let negatedExpectationAPI = {};
let expectedValue: any;
let actualValue: any;
let result: boolean;
let argsChecker = (apiName: string, n: number, required: number): void => {
    if (n !== required) {
        throw new Error(`${apiName} requires ${required} args - found ${n} args`);
    }
};

// add not api to expect api
expectationAPI["not"] = negatedExpectationAPI;

export let expect = (ev: any): {} => {
    expectedValue = ev;
    return expectationAPI;
};

export let registerMatcher = (matcher: IMatcher) => {
    expectationAPI[matcher.apiName] = matcher;
    if (matcher.negator) {
        negatedExpectationAPI[matcher.apiName] = matcher;
    }
};
