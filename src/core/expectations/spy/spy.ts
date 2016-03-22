import {deepRecursiveCompare} from "../comparators/deeprecursiveequal";

export interface StaticSnoopster {
    (...args): any;
}

export interface It {
    toBeCalled: () => Snoopster;
    toBeCalledWith: () => Snoopster;
    toBeCalledWithContext: (context: {}) => Snoopster;
    toReturn: (value: any) => Snoopster;
    toThrow: () => Snoopster;
    toThrowWithName: (name: string) => Snoopster;
    toThrowWithMessage: (message: string) => Snoopster;
}

export interface Expect {
    it: It;
}

export interface And {
    reset: () => Snoopster;
    callWithContext: (context: {}) => Snoopster;
    throw: () => Snoopster;
    throwWithMessage: (message: string) => Snoopster;
    throwWithName: (name: string) => Snoopster;
    return: (ret: any) => Snoopster;
    callFake: (fn: (...args) => any) => Snoopster;
    callActual: () => Snoopster;
    callStub: () => Snoopster;
    expect: Expect;
}

export interface Expectations {
    toBeCalled: boolean;
    toBeCalledWith: any[];
    toBeCalledWithContext: {};
    toReturn: any;
    toThrow: boolean;
    toThrowWithName: string;
    toThrowWithMessage: string;
}

export interface Calls {
    count: () => number;
    forCall: (i: number) => ACall;
    all: () => ACall[];
    wasCalledWith: (args: any[]) => boolean;
    wasCalledWithContext: (obj: {}) => boolean;
    returned: (value: any) => boolean;
    threw: () => boolean;
    threwWithName: (name: string) => boolean;
    threwWithMessage: (message: string) => boolean;
}

export interface Snoopster extends StaticSnoopster {
    _snoopsterMaker: string;
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
    _expectations: Expectations;
    _resetCalls: () => void;
}

export interface XStatic {
    (argObject: {}, argPropertyNames: string[]): void;
}

export interface SpyOnStatic {
    (...args): Snoopster;
}

export interface ISpyOn extends SpyOnStatic {
    x: XStatic;
}

// args API
export class Args {
    args: any[];
    constructor(...args) {
        this.args = args;
    }
    getLength = (): number => this.args.length ? this.args.length : 0;
    hasArg = (i: number): boolean => i >= 0 && this.getLength() > i ? true : false;
    getArg = (i: number): any => this.hasArg(i) ? this.args[i] : null;
    hasArgProperty = (i: number, propertyName: string): boolean =>
        this.hasArg(i) && propertyName in this.args[i] ? true : false;
    getArgProperty = (i: number, propertyName: string): string =>
        this.hasArgProperty(i, propertyName) ? this.args[i][propertyName] : null;
}

export class ACall {
    constructor(public context: {}, public args: Args,
        public error: Error, public returned: any) { }
    getContext = (): {} => this.context;
    getArgs = (): Args => this.args;
    getArg = (i: number): any => this.args.getArg(i);
    getArgsLength = (): number => this.args.getLength();
    getArgProperty = (i: number, propertyName: string): any => this.args.getArgProperty(i, propertyName);
    hasArgProperty = (i: number, propertyName: string): boolean => this.args.hasArgProperty(i, propertyName);
    hasArg = (i: number): boolean => this.args.hasArg(i);
    getError = (): Error => this.error;
    getReturned = (): any => this.returned;
}

// (argsObject, argProperty)
export let spyOn: SpyOnStatic = (...args): Snoopster => {
    let targetFn: (...args) => any;
    let calls: ACall[] = [];
    if (args.length) {
        if (typeof (args[0]) !== "function" && typeof (args[0]) !== "object") {
            throw new Error("1st parameter must be a function or an object");
        }
        if (typeof (args[0]) === "object" && args.length < 2) {
            throw new Error("expecting 2 parameters - found " + args.length);
        }
        if (typeof (args[0]) === "object" && typeof (args[1]) !== "string") {
            throw new Error("2nd parameter must be a string");
        }
        if (typeof (args[0]) === "object" && typeof (args[0][args[1]]) !== "function") {
            throw new Error("expected " + args[1] + " to be a method");
        }
    }
    // spy api
    targetFn = args.length === 0 ? function() { } :
        typeof (args[0]) === "function" ? args[0] : args[0][args[1]];
    // spy api - tracking
    let snoopster = <Snoopster>function(...args): any {
        let aArgs: Args[] = args.length && args || [];
        let fn: ((...args) => any);
        let error: Error;
        let returned: any;

        function ThrowsException(message, name) {
            this.message = message;
            this.name = name;
        }

        if (snoopster._callActual || snoopster._callFake) {
            fn = snoopster._callFake || targetFn;
            try {
                returned = fn.apply(snoopster._callWithContext || this, aArgs);
            } catch (er) {
                error = er;
            }
        } else if (snoopster._throws) {
            try {
                throw new ThrowsException(snoopster._throwsMessage, snoopster._throwsName);
            } catch (er) {
                error = er;
            }
        }
        if (!snoopster._callActual) {
            returned = snoopster._returns || returned;
        }
        //  snoopster.args = new Args(aArgs);
        calls.push(new ACall(snoopster._callWithContext || this, new Args(aArgs), error, returned));
        return returned;
    };
    snoopster._snoopsterMaker = "preamble.snoopster";
    // stub api
    snoopster._throws = false;
    snoopster._throwsMessage = "";
    snoopster._throwsName = "";
    snoopster.and = <And>{};
    // spy api - sets the spy back to its default state
    snoopster.and.reset = function() {
        calls = [];
        snoopster._resetCalls();
        snoopster._throws = false;
        snoopster._throwsMessage = "";
        snoopster._throwsName = "";
        snoopster._callWithContext = null;
        snoopster._hasExpectations = false;
        snoopster._expectations = <Expectations>{};
        return snoopster;
    };
    snoopster._callWithContext = null;
    snoopster.and.callWithContext = function(context) {
        if (!context || typeof (context) !== "object") {
            throw new Error("callWithContext expects to be called with an object");
        }
        snoopster._callWithContext = context;
        return snoopster;
    };
    snoopster.and.throw = function() {
        snoopster._throws = true;
        // for chaining
        return snoopster;
    };
    snoopster.and.throwWithMessage = function(message) {
        if (typeof (message) !== "string") {
            throw new Error("message expects a string");
        }
        snoopster._throws = true;
        snoopster._throwsMessage = message;
        // for chaining - spy.throws.with.message().and.with.name();
        return snoopster;
    };
    snoopster.and.throwWithName = function(name) {
        if (typeof (name) !== "string") {
            throw new Error("name expects a string");
        }
        snoopster._throws = true;
        snoopster._throwsName = name;
        // for chaining - spy.throws.with.message().and.with.name();
        return snoopster;
    };
    snoopster.and.return = function(ret) {
        snoopster._returns = ret;
        // for chaining
        return snoopster;
    };
    // spy api
    snoopster._resetCalls = function() {
        snoopster._callFake = null;
        snoopster._callActual = this._callStub = false;
    };
    // spy api
    snoopster._callFake = null;
    snoopster.and.callFake = function(fn) {
        if (fn && typeof (fn) !== "function") {
            throw new Error("callFake expects to be called with a function");
        }
        snoopster._resetCalls();
        snoopster._callFake = fn;
        return snoopster;
    };
    // spy api
    snoopster._callActual = false;
    snoopster.and.callActual = function() {
        snoopster._resetCalls();
        snoopster._callActual = true;
        // for chaining
        return snoopster;
    };
    // spy api
    snoopster.and.callStub = function() {
        snoopster._resetCalls();
        snoopster._callActual = false;
        // for chaining
        return snoopster;
    };
    snoopster.calls = {
        count: function() {
            return calls.length;
        },
        forCall: function(i) {
            return i >= 0 && i < calls.length && calls[i] || undefined;
        },
        all: function() {
            return calls;
        },
        wasCalledWith: function(...args1) {
            return calls.some(function(call) {
                let args2 = call.getArgs().args;
                return (deepRecursiveCompare(args1, args2));
            });
        },
        wasCalledWithContext: function(obj) {
            return calls.some(function(call) {
                let context = call.context;
                return (deepRecursiveCompare(obj, context));
            });
        },
        returned: function(value) {
            return calls.some(function(call) {
                let returned = call.getReturned();
                return (deepRecursiveCompare(value, returned));
            });
        },
        threw: function() {
            return calls.some(function(call) {
                return !!call.error;
            });
        },
        threwWithName: function(name) {
            return calls.some(function(call) {
                return call.error && call.error.name === name;
            });
        },
        threwWithMessage: function(message) {
            return calls.some(function(call) {
                return call.error && call.error.message === message;
            });
        }
    };
    // mock api
    snoopster._hasExpectations = false;
    snoopster._expectations = <Expectations>{};
    snoopster.and.expect = <Expect>{
        it: {}
    };
    snoopster.and.expect.it.toBeCalled = function() {
        snoopster._hasExpectations = true;
        snoopster._expectations.toBeCalled = true;
        return snoopster;
    };
    snoopster.and.expect.it.toBeCalledWith = function(...args) {
        snoopster._hasExpectations = true;
        snoopster._expectations.toBeCalledWith = args;
        return snoopster;
    };
    snoopster.and.expect.it.toBeCalledWithContext = function(obj: {}) {
        snoopster._hasExpectations = true;
        snoopster._expectations.toBeCalledWithContext = obj;
        return snoopster;
    };
    snoopster.and.expect.it.toReturn = function(value) {
        snoopster._hasExpectations = true;
        snoopster._expectations.toReturn = value;
        return snoopster;
    };
    snoopster.and.expect.it.toThrow = function() {
        snoopster._hasExpectations = true;
        snoopster._expectations.toThrow = true;
        return snoopster;
    };
    snoopster.and.expect.it.toThrowWithName = function(name: string) {
        snoopster._hasExpectations = true;
        snoopster._expectations.toThrowWithName = name;
        return snoopster;
    };
    snoopster.and.expect.it.toThrowWithMessage = function(message) {
        snoopster._hasExpectations = true;
        snoopster._expectations.toThrowWithMessage = message;
        return snoopster;
    };
    // snoopster.validate = function() {
    //     let notations = require("./expectations/notations.js");
    //
    //     //  if(!snoopster._hasExpectations){
    //     //      throwException(""validate" expects a spy with predefined expectation and found none");
    //     //  }
    //     // Expect the mock to have expectations
    //     notations.noteExpectation(snoopster);
    //     notations.noteMockHasExpectations();
    //     if (snoopster._expectations.toBeCalled) {
    //         notations.noteExpectation(snoopster);
    //         notations.noteToHaveBeenCalled();
    //     }
    //     if (snoopster._expectations.toBeCalledWith) {
    //         notations.noteExpectation(snoopster);
    //         notations.noteToHaveBeenCalledWith.apply(null,
    //             argsToArray(snoopster._expectations.toBeCalledWith));
    //     }
    //     if (snoopster._expectations.toBeCalledWithContext) {
    //         notations.noteExpectation(snoopster);
    //         notations.noteToHaveBeenCalledWithContext(
    //             snoopster._expectations.toBeCalledWithContext);
    //     }
    //     if (snoopster._expectations.toReturn) {
    //         notations.noteExpectation(snoopster);
    //         notations.noteToHaveReturned(snoopster._expectations.toReturn);
    //     }
    //     if (snoopster._expectations.toThrow) {
    //         notations.noteExpectation(snoopster);
    //         notations.noteToHaveThrown();
    //     }
    //     if (snoopster._expectations.toThrowWithName) {
    //         notations.noteExpectation(snoopster);
    //         notations.noteToHaveThrownWithName(snoopster._expectations.toThrowWithName);
    //     }
    //     if (snoopster._expectations.toThrowWithMessage) {
    //         notations.noteExpectation(snoopster);
    //         notations.noteToHaveThrownWithMessage(snoopster._expectations.toThrowWithMessage);
    //     }
    // };
    if (args.length && typeof (args[0]) !== "function" &&
        typeof (args[0]) === "object") {
        args[0][args[1]] = snoopster;
    }
    return snoopster;
};

/**
 * @param {object} argObject An object whose properties identified by
 * the elements in argPropertyNames are to be spies.
 * @param {array} argPropertyNames An array of strings whose elements
 * identify the methods in argObject to be spies.
 * @param {[object]} context An object to use as the context when calling
 * the spied property methods.
 */
 (<ISpyOn>spyOn).x = (argObject, argPropertyNames) => {
    let i,
        len;
    if (!argObject || typeof (argObject) !== "object") {
        throw new Error("expected an object for 1st parameter - found " +
            typeof (argObject));
    }
    if (!argPropertyNames || !Array.isArray(argPropertyNames)) {
        throw new Error("expected an array for 2nd parameter - found " +
            typeof (argObject));
    }
    if (!argPropertyNames.length) {
        throw new Error("expected an array for 2nd parameter with at " +
            "least one element for 2nd parameter");
    }
    for (i = 0, len = argPropertyNames.length; i < len; i++) {
        if (typeof (argPropertyNames[i]) !== "string") {
            throw new Error("expected element " + i +
                " of 2nd parameter to be a string");
        }
        if (!argObject[argPropertyNames[i]]) {
            throw new Error("expected 1st paramter to have property " +
                argPropertyNames[i]);
        }
        if (typeof (argObject[argPropertyNames[i]]) !== "function") {
            throw new Error("expected " + argPropertyNames[i] +
                " to be a method");
        }
    }
    argPropertyNames.forEach(function(property) {
        spyOn(argObject, property);
    });
};
