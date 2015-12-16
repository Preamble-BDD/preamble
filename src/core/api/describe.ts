/**
 * Callable API
 * describe("description", callback)
 */

import QueueManager = require("../queue/QueueManager");

interface IQueueItem {path: string, callback: () => void}

class CallStack {
    private callStack: IQueueItem[];
    constructor(){
        this.callStack = [];
    }
    push(queueItem: IQueueItem){
        this.callStack.push(queueItem);
    }
    pop(): {} {
        if(this.callStack.length){
            return this.callStack.pop();
        } else {
            return null;
        }
    }
    clear(): void {
        this.callStack = [];
    }
    iterate(callback: (item: {}) => void) {
        console.log("callStack:", this.callStack);
        this.callStack.forEach(function(item){
            callback(item);
        });
    }
    length(): number {
        return this.callStack.length;
    }
}

let cs: CallStack;

/** counter is used to maintain of recursion count */
let recursionCounter: number;

function describe(desc: string, callback: () => void) {
    if(arguments.length !== 2 || typeof(arguments[0])
    !== "string" || typeof(arguments[1]) !== 'function'){
        throw new TypeError("describe called with invalid parameters");
    }
    // create callstack if doesn't exist
    cs = cs && cs || new CallStack();

    // push item onto the callstack
    cs.push({path: "describe:" + desc + "/", callback: callback});

    recursionCounter = recursionCounter && ++recursionCounter || 1;

    QueueManager.queue.push({path: "describe:" + desc + "/", callback: callback});
    // console.log("QueManager.queue item =", {path: "describe:" + desc + "/", callback: callback});
    // call describe's callback using queue item as context
    callback.call(QueueManager.queue[QueueManager.queue.length - 1]);

    recursionCounter--;

    if(recursionCounter === 0){
        //exiting the topmost describe - load the callstack into the QueueManager.queue
        //and then clear the stack
        cs.iterate((item) => {
            console.log("Callstack item:", item);
        });
        cs.clear();
    }
}

export = describe;
