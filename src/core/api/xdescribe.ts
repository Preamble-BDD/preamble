/**
 * Callable API
 * xdescribe("description", callback)
 * excluded suite
 */

// import IQueueItem = require("../queue/IQueueItem");
import {callStack} from "./CallStack";
import {Describe} from "../queue/Describe";
import {QueueManager} from "../queue/QueueManager";

let cs = callStack;

/**
 * counter is used to maintain of recursion counter
 */
export function xdescribe(label: string, callback: () => void) {
    let _describe: Describe;

    if(arguments.length !== 2 || typeof(arguments[0])
    !== "string" || typeof(arguments[1]) !== 'function'){
        throw new TypeError("describe called with invalid parameters");
    }

    // a Description object
    _describe = new Describe(cs.uniqueId.toString(), label, callback, true);

    // push Describe onto the queue only if it is a top level Describe
    if(cs.length === 0){
        QueueManager.queue.push(_describe);
    } else {
        cs.getTopOfStack().items.push(_describe);
    }

    // push Describe object onto the callstack
    cs.push(_describe);

    _describe.callback.call(_describe.scope);

    // pop Describe object off of the callstack
    cs.pop();

    if(cs.length === 0){
        console.log("QueueManager queue", QueueManager.queue);
    }
}
