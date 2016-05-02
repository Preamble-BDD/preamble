import { IIt } from "./IIt";
import { Reason } from "./IIt";
import { IDescribe } from "./IDescribe";
import { INote } from "../api/expectations/INote";
/**
* returns an It ancestor hierarchy
*/
export declare class It implements IIt {
    parent: IDescribe;
    id: string;
    label: string;
    callback: any;
    excluded: boolean;
    timeoutInterval: number;
    callStack: string[];
    scope: {};
    expectations: INote[];
    isA: string;
    passed: boolean;
    reasons: Reason[];
    hierarchy: IDescribe[];
    constructor(parent: IDescribe, id: string, label: string, callback: any, excluded: boolean, timeoutInterval: number, callStack: string[]);
}
