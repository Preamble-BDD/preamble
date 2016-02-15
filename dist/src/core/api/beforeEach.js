"use strict";
var BeforeEach_1 = require("../queue/BeforeEach");
var CallStack_1 = require("./CallStack");
var cs = CallStack_1.callStack;
function beforeEach(callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _beforeEach;
    if (arguments.length !== 1 && arguments.length !== 2) {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "function") {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    if (arguments.length === 2 && typeof (arguments[1]) !== "number") {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    _beforeEach = new BeforeEach_1.BeforeEach(cs.uniqueId.toString(), callback, timeoutInterval);
    cs.getTopOfStack().beforeEach = _beforeEach;
}
exports.beforeEach = beforeEach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVmb3JlRWFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2FwaS9iZWZvcmVFYWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSwyQkFBeUIscUJBQXFCLENBQUMsQ0FBQTtBQUMvQywwQkFBd0IsYUFBYSxDQUFDLENBQUE7QUFFdEMsSUFBSSxFQUFFLEdBQUcscUJBQVMsQ0FBQztBQUVuQixvQkFBMkIsUUFBcUMsRUFBRSxlQUFtQjtJQUFuQiwrQkFBbUIsR0FBbkIsbUJBQW1CO0lBQ2pGLElBQUksV0FBVyxDQUFDO0lBRWhCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLElBQUksU0FBUyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sSUFBSSxTQUFTLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFHRCxXQUFXLEdBQUcsSUFBSSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBR2hGLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0FBQ2hELENBQUM7QUFsQmUsa0JBQVUsYUFrQnpCLENBQUEifQ==