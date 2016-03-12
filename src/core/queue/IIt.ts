import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";

export interface IIt extends IIsA {
    parent: IDescribe;
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    timeoutInterval: number;
}
