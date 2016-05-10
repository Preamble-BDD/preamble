/**
 * Main entry point module
 * call this module's export to boot
 */

import Q = require("q");
import {QueueManager} from "./core/queue/QueueManager";
import {QueueRunner} from "./core/queue/QueueRunner";
import {getCurrentIt} from "./core/queue/QueueRunner";
import {describe} from "./core/api/describe";
import {xdescribe} from "./core/api/xdescribe";
import {it} from "./core/api/it";
import {xit} from "./core/api/xit";
import {beforeEach} from "./core/api/beforeEach";
import {afterEach} from "./core/api/afterEach";
import {pGlobal} from "./core/environment/environment";
import {configuration} from "./core/configuration/configuration";
import {RegisterMatcher} from "./core/api/expectations/expect";
import {RegisterMatchers} from "./core/api/expectations/expect";
import {stackTrace} from "./core/stacktrace/StackTrace";
import {expectApi} from "./core/api/expectations/expect";
import {spyOn} from "./core/api/expectations/spy/spy";
import {spyOnN} from "./core/api/expectations/spy/spy";
import {mock} from "./core/api/expectations/mock";
import {deepRecursiveCompare} from "./core/api/expectations/comparators/deeprecursiveequal";
import {DeepRecursiveCompare} from "./core/api/expectations/comparators/deeprecursiveequal";
import {Reporter} from "./core/reporters/Reporter";
import {reportDispatch} from "./core/reporters/reportdispatch";
import {queueFilter} from "./core/queue/queueFilter";
let pkgJSON = require("../package.json");

// equivalent to module.exports =
export = (): void => {
    let reporters: Reporter[];

    // turn on long stact support in Q
    Q.longStackSupport = true;

    // give reportDispatch access to the queuManager
    reportDispatch.queueManagerStats = QueueManager.queueManagerStats;

    // configure expectations
    expectApi.configure(configuration.shortCircuit, getCurrentIt, spyOn, stackTrace);

    // add APIs used by suites to the global object
    pGlobal.describe = describe;
    pGlobal.xdescribe = xdescribe;
    pGlobal.it = it;
    pGlobal.xit = xit;
    pGlobal.beforeEach = beforeEach;
    pGlobal.afterEach = afterEach;
    pGlobal.expect = expectApi.expect;
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
            // console.log("No reporters found");
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
        pGlobal.preamble.registerMatcher = expectApi.registerMatcher;
        // call each matcher plugin to register their matchers
        if (pGlobal.preamble.hasOwnProperty("registerMatchers")) {
            let registerMatchers: RegisterMatchers[] = pGlobal.preamble.registerMatchers;
            registerMatchers.forEach(rm => rm(expectApi.registerMatcher, { deepRecursiveCompare: deepRecursiveCompare }));
            if (!expectApi.getMatchersCount()) {
                // console.log("No matchers registered");
                throw new Error("No matchers found");
            }
        } else {
            // no matcher plugins found but matchers can be
            // registered inline so just log it but don't
            // throw an exception
            console.log("No matcher plugins found");
        }
        // expose Q to specs
        pGlobal.preamble.Q = Q;
    } else {
        // console.log("No plugins found");
        throw new Error("No plugins found");
    }

    // the raw filter looks like "?filter=spec_n" or "?filter=suite_n" where n is some number
    let filter = typeof window === "object" &&
        window.location.search.substring(window.location.search.indexOf("_") + 1) || null;
    // console.log("filter =", filter);

    // dspatch reportSummary to all reporters
    reportDispatch.reportSummary();

    // get a queue manager and call its run method to run the test suite
    let queueManager = new QueueManager(100, 2, Q);
    QueueManager.startTimer();
    queueManager.run()
        .then((msg) => {
            // fulfilled/success
            // console.log(msg);
            // console.log("QueueManager.queue =", QueueManager.queue);
            // dispatch reportSummary to all reporters
            reportDispatch.reportSummary();
            // run the queue
            new QueueRunner(filter && queueFilter(QueueManager.queue,
                QueueManager.queueManagerStats, filter) || QueueManager.queue,
                configuration.timeoutInterval, configuration.shortCircuit,
                queueManager, reportDispatch, Q).run()
                .then(() => {
                    let totFailedIts = QueueManager.queue.reduce((prev, curr) => {
                        return curr.isA === "It" && !curr.passed ? prev + 1 : prev;
                    }, 0);
                    QueueManager.stopTimer();
                    // console.log(`queue ran successfully in ${QueueManager.queueManagerStats.timeKeeper.totTime} miliseconds`);
                    reportDispatch.reportSummary();
                    reportDispatch.reportEnd();
                }, () => {
                    // console.log("queue failed to run");
                    console.log("queue failed to run");
                });
        }, (msg) => {
            // rejected/failure
            // console.log(msg);
        });
};
