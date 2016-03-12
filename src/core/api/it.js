"use strict";
var QueueManager = require("../queue/QueueManager");
function it(desc, callback) {
    QueueManager.queue.push({ path: "it:" + desc + "/", callback: callback });
    console.log("QueManager.queue item =", { path: "it:" + desc + "/", callback: callback });
    callback.call(QueueManager.queue[QueueManager.queue.length - 1]);
}
module.exports = it;
