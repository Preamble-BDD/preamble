/**
 * Callable API
 * describe("description", callback)
 */

import IQueueItem = require("../queue/IQueueItem");
import callStack = require("./CallStack");
import Describe = require("../queue/Describe");

let cs = callStack.callStack;

/** counter is used to maintain of recursion count */
let recursionCounter: number;

function describe(desc: string, callback: () => void) {
    let _describe: Describe;

    if(arguments.length !== 2 || typeof(arguments[0])
    !== "string" || typeof(arguments[1]) !== 'function'){
        throw new TypeError("describe called with invalid parameters");
    }

    // // create callstack if doesn't exist
    // cs = cs && cs || new callStack.CallStack();

    // a Description object
    _describe = new Describe(desc, callback)

    // push Description object onto the callstack
    cs.push(_describe);

    recursionCounter = recursionCounter && ++recursionCounter || 1;

    _describe.callback.call(_describe.scope);

    recursionCounter--;

    if(recursionCounter === 0){
        //exiting the topmost describe - load the callstack into the QueueManager.queue
        //and then clear the stack
        cs.iterate((item: IQueueItem) => {
            console.log("Callstack item:", item);
        });
        cs.clear();
    }
}

export = describe;
