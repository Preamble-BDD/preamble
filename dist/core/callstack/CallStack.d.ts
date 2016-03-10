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
    readonly stack: Describe[];
    readonly length: number;
    readonly uniqueId: number;
    getTopOfStack(): Describe;
}
