/**
 * CallStack
 */

import IQueueItem = require("../queue/iqueueitem");
import Describe = require("../queue/Describe");
import It = require("../queue/It");
import BeforeEach = require("../queue/BeforeEach");
import AfterEach = require("../queue/AfterEach");

export interface ICallStack {
    push(Describe): number;
    push(BeforeEach): number;
    push(AfterEach): number;
    push(It): number;
    clear(): void;
    iterate(callback: (IQueueItem) => void): void;
    length(): number;
}

type mix = Describe & BeforeEach & AfterEach & It;

class CallStack implements ICallStack {
    private callStack: (Describe & BeforeEach & AfterEach & It)[];
    constructor(){
        this.callStack = [];
    }
    push(queueItem){
        let describe: mix;
        // reject call if queitem isn't an IQueueItem
        if (!(queueItem instanceof Describe) && !(queueItem instanceof It)
        && !(queueItem instanceof BeforeEach) && !(queueItem instanceof AfterEach)){
            throw new TypeError("callstack.push called with invalid parameter");
        }
        if(queueItem instanceof Describe){
            return this.callStack.push(queueItem);
        }
        describe = this.callStack[this.callStack.length - 1];    
        if(queueItem instanceof BeforeEach){
            describe.befores.push(queueItem); 
        } else if(queueItem instanceof AfterEach){
            describe.afters.push(queueItem); 
        } else if(queueItem instanceof It){
            describe.its.push(queueItem); 
        }
    }
    pop() {
        if(this.callStack.length){
            return this.callStack.pop();
        } else {
            return null;
        }
    }
    clear(): void {
        this.callStack = [];
    }
    iterate(callback: (item: IQueueItem) => void) {
        console.log("callStack:", this.callStack);
        this.callStack.forEach(function(item){
            callback(item);
        });
    }
    length(): number {
        return this.callStack.length;
    }
}

export let callStack = new CallStack();
