/**
 * Callable API
 * describe("description", callback)
 */

import {callStack} from "./callstack";
import {Describe} from "../queue/Describe";
import {QueueManager} from "../queue/QueueManager";

export interface ApiDescribe {
    (label: string, callback: () => void): void;
}

export let describe: ApiDescribe = function(label: string, callback: () => void): void {
    let _describe: Describe;
    let excluded: boolean;

    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("describe called with invalid parameters");
    }

    // mark the Describe excluded if any of its parents are excluded
    // TODO(js):
    excluded = callStack.stack.some((item) => {
        return item.excluded;
    });

    // a Description object
    _describe = new Describe(callStack.uniqueId.toString(), label, callback,
        callStack.length && callStack.getTopOfStack() || null,
        excluded);

    // push Describe onto the queue
    QueueManager.queue.push(_describe);

    // increment totDescribes count
    QueueManager.bumpTotDescribesCount();

    // increment total excluded Describes if excluded
    if (excluded) {
        QueueManager.bumpTotExcDescribesCount();
    }

    // push Describe onto the callstack
    callStack.pushDescribe(_describe);

    // call callback to register the beforeEach, afterEach, it and describe calls
    try {
        _describe.callback();
    } catch (error) {
        console.log(error);
        alert("Error caught when calling Describe callback. See console for more information");
        throw new Error("Terminating test!");
    }

    // pop Describe object off of the callstack
    callStack.popDescribe();
};
