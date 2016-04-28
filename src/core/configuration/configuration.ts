/**
 * Environment Dependent Configuration
 */

// import {environment} from "../environment/environment";
import {pGlobal} from "../environment/environment";
import {PreambleConfiguration} from "./PreambleConfiguration";
import "../../polyfills/Object.assign"; // prevent eliding import

export let configuration: PreambleConfiguration;

// TODO(js): clean up configuration - remove shortCircuit, windowGlobals and make uiTestContainerId conditional
let defaultConfiguration: PreambleConfiguration = {
    // windowGlobals: true,
    timeoutInterval: 5000,
    name: "Suite",
    uiTestContainerId: "preamble-ui-container",
    hidePassedTests: typeof window !== "undefined" ? false : true,
    shortCircuit: false
};

if (pGlobal.preamble && pGlobal.preamble.preambleConfig) {
    configuration = Object.assign({}, defaultConfiguration, pGlobal.preamble.preambleConfig);
} else {
    configuration = defaultConfiguration;
}
