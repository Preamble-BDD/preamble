/**
 * CallStack
 */

import {Describe} from "../queue/Describe";
import {It} from "../queue/It";
import {mix} from "../queue/mix";
import {IUniqueNumber} from "../uniquenumber/IUniqueNumber";
import {ICallStack} from "./ICallStack";

export class CallStack implements ICallStack {
    private _callStack: Describe[];
    constructor(private _uniqueNumber: IUniqueNumber) {
        this._callStack = [];
    }
    pushDescribe(describe: Describe): number {
        if (!(describe instanceof Describe)) {
            throw new TypeError("callstack.push called with invalid parameter");
        }
        return this._callStack.push(describe);
    }
    popDescribe(): Describe {
        if (this._callStack.length) {
            return this._callStack.pop();
        } else {
            return null;
        }
    }
    clear(): void {
        console.log("callStack._callStack =", this._callStack);
        this._callStack = [];
    }
    get length(): number {
        return this._callStack.length;
    }
    get uniqueId(): number {
        return this._uniqueNumber.next;
    }
    getTopOfStack(): Describe {
        return this._callStack.length && this._callStack[this._callStack.length - 1] || null;
    }
}
