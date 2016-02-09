"use strict";
var CallStack_1 = require("./CallStack");
var It_1 = require("../queue/It");
var cs = CallStack_1.callStack;
function xit(label, callback) {
    var _it;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    _it = new It_1.It(cs.uniqueId.toString(), label, callback, true);
    cs.getTopOfStack().items.push(_it);
}
exports.xit = xit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXBpL3hpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLG1CQUFpQixhQUFhLENBQUMsQ0FBQTtBQUUvQixJQUFJLEVBQUUsR0FBRyxxQkFBUyxDQUFDO0FBRW5CLGFBQW9CLEtBQWEsRUFBRSxRQUFxQztJQUNwRSxJQUFJLEdBQUcsQ0FBQztJQUVSLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBR0QsR0FBRyxHQUFHLElBQUksT0FBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUc1RCxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBYmUsV0FBRyxNQWFsQixDQUFBIn0=