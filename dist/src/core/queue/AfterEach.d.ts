import { IPrePostTest } from "./ipreposttest";
export declare class AfterEach implements IPrePostTest {
    id: string;
    callback: () => any;
    timeoutInterval: number;
    context: {};
    constructor(id: string, callback: () => any, timeoutInterval: number);
}
