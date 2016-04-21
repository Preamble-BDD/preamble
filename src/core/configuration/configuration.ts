/**
 * Environment Dependent Configuration
 */

// import {environment} from "../environment/environment";
import {pGlobal} from "../environment/environment";
import {PreambleConfiguration} from "./PreambleConfiguration";
import "../../polyfills/Object.assign"; // prevent eliding import

export let configuration: PreambleConfiguration;

let defaultConfiguration: PreambleConfiguration = {
    // windowGlobals: true,
    timeoutInterval: 5000,
    name: "Suite",
    uiTestContainerId: "preamble-ui-container",
    hidePassedTests: window ? false : true,
    shortCircuit: false
};

if (pGlobal.preambleConfig) {
    configuration = Object.assign({}, defaultConfiguration, pGlobal.preambleConfig);
} else {
    configuration = defaultConfiguration;
}

// log merged configuration
console.log("configuration", configuration);
