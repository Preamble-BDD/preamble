/**
 * Callable api
 * xit("description", callback)
 * exlude test
 */

import {callStack} from "./CallStack";
import {It} from "../queue/It";

let cs = callStack;

export function xit(label: string, callback: (done?: () => void) => void) {
    let _it;

    if (arguments.length !== 2 || typeof (arguments[0])
        !== "string" || typeof (arguments[1]) !== "function") {
        throw new TypeError("it called with invalid parameters");
    }

    // an It object
    _it = new It(cs.uniqueId.toString(), label, callback, true);

    // add It to the parent Describe's items collection
    cs.getTopOfStack().items.push(_it);
}
