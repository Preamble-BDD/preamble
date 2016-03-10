import { IPrePostTest } from "./ipreposttest";
import { IDescribe } from "./IDescribe";
export declare class AfterEach implements IPrePostTest {
    parent: IDescribe;
    id: string;
    callback: () => any;
    timeoutInterval: number;
    constructor(parent: IDescribe, id: string, callback: () => any, timeoutInterval: number);
}
