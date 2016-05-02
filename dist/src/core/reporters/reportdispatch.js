"use strict";
var ReportDispatch = (function () {
    function ReportDispatch() {
    }
    ReportDispatch.prototype.reportBegin = function (configOptions) {
        this._configOptions = configOptions;
        this._reporters.forEach(function (report) { return report.reportBegin(configOptions); });
    };
    ReportDispatch.prototype.reportSummary = function () {
        var _this = this;
        this._reporters.forEach(function (report) { return report.reportSummary(_this._queueManagerStats); });
    };
    ReportDispatch.prototype.reportSpec = function (it) {
        this._reporters.forEach(function (report) { return report.reportSpec(it); });
    };
    ReportDispatch.prototype.reportEnd = function () {
        var _this = this;
        this._reporters.forEach(function (report) { return report.reportEnd(_this._queueManagerStats); });
    };
    Object.defineProperty(ReportDispatch.prototype, "reporters", {
        set: function (reporters) {
            this._reporters = reporters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportDispatch.prototype, "queueManagerStats", {
        set: function (stats) {
            this._queueManagerStats = stats;
        },
        enumerable: true,
        configurable: true
    });
    return ReportDispatch;
}());
exports.ReportDispatch = ReportDispatch;
exports.reportDispatch = new ReportDispatch();
