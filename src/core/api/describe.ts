/**
 * Callable API
 * describe("description", callback)
 */

import {callStack} from "./callstack";
import {Describe} from "../queue/Describe";
import {QueueManager} from "../queue/QueueManager";

export function describe(label: string, callback: () => void) {
    let _describe: Describe;

    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("describe called with invalid parameters");
    }

    // a Description object
    _describe = new Describe(callStack.uniqueId.toString(), label, callback,
        callStack.length && callStack.getTopOfStack() || null,
        callStack.length && callStack.getTopOfStack().excluded || false);

    // push Describe onto the queue only if it is a top level Describe
    // if (callStack.length === 0) {
    //     QueueManager.queue.push(_describe);
    // } else {
    //     callStack.getTopOfStack().items.push(_describe);
    // }

    // push Describe onto the queue
    QueueManager.queue.push(_describe);

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
}
