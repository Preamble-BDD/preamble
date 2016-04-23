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
import {pGlobal} from "./core/environment/environment";
import {configuration} from "./core/configuration/configuration";
import {expect} from "./core/expectations/expect";
import {registerMatcher} from "./core/expectations/expect";
import {RegisterMatcher} from "./core/expectations/expect";
import {RegisterMatchers} from "./core/expectations/expect";
import {spyOn} from "./core/expectations/spy/spy";
import {spyOnN} from "./core/expectations/spy/spy";
import {mock} from "./core/expectations/mock";
import {deepRecursiveCompare} from "./core/expectations/comparators/deeprecursiveequal";
import {DeepRecursiveCompare} from "./core/expectations/comparators/deeprecursiveequal";
import {matchersCount} from "./core/expectations/expect";
import {Reporter} from "./core/reporters/Reporter";
import {reportDispatch} from "./core/reporters/reportdispatch";
import {queueFilter} from "./core/queue/queueFilter";

let pkgJSON = require("../package.json");

let reporters: Reporter[];

// turn on long stact support in Q
Q.longStackSupport = true;

// give reportDispatch access to the queuManager
reportDispatch.queueManagerStats = QueueManager.queueManagerStats;

// add APIs used by suites to the global object
pGlobal.describe = describe;
pGlobal.xdescribe = xdescribe;
pGlobal.it = it;
pGlobal.xit = xit;
pGlobal.beforeEach = beforeEach;
pGlobal.afterEach = afterEach;
pGlobal.expect = expect;
pGlobal.spyOn = spyOn;
pGlobal.spyOnN = spyOnN;
pGlobal.mock = mock;
if (pGlobal.hasOwnProperty("preamble")) {
    // add reporter plugin
    if (pGlobal.preamble.hasOwnProperty("reporters")) {
        reporters = pGlobal.preamble.reporters;
        // hand off reporters to the ReportDispatch
        reportDispatch.reporters = reporters;
    }
    if (!reporters || !reporters.length) {
        console.log("No reporters found");
        throw new Error("No reporters found");
    }
    // dispatch reportBegin to reporters
    reportDispatch.reportBegin({
        version: pkgJSON.version,
        uiTestContainerId: configuration.uiTestContainerId,
        name: configuration.name,
        hidePassedTests: configuration.hidePassedTests
    });
    // expose registerMatcher for one-off in-line matcher registration
    pGlobal.preamble.registerMatcher = registerMatcher;
    // call each matcher plugin to register their matchers
    if (pGlobal.preamble.hasOwnProperty("registerMatchers")) {
        let registerMatchers: RegisterMatchers[] = pGlobal.preamble.registerMatchers;
        registerMatchers.forEach(rm => rm(registerMatcher, { deepRecursiveCompare: deepRecursiveCompare }));
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
    pGlobal.preamble.Q = Q;
} else {
    console.log("No plugins found");
    throw new Error("No plugins found");
}

// the raw filter looks like "?filter=spec_n" or "?filter=suite_n" where n is some number
let filter = typeof window === "object" &&
    window.location.search.substring(window.location.search.indexOf("_") + 1) || null;
console.log("filter =", filter);

// dspatch reportSummary to all reporters
reportDispatch.reportSummary();

// get a queue manager and call its run method to run the test suite
let queueManager = new QueueManager(100, 2, Q);
QueueManager.startTimer();
queueManager.run()
    .then((msg) => {
        // fulfilled/success
        console.log(msg);
        console.log("QueueManager.queue =", QueueManager.queue);
        // dispatch reportSummary to all reporters
        reportDispatch.reportSummary();
        // run the queue
        // TODO(js): should filter for failed specs if hidePassedTests is true
        new QueueRunner(filter && queueFilter(QueueManager.queue,
            QueueManager.queueManagerStats, filter) || QueueManager.queue,
            configuration.timeoutInterval, queueManager, reportDispatch, Q).run()
            .then(() => {
                let totFailedIts = QueueManager.queue.reduce((prev, curr) => {
                    return curr.isA === "It" && !curr.passed ? prev + 1 : prev;
                }, 0);
                QueueManager.stopTimer();
                console.log(`queue ran successfully in ${QueueManager.queueManagerStats.timeKeeper.totTime} miliseconds`);
                reportDispatch.reportSummary();
                reportDispatch.reportEnd();
            }, () => {
                console.log("queue failed to run");
            });
    }, (msg) => {
        // rejected/failure
        console.log(msg);
    });
