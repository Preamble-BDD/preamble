import {Reporter} from "./Reporter";
import {QueueManagerStats} from "../queue/QueueManager";

export interface ConfigOptions {
    version: string;
    uiTestContainerId: string;
    name: string;
    hidePassedTests: boolean;
}

export interface IReportDispatch {
    // _reporters: Reporter[];
    // _configOptions: { uiTestContainerId: string, name: string, hidePassedTests: boolean };
    // _queueManagerStats: QueueManagerStats;
    reportBegin: (configOptions: ConfigOptions) => void;
    reportSummary: () => void;
    reportSpec: (it) => void;
    reportEnd: () => void;
    // reporters: (reporters: Reporter[]) => void;
    // queueManagerStats: (stats: QueueManagerStats) => void;
}
export class ReportDispatch implements IReportDispatch {
    private _reporters: Reporter[];
    private _configOptions;
    private _queueManagerStats;
    reportBegin(configOptions: ConfigOptions): void {
        this._configOptions = configOptions;
        this._reporters.forEach((report) => report.reportBegin(configOptions));
    }
    reportSummary(): void {
        this._reporters.forEach((report) => report.reportSummary(this._queueManagerStats));
    }
    reportSpec(it): void {
        this._reporters.forEach((report) => report.reportSpec(it));
    }
    reportEnd(): void {
        this._reporters.forEach((report) => report.reportEnd());
    }
    set reporters(reporters: Reporter[]) {
        this._reporters = reporters;
    }
    set queueManagerStats(stats: QueueManagerStats) {
        this._queueManagerStats = stats;
    }
}

export let reportDispatch = new ReportDispatch();
