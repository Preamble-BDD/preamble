import {registerMatcher} from "../expect";
import {deepRecursiveCompare} from "../comparators/deeprecursiveequal";

// toBeTrue/not.toBeTrue matchers
registerMatcher({
    apiName: "toBeTrue",
    api: (actualValue: any): void => { },
    evalueator: (expectedValue): boolean => expectedValue === true,
    negator: true,
    minArgs: 0,
    maxArgs: 0
});

// toBeTruthy/not.toBeTruthy matchers
registerMatcher({
    apiName: "toBeTruthy",
    api: (actualValue: any): void => { },
    evalueator: (expectedValue): boolean => !!expectedValue,
    negator: true,
    minArgs: 0,
    maxArgs: 0
});

// toBe/not.toBe matchers
registerMatcher({
    apiName: "toBe",
    api: (actualValue: any): any =>  actualValue,
    evalueator: (expectedValue, actualValue): boolean => expectedValue === actualValue,
    negator: true,
    minArgs: 1,
    maxArgs: 1
});

// toEqual/not.toEqual matchers
registerMatcher({
    apiName: "toEqual",
    api: (actualValue: any): any => actualValue,
    evalueator: (expectedValue, actualValue): boolean => deepRecursiveCompare(expectedValue, actualValue),
    negator: true,
    minArgs: 1,
    maxArgs: 1
});

// toBeUndefined/not.toBeUndefined matchers
registerMatcher({
    apiName: "toBeUndefined",
    api: (actualValue: any): void => { },
    evalueator: (expectedValue): boolean => expectedValue === undefined,
    negator: true,
    minArgs: 0,
    maxArgs: 0
});

// toBeNull/not.toBeNull matchers
registerMatcher({
    apiName: "toBeNull",
    api: (actualValue: any): void => { },
    evalueator: (expectedValue): boolean => expectedValue === null,
    negator: true,
    minArgs: 0,
    maxArgs: 0
});
