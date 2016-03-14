import {expect} from "../expect";
import {registerMatcher} from "../expect";

// toBeTrue/not.toBeTrue matchers
registerMatcher({
    apiName: "toBeTrue",
    evalueator(expectedValue): boolean {
        return expectedValue === true;
    },
    negator(expectedValue): boolean {
        return expectedValue === true;
    }
});

// toEqual/not.toEqual matchers
registerMatcher({
    apiName: "toEqual",
    evalueator(expectedValue, actualValue): boolean {
        return expectedValue === actualValue;
    },
    negator(expectedValue, actualValue): boolean {
        return expectedValue !== actualValue;
    }
});
