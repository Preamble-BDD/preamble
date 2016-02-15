"use strict";
var AfterEach_1 = require("../queue/AfterEach");
var CallStack_1 = require("./CallStack");
function afterEach(callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _afterEach;
    if (arguments.length !== 1 && arguments.length !== 2) {
        throw new TypeError("afterEach called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "function") {
        throw new TypeError("afterEach called with invalid parameters");
    }
    if (arguments.length === 2 && typeof (arguments[1]) !== "number") {
        throw new TypeError("afterEach called with invalid parameters");
    }
    _afterEach = new AfterEach_1.AfterEach(CallStack_1.callStack.uniqueId.toString(), callback, timeoutInterval);
    CallStack_1.callStack.getTopOfStack().afterEach = _afterEach;
}
exports.afterEach = afterEach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZ0ZXJFYWNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXBpL2FmdGVyRWFjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsMEJBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFDN0MsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBRXRDLG1CQUEwQixRQUFxQyxFQUFFLGVBQW1CO0lBQW5CLCtCQUFtQixHQUFuQixtQkFBbUI7SUFDaEYsSUFBSSxVQUFVLENBQUM7SUFFZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLElBQUksU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sSUFBSSxTQUFTLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBR0QsVUFBVSxHQUFHLElBQUkscUJBQVMsQ0FBQyxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFHckYscUJBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQ3JELENBQUM7QUFsQmUsaUJBQVMsWUFrQnhCLENBQUEifQ==