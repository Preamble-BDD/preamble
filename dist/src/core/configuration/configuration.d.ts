export interface IPreambleWindowConfiguration {
    windowGlobals?: boolean;
    uiTestContainerId: string;
}
export interface IPreambleConfiguration extends IPreambleWindowConfiguration {
    timeoutInterval: number;
    name: string;
    hidePassedTests: boolean;
    shortCircuit: boolean;
}
export declare let configuration: IPreambleConfiguration;
