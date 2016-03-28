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

// TODO(js): define a Reporter interface
interface Reporter {
    reportBegin: (configOptions: { uiTestContainerId: string, name: string }) => void;
    reportSummary: (summaryInfo: {totDescribes: number, totExcDescribes: number, totIts: number, totFailedIts: number, totExcIts: number, name: string} ) => void;
    reportSuite: () => void;
    reportSpec: () => void;
    reportEnd: () => void;
}
let reporters: Reporter[];

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
    if (window.hasOwnProperty("preamble")) {
        // add reporter plugin
        if (window["preamble"].hasOwnProperty("reporters")) {
            reporters = window["preamble"]["reporters"];
        }
        if (!reporters || !reporters.length) {
            console.log("No reporters found");
            throw new Error("No reporters found");
        }
        // call each reporter's reportBegin method
        reporters.forEach((reporter) => reporter.reportBegin({
            uiTestContainerId: configuration.uiTestContainerId,
            name: configuration.name
        }));

        // expose registerMatcher for one-off in-line matcher registration
        window["preamble"]["registerMatcher"] = registerMatcher;
        // call each matcher plugin to register their matchers
        if (window["preamble"].hasOwnProperty("registerMatchers")) {
            let registerMatchers = window["preamble"]["registerMatchers"];
            registerMatchers.forEach((rm) =>
                rm(registerMatcher, { deepRecursiveCompare: deepRecursiveCompare }));
            if (!matchersCount()) {
                console.log("No matchers registered");
                throw new Error("No matchers found");
            }
        } else {
            // no matcher plugins found but matchers can be
            // registered inline so just log it but don't
            // throw an exception
            console.log("No matcher plugins found");
        }
    } else {
        console.log("No plugins found");
        throw new Error("No plugins found");
    }
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
        // call each reporter's reportSummary method
        reporters.forEach((reporter) => reporter.reportSummary({
            totDescribes: QueueManager.totDescribes,
            totExcDescribes: QueueManager.totExcDescribes,
            totIts: QueueManager.totIts,
            totFailedIts: 0,
            totExcIts: QueueManager.totExclIts,
            name: configuration.name
        }));
        // run the queue
        new QueueRunner(QueueManager.queue, configuration.timeoutInterval, Q).run()
            .then(() => {
                let totFailedIts = QueueManager.queue.reduce((prev, curr) => {
                    return curr.isA === "It" && !curr.passed ? prev + 1 : prev;
                }, 0);
                reporters.forEach((reporter) => reporter.reportSummary({
                    totDescribes: QueueManager.totDescribes,
                    totExcDescribes: QueueManager.totExcDescribes,
                    totIts: QueueManager.totIts,
                    totFailedIts: totFailedIts,
                    totExcIts: QueueManager.totExclIts,
                    name: configuration.name
                }));
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
