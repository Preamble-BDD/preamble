/**
 * Callable API
 * beforeEach(function([done]))
 */

import {BeforeEach} from "../queue/BeforeEach";
import {callStack} from "./CallStack";

let cs = callStack;

export function beforeEach(callback: (done?: () => void) => void) {
    let  _beforeEach;
    
    if(arguments.length !== 1 || typeof(arguments[0]) !== "function"){
        throw new TypeError("beforeEach called with invalid parameters");
    }

    // a BeforeEach object
    _beforeEach = new BeforeEach(cs.uniqueId.toString(), "beforeEach", callback)
    
    // add BeforeEach to the parent Describe's items collection
    cs.getTopOfStack().items.push(_beforeEach);
}
