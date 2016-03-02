"use strict";
var environment_1 = require("../environment/environment");
require("../../polyfills/Object.assign");
function windowsConfiguration() {
    var defaultConfiguration = {
        windowGlobals: true,
        timeoutInterval: 50,
        name: "Suite",
        uiTestContainerId: "ui-test-container",
        hidePassedTests: false,
        shortCircuit: false
    };
    if (window["preambleConfig"]) {
        exports.configuration = Object.assign({}, defaultConfiguration, window["preambleConfig"]);
    }
    else {
        exports.configuration = defaultConfiguration;
    }
    console.log("Windows Configuration", exports.configuration);
}
function nodeConfiguration() {
}
if (environment_1.environment.windows) {
    windowsConfiguration();
}
else {
    nodeConfiguration();
}
//# sourceMappingURL=configuration.js.map