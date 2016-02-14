import { Describe } from "../queue/Describe";
export declare class CallStack {
    private _callStack;
    private _uniqueNumber;
    constructor();
    pushDescribe(describe: Describe): number;
    popDescribe(): Describe;
    clear(): void;
    length: number;
    uniqueId: number;
    getTopOfStack(): Describe;
}
export declare let callStack: CallStack;
