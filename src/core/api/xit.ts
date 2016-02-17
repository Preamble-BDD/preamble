/**
 * Callable api
 * xit("description", callback)
 * exlude test
 */

import {callStack} from "./callstack";
import {It} from "../queue/It";
import {QueueManager} from "../queue/QueueManager";

let cs = callStack;

export function xit(label: string, callback: (done?: () => void) => void, timeoutInterval = 0) {
    let _it;

    if (arguments.length !== 2 && arguments.length !== 3) {
        throw new TypeError("it called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    if (arguments.length === 3 && typeof (arguments[2]) !== "number") {
        throw new TypeError("it called with invalid parameters");
    }

    // an It object
    _it = new It(cs.uniqueId.toString(), label, callback, true, timeoutInterval);

    // add It to the parent Describe's items collection
    cs.getTopOfStack().items.push(_it);

    // Increment totIts count
    QueueManager.totIts++;

    // Increment totExclIts count
    QueueManager.totExclIts++;
}
