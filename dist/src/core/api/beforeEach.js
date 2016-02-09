"use strict";
var BeforeEach_1 = require("../queue/BeforeEach");
var CallStack_1 = require("./CallStack");
var cs = CallStack_1.callStack;
function beforeEach(callback) {
    var _beforeEach;
    if (arguments.length !== 1 || typeof (arguments[0]) !== "function") {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    _beforeEach = new BeforeEach_1.BeforeEach(cs.uniqueId.toString(), "beforeEach", callback);
    cs.getTopOfStack().beforeEach = _beforeEach;
}
exports.beforeEach = beforeEach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVmb3JlRWFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2FwaS9iZWZvcmVFYWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSwyQkFBeUIscUJBQXFCLENBQUMsQ0FBQTtBQUMvQywwQkFBd0IsYUFBYSxDQUFDLENBQUE7QUFFdEMsSUFBSSxFQUFFLEdBQUcscUJBQVMsQ0FBQztBQUVuQixvQkFBMkIsUUFBcUM7SUFDNUQsSUFBSSxXQUFXLENBQUM7SUFFaEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDakUsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFHRCxXQUFXLEdBQUcsSUFBSSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRzdFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0FBQ2hELENBQUM7QUFaZSxrQkFBVSxhQVl6QixDQUFBIn0=