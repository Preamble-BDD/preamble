/**
 * Main entry point module
 */

import QueueManager = require("./core/queue/QueueManager");
import describe = require("./core/api/describe");
import it = require("./core/api/it");
import Q = require("q");

// add callable apis to the window object
window["describe"] = describe;
window["it"] = it;

// get a queue mananger and call its run method to run the test suite
let queueManager = new QueueManager(100, 2, Q);
queueManager.run().then(
    (msg) => {
        console.log("queue loaded.", msg)
        console.log("QueueManager.queue =", QueueManager.queue)
    },
    (msg) => console.log(msg)
);
