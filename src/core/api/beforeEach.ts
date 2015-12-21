/**
 * Callable API
 * beforeEach(function([done]))
 */

import BeforeEach = require("../queue/BeforeEach");
import QueueManager = require("../queue/QueueManager");
import callStack = require("./CallStack");

let cs = callStack.callStack;

function afterEach(callback: (done?: () => void) => void) {


    let _beforeEach: BeforeEach;

    if(arguments.length !== 1 || typeof(arguments[0]) !== "function"){
        throw new TypeError("beforeEach called with invalid parameters");
    }

    // // create callstack if doesn't exist
    // cs = cs && cs || new callStack.CallStack();

    // a Description object
    _beforeEach = new BeforeEach(callback)

    // push Description object onto the callstack
    cs.push(_beforeEach);

    _beforeEach.callback.call(_beforeEach.callback);
}

export = afterEach;
