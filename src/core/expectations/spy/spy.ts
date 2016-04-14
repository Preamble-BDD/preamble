import {deepRecursiveCompare} from "../comparators/deeprecursiveequal";

export interface StaticSpy {
    (...args): any;
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
    (...args): Spy;
}

export interface SpyOn extends SpyOnStatic {
    x: (argObject: {}, argPropertyNames: string[]) => void;
}

// args API
export class Args {
    args: any[];
    constructor(args) {
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

export let spyOn: SpyOnStatic = (...args): Spy => {
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
    let spy = <Spy>function(...args): any {
        let aArgs: Args[] = args.length && args || [];
        let fn: ((...args) => any);
        let error: Error;
        let returned: any;

        function ThrowsException(message, name) {
            this.message = message;
            this.name = name;
        }

        if (spy._callActual || spy._callFake) {
            fn = spy._callFake || targetFn;
            try {
                returned = fn.apply(spy._callWithContext || this, aArgs);
            } catch (er) {
                error = er;
            }
        } else if (spy._throws) {
            try {
                throw new ThrowsException(spy._throwsMessage, spy._throwsName);
            } catch (er) {
                error = er;
            }
        }
        if (!spy._callActual) {
            returned = spy._returns || returned;
        }
        calls.push(new ACall(spy._callWithContext || this, new Args(aArgs), error, returned));
        return returned;
    };
    spy._spyMarker = "preamble.spy";
    // stub api
    spy._throws = false;
    spy._throwsMessage = "";
    spy._throwsName = "";
    spy.and = <And>{};
    // spy api - sets the spy back to its default state
    spy.and.reset = function() {
        calls = [];
        spy._resetCalls();
        spy._throws = false;
        spy._throwsMessage = "";
        spy._throwsName = "";
        spy._callWithContext = null;
        spy._hasExpectations = false;
        return spy;
    };
    spy._callWithContext = null;
    spy.and.callWithContext = function(context) {
        if (!context || typeof (context) !== "object") {
            throw new Error("callWithContext expects to be called with an object");
        }
        spy._callWithContext = context;
        return spy;
    };
    spy.and.throw = function() {
        spy._throws = true;
        // for chaining
        return spy;
    };
    spy.and.throwWithMessage = function(message) {
        if (typeof (message) !== "string") {
            throw new Error("message expects a string");
        }
        spy._throws = true;
        spy._throwsMessage = message;
        // for chaining - spy.throws.with.message().and.with.name();
        return spy;
    };
    spy.and.throwWithName = function(name) {
        if (typeof (name) !== "string") {
            throw new Error("name expects a string");
        }
        spy._throws = true;
        spy._throwsName = name;
        // for chaining - spy.throws.with.message().and.with.name();
        return spy;
    };
    spy.and.return = function(ret) {
        spy._returns = ret;
        // for chaining
        return spy;
    };
    // spy api
    spy._resetCalls = function() {
        spy._callFake = null;
        spy._callActual = this._callStub = false;
    };
    // spy api
    spy._callFake = null;
    spy.and.callFake = function(fn) {
        if (fn && typeof (fn) !== "function") {
            throw new Error("callFake expects to be called with a function");
        }
        spy._resetCalls();
        spy._callFake = fn;
        return spy;
    };
    // spy api
    spy._callActual = false;
    spy.and.callActual = function() {
        spy._resetCalls();
        spy._callActual = true;
        // for chaining
        return spy;
    };
    // spy api
    spy.and.callStub = function() {
        spy._resetCalls();
        spy._callActual = false;
        // for chaining
        return spy;
    };
    spy.calls = {
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
    if (args.length && typeof (args[0]) !== "function" &&
        typeof (args[0]) === "object") {
        args[0][args[1]] = spy;
    }
    return spy;
};

/**
 * @param {object} argObject An object whose properties identified by
 * the elements in argPropertyNames are to be spies.
 * @param {array} argPropertyNames An array of strings whose elements
 * identify the methods in argObject to be spies.
 * @param {[object]} context An object to use as the context when calling
 * the spied property methods.
 */
(<SpyOn>spyOn).x = (argObject, argPropertyNames) => {
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
