/**
 * CallStack
 */

import {IQueueItem} from "../queue/iqueueitem";
import {Describe} from "../queue/Describe";
import {It} from "../queue/It";
import {BeforeEach} from "../queue/BeforeEach";
import {AfterEach} from "../queue/AfterEach";
import {mix} from "../queue/mix";
import {UniqueNumber} from "../UniqueNumber";

export class CallStack {
    private _callStack: Describe[];
    private _uniqueNumber: UniqueNumber;
    constructor() {
        this._callStack = [];
        this._uniqueNumber = new UniqueNumber();
    }
    push(queueItem) {
        // reject call if queitem isn't an IQueueItem
        if (!(queueItem instanceof Describe) && !(queueItem instanceof It)
            && !(queueItem instanceof BeforeEach) && !(queueItem instanceof AfterEach)) {
            throw new TypeError("callstack.push called with invalid parameter");
        }
        return this._callStack.push(queueItem);
    }
    pop() {
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
    iterate(callback: (item: IQueueItem) => void) {
        console.log("_callStack:", this._callStack);
        this._callStack.forEach(function(item) {
            callback(item);
        });
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

export let callStack = new CallStack();
