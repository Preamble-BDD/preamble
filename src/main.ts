/**
 * Main entry point module
 */

import QueueManager = require("./core/queue/QueueManager");
import describe = require("./core/api/describe");
import xdescribe = require("./core/api/xdescribe");
import it = require("./core/api/it");
import xit = require("./core/api/xit");
import beforeEach = require("./core/api/beforeEach");
import afterEach = require("./core/api/afterEach");
import Q = require("q");
import environment = require("./core/environment/environment");
import userConfig = require("./core/configuration/configuration");

// add callable apis to the window object
if(environment.windows){
    window["describe"] = describe;
    window["xdescribe"] = xdescribe;
    window["it"] = it;
    window["xit"] = xit;
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
