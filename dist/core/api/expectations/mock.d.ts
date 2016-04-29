export interface MockStatic {
    (...args: any[]): Mock;
}
export interface MockProxyStatic {
    (...args: any[]): void;
}
export interface Mock extends MockProxyStatic {
    and: And;
    validate: () => void;
}
export interface And {
    expect: Expect;
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
export declare let mock: MockStatic;
