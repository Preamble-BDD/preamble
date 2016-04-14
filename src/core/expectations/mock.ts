/**
 * Mock API
 */

import {Spy} from "./spy/spy";
import {SpyOnStatic} from "./spy/spy";
import {spyOn} from "./spy/spy";
import {INote} from "./INote";
import {currentIt} from "../queue/QueueRunner";
import {stackTrace} from "../stacktrace/StackTrace";
import {IMatcher} from "./matchers/IMatcher";

export interface MockStatic {
    (...args: any[]): MockProxy;
}

export interface MockProxyStatic {
    (...args): void;
}

export interface MockProxy extends MockProxyStatic {
    and: And;
    validate: () => void;
}

export interface And {
    expect: Expect;
}

export interface Expect {
    it: It;
}

interface MockApi {
    not: {};
}

let mockAPI: MockApi = { not: {} };
let mockAPICount = 0;
let negatedMockAPI = {};

export interface It {
    toBeCalled: () => MockProxy;
    toBeCalledWith: (...args) => MockProxy;
    toBeCalledWithContext: (context: {}) => Spy;
    toReturn: (value: any) => Spy;
    toThrow: () => Spy;
    toThrowWithName: (name: string) => Spy;
    toThrowWithMessage: (message: string) => Spy;
    not: Not;
}

export interface Not {
    toBeCalled: () => MockProxy;
    toBeCalledWith: (...args) => MockProxy;
    toBeCalledWithContext: (context: {}) => Spy;
    toReturn: (value: any) => Spy;
    toThrow: () => Spy;
    toThrowWithName: (name: string) => Spy;
    toThrowWithMessage: (message: string) => Spy;
};

interface ApiToCall {
    note: INote;
    args?: any;
}

interface Proxy {
    (...args): void;
}

let registerMatcher = (matcher: IMatcher): void => {
    if (matcher.negator) {
        mockAPI.not["not." + matcher.apiName] = (...args) => !matcher.evaluator.apply(null, args);
    }
    mockAPI[matcher.apiName] = (...args) => matcher.evaluator.apply(null, args);
};

registerMatcher({
    apiName: "toBeCalled",
    api: (): void => { },
    evaluator: (expectedValue: Spy): boolean => expectedValue.calls.count() > 0,
    negator: true,
    minArgs: 0,
    maxArgs: 0
});
registerMatcher({
    apiName: "toBeCalledWith",
    api: (...matcherValue): any[] => matcherValue,
    evaluator: (expectedValue: Spy, matcherValue): boolean =>
        expectedValue.calls.wasCalledWith.apply(null, matcherValue),
    negator: true,
    minArgs: 1,
    maxArgs: -1
});

export let mock: MockStatic = (...args: any[]): MockProxy => {
    let st = stackTrace.stackTrace;
    let aSpy: Spy = spyOn.apply(null, args);
    let _mock: MockProxyStatic = (...args): void => {
        // when called _mock delegates its calls to the spy
        aSpy.apply(null, args);
    };

    // mock api
    let _mockProxy = <MockProxy>_mock;
    let apisToCall: ApiToCall[] = [];
    _mockProxy.and = <And>{};
    _mockProxy.and.expect = <Expect>{ it: { not: {} } };
    _mockProxy.and.expect.it.toBeCalled = (): MockProxy => {
        apisToCall.push({
            note: { it: currentIt, apiName: "toBeCalled", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mockProxy;
    };
    _mockProxy.and.expect.it.not.toBeCalled = (): MockProxy => {
        apisToCall.push({
            note: { it: currentIt, apiName: "not.toBeCalled", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mockProxy;
    };
    _mockProxy.and.expect.it.toBeCalledWith = (...args): MockProxy => {
        apisToCall.push({
            args: args,
            note: { it: currentIt, apiName: "toBeCalledWith", expectedValue: aSpy, matcherValue: args, result: null, exception: null, stackTrace: st }
        });
        return _mockProxy;
    };
    _mockProxy.and.expect.it.not.toBeCalledWith = (...args): MockProxy => {
        apisToCall.push({
            args: args,
            note: { it: currentIt, apiName: "not.toBeCalledWith", expectedValue: aSpy, matcherValue: args, result: null, exception: null, stackTrace: st }
        });
        return _mockProxy;
    };
    _mockProxy.and.expect.it.toBeCalledWithContext;
    _mockProxy.and.expect.it.toReturn;
    _mockProxy.and.expect.it.toThrow;
    _mockProxy.and.expect.it.toThrowWithName;
    _mockProxy.and.expect.it.toThrowWithMessage;

    // mock validtation
    _mockProxy.validate = (): void => {
        apisToCall.forEach((apiToCall) => {
            let negated = /not\./.test(apiToCall.note.apiName);
            let reason: string;
            if (apiToCall.args) {
                apiToCall.note.result = negated ?
                    mockAPI.not[apiToCall.note.apiName](apiToCall.note.expectedValue, apiToCall.note.matcherValue) :
                    mockAPI[apiToCall.note.apiName](apiToCall.note.expectedValue, apiToCall.note.matcherValue);
            } else {
                apiToCall.note.result = negated ?
                    mockAPI.not[apiToCall.note.apiName](apiToCall.note.expectedValue) :
                    mockAPI[apiToCall.note.apiName](apiToCall.note.expectedValue);
            }
            currentIt.passed = apiToCall.note.result && currentIt.passed || false;
            currentIt.parent.passed = apiToCall.note.result && currentIt.passed || false;
            currentIt.expectations.push(apiToCall.note);
            if (!apiToCall.note.result) {
                if (apiToCall.note.matcherValue) {
                    reason = `mock().and.expect.it.${apiToCall.note.apiName}(${apiToCall.note.matcherValue}) failed!`;
                } else {
                    reason = `mock().and.expect.it.${apiToCall.note.apiName}() failed!`;
                }
                currentIt.reasons.push({ reason: reason, stackTrace: apiToCall.note.stackTrace });
            }
        });
    };
    return _mockProxy;
};

// test api here
// let aMock = mock().and.expect.it.toBeCalled();
