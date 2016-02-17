/**
 * Callable API
 * beforeEach(function([done]))
 */

import {BeforeEach} from "../queue/BeforeEach";
import {callStack} from "./callstack";

let cs = callStack;

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
    _beforeEach = new BeforeEach(cs.uniqueId.toString(), callback, timeoutInterval);

    // add the BeforeEach to the parent Describe
    cs.getTopOfStack().beforeEach = _beforeEach;
}
