"use strict";
var callstack_1 = require("./callstack");
var Describe_1 = require("../queue/Describe");
var QueueManager_1 = require("../queue/QueueManager");
var cs = callstack_1.callStack;
function xdescribe(label, callback) {
    var _describe;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("describe called with invalid parameters");
    }
    _describe = new Describe_1.Describe(cs.uniqueId.toString(), label, callback, true);
    if (cs.length === 0) {
        QueueManager_1.QueueManager.queue.push(_describe);
    }
    else {
        cs.getTopOfStack().items.push(_describe);
    }
    cs.pushDescribe(_describe);
    _describe.callback.call(_describe.context);
    cs.popDescribe();
    if (cs.length === 0) {
        console.log("QueueManager queue", QueueManager_1.QueueManager.queue);
    }
}
exports.xdescribe = xdescribe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGRlc2NyaWJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXBpL3hkZXNjcmliZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLHlCQUF1QixtQkFBbUIsQ0FBQyxDQUFBO0FBQzNDLDZCQUEyQix1QkFBdUIsQ0FBQyxDQUFBO0FBRW5ELElBQUksRUFBRSxHQUFHLHFCQUFTLENBQUM7QUFLbkIsbUJBQTBCLEtBQWEsRUFBRSxRQUFvQjtJQUN6RCxJQUFJLFNBQW1CLENBQUM7SUFFeEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxJQUFJLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFHRCxTQUFTLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUd4RSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsMkJBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFHRCxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUczQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFakIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsMkJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0FBQ0wsQ0FBQztBQTdCZSxpQkFBUyxZQTZCeEIsQ0FBQSJ9