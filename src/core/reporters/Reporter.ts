import {IIt} from "../queue/IIt";

export interface Reporter {
    reportBegin: (configOptions: { uiTestContainerId: string, name: string, hidePassedTests: boolean }) => void;
    reportSummary: (summaryInfo: { totDescribes: number, totExcDescribes: number, totIts: number, totFailedIts: number, totExcIts: number, name: string, totTime: number }) => void;
    reportSuite: () => void;
    reportSpec: (it: IIt) => void;
    reportEnd: () => void;
}
