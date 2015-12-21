/**
 * Callable api
 * it("description", callback)
 */

import QueueManager = require("../queue/QueueManager");

function it(desc: string, callback: () => void){
    if(arguments.length !== 2 || typeof(arguments[0])
    !== "string" || typeof(arguments[1]) !== 'function'){
        throw new TypeError("it called with invalid parameters");
    }
    QueueManager.queue.push({path: "it:" + desc + "/", callback: callback});
    console.log("QueManager.queue item =", {path: "it:" + desc + "/", callback: callback});
    callback.call(QueueManager.queue[QueueManager.queue.length - 1]);
}

export = it;
