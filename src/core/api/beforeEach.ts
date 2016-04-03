/**
 * Callable API
 * beforeEach(function([done]))
 */

import {BeforeEach} from "../queue/BeforeEach";
import {callStack} from "./callstack";
import {QueueManager} from "../queue/QueueManager";
import {stackTrace} from "../stacktrace/StackTrace";

export function beforeEach(callback: (done?: () => void) => void, timeoutInterval = 0) {
    let _beforeEach;

    if (arguments.length !== 1 && arguments.length !== 2) {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "function") {
        throw new TypeError("beforeEach called with invalid parameters");
    }
    if (arguments.length === 2 && typeof (arguments[1]) !== "number") {
        throw new TypeError("beforeEach called with invalid parameters");
    }

    // a BeforeEach object
    _beforeEach = new BeforeEach(callStack.getTopOfStack(), callStack.uniqueId.toString(), callback, timeoutInterval, stackTrace.stackTrace);

    // add it to its parent describe
    callStack.getTopOfStack().beforeEach = _beforeEach;
}
