"use strict";
var environment_1 = require("../environment/environment");
require("../../../polyfills/Object.assign");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsNEJBQTBCLDRCQUE0QixDQUFDLENBQUE7QUFDdkQsUUFBTyxrQ0FBa0MsQ0FBQyxDQUFBO0FBbUIxQztJQUNJLElBQUksb0JBQW9CLEdBQTJCO1FBQy9DLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGVBQWUsRUFBRSxFQUFFO1FBQ25CLElBQUksRUFBRSxPQUFPO1FBQ2IsaUJBQWlCLEVBQUUsbUJBQW1CO1FBQ3RDLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFlBQVksRUFBRSxLQUFLO0tBQ3RCLENBQUM7SUFFRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IscUJBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLHFCQUFhLEdBQUcsb0JBQW9CLENBQUM7SUFDekMsQ0FBQztJQUdELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUscUJBQWEsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFLRDtBQUVBLENBQUM7QUFFRCxFQUFFLENBQUMsQ0FBQyx5QkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDSixpQkFBaUIsRUFBRSxDQUFDO0FBQ3hCLENBQUMifQ==