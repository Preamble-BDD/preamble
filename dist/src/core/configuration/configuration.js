/**
 * Environment Dependent Configuration
 */
"use strict";
// import {environment} from "../environment/environment";
var environment_1 = require("../environment/environment");
require("../../polyfills/Object.assign"); // prevent eliding import
var defaultConfiguration = {
    timeoutInterval: 5000,
    name: "Suite",
    uiTestContainerId: "preamble-ui-container",
    hidePassedTests: typeof window !== "undefined" ? false : true,
    shortCircuit: false
};
if (environment_1.pGlobal.preamble && environment_1.pGlobal.preamble.preambleConfig) {
    exports.configuration = Object.assign({}, defaultConfiguration, environment_1.pGlobal.preamble.preambleConfig);
}
else {
    exports.configuration = defaultConfiguration;
}
