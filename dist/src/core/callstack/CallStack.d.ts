/**
 * CallStack
 */
import { Describe } from "../queue/Describe";
import { IUniqueNumber } from "../uniquenumber/IUniqueNumber";
import { ICallStack } from "./ICallStack";
export declare class CallStack implements ICallStack {
    private _uniqueNumber;
    private _callStack;
    constructor(_uniqueNumber: IUniqueNumber);
    pushDescribe(describe: Describe): number;
    popDescribe(): Describe;
    clear(): void;
    stack: Describe[];
    length: number;
    uniqueId: number;
    getTopOfStack(): Describe;
}
