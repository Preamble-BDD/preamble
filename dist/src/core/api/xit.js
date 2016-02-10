"use strict";
var CallStack_1 = require("./CallStack");
var It_1 = require("../queue/It");
var cs = CallStack_1.callStack;
function xit(label, callback, timeoutInterval) {
    if (timeoutInterval === void 0) { timeoutInterval = 0; }
    var _it;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    _it = new It_1.It(cs.uniqueId.toString(), label, callback, true, timeoutInterval);
    cs.getTopOfStack().items.push(_it);
}
exports.xit = xit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXBpL3hpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLG1CQUFpQixhQUFhLENBQUMsQ0FBQTtBQUUvQixJQUFJLEVBQUUsR0FBRyxxQkFBUyxDQUFDO0FBRW5CLGFBQW9CLEtBQWEsRUFBRSxRQUFxQyxFQUFFLGVBQW1CO0lBQW5CLCtCQUFtQixHQUFuQixtQkFBbUI7SUFDekYsSUFBSSxHQUFHLENBQUM7SUFFUixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUdELEdBQUcsR0FBRyxJQUFJLE9BQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRzdFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFiZSxXQUFHLE1BYWxCLENBQUEifQ==