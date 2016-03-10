"use strict";
var Q = require("q");
var QueueManager_1 = require("./core/queue/QueueManager");
var QueueRunner_1 = require("./core/queue/QueueRunner");
var describe_1 = require("./core/api/describe");
var xdescribe_1 = require("./core/api/xdescribe");
var it_1 = require("./core/api/it");
var xit_1 = require("./core/api/xit");
var beforeEach_1 = require("./core/api/beforeEach");
var afterEach_1 = require("./core/api/afterEach");
var environment_1 = require("./core/environment/environment");
var configuration_1 = require("./core/configuration/configuration");
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
new QueueManager_1.QueueManager(100, 2, Q).run().then(function (msg) {
    console.log(msg);
    console.log("QueueManager.queue =", QueueManager_1.QueueManager.queue);
    new QueueRunner_1.QueueRunner(QueueManager_1.QueueManager.queue, configuration_1.configuration.timeoutInterval, Q).run();
}, function (msg) {
    console.log(msg);
});
//# sourceMappingURL=main.js.map