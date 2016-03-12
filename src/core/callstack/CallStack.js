"use strict";
var Describe_1 = require("../queue/Describe");
var CallStack = (function () {
    function CallStack(_uniqueNumber) {
        this._uniqueNumber = _uniqueNumber;
        this._callStack = [];
    }
    CallStack.prototype.pushDescribe = function (describe) {
        if (!(describe instanceof Describe_1.Describe)) {
            throw new TypeError("callstack.push called with invalid parameter");
        }
        return this._callStack.push(describe);
    };
    CallStack.prototype.popDescribe = function () {
        if (this._callStack.length) {
            return this._callStack.pop();
        }
        else {
            return null;
        }
    };
    CallStack.prototype.clear = function () {
        console.log("callStack._callStack =", this._callStack);
        this._callStack = [];
    };
    Object.defineProperty(CallStack.prototype, "stack", {
        get: function () {
            return this._callStack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CallStack.prototype, "length", {
        get: function () {
            return this._callStack.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CallStack.prototype, "uniqueId", {
        get: function () {
            return this._uniqueNumber.next;
        },
        enumerable: true,
        configurable: true
    });
    CallStack.prototype.getTopOfStack = function () {
        return this._callStack.length && this._callStack[this._callStack.length - 1] || null;
    };
    return CallStack;
}());
exports.CallStack = CallStack;
