/**
 * Main entry point module
 */

import QueueManager = require("./core/queue/QueueManager");
import describe = require("./core/api/describe");
import it = require("./core/api/it");
import beforeEach = require("./core/api/beforeEach");
import afterEach = require("./core/api/afterEach");
import Q = require("q");
import environment = require("./core/environment/environment");

// add callable apis to the window object
if(environment.windows){
    window["describe"] = describe;
    window["it"] = it;
    window["beforeEach"] = beforeEach;
    window["afterEach"] = afterEach;
}

// get a queue mananger and call its run method to run the test suite
let queueManager = new QueueManager(100, 2, Q);
queueManager.run().then(
    (msg) => {
        console.log(msg);
        console.log("QueueManager.queue =", QueueManager.queue);
    },
    (msg) => {
        console.log(msg);
    }
);
