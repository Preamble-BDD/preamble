import {StackTrace} from "../stacktrace/StackTrace";

let stackTrace = new StackTrace();

function throwException(errMessage) {
    throw new Error(errMessage);
}

export function expect(actual) {
    if (arguments.length !== 1) {
        throwException("\"expect\" requires 1 argument, found " + arguments.length);
    }
    if (typeof (actual) === "function" && !("_snoopsterMaker" in actual)) {
        // actual = spy(actual).and.callActual();
        actual();
    }
    // push partial assertion (only the value) info onto the assertion table
    // pushOntoExpectations(null, null, actual, null, null);
    // return the expectationApi for chaining
    // return globals.expectationApi;
}
