/**
 * Callable API
 * afterEach(function([done]))
 */

import AfterEach = require("../queue/AfterEach");
import QueueManager = require("../queue/QueueManager");
import callStack = require("./CallStack");

let cs = callStack.callStack;

function afterEach(callback: (done?: () => void) => void) {


    let _afterEach: AfterEach;

    if(arguments.length !== 1 || typeof(arguments[0]) !== "function"){
        throw new TypeError("afterEach called with invalid parameters");
    }

    // // create callstack if doesn't exist
    // cs = cs && cs || new callStack.CallStack();

    // a Description object
    _afterEach = new AfterEach(callback)

    // push Description object onto the callstack
    cs.push(_afterEach);

    _afterEach.callback.call(_afterEach.callback);
}

export = afterEach;
