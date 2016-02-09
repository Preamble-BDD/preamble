"use strict";
var AfterEach_1 = require("../queue/AfterEach");
var CallStack_1 = require("./CallStack");
function afterEach(callback) {
    var _afterEach;
    if (arguments.length !== 1 || typeof (arguments[0]) !== "function") {
        throw new TypeError("afterEach called with invalid parameters");
    }
    _afterEach = new AfterEach_1.AfterEach(CallStack_1.callStack.uniqueId.toString(), "afterEach", callback);
    CallStack_1.callStack.getTopOfStack().afterEach = _afterEach;
}
exports.afterEach = afterEach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZ0ZXJFYWNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXBpL2FmdGVyRWFjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsMEJBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFDN0MsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBRXRDLG1CQUEwQixRQUFxQztJQUMzRCxJQUFJLFVBQVUsQ0FBQztJQUVmLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sSUFBSSxTQUFTLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBR0QsVUFBVSxHQUFHLElBQUkscUJBQVMsQ0FBQyxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFHakYscUJBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQ3JELENBQUM7QUFaZSxpQkFBUyxZQVl4QixDQUFBIn0=