import { IIsA } from "./IIsA";
import { BeforeEach } from "./BeforeEach";
import { AfterEach } from "./AfterEach";
export interface IDescribe extends IIsA {
    id: string;
    label: string;
    excluded: boolean;
    context: {};
    callback: () => void;
    beforeEach: BeforeEach;
    afterEach: AfterEach;
    parent: IDescribe;
    passed: boolean;
}
