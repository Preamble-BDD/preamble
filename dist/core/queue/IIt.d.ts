import { IIsA } from "./IIsA";
import { IDescribe } from "./IDescribe";
import { INote } from "../expectations/INote";
export interface Reason {
    reason: string;
    stackTrace: string[];
}
export interface IIt extends IIsA {
    parent: IDescribe;
    hierarchy: IDescribe[];
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    timeoutInterval: number;
    expectations: INote[];
    passed: boolean;
    reasons: Reason[];
    callStack: string[];
}
