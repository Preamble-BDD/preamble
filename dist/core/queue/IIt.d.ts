import { IDescribe } from "./IDescribe";
export interface IIt {
    parent: IDescribe;
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    timeoutInterval: number;
}
