/**
 * Main entry point module
 */

import Q = require("q");
import {QueueManager} from "./core/queue/QueueManager";
import {QueueRunner} from "./core/queue/QueueRunner";
import {stackTrace} from "./core/stacktrace/StackTrace";
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
import {Reporter} from "./core/reporters/Reporter";
import {reportDispatch} from "./core/reporters/reportdispatch";
import {queueFilter} from "./core/queue/QueueFilter";
import "./core/configuration/configuration"; // prevent eliding import

let reporters: Reporter[];

// turn on long stact support in Q
Q.longStackSupport = true;

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
            // hand off reporters to the ReportDispatch
            reportDispatch.reporters = reporters;
        }
        if (!reporters || !reporters.length) {
            console.log("No reporters found");
            throw new Error("No reporters found");
        }
        // dispatch reportBegin to reporters
        reportDispatch.reportBegin({
            uiTestContainerId: configuration.uiTestContainerId,
            name: configuration.name,
            hidePassedTests: configuration.hidePassedTests
        });
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
        // expose Q on wondow.preamble
        window["preamble"].Q = Q;
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

// the raw filter looks like "#spec_n" or "#suite_n" where n is some number
let filter = window.location.hash.substring(window.location.hash.indexOf("_") + 1);
console.log("filter =", filter);

// dspatch reportSummary to all reporters
reportDispatch.reportSummary({
    totDescribes: 0,
    totExcDescribes: 0,
    totIts: 0,
    totFailedIts: 0,
    totExcIts: 0,
    name: configuration.name,
    totTime: 0
});

// get a queue manager and call its run method to run the test suite
new QueueManager(100, 2, Q)
    .run()
    .then((msg) => {
        // fulfilled/success
        console.log(msg);
        console.log("QueueManager.queue =", QueueManager.queue);
        // dispatch reportSummary to all reporters
        reportDispatch.reportSummary({
            totDescribes: QueueManager.totDescribes,
            totExcDescribes: QueueManager.totExcDescribes,
            totIts: QueueManager.totIts,
            totFailedIts: 0,
            totExcIts: QueueManager.totExclIts,
            name: configuration.name,
            totTime: 0
        });
        // run the queue
        new QueueRunner(filter && queueFilter(QueueManager.queue, filter) || QueueManager.queue,
            configuration.timeoutInterval, reportDispatch, Q).run()
            .then(() => {
                let totFailedIts = QueueManager.queue.reduce((prev, curr) => {
                    return curr.isA === "It" && !curr.passed ? prev + 1 : prev;
                }, 0);
                timeKeeper.endTime = Date.now();
                timeKeeper.totTime = timeKeeper.endTime - timeKeeper.startTime;
                console.log(`queue ran successfully in ${timeKeeper.totTime} miliseconds`);
                // dispatch reportSummary to all reporters
                reportDispatch.reportSummary({
                    totDescribes: QueueManager.totDescribes,
                    totExcDescribes: QueueManager.totExcDescribes,
                    totIts: QueueManager.totIts,
                    totFailedIts: totFailedIts,
                    totExcIts: QueueManager.totExclIts,
                    name: configuration.name,
                    totTime: timeKeeper.totTime
                });
            }, () => {
                console.log("queue failed to run");
            });
    }, (msg) => {
        // rejected/failure
        console.log(msg);
    });
