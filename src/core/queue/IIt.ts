import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";
import {INote} from "../expectations/INote";

export interface IIt extends IIsA {
    parent: IDescribe;
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    timeoutInterval: number;
    expectations: INote[];
    passed: boolean;
}
