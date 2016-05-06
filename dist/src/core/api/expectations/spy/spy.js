"use strict";
var deeprecursiveequal_1 = require("../comparators/deeprecursiveequal");
// args API
var Args = (function () {
    function Args(args) {
        var _this = this;
        this.getLength = function () { return _this.args.length ? _this.args.length : 0; };
        this.hasArg = function (i) { return i >= 0 && _this.getLength() > i ? true : false; };
        this.getArg = function (i) { return _this.hasArg(i) ? _this.args[i] : null; };
        this.hasArgProperty = function (i, propertyName) {
            return _this.hasArg(i) && propertyName in _this.args[i] ? true : false;
        };
        this.getArgProperty = function (i, propertyName) {
            return _this.hasArgProperty(i, propertyName) ? _this.args[i][propertyName] : null;
        };
        this.args = args;
    }
    return Args;
}());
exports.Args = Args;
var ACall = (function () {
    function ACall(context, args, error, returned) {
        var _this = this;
        this.context = context;
        this.args = args;
        this.error = error;
        this.returned = returned;
        this.getContext = function () { return _this.context; };
        this.getArgs = function () { return _this.args; };
        this.getArg = function (i) { return _this.args.getArg(i); };
        this.getArgsLength = function () { return _this.args.getLength(); };
        this.getArgProperty = function (i, propertyName) { return _this.args.getArgProperty(i, propertyName); };
        this.hasArgProperty = function (i, propertyName) { return _this.args.hasArgProperty(i, propertyName); };
        this.hasArg = function (i) { return _this.args.hasArg(i); };
        this.getError = function () { return _this.error; };
        this.getReturned = function () { return _this.returned; };
    }
    return ACall;
}());
exports.ACall = ACall;
exports.spyOn = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var targetFn;
    var calls = [];
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
    targetFn = args.length === 0 ? function () { } :
        typeof (args[0]) === "function" ? args[0] : args[0][args[1]];
    // spy api - tracking
    var spy = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var aArgs = args.length && args || [];
        var fn;
        var error;
        var returned;
        function ThrowsException(message, name) {
            this.message = message;
            this.name = name;
        }
        if (spy._callActual || spy._callFake) {
            fn = spy._callFake || targetFn;
            try {
                returned = fn.apply(spy._callWithContext || this, aArgs);
            }
            catch (er) {
                error = er;
            }
        }
        else if (spy._throws) {
            try {
                throw new ThrowsException(spy._throwsMessage, spy._throwsName);
            }
            catch (er) {
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
    spy.and = {};
    // spy api - sets the spy back to its default state
    spy.and.reset = function () {
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
    spy.and.callWithContext = function (context) {
        if (!context || typeof (context) !== "object") {
            throw new Error("callWithContext expects to be called with an object");
        }
        spy._callWithContext = context;
        return spy;
    };
    spy.and.throw = function () {
        spy._throws = true;
        // for chaining
        return spy;
    };
    spy.and.throwWithMessage = function (message) {
        if (typeof (message) !== "string") {
            throw new Error("message expects a string");
        }
        spy._throws = true;
        spy._throwsMessage = message;
        // for chaining - spy.throws.with.message().and.with.name();
        return spy;
    };
    spy.and.throwWithName = function (name) {
        if (typeof (name) !== "string") {
            throw new Error("name expects a string");
        }
        spy._throws = true;
        spy._throwsName = name;
        // for chaining - spy.throws.with.message().and.with.name();
        return spy;
    };
    spy.and.return = function (ret) {
        spy._returns = ret;
        // for chaining
        return spy;
    };
    // spy api
    spy._resetCalls = function () {
        spy._callFake = null;
        spy._callActual = this._callStub = false;
    };
    // spy api
    spy._callFake = null;
    spy.and.callFake = function (fn) {
        if (fn && typeof (fn) !== "function") {
            throw new Error("callFake expects to be called with a function");
        }
        spy._resetCalls();
        spy._callFake = fn;
        return spy;
    };
    // spy api
    spy._callActual = false;
    spy.and.callActual = function () {
        spy._resetCalls();
        spy._callActual = true;
        // for chaining
        return spy;
    };
    // spy api
    spy.and.callStub = function () {
        spy._resetCalls();
        spy._callActual = false;
        // for chaining
        return spy;
    };
    spy.calls = {
        count: function () {
            return calls.length;
        },
        forCall: function (i) {
            return i >= 0 && i < calls.length && calls[i] || undefined;
        },
        all: function () {
            return calls;
        },
        wasCalledWith: function () {
            var args1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args1[_i - 0] = arguments[_i];
            }
            return calls.some(function (call) {
                var args2 = call.getArgs().args;
                return (deeprecursiveequal_1.deepRecursiveCompare(args1, args2));
            });
        },
        wasCalledWithContext: function (obj) {
            return calls.some(function (call) {
                var context = call.context;
                return (deeprecursiveequal_1.deepRecursiveCompare(obj, context));
            });
        },
        returned: function (value) {
            return calls.some(function (call) {
                var returned = call.getReturned();
                return (deeprecursiveequal_1.deepRecursiveCompare(value, returned));
            });
        },
        threw: function () {
            return calls.some(function (call) {
                return !!call.error;
            });
        },
        threwWithName: function (name) {
            return calls.some(function (call) {
                return call.error && call.error.name === name;
            });
        },
        threwWithMessage: function (message) {
            return calls.some(function (call) {
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
exports.spyOnN = function (argObject, argPropertyNames) {
    var i, len;
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
    argPropertyNames.forEach(function (property) {
        exports.spyOn(argObject, property);
    });
};
//# sourceMappingURL=spy.js.map