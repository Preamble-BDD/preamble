import { IPrePostTest } from "./ipreposttest";
import { IDescribe } from "./IDescribe";
export declare class BeforeEach implements IPrePostTest {
    parent: IDescribe;
    id: string;
    callback: () => any;
    timeoutInterval: number;
    callStack: string[];
    constructor(parent: IDescribe, id: string, callback: () => any, timeoutInterval: number, callStack: string[]);
}
