"use strict";
var CallStack_1 = require("./CallStack");
var It_1 = require("../queue/It");
var QueueManager_1 = require("../queue/QueueManager");
var cs = CallStack_1.callStack;
function xit(label, callback, timeoutInterval) {
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
    _it = new It_1.It(cs.uniqueId.toString(), label, callback, true, timeoutInterval);
    cs.getTopOfStack().items.push(_it);
    QueueManager_1.QueueManager.totIts++;
    QueueManager_1.QueueManager.totExclIts++;
}
exports.xit = xit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXBpL3hpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLG1CQUFpQixhQUFhLENBQUMsQ0FBQTtBQUMvQiw2QkFBMkIsdUJBQXVCLENBQUMsQ0FBQTtBQUVuRCxJQUFJLEVBQUUsR0FBRyxxQkFBUyxDQUFDO0FBRW5CLGFBQW9CLEtBQWEsRUFBRSxRQUFxQyxFQUFFLGVBQW1CO0lBQW5CLCtCQUFtQixHQUFuQixtQkFBbUI7SUFDekYsSUFBSSxHQUFHLENBQUM7SUFFUixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFHRCxHQUFHLEdBQUcsSUFBSSxPQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUc3RSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUduQywyQkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBR3RCLDJCQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQXhCZSxXQUFHLE1Bd0JsQixDQUFBIn0=