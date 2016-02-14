import { IPrePostTest } from "./ipreposttest";
export declare class AfterEach implements IPrePostTest {
    id: string;
    label: string;
    callback: () => any;
    scope: {};
    constructor(id: string, label: string, callback: () => any);
}
