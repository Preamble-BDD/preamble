import {AfterEach} from "../queue/AfterEach";
import {callStack} from "./callstack";
import {stackTrace} from "../stacktrace/StackTrace";

export interface ApiAfterEach {
    (callback: (done?: () => void) => void, timeoutInterval: number): void;
}

export let afterEach: ApiAfterEach = function(callback: (done?: () => void) => void, timeoutInterval = 0): void {
    let _afterEach;

    if (arguments.length !== 1 && arguments.length !== 2) {
        throw new TypeError("afterEach called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "function") {
        throw new TypeError("afterEach called with invalid parameters");
    }
    if (arguments.length === 2 && typeof (arguments[1]) !== "number") {
        throw new TypeError("afterEach called with invalid parameters");
    }

    // an AfterEach object
    _afterEach = new AfterEach(callStack.getTopOfStack(), callStack.uniqueId.toString(), callback, timeoutInterval, stackTrace.stackTrace);

    // add it to its parent describe
    callStack.getTopOfStack().afterEach = _afterEach;
};
