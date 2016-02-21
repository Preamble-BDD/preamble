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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsbFN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvY2FsbHN0YWNrL0NhbGxTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEseUJBQXVCLG1CQUFtQixDQUFDLENBQUE7QUFNM0M7SUFFSSxtQkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELGdDQUFZLEdBQVosVUFBYSxRQUFrQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxZQUFZLG1CQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELCtCQUFXLEdBQVg7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUNELHlCQUFLLEdBQUw7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0Qsc0JBQUksNkJBQU07YUFBVjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLCtCQUFRO2FBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFDRCxpQ0FBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3pGLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksaUJBQVMsWUErQnJCLENBQUEifQ==