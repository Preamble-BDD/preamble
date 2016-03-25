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
import {CallStack} from "./core/callstack/CallStack";
import {UniqueNumber} from "./core/uniquenumber/UniqueNumber";
import {expect} from "./core/expectations/expect";
import {registerMatcher} from "./core/expectations/expect";
import {spyOn} from "./core/expectations/spy/spy";
import {deepRecursiveCompare} from "./core/expectations/comparators/deeprecursiveequal";
import {matchersCount} from "./core/expectations/expect";
import {IMatcher} from "./core/expectations/matchers/IMatcher";
import "./core/configuration/configuration"; // prevent eliding import
// import "./core/expectations/matchers/matchers"; // prevent eliding import

let reporter: {};

// Configure based on environment
if (environment.windows) {
    // add APIs used by suites to the window object
    window["describe"] = describe;
    window["xdescribe"] = xdescribe;
    window["it"] = it;
    window["xit"] = xit;
    window["beforeEach"] = beforeEach;
    window["afterEach"] = afterEach;
    window["expect"] = expect;
    window["spyOn"] = spyOn;
    // add reporter plugin
    if (window.hasOwnProperty("preamble") &&
        window["preamble"].hasOwnProperty("reporter")) {
        reporter = window["preamble"]["reporter"];
    }
    if (!reporter) {
        console.log("No reporter found");
        throw new Error("No reporter found");
    }
    // call each matcher plugin to register their matchers
    if (window.hasOwnProperty("preamble") &&
        window["preamble"].hasOwnProperty("registerMatchers")) {
            let registerMatchers = window["preamble"]["registerMatchers"];
            registerMatchers.forEach((rm) =>
            rm(registerMatcher, {deepRecursiveCompare: deepRecursiveCompare}));
    }
    if (!matchersCount()) {
        console.log("No matchers found");
        throw new Error("No matchers found");
    }
    // expose registerMatcher for one-off in-line matcher registration
    window["preamble"]["registerMatcher"] = registerMatcher;
} else {
    throw new Error("Unsuported environment");
}

let timeKeeper = {
    startTime: Date.now(),
    endTime: 0,
    totTime: 0
};

// get a queue manager and call its run method to run the test suite
new QueueManager(100, 2, Q)
    .run()
    .then((msg) => {
        // fulfilled/success
        console.log(msg);
        console.log("QueueManager.queue =", QueueManager.queue);
        // run the queue
        new QueueRunner(QueueManager.queue, configuration.timeoutInterval, Q).run()
            .then(() => {
                timeKeeper.endTime = Date.now();
                timeKeeper.totTime = timeKeeper.endTime - timeKeeper.startTime;
                console.log(`queue ran successfully in ${timeKeeper.totTime} miliseconds`);
            }, () => {
                console.log("queue failed to run");
            });
    }, (msg) => {
        // rejected/failure
        console.log(msg);
    });
