"use strict";
var It_1 = require("../queue/It");
var callstack_1 = require("./callstack");
var QueueManager_1 = require("../queue/QueueManager");
var cs = callstack_1.callStack;
function it(label, callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _it;
    if (arguments.length !== 2 && arguments.length !== 3) {
        throw new TypeError("it called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    if (arguments.length === 3 && typeof (arguments[2]) !== "number") {
        throw new TypeError("it called with invalid parameters");
    }
    _it = new It_1.It(cs.uniqueId.toString(), label, callback, cs.getTopOfStack().excluded, timeoutInterval);
    cs.getTopOfStack().items.push(_it);
    QueueManager_1.QueueManager.totIts++;
}
exports.it = it;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9hcGkvaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLG1CQUFpQixhQUFhLENBQUMsQ0FBQTtBQUMvQiwwQkFBd0IsYUFBYSxDQUFDLENBQUE7QUFDdEMsNkJBQTJCLHVCQUF1QixDQUFDLENBQUE7QUFFbkQsSUFBSSxFQUFFLEdBQUcscUJBQVMsQ0FBQztBQUVuQixZQUFtQixLQUFhLEVBQUUsUUFBcUMsRUFBRSxlQUFtQjtJQUFuQiwrQkFBbUIsR0FBbkIsbUJBQW1CO0lBQ3hGLElBQUksR0FBRyxDQUFDO0lBRVIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBR0QsR0FBRyxHQUFHLElBQUksT0FBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBR3BHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBR25DLDJCQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQXJCZSxVQUFFLEtBcUJqQixDQUFBIn0=