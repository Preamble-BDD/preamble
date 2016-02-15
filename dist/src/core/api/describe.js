"use strict";
var CallStack_1 = require("./CallStack");
var Describe_1 = require("../queue/Describe");
var QueueManager_1 = require("../queue/QueueManager");
var cs = CallStack_1.callStack;
function describe(label, callback) {
    var _describe;
    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("describe called with invalid parameters");
    }
    _describe = new Describe_1.Describe(cs.uniqueId.toString(), label, callback, cs.length && cs.getTopOfStack().excluded || false);
    if (cs.length === 0) {
        QueueManager_1.QueueManager.queue.push(_describe);
    }
    else {
        cs.getTopOfStack().items.push(_describe);
    }
    cs.pushDescribe(_describe);
    try {
        _describe.callback.call(_describe.context);
    }
    catch (error) {
        console.log(error);
        alert("Error caught when calling Describe callback. See console for more information");
        throw new Error("Terminating test!");
    }
    cs.popDescribe();
    if (cs.length === 0) {
        console.log("QueueManager queue", QueueManager_1.QueueManager.queue);
    }
}
exports.describe = describe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9hcGkvZGVzY3JpYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLDBCQUF3QixhQUFhLENBQUMsQ0FBQTtBQUN0Qyx5QkFBdUIsbUJBQW1CLENBQUMsQ0FBQTtBQUMzQyw2QkFBMkIsdUJBQXVCLENBQUMsQ0FBQTtBQUVuRCxJQUFJLEVBQUUsR0FBRyxxQkFBUyxDQUFDO0FBRW5CLGtCQUF5QixLQUFhLEVBQUUsUUFBb0I7SUFDeEQsSUFBSSxTQUFtQixDQUFDO0lBRXhCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsUUFBUSxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sSUFBSSxTQUFTLENBQUMseUNBQXlDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBR0QsU0FBUyxHQUFHLElBQUksbUJBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQzVELEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQztJQUd2RCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsMkJBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFHRCxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNCLElBQUksQ0FBQztRQUNELFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFFO0lBQUEsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUM7UUFDdkYsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFakIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsMkJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0FBQ0wsQ0FBQztBQXBDZSxnQkFBUSxXQW9DdkIsQ0FBQSJ9