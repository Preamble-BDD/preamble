/**
 * Callable api
 * it("description", callback)
 */

import {It} from "../queue/It";
import {callStack} from "./CallStack";

let cs = callStack;

export function it(label: string, callback: (done?: () => void) => void, timeoutInterval = 0): void {
    let _it;

    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }

    // an It object
    _it = new It(cs.uniqueId.toString(), label, callback, cs.getTopOfStack().excluded, timeoutInterval);

    // add It to the parent Describe's items collection
    cs.getTopOfStack().items.push(_it);
}
