/**
 * Main entry point module
 */
"use strict";
var Q = require("q");
var QueueManager_1 = require("./core/queue/QueueManager");
var QueueRunner_1 = require("./core/queue/QueueRunner");
var QueueRunner_2 = require("./core/queue/QueueRunner");
var describe_1 = require("./core/api/describe");
var xdescribe_1 = require("./core/api/xdescribe");
var it_1 = require("./core/api/it");
var xit_1 = require("./core/api/xit");
var beforeEach_1 = require("./core/api/beforeEach");
var afterEach_1 = require("./core/api/afterEach");
var environment_1 = require("./core/environment/environment");
var configuration_1 = require("./core/configuration/configuration");
var StackTrace_1 = require("./core/stacktrace/StackTrace");
var expect_1 = require("./core/api/expectations/expect");
var spy_1 = require("./core/api/expectations/spy/spy");
var spy_2 = require("./core/api/expectations/spy/spy");
var mock_1 = require("./core/api/expectations/mock");
var deeprecursiveequal_1 = require("./core/api/expectations/comparators/deeprecursiveequal");
var reportdispatch_1 = require("./core/reporters/reportdispatch");
var queueFilter_1 = require("./core/queue/queueFilter");
var pkgJSON = require("../package.json");
module.exports = function () {
    var reporters;
    // turn on long stact support in Q
    Q.longStackSupport = true;
    // give reportDispatch access to the queuManager
    reportdispatch_1.reportDispatch.queueManagerStats = QueueManager_1.QueueManager.queueManagerStats;
    // configure expectations
    expect_1.expectApi.configure(configuration_1.configuration.shortCircuit, QueueRunner_2.getCurrentIt, spy_1.spyOn, StackTrace_1.stackTrace);
    // add APIs used by suites to the global object
    environment_1.pGlobal.describe = describe_1.describe;
    environment_1.pGlobal.xdescribe = xdescribe_1.xdescribe;
    environment_1.pGlobal.it = it_1.it;
    environment_1.pGlobal.xit = xit_1.xit;
    environment_1.pGlobal.beforeEach = beforeEach_1.beforeEach;
    environment_1.pGlobal.afterEach = afterEach_1.afterEach;
    environment_1.pGlobal.expect = expect_1.expectApi.expect;
    environment_1.pGlobal.spyOn = spy_1.spyOn;
    environment_1.pGlobal.spyOnN = spy_2.spyOnN;
    environment_1.pGlobal.mock = mock_1.mock;
    if (environment_1.pGlobal.hasOwnProperty("preamble")) {
        // add reporter plugin
        if (environment_1.pGlobal.preamble.hasOwnProperty("reporters")) {
            reporters = environment_1.pGlobal.preamble.reporters;
            // hand off reporters to the ReportDispatch
            reportdispatch_1.reportDispatch.reporters = reporters;
        }
        if (!reporters || !reporters.length) {
            // console.log("No reporters found");
            throw new Error("No reporters found");
        }
        // dispatch reportBegin to reporters
        reportdispatch_1.reportDispatch.reportBegin({
            version: pkgJSON.version,
            uiTestContainerId: configuration_1.configuration.uiTestContainerId,
            name: configuration_1.configuration.name,
            hidePassedTests: configuration_1.configuration.hidePassedTests
        });
        // expose registerMatcher for one-off in-line matcher registration
        environment_1.pGlobal.preamble.registerMatcher = expect_1.expectApi.registerMatcher;
        // call each matcher plugin to register their matchers
        if (environment_1.pGlobal.preamble.hasOwnProperty("registerMatchers")) {
            var registerMatchers = environment_1.pGlobal.preamble.registerMatchers;
            registerMatchers.forEach(function (rm) { return rm(expect_1.expectApi.registerMatcher, { deepRecursiveCompare: deeprecursiveequal_1.deepRecursiveCompare }); });
            if (!expect_1.expectApi.getMatchersCount()) {
                // console.log("No matchers registered");
                throw new Error("No matchers found");
            }
        }
        else {
            // no matcher plugins found but matchers can be
            // registered inline so just log it but don't
            // throw an exception
            console.log("No matcher plugins found");
        }
        // expose Q on wondow.preamble
        environment_1.pGlobal.preamble.Q = Q;
    }
    else {
        // console.log("No plugins found");
        throw new Error("No plugins found");
    }
    // the raw filter looks like "?filter=spec_n" or "?filter=suite_n" where n is some number
    var filter = typeof window === "object" &&
        window.location.search.substring(window.location.search.indexOf("_") + 1) || null;
    // console.log("filter =", filter);
    // dspatch reportSummary to all reporters
    reportdispatch_1.reportDispatch.reportSummary();
    // get a queue manager and call its run method to run the test suite
    var queueManager = new QueueManager_1.QueueManager(100, 2, Q);
    QueueManager_1.QueueManager.startTimer();
    queueManager.run()
        .then(function (msg) {
        // fulfilled/success
        // console.log(msg);
        // console.log("QueueManager.queue =", QueueManager.queue);
        // dispatch reportSummary to all reporters
        reportdispatch_1.reportDispatch.reportSummary();
        // run the queue
        // TODO(js): should filter for failed specs if hidePassedTests is true
        new QueueRunner_1.QueueRunner(filter && queueFilter_1.queueFilter(QueueManager_1.QueueManager.queue, QueueManager_1.QueueManager.queueManagerStats, filter) || QueueManager_1.QueueManager.queue, configuration_1.configuration.timeoutInterval, configuration_1.configuration.shortCircuit, queueManager, reportdispatch_1.reportDispatch, Q).run()
            .then(function () {
            var totFailedIts = QueueManager_1.QueueManager.queue.reduce(function (prev, curr) {
                return curr.isA === "It" && !curr.passed ? prev + 1 : prev;
            }, 0);
            QueueManager_1.QueueManager.stopTimer();
            // console.log(`queue ran successfully in ${QueueManager.queueManagerStats.timeKeeper.totTime} miliseconds`);
            reportdispatch_1.reportDispatch.reportSummary();
            reportdispatch_1.reportDispatch.reportEnd();
        }, function () {
            // console.log("queue failed to run");
            console.log("queue failed to run");
        });
    }, function (msg) {
        // rejected/failure
        // console.log(msg);
    });
};
//# sourceMappingURL=main.js.map