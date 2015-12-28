/**
 * CallStack
 */

import IQueueItem = require("../queue/iqueueitem");
import Describe = require("../queue/Describe");
import It = require("../queue/It");
import BeforeEach = require("../queue/BeforeEach");
import AfterEach = require("../queue/AfterEach");
import mix = require("../queue/mix");
import UniqueNumber = require("../UniqueNumber");


export interface ICallStack {
    push: (item : mix) => number;
    pop:() => mix;
    clear: () => void;
    iterate: (callback: (qi: IQueueItem) => void) => void;
    length: number;
    getTopOfStack: () => Describe;
}

class CallStack implements ICallStack {
    private _callStack: Describe[];
    private _uniqueNumber: UniqueNumber;
    constructor(){
        this._callStack = [];
        this._uniqueNumber = new UniqueNumber();
    }
    push(queueItem){
        let describe: mix;
        // reject call if queitem isn't an IQueueItem
        if (!(queueItem instanceof Describe) && !(queueItem instanceof It)
        && !(queueItem instanceof BeforeEach) && !(queueItem instanceof AfterEach)){
            throw new TypeError("callstack.push called with invalid parameter");
        }
        return this._callStack.push(queueItem);
    }
    pop() {
        if(this._callStack.length){
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
        this._callStack.forEach(function(item){
            callback(item);
        });
    }
    get length(): number {
        return this._callStack.length;
    }
    get uniqueId(): number{
        return this._uniqueNumber.next; 
    }
    getTopOfStack(): Describe {
        return this._callStack.length && this._callStack[this._callStack.length - 1] || null;
    }
}

export let callStack = new CallStack();
