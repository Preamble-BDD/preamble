/**
 * Mock API
 * WARNING: mock is an experimental api and may not be included in the official release.
 */

import {Spy} from "./spy/spy";
import {spyOn} from "./spy/spy";
import {INote} from "./INote";
import {getCurrentIt} from "../../queue/QueueRunner";
import {stackTrace} from "../../stacktrace/StackTrace";
import {IMatcher} from "./matchers/IMatcher";

export interface MockStatic {
    (...args: any[]): Mock;
}

export interface MockProxyStatic {
    (...args): void;
}

export interface Mock extends MockProxyStatic {
    and: And;
    validate: () => void;
}

export interface And {
    expect: Expect;
    // since a mock is also a spy, these methods delegate to the spy property
    reset: () => Mock;
    callWithContext: (context: {}) => Mock;
    throw: () => Mock;
    throwWithMessage: (message: string) => Mock;
    throwWithName: (name: string) => Mock;
    return: (ret: any) => Mock;
    callFake: (fn: (...args) => any) => Mock;
    callActual: () => Mock;
    callStub: () => Mock;
}

export interface Expect {
    it: It;
}

interface MockApi {
    not: {};
}

export interface It {
    toBeCalled: () => Mock;
    toBeCalledWith: (...args) => Mock;
    toBeCalledWithContext: (context: {}) => Mock;
    toReturnValue: (value: any) => Mock;
    toThrow: () => Mock;
    toThrowWithName: (name: string) => Mock;
    toThrowWithMessage: (message: string) => Mock;
    not: Not;
}

export interface Not {
    toBeCalled: () => Mock;
    toBeCalledWith: (...args) => Mock;
    toBeCalledWithContext: (context: {}) => Mock;
    toReturnValue: (value: any) => Mock;
    toThrow: () => Mock;
    toThrowWithName: (name: string) => Mock;
    toThrowWithMessage: (message: string) => Mock;
}

interface ApiToCall {
    note: INote;
    args?: any;
}

interface Proxy {
    (...args): void;
}

let mockAPI: MockApi = { not: {} };
let mockAPICount = 0;
let negatedMockAPI = {};

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
registerMatcher({
    apiName: "toBeCalledWithContext",
    api: (matcherValue): {} => matcherValue,
    evaluator: (expectedValue: Spy, matcherValue): boolean =>
        expectedValue.calls.wasCalledWithContext(matcherValue),
    negator: true,
    minArgs: 1,
    maxArgs: 1
});
registerMatcher({
    apiName: "toReturnValue",
    api: (matcherValue): any => matcherValue,
    evaluator: (expectedValue: Spy, matcherValue): boolean =>
        expectedValue.calls.returned(matcherValue),
    negator: true,
    minArgs: 1,
    maxArgs: 1
});
registerMatcher({
    apiName: "toThrow",
    api: (): void => { },
    evaluator: (expectedValue: Spy): boolean =>
        expectedValue.calls.threw(),
    negator: true,
    minArgs: 0,
    maxArgs: 0
});
registerMatcher({
    apiName: "toThrowWithMessage",
    api: (matcherValue): string => matcherValue,
    evaluator: (expectedValue: Spy, matcherValue: string): boolean =>
        expectedValue.calls.threwWithMessage(matcherValue),
    negator: true,
    minArgs: 1,
    maxArgs: 1
});
registerMatcher({
    apiName: "toThrowWithName",
    api: (matcherValue): string => matcherValue,
    evaluator: (expectedValue: Spy, matcherValue: string): boolean =>
        expectedValue.calls.threwWithName(matcherValue),
    negator: true,
    minArgs: 1,
    maxArgs: 1
});

export let mock: MockStatic = (...args: any[]): Mock => {
    let st = stackTrace.stackTrace;
    let aSpy: Spy = spyOn.apply(null, args);
    let _mockProxyStatic: MockProxyStatic = function (...args): void { // intentionally not using lamda because of "_this"
        // when called _mockProxyStatic delegates its calls to the spy
        aSpy.apply(this, args);
    };
    // mock api
    let _mock = <Mock>_mockProxyStatic;
    let apisToCall: ApiToCall[] = [];
    _mock.and = <And>{};
    _mock.and.expect = <Expect>{ it: { not: {} } };
    _mock.and.expect.it.toBeCalled = (): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "toBeCalled", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toBeCalled = (): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "not.toBeCalled", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toBeCalledWith = (...args): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "toBeCalledWith", expectedValue: aSpy, matcherValue: args, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toBeCalledWith = (...args): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "not.toBeCalledWith", expectedValue: aSpy, matcherValue: args, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toBeCalledWithContext = (context: {}): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "toBeCalledWithContext", expectedValue: aSpy, matcherValue: context, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toBeCalledWithContext = (context: {}): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "not.toBeCalledWithContext", expectedValue: aSpy, matcherValue: context, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toReturnValue = (value: any): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "toReturnValue", expectedValue: aSpy, matcherValue: value, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toReturnValue = (value: any): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "not.toReturnValue", expectedValue: aSpy, matcherValue: value, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toThrow = (): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "toThrow", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toThrow = (): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "not.toThrow", expectedValue: aSpy, matcherValue: null, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toThrowWithName = (name: string): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "toThrowWithName", expectedValue: aSpy, matcherValue: name, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toThrowWithName = (name: string): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "not.toThrowWithName", expectedValue: aSpy, matcherValue: name, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.toThrowWithMessage = (message: string): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "toThrowWithMessage", expectedValue: aSpy, matcherValue: message, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };
    _mock.and.expect.it.not.toThrowWithMessage = (message: string): Mock => {
        apisToCall.push({
            note: { it: getCurrentIt(), apiName: "not.toThrowWithMessage", expectedValue: aSpy, matcherValue: message, result: null, exception: null, stackTrace: st }
        });
        return _mock;
    };

    // methods that delegate to the spy property
    _mock.and.reset = (): Mock => {
        aSpy.and.reset();
        return _mock;
    };
    _mock.and.callWithContext = (context: {}): Mock => {
        aSpy.and.callWithContext(context);
        return _mock;
    };
    _mock.and.throw = (): Mock => {
        aSpy.and.throw();
        return _mock;
    };
    _mock.and.throwWithMessage = (message: string): Mock => {
        aSpy.and.throwWithMessage(message);
        return _mock;
    };
    _mock.and.throwWithName = (name: string): Mock => {
        aSpy.and.throwWithName(name);
        return _mock;
    };
    _mock.and.return = (ret: any): Mock => {
        aSpy.and.return(ret);
        return _mock;
    };
    _mock.and.callFake = (fn: (...args) => any): Mock => {
        aSpy.and.callFake(fn);
        return _mock;
    };
    _mock.and.callActual = (): Mock => {
        aSpy.and.callActual();
        return _mock;
    };
    _mock.and.callStub = (): Mock => {
        aSpy.and.callStub();
        return _mock;
    };

    // mock validtation
    _mock.validate = (): void => {
        apisToCall.forEach((apiToCall) => {
            let negated = /not\./.test(apiToCall.note.apiName);
            let reason: string;
            if (apiToCall.note.matcherValue) {
                apiToCall.note.result = negated ?
                    mockAPI.not[apiToCall.note.apiName](apiToCall.note.expectedValue, apiToCall.note.matcherValue) :
                    mockAPI[apiToCall.note.apiName](apiToCall.note.expectedValue, apiToCall.note.matcherValue);
            } else {
                apiToCall.note.result = negated ?
                    mockAPI.not[apiToCall.note.apiName](apiToCall.note.expectedValue) :
                    mockAPI[apiToCall.note.apiName](apiToCall.note.expectedValue);
            }
            getCurrentIt().passed = apiToCall.note.result && getCurrentIt().passed || false;
            getCurrentIt().parent.passed = apiToCall.note.result && getCurrentIt().passed || false;
            getCurrentIt().expectations.push(apiToCall.note);
            if (!apiToCall.note.result) {
                if (apiToCall.note.matcherValue) {
                    reason = `mock().and.expect.it.${apiToCall.note.apiName}(${apiToCall.note.matcherValue}) failed!`;
                } else {
                    reason = `mock().and.expect.it.${apiToCall.note.apiName}() failed!`;
                }
                getCurrentIt().reasons.push({ reason: reason, stackTrace: apiToCall.note.stackTrace });
            }
        });
    };
    return _mock;
};

// test api here
// let aMock = mock().and.expect.it.toBeCalled();
