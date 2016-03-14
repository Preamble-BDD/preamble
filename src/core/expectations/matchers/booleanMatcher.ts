import {expect} from "../expect";
import {registerMatcher} from "../expect";

// toBeTrue/not.toBeTrue matchers
registerMatcher({
    apiName: "toBeTrue",
    evalueator(expectedValue): boolean {
        return expectedValue === true;
    },
    negator: true,
    minArgs: 0,
    maxArgs: 0
});

// toEqual/not.toEqual matchers
registerMatcher({
    apiName: "toEqual",
    evalueator(expectedValue, actualValue): boolean {
        return expectedValue === actualValue;
    },
    negator: true,
    minArgs: 0,
    maxArgs: 0
});
