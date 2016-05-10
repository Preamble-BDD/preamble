import {It} from "../queue/It";
import {callStack} from "./callstack";
import {QueueManager} from "../queue/QueueManager";
import {stackTrace} from "../stacktrace/StackTrace";

export interface ApiXIt {
    (label: string, callback: (done?: () => void) => void, timeoutInterval: number): void;
}

export let xit: ApiXIt = function(label: string, callback: (done?: () => void) => void, timeoutInterval = 0): void {
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
    _it = new It(callStack.getTopOfStack(), callStack.uniqueId.toString(),
        label, callback, true, timeoutInterval, stackTrace.stackTrace);

    // push Describe onto the queue
    QueueManager.queue.push(_it);

    // Increment totIts count
    QueueManager.bumpTotItsCount();

    // Increment totExclIts count
    QueueManager.bumpTotExcItsCount();
};
