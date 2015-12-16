/**
 * Callable api
 * it("description", callback)
 */

import QueueManager = require("../queue/QueueManager");

function it(desc: string, callback: () => void){
    QueueManager.queue.push({path: "it:" + desc + "/", callback: callback});
    console.log("QueManager.queue item =", {path: "it:" + desc + "/", callback: callback});
    callback.call(QueueManager.queue[QueueManager.queue.length - 1]);
}

export = it;
