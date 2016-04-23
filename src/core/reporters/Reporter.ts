import {IIt} from "../queue/IIt";
import {QueueManagerStats} from "../queue/QueueManager";

export interface Reporter {
    reportBegin: (configOptions: { version: string, uiTestContainerId: string, name: string, hidePassedTests: boolean }) => void;
    reportSummary: (queueManagerStats: QueueManagerStats) => void;
    reportSpec: (it: IIt) => void;
    reportEnd: () => void;
}
