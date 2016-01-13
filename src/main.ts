/**
 * Main entry point module
 */

import Q = require("q");
import {QueueManager} from "./core/queue/QueueManager";
import {describe} from "./core/api/describe";
import {xdescribe} from "./core/api/xdescribe";
import {it} from "./core/api/it";
import {xit} from "./core/api/xit";
import {beforeEach} from "./core/api/beforeEach";
import {afterEach} from "./core/api/afterEach";
import {environment} from "./core/environment/environment";
import {userConfig} from "./core/configuration/configuration";

// add callable apis to the window object
if (environment.windows) {
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
