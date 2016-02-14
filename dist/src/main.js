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
    if (window.hasOwnProperty("preamble") &&
        window.preamble.hasOwnProperty("reporter")) {
        reporter = window.preamble.reporter;
    }
    if (!reporter) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4Qiw2QkFBMkIsMkJBQTJCLENBQUMsQ0FBQTtBQUN2RCx5QkFBdUIscUJBQXFCLENBQUMsQ0FBQTtBQUM3QywwQkFBd0Isc0JBQXNCLENBQUMsQ0FBQTtBQUMvQyxtQkFBaUIsZUFBZSxDQUFDLENBQUE7QUFDakMsb0JBQWtCLGdCQUFnQixDQUFDLENBQUE7QUFDbkMsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsMEJBQXdCLHNCQUFzQixDQUFDLENBQUE7QUFDL0MsNEJBQTBCLGdDQUFnQyxDQUFDLENBQUE7QUFDM0QsUUFBTyxvQ0FBb0MsQ0FBQyxDQUFBO0FBRTVDLElBQUksUUFBWSxDQUFDO0FBR2pCLEVBQUUsQ0FBQyxDQUFDLHlCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUV0QixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsbUJBQVEsQ0FBQztJQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcscUJBQVMsQ0FBQztJQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBRSxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFHLENBQUM7SUFDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLHVCQUFVLENBQUM7SUFDbEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLHFCQUFTLENBQUM7SUFFaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7UUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN6QyxDQUFDO0FBQ0wsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFHRCxJQUFJLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUNuQixVQUFDLEdBQUc7SUFFQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsMkJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUU1RCxDQUFDLEVBQ0QsVUFBQyxHQUFHO0lBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQ0osQ0FBQyJ9