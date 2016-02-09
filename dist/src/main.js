"use strict";
var Q = require("q");
var QueueManager_1 = require("./core/queue/QueueManager");
var describe_1 = require("./core/api/describe");
var xdescribe_1 = require("./core/api/xdescribe");
var it_1 = require("./core/api/it");
var xit_1 = require("./core/api/xit");
var beforeEach_1 = require("./core/api/beforeEach");
var afterEach_1 = require("./core/api/afterEach");
var environment_1 = require("./core/environment/environment");
require("./core/configuration/configuration");
var reporter;
if (environment_1.environment.windows) {
    window["describe"] = describe_1.describe;
    window["xdescribe"] = xdescribe_1.xdescribe;
    window["it"] = it_1.it;
    window["xit"] = xit_1.xit;
    window["beforeEach"] = beforeEach_1.beforeEach;
    window["afterEach"] = afterEach_1.afterEach;
    reporter = window["Reporter"];
    if (reporter === void 0) {
        console.log("No reporter found");
        throw new Error("No reporter found");
    }
}
else {
    throw new Error("Unsuported environment");
}
var queueManager = new QueueManager_1.QueueManager(100, 2, Q);
queueManager.run().then(function (msg) {
    console.log(msg);
    console.log("QueueManager.queue =", QueueManager_1.QueueManager.queue);
}, function (msg) {
    console.log(msg);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4Qiw2QkFBMkIsMkJBQTJCLENBQUMsQ0FBQTtBQUN2RCx5QkFBdUIscUJBQXFCLENBQUMsQ0FBQTtBQUM3QywwQkFBd0Isc0JBQXNCLENBQUMsQ0FBQTtBQUMvQyxtQkFBaUIsZUFBZSxDQUFDLENBQUE7QUFDakMsb0JBQWtCLGdCQUFnQixDQUFDLENBQUE7QUFDbkMsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsMEJBQXdCLHNCQUFzQixDQUFDLENBQUE7QUFDL0MsNEJBQTBCLGdDQUFnQyxDQUFDLENBQUE7QUFDM0QsUUFBTyxvQ0FBb0MsQ0FBQyxDQUFBO0FBRTVDLElBQUksUUFBYSxDQUFDO0FBR2xCLEVBQUUsQ0FBQyxDQUFDLHlCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUV0QixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsbUJBQVEsQ0FBQztJQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcscUJBQVMsQ0FBQztJQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBRSxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFHLENBQUM7SUFDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLHVCQUFVLENBQUM7SUFDbEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLHFCQUFTLENBQUM7SUFFaEMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDekMsQ0FBQztBQUNMLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBR0QsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0MsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FDbkIsVUFBQyxHQUFHO0lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLDJCQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUQsQ0FBQyxFQUNELFVBQUMsR0FBRztJQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUNKLENBQUMifQ==