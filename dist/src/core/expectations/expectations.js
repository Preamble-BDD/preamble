"use strict";
var StackTrace_1 = require("../stacktrace/StackTrace");
var stackTrace = new StackTrace_1.StackTrace();
function throwException(errMessage) {
    throw new Error(errMessage);
}
function expect(actual) {
    if (arguments.length !== 1) {
        throwException("\"expect\" requires 1 argument, found " + arguments.length);
    }
    if (typeof (actual) === "function" && !("_snoopsterMaker" in actual)) {
        actual();
    }
}
exports.expect = expect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZWN0YXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXhwZWN0YXRpb25zL2V4cGVjdGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXlCLDBCQUEwQixDQUFDLENBQUE7QUFFcEQsSUFBSSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7QUFFbEMsd0JBQXdCLFVBQVU7SUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsZ0JBQXVCLE1BQU07SUFDekIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLGNBQWMsQ0FBQyx3Q0FBd0MsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRSxNQUFNLEVBQUUsQ0FBQztJQUNiLENBQUM7QUFLTCxDQUFDO0FBWmUsY0FBTSxTQVlyQixDQUFBIn0=