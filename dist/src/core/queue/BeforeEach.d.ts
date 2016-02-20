import { IPrePostTest } from "./ipreposttest";
export declare class BeforeEach implements IPrePostTest {
    id: string;
    callback: () => any;
    timeoutInterval: number;
    context: {};
    constructor(id: string, callback: () => any, timeoutInterval: number);
}
