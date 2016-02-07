/**
 * Callable API
 * afterEach(function([done]))
 */

import {AfterEach} from "../queue/AfterEach";
import {callStack} from "./CallStack";

export function afterEach(callback: (done?: () => void) => void) {
    let _afterEach;

    if (arguments.length !== 1 || typeof (arguments[0]) !== "function") {
        throw new TypeError("afterEach called with invalid parameters");
    }

    // an AfterEach object
    _afterEach = new AfterEach(callStack.uniqueId.toString(), "afterEach", callback);

    // add the AfterEach to the parent Describe
    callStack.getTopOfStack().afterEach = _afterEach;
}
