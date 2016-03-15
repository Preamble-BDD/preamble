import {registerMatcher} from "../expect";

// toBeTrue/not.toBeTrue matchers
registerMatcher({
    apiName: "toBeTrue",
    api(actualValue: any): void { },
    evalueator(expectedValue): boolean { return expectedValue === true; },
    negator: true,
    minArgs: 0,
    maxArgs: 0
});

// toEqual/not.toEqual matchers
registerMatcher({
    apiName: "toEqual",
    api(actualValue: any): any { return actualValue; },
    evalueator(expectedValue, actualValue): boolean { return expectedValue === actualValue; },
    negator: true,
    minArgs: 1,
    maxArgs: 1
});

// toBeUndefined/not.toBeUndefined matchers
registerMatcher({
    apiName: "toBeUndefined",
    api(actualValue: any): void { },
    evalueator(expectedValue): boolean { return expectedValue === undefined; },
    negator: true,
    minArgs: 0,
    maxArgs: 0
});

// toBeNull/not.toBeNull matchers
registerMatcher({
    apiName: "toBeNull",
    api(actualValue: any): void { },
    evalueator(expectedValue): boolean { return expectedValue === null; },
    negator: true,
    minArgs: 0,
    maxArgs: 0
});
