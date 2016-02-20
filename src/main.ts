/**
 * Main entry point module
 */

import Q = require("q");
import {QueueManager} from "./core/queue/QueueManager";
import {QueueRunner} from "./core/queue/QueueRunner";
import {describe} from "./core/api/describe";
import {xdescribe} from "./core/api/xdescribe";
import {it} from "./core/api/it";
import {xit} from "./core/api/xit";
import {beforeEach} from "./core/api/beforeEach";
import {afterEach} from "./core/api/afterEach";
import {environment} from "./core/environment/environment";
import {configuration} from "./core/configuration/configuration";
import "./core/configuration/configuration"; // prevent eliding import

let reporter: {};

// Configure based on environment
if (environment.windows) {
    // add callable APIs to the window object
    window["describe"] = describe;
    window["xdescribe"] = xdescribe;
    window["it"] = it;
    window["xit"] = xit;
    window["beforeEach"] = beforeEach;
    window["afterEach"] = afterEach;
    // reporter
    if (window.hasOwnProperty("preamble") &&
        window.preamble.hasOwnProperty("reporter")) {
        reporter = window.preamble.reporter;
    }
    if (!reporter) {
        console.log("No reporter found");
        throw new Error("No reporter found");
    }
} else {
    throw new Error("Unsuported environment");
}

// get a queue manager and call its run method to run the test suite
new QueueManager(100, 2, Q).run().then(
    (msg) => {
        // fulfilled/success
        console.log(msg);
        console.log("QueueManager.queue =", QueueManager.queue);
        // run the specs in the queueManager.queue
        new QueueRunner(QueueManager.queue, configuration.timeoutInterval, Q).run();
    },
    (msg) => {
        // rejected/failure
        console.log(msg);
    }
);
