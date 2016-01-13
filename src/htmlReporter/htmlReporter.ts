import Q = require("q");
import {Describe} from "../core/queue/Describe.ts";
import {BeforeEach} from "../core/queue/BeforeEach";
import {AfterEach} from "../core/queue/AfterEach";
import {It} from "../core/queue/It";

(function() {
    class HtmlReporter {
        constructor(private suites: typeof Describe[]) { };
        run(): Q.IPromise<string | Error> {
            let deferred = Q.defer<string | Error>();
            setTimeout(() => {

            }, 1);
            return deferred.promise;
        };
    }

    window["htmlReporter"] = function(suites: typeof Describe[]): void {
        let deferred = Q.defer();
        new HtmlReporter(suites).run();
    };
} ());
