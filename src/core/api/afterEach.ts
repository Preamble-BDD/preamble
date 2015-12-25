/**
 * Callable API
 * afterEach(function([done]))
 */

import Describe = require("../queue/Describe");
import AfterEach = require("../queue/AfterEach");
import callStack = require("./CallStack");

let cs = callStack.callStack;

function afterEach(callback: (done?: () => void) => void) {
    let _afterEach;
    
    if(arguments.length !== 1 || typeof(arguments[0]) !== "function"){
        throw new TypeError("afterEach called with invalid parameters");
    }

    // an AfterEach object
    _afterEach = new AfterEach(cs.uniqueId.toString(), "afterEach", callback)
    
    // add AfterEach to the parent Describe's items collection
    cs.getTopOfStack().items.push(_afterEach);
}

export = afterEach;
