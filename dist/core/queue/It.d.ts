import { IIt } from "./IIt";
import { IDescribe } from "./IDescribe";
export declare class It implements IIt {
    parent: IDescribe;
    id: string;
    label: string;
    callback: any;
    excluded: boolean;
    timeoutInterval: number;
    scope: {};
    expectations: any[];
    isA: string;
    constructor(parent: IDescribe, id: string, label: string, callback: any, excluded: boolean, timeoutInterval: number);
}
