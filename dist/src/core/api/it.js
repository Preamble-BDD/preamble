"use strict";
var It_1 = require("../queue/It");
var CallStack_1 = require("./CallStack");
var cs = CallStack_1.callStack;
function it(label, callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _it;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    _it = new It_1.It(cs.uniqueId.toString(), label, callback, cs.getTopOfStack().excluded, timeoutInterval);
    cs.getTopOfStack().items.push(_it);
}
exports.it = it;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9hcGkvaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLG1CQUFpQixhQUFhLENBQUMsQ0FBQTtBQUMvQiwwQkFBd0IsYUFBYSxDQUFDLENBQUE7QUFFdEMsSUFBSSxFQUFFLEdBQUcscUJBQVMsQ0FBQztBQUVuQixZQUFtQixLQUFhLEVBQUUsUUFBcUMsRUFBRSxlQUFtQjtJQUFuQiwrQkFBbUIsR0FBbkIsbUJBQW1CO0lBQ3hGLElBQUksR0FBRyxDQUFDO0lBRVIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFHRCxHQUFHLEdBQUcsSUFBSSxPQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFHcEcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQWJlLFVBQUUsS0FhakIsQ0FBQSJ9