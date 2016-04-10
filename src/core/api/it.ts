/**
 * Callable api
 * it("description", callback)
 */

import {It} from "../queue/It";
import {callStack} from "./callstack";
import {QueueManager} from "../queue/QueueManager";
import {stackTrace} from "../stacktrace/StackTrace";

export function it(label: string, callback: (done?: () => void) => void, timeoutInterval = 0): void {
    let _it;
    let excluded: boolean;

    if (arguments.length !== 2 && arguments.length !== 3) {
        throw new TypeError("it called with invalid parameters");
    }
    if (typeof (arguments[0]) !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }
    if (arguments.length === 3 && typeof (arguments[2]) !== "number") {
        throw new TypeError("it called with invalid parameters");
    }

    // mark the It excluded if any of its parents are excluded
    excluded = callStack.stack.some((item) => {
        return item.excluded;
    });

    // an It object
    _it = new It(callStack.getTopOfStack(), callStack.uniqueId.toString(),
        label, callback, excluded, timeoutInterval, stackTrace.stackTrace);

    // push It onto the queue
    QueueManager.queue.push(_it);

    // increment totIts count
    QueueManager.bumpTotItsCount();

    // increment total excluded Its if excluded
    if (excluded) {
        QueueManager.bumpTotExcItsCount();
    }
}
