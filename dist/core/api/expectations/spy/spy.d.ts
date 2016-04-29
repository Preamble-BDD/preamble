export interface StaticSpy {
    (...args: any[]): any;
}
export interface And {
    reset: () => Spy;
    callWithContext: (context: {}) => Spy;
    throw: () => Spy;
    throwWithMessage: (message: string) => Spy;
    throwWithName: (name: string) => Spy;
    return: (ret: any) => Spy;
    callFake: (fn: (...args) => any) => Spy;
    callActual: () => Spy;
    callStub: () => Spy;
}
export interface Calls {
    count: () => number;
    forCall: (i: number) => ACall;
    all: () => ACall[];
    wasCalledWith: (...args) => boolean;
    wasCalledWithContext: (obj: {}) => boolean;
    returned: (value: any) => boolean;
    threw: () => boolean;
    threwWithName: (name: string) => boolean;
    threwWithMessage: (message: string) => boolean;
}
export interface Spy extends StaticSpy {
    _spyMarker: string;
    _returns: any;
    _callActual: boolean;
    _callFake: (...args) => any;
    _callWithContext: {};
    _throws: boolean;
    _throwsMessage: string;
    _throwsName: string;
    _hasExpectations: boolean;
    and: And;
    calls: Calls;
    validate: () => void;
    _resetCalls: () => void;
}
export interface SpyOnStatic {
    (...args: any[]): Spy;
}
export interface SpyOnN {
    (argObject: {}, argPropertyNames: string[]): void;
}
export declare class Args {
    args: any[];
    constructor(args: any);
    getLength: () => number;
    hasArg: (i: number) => boolean;
    getArg: (i: number) => any;
    hasArgProperty: (i: number, propertyName: string) => boolean;
    getArgProperty: (i: number, propertyName: string) => string;
}
export declare class ACall {
    context: {};
    args: Args;
    error: Error;
    returned: any;
    constructor(context: {}, args: Args, error: Error, returned: any);
    getContext: () => {};
    getArgs: () => Args;
    getArg: (i: number) => any;
    getArgsLength: () => number;
    getArgProperty: (i: number, propertyName: string) => any;
    hasArgProperty: (i: number, propertyName: string) => boolean;
    hasArg: (i: number) => boolean;
    getError: () => Error;
    getReturned: () => any;
}
export declare let spyOn: SpyOnStatic;
/**
 * @param {object} argObject An object whose properties identified by
 * the elements in argPropertyNames are to be spies.
 * @param {array} argPropertyNames An array of strings whose elements
 * identify the methods in argObject to be spies.
 * @param {[object]} context An object to use as the context when calling
 * the spied property methods.
 */
export declare let spyOnN: SpyOnN;
