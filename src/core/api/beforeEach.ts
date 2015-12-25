/**
 * Callable API
 * beforeEach(function([done]))
 */

import BeforeEach = require("../queue/BeforeEach");
import callStack = require("./CallStack");

let cs = callStack.callStack;

function beforeEach(callback: (done?: () => void) => void) {
    let  _beforeEach;
    
    if(arguments.length !== 1 || typeof(arguments[0]) !== "function"){
        throw new TypeError("beforeEach called with invalid parameters");
    }

    // a BeforeEach object
    _beforeEach = new BeforeEach(cs.uniqueId.toString(), "beforeEach", callback)
    
    // add BeforeEach to the parent Describe's items collection
    cs.getTopOfStack().items.push(_beforeEach);
}

export = beforeEach;
