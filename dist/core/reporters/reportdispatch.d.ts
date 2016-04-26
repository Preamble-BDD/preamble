import { Reporter } from "./Reporter";
import { QueueManagerStats } from "../queue/QueueManager";
export interface ConfigOptions {
    version: string;
    uiTestContainerId: string;
    name: string;
    hidePassedTests: boolean;
}
export interface IReportDispatch {
    reportBegin: (configOptions: ConfigOptions) => void;
    reportSummary: () => void;
    reportSpec: (it) => void;
    reportEnd: () => void;
}
export declare class ReportDispatch implements IReportDispatch {
    private _reporters;
    private _configOptions;
    private _queueManagerStats;
    reportBegin(configOptions: ConfigOptions): void;
    reportSummary(): void;
    reportSpec(it: any): void;
    reportEnd(): void;
    reporters: Reporter[];
    queueManagerStats: QueueManagerStats;
}
export declare let reportDispatch: ReportDispatch;
