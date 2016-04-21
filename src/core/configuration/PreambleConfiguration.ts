export interface PreambleBaseConfiguration {
    // windowGlobals?: boolean;
    uiTestContainerId: string;
}

export interface PreambleConfiguration extends PreambleBaseConfiguration {
    timeoutInterval: number;
    name: string;
    hidePassedTests: boolean;
    shortCircuit: boolean;
}
