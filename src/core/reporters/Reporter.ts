export interface Reporter {
    reportBegin: (configOptions: { uiTestContainerId: string, name: string }) => void;
    reportSummary: (summaryInfo: { totDescribes: number, totExcDescribes: number, totIts: number, totFailedIts: number, totExcIts: number, name: string, totTime: number }) => void;
    reportSuite: () => void;
    reportSpec: () => void;
    reportEnd: () => void;
}
