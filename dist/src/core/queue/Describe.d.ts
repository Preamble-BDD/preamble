import { IDescribe } from "./IDescribe";
import { BeforeEach } from "./BeforeEach";
import { AfterEach } from "./AfterEach";
export declare class Describe implements IDescribe {
    id: string;
    label: string;
    callback: () => any;
    parent: IDescribe;
    excluded: boolean;
    context: {};
    beforeEach: BeforeEach;
    afterEach: AfterEach;
    isA: string;
    passed: boolean;
    constructor(id: string, label: string, callback: () => any, parent: IDescribe, excluded?: boolean);
}
