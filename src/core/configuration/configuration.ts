/**
 * Environment Dependent Configuration
 */

import {environment} from "../environment/environment";
import "../../../polyfills/Object.assign"; // prevent eliding import

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

export let configuration: IPreambleConfiguration;

/**
 * Windows environment configuration
 */
function windowsConfiguration(): void {
    let defaultConfiguration: IPreambleConfiguration = {
        windowGlobals: true,
        timeoutInterval: 50,
        name: "Suite",
        uiTestContainerId: "ui-test-container",
        hidePassedTests: false,
        shortCircuit: false
    };

    if (window["preambleConfig"]) {
        configuration = Object.assign({}, defaultConfiguration, window["preambleConfig"]);
    } else {
        configuration = defaultConfiguration;
    }

    // log merged configuration
    console.log("Windows Configuration", configuration);
}

/**
 * NodeJS environment configuration
 */
function nodeConfiguration(): void {

}

if (environment.windows) {
    windowsConfiguration();
} else {
    nodeConfiguration();
}
