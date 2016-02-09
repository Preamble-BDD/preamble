import { IPrePostTest } from "./ipreposttest";
export declare class BeforeEach implements IPrePostTest {
    id: string;
    label: string;
    callback: () => any;
    scope: {};
    constructor(id: string, label: string, callback: () => any);
}
