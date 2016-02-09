import { IIt } from "./IIt";
export declare class It implements IIt {
    id: string;
    label: string;
    callback: any;
    excluded: boolean;
    scope: {};
    expectations: any[];
    constructor(id: string, label: string, callback: any, excluded?: boolean);
}
